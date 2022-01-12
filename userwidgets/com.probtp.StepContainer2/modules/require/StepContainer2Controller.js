define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[0];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });
      
      this.view.preShow = () => {
        if(!this.initDone){
          
          this.view.btnContinue1.onClick = () => {
            this.view.sectionAffectation.enabled = true;
            this.view.sectionAffectation.expand(true);
            this.view.flxButtons1.isVisible = false;
          };
          
          this.view.sectionAffectation.onExpand = (value) => this.view.flxAffectation.isVisible = !!value;
          
          this.view.btnContinue2.onClick = () => {
            this.view.sectionDescription.enabled = true;
            this.view.sectionAffectation.expand(false);
            this.view.sectionDescription.expand(true);
            this.view.flxButtons2.isVisible = false;
          };
          
          this.view.sectionDescription.onExpand = (value) => this.view.flxDescription.isVisible = !!value;

          this.view.btnContinue3.onClick = () => {
            this.view.sectionSuivi.enabled = true;
            this.view.sectionAffectation.expand(false);
            this.view.sectionDescription.expand(false);
            this.view.sectionSuivi.expand(true);
            this.view.flxButtons3.isVisible = false;
          };
          
          this.view.sectionSuivi.onExpand = (value) => this.view.flxSuivi.isVisible = !!value;
          
          this.view.btnNext.onClick = () => {
            //todo save the data here
            globals.nextStep(globals.ROLES[2]);
          };
          
          
          this.initDone = true;
        }
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