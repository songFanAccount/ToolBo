import React from 'react';

function LatexDisplay({mathExpr}) {
    if(mathExpr === undefined || mathExpr === null) {throw new Error("LatexDisplay needs mathExpr!")}
    const tokenTypes = {
        'none': -1,
        'number': 0,
        'variable': 1,
        'operator': 2,
        'function': 3
    }
    const supportedOperators = {
        '+': '+',
        '-': '-',
        '*': '\\cdot',
        '/': '\\dfrac',
        '^': '^',
        '(': '(',
        ')': ')'
    }
    const precedence = {
        '+': 2,
        '-': 2,
        '*': 3,
        '/': 3,
        '^': 4,
        '(': 0,
        ')': 0,
        'function': 5
    }
    const associativity = {
        '+': -1,
        '-': -1,
        '*': -1,
        '/': -1,
        '^': 1,
        '(': 0,
        ')': 0
    }
    const supportedFunctions = {
        'sin': '\\sin',
        'cos': '\\cos',
        'tan': '\\tan',
        'cosec': '\\csc',
        'csc': '\\csc',
        'sec': '\\sec',
        'cot': '\\cot',
        'arcsin': '\\arcsin',
        'arccos': '\\arccos',
        'arctan': '\\arctan',

        'log': '\\ln',
        'ln': '\\ln'
    }
    const expr = getLatexEquivalent()
    let tree = {}
    function getTokens(expr) {
        expr = expr.replaceAll(' ', '') // Getting rid of all spaces
        let tokens = []
        let curToken = ''
        let curType = tokenTypes.none
        let numOpenBrac = 0
        let isUnary = false
        let needNegate = false
        for(let i = 0; i < expr.length; i++) {
            // console.log("curToken = " + curToken + " of type " + curType)
            const newChar = expr[i]
            let newType = tokenTypes.none
            if(newChar >= '0' && newChar <='9') { // Number
                newType = tokenTypes.number
            } else if((newChar >= 'a' && newChar <= 'z') || (newChar >= 'A' && newChar <= 'Z')) { // Letter
                newType = tokenTypes.variable
            } else if(supportedOperators[newChar]) { // Symbol checking
                newType = tokenTypes.operator
                if(newChar === '(') { // Need to keep count of '(' to make sure the number of ')' does not exceed
                    numOpenBrac++
                } else if (newChar === ')') {
                    numOpenBrac--
                    if(numOpenBrac < 0) { // Too many closing brackets
                        throw new Error('Invalid expression: Too many closing brackets!')
                    }
                }
            } else {
                if(newChar === '.' && curType === tokenTypes.number && curToken.at(-1) !== '.') { // Special case for decimal numbers
                    curToken += newChar
                    continue
                }
                throw new Error(`Invalid character: ${newChar}`)
            }
            // console.log("new char = " + newChar + " of type = " + newType)
            if(isUnary) {
                if(newChar === '-') {
                    needNegate = !needNegate
                } else {
                    isUnary = false
                    curToken = newChar
                    curType = newType
                }
                continue
            }
            switch(curType) {
                case tokenTypes.none:
                    if(newType === tokenTypes.operator) {
                        if(newChar === '-') {
                            isUnary = true
                            needNegate = true
                        } else if (newChar !== '(') {
                            throw new Error("Cannot start expression with " + newChar + "!")
                        }
                    }
                    curToken = newChar
                    curType = newType
                    break
                case tokenTypes.number:
                    switch(newType) {
                        case tokenTypes.number:
                            curToken += newChar
                            break
                        case tokenTypes.variable:
                            tokens.push({
                                token: parseFloat(curToken).toString(),
                                type: curType,
                                negate: needNegate
                            })
                            needNegate = false
                            tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                            curToken = newChar
                            curType = newType
                            break
                        case tokenTypes.operator:
                            tokens.push({
                                token: parseFloat(curToken).toString(),
                                type: curType,
                                negate: needNegate
                            })
                            needNegate = false
                            if(newChar === '(') { // e.g. 5( should be intepreted as 5 * (
                                //tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                            }
                            curToken = newChar
                            curType = newType
                            break
                        case tokenTypes.function:
                            throw new Error("Unexpected: A number cannot directly find function token")
                        default:
                            throw new Error("Invalid token type")
                    }
                    continue
                case tokenTypes.variable:
                    switch(newType) {
                        case tokenTypes.number:
                            throw new Error("Invalid expression: Cannot have number immediately after variables!")
                        case tokenTypes.variable:
                            tokens.push({token: curToken, type: curType, negate: needNegate})
                            needNegate = false
                            tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                            curToken = newChar
                            break
                        case tokenTypes.operator:
                            let formsFunction = false
                            if(newChar === '(') { // Should act as a function detector to see whether the previous variables form a supported function
                                // Loop backwards in the tokens array to find longest variable chain
                                // console.log("Checking potential function")
                                let potentialFunc = curToken
                                if(supportedFunctions[potentialFunc]) { // Single character function names, unlikely but do for completeness
                                    curType = tokenTypes.function
                                } else if(tokens.length > 0) {
                                    let i = 0
                                    let startFunctionIndex = -1
                                    // e.g. t * a * n ( -> processing new char '(', so curToken = n -> variable
                                    // console.log("Looping through tokens to check previous variables")
                                    for(i = tokens.length - 1; i >= 0; i--) {
                                        const ithToken = tokens[i]
                                        // console.log("Processing " + ithToken.token)
                                        if(ithToken.token === '*' && ithToken['autoAdded']) { 
                                            // If we found a * and it was autoadded by a number or variable, ignore. If it wasn't autoadded, it breaks the variable chain
                                            continue
                                        } else if (ithToken.type === tokenTypes.variable) { // Finds variable, prepend it to potentialFunc and check if it is a supported function
                                            potentialFunc = ithToken.token + potentialFunc
                                            if(supportedFunctions[potentialFunc]) { // We found a matching function, but keep going to find longest possible
                                                formsFunction = true
                                                curToken = potentialFunc
                                                startFunctionIndex = i
                                                needNegate = ithToken.negate !== undefined ? ithToken.negate : false
                                            }
                                        } else { // If we found anything else, then that would break the variable chain, so cannot be a function
                                            break
                                        }
                                    }
                                    if(formsFunction) { // Update tokens array accordingly by merging the appropriate variables into a function
                                        curType = tokenTypes.function
                                        tokens = tokens.slice(0, startFunctionIndex) // First get rid of all merged variables and their autoadded *s
                                        // Inserting the merged function token will be taken care of, as we have modified curToken and curType, they'll be inserted below
                                    }
                                }
                            }
                            tokens.push({token: curToken, type: curType, negate: needNegate})
                            if(newChar === '(' && !formsFunction) { // e.g. x( should be intepreted as x * (
                                tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
                            }
                            curToken = newChar
                            curType = newType
                            break
                        default:
                            throw new Error("Invalid token type")
                    }
                    continue
                case tokenTypes.operator:
                    switch(newType) {
                        case tokenTypes.number: // Operator followed by number should behave the same as variables do
                        case tokenTypes.variable:
                            if(curToken === ')') {throw new Error("Invalid expression: Cannot have number/variable immediately after ')'!")}
                            tokens.push({token: curToken, type: curType})
                            curToken = newChar
                            curType = newType
                            break
                        case tokenTypes.operator:
                            if(newChar === '-' && curToken !== ')') {
                                if(curToken === '-') {
                                    curToken = '+'
                                } else if (curToken === '+') {
                                    curToken = '-'
                                } else {
                                    isUnary = true
                                    tokens.push({token: curToken, type: curType, negate: needNegate})
                                    needNegate = true
                                }
                                continue  
                            } 
                            switch(curToken) {
                                case ')': // All operators following ) are valid
                                    break
                                default:
                                    if (newChar === '(') {
                                        break
                                    } else {
                                        throw new Error(`Operator problem: ${curToken + newChar}`)
                                    }
                            }
                            tokens.push({token: curToken, type: curType, negate: needNegate})
                            needNegate = false
                            curToken = newChar
                            break
                        default:
                            throw new Error("Invalid token type!")
                    }
                    continue
                default:
                    throw new Error("Invalid token type")
            }
        }
        // Push last token
        if(!isUnary) {
            tokens.push({token: curToken, type: curType, negate: needNegate})
        }
        // Matching open parentheses:
        // If the last token was a '(', need to manually supply an argument before closing parentheses
        if(curToken === '(') {
            tokens.push({token: '4', type: tokenTypes.number, fillArg: true})
        }
        // Push right parentheses until all left parentheses are matched
        for(let i = 0; i < numOpenBrac; i++) {
            tokens.push({token: ')', type: tokenTypes.operator})
        }
        return tokens
    }
    function tokensToString(tokens) {
        let ret = ''
        tokens.forEach((e) => ret += e.token)
        return ret
    }
    /*
    Implemented using Shunting-Yard algorithm https://en.wikipedia.org/wiki/Shunting_yard_algorithm 
    */
    function getTokensInPostfix(tokens) {
        let output = []
        let operatorStack = []
        function outputPush(token) {
            output.push(token)
        }
        function logOutput() {
            let ret = ''
            output.forEach((e) => ret += e.token)
            console.log(ret)
        }
        // function logOPStack() {
        //     let ret = ''
        //     operatorStack.forEach((e) => ret += e.token)
        //     console.log(ret)
        // }
        function processToken(token) {
            const value = token.token
            const type = token.type
            switch(type) {
                case tokenTypes.number:
                case tokenTypes.variable:
                    outputPush(token)
                    break
                case tokenTypes.function:
                    operatorStack.unshift(token)
                    break
                case tokenTypes.operator:
                    if(value === '(') {
                        operatorStack.unshift(token)
                    } else if (value === ')') {
                        if(operatorStack.length === 0) {throw new Error("Cannot find matching '(' for this ')'")}
                        while(operatorStack[0].token !== '(') {
                            outputPush(operatorStack.shift())
                            if(operatorStack.length === 0) {
                                throw new Error("Cannot find matching '(' for this ')'")
                            }
                        }
                        // Popping the ( and discard it
                        operatorStack.shift()
                        if(operatorStack.length !== 0 && operatorStack[0].type === tokenTypes.function) {
                            outputPush(operatorStack.shift())
                        }
                    } else {
                        if(operatorStack.length > 0) {
                            let opStackTop = operatorStack[0].token
                            const O1Prec = precedence[value]
                            let O2Prec = precedence[opStackTop]
                            if(operatorStack[0].type === tokenTypes.function) {O2Prec = precedence['function']}
                            const O1Assoc = associativity[value]
                            while(opStackTop !== '(' && 
                                (O2Prec > O1Prec || (O2Prec === O1Prec && O1Assoc === -1))) {
                                outputPush(operatorStack.shift())
                                // Update each variable
                                if(operatorStack.length <= 0) {break}
                                opStackTop = operatorStack[0].token
                                O2Prec = precedence[opStackTop]
                                if(operatorStack[0].type === tokenTypes.function) {O2Prec = precedence['function']}
                            }
                        }
                        operatorStack.unshift(token)
                    }
                    break
                default:
                    throw new Error("Invalid token type!")
            }
        }
        for(let i = 0; i < tokens.length; i++) {
            processToken(tokens[i])
        }
        while(operatorStack.length !== 0) {
            const opStackTop = operatorStack.shift()
            if(opStackTop.token === '(') {
                throw new Error("Mismatch of parentheses!")
            }
            outputPush(opStackTop)
        }
        logOutput()
        return output
    }
    function generateNode(tokens, iArray) {
        const i = iArray[0]
        if(i < 0) {return null}
        const value = tokens[i]
        let node = {
            value: value,
            left: null,
            right: null
        }
        iArray[0] = i-1
        if(value.type === tokenTypes.number || value.type === tokenTypes.variable) {return node}
        const right = generateNode(tokens, iArray)
        const left = value.type === tokenTypes.function ? null : generateNode(tokens, iArray)
        node.left = left
        node.right = right
        return node
    }
    /* Assumes tokens given in postfix, read from right to left to produce expression tree */
    /* This is the function that sets up conditions for recursion */
    function generateExprTree(tokens) {
        return generateNode(tokens, [tokens.length - 1])
    }
    function treeToLatex(tree, msgArray) {
        if(!tree) {return}
        const curToken = tree.value
        let addParenthesesLeft = false
        switch(curToken.type) {
            case tokenTypes.function:
                addParenthesesLeft = true
                break
            default:
                break
        }
        treeToLatex(tree.left, msgArray)
        let addParenthesesRight = false
        if(!curToken.fillArg) {
            msgArray[0] += curToken.token
        } 
        switch(curToken.type) {
            case tokenTypes.function:
                addParenthesesRight = true
                break
            default:
                break
        }
        if(addParenthesesRight) {msgArray[0] += '('}
        treeToLatex(tree.right, msgArray)
        if(addParenthesesRight) {msgArray[0] += ')'}
    }
    function tokensToLatex(tokens) {
        let ret = ''
        tokens.forEach((e) => ret += e.token)
        const postfixTokens = getTokensInPostfix(tokens)
        const tree = generateExprTree(postfixTokens)
        let msgArray = ['']
        treeToLatex(tree, msgArray)
        console.log(msgArray[0])
        return ret
    }
    function getLatexEquivalent() {
        let tokens 
        try {
            tokens = getTokens(mathExpr)
            console.log(tokens)
            console.log(tokensToString(tokens))
            const ret = tokensToLatex(tokens)
            return ret
        } catch (error) {
            console.log(error.toString())
            return 'Unable to convert to Latex'
        }
    }
    React.useEffect(() => {
        if( typeof window?.MathJax !== "undefined"){
            window.MathJax.typeset()
        }
    }, [expr])

    return (
        <p>{expr}</p>
    )
}

export default LatexDisplay