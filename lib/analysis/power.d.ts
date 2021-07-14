import { getSec } from "../utils/timetaken.js";
export default class Power {
    private power;
    private rating_deviation;
    private idealTime;
    private takenTime;
    private deadLine;
    private finishLine;
    private alpha;
    constructor();
    calculateAlpha(): void;
    getSec: typeof getSec;
    eloEfficiency(iTime: number, tTime: number, kFactor: number): number;
    addNewItem(iTime: number, tTime: number, dLine: string, fline: string): void;
    rectify(): void;
    updatePower(): void;
}
