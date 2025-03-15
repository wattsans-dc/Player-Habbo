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
  })();
  