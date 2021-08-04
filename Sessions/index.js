populateTable()
populateTableWithData(getSessions())
const tableMonths = document.getElementsByClassName('row')
const tableBody = document.getElementById('tablebody')
calculateSumEarned()
//populate months with corresponding links
lookForEmptyCell(1)
lookForLastFullCell(1)
for (let i = 0; i < 12; i++) {
    console.log(tableMonths[i])
    tableMonths[i].innerHTML = `<a href=\"/edit.html#x${tableMonths[i].innerText}\">${tableMonths[i].innerText}</a>`
}
