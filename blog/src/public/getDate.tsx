function getDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    month = (month.length < 2) ? '0'+month : month;
    day = (day.length < 2) ? '0'+day : day;

    return {year, month, day};
}

export default getDate;