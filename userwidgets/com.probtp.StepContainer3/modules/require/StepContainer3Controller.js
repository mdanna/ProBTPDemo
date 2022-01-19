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
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.missionId);
            dataObject.addField('WorkflowField', "3");
            
            globals.real = this.view.checkboxReal.getValue();
            globals.description = this.view.fieldDescription.text || '';
            globals.justif = this.view.selectJustif.selection;
            globals.evolution = this.view.checkboxEvolution.getValue();
            globals.dateCible = this.view.dateCible.getDate();
            globals.reports = this.view.fieldReports.text || '';
            globals.dateInitial = this.view.dateInitial.getDate();
            globals.crit = this.view.fieldCrit.text || '';
            globals.compl = this.view.fieldCompl.text || '';
            
            dataObject.addField("SolutionReaAEtape", globals.real);
            dataObject.addField("SolutionDescription", globals.description);
            dataObject.addField("SolutionTypeJusti", globals.justif);
            dataObject.addField("SolutionEvolutionInfo", globals.evolution);
            dataObject.addField("SolutionDateCible", globals.dateCible);
            dataObject.addField("SolutionNbReports", globals.reports);
            dataObject.addField("SolutionDateCibleInitial", globals.dateInitial);
            dataObject.addField("SolutionCritereLibre", globals.crit);
            dataObject.addField("SolutionComplement", globals.compl);

            globals.getObjectService().update({dataObject}, () => {
              globals.nextStep(globals.ROLES[1]);
            }, (error) => {
              alert(`Error: ${JSON.stringify(error)}`);
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
      this.view.flxContent.isVisible = globals.isCurrentFormForCurrentRole();
      this.view.cmpWaitingPage.isVisible = !globals.isCurrentFormForCurrentRole();
    },

    initGettersSetters() {}
  };
});