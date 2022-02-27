import React,{ useState, useEffect} from 'react';
import Axios from "axios";
import JumbotronExample from '../../Jumbo/jumbo.js';
import { useHistory, useParams } from 'react-router-dom';
import Products from '../../Products/ProductsBootstrap.jsx';


const Material = () => {
    
    const { material } = useParams();
    const [products, setProducts] = useState([]);
    const [artist, setArtist] = useState([]);
    const urlString = "http://localhost:4000/products/category/Drawings/material/" + material + "/";
    const urlArtist = "";
    console.log(urlString);

    const getProduct = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: urlString     //this is API url
        }).then((res)=>{
            const {data} = res;
            setProducts(data);
        })
    }

    const getArtist = () => {
      Axios({
          method: "GET",
          withCredentials: true,
          url: urlArtist     //this is API url
      }).then((res)=>{
          //console.log(res.data);
          const {data} = res;
          setArtist(data);
      })
  }


    useEffect(()=>{
        getProduct();
        if(Object.keys(products).length === 0){
          ;
        }else{
          urlArtist = products.Artist;
          getArtist();
        }
    },[] );


    
    return (
        <div>
            <JumbotronExample/>
            <Products productData={products}/>
        </div>
    );

}

export default Material;