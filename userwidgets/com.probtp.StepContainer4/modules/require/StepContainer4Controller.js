define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[1];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      this.view.preShow = () => {
        if(!this.initDone){
          this.view.btnNext.onClick = () => {
            globals.wfData.definition = this.view.fieldSolution.text || '';
            if(globals.wfData.definition){
              const dataObject = globals.getDataObject();
              dataObject.addField("primaryKeyField", "MissionId");
              dataObject.addField("MissionId", globals.wfData.missionId);
              dataObject.addField('WorkflowField', "4");
              dataObject.addField("SolutionDefinition", globals.wfData.definition);
              globals.getObjectService().update({dataObject}, () => {
                globals.nextStep(globals.ROLES[0]);
              }, (error) => {
                alert(`Error: ${JSON.stringify(error)}`);
              });
            } else {
              alert("Le champ 'Définition de solution' est obligatoire");
            }
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
      if(isCurrentFormForCurrentRole && globals.currentStep === 4){
        this.view.fieldSolution.text = '';
      }
    },

    initGettersSetters() {}
  };
});