class LivingCreature{
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}

class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 10
    }
    chooseCell(char) {
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
    mul() {
        this.energy++;
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 10) {
            let x = exact[0];
            let y = exact[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        } else {
            console.error('there is no way to multiply');
        }
    }
}


class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 120;

    }
    getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
      this.getNewCordinates();
        let result = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                if (matrix[y][x] == char) {
                    result.push(this.directions[i]);
                }
            }

        }

        return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact && this.energy > 120) {
            let x = exact[0];
            let y = exact[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);

            this.energy = 50;
        } else {
            console.error('there is no way to multiply');
        }
    }
    eat(){
        let found = this.chooseCell(1);
        let exact = random(found)

        if (exact){
            this.energy+= 9;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if( grassArr[i].x == x && grassArr[i].y == y ){
                    grassArr.splice(i, 1)
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            
            this.x = x;
            this.y = y

            if(this.energy > 120){
                this.mul()
            }
        }else {
            this.move()
        }
    }
    move(){
        let found = this.chooseCell(0);
        let exact = random(found)

        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.energy-= 35

            if(this.energy <= 0){
                this.die()
            }
        }else {
            this.energy-= 35
            if(this.energy <= 0){
                this.die()
            }
        }
    }
    die(){
        for (let i = 0; i < grassEaterArr.length; i++) {
            if( grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y ){
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 600;

    }
    getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
          let result = [];
  
          for (let i = 0; i < this.directions.length; i++) {
              let x = this.directions[i][0];
              let y = this.directions[i][1];
  
              if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                  if (matrix[y][x] == char) {
                      result.push(this.directions[i]);
                  }
              }
  
          }
  
          return result;
        }
        mul() {
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact && this.energy > 600) {
                let x = exact[0];
                let y = exact[1];
    
                let eater1 = new Predator(x, y);
                matrix[y][x] = 3;
                PredatorArr.push(eater1);
    
                this.energy = 400;
            } else {
                console.error('there is no way to multiply1');
            }
        }
        eat(){
            let found = this.chooseCell(2);
            let exact = random(found)
    
            if (exact){
                this.energy+= 75;
                let x = exact[0];
                let y = exact[1];
    
                for (let i = 0; i < grassEaterArr.length; i++) {
                    if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                        grassEaterArr.splice(i, 1)
                    }
                }
    
                matrix[y][x] = 3
                matrix[this.y][this.x] = 0
                
                this.x = x;
                this.y = y
    
                if(this.energy > 560){
                    this.mul()
                }
            }else {
                this.move()
            }
        }
        move(){
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact){
                let x = exact[0];
                let y = exact[1];
    
                matrix[y][x] = 3
                matrix[this.y][this.x] = 0
    
                this.x = x;
                this.y = y;
    
                this.energy-= 45
    
                if(this.energy <= 0){
                    this.die()
                }
            }else {
                this.energy -= 45
                if(this.energy <= 0){
                    this.die()
                }
            }
        }
        die(){
            for (let i = 0; i < PredatorArr.length; i++) {
                if( PredatorArr[i].x == this.x && PredatorArr[i].y == this.y ){
                    PredatorArr.splice(i, 1)
                }
            }
            matrix[this.y][this.x] = 0
        }
    }
    
    class Hunter extends LivingCreature{
        constructor(x, y) {
            super(x,y);
            this.ammo = 2000;
        }
        getNewCordinates(){
                  this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }
        chooseCell(char) {
            this.getNewCordinates();
              let result = [];
      
              for (let i = 0; i < this.directions.length; i++) {
                  let x = this.directions[i][0];
                  let y = this.directions[i][1];
      
                  if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                      if (matrix[y][x] == char) {
                          result.push(this.directions[i]);
                      }
                  }
      
              }
      
              return result;
            }
            squad() {
                let found = this.chooseCell(0);
                let exact = random(found)
        
                if (exact && this.ammo <= 200) {
                    let x = exact[0];
                    let y = exact[1];
        
                    let killer = new Hunter(x, y);
                    matrix[y][x] = 4;
                    HunterArr.push(killer);
        
                    this.ammo = 1200;
                } else {
                    console.error('there is no way to call his squad');
                }
            }

            kill(){
                let found = this.chooseCell(3);
                let exact = random(found)
        
                if (exact){
                    this.ammo -= 750;
                    let x = exact[0];
                    let y = exact[1];
        
                    for (let i = 0; i < PredatorArr.length; i++) {
                        if( PredatorArr[i].x == x && PredatorArr[i].y == y ){
                            PredatorArr.splice(i, 1)
                        }
                    }
        
                    matrix[y][x] = 4
                    matrix[this.y][this.x] = 0
                    
                    this.x = x;
                    this.y = y
        
                    if(this.ammo <= 10){
                        this.squad()
                    }
                }
                else {
                    this.move()
                }
            }
            move(){
                let found = this.chooseCell(0);
                let exact = random(found)
        
                if (exact){
                    let x = exact[0];
                    let y = exact[1];
        
                    matrix[y][x] = 4
                    matrix[this.y][this.x] = 0
        
                    this.x = x;
                    this.y = y;
        
                    this.ammo -= random(10,200)
        
                    if(this.ammo <= 0){
                        this.leave()
                    }
                }else {
                    this.ammo -= random(10,200)
                    if(this.ammo <= 0){
                        this.leave()
                    }
                }
            }
            leave(){
                for (let i = 0; i < HunterArr.length; i++) {
                    if( HunterArr[i].x == this.x && HunterArr[i].y == this.y ){
                        HunterArr.splice(i, 1)
                    }
                }
                matrix[this.y][this.x] = 0
            }
    }
class Terrorist extends LivingCreature{
    constructor(x,y){
        super(x,y)
        this.weapon = 100;

    }
    getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
          let result = [];
  
          for (let i = 0; i < this.directions.length; i++) {
              let x = this.directions[i][0];
              let y = this.directions[i][1];
  
              if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                  if (matrix[y][x] == char) {
                      result.push(this.directions[i]);
                  }
              }
  
          }
  
          return result;
        }
        squad() {
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact && this.weapon <= 1) {
                let x = exact[0];
                let y = exact[1];
    
                let destorier = new Terrorist(x, y);
                matrix[y][x] = 0;
                TerroristArr.push(destorier);
    
                this.weapon = 50;
            } else {
                console.error('there is no way to call his squad1');
            }
        }
        destory(){
            let found = this.chooseCell(1,2,3,4);
            let exact = random(found)
    
            if (exact){
                this.weapon -= random(1,5)
                let x = exact[0];
                let y = exact[1];
    
                for (let i = 0; i < HunterArr.length &&  PredatorArr.length && grassEaterArr.length && grassArr.length; i++) {
                    if( HunterArr[i].x == x && HunterArr[i].y == y ){
                        HunterArr.splice(i, 1)
                    }
                    if( PredatorArr[i].x == x && PredatorArr[i].y == y ){
                        PredatorArr.splice(i, 1)
                    }
                    if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                        grassEaterArr.splice(i, 1)
                    }
                    if( grassArr[i].x == x && grassArr[i].y == y ){
                        grassArr.splice(i, 1)
                    }
                }
    
                matrix[y][x] = 5
                matrix[this.y][this.x] = 0
                
                this.x = x;
                this.y = y
    
                if(this.weapon <= 10){
                    this.squad()
                }
            }
            else {
                this.invade()
            }
        }
        invade(){
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact){
                let x = exact[0];
                let y = exact[1];
    
                matrix[y][x] = 5
                matrix[this.y][this.x] = 0
    
                this.x = x;
                this.y = y;
    
                this.weapon -= random(1,20);
    
                if(this.weapon <= 0){
                    this.giveup()
                }
            }else {
                this.weapon -= random(1,20)
                if(this.weapon <= 0){
                    this.giveup()
                }
            }
        }
        giveup(){
            for (let i = 0; i < TerroristArr.length; i++) {
                if( TerroristArr[i].x == this.x && TerroristArr[i].y == this.y ){
                    TerroristArr.splice(i, 1)
                }
            }
            matrix[this.y][this.x] = 0
        }
}
class Police extends LivingCreature{
        constructor(x,y){
            super(x,y)
            this.handcuffs = 400;
        }
        getNewCordinates(){
              this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCordinates();
          let result = [];
  
          for (let i = 0; i < this.directions.length; i++) {
              let x = this.directions[i][0];
              let y = this.directions[i][1];
  
              if ( y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0 ){
                  if (matrix[y][x] == char) {
                      result.push(this.directions[i]);
                  }
              }
  
          }
  
          return result;
        }
        swat() {
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact && this.handcuffs <= 7) {
                let x = exact[0];
                let y = exact[1];
    
                let hero = new Police(x, y);
                matrix[y][x] = 6;
                PoliceArr.push(hero);
    
                this.handcuffs = 200;
            } else {
                console.error('there is no way to call his swat');
            }
        }
        arrest(){
            let found = this.chooseCell(5);
            let exact = random(found)
    
            if (exact){
                this.handcuffs -= random(20,55);
                let x = exact[0];
                let y = exact[1];
    
                for (let i = 0; i < TerroristArr.length; i++) {
                    if( TerroristArr[i].x == x && TerroristArr[i].y == y ){
                        TerroristArr.splice(i, 1)
                    }
                }
    
                matrix[y][x] = 6
                matrix[this.y][this.x] = 0
                
                this.x = x;
                this.y = y
    
                if(this.handcuffs <= 7){
                    this.swat()
                }
            }
            else {
                this.invade()
            }
        }
        invade(){
            let found = this.chooseCell(0);
            let exact = random(found)
    
            if (exact){
                let x = exact[0];
                let y = exact[1];
    
                matrix[y][x] = 6
                matrix[this.y][this.x] = 0
    
                this.x = x;
                this.y = y;
    
                this.handcuffs -= random(1,5)
    
                if(this.handcuffs <= 0){
                    this.giveup()
                }
            }else {
                this.handcuffs -= random(1,5)
                if(this.handcuffs <= 0){
                    this.giveup()
                }
            }
        }
        giveup(){
            for (let i = 0; i < PoliceArr.length; i++) {
                if( PoliceArr[i].x == this.x && PoliceArr[i].y == this.y ){
                    PoliceArr.splice(i, 1)
                }
            }
            matrix[this.y][this.x] = 0
        }
    }
