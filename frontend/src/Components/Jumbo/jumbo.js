import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function JumbotronExample() {
  var styles ={
    backgroundImage: "url(https://res.cloudinary.com/ramzi/image/upload/v1624645727/1_lpfbrn.jpg)",
    padding: '15px'
  }
  /* return (
    <Jumbotron style={styles}>
      <h1 className="text-light">Art is life</h1>
      <p className="text-light">Think life without art. You are hungry, right!</p>
    </Jumbotron>
); */
    return (
      <div className="jumbotron jumbotron-fluid" style={{marginTop:'0px', height:'200px'}}>
        <div className="container-fluid" style={styles}>
          <h1 className="display-4 text-light">Art is life</h1>
          <hr className="my-4"/>
          <h5 className="text-light">You don't take a photograph, you make it</h5>
        </div>
      </div>
    );
  
}
