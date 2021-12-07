import React, { useContext, useEffect, useState } from "react";
import { CardMedia } from "@mui/material";

import PublicTopbar from "../../components/PublicTopbar";
import { UserContext } from "../../context";
import { ROUTES } from "../../constants/routes";

import GeneralInformation from "./components/GeneralInformation";
import UpdateAddressInformationDialog from "./components/UpdateAddressInformationDialog";
import UpdateGeneralInformationDialog from "./components/UpdateGeneralInformationDialog";
import styles from "./styles.module.scss";

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
	const [menuUrl, setMenuUrl] = useState();
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		if (!userId || !restaurantId) {
			history.push(ROUTES.LOGIN);
		}

		fetch(`https://ver-la-carta.herokuapp.com/carta/${restaurantId}`)
			.then((response) => {
				if (response.status === 404) {
					return "error";
				}
				return response.blob();
			})
			.then((image) => {
				console.log(image);
				if (image !== "error") {
					const localUrl = URL.createObjectURL(image);
					setMenuUrl(localUrl);
				}
			});
	}, []);

	const handleSubmitGeneralInfo = (evt) => {
		evt.preventDefault();
		setLoading(true);
		fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurantId}`, {
			method: "PUT",
			body: JSON.stringify({ ...values }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setRestaurant(json);
				handleCloseDialogs(false);
			});
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setValues((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleEdit = (key) => setGeneralDialogOpen(key);

	const handleEditAddress = () => setGeneralDialogOpen("address");

	const handleCloseDialogs = () => {
		setGeneralDialogOpen(null);
		setLoading(false);
	};

	const fileToDataUri = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.readAsDataURL(file);
		});

	const onShowMenu = () => setShowMenu(!showMenu);

	const onUploadMenu = (file) => {
		let method = "PUT";
		if (!menuUrl) {
			method = "POST";
		}

		fileToDataUri(file).then((dataUri) => {
			setMenuUrl(dataUri);
		});

		const data = new FormData();
		data.append("file", file);

		fetch(`https://ver-la-carta.herokuapp.com/carta/${restaurantId}`, {
			method,
			body: data,
		})
			.then((res) => {
				console.log(res);
			})
			.catch(setMenuUrl(null));
	};

	return (
		<div className={styles.container}>
			<PublicTopbar
				title={`Gestionar: ${restaurant.name}`}
				history={history}
				withGoBack
			/>
			<div className={styles.content}>
				<div className={styles.leftContent}>
					<GeneralInformation
						restaurant={restaurant}
						handleEdit={handleEdit}
						handleEditAddress={handleEditAddress}
					/>
					<UpdateGeneralInformationDialog
						generalDialogOpen={generalDialogOpen}
						handleCloseDialogs={handleCloseDialogs}
						handleSubmit={handleSubmitGeneralInfo}
						handleChange={handleChange}
						values={values}
						loading={loading}
					/>
					<UpdateAddressInformationDialog
						generalDialogOpen={generalDialogOpen}
						handleCloseDialogs={handleCloseDialogs}
						handleSubmit={handleSubmitGeneralInfo}
						handleChange={handleChange}
						values={values}
						loading={loading}
					/>
					<div>
						<div className={styles.menuContainer}>
							{menuUrl && (
								<button
									className={styles.uploadImageButton}
									onClick={onShowMenu}
								>
									Ver carta
								</button>
							)}
							<label className={styles.uploadImage} for="upload-menu">
								{menuUrl ? "Editar carta" : "Subir carta"}
							</label>
							<input
								style={{ display: "none" }}
								id="upload-menu"
								name="upload-menu"
								type="file"
								onChange={(event) =>
									onUploadMenu(event.target.files[0] || null)
								}
							/>
						</div>
					</div>
				</div>
				<div className={styles.rightContent}>
					<div className={styles.showMenu}>
						{menuUrl && showMenu && (
							<CardMedia
								component="img"
								height="400"
								width="400"
								image={menuUrl}
								alt="img reastaurant"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RestaurantManagment;
