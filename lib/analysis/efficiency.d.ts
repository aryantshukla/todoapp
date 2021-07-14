export default class Efficiency {
    private len;
    private efficiency;
    private kFactor;
    constructor();
    addNewFinishedItem(iTime: number, tTime: number): void;
    calculatekFactor(len: number): void;
    calculateEfficiency(iTime: number, tTime: number): 0 | undefined;
    updateEfficieny(): void;
}
