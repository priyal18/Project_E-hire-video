import React, { useState, useEffect } from 'react';
//NAVBAR or APPBAR
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';


//BUTTON CARD
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import {ArrowDropDownIcon, ShareIcon, MenuIcon, Icon} from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShareIcon from '@material-ui/icons/Share';
//import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/icons/Send';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';

import CssBaseLine from '@material-ui/core/CssBaseline';
import './cardcomp.css';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import {
  withStyles,
  makeStyle,
} from '@material-ui/core/styles';

//CUSTOM STYLES
import useStyles from './HomeStyles';
import HideOnScroll from "./HideOnScroll"
import { Typography } from '@material-ui/core';
import { v4 as uuidV4 } from "uuid";
import Logo from './62.svg';
import backgroundFeatures from './productCurvyLines.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const font_header = createMuiTheme({
  typography: {
    fontFamily: [
      'Texturina',
      'serif',
    ].join(','),
  },
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue',
      },
      '&:hover fieldset': {
        borderColor: 'cyan',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },

    },
  },
})(TextField);

// function([string1, string2],target id,[color1,color2])    
const options = ['Join a interview', 'Create a session'];

export default function ButtonComp() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [RoomId, setRoomId] = useState("");
  const classes = useStyles();
  const handleTextChange = (event) => {
    setRoomId(event.target.value);
  };

  //TEXT ANIMATION
  useEffect(() => {
    consoleText(['Collaborative', 'Easy', 'A bit fun'], 'text', ['tomato', 'rebeccapurple', 'lightblue']);

    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      var visible = true;
      var con = document.getElementById('console');
      var letterCount = 1;
      var x = 1;
      var waiting = false;
      var target = document.getElementById(id)
      target.setAttribute('style', 'color:' + colors[0])
      window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount)
          window.setTimeout(function () {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0])
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000)
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount)
          letterCount += x;
        }
      }, 120)
      window.setInterval(function () {
        if (visible === true) {
          con.className = 'console-underscore hidden'
          visible = false;

        } else {
          con.className = 'console-underscore'

          visible = true;
        }
      }, 400)
    }
  })

  //CARD FUNCTIONING
  useEffect(() => {
    document.getElementById('meeting_id').disabled = true;
    document.getElementById('shareBTN').disabled = true;
  }, []);


  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    if (selectedIndex === 1) {
      setRoomId(uuidV4());
      document.getElementById('meeting_id').value = RoomId;
      document.getElementById('shareBTN').disabled = false;
    }
    else if (selectedIndex === 0) {
      console.info('join');
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setRoomId("");
    document.getElementById('meeting_id').value = RoomId;
    if (selectedIndex === 0) {
      console.info('create');
      document.getElementById('meeting_id').disabled = true;
      document.getElementById('shareBTN').disabled = false;

    }
    else if (selectedIndex === 1) {
      console.info('join');
      document.getElementById('meeting_id').disabled = false;
      document.getElementById('shareBTN').disabled = true;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const joinHandler = () => {
    window.location.href = `/${RoomId}`;
  };

  const handleDialogOpen = () => {
    if (RoomId)
      setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  var sharemessage = "Meeting Link is /" + RoomId + "%0A Or %0A You can visit " + window.location.href + " and join using Meeting Code: " + RoomId;

  const openWhatsApp = () => {
    window.open('https://wa.me/?text=' + sharemessage);
  };

  const openEmail = () => {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Subject&body=' + sharemessage + '&ui=2&tf=1&pli=1');
  };


  return (
    <React.Fragment>
      <ThemeProvider theme={font_header}>
        <div className={classes.parentFragment}>
          <CssBaseLine />
          <HideOnScroll>
            <AppBar className={classes.appbar}>
              <Toolbar className={classes.appToolbar}>
                <Typography variant="h4" color="inherit" className={classes.title}>
                  E-HIRE
                </Typography>
                {/* <Typography variant="h6" color="inherit">Login</Typography>
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton> */}
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <Toolbar />
          <main>
            <div >

              <Grid direction="row" style={{ minWidth: 0, minHeight: 0 }} container>
                <Grid item container xs={12} md={4} style={{ justifyContent: "center", alignItems: "center" }}>
                  <Container maxWidth="xs" justify="center">
                    <div className='console-container'>
                      <span>Online Interviews made,</span><span id='text'></span><div className='console-underscore' id='console'>&#95;</div></div>
                    <Typography variant="h5" className={classes.title}>
                      Have a chat and collaborate on your code at the same time.
                    </Typography>
                    {/*ANCHOR FOR CARD COMP */}
                    <center>
                      <Button style={{ marginTop: "3vh" }} href="#createSession" size="large" variant="contained" color="secondary"><Typography variant="subtitle1"><b>Let's get started</b></Typography></Button>
                    </center>
                  </Container>
                </Grid>
                <Grid item container xs={12} md={8}>
                  <img src={Logo} width="100%" alt="svg"></img>
                </Grid>

              </Grid>
            </div>
            <div className={classes.features} style={{ backgroundImage: `url(${backgroundFeatures})` }}>
              <Typography variant="h4" align="center"><u>FEATURES</u></Typography>
              <Toolbar />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Avatar variant="circular" className={classes.square}>
                        <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container className={classes.features_title}>
                    <Grid item xs={12} container>
                      <Typography variant="h6">Built for everyone</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Typography variant="subtitle1" align="left">E-HIRE is built to make your life easier. An free online tool which is made for everyone to use anywhere , anytime.</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Avatar variant="circular" className={classes.square}>
                        <svg class="svg-icon" height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                          <path d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></path>
                        </svg>
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container className={classes.features_title}>
                    <Grid item xs={12} container>
                      <Typography variant="h6">Collaborative</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Typography variant="subtitle1" align="left">E-HIRE as a platform provides a medium to be collaborative even when you are at remote locations.</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Avatar variant="circular" className={classes.square}>

                        <svg class="svg-icon" viewBox="0 0 20 20" height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"> <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path></svg>
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container className={classes.features_title}>
                    <Grid item xs={12} container>
                      <Typography variant="h6">Remote Accessibility</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Typography variant="subtitle1" align="left">E-HIRE is a platform that provides one thr freedom to sit for interviews from any location over the globe.</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Toolbar />
              <Grid container spacing={2} alignItems="center" alignContent="center" justify="space-evenly">
                <Grid container item xs={12} sm={4} spacing={1}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Avatar variant="circular" className={classes.square}>
                        <svg class="svg-icon" viewBox="0 0 20 20" height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                          <path fill="none" d="M4.319,8.257c-0.242,0-0.438,0.196-0.438,0.438c0,0.243,0.196,0.438,0.438,0.438c0.242,0,0.438-0.196,0.438-0.438C4.757,8.454,4.561,8.257,4.319,8.257 M7.599,10.396c0,0.08,0.017,0.148,0.05,0.204c0.034,0.056,0.076,0.104,0.129,0.144c0.051,0.04,0.112,0.072,0.182,0.097c0.041,0.015,0.068,0.028,0.098,0.04V9.918C7.925,9.927,7.832,9.958,7.747,10.02C7.648,10.095,7.599,10.22,7.599,10.396 M15.274,6.505H1.252c-0.484,0-0.876,0.392-0.876,0.876v7.887c0,0.484,0.392,0.876,0.876,0.876h14.022c0.483,0,0.876-0.392,0.876-0.876V7.381C16.15,6.897,15.758,6.505,15.274,6.505M1.69,7.381c0.242,0,0.438,0.196,0.438,0.438S1.932,8.257,1.69,8.257c-0.242,0-0.438-0.196-0.438-0.438S1.448,7.381,1.69,7.381M1.69,15.269c-0.242,0-0.438-0.196-0.438-0.438s0.196-0.438,0.438-0.438c0.242,0,0.438,0.195,0.438,0.438S1.932,15.269,1.69,15.269M14.836,15.269c-0.242,0-0.438-0.196-0.438-0.438s0.196-0.438,0.438-0.438s0.438,0.195,0.438,0.438S15.078,15.269,14.836,15.269M15.274,13.596c-0.138-0.049-0.283-0.08-0.438-0.08c-0.726,0-1.314,0.589-1.314,1.314c0,0.155,0.031,0.301,0.08,0.438H2.924c0.049-0.138,0.081-0.283,0.081-0.438c0-0.726-0.589-1.314-1.315-1.314c-0.155,0-0.3,0.031-0.438,0.08V9.053C1.39,9.103,1.535,9.134,1.69,9.134c0.726,0,1.315-0.588,1.315-1.314c0-0.155-0.032-0.301-0.081-0.438h10.678c-0.049,0.137-0.08,0.283-0.08,0.438c0,0.726,0.589,1.314,1.314,1.314c0.155,0,0.301-0.031,0.438-0.081V13.596z M14.836,8.257c-0.242,0-0.438-0.196-0.438-0.438s0.196-0.438,0.438-0.438s0.438,0.196,0.438,0.438S15.078,8.257,14.836,8.257 M12.207,13.516c-0.242,0-0.438,0.196-0.438,0.438s0.196,0.438,0.438,0.438s0.438-0.196,0.438-0.438S12.449,13.516,12.207,13.516 M8.812,11.746c-0.059-0.043-0.126-0.078-0.199-0.104c-0.047-0.017-0.081-0.031-0.117-0.047v1.12c0.137-0.021,0.237-0.064,0.336-0.143c0.116-0.09,0.174-0.235,0.174-0.435c0-0.092-0.018-0.17-0.053-0.233C8.918,11.842,8.87,11.788,8.812,11.746 M18.78,3.875H4.757c-0.484,0-0.876,0.392-0.876,0.876V5.19c0,0.242,0.196,0.438,0.438,0.438c0.242,0,0.438-0.196,0.438-0.438V4.752H18.78v7.888h-1.315c-0.242,0-0.438,0.196-0.438,0.438c0,0.243,0.195,0.438,0.438,0.438h1.315c0.483,0,0.876-0.393,0.876-0.876V4.752C19.656,4.268,19.264,3.875,18.78,3.875 M8.263,8.257c-1.694,0-3.067,1.374-3.067,3.067c0,1.695,1.373,3.068,3.067,3.068c1.695,0,3.067-1.373,3.067-3.068C11.33,9.631,9.958,8.257,8.263,8.257 M9.488,12.543c-0.062,0.137-0.147,0.251-0.255,0.342c-0.108,0.092-0.234,0.161-0.378,0.209c-0.123,0.041-0.229,0.063-0.359,0.075v0.347H8.058v-0.347c-0.143-0.009-0.258-0.032-0.388-0.078c-0.152-0.053-0.281-0.128-0.388-0.226c-0.108-0.098-0.191-0.217-0.25-0.359c-0.059-0.143-0.087-0.307-0.083-0.492h0.575c-0.004,0.219,0.046,0.391,0.146,0.518c0.088,0.109,0.207,0.165,0.388,0.185v-1.211c-0.102-0.031-0.189-0.067-0.3-0.109c-0.136-0.051-0.259-0.116-0.368-0.198c-0.109-0.082-0.198-0.183-0.265-0.306c-0.067-0.123-0.101-0.275-0.101-0.457c0-0.159,0.031-0.298,0.093-0.419c0.062-0.121,0.146-0.222,0.252-0.303S7.597,9.57,7.735,9.527C7.85,9.491,7.944,9.474,8.058,9.468V9.134h0.438v0.333c0.114,0.005,0.207,0.021,0.319,0.054c0.134,0.04,0.251,0.099,0.351,0.179c0.099,0.079,0.178,0.18,0.237,0.303c0.059,0.122,0.088,0.265,0.088,0.427H8.916c-0.007-0.169-0.051-0.297-0.134-0.387C8.712,9.968,8.626,9.932,8.496,9.919v1.059c0.116,0.035,0.213,0.074,0.333,0.118c0.145,0.053,0.272,0.121,0.383,0.203c0.111,0.083,0.2,0.186,0.268,0.308c0.067,0.123,0.101,0.273,0.101,0.453C9.581,12.244,9.549,12.406,9.488,12.543"></path>
                        </svg>
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container className={classes.features_title}>
                    <Grid item xs={12} container>
                      <Typography variant="h6">Free to Use</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Typography variant="subtitle1" align="left">E-HIRE is completely free to use, we do not even store any kind of user data.</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Avatar variant="circular" className={classes.square}>
                        <svg class="svg-icon" viewBox="0 0 20 20" height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"> <path d="M17.237,3.056H2.93c-0.694,0-1.263,0.568-1.263,1.263v8.837c0,0.694,0.568,1.263,1.263,1.263h4.629v0.879c-0.015,0.086-0.183,0.306-0.273,0.423c-0.223,0.293-0.455,0.592-0.293,0.92c0.07,0.139,0.226,0.303,0.577,0.303h4.819c0.208,0,0.696,0,0.862-0.379c0.162-0.37-0.124-0.682-0.374-0.955c-0.089-0.097-0.231-0.252-0.268-0.328v-0.862h4.629c0.694,0,1.263-0.568,1.263-1.263V4.319C18.5,3.625,17.932,3.056,17.237,3.056 M8.053,16.102C8.232,15.862,8.4,15.597,8.4,15.309v-0.89h3.366v0.89c0,0.303,0.211,0.562,0.419,0.793H8.053z M17.658,13.156c0,0.228-0.193,0.421-0.421,0.421H2.93c-0.228,0-0.421-0.193-0.421-0.421v-1.263h15.149V13.156z M17.658,11.052H2.509V4.319c0-0.228,0.193-0.421,0.421-0.421h14.308c0.228,0,0.421,0.193,0.421,0.421V11.052z"></path>	</svg>
                      </Avatar>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container className={classes.features_title}>
                    <Grid item xs={12} container>
                      <Typography variant="h6">Code With Your Team</Typography>
                    </Grid>
                  </Grid>
                  <Grid spacing={2} container>
                    <Grid item xs={12} container>
                      <Typography variant="subtitle1" align="left">E-HIRE's use is not limited to interviews , you can use it to collaborate on code with your team.</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>

            <a name="createSession"></a>
            <Typography variant="h4" align="center"> Let's Get the Session Started !!!</Typography>
            <Toolbar />
            <Grid item container xs={12} style={{ justifyContent: "center", alignItems: "center" }}>
              <Container maxWidth="xs" justify="center">
                <Card className={classes.cardContainer} variant="outlined" raised>
                  <Grid className={classes.root} container direction="column" alignItems="center">
                    <Grid item xs={12}>
                      <ButtonGroup size="medium" variant="outlined" color="primary" ref={anchorRef} aria-label="split button">
                        <Button size="medium" className={classes.button} onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                          className={classes.button}
                          color="primary"
                          size="medium"
                          aria-controls={open ? 'split-button-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-label="select merge strategy"
                          aria-haspopup="menu"
                          onClick={handleToggle}
                        >
                          <ArrowDropDownIcon />
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                              }}
                            >
                              <Paper elevation={7} style={{ zIndex: 1, background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)', }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList id="split-button-menu" >
                                    {options.map((option, index) => (
                                      <MenuItem
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                      >
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </ButtonGroup>

                    </Grid>
                    <Grid item xs={12}>
                      <form noValidate>
                        <CssTextField
                          className={classes.margin}
                          label="Meeting Link"
                          variant="outlined"
                          required
                          size="small"
                          value={RoomId} onChange={handleTextChange}
                          id="meeting_id"
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonGroup size="medium" variant="outlined" color="primary">
                        <Button
                          variant="outlined"
                          color="primary"
                          className={classes.button}
                          endIcon={<Icon></Icon>}
                          onClick={joinHandler}
                        >
                          Join
                        </Button>
                        <div>
                          <Button
                            id="shareBTN"
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            endIcon={<ShareIcon />}
                            onClick={handleDialogOpen}
                          >
                            Share
                          </Button>
                          <Dialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <DialogTitle id="responsive-dialog-title">{"SHARE :"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                Copy this text:
                              </DialogContentText>
                              <DialogContentText>
                                Meeting Link is <a>{window.location.href}/{RoomId}</a>
                                <br></br>
                                Or
                                You can visit https://google.com and join using Meeting Code {RoomId}
                              </DialogContentText>
                            </DialogContent>
                            <DialogContent>
                              <DialogContentText>
                                Or use the following to share via
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button autoFocus onClick={openWhatsApp} color="primary">
                                <WhatsAppIcon></WhatsAppIcon>
                              </Button>
                              <Button autoFocus onClick={openEmail} color="primary">
                                <EmailIcon></EmailIcon>
                              </Button>
                            </DialogActions>
                            <DialogActions>
                              <Button autoFocus onClick={handleDialogClose} color="primary">
                                Done
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Card>
              </Container>
            </Grid>

            <div className="testimonials">

            </div>
          </main>
          <footer className={classes.footer}>

            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Typography variant="h3">E-HIRE</Typography>
                <Typography variant="subtitle1"> Want to give or take interviews remotely and not loose the collaborative essence of it.</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Contact Us:</Typography>
                <br />
                <Typography variant="subtitle1">Email :</Typography>  pr***********@gmail.com
                <br />
                <Typography variant="subtitle1">Phone :</Typography> +919999999999
              </Grid>
            </Grid>

          </footer>
        </div>
      </ThemeProvider>

    </React.Fragment>
  );
}

//background: 'linear-gradient(-180deg,#30353e 30%,#4d76ba 90%)',








// PREVIOUSLY HOSTED CODE


// import React,{ useState, useEffect} from 'react';
// //NAVBAR or APPBAR
// import AppBar from '@material-ui/core/AppBar';
// import IconButton from '@material-ui/core/IconButton';


// //BUTTON CARD
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Card from '@material-ui/core/Card';
// import Popper from '@material-ui/core/Popper';
// import ShareIcon from '@material-ui/icons/Share';
// import MenuIcon from '@material-ui/icons/Menu';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import Icon from '@material-ui/icons/Send';
// import CssBaseLine from '@material-ui/core/CssBaseline';


// import Container from '@material-ui/core/Container';
// import Avatar from '@material-ui/core/Avatar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Paper from '@material-ui/core/Paper';
// import {
//   withStyles,
//   makeStyles,
// } from '@material-ui/core/styles';

// //CUSTOM STYLES
// import useStyles from './HomeStyles';
// import HideOnScroll from "./HideOnScroll"
// import { Typography } from '@material-ui/core';
// import { v4 as uuidV4 } from "uuid";
// import Logo from './147.svg';
// import backgroundFeatures from './productCurvyLines.png';


// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const font_header = createMuiTheme({
//   typography: {
//     fontFamily: [
//       'Texturina',
//       'serif',
//     ].join(','),
//   },});



// const CssTextField = withStyles({
//   root: {
//     '& label.Mui-focused': {
//       color: 'blue',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'blue',
//       },
//       '&:hover fieldset': {
//         borderColor: 'cyan',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'blue',
//       },

//     },
//   },
// })(TextField);



// const options = ['Join a interview','Create a session'];

// export default function ButtonComp() {
//   const [open, setOpen] = useState(false);
//   const anchorRef = React.useRef(null);
//   const [selectedIndex, setSelectedIndex] = useState(1);
//   const [RoomId,setRoomId] =useState("");
//   const classes = useStyles();
//    const handleTextChange = (event) => {
//     setRoomId(event.target.value);
//   };
//   useEffect(() => {
//     document.getElementById('meeting_id').disabled = true;
//   }, []);

//   const handleClick = () => {
//     console.info(`You clicked ${options[selectedIndex]}`);
//     if(selectedIndex === 1)
//     {
//       setRoomId(uuidV4());
//       document.getElementById('meeting_id').value = RoomId;
//     }
//     else if(selectedIndex === 0)
//     {
//       console.info('join');
//     }
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setRoomId("");
//     document.getElementById('meeting_id').value =RoomId;
//     if(selectedIndex === 0)
//     {
//       console.info('create');
//       document.getElementById('meeting_id').disabled = true;

//     }
//     else if(selectedIndex === 1)
//     {
//       console.info('join');
//       document.getElementById('meeting_id').disabled = false;
//     }

//     setOpen(false); 
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const joinHandler = () => {
//     window.location.href = `/${RoomId}`;
//   };

//   return (

//     <React.Fragment>
//       <ThemeProvider theme={font_header}>
//       <CssBaseLine/>
//         <HideOnScroll>
//             <AppBar color="inherit">
//               <Toolbar className={classes.appToolbar}>
//                 <Typography variant="h4" className={classes.title}>
//                   E-HIRE
//                 </Typography>
//                 <Typography variant="h6" color="inherit">Login</Typography>
//                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                   <MenuIcon />
//                 </IconButton>
//               </Toolbar>
//             </AppBar>
//         </HideOnScroll>
//         <Toolbar />
//         <main className = {classes.main_page}>

//           <div className={classes.imageCarousel}>

//             <Grid direction="row" style={{minWidth:0,minHeight:0}} container>
//             <Grid item container xs={12} md={8} sm={7}>
//                   <img src={Logo} width="100%"></img>
//               </Grid>
//               <Grid item container xs = {12} md={4} sm={5} style={{justifyContent:"center",alignItems:"center"}}>
//                 <Container maxWidth="xs" justify="center">
//                   <Card className={classes.cardContainer} variant="outlined" raised>
//                     <Grid className = {classes.root} container direction="column" alignItems="center">
//                       <Grid item xs={12}>
//                         <ButtonGroup size="medium" variant="outlined" color="primary" ref={anchorRef} aria-label="split button">
//                           <Button size="medium" className={classes.button} onClick={handleClick}>{options[selectedIndex]}</Button>
//                           <Button
//                               className={classes.button}
//                               color="primary"
//                               size="medium"
//                               aria-controls={open ? 'split-button-menu' : undefined}
//                               aria-expanded={open ? 'true' : undefined}
//                               aria-label="select merge strategy"
//                               aria-haspopup="menu"
//                               onClick={handleToggle}
//                           >
//                             <ArrowDropDownIcon />
//                           </Button>
//                         </ButtonGroup>
//                         <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//                           {({ TransitionProps, placement }) => (
//                             <Grow
//                               {...TransitionProps}
//                                 style={{
//                                   transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
//                               }}
//                             >
//                               <Paper elevation = {7} style={{zIndex:1,background:'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',}}>
//                                 <ClickAwayListener onClickAway={handleClose}>
//                                   <MenuList id="split-button-menu" >
//                                     {options.map((option, index) => (
//                                       <MenuItem
//                                           key={option}
//                                           selected={index === selectedIndex}
//                                           onClick={(event) => handleMenuItemClick(event, index)}
//                                       >
//                                         {option}
//                                       </MenuItem>
//                                     ))}
//                                   </MenuList>
//                                 </ClickAwayListener>
//                               </Paper>
//                             </Grow>
//                           )}
//                         </Popper>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <form  noValidate>
//                           <CssTextField
//                                 className={classes.margin}
//                                 label="Meeting Link"
//                                 variant="outlined"
//                                 required
//                                 size="small"
//                                 value={RoomId} onChange={handleTextChange}
//                                 id="meeting_id"
//                           />
//                         </form>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <ButtonGroup size="medium" variant="outlined" color="primary">
//                           <Button
//                                 variant="outlined"
//                                 color="primary"
//                                 className={classes.button}
//                                 endIcon={<Icon></Icon>}
//                                 onClick = {joinHandler}
//                           >
//                             Join
//                           </Button>
//                           <Button
//                                 variant="outlined"
//                                 color="primary"
//                                 className={classes.button}
//                                 endIcon={<ShareIcon/>}
//                                 disabled
//                           >
//                             Share
//                           </Button>
//                         </ButtonGroup>
//                       </Grid>
//                     </Grid>
//                   </Card>
//                 </Container>
//               </Grid>

//             </Grid>
//           </div>

//           <div className={classes.features} style={{backgroundImage:`url(${backgroundFeatures})`}}>
//           <Typography variant="h4" align="center">FEATURES</Typography>
//             <Toolbar/>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Avatar variant="circular" className={classes.square}>
//                       <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container className={classes.features_title}>
//                   <Grid item xs={12} container>
//                     <Typography variant="h6">Built for everyone</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Typography variant="body1" align="left">TheFront is built to make your life easier. Variables, build tooling, documentation, and reusable components.</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Avatar variant="circular" className={classes.square}>
//                       <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container className={classes.features_title}>
//                   <Grid item xs={12} container>
//                     <Typography variant="h6">Collaborative</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Typography variant="body1" align="left">TheFront is built to make your life easier. Variables, build tooling, documentation, and reusable components.</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Avatar variant="circular" className={classes.square}>
//                       <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container className={classes.features_title}>
//                   <Grid item xs={12} container>
//                     <Typography variant="h6">Remote Accessibility</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Typography variant="body1" align="left">TheFront is built to make your life easier. Variables, build tooling, documentation, and reusable components.</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Toolbar/>
//             <Grid container spacing={2} alignItems="center" alignContent="center" justify="space-evenly">
//               <Grid container item xs={12} sm={4} spacing={1}>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Avatar variant="circular" className={classes.square}>
//                       <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container className={classes.features_title}>
//                   <Grid item xs={12} container>
//                     <Typography variant="h6">Built for everyone</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Typography variant="body1" align="left">TheFront is built to make your life easier. Variables, build tooling, documentation, and reusable components.</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Avatar variant="circular" className={classes.square}>
//                       <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
//                     </Avatar>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container className={classes.features_title}>
//                   <Grid item xs={12} container>
//                     <Typography variant="h6">Collaborative</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid spacing={2} container>
//                   <Grid item xs={12} container>
//                     <Typography variant="body1" align="left">TheFront is built to make your life easier. Variables, build tooling, documentation, and reusable components.</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </div>

//           <div className="testimonials">

//           </div>
//         </main>

//         <footer className={classes.footer}>

//           <Grid container spacing={5}>
//             <Grid item xs={6}>
//               <Typography variant="h3">E-HIRE</Typography>
//               <Typography variant="subtitle1"> Want to give or take interviews remotely and not loose the collaborative essence of it.</Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6">Contact Us:</Typography>
//               <br/>
//               <Typography variant="subtitle1">Email :</Typography>  pr***********@gmail.com
//               <br/>
//               <Typography variant="subtitle1">Phone :</Typography> +919999999999
//             </Grid>
//           </Grid>

//         </footer>
//       </ThemeProvider>

//     </React.Fragment>
//   );
// }