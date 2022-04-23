//react apis
import { useState, useEffect } from 'react';
import { editInvoice, getInvoiceDataForSlNo } from '../API/routes'
//mui components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit(props) {
    const sl = (props.sl_no === undefined) ? '' : (props.sl_no);

    const initialValue = {
        invoice_currency: '',
        cust_payment_terms: '',
    }

    const [invoice, setInvoice] = useState(initialValue);

    //to display data for the sl_no
    useEffect(() => {
        loadInvoiceData();
        // eslint-disable-next-line
    }, [sl]);


    //api call to loading data for specific sl_no
    const loadInvoiceData = async () => {
        if ((props.sl_no > 0)) {
            const response = await getInvoiceDataForSlNo(sl);
            await setInvoice(response.data);
        }
    }

    const onValueChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }

    //api call to update
    const editDetails = async () => {
        await editInvoice(sl, invoice);
        props.edit_handleClose();
        toast.success("Invoice edited", { position: "bottom-right", theme: "dark", autoClose: 2000 });
        props.setToggle(prev => !prev);
    }

    const isDisabled = !invoice.cust_payment_terms || !invoice.invoice_currency || invoice.cust_payment_terms.length!==4;

    return (
        <>
            <Dialog open={props.edit_open} onClose={props.edit_handleClose}>
                <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>Edit</DialogTitle>
                <DialogContent sx={{ bgcolor: '#283D4A'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <FormControl focused variant="filled" sx={{ m: 1, minWidth: 200}}>
                                <InputLabel>Invoice Currency</InputLabel>
                                <Select
                                    name="invoice_currency"
                                    variant="filled"
                                    value={invoice.invoice_currency}
                                    onChange={(e) => onValueChange(e)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="CAD">CAD</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <FormControl sx={{ minWidth: 200, color: "white"}}>
                                <TextField
                                    sx={{ color: "white" }}
                                    margin="dense"
                                    name="cust_payment_terms"
                                    id="cust_payment_terms"
                                    label="Customer Payment Terms"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                    value={invoice.cust_payment_terms}
                                    onChange={(e) => onValueChange(e)}
                                    inputProps={{ maxLength: 4 }}
                                    focused
                                />
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#283D4A'}}>
                    <Button sx={{ width: "50%" }} onClick={props.edit_handleClose}>Cancel</Button>
                    <Button sx={{ width: "50%" }} disabled={isDisabled} variant="contained" onClick={() => editDetails()}>Edit</Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default Edit