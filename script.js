let player;
const playerContainer = document.getElementById("playerContainer");

let isDragging = false;
let offsetX, offsetY;

playerContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - playerContainer.offsetLeft;
    offsetY = e.clientY - playerContainer.offsetTop;
    playerContainer.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        playerContainer.style.left = `${e.clientX - offsetX}px`;
        playerContainer.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    playerContainer.style.cursor = "grab";
});

document.getElementById("submitFormData").addEventListener("click", function() {
    const videoUrl = document.getElementById("video").value;
    const audioOnly = document.getElementById("audioOnly").checked;
    if (videoUrl) {
        const videoID = extractVideoID(videoUrl);
        if (videoID) {
            const embedUrl = `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1` +
                (audioOnly ? "&controls=0&showinfo=0&rel=0&modestbranding=1" : "");
            document.getElementById("results").innerHTML = 
                `<iframe id="ytPlayer" width="300" height="${audioOnly ? '0' : '150'}" 
                src="${embedUrl}" frameborder="0" allow="autoplay"></iframe>`;
            
            setTimeout(() => {
                player = document.getElementById("ytPlayer");
            }, 1000);
        }
    }
});

function extractVideoID(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

document.getElementById("pauseBtn").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
});

document.getElementById("resumeBtn").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
});

document.getElementById("stopBtn").addEventListener("click", function() {
    if (player) {
        document.getElementById("results").innerHTML = "";
        player = null;
    }
});

document.getElementById("volumeUp").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
    }
});

document.getElementById("volumeDown").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
    }
});

document.getElementById("resetVolume").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[50]}', '*');
    }
});

document.getElementById("speedUp").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[2.0]}', '*');
    }
});

document.getElementById("speedDown").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[0.5]}', '*');
    }
});

document.getElementById("resetSpeed").addEventListener("click", function() {
    if (player) {
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[1.0]}', '*');
    }
});
