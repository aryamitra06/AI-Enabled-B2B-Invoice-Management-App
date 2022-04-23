//react imports
import { useState } from 'react';
import { addInvoice } from '../API/routes';
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

function Add(props) {

    const initialValue = {
        business_code: '',
        cust_number: '',
        clear_date: '',
        buisness_year: '',
        doc_id: '',
        posting_date: '',
        document_create_date: '',
        due_in_date: '',
        invoice_currency: '',
        document_type: '',
        posting_id: '',
        total_open_amount: '',
        baseline_create_date: '',
        cust_payment_terms: '',
        invoice_id: ''
    }

    const [invoice, setInvoice] = useState(initialValue);

    const isDisabled = invoice.business_code.length !== 4 || invoice.cust_number.length !== 9 || invoice.clear_date.length === 0 || invoice.buisness_year.length !== 4
        || invoice.doc_id.length !== 10 || invoice.posting_date.length === 0 || invoice.document_create_date.length === 0 || invoice.due_in_date.length === 0 || invoice.invoice_currency.length === 0
        || invoice.document_type.length !== 2 || invoice.posting_id.length !== 1 || invoice.total_open_amount.length === 0 || invoice.baseline_create_date.length === 0 || invoice.cust_payment_terms.length !== 4
        || invoice.invoice_id.length !== 10;

    const onValueChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }

    //api call
    const addDetails = async () => {
        await addInvoice(invoice);
        props.add_handleClose();
        toast.success("Invoice added", { position: "bottom-right", theme: "dark", autoClose: 2000 });
        props.setToggle(prev => !prev);
    }

    return (
        <>
            <Dialog open={props.add_open} onClose={props.add_handleClose}>
                <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>Add</DialogTitle>
                <DialogContent sx={{ bgcolor: '#283D4A', color: "white" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="business_code"
                                id="business_code"
                                label="Business Code"
                                type="text"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                inputProps={{ maxLength: 4 }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="cust_number"
                                id="cust_number"
                                label="Customer Number"
                                type="number"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9) }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                focused
                                margin="dense"
                                name="clear_date"
                                id="clear_date"
                                label="Clear Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop="2px">
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="buisness_year"
                                id="buisness_year"
                                label="Business year"
                                type="number"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4) }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="doc_id"
                                id="doc_id"
                                label="Document ID"
                                type="number"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10) }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                focused
                                margin="dense"
                                name="posting_date"
                                id="posting_date"
                                label="Posting Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop="2px">
                        <Grid item xs={4} md={4}>
                            <TextField
                                focused
                                margin="dense"
                                name="document_create_date"
                                id="document_create_date"
                                label="Document Create Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                focused
                                margin="dense"
                                name="due_in_date"
                                id="due_in_date"
                                label="Due Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <FormControl focused variant="filled" sx={{ m: 1, minWidth: 165 }}>
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
                    </Grid>
                    <Grid container spacing={2} marginTop="2px">
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="document_type"
                                id="document_type"
                                label="Document Type"
                                type="text"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                inputProps={{ maxLength: 2 }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="posting_id"
                                id="posting_id"
                                label="Posting ID"
                                type="number"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 1) }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="total_open_amount"
                                id="total_open_amount"
                                label="Total Open Amount"
                                type="text"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                                focused
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} marginTop="2px">
                        <Grid item xs={4} md={4}>
                            <TextField
                                focused
                                margin="dense"
                                name="baseline_create_date"
                                id="baseline_create_date"
                                label="Baseline Create Date"
                                type="date"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                required
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="cust_payment_terms"
                                id="cust_payment_terms"
                                label="Customer Payment Terms"
                                type="text"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                inputProps={{ maxLength: 4 }}
                                required
                                focused
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <TextField
                                margin="dense"
                                name="invoice_id"
                                id="invoice_id"
                                label="invoice ID"
                                type="number"
                                fullWidth
                                variant="filled"
                                onChange={(e) => onValueChange(e)}
                                onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10) }}
                                required
                                focused
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ bgcolor: '#283D4A' }}>
                    <Button sx={{ width: "50%" }} onClick={props.add_handleClose}>Cancel</Button>
                    <Button sx={{ width: "50%" }} disabled={isDisabled} onClick={() => addDetails()} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Add