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
          this.view.btnNext.onClick = () => {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.wfData.missionId);
            dataObject.addField('WorkflowField', "5");
            globals.getObjectService().update({dataObject}, () => {
              kony.application.dismissLoadingScreen();
              globals.nextStep(globals.ROLES[1]);
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
      if(isCurrentFormForCurrentRole && globals.currentStep === 5){
        this.view.lblReal.text = globals.wfData.real;
        this.view.lblDescription.text = globals.wfData.description;
        this.view.lblJustif.text = globals.wfData.justif;
        this.view.lblEvolution.text = globals.wfData.evolution;
        this.view.lblCible.text = globals.wfData.dateCible;
        this.view.lblReports.text = globals.wfData.reports;
        this.view.lblInitial.text = globals.wfData.dateInitial;
        this.view.lblCrit.text = globals.wfData.crit;
        this.view.lblCompl.text = globals.wfData.compl;
        this.view.lblDefinition.text = globals.wfData.definition;
        this.view.flxContent.forceLayout();
      }
    },

    initGettersSetters() {}
  };
});