import React from "react";
import "./Preloader.css";

const Preloader = () => {
    return (
        <div style={{position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: '1000'}}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Preloader;