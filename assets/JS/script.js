// stick the nav bar on the top when scrolling the page 

window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navBar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// show a message when click on the boutton 

function showMess(){
  document.getElementById('show').innerHTML = "Is that enough to have these HTML/CSS & JS level 1 badges ????"
}

// Show an IMG 
function showImg(){
  var x = document.createElement("img");
  x.src="./assets/IMG/BeCode.png";
  x.height="200";
  x.width="200";
  var src = document.getElementById("BecodeImage")
  src.appendChild(x);
}
