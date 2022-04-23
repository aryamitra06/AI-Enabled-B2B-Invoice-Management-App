import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//axios import
import { predictInvoice, addpredictedInvoice } from '../API/routes';
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Predict(props) {
    const rowsdata = (props.selectedrowsdata === undefined) ? '' : (props.selectedrowsdata);

    const [agingbucket, setAgingbucket] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const docids = []
    for (var i = 0; i < rowsdata.length; i++) {
        docids.push(parseInt(rowsdata[i].doc_id))
    }

    const data = docids; //format -> [val,val,val,val]
    const predictHandle = async () => {
        let result = await predictInvoice({ "data": data });
        await setAgingbucket(result.data)
    }

    const agingbucketarray = [];
    for (let i = 0; i < agingbucket.length; i++) {
        agingbucketarray.push(agingbucket[i].aging_bucket);
    }
    const slnosarray = []
    for (var j = 0; j < rowsdata.length; j++) {
        slnosarray.push(rowsdata[j].sl_no)
    }

    const predictAndManipulate = async () => {
        await addpredictedInvoice(slnosarray,agingbucketarray)
        toast.success("Prediction successful", { position: "bottom-right", theme: "dark", autoClose: 2000 });
        props.setToggle(prev => !prev);
    }


    const isThreshold = (currentValue) => currentValue === '0000-00-00';
    return (
        <>
            <Button
                onClick={() => { predictHandle(); handleClickOpen(); }}
                disabled={props.cleardates.every(isThreshold) === false || props.cleardates.length === 0}
            >Predict</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>
                    Predict
                </DialogTitle>
                <DialogContent sx={{ bgcolor: '#283D4A'}}>
                    <DialogContentText sx={{ color: "white"}}>
                        Are you sure you want to predict clear date for these record(s)?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#283D4A' }}>
                    <Button sx={{ width: "50%" }} size="medium" variant="text" onClick={handleClose}>Cancel</Button>
                    <Button sx={{ width: "50%" }} size="medium" variant="contained" onClick={() => { handleClose(); predictAndManipulate(); }}>Predict</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Predict