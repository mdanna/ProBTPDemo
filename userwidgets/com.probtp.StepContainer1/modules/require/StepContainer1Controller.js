define(function() {
  //this is the role that executes the current step
  const STEP_ROLE = globals.ROLES[0];

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      this.view.preShow = () => {
        this.view.fieldMissionId.text = '';
        this.view.fieldMissionTitle.text = '';
        
        if(!this.initDone){
          this.view.btnCreate.onClick = () => {
            const missionId = this.view.fieldMissionId.text;
            const missionTitle = this.view.fieldMissionTitle.text;
            if(missionId && missionTitle){

              const dataObject = globals.getDataObject();
              dataObject.addField('MissionId', missionId);
              dataObject.addField('WorkflowField', "1");
              dataObject.addField('MissionTitre', missionTitle);
              dataObject.addField('MissionEntiteAudit', this.view.selectEntAudit.selection || '');
              dataObject.addField('MissionAudit', this.view.selectAudit.selection || '');
              dataObject.addField('MissionType', this.view.selectMissionType.selection || '');
              dataObject.addField('MissionDate', this.view.dateMission.getDate() || '');
              dataObject.addField('MissionDateDiffusion', this.view.dateDiffusion.getDate() || '');
              dataObject.addField('MissionCommentaires', this.view.fieldMissionComment.text || '');

              globals.getObjectService().create({dataObject}, () => {
                eventManager.publish('eventNewMission', {missionId, missionTitle});
                globals.nextStep(globals.ROLES[0]);
              }, (error) => {
                alert(`Error: ${JSON.stringify(error)}`);
              }); 
            } else {
              alert("Les champs 'Identifiant de mission' et 'Titre de mission' sont obligatoires.");
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
      this.view.flxContent.isVisible = globals.isCurrentFormForCurrentRole();
      this.view.cmpWaitingPage.isVisible = !globals.isCurrentFormForCurrentRole();
    },

    initGettersSetters() {}
  };
});