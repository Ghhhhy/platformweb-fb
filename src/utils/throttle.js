/**
 * 节流函数
 * @params { Function } func：需要节流的函数
 * @params { Number } delay：间隔
 * @return {function(): void}
*/
export const throttle = function(func, delay) {
  let prev = Date.now()
  return function() {
    const now = Date.now()
    if (now - prev >= delay) {
      func.apply(this, arguments)
      prev = Date.now()
    }
  }
}
