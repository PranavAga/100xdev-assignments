/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const lVowels=new Set(['a','e','i','o','u'])
    const uVowels=new Set(['A','E','I','O','U'])

  nvowels=0
  for(let i=0;i<str.length;i++){
    if(lVowels.has(str[i])||uVowels.has(str[i])){
      nvowels++;
    }
  }
  return nvowels
}

module.exports = countVowels;