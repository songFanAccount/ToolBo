import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { BinaryTree } from '../../../components/BinaryTree';
import { exprToLatex } from '../../../components/Maths/LatexDisplay';
import { ToolPageParagraph, ToolPageSectionTitle } from '../../../components/UI/toolPage/ToolPageLayout';

/*
Page Content:
User input for math equation
*/
function LatexConverter() {
    const [tex, setTex] = React.useState('')
    const [tree, setTree] = React.useState({})
    const [delay, setDelay] = React.useState(1000)

    React.useEffect(() => {
        function typeset() {
            if(window?.MathJax !== undefined){
                window.MathJax.typeset()
            }
        }
        if(delay > 0) {
            setTimeout(() => typeset, delay)
            setDelay(0)
        } else {
            typeset()
        }
    // eslint-disable-next-line
    }, [tex])

    function handleChange(event) {
        try {
            let input = event.target.value
            input = input.replaceAll(' ', '') // Getting rid of all spaces
            const latexObj = exprToLatex(input)
            console.log(latexObj)
            setTex(latexObj.latex)
            setTree(latexObj.tree)
        } catch(e) {
            console.log("INVALID EXPR")
        }
    }
    return (
        <Box>
            <ToolPageParagraph text="LaTeX converter takes in mathematical expressions and outputs the equivalent expression in LaTeX syntax."/>
            <ToolPageParagraph text="Enter an expression:"/>
            <TextField
                placeholder="e.g. ax^2 + bx + c"
                sx={{minWidth: 300, mb: 2}}
                onChange={(e) => handleChange(e)}
            />
            <ToolPageParagraph text={`The converted LaTeX expression: ${tex}`}/>
            <ToolPageParagraph text="LaTeX preview:"/>
            <Typography sx={{fontSize: 20}}>
                {`$${tex}$`}
            </Typography>
            {/* <Typography>
                Tree:
            </Typography>
            <BinaryTree tree={[tree]}/> */}
        </Box>
    )
}

export default LatexConverter