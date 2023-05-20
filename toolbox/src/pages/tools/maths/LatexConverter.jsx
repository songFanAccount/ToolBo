import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { BinaryTree } from '../../../components/BinaryTree';
import { exprToLatex } from '../../../components/Maths/LatexDisplay';

/*
Page Content:
User input for math equation
*/
function LatexConverter() {
    const placeholder = ''
    const [tex, setTex] = React.useState(placeholder)
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
            let input = event.target.value === '' ? placeholder : event.target.value
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
            <TextField
                placeholder={placeholder}
                sx={{minWidth: 'fit-content', width:1}}
                onChange={(e) => handleChange(e)}
            />
            <p>Latex produced:</p>
            <Typography>
                {tex}
            </Typography>
            <p>Latex rendered:</p>
            <Typography sx={{}}>
                {`$${tex}$`}
            </Typography>
            <Typography>
                Tree:
            </Typography>
            <BinaryTree tree={[tree]}/>
        </Box>
    )
}

export default LatexConverter