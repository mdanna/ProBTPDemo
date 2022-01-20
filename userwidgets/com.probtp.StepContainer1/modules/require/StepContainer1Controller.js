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
          this.view.btnCreate.onClick = () => {
            kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
            
            globals.wfData.missionId = this.view.fieldMissionId.text;
            globals.wfData.missionTitle = this.view.fieldMissionTitle.text;
            if(globals.wfData.missionId  && globals.wfData.missionTitle){

              const dataObject = globals.getDataObject();
              dataObject.addField('MissionId', globals.wfData.missionId);
              dataObject.addField('WorkflowField', "1");
              dataObject.addField('MissionTitre', globals.wfData.missionTitle);
              dataObject.addField('MissionEntiteAudit', this.view.selectEntAudit.selection || '');
              dataObject.addField('MissionAudit', this.view.selectAudit.selection || '');
              dataObject.addField('MissionType', this.view.selectMissionType.selection || '');
              this.view.dateMission.getDate() && dataObject.addField('MissionDate', this.view.dateMission.getDate());
              this.view.dateDiffusion.getDate() && dataObject.addField('MissionDateDiffusion', this.view.dateDiffusion.getDate());
              dataObject.addField('MissionCommentaires', this.view.fieldMissionComment.text || '');

              globals.getObjectService().create({dataObject}, () => {
                kony.application.dismissLoadingScreen();
                globals.nextStep(globals.ROLES[0]);
              }, (error) => {
                kony.application.dismissLoadingScreen();
                globals.errorAlert(`Error: ${error.errmsg}`);
              }); 
            } else {
              kony.application.dismissLoadingScreen();
              globals.informationAlert("Les champs 'Identifiant de mission' et 'Titre de mission' sont obligatoires.");
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
      if(isCurrentFormForCurrentRole && globals.currentStep === 1){
        this.view.fieldMissionId.text = '';
        this.view.fieldMissionTitle.text = '';
        this.view.selectEntAudit.selection = 'PRO BTP';
        this.view.selectUniAudit.selection = 'TEST UNIT DEV 1';
        this.view.selectAudit.selection = 'Interne';
        this.view.selectMissionType.selection = 'Interne';
        this.view.dateMission.reset();
        this.view.dateDiffusion.reset();
        this.view.fieldMissionComment.text = '';
      }
    },

    initGettersSetters() {}
  };
});