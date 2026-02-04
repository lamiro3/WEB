// content ~ date format으로 날짜 반환

function getDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString(); // 반드시 1 더해줘야 함 (0 ~ 11 로 나타내기 때문)
    let day = date.getDate().toString();

    month = (month.length < 2) ? '0'+month : month;
    day = (day.length < 2) ? '0'+day : day;

    return {year, month, day};
}

module.exports = getDate;