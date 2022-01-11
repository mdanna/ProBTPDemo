define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[1];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });
      
      this.view.preShow = () => {
        this.view.btnNext.onClick = () => globals.nextStep(globals.ROLES[0]);
      };
      
      this.view.postShow = () => {
        this.updateLayout();
      };
    },

    updateLayout() {
      this.view.flxContent.isVisible = globals.isCurrentFormForCurrentRole();
      this.view.cmpWaitingPage.isVisible = !globals.isCurrentFormForCurrentRole();
    },

    initGettersSetters() {}
  };
});