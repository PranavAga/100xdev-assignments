/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlpha(char) {
  // Regular expression to match alphabets (case-insensitive)
  const alphabetRegex = /^[a-zA-Z]$/;

  return alphabetRegex.test(char);
}

function isPalindrome(str) {

  var r=str.length-1
  var l=0
  
  while(l<r){
    if(isAlpha(str[l]) && isAlpha(str[r])){
      if(str[l].toLowerCase()!==str[r].toLowerCase()){
        return false
      }
      r--
      l++
    }
    else{
      if(isAlpha(str[l])){
        r--
      }
      else if(isAlpha(str[r])){
        l++
      }
      else{
        l++
        r--
      }
    }
  }
  return true;
}

module.exports = isPalindrome;
