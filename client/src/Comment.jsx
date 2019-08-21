import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Edit from './Edit'

function Comment() {
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        axios.get('/comments').then((response) => {
          setComments(response.data)
        })
    }, [comments])
    
    const handleCommentSubmit = (comment) => (e) => {
        e.preventDefault();
        setNewComment(e.target.comment.value)
        axios.post('/comments', {
            comment: newComment,
            like: false
        }).then( () => setNewComment(""))
    }

    const handleDeleteComment = (id) => (e) => {
        e.preventDefault();
        axios.delete(`/comments/${comments[id]._id}`, () => {});
    }

    const handleEditComment = (id) => (e) => {
        e.preventDefault();
        axios.put(`/comments/${comments[id]._id}`, () => {});
    }

    let content;
    if (comments) {
        content = comments.map((comments, id) => {
            
            return  <form onSubmit={handleDeleteComment(id)}>
                        <p alt='roverComments'
                            className='rover-comments' 
                            key={id}>{comments.comment}</p>
                        <Edit comment={comments.comment} edit={handleEditComment} ></Edit>
                        <button action="DELETE">delete</button>
                    </form>
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
                <textarea name="comment" onChange={e => setNewComment(e.target.value)} cols="80" rows="5">{newComment}</textarea>
                <br/>
                <button>Submit</button>
            </form> */}
            {content}
        </div>
    )
}

export default Comment;
