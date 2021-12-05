import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import styles from "./styles.module.scss";

const RestaurantInfo = ({ restaurant, isOpen, handleClose }) => {
	const [restaurantLoading, setRestaurantLoading] = useState(false);
	const [imagesLoading, setImagesLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	const onHandleClose = () => {
		setPhotos([]);
		handleClose();
	};

	useEffect(() => {
		if (restaurant && restaurant.id) {
			fetch(`https://ver-la-carta.herokuapp.com/restaurantes/${restaurant.id}/`)
				.then((res) => res.json())
				.then((json) => {
					if (json.status === 404) {
						onHandleClose();
					} else {
						setRestaurantLoading(true);
					}
				});

			const fetchImages = (imageId) => {
				fetch(`https://ver-la-carta.herokuapp.com/imagen/${imageId}/`)
					.then((response) => response.blob())
					.then((image) => {
						const localUrl = URL.createObjectURL(image);
						setPhotos((photos) => [...photos, { url: localUrl, id: imageId }]);
						setImagesLoading(true);
					});
			};

			fetch(`https://ver-la-carta.herokuapp.com/imagen/resto/${restaurant.id}/`)
				.then((response) => response.json())
				.then((imageIds) => {
					imageIds.map(fetchImages);
				});
		}
	}, [restaurant]);

	return restaurantLoading ? (
		<div className={isOpen ? styles.container : styles.closedContainer}>
			<div className={styles.title}>
				<h2 variant="h4" component="h2">
					{restaurant.name}
				</h2>
				<button onClick={onHandleClose} className={styles.button}>
					X
				</button>
			</div>
			<div>
				<p>Horario de atención: {restaurant.workinghours}</p>
				<p>Teléfono de contacto: {restaurant.phoneNumber}</p>
			</div>
			<div>
				{imagesLoading ? (
					<div>
						<ImageList
							sx={{ width: 340, height: 280 }}
							cols={2}
							rowHeight={280}
						>
							{photos.map((item) => (
								<ImageListItem key={item.url}>
									<img src={item.url} alt={item.id} loading="lazy" />
								</ImageListItem>
							))}
						</ImageList>
					</div>
				) : (
					<div>Recuperando imágenes de su restaurante...</div>
				)}
			</div>
			<div>
				<ButtonGroup>
					<Button
						variant="text"
						href={`http://localhost:3000/menu/${restaurant.id}`}
					>
						Ver Carta
					</Button>
					<Button
						variant="text"
						href={`/restaurante/${restaurant.id}/hacer_pedido`}
					>
						Hacer Pedido
					</Button>
				</ButtonGroup>
			</div>
		</div>
	) : (
		<div className={isOpen ? styles.container : styles.closedContainer}>
			Recuperando información del restaurante.
		</div>
	);
};

export default RestaurantInfo;
