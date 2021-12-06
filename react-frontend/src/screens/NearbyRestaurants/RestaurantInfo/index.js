import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import styles from "./styles.module.scss";

const RestaurantInfo = ({ restaurant, isOpen, handleClose }) => {
	const [imagesLoading, setImagesLoading] = useState(false);
	const [photos, setPhotos] = useState([]);

	const onHandleClose = () => {
		setPhotos([]);
		handleClose();
	};

	useEffect(() => {
		if (restaurant && restaurant.id) {
			const fetchImages = (imageId) => {
				fetch(`https://ver-la-carta.herokuapp.com/imagen/${imageId}/`)
					.then((response) => response.blob())
					.then((image) => {
						const localUrl = URL.createObjectURL(image);
						setPhotos((photos) => [...photos, { url: localUrl, id: imageId }]);
						setImagesLoading(true);
					});
			};

			fetch(
				`https://ver-la-carta.herokuapp.com/imagen/resto/${restaurant.id}/`
			)
				.then((response) => response.json())
				.then((imageIds) => {
					imageIds.map(fetchImages);
				});
		}
	}, [restaurant]);

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>
					<h2>{restaurant?.name}</h2>
					<button onClick={onHandleClose} className={styles.closeButton}>
						X
					</button>
				</div>
				<div className={styles.infoContainer}>
					<LocalPhoneIcon className={styles.icon} />
					<span className={styles.label}> {restaurant?.phoneNumber} </span>
				</div>
				<div className={styles.infoContainer}>
					<AccessTimeIcon className={styles.icon} />
					<span className={styles.label}>{restaurant?.workingHours} </span>
				</div>
				<div>
					{imagesLoading ? (
						<div>
							<ImageList
								sx={{ width: 330, height: 280 }}
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
			</div>
			<div className={styles.buttonContainers}>
				<Link to={`/menu/${restaurant?.id}`}>
					<button className={styles.button}> Ver Menu </button>
				</Link>
				<Link
					to={`/restaurante/${restaurant?.id}/hacer_pedido?nombre=${restaurant?.name}`}
				>
					<button className={styles.button}> Hacer Pedido </button>
				</Link>
			</div>
		</div>
	);
};

export default RestaurantInfo;
