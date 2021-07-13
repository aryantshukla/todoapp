import { getSec } from "../utils/timetaken";


export default class Power {


  private power: number
  private rating_deviation: number
  private idealTime: number[]
  private takenTime: number[]
  private deadLine: number[]
  private finishline: number[]
  private alpha: number

  constructor() {
    this.power = 1500;
    this.rating_deviation = 350;
    this.idealTime = []
    this.takenTime = []
    this.deadLine = []
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
    if (localStorage.deadLine) {
      this.deadLine.push(Number(localStorage.deadLine))
    }
    if (localStorage.finishline) {
      this.finishline.push(Number(localStorage.finishline))
    }

    this.updatePower();
  }

  calculateAlpha() {
    this.alpha = 1 / Math.sqrt(1 + (3 * (0.0051 ** 2) * (this.rating_deviation ** 2) / (Math.PI ** 2)))
    localStorage.setItem('alpha', this.alpha.toString())
  }

  getSec = getSec

  eloEfficiency(iTime: number, tTime: number, kFactor: number) {
    let Ea: number = 0;
    let efficiency = 0;

    Ea = 1 / (1 + 10 ** ((iTime / 60 - tTime / 60) / 1200))

    if (tTime > iTime)
      efficiency = kFactor * (0 - Ea)
    else
      efficiency = kFactor * (1 - Ea)

    return Math.max(efficiency, 0)
  }



  addNewItem(iTime: number, tTime: number, dLine: string, fline: string) {

    this.idealTime.push(iTime)
    this.takenTime.push(tTime)
    this.deadLine.push(this.getSec(dLine, true))
    this.finishline.push(this.getSec(fline))

    localStorage.setItem('idealTime', iTime.toString())
    localStorage.setItem('takenTime', tTime.toString())
    localStorage.setItem('deadLine', this.deadLine[0].toString())
    localStorage.setItem('finishline', this.finishline[0].toString())

    if (this.finishline.length % 2 !== 0)
      return

    let sigmaSum = 0;
    this.calculateAlpha();
    let len = this.finishline.length

    for (let i = 1; i <= 2; i++) {

      const iTime = this.idealTime[len - i]
      const ttime = this.takenTime[len - i]

      let victorySum = 0;
      if (this.finishline[len - i] <= this.deadLine[len - 1])
        victorySum++;
      if (ttime <= iTime)
        victorySum++;
      sigmaSum += this.alpha * (victorySum - this.eloEfficiency(iTime, ttime, this.alpha))
    }

    this.rectify();

    this.power += (this.rating_deviation ** 2) * sigmaSum
    this.updatePower();
  }

  rectify() {
    this.idealTime.splice(0)
    this.takenTime.splice(0)
    this.deadLine.splice(0)
    this.finishline.splice(0)
    localStorage.removeItem('itealTime')
    localStorage.removeItem('takenTime')
    localStorage.removeItem('deadLine')
    localStorage.removeItem('finishline')
  }

  updatePower() {
    localStorage.setItem('power', this.power.toString());
    (document.querySelector('.power') as HTMLDivElement).textContent = this.power.toString()
  }

}