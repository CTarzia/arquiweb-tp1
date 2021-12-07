import React, { useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Dialog, DialogTitle, Typography, Box } from "@mui/material";
import { CircularProgress } from "@mui/material";

import PublicTopbar from "../../components/PublicTopbar";
import { UserContext } from "../../context";
import { ROUTES } from "../../constants/routes";

import UploadImages from "./UploadImages";
import FetchTables from "./FetchTables";

import GeneralInformation from "./components/GeneralInformation";
import styles from "./styles.module.scss";

// pruebaLunes2

const RestaurantManagment = ({ history }) => {
	const { userId, restaurantId, restaurant, setRestaurant } =
		useContext(UserContext);

	const [generalDialogOpen, setGeneralDialogOpen] = useState();
	const [values, setValues] = useState({
		name: restaurant.name,
		workingHours: restaurant.workingHours,
		phoneNumber: restaurant.phoneNumber,
		latitude: restaurant.latitude,
		longitude: restaurant.longitude,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!userId || !restaurantId) {
			history.push(ROUTES.LOGIN);
		}
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setLoading(true);
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	console.log(restaurant);

	const handleEdit = (key) => setGeneralDialogOpen(key);

	const handleEditAddress = () => console.log("address");

	const handleCloseDialogs = () => setGeneralDialogOpen(null);

	return (
		<div className={styles.container}>
			<PublicTopbar
				title={`Gestionar: ${restaurant.name}`}
				history={history}
				withGoBack
			/>
			<div className={styles.content}>
				<GeneralInformation
					restaurant={restaurant}
					handleEdit={handleEdit}
					handleEditAddress={handleEditAddress}
				/>
				<Dialog open={generalDialogOpen} onClose={handleCloseDialogs}>
					<DialogTitle>Editar informacion</DialogTitle>
					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.input}>
							<input
								type="text"
								name={generalDialogOpen}
								id={generalDialogOpen}
								onChange={handleChange}
								placeholder={restaurant[generalDialogOpen]}
							/>
						</div>

						<button
							className={loading ? styles.disabledButton : styles.button}
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? (
								<CircularProgress classes={{ root: styles.progress }} />
							) : (
								"Aceptar"
							)}
						</button>
					</form>
				</Dialog>
			</div>

			{/* <div className={styles.managementSection}>
				<div>
					<div className={styles.info}>
						<p>nombre del local:</p>
						<p>horarios:</p>
						<p>datos de contacto:</p>
						<p>direccion:</p>
					</div>

					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						sx={{ borderRight: 1, borderColor: "divider" }}
					>
						<Tab label="Editar Logo" {...a11yProps(0)} />
						<Tab label="Editar Carta" {...a11yProps(1)} />
						<Tab label="Editar Fotos" {...a11yProps(2)} />
						<Tab label="Gestionar Mesas" {...a11yProps(3)} />
					</Tabs>
				</div>

				<div className={styles.rectangleOfDeath}>
					<TabPanel value={value} index={0}>
						Editar logo...
					</TabPanel>
					<TabPanel value={value} index={1}>
						Editar carta...
					</TabPanel>
					<TabPanel value={value} index={2}>
						<UploadImages restaurantId={restaurantId} />
					</TabPanel>
					<TabPanel value={value} index={3}>
						<FetchTables restaurantId={restaurantId} />
					</TabPanel>
				</div>
			</div> */}
		</div>
	);
};

export default RestaurantManagment;

// function TabPanel(props) {
// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={value !== index}
// 			id={`vertical-tabpanel-${index}`}
// 			aria-labelledby={`vertical-tab-${index}`}
// 			{...other}
// 		>
// 			{value === index && (
// 				<Box sx={{ p: 3 }}>
// 					<Typography>{children}</Typography>
// 				</Box>
// 			)}
// 		</div>
// 	);
// }

// function a11yProps(index) {
// 	return {
// 		id: `vertical-tab-${index}`,
// 		"aria-controls": `vertical-tabpanel-${index}`,
// 	};
// }
// const [value, setValue] = React.useState(0);
// const handleChange = (event, newValue) => {
// 	setValue(newValue);
// };
