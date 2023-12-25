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
      :show-footer="false"
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
                    <td colspan="2">增发国债基金</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiIpAccAddnb"
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
                            v-model="formData.proGiIpPreAddnb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreCff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreCfo"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreLff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreEf"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreLb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreBankl"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiIpPreOth"
                            style="width: 100%"
                            clearable
                          />
                        </template>
                      </vxe-form-item>
                    </td>
                  </tr>
                  <!-- 详细 -->
                  <tr>
                    <td colspan="3">累计可用资金（合计）</td>
                    <td>{{ proGiFinalAcc }}</td>
                    <td>{{ proGiFinalPre }}</td>
                  </tr>

                  <tr>
                    <td rowspan="32" style="width: 150px;">其中</td>
                    <td rowspan="4">增发国债基金</td>
                    <td>建筑安装工程投资支出</td>
                    <td>
                      <vxe-form-item title="" field="name" style="width: 100%">
                        <template v-slot>
                          <vxe-input
                            v-model="formData.proGiBupayAccAddnb"
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
                            v-model="formData.proGiBupayPreAddnb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreAddnb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreAddnb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreAddnb"
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
                            v-model="formData.proGiBupayAccCff"
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
                            v-model="formData.proGiBupayPreCff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreCff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreCff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreCff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreCfo"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreCfo"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreCfo"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreCfo"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreLff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreLff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreLff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreLff"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreEf"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreEf"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreEf"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreEf"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreLb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreLb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreLb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreLb"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreBankl"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreBankl"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreBankl"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreBankl"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiBupayPreOth"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiDepayPreOth"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiPrpayPreOth"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiOtpayPreOth"
                            style="width: 100%"
                            clearable
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
                            v-model="formData.proGiCompPre"
                            style="width: 100%"
                            clearable="true"
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
            <BsTable
              ref="fileDataRef"
              height="350"
              :table-columns-config="modalTblColumnsConfigSx"
              :table-data="tableDataSx"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/MonthlyInfoTbl/MonthlyInfoTblFirstAudit.js'

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
      filetype: '01',
      showTypeModal: false,
      menuId: '',
      isLastInst: '',
      modalTitle: '',
      modalForm: '',
      showModal: false,
      showModalFooter: true,
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
          title: '附件代码',
          field: 'proAttchKindCode'
        },
        {
          title: '附件代码',
          field: 'proAttchKindName'
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
            name: '$vxeMoney'
          }
        }
      ],
      addModal: false,
      hideTree: true,
      tableColumnsIdConfig: [
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
      menuName: '增发国债资金项目月度信息审核',
      tableUrl: '/pro-gather-server/gather/pmProjectInfoDetMon/list',
      tableParams: {
        appId: 'pm_project_info_det_month'
      },
      hideZero: true,
      tableCountUrl: '/pro-gather-server/gather/pmProjectInfoDetMon/count',
      tableCountParams: {
        statusCodeArr: ['1', '2'],
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
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '待办事项',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
            {
              code: 'pay-audit',
              label: '审核'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销审核'
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
    this.isLastInst = this.$store.state.curNavModule.param5.isLastInst
    this.loadConfig('C7FB497B80C44A1E86416BDFAE4AB510')
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
      localThis.formData.proGiIpPre = localThis.proGiIpPre
      localThis.formData.proGiIpAcc = localThis.proGiIpAcc
      localThis.formData.proGiCompAcc = localThis.proGiCompAcc
      localThis.formData.proGiCompAcc = localThis.proGiCompAcc

      let perfGoalDetMonList = localThis.$refs.perfGoalDetMonRef.getTableData().fullData
      let proDetMonInfo = localThis.$refs.addForm.getFormData()
      let fundUsage = localThis.formData
      let params = {
        appId: 'pm_project_info_det_month',
        menuId: localThis.menuId,
        actionType: '1',
        actionName: '录入',
        advice: '',
        proDetMonInfo: proDetMonInfo,
        // 累计可用金额
        fundUsage: fundUsage,
        // 绩效
        perfGoalDetMonList: perfGoalDetMonList,
        proAttchList: fileList
      }
      console.log(params)

      let execProgCode = proDetMonInfo.execProgCode
      let execProgName = ''
      if (execProgCode !== '') {
        execProgName = execProgCodeList.find((item) => {
          return item.value === execProgCode
        }).label
      }

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
        isLastInst: localThis.isLastInst,
        actionType: type,
        actionName: type === 2 ? '送审' : '撤销送审'
      }
      HttpModule.auditDataRecords(params).then((res) => {
        if (res.rscode === '200') {
          localThis.$message.success('操作成功')
          localThis.$refs.tmp.refresh()
        } else {
          localThis.$message.warning('操作失败'+res.errorMessage)
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
