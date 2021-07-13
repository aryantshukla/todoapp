export default class Efficiency {

  private len
  private efficiency
  private kFactor

  constructor() {
    this.len = 0;
    this.efficiency = 0;
    this.kFactor = 0;
    if (localStorage.len) {
      this.len = Number(localStorage.getItem('len'))
    }
    if (localStorage.efficiency) {
      this.efficiency = Number(localStorage.getItem('efficiency'))
    }
    if (localStorage.kFactor) {
      this.kFactor = Number(localStorage.getItem('kFactor'))
    }
    this.updateEfficieny();
  }

  addNewFinishedItem(iTime: number, tTime: number) {
    this.len++
    this.calculateEfficiency(iTime, tTime)
    this.updateEfficieny();
    localStorage.setItem('len', this.len.toString());
  }

  calculatekFactor(len: number) {
    this.kFactor = 10 * (10 - Math.floor(len / 10))
    this.kFactor = Math.max(this.kFactor, 10)
    localStorage.setItem('kFactor', this.kFactor.toString())
  }

  calculateEfficiency(iTime: number, tTime: number) {
    iTime = Number(iTime)
    tTime = Number(tTime)
    if (this.len === 0)
      return 0;
    this.calculatekFactor(this.len)
    let Ea = 0;
    Ea = 1 / (1 + 10 ** ((iTime / 60 - tTime / 60) / 20))
    if (tTime > iTime) {
      this.efficiency = this.efficiency + this.kFactor * (0 - Ea)
    } else {
      this.efficiency = this.efficiency + this.kFactor * (1 - Ea)
    }
    this.efficiency = Math.max(this.efficiency, 0)
    localStorage.setItem('efficiency', this.efficiency.toString());

  }

  updateEfficieny() {
    (document.querySelector('.efficiency') as HTMLDivElement).textContent = this.efficiency.toString()
  }
}


