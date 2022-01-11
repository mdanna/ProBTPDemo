define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.postShow = () => {
        this.view.imgLoading.src = this.image;
        this.view.flxLoading.forceLayout();
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'image', () => {
        return this._image;
      });
      defineSetter(this, 'image', value => {
        this._image = value;
      });
    }
  };
});