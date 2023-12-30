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
      :show-footer="showModalFooter"
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
          <el-tab-pane label="项目资金情况" name="2">
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
                    <td>{{ proGiIpAcc }}</td>
                    <td>{{ proGiIpPre }}</td>
                  </tr>
                  <tr>
                    <td rowspan="8" style="width: 150px;">其中</td>
                    <td colspan="2">增发国债资金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccAddnb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreAddnb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">中央预算内投资</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccCff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreCff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">其他中央财政性建设资金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccCfo"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreCfo"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">地方财政资金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccLff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreLff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">企业自有资金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccEf"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreEf"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">地方政府专项债券</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccLb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreLb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">银行贷款</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccBankl"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreBankl"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">其他资金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccOth"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpPreOth"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <!-- 详细 -->
                  <tr>
                    <td colspan="3">累计最终支付资金（合计）</td>
                    <td>{{ proGiFinalAcc }}</td>
                    <td>{{ proGiFinalPre }}</td>
                  </tr>

                  <tr>
                    <td rowspan="32" style="width: 150px;">其中</td>
                    <td rowspan="4">增发国债资金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccAddnb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreAddnb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccAddnb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreAddnb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccAddnb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreAddnb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccAddnb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreAddnb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
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
                            v-model="formData.proGiBupayAccCff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreCff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccCff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreCff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccCff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreCff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccCff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreCff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">其他中央财政性建设资金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccCfo"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreCfo"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccCfo"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreCfo"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccCfo"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreCfo"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccCfo"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreCfo"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">地方财政资金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccLff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreLff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccLff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreLff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccLff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreLff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccLff"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreLff"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">企业自有资金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccEf"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreEf"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccEf"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreEf"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccEf"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreEf"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccEf"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreEf"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">地方政府专项债券</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccLb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreLb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccLb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreLb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccLb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreLb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccLb"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreLb"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">银行贷款</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccBankl"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreBankl"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccBankl"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreBankl"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccBankl"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreBankl"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccBankl"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreBankl"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td rowspan="4">其他资金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccOth"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayPreOth"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>设备投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayAccOth"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiDepayPreOth"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>待摊投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayAccOth"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiPrpayPreOth"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td>其他投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayAccOth"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiOtpayPreOth"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="3">累计最终支付资金投资完成额</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiCompAcc"
                            type="number"
                            style="width: 100%"
                            clearable
                            :disabled="btnClickType === 'pay-checkDetails'"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiCompPre"
                            type="number"
                            style="width: 100%"
                            :clearable="isClearable"
                            :readonly="isFirst"
                            :disabled="isFirst"
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>

                </tbody>
              </table>
            </vxe-form>
          </el-tab-pane>
          <el-tab-pane label="绩效目标完成情况" name="3">
            <div class="fsc">
              <div style="text-align:right;padding-right:10px;min-width:180px;align-self: flex-start;">
                <span v-if="btnClickType !== 'pay-checkDetails'" style="color:red;">*</span>总体绩效目标完成情况说明
              </div>
              <div style="flex:1;">
                <vxe-textarea v-model="formDataListBtm.proPerfAll" :disabled="btnClickType === 'pay-checkDetails'" resize="vertical" />
              </div>
            </div>
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
          <el-tab-pane label="项目附件" name="4">
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
              <div class="fn-inline" style="float:left;display:none;">
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
              <div v-if="showModalFooter" slot="tip" class="fn-inline upload-my-css" style="float:unset;">
                <div class="fn-inline" style="height:33px;">
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
                <div v-if="showModalFooter" class="table-toolbar-left">
                  <vxe-button status="primary" style="float: left" @click="deleteAttachment">删除附件</vxe-button>
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
            v-for="item in fileTypeOptions"
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
    <!-- 基本信息查看详情 -->
    <vxe-modal
      v-if="showModalBasic"
      ref="modalForm"
      v-model="modalFormBasic"
      :title="modalTitleBasic"
      width="75%"
      :height="(activeNameBtmBasic === '2' || activeNameBtmBasic === '6') ? '79%' : '60%'"
      :show-footer="showModalFooterBasic"
      :destroy-on-close="true"
      @close="closeModalBasic"
    >
      <div style="overflow: auto">
        <el-tabs v-model="activeNameBtmBasic" type="border-card">
          <el-tab-pane label="基本情况" name="1">
            <BsForm
              ref="addFormBasic"
              :form-items-config="formItemsConfigBtmBasic"
              :form-data-list="formDataListBtmBasic"
              :form-validation-config="formDataListBtmRequiredBasic"
            />
          </el-tab-pane>
          <el-tab-pane label="项目总投资" name="3">
            <BsForm
              ref="addFormthridBasic"
              :form-items-config="formItemsConfigThirdBasic"
              :form-data-list="formDataListThirdBasic"
              :form-validation-config="formDataListThirdRequiredBasic"
            />
          </el-tab-pane>
          <el-tab-pane label="项目批复信息" name="4">
            <BsForm
              ref="addFormForthBasic"
              :form-items-config="formItemsConfigForthBasic"
              :form-data-list="formDataListForthBasic"
              :form-validation-config="formDataListForthRequiredBasic"
            />
          </el-tab-pane>
          <el-tab-pane label="相关部门联系方式" name="5">
            <BsForm
              ref="contactInformationFormBasic"
              :form-items-config="contactInformationFormConfigBasic"
              :form-data-list="contactInformationFormDataBasic"
              :form-validation-config="contactInformationFormDataRequiredBasic"
            />
          </el-tab-pane>
          <el-tab-pane label="绩效目标" name="2">
            <BsForm
              ref="KPIFormBasic"
              :form-items-config="KPIFormConfigBasic"
              :form-data-list="KPIFormDataBasic"
              :form-validation-config="KPIFormDataRequiredBasic"
            />
            <BsTable
              ref="bgtTblRefBasic"
              height="530"
              :table-columns-config="modalTblColumnsConfigBasic"
              :span-method="objectSpanMethod"
              :table-data="tableDataBasic"
              :high-config="{ scrollY: { enabled: false } }"
              :pager-config="false"
              :footer-config="footerConfigsBasic"
              :toolbar-config="tableToolbarConfigInmodalBasic"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="6">
            <BsTable
              ref="fileDataRefBasic"
              height="460"
              :table-columns-config="modalTblColumnsConfigSxBasic"
              :table-data="tableDataSxBasic"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigAttachBasic"
            >
              <template v-slot:pagerLeftSlots>
                <div class="table-toolbar-left">
                  <div class="table-toolbar-left-title">
                    <span class="fn-inline"><span>支持png/jpg/pdf等，不超过20M</span></span>
                    <i class="fn-inline"></i>
                  </div>
                </div>
              </template>
            </BsTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <vxe-button @click="showModalBasic = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSureBasic">确认</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/MonthlyInfoTbl/MonthlyInfoTbl.js'
import { config } from '@/views/main/FinanceDepartmentMaintainsInfo/financeDepartmentMaintainsInfo.js'
import HttpModule1 from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfo.js'

export default {
  data() {
    return {
      btnClickType: '',
      readonly: ['proAgencyName', 'mofDiv_', 'budgetLevel_', 'speProCode', 'proDept_', 'proGi'],
      formData: {
        // 累计可用资金合计
        proGiIpAcc: '',
        // 前期可用资金合计
        proGiIpPre: '',
        // 前期最终支付资金投资完成额
        proGiCompPre: '',
        // 累计最终支付资金投资完成额
        proGiCompAcc: '',
        // 累计最终支付资金
        proGiFinalAcc: '',
        // 前期最终支付资金
        proGiFinalPre: '',
        // 前期可用资金累计
        proGiIpPreAddnb: '',
        proGiIpPreCff: '',
        proGiIpPreCfo: '',
        proGiIpPreLff: '',
        proGiIpPreEf: '',
        proGiIpPreLb: '',
        proGiIpPreBankl: '',
        proGiIpPreOth: '',
        // 当期累计
        proGiIpAccAddnb: '',
        proGiIpAccCff: '',
        proGiIpAccCfo: '',
        proGiIpAccLff: '',
        proGiIpAccEf: '',
        proGiIpAccLb: '',
        proGiIpAccBankl: '',
        proGiIpAccOth: '',
        // 当期累计详细
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
        proGiOtpayAccOth: '',
        // 前期累计详细
        proGiBupayPreAddnb: '',
        proGiDepayPreAddnb: '',
        proGiPrpayPreAddnb: '',
        proGiOtpayPreAddnb: '',

        proGiBupayPreCff: '',
        proGiDepayPreCff: '',
        proGiPrpayPreCff: '',
        proGiOtpayPreCff: '',

        proGiBupayPreCfo: '',
        proGiDepayPreCfo: '',
        proGiPrpayPreCfo: '',
        proGiOtpayPreCfo: '',

        proGiBupayPreLff: '',
        proGiDepayPreLff: '',
        proGiPrpayPreLff: '',
        proGiOtpayPreLff: '',

        proGiBupayPreEf: '',
        proGiDepayPreEf: '',
        proGiPrpayPreEf: '',
        proGiOtpayPreEf: '',

        proGiBupayPreLb: '',
        proGiDepayPreLb: '',
        proGiPrpayPreLb: '',
        proGiOtpayPreLb: '',

        proGiBupayPreBankl: '',
        proGiDepayPreBankl: '',
        proGiPrpayPreBankl: '',
        proGiOtpayPreBankl: '',

        proGiBupayPreOth: '',
        proGiDepayPreOth: '',
        proGiPrpayPreOth: '',
        proGiOtpayPreOth: ''
      },
      formRule: {},
      filetype: '11',
      filetypeName: '资金支出佐证资料',
      showTypeModal: false,
      menuId: '',
      modalTitle: '',
      modalForm: '',
      showModal: false,
      showModalFooter: true,
      isFirst: false,
      isClearable: false,
      activeNameBtm: '1',
      uploadDFileParams: [],
      attachmentId: '',
      fileDataBakDel: [],
      fileData: [],
      fileTypeOptions: [
        { value: '11', label: '资金支出佐证资料' },
        { value: '12', label: '财务会计资料' },
        { value: '13', label: '工程资料' },
        { value: '14', label: '项目形象进度照片' },
        { value: '15', label: '竣工验收资料' },
        { value: '99', label: '其他' }
      ],
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
          title: '附件代码',
          field: 'proAttchKindCode'
        },
        {
          title: '附件分类',
          field: 'proAttchKindName',
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
            name: '$vxeInput'
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
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD3',
          qid: '6CA5607433E74DACA32230542C8FDDB5'
        },
        {
          code: '2',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD3',
          qid: '6CA5607433E74DACA32230542C8FDDB5'
        },
        {
          code: '5',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD3',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '0',
          tid: 'C9FBBBAB7C254172AD54674B0BC75BD3',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目月度信息表',
      tableUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetMon/list',
      tableParams: {
        appId: 'pm_project_info_det_month'
      },
      hideZero: true,
      tableCountUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetMon/count',
      tableCountParams: {
        statusCodeArr: ['1', '2', '5', '9'],
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
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已作废',
            code: '5',
            curValue: '5'
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
            },
            {
              code: 'pay-checkDetailsBasic',
              label: '查看详情',
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
      genMonthId: '',
      // 基本信息查看详情-------------------------start----------------
      modalTblColumnsConfigSxBasic: config().modalTblColumnsConfigSx,
      tableDataSxBasic: [],
      showTypeModalBasic: false,
      KPIFormConfigBasic: config().KPIFormConfig,
      KPIFormDataBasic: config().KPIFormData,
      KPIFormDataRequiredBasic: config().KPIFormDataRequired,
      contactInformationFormDataRequiredBasic: config().contactInformationFormDataRequired,
      contactInformationFormConfigBasic: config().contactInformationFormConfig,
      contactInformationFormDataBasic: config().contactInformationFormData,
      modalTblColumnsConfigFvBasic: config().modalTblColumnsConfigFv,
      formDataListForthRequiredBasic: config().formDataListForthRequired,
      formItemsConfigForthBasic: config().formItemsConfigForth,
      formDataListForthBasic: config().formDataListForth,
      formDataListThirdBasic: config().formDataListThird,
      formDataListThirdRequiredBasic: config().formDataListThirdRequired,
      formItemsConfigThirdBasic: config().formItemsConfigThird,
      activeNameTopBasic: '1',
      readonlyBasic: ['proAgencyName', 'mofDivName', 'budgetLevelName', 'speProCode', 'proDept_', 'proGi', 'trackProCode'],
      formItemsConfigBtmBasic: config().formItemsConfigBtm,
      formDataListBtmRequiredBasic: config().formDataListBtmRequired,
      formDataListBtmBasic: config().formDataListBtm,
      formItemsConfigBtmAddBasic: config().formItemsConfigBtmAdd,
      formDataListBtmRequiredAddBasic: config().formDataListBtmRequiredAdd,
      formDataListBtmAddBasic: config().formDataListBtmAdd,
      addBudgetFormConfigBasic: config().addBudgetFormConfig,
      addBudgetFormDataBasic: config().addBudgetFormData,
      addBudgetFormDataRequiredBasic: config().addBudgetFormDataRequired,
      showModalBasic: false,
      showModalFooterBasic: true,
      tableToolbarConfigInmodalBasic: {
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
      fileTypeOptionsBasic: [
        { value: '01', label: '项目审批（核准、备案）资料' },
        { value: '02', label: '项目用地审批、环评审批、施工许可资料' },
        { value: '03', label: '项目招投标和政府采购资料' },
        { value: '04', label: '项目主要合同资料' },
        { value: '05', label: '项目评审报告' },
        { value: '99', label: '其他' }
      ],
      filetypeBasic: '01',
      filetypeNameBasic: '项目审批（核准、备案）资料',
      tableToolbarConfigAttachBasic: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false // 选配展示列
      },
      tableDataBasic: [],
      modalTblColumnsConfigBasic: config().modalTblColumnsConfig,
      addModalBasic: false,
      hideTreeBasic: false,
      isCheckboxBasic: false,
      currentRowBasic: {},
      proDetIdBasic: '',
      isViewBasic: false,
      treePropsBasic: ['mofDiv_', 'budgetLevel_', 'proDept_', 'fundInvestArea_', 'proAgency_', 'trackPro_', 'fundInvestArea_'],
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.loadConfig('C7FB497B80C44A1E86416BDFAE4AB510')

    this.getFundInvestArea()
    this.getBudgetElement()
    this.formDataListBtmAddBasic.mofDivName = this.$store.state.userInfo.province
    this.formDataListBtmAddBasic.budgetLevelCode = this.$store.state.userInfo.budgetlevelcode
    this.formDataListBtmAddBasic.budgetLevelName = this.$store.state.userInfo.budgetlevelname
    this.formDataListBtmBasic.budgetLevelName = this.$store.state.userInfo.budgetlevelname
  },
  computed: {
    proGiIpPre: {
      get () {
        let localThis = this
        return localThis.clearFormat(localThis.formData.proGiIpPreAddnb) + localThis.clearFormat(localThis.formData.proGiIpPreCff) +
          localThis.clearFormat(localThis.formData.proGiIpPreCfo) + localThis.clearFormat(localThis.formData.proGiIpPreLff) +
          localThis.clearFormat(localThis.formData.proGiIpPreEf) + localThis.clearFormat(localThis.formData.proGiIpPreLb) +
          localThis.clearFormat(localThis.formData.proGiIpPreBankl) + localThis.clearFormat(localThis.formData.proGiIpPreOth)
      }

    },
    proGiIpAcc: {
      get() {
        let localThis = this
        return localThis.clearFormat(localThis.formData.proGiIpAccAddnb) + localThis.clearFormat(localThis.formData.proGiIpAccCff) +
          localThis.clearFormat(localThis.formData.proGiIpAccCfo) + localThis.clearFormat(localThis.formData.proGiIpAccLff) +
          localThis.clearFormat(localThis.formData.proGiIpAccEf) + localThis.clearFormat(localThis.formData.proGiIpAccLb) +
          localThis.clearFormat(localThis.formData.proGiIpAccBankl) + localThis.clearFormat(localThis.formData.proGiIpAccOth)
      }
    },
    proGiFinalAcc: {
      get() {
        let localThis = this
        return localThis.clearFormat(localThis.formData.proGiBupayAccAddnb) + localThis.clearFormat(localThis.formData.proGiDepayAccAddnb) + localThis.clearFormat(localThis.formData.proGiPrpayAccAddnb) + localThis.clearFormat(localThis.formData.proGiOtpayAccAddnb) + localThis.clearFormat(localThis.formData.proGiBupayAccCff) + localThis.clearFormat(localThis.formData.proGiDepayAccCff) + localThis.clearFormat(localThis.formData.proGiPrpayAccCff) + localThis.clearFormat(localThis.formData.proGiOtpayAccCff) + localThis.clearFormat(localThis.formData.proGiBupayAccCfo) + localThis.clearFormat(localThis.formData.proGiDepayAccCfo) + localThis.clearFormat(localThis.formData.proGiPrpayAccCfo) + localThis.clearFormat(localThis.formData.proGiOtpayAccCfo) + localThis.clearFormat(localThis.formData.proGiBupayAccLff) + localThis.clearFormat(localThis.formData.proGiDepayAccLff) + localThis.clearFormat(localThis.formData.proGiPrpayAccLff) + localThis.clearFormat(localThis.formData.proGiOtpayAccLff) + localThis.clearFormat(localThis.formData.proGiBupayAccEf) + localThis.clearFormat(localThis.formData.proGiDepayAccEf) + localThis.clearFormat(localThis.formData.proGiPrpayAccEf) + localThis.clearFormat(localThis.formData.proGiOtpayAccEf) + localThis.clearFormat(localThis.formData.proGiBupayAccLb) + localThis.clearFormat(localThis.formData.proGiDepayAccLb) + localThis.clearFormat(localThis.formData.proGiPrpayAccLb) + localThis.clearFormat(localThis.formData.proGiOtpayAccLb) + localThis.clearFormat(localThis.formData.proGiBupayAccBankl) + localThis.clearFormat(localThis.formData.proGiDepayAccBankl) + localThis.clearFormat(localThis.formData.proGiPrpayAccBankl) + localThis.clearFormat(localThis.formData.proGiOtpayAccBankl) + localThis.clearFormat(localThis.formData.proGiBupayAccOth) + localThis.clearFormat(localThis.formData.proGiDepayAccOth) + localThis.clearFormat(localThis.formData.proGiPrpayAccOth) + localThis.clearFormat(localThis.formData.proGiOtpayAccOth)
      }
    },
    proGiFinalPre: {
      get() {
        let localThis = this
        return localThis.clearFormat(localThis.formData.proGiBupayPreAddnb) + localThis.clearFormat(localThis.formData.proGiDepayPreAddnb) + localThis.clearFormat(localThis.formData.proGiPrpayPreAddnb) + localThis.clearFormat(localThis.formData.proGiOtpayPreAddnb) + localThis.clearFormat(localThis.formData.proGiBupayPreCff) + localThis.clearFormat(localThis.formData.proGiDepayPreCff) + localThis.clearFormat(localThis.formData.proGiPrpayPreCff) + localThis.clearFormat(localThis.formData.proGiOtpayPreCff) + localThis.clearFormat(localThis.formData.proGiBupayPreCfo) + localThis.clearFormat(localThis.formData.proGiDepayPreCfo) + localThis.clearFormat(localThis.formData.proGiPrpayPreCfo) + localThis.clearFormat(localThis.formData.proGiOtpayPreCfo) + localThis.clearFormat(localThis.formData.proGiBupayPreLff) + localThis.clearFormat(localThis.formData.proGiDepayPreLff) + localThis.clearFormat(localThis.formData.proGiPrpayPreLff) + localThis.clearFormat(localThis.formData.proGiOtpayPreLff) + localThis.clearFormat(localThis.formData.proGiBupayPreEf) + localThis.clearFormat(localThis.formData.proGiDepayPreEf) + localThis.clearFormat(localThis.formData.proGiPrpayPreEf) + localThis.clearFormat(localThis.formData.proGiOtpayPreEf) + localThis.clearFormat(localThis.formData.proGiBupayPreLb) + localThis.clearFormat(localThis.formData.proGiDepayPreLb) + localThis.clearFormat(localThis.formData.proGiPrpayPreLb) + localThis.clearFormat(localThis.formData.proGiOtpayPreLb) + localThis.clearFormat(localThis.formData.proGiBupayPreBankl) + localThis.clearFormat(localThis.formData.proGiDepayPreBankl) + localThis.clearFormat(localThis.formData.proGiPrpayPreBankl) + localThis.clearFormat(localThis.formData.proGiOtpayPreBankl) + localThis.clearFormat(localThis.formData.proGiBupayPreOth) + localThis.clearFormat(localThis.formData.proGiDepayPreOth) + localThis.clearFormat(localThis.formData.proGiPrpayPreOth) + localThis.clearFormat(localThis.formData.proGiOtpayPreOth)
      }
    }
  },
  watch: {
    formItemsConfigBtm(val) {
      this.formDataListBtm = this.$ToolFn.getFormDataListFn(val)
    }
  },
  methods: {
    stringToDate(str) {
      return (str || '').substr(0, 4) + '-' + (str || '').substr(4, 2) + '-' + (str || '').substr(6)
    },
    closeModalBasic() {
      this.showModalBasic = false
    },
    formatDate(numb) {
      if (!numb) return numb
      const startExcelDateSerialNumber = '1899-12-30'
      return moment(startExcelDateSerialNumber).add(numb, 'days').format('YYYYMMDD')
    },
    // 获取指标级次
    getBudgetElement() {
      this.$http.post('/dfr-monitor-service/dfr/pmProjectInfoDetail/perfindtree').then((res) => {
        if (res.rscode === '200') {
          this.addBudgetFormConfigBasic.forEach(item => {
            if (item.field === 'lv2PerfInd_') {
              item.itemRender.options = res.data
              this.toFlatTree(res.data)
            }
          })
        }
      })
    },
    getFundInvestArea() {
      this.$http.post('/dfr-monitor-service/dfr/common/elementtree', { elementCode: 'PROFUNDINVESTAREA' }).then((res) => {
        if (res.rscode === '200') {
          let configs = []
          configs = this.formItemsConfigBtmBasic
          configs.forEach(item => {
            if (item.field === 'fundInvestArea_') {
              this.fundInvestAreaOptionsBasic = res.data
              item.itemRender.options = res.data
            }
          })
        }
      })
    },
    // 树扁平化Map
    toFlatTree(trees) {
      let self = this
      trees.forEach(tree => {
        if (tree.children) {
          self.getChildren(tree, tree.children)
        }
      })
    },
    getChildren(tree, children) {
      children.forEach(c => {
        c.p = {
          id: tree.id,
          code: tree.code,
          label: tree.label,
          name: tree.name
        }
      })
    },
    fundInvestAreaBasic(id) {
      let currentFundInvest = []
      for (let i = 0; i < this.fundInvestAreaOptionsBasic.length; i++) {
        if (this.fundInvestAreaOptionsBasic[i].code === id) {
          currentFundInvest = [this.fundInvestAreaOptionsBasic[i]]
          console.log(currentFundInvest)
          break
        }
      }
      let configs = this.formItemsConfigBtmBasic
      configs.forEach(item => {
        if (item.field === 'fundInvestArea_') {
          item.itemRender.options = currentFundInvest
        }
      })
      this.formItemsConfigBtmBasic = [...configs]
    },
   
    
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
    deleteAttachment() {
      let selections = this.$refs.fileDataRef.getSelectionData()
      if (selections.length === 0) {
        this.$message.warning('请选择要删除的附件')
        return
      }
      this.$refs.fileDataRef.$refs.xGrid.removeCheckboxRow()
    },
    handleSureType() {
      let proAttchKindName = this.fileTypeOptions.find((item) => {
        return item.value === this.filetype
      }).label
      this.filetypeName = proAttchKindName
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

          data.proAttchKindName = this.filetypeName
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
    objectSpanMethod({ row, column, rowIndex, columnIndex, visibleData }) {
      if (columnIndex === 2) {
        const cellValue = row['lv1PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv1PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv1PerfIndCode'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
      if (columnIndex === 3) {
        const cellValue = row['lv2PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv2PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv2PerfIndCode'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    handleSure() {
      if (this.btnClickType !== 'pay-checkDetails' && !this.formDataListBtm.proPerfAll) {
        this.$message.warning('请填写总体绩效目标完成情况说明')
        return
      }
      let localThis = this
      let fileList = []
      let fileDataList = localThis.$refs.fileDataRef.getTableData().fullData
      if (fileDataList && fileDataList.length > 0) {
        fileDataList.forEach((item) => {
          fileList.push({
            fileName: item.fileName,
            kpiRemark: item.kpiRemark,
            proAttchKindCode: item.proAttchKindCode,
            proAttchKindName: item.proAttchKindName,
            proAttchId: item.proAttchId
          })
        })
      }
      localThis.formData.proGiIpPre = localThis.proGiIpPre
      localThis.formData.proGiIpAcc = localThis.proGiIpAcc
      localThis.formData.proGiFinalAcc = localThis.proGiFinalAcc
      localThis.formData.proGiFinalPre = localThis.proGiFinalPre

      let perfGoalDetMonList = localThis.$refs.perfGoalDetMonRef.getTableData().fullData
      let proDetMonInfo = localThis.$refs.addForm.getFormData()
      let fundUsage = localThis.formData
      let params = {
        appId: 'pm_project_info_det_month',
        menuId: localThis.menuId,
        actionType: '1',
        actionName: '录入',
        advice: '',
        proDetMonInfo: { ...proDetMonInfo, proPerfAll: this.formDataListBtm.proPerfAll },
        // 累计可用金额
        fundUsage: fundUsage,
        // 绩效
        perfGoalDetMonList: perfGoalDetMonList,
        proAttchList: fileList
      }
      console.log(params)

      params.proDetMonInfo.proDetId = localThis.proDetId
      params.proDetMonInfo.execProgCode = proDetMonInfo.execProg_code
      params.proDetMonInfo.execProgName = proDetMonInfo.execProg_name

      for (let key in params.proDetMonInfo) {
        if (key.endsWith('_code')) {
          params.proDetMonInfo[key.replace('_code', 'Code')] = params.proDetMonInfo[key]
        }
        if (key.endsWith('_name')) {
          params.proDetMonInfo[key.replace('_name', 'Name')] = params.proDetMonInfo[key]
        }
      }

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
      this.btnClickType = obj.code
      if (obj.code === 'pay-add') {
        this.initFormItems(false)
        localThis.addRecord()
      }
      if (obj.code === 'pay-edit') {
        this.initFormItems(false)
        localThis.editRecord()
      }
      if (obj.code === 'pay-discard') {
        this.initFormItems(false)
        localThis.discardRecord()
      }
      if (obj.code === 'pay-audit') {
        this.initFormItems(false)
        localThis.auditRecord(2)
      }
      if (obj.code === 'pay-checkDetailsBasic') {
        this.isView = true
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.initFormItemsBasic(true)
        this.viewDetailBasic()
      }
      if (obj.code === 'pay-checkDetails') {
        this.initFormItems(true)
        localThis.viewDetail()
      }
      if (obj.code === 'pay-unAudit') {
        localThis.auditRecord(3)
      }
    },
    viewDetailBasic() {
      let localThis = this
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      let params = {
        proDetId: selection.proDetId
      }
      localThis.tableDataBasic = []
      HttpModule1.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          let projectInfo = res.data.projectInfo
          let perfIndica = res.data.perfIndica
          let attchs = res.data.attchs
          localThis.tableDataSxBasic = attchs
          localThis.tableDataBasic = perfIndica
          localThis.initModalFormData(projectInfo)
          localThis.showModalFooterBasic = false
          localThis.showModalBasic = true
          localThis.modalTitleBasic = '查看详情'
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    
    initModalFormData(projectInfo) {
      let localThis = this
      // 基本情况
      localThis.formDataListBtmBasic.proAgencyName = projectInfo.proAgencyCode + '-' + projectInfo.proAgencyName
      localThis.formDataListBtmBasic.proAgencyCode = projectInfo.proAgencyCode
      // 财政区划
      let mofDiv = projectInfo.mofDivName
      this.initTreeInfo(localThis.formDataListBtmBasic, 'mofDiv_', mofDiv, projectInfo)
      localThis.formDataListBtmBasic.mofDivName = projectInfo.mofDivName
      // localThis.formDataListBtmBasic.mofDivNameId = projectInfo.mofDivName
      // 预算级次
      localThis.formDataListBtmBasic.budgetLevelName = projectInfo.budgetLevelName
      let budgetLevel = projectInfo.budgetLevelName
      this.initTreeInfo(localThis.formDataListBtmBasic, 'budgetLevel_', budgetLevel, projectInfo)
      localThis.formDataListBtmBasic.speProName = projectInfo.speProName
      localThis.formDataListBtmBasic.speProCode = projectInfo.speProCode
      localThis.formDataListBtmBasic.trackProName = projectInfo.trackProName
      localThis.formDataListBtmBasic.trackProCode = projectInfo.trackProCode
      // 项目主管部门
      let proDeptName = projectInfo.proDeptName
      localThis.formDataListBtm.proDeptName = projectInfo.proDeptName
      this.initTreeInfo(localThis.formDataListBtm, 'proDept_', proDeptName, projectInfo)
      // 项目所属投向领域
      let fundInvestInfo = projectInfo.fundInvestAreaName
      localThis.formDataListBtmBasic.fundInvestAreaName = projectInfo.fundInvestAreaName
      this.initTreeInfo(localThis.formDataListBtmBasic, 'fundInvestArea_', fundInvestInfo, projectInfo)
      localThis.formDataListBtmBasic.proContent = projectInfo.proContent
      localThis.formDataListBtmBasic.proStaDate = this.stringToDate(projectInfo.proStaDate)
      localThis.formDataListBtmBasic.proEndDate = this.stringToDate(projectInfo.proEndDate)
      localThis.formDataListBtmBasic.proRealStaDate = this.stringToDate(projectInfo.proRealStaDate)
      localThis.formDataListBtmBasic.proRealEndDate = this.stringToDate(projectInfo.proRealEndDate)
      localThis.formDataListBtmBasic.proNotStaRea = projectInfo.proNotStaRea
      localThis.formDataListBtmBasic.kpiTarget = projectInfo.kpiTarget
      localThis.KPIFormDataBasic.kpiTarget = projectInfo.kpiTarget
      localThis.formDataListBtmBasic.isUseMultiTrackPro = projectInfo.isUseMultiTrackPro
      localThis.formDataListBtmBasic.fundInvestAreaDesc = projectInfo.fundInvestAreaDesc
      localThis.formDataListBtmBasic.isEnd = projectInfo.isEnd
      // 项目总投资
      localThis.formDataListThirdBasic.proGi = projectInfo.proGi
      localThis.formDataListThirdBasic.proGiAddnb = projectInfo.proGiAddnb
      localThis.formDataListThirdBasic.proGiCff = projectInfo.proGiCff
      localThis.formDataListThirdBasic.proGiCfo = projectInfo.proGiCfo
      localThis.formDataListThirdBasic.proGiLff = projectInfo.proGiLff
      localThis.formDataListThirdBasic.proGiEf = projectInfo.proGiEf
      localThis.formDataListThirdBasic.proGiLb = projectInfo.proGiLb
      localThis.formDataListThirdBasic.proGiBankl = projectInfo.proGiBankl
      localThis.formDataListThirdBasic.proGiOth = projectInfo.proGiOth
      // 项目批复信息
      localThis.formDataListForthBasic.proApproveNumber = projectInfo.proApproveNumber
      localThis.formDataListForthBasic.landApproveNumber = projectInfo.landApproveNumber
      localThis.formDataListForthBasic.eiaApproveNumber = projectInfo.eiaApproveNumber
      localThis.formDataListForthBasic.consApproveNumber = projectInfo.consApproveNumber
      // 相关部门联系方式
      localThis.contactInformationFormDataBasic.proAddress = projectInfo.proAddress
      localThis.contactInformationFormDataBasic.estAgencyName = projectInfo.estAgencyName
      localThis.contactInformationFormDataBasic.consAgencyName = projectInfo.consAgencyName
      localThis.contactInformationFormDataBasic.agencyLeaderPerName = projectInfo.agencyLeaderPerName
      localThis.contactInformationFormDataBasic.agencyLeaderPerOtel = projectInfo.agencyLeaderPerOtel
      localThis.contactInformationFormDataBasic.agencyLeaderPerMtel = projectInfo.agencyLeaderPerMtel
      localThis.contactInformationFormDataBasic.fiLeader = projectInfo.fiLeader
      localThis.contactInformationFormDataBasic.fiLeaderOtel = projectInfo.fiLeaderOtel
      localThis.contactInformationFormDataBasic.fiLeaderMtel = projectInfo.fiLeaderMtel
      localThis.contactInformationFormDataBasic.proLeader = projectInfo.proLeader
      localThis.contactInformationFormDataBasic.proLeaderOtel = projectInfo.proLeaderOtel
      localThis.contactInformationFormDataBasic.proLeaderMtel = projectInfo.proLeaderMtel
      localThis.contactInformationFormDataBasic.proLessor = projectInfo.proLessor
      localThis.contactInformationFormDataBasic.proLessorOtel = projectInfo.proLessorOtel
      localThis.contactInformationFormDataBasic.proLessorMtel = projectInfo.proLessorMtel
    },
    initFormItemsBasic(disabled) {
      this.setItemsDisable(this.formItemsConfigBtm, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfig, true, disabled)
      this.setItemsDisable(this.formItemsConfigThird, false, disabled)
      this.setItemsDisable(this.formItemsConfigForth, false, disabled)
      this.setItemsDisable(this.contactInformationFormConfig, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfigSx, true, disabled)
      this.tableToolbarConfigAttach.buttons.forEach(btn => {
        btn.disabled = disabled
        btn.visible = !disabled
      })
      console.log('this.formItemsConfigBtm', this.formItemsConfigBtm)
    },
    initFormItems(disabled) {
      this.setItemsDisable(this.formItemsConfigBtm, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfig, true, disabled)
      this.setItemsDisable(this.modalTblColumnsConfigSx, true, disabled)
    },
    setItemsDisable(itemConfigs, isTable, disabled) {
      if (isTable) {
        itemConfigs.forEach(column => {
          if (disabled) {
            // 只读
            let render = column.editRender
            if (render) {
              column.render = render
              delete column.editRender
            }
          } else {
            let render = column.cellRender || column.render
            if (render) {
              column.editRender = render
              delete column.cellRender
              delete column.render
            }
          }
        })
      } else {
        itemConfigs.forEach(item => {
          if (this.readonly.indexOf(item.field) === -1) {
            if (item.itemRender) {
              if (item.itemRender.props) {
                item.itemRender.props.disabled = disabled
              } else {
                item.itemRender.props = { disabled: disabled }
              }
            }
          } else {
            if (item.itemRender.name === '$vxeTree') {
              item.itemRender.props.config.disabled = disabled
              return
            }
            item.itemRender.props.disabled = true
          }
        })
      }
    },
    addRecord() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length !== 1) {
        localThis.$message.warning('请选择一条数据进行录入')
        return false
      }
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      localThis.proDetId = selection.proDetId
      let params = {
        id: selection.proDetId
      }
      localThis.tableData = []
      localThis.tableDataSx = []
      localThis.isFirst = false
      localThis.isClearable = false
      HttpModule.detailProjectInfo(params).then((res) => {
        if (res.rscode === '200') {
          let proDetMonInfo = res.data.proDetMonInfo
          let perfGoalDetMonList = res.data.perfGoalDetMonList
          let fundUsage = res.data.fundUsage
          let isFirst = res.data.isFirst
          localThis.formDataListBtm = proDetMonInfo
          localThis.formDataListBtm.proAgencyName = proDetMonInfo.proAgencyCode + '-' + proDetMonInfo.proAgencyName
          localThis.tableData = perfGoalDetMonList
          localThis.formData = fundUsage
          localThis.isFirst = isFirst
          localThis.isClearable = isFirst
          localThis.showModal = true
          localThis.modalTitle = '新增'
          localThis.showModalFooter = true
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
          localThis.formDataListBtm = proDetMonInfo

          for (let key in proDetMonInfo) {
            if (key.endsWith('Code')) {
              localThis.formDataListBtm[key.replace('Code', '_code')] = proDetMonInfo[key]
            }
            if (key.endsWith('Name')) {
              localThis.formDataListBtm[key.replace('Name', '_name')] = proDetMonInfo[key]
            }
          }
          // 累计金额
          let fundUsage = res.data.fundUsage
          localThis.formData = fundUsage
          // 绩效
          let perfGoalDetMonList = res.data.perfGoalDetMonList
          localThis.tableData = perfGoalDetMonList
          // 附件
          let proAttchList = res.data.proAttchList
          localThis.tableDataSx = proAttchList
          //
          let isFirst = res.data.isFirst
          localThis.isFirst = isFirst
          localThis.isClearable = isFirst

          localThis.proDetId = proDetMonInfo.proDetId
          localThis.genMonthId = proDetMonInfo.genMonthId
          localThis.proDetMonId = proDetMonInfo.proDetMonId
          localThis.formDataListBtm.proAgencyName = proDetMonInfo.proAgencyCode + '-' + proDetMonInfo.proAgencyName
          this.showModal = true
          this.modalTitle = '编辑'
          localThis.showModalFooter = true
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
          localThis.$message.warning('操作失败' + res.errorMessage)
        }
      })
    },
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal.confirm('请确认是否' + (type === 2 ? '送审?' : '撤销送审?'))
        .then((status) => {
          if (status === 'confirm') {
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
                localThis.$message.warning('操作失败' + res.errorMessage)
              }
            })
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
          this.isFirst = true
          // 基本情况
          let proDetMonInfo = res.data.proDetMonInfo
          localThis.formDataListBtm = proDetMonInfo
          // 累计金额
          let fundUsage = res.data.fundUsage
          localThis.formData = fundUsage
          // 绩效
          let perfGoalDetMonList = res.data.perfGoalDetMonList
          localThis.tableData = perfGoalDetMonList
          // 附件
          let proAttchList = res.data.proAttchList
          localThis.tableDataSx = proAttchList

          localThis.proDetId = proDetMonInfo.proDetId
          localThis.showModal = true
          localThis.modalTitle = '查看详情'
          localThis.showModalFooter = false
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
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
