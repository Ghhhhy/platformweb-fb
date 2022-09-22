export let proconf = {
  // 附件弹窗表头
  attachmentDialogColumnsConfig: [
    {
      title: '附件文件名',
      field: 'filename',
      align: 'left'
    },
    {
      title: '上传时间',
      field: 'createtime',
      align: 'left'
    },
    {
      title: '文件大小',
      field: 'filesize',
      align: 'left'
    }
    // {
    //   title: '操作',
    //   field: 'gloableOptionRow',
    //   className: 'gloableOptionRow',
    //   align: 'center',
    //   fixed: 'right',
    //   sortable: false,
    //   filters: false,
    //   width: 140,
    //   cellRender: {
    //     // name: '$gloableOptionRow'
    //   }
    // }
  ],
  // 附件操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="编辑" placement="top" effect="light">
          <a class="gloable-option-row-edit gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</ a>,
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>,
        <el-tooltip content="操作日志" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
        </el-tooltip>

      ]
    }
  }
}
