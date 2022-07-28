import {
  Table,
  TableColumn,
  Select,
  Option,
  OptionGroup,
  Tree,
  DatePicker
} from 'element-ui'
const components = [
  Table,
  TableColumn,
  Select,
  Option,
  OptionGroup,
  Tree,
  DatePicker
]
export const setupElementUI = (Vue) => {
  components.forEach(item => {
    Vue.use(item)
  })
}
