import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';

import styles from './homePage.module.css';
import Canvas from "../components/Canvas";

const HomePage = () => {
    const [value, setValue] = useState('url');
    const [image, setImage] = useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

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
                    {value === 'file' && <Input type="file" onChange={(e) => setImage(e.target.value)}/>}
                </RadioGroup>
            </FormControl>
            <p>{value}</p>
            <Canvas />
        </div>
    );
}

export default HomePage;