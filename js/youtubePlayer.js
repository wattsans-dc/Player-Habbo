(function() {
    var player;
    function getPlayer() {
      return player;
    }
    function loadVideo(videoID, playlistID, index) {
      var audioOnly = document.getElementById('audioOnly').checked;
      var embedUrl = "https://www.youtube.com/embed/" + videoID + "?enablejsapi=1&autoplay=1";
      if (playlistID) {
        embedUrl += "&list=" + playlistID;
        if (index) {
          embedUrl += "&index=" + index;
        }
      }
      if (audioOnly) {
        embedUrl += "&controls=0&showinfo=0&rel=0&modestbranding=1";
      }
      var height = audioOnly ? "0" : "150";
      document.getElementById("results").innerHTML = '<iframe id="ytPlayer" width="300" height="'+ height +'" src="'+ embedUrl +'" frameborder="0" allow="autoplay"></iframe>';
      setTimeout(function(){
        player = document.getElementById("ytPlayer");
      }, 1000);
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
      if(player){
        player.style.height = audioOnly ? "0px" : "150px";
      }
    });
    window.getPlayer = getPlayer;
  })();
  