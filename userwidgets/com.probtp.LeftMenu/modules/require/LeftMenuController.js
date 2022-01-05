define(function() {
  const SKIN_FLX_SELECTED = 'sknFlxSelected';
  const SKIN_FLX_UNSELECTED = 'sknFlxMenu';

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){

          this.view.flxItem1.onClick = () => {
            this.view.flxItem1.skin = SKIN_FLX_SELECTED;
            this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem3.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem4.skin = SKIN_FLX_UNSELECTED;
            this.onMenuSelect('profil');
          };
          this.view.flxItem2.onClick = () => {
            this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem2.skin = SKIN_FLX_SELECTED;
            this.view.flxItem3.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem4.skin = SKIN_FLX_UNSELECTED;
            this.onMenuSelect('missions');
          };
          this.view.flxItem3.onClick = () => {
            this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem3.skin = SKIN_FLX_SELECTED;
            this.view.flxItem4.skin = SKIN_FLX_UNSELECTED;
            this.onMenuSelect('aide');
          };
          this.view.flxItem4.onClick = () => {
            this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem3.skin = SKIN_FLX_UNSELECTED;
            this.view.flxItem4.skin = SKIN_FLX_SELECTED;
            this.onMenuSelect('administration');
          };
          this.initDone = true;
        }
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onMenuSelect() {},

    deselect() {
      this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
      this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
      this.view.flxItem3.skin = SKIN_FLX_UNSELECTED;
      this.view.flxItem4.skin = SKIN_FLX_UNSELECTED;
    },
  };
});