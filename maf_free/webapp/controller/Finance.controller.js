sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.Selection.Controller", {

		onInit: function() {
			// "R_INPUT_OUTPUT" Route'unda çalışacak fonksiyonu belirle
            this.sMafId = "";
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("r_doc_finance").attachPatternMatched(this.loadFinance, this);
		},

		loadFinance: function(Event) {
			// Parametre olarak gönderilen adı al
			var sMafId = Event.getParameter("arguments").iv_mafid;
            this.sMafId = sMafId;
			var sPath = "/ZC_MAF_DOC('" + sMafId + "')";
			var oView = this.getView();
			oView.bindElement({ path : sPath });
		},

        onSavePress: function(oEvent) {
            var oView = this.getView();
            var oModel = oView.getModel();
            var oTable = oView.byId("tabFinance");
            var tableItems = oTable.getItems();

            for (var x = 0; x < tableItems.length; x++) {
                var item = tableItems[x];
                var cells = item.getCells();
                var material = cells[0].getText();

                var sReadPath = "Finance(MafId='" + this.sMafId + "',Material='" + material + "')";
                var oFinance = oModel.oData[sReadPath];
                oFinance.Price = cells[1].getValue();
                oFinance.CurrencyCode = cells[2].getValue();
                oFinance.PriceUnit = cells[3].getValue();

                var sWritePath = "/Finance(MafId='" + this.sMafId + "',Material='" + material + "')";
                oModel.update(
                    sWritePath, 
                    oFinance,
                    { success: function(oData, oResponse) { 
                        sap.m.MessageToast.show("Updated successfully");
                      }, 
                      error: function(oError) {
                          sap.m.MessageToast.show("Error");
                      } 
                    }
                );
            }
        }
	});

});