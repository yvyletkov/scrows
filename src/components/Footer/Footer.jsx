import React from "react";


const Footer = (props) => {

    return (
        <footer className='w-100 container-fluid footer p-5 mt-5' style={{background: "#5fbdff1f"}}>
            <div className="container">
                <p style={{color: "#fff"}}> SCROWS.RU - лучший сервис безопасных сделок © {new Date().getFullYear()} </p>
            </div>
        </footer>
    );
}

export default Footer;