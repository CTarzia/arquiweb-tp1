import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const GoBackButton = ({route}) => (
	<Link to={route}>
		<button type="button">
			<ArrowBackIosIcon />
		</button>
	</Link>
);

export default GoBackButton;