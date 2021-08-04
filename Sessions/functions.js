

uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16)
    })
}
saveSessionsDuplicates = (sessions) => {
    localStorage.setItem('duplicates', JSON.stringify(sessions))
}
getSessionsDuplicates = () => {
    const sessionsJSON = localStorage.getItem('duplicates')
    if (sessionsJSON !== null) {
        return JSON.parse(sessionsJSON)
    } else {
        return []
    }
}
saveSessions = (sessions) => {
    localStorage.setItem('sessions', JSON.stringify(sessions))
}

getSessions = () => {
    const sessionsJSON = localStorage.getItem('sessions')
    if (sessionsJSON !== null) {
        return JSON.parse(sessionsJSON)
    } else {
        return []
    }
}
//return array of session objects from JSON, the issue was, each time you add a session in edit screen,
// you lose all the previous data
getLastSessions = (sessions) => {
    const lastSes = getSessions()
    lastSes.forEach((ses) => {
        sessions.push(ses)
    })
}
getLastSessionsDupes = (sessions) => {
    const lastSes = getSessionsDuplicates()
    lastSes.forEach((ses) => {
        sessions.push(ses)
    })
}

getLastTableCell = (month) => {
    let i = 1
    while (document.getElementById(`${month},${i}`) != null) {
        i++
    }
    return i - 1
}

//gets the content and description you want to add to the bottom of the table
addTableElSum = (cellContent, decscriptionString, month) => {
    const tableTrEl = document.createElement('tr')
    const tableTdEl = document.createElement('td')
    const y = getLastTableCell(month)
    tableTrEl.appendChild(tableTdEl)
    tableTdEl.textContent = `${cellContent}${decscriptionString}`
    tableTdEl.bgColor = 'cyan'
    document.getElementById(`${month},${y}`).appendChild(tableTrEl)
}

lookForEmptyCell = (month)=>{
    let i = 1
    let cellContents = document.getElementById(`${month},${i}`)
    while(cellContents!=null && cellContents.textContent != ''){
        i++
        cellContents = document.getElementById(`${month},${i}`)
        console.log((cellContents.id))
    }
    return i
}

lookForLastFullCell = (month) =>{
    let i = 1
    let cellContents = document.getElementById(`${month},${i}`)
    let check 
    while( i<12){
        if(cellContents.textContent!='' )
        check = cellContents.id
        i++
        cellContents = document.getElementById(`${month},${i}`)
        
    }
    console.log((check))
    return check
}

//removes a session from JSON 
removeSession = (sessionUid) => {
    const sesJSON = getSessions()
    var updatedArray = []
    updatedArray = sesJSON.filter(ses => ses.uniqueId != sessionUid)
    
    saveSessions(updatedArray)
    return updatedArray
}

//populates table from JSON
populateTable1 = () => {
    console.log(getSessions())
    let sumEarned = 0
    let sesCount = 0
    getSessions().forEach((ses) => {
        const tableTrEl = document.createElement('tr')
        const tableTdEl = document.createElement('td')

        console.log(ses)
        let x = document.createElement('button')
        x.textContent = 'x'
        x.value = ses.uniqueId

        tableTdEl.textContent = `${ses.sessionId}`
        tableTdEl.appendChild(x)

        //assigns buttons with X
        x.addEventListener('click', function () {
            removeSession(x.value)
            location.assign("/index.html")
        })

        tableTrEl.appendChild(tableTdEl)

        document.getElementById('tablebody').appendChild(tableTrEl)
        sumEarned += parseInt(ses.price)
        sesCount++
    })
    // addTableElSum(sesCount, ':סהכ ססיות')
    // addTableElSum(sumEarned, '₪:סהכ  ')
}
getNumByMonth = (monthName) => {
    if (monthName.toLowerCase() == 'january')
        return 1
    if (monthName.toLowerCase() == 'february')
        return 2
    if (monthName.toLowerCase() == 'march')
        return 3
    if (monthName.toLowerCase() == 'april')
        return 4
    if (monthName.toLowerCase() == 'may')
        return 5
    if (monthName.toLowerCase() == 'june')
        return 6
    if (monthName.toLowerCase() == 'july')
        return 7
    if (monthName.toLowerCase() == 'august')
        return 8
    if (monthName.toLowerCase() == 'september')
        return 9
    if (monthName.toLowerCase() == 'october')
        return 10
    if (monthName.toLowerCase() == 'november')
        return 11
    if (monthName.toLowerCase() == 'december')
        return 12
}
//figure out how to avoid multiple presentation of the same session


populateTable = () => {
    for (let i = 1; i <= 12; i++) {
        const trEl = document.createElement('tr')
        document.getElementById('tablebody').appendChild(trEl)
        for (let x = 1; x < 13; x++) {
            const tdEl = document.createElement('td')
            tdEl.id = `${x},${i}`
            tdEl.textContent = ''
            document.getElementById('tablebody').appendChild(tdEl)
        }
    }
}

calculateSumEarned = () => {
    let i = 1
    let sum = 0
    let numOfSes = 0
    const sessionJSON = getSessions()
    for (let month = 1; month <= 12; month++) {
        while (document.getElementById(`${month},${i}`) != null) {
            const cellContents = document.getElementById(`${month},${i}`)
            if (cellContents.value != undefined) {
                sum += parseInt(cellContents.value)
                numOfSes++
            }
            i++
        }
        addTableElSum(sum, 'סהכ כסף', month)
        addTableElSum(numOfSes, 'סהכ ססיות', month)
        sum = 0
        numOfSes = 0
        i = 1
    }
}


populateTableWithData = (sessions = []) => {
    sessions.forEach((ses) => {
        let x = document.createElement('button')
        x.textContent = 'x'
        x.value = ses.uniqueId
        //assigns buttons with X
        x.addEventListener('click', function () {
            removeSession(x.value)
            location.assign("/index.html")
        })
        document.getElementById(`${ses.xPos},${ses.yPos}`).textContent = ses.sessionId
        document.getElementById(`${ses.xPos},${ses.yPos}`).value = ses.price
        document.getElementById(`${ses.xPos},${ses.yPos}`).appendChild(x)
    })
}

