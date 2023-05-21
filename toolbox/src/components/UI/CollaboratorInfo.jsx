import { Box, Typography } from "@mui/material"

function CollaboratorInfo() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 0.8,
            }}
        >
            <Typography
                sx={{
                    fontSize: 24,
                    fontFamily: 'Montserrat'
                }}
            >
                Collaborator Info
            </Typography>
            <Typography>PFP Placeholder</Typography>
            <Typography>Name</Typography>
            <Typography>About me</Typography>
            <Typography>LinkedIn link</Typography>
        </Box>
    )
}

export default CollaboratorInfo