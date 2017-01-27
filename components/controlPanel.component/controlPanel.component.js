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
