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

          this.view.btnContinue1.onClick = () => {
            this.view.sectionAffectation.enabled = true;
            this.view.sectionAffectation.expand(true);
            this.view.flxButtons1.isVisible = false;
          };

          this.view.sectionAffectation.onExpand = (value) => this.view.flxAffectation.isVisible = !!value;

          this.view.btnContinue2.onClick = () => {
            if(this.view.fieldRecoId.text && this.view.fieldRecoInt.text){
              this.view.sectionDescription.enabled = true;
              this.view.sectionAffectation.expand(false);
              this.view.sectionDescription.expand(true);
              this.view.flxButtons2.isVisible = false;
            } else {
              alert("Les champs 'Identifiant de RECO' et 'Intitulé de RECO' sont obligatoires.");
            }
          };

          this.view.sectionDescription.onExpand = (value) => this.view.flxDescription.isVisible = !!value;

          this.view.btnContinue3.onClick = () => {
            this.view.sectionSuivi.enabled = true;
            this.view.sectionAffectation.expand(false);
            this.view.sectionDescription.expand(false);
            this.view.sectionSuivi.expand(true);
            this.view.flxButtons3.isVisible = false;
          };

          this.view.sectionSuivi.onExpand = (value) => this.view.flxSuivi.isVisible = !!value;

          this.view.btnNext.onClick = () => {
            const dataObject = globals.getDataObject();
            dataObject.addField("primaryKeyField", "MissionId");
            dataObject.addField("MissionId", globals.wfData.missionId);
            dataObject.addField('WorkflowField', "2");
            
            //Mission
            dataObject.addField("MissionResponsible", this.view.fieldMissionResp.text);
            dataObject.addField("MissionLienRapport", this.view.fieldLink.text || '');
            
            //Affectation
            dataObject.addField("Reco1Id", this.view.fieldRecoId.text);
            dataObject.addField("Reco1Intitule", this.view.fieldRecoInt.text);
            dataObject.addField("Reco1UniteDest", this.view.selectEntDest.selection);
            dataObject.addField("Reco1EnRelationAvec", this.view.selectRel.selection);
            dataObject.addField("Reco1CoordinateurRisques", this.view.fieldCoord.text || '');
            dataObject.addField("Reco1Hierarchie", this.view.selectHierarchy.selection);
            dataObject.addField("Reco1DateMission", this.view.dateMission.getDate());
            dataObject.addField("Reco1CommantaireAffect", this.view.fieldComment1.text || '');
            
            //Description
            dataObject.addField("Reco1Recommendation", this.view.fieldRecommendation.text || '');
            dataObject.addField("Reco1Priorite", this.view.selectPriority.selection);
            dataObject.addField("Reco1Risque", this.view.selectRisk.selection);
            dataObject.addField("Reco1AxeAmelioration", this.view.selectAme.selection);
            dataObject.addField("Reco1Domaine", this.view.selectDom.selection);
            dataObject.addField("Reco1SousDomaine", this.view.selectSousdom.selection);
            dataObject.addField("Reco1DateEcheance", this.view.dateRecomm.getDate());
            dataObject.addField("Reco1Associe", this.view.fieldAssoc.text || '');
            dataObject.addField("Reco1CommentaireDesc", this.view.fieldComment2.text || '');
            
            //Suivi
            dataObject.addField("Reco1FinRealisation", this.view.checkboxFin.getValue());
            dataObject.addField("Reco1FinRealisationDate", this.view.dateFin.getDate());
            dataObject.addField("Reco1ConclusionSuivi", this.view.selectConclusion.selection);
            dataObject.addField("Reco1CommentaireSuivi", this.view.fieldComment3.text || '');
            dataObject.addField("Reco1CreitereLibre", this.view.selectCriteria.selection);
            
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
      
      if(isCurrentFormForCurrentRole && globals.currentStep === 2){
        this.view.fieldMissionId.text = globals.wfData.missionId;
        this.view.fieldMissionId.setEnabled(false);
        this.view.fieldMissionTitle.text = globals.wfData.missionTitle;
        this.view.fieldMissionTitle.setEnabled(false);
        this.view.fieldLink.text = '';
        this.view.fieldMissionResp.text = 'Ambroise Thomas';
        this.view.fieldMissionResp.setEnabled(false);
        this.view.flxButtons1.isVisible = true;

        this.view.sectionAffectation.enabled = false;
        this.view.flxAffectation.isVisible = false;
        this.view.fieldRecoId.text = '';
        this.view.fieldRecoInt.text = '';
        this.view.selectEntDest.selection = 'PRO BTP';
        this.view.selectRel.selection = 'TEST UNIT DEV 1';
        this.view.fieldCoord.text = '';
        this.view.selectHierarchy.selection = 'Hierachy1';
        this.view.dateMission.reset();
        this.view.fieldComment1.text = '';
        this.view.flxButtons2.isVisible = true;

        this.view.sectionDescription.enabled = false;
        this.view.flxDescription.isVisible = false;
        this.view.fieldRecommendation.text = '';
        this.view.selectPriority.selection = 'Priority1';
        this.view.selectRisk.selection = 'Risque1';
        this.view.selectAme.selection = 'Test1';
        this.view.selectDom.selection = 'Domaine1';
        this.view.selectSousdom.selection = 'Sous-domaine1';
        this.view.dateRecomm.reset();
        this.view.fieldAssoc.text = '';
        this.view.fieldComment2.text = '';
        this.view.flxButtons3.isVisible = true;

        this.view.sectionSuivi.enabled = false;
        this.view.flxSuivi.isVisible = false;
        this.view.checkboxFin.selection = "right";
        this.view.dateFin.reset();
        this.view.selectConclusion.selection = 'Test1';
        this.view.fieldComment3.text = '';
        this.view.selectCriteria.selection = 'Critère1';
      }
    },

    initGettersSetters() {}
  };
});