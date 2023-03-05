//  const mytime = setTimeout(mul(),5000);
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

      if (exact && this.energy > 50) {
          let x = exact[0];
          let y = exact[1];

          let eater = new GrassEater(x, y);
          matrix[y][x] = 2;
          setTimeout(grassEaterArr.push(eater),20000);

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
                  setTimeout(grassArr.splice(i, 1),10000)
              }
          }

          matrix[y][x] = 2
          matrix[this.y][this.x] = 0

          this.x = x;
          this.y = y

          if(this.energy > 120){
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

          matrix[y][x] = 2
          matrix[this.y][this.x] = 0

          this.x = x;
          this.y = y;

          this.energy = 35 - Energy;

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
