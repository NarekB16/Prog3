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

          if (exact && this.ammo <= 1000) {
              let x = exact[0];
              let y = exact[1];

              let killer = new Hunter(x, y);
              matrix[y][x] = 4;
              HunterArr.push(killer);

              this.ammo = 1800;
          } else {
              console.error('there is no way to call his squad');
          }
      }

      kill(){
          let found = this.chooseCell(3);
          let exact = random(found)

          if (exact){
              this.ammo -= 200;
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

              if(this.ammo <= 1500){
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
