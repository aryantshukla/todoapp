export default class Efficiency {

  constructor() {
    this.len = 0;
    this.efficiency = 0;
    this.Kfactor = 0;
    if (localStorage.len) {
      this.len = Number(localStorage.getItem('len'))
    }
    if (localStorage.efficiency) {
      this.efficiency = Number(localStorage.getItem('efficiency'))
    }
    if (localStorage.Kfactor) {
      this.Kfactor = Number(localStorage.getItem('Kfactor'))
    }
    this.updateEfficieny();
  }

  addNewFinishedItem(iTime, tTime) {
    this.len++
    this.calculateEfficiency(iTime, tTime)
    this.updateEfficieny();
    localStorage.setItem('len', this.len);
  }

  calculateKfactor(len) {
    this.Kfactor = 10 * (10 - Math.floor(len / 10))
    this.Kfactor = Math.max(this.Kfactor, 10)
    localStorage.setItem('Kfactor', this.Kfactor)
  }

  calculateEfficiency(iTime, tTime) {
    iTime = Number(iTime)
    tTime = Number(tTime)
    if (this.len === 0)
      return 0;
    this.calculateKfactor(this.len)
    let Ea = 0;
    Ea = 1 / (1 + 10 ** ((iTime / 60 - tTime / 60) / 20))
    if (tTime > iTime) {
      this.efficiency = this.efficiency + this.Kfactor * (0 - Ea)
    } else {
      this.efficiency = this.efficiency + this.Kfactor * (1 - Ea)
    }
    this.efficiency = Math.max(this.efficiency, 0)
    localStorage.setItem('efficiency', this.efficiency);

  }

  updateEfficieny() {
    document.querySelector('.efficiency').textContent = this.efficiency
  }
}


