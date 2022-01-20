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
          this.view.btnNext.onClick = () => {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.wfData.missionId);
            dataObject.addField('WorkflowField', "3");
            
            globals.wfData.real = this.view.checkboxReal.getValue();
            globals.wfData.description = this.view.fieldDescription.text || '';
            globals.wfData.justif = this.view.selectJustif.selection;
            globals.wfData.evolution = this.view.checkboxEvolution.getValue();
            globals.wfData.dateCible = this.view.dateCible.getDate() || '';
            globals.wfData.reports = this.view.fieldReports.text || '';
            globals.wfData.dateInitial = this.view.dateInitial.getDate() || '';
            globals.wfData.crit = this.view.fieldCrit.text || '';
            globals.wfData.compl = this.view.fieldCompl.text || '';
            
            dataObject.addField("SolutionReaAEtape", this.view.checkboxReal.getBooleanValue());
            dataObject.addField("SolutionDescription", globals.wfData.description);
            dataObject.addField("SolutionTypeJusti", globals.wfData.justif);
            dataObject.addField("SolutionEvolutionInfo", this.view.checkboxEvolution.getBooleanValue());
            globals.wfData.dateCible && dataObject.addField("SolutionDateCible", globals.wfData.dateCible);
            dataObject.addField("SolutionNbReports", globals.wfData.reports);
            globals.wfData.dateInitial && dataObject.addField("SolutionDateCibleInitial", globals.wfData.dateInitial);
            dataObject.addField("SolutionCritereLibre", globals.wfData.crit);
            dataObject.addField("SolutionComplement", globals.wfData.compl);

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
      if(isCurrentFormForCurrentRole && globals.currentStep === 3){
        this.view.checkboxReal.selection = "right";
        this.view.fieldDescription.text = '';
        this.view.selectJustif.selection = 'Justificatif1';
        this.view.checkboxEvolution.selection = "right";
        this.view.dateCible.reset();
        this.view.fieldReports.text = '';
        this.view.dateInitial.reset();
        this.view.fieldCrit.text = '';
        this.view.fieldCompl.text = '';
      }
    },

    initGettersSetters() {}
  };
});