import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
const CollapseCheckBox = (props) => {
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState([]);
	useEffect(() => {
		setOpen(props.initState);
	}, []);
	const handleClick = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	const handleAngle = () => {
		return open ? (
			<FontAwesomeIcon icon={faAngleUp} className="icon" />
		) : (
			<FontAwesomeIcon icon={faAngleDown} className="icon" />
		);
	};
	const handleCheck = (id) => {
		const currentIndex = checked.indexOf(id);

		const newChecked = [...checked];
		if (currentIndex === -1) {
			newChecked.push(id);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked([...newChecked]);
		props.handleFilters(checked);
	};
	const renderList = () => {
		return props.list
			? props.list.map((item) => (
					<ListItem style={{ padding: '10px 0' }} key={item._id}>
						<ListItemText primary={item.name} />
						<ListItemSecondaryAction>
							<Checkbox
								color="primary"
								onChange={() => handleCheck(item._id)}
								checked={checked.indexOf(item._id) !== -1 ? true : false}
							/>
						</ListItemSecondaryAction>
					</ListItem>
			  ))
			: null;
	};
	return (
		<div className="collapse_items_wrapper">
			<List style={{ borderBottom: '1px solid #dbdbdb' }}>
				<ListItem
					style={{ padding: '10px  23px 10px 0' }}
					onClick={handleClick}
				>
					<ListItemText primary={props.title} className="collapse_title" />
					{handleAngle}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List components="div" disablePadding>
						{renderList()}
					</List>
				</Collapse>
			</List>
		</div>
	);
};

export default CollapseCheckBox;
