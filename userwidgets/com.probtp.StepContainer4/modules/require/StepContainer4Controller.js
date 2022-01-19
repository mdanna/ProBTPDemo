define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[1];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      this.view.preShow = () => {
        this.view.btnNext.onClick = () => {
          globals.definition = this.view.fieldSolution.text || '';
          if(globals.definition){
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.missionId);
            dataObject.addField('WorkflowField', "4");
            dataObject.addField("SolutionDefinition", globals.definition);
            globals.getObjectService().update({dataObject}, () => {
              globals.nextStep(globals.ROLES[0]);
            }, (error) => {
              alert(`Error: ${JSON.stringify(error)}`);
            });
          } else {
            alert("Le champ 'Définition de solution' est obligatoire");
          }
        };
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