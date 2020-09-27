import React, { useState, useEffect } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const CollapseRadio = (props) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('0');
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
	const handleChange = (event) => {
		setValue(event.target.value);
		props.handleFilters(event.target.value);
	};
	const renderList = () => {
		return props.list
			? props.list.map((item) => (
					<FormControlLabel
						key={item._id}
						value={`${item._id}`}
						control={<Radio />}
						label={item.name}
					/>
			  ))
			: null;
	};
	return (
		<div>
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
						<RadioGroup
							aria-Label="prices"
							onChange={handleChange}
							value={value}
							name="prices"
						>
							{renderList()}
						</RadioGroup>
					</List>
				</Collapse>
			</List>
		</div>
	);
};

export default CollapseRadio;
