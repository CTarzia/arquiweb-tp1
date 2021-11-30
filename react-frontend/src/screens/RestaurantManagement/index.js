import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./styles.module.scss";
import GoBackButton from "../../components/GoBack";
import { ROUTES } from "../../constants/routes";
import { Button, ButtonGroup, Typography, Box } from "@mui/material";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import UploadImages from "./UploadImages";
import FetchTables from "./FetchTables";

const RestaurantManagment = () => {
	const [restaurantName, setRestaurantName] = useState();
	const [statusError, setStatusError] = useState(false);
	const [restaurantLoading, setRestaurantLoading] = useState(false);

	const { restoId: restaurantId } = useParams();

	useEffect(() => {
		fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}`)
			.then((res) => res.json())
			.then((json) => {
				if (json.status === 404) {
					setStatusError(true);
					setRestaurantName("Su restaurante no ha sido encontrado.");
				} else {
					setRestaurantName(json.name);
					setRestaurantLoading(true)
				}
			});
	}, []);
	//TABS

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	function a11yProps(index) {
		return {
			id: `vertical-tab-${index}`,
			'aria-controls': `vertical-tabpanel-${index}`,
		};
	}
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		restaurantLoading ? (
		<div>
			<div className={styles.titleContainer}>
				<Typography variant="h3" component="h1">{restaurantName}</Typography>
				<GoBackButton route={ROUTES.HOME} />
			</div>
			<Typography verient="h5" className={styles.subtitle}>
				<h4>Gestion del local</h4>
			</Typography>

			<div className={styles.managementSection}>
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
						sx={{ borderRight: 1, borderColor: 'divider' }}
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
						<UploadImages
							restaurantId={restaurantId}
						/>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<FetchTables
							restaurantId={restaurantId}
						/>
					</TabPanel>

				</div>
			</div>
		</div>
		):(
			<div> Recuperando información del restaurante.</div>
		)
	);
};

export default RestaurantManagment;