import React from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Container} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import authService from "../../../services/authService";
import { ToastContainer, toast } from 'material-react-toastify';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Products from "../../Products/ProductsBootstrap";
import Navbar from "../../Navbar/Navbar1";

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
    root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
      },
  }));


const Order = () => {
    const classes = useStyles();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [nextpath, setNextPath] = useState("");
    const [order, setOrder] = useState({});
    const { orderid } = useParams();
    const [user, setUser] = useState({});
    const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
    const urlStringOrder = `http://localhost:4000/orders/${orderid}`;
    const [cartCount, setCartCount] = useState(0);


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

    const getOrder = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlStringOrder    //this is API url
        }).then((res)=>{
            console.log(res.data);
            const {data} = res;
            setOrder(data);
        })
    }

    useEffect(()=>{
      getOrder();
    },[] );

    if(typeof order.Products !== 'undefined'){
      return (
        <div>
          <Navbar user={user} cartCount={cartCount}/>
          <Products productData = {order.Products} 
            user={user} setUser={setUser}
            cartCount = {cartCount}
            setCartCount = {setCartCount}
            flag = {0}
          />
        </div>
        
       
      )
    }
    else{
      return (
        <div>No products</div>
      )
    }
    
}

export default Order;