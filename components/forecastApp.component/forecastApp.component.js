angular.module('forecastApp', ['ngResource', 'forecastChart', 'forecastTable', 'previousRequests', 'controlPanel'])
    .component('forecastApp', {
        templateUrl: './components/forecastApp.component/forecastApp.component.html',
        controller: function ($http, $sce, $window) {
            var ctrl = this;
            var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily/';
            var API_KEY = 'aaf548d72585f31a4f924bd4e894d21f';
            $sce.trustAsResourceUrl(URL);

            ctrl.history = ($window.localStorage.getItem('weatherHistory') &&
                angular.fromJson($window.localStorage.getItem('weatherHistory'))) || {};

            this.setPreviousRequests = function () {
                this.previousRequests = [];
                if (Object.keys(ctrl.history).length) {
                    for (var key in ctrl.history) {
                        if (ctrl.history.hasOwnProperty(key)) {
                            ctrl.previousRequests.push(key);
                        }
                    }
                }
            };

            ctrl.showForecast = function (city, units) {
                var cityDataInHistory = ctrl.history[city];

                function dateIsExpared(date) {
                    var expireDate = Date.now() - 600000; //  600000ms === 10 minutes
                    return date < expireDate;
                }

                if (cityDataInHistory && !dateIsExpared(cityDataInHistory.date)) {
                    ctrl.data = cityDataInHistory.data;
                    return;
                }

                units = units || cityDataInHistory.data.units;
                var queryParams = {
                    units: units.system,
                    q: city,
                    appid: API_KEY,
                    cnt: 7,
                    callback: 'JSON_CALLBACK'
                };

                function getUrl(url, queryParams) {
                    var params;
                    if (queryParams && Object.keys(queryParams).length) {
                        params = Object.keys(queryParams).map(function (key) {
                            return key.concat('=', queryParams[key]);
                        }).join('&');
                    }
                    return !params ? url : url.concat('?', params);
                }

                $http.jsonp(getUrl(URL, queryParams)).then(function (data) {
                    ctrl.requestError = null;
                    ctrl.data = data.data;
                    ctrl.data.units = units;
                    ctrl.history[city] = {date: Date.now(), data: ctrl.data};
                    $window.localStorage.setItem('weatherHistory', JSON.stringify(ctrl.history));
                    ctrl.setPreviousRequests();
                }).catch(function (e) {
                    ctrl.requestError = {
                        city: city,
                        status: e.status,
                        text: e.statusText
                    };
                });
            };

            this.setPreviousRequests();
        }
    });


