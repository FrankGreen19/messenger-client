import React from 'react';
import file from "../files/image.jpg";

const Image = () => {
    return (
        <div className="card bg-light text-white">
            <img className="card-img" src={file} alt="Card image" />
                <div className="card-img-overlay">
                    <p className="card-text">Выберете чат для начала общения</p>
                </div>
        </div>

    );
};

export default Image;