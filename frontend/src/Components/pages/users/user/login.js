import React,{ useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import 'material-react-toastify/dist/ReactToastify.css';
import authService from '../../../../services/authService';
import { ToastContainer, toast } from 'material-react-toastify';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Navbar from '../../../Navbar/Navbar1';
import Axios from "axios";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        1605043@CSE.BUET
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const classes = useStyles();
  const [nextpath, setNextPath] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isArtist, setArtist] = useState(false);
  const [cartCount, setCartCount] = useState(0);


  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;

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

  const { register, handleSubmit, control, formState: { errors }} = useForm({
    mode: 'onBlur',
    defaultValues: {},
  });
  const notifyFailed = () => toast.error("Incorrect Credentials!");
  function handleClick() {
    //alert(nextpath);
    history.push(nextpath);
  }

  return (
    <div>
    <Navbar user={user} cartCount={cartCount}/>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(async (formData)=> {
            if(isArtist){
            setSubmitting(true);
            //alert(JSON.stringify(formData));
            

              const response = await fetch("http://localhost:4000/users/login",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  Password: formData.password,
                  Username: formData.username,
                }),
              });
            
              const data = await response.json();
              //alert(JSON.stringify((data)));
              //console.log(isArtist);
              //notifyArtist();
              if(data.message==='welcome' ){
                authService.uiLogin(data.token);
                localStorage.setItem("isArtist", true);
                localStorage.setItem("role", data.user.Role);
                localStorage.setItem("userid", data.user._id);
                setSubmitting(false);
                history.push("/");
                //setNextPath("/");
              }else{
                notifyFailed();
                setSubmitting(false);
                //history.push("/signin");
                setNextPath("/signin");
              }

            setSubmitting(false);
            }else{
              setSubmitting(true);
            //alert(JSON.stringify(formData));
            

              const response = await fetch("http://localhost:4000/users/login",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  Password: formData.password,
                  Username: formData.username,
                }),
              });
              
              const data = await response.json();
              //alert(JSON.stringify((data)));
              //console.log(isArtist);
              if(data.message==='welcome' ){
                authService.uiLogin(data.token);
                localStorage.setItem("isArtist", false);
                localStorage.setItem("userid", data.users._id);
                localStorage.setItem("role", data.users.Role);
                //alert("ekhane");
                setSubmitting(false);
                history.push("/");
                //setNextPath("/");
              }else{
                notifyFailed();
                setSubmitting(false);
                //history.push("/signin");
                setNextPath("/signin");
              }
              
            }
          }
          )}>
            <FormControl className={classes.formControl}>
                <InputLabel id="loginaslabel">&nbsp;&nbsp;Sign In as</InputLabel>
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
            <TextField
            {...register('username', { required: true })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
             {errors.username?.type === 'required' && "* Username is required"}
            <TextField
             {...register('password', { required: true})}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password?.type === 'required' && "* Please enter password"}
            <Controller
              name='remember'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                  <FormControlLabel
                      control={<Checkbox {...field} />}
                      label='Remember me'
                  />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <ToastContainer
            position="top-center"
            autoClose={8000}
            transition="bounce"
            draggable
            onClick={handleClick}
          />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}