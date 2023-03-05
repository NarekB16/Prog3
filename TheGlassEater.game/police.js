
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
