export default class Winrate {
  constructor() {
    this.victorySum = 0;
    this.len = 0;
    if (localStorage.len) {
      this.len = Number(localStorage.getItem('len'))
    }
    if (localStorage.victorySum) {
      this.victorySum = Number(localStorage.victorySum)
    }
  }

  calculate() {

  }




}