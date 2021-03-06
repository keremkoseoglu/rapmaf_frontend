sap.ui.define([
	"sap/base/Log",
	"sap/ui/table/library",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/ui/thirdparty/jquery"
], function(Log, library, Controller, MessageToast, JSONModel, DateFormat, jQuery) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.Selection.Controller", {

		onInit : function() {
		},

		onMafDocPress : function(oEvent) {
			var sMafId = this.getSelectedMafId();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r_list_doc", {"iv_mafid": sMafId});
		},

		onCreatePress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r_list_header");
		},

		onDeletePress: function(oEvent) {
			var sMafId = this.getSelectedMafId();
			var oView = this.getView();
			var oModel = oView.getModel();
            var sWritePath = "/ZC_MAF_DOC('" + sMafId + "')";
			oModel.remove(sWritePath);
			oModel.refresh();
		},

		getSelectedMafId: function() {
			var oView = this.getView();
			var oTable = oView.byId("tabMafList");
			var aIndices = oTable.getSelectedIndices();
			var sContext = oTable.getContextByIndex(aIndices[0]);
			var oModel = oView.getModel();
			var sMafDoc = oModel.getProperty(sContext.sPath);
			var sMafId = sMafDoc.MafId;
			return sMafId;
		}

	});

});