// pages/movie/movie.js
Page({
  data: {
    imgUrls: [
      'http://www.luyin.tech/image/4.jpg',
      'http://www.luyin.tech/image/5.jpg',
      'http://www.luyin.tech/image/6.jpg'
    ],
    movieList:[],
    scrollHeight:0
  },
  onLoad:function(){
    var that=this;
    wx.request({
      url: 'http://www.maodan.online/php/movie.php',
      data: {},
      method: 'GET', 
      success: function(res){
        console.log('电影',res);
        that.setData({
          movieList:res.data
        })
      }
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 100
        })
      }
    })
  },
  showDetail:function(event){
    var id = event.currentTarget.id;
    var actor=event.currentTarget.dataset.actor;
    var name=event.currentTarget.dataset.name;
    var detailintro=event.currentTarget.dataset.detailintro;
    var src=event.currentTarget.dataset.src;
    console.log(event);
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id='+ id+'&actor='+actor+'&name='+name+'&detailintro='+detailintro+'&src='+src,
    })
  },
})