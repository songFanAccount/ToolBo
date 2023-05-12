import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IconButton, Typography, SvgIcon, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { tools } from '../data';

function SideNavBar(props) {
	const inHeader = props.inHeader
    const [open, setOpen] = React.useState(false)
	const [namePath, setNamePath] = React.useState([])
    const [categories, setCategories] = React.useState([])
	const [curCategory, setCurCategory] = React.useState(tools)
	const [newPath, setNewPath] = React.useState("")
	const location = useLocation()
	console.log(location.pathname)

	function processCurPath() {
		const curPath = location.pathname
		if(curPath.startsWith('/tools')) {
			setNewPath(curPath)
			const routes = "/tools/maths/integration".split("/")
			console.log(routes)
			let cat = tools
			let cats = []
			let names = ['Categories']
			for(let i = 2; i < routes.length; i++) {
				cat = cat[routes[i]]
				cats.push(routes[i])
				names.push(cat.displayName)
			}
			setCurCategory(cat)
			setCategories(cats)
			setNamePath(names)
		} else {
			setNewPath('/tools')
			setCurCategory(tools)
			setCategories([])
			setNamePath(['Categories'])
		}
	}
    function toggleOn() {
        if(open) {return}
        console.log("Opening side nav bar")
        setOpen(true)
		processCurPath()
    }

    function toggleOff() {
        if(!open) {return}
        console.log("Closing side nav bar")
        setOpen(false)
        setCategories([])
		setNewPath("")
    }
	const toolsIcon = () => {
		const sx = {
			fontSize: 40
		}
		if(inHeader) {
			sx.color = '#fdfffc'
			sx.my = 'auto'
		}
		return (
			<ConstructionSharpIcon
				aria-hidden='false'
				aria-label='Tools Menu'
				sx={sx}
			/>
		)
	}
	const toolsButton = () => (
		<Button 
			onClick={toggleOn}
			role="navigation"
			sx={{
				color: 'black',
				p: 0,
				mt: inHeader ? 0 : 3,
				ml: 3,
			}}
		>
			{toolsIcon()}
			{!inHeader && 
				<Typography
					sx={{
						ml: .5,
						fontSize: 20,
						fontFamily: 'Montserrat'
					}}
				>
					Tools
				</Typography>
			}
		</Button>
	)
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
                {len >= 3 && (<>{prevText(namePath[len - 3])}{prevArrow()}</>)}
                {len >= 2 && (<>{prevText(namePath[len - 2])}{prevArrow()}</>)}
            </Box>
        )
    }
	const getCurCategory = () => (
		categories.length > 0 ? curCategory.displayName : "Categories"
	)
    const heading = () =>  (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: 'transparent',
					minheight: 50,
					ml: 3,
					mr: 2,
					mt: .8,
					mb: 2
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
						fontFamily: 'Montserrat',
						color: 'black',
						fontWeight: 'bold'
					}}
				>
					{getCurCategory()}
				</Typography>
				<IconButton onClick={toggleOff}
					sx={{
						alignSelf: 'flex-end',
						p: 2,
						color: 'black'
					}}
				>
					<CloseIcon />
				</IconButton>
			</Box>
			<Divider/>
		</Box>
	)
	// <categories.length > 0 && curCategory.tools 
	// ?
	// 	curCategory.tools.map((tool) => (
	// 		<></>
	// 	))
	// :
	// 	<></>>
	const getTools = () => (
		<></>
	)
	function ClickCategory(key, value) {
		console.log("Clicked " + key)
		console.log(value)
		setNewPath(`${newPath}/${key}`)
		const newCat = curCategory.subCategories[key]
		setCurCategory(newCat)
		setCategories((prevCategories) => [...prevCategories, key])
		setNamePath((prevNamePath) => [...prevNamePath, value.displayName])
	}
	const getSubcategories = () => (
		<List
			sx={{
				py: 2
			}}
		>
			{
				Object.entries(curCategory.subCategories).map((entry) => (
					<ListItemButton
						onClick={() => ClickCategory(entry[0], entry[1])}
						key={entry[0]}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							px: 0,
						}}
					>
						<Typography
							sx={{
								ml: 3,
								color: '#343a40',
								fontFamily: 'Montserrat',
							}}
						>{entry[1].displayName}</Typography>
						<ArrowForwardIosIcon
							sx={{
								fontSize: 16,
								alignSelf: 'flex-start',
								mr: 3,
								p: 1,
								color: '#495057'
							}}
						/>
					</ListItemButton>
				))
			}
		</List>

		// curCategory.subCategories
		// ?
		// 	<List>
		// 		Object.keys(curCategory.subCategories).forEach(function(key) {
		// 			console.log("hello")
		// 		})
		// 	</List>
		// :
		// 	<></>
	)
    /*
    CONTENTS SHOULD HAVE
    - prevPath if path is longer than 1 i.e. just categories
    - heading that displays current category, and a button that goes to previous category (or close navbar if no previous)
	- Available tools in current category
	- Subcategories of current category
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
			{getTools()}
			{curCategory.subCategories && getSubcategories()}
		</Box>
    )
    return (
        	<Box
				sx={{
					my: 'auto'
				}}
			>
                {toolsButton()}
                <Drawer
                    open={open}
                    onClose={toggleOff}
                >
                    {open && contents()}
                </Drawer>
            </Box>
    )
}
export default SideNavBar

/*
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
*/