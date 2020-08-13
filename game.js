// Global variables

var map = {};

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const MAP_WIDTH = SCREEN_WIDTH / TILE_WIDTH;
const MAP_HEIGHT = SCREEN_HEIGHT / TILE_HEIGHT;



// Ga instance setup
var g = ga(
    SCREEN_WIDTH, SCREEN_HEIGHT, setupGame
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

//const TEST_MAP = []

// The function that runs while initially loading objects
/* // Not needed if going fully procedural for assets
function load() {
    // Use Ga's built in `progressBar` to display a loading progress percentage bar while the assets are loading
    g.progressBar.create(g.canvas, g.assets);

    // Update the bar each frame
    g.progressBar.update();
}*/

function setupGame() {
    g.canvas.style.border = "0px black dashed";
    g.backgroundColor = "white";

    // Setup grid
    map.grid = generateRandomGrid(MAP_WIDTH, MAP_HEIGHT);
    // map.width = MAP_WIDTH;
    // map.heigh = MAP_HEIGHT;
    createMap(map.grid, MAP_WIDTH, MAP_HEIGHT);

    g.state = playGame;
}

function playGame() {
    
}

function generateRandomGrid(width, height) {
    let result = [];
    for (var y = 0; y < height; y++) {
        result[y] = [];
        for (var x = 0; x < width; x++) {
            result[y][x] = g.randomInt(0,4);
        }
    }
    return result;
}

function createMap(grid, width, height) {
    let result = [];
    for (var y = 0; y < height; y++) {
        result[y] = [];
        for (var x = 0; x < width; x++) {
            let tileSprite = tileLookup(grid[y][x]);
            tileSprite.x = x * TILE_WIDTH;
            tileSprite.y = y * TILE_HEIGHT;
            
            result[y][x] = tileSprite;
        }
    }
    return result;
}

function tileLookup(i) {
    console.log(i);
    switch(i) {
    case 0:
        return g.rectangle(32, 32, "#011D80");
    case 1:
        return g.rectangle(32, 32, "#5771CF");
    case 2:
        return g.rectangle(32, 32, "#2A3D82");
    case 3:
        return g.rectangle(32, 32, "#362906");
    case 4:
        return g.rectangle(32, 32, "#826B2A");
    default:
        return g.rectangle(32, 32, "#FFFFFF");
    }
}