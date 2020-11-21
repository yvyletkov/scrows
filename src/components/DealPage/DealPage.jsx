import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {getDealInfo, getPossibleStatuses} from "../../redux/DealPageReducer";
import Sidebar from "./parts/Sidebar";
import StatusTimeline from "./parts/StatusTimeline";
import Chat from "./parts/Chat";
import DealHistory from "./parts/DealHistory";
import DealFiles from "./parts/DealFiles";
import Preloader from "../shared/Preloader/Preloader";
import {NavLink} from "react-router-dom";

const DealPage = ({chatMessages, getDealInfo, getPossibleStatuses, notFound, ...props}) => {

    const idForRequest = props.match.params.id;

    console.log('idForRequest', idForRequest);

    // console.log('dealPage props', props);

    React.useEffect( () => {
        getDealInfo(idForRequest);
        getPossibleStatuses();
    },[getDealInfo, idForRequest, getPossibleStatuses]);

    const onChatFormSubmit = values => {
        console.log(values);
    }

    if (props.isFetching) return <div className='mt-5'><Preloader/></div>;

    return (
        <div style={{marginTop: "4rem"}} className='container mb-4'>

            <div className='card'>
                <div className="card-header">
                    <div className={'d-md-flex justify-content-between'}>
                        {!notFound ? <h4 className='mb-0'><span className="mb-2 mb-md-0 badge badge-outline-secondary">Сделка №{props.dealId}</span></h4>
                            : <p><b>К сожалению, сделки с таким ID ({idForRequest}) не существует</b></p> }
                        {!notFound && <h4 className='mb-0'><span className="badge badge-secondary">Сумма: {props.price}₽</span></h4>}
                    </div>
                </div>
                <div className="card-body">
                    {!notFound ? <div>{props.status.title}</div>
                        : <NavLink className='btn btn-light' to={'/deals'}>Вернуться к списку сделок</NavLink>}
                </div>
            </div>


            {!notFound && <StatusTimeline currentStatusPriority={props.status.priority} possibleStatuses={props.possibleStatuses}/>}

            {!notFound && <div className='row mt-4'>
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
            </div> }
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        notFound: state.deal.notFound,
        dealId: state.deal.dealId,
        participants: state.deal.participants,
        createdAt: state.deal.createdAt,
        subject: state.deal.subject,
        status: state.deal.status,
        commissionType: state.deal.commissionType,
        commissionAmount: state.deal.commissionAmount,
        dealType: state.deal.dealType,
        price: state.deal.price,
        possibleStatuses: state.deal.possibleStatuses,
        chatMessages: state.deal.chatMessages,
        isFetching: state.deal.isFetching,
    }
}

export default connect(mapStateToProps, {getDealInfo, getPossibleStatuses})(DealPage);