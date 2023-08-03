import type {Component} from "vue/types/index";
declare  global {
  namespace dfr{
    interface context {
      context:Component| null
    }
  }
}