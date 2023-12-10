// Removing extra spaces, "\s".

const fs = require('fs');

const fpath="1.txt"

function readafile(filepath){
    const data = new Promise(function(resolve){
        fs.readFile(filepath,function(err,data){
            resolve(data.toString())
        })
    });
    return data
}



function remspaces(data){
    console.log("removing spaces")

    data=data.replace(/\s*\s/g,' ')
    data=data.replace(/\s*\n/g,'\n')
    data=data.replace(/\n\s*/g,'\n')
    return data
}

function writeafile(filepath,data){
    const res = new Promise(function(resolve){
        fs.writeFile(filepath,data,function(err){
            console.log("written","\""+data+"\"", "to the file")
            // resolve("written to the file")
        })
    });
    return res
}

async function main(){
    var filecontent=await readafile(fpath)
    console.log(filecontent)
    filecontent=remspaces(filecontent)
    console.log(filecontent)
    await writeafile(fpath,filecontent)
}

main()

for(let i=0;i<5;i++){
    console.log(i)
}