import constructorVnode from './constructor.js'
export default class {
  constructor(context) {
    this.context = context
  }
  constructorExpandTableVnode(data, columns) {
    this.expandTableVnode = {}
    data.forEach((item, index) => {
      this.expandTableVnode[index] = constructorVnode({ data: item.childData, columns, context: this.context })
    })
  }
}
