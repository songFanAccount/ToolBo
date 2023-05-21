import { Box, Typography } from '@mui/material';

function Home() {
    const boxStyle = {
        height: 2000,
        border: 0
    }
    return (
        <Box sx={boxStyle}> 
            <Typography>Home Page</Typography>
        </Box>
    )
}

export default Home