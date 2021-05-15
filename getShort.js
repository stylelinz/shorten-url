const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const upperCase = lowerCase.toUpperCase()
const numbers = '0123456789'
const pool = lowerCase.concat(upperCase, numbers)

function base62 (num) {
  const base = pool.length
  const inputNum = num
  if (num === 0) {
    return 'aa'
  }
  let result = ''
  while (num > 0) {
    const digit = num % base
    num = parseInt(num / base)
    result = pool[digit] + result
  }
  if (inputNum < 62) {
    result = 'a' + result
  }
  return result
}

function randomSeed () {
  let randomChars = ''
  for (let i = 0; i < 3; i++) {
    const idx = ~~(Math.random() * pool.length)
    randomChars += pool[idx]
  }
  return randomChars
}

module.exports = function (num) {
  return base62(num) + randomSeed()
}
