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
