import { extend } from '@/utils'

const preZero = 4

export const SequenceGenerator = {
  getOrderNum(rows, rowKey, currRow = null) {
    if (currRow === null) {
      if (rows.length === 0) {
        return this.prefixInteger(1, preZero)
      } else {
        let orderArr = rows.map(row => {
          return row[rowKey]
        }).filter(item => {
          return item.length === preZero
        })
        orderArr.sort()
        orderArr.reverse()
        let maxOrder = orderArr[0]
        return this.prefixInteger(Number(maxOrder) + 1, preZero)
      }
    } else {
      let orderPreFix = currRow[rowKey]
      let levelNo = orderPreFix.length / preZero + 1
      let orderArr = rows.map(row => {
        return row[rowKey]
      }).filter(item => {
        return (item.length === (preZero * levelNo)) && item.startsWith(orderPreFix)
      })
      orderArr.sort()
      orderArr.reverse()
      if (orderArr.length === 0) {
        return orderPreFix + this.prefixInteger(1, preZero)
      }
      let maxOrder = orderArr[0]
      return orderPreFix + this.prefixInteger(Number(maxOrder) + 1, preZero)
    }
  },
  sortRows(rows, key) {
    let rowKeys = rows.map(item => item[key])
    rows.forEach(row => {
      for (let rowKey of rowKeys) {
        if (rowKey.startsWith(row[key]) && rowKey.length > row[key].length) {
          row.isparentrow = true
        }
      }
    })
    return rows.sort(this.compare(key))
  },
  moveRow(rows, rowKey, currRow, isUp) {
    let rowsCopy = extend(true, [], rows)
    let orderNum = currRow[rowKey]
    let maxOrderNum = this.getMaxOrderNum(rows, rowKey, orderNum)
    let orderNumber = Number(orderNum.substr(-preZero))
    if (orderNum.endsWith(this.prefixInteger(1, preZero)) && isUp) {
      return rows
    }
    if (maxOrderNum === orderNumber && !isUp) {
      return rows
    }
    let step = isUp ? -1 : 1
    let result = []
    let prefix = orderNum.substr(0, (orderNum.length - preZero))
    let newOrderNumber = orderNumber + step
    let newOrderNum = prefix + this.prefixInteger(newOrderNumber, preZero)
    for (let row of rowsCopy) {
      if (row[rowKey] === orderNum) {
        row[rowKey] = newOrderNum
      } else if (row[rowKey] === newOrderNum) {
        row[rowKey] = orderNum
      } else if (row[rowKey].startsWith(orderNum)) {
        row[rowKey] = row[rowKey].replace(orderNum, newOrderNum)
      } else if (row[rowKey].startsWith(newOrderNum)) {
        row[rowKey] = row[rowKey].replace(newOrderNum, orderNum)
      }
      result.push(row)
    }
    return this.sortRows(result, rowKey)
  },
  moveRowStep(rows, rowKey, oldIndex, newIndex) {
    return new Promise((resolve, reject) => {
      if (!rows || rows.length === 0) {
        return []
      }
      let oldOrderNum = ''
      let newOrderNum = ''
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index]
        if (index === oldIndex) {
          oldOrderNum = element[rowKey]
        }
        if (index === newIndex) {
          newOrderNum = element[rowKey]
        }
      }
      if (oldOrderNum !== '' && newOrderNum !== '') {
        let olength = oldOrderNum.length
        let nlength = newOrderNum.length
        if (olength !== nlength) {
          reject(new Error('不同级次之间无法进行直接排序！'))
        }
        let oPrefix = oldOrderNum.substring(0, olength - preZero)
        let nPrefix = newOrderNum.substring(0, nlength - preZero)
        if (oPrefix !== nPrefix) {
          reject(new Error('不同级次之间无法进行直接排序！'))
        }
        let oSuffix = oldOrderNum.substring(olength - preZero, olength)
        let nSuffix = newOrderNum.substring(nlength - preZero, nlength)
        // 0001 -> 0005
        let step = 0
        let max = 0
        let min = 0
        if (Number(oSuffix) < Number(nSuffix)) {
          max = Number(nSuffix)
          min = Number(oSuffix)
          step = -1
        } else {
          max = Number(oSuffix)
          min = Number(nSuffix)
          step = 1
        }
        let result = []
        rows.forEach(row => {
          let entity = extend(true, {}, row)
          if (row[rowKey].startsWith(oPrefix)) {
            let curPrefix = row[rowKey].substring(0, row[rowKey].length - preZero)
            let curSuffix = row[rowKey].substring(row[rowKey].length - preZero, row[rowKey].length)
            if (row[rowKey] === oldOrderNum) {
              entity[rowKey] = newOrderNum
            } else {
              if (curPrefix === oPrefix) {
                if (Number(curSuffix) <= max && Number(curSuffix) >= min) {
                  let newSuffix = Number(curSuffix) + step
                  entity[rowKey] = oPrefix + this.prefixInteger(newSuffix, preZero)
                }
              } else {
                if (row[rowKey].startsWith(oldOrderNum)) {
                  let newOrder = newOrderNum + row[rowKey].substring(oldOrderNum.length, row[rowKey].length)
                  entity[rowKey] = newOrder
                } else {
                  let newCurSuffix = row[rowKey].substring(oPrefix.length, oPrefix.length + preZero)
                  // 说明有子级，要改前缀。,前中后拼起来
                  if (Number(newCurSuffix) <= max && Number(newCurSuffix) >= min) {
                    let newSuffix = Number(newCurSuffix) + step
                    let newOrder = oPrefix + this.prefixInteger(newSuffix, preZero) + row[rowKey].substring(oPrefix.length + preZero, row[rowKey].length)
                    console.log('newOrder' + newOrder)
                    entity[rowKey] = newOrder
                  }
                }
              }
            }
          }
          result.push(entity)
        })
        resolve(this.sortRows(result, rowKey))
      } else {
        reject(new Error('排序错误！'))
      }
      resolve(this.sortRows(rows, rowKey))
    })
  },
  delRow(currRow, rows, rowKey) {
    let flag = false
    let currOrderNum = currRow[rowKey]
    let currOrderNumber = Number(currOrderNum.substr(-preZero))
    let prefix = currOrderNum.substr(0, (currOrderNum.length - preZero))
    let relationRows = []
    let otherRows = []
    rows.forEach(row => {
      let orderNum = row[rowKey]
      if (orderNum.startsWith(currOrderNum) && orderNum.length > currOrderNum.length) {
        flag = true
      }
      let orderNumber = Number(orderNum.substr(currOrderNum.length - preZero, preZero))
      if (orderNum.startsWith(prefix) && orderNumber > currOrderNumber) {
        relationRows.push(row)
      } else if (orderNum !== currOrderNum) {
        otherRows.push(row)
      }
    })
    if (flag) {
      return false
    }
    relationRows.forEach(row => {
      let orderNum = row[rowKey]
      let replaceNum = orderNum.substr(0, currOrderNum.length)
      let replaceNumPreFix = orderNum.substr(0, currOrderNum.length - preZero)
      let replaceNumber = replaceNumPreFix + this.prefixInteger(Number(replaceNum) - 1, preZero)
      let orderNumber = orderNum.replace(replaceNum, replaceNumber)
      row[rowKey] = orderNumber
    })
    let res = relationRows.concat(otherRows)
    return this.sortRows(res, rowKey)
  },
  getMaxOrderNum(rows, rowKey, orderNum) {
    let orderNums = []
    rows.forEach(row => {
      if (row[rowKey].length === orderNum.length) {
        orderNums.push(row[rowKey])
      }
    })
    orderNums.sort()
    orderNums.reverse()
    let maxOrderNum = orderNums[0]
    return Number(maxOrderNum.substr(-preZero))
  },
  compare(property) {
    return (a, b) => {
      var value1 = a[property]
      var value2 = b[property]
      return value1.localeCompare(value2)
    }
  },
  prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n)
  }
}
