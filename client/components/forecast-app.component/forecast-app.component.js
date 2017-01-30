import template from './forecast-app.html';
import './forecast-app.scss';
import angular from 'angular';
import 'normalize.css';
import forecastChart from '../forecast-chart.component/forecast-chart.component';
import forecastTable from '../forecast-table.component/forecast-table.component';
import previousRequests from '../previous-requests.component/previous-requests.component';
import controlPanel from '../control-panel.component/control-panel.component';
import ngResource from 'angular-resource';

class controller {
  static URL = 'http://api.openweathermap.org/data/2.5/forecast/daily/';
  static API_KEY = 'aaf548d72585f31a4f924bd4e894d21f';

  constructor($http, $window) {
    "ngInject";
    let history = ($window.localStorage.getItem('weatherHistory') &&
      angular.fromJson($window.localStorage.getItem('weatherHistory'))) || {};
    Object.assign(this, {$http, $window, history});

  }

  $onInit() {
    this._init();
  }

  _init() {
    this._setPreviousRequests();
  }

  _setPreviousRequests() {
    this.previousRequests = Object.keys(this.history).map(key => key);
  }

  showForecast(city, units) {
    let cityDataInHistory = this.history[city];

    const dateIsExpared = (date) => {
      let expireDate = Date.now() - 1800000; //  1800000ms === 30 minutes
      return date < expireDate;
    };

    if (cityDataInHistory && !dateIsExpared(cityDataInHistory.date)) {
      this.data = cityDataInHistory.data;
      return;
    }

    units = units || cityDataInHistory.data.units;
    let params = {
      units: units.system,
      q: city,
      appid: controller.API_KEY,
      cnt: 7
    };

    this.$http.get(controller.URL, {params}).then(({data}) => {
      this.requestError = null;
      this.data = data;
      this.data.units = units;
      this.history[city] = {date: Date.now(), data};
      this.$window.localStorage.setItem('weatherHistory', JSON.stringify(this.history));
      this._setPreviousRequests();
    }).catch(({status, statusText:text}) => {
      this.requestError = {city, status, text};
    });
  };
}

export default angular.module('forecastApp', [
  ngResource, forecastChart, forecastTable, previousRequests, controlPanel
]).component('forecastApp', {
  template,
  controller
}).name;

angular.element(function () {
  angular.bootstrap(document, ['forecastApp']);
});
