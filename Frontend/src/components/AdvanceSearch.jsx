//react imports
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

//mui components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';



function AdvanceSearch(props) {

  const history = useHistory();
  const initialValue = {
    doc_id: '',
    invoice_id: '',
    cust_number: '',
    buisness_year: ''
}
  const [advanceseach, setAdvancesearch] = useState(initialValue);

  const onValueChange = (e) => {
    setAdvancesearch({ ...advanceseach, [e.target.name]: e.target.value })
}

  const doAdvanceSearch = () => {
    props.advancesearch_handleClose();
    history.push(`?doc_id=${advanceseach.doc_id}&invoice_id=${advanceseach.invoice_id}&cust_number=${advanceseach.cust_number}&buisness_year=${advanceseach.buisness_year}`)
  }


  return (
    <>
      <Dialog open={props.advancesearch_open} onClose={props.advancesearch_handleClose}>
        <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>Advance Search</DialogTitle>
        <DialogContent sx={{ bgcolor: '#283D4A'}}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField
                margin="dense"
                name="doc_id"
                id="doc_id"
                label="Document ID"
                type="number"
                fullWidth
                variant="filled"
                onChange={(e) => onValueChange(e)}
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                required
                focused
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                margin="dense"
                name="invoice_id"
                id="invoice_id"
                label="Invoice ID"
                type="number"
                fullWidth
                variant="filled"
                onChange={(e) => onValueChange(e)}
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}}
                required
                focused
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop="2px">
            <Grid item xs={6} md={6}>
              <TextField
                margin="dense"
                name="cust_number"
                id="cust_number"
                label="Customer Number"
                type="number"
                fullWidth
                variant="filled"
                onChange={(e) => onValueChange(e)}
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,9)}}
                required
                focused
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                margin="dense"
                name="buisness_year"
                id="buisness_year"
                label="Business Year"
                type="number"
                fullWidth
                variant="filled"
                onChange={(e) => onValueChange(e)}
                onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}}
                required
                focused
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#283D4A' }}>
          <Button sx={{ width: "50%" }} onClick={props.advancesearch_handleClose}>Cancel</Button>
          <Button sx={{ width: "50%" }} variant="contained" onClick={() => doAdvanceSearch()} disabled={advanceseach.buisness_year==='' && advanceseach.doc_id==='' && advanceseach.invoice_id==='' && advanceseach.cust_number===''}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdvanceSearch