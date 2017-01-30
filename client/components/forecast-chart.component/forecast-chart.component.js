import template from './forecast-chart.html';
import 'angular-chart.js';


class controller {
  constructor($filter, $element) {
    "ngInject";
    Object.assign(this, {$element, $filter});
  }

  $onInit() {
    this._initChart();
  }

  _initChart() {
    this.chart = {
      data: [this._getMaxValues(), this._getMinValues()],
      series: ['max', 'min'],
      labels: this._getLabels()
    };
  }

  $onChanges() {
    this._initChart();
  }

  _getMaxValues() {
    return this.data.list.map(({temp: {max}}) => Math.ceil(max))
  };

  _getMinValues() {
    return this.data.list.map(({temp: {min}}) => Math.ceil(min))
  };

  _getLabels() {
    return this.data.list.map(({dt: date}) => this.$filter('date')(date * 1000, 'dd.MM.yyyy'));
  }
}

const name = 'forecastChart';
export default angular.module(name, ['chart.js']).component(name, {
  bindings: {data: '<'},
  template,
  controller
})
  .config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']});
  })
  .name;
