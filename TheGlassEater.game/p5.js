var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var PredatorArr = [];
var HunterArr = [];
var TerroristArr = [];
var PoliceArr = [];
var side = 20;

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount,PredatorCount,HunterCount,TerroristCount,PoliceCount){
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
    }
    matrixGenerator(40, 60, 18, 14 , 12 , 4 , 4)
    
    frameRate(10);
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
        }
    }
}

function draw() {
    frameRate(10)
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
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);

        }
    }

    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        const eater = grassEaterArr[i];
        eater.eat();
    }
    for (let i = 0; i < PredatorArr.length; i++) {
        const eater1 = PredatorArr[i];
        eater1.eat();
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

}