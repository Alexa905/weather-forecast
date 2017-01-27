angular.module('controlPanel', []).component('controlPanel', {
    bindings: {
        callback: '='
    },
    templateUrl: './components/controlPanel.component/controlPanel.component.html',
    controller: function () {
        var ctrl = this;
        ctrl.showForecast = function(city, units){
            ctrl.callback(city, units);
            ctrl.city = '';
        };
        ctrl.unitsFormat = [{system: 'imperial', units: 'Fahrenheit', char: "\u2109"},
            {system: 'metric', units: 'Celsius', char: "\u2103"},
            {units: 'Kelvin', system: 'standard', char: "\u212A"}];
        ctrl.selectedUnit = ctrl.unitsFormat[1];

    }
});

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



angular.module('forecastChart', []).component('forecastChart', {
    bindings: {
        data: '<'
    },
    templateUrl: './components/forecastChart.component/forecastChart.component.html',
    controller: function ($filter) {
        var ctrl = this;

        this.getLabels = function getLabels() {
            return ctrl.data.list.map(function (item) {
                return $filter('date')(item.dt * 1000, 'dd.MM.yyyy');
            });
        };

        this.getMinValues = function getMinValues() {
            return ctrl.data.list.map(function (item) {
                return item.temp.min;
            });
        };

        this.getMaxValues = function getMaxValues() {
            return ctrl.data.list.map(function (item) {
                return item.temp.max;
            });
        };

        this.setChartData = function () {
            return {
                "datasets": [{
                    "label": 'day',
                    "data": this.getMaxValues(),
                    "pointStrokeColor": "#fff",
                    "fillColor": "rgba(255,255,153,0.2)",
                    "pointColor": "rgba(204,204,0,1)",
                    "strokeColor": "rgba(255,255,153,1)"
                }, {
                    "label": 'night',
                    "data": this.getMinValues(),
                    "pointStrokeColor": "#fff",
                    "fillColor": "rgba(135,206,250,0.2)",
                    "pointColor": "rgba(0,0,255,1)",
                    "strokeColor": "rgba(70,130,180,0.8)"
                }],
                "labels": this.getLabels()
            };
        };

        var ctx = document.getElementById('canvas').getContext('2d');
        var options = {multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>", responsive: true};
        var chart = new Chart(ctx).Line(ctrl.setChartData(), options);

        this.$onChanges = function () {
            chart.destroy();
            chart = new Chart(ctx).Line(ctrl.setChartData(), options);
        };
    }
});

angular.module('forecastTable', []).component('forecastTable', {
    bindings: {
        data: '<'
    },
    templateUrl: './components/forecastTable.component/forecastTable.component.html',
    controller: function($filter){
        this.getDay = function(item){
            var date = new Date(item.dt * 1000).toString();
            return  date.split(' ')[0];
        };

        this.isToday = function(date){
            var dateStr = $filter('date')(date, 'dd.MM');
            var today = $filter('date')(Date.now(), 'dd.MM');
            return dateStr === today;
        };
    }
});

angular.module('previousRequests', []).component('previousRequests', {
    bindings: {
        callback: '=',
        requests:'<'
    },
    templateUrl: './components/previousRequests.component/previousRequests.component.html'
});
