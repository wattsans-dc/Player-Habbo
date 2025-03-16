window.extractVideoID = function(url) {
    var regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    var match = url.match(regex);
    return match ? match[1] : null;
  };
  window.extractPlaylistID = function(url) {
    var regex = /[?&]list=([a-zA-Z0-9_-]+)/;
    var match = url.match(regex);
    return match ? match[1] : null;
  };
  window.extractIndex = function(url) {
    var regex = /[?&]index=(\d+)/;
    var match = url.match(regex);
    return match ? match[1] : null;
  };
  