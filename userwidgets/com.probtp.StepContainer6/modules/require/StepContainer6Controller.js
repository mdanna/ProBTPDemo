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
          this.view.btnNext.onClick =  () => {
            globals.wfData.level = this.view.selectLevel.selection;
            globals.wfData.evolutionReal = this.view.checkboxEvolution.getValue();
            globals.wfData.ref = this.view.fieldRef.text || '';
            globals.wfData.comments = this.view.fieldComment.text || '';

            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.wfData.missionId);
            dataObject.addField('WorkflowField', "6");
            
            dataObject.addField("RealisationNiveau", globals.wfData.level);
            dataObject.addField("RealisationEvolutionInfo", globals.wfData.evolutionReal);
            dataObject.addField("RealisationEvolutionRef", globals.wfData.ref);
            dataObject.addField("RealisationCommentaires", globals.wfData.comments);
            globals.getObjectService().update({dataObject}, () => {
              globals.nextStep(globals.ROLES[2]);
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
      const isCurrentFormForCurrentRole = globals.isCurrentFormForCurrentRole();
      this.view.flxContent.isVisible = isCurrentFormForCurrentRole;
      this.view.cmpWaitingPage.isVisible = !isCurrentFormForCurrentRole;
      if(isCurrentFormForCurrentRole && globals.currentStep === 6){
        this.view.selectLevel.selection = 'Development';
        this.view.checkboxEvolution.selection = 'right';
        this.view.fieldRef.text = '';
        this.view.fieldComment.text = '';
      }
    },

    initGettersSetters() {}
  };
});