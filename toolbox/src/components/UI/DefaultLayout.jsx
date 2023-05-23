import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function DefaultLayout() {
    /*
    use dimX to determine which version to render (mobile, desktop etc)
    0 -> smallest
    1 -> ipad/desktop?
    */
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    // MAYBE TODO: Add new dimX = 2 for min-width:900px
    return (
        <>
            <Box className="Background"
                sx={{
                    position: 'fixed',
                    width: 'calc(100vw + 10px)',
                    overflowX: 'clip',
                    height: '100vh',
                    backgroundColor: '#eeeeee',
                    zIndex: -1
                }}
            />
            <Box className="defaultLayout"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: 'calc(100vw+10px)',
                    overflowX: 'clip',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 8,
                }}
            >
                <Header dimX={dimX}/>
            </Box>
            <Outlet/>
        </>
    )
}

export default DefaultLayout

export function SectionBox(props) {
    const showBorder = !props.noBorder
    return (
        <Box
            sx={{
                ml: showBorder ? 1.5 : 0,
                mb: 3,
                pl: showBorder ? 2 : 0,
                py: showBorder ? 1.5 : 0,
                borderLeft: showBorder ? 2 : 0,
                borderColor: '#AEAEAE',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
                width: 'fit-content'
            }}
        >
            {props.children}
        </Box>
    )
}
export function CopyableParagraph({preText, copyableText, copyable}) {
    return (
        <Box
            sx={{display: 'flex', alignItems: 'center'}}
        >
            <Typography
                sx={{fontFamily: 'Verdana',}}
            >
                {preText + copyableText}
            </Typography>
            {copyable && 
                <IconButton onClick={() => navigator.clipboard.writeText(copyableText)}>
                    <ContentCopyIcon
                        sx={{fontSize: 20, color: 'black'}}
                    />
                </IconButton>
            }
        </Box>
    )
}