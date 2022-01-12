define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {

        if(!this.initDone){
          this.view.flxSelection.onClick = () => {
            this.view.flxSelectList.isVisible = !this.view.flxSelectList.isVisible;
          };

          this.view.segSelectList.onRowClick = (segment) => {
            const oldSelectionIndex = this.view.segSelectList.data.findIndex((row) => row.lblSelectionItem === this.view.lblSelection.text);
            const selectionIndex = segment.selectedRowIndex[1];
            if(oldSelectionIndex !== selectionIndex && selectionIndex !== -1){
              const oldSelection = this.view.lblSelection.text;
              const selection = segment.selectedRowItems[0].lblSelectionItem;
              this.view.lblSelection.text = selection;
              (oldSelectionIndex !== -1) && this.view.segSelectList.setDataAt({
                lblSelectionItem: oldSelection,
                template: 'flxSelectionList'
              }, oldSelectionIndex);
              this.view.segSelectList.setDataAt({
                lblSelectionItem: selection,
                template: 'flxSelectionListSelected'
              }, selectionIndex);
            }
            this.view.flxSelectList.isVisible = false;
          };

          this.initDone = true;
        }

        const selectionIndex = this.view.segSelectList.data.findIndex((row) => row.lblSelectionItem === this.view.lblSelection.text);
        (selectionIndex !== -1) && this.view.segSelectList.setDataAt({
          lblSelectionItem: this.view.lblSelection.text,
          template: 'flxSelectionListSelected'
        }, selectionIndex);

      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    }
  };
});