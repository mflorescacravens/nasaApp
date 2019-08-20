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
  const [rover, setRover] = useState('curiosity');
  const [pictures, setPictures] = useState({});
  const [comments, setComments] = useState();
  const [errorMessage, setErrorMessage] = useState('')
  const [newComment, setNewComment] = useState('')

  const logout = () => {
    localStorage.removeItem('mernToken');
    setToken('');
    setUser(null);
  }
  
  const liftToken = ({token, user}) => {
    setToken(token)
    setUser(user)
  }
  
  const handleRoverChange = (e) => {
    setRover(e.target.name)
  }

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

  useEffect(() => {
    axios.get('/comments/').then((response) => {
      setComments(response.data)
      // console.log(comments)
    })
  },[])

  useEffect(() => {
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=1&api_key=lwwON4lcFqWw0zXubbcETbUPjgEtP3st0LT6d2no`).then((response) => {
      setPictures(response.data.photos);
      // console.log(rover)
    }) 
  }, [rover])

  var content;
  if (user) {
    content = (
      <div>
        <h2>Hello, {user.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>
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
      <h3>click a rover to view pictures</h3>
      {content}
      <img className="roverImg" onClick={handleRoverChange} name='curiosity' src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a onClick={handleRoverChange} name='curiosity'>Hi! I'm Curiosity</a>
      <img className="roverImg" onClick={handleRoverChange} name='opportunity' src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a onClick={handleRoverChange} name='opportunity'>Hi! I'm Opportunity</a>
      <img className="roverImg" onClick={handleRoverChange} name='spirit' src="https://spaceplace.nasa.gov/mars-curiosity/en/sojourner.png" alt=""/>
      <a onClick={handleRoverChange} name='spirit'>Hi! I'm Spirit</a>
      <Comment newComment={newComment} comments={comments} handleNewComment={setNewComment} handleCommentsChange={setComments}/>
      <PicturesList pictures={pictures} handlePicturesChange={setPictures} />
    </div>
  )

}

export default App;
