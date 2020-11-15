import React from "react";
import s from "../DealPage.module.css";

const StatusTimelineItem = ({item, statusId, descriptions, last, first}) => {

    let [showDescr, setShowDescr] = React.useState(false);

    return <div key={item} onMouseEnter={() => setShowDescr(true)} onMouseLeave={() => setShowDescr(false)}
                className={s.statusItemWrapper}>
        <div
            className={item < statusId ? `${s.statusItem} ${s.archieved} ${s.past}` : item === statusId ? `${s.statusItem} ${s.archieved}` : `${s.statusItem}`}>
            {item < statusId ? <i className="fas fa-check fa-2x"></i> : item === statusId ?
                <i className="fas fa-spinner fa-3x"></i> : null}
        </div>
        <div
            className={`${s.statusDescription}
                ${last ? s.last : ""}
                ${first ? s.first : ""}
                ${(showDescr && s.active) || (((item <= statusId) && window.matchMedia("(min-width: 1200px)").matches) && s.active)}
                ${item === statusId ? s.current : ""}`}
        >
            {descriptions[item]}
        </div>
    </div>
}

const StatusTimeline = ({statusId, withDelivery: delivery = true, problem = true}) => {

    let [descrShown, setDescrShown] = React.useState(false);

    const descriptions = {
        0: 'Сделка создана',
        1: 'Приглашение второго участника',
        2: 'Условия приняты, ожидается оплата',
        3: 'Сделка выполняется',
        4: 'Передано в доставку, ожидание приемки',
        5: 'Приемка работ заказчиком',
        6: 'Работы не приняты, передача в арбитраж',
        7: 'Работы приняты, сделка закрыта',
    }

    let amount = !delivery && !problem ? 5 : (delivery && !problem) || (!delivery && problem) ? 6 : 7;
    let array = [];
    for (let i = 0; i <= amount; i++) {
        array.push(i);
    }

    let statusItems = array.map((item, index) => {
        return <StatusTimelineItem item={item} first={index === 0} last={index === array.length - 1} descriptions={descriptions}
                                   statusId={statusId}/>
    });

    return (
        <div onMouseEnter={() => setDescrShown(true)} onMouseLeave={() => setDescrShown(false)}
             className={descrShown ? s.statusTimeline + ' ' + s.opened : s.statusTimeline}>
            {statusItems}
        </div>
    )
}


export default StatusTimeline