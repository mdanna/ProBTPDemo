define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              this.view.btnNext.onClick = () => globals.finalStep();
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});