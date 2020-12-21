import React from "react";
import queryString from 'querystring'


const ExtraPage = (props) => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const title = params.get('title');
    const content = params.get('content');

    // console.log('PROPS', parsed)

    return (
        <div className="container my-4">
            <div className='card shadow-none'>
                <div className='card-header'>{title}</div>
                <div className='card-body'>{content}</div>
            </div>
        </div>
    )
}


export default ExtraPage;
