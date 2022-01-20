define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[2];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.view.btnNext.onClick =  () => {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.wfData.missionId);
            dataObject.addField('WorkflowField', "7");
            globals.getObjectService().update({dataObject}, () => {
              kony.application.dismissLoadingScreen();
              globals.finalStep();
            }, (error) => {
              kony.application.dismissLoadingScreen();
              globals.errorAlert(`Error: ${error.errmsg}`);
            });
          };
          this.initDone = true;
        }
      };

      this.view.postShow = () => {
        this.updateLayout();
      };
    },

    updateLayout() {
      const isCurrentFormForCurrentRole = globals.isCurrentFormForCurrentRole();
      this.view.flxContent.isVisible = isCurrentFormForCurrentRole;
      this.view.cmpWaitingPage.isVisible = !isCurrentFormForCurrentRole;
      if(isCurrentFormForCurrentRole && globals.currentStep === 7){
        this.view.lblLevel.text = globals.wfData.level;
        this.view.lblEvolution.text = globals.wfData.evolutionReal;
        this.view.lblRef.text = globals.wfData.ref;
        this.view.lblComments.text = globals.wfData.comments;
        this.view.flxContent.forceLayout();
      }
    },

    initGettersSetters() {}
  };
});