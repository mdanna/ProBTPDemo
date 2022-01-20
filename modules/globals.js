const globals = {
  ROLES: ['Responsable de Mission', 'Realisateur', 'Pilotes/Coordinateurs'],
  OBJECT_SERVICE_NAME: 'ProBTPObject',
  OBJECT_NAME: 'mission',

  objectService: null,

  currentStep: 1,

  nextStep(nextRole) {
    globals.currentStep++;
    globals.currentRole = nextRole;
    eventManager.publish('eventNext');
  },

  finalStep() {
    globals.currentStep = 1;
    globals.currentRole = globals.ROLES[0];
    eventManager.publish('eventFinish');
    new kony.mvc.Navigation('frmHome'). navigate();
  },

  currentRole: 'Responsable de Mission',

  wfData: {
    missionId: null,
    real: null,
    description: null,
    justif: null,
    evoution: null,
    dateCible: null,
    reports: null,
    dateInitial: null,
    crit: null,
    compl: null,
    definition: null,
    level: null,
    evolutionReal: null,
    ref: null,
    comments: null
  },

  isCurrentFormForCurrentRole(){
    const currentFormId = kony.application.getCurrentForm().id;
    return (currentFormId === 'frmMain1' && globals.currentRole === globals.ROLES[0]) ||
      (currentFormId === 'frmMain2' && globals.currentRole === globals.ROLES[1]) ||
      (currentFormId === 'frmMain3' && globals.currentRole === globals.ROLES[2]);

  },

  getObjectService(){
    this.objectService = this.objectService || KNYMobileFabric.getObjectService(this.OBJECT_SERVICE_NAME, {
      "access": "online"
    });
    return this.objectService;
  },

  getDataObject(){
    return new kony.sdk.dto.DataObject(this.OBJECT_NAME);
  },

  errorAlert(message){ 
    kony.ui.Alert({
      message,
      alertType: constants.ALERT_TYPE_ERROR,
    }, {
      "contentAlignment": constants.ALERT_CONTENT_ALIGN_RIGHT
    });
  },

  informationAlert: function(message){ 
    kony.ui.Alert({
      message,
      alertType: constants.ALERT_TYPE_INFO,
    }, {
      "contentAlignment": constants.ALERT_CONTENT_ALIGN_LEFT
    });
  },
};