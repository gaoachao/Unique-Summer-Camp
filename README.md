# Music Player

## 功能实现

### 基本功能

- [x] 显示当前的进度，目前播放的时间。
- [x] 播放时，歌曲封面图旋转，而暂停播放时不旋转。
- [x] 拖动进度条，歌词会发生相应的变化。（歌词发生相应的变化是否包括滚动条？）
- [x] 点击歌词，歌曲会跳转至响应的位置。
- [x] 突出显示当前播放的歌词。

### 选做功能

- [x] 夜间模式。
- [x] 歌曲下载到本地。

### 要求

- [x] 使用ES6语法
- [ ] 不把歌词写死在HTML中（不是很确定使用.lrc文件算不算完成要求）

### 闲着没事做的功能

- [x] 上一首、下一首切换。
- [x] 随机播放。
- [x] 破产版移动端适配。

## 项目说明

- 做了PC端适配，所有长度和宽度单位均采用`vh`和`vw`。
- 移动端适配说明：砍去了夜间模式和歌词显示，是破产版的移动端适配。
- 没有很好的处理有关IE的兼容性问题。
- 突出显示当前播放的歌词说明：切换歌词时，会自动跳转到当前歌词所在位置。

## 遇到的坑

### 一、audio标签无法自动播放

> Error: Uncaught (in promise) : DOMException: play() failed because the user didn't interact with the document first in console点击

**解决方案：**

封装一个函数`trackInit()`展示首页的歌曲的信息，然后执行`window.onload = trackInit();`

### 二、audio.duration返回NAN

在`trackInit()`函数中`audio.duration`返回NAN，原因是此时`audio`标签尚未加载完毕。

**解决方案：**

调用`audio`标签内置方法`onloadeddata`

```
currentTrack.onloadeddata = function(){
	let audDuration = currentTrack.duration;
	console.log(audDuration);  //It works!
}
```

### 歌曲封面图在旋转时阴影也跟着旋转

**解决方案：**

在`track-art`的盒子外面再套一个盒子`track-art-wrapper`，把阴影加到外侧盒子上，然后旋转的动画加到`track-art`上。

### 三、部分歌词点击后currentTime失效

**原因：**

在处理`lyric`的时间时为保证精度没有采取保留位数，导致在修改`currentTime`的时候赋值出现问题

**解决方案：**

需要向上取整，便于读取当前歌词，然后修改样式。

```
currentTrack.currentTime = Math.ceil(lyric[i][0]*100)/100;
```

### 四、点击歌词修改currentTime中的异步任务

> Uncaught TypeError: Cannot read properties of null (reading 'classList')
>
> Uncaught TypeError: Cannot read properties of undefined (reading 'length')

因为获取事件的时候发出了一次AJAX请求，这次请求是异步的，会在同步任务执行完毕后再去执行，于是在给歌词的DOM元素添加监听器的时候读取`lyric.length`会出现错误。

**解决方案：**（说实话感觉很蠢）

开定时器，设置100ms，让AJAX请求先运行，读取`lyric.length`。

也就是在`script.js`最后的那个定时器。
