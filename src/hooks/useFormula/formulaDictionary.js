export default {
  budgetImplementationCapital: {
    jLoad: {
      default: '({amountZyxd}-0==0)?0:Math.round(({amountPayAll}/{amountZyxd}*100)*10)/10',
      isSx: '({amountZyxdBhxj}-0==0)?0:Math.round(({amountPayAll}/{amountZyxdBhxj}*100)*10)/10'
    },
    sLoad: {
      default: '({amountSnjxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100*10)/10',
      isNeiMeng: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10'
    },
    aLoad: {
      default: '({amountSjxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100*10)/10',
      isNeiMeng: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10'
    },
    xLoad: {
      default: '({amountXjxd}-0==0)?0:Math.round({amountXjfp}/{amountXjxd}*100*10)/10',
      isNeiMeng: '({amountZyxd}-0==0)?0:Math.round({amountXjfp}/{amountZyxd}*100*10)/10',
      isSx: '({amountZyxd}-0==0)?0:Math.round(({amountXbjfp}+{amountXxjfp})/{amountZyxd}*100*10)/10'
    },
    amountPayAll: {
      default: '{amountSnjpay}+{amountSjpay}+{amountXjpay}',
      isSx: '{amountSnjpay}+{amountSjpay}+{amountXjpay}+{amountZjpay}'
    }
  },
  budgetReleaseCapital: {
    szyjd: {
      default: '({amountZjzl}-0==0)?0:Math.round(({amountSnjzybjfp}+{amountSnjzyxjfp})/{amountZjzl}*100*10)/10',
      isNeiMeng: '({aAmount}-0==0)?0:Math.round(({amountSnjzybjfp}+{amountSnjzyxjfp})/{aAmount}*100*10)/10'
    },
    sdfjd: {
      default: '({amountZjzl}-0==0)?0:Math.round(({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{amountZjzl}*10)/10',
      isNeiMeng: '({amountZjzl}-0==0)?0:Math.round(({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{amountZjzl}*10)/10'
    },
    sajd: {
      default: '({saAmount}-0==0)?0:Math.round(({amountSnjfpAll}+{ssxfpaAmount})/{saAmount}*100*10)/10',
      isNeiMeng: '({saAmount}-0==0)?0:Math.round(({amountSnjfpAll}+{ssxfpaAmount})/{saAmount}*100*10)/10'
    },
    shzyjd: {
      default: '({amountZjzl}-0==0)?0:Math.round(({amountSjzybjfp}+{amountSjzyxjfp})*100/{amountZjzl}*10)/10',
      isNeiMeng: '({aAmount}-0==0)?0:Math.round(({amountSjzybjfp}+{amountSjzyxjfp})*100/{aAmount}*10)/10'
    },
    shdfjd: {
      default: '({amountZjzl}-0)==0?0:Math.round(({amountSjdfbjfp}+{amountSjdfxjfp})*100/{amountZjzl}*10)/10',
      isNeiMeng: '({aAmount}-0)==0?0:Math.round(({amountSjdfbjfp}+{amountSjdfxjfp})*100/{aAmount}*10)/10'
    },
    shajd: {
      default: '({shiaAmount}-0)==0?0:Math.round(({amountSjfpbjAll}+{shxjfpaAmount})/{shiaAmount}*100*10)/10',
      isNeiMeng: '({aAmount}-0)==0?0:Math.round(({amountSjfpbjAll}+{shxjfpaAmount})/{aAmount}*100*10)/10'
    },
    xzyjd: {
      default: '(amountZjzl)?0:Math.round({amountXjzybjfp}*100/{amountZjzl}*10)/10',
      isNeiMeng: '(aAmount)?0:Math.round({amountXjzybjfp}*100/{aAmount}*10)/10'
    },
    xdfjd: {
      default: '({amountZjzl}-0==0)?0:Math.round({amountXjdfbjfp}*100/{amountZjzl}*10)/10',
      isNeiMeng: '({aAmount}-0==0)?0:Math.round({amountXjdfbjfp}*100/{aAmount}*10)/10'
    },
    xajd: {
      default: '({xaAmount}-0)==0?0:Math.round({amountXjfpAll}/{xaAmount}*100*10)/10',
      isNeiMeng: '({aAmount}-0)==0?0:Math.round({amountXjfpAll}/{aAmount}*100*10)/10'
    }
  }
}
