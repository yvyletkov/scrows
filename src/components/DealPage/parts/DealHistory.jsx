import React from "react";

const DealHistory = ({history}) => {
    return <div className='card mb-4 mt-4 shadow-none'>
        <div className='card-header'>
            <div className={'font-weight-bold'}>История сделки</div>
        </div>

        <div className='card-body'>

            {history.map((item, index) => <div key={index} className='d-flex  mb-2'>
                    <div style={{height: "fit-content"}}
                         className="badge badge-outline-secondary mr-2 align-bottom">{item.time}
                    </div>
                    <div>{item.event}</div>
                </div>
            )}

        </div>

    </div>
};

export default DealHistory;
