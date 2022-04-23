import React from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import hrc_logo from '../Assets/Images/hrc_logo.png'
import company_logo from '../Assets/Images/company-logo.png'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    nav: {
        boxShadow: '0 32px 64px rgba(0,0,0,0.07)',
        height: 48,
        color: 'white',
        padding: '0 30px'
    },
    hrc: {
        height: 30
    },
    companylogo: {
        height: 40,
        marginRight: 10,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    '@media (max-width: 768px)': {
        companylogo: {
            height: 40,
            marginRight: 0,
        },
        companyname: {
            display: 'none'
        }
    },
});

function Header() {
    const classes = useStyles();
    return (
        <>
            <Box sx={{ bgcolor: '#2D4250', height: '70px' }} className={classes.nav}>
                <Grid container>
                    <Grid item xs={6} md={8}>

                        <Box sx={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <img src={company_logo} className={classes.companylogo} alt="comapny logo"/>
                            <Link to='/' className={classes.link}><Typography variant="h5" className={classes.companyname}>ABC Products</Typography></Link>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Box sx={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <img src={hrc_logo} className={classes.hrc} alt="highradius logo"/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Header