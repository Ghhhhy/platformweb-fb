<template>
  <div>
    <BsUpload
      ref="testUpload"
      :queryparams="queryparams"
      :deleteparams="deleteparams"
      :downloadparams="downloadparams"
      :open-loading="false"
      uniqe-name="uploadOne"
      :after-upload="afterUpload"
    />

    <BsUpload
      ref="testUpload2"
      :queryparams="queryparams333"
      uniqe-name="uploadTwo"
      :after-upload="afterUpload"
    />

    <el-button @click.stop="uploadFile">上传</el-button>
    <el-button @click.stop="deleteFile">删除</el-button>
    <el-button @click.stop="downloadFile">下载</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  props: '',
  data() {
    return {
      queryparams: {
        billguid: 'usjdfslsjljs'
      },
      queryparams333: {
        billguid: 'usjdfslsjl333'
      },
      deleteparams: {
        fileguids: ''
      },
      downloadparams: {
        fileguid: ''
      },
      afterUpload: this.OnAfterUpload,
      afterDelete: this.OnAfterDelete
    }
  },
  components: {

  },
  computed: {
    uploadPack() {
      return this.$refs.testUpload
    }
  },
  mounted() {
  },
  methods: {
    uploadFile() {
      this.uploadPack.upload()
    },
    deleteFile() {
      // this.deleteparams.fileguids = 'A9F41DC94AB54FAC8BA3D5CFA6CEEAB5'
      this.uploadPack.deleteFile()
    },
    downloadFile() {
      // this.downloadparams.fileguid = '15CEA9AF11F443EEB3540EEE90297178'
      this.uploadPack.downloadFile()
    },
    OnAfterUpload(data, fileId) {
      this.deleteparams.fileguids = fileId
      this.downloadparams.fileguid = fileId
      console.log(2, data, fileId)
    },

    OnAfterDelete() {
      console.log(3333)
    }

  },
  watch: {

  }
}
</script>
