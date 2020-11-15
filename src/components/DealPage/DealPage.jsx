import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {getDealInfo} from "../../redux/DealPageReducer";
import Sidebar from "./parts/Sidebar";
import StatusTimeline from "./parts/StatusTimeline";
import Chat from "./parts/Chat";
import DealHistory from "./parts/DealHistory";
import DealFiles from "./parts/DealFiles";
import Preloader from "../shared/Preloader/Preloader";

const DealPage = ({chatMessages, getDealInfo, id = 1, ...props}) => {

    React.useEffect( () => {
        getDealInfo(id);
    },[getDealInfo, id]);

    const onChatFormSubmit = values => {
        console.log(values);
    }

    console.log(props);

    if (props.isFetching) return <div className='mt-5'><Preloader/></div>;

    return (
        <div style={{marginTop: "4rem"}} className='container mb-4'>

            <div className='card'>
                <div className="card-header">
                    <div className={'d-md-flex justify-content-between'}>
                        <h3 className='mb-0'><span className="badge badge-secondary">Сделка №{props.dealId}</span></h3>
                        <h3 className='mb-0'><span className="badge badge-secondary">Сумма: {props.amount}₽</span></h3>
                    </div>
                </div>
                <div className="card-body">
                    <div>{props.status.title}</div>
                </div>
            </div>

            <StatusTimeline statusId={+props.status.id}/>

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
                                        <p>{props.subject}</p>
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

                    <Sidebar {...props}/>

                </div>
            </div>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        chatMessages: state.deal.chatMessages,
        dealId: state.deal.dealId,
        subject: state.deal.subject,
        status: state.deal.status,
        dealType: state.deal.dealType,
        users: state.deal.users,
        amount: state.deal.amount,
        isFetching: state.deal.isFetching,
    }
}

export default connect(mapStateToProps, {getDealInfo})(DealPage);