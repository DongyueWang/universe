
function changeToQueryDate(date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return `${year}-${month}-${day}`;
}

function changeToDate(strdate) {
    let [stY, stM, stD] = strdate.split('-');
    return new Date(stY, parseInt(stM, 10) - 1, stD);
}

function getStoreDate(keyDate, initDate) {
    try {
        const strdate = JSON.parse(localStorage.getItem(keyDate));
        if (!strdate)
            return initDate
        let lcdate = new Date(strdate);
        console.log('lcdate', lcdate);
        let queryDate = changeToQueryDate(lcdate);
        return queryDate ?? initDate;
    } catch (err) {
        return initDate
    }
}

export { getStoreDate, changeToQueryDate, changeToDate }