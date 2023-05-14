import { Box, TextField } from "@mui/material";

function MathsExpressionParser(props) {
    return (
        <Box
            sx={props.sx}
        >
            <TextField
                placeholder="Enter your expression here!"
                sx={{
                    width: 1
                }}
            />
        </Box> 
    )
}

export default MathsExpressionParser