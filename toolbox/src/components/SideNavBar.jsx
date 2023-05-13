import React from 'react';
import { Box, Drawer, IconButton, Typography, SvgIcon, Divider, List } from '@mui/material';
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
		setNamePath([])
    }
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
        const len = namePath.length
        return (
            <Box
                sx={{
					display: 'flex',
					alignItems: 'flex-end',
                    width: "100%",
					height: 55,
					maxHeight: 55
                }}
            >
				<Box
					sx={{
						display: "flex",
						alignItems: 'center',
						ml: 3,
						maxWidth: "100%",
						maxHeight: "100%"
					}}
				>
					{len > 3 && (<>{PrevText("...")}{<PrevArrow/>}</>)}
					{len >= 3 && (<>{PrevText(namePath[len - 3])}{<PrevArrow/>}</>)}
					{len >= 2 && (<>{PrevText(namePath[len - 2])}{<PrevArrow/>}</>)}
				</Box>
            </Box>
        )
    }
	const CurCategory = () => (
		<Typography
			sx={{
				mr: 0,
				p: 0,
				fontSize: 20,
				width: '80%',
				whiteSpace: 'normal',
				fontFamily: 'Montserrat',
				color: 'black',
				fontWeight: 'bold'
			}}
		>
			{categories.length > 0 ? curCategory.displayName : "Categories"}
		</Typography>
	)

	function toPrevCategory() {
		setNamePath(namePath.slice(0, -1))
		console.log(namePath)
		setCategories(categories.slice(0, -1))
		console.log(categories)
		let paths = newPath.split('/')
		paths.pop()
		console.log(paths)
		setNewPath(paths.join('/'))
		console.log(newPath)
		let newCat = tools
		for(let i = 2; i < paths.length; i++) {
			newCat = newCat.subCategories[paths[i]]
		}
		setCurCategory(newCat)
		console.log(curCategory)
	}
	const HeadingButton = () => {
		const isBack = categories.length > 0
		return (
			<Box
				sx={{
					width: '20%',
				}}
			>
				<IconButton onClick={isBack ? toPrevCategory : toggleOff}
					sx={{
						alignSelf: 'flex-end',
						py: 2,
						pl: isBack ? 3 : 2,
						pr: isBack ? 1 : 2,
						ml: 1,
						color: 'black'
					}}
				>
					{isBack ? <ArrowBackIosIcon sx={{fontSize: 24}}/> : <CloseIcon sx={{fontSize: 26}}/>}
				</IconButton>
			</Box>
		)
	}
    const Heading = () =>  (
		<Box>
			<Box
				sx={{
					display: 'flex',
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
		<List
			sx={{

			}}
		>
			{
				Object.entries(curCategory.tools).map((entry) => (
					<ListItemButton>
						<ListItemText>
							{entry[1]}
						</ListItemText>
					</ListItemButton>
				))
			}
		</List>
	)
	function clickCategory(key, value) {
		console.log("Clicked " + key)
		console.log(value)
		setNewPath(`${newPath}/${key}`)
		const newCat = curCategory.subCategories[key]
		setCurCategory(newCat)
		setCategories((prevCategories) => [...prevCategories, key])
		setNamePath((prevNamePath) => [...prevNamePath, value.displayName])
		console.log(namePath)
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
				width: 350
			}}
		>
			<PrevPath/>
			<Heading/>
			{curCategory.tools && <Tools/>}
			{curCategory.subCategories && <SubCategories/>}
		</Box>
    )
	const ToolsIcon = () => {
		const sx = {
			fontSize: 40,
			m: 0,
			p: 0
		}
		if(inHeader) {
			sx.color = '#fdfffc'
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
		<IconButton 
			onClick={toggleOn}
			role="navigation"
			sx={{
				color: 'black',
				p: 1,
				mt: inHeader ? 0 : 3,
				borderRadius: 0
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
		</IconButton>
	)
    return (
        	<Box
				sx={{
					my: 'auto'
				}}
			>
				<Box 
					sx={{
						ml: 2.5
					}}
				>
					<ToolsButton/>
				</Box>
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