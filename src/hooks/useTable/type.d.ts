import type {Component } from "vue/types/index";
declare  global {
  namespace dfr{
    interface dataType extends Object {
      [key:string]:any
      dataType:'fullData'|'selection'|'treeExpandData'
    }
    interface context<T>{
      triggerExportOption:{
        (config?:T):void
      }
    }
    type contexts =context<dataType>
  }
}