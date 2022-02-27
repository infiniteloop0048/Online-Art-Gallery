import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
import  { Redirect } from 'react-router-dom'
import authService from "../../../../services/authService";
import Navbar from '../../../Navbar/Navbar1';
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
}));

export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isArtist, setArtist] = useState(false);
  const [nextpath, setNextPath] = useState("");
  const notifyUser = () => toast.success("New User Created!");
  const notifyArtist = () => toast.success("New Artist Created!");
  const notifyUserFailed = () => toast.error("Username already taken!");
  const notifyArtistFailed = () => toast.error("Username already taken!");
  const [user, setUser] = useState({});
  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
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

  function handleClick() {
    //alert(nextpath);
    history.push(nextpath);
  }

  return (
    <div><Navbar user={user} cartCount={cartCount}/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(async (formData)=> {
            if(isArtist){
            setSubmitting(true);
            //alert(JSON.stringify(formData));
            

              const response = await fetch("http://localhost:4000/users",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  Name: formData.name,
                  Email: formData.email,
                  Address: formData.address,
                  Password: formData.password,
                  Location: formData.location,
                  Username: formData.username,
                  Bio: formData.bio,
                  Education: formData.education,
                  Role: "artist",
                }),
              });
            
              const data = await response.json();
              //alert(JSON.stringify((data)));
              //console.log(isArtist);
              //notifyArtist();
              if(data.message==='user successfully created' ){
                authService.uiLogin(data.token);
                localStorage.setItem("isArtist", true);
                localStorage.setItem("role", data.user.Role);
                localStorage.setItem("userid", data.user._id);
                notifyArtist();
                setSubmitting(false);
                //history.push("/");
                setNextPath("/");
              }else{
                notifyArtistFailed();
                setSubmitting(false);
                //history.push("/signup");
                setNextPath("/signup");
              }

            setSubmitting(false);
            }else{
              setSubmitting(true);
            //alert(JSON.stringify(formData));
            

              const response = await fetch("http://localhost:4000/users",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  Name: formData.name,
                  Email: formData.email,
                  Address: formData.address,
                  Password: formData.password,
                  Location: formData.location,
                  Username: formData.username,
                  Role: "basic"
                }),
              });
              
              const data = await response.json();
              //alert(JSON.stringify((data)));
              //console.log(isArtist);
              if(data.message==='user successfully created' ){
                authService.uiLogin(data.token);
                localStorage.setItem("isArtist", false);
                localStorage.setItem("userid", data.user._id);
                localStorage.setItem("role", data.user.Role);
                notifyUser();
                setSubmitting(false);
                //history.push("/");
                setNextPath("/");
              }else{
                notifyUserFailed();
                setSubmitting(false);
                //history.push("/signup");
                setNextPath("/signup");
              }
              setSubmitting(false);
            }

          })}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="loginaslabel">&nbsp;&nbsp;Sign Up as</InputLabel>
                <Select
                  labelId="loginas"
                  id="loginas"
                  name="loginas"
                  variant="outlined"
                  label="loginas"
                  value={isArtist}
                  onChange={(e) => { setArtist(e.target.value)}}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={false}>Basic User</MenuItem>
                  <MenuItem value={true}>Artist</MenuItem>
                </Select>
                {errors.loginas?.type === 'required' && <span>*Field Required</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                {...register("name", { required: true, maxLength: 30, pattern: /^[A-Za-z ]+$/i })}
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
              {errors.name?.type === 'required' && "* Name is required"}
              {errors.name && errors.name.type === "maxLength" && <span>* Maximum allowed length exceeded(30)</span> }
              {errors.name && errors.name.type === "pattern" && <span>* Name can only contain alphabets</span> }
            </Grid>
            <Grid item xs={12} >
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                {...register("password", { required: true, minLength:6 })}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password?.type === 'required' && "* Password is required"}
              {errors.password && errors.password.type === "minLength" && <span>* Minimum allowed password length is 6</span> }
            </Grid>
            <Grid item xs={12}>
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
            <Grid xs={12}>
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
            <Grid xs={12} className={classes.conditional}>
            {
              isArtist?(
                <>
                  <TextField
                  multiline
                  autoComplete="education"
                  {...register("education", { required: false, maxLength: 300 })}
                  name="education"
                  variant="outlined"
                  fullWidth
                  id="education"
                  label="Education"
                  rows={1}
                />
                {errors.education && errors.education.type === "maxLength" && <span>* Maximum allowed length exceeded(300)</span> }
                </>
              ):
              ( null)
            }
            </Grid>
            <Grid xs={12} className={classes.conditional}>
            {
              isArtist?(
                <>
                  <TextField
                  multiline
                  autoComplete="bio"
                  {...register("bio", { required: false, minLength: 128, maxLength: 500 })}
                  name="bio"
                  variant="outlined"
                  fullWidth
                  id="bio"
                  label="Biography"
                  rows={3}
                />
                  {errors.bio && errors.bio.type === "minLength" && <span>* Minimum allowed length is 128 characters!</span> }
                  {errors.bio && errors.bio.type === "maxLength" && <span>* Maximum allowed length exceeded(500)</span> }
                </>
              ):
              ( null)
            }
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting}
          >
            Sign Up
          </Button>
          <ToastContainer
            position="top-center"
            autoClose={8000}
            transition="bounce"
            draggable
            onClick={handleClick}
          />
          <Grid container justify="flex-start">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}