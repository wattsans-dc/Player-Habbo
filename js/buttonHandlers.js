(function(){
    function getPlayer(){
      return window.getPlayer();
    }
    document.getElementById("pauseBtn").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
    document.getElementById("resumeBtn").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    });
    document.getElementById("stopBtn").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        document.getElementById("results").innerHTML = "";
        player = null;
      }
    });
    document.getElementById("volumeUp").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
      }
    });
    document.getElementById("volumeDown").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[20]}', '*');
      }
    });
    document.getElementById("resetVolume").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[50]}', '*');
      }
    });
    document.getElementById("speedUp").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[2.0]}', '*');
      }
    });
    document.getElementById("speedDown").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[0.5]}', '*');
      }
    });
    document.getElementById("resetSpeed").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[1.0]}', '*');
      }
    });
    document.getElementById("nextBtn").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"nextVideo","args":""}', '*');
      }
    });
    document.getElementById("prevBtn").addEventListener("click", function(){
      var player = getPlayer();
      if(player){
        player.contentWindow.postMessage('{"event":"command","func":"previousVideo","args":""}', '*');
      }
    });
  })();
  