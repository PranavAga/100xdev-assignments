// Generates a paragraph of specified length
export default function genParagraph(length){
    const words = 'Chipi chipi chapa chapa Dubi dubi daba daba Magico mi dubi dubi Boom boom boom boom'
    .toLocaleLowerCase().split(' ')
    
    var para = []
    for(let i = 0; i<length ; i++){
        para.push(words[i%(words.length)])
    }

    return para.join(' ')
}