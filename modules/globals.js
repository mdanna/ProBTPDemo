const globals = {
  currentStep: 1,
  
  nextStep() {
    globals.currentStep++;
    eventManager.publish('eventNext');
  },
  
  finalStep() {
    globals.currentStep = 1;
    eventManager.publish('eventFinish');
  }

};