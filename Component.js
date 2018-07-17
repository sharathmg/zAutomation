sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/automation/toolAutomationNew/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("com.automation.toolAutomationNew.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
						// set data model
			var oMsgData = {
				messageTxt : "",
				messageTitle: "",
				messageValueState: "None"
			};
			var oModelDialog = new JSONModel(oMsgData);
			this.setModel(oModelDialog, "dialogModel");
		}
	});
});