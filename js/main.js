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
var enemy = [];

var torch = [];

var tileMap;

var music = [];
var sounds = [];



var stage = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0],
    [0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0],
    [0, 2, 2, 3, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function drawStage() {
    for (y = 0; y < 10; y++) {
        for (x = 0; x < 15; x++) {
            var tile = stage[y][x];
            ctx.drawImage(tileMap, tile * 32, 0, 32, 32, widthF * x, heightF * y, widthF, heightF);
        }
    }
}

//Player Object
var Player = function() {
    this.x = 1;
    this.y = 1;
    this.color = '#820c01';
    this.key = false;

    this.draw = function() {
        ctx.drawImage(tileMap, 32, 32, 32, 32, this.x * widthF, this.y * heightF, widthF, heightF);
    }

    this.enemyCollision = function(x, y) {
        if (this.x == x && this.y == y) {
            this.death();
        }
    }

    this.borders = function(x, y) {
        var collision = false;

        if (stage[y][x] == 0) {
            collision = true;
        }

        return (collision);
    }

    this.up = function() {
        if (this.borders(this.x, this.y - 1) == false) {
            this.y--;
            this.logicObjects();
        }
    }

    this.down = function() {
        if (this.borders(this.x, this.y + 1) == false) {
            this.y++;
            this.logicObjects();
        }
    }

    this.left = function() {
        if (this.borders(this.x - 1, this.y) == false) {
            this.x--;
            this.logicObjects();
        }
    }

    this.right = function() {
        if (this.borders(this.x + 1, this.y) == false) {
            this.x++;
            this.logicObjects();
        }
    }

    this.win = function() {
        console.log('You win.')
        alert("Congratulations!!! \n You win the game.");
        this.resetGame();
    }

    this.death = function() {
        console.log('You was killed by a enemy :(')
        sounds[2].sound.play();
        alert("Oh noo \n You was killed by a enemy :( \n  You lose.");
        this.resetGame();
    }

    this.resetGame = function() {
        this.x = 1;
        this.y = 1;
        this.key = false;
        stage[8][3] = 3;
        enemy = []

        //CREATE ENEMIES
        enemy.push(new Enemy(6, 3));
        enemy.push(new Enemy(8, 1));
        enemy.push(new Enemy(4, 4));
        enemy.push(new Enemy(13, 8));
    }

    this.logicObjects = function() {
        var object = stage[this.y][this.x];

        //Get key
        if (object == 3) {
            this.key = true;
            stage[this.y][this.x] = 2;
            console.log("You've got the key!!!")
            sounds[0].sound.play();
        }

        //Open door
        if (object == 1) {
            if (this.key == true) {
                sounds[1].sound.play();
                this.win();
            } else
                console.log("YOU DON'T HAVE THE KEY!")
        }
    }

}

//Enemy Object
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.direction = Math.floor(Math.random() * 4);
    this.wait = 30;
    this.photogram = 0;

    this.draw = function() {
        ctx.drawImage(tileMap, 0, 32, 32, 32, this.x * widthF, this.y * heightF, widthF, heightF);
    }

    this.findCollision = function(x, y) {
        var collision = false;

        if (stage[y][x] == 0) {
            collision = true;
        }
        return collision;
    }

    this.move = function() {
        player.enemyCollision(this.x, this.y);

        if (this.count < this.wait) {
            this.count++;
        } else {
            this.count = 0;

            switch (this.direction) {
                case 0:
                    //Up
                    if (this.findCollision(this.x, this.y - 1) == false) {
                        this.y--;
                    } else {
                        this.direction = Math.floor(Math.random() * 4);
                    }
                    break;
                case 1:
                    //Down
                    if (this.findCollision(this.x, this.y + 1) == false) {
                        this.y++;
                    } else {
                        this.direction = Math.floor(Math.random() * 4);
                    }
                    break;
                case 2:
                    //Left
                    if (this.findCollision(this.x - 1, this.y) == false) {
                        this.x--;
                    } else {
                        this.direction = Math.floor(Math.random() * 4);
                    }
                    break;
                case 3:
                    //Right
                    if (this.findCollision(this.x + 1, this.y) == false) {
                        this.x++;
                    } else {
                        this.direction = Math.floor(Math.random() * 4);
                    }
                    break;
                default:
                    //Up
                    if (this.findCollision(this.x, this.y - 1) == false) {
                        this.y--;
                    } else {
                        this.direction = Math.floor(Math.random() * 4);
                    }
                    break;
            }
        }
    }
}

//Torch Object
var Torch = function(x, y) {
    this.x = x;
    this.y = y;

    this.wait = 10;
    this.count = 0
    this.photogram = 0; //0-3

    this.changePhotogram = function() {
        if (this.photogram < 3)
            this.photogram++;
        else
            this.photogram = 0;
    }

    this.draw = function() {
        if (this.count < this.wait) {
            this.count++;
        } else {
            this.count = 0;
            this.changePhotogram();
        }
        ctx.drawImage(tileMap, this.photogram * 32, 64, 32, 32, this.x * widthF, this.y * heightF, widthF, heightF);
    }
}

//INITIALIZATION MUSIC
var Music = function(srcSound) {
    this.sound = new Howl({
        src: [srcSound],
        loop: true
    })
}

//EffectSound Object
var EffectSound = function(srcSound) {
    this.sound = new Howl({
        src: [srcSound],
        loop: false
    })
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    //INITIALIZATION TILEMAP
    tileMap = new Image();
    tileMap.src = './img/tilemap.png';

    //MUSIC INITIAL
    music.push(new Music('./music/HeroicDemise.mp3'))
    music.push(new Music('./music/Opening.ogg'))
    music[1].sound.play()
    console.log("Number of musics: " + music.length)

    //EFFECT SOUNDS INITIAL
    sounds.push(new EffectSound('./sound/key.mp3'))
    sounds.push(new EffectSound('./sound/win.wav'))
    sounds.push(new EffectSound('./sound/death.wav'))
    console.log("Number of efffect sounds: " + sounds.length)

    //CREATE PLAYER
    player = new Player();

    //CREATE TORCH
    torch.push(new Torch(0, 0));
    torch.push(new Torch(14, 0));
    torch.push(new Torch(0, 9));
    torch.push(new Torch(14, 9));
    torch.push(new Torch(5, 6));
    torch.push(new Torch(4, 8));
    torch.push(new Torch(9, 7));
    torch.push(new Torch(5, 1));
    torch.push(new Torch(11, 2));
    torch.push(new Torch(13, 5));

    //CREATE ENEMY
    addEnemies();

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

function addEnemies() {
    enemy.push(new Enemy(6, 3));
    enemy.push(new Enemy(8, 1));
    enemy.push(new Enemy(4, 4));
    enemy.push(new Enemy(13, 8));
}

function eraseCanvas() {
    canvas.width = 750;
    canvas.height = 500;
}

function main() {
    eraseCanvas();
    drawStage();
    player.draw();

    for (i = 0; i < enemy.length; i++) {
        enemy[i].move();
        enemy[i].draw();
    }

    for (i = 0; i < torch.length; i++) {
        torch[i].draw();
    }
}