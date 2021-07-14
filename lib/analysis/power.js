import { getSec } from "../utils/timetaken.js";
export default class Power {
    power;
    rating_deviation;
    idealTime;
    takenTime;
    deadLine;
    finishLine;
    alpha;
    constructor() {
        this.power = 1500;
        this.rating_deviation = 350;
        this.idealTime = [];
        this.takenTime = [];
        this.deadLine = [];
        this.finishLine = [];
        this.alpha = 1 / Math.sqrt(1 + (3 * (0.0051 ** 2) * (this.rating_deviation ** 2) / (Math.PI ** 2)));
        if (localStorage.power) {
            this.power = Number(localStorage.power);
        }
        if (localStorage.rating_deviation) {
            this.rating_deviation = Number(localStorage.rating_deviation);
        }
        if (localStorage.alpha) {
            this.alpha = Number(this.alpha);
        }
        if (localStorage.deadLine) {
            this.deadLine.push(Number(localStorage.deadLine));
        }
        if (localStorage.finishLine) {
            this.finishLine.push(Number(localStorage.finishLine));
        }
        this.updatePower();
    }
    calculateAlpha() {
        this.alpha = 1 / Math.sqrt(1 + (3 * (0.0051 ** 2) * (this.rating_deviation ** 2) / (Math.PI ** 2)));
        localStorage.setItem('alpha', this.alpha.toString());
    }
    getSec = getSec;
    eloEfficiency(iTime, tTime, kFactor) {
        let Ea = 0;
        let efficiency = 0;
        Ea = 1 / (1 + 10 ** ((iTime / 60 - tTime / 60) / 1200));
        if (tTime > iTime)
            efficiency = kFactor * (0 - Ea);
        else
            efficiency = kFactor * (1 - Ea);
        return Math.max(efficiency, 0);
    }
    addNewItem(iTime, tTime, dLine, fline) {
        this.idealTime.push(iTime);
        this.takenTime.push(tTime);
        this.deadLine.push(this.getSec(dLine, true));
        this.finishLine.push(this.getSec(fline));
        localStorage.setItem('idealTime', iTime.toString());
        localStorage.setItem('takenTime', tTime.toString());
        localStorage.setItem('deadLine', this.deadLine[0].toString());
        localStorage.setItem('finishLine', this.finishLine[0].toString());
        if (this.finishLine.length % 2 !== 0)
            return;
        let sigmaSum = 0;
        this.calculateAlpha();
        let len = this.finishLine.length;
        for (let i = 1; i <= 2; i++) {
            const iTime = this.idealTime[len - i];
            const tTime = this.takenTime[len - i];
            let victorySum = 0;
            if (this.finishLine[len - i] <= this.deadLine[len - 1])
                victorySum++;
            if (tTime <= iTime)
                victorySum++;
            sigmaSum += this.alpha * (victorySum - this.eloEfficiency(iTime, tTime, this.alpha));
        }
        sigmaSum /= 10;
        this.rectify();
        this.power = this.power + ((this.rating_deviation ** 2) * sigmaSum) / 10;
        this.updatePower();
    }
    rectify() {
        this.idealTime.splice(0);
        this.takenTime.splice(0);
        this.deadLine.splice(0);
        this.finishLine.splice(0);
        localStorage.removeItem('itealTime');
        localStorage.removeItem('takenTime');
        localStorage.removeItem('deadLine');
        localStorage.removeItem('finishLine');
    }
    updatePower() {
        localStorage.setItem('power', this.power.toString());
        document.querySelector('.power').textContent = this.power.toString();
    }
}
//# sourceMappingURL=power.js.map