sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

/* TODO
satır ekle
satır sil
*/

	return Controller.extend("sap.ui.table.sample.Selection.Controller", {

		onInit: function() {
            this.sMafId = "";
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("r_doc_prod").attachPatternMatched(this.loadProd, this);
		},

		loadProd: function(Event) {
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
            var treeTable = oView.byId("treeTable");
            var rows = treeTable.getRows();

            for (var r = 0; r < rows.length; r++) {
                var cells = rows[r].getCells();
                var componentId = cells[3].getValue();
                if (componentId == "") {continue;}
                
                var sReadPath = "Production(MafId='" + this.sMafId + "',ComponentId=guid'" + componentId + "')";
                var oProd = oModel.oData[sReadPath];
                oProd.ParentId = cells[4].getValue();
                oProd.Material = cells[0].getValue();
                oProd.Quantity = cells[1].getValue();
                oProd.Uom = cells[2].getValue();
                oProd.BomLevel = parseInt(cells[5].getValue());

                var sWritePath = "/" + sReadPath;
                oModel.update(
                    sWritePath, 
                    oProd,
                    { success: function(oData, oResponse) { 
                        sap.m.MessageToast.show("Updated successfully");
                      }, 
                      error: function(oError) {
                          sap.m.MessageToast.show("Error");
                      } 
                    }
                );
            }
        },

        onDelPress: function(oEvent) {
            var oView = this.getView();
            var oModel = oView.getModel();
            var treeTable = oView.byId("treeTable");
            var selIndex = treeTable.getSelectedIndex();
            if (selIndex < 0) {return;}
            var rows = treeTable.getRows();
            var selectedRow = rows[selIndex];
            var cells = selectedRow.getCells();
            var componentId = cells[3].getValue();
            if (componentId == "") {return;}
            var sWritePath = "/Production(MafId='" + this.sMafId + "',ComponentId=guid'" + componentId + "')";
			oModel.remove(sWritePath);
			oModel.refresh();
        },

        onCreatePress: function(oEvent) {
            var oView = this.getView();
            var oModel = oView.getModel();
            var treeTable = oView.byId("treeTable");
            var oSelectedItem = treeTable.getContextByIndex(treeTable.getSelectedIndex()).getObject();

            var newEntry = {
                MafId: this.sMafId,
                ParentId: oSelectedItem.ComponentId,
                Material: oSelectedItem.Material,
                BomLevel: oSelectedItem.BomLevel + 1
            };

            oModel.create(
                "/Production", 
                newEntry,
                { success: function(oData, oResponse) { 
                    sap.m.MessageToast.show("Created successfully");
                    }, 
                    error: function(oError) {
                        sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                    } 
                }
            );

        }
	});

});