var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    region: ['广东省', '珠海市', '香洲区'],
    dayWidth: '',
    canvasWidth: '',
    canvasHeigth: '200px',
    currentCity: '',
    latitude: 0,
    longitude: 0,
    weatherInfo: [
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '32',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '34',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '32',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '33',
      //   temperatureN: '28'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '33',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '35',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '30',
      //   temperatureN: '28'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '34',
      //   temperatureN: '28'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '33',
      //   temperatureN: '27'
      // },
      // {
      //   day: '昨天',
      //   date: '07/26',
      //   regimeTop: '晴',
      //   imgTop: '../../sun.png',
      //   imgBottom: '../../sun.png',
      //   regimeBottom: '晴',
      //   wind: '西北风',
      //   windLevel: '2级',
      //   grade: '优',
      //   temperatureM: '32',
      //   temperatureN: '27'
      // }
    ],
    qqmapsdk: {}
  },
  onLoad: function () {
    var that = this
    // 实例化API核心类
    this.data.qqmapsdk = new QQMapWX({
      key: 'VQGBZ-URMWD-34P4L-PZHIF-JXFWE-EHB6U'
    })

    that.setData({
      qqmapsdk: this.data.qqmapsdk
    })
    // 微信获取经纬度
    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        // 腾讯获取地址
        that.gteLocation()

        // 百度获取五天天气
        that.getWeather(function () {
          that.drawChart()
        })
      }
    })
  },
  // 百度获取天气
  getWeather: function (successCallback) {
    var that = this
    wx.request({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + that.data.longitude + ',' + that.data.latitude + '&output=json&ak=3bXQlWZXkGZDUtjGDQvIjwcThi6ZbIWa',
      success: function (res) {
        var weather_data = res.data.results[0].weather_data
        console.log(res)
        for (var i = 0; i < weather_data.length; i++) {
          var temperatureList = (weather_data[i].temperature).split('~');
          var minTem = (temperatureList[1].split("℃").join("")).split(" ").join("")
          var maxTem = temperatureList[0].split(" ").join("")
          if (i == 0) {
            var day = '今天'
            // var date = weather_data[i].date.split(' ')[1]
          } else {
            var day = weather_data[i].date.substring(0, 2)
          }
          var item = {
            day: day,
            date: '',
            regimeTop: weather_data[i].weather,
            imgTop: weather_data[i].dayPictureUrl,
            imgBottom: weather_data[i].nightPictureUrl,
            regimeBottom: weather_data[i].weather,
            wind: weather_data[i].wind,
            windLevel: '',
            grade: '',
            temperatureM: maxTem,
            temperatureN: minTem
          }
          that.data.weatherInfo.push(item)
          that.setData({
            weatherInfo: that.data.weatherInfo
          })
        }
        typeof successCallback === 'function' && successCallback()
      }
    })
  },
  // 腾讯获取地址
  gteLocation: function () {
    var that = this
    this.data.qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function (res) {
        var address = res.result.address_component
        that.data.region = [address.province, address.city, address.district]
        that.data.currentCity = that.data.region[1]
        that.setData({
          region: that.data.region,
          currentCity: that.data.currentCity
        })
      },
      fail: function () {
        wx.showToast({
          title: '获取位置失败，请选择你的位置',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },

  //画温度折线图
  drawChart: function () {
    //获取温度数组
    var temperatureMArray = []//白天温度数组
    var temperatureNArray = []//夜晚温度数组
    this.data.weatherInfo.forEach(function (item, index) {
      temperatureMArray.push(item.temperatureM)
      temperatureNArray.push(item.temperatureN)
    })
    //合并白天和夜晚的温度
    var alltemperatureMArray = temperatureNArray.concat(temperatureMArray)
    // 将每项都变成整形
    for (var i = 0; i < alltemperatureMArray.length; i++) {
      alltemperatureMArray[i] = parseInt(alltemperatureMArray[i])
    }
    //获取最小的温度
    var minTemperature = alltemperatureMArray[0]
    for (var i = 1; i < alltemperatureMArray.length; i++) {
      if (alltemperatureMArray[i] < minTemperature) {
        minTemperature = alltemperatureMArray[i]
      }
    }
    //获取最大的温度
    var maxTemperature = alltemperatureMArray[0]
    for (var i = 1; i < alltemperatureMArray.length; i++) {
      if (alltemperatureMArray[i] > maxTemperature) {
        maxTemperature = alltemperatureMArray[i]
      }
    }
    //获取每天的块
    var dayWidth = (wx.getSystemInfoSync().screenWidth) / 4
    //设置画布大小
    var canvasWidth = Math.floor(dayWidth * (this.data.weatherInfo.length + 1))
    this.setData({
      dayWidth: dayWidth + 'px',
      canvasWidth: canvasWidth + 'px'
    })
    //Y轴总高度
    var heightTotal = 50
    //Y轴平均分块
    var height = Math.floor(heightTotal / (maxTemperature - minTemperature))
    //白天温度点
    var optionXY = new Array()
    temperatureMArray.forEach(function (item, index) {
      optionXY.push(
        {
          x: (parseInt(dayWidth) * (index + 1)) - 30,
          y: (50 - ((item - minTemperature) * height)) + 50
        }
      )
    })
    //夜晚温度点
    var optionXYN = new Array()
    temperatureNArray.forEach(function (item, index) {
      optionXYN.push(
        {
          x: (parseInt(dayWidth) * (index + 1)) - 30,
          y: (50 - ((item - minTemperature) * height)) + 100
        }
      )
    })
    //创建 canvas 绘图上下文
    var context = wx.createCanvasContext('temperatureCanvas')
    // 设置描边颜色
    context.setStrokeStyle("#7cb5ec")
    // 设置线宽
    context.setLineWidth(2)
    context.beginPath()
    optionXY.forEach(function (item, index) {
      if (i = 0) {
        context.moveTo(item.x, item.y)
      } else {
        context.lineTo(item.x, item.y)
      }
    })
    //画出当前路径的边框
    context.stroke()
    context.beginPath()
    // 设置填充颜色
    context.setFillStyle("#000000");
    // 设置描边颜色
    context.setStrokeStyle("#7cb5ec")
    // 设置线宽
    context.setLineWidth(1)
    optionXY.forEach(function (item, index) {
      context.moveTo(item.x, item.y, );
      context.arc(item.x, item.y, 2, 0, 2 * Math.PI)
    })
    //填充
    context.fill()
    context.stroke()
    //==================温度标识===========================
    context.beginPath();
    // 设置字体大小
    context.setFontSize(10);
    // 设置字体填充颜色
    context.setFillStyle('#666666');
    var weather = this.data.weatherInfo
    optionXY.forEach(function (item, index) {
      context.fillText(weather[index].temperatureM + '℃', item.x - 10, item.y - 8, );
    });
    context.stroke()

    //============================第二条的=====================

    // 设置描边颜色
    context.setStrokeStyle("#FF8247")
    // 设置线宽
    context.setLineWidth(2)
    context.beginPath()
    optionXYN.forEach(function (item, index) {
      if (i = 0) {
        context.moveTo(item.x, item.y)
      } else {
        context.lineTo(item.x, item.y)
      }
    })
    //画出当前路径的边框
    context.stroke()
    context.beginPath()
    // 设置填充颜色
    context.setFillStyle("#000000");
    // 设置描边颜色
    context.setStrokeStyle("#FF8247")
    // 设置线宽
    context.setLineWidth(1)
    optionXYN.forEach(function (item, index) {
      context.moveTo(item.x, item.y, );
      context.arc(item.x, item.y, 2, 0, 2 * Math.PI)
    })
    //填充
    context.fill()
    context.stroke()
    //==================温度标识===========================
    context.beginPath();
    // 设置字体大小
    context.setFontSize(10);
    // 设置字体填充颜色
    context.setFillStyle('#666666');
    var weather = this.data.weatherInfo
    optionXYN.forEach(function (item, index) {
      context.fillText(weather[index].temperatureN + '℃', item.x - 10, item.y - 8, );
    });
    context.stroke()
    context.draw()
  },
  // 选择地址
  bindRegionChange: function (e) {
    var addressStr = e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    this.getCoordinate(addressStr)
    this.setData({
      currentCity: e.detail.value[1],
    })
  },
  //腾讯地图解析地址
  getCoordinate: function (addressStr) {
    var that = this
    this.data.qqmapsdk.geocoder({
      address: addressStr,
      success: function (res) {
        that.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          weatherInfo: []
        })
        that.getWeather(function () {
          that.drawChart()
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取地址错误',
        })
      }
    })
  }
 })