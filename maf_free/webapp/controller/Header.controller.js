sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.Selection.Controller", {

		onInit: function() {
			// "R_INPUT_OUTPUT" Route'unda çalışacak fonksiyonu belirle
            this.sMafId = "";
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("r_doc_header").attachPatternMatched(this.loadHeader, this);
            oRouter.getRoute("r_list_header").attachPatternMatched(this.newHeader, this);
		},

        newHeader: function(oEvent) {
            this.sMafId = "";
            var oView = this.getView();
            oView.unbindElement();
        },
		
		loadHeader: function(Event) {
			// Parametre olarak gönderilen adı al
			var sMafId = Event.getParameter("arguments").iv_mafid;
            this.sMafId = sMafId;
            var sPath = "/ZC_MAF_DOC('" + sMafId + "')";
            var oView = this.getView();
            oView.bindElement({ path : sPath });
		},

        onSavePress: function(oEvent) {
            if (this.sMafId === "") {
                this.createHeader();
            }
            else {
                this.updateHeader();
            }
        },

        createHeader: function() {
            var oView = this.getView();
            var oModel = oView.getModel();

            var oMafHeader = {
                Approved: oView.byId("chkApproved").getSelected(),
                Description: oView.byId("txtDescription").getValue(),
                CurrencyCode: oView.byId("txtCurrency").getValue(),
                MaterialDescription: oView.byId("txtMaterial").getValue(),
                Width: oView.byId("txtWidth").getValue(),
                Height: oView.byId("txtHeight").getValue(),
                Length: oView.byId("txtLength").getValue(),
                SizeUom: oView.byId("txtSizeUom").getValue(),
                Volume: oView.byId("txtVolume").getValue(),
                VolumeUom: oView.byId("txtVolumeUom").getValue() }

            oModel.create(
                "/ZC_MAF_DOC", 
                oMafHeader,
                { success: function(oData, oResponse) { 
                    sap.m.MessageToast.show("Created successfully");
                    }, 
                    error: function(oError) {
                        sap.m.MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                    } 
                }
            );
        },

        updateHeader: function() {
            // Access element in memory
            var oView = this.getView();
            var oModel = oView.getModel();
            var sReadPath = "ZC_MAF_DOC('" + this.sMafId + "')";
            var oMafHeader = oModel.oData[sReadPath];

            // Set values to memory
            oMafHeader.Approved = oView.byId("chkApproved").getSelected();
            oMafHeader.Description = oView.byId("txtDescription").getValue();
            oMafHeader.CurrencyCode = oView.byId("txtCurrency").getValue();
            oMafHeader.MaterialDescription = oView.byId("txtMaterial").getValue();
            oMafHeader.Width = oView.byId("txtWidth").getValue();
            oMafHeader.Height = oView.byId("txtHeight").getValue();
            oMafHeader.Length = oView.byId("txtLength").getValue();
            oMafHeader.SizeUom = oView.byId("txtSizeUom").getValue();
            oMafHeader.Volume = oView.byId("txtVolume").getValue();
            oMafHeader.VolumeUom = oView.byId("txtVolumeUom").getValue();

            // Write back
            var sWritePath = "/ZC_MAF_DOC('" + this.sMafId + "')";

            oModel.update(
                sWritePath, 
                oMafHeader,
                { success: function(oData, oResponse) { 
                    sap.m.MessageToast.show("Updated successfully");
                  }, 
                  error: function(oError) {
                      sap.m.MessageToast.show("Error");
                  } 
                }
            );
        }
	});

});