<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <vxe-modal
      v-if="showModal"
      v-model="modalForm"
      :title="modalTitle"
      :destroy-on-close="true"
      width="66%"
      :height="'80%'"
      :show-footer="true"
      @close="closeModal"
    >
      <div style="height: 100%;overflow: hidden">
        <el-tabs v-model="activeNameBtm" type="border-card">
          <el-tab-pane label="基本情况" name="1">
            <BsForm
              ref="addForm"
              :form-items-config="formItemsConfigBtm"
              :form-data-list="formDataListBtm"
            />
          </el-tab-pane>
          <el-tab-pane label="累计可用资金" name="2">
            <!--            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigThird"
              :form-data-list="formDataListThird"
              @itemChange="insertItemChange"
            />-->
            <vxe-form
              ref="formRef"
              title-width="0"
              :data="formData"
              :rules="formRule"
              style="background-color: #fff; padding-bottom: 230px;"
            >
              <table class="tblInfo" style="width: 100%; text-align: center" border="1">
                <thead>
                  <th colspan="3">类型</th>
                  <th>当期累计金额（元）</th>
                  <th>前期累计金额（元）</th>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="3">累计可用资金（合计）</td>
                    <td>0.00</td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td rowspan="8" style="width: 150px;">其中</td>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">累计可用资金（合计）</td>
                    <td>0.00</td>
                    <td>0.00</td>
                  </tr>
                  <tr>
                    <td rowspan="8" style="width: 150px;">其中</td>
                    <td rowspan="4">增发国债基金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="4">中央预算内投资</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.name"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </vxe-form>
          </el-tab-pane>
          <el-tab-pane label="累计最终支付资金" name="3">
            <div style="height: 100%;overflow: auto;">
              <BsForm
                ref="accumulatedFinalPayForm"
                :form-items-config="accumulatedFinalPayConfig"
                :form-data-list="accumulatedFinalPayData"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="绩效目标完成情况" name="4">
            <BsTable
              ref="perfGoalDetMonRef"
              height="530"
              :table-columns-config="modalTblColumnsConfig"
              :span-method="objectSpanMethod"
              :table-data="tableData"
              :high-config="{ scrollY: { enabled: false } }"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="5">
            <el-upload
              ref="fileUpload"
              action="#"
              multiple
              :show-file-list="false"
              :data="uploadDFileParams"
              :on-remove="handleRemove"
              :http-request="handelUploadDebugfile"
            >
              <!-- <div class="fn-inline"> -->
              <div class="fn-inline" style="float:left; visibility: hidden">
                <div class="footer-btn" style="margin-left: 10px; padding-left: 10px;">
                  <el-row
                    style="display: inline-block;height: 42px;"
                  >
                    <el-col :span="16">
                      <span ref="uploadref" class="sp-my">上传附件</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div slot="tip" class="fn-inline upload-my-css" style="margin-left: 0">
                <div class="fn-inline" style="height:33px;float:left;">
                  <span class="sp-my-two">支持png/jpg/pdf等，不超过20M</span>
                </div>
              </div>
            </el-upload>
            <BsTable
              ref="fileDataRef"
              height="350"
              :table-columns-config="modalTblColumnsConfigSx"
              :table-data="tableDataSx"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            >
              <template v-slot:toolbarSlots>
                <div class="table-toolbar-left">
                  <vxe-button status="primary" style="float: left" @click="handleUpload">上传附件</vxe-button>
                </div>
              </template>
            </BsTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <vxe-button @click="showModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSure">确认</vxe-button>
      </div>
    </vxe-modal>
    <vxe-modal
      v-if="showTypeModal"
      v-model="showTypeModal"
      :title="'请选择附件类型'"
      :destroy-on-close="true"
      width="300px"
      :height="'170px'"
      :show-footer="true"
      @close="showTypeModal = false"
    >
      <div style="overflow: hidden">
        <el-select v-model="filetype" style="width: 100%">
          <el-option
            v-for="item in modalTblColumnsConfigSx[2].editRender.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div slot="footer">
        <vxe-button @click="showTypeModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSureType">保存</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/MonthlyInfoTbl/MonthlyInfoTbl.js'

const execProgCodeList = [
  {
    label: '进度1',
    value: '1'
  },
  {
    label: '进度2',
    value: '2'
  }
]
export default {
  data() {
    return {
      formData: {
        name: ''
      },
      formRule: {},
      filetype: '01',
      showTypeModal: false,
      menuId: '',
      modalTitle: '',
      modalForm: '',
      showModal: false,
      activeNameBtm: '1',
      uploadDFileParams: [],
      attachmentId: '',
      fileDataBakDel: [],
      fileData: [],
      modalTblColumnsConfigSx: [
        {
          title: '附件名称',
          field: 'fileName'
        },
        {
          title: '上传时间',
          field: 'createTime'
        },
        {
          title: '附件分类',
          field: 'proAttchKindCode',
          name: '$vxeSelect',
          formula: '',
          sortable: true,
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '01', label: '项目审批（核准、备案）资料' },
              { value: '02', label: '项目用地审批、环评审批、施工许可资料' },
              { value: '03', label: '项目招投标和政府采购资料' },
              { value: '04', label: '项目主要合同资料' },
              { value: '05', label: '项目评审报告' },
              { value: '11', label: '资金支出佐证资料' },
              { value: '12', label: '财务会计资料' },
              { value: '13', label: '工程资料' },
              { value: '14', label: '项目形象进度照片' },
              { value: '15', label: '竣工验收资料' },
              { value: '99', label: '其他' }
            ],
            props: {
              placeholder: '请选择附件分类'
            }
          }
        },
        {
          title: '附件说明',
          field: 'kpiRemark',
          editRender: {
            name: '$vxeInput'
          }
        }
      ],
      tableDataSx: [],
      tableDataFv: [
        {
          name: 1
        }
      ],
      accumulatedFinalPayConfig: [
        {
          field: 'proGiBupayAccAddnb',
          title: '增发国债资金建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccAddnb',
          title: '增发国债资金设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccAddnb',
          title: '增发国债资金待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccAddnb',
          title: '增发国债资金其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccCff',
          title: '中央预算内投资建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccCff',
          title: '中央预算内投资设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccCff',
          title: '中央预算内投资待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccCff',
          title: '中央预算内投资其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccCfo',
          title: '其他中央财政性建设资金建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccCfo',
          title: '其他中央财政性建设资金设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccCfo',
          title: '其他中央财政性建设资金待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccCfo',
          title: '其他中央财政性建设资金其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccLff',
          title: '地方财政资金建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccLff',
          title: '地方财政资金设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccLff',
          title: '地方财政资金待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccLff',
          title: '地方财政资金其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccEf',
          title: '企业自有资金建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccEf',
          title: '企业自有资金设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccEf',
          title: '企业自有资金待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccEf',
          title: '企业自有资金其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccLb',
          title: '地方政府专项债券建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccLb',
          title: '地方政府专项债券设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccLb',
          title: '地方政府专项债券待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccLb',
          title: '地方政府专项债券其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccBankl',
          title: '银行贷款建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccBankl',
          title: '银行贷款设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccBankl',
          title: '银行贷款待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccBankl',
          title: '银行贷款其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiBupayAccOth',
          title: '其他资金建筑安装工程投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiDepayAccOth',
          title: '其他资金设备投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiPrpayAccOth',
          title: '其他资金待摊投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'proGiOtpayAccOth',
          title: '其他资金其他投资支出',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        }
      ],
      accumulatedFinalPayData: {
        proGiBupayAccAddnb: '',
        proGiDepayAccAddnb: '',
        proGiPrpayAccAddnb: '',
        proGiOtpayAccAddnb: '',

        proGiBupayAccCff: '',
        proGiDepayAccCff: '',
        proGiPrpayAccCff: '',
        proGiOtpayAccCff: '',

        proGiBupayAccCfo: '',
        proGiDepayAccCfo: '',
        proGiPrpayAccCfo: '',
        proGiOtpayAccCfo: '',

        proGiBupayAccLff: '',
        proGiDepayAccLff: '',
        proGiPrpayAccLff: '',
        proGiOtpayAccLff: '',

        proGiBupayAccEf: '',
        proGiDepayAccEf: '',
        proGiPrpayAccEf: '',
        proGiOtpayAccEf: '',

        proGiBupayAccLb: '',
        proGiDepayAccLb: '',
        proGiPrpayAccLb: '',
        proGiOtpayAccLb: '',

        proGiBupayAccBankl: '',
        proGiDepayAccBankl: '',
        proGiPrpayAccBankl: '',
        proGiOtpayAccBankl: '',

        proGiBupayAccOth: '',
        proGiDepayAccOth: '',
        proGiPrpayAccOth: '',
        proGiOtpayAccOth: ''
      },
      modalTblColumnsConfigFv: [
        {
          title: '增发国债资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '中央预算内投资',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '其他中央财政性建设资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '地方财政资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '企业自有资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '地方政府专项债券',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '银行贷款',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '其他资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        }
      ],
      formItemsConfigForth: [
        {
          field: 'b1',
          title: '项目审批（核准、备案）文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目审批（核准、备案）文号' } }
        },
        {
          field: 'b2',
          title: '用地审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入用地审批文号' } }
        },
        {
          field: 'b3',
          title: '环评审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入环评审批文号' } }
        },
        {
          field: 'b4',
          title: '施工许可文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入施工许可文号' } }
        }
      ],
      formDataListForth: {},
      formDataListThird: {
        sums: '',
        proGiIpAccAddnb: '',
        proGiIpAccCff: '',
        proGiIpAccCfo: '',
        proGiIpAccLff: '',
        proGiIpAccEf: '',
        proGiIpAccLb: '',
        proGiIpAccBankl: '',
        proGiIpAccOth: ''
      },
      formItemsConfigThird: [
        {
          field: 'sums',
          title: '合计',
          span: 24,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '自动生成', disabled: true } }
        },
        {
          field: 'proGiIpAccAddnb',
          title: '增发国债资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入增发国债资金' } }
        },
        {
          field: 'proGiIpAccCff',
          title: '中央预算内投资',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入中央预算内投资' } }
        },
        {
          field: 'proGiIpAccCfo',
          title: '其他中央财政性建设资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他中央财政性建设资金' } }
        },
        {
          field: 'proGiIpAccLff',
          title: '地方财政资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方财政资金' } }
        },
        {
          field: 'proGiIpAccEf',
          title: '企业自有资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入企业自有资金' } }
        },
        {
          field: 'proGiIpAccLb',
          title: '地方政府专项债券',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方政府专项债券' } }
        },
        {
          field: 'proGiIpAccBankl',
          title: '银行贷款',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入银行贷款' } }
        },
        {
          field: 'proGiIpAccOth',
          title: '其他资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他资金' } }
        }
      ],
      activeNameTop: '1',
      formItemsConfigBtm: [],
      formDataListBtm: {},
      tableToolbarConfigInmodal: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableData: [],
      modalTblColumnsConfig: [
        {
          title: '一级指标',
          field: 'lv1PerfIndName'
        },
        {
          title: '二级指标',
          field: 'lv2PerfIndName'
        },
        {
          title: '三级指标',
          field: 'lv3PerfIndName'
        },
        {
          title: '指标值',
          field: 'kpiVal'
        },
        {
          title: '指标完成情况',
          field: 'kpiComp',
          editRender: {
            name: '$vxeMoney'
          }
        }
      ],
      addModal: false,
      hideTree: true,
      tableColumnsIdConfig: [
        {
          code: '9',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD2',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '1',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD2',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '2',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD2',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '0',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD2',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目月度信息表',
      tableUrl: '/pro-gather-server/gather/pmProjectInfoDetMon/list',
      tableParams: {
        appId: 'pm_project_info_det_month'
      },
      hideZero: true,
      tableCountUrl: '/pro-gather-server/gather/pmProjectInfoDetMon/count',
      tableCountParams: {
        statusCodeArr: ['1', '2', '0', '9'],
        appId: 'pm_project_info_det_month'
      },
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrl: '',
            label: '基本信息',
            code: '9',
            curValue: '9'
          },
          {
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrl: '',
            label: '待办事项',
            code: '1',
            curValue: '1'
          },
          {
            type: 'button',
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已办事项',
            code: '2',
            curValue: '2'
          },
          {
            type: 'button',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            iconUrl: '',
            label: '曾经办',
            code: '0',
            curValue: '0'
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '基本信息',
          code: '9',
          curValue: '9'
        },
        buttonsInfo: {
          '9': [
            {
              code: 'pay-add',
              label: '新增',
              status: 'primary'
            }
          ],
          '1': [
            {
              code: 'pay-edit',
              label: '修改'
            },
            {
              code: 'pay-discard',
              label: '作废'
            },
            {
              code: 'pay-audit',
              label: '送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ]
        }
      },
      currentRow: {},
      proDetId: '',
      proDetMonId: '',
      genMonthId: ''
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.loadConfig('C7FB497B80C44A1E86416BDFAE4AB510')
  },
  watch: {
    formItemsConfigBtm(val) {
      this.formDataListBtm = this.$ToolFn.getFormDataListFn(val)
    }
  },
  methods: {
    async loadConfig(id) {
      let params = {
        tableId: {
          id: '',
          fiscalyear: this.$store.state.userInfo.year,
          mof_div_code: this.$store.state.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid,
          userguid: ''
        }
      }
      if (id === 'C7FB497B80C44A1E86416BDFAE4AB510') {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        this.formItemsConfigBtm = configQueryData.itemsConfig
      }
    },
    handleSureType() {
      this.$refs.uploadref.click()
      this.showTypeModal = false
    },
    handleUpload() {
      this.showTypeModal = true
    },
    closeModal() {
      this.showModal = false
    },
    clearFormat(str) {
      str += ''
      str = str.replace(/,/g, '')
      let i = parseFloat(str)
      if (isNaN(i)) {
        i = 0
      }
      return i
    },
    insertItemChange({ $form, property, itemValue, data }, bsform) {
      if (property === 'a1') {
        let sums = this.clearFormat(data.sums)
        data.sums = sums + this.clearFormat(data.a1)
      }
      if (property === 'a2') {
        let sums = this.clearFormat(data.sums)
        data.sums = sums + this.clearFormat(data.a2)
      }
    },
    fileUpload(params) {
      return this.$http.post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
    },
    handelUploadDebugfile(e) {
      const form = new FormData()
      const temp = []
      // 文件对象
      form.append('file', e.file)
      form.append('filename', e.file.name)
      form.append('appid', 'pay_plan_voucher')
      temp.push(e.file.name)
      form.append('doctype', '')
      form.append('year', this.$store.state.userInfo.year)
      form.append('province', this.$store.state.userInfo.province)
      form.append('userguid', this.$store.state.userInfo.guid)
      form.append('billguid', this.$ToolFn.utilFn.getUuid())
      this.addLoading = true
      this.fileUpload(form).then(res => {
        this.addLoading = false
        if (res.rscode === '100000') {
          let resultData = ''
          if (res.data || res.data != null) {
            resultData = res.data
          } else {
            resultData = res.result
          }
          let data = {}
          temp.push(resultData)
          data['year'] = this.$store.state.userInfo.year
          data['count'] = 0
          data['filesize'] = e.file.size
          data['fileName'] = e.file.name
          data['proAttchId'] = resultData
          data['filepath'] = e.file.webkitRelativePath
          data['province'] = this.$store.state.userInfo.province
          data['appid'] = 'pay_plan_voucher'
          data['creater'] = e.file.uid
          data['guid'] = this.$store.state.userInfo.guid
          data['billguid'] = this.$ToolFn.utilFn.getUuid()
          data['importuser'] = this.$store.state.userInfo.name
          data['createTime'] = new Date().toLocaleDateString()
          data['proAttchKindCode'] = ''
          data.proAttchKindCode = this.filetype
          this.tableDataSx.push(data)
          this.$message.success('上传成功')
        } else {
          if (res.result.includes('Size: 0')) {
            this.$message.error('上传失败,不能上传空文件')
          }
          this.$message.error('上传失败：' + res.result)
        }
      }).catch()
    },
    handleRemove() {},
    addLevelOneLeft() {
      this.tableData.push({
        level1: '',
        level2: '',
        level3: ''
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column)
      if (columnIndex === 2) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 3) {

      }
    },
    handleSure() {
      let localThis = this
      let fileList = []
      let fileDataList = localThis.$refs.fileDataRef.getTableData().fullData
      if (fileDataList && fileDataList.length > 0) {
        fileDataList.forEach((item) => {
          fileList.push({
            fileName: item.fileName,
            kpiRemark: item.kpiRemark,
            proAttchKindCode: item.proAttchKindCode,
            proAttchKindName: item.proAttchKindCode__viewSort,
            proAttchId: item.proAttchId
          })
        })
      }
      let perfGoalDetMonList = localThis.$refs.perfGoalDetMonRef.getTableData().fullData
      let proDetMonInfo = localThis.$refs.addForm.getFormData()
      let accumAvailFund = localThis.$refs.addFormthrid.getFormData()
      let accumPayFund = localThis.$refs.accumulatedFinalPayForm.getFormData()
      let params = {
        appId: 'pm_project_info_det_month',
        menuId: localThis.menuId,
        actionType: '1',
        actionName: '录入',
        advice: '',
        proDetMonInfo: proDetMonInfo,
        // 累计可用金额
        accumAvailFund: accumAvailFund,
        // 累计支付金额
        accumPayFund: accumPayFund,
        // 绩效
        perfGoalDetMonList: perfGoalDetMonList,
        proAttchList: fileList
      }
      console.log(params)

      let execProgCode = proDetMonInfo.execProgCode
      let execProgName = execProgCodeList.find((item) => {
        return item.value === execProgCode
      }).label

      params.proDetMonInfo.proDetId = localThis.proDetId
      params.proDetMonInfo.execProgName = execProgName

      if (localThis.proDetMonId === '') {
        // 新增
        HttpModule.addDataRecord(params).then((res) => {
          if (res.rscode === '200') {
            this.showModal = false
            localThis.$message.success('操作成功')
            localThis.$refs.tmp.refresh()
          } else {
            localThis.$message.warning('数据保存询失败')
          }
          localThis.$refs.tmp.showLoading = false
        })
      } else {
        // 修改
        params.proDetId = localThis.proDetId
        params.proDetMonInfo.proDetId = localThis.proDetId
        params.proDetMonInfo.proDetMonId = localThis.proDetMonId
        params.proDetMonInfo.genMonthId = localThis.genMonthId

        HttpModule.editDataRecord(params).then((res) => {
          if (res.rscode === '200') {
            this.showModal = false
            localThis.$message.success('操作成功')
            localThis.$refs.tmp.refresh()
          } else {
            localThis.$message.warning('数据编辑保存询失败')
          }
          localThis.$refs.tmp.showLoading = false
        })
      }
    },
    onBtnClick(obj) {
      let localThis = this
      if (obj.code === 'pay-add') {
        localThis.addRecord()
      }
      if (obj.code === 'pay-edit') {
        localThis.editRecord()
      }
      if (obj.code === 'pay-discard') {
        localThis.discardRecord()
      }
      if (obj.code === 'pay-audit') {
        localThis.auditRecord(2)
      }
      if (obj.code === 'pay-checkDetails') {
        localThis.viewDetail()
      }
      if (obj.code === 'pay-unAudit') {
        localThis.auditRecord(3)
      }
    },
    addRecord() {
      let localThis = this
      localThis.showModal = true // TODO
      if (localThis.$refs.tmp.getSelectionRcd().length !== 1) {
        localThis.$message.warning('请选择一条数据进行录入')
        return false
      }
      // localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      localThis.proDetId = selection.proDetId
      let params = {
        proDetId: selection.proDetId
      }
      localThis.tableData = []
      localThis.tableDataSx = []
      HttpModule.detailProjectInfo(params).then((res) => {
        if (res.rscode === '200') {
          let projectInfo = res.data.projectInfo
          let perfIndica = res.data.perfIndica
          localThis.formDataListBtm.proAgencyName = projectInfo.proAgencyName
          localThis.formDataListBtm.speProName = projectInfo.speProName
          localThis.tableData = perfIndica
          localThis.showModal = true
          localThis.modalTitle = '编辑'
        } else {
          localThis.$message.warning('数据详细查询失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    editRecord() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length !== 1) {
        localThis.$message.warning('请选择一条数据进行编辑')
        return false
      }
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      localThis.proDetMonId = selection.proDetMonId
      let params = {
        id: selection.proDetMonId
      }
      localThis.tableData = []
      localThis.tableDataSx = []
      localThis.proDetMonId = ''
      localThis.proDetId = ''

      HttpModule.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          // 基本情况
          let proDetMonInfo = res.data.proDetMonInfo
          // 累计可用金额
          let accumAvailFund = res.data.accumAvailFund
          // 累计支付金额
          let accumPayFund = res.data.accumPayFund
          // 绩效
          let perfGoalDetMonList = res.data.perfGoalDetMonList
          // 附件
          let proAttchList = res.data.proAttchList
          localThis.tableData = perfGoalDetMonList
          localThis.tableDataSx = proAttchList
          this.initModalFormData(proDetMonInfo, accumAvailFund, accumPayFund)

          localThis.proDetId = proDetMonInfo.proDetId
          localThis.genMonthId = proDetMonInfo.genMonthId
          localThis.proDetMonId = proDetMonInfo.proDetMonId

          this.showModal = true
          this.modalTitle = '编辑'
        } else {
          localThis.$message.warning('数据详细查询失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    discardRecord() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
        return item.proDetMonId
      })
      let params = {
        ids: ids,
        appId: 'pm_project_info_det_month',
        menuId: localThis.menuId,
        actionType: 2,
        actionName: '作废'
      }
      HttpModule.discardRecords(params).then((res) => {
        if (res.rscode === '200') {
          localThis.$message.success('操作成功')
          localThis.$refs.tmp.refresh()
        } else {
          localThis.$message.warning('操作失败')
        }
      })
    },
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
        return item.proDetMonId
      })
      let params = {
        ids: ids,
        appId: 'pm_project_info_det_month',
        menuId: localThis.menuId,
        actionType: type,
        actionName: type === 2 ? '送审' : '撤销送审'
      }
      HttpModule.auditDataRecords(params).then((res) => {
        if (res.rscode === '200') {
          localThis.$message.success('操作成功')
          localThis.$refs.tmp.refresh()
        } else {
          localThis.$message.warning('操作失败')
        }
      })
    },
    viewDetail() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length !== 1) {
        localThis.$message.warning('请选择一条数据进行查看')
        return false
      }
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      let params = {
        id: selection.proDetMonId
      }
      HttpModule.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          // 基本情况
          let proDetMonInfo = res.data.proDetMonInfo
          // 累计可用金额
          let accumAvailFund = res.data.accumAvailFund
          // 累计支付金额
          let accumPayFund = res.data.accumPayFund
          // 绩效
          let perfGoalDetMonList = res.data.perfGoalDetMonList
          // 附件
          let proAttchList = res.data.proAttchList
          localThis.tableData = perfGoalDetMonList
          localThis.tableDataSx = proAttchList
          this.initModalFormData(proDetMonInfo, accumAvailFund, accumPayFund)

          localThis.proDetId = proDetMonInfo.proDetId
          localThis.showModal = true
          localThis.modalTitle = '查看详情'
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    initModalFormData(proDetMonInfo, accumAvailFund, accumPayFund) {
      let localThis = this
      // 基本信息
      localThis.formDataListBtm.proAgencyName = proDetMonInfo.proAgencyName
      localThis.formDataListBtm.speProName = proDetMonInfo.speProName
      localThis.formDataListBtm.month = proDetMonInfo.month
      localThis.formDataListBtm.proGiCompAcc = proDetMonInfo.proGiCompAcc
      localThis.formDataListBtm.execProgCode = proDetMonInfo.execProgCode
      localThis.formDataListBtm.proExecAcc = proDetMonInfo.proExecAcc
      localThis.formDataListBtm.proPerfAll = proDetMonInfo.proPerfAll
      // 累计可用资金
      localThis.formDataListThird.proGiIpAccAddnb = accumAvailFund.proGiIpAccAddnb
      localThis.formDataListThird.proGiIpAccCff = accumAvailFund.proGiIpAccCff
      localThis.formDataListThird.proGiIpAccCfo = accumAvailFund.proGiIpAccCfo
      localThis.formDataListThird.proGiIpAccLff = accumAvailFund.proGiIpAccLff
      localThis.formDataListThird.proGiIpAccEf = accumAvailFund.proGiIpAccEf
      localThis.formDataListThird.proGiIpAccLb = accumAvailFund.proGiIpAccLb
      localThis.formDataListThird.proGiIpAccBankl = accumAvailFund.proGiIpAccBankl
      localThis.formDataListThird.proGiIpAccOth = accumAvailFund.proGiIpAccOth

      // 累计支付
      localThis.accumulatedFinalPayData.proGiBupayAccAddnb = accumPayFund.proGiBupayAccAddnb
      localThis.accumulatedFinalPayData.proGiDepayAccAddnb = accumPayFund.proGiDepayAccAddnb
      localThis.accumulatedFinalPayData.proGiPrpayAccAddnb = accumPayFund.proGiPrpayAccAddnb
      localThis.accumulatedFinalPayData.proGiOtpayAccAddnb = accumPayFund.proGiOtpayAccAddnb

      localThis.accumulatedFinalPayData.proGiBupayAccCff = accumPayFund.proGiBupayAccCff
      localThis.accumulatedFinalPayData.proGiDepayAccCff = accumPayFund.proGiDepayAccCff
      localThis.accumulatedFinalPayData.proGiPrpayAccCff = accumPayFund.proGiPrpayAccCff
      localThis.accumulatedFinalPayData.proGiOtpayAccCff = accumPayFund.proGiOtpayAccCff

      localThis.accumulatedFinalPayData.proGiBupayAccCfo = accumPayFund.proGiBupayAccCfo
      localThis.accumulatedFinalPayData.proGiDepayAccCfo = accumPayFund.proGiDepayAccCfo
      localThis.accumulatedFinalPayData.proGiPrpayAccCfo = accumPayFund.proGiPrpayAccCfo
      localThis.accumulatedFinalPayData.proGiOtpayAccCfo = accumPayFund.proGiOtpayAccCfo

      localThis.accumulatedFinalPayData.proGiBupayAccLff = accumPayFund.proGiBupayAccLff
      localThis.accumulatedFinalPayData.proGiDepayAccLff = accumPayFund.proGiDepayAccLff
      localThis.accumulatedFinalPayData.proGiPrpayAccLff = accumPayFund.proGiPrpayAccLff
      localThis.accumulatedFinalPayData.proGiOtpayAccLff = accumPayFund.proGiOtpayAccLff

      localThis.accumulatedFinalPayData.proGiBupayAccEf = accumPayFund.proGiBupayAccEf
      localThis.accumulatedFinalPayData.proGiDepayAccEf = accumPayFund.proGiDepayAccEf
      localThis.accumulatedFinalPayData.proGiPrpayAccEf = accumPayFund.proGiPrpayAccEf
      localThis.accumulatedFinalPayData.proGiOtpayAccEf = accumPayFund.proGiOtpayAccEf

      localThis.accumulatedFinalPayData.proGiBupayAccLb = accumPayFund.proGiBupayAccLb
      localThis.accumulatedFinalPayData.proGiDepayAccLb = accumPayFund.proGiDepayAccLb
      localThis.accumulatedFinalPayData.proGiPrpayAccLb = accumPayFund.proGiPrpayAccLb
      localThis.accumulatedFinalPayData.proGiOtpayAccLb = accumPayFund.proGiOtpayAccLb

      localThis.accumulatedFinalPayData.proGiBupayAccBankl = accumPayFund.proGiBupayAccBankl
      localThis.accumulatedFinalPayData.proGiDepayAccBankl = accumPayFund.proGiDepayAccBankl
      localThis.accumulatedFinalPayData.proGiPrpayAccBankl = accumPayFund.proGiPrpayAccBankl
      localThis.accumulatedFinalPayData.proGiOtpayAccBankl = accumPayFund.proGiOtpayAccBankl

      localThis.accumulatedFinalPayData.proGiBupayAccOth = accumPayFund.proGiBupayAccOth
      localThis.accumulatedFinalPayData.proGiDepayAccOth = accumPayFund.proGiDepayAccOth
      localThis.accumulatedFinalPayData.proGiPrpayAccOth = accumPayFund.proGiPrpayAccOth
      localThis.accumulatedFinalPayData.proGiOtpayAccOth = accumPayFund.proGiOtpayAccOth
    }
  }
}
</script>
<style scoped lang="scss">
.tblInfo{
  color: #000;
  thead th {
    height: 40px;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    background: #d6ddf8;
  }
  tbody {
    tr {
      td {
        height: 35px;
      }
    }
  }
}
.Titans-form ::v-deep .vxe-form .boss-tree__input .el-select {
  height: 34px;
}
.el-tabs ::v-deep .el-tabs__content {
  overflow: auto;
}
</style>
