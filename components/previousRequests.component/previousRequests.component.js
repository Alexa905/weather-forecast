angular.module('previousRequests', []).component('previousRequests', {
    bindings: {
        callback: '=',
        requests:'<'
    },
    templateUrl: './components/previousRequests.component/previousRequests.component.html'
});
