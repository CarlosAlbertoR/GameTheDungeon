var canvas;
var ctx;
var FPS = 50;

var widthF = 50;
var heightF = 50;

var wall = '#044f14';
var door = '#3a1700';
var earth = '#c6892f';
var keyCode = '#c6bc00';

var player;

var stage = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function drawStage() {
    var color;

    for (y = 0; y < 10; y++) {
        for (x = 0; x < 15; x++) {

            if (stage[y][x] == 0)
                color = wall;

            if (stage[y][x] == 1)
                color = door;

            if (stage[y][x] == 2)
                color = earth;

            if (stage[y][x] == 3)
                color = keyCode;

            ctx.fillStyle = color;
            ctx.fillRect(x * widthF, y * heightF, widthF, heightF);
        }
    }


}


//PLAYER OBJECT
var Player = function() {
    this.x = 1;
    this.y = 1;

    this.color = '#820c01';


    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * widthF, this.y * heightF, widthF, heightF);
    }


    this.borders = function(x, y) {
        var collision = false;

        if (stage[y][x] == 0) {
            collision = true;
        }

        return (collision);
    }



    this.up = function() {
        if (this.borders(this.x, this.y - 1) == false)
            this.y--;
    }


    this.down = function() {
        if (this.borders(this.x, this.y + 1) == false)
            this.y++;
    }

    this.left = function() {
        if (this.borders(this.x - 1, this.y) == false)
            this.x--;
    }

    this.right = function() {
        if (this.borders(this.x + 1, this.y) == false)
            this.x++;
    }

}






function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //CREATE PLAYER
    player = new Player();

    //KEYBOARD READ
    document.addEventListener('keydown', function(tecla) {
        switch (tecla.keyCode) {
            case 38:
                player.up();
                break;
            case 40:
                player.down();
                break;
            case 37:
                player.left();
                break;
            case 39:
                player.right();
                break;
        }
    });

    setInterval(function() {
        main();
    }, 1000 / FPS);
}


function eraseCanvas() {
    canvas.width = 750;
    canvas.height = 500;
}


function main() {
    eraseCanvas();
    drawStage();
    player.draw();
}