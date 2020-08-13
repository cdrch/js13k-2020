// Ga instance setup
var g = ga(
    1920, 1080, setupGame
);
g.start();

// Automatically scale and center the game
g.scaleToWindow();

// Re-scale the canvas if the browser window is changed
// eslint-disable-next-line no-unused-vars
window.addEventListener("resize", function(event){ 
    g.scaleToWindow();
});

// g.enableFullscreen(88, 120);

// Global variables

// The function that runs while initially loading objects
/* // Not needed if going fully procedural for assets
function load() {
    // Use Ga's built in `progressBar` to display a loading progress percentage bar while the assets are loading
    g.progressBar.create(g.canvas, g.assets);

    // Update the bar each frame
    g.progressBar.update();
}*/

function setupGame() {
    g.canvas.style.border = "40px black dashed";
    g.backgroundColor = "white";

    g.state = playGame;
}

function playGame() {
    //console.log(g.backgroundColor);
}