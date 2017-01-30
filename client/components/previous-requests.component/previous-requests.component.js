import template from './previous-requests.html';
import './previous-requests.scss';

export default angular.module('previousRequests', []).component('previousRequests', {
    bindings: {
        callback: '&',
        requests:'<'
    },
    template
}).name;
