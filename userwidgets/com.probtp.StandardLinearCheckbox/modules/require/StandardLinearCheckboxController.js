define(function() {
  const SKIN_SELECTED = 'flxCheckboxSelected';
  const SKIN_UNSELECTED = 'slFBox';
  const SKIN_LBL_SELECTED = 'sknLblRegularWhite13';
  const SKIN_LBL_UNSELECTED = 'sknLblRegular13';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        this.updateLayout();
      };
      
      this.view.flxLeft.onClick = () => {
        this.selection = 'left';
        this.updateLayout();
      };
      
      this.view.flxRight.onClick = () => {
        this.selection = 'right';
        this.updateLayout();
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
    },
    
    updateLayout(){
        this.view.flxLeft.skin = this.selection === 'left' ? SKIN_SELECTED : SKIN_UNSELECTED;
        this.view.flxRight.skin = this.selection === 'right' ? SKIN_SELECTED : SKIN_UNSELECTED;
        this.view.lblLeft.skin = this.selection === 'left' ? SKIN_LBL_SELECTED : SKIN_LBL_UNSELECTED;
        this.view.lblRight.skin = this.selection === 'right' ? SKIN_LBL_SELECTED : SKIN_LBL_UNSELECTED;
    }
  };
});