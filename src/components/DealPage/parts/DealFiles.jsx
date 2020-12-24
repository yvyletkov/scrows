import React from "react";
import docIcon from "../../../img/icons8-document.svg";
import imgIcon from "../../../img/icons8-picture.svg";

const DealFiles = ({fileNamesArray}) => {

    const imgFormats = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'gif'];

    const fileFormats = fileNamesArray.map( item => item.split(".").splice(-1,1)[0])

    console.log(fileFormats)

    const fileLinks = fileNamesArray.map( (item, index) => {
        let isImg = false;
        const format = item.split(".").splice(-1,1)[0];
        if (imgFormats.includes(format)) isImg = true

        return <div className={`${index !== fileNamesArray.length - 1 && 'mb-3'} position-relative`} >
            <img style={{filter: 'invert(0.7)', width: '25px', top: '-4px', position: 'absolute', display: 'inline'}} src={isImg ? imgIcon : docIcon} alt=""/>
            <a style={{marginLeft: '35px'}} className='d-block text-black' href={`https://api.scrows.ml/api/v1/media/get/${item}`}>{item}</a>
            {index !== fileNamesArray.length - 1 && <hr/>}
        </div>
    })

    return <div className='card shadow-none'>
            <div className="card-header">
                <div className={'font-weight-bold'}>Файлы сделки</div>
            </div>
            <div className='card-body'>
                {fileLinks.length ? fileLinks : <p>Файлы не прикреплены <span style={{fontSize: '200%', verticalAlign: 'sub'}}>😢</span></p>}
            </div>
        </div>
};

export default DealFiles;
