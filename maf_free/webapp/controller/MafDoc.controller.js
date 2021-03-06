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
		onInit: function() {
			// "R_INPUT_OUTPUT" Route'unda çalışacak fonksiyonu belirle
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("r_list_doc").attachPatternMatched(this.loadName, this);
		},
		
		loadName: function(Event) {
			// Parametre olarak gönderilen adı al
			var sMafId = Event.getParameter("arguments").iv_mafid;
			var sPath = "/ZC_MAF_DOC('" + sMafId + "')";
			var oView = this.getView();
			oView.bindElement({ path : sPath });
		},

		onPressHeader: function(oEvent) {
			var oView = this.getView();
			var oHeader = oView.byId("headerMaf");
			var sMafId = oHeader.getObjectSubtitle();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r_doc_header", {"iv_mafid": sMafId});
		},

		onEditFinance: function(oEvent) {
			var oView = this.getView();
			var oHeader = oView.byId("headerMaf");
			var sMafId = oHeader.getObjectSubtitle();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r_doc_finance", {"iv_mafid": sMafId});
		},

		onEditProd: function(oEvent) {
			var oView = this.getView();
			var oHeader = oView.byId("headerMaf");
			var sMafId = oHeader.getObjectSubtitle();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("r_doc_prod", {"iv_mafid": sMafId});
		}

	});

});