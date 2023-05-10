import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IconButton, Typography, SvgIcon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { tools } from '../data';

function SideNavBar() {
    const [open, setOpen] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [path, setPath] = React.useState("")

    function toggleOn() {
        if(open) {return}
        console.log("Opening side nav bar")
        setOpen(true)
        setCategories(["Categories", "Maths", "Integration", "Integration by parts"])
        setPath('/tools')
    }

    function toggleOff() {
        if(!open) {return}
        console.log("Closing side nav bar")
        setOpen(false)
        setCategories([])
        setPath('')
    }

    const prevArrow = () => (
        <SvgIcon
            sx={{
                fontSize: 10,
                mx: 0.2,
                px: 0
            }}
        >
            <ArrowForwardIosIcon/>
        </SvgIcon>
    )
    const prevText = (text) => (
        <Typography
            sx={{
                mx: 0.5,
                px: 0,
                fontSize: 14,
            }}
        >
            {text}
        </Typography>
    )
    const prevPath = () => {
        const len = categories.length
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    mt: 5,
                    ml: 3,
                    width: "fit-content"
                }}
            >
                {len > 3 && (<>{prevText("...")}{prevArrow()}</>)}
                {len >= 3 && (<>{prevText(categories[len - 3])}{prevArrow()}</>)}
                {len >= 2 && (<>{prevText(categories[len - 2])}{prevArrow()}</>)}
            </Box>
        )
    }
    const heading = () =>  {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    minheight: 50,
                    ml: 3,
                    mt: .8
                }}
            >
                <Typography
                    sx={{
                        mr: 0,
                        p: 0,
                        fontSize: 20,
                        height: 'fit-content',
                        width: 'fit-content',
                        wordWrap: 'break-word',
                        fontWeight: 'bold'
                    }}
                >
                    {categories[categories.length - 1]}
                </Typography>
                <IconButton onClick={toggleOff}
                    sx={{
                        mr: 1.5,
                        ml: 2,
                        mt: .7
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>
        )
    }
    /*
    CONTENTS SHOULD HAVE
    - prevPath if path is longer than 1 i.e. just categories
    - heading that displays current category, and a button that goes to previous category (or close navbar if no previous)
    */
    const contents = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 300
            }}
        >
            {prevPath()}
            {heading()}
        </Box>
    )
    return (
            <div>
                <Button onClick={toggleOn}>Tools</Button>
                <Drawer
                    open={open}
                    onClose={toggleOff}
                >
                    {contents()}
                </Drawer>
            </div>
    )
}
export default SideNavBar

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}