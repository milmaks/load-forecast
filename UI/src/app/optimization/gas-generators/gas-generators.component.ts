import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EChartsOption, util } from 'echarts';
import { GasPowerPlant } from 'src/app/types';

const SymbolSize = 20;
const cfuelToPower = [
  [0.2, 1],
  [0.4, 0.65],
  [0.6, 0.4],
  [0.8, 0.25],
  [1, 0.2],
];
const cpriceToTon = [
  [0.2, 1],
  [0.4, 0.95],
  [0.6, 0.8],
  [0.8, 0.6],
  [1, 0.2],
];
const ctonToPower = [
  [0.2, 0.2],
  [0.4, 0.25],
  [0.6, 0.4],
  [0.8, 0.65],
  [1, 1],
];

let fuelToPower = [
  [0.2, 1],
  [0.4, 0.65],
  [0.6, 0.4],
  [0.8, 0.25],
  [1, 0.2],
];

let priceToTon = [
  [0.2, 1],
  [0.4, 0.95],
  [0.6, 0.8],
  [0.8, 0.6],
  [1, 0.2],
]

let tonToPower = [
  [0.2, 0.2],
  [0.4, 0.25],
  [0.6, 0.4],
  [0.8, 0.65],
  [1, 1],
]

@Component({
  selector: 'app-gas-generators',
  templateUrl: './gas-generators.component.html',
  styleUrls: ['./gas-generators.component.css']
})
export class GasGeneratorsComponent {
  @Input() powerPlantsList: GasPowerPlant[] = [];

  panelOpenState = false;

  updatePositionChart1: any = null;
  smoothCurveChart1 = true;
  updateFunction1: any = null;

  updatePositionChart2: any = null;
  smoothCurveChart2 = true;
  updateFunction2: any = null;

  updatePositionChart3: any = null;
  smoothCurveChart3 = true;
  updateFunction3: any = null;

  fuelToPowerRatioChart = {
    value0: fuelToPower[0][1],
    value1: fuelToPower[1][1],
    value2: fuelToPower[2][1],
    value3: fuelToPower[3][1],
    value4: fuelToPower[4][1],
    selector: this.smoothCurveChart1
  }

  priceToTonRatioChart = {
    value0: priceToTon[0][1],
    value1: priceToTon[1][1],
    value2: priceToTon[2][1],
    value3: priceToTon[3][1],
    value4: priceToTon[4][1],
    selector: this.smoothCurveChart2
  }

  tonToPowerRatioChart = {
    value0: tonToPower[0][1],
    value1: tonToPower[1][1],
    value2: tonToPower[2][1],
    value3: tonToPower[3][1],
    value4: tonToPower[4][1],
    selector: this.smoothCurveChart3
  }

  chart1 = new FormGroup({
    value0: new FormControl(fuelToPower[0][1], Validators.required),
    value1: new FormControl(fuelToPower[1][1], Validators.required),
    value2: new FormControl(fuelToPower[2][1], Validators.required),
    value3: new FormControl(fuelToPower[3][1], Validators.required),
    value4: new FormControl(fuelToPower[4][1], Validators.required),
    selector: new FormControl(this.smoothCurveChart1, Validators.required),
  });

  chart2 = new FormGroup({
    value0: new FormControl(priceToTon[0][1], Validators.required),
    value1: new FormControl(priceToTon[1][1], Validators.required),
    value2: new FormControl(priceToTon[2][1], Validators.required),
    value3: new FormControl(priceToTon[3][1], Validators.required),
    value4: new FormControl(priceToTon[4][1], Validators.required),
    selector: new FormControl(this.smoothCurveChart2, Validators.required),
  });

  chart3 = new FormGroup({
    value0: new FormControl(tonToPower[0][1], Validators.required),
    value1: new FormControl(tonToPower[1][1], Validators.required),
    value2: new FormControl(tonToPower[2][1], Validators.required),
    value3: new FormControl(tonToPower[3][1], Validators.required),
    value4: new FormControl(tonToPower[4][1], Validators.required),
    selector: new FormControl(this.smoothCurveChart3, Validators.required),
  });

  powerPlant = new FormGroup({
    name: new FormControl("", Validators.required),
    power: new FormControl(0, Validators.required),
    co2: new FormControl(0, Validators.required),
    fuel: new FormControl(0, Validators.required),
  });

  optionsChart1: EChartsOption = {
    title: {
      text: 'Fuel to power curve',
    },
    tooltip: {
      triggerOn: 'none',
      formatter: (params: any) =>
        'X: ' + params.fuelToPower[0].toFixed(2) + '<br>Y: ' + params.fuelToPower[1].toFixed(2),
    },
    grid: {},
    xAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: 'MW'
    },
    yAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: '$'
    },
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: this.smoothCurveChart1,
        symbolSize: SymbolSize,
        data: fuelToPower,
      },
    ],
  };

  onFuelToPowerChartReady(myChart: any) {
    setTimeout(() => {
      myChart.setOption({
        graphic: util.map(fuelToPower, (item, fuelToPowerIndex) => {
          return {
            type: 'circle',
            position: myChart.convertToPixel({ gridIndex: 0 }, item),
            shape: {
              cx: 0,
              cy: 0,
              r: SymbolSize / 2,
            },
            invisible: true,
            
            onmousemove: util.curry<(fuelToPowerIndex: any) => void, number>(showTooltip, fuelToPowerIndex!),
            onmouseout: util.curry<(fuelToPowerIndex: any) => void, number>(hideTooltip, fuelToPowerIndex!),
            z: 100,
          };
        }),
      });
    }, 0);

    const showTooltip = (fuelToPowerIndex: any) => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        fuelToPowerIndex,
      });
    };

    const hideTooltip = () => {
      myChart.dispatchAction({
        type: 'hideTip',
      });
    };

    const updatePosition = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: fuelToPower
          }
        ]
      });
    }

    const updateFunction = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            smooth: this.smoothCurveChart1
          }
        ]
      });
    }

    this.updatePositionChart1 = updatePosition;
    this.updateFunction1 = updateFunction;
  }

  optionsChart2: EChartsOption = {
    title: {
      text: 'Price to ton CO2 curve',
    },
    tooltip: {
      triggerOn: 'none',
      formatter: (params: any) =>
        'X: ' + params.fuelToPower[0].toFixed(2) + '<br>Y: ' + params.fuelToPower[1].toFixed(2),
    },
    grid: {},
    xAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: 't'
    },
    yAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: '$'
    },
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: this.smoothCurveChart2,
        symbolSize: SymbolSize,
        data: priceToTon,
      },
    ],
  };

  onPriceToTonChartReady(myChart: any) {
    setTimeout(() => {
      myChart.setOption({
        graphic: util.map(fuelToPower, (item, fuelToPowerIndex) => {
          return {
            type: 'circle',
            position: myChart.convertToPixel({ gridIndex: 0 }, item),
            shape: {
              cx: 0,
              cy: 0,
              r: SymbolSize / 2,
            },
            invisible: true,
            
            onmousemove: util.curry<(fuelToPowerIndex: any) => void, number>(showTooltip, fuelToPowerIndex!),
            onmouseout: util.curry<(fuelToPowerIndex: any) => void, number>(hideTooltip, fuelToPowerIndex!),
            z: 100,
          };
        }),
      });
    }, 0);

    const showTooltip = (fuelToPowerIndex: any) => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        fuelToPowerIndex,
      });
    };

    const hideTooltip = () => {
      myChart.dispatchAction({
        type: 'hideTip',
      });
    };

    const updatePosition = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: priceToTon
          }
        ]
      });
    }

    const updateFunction = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            smooth: this.smoothCurveChart2
          }
        ]
      });
    }

    this.updatePositionChart2 = updatePosition;
    this.updateFunction2 = updateFunction;
  }

  optionsChart3: EChartsOption = {
    title: {
      text: 'Ton of CO2 to power curve',
    },
    tooltip: {
      triggerOn: 'none',
      formatter: (params: any) =>
        'X: ' + params.fuelToPower[0].toFixed(2) + '<br>Y: ' + params.fuelToPower[1].toFixed(2),
    },
    grid: {},
    xAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: 'MW'
    },
    yAxis: {
      min: 0,
      max: 1,
      type: 'value',
      axisLine: { onZero: false },
      name: 't'
    },
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: this.smoothCurveChart3,
        symbolSize: SymbolSize,
        data: tonToPower,
      },
    ],
  };

  onTonToPowerChartReady(myChart: any) {
    setTimeout(() => {
      myChart.setOption({
        graphic: util.map(fuelToPower, (item, fuelToPowerIndex) => {
          return {
            type: 'circle',
            position: myChart.convertToPixel({ gridIndex: 0 }, item),
            shape: {
              cx: 0,
              cy: 0,
              r: SymbolSize / 2,
            },
            invisible: true,
            
            onmousemove: util.curry<(fuelToPowerIndex: any) => void, number>(showTooltip, fuelToPowerIndex!),
            onmouseout: util.curry<(fuelToPowerIndex: any) => void, number>(hideTooltip, fuelToPowerIndex!),
            z: 100,
          };
        }),
      });
    }, 0);

    const showTooltip = (fuelToPowerIndex: any) => {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        fuelToPowerIndex,
      });
    };

    const hideTooltip = () => {
      myChart.dispatchAction({
        type: 'hideTip',
      });
    };

    const updatePosition = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: tonToPower
          }
        ]
      });
    }

    const updateFunction = () => {
      myChart.setOption({
        series: [
          {
            id: 'a',
            smooth: this.smoothCurveChart3
          }
        ]
      });
    }

    this.updatePositionChart3 = updatePosition;
    this.updateFunction3 = updateFunction;
  }

  changeValueChart1(index: number, event: any) {
    fuelToPower[index][1] = Number(event.target.value);
    this.updatePositionChart1();
  }

  functionTypeChanged1(event: any) {
    this.smoothCurveChart1 = (event.target.value == "true");
    this.updateFunction1();
  }

  changeValueChart2(index: number, event: any) {
    priceToTon[index][1] = Number(event.target.value);
    this.updatePositionChart2();
  }

  functionTypeChanged2(event: any) {
    this.smoothCurveChart2 = (event.target.value == "true");
    this.updateFunction2();
  }

  changeValueChart3(index: number, event: any) {
    tonToPower[index][1] = Number(event.target.value);
    this.updatePositionChart3();
  }

  functionTypeChanged3(event: any) {
    this.smoothCurveChart3 = (event.target.value == "true");
    this.updateFunction3();
  }

  addNewGenerator() {
    if(this.powerPlant.valid)
    {
      let gen: GasPowerPlant = {
        id: this.powerPlantsList.length,
        name: this.powerPlant.controls.name.value!,
        power: this.powerPlant.controls.power.value!,
        co2: this.powerPlant.controls.co2.value!,
        fuelPrice: this.powerPlant.controls.fuel.value!,
        priceToPowerCurve: fuelToPower,
        priceToCo2Curve: priceToTon,
        Co2ToPowerCurve: tonToPower,
        priceToPowerCurveQuadratic: this.smoothCurveChart1,
        priceToCo2CurveQuadratic: this.smoothCurveChart2,
        Co2ToPowerCurveQuadratic: this.smoothCurveChart3,
      }

      console.log(gen);

      this.powerPlantsList.push(gen);

      this.powerPlant.reset();
      this.resetCharts();
    }
  }

  removePowerPlant(id: number) {
    this.powerPlantsList.splice(id,1);
  }

  resetCharts() {
    fuelToPower = cfuelToPower;
    priceToTon = cpriceToTon;
    tonToPower = ctonToPower;
    this.updatePositionChart1();
    this.updatePositionChart2();
    this.updatePositionChart3();
    this.smoothCurveChart1 = true;
    this.smoothCurveChart2 = true;
    this.smoothCurveChart3 = true;
    this.updateFunction1();
    this.updateFunction2();
    this.updateFunction3();
    
    this.chart1.reset(this.fuelToPowerRatioChart);
    this.chart2.reset(this.priceToTonRatioChart);
    this.chart3.reset(this.tonToPowerRatioChart);
  }
}
