import React from 'react'
import './App.css';

function PictureList({picture, handlePictureChange}) {
    let content;
    // todo: only render if token is present
    if (picture.length) {
        content = picture.map((picture, id) => {
            return  <img alt='roverPicture' className='rover-pictures' src={picture.img_src} onClick={() => handlePictureChange(picture.img_src)} key={id} />
        })

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


export default PictureList;