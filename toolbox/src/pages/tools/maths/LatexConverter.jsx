import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { BinaryTree } from '../../../components/BinaryTree';
import { exprToLatex } from '../../../components/Maths/LatexDisplay';
import { CopyableParagraph, SectionBox } from '../../../components/UI/DefaultLayout';
import { ToolPageParagraph, ToolPageSectionTitle } from '../../../components/UI/toolPage/ToolPageLayout';

/*
Page Content:
User input for math equation
*/
function LatexConverter() {
    const [tex, setTex] = React.useState('')
    const [tree, setTree] = React.useState({})
    const [delay, setDelay] = React.useState(1000)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [latexRendered, setLatexRendered] = React.useState('-')

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
        let input = event.target.value
        input = input.replaceAll(' ', '') // Getting rid of all spaces
        const latexObj = exprToLatex(input)
        if(latexObj.success) {
            setTex(latexObj.latex)
            setTree(latexObj.tree)
            setLatexRendered(`$${latexObj.latex}$`)
            setErrorMsg('')
        } else {
            setErrorMsg(latexObj.errorMsg)
            setLatexRendered('-')
            setTex('-')
        }
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <ToolPageParagraph text="LaTeX converter takes in mathematical expressions and outputs the equivalent expression in LaTeX syntax."/>
                <ToolPageParagraph text="Enter an expression:"/>
                <TextField
                    placeholder="e.g. ax^2 + bx + c"
                    sx={{maxWidth: 500,}}
                    onChange={(e) => handleChange(e)}
                />
            </SectionBox>
            <ToolPageSectionTitle title="Results"/>
            <SectionBox>
                <CopyableParagraph preText="The converted LaTeX expression: " copyableText={tex} copyable={tex !== '-'}/>
                {errorMsg !== '' && <ToolPageParagraph bold={true} text={errorMsg}/>}
                {errorMsg === '' &&
                    <>
                        <ToolPageParagraph text="LaTeX preview:"/>
                        <Typography sx={{fontSize: 20}}>
                            {latexRendered}
                        </Typography>
                    </>
                }
            </SectionBox>
            <ToolPageSectionTitle title="How to use & limitations"/>
            {/* <Typography>
                Tree:
            </Typography>
            <BinaryTree tree={[tree]}/> */}
        </Box>
    )
}

export default LatexConverter