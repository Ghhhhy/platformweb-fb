/* eslint-disable */
/* 前端埋点--收集用户信息*/
var userBehaviorMonitor = {
	userInfo :localStorage.getItem("__boss_cache__userInfo") ? JSON.parse(localStorage.getItem("__boss_cache__userInfo")) : '{}',
	bosspageconfig : localStorage.getItem("bosspageconfig") ? JSON.parse(localStorage.getItem("bosspageconfig")) : '{}' ,
	/* 默认基础配置 */
	defaultConfig: {
		url: "",
		maxLength: 1
	},

	/* 用户自定义配置 */
	userConfig: {
	},

	ajaxCount:0,
	collectDatas: [],
	// 存储进入界面的时间
	timeArray:[],
	loadArray:[],
	options:{},
	/* 默认保存数据格式设置 */
	// defaultOptions: {
	// 	user_id : null,/**用户id*/
	// 	user_code:null,  /**用户编码*/
	// 	province: null,/**区划编码*/
	// 	agency:null,    /** */
	// 	roleguid:null,  /**当前角色id*/
	// 	time:null,    /**进入界面的时间*/
	// 	behavior_type:null, /**操作类型*/
	// 	behavior_content:{},/**操作内容*/
	// 	tokenid: null,  /**tokenid*/
	// 	menuguid:null, /**菜单id*/
	// 	menuname:null,
	// 	appcode:null,
	// 	appname:null
	// },
	/* 初始化 */
	init: function(options){
		this.userConfig = options;
		this.setConfig();
		// this.setDefaultOptions();
		this.pageOnload();
		this.getDateTime();
		this.monitorBtnClick();
		// this.monitorAjax();
		this.pageStayTime();
	},

	/* 默认基础配置 */
	setConfig: function(){
		this.config = $.extend(this.defaultConfig,this.userConfig.config);
	},

	/* 默认保存数据格式设置 */
	// setDefaultOptions: function(){
	// 	this.defaultOptions.user_id = this.userInfo.guid;
	// 	this.defaultOptions.user_code = this.userInfo.code;
	// 	this.defaultOptions.province = this.userInfo.province;
	// 	this.defaultOptions.agency = this.userInfo.agency;
	// 	this.defaultOptions.appcode = this.userInfo.app.code;
	// 	this.defaultOptions.appname = this.userInfo.app.name;
	// 	this.defaultOptions.menuguid = this.bosspageconfig.menuguid;
	// 	this.defaultOptions.menuname = this.bosspageconfig.name;
	// 	this.defaultOptions.roleguid = this.bosspageconfig.roleguid;
	// 	this.defaultOptions.time = this.getDateTime();
	// 	this.defaultOptions.tokenid = this.getUrlParam(window.location.search,"tokenid");
	// 	this.defaultOptions.url = window.location.href.split('?')[0];
	// },

	/* 监控按钮点击事件 */
	monitorBtnClick: function(){
		var that = this;
		var usertype = null;
		if(that.userInfo.usertype == -1){
			usertype = "sysadmin";
		}
		else if(that.userInfo.usertype == -2){
			usertype = "secadmin";
		}else {
			usertype = that.userInfo.usertype;
		}
			$(document).on("mousedown",function(e){
      if(window.gloableToolFn.openBehaviorcollector===false){
        return
      }
			var e= window.event ||e; //事件兼容写法
			if($(e.target).is("a")){
				var clickA ={}
				var recmmentA = {}
				var toUrl = $(e.target)[0].href || $(e.target)[0].getAttribute('data-id') ;
				// 判断哪个里面包含.html
				if($(e.target)[0].href.indexOf(".html") !=-1){
					toUrl = $(e.target)[0].href
				}else{
					toUrl = $(e.target)[0].getAttribute('data-id')
				}
				clickA.user_id = that.userInfo.guid;
				clickA.user_code = that.userInfo.code;
				clickA.user_name = that.userInfo.name;
				clickA.province = that.userInfo.province;
				clickA.usertype = usertype;
				clickA.time_ = that.getDateTime();
				clickA.time = that.getCurrentDate();
				clickA.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
				// clickA.appcode = that.userInfo.app.code;
				clickA.appname = that.userInfo.app.name;
				clickA.menuguid = that.bosspageconfig.menuguid;
				// clickA.menuname = that.bosspageconfig.name;
				clickA.roleguid = that.bosspageconfig.roleguid;
				clickA.behavior_type = "click-a";
				clickA.behavior_content= {}
                clickA.behavior_content.url= e.currentTarget.URL.split('?')[0];
				if($(e.target).text() !== null){
					clickA.behavior_content.value = $(e.target).text();
				}else{
					clickA.behavior_content.value = "----";
				}
				clickA.behavior_content.menuname = that.bosspageconfig.name;
				if($(e.target)[0].className.indexOf('dataA') !== -1 ){
					// 默认n，如果点击了智能推荐
					recmmentA.behavior_type = "page-recommend";
					var recmmentUrl = $(e.target)[0].href || $(e.target)[0].getAttribute('data-id') ;
					// 判断哪个里面包含.html
					if($(e.target)[0].href.indexOf(".html") !=-1){
						recmmentUrl = $(e.target)[0].href
					}else{
						recmmentUrl = $(e.target)[0].getAttribute('data-id')
					}
					recmmentA.user_id = that.userInfo.guid;
					recmmentA.user_code = that.userInfo.code;
					recmmentA.user_name = that.userInfo.name;
					recmmentA.province = that.userInfo.province;
					recmmentA.usertype = usertype;
					recmmentA.time_ = that.getDateTime();
					recmmentA.time = that.getCurrentDate();
					recmmentA.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
					// recmmentA.appcode = that.userInfo.app.code;
					recmmentA.appname = that.userInfo.app.name;
					recmmentA.menuguid = that.bosspageconfig.menuguid;
					// recmmentA.menuname = that.bosspageconfig.name;
					recmmentA.roleguid = that.bosspageconfig.roleguid;
					recmmentA.behavior_type = "click-dataA";
					recmmentA.behavior_content= {}
					recmmentA.behavior_content.url= recmmentUrl.split('?')[0];
					recmmentA.behavior_content.value = "----";
					recmmentA.behavior_content.menuname = $(e.target).text();
					that.collectDatas.push(recmmentA)
					that.timeArray.push(recmmentA)
					that.addRecord();
				}
				that.collectDatas.push(clickA);
				that.timeArray.push(clickA)
				that.addRecord();
			}else if($(e.target).hasClass("btn") || $(e.target).hasClass("bossbtn") || $(e.target).addClass(".btn") || $(e.target).addClass(".bossbtn").length>0){
				var clickButton ={}
				if($(e.target).hasClass("btn") || $(e.target).hasClass("bossbtn")){
					var t = $(e.target);
				}else{
					var t = $(e.target).addClass(".btn") || $(e.target).addClass(".bossbtn");
				}
				clickButton.user_id = that.userInfo.guid;
				clickButton.user_code = that.userInfo.code;
				clickButton.user_name = that.userInfo.name;
				clickButton.province = that.userInfo.province;
				clickButton.usertype = usertype;
				clickButton.time = that.getCurrentDate();
				clickButton.time_ = that.getDateTime();
				clickButton.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
				// clickButton.appcode = that.userInfo.app.code;
				clickButton.appname = that.userInfo.app.name;
				clickButton.menuguid = that.bosspageconfig.menuguid;
				// clickButton.menuname = that.bosspageconfig.name;
				clickButton.roleguid = that.bosspageconfig.roleguid;
				clickButton.behavior_type = "click-btn";
				clickButton.behavior_content = {};
				if(t.find("span").text() || t.text() !== null){
					clickButton.behavior_content.value = (t.find("span").text() || t.text() || t.parent().text()).replaceAll('/n', '').trim();
				}else {
					clickButton.behavior_content.value = "----";
				}
				clickButton.behavior_content.url= e.currentTarget.URL.split('?')[0];
				clickButton.behavior_content.menuname = that.bosspageconfig.name;
				that.collectDatas.push(clickButton)
        		that.addRecord();
			}else if($(e.target).hasClass("close") || $(e.target).parents(".close").length>0){
      			// 关闭按钮 x事件
				var closeButton ={}
				if($(e.target).hasClass("close") || $(e.target).hasClass("close")){
					var t = $(e.target);
				}else{
					var t = $(e.target).parents(".close") || $(e.target).parents(".close");
				}
				closeButton.user_id = that.userInfo.guid;
				closeButton.user_code = that.userInfo.code;
				closeButton.user_name = that.userInfo.name;
				closeButton.province = that.userInfo.province;
				closeButton.usertype = usertype;
				closeButton.time = that.getCurrentDate();
				closeButton.time_ = that.getDateTime();
				closeButton.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
				// closeButton.appcode = that.userInfo.app.code;
				closeButton.appname = that.userInfo.app.name;
				closeButton.menuguid = that.bosspageconfig.menuguid;
				// closeButton.menuname = that.bosspageconfig.name;
				closeButton.roleguid = that.bosspageconfig.roleguid;
				closeButton.behavior_type = "click-close";
				closeButton.behavior_content = {};
				closeButton.behavior_content.value = "关闭";
				closeButton.behavior_content.url= e.currentTarget.URL.split('?')[0];
				closeButton.behavior_content.menuname = that.bosspageconfig.name;
				that.collectDatas.push(closeButton)
				that.addRecord();
			}else if($(e.target).hasClass("hometab") || $(e.target).parents(".hometab").length>0){
				var clickTab={}
				if($(e.target).hasClass("hometab")){
					var t = $(e.target);
				}else{
					var t = $(e.target).parents(".hometab");
				}
				clickTab.user_id = that.userInfo.guid;
				clickTab.user_code = that.userInfo.code;
				clickTab.user_name = that.userInfo.name;
				clickTab.province = that.userInfo.province;
				clickTab.usertype = usertype;
				clickTab.time = that.getCurrentDate();
				clickTab.time_ = that.getDateTime();
				clickTab.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
				// clickTab.appcode = that.userInfo.app.code;
				clickTab.appname = that.userInfo.app.name;
				clickTab.menuguid = that.bosspageconfig.menuguid;
				// clickTab.menuname = that.bosspageconfig.name;
				clickTab.roleguid = that.bosspageconfig.roleguid;
				clickTab.behavior_type = "click-hometab";
				clickTab.behavior_content = {};
				if(t.find("span").text() !== null){
					clickTab.behavior_content.value = t.find("span").text();
				}else {
					clickTab.behavior_content.value = "----";
				}
				clickTab.behavior_content.url= e.currentTarget.URL.split('?')[0];
				clickTab.behavior_content.menuname = that.bosspageconfig.name;
				that.collectDatas.push(clickTab);
				that.addRecord();
			}else if($(e.target).hasClass('fa-remove')){
				var clickI = {};
				clickI.behavior_content= {};
				// 如果点击的关闭按钮
				var closedIurl = '';
				// 当前关闭界面的地址
				closedIurl= $(e.target).parents('.menuTab')[0].getAttribute('data-id');
				clickI.user_id = that.userInfo.guid;
				clickI.user_code = that.userInfo.code;
				clickI.user_name = that.userInfo.name;
				clickI.province = that.userInfo.province;
				clickI.usertype = usertype;
				clickI.time = that.getCurrentDate();
				clickI.time_ = that.getDateTime();
				clickI.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
				// clickI.appcode = that.userInfo.app.code;
				clickI.appname = that.userInfo.app.name;
				clickI.menuguid = that.bosspageconfig.menuguid;
				// clickI.menuname = that.bosspageconfig.name;
				clickI.roleguid = that.bosspageconfig.roleguid;
				clickI.behavior_type = "page-time";
				clickI.behavior_content.url = closedIurl.split('?')[0];
				clickI.behavior_content.value = "----";
				// 当前界面的名称
				clickI.behavior_content.menuname = '';
				clickI.behavior_content.menuname = $(e.target).parents('.menuTab')[0].innerText;
				// 判断收集的数据里面是否有当前url对应的page-view，如果有，就是进入界面的时间
				$.each(that.timeArray,function(i,item){
					if(item.current_role_id == clickI.current_role_id){
						if(item.behavior_type == "click"){
							//停留时间 = 当前关闭界面时间- 进入界面的时间
							clickI.behavior_content.staytime =(clickI.time_ -  item.time_)*0.001;
							return false;
						}
					}
				})
				// 判断当前有没有
				if(!clickI.behavior_content.staytime){
					that.sendOptions(that.collectDatas);
				}else{
					that.collectDatas.push(clickI);
					that.sendOptions(that.collectDatas);
				}
			}
		});
	},
	// 进入界面事件
	pageOnload: function(){
		var that = this;
		var usertype = null;
		if(that.userInfo.usertype == -1){
			usertype = "sysadmin";
		}
		else if(that.userInfo.usertype == -2){
			usertype = "secadmin";
		}
		else {
			usertype = that.userInfo.usertype;
		}
		window.onload= function(e){
			var loadEvent = {}
			var e= window.event ||e; //事件兼容写法
			loadEvent.user_id = that.userInfo.guid;
			loadEvent.user_code = that.userInfo.code;
			loadEvent.user_name = that.userInfo.name;
			loadEvent.province = that.userInfo.province;
			loadEvent.usertype = usertype;
			loadEvent.time = that.getCurrentDate();
			loadEvent.time_= that.getDateTime();
			loadEvent.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
			// loadEvent.appcode = that.userInfo.app.code;
			loadEvent.appname = that.userInfo.app.name;
			loadEvent.menuguid = that.bosspageconfig.menuguid;
			// loadEvent.menuname = that.bosspageconfig.name;
			loadEvent.roleguid = that.bosspageconfig.roleguid;
			loadEvent.behavior_type = "page-view";
			// 当前界面地址
			loadEvent.behavior_content = {};
			// 当前界面的名称
			loadEvent.behavior_content.menuname = '';
			loadEvent.behavior_content.url = e.target.URL.split('?')[0];
			loadEvent.behavior_content.value = "----";
			// 上一个界面地址
			loadEvent.behavior_content.parent_url = e.target.referrer.split('?')[0];
			loadEvent.behavior_content.menuname = top.$('.page-tabs-content').find('.active')[0]?.innerText;
			that.collectDatas.push(loadEvent);
			that.loadArray.push(loadEvent);
			that.addRecord();
		}
	},
	// 界面停留时间
	pageStayTime: function(){

		var that = this;
		var pageStayTimeLoad = {}
		var usertype = null;
		if(that.userInfo.usertype == -1){
			usertype = "sysadmin";
		}
		else if(that.userInfo.usertype == -2){
			usertype = "secadmin";
		}
		else {
			usertype = that.userInfo.usertype;
		}
		// 浏览器关闭事件
		window.onbeforeunload = function(e){

			var e= window.event ||e; //事件兼容写法

			pageStayTimeLoad.user_id = that.userInfo.guid;
			pageStayTimeLoad.user_code = that.userInfo.code;
			pageStayTimeLoad.user_name = that.userInfo.name;
			pageStayTimeLoad.province = that.userInfo.province;
			pageStayTimeLoad.usertype = usertype;
			pageStayTimeLoad.time = that.getCurrentDate();
			pageStayTimeLoad.time_= that.getDateTime();
			pageStayTimeLoad.tokenid = JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken"));
			// pageStayTimeLoad.appcode = that.userInfo.app.code;
			pageStayTimeLoad.appname = that.userInfo.app.name;
			pageStayTimeLoad.menuguid = that.bosspageconfig.menuguid;
			// pageStayTimeLoad.menuname = that.bosspageconfig.name;
			pageStayTimeLoad.roleguid = that.bosspageconfig.roleguid;
			pageStayTimeLoad.behavior_type = "page-time";
			pageStayTimeLoad.behavior_content={};
			// 当前界面地址
			pageStayTimeLoad.behavior_content.url = e.target.URL.split('?')[0];
			pageStayTimeLoad.behavior_content.value = "----";
			// 当前界面的名称
			pageStayTimeLoad.behavior_content.menuname = '';
			if(that.loadArray){
				// 通过角色id判断用户进入的事件
				$.each(that.loadArray,function(i,item){
					if(item.roleguid == pageStayTimeLoad.roleguid){
						if(item.behavior_type == "page-view"){
							//停留时间 = 当前关闭界面时间- 进入界面的时间
							pageStayTimeLoad.behavior_content.staytime =  (pageStayTimeLoad.time_ -  item.time_)*0.001;
						}
					}
					if(item.behavior_content.url == pageStayTimeLoad.behavior_content.url){
						if(item.behavior_type == "page-view"){
							//停留时间 = 当前关闭界面时间- 进入界面的时间
							pageStayTimeLoad.behavior_content.menuname =  item.behavior_content.menuname;

						}
					}
				})
			}
			// 判断当前数据是否有staytime，如果有，push，如果没有，直接发送
			if(!pageStayTimeLoad.behavior_content.staytime){
				that.sendOptions(that.collectDatas);//触发发送请求
			}else if(pageStayTimeLoad.behavior_content.menuname==""){
				that.sendOptions(that.collectDatas);//触发发送请求
			}else{
				that.collectDatas.push(pageStayTimeLoad)
				that.sendOptions(that.collectDatas);//触发发送请求
			}
		}
	},
	
	/* 监控ajax请求 */
	// monitorAjax: function(){
	//
	// 	var that = this;
	// 	$(document).ajaxComplete(function(event, request, settings) {
	// 		var ajaxDatas= {};
	// 		//过滤本次保存数据的请求
	// 		var num = settings.url.indexOf('?');
	// 		var url = "";
	// 		if(num>0){
	// 			url = settings.url.substring(0,num);
	// 		}else{
	// 			url = settings.url;
	// 		}
	// 		if(url == that.config.url) return;
	// 		//获取请求相关信息并向记录添加本条信息
	// 		ajaxDatas.user_id = that.userInfo.guid;
	// 		ajaxDatas.user_code = that.userInfo.code;
	// 		ajaxDatas.province = that.userInfo.province;
	// 		ajaxDatas.agency = that.userInfo.agency;
	// 		ajaxDatas.time = that.getCurrentDate();
    //   		ajaxDatas.time_= that.getDateTime();
	// 		ajaxDatas.tokenid = that.getUrlParam(window.location.search,'tokenid')
	// 		ajaxDatas.behavior_type = "ajax";
	// 		ajaxDatas.behavior_content= {};
	// 		ajaxDatas.behavior_content.url = settings.url;
	// 		that.collectDatas.push(ajaxDatas)
	// 		that.addRecord();
	// 	});
	// },

	/* 存储当前监控到的数据 */
	addRecord: function(){
		if(this.collectDatas.length == this.config.maxLength){
			var data = this.collectDatas.slice(0,this.config.maxLength);
			this.sendOptions(data);
			
		}
	},
	/* 保存数据 */
	sendOptions: function (datas) {
		var that = this;
    	// 判断datas是否为空，空就不发请求
		if(!datas){
			return false;
		}
    // if(process.env.NODE_ENV === 'development') return
		 $.ajax({
			url: `${window.location.origin}/${window.gloableToolFn.serverGatewayMap['production']['mp-d-aggregation-service']}/v1/collector/behavior?${new Date().getTime()}`,
			data:{
				tokenid: JSON.parse(localStorage.getItem("__boss_cache__bsSxczyAccessToken")),
        parameters: JSON.stringify({"data":datas})
			},
			method:'POST',
			async:true,
			dataType:'json',
			success:function(data){
				that.collectDatas=[]
			},
			error:function(data){
				if(that.ajaxCount==3){
					// 清空collectDatas
					that.collectDatas=[]
					return false;
				}
				that.ajaxCount++;
				that.sendOptions(that.collectDatas);
			}
		});
		
	},

	/* 获取url后面的参数 */
	getUrlParam: function(urlName,name) {
		var url = urlName || window.location.search
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = url.substring(url.indexOf("?") + 1, url.length).match(reg); //匹配目标参数
		if (r != null) return unescape(r[2]);
		return null; //返回参数值
	},

	/* 删除url参数后面的某个参数 */
	deleteUrlParam: function(paramKey) {
		var url = window.location.href;    //页面url
		var urlParam = window.location.search.substr(1);   //页面参数
		var beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
		var nextUrl = "";

		var arr = new Array();
		if (urlParam != "") {
			var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
			for (var i = 0; i < urlParamArr.length; i++) {
				var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
				//如果键与要删除的不一致，则加入到参数中
				if (paramArr[0] != paramKey) {
					arr.push(urlParamArr[i]);
				}
			}
		}
		if (arr.length > 0) {
			nextUrl = "?" + arr.join("&");
		}
		url = beforeUrl + nextUrl;
		return url;
	},
	// 时间戳  
	getDateTime :function(){
	return  new Date().getTime();
	},
	/* 获取当前时间的yyyy-mm-dd hh:mm:ss格式 */
	getCurrentDate: function () {
		var myDate = new Date();
		var year = myDate.getFullYear(); //获取当前年
		var mon = myDate.getMonth() + 1; //获取当前月
		var date = myDate.getDate(); //获取当前日
		var h = myDate.getHours();//获取当前小时数(0-23)
		var m = myDate.getMinutes();//获取当前分钟数(0-59)
		var s = myDate.getSeconds();//获取当前秒
		mon = this.addZeroToNum(mon);
		date = this.addZeroToNum(date);
		h = this.addZeroToNum(h);
		m = this.addZeroToNum(m);
		s = this.addZeroToNum(s);
		return year+"-"+mon+"-"+date+":"+h+":"+m+":"+s;
	},

	/* 数字小于10时在前面补0 */
	addZeroToNum: function(n){
		if(n<10){
			return "0"+n;
		}else{
			return n;
		}
	},
};


/* 开始监控用户行为 */
userBehaviorMonitor.init({
	config: {url:""},
	defaultOptions: {}
});



