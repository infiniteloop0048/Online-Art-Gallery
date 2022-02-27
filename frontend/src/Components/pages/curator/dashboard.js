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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FavoriteIcon from '@material-ui/icons/Favorite';
import authService from '../../../services/authService';
import { useHistory } from "react-router-dom";
import JumbotronExample from '../../Jumbo/jumbo';
import Products from '../../Products/Products';
import Navbar from '../../Navbar/Navbar1';

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

export default function Curator_Dashboard() {
  
  const history = useHistory();
  const classes = useStyles();
  const [nextpath, setNextPath] = useState("");
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [products, setProducts] = useState([]);
  const [productFound, setProductFound] = useState(false);
  const [roomid, setRoomid] = useState("");
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
  
  
  const getProducts = (productNames) => {
        const urlString = `http://localhost:4000/products/room/1`;

        Axios({
            method: "GET",
            withCredentials: true,
            url: urlString    //this is API url
        }).then((res)=>{
            //alert(JSON.stringify(res));
          const {data} = res;
          if(data.message != "no products found"){
            setProductFound(true);
            setProducts(data);
          }else{
            setProductFound(false);
            setProducts(data);
          }
        })
    }

  useEffect(()=>{
      getProducts();
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

  function handleClick() {
    history.push(nextpath);
  }

  function handleLogout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('token');
    localStorage.removeItem('isArtist');
    localStorage.removeItem('role');
    history.push("/signin");
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitting2, setSubmitting2] = useState(false);
  const notifyAdmin = () => toast.success("User Updated!");
  const notifyAdminFailed = () => toast.success("User Update Failed!");
  const notifyAuthError = () => toast.error("Authorization Failed!");
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
          <SupervisorAccountIcon color='inherit'/>
        </Avatar>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6">
            Unassigned Art pieces
          </Typography>
        </Grid>
        <Grid item xs={12} container className={classes.conditional}>
            {
              (productFound)?(
                <>
                  <div>
                      <Products products = {products}/>
                      <hr/>
                  </div>
                </>
              ):
              ( 
                <>
                    <Grid item xs ={6}>
                      <Typography component="h1" variant="h6">
                          No Unassigned Art pieces available
                      </Typography>
                      <Divider/>
                    </Grid>
                </>
              )
            }
            </Grid>
      </div>
    </Container>
    </div>
  );
}