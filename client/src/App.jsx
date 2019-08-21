import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Comment from './Comment'
import PicturesList from './PicturesList';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [rover, setRover] = useState('curiosity');

  const handleRoverChange = (e) => {
    setRover(e.target.name)
  };

  const logout = () => {
    localStorage.removeItem('mernToken');
    setToken('');
    setUser(null);
  }
  
  const liftToken = ({token, user}) => {
    setToken(token)
    setUser(user)
  }
  

  const handleUserLogin = (token, user, error) => {
    setToken(token)
    setUser(user)
    setErrorMessage(error)
  }

  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      handleUserLogin('', null, null)
      return
    }

    // we found a token in localStorage, verify it
    axios.post('/auth/me/from/token', {token})
      .then(({data}) => {
        if (data.type === 'error') {
          localStorage.removeItem('mernToken')
          handleUserLogin('', null, data.message)
          return
        }
      
        localStorage.setItem('mernToken', data.token);
        handleUserLogin(data.token, data.user, '')
      })
  }, []);

  if (!user) {
    return (
      <div>
        <h3>Please login or signup</h3>
        <Login />
        <Signup />
      </div>
    );
  }

  return (
    <Layout>
      <h2>Hello, {user.name}</h2>
      <button onClick={logout}>Logout</button>
      <Comment/>
      <PicturesList rover={rover} handleRoverChange={handleRoverChange}/>
    </Layout>
  )
}

function Layout({children, rover, handleRoverChange}) {

  return (
    <div className="App">
      <h1>Rover Mars</h1>
      <h3>click a rover to view pictures</h3>
      <h4>You're looking at the rover: <span className='roverFeed'>{rover}</span></h4>
      {children}
      <img className="roverImg" 
            onClick={handleRoverChange} 
            name='curiosity' 
            src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
            alt=""/>
      <a onClick={handleRoverChange} 
          name='curiosity'>Hi! I'm Curiosity</a>
      <img className="roverImg" 
            onClick={handleRoverChange} 
            name='opportunity' 
            src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
            alt=""/>
      <a onClick={handleRoverChange} 
          name='opportunity'>Hi! I'm Opportunity</a>
      <img className="roverImg" 
            onClick={handleRoverChange} 
            name='spirit' 
            src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" 
            alt=""/>
      <a onClick={handleRoverChange} 
          name='spirit'>Hi! I'm Spirit</a>
    </div>
  );
}

export default App;
