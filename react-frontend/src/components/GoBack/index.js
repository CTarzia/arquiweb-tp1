import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const GoBackButton = ({route}) => (
	<Link to={route}>
		<Button type="button">
			<HighlightOffIcon />
		</Button>
	</Link>
);

export default GoBackButton;
