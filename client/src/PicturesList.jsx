import React from 'react'
import './App.css';

function PicturesList({pictures, handlePicturesChange}) {
    let content;
    // todo: only render if token is present
    console.log(pictures.length)
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
        content = <p>No rover pictures!</p>
    }
    return (
        <div>
            <h3>Rover Pictures</h3>
            {content}
        </div>
    )
}



export default PicturesList;