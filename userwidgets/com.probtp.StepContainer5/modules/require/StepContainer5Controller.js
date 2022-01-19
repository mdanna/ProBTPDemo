define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[0];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      this.view.preShow = () => {

        this.view.lblReal.text = globals.real;
        this.view.lblDescription.text = globals.description;
        this.view.lblJustif.text = globals.justif;
        this.view.lblEvolution.text = globals.evolution;
        this.view.lblCible.text = globals.dateCible;
        this.view.lblReports.text = globals.reports;
        this.view.lblInitial.text = globals.dateInitial;
        this.view.lblCrit.text = globals.crit;
        this.view.lblCompl.text = globals.compl;
        this.view.lblDefinition.text = globals.definition;

        if(!this.initDone){
          this.view.btnNext.onClick = () => {
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.missionId);
            dataObject.addField('WorkflowField', "5");
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