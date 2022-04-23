//react imports
import { useState } from 'react';
//mui components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Typography } from '@mui/material';

//axios
import {getAnalytics} from '../API/routes';
import ManualAnalyticsView from './ManualAnalyticsView';

//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManualAnalyticsForm(props) {

    const initialValue = {
        cleardate_from: '',
        cleardate_to: '',
        duedate_from: '',
        duedate_to: '',
        baselinedate_from: '',
        baselinedate_to: '',
        invoicecurrency: ''
    }

    const [analyticsdata, setAnalyticsdata] = useState(initialValue);
    const [resdata, setResdata] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        let flag = true;
        if(analyticsdata.cleardate_from>analyticsdata.cleardate_to)
        {
            toast.error("Clear Date interval cannot be negative", { position: "bottom-right", theme: "dark", autoClose: 2000 });
            flag = false;
        }
        if(analyticsdata.duedate_from> analyticsdata.duedate_to){
            toast.error("Due Date interval cannot be negative", { position: "bottom-right", theme: "dark", autoClose: 2000 });
            flag = false;
        }
        if(analyticsdata.baselinedate_from> analyticsdata.baselinedate_to){
            toast.error("Baseline Create Date interval cannot be negative", { position: "bottom-right", theme: "dark", autoClose: 2000 });
            flag = false;
        }
        else{
            setOpen(flag);
        }
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const onValueChange = (e) => {
        setAnalyticsdata({ ...analyticsdata, [e.target.name]: e.target.value })
    }

    const doFetchData = async () => {
        const response = await getAnalytics(analyticsdata.cleardate_from, analyticsdata.cleardate_to, analyticsdata.duedate_from, analyticsdata.duedate_to, analyticsdata.baselinedate_from, analyticsdata.baselinedate_to, analyticsdata.invoicecurrency);
        setResdata(response.data);
    }

    let disabled = true;
    let a = analyticsdata.cleardate_from.length > 0 && analyticsdata.cleardate_to.length>0;
    let b = analyticsdata.duedate_from.length > 0 && analyticsdata.duedate_to.length>0;
    let c = analyticsdata.baselinedate_from.length > 0 && analyticsdata.baselinedate_to.length>0;
    let d = analyticsdata.invoicecurrency.length > 0
    if(a || b || c || d === true){
        disabled = false;
    }

    return (
        <>
            <Dialog open={props.manualanalyticsview_open} onClose={props.manualanalyticsview_handleClose}>
                <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>Manual Analytics View</DialogTitle>
                <DialogContent sx={{ bgcolor: '#283D4A', color: "white" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography>Clear Date</Typography>
                            <TextField
                                focused
                                margin="dense"
                                name="cleardate_from"
                                id="cleardate_from"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                            <TextField
                                focused
                                margin="dense"
                                name="cleardate_to"
                                id="cleardate_to"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography>Due Date</Typography>
                            <TextField
                                focused
                                margin="dense"
                                name="duedate_from"
                                id="duedate_from"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                            <TextField
                                focused
                                margin="dense"
                                name="duedate_to"
                                id="duedate_to"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} mt={2}>
                        <Grid item xs={12} md={6}>
                            <Typography>Baseline Create Date</Typography>
                            <TextField
                                focused
                                margin="dense"
                                name="baselinedate_from"
                                id="baselinedate_from"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                            <TextField
                                focused
                                margin="dense"
                                name="baselinedate_to"
                                id="baselinedate_to"
                                type="date"
                                onChange={(e) => onValueChange(e)}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl focused sx={{ minWidth: "100%"}}>

                            <Typography>Invoice Currency</Typography>
                                <Select
                                    name="invoicecurrency"
                                    id='invoicecurrency'
                                    fullWidth
                                    style={{"marginTop": "7px"}}
                                    value={analyticsdata.invoicecurrency}
                                    onChange={(e) => onValueChange(e)}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="CAD">CAD</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ bgcolor: '#283D4A', color: "white" }}>
                    <Button sx={{ width: "50%" }} onClick={props.manualanalyticsview_handleClose}>Cancel</Button>
                    <Button sx={{ width: "50%" }} variant="contained" onClick={() => {doFetchData(); handleClickOpen();}} disabled={disabled}>Submit</Button>
                </DialogActions>
            </Dialog>
            <ManualAnalyticsView data={resdata} open={open} handleClose={handleClose} formdata={analyticsdata}/>
        </>
    )
}
export default ManualAnalyticsForm