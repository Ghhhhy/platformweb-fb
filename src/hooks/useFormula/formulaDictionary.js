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
  budgetImplementationRegion: {
    amountPayAll: {
      default: '{amountSnjpay}+{amountSjpay}+{amountXjpay}',
      isSx: '{amountSnjpay}+{amountSjpay}+{amountXjpay}+{amountZjpay}'
    },
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
      isNeiMeng: '({amountZyxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountZyxd}*100*10)/10'
    },
    xLoad: {
      default: '({amountXjxd}-0==0)?0:Math.round(({amountXjfp}/{amountXjxd}*100)*10)/10',
      isNeiMeng: '({amountZyxd}-0==0)?0:Math.round(({amountXjfp}/{amountZyxd}*100)*10)/10',
      isSx: '({amountZyxd}-0==0)?0:Math.round(({amountXbjfp}+{amountXxjfp})/{amountZyxd}*100*10)/10'
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
  },
  budgetReleaseRegion: {
    szyjd: {
      default: '(({amountSnjzyxd}-0==0)?0:({amountSnjzybjfp}+{amountSnjzyxjfp})*100/{amountSnjzyxd})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountSnjzybjfp}+{amountSnjzyxjfp})*100/{aAmount})'
    },
    sdfjd: {
      default: '(({amountSnjdfdf}-0==0)?0:({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{amountSnjdfdf})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountSnjdfbjfp}+{amountSnjdfxjfp})*100/{aAmount})'
    },
    sajd: {
      default: '({saAmount}-0==0?0:({amountSnjfpAll}+{ssxfpaAmount})/{saAmount})*100',
      isNeiMeng: '({aAmount}-0==0?0:({amountSnjfpAll}+{ssxfpaAmount})/{aAmount})*100'
    },
    shzyjd: {
      default: '(({amountSjzydf}-0==0)?0:({amountSjzybjfp}+{amountSjzyxjfp})*100/{amountSjzydf})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountSjzybjfp}+{amountSjzyxjfp})*100/{aAmount})'
    },
    shdfjd: {
      default: '(({amountSjdfdf}-0==0)?0:({amountSjdfbjfp}+{amountSjdfxjfp})*100/{amountSjdfdf})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountSjdfbjfp}+{amountSjdfxjfp})*100/{aAmount})'
    },
    shajd: {
      default: '({shiaAmount}-0)==0?0:({amountSjfpbjAll}+{shxjfpaAmount})/{shiaAmount}*100',
      isNeiMeng: '({aAmount}-0)==0?0:({amountSjfpbjAll}+{shxjfpaAmount})/{aAmount}*100'
    },
    xzyjd: {
      default: '(({amountXjzydf}-0==0)?0:({amountXjzybjfp})*100/{amountXjzydf})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountXjzybjfp})*100/{aAmount})'
    },
    xdfjd: {
      default: '(({amountXjdfdf}-0==0)?0:({amountXjdfbjfp})*100/{amountXjdfdf})',
      isNeiMeng: '(({aAmount}-0==0)?0:({amountXjdfbjfp})*100/{aAmount})'
    },
    xajd: {
      default: '({xaAmount}-0==0?0:{amountXjfpAll}/{xaAmount})*100',
      isNeiMeng: '({aAmount}-0==0?0:{amountXjfpAll}/{aAmount})*100'
    },
    szywfpAmount: { // 省级-未分配-中央安排
      default: '({amountSnjzyxd}-{amountSnjzybjfp})-{amountSnjzyxjfp}',
      isNeiMeng: '({amountSnjzyxd}-{amountSnjzybjfp})'
    },
    sdfwfpAmount: { // 省级-未分配-地方安排
      default: '({amountSnjdfdf}-{amountSnjdfbjfp}-{amountSnjdfxjfp})',
      isNeiMeng: '({amountSnjdfdf}-{amountSnjdfbjfp})'
    },
    shzywfpAmount: { // 市级-未分配-中央安排
      default: '({amountSjzydf}-{amountSjzybjfp}-{amountSjzyxjfp})',
      isNeiMeng: '{amountSjzydf}-{amountSjzybjfp}'
    },
    shdfwfpAmount: { // 市级-未分配-地方安排
      default: '({amountSjdfdf}-{amountSjdfbjfp}-{amountSjdfxjfp})',
      isNeiMeng: '{amountSjdfdf}-{amountSjdfbjfp}'
    }
  },
  budgetPayRegion: {
    pPro: {
      default: '({amountZjzl}+{cAmount})-0==0?0:Math.round({amountZjzc}/({amountZjzl}+{cAmount})*100*10)/10',
      isNeiMeng: '({amountZjzl}-0==0?0:{amountZjzc}/{amountZjzl}*100)'
    },
    szyappPro: {
      default: '{amountSnjzyxd}-0==0?0:Math.round({amountSnjzypay}/{amountSnjzyxd}*100*10)/10',
      isNeiMeng: '({amountSnjzyxd}-0==0?0:{amountSnjzypay}/{amountSnjzyxd}*100)'
    },
    sdfappPro: {
      default: '{amountSnjdfdf}-0==0?0:Math.round({amountSnjdfpay}/{amountSnjdfdf}*100*10/10)',
      isNeiMeng: '{amountSnjdfdf}-0==0?0:{amountSnjdfpay}/{amountSnjdfdf}*100'
    },
    sapPro: {
      default: '{saaAmount}-0==0?0:Math.round({sapAmount}/{saaAmount}*100*10)/10',
      isNeiMeng: '{saaAmount}-0==0?0:{sapAmount}/{saaAmount}*100'
    },
    shzyappPro: {
      default: '{amountSjzydf}-0==0?0:Math.round({amountSjzypay}/{amountSjzydf}*100*10)/10',
      isNeiMeng: '{amountSjzydf}-0==0?0:{amountSjzypay}/{amountSjzydf}*100'
    },
    shdfappPro: {
      default: '{amountSjdfdf}-0==0?0:Math.round({amountSjdfpay}/{amountSjdfdf}*100*10)/10',
      isNeiMeng: '{amountSjdfdf}-0==0?0:{amountSjdfpay}/{amountSjdfdf}*100'
    },
    shapPro: {
      default: '{shaaAmount}-0==0?0:Math.round({shapAmount}/{shaaAmount}*100*10)/10',
      isNeiMeng: '({shaaAmount}-0==0?0:{shapAmount}/{shaaAmount})*100'
    },
    xzyapPro: {
      default: '{amountXjzydf}-0==0?0:Math.round({amountXjzypay}/{amountXjzydf}*100*10)/10',
      isNeiMeng: '{amountXjzydf}-0==0?0:{amountXjzypay}/{amountXjzydf}*100'
    },
    xdfappPro: {
      default: '{amountXjdfdf}-0==0?0:Math.round({amountXjdfpay}/{amountXjdfdf}*100*10)/10',
      isNeiMeng: '{amountXjdfdf}-0==0?0:{amountXjdfpay}/{amountXjdfdf}*100'
    },
    xapPro: {
      default: '{xaaAmount}-0==0?0:Math.round({xapAmount}/{xaaAmount}*100*10)/10',
      isNeiMeng: '{xaaAmount}-0==0?0:({xapAmount}/{xaaAmount})*100'
    }
  },
  budgetDisburseCapital: {
    numberSnjZcjdZyap: {
      default: '{amountSnjxd}-0==0?0:Math.round({amountSnjpay}/{amountSnjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjpay}/{amountZyxd}*100*10)/10'
    },
    numberSnjZcjdSnjap: {
      default: '{amountSnjZjzlSjap}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountSnjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberSnjZcjdzje: {
      default: '{amountSnjZjzlZje}-0==0?0:Math.round({amountSnjZcjeZje}/{amountSnjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjZcjeZje}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdZyap: {
      default: '{amountSjxd}-0==0?0:Math.round({amountSjpay}/{amountSjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjpay}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdSnjap: {
      default: '{amountSjZjzlSnjap}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountSjZjzlSnjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdSjap: {
      default: '{amountSjZjzlSjap}-0==0?0:Math.round({amountSjZcjeSjap}/{amountSjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeSjap}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdZje: {
      default: '{amountSjZjzlZje}-0==0?0:Math.round({amountSjZcjeZje}/{amountSjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeZje}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdZyap: {
      default: '{amountXjxd}-0==0?0:Math.round({amountXjpay}/{amountXjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjpay}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdSnjap: {
      default: '{amountXjZjzlSnjap}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountXjZjzlSnjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdSjap: {
      default: '{amountXjZjzlSjap}-0==0?0:Math.round({amountXjZcjeSjap}/{amountXjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeSjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdXjap: {
      default: '{amountXjZjzlXjap}-0==0?0:Math.round({amountXjZcjeXjap}/{amountXjZjzlXjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeXjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdZje: {
      default: '{amountXjZjzlZje}-0==0?0:Math.round({amountXjZcjeZje}/{amountXjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeZje}/{amountZyxd}*100*10)/10'
    }

  },
  budgetDisburseRegion: {
    numberSnjZcjdZyap: {
      default: '{amountSnjxd}-0==0?0:Math.round({amountSnjpay}/{amountSnjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjpay}/{amountZyxd}*100*10)/10'
    },
    numberSnjZcjdSnjap: {
      default: '{amountSnjZjzlSjap}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountSnjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberSnjZcjdzje: {
      default: '{amountSnjZjzlZje}-0==0?0:Math.round({amountSnjZcjeZje}/{amountSnjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSnjZcjeZje}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdZyap: {
      default: '{amountSjxd}-0==0?0:Math.round({amountSjpay}/{amountSjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjpay}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdSnjap: {
      default: '{amountSjZjzlSnjap}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountSjZjzlSnjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdSjap: {
      default: '{amountSjZjzlSjap}-0==0?0:Math.round({amountSjZcjeSjap}/{amountSjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeSjap}/{amountZyxd}*100*10)/10'
    },
    numberSjZcjdZje: {
      default: '{amountSjZjzlZje}-0==0?0:Math.round({amountSjZcjeZje}/{amountSjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountSjZcjeZje}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdZyap: {
      default: '{amountXjxd}-0==0?0:Math.round({amountXjpay}/{amountXjxd}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjpay}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdSnjap: {
      default: '{amountXjZjzlSnjap}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountXjZjzlSnjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeSnjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdSjap: {
      default: '{amountXjZjzlSjap}-0==0?0:Math.round({amountXjZcjeSjap}/{amountXjZjzlSjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeSjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdXjap: {
      default: '{amountXjZjzlXjap}-0==0?0:Math.round({amountXjZcjeXjap}/{amountXjZjzlXjap}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeXjap}/{amountZyxd}*100*10)/10'
    },
    numberXjZcjdZje: {
      default: '{amountXjZjzlZje}-0==0?0:Math.round({amountXjZcjeZje}/{amountXjZjzlZje}*100*10)/10',
      isNeiMeng: '{amountZyxd}-0==0?0:Math.round({amountXjZcjeZje}/{amountZyxd}*100*10)/10'
    }
  },
  dfrBudgetReleaseCapital: {
    szyjd: {
      default: '{amountSnjzyxd}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{amountSnjzyxd}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{aAmount}*100'
    },
    sdfjd: {
      default: '{amountSnjsnjdf}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{amountSnjsnjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{aAmount}*100'
    },
    sajd: {
      default: '{saAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{saAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{aAmount}*100'
    },
    shzyjd: {
      default: '{amountSjzydf}-0==0?0:({amountSjzybjfp}+{amountSjzyxjfp})/{amountSjzydf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjzybjfp}+{amountSjzyxjfp})/{aAmount}*100'
    },
    shdfjd: {
      default: '{amountSjsnjdf}-0==0?0:({amountSjsnjxjfp}+{amountSjsnjbjfp})/{amountSjsnjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjsnjxjfp}+{amountSjsnjbjfp})/{aAmount}*100'
    },
    sjsjapjd: {
      default: '{amountSjsjdf}-0==0?0:({amountSjsjbjfp}+{amountSjsjxjfp})/{amountSjsjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjsjbjfp}+{amountSjsjxjfp})/{aAmount}*100'
    },
    shajd: {
      default: '{shiaAmount}-0==0?0:({shbjfpaAmount}+{shxjfpaAmount})/{shiaAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:({shbjfpaAmount}+{shxjfpaAmount})/{aAmount}*100'
    },
    xzyjd: {
      default: '{amountXjzydf}-0==0?0:{amountXjzybjfp}/{amountXjzydf}*100',
      isNeiMeng: '{aAmount}-0==0?0:{amountXjzybjfp}/{aAmount}*100'
    },
    xdfjd: {
      default: '{amountXjsnjfdf}-0 == 0?0:{amountXjsnjbjfp}/{amountXjsnjfdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjsnjbjfp}/{aAmount}*100'
    },
    xjsjapjd: {
      default: '{amountXjsjdf}-0 == 0?0:{amountXjsjbjfp}/{amountXjsjdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjsjbjfp}/{aAmount}*100'
    },
    xjxjapjd: {
      default: '{amountXjxjdf}-0 == 0?0:{amountXjxjbjfp}/{amountXjxjdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjxjbjfp}/{aAmount}*100'
    },
    xajd: {
      default: '{xaAmount}-0==0?0:{xyfpaAmount}/{xaAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:{xyfpaAmount}/{aAmount}*100'
    },
    shidfapAmount1: {
      default: '{amountSjsjdf}-{amountSjsjbjfp}-{amountSjsjxjfp}',
      isNeiMeng: '{amountSjsjdf}-{amountSjsjbjfp}'
    }
  },
  dfrBudgetReleaseRegion: {
    szyjd: {
      default: '{amountSnjzyxd}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{amountSnjzyxd}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSnjzybjfp}+{amountSnjsnjxjfp})/{aAmount}*100'
    },
    sdfjd: {
      default: '{amountSnjsnjdf}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{amountSnjsnjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSnjsnjbjfp}+{amountSnjsnjxjfp})/{aAmount}*100'
    },
    sajd: {
      default: '{saAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{saAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:({sbjfpaAmount}+{ssxfpaAmount})/{aAmount}*100'
    },
    shzyjd: {
      default: '{amountSjzydf}-0==0?0:({amountSjzybjfp}+{amountSjzyxjfp})/{amountSjzydf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjzybjfp}+{amountSjzyxjfp})/{aAmount}*100'
    },
    shdfjd: {
      default: '{amountSjsnjdf}-0==0?0:({amountSjsnjxjfp}+{amountSjsnjbjfp})/{amountSjsnjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjsnjxjfp}+{amountSjsnjbjfp})/{aAmount}*100'
    },
    sjsjapjd: {
      default: '{amountSjsjdf}-0==0?0:({amountSjsjbjfp}+{amountSjsjxjfp})/{amountSjsjdf}*100',
      isNeiMeng: '{aAmount}-0==0?0:({amountSjsjbjfp}+{amountSjsjxjfp})/{aAmount}*100'
    },
    shajd: {
      default: '{shiaAmount}-0==0?0:({shbjfpaAmount}+{shxjfpaAmount})/{shiaAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:({shbjfpaAmount}+{shxjfpaAmount})/{aAmount}*100'
    },
    xzyjd: {
      default: '{amountXjzydf}-0==0?0:{amountXjzybjfp}/{amountXjzydf}*100',
      isNeiMeng: '{aAmount}-0==0?0:{amountXjzybjfp}/{aAmount}*100'
    },
    xdfjd: {
      default: '{amountXjsnjfdf}-0 == 0?0:{amountXjsnjbjfp}/{amountXjsnjfdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjsnjbjfp}/{aAmount}*100'
    },
    xjsjapjd: {
      default: '{amountXjsjdf}-0 == 0?0:{amountXjsjbjfp}/{amountXjsjdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjsjbjfp}/{aAmount}*100'
    },
    xjxjapjd: {
      default: '{amountXjxjdf}-0 == 0?0:{amountXjxjbjfp}/{amountXjxjdf}*100',
      isNeiMeng: '{aAmount}-0 == 0?0:{amountXjxjbjfp}/{aAmount}*100'
    },
    xajd: {
      default: '{xaAmount}-0==0?0:{xyfpaAmount}/{xaAmount}*100',
      isNeiMeng: '{aAmount}-0==0?0:{xyfpaAmount}/{aAmount}*100'
    }
  }
}
