import React,{ useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Products from './ProductsBootstrap';
import Axios from "axios";
import { Link } from '@material-ui/core';


function ProductDetails({ productData, artistData }){

  const imageList = [];
  const tagList = [];
  const [products, setProducts] = useState([]);
  var urlString = `http://localhost:4000/products/artist/aaaaaa`;


  const getProduct = () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: urlString    //this is API url
    }).then((res)=>{
        console.log(res.data);
        const {data} = res;
        setProducts(data);
      })
  }

  if(typeof productData.Artist !== 'undefined')
  {
    urlString = `http://localhost:4000/products/artist/${productData.Artist}`;
    
  }

  console.log(productData.Artist);

  useEffect(()=>{
    getProduct();
  },[urlString] );

  const urlStringUser = `http://localhost:4000/users/${localStorage.getItem('userid')}`;
  const [user, setUser] = useState({});
  const [cartCount, setCartCount] = useState(0);
  
  const deviceType = "desktop";
  var numOfSlides = 1;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: numOfSlides,
      slidesToSlide: numOfSlides // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  

  

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

  const urlArtist = "/detailArtist/" + productData.Artist;

  if (typeof productData.images !== 'undefined') {
    console.log(productData.images);
    productData.images.map((image, i) => {
      console.log(image);
      imageList.push(<img src={image} key={i} className="img-fluid" alt="Responsive image" style={{margin:'10px'}}></img>);
    });
    if(typeof productData.Tags !== 'undefined') {
      tagList.push(<p class="text-center fw-bolder">Related Tags</p>)
      productData.Tags.map((tag, i) => {
        var tagurl = "/Tags/" + tag;
        tagList.push(<a className="btn btn-primary rounded-3 btn-danger col-1" href={tagurl} role="button" style={{margin: '5px'}}>{tag}</a>)
      });
    }
    return (
      <div className="container" style={{marginTop:'50px', marginBottom:'50px'}}>
        <div className="row">
          <div className="col-5">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={deviceType}
              dotListClass="custom-dot-list-style"
            >
                {imageList}  
            </Carousel>
          </div>
          <div className="col-7">
            <h3 className="fst-italic">{productData.Product}</h3>
            <Link href={urlArtist}><h6 className="text-decoration-underline">{productData.Artist}</h6></Link>
            
            <p className="fs-3">US$ {productData.Price}</p>
            <hr/>
            <p className="fw-lighter">Overview</p>
            <hr/>
            <p style={{margin:'0'}}>Subject: {productData.Subject}</p>
            <p style={{margin:'0'}}>Style: {productData.Style}</p>
            <p style={{margin:'0'}}>Material: {productData.Material}</p>
            <p style={{margin:'0'}}>Medium: {productData.Medium}</p>
            <p ><b>Dimension: </b>{productData.Dimension}</p>
            <hr/>
            <p className="fw-lighter">Description</p>
            <hr/>
            <p  style={{margin:'0'}}> {productData.Description}</p>
          </div>
        </div>
        <hr/>
        <div className="row" style={{justifyContent: 'center', flexDirection: 'col'}}>
          {tagList}
        </div>
        <hr/>
        <div className="row">
          <h4 className="text-center" style={{marginTop: '40px'}}>More works from {productData.Artist}</h4>
          <Products productData = {products} 
                        user={user} setUser={setUser}
                        cartCount = {cartCount}
                        setCartCount = {setCartCount}
                        flag = {0}
                        />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        Nothing to show
      </div>
    );
  }
  
  
  

}

export default ProductDetails;