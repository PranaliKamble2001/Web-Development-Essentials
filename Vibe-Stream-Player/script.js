const audio = new Audio();
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('play-icon');
const progress = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const vinyl = document.getElementById('vinyl');
const bgGlow = document.getElementById('bg-glow');

let isPlaying = false;
let trackIndex = 0;

const tracks = [
    { 
        title: "Neon Horizon", 
        artist: "Digital Architect", 
        file: "assets/song1.mp3", 
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500",
        color: "#bc13fe" 
    },
    { 
        title: "Saffron Beats", 
        artist: "PK | Studio", 
        file: "assets/song2.mp3", 
        cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500",
        color: "#ff9933" 
    }
];

function loadTrack(index) {
    const track = tracks[index];
    document.getElementById('title').innerText = track.title;
    document.getElementById('artist').innerText = track.artist;
    document.getElementById('cover').src = track.cover;
    audio.src = track.file;
    
    // Update Dynamic Theme
    document.documentElement.style.setProperty('--accent', track.color);
    bgGlow.style.background = `radial-gradient(circle, ${track.color} 0%, transparent 70%)`;
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playIcon.innerText = "PLAY";
        vinyl.classList.remove('playing');
    } else {
        audio.play().catch(() => alert("Please add MP3 files to your assets folder!"));
        playIcon.innerText = "PAUSE";
        vinyl.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Synchronization Logic
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.value = percentage;
        progressFill.style.width = percentage + "%";

        // Formatted Time Logic
        const formatTime = (time) => Math.floor(time / 60) + ":" + Math.floor(time % 60).toString().padStart(2, '0');
        document.getElementById('current-time').innerText = formatTime(audio.currentTime);
        document.getElementById('duration').innerText = formatTime(audio.duration);
    }
});

progress.addEventListener('input', () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Controls
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

// Auto-play next track
audio.addEventListener('ended', () => {
    document.getElementById('next').click();
});

// Initial Setup
loadTrack(trackIndex);
