define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              this.view.isVisible = false;
              this.view.flxBackground.onClick = () => this.view.isVisible = false;
              this.view.btnStay.onClick = () => this.view.isVisible = false;
              this.view.btnQuit.onClick = () => globals.finalStep();
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});