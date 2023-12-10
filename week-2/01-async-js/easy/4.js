const fs = require('fs');


for(let i=0;i<1000;i++){
    console.log(i)
}

fs.writeFile('3.txt',"WRITING TO THE FILE",function(err){
    console.log("written to the file")
})

for(let i=0;i<10000;i++){
    console.log(i)
}

/*
Obervation:

file 'data' is written only after the expensive operation is complete
 */