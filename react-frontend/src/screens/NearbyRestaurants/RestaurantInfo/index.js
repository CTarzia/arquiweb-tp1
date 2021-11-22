import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Typography, } from "@mui/material";
import Paper from '@mui/material/Paper';
import DisplayImages from '../../RestaurantManagement/DisplayImages';
import UploadImages from '../../RestaurantManagement/UploadImages';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const RestaurantInfo = ({ restoId: restaurantId }) => {
    const [restaurantName, setRestaurantName] = useState();
    const [info, setInfo] = useState();
    const [statusError, setStatusError] = useState(false);
    const [restaurantLoading, setRestaurantLoading] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/restaurantes/${restaurantId}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.status === 404) {
                    setStatusError(true);
                    setRestaurantName("Su restaurante no ha sido encontrado.");
                } else {
                    setRestaurantName(json.name);
                    setInfo(json)
                    setRestaurantLoading(true)
                }
            });

        const fetchImages = imageId => {
            fetch(`http://localhost:8080/imagen/${imageId}`)
                .then(response => response.blob())
                .then(image => {
                    // Create a local URL of that image
                    const localUrl = URL.createObjectURL(image);
                    setPhotos(photos => [...photos, { url: localUrl, id: imageId }]);
                    setImagesLoading(true);
                });
        }

        fetch(`http://localhost:8080/imagen/resto/${restaurantId}`)
            .then(response => response.json())
            .then(imageIds => {
                imageIds.map(fetchImages)
            });
    }, []);

    return (
        restaurantLoading ? (
            <div>
                <Typography variant="h4" component="h2">{info.name}</Typography>
                <Paper>
                    {console.log(info)}
                    <div>
                        <p>Horario de atención: {info.workinghours}</p>
                        <p>Teléfono de contacto: {info.phoneNumber}</p>
                    </div>
                    <div>
                        {imagesLoading ? (
                            <div>
                                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                    {photos.map((item) => (
                                        <ImageListItem key={item.url}>
                                            <img
                                                src={item.url}
                                                alt={item.id}
                                                loading="lazy"
                                            />
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
                            <Button variant="text" href={`http://localhost:3000/menu/${restaurantId}`}>
                                Ver Carta
                            </Button>
                            <Button variant="text" href={`/restaurante/${restaurantId}/hacer_pedido`}>
                                Hacer Pedido
                            </Button>
                        </ButtonGroup>

                    </div>


                </Paper>
            </div>
        ) : (
            <div> Recuperando información del restaurante.</div>
        )
    );
};

export default RestaurantInfo;