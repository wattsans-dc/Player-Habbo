let player;

document.getElementById("submitFormData").addEventListener("click", function() {
    const url = document.getElementById("video").value;
    const audioOnly = document.getElementById("audioOnly").checked;
    if (url) {
        const videoID = extractVideoID(url);
        const playlistID = extractPlaylistID(url);
        let embedUrl = "";
        
        if (playlistID) {
            // Pour toutes les playlists, y compris radio auto-générées, on part de l'ID de la vidéo
            // et on ajoute le paramètre list.
            embedUrl = `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1&list=${playlistID}`;
        } else if (videoID) {
            // Vidéo seule
            embedUrl = `https://www.youtube.com/embed/${videoID}?enablejsapi=1&autoplay=1`;
        }
        
        // Ajout des paramètres pour le mode audioOnly
        if (audioOnly) {
            embedUrl += "&controls=0&showinfo=0&rel=0&modestbranding=1";
        }
        
        // Pour l'affichage : en mode audio pour une vidéo seule, on peut réduire la hauteur à 0,
        // mais pour une playlist (notamment radio) une hauteur minimale (150) est nécessaire.
        const height = (audioOnly && !playlistID) ? '0' : '150';
        
        document.getElementById("results").innerHTML =
            `<iframe id="ytPlayer" width="300" height="${height}" 
            src="${embedUrl}" frameborder="0" allow="autoplay"></iframe>`;
        
        setTimeout(() => {
            player = document.getElementById("ytPlayer");
        }, 1000);
    }
});

function extractVideoID(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractPlaylistID(url) {
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
