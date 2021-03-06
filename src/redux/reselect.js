import {createSelector} from "reselect"

const normalizeDate = (date) => new Date(date).toLocaleString('ru', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: 'numeric',
});

const getChatMessagesData = (state) => state.deal.chatMessages
const getDealParticipantsData = (state) => state.deal.participants
const getDealHistoryData = (state) => state.deal.history
const getDealPayMethods = (state) => state.deal.payMethods
const getDealFilesObj = (state) => state.deal.files

export const getChatMessages = createSelector(
    [getChatMessagesData, getDealParticipantsData],
    (messagesData, participantsData) => {
        return messagesData.map(item => {
            let name = 'Администратор'
            for (let i = 0; i <= 1; i++) {
                if (participantsData[i].user.email === item.sender) {
                    if (participantsData[0].user.name !== participantsData[i].user.name[1]) {
                        name = participantsData[i].user.name
                    } else name = participantsData[i].user.name + ' ' + participantsData[i].user.last_name
                }
            }

            return {
                messageText: item.content.message,
                userName: name,
                time: `(${normalizeDate(item.created_at)})`,
            }
        })
    }
)

export const getDealHistory = createSelector(
    [getDealHistoryData],
    (historyData) => {
        return historyData.map(item => ({
            event: item.content.message,
            time: normalizeDate(item.created_at),
        }))
    }
)

export const getDealFileNamesArray = createSelector(
    [getDealFilesObj],
    (filesObj) => {
        return filesObj.map(item => item.name)
    }
)

export const getPayMethodsList = createSelector(
    [getDealPayMethods],
    (payMethods) => {

        console.log('PAYMETHODS in reselect', payMethods)

        let payMethodsList = [];

        if (payMethods.cards) payMethods.cards.map(item => {
            payMethodsList = [
                ...payMethodsList,
                {type: "cards", id: item.id, title: item.title}
            ]
        })
        if (payMethods.extra) payMethods.extra.map(item => {
            payMethodsList = [
                ...payMethodsList,
                {type: "extra", id: item.id, title: item.title}
            ]
        })
        console.log('payMethodsList', payMethodsList)
        return payMethodsList;

    })
