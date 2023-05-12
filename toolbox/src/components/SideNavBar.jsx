import React from 'react';
import { Box, Drawer, Button, IconButton, Typography, SvgIcon, Divider, List } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { tools } from '../data';

function SideNavBar(props) {
	const inHeader = props.inHeader
    const [open, setOpen] = React.useState(false)
	const [namePath, setNamePath] = React.useState([])
    const [categories, setCategories] = React.useState([])
	const [curCategory, setCurCategory] = React.useState(tools)
	const [newPath, setNewPath] = React.useState("")
	const location = useLocation()

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
	const ToolsIcon = () => {
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
	const ToolsButton = () => (
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
			<ToolsIcon/>
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
    const PrevArrow = () => (
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
    const PrevText = (text) => (
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
    const PrevPath = () => {
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
                {len > 3 && (<>{PrevText("...")}{<PrevArrow/>}</>)}
                {len >= 3 && (<>{PrevText(namePath[len - 3])}{<PrevArrow/>}</>)}
                {len >= 2 && (<>{PrevText(namePath[len - 2])}{<PrevArrow/>}</>)}
            </Box>
        )
    }
	const CurCategory = () => (
		<Typography
			sx={{
				mr: 0,
				p: 0,
				fontSize: 20,
				wordWrap: 'break-word',
				fontFamily: 'Montserrat',
				color: 'black',
				fontWeight: 'bold'
			}}
		>
			{categories.length > 0 ? curCategory.displayName : "Categories"}
		</Typography>
	)
	const HeadingButton = () => (
		<IconButton onClick={toggleOff}
			sx={{
				alignSelf: 'flex-end',
				p: 2,
				color: 'black'
			}}
		>
			<CloseIcon />
		</IconButton>
	)
    const Heading = () =>  (
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
				<CurCategory/>
				<HeadingButton/>
			</Box>
			<Divider/>
		</Box>
	)
	
	const Tools = () => (
		<></>
	)
	function clickCategory(key, value) {
		console.log("Clicked " + key)
		console.log(value)
		setNewPath(`${newPath}/${key}`)
		const newCat = curCategory.subCategories[key]
		setCurCategory(newCat)
		setCategories((prevCategories) => [...prevCategories, key])
		setNamePath((prevNamePath) => [...prevNamePath, value.displayName])
	}
	const SubCategories = () => (
		<List
			sx={{
				py: 2
			}}
		>
			{
				Object.entries(curCategory.subCategories).map((entry) => (
					<ListItemButton
						onClick={() => clickCategory(entry[0], entry[1])}
						key={entry[0]}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							px: 0,
						}}
					>
						<ListItemText
							sx={{
								ml: 3,
								color: '#343a40',
								fontFamily: 'Montserrat',
							}}
						>
							{entry[1].displayName}
						</ListItemText>
						<ListItemIcon>
							<ArrowForwardIosIcon
								sx={{
									fontSize: 16,
									alignSelf: 'flex-start',
									mr: 3,
									p: 1,
									color: '#495057'
								}}
							/>
						</ListItemIcon>
					</ListItemButton>
				))
			}
		</List>
	)
    /*
    Contents SHOULD HAVE
    - PrevPath if path is longer than 1 i.e. just categories
    - Heading that displays current category, and a button that goes to previous category (or close navbar if no previous)
	- Available tools in current category
	- Subcategories of current category
    */
    const Contents = () => (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: 300
			}}
		>
			<PrevPath/>
			<Heading/>
			<Tools/>
			{curCategory.subCategories && <SubCategories/>}
		</Box>
    )
    return (
        	<Box
				sx={{
					my: 'auto'
				}}
			>
                <ToolsButton/>
                <Drawer
                    open={open}
                    onClose={toggleOff}
                >
                    <Contents/>
                </Drawer>
            </Box>
    )
}
export default SideNavBar