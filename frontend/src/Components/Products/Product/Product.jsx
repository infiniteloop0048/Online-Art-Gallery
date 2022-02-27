import React from "react";
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import authService from "../../../services/authService";
import { ToastContainer, toast } from 'material-react-toastify';


const Product = ({product}) => {
    const classes = useStyles();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [roomid, setRoomid] = useState("");
    const [nextpath, setNextPath] = useState("");

    const notifyCurator = () => toast.success("Product Room Updated!");
    const notifyCuratorFailed = () => toast.error("Product Update Failed!");
    const notifyAuthError = () => toast.error("Authorization Failed!");

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      function handleClick() {
        setExpanded(!expanded);
        history.push(nextpath);
      }

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.images[0]} title={product.name}/>
            <CardContent>
                <div className={classes.CardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.Product}
                    </Typography>
                    <Typography variant="h6">
                        {product.Artist}
                    </Typography>
                    <CardActions disableSpacing className={classes.CardActions}>

                    </CardActions>
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                className={(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Update room:</Typography>
                <form 
                    className={classes.form} 
                    onSubmit={(async (e)=> {
                        setSubmitting(true);
                        e.preventDefault();
                        if(localStorage.getItem("role")==="curator"){    
                                    const response = await fetch(`http://localhost:4000/products/${product._id}`,{
                                        method: "PATCH",
                                        headers: {
                                        "Content-Type": "application/json",
                                        "x-auth-token": authService.getJWT()
                                        },
                                        body: JSON.stringify({
                                            Roomid: parseInt(roomid),
                                        }),
                                    });
                                    
                                    const data = await response.json();
                                    //alert(JSON.stringify((data)));
                                    if(data.message==="No token, Authorization denied" || data.message=== "Token is not valid"){
                                        notifyAuthError();
                                        setNextPath("/signin");
                                    }
                                    
                                    if(data.message === "not found" ){
                                        notifyCuratorFailed();
                                        setNextPath("/curator/dashboard");
                                    }
                                    if(data.message == "updated"){
                                        //setExpanded(!expanded);
                                        notifyCurator();
                                        setNextPath("/curator/dashboard");
                                    }
                                }else{
                                    notifyAuthError();
                                    localStorage.removeItem('userid');
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('isArtist');
                                    localStorage.removeItem('role');
                                    setNextPath("/signin");
                                }

                        setSubmitting(false);


                    })}>
                    <Grid container spacing={2}>
                        <Grid item
                            container
                            spacing={2}
                            xs={12}
                            justifyContent="space-between"
                        >
                            <Grid 
                                item xs={12}
                            >
                            <TextField
                                name="roomid"
                                variant="outlined"
                                fullWidth
                                id="roomid"
                                label="Enter Room id"
                                onChange={(e) => setRoomid(e.target.value)}
                            />
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
                                    Set
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <ToastContainer
                                        position="top-center"
                                        autoClose={8000}
                                        transition="bounce"
                                        draggable
                                        onClick={handleClick}
                                    />
                    </form>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Product;