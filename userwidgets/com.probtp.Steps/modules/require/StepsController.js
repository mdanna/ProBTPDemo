define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.postShow = () => {
        this.hasRendered = true;
        this.view.removeAll();
        this.stepNames.data.forEach((row, index) => {
          const stepCmp = new com.probtp.Step({
            id: `cmpStep${index}`
          }, {}, {});
          stepCmp.num = (index + 1) + '';
          stepCmp.title = row.title;
          if((index + 1) < this.currentStep){
            stepCmp.state = 'Past';
          } else if((index + 1) === this.currentStep){
            stepCmp.state = 'Current';
          } else {
            stepCmp.state = 'Future';
          }
          this.view.add(stepCmp);

          if(index < this.stepNames.data.length - 1){
            this.view.add(new com.probtp.StepDivider({
              id: `cmpStepDivider${index}`
            }, {}, {}));
          }
        });
      };
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'currentStep', () => {
        return this._currentStep;
      });
      defineSetter(this, 'currentStep', value => {
        this._currentStep = value;
        if(this.hasRendered){
          this.stepNames.data.forEach((row, index) => {
            const stepCmp = this.view[`cmpStep${index}`];
            if((index + 1) < value){
              stepCmp.state = 'Past';
            } else if((index + 1) === value){
              stepCmp.state = 'Current';
            } else {
              stepCmp.state = 'Future';
            }
          });        
        }
      });
      defineGetter(this, 'stepNames', () => {
        return this._stepNames;
      });
      defineSetter(this, 'stepNames', value => {
        this._stepNames = value;
      });
    }
  };
});