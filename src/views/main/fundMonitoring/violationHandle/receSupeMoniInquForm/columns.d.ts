  declare interface layOut {
    tableLoading: boolean
    leftTreeVisible: boolean
  }
  declare type tableColumns ={
    [key:string]:any,
    title?: string,
    width?: string|number,
    field:string,
    sortable?: boolean,
    filters?: boolean,
  }[]