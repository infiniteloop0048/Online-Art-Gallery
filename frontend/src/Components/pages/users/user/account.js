import React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListAltIcon from '@material-ui/icons/ListAlt';
import authService from '../../../../services/authService';
import { useHistory } from "react-router-dom";
import Navbar from '../../../Navbar/Navbar1';



const Axios = require('axios');



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  conditional: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Account() {
  
  const history = useHistory();
  const classes = useStyles();
  const [nextpath, setNextPath] = useState("");
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);

  const urlString = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
  
  const getUserData = () => {
      Axios({
          method: "GET",
          withCredentials: true,
          url: urlString,    //this is API url
      }).then((res)=>{
          //alert(JSON.stringify(res.data));
          const {data} = res;
          setUserData((data));
      })
  }
  
  function handleClick() {
    //alert(nextpath);
    history.push(nextpath);
  }

  function handleLogout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('isArtist');
    localStorage.removeItem('role');
    history.push("/signin");
  }
  //alert(userData);
  useEffect(()=>{
      getUserData();
  },[] );


  const getUser = () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: urlStringUser    //this is API url
    }).then((res)=>{
        console.log(res.data);
        const {data} = res;
        setUser(data);
        console.log(user);
      })
  }

  useEffect(()=>{
      getUser();
  },[] );
  
  //alert(JSON.stringify(userData));

  const [submitting, setSubmitting] = useState(false);
  const notifyArtist = () => toast.success("New Artist Created!");
  const ListStyle = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  return (
    <div>
      <Navbar user={user} cartCount={cartCount}/>
      <Container component="main" maxWidth="md">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon color='inherit'/>
        </Avatar>
        <form 
        className={classes.form} 
        onSubmit={handleSubmit(async (formData)=> {

            //alert(JSON.stringify(formData));
            

              const response = await fetch("http://localhost:4000/users",{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": authService.getJWT()
                },
                body: JSON.stringify({
                }),
              });
            
              const data = await response.json();
              //alert(JSON.stringify((data)));
              notifyArtist();

            setSubmitting(false);


          })}>
          <Grid container spacing={2}>
            <Grid item
                container
                spacing={2}
                xs={3}
            >
                <Grid item xs={12}>
                    <List sx={ListStyle} component="nav" aria-label="user navigation">
                        <ListItem button component="a" href="/user/account">
                            <ListItemIcon>
                                <InfoIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Account Info" />
                        </ListItem>
                        <Divider orientation="vertical"/>
                        <Divider/>
                        <ListItem button component="a" href="/user/favorites">
                            <ListItemIcon>
                                <FavoriteIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Favorites" />
                        </ListItem>
                        <Divider/> 
                        <ListItem button component="a" href={localStorage.getItem("role") == "admin"? "/adminorders": "/userorders"}>
                            <ListItemIcon>
                                <ListAltIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Order history" />
                        </ListItem>
                        <Divider/> 
                        <ListItem button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}  
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </ListItem>
                        <Divider/>           
                    </List>
                </Grid>
            </Grid>
            <Grid item
                container
                spacing={2}
                xs={9}
                justifyContent="space-between"
            >
                <Grid 
                    item xs={12}
                >
                    <Typography component="h2" variant="h4">
                        Basic Details
                    </Typography>
                </Grid>
                <Grid 
                    item xs={12}
                    container
                    spacing={1}
                >
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Name: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Name} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Username: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Username} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Email Address: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Email} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Address: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Address} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Location: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Location} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          Role: 
                      </Typography>
                      <Divider/>
                      <Divider orientation="vertical"/>
                    </Grid>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          {userData.Role} 
                      </Typography>
                      <Divider/>
                    </Grid>
                    
                    
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Avatar className={classes.avatar}>
                    <UpdateOutlinedIcon color='inherit'/>
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h2" variant="h4">
                        Update Details
                    </Typography>
                </Grid>
                <Grid 
                    item xs={12}
                >
                    <TextField
                        autoComplete="name"
                        {...register("name", { required: true, maxLength: 30, pattern: /^[A-Za-z ]+$/i })}
                        name="name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                    />
                    {errors.name?.type === 'required' && "* Name is required"}
                    {errors.name && errors.name.type === "maxLength" && <span>* Maximum allowed length exceeded(30)</span> }
                    {errors.name && errors.name.type === "pattern" && <span>* Name can only contain alphabets</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <TextField
                    autoComplete="username"
                    {...register("username", { required: true, maxLength: 20, pattern: /^[A-Za-z0-9_]+$/ })}
                    name="username"
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                />
                {errors.username?.type === 'required' && "* Username is required"}
                {errors.username && errors.username.type === "maxLength" && <span>* Maximum allowed length exceeded(20)</span> }
                {errors.username && errors.username.type === "pattern" && <span>* Username can only contain alphanumeric characters and underscore(_)</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <TextField
                    variant="outlined"
                    {...register("email", { required:true, maxLength: 40,pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                {errors.email?.type === 'required' && "* Email is required"}
                {errors.email && errors.email.type === "maxLength" && <span>* Maximum allowed length exceeded(40)</span> }
                {errors.email && errors.email.type === "pattern" && <span>* Invalid Email</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <TextField
                    variant="outlined"
                    {...register("password", { required: true, minLength:6 })}
                    required
                    fullWidth
                    name="password"
                    label="Current Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {errors.password?.type === 'required' && "* Enter current password"}
                {errors.password && errors.password.type === "minLength" && <span>* Minimum allowed password length is 6</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <TextField
                    variant="outlined"
                    {...register("newpassword", { required: false, minLength:6 })}
                    fullWidth
                    name="newpassword"
                    label="New Password"
                    type="password"
                    id="newpassword"
                    autoComplete="current-password"
                />
                {errors.newpassword && errors.newpassword.type === "minLength" && <span>* Minimum allowed password length is 6</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <TextField
                    multiline
                    autoComplete="address"
                    {...register("address", { required: true, maxLength: 200 })}
                    name="address"
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    rows={2}
                />
                {errors.address?.type === 'required' && "* Address is required"}
                {errors.address && errors.address.type === "maxLength" && <span>* Maximum allowed length exceeded(200)</span> }
                </Grid>
                <Grid 
                    item xs={12}
                >
                <FormControl className={classes.formControl}>
                    <InputLabel id="locationlabel">&nbsp;&nbsp;Location</InputLabel>
                    <Select
                    {...register("location", { required: true})}
                    labelId="location"
                    id="location"
                    name="location"
                    variant="outlined"
                    label="Location"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Dhaka"}>Dhaka</MenuItem>
                    <MenuItem value={"Khulna"}>Khulna</MenuItem>
                    <MenuItem value={"Rajshahi"}>Rajshahi</MenuItem>
                    <MenuItem value={"Barisal"}>Barisal</MenuItem>
                    <MenuItem value={"Sylhet"}>Sylhet</MenuItem>
                    <MenuItem value={"Chattogram"}>Chattogram</MenuItem>
                    <MenuItem value={"Faridpur"}>Faridpur</MenuItem>
                    </Select>
                    {errors.location?.type === 'required' && <span>* Location is required</span>}
                </FormControl>
                </Grid>
                <Grid 
                    item xs={12}
                >
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={submitting}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
          </Grid>

        </form>
      </div>
    </Container>
    </div>
    
  );
}