define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
			this.view.preShow = () => {
              this.view.btnNext.onClick = () => eventManager.publish('eventFinish');
            };
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});