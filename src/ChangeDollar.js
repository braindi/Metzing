import { useContext, useEffect, useState } from "react";
import { ThemeContext } from './Contexts'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChangeDollar = () => {
    let theme = useContext(ThemeContext);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        if (theme.dollarIls === 1) {
            theme.setDollarIls(theme.dollarValue);
            document.getElementById("alert-dialog-slide-description").textContent = 'המטבע מוצג כדולר';
        }
        else if (theme.dollarIls === theme.dollarValue) {
            theme.setDollarIls(1);
            document.getElementById("alert-dialog-slide-description").textContent = 'המטבע מוצג כשקל';
        }
        setTimeout(() => {
            document.getElementById("alert-dialog-slide-description").textContent = '';
            handleClose();
        }, 3000);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div style={{marginTop:"10px", marginRight:"10px"}}>
        <React.Fragment>
            {theme.dollarIls === 1 ? <AttachMoneyIcon onClick={handleClickOpen} /> : <MoneyOffIcon onClick={handleClickOpen} />}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{textAlign: 'center'}}>{"שים לב"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>אישור</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    </div>);
}

export default ChangeDollar;