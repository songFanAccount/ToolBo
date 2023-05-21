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
                    fontSize: 16,
                    fontFamily: 'Ubuntu',
                    p: 0.6,
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
                width: 0.8,
                pb: 2
            }}
        >
            <Typography
                sx={{
                    fontSize: 24,
                    fontFamily: 'Montserrat'
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
                <ListLink text="Important notes and advice"/>
                <ListLink text="What it can be used for"/>
                <ListLink text="How it works"/>
                <ListLink text="Why it works"/>
            </List>
        </Box>
    )
}

export default ToolPageNav