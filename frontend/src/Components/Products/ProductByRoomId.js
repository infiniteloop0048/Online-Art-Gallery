import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    float: "left",
    marginRight: 10,
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
    backgroundColor: red[500],
  },
}));


function ProductHeader( {name} ){
  const classes = useStyles();
  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {name[0]}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={name}
      subheader="September 14, 2016"
    />
  );
}

function ProductImage( {image} ){
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.media}
      image={image}
      title="Paella dish"
    />
  );
}

function ProductDescription( {description, handleExpandClick, expanded, price, artist} ){
  const classes = useStyles();
  return (
    <div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <p>{price}$</p>
          <p>{artist}</p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
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
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {description}
          </Typography>
          {/* <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </div>
  );
}

function Product({ product }){

  const name = product.Product, image = product.images[0], description = product.Description, price = product.Price,
  ID = product._id;
  const artist = product.Artist;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const urlString = "/products/" + ID;

  return (
    <Card className={classes.root}>
      <ProductHeader name = {name}/>
      <Link href={urlString}>
        <ProductImage image = {image}/>
      </Link>
      {/* <Nav.Item>
        <Nav.Link href="/"><ProductImage image = {image}/></Nav.Link>
      </Nav.Item> */}
      <ProductDescription description = {description} 
                          handleExpandClick = {handleExpandClick} 
                          expanded = {expanded} 
                          price = {price}
                          artist = {artist}
      />
    </Card>
  );
}

function Products({ productData }){
  
  const products = productData.map((product, i) => 
    {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6" style={{marginTop:'10px'}}>
          <Product product={product} key = {i}/>
        </div>
      );
      /* return (
          <div style={{marginTop:'10px'}}>
            <Product product={product} key = {i}/>
          </div>
      ); */
    }
  );
  return (
    <div className="container">
      <div className="row" style={{margin:'70px 0px 0px 0px'}}>
        {products}
      </div>
    </div>
    
  );
  /* return (
    <div>
        <div style={{margin:'70px 10px 0px 10px', display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
          {products}
        </div>
    </div>
  ); */
}

export default Products;