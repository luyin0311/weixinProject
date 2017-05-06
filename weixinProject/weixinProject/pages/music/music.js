// pages/music/music.js
var n=0;
var per = 0;
var currentTime=0;
var totalTime=0;
var currentTime1='00';//当前分
var currentTime2='00';//当前秒
var totalTime1='00';//总分
var totalTime2='00';//总秒
function parseLyric(lrc) {
	    var lyrics = lrc.split("\n");
	    var lrcObj = {};
	    for(var i=0;i<lyrics.length;i++){
	        var lyric = decodeURIComponent(lyrics[i]);
	        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
	        var timeRegExpArr = lyric.match(timeReg);
	        if(!timeRegExpArr)continue;
	        var clause = lyric.replace(timeReg,'');
	        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
	            var t = timeRegExpArr[k];
	            var min = Number(String(t.match(/\[\d*/i)).slice(1)), sec = Number(String(t.match(/\:\d*/i)).slice(1));
	            var time = min * 60 + sec;
	            lrcObj[time] = clause;
	        }
	    }
	    return lrcObj;
	}

var musicLrc = {};
Page({
  data:{
   music: {
        id:0,
        percent:0,poster:'http://www.chinavane.online/music/1.jpg',
        name:'暧昧',
        author:'薛之谦',
        src:'http://www.chinavane.online/music/1.mp3'
      },
    lrc:`[ti:暧昧]
[ar:薛之谦]
[al:]
[by:文超]
匹配时间为: 05 分 12 秒 的歌曲
[00:00.00]暧昧 - 薛之谦
[00:00.76]
[00:01.79]作词：薛之谦
[00:03.00]作曲：薛之谦
[00:04.25]制作人：郑伟
[00:05.50]编曲：薛之谦 郑伟
[00:06.83]混音：郑伟
[00:08.04]歌词编辑：文超
[00:09.34]QQ：835572916
[00:10.72]我爱歌词网www.5ilrc.com
[00:12.12]
[00:15.70]反正现在的感情 都暧昧
[00:20.34]你大可不必为难 找般配
[00:24.95]付出过的人排队 谈体会
[00:29.54]趁年轻别害怕一个人睡
[00:34.77]可能是现在感情 太昂贵
[00:39.42]让付出真心的人 好狼狈
[00:44.15]还不如听首情歌 的机会 忘了谁
[00:53.88]
[00:55.65]感情像牛奶一杯 越甜越让人生畏
[01:04.97]都早有些防备 润色前的原味
[01:14.26]所以人们都拿起咖啡 把试探放在两人位
[01:24.29]距离感一对 就不必再赤裸相对
[01:30.65]
[01:32.49]反正现在的感情 都暧昧
[01:37.22]你大可不必为难 找般配
[01:41.91]付出过的人排队 谈体会
[01:46.40]弃之可惜 食而无味
[01:51.76]可能是现在感情 太珍贵
[01:56.28]让付出真心的人 好疲惫
[02:01.02]谁不曾用过卑微的词汇 想留住谁
[02:20.51]
[02:50.55]还贪恋着衣衫昂贵 却输给了廉价香水
[03:00.10]他先诱你入位 还刻意放低了分贝
[03:09.72]可感情越爱越妩媚 像烂掉的苹果一堆
[03:19.43]连基因都不对 还在意什么鱼腥味
[03:26.65]
[03:27.73]反正现在的感情 都暧昧
[03:32.23]你大可不必为难 找般配
[03:36.98]何必给自己沉迷 的机会
[03:41.58]不如用误会来结尾
[03:46.40]
[03:46.62]反正现在的我们 算暧昧
[03:51.48]我愿意给的感情 请浪费
[03:56.20]反正流过的眼泪 难收回
[04:01.07]就别再安慰
[04:05.43]
[04:06.18]看你入眠的侧脸 有多美
[04:11.32]和你丢下的一切 好匹配
[04:17.05]我还以为我能 多狼狈
[04:23.84]我自以为
[04:30.48]
[04:40.24]`,  
    scrollHeight:0,
    musicList:[],
    musicText:'',
    paltBtn:'../../public/image/icon/pause.png',
    currentTime1:'00',
    currentTime2:'00',
    totalTime1:'00',
    totalTime2:'00'

  },
  onLoad:function(options){
    var that=this;
    wx.request({
      url: 'http://www.luyin.tech/music.php', 
      dataType:'json',
      success: function(res) {
        console.log(res)
       that.setData({
         musicList:res.data
       })
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 200
        })
      }
    });
    musicLrc = parseLyric(that.data.lrc)
  },
  onReady:function(){   
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  //播放和暂停
  palymusic:function(){
    switch(n)
    {
        case 0:
            this.setData({
            paltBtn:'../../public/image/icon/paly.png'
            });
            this.audioCtx.play();
              n=1;
            break;
        case 1:
            this.setData({
          paltBtn:'../../public/image/icon/pause.png'
            });
            this.audioCtx.pause();
            n=0;
            break;
    }
  },
  //切换音乐
  switchmusic:function(event){
    var index=event.target.dataset.index;
    var idx=index+1;
    var that=this;
    wx.request({
      url: 'http://www.luyin.tech/lrc/'+idx+'.lrc',
      data: {},
      method: 'GET', 
      success: function(res){
        that.setData({
          lrc:res.data
        });
        musicLrc = parseLyric(that.data.lrc)
      }
    })


    this.setData({
      music: this.data.musicList[index],
      paltBtn:'../../public/image/icon/paly.png'
    });
    n=1;
    setTimeout(function(){
       that.audioCtx.play();
    },500)
  },
  //播放结束 切换歌曲
  endedHandle:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id;
    }

    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)

  },
  //进度条
  pro:function(event){
    console.log(event.detail)
    var second = parseInt(event.detail.currentTime);
    var that = this;
    per = event.detail.currentTime / event.detail.duration;
    currentTime=parseInt(event.detail.currentTime);
    totalTime=parseInt(event.detail.duration);
    currentTime1='00';//当前分
    currentTime2='00';//当前秒
    totalTime1='00';//总分
    totalTime2='00';//总秒
    if(currentTime>59){
        currentTime1 = parseInt(currentTime/60); 
        currentTime2 = parseInt(currentTime%60);
        if(currentTime2<10){
          currentTime2="0"+currentTime2;
        } 
    }else{
        currentTime2 = parseInt(currentTime%60);
        if(currentTime2<10){
          currentTime2="0"+currentTime2;
        }
    }
    if(totalTime>59){
        totalTime1 = parseInt(totalTime/60); 
        totalTime2 = parseInt(totalTime%60); 
    }
    that.setData({
      percent:parseInt(per*100),
      currentTime1:currentTime1,
      currentTime2:currentTime2,
      totalTime1:totalTime1,
      totalTime2:totalTime2,
      musicText: musicLrc[second]
    })
  },




  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})