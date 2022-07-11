# Music Player

## 功能实现

### 基本功能

- [x] 显示当前的进度，目前播放的时间。
- [x] 播放时，歌曲封面图旋转，而暂停播放时不旋转。
- [ ] 拖动进度条，歌词会发生相应的变化。
- [ ] 突出显示当前播放的歌词。

### 选做功能

- [ ] 夜间模式。
- [ ] 歌曲下载到本地。

### 闲着没事做的功能

- [x] 上一首、下一首切换。
- [x] 随机播放。
- [x] 重新播放。

## 遇到的坑

### audio标签无法自动播放

> `error: Uncaught (in promise) : DOMException: play() failed because the user didn't interact with the document first in console`

**解决方案：**

封装一个函数`trackInit()`展示首页的歌曲的信息，然后执行`window.onload = trackInit();`

### audio.duration返回NAN

在`trackInit`函数中`audio.duration`返回NAN，原因应该是此时`audio`标签尚未加载完毕。

**解决方案：**

调用`audio`标签内置方法`onloadeddata`

```
currentTrack.onloadeddata = function(){
	let audDuration = currentTrack.duration;
	console.log(audDuration);  //It works!
}
```

