class bomb{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bomb = 1;
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
  destory(){
    let found = this.chooseCell(1,2,3,4,5,6);
    let exact = random(found)

    if (exact){
        this.bomb -= 1;
        let x = exact[0];
        let y = exact[1];
        for (let i = 0; i < PoliceArr.length; i++) {
            if( PoliceArr[i].x == x && PoliceArr[i].y == y ){
                setTimeout(PoliceArr.splice(i, 1),10000)
            }       
        }
        for (let i = 0; i < TerroristArr.length; i++) {
            if( TerroristArr[i].x == x && TerroristArr[i].y == y ){
                setTimeout(TerroristArr.splice(i, 1),10000)
            }
        }
        for (let i = 0; i < HunterArr.length; i++) {
            if( HunterArr[i].x == x && HunterArr[i].y == y ){
                setTimeout(HunterArr.splice(i, 1),10000)
            }
        }
        for(let i = 0; i < PredatorArr.length; i++){
            if( PredatorArr[i].x == x && PredatorArr[i].y == y ){
                setTimeout(PredatorArr.splice(i, 1),10000)
            }
        }
        for(let i = 0;i < grassEaterArr.length; i++){
            if( grassEaterArr[i].x == x && grassEaterArr[i].y == y ){
                setTimeou(grassEaterArr.splice(i, 1),10000)
            }
        }
        for(let i = 0;i < grassArr.length; i++){
            if( grassArr[i].x == x && grassArr[i].y == y ){
                setTimeout(grassArr.splice(i, 1),10000)
            }
        }
        // for(let i = 0;i < WeedArr.length; i++){
        //     if( WeedArr[i].x == x && WeedArr[i].y == y ){
        //         WeedArr.splice(i, 1)
        //     }
        // }

        matrix[y][x] = 7
        matrix[this.y][this.x] = 0

        this.x = x;
        this.y = y
        if (exact){
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 7
            matrix[this.y][this.x] = 0

            this.x = x;
            this.y = y;

            this.bomb -= 1;

            if(this.bomb == 0){
                this.giveup()
            }
        }else {
            this.bomb -= 1;
            if(this.bomb == 0){
                this.giveup()
            }
        }
    }

}
giveup(){
    for (let i = 0; i < BombArr.length; i++) {
        if( BombArr[i].x == this.x && BombArr[i].y == this.y ){
            setTimeout(BombArr.splice(i, 1),10000)
        }
    }
    matrix[this.y][this.x] = 0
}
}
