//mui components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//axios
import { deleteInvoiceForSlnos } from '../API/routes';
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Delete(props) {
    const deleteDetails = async () =>{
        await deleteInvoiceForSlnos(props.slarray);
        props.delete_handleClose();
        props.setToggle(prev => !prev);
        toast.success("Invoice(s) deleted", { position: "bottom-right", theme: "dark", autoClose: 2000 });
    }
    return (
        <>
            <Dialog open={props.delete_open} onClose={props.delete_handleClose}>
                <DialogTitle sx={{ bgcolor: '#283D4A', color: "white" }}>Delete</DialogTitle>
                <DialogContent sx={{ bgcolor: '#283D4A', color: "white" }}>
                    <DialogContentText sx={{ color: "white" }}>
                        Are you sure you want to delete these record(s)?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#283D4A' }}>
                    <Button sx={{ width: "50%" }} onClick={props.delete_handleClose}>Cancel</Button>
                    <Button sx={{ width: "50%" }} variant="contained" color='error' onClick={() => deleteDetails()}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Delete