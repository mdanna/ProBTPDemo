define(function() {
  const SKIN_FLX_SELECTED = 'sknFlxBlue';
  const SKIN_FLX_UNSELECTED = 'sknFlxWhite';
  const SKIN_LBL_SELECTED = 'sknLblWhiteRegular18';
  const SKIN_LBL_UNSELECTED = 'sknLblRegular18';
  const IMG1_SELECTED = 'dashboardsel.png';
  const IMG1_UNSELECTED = 'dashboard.png';
  const IMG2_SELECTED = 'observationsel.png';
  const IMG2_UNSELECTED = 'observation.png';


  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){

          this.view.flxItem1.onClick = () => {
            this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
            this.view.lblItem2.skin = SKIN_LBL_UNSELECTED;
            this.view.imgItem2.src = IMG2_UNSELECTED;
            this.view.flxItem1.skin = SKIN_FLX_SELECTED;
            this.view.lblItem1.skin = SKIN_LBL_SELECTED;
            this.view.imgItem1.src = IMG1_SELECTED;
            this.onMenuSelect('dashboard');
          };
          this.view.flxItem2.onClick = () => {
            this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
            this.view.lblItem1.skin = SKIN_LBL_UNSELECTED;
            this.view.imgItem1.src = IMG1_UNSELECTED;
            this.view.flxItem2.skin = SKIN_FLX_SELECTED;
            this.view.lblItem2.skin = SKIN_LBL_SELECTED;
            this.view.imgItem2.src = IMG2_SELECTED;
            this.onMenuSelect('observation');
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
      this.view.flxItem2.skin = SKIN_FLX_UNSELECTED;
      this.view.lblItem2.skin = SKIN_LBL_UNSELECTED;
      this.view.imgItem2.src = IMG2_UNSELECTED;
      this.view.flxItem1.skin = SKIN_FLX_UNSELECTED;
      this.view.lblItem1.skin = SKIN_LBL_UNSELECTED;
      this.view.imgItem1.src = IMG1_UNSELECTED;
    },
  };
});