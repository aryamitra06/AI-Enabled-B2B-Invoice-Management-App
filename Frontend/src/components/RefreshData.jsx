import React from 'react'
import { Refresh } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RefreshData(props) {
  const refreshData = () =>{
    props.setToggle(prev => !prev);
    toast.success("Invoices refreshed", { position: "bottom-right", theme: "dark", autoClose: 2000 });
  }
  return (
    <>
      <IconButton
        onClick={() => refreshData()}
        color="primary"
        aria-label="search"
        component="span"
        sx={{ marginLeft: 1 }}
      >
        <Refresh />
      </IconButton>
    </>
  )
}

export default RefreshData