(function() {
  var player;
  var currentPlaylist = null; // Pour stocker la playlist si disponible

  // Cette fonction est appelée lorsque l'API IFrame est prête
  window.onYouTubeIframeAPIReady = function() {
    console.log("API IFrame YouTube chargée !");
  };

  // Callback quand le player est prêt
  function onPlayerReady(event) {
    console.log("Player prêt");
    updateCurrentTitle();
    var playlist = player.getPlaylist();
    if (playlist && playlist.length > 0) {
      currentPlaylist = playlist;
      populatePlaylistDropdown(playlist);
      document.getElementById("playlistDropdown").style.display = "block";
    } else {
      document.getElementById("playlistDropdown").style.display = "none";
    }
  }

  // Callback sur les changements d'état du player
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      updateCurrentTitle();
    }
  }

  // Met à jour le titre affiché
  function updateCurrentTitle() {
    if (player && typeof player.getVideoData === 'function') {
      var data = player.getVideoData();
      document.getElementById("currentTitle").innerText = data.title || "";
    }
  }

  // Remplit le menu déroulant de la playlist
  function populatePlaylistDropdown(playlist) {
    var dropdown = document.getElementById("playlistDropdown");
    dropdown.innerHTML = "";
    for (var i = 0; i < playlist.length; i++) {
      var option = document.createElement("option");
      option.value = i;
      option.text = "Morceau " + (i + 1);
      dropdown.appendChild(option);
    }
    dropdown.selectedIndex = player.getPlaylistIndex();
  }

  // Listener pour changer de morceau via le menu déroulant
  document.getElementById("playlistDropdown").addEventListener("change", function() {
    var index = parseInt(this.value, 10);
    if (player && !isNaN(index)) {
      player.playVideoAt(index);
    }
  });

  // Charge la vidéo ou la playlist en créant un nouveau YT.Player
  function loadVideo(videoID, playlistID, index) {
    console.log("Chargement de la vidéo:", videoID, "Playlist:", playlistID, "Index:", index);
    var audioOnly = document.getElementById('audioOnly').checked;
    var height = audioOnly ? "0" : "150";
    document.getElementById("results").innerHTML = '<div id="ytPlayer"></div>';
    
    var playerVars = {
      'autoplay': 1,
      'enablejsapi': 1
    };
    if (playlistID) {
      playerVars.list = playlistID;
      if (index) {
        playerVars.index = index;
      }
    }
    if (audioOnly) {
      playerVars.controls = 0;
      playerVars.showinfo = 0;
      playerVars.rel = 0;
      playerVars.modestbranding = 1;
    }
    
    player = new YT.Player('ytPlayer', {
      height: height,
      width: "300",
      videoId: videoID,
      playerVars: playerVars,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    
    document.getElementById("controlPanel").style.display = "block";
    if (playlistID) {
      document.getElementById("playlistDropdown").style.display = "block";
      document.getElementById("playlistControls").style.display = "block";
    } else {
      document.getElementById("playlistDropdown").style.display = "none";
      document.getElementById("playlistControls").style.display = "none";
    }
  }

  document.getElementById("submitFormData").addEventListener("click", function(){
    var url = document.getElementById("video").value;
    if(url){
      var videoID = window.extractVideoID(url);
      var playlistID = window.extractPlaylistID(url);
      var index = window.extractIndex(url);
      loadVideo(videoID, playlistID, index);
    }
  });
  
  document.getElementById("audioOnly").addEventListener("change", function(){
    var audioOnly = this.checked;
    if(player && player.getIframe()){
      player.getIframe().style.height = audioOnly ? "0px" : "150px";
    }
  });

  window.getPlayer = function() {
    return player;
  };
})();
