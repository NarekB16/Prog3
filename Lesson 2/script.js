class Creature{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    eat(){
        console.log("kera");
    }
    die(){
        console.log("Mera");
    }
}


class GrassEater extends Creature{


    mult(){
        console.log("mult");
    }

    chooseCell(){
        console.log("chooseCell");
    }
}
class Predator extends Creature{
    constructor(x,y,energy){
        super(x,y);
        this.energy = energy;
    }

    mult(){
        console.log("mult");
    }
    chooseCell(){
        console.log("chooseCell");
    }
}
var aryut = new Predator()