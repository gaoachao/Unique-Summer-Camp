# Music Player

## 功能实现

### 基本功能

- [x] 显示当前的进度，目前播放的时间。
- [x] 播放时，歌曲封面图旋转，而暂停播放时不旋转。
- [x] 拖动进度条，歌词会发生相应的变化。（歌词发生相应的变化是否包括滚动条？）
- [ ] 点击歌词，歌曲会跳转至响应的位置。
- [x] 突出显示当前播放的歌词。

### 选做功能

- [ ] 夜间模式。
- [x] 歌曲下载到本地。

### 要求

- [x] 使用ES6语法
- [ ] 不把歌词写死在HTML中（不是很确定使用.lrc算不算完成要求）

### 闲着没事做的功能

- [x] 上一首、下一首切换。
- [x] 随机播放。

## 项目说明

- 做了PC端适配，所有长度和宽度单位均采用`vh`和`vw`。
- 没有做移动端适配。
- 没有很好的处理有关IE的兼容性问题。
- 歌词发生相应的变化是否包括滚动条。

## 遇到的坑

### audio标签无法自动播放

> Error: Uncaught (in promise) : DOMException: play() failed because the user didn't interact with the document first in console

**解决方案：**

封装一个函数`trackInit()`展示首页的歌曲的信息，然后执行`window.onload = trackInit();`

### audio.duration返回NAN

在`trackInit()`函数中`audio.duration`返回NAN，原因是此时`audio`标签尚未加载完毕。

**解决方案：**

调用`audio`标签内置方法`onloadeddata`

```
currentTrack.onloadeddata = function(){
	let audDuration = currentTrack.duration;
	console.log(audDuration);  //It works!
}
```

