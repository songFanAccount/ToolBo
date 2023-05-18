import { Box, TextField } from '@mui/material';
import React from 'react';
import { parse, evaluate } from 'mathjs';
import LatexDisplay from '../../../../components/Maths/LatexDisplay';

/*
Expression parser
Displaying results
Working out with detailed explanation
Detailing the method used
Additional info on tool - what level / when it is expected to be used
*/
export default function StationaryPoints() {
    const [tex, setTex] = React.useState('')

    function handleChange(event) {
        try {
            const parsed = parse(event.target.value)
            console.log(parsed)
            console.log(evaluate(event.target.value))
        } catch(e) {
            console.log("INVALID EXPR")
        }
        setTex(`${event.target.value}`)
    }
    return (
        <Box>
            <TextField
                sx={{minWidth: 'fit-content', width:1000}}
                onChange={(e) => handleChange(e)}
            />
            <LatexDisplay mathExpr={tex}/>
        </Box>
    )
}

// const data = "When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]";
//   const [tex, setTex] =React.useState('')

//   React.useEffect(()=>{
//     if( typeof window?.MathJax !== "undefined"){
//       window.MathJax.typesetClear()
//       window.MathJax.typeset()
//     }
//   },[tex])

//   return (
//     <div>
//       <h2>Integrating MathJax v3 in React</h2>
//       <p>{data}</p>
//       <span>Input Latex Here </span>
//       <input onChange={(e)=> {
//         setTex(e.target.value) }}/>
//       <h4>Rendered Latex : </h4>
//       <p>{tex}</p>
//     </div>
//   );

// }