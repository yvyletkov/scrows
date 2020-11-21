import React from "react";
import s from "../DealPage.module.css";

const StatusTimelineItem = ({title, index, currentStatusPriority, last, first}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    return <div key={index} onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={index < currentStatusPriority ? `${s.statusItem} ${s.archieved} ${s.past}` : index === currentStatusPriority ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
            {index < currentStatusPriority ? <i className="fas fa-check fa-2x"></i> : index === currentStatusPriority ?
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : null}
        </div>
        <div
            className={`${s.statusDescription}
                ${last ? s.last : ""}
                ${first ? s.first : ""}
                ${(showDescr && s.active) || (((index <= currentStatusPriority) && window.matchMedia("(min-width: 1200px)").matches) && s.active)}
                ${index === currentStatusPriority ? s.current : ""}`}
        >
            {title}
        </div>
    </div>
}

const StatusTimeline = ({possibleStatuses, currentStatusPriority, problem = false, ...props}) => {

    let [descrShown, setDescrShown] = React.useState(false);


    let statusItems = possibleStatuses.map((item, index) => {
        return <StatusTimelineItem title={item.title} index={index} first={index === 0} last={index === possibleStatuses.length - 1}
                                   currentStatusPriority={currentStatusPriority}/>
    });

    return (
        <div onMouseEnter={() => setDescrShown(true)} onMouseLeave={() => setDescrShown(false)}
             className={descrShown ? s.statusTimeline + ' ' + s.opened : s.statusTimeline}>
            {statusItems}
        </div>
    )
}


export default StatusTimeline