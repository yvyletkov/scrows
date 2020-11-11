import React from "react";
import s from "../DealPage.module.css";

const StatusTimelineItem = ({item, status, descriptions, last, first}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    return <div key={item} onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={item < status ? `${s.statusItem} ${s.archieved} ${s.past}` : item === status ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
            {item < status ? <i className="fas fa-check fa-2x"></i> : item === status ?
                <i className="fas fa-spinner fa-3x"></i> : null}
        </div>
        <div
            className={`${s.statusDescription}
                ${last ? s.last : ""}
                ${first ? s.first : ""}
                ${(showDescr && s.active) || (((item <= status) && window.matchMedia("(min-width: 1200px)").matches) && s.active)}
                ${item === status ? s.current : ""}`}
        >
            {descriptions[item]}
        </div>
    </div>
}

const StatusTimeline = ({status = 5, withDelivery: delivery = true, problem = true}) => {

    let [descrShown, setDescrShown] = React.useState(false);

    const descriptions = {
        1: 'Сделка создана',
        2: 'Приглашение второго участника',
        3: 'Условия приняты, ожидается оплата',
        4: 'Сделка выполняется',
        5: 'Передано в доставку, ожидание приемки',
        6: 'Приемка работ заказчиком',
        7: 'Работы не приняты, передача в арбитраж',
        8: 'Работы приняты, сделка закрыта',
    }

    let amount = !delivery && !problem ? 6 : (delivery && !problem) || (!delivery && problem) ? 7 : 8;
    let array = [];
    for (let i = 1; i <= amount; i++) {
        array.push(i);
    }

    let statusItems = array.map((item, index) => {
        return <StatusTimelineItem item={item} first={index === 0} last={index === array.length - 1} descriptions={descriptions}
                                   status={status}/>
    });

    return (
        <div onMouseEnter={() => setDescrShown(true)} onMouseLeave={() => setDescrShown(false)}
             className={descrShown ? s.statusTimeline + ' ' + s.opened : s.statusTimeline}>
            {statusItems}
        </div>
    )
}


export default StatusTimeline