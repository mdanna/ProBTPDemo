define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this.view.preShow = () => {
        this.setState(this.state);
      };

      this.view.postShow = () => {
        this.hasRendered = true;
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'state', () => {
        return this._state;
      });
      defineSetter(this, 'state', value => {
        this._state = value;
        if(this.hasRendered){
          this.setState(value);
        }
      });
    },

    setState(state){
      if(state === 'Past'){
        this.view.lblNum.skin = 'sknLblWhite';
        this.view.flxCircle.skin = 'sknFlxPast';
      } else if(state === 'Current') {
        this.view.lblNum.skin = 'sknLblBlack';
        this.view.flxCircle.skin = 'sknFlxCurrent';
      } else {
        this.view.lblNum.skin = 'sknLblBlack';
        this.view.flxCircle.skin = 'sknFlxFuture';
      }      
    }
  };
});