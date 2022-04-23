//react apis
import { useEffect, useState } from 'react';
import { getInvoices } from '../API/routes'
import { createContext } from 'react';
import { useLocation } from 'react-router-dom';
//mui components
import React from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Controller from './Controller';
import AnalyticsView from './AnalyticsView';
//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//context apis
const Slno = createContext([]);
const Toggle = createContext([]);
const Slarray = createContext([]);
const Rowdata = createContext([]);

const useStyles = makeStyles({
    tablecustomization: {
        backgroundColor: "#283D4A"
    },
    '@media (max-width: 768px)': {
        searchbar: {
            height: '40px'
        },
        crudbtns: {
            height: '60px'
        }
    },
});

const columns = [
    { field: 'sl_no', headerName: 'Sl no', width: 70 },
    { field: 'business_code', headerName: 'Business Code', width: 120 },
    { field: 'cust_number', headerName: 'Customer Number', width: 140 },
    { field: 'clear_date', headerName: 'Clear Date', width: 90 },
    { field: 'buisness_year', headerName: 'Business Year', width: 110 },
    { field: 'doc_id', headerName: 'Document Id', width: 100 },
    { field: 'posting_date', headerName: 'Posting Date', width: 100 },
    { field: 'document_create_date', headerName: 'Document Create Date', width: 170 },
    { field: 'due_in_date', headerName: 'Due in Date', width: 95 },
    { field: 'invoice_currency', headerName: 'Invoice Currency', width: 125 },
    { field: 'document_type', headerName: 'Document Type', width: 120 },
    { field: 'posting_id', headerName: 'Posting Id', width: 85 },
    { field: 'total_open_amount', headerName: 'Total Open Amount', width: 145 },
    { field: 'baseline_create_date', headerName: 'Baseline Create Date', width: 155 },
    { field: 'cust_payment_terms', headerName: 'Customer Payment Terms', width: 185 },
    { field: 'invoice_id', headerName: 'Invoice Id', width: 100 },
    { field: 'aging_bucket', headerName: 'Aging Bucket', width: 100 },
];


function Fetch() {

    const { search } = useLocation();
    const [toggle, setToggle] = useState(false)
    const [tableData, setTableData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [rowdata, setRowdata] = useState([]);

    const sl_no = (selectionModel[selectionModel.length - 1] === undefined) ? '' : selectionModel[selectionModel.length - 1];

    //api call
    const getAllInvoices = async () => {
            const response = await getInvoices(search);
            setTableData(response.data)

            if(response.data.length===0){
                toast.error("No invoices found", { position: "bottom-right", theme: "dark", autoClose: 2000 });
            }
    }

    useEffect(() => {
        getAllInvoices();
        // eslint-disable-next-line
    }, [search, toggle]);


    const classes = useStyles();
    return (
        <>
            <Slno.Provider value={sl_no}>
                <Toggle.Provider value={setToggle}>
                    <Slarray.Provider value={selectionModel}>
                        <Rowdata.Provider value={rowdata}>
                            <Controller />
                        </Rowdata.Provider>
                    </Slarray.Provider>
                </Toggle.Provider>
            </Slno.Provider>

            <Box sx={{ bgcolor: '#283D4A' }}  paddingBottom='40px'>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} md={12}>
                        <Box sx={{ height: '620px', padding: 3 }}>
                            <DataGrid
                                density="compact"
                                components={{ Toolbar: GridToolbar }}
                                className={classes.tablecustomization}
                                getRowId={(tableData) => tableData.sl_no}
                                rows={tableData}
                                columns={columns}
                                rowsPerPageOptions={[100, 500, 1000, 2000, 5000, 10000]}
                                checkboxSelection
                                onSelectionModelChange={(ids) => {
                                    //get value for row
                                    const selectedIDs = new Set(ids);
                                    const selectedRowData = tableData.filter((data) =>
                                        selectedIDs.has(data.sl_no)
                                    );
                                    setSelectionModel(ids);
                                    setRowdata(selectedRowData);
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <AnalyticsView />
        </>
    )
}

export default Fetch;
export { Slno, Toggle, Slarray, Rowdata };