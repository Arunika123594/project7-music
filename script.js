const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const trackTitle = document.getElementById("track-title");
const playlist = document.getElementById("playlist").children;

const tracks = [
  { title: "Track 1", src: "music/track1.mp3" },
  { title: "Track 2", src: "music/track2.mp3" },
  { title: "Track 3", src: "music/track3.mp3" }
];

let currentTrack = 0;

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackTitle.textContent = tracks[index].title;
  highlightTrack(index);
}

function highlightTrack(index) {
  for (let i = 0; i < playlist.length; i++) {
    playlist[i].style.fontWeight = i === index ? "bold" : "normal";
  }
}

function playTrack() {
  audio.play();
  playBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
}

function pauseTrack() {
  audio.pause();
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
}

playBtn.addEventListener("click", playTrack);
pauseBtn.addEventListener("click", pauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Click playlist item to play
Array.from(playlist).forEach((item, index) => {
  item.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(index);
    playTrack();
  });
});

// Auto-play next track on end
audio.addEventListener("ended", nextTrack);

// Load initial track
loadTrack(currentTrack);
