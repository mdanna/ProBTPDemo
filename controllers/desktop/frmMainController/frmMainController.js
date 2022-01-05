define({ 

	onViewCreated(){
      this.view.init = () => {
        this.view.doLayout = () => {
          this.view.flxMain.height = this.view.frame.height - 106;
          this.view.flxMain.width = this.view.frame.width - 265;
        };
      };
    }

});