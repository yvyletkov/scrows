import React from "react";
import s from "../DealPage.module.css";
import classNames from "classnames";

const StatusTimelineItem = ({title, index, currentStatusPriority, last, first, error}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    const itemClassNames = classNames(s.statusItem, {[s.archieved]: index <= currentStatusPriority, [s.past]: index < currentStatusPriority, [s.error]: error});
    const descrClassNames = classNames(s.statusDescription, {
        [s.active]: showDescr || ((index <= currentStatusPriority) && window.matchMedia("(min-width: 1200px)").matches),
        [s.current]: index === currentStatusPriority,
        [s.error]: error,
        [s.first]: first,
        [s.last]: last,
        [s.small]: currentStatusPriority === 7
    });

    return <div onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={itemClassNames}>
            {index < currentStatusPriority ? <i className="fas fa-check fa-2x"></i> : index === currentStatusPriority ?
                <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : null}
        </div>
        <div
            className={descrClassNames}
        >
            {title}
        </div>
    </div>
};

const StatusTimeline = ({possibleStatuses, currentStatusPriority}) => {

    let [descrShown, setDescrShown] = React.useState(false);

    if (currentStatusPriority !== 7 && currentStatusPriority !== undefined) {
        possibleStatuses = possibleStatuses.filter( i => i.priority !== 7)
    }

    let statusItems = possibleStatuses.map((item, index) => {
        return <StatusTimelineItem key={index} title={item.title} index={index} error={item.priority === 7} first={index === 0}
                                   last={index === possibleStatuses.length - 1}
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