import { getsec } from "../utils/timetaken.js";


export default class Power {

  constructor() {
    this.power = 1500;
    this.rating_deviation = 350;
    this.idealTime = []
    this.takenTime = []
    this.deadline = []
    this.finishline = []
    this.alpha = 1 / Math.sqrt(1 + (3 * (0.0051 ** 2) * (this.rating_deviation ** 2) / (Math.PI ** 2)))

    if (localStorage.power) {
      this.power = Number(localStorage.power)
    }
    if (localStorage.rating_deviation) {
      this.rating_deviation = Number(localStorage.rating_deviation)
    }
    if (localStorage.alpha) {
      this.alpha = Number(this.alpha)
    }
    if (localStorage.deadline) {
      this.deadline.push(Number(localStorage.deadline))
    }
    if (localStorage.finishline) {
      this.finishline.push(Number(localStorage.finishline))
    }

    this.updatePower();
  }

  calculateAlpha() {
    this.alpha = 1 / Math.sqrt(1 + (3 * (0.0051 ** 2) * (this.rating_deviation ** 2) / (Math.PI ** 2)))
    localStorage.setItem('alpha', this.alpha)
  }

  getsec = getsec

  eloEfficiency(iTime, tTime, Kfactor) {
    let Ea = 0;
    let efficiency = 0;

    Ea = 1 / (1 + 10 ** ((iTime / 60 - tTime / 60) / 1200))

    if (tTime > iTime)
      efficiency = Kfactor * (0 - Ea)
    else
      efficiency = Kfactor * (1 - Ea)

    return Math.max(efficiency, 0)
  }



  addNewItem(itime, ttime, dline, fline) {

    this.idealTime.push(itime)
    this.takenTime.push(ttime)
    this.deadline.push(this.getsec(dline, true))
    this.finishline.push(this.getsec(fline))

    localStorage.setItem('idealTime', itime)
    localStorage.setItem('takenTime', ttime)
    localStorage.setItem('deadline', this.deadline[0])
    localStorage.setItem('finishline', this.finishline[0])

    if (this.finishline.length % 2 !== 0)
      return

    let sigmaSum = 0;
    this.calculateAlpha();
    let len = this.finishline.length

    for (let i = 1; i <= 2; i++) {

      const itime = this.idealTime[len - i]
      const ttime = this.takenTime[len - i]

      let victorySum = 0;
      if (this.finishline[len - i] <= this.deadline[len - 1])
        victorySum++;
      if (ttime <= itime)
        victorySum++;
      sigmaSum += this.alpha * (victorySum - this.eloEfficiency(itime, ttime, this.alpha))
    }

    this.rectify();

    this.power += (this.rating_deviation ** 2) * sigmaSum
    this.updatePower();
  }

  rectify() {
    this.idealTime.splice(0)
    this.takenTime.splice(0)
    this.deadline.splice(0)
    this.finishline.splice(0)
    localStorage.removeItem('itealTime')
    localStorage.removeItem('takenTime')
    localStorage.removeItem('deadline')
    localStorage.removeItem('finishline')
  }

  updatePower() {
    localStorage.setItem('power', this.power.toString())
    document.querySelector('.power').textContent = this.power
  }

}