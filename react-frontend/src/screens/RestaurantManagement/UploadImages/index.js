import React, { useState, useEffect } from "react";
import DisplayImages from "../DisplayImages";
import Grid from '@mui/material/Grid';



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


    const onChange = (file) => {

        if (!file) {
            setDataUri('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                setDataUri(dataUri);
            });
        console.log(file)

        const data = new FormData()
        data.append('file', file)

        fetch(`http://localhost:8080/imagen/${restaurantId}`, {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => { console.log(data)})


    }



    return (
        imagesLoading ? (
            <div>
                
                <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
                <Grid container spacing={2}>
                    {photos.map(img => (
                        <Grid item xs={4}>
                            <DisplayImages
                                img={img}
                            />
                        </Grid>
                    ))}
                </Grid>

            </div>
        ) : (
            <div>Recuperando imágenes de su restaurate...</div>
        )

    );
};

export default UploadImages