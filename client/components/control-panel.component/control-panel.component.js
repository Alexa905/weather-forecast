import template from './control-panel.html';
import './control-panel.scss';
class controller {
  unitsFormat = [
    {system: 'imperial', units: 'Fahrenheit', char: "\u2109"},
    {system: 'metric', units: 'Celsius', char: "\u2103"},
    {units: 'Kelvin', system: 'standard', char: "\u212A"}
  ];

  showForecast(city, units) {
    this.callback({city, units});
    this.city = '';
  };

  constructor() {
    this.selectedUnit = this.unitsFormat[1];
  }
}
export default angular.module('controlPanel', []).component('controlPanel', {
  bindings: { callback: '&' },
  template,
  controller
}).name;
