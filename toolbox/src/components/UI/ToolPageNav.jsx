import { Box, List, ListItem, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function ToolPageNav() {
    const ListLink = ({text}) => {
        return (
            <ListItem
                component={Link}
                to="/about"
                sx={{
                    display: 'list-item',
                    width: 'fit-content',
                    color: 'black',
                    fontSize: 18,
                    fontFamily: 'Ubuntu',
                    pt: 0.6,
                    px: 0,
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}
            >
                {text}
            </ListItem>
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 1,
                backgroundColor: '#c9e8f2'
            }}
        >
            <Typography
                sx={{
                    fontSize: 24,
                    fontFamily: 'Montserrat',
                    mt: 1,
                    ml: 1
                }}
            >
                Core sections:
            </Typography>
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    listStyleType: 'square',
                    pl: 4,
                }}
            >
                <ListLink text="The Tool"/>
                <ListLink text="How to use"/>
                <ListLink text="Notes and advice"/>
                <ListLink text="How it works"/>
                <ListLink text="Why it works"/>
            </List>
        </Box>
    )
}

export default ToolPageNav