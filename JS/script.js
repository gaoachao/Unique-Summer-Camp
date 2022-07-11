let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playPauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');
let randomBtn = document.querySelector('.random-track');
let repeatBtn = document.querySelector('.repeat-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let currentTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

//歌曲列表
const musicList = [{
	img:'images/bitter-gourd.jpg',
	name:'Bitter Gourd',
	artist:'Eason Chan',
	music:'music/bitter-gourd.mp3'
},
{
	img:'images/grape.jpg',
	name:'Ripe Grapes',
	artist:'Eason Chan',
	music:'music/grape.mp3'
},
{
	img:'images/over.jpg',
	name:'Over',
	artist:'Eason Chan',
	music:'music/over.mp3'
}
]

//播放功能
function reset(){
	currentTime.textContent = "00:00";
	seekSlider.value = 0;
}

function loadTrack(trackIndex){
	clearInterval(updateTimer);
	reset();
	currentTrack.src =  musicList[trackIndex].music;
	currentTrack.preload="metadata";
	currentTrack.play();

	trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
	trackName.textContent = musicList[trackIndex].name;
	trackArtist.textContent = musicList[trackIndex].artist;
	nowPlaying.textContent = "Playing music     " + (trackIndex + 1) + "     of     " + musicList.length;

	updateTimer = setInterval(setUpdate,800);
}


/*   针对audio标签不能进入页面自动播放：window.onload = window.onload = trackInit();
*    报错信息：Uncaught (in promise) : DOMException: play() failed 
*            because the user didn't interact with the document first in console
*		 通俗地讲：我们需要做些什么让audio标签播放
*/
function trackInit(){
	currentTrack.src =  musicList[trackIndex].music;
	trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
	trackName.textContent = musicList[trackIndex].name;
	trackArtist.textContent = musicList[trackIndex].artist;
	nowPlaying.textContent = "Playing music     " + (trackIndex + 1) + "     of     " + musicList.length;
	updateTimer = setInterval(setUpdate,800);

}
window.onload = trackInit();


//针对currentTrack.duration返回NAN的解决思路
currentTrack.onloadeddata = function(){
	let durationMinutes = Math.floor(currentTrack.duration / 60);
	let durationSections = Math.floor(currentTrack.duration - durationMinutes*60);
	if(durationSections < 10) {
		durationSections = "0" + durationSections;
	}
	if(durationMinutes < 10) {
		durationMinutes = "0" + durationMinutes;
	}
	totalDuration.textContent = durationMinutes + ":" + durationSections;
}

//进度条和歌曲已播放时间
function setUpdate(){
		let seekPosition = 0;
		seekPosition = currentTrack.currentTime / currentTrack.duration *100 ;
		seekSlider.value = seekPosition;

		let currentMinutes = Math.floor(currentTrack.currentTime / 60);
		let currentSections = Math.floor(currentTrack.currentTime - currentMinutes * 60);
		
		if(currentSections < 10){
			currentSections = "0" + currentSections;
		}
		if(currentMinutes < 10) {
			currentMinutes = "0" + currentMinutes;
		}
		currentTime.textContent = currentMinutes + ":" + currentSections;
}




//随机播放的功能开关
function randomTrack(){
	isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
	isRandom = true;
	randomBtn.classList.add('randomActive');
}

function pauseRandom(){
	isRandom = false;
	randomBtn.classList.remove('randomActive');
}

//重新播放功能
function repeatTrack(){
	let currentIndex = trackIndex;
	loadTrack(currentIndex);
	playTrack();
}

//暂停播放功能
function playpauseTrack(){
	isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
	currentTrack.play();
	isPlaying = true;

	trackArt.classList.add('rotate');
	playPauseBtn.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>'
}

function pauseTrack(){
	currentTrack.pause();
	isPlaying = false;
	trackArt.classList.remove('rotate');
	playPauseBtn.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>'
}

//随机播放功能
function nextTrack(){
	if(trackIndex < musicList.length -1 && isRandom === false){
		trackIndex ++;
	}else if(trackIndex < musicList.length -1 && isRandom === true){
		let randomIndex = Number.parseInt(Math.random() * musicList.length);
		if(randomIndex === trackIndex){
			nextTrack();
		}else{
		trackIndex = randomIndex;
		}
	}else {
		trackIndex = 0;
	}
	loadTrack(trackIndex);
	playTrack();
}

//上一首
function prevTrack(){
	if(trackIndex > 0){
		trackIndex -= 1;
	} else {
		trackIndex = musicList.length -1;
	}
	loadTrack(trackIndex);
	playTrack();
}


//滑动歌曲进度
function seekTo(){
	let seekto = currentTrack.duration * (seekSlider.value / 100);
	currentTrack.currentTime = seekto;
}

//设置歌曲音量
function setVolume(){
	currentTrack.volume = volumeSlider.value /100;
}

console.log(currentTrack.currentTime);

playPauseBtn.addEventListener('click',playpauseTrack);
nextBtn.addEventListener('click',nextTrack);
prevBtn.addEventListener('click',prevTrack);
randomBtn.addEventListener('click',randomTrack);
repeatBtn.addEventListener('click',repeatTrack);

seekSlider.addEventListener('change',seekTo)
volumeSlider.addEventListener('change',setVolume)

