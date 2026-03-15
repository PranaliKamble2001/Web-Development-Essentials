const audio = new Audio();
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const vinyl = document.getElementById('vinyl');

let isPlaying = false;
let trackIndex = 0;

// Update these paths to match your local files in /assets
const tracks = [
    { 
        title: "Neon Horizon", 
        artist: "Digital Architect", 
        file: "assets/song1.mp3", 
        color: "#bc13fe" 
    },
    { 
        title: "Saffron Beats", 
        artist: "PK | Studio", 
        file: "assets/song2.mp3", 
        color: "#ff9933" 
    }
];

function loadTrack(index) {
    const track = tracks[index];
    document.getElementById('title').innerText = track.title;
    document.getElementById('artist').innerText = track.artist;
    audio.src = track.file;
    document.documentElement.style.setProperty('--accent', track.color);
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerText = "PLAY";
        vinyl.classList.remove('playing');
    } else {
        // Handle play promise for browser security
        audio.play().catch(() => console.log("Check assets/ folder for mp3 files."));
        playBtn.innerText = "PAUSE";
        vinyl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Time/Progress Synchronization
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.value = percentage;

        // Update Time Displays
        const curM = Math.floor(audio.currentTime / 60);
        const curS = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        document.getElementById('current-time').innerText = `${curM}:${curS}`;
        
        const durM = Math.floor(audio.duration / 60);
        const durS = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        document.getElementById('duration').innerText = `${durM}:${durS}`;
    }
});

// Seek Logic
progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

playBtn.addEventListener('click', togglePlay);

document.getElementById('next').addEventListener('click', () => {
    trackIndex = (trackIndex + 1) % tracks.length;
    loadTrack(trackIndex);
    if(isPlaying) audio.play();
});

document.getElementById('prev').addEventListener('click', () => {
    trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(trackIndex);
    if(isPlaying) audio.play();
});

// Initial Setup
loadTrack(trackIndex);
