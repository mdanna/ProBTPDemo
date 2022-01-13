const globals = {
  ROLES: ['Responsable de Mission', 'Realisateur', 'Pilotes/Coordinateurs'],
  
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
  
  isCurrentFormForCurrentRole(){
    const currentFormId = kony.application.getCurrentForm().id;
    return (currentFormId === 'frmMain1' && globals.currentRole === globals.ROLES[0]) ||
      (currentFormId === 'frmMain2' && globals.currentRole === globals.ROLES[1]) ||
      (currentFormId === 'frmMain3' && globals.currentRole === globals.ROLES[2]);
      
  }
};