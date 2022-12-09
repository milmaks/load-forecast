export interface CoalPowerPlant {
    id: number;
    name: string;
    power: number;
    co2: number;
    fuelPrice: number;
    priceToPowerCurve: [number[], number[], number[], number[], number[]];
    priceToCo2Curve: [number[], number[], number[], number[], number[]];
    Co2ToPowerCurve: [number[], number[], number[], number[], number[]];
}