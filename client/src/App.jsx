import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import PictureList from './PictureList';
import Login from './Login';
import Signup from './Signup';

function App() {

  const [user, setUser] = useState();
  const [rover, setRover] = useState();
  const [picture, setPicture] = useState({});
  const [comment, setComment] = useState();
  const [test, setTest] = useState();

  useEffect(() => {
    // console.log('running first effect')
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=lwwON4lcFqWw0zXubbcETbUPjgEtP3st0LT6d2no').then((response) => {
      // console.log(response.data)
      setPicture(response.data.photos);
      // console.log(response.data.photos[0].img_src)
    })
  }, [])

  return (
    <div className="App">
      <h1>Rover Mars</h1>
      <Login />
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

//   checkForLocalToken() {
//     var token = localStorage.getItem('mernToken');
//     if (!token || token === 'undefined') {
//       // Token is invalid or missing
//       localStorage.removeItem('mernToken');
//       this.setState({
//         token: '',
//         user: null
//       })
//     } else {
//       // We found a token in localStorage, verify it
//       axios.post('/auth/me/from/token', {token})
//         .then( res => {
//           if (res.data.type === 'error') {
//             localStorage.removeItem('mernToken')
//             this.setState({
//               token: '',
//               user: null,
//               errorMessage: res.data.message
//             })
//           } else {
//             localStorage.setItem('mernToken', res.data.token);
//             this.setState({
//               token: res.data.token,
//               user: res.data.user,
//               errorMessage: ''
//             })
//           }
//       })
//     }
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
