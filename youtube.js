let player;

document.getElementById("submitFormData").addEventListener("click", function() {
    const url = document.getElementById("video").value;
    const audioOnly = document.getElementById("audioOnly").checked;
    if (url) {
        let embedUrl = "";
        // Tenter d'extraire la playlist, sauf si 'start_radio=1' est présent
        const playlistID = extractPlaylistID(url);
        if (playlistID) {
            // Cas d'une playlist classique
            embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistID}&enablejsapi=1&autoplay=1` +
                (audioOnly ? "&controls=0&showinfo=0&rel=0&modestbranding=1" : "");
        } else {
            // Utiliser l'ID de la vidéo pour les liens radio ou vidéo simples
            const videoID = extractVideoID(url);
            if (videoID) {
                embedUrl = `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1` +
                    (audioOnly ? "&controls=0&showinfo=0&rel=0&modestbranding=1" : "");
            }
        }
        
        if (embedUrl) {
            console.log("Embed URL :", embedUrl); // Pour vérifier dans la console
            // Définir une hauteur minimale même en mode audio si nécessaire
            const height = (audioOnly && !playlistID) ? '0' : '150';
            document.getElementById("results").innerHTML = 
                `<iframe id="ytPlayer" width="300" height="${height}" 
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

function extractPlaylistID(url) {
    // Si le lien contient 'start_radio=1', on ignore la playlist
    if (url.includes("start_radio=1")) return null;
    const regex = /[?&]list=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


// Bouton Suivant : passe à la vidéo suivante dans la playlist
document.getElementById("nextBtn").addEventListener("click", function() {
  if (player) {
    player.contentWindow.postMessage('{"event":"command","func":"nextVideo","args":""}', '*');
  }
});

// Bouton Précédent : revient à la vidéo précédente dans la playlist
document.getElementById("prevBtn").addEventListener("click", function() {
  if (player) {
    player.contentWindow.postMessage('{"event":"command","func":"previousVideo","args":""}', '*');
  }
});
