export interface CoalPowerPlant {
    id: number;
    name: string;
    power: number;
    co2: number;
    fuelPrice: number;
    priceToPowerCurve: number[][];
    priceToPowerCurveQuadratic: boolean;
    priceToCo2Curve: number[][];
    priceToCo2CurveQuadratic: boolean;
    Co2ToPowerCurve: number[][];
    Co2ToPowerCurveQuadratic: boolean;
}

export interface GasPowerPlant {
    id: number;
    name: string;
    power: number;
    co2: number;
    fuelPrice: number;
    priceToPowerCurve: number[][];
    priceToPowerCurveQuadratic: boolean;
    priceToCo2Curve: number[][];
    priceToCo2CurveQuadratic: boolean;
    Co2ToPowerCurve: number[][];
    Co2ToPowerCurveQuadratic: boolean;
}

export interface TrainingDates {
    dateFrom: string;
    dateTo: string;
}