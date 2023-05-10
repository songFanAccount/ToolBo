import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function SideNavBar() {
    const [open, setOpen] = React.useState(false)
    const [currCategory, setCurrCategory] = React.useState("")
    const [path, setPath] = React.useState("")

    function toggleOn() {
        if(open) {return}
        console.log("Opening side nav bar")
        setOpen(true)
        setCurrCategory("Categories")
        setPath('/tools')
    }

    function toggleOff() {
        if(!open) {return}
        console.log("Closing side nav bar")
        setOpen(false)
        setCurrCategory("")
        setPath('')
    }

    const heading = () => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'transparent'
            }}
        >
            <Typography
                sx={{
                    mt: 2.5,
                    ml: 3,
                    fontSize: 25
                }}
            >
                {currCategory}
            </Typography>
            <IconButton onClick={toggleOff}
                sx={{
                    mt: 2.5,
                    mr: 1
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>
        </Box>
    )
    const contents = () => (
        <Box
            sx={{
                width: 300
            }}
        >
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