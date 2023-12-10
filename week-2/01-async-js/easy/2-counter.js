var counter=0;

function increment(){
    console.log(counter);
    counter++;
    setTimeout(increment,1000)
}

increment()