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
                      setTimeout(grassEaterArr.splice(i, 1),10000)
                  }
              }

              matrix[y][x] = 3
              matrix[this.y][this.x] = 0

              this.x = x;
              this.y = y

              if(this.energy > 560){
                  
                  setTimeout(this.mul(),20000)
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
