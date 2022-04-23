import React from 'react'
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

const useStyles = makeStyles({
    footertext:{
        color: "white"
    },
    footer:{
        textAlign: 'center'
    }
});

function Footer() {
    const classes = useStyles();
  return (
    <>
    <Box sx={{ bgcolor: '#2D4250', padding: '30px' }} className={classes.footer}>
            <Typography className={classes.footertext}><Link href="https://www.highradius.com/privacy-policy/">Privacy Policy</Link> | &#169; 2022 HighRadius Corporation. All Rights Reserved.</Typography>
    </Box>
    </>
  )
}

export default Footer