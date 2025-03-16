(function(){
  var container = document.getElementById("playerContainer");
  var isDragging = false;
  var offsetX, offsetY;
  container.addEventListener("mousedown", function(e){
    var rect = container.getBoundingClientRect();
    var resizeZone = 20;
    if(e.clientX > rect.right - resizeZone && e.clientY > rect.bottom - resizeZone) return;
    if(e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON"){
      isDragging = true;
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      container.style.cursor = "grabbing";
    }
  });
  document.addEventListener("mousemove", function(e){
    if(isDragging){
      container.style.left = (e.clientX - offsetX) + "px";
      container.style.top = (e.clientY - offsetY) + "px";
    }
  });
  document.addEventListener("mouseup", function(){
    isDragging = false;
    container.style.cursor = "grab";
  });

  document.addEventListener('DOMContentLoaded', function() {
    const infoButton = document.querySelector('.link-player-download');
    const infoWindow = document.getElementById('infoWindow');

    infoButton.addEventListener('mouseover', function() {
        document.getElementById("playerContainer").style.overflow = "visible";
        infoWindow.style.visibility = "visible";
        infoWindow.classList.add('show');
    });

    infoButton.addEventListener('mouseout', function() {
        document.getElementById("playerContainer").style.overflow = "auto";
        infoWindow.style.visibility = "hidden";
        infoWindow.classList.remove('show');
    });
});
  
  // Fermer le player sans interrompre la lecture
  document.getElementById("closePlayer").addEventListener("click", function(){
    document.getElementById("playerContainer").style.display = "none";
    document.getElementById("openPlayer").style.display = "block";
  });
  
  // Réouvrir le player
  document.getElementById("openPlayer").addEventListener("click", function(){
    document.getElementById("playerContainer").style.display = "flex";
    document.getElementById("openPlayer").style.display = "none";
  });
})();
