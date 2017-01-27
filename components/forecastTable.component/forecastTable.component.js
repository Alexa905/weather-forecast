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
