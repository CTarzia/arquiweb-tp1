import React, { useState, useEffect } from "react";
import DisplayImages from "../DisplayImages";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import styles from "../../styles.module.scss";


const UploadImages = ({
    restaurantId
}) => {

    const [dataUri, setDataUri] = useState('');
    const [statusError, setStatusError] = useState(false);
    const [imagesLoading, setImagesLoading] = useState(false);
    const [photos, setPhotos] = useState([]);

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    useEffect(() => {
        getImages()
    }, []);


    const onChange = (file) => {

        if (!file) {
            setDataUri('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                setDataUri(dataUri);
            });

        const data = new FormData()
        data.append('file', file)

        fetch(`https://ver-la-carta.herokuapp.com/imagen/${restaurantId}`, {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                getImages()
            })
            .catch(setPhotos([]));
    }

    const getImages = () => {
        setPhotos([])
        const fetchImages = imageId => {
            fetch(`https://ver-la-carta.herokuapp.com/imagen/${imageId}`)
                .then(response => response.blob())
                .then(image => {
                    // Create a local URL of that image
                    const localUrl = URL.createObjectURL(image);
                    setPhotos(photos => [...photos, { url: localUrl, id: imageId }]);
                    setImagesLoading(true);
                });
        }

        fetch(`https://ver-la-carta.herokuapp.com/imagen/resto/${restaurantId}`)
            .then(response => response.json())
            .then(imageIds => {
                imageIds.map(fetchImages)
            });
    }

    return (

        <div>

            <label className={styles.uploadImage} htmlFor="upload-photo">
                Añadir imagen
            </label>
            <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(event) => onChange(event.target.files[0] || null)}
            />


            {imagesLoading ? (
                <Grid container spacing={2}>
                    {photos.map(img => (
                        <Grid item xs={4}>
                            <DisplayImages
                                img={img}
                                onDelete={getImages}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div>Recuperando imágenes de su restaurante...</div>
            )}

        </div>

    );
};

export default UploadImages