import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

function Home() {
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Box> 
                <Typography>Home Page</Typography>
            </Box>
        </>  
    )
}

export default Home