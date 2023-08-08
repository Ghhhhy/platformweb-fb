/**
 * @type {utils.filterText}
 */
export function filterText() {
  let agr = arguments
  let str = ''
  for (let i = agr.length - 1; i > 0; i--) {
    const element = agr[i]
    if (element) {
      str += element
    }
    if (agr[i - 1]) {
      str = agr[i - 1] + '-' + str
    }
  }
  return str
}
