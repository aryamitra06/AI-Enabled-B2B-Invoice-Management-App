import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import AdvanceSearch from "./AdvanceSearch";
import AnalyticsView from "./AnalyticsView";
import Predict from "./Predict";
import RefreshData from "./RefreshData";
//context api
import { Slno, Toggle, Slarray, Rowdata } from "./Fetch";
import { useHistory } from "react-router-dom";
import ManualAnalyticsForm from "./ManualAnalyticsForm";
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  searchbar: {
    height: "100px",
  },
  searchicon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: '55px',
    backgroundColor: "white",
    borderRadius: "0% 20% 20% 0%",
    marginLeft: "4px"
  },
  "@media (max-width: 768px)": {
    searchbar: {
      height: "40px",
    },
    btngrp: {
      width: "100%",
    },
    crudparent: {
      padding: "4px !important",
      marginTop: "10px"
    }
  },
});

function Controller() {

  const history = useHistory();

  //dialog box states
  const [add_open, add_setOpen] = useState(false);
  const [edit_open, edit_setOpen] = useState(false);
  const [delete_open, delete_setOpen] = useState(false);
  const [advancesearch_open, advancesearch_setOpen] = useState(false);
  const [analyticsview_open, analyticsview_setOpen] = useState(false);
  const [manualanalyticsview_open, manualanalyticsview_setOpen] = useState(false);

  //search box state
  const [search, setSearch] = useState({ cust_number: '' });

  const onValueChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  //rowdata state
  const [rowdata, setRowdata] = useState([]);
  const rowsdata = (rowdata === undefined) ? '' : (rowdata);

  const cleardates = []
  for (var i = 0; i < rowsdata.length; i++) {
    cleardates.push(rowsdata[i].clear_date)
  }


  const searchDetails = () => {
    if (search.cust_number === "") {
      history.push("/");
    } else {
      history.push(`/?custnumber=${search.cust_number}`);
    }
  };


  const delParams = () => {
    history.push('/');
  }

  const add_handleClickOpen = () => {
    add_setOpen(true);
  };

  const add_handleClose = () => {
    add_setOpen(false);
  };

  const edit_handleClickOpen = () => {
    edit_setOpen(true);
  };

  const edit_handleClose = () => {
    edit_setOpen(false);
  };

  const delete_handleClickOpen = () => {
    delete_setOpen(true);
  };

  const delete_handleClose = () => {
    delete_setOpen(false);
  };

  const advancesearch_handleClickOpen = () => {
    advancesearch_setOpen(true);
  };

  const advancesearch_handleClose = () => {
    advancesearch_setOpen(false);
  };

  const analyticsview_handleClickOpen = () => {
    if (rowsdata.length >= 1) {
      analyticsview_setOpen(true);
    }
    else {
      toast.error("No rows selected", { position: "bottom-right", theme: "dark", autoClose: 2000 });
    }
  };

  const analyticsview_handleClose = () => {
    analyticsview_setOpen(false);
  };

  const manualanalyticsview_handleClickOpen = () => {
    manualanalyticsview_setOpen(true);
  };

  const manualanalyticsview_handleClose = () => {
    manualanalyticsview_setOpen(false);
  };

  //Analytics menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <Slno.Consumer>
      {(value1) => {
        return (
          <Toggle.Consumer>
            {(value2) => {
              return (
                <Slarray.Consumer>
                  {(value3) => {
                    return (
                      <Rowdata.Consumer>
                        {(value4) => {
                          return (
                            <>
                              <Box sx={{ bgcolor: "#283D4A" }}>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="space-evenly"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      sx={{
                                        height: "100px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 1,
                                      }}
                                    >
                                      <ButtonGroup
                                        size="large"
                                        variant="contained"
                                        className={classes.btngrp}
                                      >
                                        <Predict
                                          selectedrowsdata={value4}
                                          slarray={value3}
                                          cleardates={cleardates}
                                          setToggle={value2}
                                        />
                                        <Button
                                          onClick={handleClick}
                                          startIcon={<ArrowDropDownIcon />}
                                        >
                                          Analytics View
                                        </Button>
                                        <Menu
                                          anchorEl={anchorEl}
                                          open={open}
                                          onClose={handleClose}
                                        >
                                          <MenuItem onClick={analyticsview_handleClickOpen}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                              <div>Automatic</div>
                                              &nbsp;&nbsp;
                                              <Tooltip title="Generate analytics from the selected rows.">
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          </MenuItem>
                                          <MenuItem onClick={manualanalyticsview_handleClickOpen}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                              <div>Manual</div>
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <Tooltip title="Generate analytics manually.">
                                                <InfoIcon />
                                              </Tooltip>
                                            </div>
                                          </MenuItem>
                                        </Menu>
                                        <Button
                                          onClick={() => { advancesearch_handleClickOpen(); delParams(); }}
                                          disabled={value1 !== ""}
                                        >
                                          Advance Search
                                        </Button>
                                        <RefreshData
                                          setToggle={value2}
                                        />
                                      </ButtonGroup>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 1,
                                      }}
                                      className={classes.searchbar}
                                    >
                                      <TextField
                                        onChange={(e) => onValueChange(e)}
                                        name="cust_number"
                                        type="number"
                                        sx={{ input: { backgroundColor: "white", borderRadius: 1, outline: "none", color: "black !important" } }}
                                        fullWidth
                                        color="primary"
                                        placeholder="Search customer id..."

                                      />
                                      <div className={classes.searchicon} onClick={() => searchDetails()}>
                                        <IconButton size="large">
                                          <Search fontSize="inherit" variant="contained" color="primary"  />
                                        </IconButton>
                                      </div>

                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Box
                                      className={classes.crudparent}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 1,
                                      }}
                                    >
                                      <Button
                                        variant="contained"
                                        size="large"
                                        onClick={add_handleClickOpen}
                                        disabled={value1 !== ""}
                                        style={{ width: "120px", margin: "5px" }}
                                      >
                                        Add
                                      </Button>
                                      <Button
                                        variant="contained"
                                        size="large"
                                        onClick={edit_handleClickOpen}
                                        disabled={value1 === "" || value3.length > 1}
                                        style={{ width: "120px", margin: "5px" }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        className={classes.crudbtn}
                                        variant="contained"
                                        size="large"
                                        onClick={delete_handleClickOpen}
                                        disabled={value1 === ""}
                                        style={{ width: "120px", margin: "5px" }}
                                      >
                                        Delete
                                      </Button>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                              <Add
                                add_open={add_open}
                                add_handleClose={add_handleClose}
                                setToggle={value2}
                              />
                              <Edit
                                edit_open={edit_open}
                                edit_handleClose={edit_handleClose}
                                sl_no={value1}
                                setToggle={value2}
                              />
                              <Delete
                                delete_open={delete_open}
                                delete_handleClose={delete_handleClose}
                                slarray={value3}
                                setToggle={value2}
                              />
                              <AdvanceSearch
                                advancesearch_open={advancesearch_open}
                                advancesearch_handleClose={advancesearch_handleClose}
                              />
                              <AnalyticsView
                                selectedrowsdata={value4}
                                analyticsview_open={analyticsview_open}
                                analyticsview_handleClose={analyticsview_handleClose}
                              />
                              <ManualAnalyticsForm
                                manualanalyticsview_open={manualanalyticsview_open}
                                manualanalyticsview_handleClose={manualanalyticsview_handleClose}
                              />
                              {setRowdata(value4)}
                            </>
                          )
                        }}
                      </Rowdata.Consumer>
                    );
                  }}
                </Slarray.Consumer>
              );
            }}
          </Toggle.Consumer>
        );
      }}
    </Slno.Consumer>
  );
}

export default Controller;
