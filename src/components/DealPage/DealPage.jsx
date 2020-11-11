import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {setNewMessage} from "../../redux/DealPageReducer";
import Sidebar from "./parts/Sidebar";
import StatusTimeline from "./parts/StatusTimeline";
import Chat from "./parts/Chat";
import DealHistory from "./parts/DealHistory";
import DealFiles from "./parts/DealFiles";

const DealPage = ({statusName = "Передано в доставку, ожидание приемки", chatMessages}) => {

    console.log(chatMessages)

    const onChatFormSubmit = values => {
        console.log(values);
    }

    return (
        <div style={{marginTop: "4rem"}} className='container mb-4'>

            <div className='card'>
                <div className="card-header">
                    <div className={'d-md-flex justify-content-between'}>
                        <h3 className='mb-0'><span className="badge badge-secondary">Cделка №2135</span></h3>
                        <h3 className='mb-0'><span className="badge badge-secondary">Сумма: 15 000 ₽</span></h3>
                    </div>
                </div>
                <div className="card-body">
                    <div>{statusName}</div>
                </div>
            </div>

            <StatusTimeline/>

            <div className='row mt-4'>
                <div className='col-md-8 px-0 px-md-3'>

                    <div className={'card ' + s.main}>

                        <div className='row mb-lg-0 m-0'>

                            <div className={'col-lg-6 mb-4 mb-lg-0 pr-lg-2 pl-lg-0 px-0'}>
                                <div className='card shadow-none'>
                                    <div className="card-header">
                                        <div className={'font-weight-bold'}>Предмет сделки</div>
                                    </div>
                                    <div className='card-body'>
                                        <p>Жидкая сварка</p>
                                    </div>
                                </div>
                            </div>

                            <div className={'col-lg-6 pl-lg-2 px-0'}>
                                <DealFiles/>
                            </div>

                        </div>

                        <DealHistory/>
                        <Chat onChatFormSubmit={onChatFormSubmit} chatMessages={chatMessages}/>

                    </div>

                </div>

                <div className='col-md-4 pl-md-0 px-0 px-md-3'>

                    <Sidebar/>

                </div>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        chatMessages: state.deal.chatMessages
    }
}

export default connect(mapStateToProps, {setNewMessage})(DealPage);