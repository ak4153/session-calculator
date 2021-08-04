
howManySesWithSameMonth = (sessions, month) => {
    let i = 0
    sessions.forEach((ses) => {
        if (getNumByMonth(ses.month) == (month))
            i++
    })
    if (i == 0)
        return null
    else
        return i
}


const sessions = []
document.getElementById("addSessionButton").addEventListener('click', function () {
    const checkBoxEl = document.querySelectorAll("input")
    getLastSessions(sessions)
    checkBoxEl.forEach((box) => {
        if (box.checked) {
            console.log()
            const ses = new Session(box.id, box.value, document.URL.slice(document.URL.indexOf('x') + 1), uuidv4(), getNumByMonth(document.URL.slice(document.URL.indexOf('x') + 1)), howManySesWithSameMonth(sessions,null))
            sessions.push(ses)
             ses.yPos = howManySesWithSameMonth(sessions, getNumByMonth(document.URL.slice(document.URL.indexOf('x') + 1)))
            // ses.yPos = lookForEmptyCell(getNumByMonth(ses.month))
            sessions.pop()
            sessions.push(ses)
        }
    })
    location.reload()
    saveSessions(sessions)
})

