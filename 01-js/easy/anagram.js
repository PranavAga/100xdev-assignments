/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  // length check
  if(str1.length!=str2.length){
    return false
  }
  var tempstr=str2.slice()

  for(let i=0;i<str1.length;i++){
    tempstr=tempstr.replace(RegExp(str1[i],"i"),'')
  }

  if(tempstr.length!=0){
    return false
  }
  
  return true
}

module.exports = isAnagram;
