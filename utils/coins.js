class Coins {
     oneR = 1;
     twoR = 2;
     fiveR = 5;
     fiveC = 0.5;

     constructor(data){
         this.oneQ = data.oneQ | 0;
         this.twoQ = data.twoQ | 0;
         this.fiveRQ = data.fiveRQ | 0;
         this.fiveCQ = data.fiveCQ | 0;
     }

     getAmount(){

        let sum = this.oneR * this.oneQ;
        sum += this.twoR * this.twoQ;
        sum += this.fiveR * this.fiveRQ;
        sum += this.fiveC * this.fiveCQ;
         return sum;
     }

}

module.exports = Coins;