// SONG DATA

const songs = [
{
    title: "Believer",
    artist: "Imagine Dragons",
    img: "assets/images/believer.jpg",
    src: "assets/music/believer.mp3"
},
{
    title: "Shape of You",
    artist: "Ed Sheeran",
    img: "assets/images/shape.jpg",
    src: "assets/music/shape.mp3"
}
];

// RENDER SONGS

const songList = document.getElementById("songList");

songs.forEach((song, index) => {

    songList.innerHTML += `
        <div class="card" onclick="playSong(${index})">
            <img src="${song.img}" alt="${song.title}">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `;
});

// AUDIO PLAYER

const audio = new Audio();
let currentIndex = 0;

function playSong(index){

    currentIndex = index;

    audio.src = songs[index].src;
    audio.play();

    document.getElementById("currentTitle").innerText =
        songs[index].title;

    document.getElementById("currentArtist").innerText =
        songs[index].artist;
}

// PLAY / PAUSE

const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {

    if(audio.paused){
        audio.play();
        playBtn.innerHTML = "⏸";
    }else{
        audio.pause();
        playBtn.innerHTML = "▶";
    }

});

// NEXT

function nextSong(){

    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);

}

// PREVIOUS

function prevSong(){

    currentIndex =
        (currentIndex - 1 + songs.length) % songs.length;

    playSong(currentIndex);

}

// PROGRESS BAR

const progress = document.getElementById("progress");

audio.addEventListener("timeupdate", () => {

    progress.value =
        (audio.currentTime / audio.duration) * 100;

});

progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});

// VOLUME CONTROL

const volume = document.getElementById("volume");

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});