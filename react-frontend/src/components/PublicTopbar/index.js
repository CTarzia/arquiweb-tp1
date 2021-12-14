import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";

import { UserContext } from "../../context";
import { ROUTES } from "../../constants/routes";

import styles from "./styles.module.scss";

const PublicTopbar = ({
	withGoBack,
	title,
	withRefresh,
	refreshFunction,
	history,
}) => {
	const { setUserId, setUserName, setRestaurantId, setRestaurant } =
		useContext(UserContext);

	const handleLogOut = () => {
		setUserId(null);
		setUserName(null);
		setRestaurantId(null);
		setRestaurant({});
		history.push(ROUTES.LOGIN);
	};

	return (
		<div className={styles.title}>
			<h1> {title} </h1>
			<div className={styles.content}>
				{withRefresh && (
					<button onClick={refreshFunction} className={styles.button}>
						<RefreshIcon />
					</button>
				)}
				{withGoBack && (
					<Link to={ROUTES.BACKOFFICE_HOME}>
						<button className={styles.button}>
							<CloseIcon />
						</button>
					</Link>
				)}
				<button onClick={handleLogOut} className={styles.button}>
					<LogoutIcon />
				</button>
			</div>
		</div>
	);
};

export default PublicTopbar;
