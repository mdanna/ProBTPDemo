define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        this.setDateTime();
        if(!this.initDone){
          kony.timer.schedule('updateDateTime', () => {
            this.setDateTime();
          }, 60, true);
          this.initDone = true;
        }
      };
    },
    
    initGettersSetters: function() {

    },
    
    setDateTime(){
      const now = new Date();
      this.view.lblDate.text = utils.formatDate(now);
      this.view.lblTime.text = utils.formatTime(now);
    }
  };
});