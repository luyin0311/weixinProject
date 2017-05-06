// pages/movie/movie.js
Page({
  data: {
    imgUrls: [
      'http://www.luyin.tech/image/4.jpg',
      'http://www.luyin.tech/image/5.jpg',
      'http://www.luyin.tech/image/6.jpg'
    ]
  },
  onLoad:function(){
    wx.request({
      url: 'http://api.douban.com/v2/movie/top250',
      data: {},
      method: 'GET', 
      success: function(res){
        console.log('电影',res)
      }
    })
  }
})