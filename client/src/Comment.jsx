import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function Comment({comments}) {

    const [newComment, setNewComment] = useState('');
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setNewComment();
        axios.post('/comment', {
            comment: newComment,
            like: false
        })
        // console.log('form submitted')
        // axios.post('/comments', ())
    }

    let content;
    // todo: only render if token is present
    if (comments) {
        content = comments.map((comments, id) => {
            return  <div>
                        <p alt='roverComments' 
                            className='rover-comments' 
                            key={id}>{comments.comment}</p>
                        <button action="DELETE">delete</button>
                    </div>
        })
        // content = <p>pictures are here</p>

    } else {
    // there is no data, show a placeholder
        content = <p>Click a rover to see pictures!</p>
    }

    return(
        <div>
            <h3>enter a comment below</h3>
            <form onSubmit={handleCommentSubmit} action="POST">
                <textarea name="comment" cols="30" rows="10"></textarea>
                <button>Submit</button>
            </form>
            {content}
        </div>
    )
}

export default Comment;
