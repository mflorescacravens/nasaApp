import React from 'react'
import './App.css';

function PicturesList({pictures, handlePicturesChange}) {
    let content;
    // todo: only render if token is present
    if (pictures.length) {
        content = pictures.map((picture, id) => {
            return  <img alt='roverPicture' 
                className='rover-pictures' 
                src={picture.img_src} onClick={() => handlePicturesChange(picture.img_src)} 
                key={id} />
        })
        // content = <p>pictures are here</p>

    } else {
    // there is no data, show a placeholder
        content = <p>Click a rover to see pictures!</p>
    }
    return (
        <div>
            <h3>Rover Pictures</h3>
            {content}
        </div>
    )
}



export default PicturesList;