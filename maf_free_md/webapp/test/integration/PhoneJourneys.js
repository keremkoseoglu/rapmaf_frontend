sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourneyPhone",
	"./NotFoundJourneyPhone",
	"./BusyJourneyPhone"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "maffreemd.view.",
		autoWait: true
	});
});
