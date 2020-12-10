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

export const getChatMessages = createSelector(
    [getChatMessagesData, getDealParticipantsData],
    (messagesData, participantsData) => {
        return messagesData.map(item => {
            let name = 'Администратор'
            for (let i = 0; i <= 1; i++) {
                if (participantsData[i].user.email === item.sender) {
                    if (participantsData[0].user.name !== participantsData[i].user.name[1]) {
                        name = participantsData[i].user.name
                    }
                    else name = participantsData[i].user.name + ' ' + participantsData[i].user.last_name
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