var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var PredatorArr = [];
var HunterArr = [];
var TerroristArr = [];
var PoliceArr = [];
var BombArr = [];
var side = 20;

var Bomb = +prompt(Bomb);
var Energy = 0;
document.getElementById("Mysummer").addEventListener("click", displayDate);
document.getElementById("MyWinter").addEventListener("click", displayDate1);
function displayDate() {
   grassEaterArr--;
   grassArr--;
   PredatorArr--;
}
function displayDate1() {
    grassArr--;
    grassEaterArr.length = 0;
    HunterArr.length = 0;
    TerroristArr.length = 0;
    PoliceArr.length = 0;
}

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount,PredatorCount,HunterCount,TerroristCount,PoliceCount,BombCount){
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < PredatorCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < HunterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
        for (let i = 0; i < TerroristCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 5;
        }
        for (let i = 0; i < PoliceCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 6;
        }
        for(let i = 0;i < BombCount;i++){
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 7;
        }
        // for (let i = 0; i < WeedCount; i++) {
        //     let x = Math.floor(random(matrixSize));
        //     let y = Math.floor(random(matrixSize));
        //     matrix[y][x] = 8;
        // }
    }

  matrixGenerator(40, 25, 15, 12 , 30 , 3 , 6, Bomb)


    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1){
                let gr = new Grass(x, y);
                grassArr.push(gr);

            }

            else if (matrix[y][x] == 2){
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3){
                let eater1 = new Predator(x, y);
                PredatorArr.push(eater1);
            }
            else if (matrix[y][x] == 4){
                let killer = new Hunter(x, y);
                HunterArr.push(killer);
            }
            else if (matrix[y][x] == 5){
                let destorier = new Terrorist(x, y);
                TerroristArr.push(destorier);
            }
            else if (matrix[y][x] == 6){
                let hero = new Police(x, y);
                PoliceArr.push(hero);
            }
            else if (matrix[y][x] == 7) {
                let exp = new bomb(x,y);
                BombArr.push(exp)
            }
            
            // else if (matrix[y][x] == 8) {
            //     let evilgrass = new Weed(x,y);
            //     WeedArr.push(evilgrass);
            // }
        }
    }
}

function draw() {
    if (frameCount % 10 == 0) {
        var stats = {
            "frameCount": Math.round(frameCount/60),
            "grassC": grassArr.length,
            "TerroristC": TerroristArr.length,
            "HunterC": HunterArr.length,
            "PoliceC": PoliceArr.length,
            "PredatorC": PredatorArr.length,
            "GrassEaterC": grassEaterArr.length,
            "BombC":BombArr.length
        }
    
        socket.emit("send stats", stats);
    }
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#481d00");
            }
            else if (matrix[y][x] == 5) {
                fill("#353536");
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
            }
            else if(matrix[y][x] == 7)fill("black");
            // else if(matrix[y][x] == 8)fill("#06450e");
            rect(x * side, y * side, side, side);
        
        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
      eater.eat()
    }
    for (let i = 0; i < PredatorArr.length; i++) {
        const eater1 = PredatorArr[i];
        eater1.eat()
    }
    for (let i = 0; i < HunterArr.length; i++) {
        const killer = HunterArr[i];
        killer.kill();
    }
    for (let i = 0; i < TerroristArr.length; i++) {
        const destorier = TerroristArr[i];
        destorier.destory();
    }
    for (let i = 0; i < PoliceArr.length; i++) {
        const hero = PoliceArr[i];
        hero.arrest();
    }
    for (let i = 0; i < BombArr.length; i++) {
        const exp = BombArr[i];
        exp.destory();
    }
    // for (let i = 0; i < WeedArr.length; i++) {
    //     const evilgrass = WeedArr[i];
    //     setTimeout(evilgrass.mul(),val*1000);
        
    // }
    if(HunterArr.length == 0  && PoliceArr.length == 0 && PredatorArr.length == 0 && TerroristArr.length == 0 && grassEaterArr.length == 0){
        noLoop();
    }    

    }

