import ControlPanelComponent from './control-panel.component'

describe('About', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(ControlPanelComponent));

  beforeEach(inject(($injector) => {
    $componentController = $injector.get('$componentController');
  }));

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController(ControlPanelComponent, {

      });
    });

    it('has a name property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('unitsFormat');
    });
  });

});
