/**
 * Requests the browser to enter fullscreen mode for the game container.
 * Supports standard, Webkit (Chrome/Safari), and MS (IE/Edge) versions of the API.
 */
function openFullscreen() {
  let container = document.querySelector('.game');
  let elem = document.getElementById('game');
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Requests the browser to exit fullscreen mode.
 * Supports standard, Webkit (Chrome/Safari), and MS (IE/Edge) versions of the API.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}