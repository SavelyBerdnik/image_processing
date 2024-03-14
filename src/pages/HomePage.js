import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TextField from '@mui/material/TextField';
import { Button, Input } from '@mui/material';

import styles from './homePage.module.css';

const HomePage = ({setSrc}) => {
    const [value, setValue] = useState('url');
    const [image, setImage] = useState()
    const [error, setError] = useState()

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const loadImage = () => {
        if (image){
            if (value === 'file'){
                if (image.type.includes('image')){
                    var reader  = new FileReader();
                    // it's onload event and you forgot (parameters)
                    reader.onload = function(e)  {
                        let blob = new Blob([new Uint8Array(e.target.result)], { type: image.type })
                        setSrc(blob)
                        console.log(blob)
                    }
                    // you have to declare the file loading
                    reader.readAsArrayBuffer(image);
                    setError()
                }
                else {
                    setError('Выберите другой файл')
                }
            } else {
                console.log(image)
                fetch(image)
                    .then(response => {
                        if (response.ok){
                            let contentType = response.headers.get("Content-Type")
                            if (contentType && contentType.startsWith("image/")){
                                return response.blob()
                            } else {
                                throw new Error('Not an image')
                            }
                        } else {
                            throw new Error("Cloud not load image")
                        }
                    })
                    .then(blob => setSrc(blob))
            }
        }
    }

    return (
        <div className={styles.HomePage}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Выберите способ загрузки изображения</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="url" control={<Radio />} label="Ввести URL" />
                    {value === 'url' &&  <TextField id="filled-basic" label="Filled" variant="filled" onChange={(e) => setImage(e.target.value)}/>}
                    <FormControlLabel value="file" control={<Radio />} label="Прикрепить картику" />
                    {value === 'file' && <Input type="file" onChange={(e) => setImage(e.target.files[0])}/>}
                </RadioGroup>
                <p className={styles.error}>{ error }</p>
                <Button variant="outlined" onClick={loadImage}>Загрузить</Button>
            </FormControl>
        </div>
    );
}

export default HomePage;