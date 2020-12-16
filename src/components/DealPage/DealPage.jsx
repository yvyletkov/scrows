import React from "react";
import s from "./DealPage.module.css";
import './DealPage.module.css'
import {connect} from "react-redux";
import {
    getTransitions,
    getDealInfo,
    getMessages,
    getHistory,
    getPossibleStatuses,
    postNewMessage,
    makeTransition
} from "../../redux/DealPageReducer";
import Sidebar from "./parts/Sidebar";
import StatusTimeline from "./parts/StatusTimeline";
import Chat from "./parts/Chat";
import DealHistory from "./parts/DealHistory";
import DealFiles from "./parts/DealFiles";
import Preloader from "../shared/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import {getChatMessages, getDealHistory} from "../../redux/reselect";

export const TransitionButtons = ({makeTransition, dealId, transitions, mediaQuery}) => {

    console.log('TRANSIRIONS PROPS', dealId)

    const handleClick = (keyword) => {
        makeTransition(dealId, keyword)
    }
    if (window.matchMedia(mediaQuery).matches) {
        if (transitions.length)
            return transitions.map(item => <div onClick={() => handleClick(item.keyword)}
                                                className='btn w-100 mb-3 btn-success'>{item.transition_description}</div>)
        else return <div className='btn disabled w-100 mb-3 btn-success'>Сейчас Вам недоступен переход<br/>к следующему статусу сделки</div>
    }
    else return null
}

const DealPage = ({chatMessages, getDealInfo, getPossibleStatuses, getTransitions, getMessages, postNewMessage, getHistory, notFound, ...props}) => {

    const idForRequest = props.match.params.id;
    const priceString = props.price && props.price.toString().replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');

    React.useEffect(() => {
        getDealInfo(idForRequest);
        getPossibleStatuses();
        getTransitions(idForRequest);
        getMessages(idForRequest);
        getHistory(idForRequest)
    }, [idForRequest]);

    React.useEffect(() => {
        const interval = setInterval(() => getMessages(idForRequest), 4000);
        return clearInterval(interval);
    }, []);

    const onChatFormSubmit = values => {
        console.log('chatFormValues', values)
        postNewMessage(props.dealId, values.messageText);
    };

    if (props.isFetching) return <div className='mt-5'><Preloader/></div>;

    return (
        <div style={{marginTop: "2rem"}} className='container mb-4'>

            <div className='card shadow-none'>
                <div className="card-header">
                    <div className={'d-md-flex justify-content-between'}>

                        {!notFound ?
                            <h4 className='mb-0'><span className="mb-2 mb-md-0">Сделка №{props.dealId}</span></h4>
                            : <p><b>К сожалению, сделки с таким ID ({idForRequest}) не существует</b></p>}

                        {/*{!notFound && <div>{props.status.title}</div>}*/}

                        {!notFound &&
                        <h4 className='mb-0'><span className="">Сумма: {priceString}₽</span></h4>}

                    </div>
                </div>
                {notFound ? <div className="card-body">
                    <NavLink className='btn btn-light' to={'/deals'}>Вернуться к списку сделок</NavLink>
                </div> : null}
            </div>


            {!notFound &&
            <StatusTimeline currentStatusPriority={props.status.priority} possibleStatuses={props.possibleStatuses}/>}

            {!notFound && <div className='row mt-4'>
                <div className='col-md-8 px-md-3'>

                    <div className={'p-0 ' + s.main}>

                        <TransitionButtons makeTransition={props.makeTransition} dealId={props.dealId}
                                           mediaQuery={'(max-width: 767px)'} transitions={props.transitions}/>

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

                        <DealHistory history={props.history}/>
                        <Chat onChatFormSubmit={onChatFormSubmit} chatMessages={chatMessages}
                              participants={props.participants}/>

                    </div>

                </div>

                <div className='col-md-4 pl-md-0 px-md-3'>

                    <Sidebar {...props}/>

                </div>
            </div>}
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        notFound: state.deal.notFound,
        dealId: state.deal.dealId,
        transitions: state.deal.transitions,
        participants: state.deal.participants,
        createdAt: state.deal.createdAt,
        subject: state.deal.subject,
        status: state.deal.status,
        commissionType: state.deal.commissionType,
        commissionAmount: state.deal.commissionAmount,
        dealType: state.deal.dealType,
        price: state.deal.price,
        possibleStatuses: state.deal.possibleStatuses,
        chatMessages: getChatMessages(state),
        history: getDealHistory(state),
        isFetching: state.deal.isFetching,
        chatIsFetching: state.deal.chatIsFetching,
    }
}

export default connect(mapStateToProps, {
    getDealInfo,
    getPossibleStatuses,
    getTransitions,
    makeTransition,
    getMessages,
    getHistory,
    postNewMessage
})(DealPage);