import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import PictureList from './PictureList';
import Login from './Login';
import Signup from './Signup';

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [rover, setRover] = useState();
  const [picture, setPicture] = useState({});
  const [comment, setComment] = useState();
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      setToken('')
      setUser(null)
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setToken('')
            setUser(null)
            setErrorMessage(res.data.message)
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token)
            setUser(res.data.user)
            setErrorMessage('')
          }
        })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('mernToken');
    setToken('')
    setUser(null)
  }
  
  const liftToken = ({token, user}) => {
    console.log('setting user: ', user);
    console.log('setting token: ', token)
    setToken(token)
    setUser(user)
  }
  

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

  var content;
  if (user) {
    content = (
      <>
        <h1>Hello, {user.name}</h1>
        <button onClick={logout}>Logout</button>
        <PictureList />
      </>
    )
  } else {
    content = (
      <div>
        <h3>Please login or signup</h3>
        <Login />
        <Signup />
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Rover Mars</h1>
      {content}
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

export default App;
