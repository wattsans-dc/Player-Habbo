(function(){
  function getPlayer(){
    return window.getPlayer();
  }
  
  document.getElementById("pauseBtn").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.pauseVideo();
    }
  });
  
  document.getElementById("resumeBtn").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.playVideo();
    }
  });
  
  document.getElementById("stopBtn").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.destroy(); 
      document.getElementById("results").innerHTML = "";
      document.getElementById("controlPanel").style.display = "none";
      document.getElementById("currentTitle").innerText = "";
      document.getElementById("playlistDropdown").style.display = "none";
    }
  });
  
  document.getElementById("volumeUp").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setVolume(100);
    }
  });
  
  document.getElementById("volumeDown").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setVolume(20);
    }
  });
  
  document.getElementById("resetVolume").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setVolume(50);
    }
  });
  
  document.getElementById("speedUp").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setPlaybackRate(2.0);
    }
  });
  
  document.getElementById("speedDown").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setPlaybackRate(0.5);
    }
  });
  
  document.getElementById("resetSpeed").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.setPlaybackRate(1.0);
    }
  });
  
  document.getElementById("nextBtn").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.nextVideo();
    }
  });
  
  document.getElementById("prevBtn").addEventListener("click", function(){
    var player = getPlayer();
    if(player){
      player.previousVideo();
    }
  });
})();
