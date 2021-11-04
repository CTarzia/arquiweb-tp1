import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button} from "@mui/material";

const GoBackButton = ({route}) => (
	<Link to={route}>
		<Button type="button"  >
			<ArrowBackIcon />
		</Button>
	</Link>
);

export default GoBackButton;