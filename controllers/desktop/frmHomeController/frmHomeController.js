define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        this.view.flxMain.height = this.view.frame.height - 106;
        this.view.flxMain.width = this.view.frame.width - 265;
      };
      
      this.view.leftMenu.onMenuSelect = (menuItem) => {
        this.view.flxMain.isVisible = (menuItem === 'missions');
        kony.print(menuItem);
      };
      
      
      this.view.btnCreate.onClick = () => new kony.mvc.Navigation('frmMain1').navigate();

    };
  }
  
});