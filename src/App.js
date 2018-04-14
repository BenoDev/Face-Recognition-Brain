import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import axios from 'axios';
import './App.css';



const particleOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area:1000
      }
    }                 
  }
}

class App extends Component {
  state = {
    input:'https://samples.clarifai.com/face-det.jpg',
    imageUrl:'https://samples.clarifai.com/face-det.jpg',
    boxes :[],
    route: 'signin',
    isSignedIn: false,
    user:{
      id: '',
      name: '',
      email: '',
      entries:0,
      joined : ''
    }
  }

loadUser=(data)=>{
  
  this.setState({ user:{ 
       id: data.id,
       name: data.name,
       email: data.email,
       entries:data.entries,
       joined : data.joined
  }})
}

calculateFaceLocation = (data)=>{
  const clarifaiFaces = data.outputs["0"].data.regions;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  
  return clarifaiFaces.map((face)=>{
    const clarifaiFace= face.region_info.bounding_box;
      return {
        id: face.id,
        leftCol: clarifaiFace.left_col*width,
        topRow : clarifaiFace.top_row*height,
        rightCol: width - (clarifaiFace.right_col*width),
        bottomRow : height - (clarifaiFace.bottom_row*height),}
  })
    
}


displayFaceBox = (boxes)=>{
  this.setState({boxes:boxes})
}

  onInputChange = (event)=>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl:this.state.input},()=>{
       axios.post('https://aqueous-ocean-26324.herokuapp.com/imageUrl',{
        input: this.state.imageUrl
       })
       .then(response=> {
        if(response.data){
          axios.patch('https://aqueous-ocean-26324.herokuapp.com/image',{
            id: this.state.user.id
          })
          .then(count=>{
            this.setState({user:{
              ...this.state.user,
              entries:count.data
            }})
          })
          .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocation(response.data))
      })
       .catch(err=> console.log(err))
  })
   
  }

  onRouteChange = (route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }


  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={particleOptions}
            />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home'
      ?<Fragment>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm
           onButtonSubmit={this.onButtonSubmit} 
           onInputChange={this.onInputChange} 
           value={this.state.input}/>
          <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
        </Fragment>
        :(this.state.route === 'signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :<Register loadUser={this.loadUser}onRouteChange={this.onRouteChange}/> 
          )}
      
      
      </div>
    );
  }
}

export default App;
