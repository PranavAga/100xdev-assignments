const fs = require('fs');


for(let i=0;i<1000;i++){
    console.log(i)
}

fs.readFile('3.txt',function(err,data){
    console.log(data)
})

for(let i=0;i<10000;i++){
    console.log(i)
}

/*
Obervation:

file 'data' is printed only after the expensive operation is complete
 */