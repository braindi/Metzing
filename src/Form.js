import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import "./form.css";
import { useContext } from "react";
import { ThemeContext } from './Contexts'
import { Route, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';





const Form = (props) => {

    let theme = useContext(ThemeContext);
    const navigate = useNavigate();

    const savaDetails = (data) => {
        let ilsDollar = 0;
        if (theme.dollarIls === 1)
            ilsDollar = data.price;
        else
            ilsDollar = data.price * theme.dollarValue;

        let newC = {
            name: data.name,
            describtion: data.wish,
            amount: ilsDollar,
            date: new Date()
        }
        props.add(newC);
        navigate("/donation");
    }
    let formCheck = yup.object().shape({
        name: yup.string("שם מורכב מאותיות בלבד").required("שדה חובה").min(2, "השם קצר מדי"),
        price: yup.string().required("שדה חובה").matches(/^[0-9]{1,}$/, "סכום מורכב מספרות בלבד"),
        creditCard: yup.string().required("שדה חובה").matches(/^[0-9]{1,}$/, "המספר מורכב מספרות בלבד").min(16, "מספר אשראי קצר מדי").max(16, "מספר אשראי ארוך מדי"),
        date: yup
            .date()
            .typeError("שדה חובה")
            .min(new Date(), "הכרטיס אינו בתוקף")
        ,
        wish: yup.string(),
        threeNumbers: yup.string().required("שדה חובה").matches(/^[0-9]{1,}$/, "3 ספרות").min(3, "3 ספרות").max(3, "3 ספרות"),
        tz: yup.string().required("שדה חובה").matches(/^[0-9]{1,}$/, "ספרות בלבד").min(8, "מספר קצר מדי").max(9, "מספר ארוך מדי")

    })

    let { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(formCheck)
    });



    return (<><div className='allForm'>
        <NavBar />
        <div style={{ height: 300 }}>
            <form onSubmit={handleSubmit(savaDetails)}>

                <div className='containerForm'>
                    {!errors.name ? <Box className='itemInput' component="form" sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}
                        noValidate autoComplete="off" >
                        <TextField id="standard-basic" label="שם התורם" variant="standard" {...register("name")} />
                    </Box>
                        : <Box className='itemInput' component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField
                                error
                                id="standard-error-helper-text"
                                label="שם התורם"
                                defaultValue="שם התורם"
                                helperText={errors.name.message}
                                variant="standard"
                                {...register("name")}

                            />
                        </Box>}
                    <Box className='itemInput' component="form" sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}
                        noValidate autoComplete="off" >
                        <TextField id="standard-basic" label="הקדשה" variant="standard" {...register("wish")} />
                    </Box>



                    {!errors.price ? <Box className='itemInput' component="form" sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}
                        noValidate autoComplete="off" >
                        <TextField id="standard-basic" label="סכום" variant="standard" {...register("price")} />
                    </Box>
                        : <Box className='itemInput' component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}
                            noValidate
                            autoComplete="off">
                            <TextField
                                error
                                id="standard-error-helper-text"
                                label="סכום"
                                defaultValue="סכום"
                                helperText={errors.price.message}
                                variant="standard"
                                {...register("price")}
                            />
                        </Box>}
                </div>


                <Card
                    variant="outlined"
                    sx={{
                        maxHeight: 290,
                        maxWidth: '60%',
                        mx: 'auto',
                        overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                        פרטי אשראי
                    </Typography>
                    <Divider inset="none" />
                    <CardContent
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                            gap: 1.5,
                        }}
                    >

                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>מספר כרטיס</FormLabel>

                            <Input endDecorator={<CreditCardIcon />} {...register("creditCard")} />
                            {errors.creditCard && <span>{errors.creditCard.message}</span>}

                        </FormControl>

                        <FormControl>
                            <FormLabel>תוקף</FormLabel>
                            <Input type='month' {...register("date")} />
                            {errors.date && <span>{errors.date.message}</span>}

                        </FormControl>
                        <FormControl>
                            <FormLabel>3 ספרות</FormLabel>
                            <Input endDecorator={<InfoOutlined />} {...register("threeNumbers")} />
                            {errors.threeNumbers && <span>{errors.threeNumbers.message}</span>}

                        </FormControl>
                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>ת.ז. בעל הכרטיס</FormLabel>
                            <Input  {...register("tz")} />
                            {errors.tz && <span>{errors.tz.message}</span>}

                        </FormControl>
                    </CardContent>
                </Card>

                <Button variant="contained" type="submit" style={{ marginTop: 10, backgroundColor: theme.colorText }}>תרום</Button>

            </form>
        </div>
    </div>


        <div id='map'></div>
    </>);
}

export default Form;