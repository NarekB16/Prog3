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

              for (let i = 0; i < HunterArr.length; i++) {
                  if( HunterArr[i].x == x && HunterArr[i].y == y ){
                      HunterArr.splice(i, 1)
                  }
              }
              for(let i = 0; i < PredatorArr.length; i++){
                  if( PredatorArr[i].x == x && PredatorArr[i].y == y ){
                      PredatorArr.splice(i, 1)
                  }
              }
              for(let i = 0;i < grassEaterArr.length; i++){
                  if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                      grassEaterArr.splice(i, 1)
                  }
              }
              for(let i = 0;i < grassArr.length; i++){
                  if( grassArr[i].x == x && grassArr[i].y == y ){
                      grassArr.splice(i, 1)
                  }
              }
            //   for(let i = 0;i < WeedArr.length; i++){
            //     if( WeedArr[i].x == x && WeedArr[i].y == y ){
            //         WeedArr.splice(i, 1)
            //     }
            // }

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
