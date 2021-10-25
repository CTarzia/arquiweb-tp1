import React from "react";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const GoBackButton = ({route}) => (
	<Link to={route}>
		<button type="button">
			<HighlightOffIcon />
		</button>
	</Link>
);

export default GoBackButton;
