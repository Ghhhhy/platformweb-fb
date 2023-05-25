import { onMounted, onBeforeUnmount, ref, unref, reactive, watch } from '@vue/composition-api'
import * as echarts from 'echarts'
import store from '@/store'
import { businessStatistics, mapJson } from '@/api/frame/main/warningOverview'
import computedPx from '@/utils/computedPx'

let mapGecJson = {}
const useMap = (regulationClass = '') => {
  // 地图承载容器ref
  const shanxiMapRef = ref(null)
  // 地图实例
  let mapChartInstance = null
  // 地图数据
  const mapData = ref([])
  // 当前区划code
  const mofDivCode = ref(store.state.userInfo.province.slice(0, 2))

  // 地图tips信息
  const mapTipsInfo = reactive({
    title: store.state.userInfo.admdivname,
    detail: []
  })

  // 地图tips展开收起
  const expendState = ref(false)

  // 展开收起切换
  const mapTipsTrigger = () => {
    expendState.value = !expendState.value
  }

  // 获取地图geoData，并初始化地图
  const initMap = async () => {
    const code = store.state.userInfo.province
    const { data } = await mapJson({ cityCode: code })
    mapGecJson = data
    echarts.registerMap(store.state.userInfo.province, { features: mapGecJson.features })
    mapData.value = mapGecJson.features.map((item) => {
      const adcode = item.properties.adcode
      return {
        name: item.properties.name,
        value: 0,
        mofDivCode: adcode
      }
    })
    mapChartInstance = echarts.init(unref(shanxiMapRef))
    const option = {
      visualMap: {
        left: 0,
        bottom: 0,
        show: true,
        showLabel: true,
        inverse: true,
        itemWidth: computedPx(8),
        itemHeight: computedPx(8),
        textStyle: {
          color: '#000'
        },
        pieces: [
          {
            gte: 0,
            lte: 100,
            label: '0-100',
            color: '#82A2FE'
          },
          {
            gt: 100,
            lte: 300,
            label: '100-300',
            color: '#7697FF'
          },
          {
            gt: 300,
            lte: 1000,
            label: '300-1000',
            color: '#5D80FF'
          },
          {
            gt: 1000,
            label: '>1000',
            color: '#446CFA'
          }
        ]
      },
      geo: {
        show: true,
        map: store.state.userInfo.province,
        aspectScale: 1,
        zoom: 1,
        top: computedPx(15),
        bottom: 0,
        left: computedPx(100),
        right: computedPx(100),
        label: {
          show: true,
          color: '#fff',
          fontSize: computedPx(14)
        },
        emphasis: {
          label: {
            color: '#fff'
          },
          itemStyle: {
            areaColor: '#FAC739'
          }
        },
        select: {
          label: {
            color: '#fff'
          },
          itemStyle: {
            areaColor: '#FAC739'
          }
        },
        // 响应鼠标事件
        roam: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
          // 鼠标移入强调颜色
          emphasis: {
            areaColor: '#FAC739'
          }
        }
      },
      series: [
        {
          type: 'map',
          map: store.state.userInfo.province,
          geoIndex: 0,
          // 长宽比
          aspectScale: 1,
          roam: true,
          animation: true,
          data: unref(mapData)
        }
      ]
    }
    mapChartInstance.setOption(option)

    mapChartInstance.on('selectchanged', (params) => {
      const { fromActionPayload, fromAction } = params
      const dataIndex = fromActionPayload.dataIndexInside
      if (fromAction === 'unselect') {
        const { province, admdivname } = store.state.userInfo
        mofDivCode.value = province?.slice(0, 2)
        mapTipsInfo.title = admdivname
      } else if (fromAction === 'select') {
        mofDivCode.value = unref(mapData)[dataIndex].mofDivCode?.toString().slice(0, 4)
        mapTipsInfo.title = unref(mapData)[fromActionPayload.dataIndexInside].name + '所辖县区'
      }
    })
  }

  /**
   * 请求地图右上角tips信息
   * @returns {Promise<void>}
   */
  const getMapTipsInfo = async (mofDivCode) => {
    const { data } = await businessStatistics({ mofDivCode, regulationClass })
    mapTipsInfo.detail = data || []
  }

  /**
   * 获取地图数据源
   * @returns {Promise<*[]>}
   */
  const getMapInitInfo = async () => {
    const { province } = store.state.userInfo
    const { data } = await businessStatistics({ mofDivCode: province.slice(0, 2), regulationClass })
    mapTipsInfo.detail = data || []

    mapData.value = mapGecJson.features.map((item) => {
      const adcode = item.properties.adcode
      return {
        name: item.properties.name,
        value: data?.find(item => item.mofDivCode === adcode)?.warnCount || 0,
        mofDivCode: adcode
      }
    })
    mapChartInstance.setOption({
      series: [{ data: unref(mapData) }]
    })
    return data || []
  }

  /**
   * 尺寸变化
   */
  function chartResize() {
    mapChartInstance.resize?.()
  }

  onMounted(() => {
    initMap()
    window.addEventListener('resize', chartResize)
    getMapInitInfo()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', chartResize)
  })

  watch(mofDivCode, () => {
    getMapTipsInfo(unref(mofDivCode))
  })

  return {
    shanxiMapRef,
    mapTipsInfo,
    expendState,
    mapTipsTrigger
  }
}

export default useMap
