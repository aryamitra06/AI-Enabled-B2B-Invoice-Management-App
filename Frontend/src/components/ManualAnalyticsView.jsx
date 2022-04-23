import React, { useState, useEffect } from 'react'
//mui components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { useRef } from 'react';
//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//jspdf and html2 canvas
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

//react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//chartbarjs components
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Box } from '@mui/system';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title);



function ManualAnalyticsView(props) {
    const rowsdata = (props.data === undefined) ? '' : (props.data);


    //table
    function createData(name, from, to) {
        return { name, from, to };
    }
    
    const [curr, setcurr] = useState([]);
    const [clearfrom, setclearfrom] = useState([]);
    const [clearto, setclearto] = useState([]);
    const [duefrom, setduefrom] = useState([]);
    const [dueto, setdueto] = useState([]);
    const [baselinefrom, setbaselinefrom] = useState([]);
    const [baselineto, setbaselineto] = useState([]);

    let formclearfrom = props.formdata.cleardate_from;
    let formclearto = props.formdata.cleardate_to;
    let formduefrom = props.formdata.duedate_from;
    let formdueto = props.formdata.duedate_to;
    let formbaslinefrom = props.formdata.baselinedate_from;
    let formbaslineto = props.formdata.baselinedate_to;
    let formcurr = props.formdata.invoicecurrency;
    

    const rows = [
        createData('Clear Date', clearfrom || "Not given", clearto || "Not given"),
        createData('Due Date', duefrom || "Not given", dueto || "Not given"),
        createData('Baseline Create Date', baselinefrom || "Not given", baselineto || "Not given"),
        createData('Invoice Currency',curr || "Not given", null),
    ];

    useEffect(() => {
        setcurr(formcurr);
        setclearfrom(formclearfrom);
        setclearto(formclearto);
        setduefrom(formduefrom);
        setdueto(formdueto);
        setbaselinefrom(formbaslinefrom);
        setbaselineto(formbaslineto);
    }, [formcurr, formclearfrom, formclearto, formduefrom, formdueto, formbaslinefrom, formbaslineto])
    
    //algo for pie chart
    let usd = 0;
    let cad = 0;
    for (var i = 0; i < rowsdata.length; i++) {
        if (rowsdata[i].invoice_currency === "USD") {
            usd = usd + 1;
        }
        else {
            cad = cad + 1;
        }
    }
    const datapie = {
        labels: ['USD', 'CAD'],
        datasets: [
            {
                label: 'Currency',
                data: [usd, cad],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    //algo for bar data
    let totalopenamount_CA02 = 0;
    let totalopenamount_U001 = 0;
    let totalopenamount_U002 = 0;
    let totalopenamount_U005 = 0;
    let totalopenamount_U007 = 0;
    let totalopenamount_U013 = 0;

    let freq_CA02 = 0;
    let freq_U001 = 0;
    let freq_U002 = 0;
    let freq_U005 = 0;
    let freq_U007 = 0;
    let freq_U013 = 0;

    const businesscodes = new Set()
    for (var j = 0; j < rowsdata.length; j++) {

        businesscodes.add(rowsdata[j].business_code)

        if (rowsdata[j].business_code === "CA02") {
            freq_CA02 = freq_CA02 + 1;
            totalopenamount_CA02 = parseFloat(totalopenamount_CA02) + parseFloat(rowsdata[j].total_open_amount);
        }
        else if (rowsdata[j].business_code === "U001") {
            freq_U001 = freq_U001 + 1;
            totalopenamount_U001 = parseFloat(totalopenamount_U001) + parseFloat(rowsdata[j].total_open_amount);
        }
        else if (rowsdata[j].business_code === "U002") {
            freq_U002 = freq_U002 + 1;
            totalopenamount_U002 = parseFloat(totalopenamount_U002) + parseFloat(rowsdata[j].total_open_amount);
        }
        else if (rowsdata[j].business_code === "U005") {
            freq_U005 = freq_U005 + 1;
            totalopenamount_U005 = parseFloat(totalopenamount_U005) + parseFloat(rowsdata[j].total_open_amount);
        }
        else if (rowsdata[j].business_code === "U007") {
            freq_U007 = freq_U007 + 1;
            totalopenamount_U007 = parseFloat(totalopenamount_U007) + parseFloat(rowsdata[j].total_open_amount);
        }
        else if (rowsdata[j].business_code === "U013") {
            freq_U013 = freq_U013 + 1;
            totalopenamount_U013 = parseFloat(totalopenamount_U013) + parseFloat(rowsdata[j].total_open_amount);
        }
    }
    //setting labels
    let comp1 = "";
    let comp2 = "";
    let comp3 = "";
    let comp4 = "";
    let comp5 = "";
    let comp6 = "";

    if (totalopenamount_CA02 === 0) {
        comp1 = "";
    }
    else {
        comp1 = "Unilever";
    }
    if (totalopenamount_U001 === 0) {
        comp2 = "";
    }
    else {
        comp2 = "Johnson and Johnson";
    }
    if (totalopenamount_U002 === 0) {
        comp3 = "";
    }
    else {
        comp3 = "Bose";
    }
    if (totalopenamount_U005 === 0) {
        comp4 = "";
    }
    else {
        comp4 = "Kellog's";
    }
    if (totalopenamount_U007 === 0) {
        comp5 = "";
    }
    else {
        comp5 = "Sony";
    }
    if (totalopenamount_U013 === 0) {
        comp6 = "";
    }
    else {
        comp6 = "Puma";
    }

    const labels = [comp1, comp2, comp3, comp4, comp5, comp6];
    const databar = {
        labels,
        datasets: [
            {
                label: 'No of Customers',
                data: [freq_CA02, freq_U001, freq_U002, freq_U005, freq_U007, freq_U013],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Total Open Amount',
                data: [totalopenamount_CA02, totalopenamount_U001, totalopenamount_U002, totalopenamount_U005, totalopenamount_U007, totalopenamount_U013],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const printRef = useRef();
    const genPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: "landscape", unit: 'in', format: [16, 9] });
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${comp1 + comp2 + comp3 + comp4 + comp5 + comp6}_analytics.pdf`);
        toast.success("Analytics downloaded", { position: "bottom-right", theme: "dark", autoClose: 2000 });
    }
    return (
        <>
            <Dialog fullScreen open={props.open} onClose={props.handleClose}>
                <div ref={printRef}>
                    <DialogTitle>Manual Analytics View</DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            spacing={4}
                        >
                            <Grid item xs={12} md={4}>
                                <Box>
                                    <Pie data={datapie} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} container direction="row" justifyContent="flex-end">
                                <Grid item md={5} marginBottom="70px" style={{border: "0.2px solid grey", borderRadius: "10px"}}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Fields</TableCell>
                                                <TableCell align="right">From</TableCell>
                                                <TableCell align="right">To</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.from}</TableCell>
                                                    <TableCell align="right">{row.to}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </Grid>
                                <Bar data={databar} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </div>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                    <Button variant="contained" onClick={genPdf}>Download PDF</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManualAnalyticsView