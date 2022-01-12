define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        this.expand(this.expanded);

        if(!this.initDone){
          this.view.onClick = () => {
            if(this.enabled){
              this.expanded = !this.expanded;
              this.expand(this.expanded);
            }
          };
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'expanded', () => {
        return this._expanded;
      });
      defineSetter(this, 'expanded', value => {
        this._expanded = value;
      });
      defineGetter(this, 'enabled', () => {
        return this._enabled;
      });
      defineSetter(this, 'enabled', value => {
        this._enabled = value;
      });
    },

    expand(value){
      this.expanded = value;
      this.view.imgExpanded.isVisible = !!value;
      this.view.imgCollapsed.isVisible = !value;
      this.onExpand(value);
    },

    onExpand(){}
  };
});