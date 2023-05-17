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
                                tokens.push({token: '*', type: tokenTypes.operator, autoAdded: true})
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
        return tokens
    }
    function tokensToString(tokens) {
        let ret = ''
        tokens.forEach((e) => ret += e.token)
        return ret
    }
    const precedence = {

    }
    function arrangeToPostfix(tokens) {
        let output = []
    }
    function tokensToLatex(tokens) {
        let ret = ''
        tokens.forEach((e) => ret += e.token)
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