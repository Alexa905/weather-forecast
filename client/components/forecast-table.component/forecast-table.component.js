import template from './forecast-table.html';
import './forecast-table.scss';

class controller {
  constructor($filter) {
    "ngInject";
    Object.assign(this, {$filter})
  }

  getDay(item) {
    const date = new Date(item.dt * 1000).toString();
    return date.split(' ')[0];
  };

  isToday(date) {
    const dateStr = this.$filter('date')(date, 'dd.MM');
    const today = this.$filter('date')(Date.now(), 'dd.MM');
    return dateStr === today;
  };

}

export default angular.module('forecastTable', []).component('forecastTable', {
  bindings: {
    data: '<'
  },
  template,
  controller
}).name;

