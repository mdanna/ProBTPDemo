define(function() {
  const SKIN_SELECTED = 'sknFlxSelected';
  const SKIN_UNSELECTED = 'slFBox';

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              this.view.flxPerson1.skin = this.selection === 1 ? SKIN_SELECTED : SKIN_UNSELECTED; 
              this.view.flxPerson2.skin = this.selection === 2 ? SKIN_SELECTED : SKIN_UNSELECTED; 
              this.view.flxPerson3.skin = this.selection === 3 ? SKIN_SELECTED : SKIN_UNSELECTED; 
              
              if(!this.initDone){
                this.view.flxPerson1.onClick = () => {
                  this.view.flxPerson1.skin = SKIN_SELECTED;
                  this.view.flxPerson2.skin = SKIN_UNSELECTED;
                  this.view.flxPerson3.skin = SKIN_UNSELECTED;
                  new kony.mvc.Navigation('frmMain1').navigate();
                  this.view.isVisible = false;
                };
                this.view.flxPerson2.onClick = () => {
                  this.view.flxPerson1.skin = SKIN_UNSELECTED;
                  this.view.flxPerson2.skin = SKIN_SELECTED;
                  this.view.flxPerson3.skin = SKIN_UNSELECTED;
                  new kony.mvc.Navigation('frmMain2').navigate();
                  this.view.isVisible = false;
                };
                this.view.flxPerson3.onClick = () => {
                  this.view.flxPerson1.skin = SKIN_UNSELECTED;
                  this.view.flxPerson2.skin = SKIN_UNSELECTED;
                  this.view.flxPerson3.skin = SKIN_SELECTED;
                  new kony.mvc.Navigation('frmMain3').navigate();
                  this.view.isVisible = false;
                };
                this.view.flxBackground.onClick = () => this.view.isVisible = false;
                this.initDone = true;
              }
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'selection', () => {
                return this._selection;
            });
            defineSetter(this, 'selection', value => {
                this._selection = value;
            });
        }
	};
});