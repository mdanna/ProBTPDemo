define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
          this.view.preShow = () => {
            if(this.state === 'Past'){
              this.view.lblNum.skin = 'sknLblWhite';
              this.view.flxCircle.skin = 'sknFlxPast';
            } else if(this.state === 'Current') {
              this.view.lblNum.skin = 'sknLblBlack';
              this.view.flxCircle.skin = 'sknFlxCurrent';
            } else {
              this.view.lblNum.skin = 'sknLblBlack';
              this.view.flxCircle.skin = 'sknFlxFuture';
            }
          };

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'state', () => {
                return this._state;
            });
            defineSetter(this, 'state', value => {
                this._state = value;
            });
        }
	};
});