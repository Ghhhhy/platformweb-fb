import _ from "vue/types/index";
declare  global {
  namespace utils{
    /** //用于处理字段回显 比如根据code和name来组装显示 code-name的形式，如果name存在 显示name 如果code存在 name存在 显示code-name 可以任意传入参数 组装参数 code-name-XXX-XXX */
    interface filterText {
      (t?:Array<string>):string
    }
  }
}