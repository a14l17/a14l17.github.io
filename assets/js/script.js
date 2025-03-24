// script.js

// Get modal, tile (trigger), and close button
var modal = document.getElementById("myModal");
var triggerTile = document.getElementById("triggerTile");
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the tile, flip it and open the modal
triggerTile.onclick = function() {
  // Flip the tile
  triggerTile.classList.toggle("flip");

  // Open the modal after the flip (delay for flip animation)
  setTimeout(function() {
    modal.style.display = "block";
  }, 600);  // Wait for the flip animation to finish before opening the modal
}

// When the user clicks the close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
