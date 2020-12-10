import React from "react";
import AddDealReduxForm from "./AddDealReduxForm";
import {postNewDeal} from "../../redux/AddDealPageReducer";
import {connect} from "react-redux";


const AddDealPage = ({postNewDeal}) => {

    let [step, setStep] = React.useState(1);

    const submit = (values) => {
        console.log(values);
        postNewDeal(values);
    };

    return (
        <div className='container'>
            <div className='card shadow-none mt-4'>
                <div className='card-header font-weight-bold'>Создание новой безопасной сделки (ШАГ {step})</div>
                <div className='card-body'>

                    <div style={{height: '13px'}} className="progress mb-5">
                        <div onClick={() => setStep(1)}
                             className={'progress-bar'} role="progressbar"
                             style={{width: "33.33%", height: "13px", cursor: "pointer", backgroundColor: '#60ca56'}}
                             aria-valuenow="33.33" aria-valuemin="0" aria-valuemax="100">ШАГ 1</div>
                        <div onClick={() => setStep(2)} hidden={step < 2}
                             className="progress-bar"
                             role="progressbar"
                             style={{width: "33.33%", height: "13px", cursor: "pointer", backgroundColor: '#5dbb55'}}
                             aria-valuenow="66.66" aria-valuemin="0" aria-valuemax="100">ШАГ 2</div>
                        <div onClick={() => setStep(3)} hidden={step < 3}
                             className="progress-bar"
                             role="progressbar"
                             style={{width: "33.33%", height: "13px", cursor: "pointer", backgroundColor: '#56ac55'}}
                             aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">ШАГ 3</div>
                    </div>

                    <AddDealReduxForm onSubmit={submit} step={step} setStep={setStep} initialValues={{userRole: "1", dealType: "1", whoPays: "1"}}/>

                </div>
            </div>
        </div>
    )
};


export default connect(null, {postNewDeal})(AddDealPage);