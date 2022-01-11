define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.onClick = () => this.onClick();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onClick(){}
  };
});