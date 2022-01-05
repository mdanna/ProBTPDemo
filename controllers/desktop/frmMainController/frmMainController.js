define({ 

	onViewCreated(){
      this.view.init = () => {
        this.view.doLayout = () => {
          this.view.flxMain.height = this.view.frame.height - 106;
          this.view.flxMain.width = this.view.frame.width - 265;
          
          this.view.flxStep.height = this.view.frame.height - 106 - 130;
          this.view.flxStep.width = this.view.frame.width - 265;
        };
        
        eventManager.subscribe('eventNext', () => {
          const currentStep = parseInt(this.view.steps.currentStep) + 1;
          this.view.flxStep.widgets().forEach((stepContainer, index) => {
            stepContainer.isVisible = index + 1 === currentStep;
          });
          this.view.steps.currentStep = currentStep;
        });
        eventManager.subscribe('eventFinish', () => {
          this.view.flxStep.widgets().forEach((stepContainer, index) => {
            stepContainer.isVisible = index === 0;
          });
          this.view.steps.currentStep = 1;
        });
      };
    }

});