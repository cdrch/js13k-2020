// Global variables

var map = {};

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;

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

    //createTexture(320, 320);
    // let test = g.rectangle(TILE_WIDTH * 4, TILE_HEIGHT * 4, "#5771CF");
    // test.x = 150;
    // test.y = 150;
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
    switch(i) {
    case 0:
        let newImage = {};
        newImage.name = "test.png";
        let a = {};
        a = new Image();
        a.src = createTexture(TILE_WIDTH, TILE_HEIGHT);
        g.assets[newImage.name] = {
            source: a,
            frame: {
                x: 0,
                y: 0,
                w: TILE_WIDTH,
                h: TILE_HEIGHT
            }
        };
        
        /*
        image.name = source;
        self[image.name] = {
            //If you just want the file name and the extension, you can
            //get it like this:
            //image.name = source.split("/").pop();
            //Assign the image as a property of the assets object so
            //we can access it like this: `assets["images/imageName.png"]`.
            source: image,
            frame: {
                x: 0,
                y: 0,
                w: image.width,
                h: image.height
            }
        };*/
        //console.log(g.assets["test.png"]);
        return g.sprite("test.png");
        //return g.rectangle(32, 32, "#011D80");
    case 1:
        return g.rectangle(TILE_WIDTH, TILE_HEIGHT, "#5771CF");
    case 2:
        return g.rectangle(TILE_WIDTH, TILE_HEIGHT, "#2A3D82");
    case 3:
        return g.rectangle(TILE_WIDTH, TILE_HEIGHT, "#362906");
    case 4:
        return g.rectangle(TILE_WIDTH, TILE_HEIGHT, "#826B2A");
    default:
        return g.rectangle(TILE_WIDTH, TILE_HEIGHT, "#FFFFFF");
    }
}

function createColor() {
    //saturation is the whole color spectrum
    const h = Math.floor(g.randomFloat(0,1) * 360);
    //saturation goes from 40 to 100, it avoids greyish colors
    const s = ((g.randomFloat(0,1) * 60) + 40) + "%";
    //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
    const l = ((g.randomFloat(0,1) + g.randomFloat(0,1) + g.randomFloat(0,1) + g.randomFloat(0,1)) * 25) + "%";
    //return "black";
    return "hsl(" + h + "," + s + "," + l + ")";
}

function createTexture(width, height) {
    const opts = {};

    opts.seed = opts.seed || Math.floor((Math.random()*Math.pow(10,16))).toString(16);

    opts.size = opts.size || 8;
    opts.scale = opts.scale || 8;
    opts.color = opts.color || createColor();
    opts.bgcolor = opts.bgcolor || createColor();
    opts.spotcolor = opts.spotcolor || createColor();




    const dataWidth = Math.ceil(width / 2);
    const mirrorWidth = width - dataWidth;
    
    const data = [];
    for(let y = 0; y < height; y++) {
        let row = [];
        for(let x = 0; x < dataWidth; x++) {
            // this makes foreground and background color to have a 43% (1/2.3) probability
            // spot color has 13% chance
            row[x] = Math.floor(g.randomFloat(0,1)*2.3);
        }
        const r = row.slice(0, mirrorWidth);
        r.reverse();
        row = row.concat(r);

        for(let i = 0; i < row.length; i++) {
            data.push(row[i]);
        }
    }

    let imageData = data;

    let canvas = document.createElement("canvas");

    width = Math.sqrt(imageData.length);

    canvas.width = canvas.height = opts.size * opts.scale;

    const cc = canvas.getContext("2d");
    cc.fillStyle = opts.bgcolor;
    cc.fillRect(0, 0, canvas.width, canvas.height);
    cc.fillStyle = opts.color;

    for(let i = 0; i < imageData.length; i++) {

        // if data is 0, leave the background
        if(imageData[i]) {
            const row = Math.floor(i / width);
            const col = i % width;

            // if data is 2, choose spot color, if 1 choose foreground
            cc.fillStyle = (imageData[i] == 1) ? opts.color : opts.spotcolor;

            cc.fillRect(col * opts.scale, row * opts.scale, opts.scale, opts.scale);
        }
    }

    //console.log(cc.getImageData(0, 0, width, height));

    return canvas.toDataURL("image/png");
}