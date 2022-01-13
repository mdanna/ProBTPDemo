define({ 

  FORM_ROLE: globals.ROLES[2],

  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        this.view.flxMain.height = this.view.frame.height - 106;
        this.view.flxMain.width = this.view.frame.width - 265;

        this.view.flxStep.height = this.view.frame.height - 106 - 130;
        this.view.flxStep.width = this.view.frame.width - 265;
      };

      eventManager.subscribe('eventNext', () => {
        this.updateLayout();
      });

      eventManager.subscribe('eventFinish', () => {
        this.view.flxStep.widgets().forEach((stepContainer, index) => {
          stepContainer.isVisible = index === 0;
        });
        this.view.steps.currentStep = 1;
      });

      eventManager.subscribe('eventShowRoleSelector', (role) => {
        if(role === this.FORM_ROLE){
          this.view.cmpRoleSelector.isVisible = true;
        }
      });

      this.view.leftMenu.onMenuSelect = (menuItem) => {
        const flxMainWasVisible = this.view.flxMain.isVisible;
        this.view.flxMain.isVisible = (menuItem === 'missions');
        if(menuItem === 'missions' && flxMainWasVisible){
          this.view.quitConfirm.isVisible = true;
        }
      };

    };

    this.view.preShow = () => {
      this.updateLayout();
    };

  },

  updateLayout() {
    this.view.flxStep.widgets().forEach((stepContainer, index) => {
      stepContainer.isVisible = index + 1 === globals.currentStep;
    });
    this.view.steps.currentStep = globals.currentStep;
  }

});