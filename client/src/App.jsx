import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import PictureList from './PictureList';
import Login from './Login';
import Signup from './Signup';

function App() {

  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [rover, setRover] = useState();
  const [picture, setPicture] = useState({});
  const [comment, setComment] = useState();
  
  // useEffect(() => {
  //   // console.log('token effect running')
  //   // token = localStorage.getItem('mernToken');
  //   if (!token || token === 'undefined') {
  //     setToken(localStorage.removeItem('mernToken'));
  //   } else {
  //     axios.post('/auth/me/from/token', {token})
  //     .then( res => {
  //       if (res.data.type === 'error') {
  //         setToken(localStorage.removeItem('mernToken'));
  //       }
  //     })
  //   }
  // })

  useEffect(() => {
    // console.log('user effect running')
    if (user) {
      console.log('user is logged in')
    } else {
      console.log('No user logged in')
    }
  }, [])

  useEffect(() => {
    console.log('rover effect running')
    // todo: have this on click change photos to specific rover
    // setRover()
  })

  useEffect(() => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=1&api_key=lwwON4lcFqWw0zXubbcETbUPjgEtP3st0LT6d2no`).then((response) => {
      setPicture(response.data.photos);
    }) 
  }, [])

  // useEffect(() => {
  //   setToken(localStorage.removeItem('mernToken'));
  // })

  return (
    <div className="App">
      <h1>Rover Mars</h1>
      <h3>Sign in/up!!!</h3>
      <Login />
      <Signup />
      <img className="roverImg" src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a>Hi! I'm Curiosity</a>
      <img className="roverImg" src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a>Hi! I'm Opportunity</a>
      <img className="roverImg" src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a>Hi! I'm Spirit</a>
      <PictureList picture={picture} handlePictureChange={setPicture}/>
    </div>
  )

}



// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       token: '',
//       user: null,
//       errorMessage: '',
//       apiData: null
//     }
//     this.checkForLocalToken = this.checkForLocalToken.bind(this);
//     this.liftToken = this.liftToken.bind(this);
//     this.logout = this.logout.bind(this);
//   }


//   liftToken({token, user}) {
//     this.setState({
//       token,
//       user
//     })
//   }

//   logout() {
//     // Remove token from localStorage
//     localStorage.removeItem('mernToken');
//     // Remove user and token from state
//     this.setState({
//       token: '',
//       user: null
//     })
//   }

//   componentDidMount() {
//     this.checkForLocalToken()
//   }
//   render() {
//     var user = this.state.user
//     var contents;
//     if (user) {
//       contents = (
//         <>
//           <p>Hello, {user.name}</p>
//           <p onClick={this.logout}>Logout</p>
//         </>
//       )
//     } else {
//       contents = (
//         <>
//           <p>Please signup or login</p>
//           <Login liftToken={this.liftToken} />
//           <Signup liftToken={this.liftToken} />
//         </>
//       )
//     }
//     return(
//       contents
//     );

//   }
// }


export default App;
