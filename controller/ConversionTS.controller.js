sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices"
], function(Controller, callServices) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.ConversionTS", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.TSDetail
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("conversionTS").attachPatternMatched(this.onObjectMatched, this);
			var oDataProcessFlowLanesOnly = {
				lanes: [{
					id: "0",
					icon: "sap-icon://complete",
					label: "TS Completed",
					position: 0,
					state: [{
						state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
						value: 25
					}]
				}, {
					id: "1",
					icon: "sap-icon://payment-approval",
					label: "TS Approved",
					position: 1,
					state: [{
						state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
						value: 50
					}]
				}]
			};
			this.changeVersionKeyFlag = false;
			var oModelPf2 = new sap.ui.model.json.JSONModel();
			var viewPf2 = this.getView();
			oModelPf2.setData(oDataProcessFlowLanesOnly);
			viewPf2.setModel(oModelPf2, "pf2");

			viewPf2.byId("processflow2").updateModel();

		},

		oDataConversionSuccess: {

		},

		oProjectId: "",

		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			//SOC Writwick 10 July 2018
			// sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.stepno = "S2";
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S2";
			//EOC Writwick 10 July 2018
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.mArguments = oEvent.getParameters().arguments;
			var title = "Conversion TS " + this.mArguments.objectlist + " Material Master Update";
			this.byId("page").setTitle(title);

			this.byId("doctype").setSelectedKey("Technical");

			var obj = this.mArguments.object;

			this.oDataConversion = {
				ObjectTitle_TS: "",
				ObjectID: "",
				DevelopmentPackage: "",
				Type: "",
				ProgramTransaction: "",
				ScreenNumber: "",
				Variant: "",
				PrintTransaction: "",
				OtherAttributes: "",
				SelectionScreenTS: "",
				DataMapping1: "",
				dataMapping: [],
				RestartCapability: "",
				TechnicalAssumptionsDependencies: "",
				ErrorHandlingTS: "",
				SecuritySection: "",
				SecuritySectionCheckBoxTS: "",
				ErrorHandlingCheckBoxTS: "",
				Author_TS: "",
				Reviewer_TS: "",
				Approver_TS: "",
				userAcceptTemp: "",
				userAcceptance1: "",
				userAcceptance2: "",
				userAcceptance: []
			};

			this.oDataConversionSuccess = {
				ObjectTitle_TS: false,
				ObjectID: false,
				DevelopmentPackage: false,
				Type: false,
				ProgramTransaction: false,
				ScreenNumber: false,
				Variant: false,
				PrintTransaction: false,
				OtherAttributes: false,
				SelectionScreenTS: false,
				DataMapping1: false,
				RestartCapability: false,
				TechnicalAssumptionsDependencies: false,
				ErrorHandlingTS: false,
				SecuritySection: false,
				SecuritySectionCheckBoxTS: false,
				ErrorHandlingCheckBoxTS: false,
				Author_TS: false,
				Reviewer_TS: false,
				Approver_TS: false,
				userAcceptTemp: false,
				userAcceptance1: false,
				userAcceptance2: false
			};

			var oModelConversion = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelConversion, "conversionData");

			if (obj === "new") {
				// this.byId("commLog").setVisible(false);
				this.byId("versiontypeNewTech").setVisible(true);
				//	this.byId("versiontypeExistingTech").setVisible(false);
				this.byId("idPrintScreen").setVisible(true);
				this.byId("idPrintScreen").setEnabled(false);

				oModelConversion.setData(this.oDataConversion);
				this.dataRead();
			} else {
				// this.byId("commLog").setVisible(true);
				this.byId("versiontypeNewTech").setVisible(false);
				this.byId("versiontypeExistingTech").setVisible(true);
				this.byId("idPrintScreen").setEnabled(true);
				this.byId("idPrintScreen").setVisible(true);
				this.byId('versiontypeExistingTech').destroyItems();
				var oSelect = this.getView().byId("versiontypeExistingTech");
				var newItem = new sap.ui.core.Item({
					key: "Version 1.0",
					text: "Version 1.0"
				});
				oSelect.addItem(newItem);
				this.dataRead();
			}
			this.byId("idIconTabBarNoIcons").setSelectedKey("conversionTechDesign");
			if (this.byId("idIconTabBarNoIcons").getSelectedKey() === "conversionTechDesign") {
				this.byId("conversionTechObjectInfo").setExpanded(false);
				// this.byId("conversionTechHANA").setExpanded(false);
				// this.byId("conversionTechABAP").setExpanded(false);
				this.byId("conversionSelection").setExpanded(false);
				this.byId("conversionMapping").setExpanded(false);
				this.byId("conversionCapability").setExpanded(false);
			}
		},

		// dataRead: function() {
		// 	var that = this;
		// 	var conversionData = {
		// 		"userAcceptance": [],
		// 		"dataMapping": []
		// 	};
		// 	var conversionJSON = new sap.ui.model.json.JSONModel(conversionData);
		// 	this.getView().setModel(conversionJSON, "conversionData");
		// 	var objectID;
		// 	if (this.mArguments.objectID !== "" && this.mArguments.objectID !== undefined) {
		// 		objectID = this.mArguments.objectID;
		// 	} else {
		// 		objectID = "PR003";
		// 	}

		// 	var oParam = {
		// 		repid: 'CNV-083b-US-F-2104',
		// 		projectkey: 'CNV',
		// 		processid: objectID,
		// 		stepno: 'S1',
		// 		fieldname: ''
		// 	};
		// 	var oRes, oRes1, oRes2;

		// 	oParam.fieldname = "Object Title_TS";
		// 	conversionData.ObjectTitle = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Object ID_TS";
		// 	conversionData.ObjectID = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Development Package";
		// 	conversionData.DevelopmentPackage = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Type";
		// 	conversionData.Type = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Program%2FTransaction";
		// 	conversionData.ProgramTransaction = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Screen Number";
		// 	conversionData.ScreenNumber = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Variant";
		// 	conversionData.Variant = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Print Transaction";
		// 	conversionData.PrintTransaction = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Selection Screen_TS";
		// 	conversionData.SelectionScreenTS = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Data Mapping";
		// 	oRes2 = callServices.fnCallMainTable(oParam);
		// 	if (oRes2 !== undefined) {
		// 		oRes = oRes2.split("~");
		// 		if (oRes.length > 1) {
		// 			var data = {};
		// 			data.Description = oRes[0];
		// 			data.sourceField = oRes[1];
		// 			data.dataType = oRes[2];
		// 			data.lengthS = oRes[3];
		// 			data.targetField = oRes[4];
		// 			data.conversionRule = oRes[5];
		// 			data.validationRule = oRes[6];
		// 			conversionData.dataMapping.push(data);
		// 		}
		// 	}

		// 	oParam.fieldname = "Restart Capability";
		// 	conversionData.RestartCapability = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Technical Assumptions and Dependencies";
		// 	conversionData.TechnicalAssumptionsDependencies = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Author";
		// 	conversionData.Author = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Reviewer";
		// 	conversionData.Reviewer = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Approver";
		// 	conversionData.Approver = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Error Handling_TS";
		// 	conversionData.ErrorHandlingTS = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Security Section";
		// 	conversionData.SecuritySection = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "UA1_TS";
		// 	oRes1 = callServices.fnCallMainTable(oParam);
		// 	if (oRes1 !== undefined) {
		// 		oRes = oRes1.split("~");
		// 		if (oRes.length > 1) {
		// 			var data2 = {};
		// 			data2.step = oRes[0];
		// 			data2.testType = oRes[1];
		// 			data2.scenario = oRes[2];
		// 			data2.stepsPer = oRes[3];
		// 			data2.actualResults = oRes[4];
		// 			conversionData.userAcceptance.push(data2);
		// 		}
		// 	}

		// 	oParam.fieldname = "UA2_TS";
		// 	oRes1 = callServices.fnCallMainTable(oParam);
		// 	if (oRes1 !== undefined) {
		// 		oRes = oRes1.split("~");
		// 		if (oRes.length > 1) {
		// 			var data1 = {};
		// 			data1.step = oRes[0];
		// 			data1.testType = oRes[1];
		// 			data1.scenario = oRes[2];
		// 			data1.stepsPer = oRes[3];
		// 			data1.actualResults = oRes[4];
		// 			conversionData.userAcceptance.push(data1);
		// 		}
		// 	}

		// 	that.setModel(conversionData);
		// },

		// setModel: function(conversionData) {
		// 	this.getView().getModel("conversionData").setData(conversionData);
		// 	this.getView().getModel("conversionData").refresh();
		// },
		onChangeVersionExistingTech: function(oevent) {
			this.changeVersionKeyFlag = true;
			var currentversion = oevent.getSource().getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var params = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			// params = params.projectkey;
			params = params.Projectkey;
			//EOC Writwick 10 July 2018

			this.dataRead(versionno[1]);

		},
		dataRead: function(versionNo) {

			// var oModelUA = new sap.ui.model.json.JSONModel();
			// this.getView().setModel(oModelUA, "userData");

			// var oUserAcceptance = {
			// 	userAcceptance: []
			// };

			var that = this;
			var oDataConversion = this.oDataConversion;
			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

			// var oParam = {
			// 	repid: 'CNV-083b-US-F-2104',
			// 	projectkey: 'CNV',
			// 	processid: 'PR003',
			// 	stepno: 'S1',
			// 	fieldname: ''
			// };

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (!oParam) {
				return;
			}
			if (oParam) {
				//SOC Writwick 10 July 2018
				// if (oParam.projectid) {
				// 	delete oParam.projectid;
				// }
				if (oParam.Projectid) {
					delete oParam.Projectid;
				}
				//EOC Writwick 10 July 2018
			}
			
			//SOC Writwick 10 July 2018
			this.getView().byId("idPrintScreen").setVisible(true);
			// oParam.version_id = "1.0";
			oParam.Version = "1.0";
			if (versionNo) {
				// oParam.version_id = versionNo;
				oParam.Version = versionNo;
				//EOC Writwick 10 July 2018
				var crNumber1 = sessionStorage.getItem("crNumber");
				if (crNumber1 !== "") {
					// this.getView().byId("storynumber").setValue(crNumber1);
					oDataConversion.StoryNumberFComment = crNumber1;
				}
			} else {

				var num = 1;

				while (num > 0) {
					//SOC Writwick 10 July 2018
					// oParam.fieldname = "Status_TS";
					oParam.Fieldname = "Status_TS";
					//EOC Writwick 10 July 2018
					callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_TS", this.oDataConversionSuccess);
					oDataConversion.versionLatest = oDataConversion.Status_TS;
					//SOC Writwick 12 July 2018
					if (oDataConversion.versionLatest !== "") {
						num = num + 1;
						//SOC Writwick 10 July 2018
						// oParam.version_id = parseInt(oParam.version_id) + 1;
						// oParam.version_id = (oParam.version_id).toString() + ".0";
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						//EOC Writwick 10 July 2018

						if (oDataConversion.versionLatest === "APPROVED") {
							//SOC Writwick 10 July 2018
							// var selectedKey = "Version " + oParam.version_id;
							var selectedKey = "Version " + oParam.Version;
							//EOC Writwick 10 July 2018
							var oSelect = this.getView().byId("versiontypeExistingTech");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);

						}

						oDataConversion.versionLatest = "";
						oDataConversion.Status_TS = "";
					} else if (num > 1){
						//versiontypeExisting  
						//Version 3.0
						//this.byId("versiontypeExisting").setValueState("Version 3.0");
						//SOC Writwick 10 July 2018
						// oParam.version_id = parseInt(oParam.version_id) - 1;
						// oParam.version_id = (oParam.version_id).toString() + ".0";
						// var selectedKey = "Version " + oParam.version_id;
						oParam.Version = parseInt(oParam.Version) - 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						//EOC Writwick 10 July 2018
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
						num = -1;
					}
					else {
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
						num = -1;
					}
					//EOC Writwick 12 July 2018
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Status_TS";
			oParam.Fieldname = "Status_TS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_TS", this.oDataConversionSuccess);
			var statusLastVersion = oDataConversion.Status_TS;
			var statusLast = statusLastVersion;

			if (statusLastVersion === "APPROVED" && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					// this.getView().byId("storynumber").setValue("");
					this.getView().byId("oBTHold").setVisible(true);
					oDataConversion.StoryNumberFComment = "";
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id);
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
					
					//SOC Writwick 10 July 2018
					// var vItem = parseInt(oParam.version_id);
					var vItem = parseInt(oParam.Version);
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExistingTech').removeItem(vItem);

				} else {
					// this.getView().byId("storynumber").setValue(crNumber);
					oDataConversion.StoryNumberFComment = crNumber;
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id) + 1;
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
				}

			}
			statusLastVersion = undefined;
			oDataConversion.Status_TS = undefined;
			/*if (versionNo) {
				oParam.version_id = versionNo;
			} else {

				var num = 1;
				while (num > 0) {
					oParam.fieldname = "Approver";
					callServices.fnGetDataMainTable(oParam, oDataConversion, "Approver", this.oDataConversionSuccess);
					oDataConversion.versionLatest = oDataConversion.Approver;
					if (oDataConversion.versionLatest !== undefined) {
						num = num + 1;
						oParam.version_id = parseInt(oParam.version_id) + 1;
						oParam.version_id = (oParam.version_id).toString() + ".0";
						oDataConversion.versionLatest = undefined;
						oDataConversion.Approver = undefined;
					} else {
						//versiontypeExisting  
						//Version 3.0
						//this.byId("versiontypeExisting").setValueState("Version 3.0");
						oParam.version_id = parseInt(oParam.version_id) - 1;
						oParam.version_id = (oParam.version_id).toString() + ".0";
						var selectedKey = "Version " + oParam.version_id;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
						num = -1;
					}
				}
			}*/
			var intDataDet = {
				attachIntDet: [],
				attachIntDetVisible: false
			};
			//SOC Writwick 10 July 2018
			// var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
			// this.getView().setModel(intDataDetJSON, "intDataDet");
			// this.readAttachments1({
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: oParam.stepno,
			// 	FIELDNAME: "ConvData_TS",
			// 	TYPE: "O"
			// });
			// oParam.fieldname = "Status_TS";
			var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
			this.getView().setModel(intDataDetJSON, "intDataDet");
			this.readAttachments1({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "ConvData_TS",
				TYPE: "O"
			});
			oParam.Fieldname = "Status_TS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_TS", this.oDataConversionSuccess);

			if (oDataConversion.Status_TS === 'SAVED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDataConversion.Status_TS === 'ON HOLD') {
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;

			} else if (oDataConversion.Status_TS === 'SUBMITTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDataConversion.Status_TS === 'APPROVED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
			//	oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDataConversion.Status_TS === 'ACCEPTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();

			} else {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			}

			if (statusLast === "APPROVED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
					sessionStorage.getItem("crNumber") !== "")) {
				//SOC Writwick 10 July 2018
				// oParam.version_id = parseInt(oParam.version_id) - 1;
				// oParam.version_id = (oParam.version_id).toString() + ".0";
				oParam.Version = parseInt(oParam.Version) - 1;
				oParam.Version = (oParam.Version).toString() + ".0";
				//EOC Writwick 10 July 2018
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Approver_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Approver_TS", this.oDataConversionSuccess);

			// oParam.fieldname = "Reviewer_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Reviewer_TS", this.oDataConversionSuccess);

			// oParam.fieldname = "Author_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Author_TS", this.oDataConversionSuccess);
			oParam.Fieldname = "Approver_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Approver_TS", this.oDataConversionSuccess);

			oParam.Fieldname = "Reviewer_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Reviewer_TS", this.oDataConversionSuccess);

			oParam.Fieldname = "Author_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Author_TS", this.oDataConversionSuccess);
			//EOC Writwick 10 July 2018
			
			// oParam.fieldname = "Object ID";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ObjectID",this.oDataConversionSuccess);
			
			//SOC Writwick 10 July 2018
			// oDataConversion.ObjectID = oParam.repid;

			// oParam.fieldname = "Object Title_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ObjectTitle_TS", this.oDataConversionSuccess);
			// oDataConversion.Title = "Conversions TS - " + oDataConversion.ObjectID + " - " + oDataConversion.ObjectTitle_TS;
			// oParam.fieldname = "Development Package";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "DevelopmentPackage", this.oDataConversionSuccess);

			// oParam.fieldname = "Type";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Type", this.oDataConversionSuccess);

			// oParam.fieldname = "Program Transaction";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ProgramTransaction", this.oDataConversionSuccess);

			// oParam.fieldname = "Screen Number";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ScreenNumber", this.oDataConversionSuccess);

			// oParam.fieldname = "Variant";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Variant", this.oDataConversionSuccess);

			// oParam.fieldname = "Print Transaction";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "PrintTransaction", this.oDataConversionSuccess);

			// oParam.fieldname = "Other Attributes";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "OtherAttributes", this.oDataConversionSuccess);

			// oParam.fieldname = "dataMappingText";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "dataMappingText", this.oDataConversionSuccess);
			oDataConversion.ObjectID = oParam.Repid;

			oParam.Fieldname = "Object Title_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ObjectTitle_TS", this.oDataConversionSuccess);
			oDataConversion.Title = "Conversions TS - " + oDataConversion.ObjectID + " - " + oDataConversion.ObjectTitle_TS;
			oParam.Fieldname = "Development Package";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "DevelopmentPackage", this.oDataConversionSuccess);

			oParam.Fieldname = "Type";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Type", this.oDataConversionSuccess);

			oParam.Fieldname = "Program Transaction";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ProgramTransaction", this.oDataConversionSuccess);

			oParam.Fieldname = "Screen Number";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ScreenNumber", this.oDataConversionSuccess);

			oParam.Fieldname = "Variant";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Variant", this.oDataConversionSuccess);

			oParam.Fieldname = "Print Transaction";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "PrintTransaction", this.oDataConversionSuccess);

			oParam.Fieldname = "Other Attributes";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "OtherAttributes", this.oDataConversionSuccess);

			oParam.Fieldname = "dataMappingText";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "dataMappingText", this.oDataConversionSuccess);
			//EOC Writwick 10 July 2018
			
			/*oParam.fieldname = "Data Mapping";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "DataMapping1",this.oDataConversionSuccess);
			if (oDataConversion.DataMapping1) {
				var DataMappingCols1 = oDataConversion.DataMapping1.split("~");
				if (DataMappingCols1.length > 1) {
					var data = {};
					data.Description = DataMappingCols1[0];
					data.sourceField = DataMappingCols1[1];
					data.dataType = DataMappingCols1[2];
					data.lengthS = DataMappingCols1[3];
					data.targetField = DataMappingCols1[4];
					data.conversionRule = DataMappingCols1[5];
					data.validationRule = DataMappingCols1[6];
					oDataConversion.dataMapping.push(data);
				}
			}else{
				var data = {};
					data.Description = "";
					data.sourceField = "";
					data.dataType = "";
					data.lengthS = "";
					data.targetField = "";
					data.conversionRule = "";
					data.validationRule = "";
					oDataConversion.dataMapping.push(data);
			}*/
			var iCountUA1, sUserAcptCols1;

			for (iCountUA1 = 0; iCountUA1 < 10; iCountUA1++) {
				oDataConversion.DataMapping1 = "";
				//SOC Writwick 10 July 2018
				// oParam.fieldname = "TS_DataMapping_" + (iCountUA1 + 1);
				oParam.Fieldname = "TS_DataMapping_" + (iCountUA1 + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTable(oParam, oDataConversion, "DataMapping1", this.oDataConversionSuccess);
				if (this.oDataConversionSuccess.DataMapping1) {
					if (oDataConversion.DataMapping1) {
						sUserAcptCols1 = oDataConversion.DataMapping1.split("~");
						if (sUserAcptCols1 && sUserAcptCols1.length >= 7) {
							oDataConversion.dataMapping.push({
								Description: sUserAcptCols1[0],
								sourceField: sUserAcptCols1[1],
								dataType: sUserAcptCols1[2],
								lengthS: sUserAcptCols1[3],
								targetField: sUserAcptCols1[4],
								conversionRule: sUserAcptCols1[5],
								validationRule: sUserAcptCols1[6],
								flag: true
							});
						}
					} else {
						continue;
					}
				} else {
					break;
				}
			}
			if (oDataConversion.dataMapping.length === 0) {
				oDataConversion.dataMapping.push({
					Description: "",
					sourceField: "",
					dataType: "",
					lengthS: "",
					targetField: "",
					conversionRule: "",
					validationRule: "",
					flag: false
				});
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Restart Capability";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "RestartCapability", this.oDataConversionSuccess);

			// oParam.fieldname = "Technical Assumptions and Dependencies";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "TechnicalAssumptionsDependencies", this.oDataConversionSuccess);

			// oParam.fieldname = "Selection Screen_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenTS", this.oDataConversionSuccess);

			// oParam.fieldname = "Error Handling_TS";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingTS", this.oDataConversionSuccess);

			// oParam.fieldname = "Security Section";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SecuritySection", this.oDataConversionSuccess);
			oParam.Fieldname = "Restart Capability";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "RestartCapability", this.oDataConversionSuccess);

			oParam.Fieldname = "Technical Assumptions and Dependencies";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "TechnicalAssumptionsDependencies", this.oDataConversionSuccess);

			oParam.Fieldname = "Selection Screen_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenTS", this.oDataConversionSuccess);

			oParam.Fieldname = "Error Handling_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingTS", this.oDataConversionSuccess);

			oParam.Fieldname = "Security Section";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecuritySection", this.oDataConversionSuccess);

			/*oParam.fieldname = "UA1_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "userAcceptance1",this.oDataConversionSuccess);
			var sUserAcptCols;
			var sUserAcptCols1;
			var data1;
			if (oDataConversion.userAcceptance1) {
				sUserAcptCols = oDataConversion.userAcceptance1.split("~");
				if (sUserAcptCols.length > 1) {
					data1 = {};
					data1.step = sUserAcptCols[0];
					data1.testType = sUserAcptCols[1];
					data1.scenario = sUserAcptCols[2];
					data1.stepsPer = sUserAcptCols[3];
					data1.actualResults = sUserAcptCols[4];
					oDataConversion.userAcceptance.push(data1);
				}
			}else{
				data1 = {};
					data1.step = "";
					data1.testType = "";
					data1.scenario = "";
					data1.stepsPer = "";
					data1.actualResults = "";
					oDataConversion.userAcceptance.push(data1);
			}

			oParam.fieldname = "UA2_TS";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "userAcceptance2",this.oDataConversionSuccess);
			if (oDataConversion.userAcceptance2) {
				sUserAcptCols1 = oDataConversion.userAcceptance2.split("~");
				if (sUserAcptCols1.length > 1) {
					data1 = {};
					data1.step = sUserAcptCols1[0];
					data1.testType = sUserAcptCols1[1];
					data1.scenario = sUserAcptCols1[2];
					data1.stepsPer = sUserAcptCols1[3];
					data1.actualResults = sUserAcptCols1[4];
					oDataConversion.userAcceptance.push(data1);
				}
			}
			*/

			var iCountUA, sUserAcptCols;

			for (iCountUA = 0;; iCountUA++) {

				oDataConversion.userAcceptTemp = "";
				//SOC Writwick 10 July 2018
				// oParam.fieldname = "TS_UA_" + (iCountUA + 1);
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, oDataConversion, "userAcceptTemp", this.oDataConversionSuccess);
				if (this.oDataConversionSuccess.userAcceptTemp) {
					if (oDataConversion.userAcceptTemp) {
						sUserAcptCols = oDataConversion.userAcceptTemp.split("~");
						if (sUserAcptCols && sUserAcptCols.length >= 6) {
							oDataConversion.userAcceptance.push({
								step: sUserAcptCols[0],
								testType: sUserAcptCols[1],
								scenario: sUserAcptCols[2],
								stepsPer: sUserAcptCols[3],
								actualResults: sUserAcptCols[4],
								expectedResults: sUserAcptCols[5],
								flag: true
							});
						}
					} else {
						continue;
					}
				} else {
					break;
				}
			}
			if (oDataConversion.userAcceptance.length === 0) {
				oDataConversion.userAcceptance.push({
					step: "",
					testType: "",
					scenario: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: "",
					flag: false
				});
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "ErrorHandlingCheckBoxTS";
			oParam.Fieldname = "ErrorHandlingCheckBoxTS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingCheckBoxTS", this.oDataConversionSuccess);
			if (oDataConversion.ErrorHandlingCheckBoxTS) {
				var sOpMethods = oDataConversion.ErrorHandlingCheckBoxTS.split("~");
				for (var iopmethods = 0; iopmethods < sOpMethods.length; iopmethods++) {
					switch (sOpMethods[iopmethods]) {
						case "Error Log":
							that.byId("ErrorLog").setSelected(true);
							break;
						case "Audit Log":
							that.byId("AuditLog").setSelected(true);
							break;
						case "Error Report":
							that.byId("ErrorReport").setSelected(true);
							break;
						case "Return Requirement":
							that.byId("ReturnRequirement").setSelected(true);
							break;
						case "Validations":
							that.byId("Validations").setSelected(true);
							break;
					}
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "SecuritySectionCheckBoxTS";
			oParam.Fieldname = "SecuritySectionCheckBoxTS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecuritySectionCheckBoxTS", this.oDataConversionSuccess);
			if (oDataConversion.SecuritySectionCheckBoxTS) {
				var sOpMethods1 = oDataConversion.SecuritySectionCheckBoxTS.split("~");
				for (var iopmethods1 = 0; iopmethods1 < sOpMethods1.length; iopmethods1++) {
					switch (sOpMethods1[iopmethods1]) {
						case "HTTPS/SFTP":
							that.byId("HTTP_SFTP").setSelected(true);
							break;
						case "User Authorization":
							that.byId("UserAuthorization").setSelected(true);
							break;
						case "Encryption":
							that.byId("Encryption").setSelected(true);
							break;

					}
				}
			}

			var intDataConTS = {
				attachIntConTS: [],
				attachIntConTSVisible: false
			};
			var intDataConTSJSON = new sap.ui.model.json.JSONModel(intDataConTS);
			this.getView().setModel(intDataConTSJSON, "intDataConTS");
			//SOC Writwick 10 July 2018
			// this.readAttachments({
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: "S2",
			// 	FIELDNAME: "conversionUploadData",
			// 	TYPE: "O"
			// });
			this.readAttachments({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2",
				FIELDNAME: "conversionUploadData",
				TYPE: "O"
			});
			//EOC Writwick 10 July 2018

			var oModelConversion = this.getView().getModel("conversionData");
			oModelConversion.setData(oDataConversion);
			// oModelUA.setData(oUserAcceptance);
		},

		/*onSave: function() {
			var that = this;
			sap.m.MessageBox.show(
				"Do You want to save the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO]
					// onClose: function(oAction) {

					// 	if (oAction === "YES") {
					// 		that.onConfirmSave();
					// 		this.byId("oBTPrint2").setEnabled(true);
					// 	}

					// }
				}
			);
			var oDataReport = this.getView().getModel("conversionData").getData();

			if (oDataReport.userAcceptance[0] !== undefined) {
				var userAcceptTbl1 = Object.keys(oDataReport.userAcceptance[0]).map(function(key) {
					return [oDataReport.userAcceptance[0][key]];
				});
				var userAcceptTbl1Multi = userAcceptTbl1.join("~");
			}

			if (oDataReport.userAcceptance[1] !== undefined) {
				var userAcceptTbl2 = Object.keys(oDataReport.userAcceptance[1]).map(function(key) {
					return [oDataReport.userAcceptance[1][key]];
				});
				var userAcceptTbl2Multi = userAcceptTbl2.join("~");
			}

			var dataMappingTbl = Object.keys(oDataReport.dataMapping[0]).map(function(key) {
				return [oDataReport.dataMapping[0][key]];
			});

			var dataMappingTblMulti = dataMappingTbl.join("~");
			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

			// var oParam = {
			// 	Repid: 'CNV-083b-US-F-2104',
			// 	Projectkey: 'CNV',
			// 	Processid: 'PR003',
			// 	Stepno: 'S1',
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };
			
				var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var oParam = {
				Repid: dataObject.repid,
				Projectkey: dataObject.projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			oParam.Fieldname = "Object Title_TS";
			oParam.Fieldvalue = oDataReport.ObjectTitle;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Object ID_TS";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Development Package";
			oParam.Fieldvalue = oDataReport.DevelopmentPackage;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Type";
			oParam.Fieldvalue = oDataReport.Type;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Program Transaction";
			oParam.Fieldvalue = oDataReport.ProgramTransaction;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Screen Number";
			oParam.Fieldvalue = oDataReport.ScreenNumber;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Variant";
			oParam.Fieldvalue = oDataReport.Variant;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Print Transaction";
			oParam.Fieldvalue = oDataReport.PrintTransaction;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Selection Screen_TS";
			oParam.Fieldvalue = oDataReport.SelectionScreenTS;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Data Mapping";
			oParam.Fieldvalue = dataMappingTblMulti;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Restart Capability";
			oParam.Fieldvalue = oDataReport.RestartCapability;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Technical Assumptions and Dependencies";
			oParam.Fieldvalue = oDataReport.TechnicalAssumptionsDependencies;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Error Handling_TS";
			oParam.Fieldvalue = oDataReport.ErrorHandlingTS;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Security Section";
			oParam.Fieldvalue = oDataReport.SecuritySection;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataReport.Author;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataReport.Reviewer;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataReport.Approver;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "UA1";
			oParam.Fieldvalue = userAcceptTbl1Multi;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "UA2";
			oParam.Fieldvalue = userAcceptTbl2Multi;
			callServices.fnSubmitInMainTable(oParam);

			this.byId("onPrintConTS").setEnabled(true);

		},*/
		onSave: function() {
			var that = this;
			sap.m.MessageBox.show(
				"Do You want to save the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							sap.ui.getCore().oMessagePopover.removeAllItems();
							that.onConfirmSave();
							that.getView().byId("oBTSubmit").setVisible(true);
							that.getView().byId("oBTSubmit").setEnabled(true);
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(true);
							that.getView().byId("idPrintScreen").setVisible(true);
							that.getView().byId("idPrintScreen").setEnabled(true);
						}

					}
				}
			);

		},
		onConfirmSave: function() {
			var oDataReport = this.getView().getModel("conversionData").getData();
			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainerTS").setVisible(true);
			if (obj === "new") {
				this.oDataConversionSuccess = {
					ObjectTitle_TS: false,
					ObjectID: false,
					DevelopmentPackage: false,
					Type: false,
					ProgramTransaction: false,
					ScreenNumber: false,
					Variant: false,
					PrintTransaction: false,
					OtherAttributes: false,
					SelectionScreenTS: false,
					DataMapping1: false,
					RestartCapability: false,
					TechnicalAssumptionsDependencies: false,
					ErrorHandlingTS: false,
					SecuritySection: false,
					SecuritySectionCheckBoxTS: false,
					ErrorHandlingCheckBoxTS: false,
					Author_TS: false,
					Reviewer_TS: false,
					Approver_TS: false,
					userAcceptTemp: false,
					userAcceptance1: false,
					userAcceptance2: false
				};

				// Update Process Lane Starts
				var oCurrentView = this.getView();
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

			} else if (obj === "existing") {
				var oParam = "";
				try {
					oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

					// Update Process Lane Starts
					var oCurrentView = this.getView();

					oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();
					// Update Process Lane Ends

				} catch (exception) {
					return;
				}
			}

			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

			// var oParam = {
			// 	Repid: 'CNV-083b-US-F-2104',
			// 	Projectkey: 'CNV',
			// 	Processid: 'PR003',
			// 	Stepno: 'S1',
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Repid: 'CNV-083b-US-F-2104',
			// 	Projectkey: 'CNV',
			// 	Processid: 'PR003',
			// 	Stepno: 'S1',
			// 	Fieldname: ''
			// };
			var oDataOutputCheckBx = [];
			if (this.getView().byId("ErrorLog").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("ErrorLog").getText());
			}
			if (this.getView().byId("AuditLog").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("AuditLog").getText());
			}
			if (this.getView().byId("ErrorReport").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("ErrorReport").getText());
			}
			if (this.getView().byId("ReturnRequirement").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("ReturnRequirement").getText());
			}
			if (this.getView().byId("Validations").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("Validations").getText());
			}
			var oDataOutputCheckBxMulti = oDataOutputCheckBx.join("~");

			var oDataOutputCheckBx1 = [];
			if (this.getView().byId("HTTP_SFTP").getSelected()) {
				oDataOutputCheckBx1.push(this.getView().byId("HTTP_SFTP").getText());
			}
			if (this.getView().byId("UserAuthorization").getSelected()) {
				oDataOutputCheckBx1.push(this.getView().byId("UserAuthorization").getText());
			}
			if (this.getView().byId("Encryption").getSelected()) {
				oDataOutputCheckBx1.push(this.getView().byId("Encryption").getText());
			}

			var oDataOutputCheckBxMulti1 = oDataOutputCheckBx1.join("~");

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018

			oParam.Fieldname = "SecuritySectionCheckBoxTS";
			uParam.Fieldname = "SecuritySectionCheckBoxTS";
			oParam.Fieldvalue = oDataOutputCheckBxMulti1;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oDataConversionSuccess.SecuritySectionCheckBoxTS);

			oParam.Fieldname = "ErrorHandlingCheckBoxTS";
			uParam.Fieldname = "ErrorHandlingCheckBoxTS";
			oParam.Fieldvalue = oDataOutputCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oDataConversionSuccess.ErrorHandlingCheckBoxTS);

			oParam.Fieldname = "Object Title_TS";
			uParam.Fieldname = "Object Title_TS";
			oParam.Fieldvalue = oDataReport.ObjectTitle_TS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectTitle_TS);

			oParam.Fieldname = "Object ID_TS";
			uParam.Fieldname = "Object ID_TS";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectID);

			oParam.Fieldname = "Development Package";
			uParam.Fieldname = "Development Package";
			oParam.Fieldvalue = oDataReport.DevelopmentPackage;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.DevelopmentPackage);

			oParam.Fieldname = "Type";
			uParam.Fieldname = "Type";
			oParam.Fieldvalue = oDataReport.Type;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Type);

			oParam.Fieldname = "Program Transaction";
			uParam.Fieldname = "Program Transaction";
			oParam.Fieldvalue = oDataReport.ProgramTransaction;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ProgramTransaction);

			oParam.Fieldname = "Screen Number";
			uParam.Fieldname = "Screen Number";
			oParam.Fieldvalue = oDataReport.ScreenNumber;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ScreenNumber);

			oParam.Fieldname = "Variant";
			uParam.Fieldname = "Variant";
			oParam.Fieldvalue = oDataReport.Variant;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Variant);

			oParam.Fieldname = "Print Transaction";
			uParam.Fieldname = "Print Transaction";
			oParam.Fieldvalue = oDataReport.PrintTransaction;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.PrintTransaction);

			oParam.Fieldname = "Other Attributes";
			uParam.Fieldname = "Other Attributes";
			oParam.Fieldvalue = oDataReport.OtherAttributes;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.OtherAttributes);

			oParam.Fieldname = "Selection Screen_TS";
			uParam.Fieldname = "Selection Screen_TS";
			if (oDataReport.SelectionScreenTS) {
				oParam.Fieldvalue = "true";
			} else {
				oParam.Fieldvalue = "false";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SelectionScreenTS);

			/*oParam.Fieldname = "Data Mapping";
			uParam.Fieldname = "Data Mapping";
			oParam.Fieldvalue = oDataReport.DataMapping1;
			callServices.fnUpdateInMainTable(oParam, uParam,this.oDataConversionSuccess.DataMapping1);*/

			var iCountUA1, oUAEntry1, sUAEntry1;

			for (iCountUA1 = 0; iCountUA1 < oDataReport.dataMapping.length; iCountUA1++) {

				oDataReport.DataMapping1 = "";
				oParam.Fieldname = "TS_DataMapping_" + (iCountUA1 + 1);
				uParam.Fieldname = "TS_DataMapping_" + (iCountUA1 + 1);
				oUAEntry1 = oDataReport.dataMapping[iCountUA1];
				sUAEntry1 = oUAEntry1.Description + "~" + oUAEntry1.sourceField + "~" + oUAEntry1.dataType + "~" + oUAEntry1.lengthS + "~" +
					oUAEntry1.targetField + "~" + oUAEntry1.conversionRule + "~" + oUAEntry1.validationRule;
				oParam.Fieldvalue = sUAEntry1;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry1.flag);

			}

			oParam.Fieldname = "dataMappingText";
			uParam.Fieldname = "dataMappingText";
			oParam.Fieldvalue = oDataReport.dataMappingText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.dataMappingText);

			oParam.Fieldname = "Restart Capability";
			uParam.Fieldname = "Restart Capability";
			oParam.Fieldvalue = oDataReport.RestartCapability;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.RestartCapability);

			oParam.Fieldname = "Technical Assumptions and Dependencies";
			uParam.Fieldname = "Technical Assumptions and Dependencies";
			oParam.Fieldvalue = oDataReport.TechnicalAssumptionsDependencies;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.TechnicalAssumptionsDependencies);

			oParam.Fieldname = "Error Handling_TS";
			uParam.Fieldname = "Error Handling_TS";
			oParam.Fieldvalue = oDataReport.ErrorHandlingTS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandlingTS);

			oParam.Fieldname = "Security Section";
			uParam.Fieldname = "Security Section";
			oParam.Fieldvalue = oDataReport.SecuritySection;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SecuritySection);

			oParam.Fieldname = "Author_TS";
			uParam.Fieldname = "Author_TS";
			oParam.Fieldvalue = oDataReport.Author_TS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Author_TS);

			oParam.Fieldname = "Reviewer_TS";
			uParam.Fieldname = "Reviewer_TS";
			oParam.Fieldvalue = oDataReport.Reviewer_TS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Reviewer_TS);

			oParam.Fieldname = "Approver_TS";
			uParam.Fieldname = "Approver_TS";
			oParam.Fieldvalue = oDataReport.Approver_TS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Approver_TS);

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {

				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = "SAVED";
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_TS);

		},
		handleMessagePopoverPress: function(oEvent) {
			var temp = sap.ui.getCore().oMessagePopover.getModel().getData();
			var newarray = temp.filter(function(el) {
				return el.type !== "Success";
			});
			// var success = temp.find(o => o.type === 'Success');
			// var error = temp.find(o => o.type === 'Error');
			var success = temp.find(function(message) {
				return message.type === "Success";
			});
			var error = temp.find(function(message) {
				return message.type === "Error";
			});
			if (success && !error) {
				newarray.push({
					type: "Success",
					title: "Fields Updated",
					description: "All fields updated",
					icon: "sap-icon://message-success"
				});
				sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
			}
			if (success && error) {
				newarray.push({
					type: "Success",
					title: "Fields Updated",
					description: "All other fields updated",
					icon: "sap-icon://message-success"
				});
				sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
			}
			sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
		},

		onHold: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'ON HOLD';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_TS);
			this.getView().byId("oBTHold").setEnabled(true);

		},
		onSubmit: function() {

			var that = this;
			sap.m.MessageBox.show(
				"Do You want to Submit the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmSubmit();
							var user = that.getView().getModel("conversionData").getData().Approver_TS;
							var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;

							var oPayLoad = {
								Userid: user,
								Projectid: projectID
							};

							var oModelData = {
								Userid: user,
								Projectid: projectID,
								Email: ""
							};

							var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
							var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
							var oDataForMail = that.getView().getModel("conversionData").getData();
							var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
							var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
							callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							//SOC Writwick 10 July 2018
							// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Reviewer_TS, oDataForMail.Author_TS,
							// 	oDataForMail.ObjectTitle_TS);
							callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer_TS, oDataForMail.Author_TS,
								oDataForMail.ObjectTitle_TS);
							//EOC Writwick 10 July 2018
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(false);
							// that.getView().byId("idPrintScreen").setEnabled(true);
						}

					}
				}
			);

		},
		onConfirmSubmit: function() {

			//set staus here
			var that = this;
			//set staus here
			that.onConfirmSave();
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'SUBMITTED';

			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_TS);
			this.getView().byId("oBTHold").setEnabled(true);
			// Update Process Lane Starts
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("idPrintScreen").setVisible(true);
			//		oCurrentView.byId("oBTSubmit").setVisible(false);

			oCurrentView.byId("oBTSubmit").setVisible(false);
			oCurrentView.byId("oBTSave").setVisible(true);
			oCurrentView.byId("oBTSave").setEnabled(false);
			oCurrentView.byId("oBTApprove").setVisible(true);

		},
		onAccept: function() {

			var that = this;
			sap.m.MessageBox.show(
				"Do You want to Accept the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmAccept();
							that.byId("idPrintScreen").setEnabled(true);
							that.byId("idPrintScreen").setVisible(true);
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(false);

						}

					}
				}
			);

		},

		onConfirmAccept: function() {

			//set staus here
			this.onConfirmSave();
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018
			var that = this;
			var user = that.getView().getModel("conversionData").getData().Approver_TS;
			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;

			var oPayLoad = {
				Userid: user,
				Projectid: projectID
			};

			var oModelData = {
				Userid: user,
				Projectid: projectID,
				Email: ""
			};

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var oDataForMail = that.getView().getModel("conversionData").getData();
			var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
			callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
			//SOC Writwick 10 July 2018
			// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Author_TS, oDataForMail.Reviewer_TS,
			// 	oDataForMail.ObjectTitle_TS);
			callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Author_TS, oDataForMail.Reviewer_TS,
				oDataForMail.ObjectTitle_TS);
			//EOC Writwick 10 July 2018

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_TS);
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

			var oCurrentView = this.getView();
			// Update Process Lane Ends
			oCurrentView.byId("idPrintScreen").setVisible(true);

			oCurrentView.byId("oBTSubmit").setVisible(false);
			oCurrentView.byId("oBTApprove").setVisible(false);
			oCurrentView.byId("oBTAcceptApproval").setVisible(true);
			oCurrentView.byId("oBTAcceptApproval").setEnabled(false);

		},
		onApprove: function() {

			var that = this;
			sap.m.MessageBox.show(
				"Do You want to Approve the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmApprove();
							var user = that.getView().getModel("conversionData").getData().Approver_TS;
							var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;

							var oPayLoad = {
								Userid: user,
								Projectid: projectID
							};

							var oModelData = {
								Userid: user,
								Projectid: projectID,
								Email: ""
							};

							var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
							var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
							var oDataForMail = that.getView().getModel("conversionData").getData();
							var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
							var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
							callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							//SOC Writwick 10 July 2018
							// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Approver_TS, oDataForMail.Reviewer_TS,
							// 	oDataForMail.ObjectTitle_TS);
							callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver_TS, oDataForMail.Reviewer_TS,
								oDataForMail.ObjectTitle_TS);
							//EOC Writwick 10 July 2018
							that.byId("idPrintScreen").setVisible(true);

							that.byId("oBTSubmit").setVisible(false);
							that.byId("oBTApprove").setVisible(false);
							that.byId("oBTAcceptApproval").setVisible(true);
							that.byId("oBTAcceptApproval").setEnabled(true);
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(false);
						}

					}
				}
			);

		},

		onConfirmApprove: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };

			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: oInfo.repid,
			// 	Projectkey: oInfo.projectkey,
			// 	Processid: oInfo.processid,
			// 	Stepno: oInfo.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: oInfo.Repid,
				Projectkey: oInfo.Projectkey,
				Processid: oInfo.Processid,
				Stepno: oInfo.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_TS);

			var that = this;
			var user = that.getView().getModel("conversionData").getData().Approver_TS;
			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;

			var oPayLoad = {
				Userid: user,
				Projectid: projectID
			};

			var oModelData = {
				Userid: user,
				Projectid: projectID,
				Email: ""
			};

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var oDataForMail = that.getView().getModel("conversionData").getData();
			var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
			var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
			callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
			//SOC Writwick 10 July 2018
			// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Approver_TS, oDataForMail.Reviewer_TS,
			// 	oDataForMail.ObjectTitle_TS);
			callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver_TS, oDataForMail.Reviewer_TS,
				oDataForMail.ObjectTitle_TS);
			//EOC Writwick 10 July 2018

			var oCurrentView = this.getView();

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("idPrintScreen").setVisible(true);

			oCurrentView.byId("oBTSubmit").setVisible(false);
			oCurrentView.byId("oBTSave").setVisible(false);
			oCurrentView.byId("oBTApprove").setEnabled(false);
			this.getView().byId("oBTHold").setEnabled(false);
			this.getView().byId("oBTAcceptApproval").setVisible(false);
			

		},
		onPrint: function() {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// if (oParam && oParam.projectkey) {
			// 	var mParameter = "&version_id=" + versionno[1] + "&repid=" + oParam.repid + "&projectkey=" + oParam.projectkey + "&processid=" +
			// 		oParam.processid + "&stepno=" +
			// 		oParam.stepno + "&projectid=" + projectID;

			// 	if (oParam.projectkey === "CNV") {
			// 		sap.m.URLHelper.redirect(
			// 			"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Conversion_TS.html?sap-language=EN" + mParameter,
			// 			true);
			// 	}
			// }
			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&Projectid=" + projectID;

				if (oParam.Projectkey === "CNV") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Conversion_TS.html?sap-language=EN" + mParameter,
						true);
				}
			}
			//EOC Writwick 10 July 2018
		},

		addNewRowUA: function() {
			this.getView().getModel("conversionData").getData().userAcceptance.push({
				step: "",
				testtype: "",
				scenario: "",
				stepsperformed: "",
				actualresults: ""
			});
			this.getView().getModel("conversionData").refresh();
		},

		addNewRowUA1: function() {
			this.getView().getModel("conversionData").getData().dataMapping.push({
				Description: "",
				sourceField: "",
				lengthS: "",
				targetField: "",
				conversionRule: "",
				validationRule: ""
			});
			this.getView().getModel("conversionData").refresh();
		},

		deleteRowUA: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmDelete(sEvent);
						}

					}
				}
			);
			// }
		},

		onConfirmDelete: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };
			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018
			if (this.getView().getModel("conversionData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				var index1 = this.getView().getModel("conversionData").getData().userAcceptance.length;
				oUAEntry = this.getView().getModel("conversionData").getData().userAcceptance[index1 - 1];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_" + index1;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("conversionData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("conversionData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_1";
				this.deleteUserCall(oParam, uParam, index);
			}
		},

		deleteUserCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("conversionData").getData().userAcceptance.length === 1) {
							that.getView().getModel("conversionData").getData().userAcceptance.splice(0, 1);

							that.getView().getModel("conversionData").getData().userAcceptance.push({
								step: "",
								testType: "",
								scenario: "",
								stepsPer: "",
								actualResults: "",
								flag: false
							});
							that.getView().getModel("conversionData").refresh();
						} else {
							that.getView().getModel("conversionData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("conversionData").refresh();
							//that.updateUserAcc(oParam, uParam);
						}
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-success",
							type: 'Success',
							title: 'Details Deleted',
							description: messageServ

						});
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);

					},
					error: function(oResult, mHeader) {
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-error",
							type: 'Error',
							title: 'Error In Delete',
							description: messageServ

						});
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
		},
		//delete row for data mapping start	
		deleteRowUA1: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmDelete1(sEvent);
						}

					}
				}
			);
			// }
		},

		onConfirmDelete1: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			// var oParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: '',
			// 	Fieldvalue: '',
			// 	Longfieldvalue: ''
			// };
			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: ''
			// };
			var oParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			//EOC Writwick 10 July 2018
			if (this.getView().getModel("conversionData").getData().dataMapping.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/dataMapping/")[1];
				var index1 = this.getView().getModel("conversionData").getData().dataMapping.length;
				oUAEntry = this.getView().getModel("conversionData").getData().dataMapping[index1 - 1];
				sUAEntry = oUAEntry.Description + "~" + oUAEntry.sourceField + "~" + oUAEntry.dataType + "~" +
					oUAEntry.lengthS + "~" + oUAEntry.targetField + "~" + oUAEntry.conversionRule + "~" + oUAEntry.validationRule;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_DataMapping_" + index1;
				this.deleteUserCall1(oParam, uParam, index);
			} else if (this.getView().getModel("conversionData").getData().dataMapping.length === 1) {
				oUAEntry = this.getView().getModel("conversionData").getData().dataMapping[0];
				sUAEntry = oUAEntry.Description + "~" + oUAEntry.sourceField + "~" + oUAEntry.dataType + "~" +
					oUAEntry.lengthS + "~" + oUAEntry.targetField + "~" + oUAEntry.conversionRule + "~" + oUAEntry.validationRule;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_DataMapping_1";
				this.deleteUserCall1(oParam, uParam, index);
			}
		},

		deleteUserCall1: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("conversionData").getData().dataMapping.length === 1) {
							that.getView().getModel("conversionData").getData().dataMapping.splice(0, 1);

							that.getView().getModel("conversionData").getData().dataMapping.push({
								Description: "",
								sourceField: "",
								lengthS: "",
								targetField: "",
								conversionRule: "",
								validationRule: "",
								flag: false
							});
							that.getView().getModel("conversionData").refresh();
						} else {
							that.getView().getModel("conversionData").getData().dataMapping.splice(index, 1);
							that.getView().getModel("conversionData").refresh();
							//that.updateDataMap(oParam, uParam);
						}
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-success",
							type: 'Success',
							title: 'Details Deleted',
							description: messageServ

						});
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);

					},
					error: function(oResult, mHeader) {
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-error",
							type: 'Error',
							title: 'Error In Delete',
							description: messageServ

						});
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
		},

		//Attachment Code

		readAttachments: function(mParameter, oView) {

			if (!oView) {
				oView = this.getView();
			}
			var oVal;
			var sParam = "?$filter=";

			$.each(mParameter, function(key, val) {
				sParam += key + " eq '" + val + "' and ";
			});
			sParam = sParam.substr(0, sParam.length - 5);
			sParam += "&$format=json";

			// /sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet?$filter=PROJECTKEY%20eq%20%27ENH%27&$format=json
			var sServiceURL = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam,
				datatype: "application/json"
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("intDataConTS").getData().attachIntConTS = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataConTS").getData().attachIntConTS.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataConTS").getData().attachIntConTSVisible = true;
				});
				oView.getModel("intDataConTS").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},
		readAttachments1: function(mParameter, oView) {

			if (!oView) {
				oView = this.getView();
			}
			var oVal;
			var sParam = "?$filter=";

			$.each(mParameter, function(key, val) {
				sParam += key + " eq '" + val + "' and ";
			});
			sParam = sParam.substr(0, sParam.length - 5);
			sParam += "&$format=json";

			// /sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet?$filter=PROJECTKEY%20eq%20%27ENH%27&$format=json
			var sServiceURL = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam,
				datatype: "application/json"
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("intDataDet").getData().attachIntDet = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataDet").getData().attachIntDet.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataDet").getData().attachIntDetVisible = true;
				});
				oView.getModel("intDataDet").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},
		deleteFileFrmConvMapVali: function(oEvent) {
			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachintDataConTS");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: "S2",
				// 	FIELDNAME: "conversionUploadData",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "conversionUploadData",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataConTS"), "attachIntConTS",
					"attachIntConTSVisible");

			}
			oTable.setBusy(false);

		},
		deleteFileFrmConvMapValiC: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the attachment", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.deleteFileFrmConvMapVali(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},
		deleteFileintDataDetC: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the attachment", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.deleteFileintDataDet(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},
		deleteFileintDataDet: function(oEvent) {

			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachIntDet");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: oParam.stepno,
				// 	FIELDNAME: "ConvData_TS",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "ConvData_TS",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");

			}
			oTable.setBusy(false);

		},
		callAttachmentMap: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			// var oServiceParam = {
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: oParam.stepno
			// };
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};
			//EOC Writwick 10 July 2018

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachIntDet').getId()) {
				//callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet");
				// callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet", this.readAttachments1, oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "IntDet";

				if (this.getView().byId("fileUploadIntDet").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "ConvData_TS",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

				//this.readAttachments1(oServiceParam);

			}
		},
		callAttachment: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			// var oServiceParam = {
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: "S2"
			// };
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2"
			};
			//EOC Writwick 10 July 2018

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachConTSReq').getId()) {

				if (this.getView().byId("fileUploadConTSReq1").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadConTSReq1"), "conversionUploadData",
						oServiceParam, this.getView().getModel("intDataConTS"), "attachIntConTS", "attachIntConTSVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			}
		},

		//delete row for data mapping end

		onChange: function() {
			var that = this;

			this.getOwnerComponent().getRouter().navTo("conversionFS", {
				objectlist: that.mArguments.objectlist
			});
		},
		onNavBack: function() {
			var that = this;
			this.getOwnerComponent().getRouter().navTo("conversionFS", {
				objectlist: that.mArguments.objectlist
			});
		}
	});

});