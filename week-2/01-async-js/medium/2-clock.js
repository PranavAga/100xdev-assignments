var counter=0;

function get12hour(hour){
    return hour>12?hour%12+12:hour
}
function displayTime(){
    const currDate=new Date()

    // HH:MM::SS
    console.log(currDate.getHours()+":"+currDate.getMinutes()+":"+currDate.getSeconds());

    // HH:MM::SS AM/PM
    console.log(get12hour(currDate.getHours())+":"+currDate.getMinutes()+":"+currDate.getSeconds(),currDate.getHours()>=12?"PM":"AM");
}

setInterval(displayTime,1000)