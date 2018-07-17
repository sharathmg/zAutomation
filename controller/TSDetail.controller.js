var globalUserAcceptanceArrayData;
var globalUserAcceptanceArray;
var sHtmlEnh1 =
	'<b>Object Information</b><br><br><br><br><br><b>Technical Details</b><br><br><br><br><b>Technical Logic Flow</b><br><br><br><br><br><b>Program Structure and Processing</b>';
var sHtmlEnh2 =
	'<b>Technical Details</b><br><br><br><br><br><b>Technical Logic Flow</b><br><br><br><br><b>Program Structure and Processing</b><br><br><br><br><br><b>Printer Specific Requirements</b><br><br><br><br><br><b>Output Requirements</b><br><br><br><br><b>Sample Form Layout</b>';
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices"
], function(Controller, callServices) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.TSDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.TSDetail
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("techspec").attachPatternMatched(this.onObjectMatched, this);

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
			var oCurrentView = this.getView();
			var oModelProcFlowTS = new sap.ui.model.json.JSONModel(oDataProcessFlowLanesOnly);
			oCurrentView.setModel(oModelProcFlowTS, "pf2");
			oCurrentView.byId("processflow2").updateModel();
		},
		oReadWflDataSuccess: {

		},
		oReadFormDataSuccess: {

		},
		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S2";
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.byId("doctype").setSelectedKey("Technical");
			this.byId("idPopOverContainerTS").setVisible(false);
			this.byId("oDataService").setVisible(false);
			this.byId("otherInfo").setVisible(false);
			this.byId("mapping").setVisible(false);
			this.byId("enhancementsec").setVisible(false);
			this.byId("technicalLogicFlow").setVisible(false);
			this.byId("technicalAssumptions").setVisible(false);
			this.byId("Forminfo").setVisible(false);
			this.byId("Enhinfo").setVisible(false);
			this.byId("Enhinfotech").setVisible(false);
			this.byId("Tcode").setVisible(false);
			this.byId("optype").setVisible(false);
			this.byId("runMode").setVisible(false);
			this.byId("vol").setVisible(false);
			this.byId("ObjTyp").setVisible(false);
			this.byId("prname").setVisible(false);
			this.byId("stdtxt").setVisible(false);
			this.byId("lg").setVisible(false);
			this.byId("pgFormat").setVisible(false);
			this.byId("PRreq").setVisible(false);
			this.byId("opreq").setVisible(false);
			this.byId("Frlay").setVisible(false);

			this.byId("FrFontDetails").setVisible(false);
			this.byId("FT").setVisible(false);
			this.byId("FrDateFormat").setVisible(false);
			this.byId("FrCurrencyFormat").setVisible(false);
			this.byId("FrInterface").setVisible(false);
			this.byId("CustomObjectAttributes_frm").setVisible(false);

			this.byId("wfName").setVisible(false);
			this.byId("templateNo").setVisible(false);
			this.byId("wfDesc").setVisible(false);
			this.byId("busiObj").setVisible(false);
			this.byId("busiObjSubTyp").setVisible(false);
			this.byId("fioriApp").setVisible(false);
			this.byId("authObjUsed").setVisible(false);
			this.byId("wfStartCond").setVisible(false);
			this.byId("wfTrigFreq").setVisible(false);
			this.byId("trigEvt").setVisible(false);
			this.byId("devClass").setVisible(false);
			this.byId("CustomAttri").setVisible(false);
			this.byId("commLog").setVisible(false);
			this.byId("approvalTab").setVisible(false);
			this.byId("mappingTab").setVisible(false);

			// Reset Process Lane Starts
			var oCurrentView = this.getView();
			if (oCurrentView.byId("processflow2")._getLane("0")) {
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
			}
			// Reset Process Lane Ends

			this.byId("idPrintScreen").setVisible(false);

			var type = sap.ui.getCore().getModel().getData().Key;

			var oParam = "";
			try {
				oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

				if (oParam) {
					if (oParam.projectid) {
						this.oProjectId = oParam.projectid;
						delete oParam.projectid;
					}
				}
			} catch (exception) {
				return;
			}

			var title;

			if (oParam.Projectkey === "ENH" || type === "Enhancement") {
				title = "Enhancement";
				this.byId("Enhinfo").setVisible(true);
				this.byId("Enhinfotech").setVisible(true);
				this.byId("enhancementsec").setVisible(true);
				this.byId("technicalLogicFlow").setVisible(true);
				this.byId("technicalAssumptions").setVisible(true);
				this.byId("page").setTitle("[Enhancement] " + title);

				this.byId("formFlowChartPanel").setVisible(false);
				this.byId("technical_details").setVisible(false);
				this.byId("techAssumpDependPanel").setVisible(false);
				this.byId("processingLogic").setVisible(false);
				this.byId("Enherrinf").setVisible(false);

			} else if (oParam.Projectkey === "WFLW" || type === "Workflow") {
				title = "Workflow";
				this.byId("Forminfo").setVisible(true);
				this.byId("wfName").setVisible(true);
				this.byId("templateNo").setVisible(true);
				this.byId("wfDesc").setVisible(true);
				this.byId("psp_wfl").setVisible(true);
				this.byId("busiObj").setVisible(true);
				this.byId("busiObjSubTyp").setVisible(true);
				this.byId("fioriApp").setVisible(true);
				this.byId("authObjUsed").setVisible(true);
				this.byId("wfStartCond").setVisible(true);
				this.byId("wfTrigFreq").setVisible(true);
				this.byId("technical_details").setVisible(true);
				this.byId("trigEvt").setVisible(true);
				this.byId("devClass").setVisible(true);
				this.byId("CustomAttri").setVisible(true);

				this.byId("WFStepsPanel").setVisible(true);
				this.byId("WFConfigPanel").setVisible(true);
				this.byId("WFRestartCapPanel").setVisible(true);
				this.byId("WFAsumpDepPanel").setVisible(true);
				this.byId("WFErrorHandPanel").setVisible(true);
				this.byId("BusinessObjMEPanel").setVisible(true);

				this.byId("page").setTitle("[Workflow] " + title);
				this.byId("Enherrinf").setVisible(false);
				this.byId("formFlowChartPanel").setVisible(false);
				this.byId("techAssumpDependPanel").setVisible(false);
				this.byId("processingLogic").setVisible(false);
			} else if (oParam.Projectkey === "FRM" || type === "Form") {
				title = "Form";
				this.byId("Forminfo").setVisible(true);
				this.byId("Tcode").setVisible(true);
				this.byId("optype").setVisible(true);
				this.byId("psp_wfl").setVisible(false);
				this.byId("runMode").setVisible(true);
				this.byId("vol").setVisible(true);
				this.byId("technical_details").setVisible(false);
				this.byId("ObjTyp").setVisible(true);
				this.byId("prname").setVisible(true);
				this.byId("stdtxt").setVisible(true);
				this.byId("lg").setVisible(true);
				this.byId("pgFormat").setVisible(true);
				this.byId("PRreq").setVisible(true);
				this.byId("opreq").setVisible(true);
				this.byId("Frlay").setVisible(true);
				this.byId("Enherrinf").setVisible(true);
				this.byId("page").setTitle("[Form] " + title);

				this.byId("FrFontDetails").setVisible(true);
				this.byId("FT").setVisible(true);
				this.byId("FrDateFormat").setVisible(true);
				this.byId("FrCurrencyFormat").setVisible(true);
				this.byId("FrInterface").setVisible(true);

				this.byId("WFStepsPanel").setVisible(false);
				this.byId("WFConfigPanel").setVisible(false);
				this.byId("WFRestartCapPanel").setVisible(false);
				this.byId("BusinessObjMEPanel").setVisible(false);

				this.byId("formFlowChartPanel").setVisible(true);
				this.byId("techAssumpDependPanel").setVisible(true);
				this.byId("processingLogic").setVisible(true);

				this.byId("WFClass").setVisible(false);
				this.byId("TermitEvt").setVisible(false);
			}

			var obj = sap.ui.getCore().getModel().getData().Obj;
			if (obj === "new") {
				// this.byId("commLog").setVisible(false);
				this.byId("versiontypeNewTech").setVisible(true);
				this.byId("versiontypeExistingTech").setVisible(false);
				if (oParam.Projectkey === "WFLW") {
					this.getDataForWorkflow("N");
				} else if (oParam.Projectkey === "ENH") {
					this.dataReadEnhancement();
				} else if (oParam.Projectkey === "FRM") {
					this.dataRead2();
				}
			} else if (obj === "existing") {
				this.byId("versiontypeNewTech").setVisible(false);
				this.byId("versiontypeExistingTech").setVisible(true);
				if (oParam.Projectkey === "WFLW") {
					this.byId('versiontypeExistingTech').destroyItems();
					var oSelect = this.getView().byId("versiontypeExistingTech");
					var newItem = new sap.ui.core.Item({
						key: "Version 1.0",
						text: "Version 1.0"
					});
					oSelect.addItem(newItem);
					this.getDataForWorkflow("E");
				} else if (oParam.Projectkey === "ENH") {
					this.byId('versiontypeExistingTech').destroyItems();
					var oSelect = this.getView().byId("versiontypeExistingTech");
					var newItem = new sap.ui.core.Item({
						key: "Version 1.0",
						text: "Version 1.0"
					});
					oSelect.addItem(newItem);
					this.dataReadEnhancement();
				} else if (oParam.Projectkey === "FRM") {
					this.byId('versiontypeExistingTech').destroyItems();
					var oSelect = this.getView().byId("versiontypeExistingTech");
					var newItem = new sap.ui.core.Item({
						key: "Version 1.0",
						text: "Version 1.0"
					});
					oSelect.addItem(newItem);
					this.dataRead2();
				}
				this.byId("idPrintScreen").setVisible(true);
			}
		},
		getStatusEnhReview: function(flag) {
			this.getView().byId("input1").setEnabled(flag);
			this.getView().byId("ri1").setEnabled(flag);
			this.byId("reviewComment1").setVisible(flag);
		},
		dataReadEnhancement: function(versionNo) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			if (!oParam) {
				return;
			}

			oParam.Version = "1.0";

			var enhData = {
				Approver: "",
				Reviewer: "",
				Author: "",
				Enhancement: "",
				EnhancementType: "",
				EnhancementSpot: "",
				UserExitNames: "",
				FunctionExitNames: "",
				MenuExitNames: "",
				ScreenExitNames: "",
				TransactionCode: "",
				ProgramName: "",
				ProjectName: "",
				IncludeNames: "",
				BADIName: "",
				ObjName: "",
				ObjType: "",
				ObjDesc: "",
				Purpose: "",
				DescChange: "",
				TechnicalLogicFlow: "",
				TechnicalAssumptions: "",
				security: "",
				securityComments: "",
				ObjectId: "",
				ObjectTitle: "",
				userAcceptance: [],
				userAcceptTemp: "",
				userAccept1: "",
				attachEnhReq: [],
				HanaModelAttr: "",
				ReviewComments_ti: "",
				ReviewCommentsRating_ti: 0,
				OdataAttr: "",
				CustObjAttr: "",
				AbapHanaAttr: "",
				HanaModelAttr_wfl: "",
				CustObjAttr_wfl: "",
				AbapHanaAttr_wfl: "",
				TechLogflow_wfl: "",
				psp_wfl: "",
				attach_wfl: "",
				attachTechAssumpDep: [],
				attachEnhReqVisible: true,
				attachTechAssumpDepVisible: false,
				Status_TS: "",
				HeaderTitleTS: "",
				versionLatest: ""
			};

			this.oReadEnhanDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				Enhancement: false,
				EnhancementType: false,
				EnhancementSpot: false,
				UserExitNames: false,
				FunctionExitNames: false,
				MenuExitNames: false,
				ScreenExitNames: false,
				TransactionCode: false,
				ProgramName: false,
				ProjectName: false,
				IncludeNames: false,
				BADIName: false,
				TechnicalLogicFlow: false,
				TechnicalAssumptions: false,
				security: false,
				securityComments: false,
				ObjectId: false,
				ObjectTitle: false,
				userAcceptTemp: false,
				userAcceptance: false,
				ReviewComments_ti: false,
				ReviewCommentsRating_ti: false,
				Status_TS: false,
				HeaderTitleTS: false,
				versionLatest: false,
				HanaModelAttr_wfl: false,
				CustObjAttr_wfl: false,
				AbapHanaAttr_wfl: false,
				TechLogflow_wfl: false,
				psp_wfl: false,
				attach_wfl: false
			};

			if (versionNo) {
				oParam.Version = versionNo;

			} else {

				var num = 1;

				while (num > 0) {
					oParam.Fieldname = "Status_TS";
					callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadEnhanDataSuccess);
					enhData.versionLatest = enhData.Status_TS;
					//SOC Writwick 12 July 2018
					if (enhData.versionLatest !== "") {
						num = num + 1;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";

						if (enhData.versionLatest === "APPROVED") {
							var selectedKey = "Version " + oParam.Version;
							var oSelect = this.getView().byId("versiontypeExistingTech");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);

						}

						enhData.versionLatest = "";
						enhData.Status_TS = "";
						
					} else if (num > 1){
						//versiontypeExisting  
						//Version 3.0
						//this.byId("versiontypeExisting").setValueState("Version 3.0");
						oParam.Version = parseInt(oParam.Version) - 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
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

			oParam.Fieldname = "Status_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadEnhanDataSuccess);
			var statusLastVersion = enhData.Status_TS;

		

			if (statusLastVersion === "APPROVED" && versionNo === undefined) {

				//var crNumber=sessionStorage.getItem("crNumber");
				var crNumber = sap.ui.getCore().getModel("CRnumber").getData().CRINFO.CRNumber;
				if (crNumber === "") {
					this.getView().byId("oBTHold").setVisible(true);
					//	this.getView().byId("storynumber").setValue("");
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					this.byId('versiontypeExistingTech').removeItem(vItem);

				} else {
					//this.getView().byId("storynumber").setValue(crNumber);
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
				}

			}

			statusLastVersion = undefined;
			enhData.Status_TS = undefined;

			var enhJSON = new sap.ui.model.json.JSONModel(enhData);
			this.getView().setModel(enhJSON, "enhData");

			sap.ui.core.BusyIndicator.show();

			oParam.Fieldname = "Status_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadEnhanDataSuccess);

			var oCurrentView = this.getView();

			oCurrentView.byId("oBTSave").setVisible(true);
			oCurrentView.byId("oBTSubmit").setVisible(true);
			oCurrentView.byId("oBTApprove").setVisible(true);
			oCurrentView.byId("idPrintScreen").setVisible(true);

			oCurrentView.byId("oBTSave").setEnabled(true);
			oCurrentView.byId("oBTSubmit").setEnabled(true);
			oCurrentView.byId("oBTApprove").setEnabled(true);
			oCurrentView.byId("idPrintScreen").setEnabled(true);

			if (enhData.Status_TS === 'SAVED') {

				oCurrentView.byId("oBTSave").setEnabled(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("idPrintScreen").setVisible(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				this.getStatusEnhReview(false);
			} else if (enhData.Status_TS === 'ON HOLD') {
				oCurrentView.byId("oBTSave").setEnabled(true);
				this.getView().byId("oBTHold").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				//	oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				//	oCurrentView.byId("oBTPrint").setVisible(true);

			} else if (enhData.Status_TS === 'SUBMITTED') {

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
					this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("oBTApprove").setVisible(true);
				//oCurrentView.byId("idPrintScreen").setVisible(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				this.getStatusEnhReview(true);

			} else if (enhData.Status_TS === 'APPROVED') {

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
					this.getView().byId("oBTHold").setEnabled(false);
				//oCurrentView.byId("idPrintScreen").setVisible(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				this.getStatusEnhReview(false);

			} else {

				//var oCurrentView = this.getView();
				//oCurrentView.byId("oBTSave").setVisible(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("idPrintScreen").setVisible(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			}

			//oParam.Fieldname = "Object ID";
			//callServices.fnGetDataMainTable(oParam, enhData, "ObjectId", this.oReadEnhanDataSuccess);

			//	oParam.Fieldname = "Object Title";
			//	callServices.fnGetDataMainTable(oParam, enhData, "ObjectTitle", this.oReadEnhanDataSuccess);

			//	enhData.HeaderTitleTS = "Enhancement " + enhData.ObjectId + " - " + enhData.ObjectTitle;

			oParam.Fieldname = "Object ID";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjectId", this.oReadEnhanDataSuccess);

			var step = oParam.Stepno;
			oParam.Stepno = "S1";
			oParam.Fieldname = "Object Title";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjectTitle", this.oReadEnhanDataSuccess);
			oParam.Stepno = step;

			enhData.HeaderTitleTS = "Enhancement " + enhData.ObjectId + " - " + enhData.ObjectTitle;

			oParam.Fieldname = "Approver_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Approver", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Reviewer_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Reviewer", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Author_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Author", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "Enhancement";
			callServices.fnGetDataMainTable(oParam, enhData, "Enhancement", this.oReadEnhanDataSuccess);
			var aComplexityBtn = this.byId("enhRad").getButtons();
			for (var iCount = 0; iCount < aComplexityBtn.length; iCount++) {
				if (aComplexityBtn[iCount].getText() === enhData.Enhancement) {
					this.byId("enhRad").setSelectedIndex(iCount);
					break;
				}
			}

			oParam.Fieldname = "Enhancement Type";
			callServices.fnGetDataMainTable(oParam, enhData, "EnhancementType", this.oReadEnhanDataSuccess);
			var aComplexityBtn1 = this.byId("enhRad1").getButtons();
			for (var iCount = 0; iCount < aComplexityBtn1.length; iCount++) {
				if (aComplexityBtn1[iCount].getText() === enhData.EnhancementType) {
					this.byId("enhRad1").setSelectedIndex(iCount);
					break;
				}
			}

			oParam.Fieldname = "Enhancement Spot";
			callServices.fnGetDataMainTable(oParam, enhData, "EnhancementSpot", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "User Exit Names";
			callServices.fnGetDataMainTable(oParam, enhData, "UserExitNames", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Function Exit Names";
			callServices.fnGetDataMainTable(oParam, enhData, "FunctionExitNames", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Menu Exit Names";
			callServices.fnGetDataMainTable(oParam, enhData, "MenuExitNames", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Screen%20Exit%20Names%2FScreen";
			callServices.fnGetDataMainTable(oParam, enhData, "ScreenExitNames", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Transaction Code";
			callServices.fnGetDataMainTable(oParam, enhData, "TransactionCode", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Program Name";
			callServices.fnGetDataMainTable(oParam, enhData, "ProgramName", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Project Name";
			callServices.fnGetDataMainTable(oParam, enhData, "ProjectName", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Include Names";
			callServices.fnGetDataMainTable(oParam, enhData, "IncludeNames", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "BADI Name";
			callServices.fnGetDataMainTable(oParam, enhData, "BADIName", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "ObjName";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjName", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "ObjType";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjType", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "ObjDesc";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjDesc", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "Purpose";
			callServices.fnGetDataMainTable(oParam, enhData, "Purpose", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "DescChange";
			oParam.Fieldname = "Review_Comments_ti";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewComments_ti", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Review_CommentsRating_ti";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewCommentsRating_ti", this.oReadEnhanDataSuccess);
			enhData.ReviewCommentsRating_ti = parseInt(enhData.ReviewCommentsRating_ti);
			callServices.fnGetDataMainTable(oParam, enhData, "DescChange", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "HanaModelAttr_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "HanaModelAttr_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "CustObjAttr_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "CustObjAttr_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "AbapHanaAttr_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "AbapHanaAttr_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "TechLogflow_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "TechLogflow_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "psp_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "psp_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "attach_wfl";
			callServices.fnGetDataMainTable(oParam, enhData, "attach_wfl", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "Technical Logic Flow";
			callServices.fnGetDataMainTable(oParam, enhData, "TechnicalLogicFlow", this.oReadEnhanDataSuccess);
			if (!enhData.TechnicalLogicFlow) {
				enhData.TechnicalLogicFlow = sHtmlEnh1;
			}
			oParam.Fieldname = "Technical Assumptions and Dependencies";
			callServices.fnGetDataMainTable(oParam, enhData, "TechnicalAssumptions", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Security_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "security", this.oReadEnhanDataSuccess);

			if (enhData.security) {
				var sSecurityOpt = enhData.security.split("~");
				for (var iSecurity = 0; iSecurity < sSecurityOpt.length; iSecurity++) {
					switch (sSecurityOpt[iSecurity]) {
						case "HTTPS/SFTP":
							this.byId("CB2-01").setSelected(true);
							break;
						case "User Authorization":
							this.byId("CB2-02").setSelected(true);
							break;
						case "Encryption":
							this.byId("CB2-03").setSelected(true);
							break;
					}
				}
			}

			oParam.Fieldname = "Security section";
			callServices.fnGetDataMainTable(oParam, enhData, "securityComments", this.oReadEnhanDataSuccess);
			var iCountUA, sUserAcptCols;

			for (iCountUA = 0;; iCountUA++) {

				enhData.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);

				callServices.fnGetDataMainTableUC(oParam, enhData, "userAcceptTemp", this.oReadEnhanDataSuccess);
				if (this.oReadEnhanDataSuccess.userAcceptTemp) {
					if (enhData.userAcceptTemp) {
						sUserAcptCols = enhData.userAcceptTemp.split("~");
						if (sUserAcptCols && sUserAcptCols.length >= 6) {
							enhData.userAcceptance.push({
								step: sUserAcptCols[0],
								testType: sUserAcptCols[1],
								scenario: sUserAcptCols[2],
								testData: sUserAcptCols[3],
								stepsPer: sUserAcptCols[4],
								actualResults: sUserAcptCols[5],
								expectedResults: sUserAcptCols[6],
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
			if (enhData.userAcceptance.length === 0) {
				enhData.userAcceptance.push({
					step: "",
					testType: "",
					scenario: "",
					testData: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: "",
					flag: false
				});
			}

			// oParam.Fieldname = "TS_UA1";
			// callServices.fnGetDataMainTable(oParam, enhData, "userAccept1", this.oReadEnhanDataSuccess);

			// var sUserAcptCols;
			// if (enhData.userAccept1) {
			// 	sUserAcptCols = enhData.userAccept1.split("~");
			// 	if (sUserAcptCols && sUserAcptCols.length === 5) 
			// 	{
			// 		var sDataUA = {};
			// 		sDataUA.step = sUserAcptCols[0];
			// 		sDataUA.testType = sUserAcptCols[1];
			// 		sDataUA.scenario = sUserAcptCols[2];
			// 		sDataUA.stepsPer = sUserAcptCols[3];
			// 		sDataUA.actualResults = sUserAcptCols[4];
			// 		enhData.userAcceptance.push(sDataUA);
			// 	}
			// } 
			// else {
			// 	enhData.userAcceptance.push({
			// 		step: "",
			// 		testType: "",
			// 		scenario: "",
			// 		stepsPer: "",
			// 		actualResults: ""
			// 	});
			// }

			/*this.readAttachments({
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: oParam.stepno,
				FIELDNAME: "TechFlowLogic",
				TYPE: "O"
			});

			this.readAttachmentsTechAssumpDep({
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: oParam.stepno,
				FIELDNAME: "TechAssumptions",
				TYPE: "O"
			});*/

			var intDataTechAssDep = {
				attachIntTechAssDep: [],
				attachIntTechAssDepVisible: true
			};
			var intDataTechAssDepJSON = new sap.ui.model.json.JSONModel(intDataTechAssDep);
			this.getView().setModel(intDataTechAssDepJSON, "intDataTechAssDepJSON");
			var intDataTechAssDep1 = {
				attachIntTechAssDep1: [],
				attachIntTechAssDepVisible1: true
			};
			var intDataTechAssDepJSON1 = new sap.ui.model.json.JSONModel(intDataTechAssDep1);
			this.getView().setModel(intDataTechAssDepJSON1, "intDataTechAssDepJSON1");
			var intDataTechAssDep2 = {
				attachIntTechAssDep2: [],
				attachIntTechAssDepVisible2: true
			};
			var intDataTechAssDepJSON2 = new sap.ui.model.json.JSONModel(intDataTechAssDep2);
			this.getView().setModel(intDataTechAssDepJSON2, "intDataTechAssDepJSON2");
			var intDataTechAssDep3 = {
				attachIntTechAssDep3: [],
				attachIntTechAssDepVisible3: true
			};
			var intDataTechAssDepJSON3 = new sap.ui.model.json.JSONModel(intDataTechAssDep3);
			this.getView().setModel(intDataTechAssDepJSON3, "intDataTechAssDepJSON3");
			var intDataTechAssDep4 = {
				attachIntTechAssDep4: [],
				attachIntTechAssDepVisible4: true
			};
			var intDataTechAssDepJSON4 = new sap.ui.model.json.JSONModel(intDataTechAssDep4);
			this.getView().setModel(intDataTechAssDepJSON4, "intDataTechAssDepJSON4");
			var intDataTechAssDep5 = {
				attachIntTechAssDep5: [],
				attachIntTechAssDepVisible5: true
			};
			var intDataTechAssDepJSON5 = new sap.ui.model.json.JSONModel(intDataTechAssDep5);
			this.getView().setModel(intDataTechAssDepJSON5, "intDataTechAssDepJSON5");
			var intDataTechAssDep6 = {
				attachIntTechAssDep6: [],
				attachIntTechAssDepVisible6: true
			};
			var intDataTechAssDepJSON6 = new sap.ui.model.json.JSONModel(intDataTechAssDep6);
			this.getView().setModel(intDataTechAssDepJSON6, "intDataTechAssDepJSON6");
			var intDataTechAssDep7 = {
				attachIntTechAssDep7: [],
				attachIntTechAssDepVisible7: true
			};
			var intDataTechAssDepJSON7 = new sap.ui.model.json.JSONModel(intDataTechAssDep7);
			this.getView().setModel(intDataTechAssDepJSON7, "intDataTechAssDepJSON7");
			var intDataTechAssDepJSON1 = new sap.ui.model.json.JSONModel(intDataTechAssDep1);
			this.getView().setModel(intDataTechAssDepJSON1, "intDataTechAssDepJSON1");
			var intDataTechAssDep2_wfl = {
				attachIntTechAssDep2_wfl: [],
				attachIntTechAssDepVisible2_wfl: true
			};
			var intDataTechAssDepJSON2_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep2_wfl);
			this.getView().setModel(intDataTechAssDepJSON2_wfl, "intDataTechAssDepJSON2_wfl");
			var intDataTechAssDep3_wfl = {
				attachIntTechAssDep3_wfl: [],
				attachIntTechAssDepVisible3_wfl: true
			};
			var intDataTechAssDepJSON3_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep3_wfl);
			this.getView().setModel(intDataTechAssDepJSON3_wfl, "intDataTechAssDepJSON3_wfl");
			var intDataTechAssDep4_wfl = {
				attachIntTechAssDep4_wfl: [],
				attachIntTechAssDepVisible4_wfl: true
			};
			var intDataTechAssDepJSON4_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep4_wfl);
			this.getView().setModel(intDataTechAssDepJSON4_wfl, "intDataTechAssDepJSON4_wfl");
			var intDataTechAssDep5_wfl = {
				attachIntTechAssDep5_wfl: [],
				attachIntTechAssDepVisible5_wfl: true
			};
			var intDataTechAssDepJSON5_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep5_wfl);
			this.getView().setModel(intDataTechAssDepJSON5_wfl, "intDataTechAssDepJSON5_wfl");
			var intDataTechAssDep6_wfl = {
				attachIntTechAssDep6_wfl: [],
				attachIntTechAssDepVisible6_wfl: true
			};
			var intDataTechAssDepJSON6_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep6_wfl);
			this.getView().setModel(intDataTechAssDepJSON6, "intDataTechAssDepJSON6_wfl");
			var intDataTechAssDep7_wfl = {
				attachIntTechAssDep7_wfl: [],
				attachIntTechAssDepVisible7_wfl: true
			};
			var intDataTechAssDepJSON7_wfl = new sap.ui.model.json.JSONModel(intDataTechAssDep7_wfl);
			this.getView().setModel(intDataTechAssDepJSON7_wfl, "intDataTechAssDepJSON7_wfl");

			this.readAttachmentsTechAssDep({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2",
				FIELDNAME: "TechAssDepUploadData",
				TYPE: "O"
			});

			var oreadAttachmentsFlow = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2",
				FIELDNAME: "TechFlowLogic",
				TYPE: "O"
			};
			callServices.readAttachmentList(oreadAttachmentsFlow, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");

			/*	var oreadAttachmentsAssump = {
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: "S2",
				FIELDNAME: "TechAssumptions",
				TYPE: "O"
			};
			callServices.readAttachmentList(oreadAttachmentsAssump, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
*/
			sap.ui.core.BusyIndicator.hide();

			enhJSON.setData(enhData);

		},

		resetFormElements: function() {
			var that = this;

			that.byId("FOREGROUND").setSelected(false);
			that.byId("BACKGROUND").setSelected(false);
			that.byId("BOTH").setSelected(false);

			that.byId("SAPSCRIPT").setSelected(false);
			that.byId("ADOBEFORM").setSelected(false);
			that.byId("SMARTFORM").setSelected(false);

			that.byId("DINA4").setSelected(false);
			that.byId("Letter").setSelected(false);
			that.byId("Other").setSelected(false);

			this.byId("CB2-01").setSelected(false);
			this.byId("CB2-02").setSelected(false);
			this.byId("CB2-03").setSelected(false);

			that.byId("RB-Margins-Left").setSelected(true);
			that.byId("RB-Margins-Right").setSelected(false);
		},

		onHold: function() {
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oCurrentView = this.getView();

			var oParam = "";
			try {
				oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

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

				oParam.Fieldname = "STATUS_TS";
				uParam.Fieldname = "STATUS_TS";
				oParam.Fieldvalue = "ON HOLD";

				if (oParam.Projectkey === "ENH") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);

				} else if (oParam.Projectkey === "WFLW") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Status_TS);

				} else if (oParam.Projectkey === "FRM") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);

				}
			} catch (exception) {
				return;
			}

			this.getView().byId("oBTHold").setEnabled(false);
		},

		// Form data call 
		dataRead2: function(Version) {
			this.resetFormElements();
			var key = "FRM";
			this.getDataforARA(key);
			var that = this;
			globalUserAcceptanceArray = [];

			var enhData = {
				HeaderTitleTS: "",
				Approver: "",
				Reviewer: "",
				Author: "",
				security: "",
				securityComments: "",
				userAcceptance: [],
				userAcceptanceString: "",
				Status_TS: "",
				versionLatest: ""
			};

			var FrmData = {
				"PrintTR": "",
				"OutputTypes": "",
				"RunMode": "",
				"DataVol": "",
				"Type": "",
				"PrintName": "",
				"StdText": "",
				"Logo": "",
				"PageFormat": "",
				"PrintSP": "",
				"OpReq": "",
				"Sample": "",
				"attachFrmFlowChartReq": [],
				"attachFrmFlowChartReqVisible": false,
				"TechnicalAssumptions": "",
				"ProcessingLogic": "",
				"ErrInfo": "",
				"HanaModelAttr_frm": "",
				"OdataAttr_frm": "",
				"CustObjAttr_frm": "",
				"AbapHanaAttr_frm": "",
				attach_wfl: "",
				"FormInterface": "",
				"FontDetails": "",
				"DateFormat": "",
				"CurrencyFormat": "",
				"Margins": "",
				"ProcessingLogic_Comments": "",
				"FlowLogic_Comments": "",
				"TechAss_Comments": "",
				"FormErrorHandling_Comments": "",
				"ProcessingLogic_Review": "",
				"FlowLogic_Review": "",
				"TechAss_Review": "",
				"FormErrorHandling_Review": ""
			};

			this.oReadFormDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				PrintTR: false,
				OutputTypes: false,
				RunMode: false,
				DataVol: false,
				Type: false,
				PrintName: false,
				StdText: false,
				Logo: false,
				PageFormat: false,
				PrintSP: false,
				OpReq: false,
				Sample: false,
				security: false,
				securityComments: false,
				userAcceptanceString: false,
				Status_TS: false,
				TechnicalAssumptions: false,
				ProcessingLogic: false,
				FormInterface: false,
				FontDetails: false,
				DateFormat: false,
				ProcessingLogic_Comments: false,
				FlowLogic_Comments: false,
				TechAss_Comments: false,
				FormErrorHandling_Comments: false,
				ProcessingLogic_Review: false,
				FlowLogic_Review: false,
				TechAss_Review: false,
				FormErrorHandling_Review: false,
				CurrencyFormat: false,
				Margins: false,
				"HanaModelAttr_frm": "",
				"OdataAttr_frm": "",
				attach_wfl: "",
				"CustObjAttr_frm": "",
				"AbapHanaAttr_frm": ""
			};

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			/*	if (!oParam) {
					return;
				}

				oParam.Version = "1.0";

				if (versionNo) {
					oParam.Version = versionNo;

				} else {

					var num = 1;

					while (num > 0) {
						oParam.Fieldname = "Status_TS";
						callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);
						enhData.versionLatest = enhData.Status_TS;
						if (enhData.versionLatest !== undefined) {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							if (enhData.versionLatest === "ACCEPTED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExistingTech");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							enhData.versionLatest = undefined;
							enhData.Status_TS = undefined;
						} else {
							//versiontypeExisting  
							//Version 3.0
							//this.byId("versiontypeExisting").setValueState("Version 3.0");
							oParam.Version = parseInt(oParam.Version) - 1;
							oParam.Version = (oParam.Version).toString() + ".0";
							var selectedKey = "Version " + oParam.Version;
							this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
							num = -1;
						}
					}

				}

				oParam.Fieldname = "Status_TS";
				callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);
				var statusLastVersion = enhData.Status_TS;

				if (statusLastVersion === "ACCEPTED" && versionNo === undefined) {

					//var crNumber=sessionStorage.getItem("crNumber");
					var crNumber = sap.ui.getCore().getModel("CRnumber").getData().CRINFO.CRNumber;
					if (crNumber === "") {
						//	this.getView().byId("storynumber").setValue("");
						oParam.Version = parseInt(oParam.Version);
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

						var vItem = parseInt(oParam.Version);
						this.byId('versiontypeExistingTech').removeItem(vItem);

					} else {
						//this.getView().byId("storynumber").setValue(crNumber);
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
					}

				}

				statusLastVersion = undefined;
				enhData.Status_TS = undefined;*/

			////Added by utkarsh

			if (!oParam) {
				return;
			}
			if (oParam) {
				if (oParam.projectid) {
					delete oParam.projectid;
				}
			}
			oParam.Version = "1.0";
			this.getView().byId("idPrintScreen").setVisible(true);

			if (Version) {
				oParam.Version = Version;
				var crNumber1 = sessionStorage.getItem("crNumber");
				var crData = sessionStorage.getItem("crData");
				if (crNumber1 !== "") {
					// this.getView().byId("storynumber").setValue(crNumber1);
					enhData.StoryNumberFComment = crNumber1;
				}
			} else {

				var num = 1;

				while (num > 0) {
					oParam.Fieldname = "Status_TS";
					callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);
					enhData.versionLatest = enhData.Status_TS;
					if (enhData.versionLatest !== undefined) {
						num = num + 1;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";

						if (enhData.versionLatest === "APPROVED") {
							var selectedKey = "Version " + oParam.Version;
							var oSelect = this.getView().byId("versiontypeExistingTech");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);

						}

						enhData.versionLatest = undefined;
						enhData.Status_TS = undefined;
					} else {
						//versiontypeExistingTech  
						//Version 3.0
						//this.byId("versiontypeExistingTech").setValueState("Version 3.0");
						oParam.Version = parseInt(oParam.Version) - 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
						num = -1;
					}
				}
			}

			oParam.Fieldname = "Status_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);
			var statusLastVersion = enhData.Status_TS;
			var statusLast = statusLastVersion;

		
			if (statusLastVersion === "APPROVED" && Version === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					this.getView().byId("oBTHold").setVisible(true);
					// this.getView().byId("storynumber").setValue("");
					enhData.StoryNumberFComment = "";
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					this.byId('versiontypeExistingTech').removeItem(vItem);

				} else {
					this.CROpen = sessionStorage.getItem("crData");

					// this.getView().byId("storynumber").setValue(crNumber);
					enhData.StoryNumberFComment = crNumber;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
					//	statusLast = undefined;
				}

			}

			statusLastVersion = undefined;
			enhData.Status_TS = undefined;

			///////////////

			enhData.Status_TS = "";
			oParam.Fieldname = "Status_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);

			if (enhData.Status_TS === 'SAVED') {

				var oCurrentView = this.getView();
				/*	oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setVisible(true); //New Change
					//	oCurrentView.byId("oBTApprove").setVisible(false); //New Change
					//	oCurrentView.byId("oBTAcceptApproval").setVisible(false); //New Change
					oCurrentView.byId("idPrintScreen").setVisible(true);*/
				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(true);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getReviewDataForm(false);
				this.getFormReviewComments(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				//		oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (enhData.Status_TS === 'ON HOLD') {
				oCurrentView.byId("oBTSave").setEnabled(false);

				oCurrentView.byId("oBTSubmit").setEnabled(false);
				//	oCurrentView.byId("oBTApprove").setVisible(false);
				//	oCurrentView.byId("oBTApprove").setEnabled(false);
				//	oCurrentView.byId("oBTPrint").setVisible(true);

			}
			//New Change
			else if (enhData.Status_TS === 'SUBMITTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Submit");
					this.getView().byId("oBTHold").setEnabled(true);
				//	oCurrentView.byId("oBTApprove").setVisible(true);
				//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getReviewDataForm(true);
				this.getFormReviewComments(true);
				//				this.getStatusEnhReview(true);
				//	this.byId("reviewComment1").setVisible(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				//			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (enhData.Status_TS === 'APPROVED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSubmit").setEnabled(false);
					this.getView().byId("oBTHold").setEnabled(false);
				//		oCurrentView.byId("oBTApprove").setVisible(false);
				//		oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				//				this.getStatusEnhReview(true);
				this.getReviewDataForm(true);
				this.getFormReviewComments(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				//	oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();

			}
			/*
			else if (FrmData.Status_TS === 'ACCEPTED') {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Accept");
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
					//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					oCurrentView.byId("idPrintScreen").setVisible(true);
				//	this.getReviewData(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				//	oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();

				}*/

			//New Change End
			else {

				var oCurrentView = this.getView();

				// 		oCurrentView.byId("oBTSave").setVisible(true);
				// 		oCurrentView.byId("oBTSubmit").setVisible(true); //New Change
				// //		oCurrentView.byId("oBTApprove").setVisible(false); //New Change
				// //		oCurrentView.byId("oBTAcceptApproval").setVisible(false); //New Change
				// 		oCurrentView.byId("idPrintScreen").setVisible(false);

				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("idPrintScreen").setVisible(true);
				this.getReviewDataForm(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				//			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			}
			var procArea = callServices.fnGetProccessArea(FrmData);
			var availSys = callServices.fnGetAvailableSystems(FrmData);

			if (statusLast === "APPROVED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
					sessionStorage.getItem("crNumber") !== "")) {
				oParam.Version = parseInt(oParam.Version) - 1;
				oParam.Version = (oParam.Version).toString() + ".0";
			}

			//////

			var oModelForms = new sap.ui.model.json.JSONModel();
			var oModelForms1 = new sap.ui.model.json.JSONModel();

			this.getView().setModel(oModelForms, "FrmData");
			this.getView().setModel(oModelForms1, "enhData");

			enhData.HeaderTitleTS = "Forms " + oParam.Repid;
			enhData.Status_TS = undefined;
			oParam.Fieldname = "Status_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Status_TS", this.oReadFormDataSuccess);

			var oCurrentView = this.getView();

			/*	oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("idPrintScreen").setVisible(true);

				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTApprove").setEnabled(true);
				oCurrentView.byId("idPrintScreen").setEnabled(true);

				if (enhData.Status_TS === 'SAVED') {

					//oCurrentView.byId("oBTSave").setVisible(true);
					//oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTApprove").setVisible(false);
					//oCurrentView.byId("idPrintScreen").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (enhData.Status_TS === 'SUBMITTED') {

					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					//oCurrentView.byId("oBTApprove").setVisible(true);
					//oCurrentView.byId("idPrintScreen").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").updateModel();

				} else if (enhData.Status_TS === 'ACCEPTED') {

					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					oCurrentView.byId("oBTApprove").setEnabled(false);
					//oCurrentView.byId("idPrintScreen").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();

				} else {

					//var oCurrentView = this.getView();
					//oCurrentView.byId("oBTSave").setVisible(true);
					//oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTApprove").setVisible(false);
					oCurrentView.byId("idPrintScreen").setVisible(false);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				}*/

			oParam.Fieldname = "Margins";
			callServices.fnGetDataMainTable(oParam, FrmData, "Margins", this.oReadFormDataSuccess);
			var sMargins = FrmData.Margins.split("~");
			for (var iMargins = 0; iMargins < sMargins.length; iMargins++) {
				switch (sMargins[iMargins]) {
					case "Left":
						that.byId("RB-Margins-Left").setSelected(true);
						break;
					case "Right":
						that.byId("RB-Margins-Right").setSelected(true);
						break;
				}
			}
			var intDataTechAssDep2_frm = {
				attachIntTechAssDep2_frm: [],
				attachIntTechAssDepVisible2_frm: true
			};
			var intDataTechAssDepJSON2_frm = new sap.ui.model.json.JSONModel(intDataTechAssDep2_frm);
			this.getView().setModel(intDataTechAssDepJSON2_frm, "intDataTechAssDepJSON2_frm");
			var intDataTechAssDep3_frm = {
				attachIntTechAssDep3_frm: [],
				attachIntTechAssDepVisible3_frm: true
			};
			var intDataTechAssDepJSON3_frm = new sap.ui.model.json.JSONModel(intDataTechAssDep3_frm);
			this.getView().setModel(intDataTechAssDepJSON3_frm, "intDataTechAssDepJSON3_frm");
			var intDataTechAssDep4_frm = {
				attachIntTechAssDep4_frm: [],
				attachIntTechAssDepVisible4_frm: true
			};
			var intDataTechAssDepJSON4_frm = new sap.ui.model.json.JSONModel(intDataTechAssDep4_frm);
			this.getView().setModel(intDataTechAssDepJSON4_frm, "intDataTechAssDepJSON4_frm");
			var intDataTechAssDep5_frm = {
				attachIntTechAssDep5_frm: [],
				attachIntTechAssDepVisible5_frm: true
			};
			var intDataTechAssDepJSON5_frm = new sap.ui.model.json.JSONModel(intDataTechAssDep5_frm);
			this.getView().setModel(intDataTechAssDepJSON5_frm, "intDataTechAssDepJSON5_frm");
			oParam.Fieldname = "FormInterface";
			callServices.fnGetDataMainTable(oParam, FrmData, "FormInterface", this.oReadFormDataSuccess);

			oParam.Fieldname = "FontDetails";
			callServices.fnGetDataMainTable(oParam, FrmData, "FontDetails", this.oReadFormDataSuccess);

			oParam.Fieldname = "DateFormat";
			callServices.fnGetDataMainTable(oParam, FrmData, "DateFormat", this.oReadFormDataSuccess);

			oParam.Fieldname = "CurrencyFormat";
			callServices.fnGetDataMainTable(oParam, FrmData, "CurrencyFormat", this.oReadFormDataSuccess);

			oParam.Fieldname = "TechnicalAssumptions";
			callServices.fnGetDataMainTable(oParam, FrmData, "TechnicalAssumptions", this.oReadFormDataSuccess);

			oParam.Fieldname = "ProcessingLogic";
			callServices.fnGetDataMainTable(oParam, FrmData, "ProcessingLogic", this.oReadFormDataSuccess);
			if (!FrmData.ProcessingLogic) {
				FrmData.ProcessingLogic = sHtmlEnh2;
			}
			oParam.Fieldname = "CustObjAttr_frm";
			callServices.fnGetDataMainTable(oParam, FrmData, "CustObjAttr_frm", this.oReadFormDataSuccess);
			oParam.Fieldname = "HanaModelAttr_frm";
			callServices.fnGetDataMainTable(oParam, FrmData, "HanaModelAttr_frm", this.oReadFormDataSuccess);
			oParam.Fieldname = "OdataAttr_frm";
			callServices.fnGetDataMainTable(oParam, FrmData, "OdataAttr_frm", this.oReadFormDataSuccess);
			oParam.Fieldname = "AbapHanaAttr_frm";
			callServices.fnGetDataMainTable(oParam, FrmData, "AbapHanaAttr_frm", this.oReadFormDataSuccess);
			oParam.Fieldname = "attach_wfl";
			callServices.fnGetDataMainTable(oParam, FrmData, "attach_wfl", this.oReadFormDataSuccess);
			oParam.Fieldname = "Approver_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Approver", this.oReadFormDataSuccess);

			oParam.Fieldname = "Reviewer_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Reviewer", this.oReadFormDataSuccess);

			oParam.Fieldname = "Author_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "Author", this.oReadFormDataSuccess);

			oParam.Fieldname = "PrinterTransaction";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrintTR", this.oReadFormDataSuccess);

			oParam.Fieldname = "OutputType";
			callServices.fnGetDataMainTable(oParam, FrmData, "OutputTypes", this.oReadFormDataSuccess);
			oParam.Fieldname = "ErrInfo";
			callServices.fnGetDataMainTable(oParam, FrmData, "ErrInfo", this.oReadFormDataSuccess);
			oParam.Fieldname = "RunMode";
			callServices.fnGetDataMainTable(oParam, FrmData, "RunMode", this.oReadFormDataSuccess);
			var sRunMode = FrmData.RunMode.split("~");
			for (var iRunMode = 0; iRunMode < sRunMode.length; iRunMode++) {
				switch (sRunMode[iRunMode]) {
					case "Foreground":
						that.byId("FOREGROUND").setSelected(true);
						break;
					case "Background":
						that.byId("BACKGROUND").setSelected(true);
						break;
					case "Both":
						that.byId("BOTH").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "DataVolumeRecords";
			callServices.fnGetDataMainTable(oParam, FrmData, "DataVol", this.oReadFormDataSuccess);

			oParam.Fieldname = "Type";
			callServices.fnGetDataMainTable(oParam, FrmData, "Type", this.oReadFormDataSuccess);
			var sType = FrmData.Type.split("~");
			for (var iType = 0; iType < sType.length; iType++) {
				switch (sType[iType]) {
					case "SAP Script":
						that.byId("SAPSCRIPT").setSelected(true);
						break;
					case "Adobe Form":
						that.byId("ADOBEFORM").setSelected(true);
						break;
					case "Smart Form":
						that.byId("SMARTFORM").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "PrintProgramName";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrintName", this.oReadFormDataSuccess);

			oParam.Fieldname = "StandardText";
			callServices.fnGetDataMainTable(oParam, FrmData, "StdText", this.oReadFormDataSuccess);

			oParam.Fieldname = "Logo";
			callServices.fnGetDataMainTable(oParam, FrmData, "Logo", this.oReadFormDataSuccess);

			oParam.Fieldname = "PageFormat";
			callServices.fnGetDataMainTable(oParam, FrmData, "PageFormat", this.oReadFormDataSuccess);
			var sPageFormat = FrmData.PageFormat.split("~");
			for (var iPageFormat = 0; iPageFormat < sPageFormat.length; iPageFormat++) {
				switch (sPageFormat[iPageFormat]) {
					case "DIN A4":
						that.byId("DINA4").setSelected(true);
						break;
					case "Letter":
						that.byId("Letter").setSelected(true);
						break;
					case "Other":
						that.byId("Other").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "ProcessingLogic_Review";
			callServices.fnGetDataMainTable(oParam, FrmData, "ProcessingLogic_Review", this.oReadFormDataSuccess);
			FrmData.ProcessingLogic_Review = parseInt(FrmData.ProcessingLogic_Review);
			oParam.Fieldname = "ProcessingLogic_Comments";
			callServices.fnGetDataMainTable(oParam, FrmData, "ProcessingLogic_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "FlowLogic_Review";
			callServices.fnGetDataMainTable(oParam, FrmData, "FlowLogic_Review", this.oReadFormDataSuccess);
			FrmData.FlowLogic_Review = parseInt(FrmData.FlowLogic_Review);
			oParam.Fieldname = "FlowLogic_Comments";
			callServices.fnGetDataMainTable(oParam, FrmData, "FlowLogic_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "TechAss_Review";
			callServices.fnGetDataMainTable(oParam, FrmData, "TechAss_Review", this.oReadFormDataSuccess);
			FrmData.TechAss_Review = parseInt(FrmData.TechAss_Review);
			oParam.Fieldname = "TechAss_Comments";
			callServices.fnGetDataMainTable(oParam, FrmData, "TechAss_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "FormErrorHandling_Review";
			callServices.fnGetDataMainTable(oParam, FrmData, "FormErrorHandling_Review", this.oReadFormDataSuccess);
			FrmData.FormErrorHandling_Review = parseInt(FrmData.FormErrorHandling_Review);
			oParam.Fieldname = "FormErrorHandling_Comments";
			callServices.fnGetDataMainTable(oParam, FrmData, "FormErrorHandling_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "PrinterSpecificRequirement";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrintSP", this.oReadFormDataSuccess);

			oParam.Fieldname = "OutputRequirement";
			callServices.fnGetDataMainTable(oParam, FrmData, "OpReq", this.oReadFormDataSuccess);

			oParam.Fieldname = "SampleFormLayout";
			callServices.fnGetDataMainTable(oParam, FrmData, "Sample", this.oReadFormDataSuccess);

			oParam.Fieldname = "Security_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "security", this.oReadFormDataSuccess);
			if (enhData.security) {
				var sSecurityOpt = enhData.security.split("~");
				for (var iSecurity = 0; iSecurity < sSecurityOpt.length; iSecurity++) {
					switch (sSecurityOpt[iSecurity]) {
						case "HTTPS/SFTP":
							this.byId("CB2-01").setSelected(true);
							break;
						case "User Authorization":
							this.byId("CB2-02").setSelected(true);
							break;
						case "Encryption":
							this.byId("CB2-03").setSelected(true);
							break;
					}
				}
			}

			oParam.Fieldname = "SecurityComments_TS";
			callServices.fnGetDataMainTable(oParam, enhData, "securityComments", this.oReadFormDataSuccess);

			var userAcceptanceCounter = 1;

			do {
				oParam.Fieldname = "UA" + userAcceptanceCounter.toString() + "_TS";
				callServices.fnGetDataMainTable(oParam, enhData, "userAcceptanceString", this.oReadFormDataSuccess);

				if (this.oReadFormDataSuccess.userAcceptanceString) {
					if (enhData.userAcceptanceString) {
						var sUserAcptCols = enhData.userAcceptanceString.split("~");

						if (sUserAcptCols.length > 1) {
							var userAcceptanceData = {};
							globalUserAcceptanceArrayData = {};

							userAcceptanceData.Index = (userAcceptanceCounter - 1).toString();
							userAcceptanceData.Fieldname = oParam.Fieldname;
							userAcceptanceData.step = sUserAcptCols[0];
							userAcceptanceData.testType = sUserAcptCols[1];
							userAcceptanceData.scenario = sUserAcptCols[2];
							userAcceptanceData.testData = sUserAcptCols[3];
							userAcceptanceData.stepsPer = sUserAcptCols[4];
							userAcceptanceData.actualResults = sUserAcptCols[5];
							userAcceptanceData.expectedResults = sUserAcptCols[6];

							globalUserAcceptanceArrayData.Index = userAcceptanceCounter - 1;
							globalUserAcceptanceArrayData.Fieldname = oParam.Fieldname;
							globalUserAcceptanceArrayData.Step = sUserAcptCols[0];
							globalUserAcceptanceArrayData.TestType = sUserAcptCols[1];
							globalUserAcceptanceArrayData.Scenario = sUserAcptCols[2];
							globalUserAcceptanceArrayData.TestData = sUserAcptCols[3];
							globalUserAcceptanceArrayData.StepsPer = sUserAcptCols[4];
							globalUserAcceptanceArrayData.ActualResults = sUserAcptCols[5];
							globalUserAcceptanceArrayData.ExpectedResults = sUserAcptCols[6];
							globalUserAcceptanceArrayData.Existance = "E";

							enhData.userAcceptance.push(userAcceptanceData);
							globalUserAcceptanceArray.push(globalUserAcceptanceArrayData);
						}
					}

					userAcceptanceCounter = userAcceptanceCounter + 1;
				} else {
					userAcceptanceCounter = -1;
				}
			} while (userAcceptanceCounter !== -1);

			if (enhData.userAcceptance.length === 0) {
				enhData.userAcceptance.push({
					Index: "0",
					Fieldname: "",
					step: "",
					testType: "",
					scenario: "",
					testData: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: ""
				});

				globalUserAcceptanceArrayData = {};

				globalUserAcceptanceArrayData.Index = 0;
				globalUserAcceptanceArrayData.Fieldname = "";
				globalUserAcceptanceArrayData.Step = "";
				globalUserAcceptanceArrayData.TestType = "";
				globalUserAcceptanceArrayData.Scenario = "";
				globalUserAcceptanceArrayData.TestData = "";
				globalUserAcceptanceArrayData.StepsPer = "";
				globalUserAcceptanceArrayData.ActualResults = "";
				globalUserAcceptanceArrayData.ExpectedResults = "";
				globalUserAcceptanceArrayData.Existance = "N";

				globalUserAcceptanceArray.push(globalUserAcceptanceArrayData);
			}

			oModelForms.setData(FrmData);
			oModelForms1.setData(enhData);

			/*	this.readFormFlowChartAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S2",
					FIELDNAME: "FrmFlowReq",
					TYPE: "O"
				});

				frmJSON.setData(FrmData);*/

			var intDataTechFlowChart = {
				attachIntTechFlowChart: [],
				attachIntTechFlowChartVisible: false
			};

			var intDataTechFlowChartJSON = new sap.ui.model.json.JSONModel(intDataTechFlowChart);
			this.getView().setModel(intDataTechFlowChartJSON, "intDataTechFlowChartJSON");
			this.readAttachmentsTechFlowChart({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2",
				FIELDNAME: "FrmFlowReq",
				TYPE: "O"
			});

			/*var intDataTechAssumpDepend = {
				attachIntTechAssumpDepend: [],
				attachIntTechAssumpDependVisible: false
			};
			
			var intDataTechAssumpDependJSON = new sap.ui.model.json.JSONModel(intDataTechAssumpDepend);
			this.getView().setModel(intDataTechAssumpDependJSON, "intDataTechAssumpDependJSON");
			this.readAttachmentsTechAssumpDepend({
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: "S2",
				FIELDNAME: "FrmAssumpDepend",
				TYPE: "O"
			});*/
		},

		setModel2: function(FrmData) {
			this.getView().getModel("FrmData").setData(FrmData);
			this.getView().getModel("FrmData").refresh();
		},

		setModel: function(enhData) {
			this.getView().getModel("enhData").setData(enhData);
			this.getView().getModel("enhData").refresh();
		},
		onLiveChangeTechFlow: function() {
			var str = this.byId("TechFlowLogic").getValue();
			this.byId("techFlowCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("techFlowErr").setVisible(true);
			} else {
				this.byId("techFlowErr").setVisible(false);
			}
		},
		onLiveChangeSecurity: function() {
			var str = this.byId("security").getValue();
			this.byId("fsSecurityCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsSecurityErr").setVisible(true);
			} else {
				this.byId("fsSecurityErr").setVisible(false);
			}
		},
		onLiveChangeTechAssumptions: function() {
			var str = this.byId("TechAssumptions").getValue();
			this.byId("techAsmCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("techAsmErr").setVisible(true);
			} else {
				this.byId("techAsmErr").setVisible(false);
			}
		},
		onChange: function() {
			this.getOwnerComponent().getRouter().navTo("detail");
		},
		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("detail");
		},

		getDataforARA: function(object) {
			var mServiceUrl = "/sap/opu/odata/sap/ZAUTOMATION_SRV";
			this.oModel = new sap.ui.model.odata.ODataModel(mServiceUrl);
			var that = this;
			var author, reviewer, approver;
			var projectid = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var Repid = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Repid;
			var sPath = "/NEW_OBJECTSet?$filter=Projectid eq '" + projectid + "' and Ricefid eq '" + Repid + "'";
			this.oModel.read(sPath, null, [], false, function(oData) {
				if (oData !== undefined) {
					try {
						author = oData.results[0].fsauthorid;
						reviewer = oData.results[0].fsreviewerid;
						approver = oData.results[0].fsapproverid;
						that.getStyleVisible(author, reviewer, approver, object);
					} catch (ex) {
						//
					}
				}
			}, function(oError) {
				//
			});
		},
		getStyleVisible: function(author, reviewer, approver, object) {
			var oDataWorkflow = this.oDataWorkflow;
			if (object === "WFLW") {
				try {
					var SAPId = sap.ushell.Container.getUser().getId();
				} catch (ex) {
					//
				}
				if (reviewer !== "" || approver !== "") {

					this.getView().byId("CustomObjectsBoxTS_I").setEnabled(true);
					this.getView().byId("CustomObjectsBoxTS_R").setEnabled(true);
					this.getView().byId("TechnicalDetailsBoxTS_I").setEnabled(true);
					this.getView().byId("TechnicalDetailsBoxTS_R").setEnabled(true);
					this.getView().byId("BusinessObjectBoxTS_I").setEnabled(true);
					this.getView().byId("BusinessObjectBoxTS_R").setEnabled(true);
					this.getView().byId("WorkflowStepBoxTS_I").setEnabled(true);
					this.getView().byId("WorkflowStepBoxTS_R").setEnabled(true);
					this.getView().byId("WorkflowConfigurationBoxTS_I").setEnabled(true);
					this.getView().byId("WorkflowConfigurationBoxTS_R").setEnabled(true);
					this.getView().byId("RestartCapabilityBoxTS_I").setEnabled(true);
					this.getView().byId("RestartCapabilityBoxTS_R").setEnabled(true);
					this.getView().byId("WFAsumpDepBoxTS_I").setEnabled(true);
					this.getView().byId("WFAsumpDepBoxTS_R").setEnabled(true);
					this.getView().byId("WFErrorHandBoxTS_I").setEnabled(true);
					this.getView().byId("WFErrorHandBoxTS_R").setEnabled(true);
				} else {
					this.getView().byId("CustomObjectsBoxTS_I").setEnabled(false);
					this.getView().byId("CustomObjectsBoxTS_R").setEnabled(false);
					this.getView().byId("TechnicalDetailsBoxTS_I").setEnabled(false);
					this.getView().byId("TechnicalDetailsBoxTS_R").setEnabled(false);
					this.getView().byId("BusinessObjectBoxTS_I").setEnabled(false);
					this.getView().byId("BusinessObjectBoxTS_R").setEnabled(false);
					this.getView().byId("WorkflowStepBoxTS_I").setEnabled(false);
					this.getView().byId("WorkflowStepBoxTS_R").setEnabled(false);
					this.getView().byId("WorkflowConfigurationBoxTS_I").setEnabled(false);
					this.getView().byId("WorkflowConfigurationBoxTS_R").setEnabled(false);
					this.getView().byId("RestartCapabilityBoxTS_I").setEnabled(false);
					this.getView().byId("RestartCapabilityBoxTS_R").setEnabled(false);
					this.getView().byId("WFAsumpDepBoxTS_I").setEnabled(false);
					this.getView().byId("WFAsumpDepBoxTS_R").setEnabled(false);
					this.getView().byId("WFErrorHandBoxTS_I").setEnabled(false);
					this.getView().byId("WFErrorHandBoxTS_R").setEnabled(false);
				}
			}
			if (object === "FRM") {
				try {
					var SAPId = sap.ushell.Container.getUser().getId();
				} catch (ex) {
					//
				}
				if (reviewer !== "" || approver !== "") {

					this.getView().byId("ProcessingLogicBoxTS_I").setEnabled(true);
					this.getView().byId("ProcessingLogicBoxTS_R").setEnabled(true);
					this.getView().byId("FlowLogicBoxTS_I").setEnabled(true);
					this.getView().byId("FlowLogicBoxTS_R").setEnabled(true);
					this.getView().byId("TechAssBoxTS_I").setEnabled(true);
					this.getView().byId("TechAssBoxTS_R").setEnabled(true);
					this.getView().byId("FormErrorHandlingBoxTS_I").setEnabled(true);
					this.getView().byId("FormErrorHandlingBoxTS_R").setEnabled(true);

				} else {
					this.getView().byId("ProcessingLogicBoxTS_I").setEnabled(false);
					this.getView().byId("ProcessingLogicBoxTS_R").setEnabled(false);
					this.getView().byId("FlowLogicBoxTS_I").setEnabled(false);
					this.getView().byId("FlowLogicBoxTS_R").setEnabled(false);
					this.getView().byId("TechAssBoxTS_I").setEnabled(false);
					this.getView().byId("TechAssBoxTS_R").setEnabled(false);
					this.getView().byId("FormErrorHandlingBoxTS_I").setEnabled(false);
					this.getView().byId("FormErrorHandlingBoxTS_R").setEnabled(false);
				}
			}
			if (object === "ENH") {
				try {
					var SAPId = sap.ushell.Container.getUser().getId();
				} catch (ex) {
					//
				}
				if (reviewer !== "" || approver !== "") {

					this.getView().byId("input1").setEnabled(true);
					this.getView().byId("ri1").setEnabled(true);

				} else {
					this.getView().byId("input1").setEnabled(false);
					this.getView().byId("ri1").setEnabled(false);
				}
			}

		},

		getWFReviewComments: function(flag) {

			this.getView().byId("CustomObjectsBoxTS_I").setEnabled(flag);
			this.getView().byId("CustomObjectsBoxTS_R").setEnabled(flag);
			this.getView().byId("TechnicalDetailsBoxTS_I").setEnabled(flag);
			this.getView().byId("TechnicalDetailsBoxTS_R").setEnabled(flag);
			this.getView().byId("BusinessObjectBoxTS_I").setEnabled(flag);
			this.getView().byId("BusinessObjectBoxTS_R").setEnabled(flag);
			this.getView().byId("WorkflowStepBoxTS_I").setEnabled(flag);
			this.getView().byId("WorkflowStepBoxTS_R").setEnabled(flag);
			this.getView().byId("WorkflowConfigurationBoxTS_I").setEnabled(flag);
			this.getView().byId("WorkflowConfigurationBoxTS_R").setEnabled(flag);
			this.getView().byId("RestartCapabilityBoxTS_I").setEnabled(flag);
			this.getView().byId("RestartCapabilityBoxTS_R").setEnabled(flag);
			this.getView().byId("WFAsumpDepBoxTS_I").setEnabled(flag);
			this.getView().byId("WFAsumpDepBoxTS_R").setEnabled(flag);
			this.getView().byId("WFErrorHandBoxTS_I").setEnabled(flag);
			this.getView().byId("WFErrorHandBoxTS_R").setEnabled(flag);
		},

		getFormReviewComments: function(flag) {
			this.getView().byId("ProcessingLogicBoxTS_I").setEnabled(flag);
			this.getView().byId("ProcessingLogicBoxTS_R").setEnabled(flag);
			this.getView().byId("FlowLogicBoxTS_I").setEnabled(flag);
			this.getView().byId("FlowLogicBoxTS_R").setEnabled(flag);
			this.getView().byId("TechAssBoxTS_I").setEnabled(flag);
			this.getView().byId("TechAssBoxTS_R").setEnabled(flag);
			this.getView().byId("FormErrorHandlingBoxTS_I").setEnabled(flag);
			this.getView().byId("FormErrorHandlingBoxTS_R").setEnabled(flag);
		},
		getReviewData: function(flag) {
			this.getView().byId("CustomObjectsBoxTS").setVisible(flag);
			this.getView().byId("BusinessObjectBoxTS").setVisible(flag);
			this.getView().byId("TechnicalDetailsBoxTS").setVisible(flag);
			this.getView().byId("WorkflowStepBoxTS").setVisible(flag);
			this.getView().byId("WorkflowConfigurationBoxTS").setVisible(flag);
			this.getView().byId("RestartCapabilityBoxTS").setVisible(flag);
			this.getView().byId("WFAsumpDepBoxTS").setVisible(flag);
			this.getView().byId("WFErrorHandBoxTS").setVisible(flag);

		},

		getReviewDataForm: function(flag) {

			this.getView().byId("ProcessingLogicBoxTS").setVisible(flag);
			this.getView().byId("TechAssBoxTS").setVisible(flag);
			this.getView().byId("FlowLogicBoxTS").setVisible(flag);
			this.getView().byId("FormErrorHandlingBoxTS").setVisible(flag);

		},

		getDataForWorkflow: function(sRequestType, Version) {

			var that = this;
			var key = "WFLW";
			this.getDataforARA(key);
			var oModelWorkflow = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelWorkflow, "enhData");

			var oModelUA = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelUA, "reportData");

			// var oParam = {
			//  repid: 'WFLW-083b-US-R-2574',
			//  projectkey: 'WFLW',
			//  processid: 'PR002',
			//  stepno: 'S2',
			//  Fieldname: ''
			// };
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (!oParam) {
				return;
			}

			var oDataWorkflow = {
				HeaderTitleTS: "",
				Approver: "",
				Reviewer: "",
				Author: "",
				wfName: "",
				templateNo: "",
				wfDesc: "",
				busiObj: "",
				busiObjSubTyp: "",
				WorkFlwClass: "",
				fioriApp: "",
				authObjUsed: "",
				wfStartCond: "",
				wfTrigFreq: "",
				trigEvt: "",
				termitEvt: "",
				devClass: "",
				coaName: "",
				coaDesc: "",
				coaLogicDB: "",
				coaPkg: "",
				security: "",
				securityComments: "",
				WFConfigComments: "",
				RestartCapComments: "",
				AssumpDependencyComments: "",
				WFTSErrorHandling: "",
				StoryNumberFComment: "",
				attach_wfl: "",
				HanaModelAttr_wfl: "",
				CustObjAttr_wfl: "",
				AbapHanaAttr_wfl: "",
				TechLogflow_wfl: "",
				psp_wfl: "",
				BusinessObjModEnh: [],
				BusinessObjModEnhTemp: "",
				StepsDetails: [],
				StepsDetailsTemp: "",
				userAcceptance: [],
				userAcceptTemp: "",
				Status_TS: "",
				versionLatest: "",
				CustomObject_Review: "",
				TechnicalDetails_Review: "",
				BusinessObject_Review: "",
				WorkflowStep_Review: "",
				WorkflowConfiguration_Review: "",
				RestartCapability_Review: "",
				WFAsumpDep_Review: "",
				WFErrorHand_Review: "",
				CustomObject_Comments: "",
				TechnicalDetails_Comments: "",
				BusinessObject_Comments: "",
				WorkflowStep_Comments: "",
				WorkflowConfiguration_Comments: "",
				RestartCapability_Comments: "",
				WFAsumpDep_Comments: "",
				WFErrorHand_Comments: ""

			};
			this.oReadWflDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				wfName: false,
				templateNo: false,
				wfDesc: false,
				busiObj: false,
				busiObjSubTyp: false,
				WorkFlwClass: false,
				fioriApp: false,
				authObjUsed: false,
				wfStartCond: false,
				wfTrigFreq: false,
				trigEvt: false,
				termitEvt: false,
				devClass: false,
				coaName: false,
				coaDesc: false,
				coaLogicDB: false,
				coaPkg: false,
				security: false,
				securityComments: false,
				WFConfigComments: false,
				RestartCapComments: false,
				AssumpDependencyComments: false,
				WFTSErrorHandling: false,
				BusinessObjModEnh: false,
				BusinessObjModEnhTemp: false,
				StepsDetails: false,
				StepsDetailsTemp: false,
				userAcceptTemp: false,
				userAcceptance: false,
				Status_TS: false,
				StoryNumberFComment: false,
				versionLatest: false,
				attach_wfl: false,
				HanaModelAttr_wfl: false,
				CustObjAttr_wfl: false,
				AbapHanaAttr_wfl: false,
				TechLogflow_wfl: false,
				psp_wfl: false,
				CustomObject_Review: false,
				TechnicalDetails_Review: false,
				BusinessObject_Review: false,
				WorkflowStep_Review: false,
				WorkflowConfiguration_Review: false,
				RestartCapability_Review: false,
				WFAsumpDep_Review: false,
				WFErrorHand_Review: false,
				CustomObject_Comments: false,
				TechnicalDetails_Comments: false,
				BusinessObject_Comments: false,
				WorkflowStep_Comments: false,
				WorkflowConfiguration_Comments: false,
				RestartCapability_Comments: false,
				WFAsumpDep_Comments: false,
				WFErrorHand_Comments: false
			};
			if (Version) {
				oParam.Version = Version;
			}
			/*else {
				oParam.Fieldname = "Status_TS";
				oParam.Version = "1.0";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);
				var counter = oDataWorkflow.Status_TS;
				while (counter === "APPROVED" && this.oReadWflDataSuccess.Status_TS === true) {
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					oParam.Fieldname = "Status_TS";
					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);
					counter = oDataWorkflow.Status_TS;
				}
				var selectedKey = "Version " + oParam.Version;
				this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
			}*/
			// var oUserAcceptance = {
			//  userAcceptance: []
			// };
			// oUserAcceptance.userAcceptance[0] = {};
			// oUserAcceptance.userAcceptance[1] = {};

			if (sRequestType === 'N') {

				var oDataWorkflow = {
					HeaderTitleTS: oParam.Repid,
					Approver: "",
					Reviewer: "",
					Author: "",
					wfName: "",
					templateNo: "",
					wfDesc: "",
					busiObj: "",
					busiObjSubTyp: "",
					WorkFlwClass: "",
					fioriApp: "",
					authObjUsed: "",
					wfStartCond: "",
					wfTrigFreq: "",
					trigEvt: "",
					termitEvt: "",
					devClass: "",
					coaName: "",
					coaDesc: "",
					coaLogicDB: "",
					coaPkg: "",
					security: "",
					attach_wfl: "",
					HanaModelAttr_wfl: "",
					CustObjAttr_wfl: "",
					AbapHanaAttr_wfl: "",
					TechLogflow_wfl: "",
					psp_wfl: "",
					securityComments: "",
					WFConfigComments: "",
					RestartCapComments: "",
					AssumpDependencyComments: "",
					WFTSErrorHandling: "",
					CustomObject_Review: "",
					TechnicalDetails_Review: "",
					BusinessObject_Review: "",
					WorkflowStep_Review: "",
					WorkflowConfiguration_Review: "",
					RestartCapability_Review: "",
					WFAsumpDep_Review: "",
					WFErrorHand_Review: "",
					CustomObject_Comments: "",
					TechnicalDetails_Comments: "",
					BusinessObject_Comments: "",
					WorkflowStep_Comments: "",
					WorkflowConfiguration_Comments: "",
					RestartCapability_Comments: "",
					WFAsumpDep_Comments: "",
					WFErrorHand_Comments: "",
					BusinessObjModEnh: [{
						"BorElementType": "",
						"BorElementName": "",
						"BorDescription": ""
					}],
					BusinessObjModEnhTemp: "",
					StepsDetails: [{
						"TaskNumber": "",
						"TaskType": "",
						"BusinessObj": "",
						"TaskDescLogic": "",
						"Deadline": "",
						"RoleResol": "",
						"OtherWFSteps": ""

					}],
					StepsDetailsTemp: "",
					userAcceptTemp: "",
					userAcceptance: [{
						"actualResults": "",
						"expectedResults": "",
						"scenario": "",
						"step": "",
						"stepsPer": "",
						"testType": ""
					}]
				};

			} else if (sRequestType === 'E') {

				////CR change

				oParam.Version = "1.0";
				this.getView().byId("idPrintScreen").setVisible(true);

				if (Version) {
					oParam.Version = Version;
					var crNumber1 = sessionStorage.getItem("crNumber");
					if (crNumber1 !== "") {
						// this.getView().byId("storynumber").setValue(crNumber1);
						oDataWorkflow.StoryNumberFComment = crNumber1;
					}
				} else {

					var num = 1;

					while (num > 0) {
						oParam.Fieldname = "Status_TS";
						callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);
						oDataWorkflow.versionLatest = oDataWorkflow.Status_TS;
						if (oDataWorkflow.versionLatest !== undefined) {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							if (oDataWorkflow.versionLatest === "APPROVED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExistingTech");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							oDataWorkflow.versionLatest = undefined;
							oDataWorkflow.Status_TS = undefined;
						} else {
							//versiontypeExisting  
							//Version 3.0
							//this.byId("versiontypeExisting").setValueState("Version 3.0");
							oParam.Version = parseInt(oParam.Version) - 1;
							oParam.Version = (oParam.Version).toString() + ".0";
							var selectedKey = "Version " + oParam.Version;
							this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
							num = -1;
						}
					}
				}

				oParam.Fieldname = "Status_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);
				var statusLastVersion = oDataWorkflow.Status_TS;
				var statusLast = statusLastVersion;

				if (statusLastVersion === "APPROVED" && Version === undefined) {
					this.getView().byId("oBTHold").setEnabled(false);
					var crNumber = sessionStorage.getItem("crNumber");
					if (crNumber === "") {

						// this.getView().byId("storynumber").setValue("");
						oDataWorkflow.StoryNumberFComment = "";
						oParam.Version = parseInt(oParam.Version);
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

						var vItem = parseInt(oParam.Version);
						this.byId('versiontypeExistingTech').removeItem(vItem);

					} else {
						// this.getView().byId("storynumber").setValue(crNumber);
						oDataWorkflow.StoryNumberFComment = crNumber;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
					}

				}
				statusLastVersion = undefined;
				oDataWorkflow.Status_TS = undefined;

				/*	oParam.Fieldname = "Status_TS";
					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);
						var statusLastVersion= oDataWorkflow.Status_TS;
				     	var statusLast=statusLastVersion;
		
						if (statusLastVersion === "ACCEPTED" && Version === undefined) {

							var crNumber=sessionStorage.getItem("crNumber");
						//	var crNumber = sap.ui.getCore().getModel("CRnumber").getData().CRINFO.CRNumber;
							if (crNumber === "") {
							//	this.getView().byId("storynumber").setValue("");
								oDataWorkflow.StoryNumberFComment="";
								oParam.Version = parseInt(oParam.Version);
								oParam.Version = (oParam.Version).toString() + ".0";
								var selectedKey = "Version " + oParam.Version;
								this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

								var vItem = parseInt(oParam.Version);
								this.byId('versiontypeExistingTech').removeItem(vItem);

							} else {
								//this.getView().byId("storynumber").setValue(crNumber);
									oDataWorkflow.StoryNumberFComment=crNumber;
								oParam.Version = parseInt(oParam.Version) + 1;
								oParam.Version = (oParam.Version).toString() + ".0";
								var selectedKey = "Version " + oParam.Version;
								this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
							}

						}
					
					statusLastVersion = undefined;
					oDataWorkflow.Status_TS = undefined;*/

				oDataWorkflow.Status_TS = "";
				oParam.Fieldname = "Status_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_TS", this.oReadWflDataSuccess);

				if (oDataWorkflow.Status_TS === 'SAVED' && this.oReadWflDataSuccess.Status_TS === true) {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("idPrintScreen").setVisible(true);
					this.getWFReviewComments(false);
					this.getReviewData(false);
					this.getView().byId("oBTHold").setEnabled(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDataWorkflow.Status_TS === 'ON HOLD') {
					this.getView().byId("oBTHold").setEnabled(false);
					oCurrentView.byId("oBTSave").setEnabled(true);
						oCurrentView.byId("oBTSubmit").setVisible(true);
							oCurrentView.byId("oBTSubmit").setEnabled(true);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
					//	oCurrentView.byId("oBTApprove").setEnabled(false);
					//	oCurrentView.byId("oBTPrint").setVisible(true);

				} else if (oDataWorkflow.Status_TS === 'SUBMITTED' && this.oReadWflDataSuccess.Status_TS === true) {
					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setText("Submit");
					oCurrentView.byId("idPrintScreen").setVisible(true);
					this.getWFReviewComments(true);
					this.getReviewData(true);
					this.getView().byId("oBTHold").setEnabled(true);
					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").updateModel();
					

				} else if (oDataWorkflow.Status_TS === 'APPROVED' && this.oReadWflDataSuccess.Status_TS === true) {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Approve");
					oCurrentView.byId("idPrintScreen").setVisible(true);
					this.getWFReviewComments(false);
					this.getReviewData(true);
					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();
					this.getView().byId("oBTHold").setEnabled(false);

				}

				/*else if (oDataWorkflow.Status_TS === 'ACCEPTED' && this.oReadWflDataSuccess.Status_TS === true) {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Accept");
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					oCurrentView.byId("idPrintScreen").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();

				} */
				else {

					/*	oCurrentView.byId("oBTSave").setVisible(true);
						oCurrentView.byId("oBTSubmit").setVisible(true);
						//		oCurrentView.byId("oBTApprove").setVisible(false);
						//		 oCurrentView.byId("oBTAcceptApproval").setVisible(false);
						oCurrentView.byId("idPrintScreen").setVisible(false);*/

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setText("Submit");
					oCurrentView.byId("idPrintScreen").setVisible(true);
					this.getView().byId("oBTHold").setEnabled(true);
					this.getWFReviewComments(false);
					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				}

				if ((statusLast === "APPROVED") && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
						sessionStorage.getItem("crNumber") !== "")) {
					oParam.Version = parseInt(oParam.Version) - 1;
					oParam.Version = (oParam.Version).toString() + ".0";
				}

				if (oDataWorkflow.StoryNumberFComment === "") {
					oParam.Fieldname = "Story Number Comment";
					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "StoryNumberFComment", this.oReadWflDataSuccess);
				}

				oParam.Fieldname = "Approver_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Approver", this.oReadWflDataSuccess);
				// oDataWorkflow.Approver = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Reviewer_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Reviewer", this.oReadWflDataSuccess);
				// oDataWorkflow.Reviewer = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Author_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Author", this.oReadWflDataSuccess);
				// oDataWorkflow.Author = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Workflow Name(s)";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "wfName", this.oReadWflDataSuccess);
				// oDataWorkflow.wfName = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Template Number";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "templateNo", this.oReadWflDataSuccess);
				// oDataWorkflow.templateNo = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Workflow Description";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "wfDesc", this.oReadWflDataSuccess);
				// oDataWorkflow.wfDesc = callServices.fnCallMainTable(oParam);

				oDataWorkflow.HeaderTitleTS = oParam.Repid + " - " + oDataWorkflow.wfDesc;

				oParam.Fieldname = "Business Object";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "busiObj", this.oReadWflDataSuccess);
				// oDataWorkflow.busiObj = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Business Object Subtype";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "busiObjSubTyp", this.oReadWflDataSuccess);
				// oDataWorkflow.busiObjSubTyp = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "WorkFlow Class";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WorkFlwClass", this.oReadWflDataSuccess);

				oParam.Fieldname = "Fiori app";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "fioriApp", this.oReadWflDataSuccess);
				// oDataWorkflow.fioriApp = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Authorization Object Used";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "authObjUsed", this.oReadWflDataSuccess);
				// oDataWorkflow.authObjUsed = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Workflow Start Condition";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "wfStartCond", this.oReadWflDataSuccess);
				// oDataWorkflow.wfStartCond = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Workflow Trigger Frequency";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "wfTrigFreq", this.oReadWflDataSuccess);
				// oDataWorkflow.wfTrigFreq = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Triggering Event";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "trigEvt", this.oReadWflDataSuccess);
				// oDataWorkflow.trigEvt = callServices.fnCallMainTable(oParam);
				oParam.Fieldname = "Terminating Event";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "termitEvt", this.oReadWflDataSuccess);

				oParam.Fieldname = "Development Class";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "devClass", this.oReadWflDataSuccess);
				// oDataWorkflow.devClass = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Name";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "coaName", this.oReadWflDataSuccess);
				// oDataWorkflow.coaName = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Description";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "coaDesc", this.oReadWflDataSuccess);
				// oDataWorkflow.coaDesc = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Logical Database";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "coaLogicDB", this.oReadWflDataSuccess);
				// oDataWorkflow.coaLogicDB = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Package";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "coaPkg", this.oReadWflDataSuccess);
				// oDataWorkflow.coaPkg = callServices.fnCallMainTable(oParam);
				oParam.Fieldname = "HanaModelAttr_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "HanaModelAttr_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "CustObjAttr_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CustObjAttr_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "AbapHanaAttr_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "AbapHanaAttr_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "TechLogflow_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "TechLogflow_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "psp_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "psp_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "attach_wfl";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "attach_wfl", this.oReadWflDataSuccess);
				oParam.Fieldname = "Security_TS";
				// oDataWorkflow.security = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "security", this.oReadWflDataSuccess);
				if (oDataWorkflow.security) {
					var sSecurityOpt = oDataWorkflow.security.split("~");
					for (var iSecurity = 0; iSecurity < sSecurityOpt.length; iSecurity++) {
						switch (sSecurityOpt[iSecurity]) {
							case "HTTPS/SFTP":
								this.byId("CB2-01").setSelected(true);
								break;
							case "User Authorization":
								this.byId("CB2-02").setSelected(true);
								break;
							case "Encryption":
								this.byId("CB2-03").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "WFConfig Comments_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFConfigComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "RestartCap Comments_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "RestartCapComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "AssumpDepend Comments_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "AssumpDependencyComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "Error Handling_TS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFTSErrorHandling", this.oReadWflDataSuccess);

				///NEW FIELDS ADDED

				oParam.Fieldname = "ErrorLog";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorLog", this.oReadWflDataSuccess);
				oParam.Fieldname = "AuditLog";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "AuditLog", this.oReadWflDataSuccess);

				oParam.Fieldname = "ErrorReport";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorReport", this.oReadWflDataSuccess);
				oParam.Fieldname = "ReturnRequirement";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ReturnRequirement", this.oReadWflDataSuccess);
				oParam.Fieldname = "SecValidations";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SecValidations", this.oReadWflDataSuccess);
				oParam.Fieldname = "ErrReconciliation";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrReconciliation", this.oReadWflDataSuccess);
				oParam.Fieldname = "HTTPS_SFTP_";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "HTTPS_SFTP_", this.oReadWflDataSuccess);
				oParam.Fieldname = "UserAuth";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "UserAuth", this.oReadWflDataSuccess);
				oParam.Fieldname = "Encryp";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Encryp", this.oReadWflDataSuccess);

				oParam.Fieldname = "Security Comments_TS";
				// oDataWorkflow.securityTS = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "securityComments", this.oReadWflDataSuccess);

				//Businesss Object table

				oParam.Fieldname = "CustomObject_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CustomObject_Review", this.oReadWflDataSuccess);
				oDataWorkflow.CustomObject_Review = parseInt(oDataWorkflow.CustomObject_Review);
				oParam.Fieldname = "CustomObject_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CustomObject_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "TechnicalDetails_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "TechnicalDetails_Review", this.oReadWflDataSuccess);
				oDataWorkflow.TechnicalDetails_Review = parseInt(oDataWorkflow.TechnicalDetails_Review);
				oParam.Fieldname = "TechnicalDetails_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "TechnicalDetails_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "BusinessObject_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "BusinessObject_Review", this.oReadWflDataSuccess);
				oDataWorkflow.BusinessObject_Review = parseInt(oDataWorkflow.BusinessObject_Review);
				oParam.Fieldname = "BusinessObject_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "BusinessObject_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "WorkflowStep_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WorkflowStep_Review", this.oReadWflDataSuccess);
				oDataWorkflow.WorkflowStep_Review = parseInt(oDataWorkflow.WorkflowStep_Review);
				oParam.Fieldname = "WorkflowStep_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WorkflowStep_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "WorkflowConfiguration_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WorkflowConfiguration_Review", this.oReadWflDataSuccess);
				oDataWorkflow.WorkflowConfiguration_Review = parseInt(oDataWorkflow.WorkflowConfiguration_Review);
				oParam.Fieldname = "WorkflowConfiguration_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WorkflowConfiguration_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "RestartCapability_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "RestartCapability_Review", this.oReadWflDataSuccess);
				oDataWorkflow.RestartCapability_Review = parseInt(oDataWorkflow.RestartCapability_Review);
				oParam.Fieldname = "RestartCapability_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "RestartCapability_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "WFAsumpDep_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFAsumpDep_Review", this.oReadWflDataSuccess);
				oDataWorkflow.WFAsumpDep_Review = parseInt(oDataWorkflow.WFAsumpDep_Review);
				oParam.Fieldname = "WFAsumpDep_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFAsumpDep_Comments", this.oReadWflDataSuccess);

				oParam.Fieldname = "WFErrorHand_Review";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFErrorHand_Review", this.oReadWflDataSuccess);
				oDataWorkflow.WFErrorHand_Review = parseInt(oDataWorkflow.WFErrorHand_Review);
				oParam.Fieldname = "WFErrorHand_Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFErrorHand_Comments", this.oReadWflDataSuccess);

				var iCountBOR, sBORCols;

				for (iCountBOR = 0; iCountBOR < 10; iCountBOR++) {

					oDataWorkflow.BusinessObjModEnhTemp = "";
					oParam.Fieldname = "TS_BOR_" + (iCountBOR + 1);

					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "BusinessObjModEnhTemp", this.oReadWflDataSuccess);
					if (this.oReadWflDataSuccess.BusinessObjModEnhTemp) {
						if (oDataWorkflow.BusinessObjModEnhTemp) {
							sBORCols = oDataWorkflow.BusinessObjModEnhTemp.split("~");
							if (sBORCols && sBORCols.length === 3) {
								oDataWorkflow.BusinessObjModEnh.push({
									BorElementType: sBORCols[0],
									BorElementName: sBORCols[1],
									BorDescription: sBORCols[2],
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
				if (oDataWorkflow.BusinessObjModEnh.length === 0) {
					oDataWorkflow.BusinessObjModEnh.push({
						BorElementType: "",
						BorElementName: "",
						BorDescription: "",
						flag: false
					});
				}

				//Businesss Object table End

				//Workflow steps table

				var iCountWFSteps, sWFStepsCols;

				for (iCountWFSteps = 0; iCountWFSteps < 10; iCountWFSteps++) {

					oDataWorkflow.StepsDetailsTemp = "";
					oParam.Fieldname = "TS_StepsDetails_" + (iCountWFSteps + 1);

					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "StepsDetailsTemp", this.oReadWflDataSuccess);
					if (this.oReadWflDataSuccess.StepsDetailsTemp) {
						if (oDataWorkflow.StepsDetailsTemp) {
							sWFStepsCols = oDataWorkflow.StepsDetailsTemp.split("~");
							if (sWFStepsCols && sWFStepsCols.length === 7) {
								oDataWorkflow.StepsDetails.push({
									TaskNumber: sWFStepsCols[0],
									TaskType: sWFStepsCols[1],
									BusinessObj: sWFStepsCols[2],
									TaskDescLogic: sWFStepsCols[3],
									Deadline: sWFStepsCols[4],
									RoleResol: sWFStepsCols[5],
									OtherWFSteps: sWFStepsCols[6],
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
				if (oDataWorkflow.StepsDetails.length === 0) {
					oDataWorkflow.StepsDetails.push({
						TaskNumber: "",
						TaskType: "",
						BusinessObj: "",
						TaskDescLogic: "",
						Deadline: "",
						RoleResol: "",
						OtherWFSteps: "",
						flag: false
					});
				}

				//Workflow steps table End

				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataWorkflow.userAcceptTemp = "";
					oParam.Fieldname = "TS_UA_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataWorkflow, "userAcceptTemp", this.oReadWflDataSuccess);
					if (this.oReadWflDataSuccess.userAcceptTemp) {
						if (oDataWorkflow.userAcceptTemp) {
							sUserAcptCols = oDataWorkflow.userAcceptTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 6) {
								oDataWorkflow.userAcceptance.push({
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
				if (oDataWorkflow.userAcceptance.length === 0) {
					oDataWorkflow.userAcceptance.push({
						step: "",
						testType: "",
						scenario: "",
						stepsPer: "",
						actualResults: "",
						expectedResults: "",
						flag: false
					});
				}
			}
			oModelWorkflow.setData(oDataWorkflow);
			// oModelUA.setData(oUserAcceptance);

			var attachDataWFTS = {
				attachWFTS: [],
				attachWFTSVisible: false
			};

			var attachDataWFTSJSON = new sap.ui.model.json.JSONModel(attachDataWFTS);
			this.getView().setModel(attachDataWFTSJSON, "attachDataWFTSJSON");

			this.readAttachmentsWFTS({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "WorflowTSAttach",
				TYPE: "O"
			});

			/*	var oReadAttachParam = {
					REPID: oParam.repid,
					PROJECTKEY: oParam.projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S2",
					FIELDNAME: "WorflowTSAttach",
					TYPE: "O"
				};*/

			/*	callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("attachDataWFTSJSON"), "attachWFTS",
				"attachWFTSVisible");*/

		},

		deleteFileWFTS: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {
				var oTable = this.getView().byId("tableAttachWFTS");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "WorflowTSAttach",
					TYPE: "O"
				};

				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("attachDataWFTSJSON"), "attachWFTS",
					"attachWFTSVisible");

			}
			oTable.setBusy(false);
		},

		onPrint: function() {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&projectid=" + projectID;

				if (oParam.Projectkey === "ENH") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Enhancement_TS.html?sap-language=EN" + mParameter,
						true);
				} else if (oParam.Projectkey === "WFLW") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Workflow_TS.html?sap-language=EN" + mParameter,
						true);
				} else if (oParam.Projectkey === "FRM") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Form_TS.html?sap-language=EN" + mParameter,
						true);
				}
			}

		},

		onFooterButtonPress: function() {

			if (this.getView().byId("oBTSubmit").getText() === "Submit") {
				this.onSubmit();
			} else if (this.getView().byId("oBTSubmit").getText() === "Approve") {
				this.onApprove();
			}
			/*	else if (this.getView().byId("oBTSubmit").getText() === "Accept") {
					this.onAccept();
				}*/

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
							var user = that.getView().getModel("enhData").getData().Approver;
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

							/*	var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
								var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
								var FrmDataail = that.getView().getModel("enhData").getData();
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, FrmDataail.Approver, FrmDataail.Reviewer,
									FrmDataail.ObjectTitle);*/

							var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
							var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
							var FrmDataail = that.getView().getModel("enhData").getData();
							var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
							var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

							callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							//	callServices.fnSendMail(oModelData.Email);
							callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, FrmDataail.Approver, FrmDataail.Reviewer,
								FrmDataail.ObjectTitle);

						}

					}
				}
			);

		},
		onConfirmSubmit: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oCurrentView = this.getView();

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

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'SUBMITTED';
			if (oInfo.Projectkey === "ENH") {
				this.updateEnhancementTS();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);

				//var oCurrentView = this.getView();

				oCurrentView.byId("oBTSave").setVisible(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(true);

			} else if (oInfo.Projectkey === "WFLW") {
				this.updateWorkFlowTS();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Status_TS);
				this.getReviewData(true);
				this.getWFReviewComments(true);
				//var oCurrentView = this.getView();

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("idPrintScreen").setVisible(true);

			} else if (oInfo.Projectkey === "FRM") {
				this.updateFormTS();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);
				this.getReviewDataForm(true);
				this.getFormReviewComments(true);

				oCurrentView.byId("oBTSave").setVisible(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(true);
			}

			// Update Process Lane Starts
			//var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			/*	oCurrentView.byId("idPrintScreen").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(true);*/
			this.getView().byId("oBTHold").setEnabled(true);
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
			var oCurrentView = this.getView();

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

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'APPROVED';
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);
			if (oInfo.Projectkey === "ENH") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);

				/*	oCurrentView.byId("oBTSave").setVisible(true);
					//oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTApprove").setVisible(true);

					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					oCurrentView.byId("oBTApprove").setEnabled(false);*/

				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
					oCurrentView.byId("oBTApprove").setEnabled(false);
			
				//	this.getView().byId("oBTHold").setVisible(true);

			} else if (oInfo.Projectkey === "WFLW") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Status_TS);
				this.getReviewData(true);
				this.getWFReviewComments(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);

				
				//	this.getView().byId("oBTHold").setVisible(true);
			} else if (oInfo.Projectkey === "FRM") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);
				this.getReviewDataForm(true);
				this.getFormReviewComments(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				//	this.getView().byId("oBTHold").setVisible(true);
			}

			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			/*	oCurrentView.byId("idPrintScreen").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);*/
			this.getView().byId("oBTHold").setEnabled(false);
		},
		updateEnhancementTS: function() {

			var oDataEnh = this.getView().getModel("enhData").getData();

			var oDataSecurityCheckBx = [];
			if (this.getView().byId("CB2-01").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-01").getText());
			}
			if (this.getView().byId("CB2-02").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-02").getText());
			}
			if (this.getView().byId("CB2-03").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-03").getText());
			}
			var oDataSecurityCheckBxMulti = oDataSecurityCheckBx.join("~");

			var oDataEnhRadioBtn;
			if (this.getView().byId("Implicit").getSelected()) {
				oDataEnhRadioBtn = this.getView().byId("Implicit").getText();
			} else if (this.getView().byId("Explicit").getSelected()) {
				oDataEnhRadioBtn = this.getView().byId("Explicit").getText();
			}

			var oDataEnhTypRadioBtn;
			if (this.getView().byId("Exit").getSelected()) {
				oDataEnhTypRadioBtn = this.getView().byId("Exit").getText();
			} else if (this.getView().byId("BADI").getSelected()) {
				oDataEnhTypRadioBtn = this.getView().byId("BADI").getText();
			} else if (this.getView().byId("Others").getSelected()) {
				oDataEnhTypRadioBtn = this.getView().byId("Others").getText();
			}

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

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

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);

			oParam.Fieldname = "Approver_TS";
			uParam.Fieldname = "Approver_TS";
			oParam.Fieldvalue = oDataEnh.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Approver);

			oParam.Fieldname = "Reviewer_TS";
			uParam.Fieldname = "Reviewer_TS";
			oParam.Fieldvalue = oDataEnh.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Reviewer);

			oParam.Fieldname = "Author_TS";
			uParam.Fieldname = "Author_TS";
			oParam.Fieldvalue = oDataEnh.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Author);

			oParam.Fieldname = "Enhancement";
			uParam.Fieldname = "Enhancement";
			oParam.Fieldvalue = oDataEnhRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Enhancement);

			oParam.Fieldname = "Enhancement Type";
			uParam.Fieldname = "Enhancement Type";
			oParam.Fieldvalue = oDataEnhTypRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.EnhancementType);

			oParam.Fieldname = "Enhancement Spot";
			uParam.Fieldname = "Enhancement Spot";
			oParam.Fieldvalue = oDataEnh.EnhancementSpot;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.EnhancementSpot);

			oParam.Fieldname = "User Exit Names";
			uParam.Fieldname = "User Exit Names";
			oParam.Fieldvalue = oDataEnh.UserExitNames;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.UserExitNames);

			oParam.Fieldname = "Function Exit Names";
			uParam.Fieldname = "Function Exit Names";
			oParam.Fieldvalue = oDataEnh.FunctionExitNames;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.FunctionExitNames);
			oParam.Fieldname = "Review_Comments_ti";
			uParam.Fieldname = "Review_Comments_ti";
			oParam.Fieldvalue = oDataEnh.ReviewComments_ti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewComments_ti);

			oParam.Fieldname = "Review_CommentsRating_ti";
			uParam.Fieldname = "Review_CommentsRating_ti";
			if (oDataEnh.ReviewCommentsRating_ti) {
				oParam.Fieldvalue = oDataEnh.ReviewCommentsRating_ti.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewCommentsRating_ti);

			oParam.Fieldname = "Menu Exit Names";
			uParam.Fieldname = "Menu Exit Names";
			oParam.Fieldvalue = oDataEnh.MenuExitNames;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.MenuExitNames);

			oParam.Fieldname = "Screen Exit Names/Screen";
			uParam.Fieldname = "Screen%20Exit%20Names%2FScreen";
			oParam.Fieldvalue = oDataEnh.ScreenExitNames;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ScreenExitNames);

			oParam.Fieldname = "Transaction Code";
			uParam.Fieldname = "Transaction Code";
			oParam.Fieldvalue = oDataEnh.TransactionCode;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.TransactionCode);

			oParam.Fieldname = "Program Name";
			uParam.Fieldname = "Program Name";
			oParam.Fieldvalue = oDataEnh.ProgramName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ProgramName);

			oParam.Fieldname = "Project Name";
			uParam.Fieldname = "Project Name";
			oParam.Fieldvalue = oDataEnh.ProjectName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ProjectName);

			oParam.Fieldname = "Include Names";
			uParam.Fieldname = "Include Names";
			oParam.Fieldvalue = oDataEnh.IncludeNames;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.IncludeNames);

			oParam.Fieldname = "BADI Name";
			uParam.Fieldname = "BADI Name";
			oParam.Fieldvalue = oDataEnh.BADIName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.BADIName);
			oParam.Fieldname = "ObjName";
			uParam.Fieldname = "ObjName";
			oParam.Fieldvalue = oDataEnh.ObjName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjName);
			oParam.Fieldname = "ObjType";
			uParam.Fieldname = "ObjType";
			oParam.Fieldvalue = oDataEnh.ObjType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjType);
			oParam.Fieldname = "ObjDesc";
			uParam.Fieldname = "ObjDesc";
			oParam.Fieldvalue = oDataEnh.ObjDesc;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjDesc);
			oParam.Fieldname = "ObjDesc";
			uParam.Fieldname = "Purpose";
			oParam.Fieldvalue = oDataEnh.Purpose;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Purpose);
			oParam.Fieldname = "Purpose";
			uParam.Fieldname = "DescChange";
			oParam.Fieldvalue = oDataEnh.DescChange;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.DescChange);
			oParam.Fieldname = "Technical Logic Flow";
			uParam.Fieldname = "Technical Logic Flow";
			oParam.Fieldvalue = oDataEnh.TechnicalLogicFlow;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.TechnicalLogicFlow);

			oParam.Fieldname = "Technical Assumptions and Dependencies";
			uParam.Fieldname = "Technical Assumptions and Dependencies";
			oParam.Fieldvalue = oDataEnh.TechnicalAssumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.TechnicalAssumptions);

			oParam.Fieldname = "Security_TS";
			uParam.Fieldname = "Security_TS";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.security);
			oParam.Fieldname = "Err_Info";
			uParam.Fieldname = "Err_Info";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.security);
			oParam.Fieldname = "Security section";
			uParam.Fieldname = "Security section";
			oParam.Fieldvalue = oDataEnh.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.securityComments);

			// User Acceptance

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataEnh.userAcceptance.length; iCountUA++) {

				oDataEnh.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataEnh.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.testData + "~" + oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}
		},

		updateWorkFlowTS: function() {
			var oDataWorkflow = this.getView().getModel("enhData").getData();
			// var oDataBusinessObjSubType = this.getView().byId("busiObjSubTyp").getSelectedItem().getText();

			var oDataSecurityCheckBx = [];
			if (this.getView().byId("CB2-01").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-01").getText());
			}
			if (this.getView().byId("CB2-02").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-02").getText());
			}
			if (this.getView().byId("CB2-03").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-03").getText());
			}
			var oDataSecurityCheckBxMulti = oDataSecurityCheckBx.join("~");

			// var userAcceptTbl1 = Object.keys(oDataWorkflow.userAcceptance[0]).map(function(key) {
			// 	return [oDataWorkflow.userAcceptance[0][key]];
			// });

			// var userAcceptTbl1Multi = userAcceptTbl1.join("~");
			// if (oDataWorkflow.userAcceptance[1]) {
			// 	var userAcceptTbl2 = Object.keys(oDataWorkflow.userAcceptance[1]).map(function(key) {
			// 		return [oDataWorkflow.userAcceptance[1][key]];
			// 	});

			// 	var userAcceptTbl2Multi = userAcceptTbl2.join("~");
			// }
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
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

			oParam.Fieldname = "Approver_TS";
			uParam.Fieldname = "Approver_TS";
			oParam.Fieldvalue = oDataWorkflow.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Approver);

			oParam.Fieldname = "Reviewer_TS";
			uParam.Fieldname = "Reviewer_TS";
			oParam.Fieldvalue = oDataWorkflow.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Reviewer);

			oParam.Fieldname = "Author_TS";
			uParam.Fieldname = "Author_TS";
			oParam.Fieldvalue = oDataWorkflow.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Author);

			oParam.Fieldname = "Workflow Name(s)";
			uParam.Fieldname = "Workflow Name(s)";
			oParam.Fieldvalue = oDataWorkflow.wfName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.wfName);

			oParam.Fieldname = "Story Number Comment";
			uParam.Fieldname = "Story Number Comment";
			oParam.Fieldvalue = oDataWorkflow.StoryNumberFComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.StoryNumberFComment);

			oParam.Fieldname = "Template Number";
			uParam.Fieldname = "Template Number";
			oParam.Fieldvalue = oDataWorkflow.templateNo;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.templateNo);

			oParam.Fieldname = "Workflow Description";
			uParam.Fieldname = "Workflow Description";
			oParam.Fieldvalue = oDataWorkflow.wfDesc;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.wfDesc);

			oParam.Fieldname = "Business Object";
			uParam.Fieldname = "Business Object";
			oParam.Fieldvalue = oDataWorkflow.busiObj;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.busiObj);

			oParam.Fieldname = "Business Object Subtype";
			uParam.Fieldname = "Business Object Subtype";
			oParam.Fieldvalue = oDataWorkflow.busiObjSubTyp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.busiObjSubTyp);

			oParam.Fieldname = "WorkFlow Class";
			uParam.Fieldname = "WorkFlow Class";
			oParam.Fieldvalue = oDataWorkflow.WorkFlwClass;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WorkFlwClass);

			oParam.Fieldname = "Fiori app";
			uParam.Fieldname = "Fiori app";
			oParam.Fieldvalue = oDataWorkflow.fioriApp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.fioriApp);

			oParam.Fieldname = "Authorization Object Used";
			uParam.Fieldname = "Authorization Object Used";
			oParam.Fieldvalue = oDataWorkflow.authObjUsed;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.authObjUsed);

			oParam.Fieldname = "Workflow Start Condition";
			uParam.Fieldname = "Workflow Start Condition";
			oParam.Fieldvalue = oDataWorkflow.wfStartCond;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.wfStartCond);

			oParam.Fieldname = "Workflow Trigger Frequency";
			uParam.Fieldname = "Workflow Trigger Frequency";
			oParam.Fieldvalue = oDataWorkflow.wfTrigFreq;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.wfTrigFreq);

			oParam.Fieldname = "Triggering Event";
			uParam.Fieldname = "Triggering Event";
			oParam.Fieldvalue = oDataWorkflow.trigEvt;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.trigEvt);

			oParam.Fieldname = "Terminating Event";
			uParam.Fieldname = "Terminating Event";
			oParam.Fieldvalue = oDataWorkflow.termitEvt;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.termitEvt);

			oParam.Fieldname = "Development Class";
			uParam.Fieldname = "Development Class";
			oParam.Fieldvalue = oDataWorkflow.devClass;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.devClass);

			oParam.Fieldname = "Name";
			uParam.Fieldname = "Name";
			oParam.Fieldvalue = oDataWorkflow.coaName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.coaName);

			oParam.Fieldname = "Description";
			uParam.Fieldname = "Description";
			oParam.Fieldvalue = oDataWorkflow.coaDesc;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.coaDesc);

			oParam.Fieldname = "Logical Database";
			uParam.Fieldname = "Logical Database";
			oParam.Fieldvalue = oDataWorkflow.coaLogicDB;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.coaLogicDB);

			oParam.Fieldname = "Package";
			uParam.Fieldname = "Package";
			oParam.Fieldvalue = oDataWorkflow.coaPkg;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.coaPkg);

			oParam.Fieldname = "WFConfig Comments_TS";
			uParam.Fieldname = "WFConfig Comments_TS";
			oParam.Fieldvalue = oDataWorkflow.WFConfigComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFConfigComments);

			oParam.Fieldname = "RestartCap Comments_TS";
			uParam.Fieldname = "RestartCap Comments_TS";
			oParam.Fieldvalue = oDataWorkflow.RestartCapComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.RestartCapComments);

			oParam.Fieldname = "AssumpDepend Comments_TS";
			uParam.Fieldname = "AssumpDepend Comments_TS";
			oParam.Fieldvalue = oDataWorkflow.AssumpDependencyComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.AssumpDependencyComments);

			oParam.Fieldname = "Error Handling_TS";
			uParam.Fieldname = "Error Handling_TS";
			oParam.Fieldvalue = oDataWorkflow.WFTSErrorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFTSErrorHandling);

			oParam.Fieldname = "Security_TS";
			uParam.Fieldname = "Security_TS";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.security);

			oParam.Fieldname = "Security Comments_TS";
			uParam.Fieldname = "Security Comments_TS";
			oParam.Fieldvalue = oDataWorkflow.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.securityComments);
			oParam.Fieldname = "attach_wfl";
			uParam.Fieldname = "attach_wfl";
			oParam.Fieldvalue = oDataWorkflow.attach_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.attach_wfl);
			oParam.Fieldname = "HanaModelAttr_wfl";
			uParam.Fieldname = "HanaModelAttr_wfl";
			oParam.Fieldvalue = oDataWorkflow.HanaModelAttr_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.HanaModelAttr_wfl);
			oParam.Fieldname = "CustObjAttr_wfl";
			uParam.Fieldname = "CustObjAttr_wfl";
			oParam.Fieldvalue = oDataWorkflow.CustObjAttr_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CustObjAttr_wfl);
			oParam.Fieldname = "AbapHanaAttr_wfl";
			uParam.Fieldname = "AbapHanaAttr_wfl";
			oParam.Fieldvalue = oDataWorkflow.AbapHanaAttr_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.AbapHanaAttr_wfl);
			oParam.Fieldname = "TechLogflow_wfl";
			uParam.Fieldname = "TechLogflow_wfl";
			oParam.Fieldvalue = oDataWorkflow.TechLogflow_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.TechLogflow_wfl);
			oParam.Fieldname = "psp_wfl";
			uParam.Fieldname = "psp_wfl";
			oParam.Fieldvalue = oDataWorkflow.psp_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.psp_wfl);

			oParam.Fieldname = "CustomObject_Review";
			uParam.Fieldname = "CustomObject_Review";
			if (oDataWorkflow.CustomObject_Review) {
				oParam.Fieldvalue = oDataWorkflow.CustomObject_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CustomObject_Review);

			oParam.Fieldname = "CustomObject_Comments";
			uParam.Fieldname = "CustomObject_Comments";
			oParam.Fieldvalue = oDataWorkflow.CustomObject_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CustomObject_Comments);

			oParam.Fieldname = "TechnicalDetails_Review";
			uParam.Fieldname = "TechnicalDetails_Review";
			if (oDataWorkflow.TechnicalDetails_Review) {
				oParam.Fieldvalue = oDataWorkflow.TechnicalDetails_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.TechnicalDetails_Review);

			oParam.Fieldname = "TechnicalDetails_Comments";
			uParam.Fieldname = "TechnicalDetails_Comments";
			oParam.Fieldvalue = oDataWorkflow.TechnicalDetails_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.TechnicalDetails_Comments);

			oParam.Fieldname = "BusinessObject_Review";
			uParam.Fieldname = "BusinessObject_Review";
			if (oDataWorkflow.BusinessObject_Review) {
				oParam.Fieldvalue = oDataWorkflow.BusinessObject_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.BusinessObject_Review);

			oParam.Fieldname = "BusinessObject_Comments";
			uParam.Fieldname = "BusinessObject_Comments";
			oParam.Fieldvalue = oDataWorkflow.BusinessObject_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.BusinessObject_Comments);

			oParam.Fieldname = "WorkflowStep_Review";
			uParam.Fieldname = "WorkflowStep_Review";
			if (oDataWorkflow.WorkflowStep_Review) {
				oParam.Fieldvalue = oDataWorkflow.WorkflowStep_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WorkflowStep_Review);

			oParam.Fieldname = "WorkflowStep_Comments";
			uParam.Fieldname = "WorkflowStep_Comments";
			oParam.Fieldvalue = oDataWorkflow.WorkflowStep_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WorkflowStep_Comments);

			oParam.Fieldname = "WorkflowConfiguration_Review";
			uParam.Fieldname = "WorkflowConfiguration_Review";
			if (oDataWorkflow.WorkflowConfiguration_Review) {
				oParam.Fieldvalue = oDataWorkflow.WorkflowConfiguration_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WorkflowConfiguration_Review);

			oParam.Fieldname = "WorkflowConfiguration_Comments";
			uParam.Fieldname = "WorkflowConfiguration_Comments";
			oParam.Fieldvalue = oDataWorkflow.WorkflowConfiguration_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WorkflowConfiguration_Comments);

			oParam.Fieldname = "RestartCapability_Review";
			uParam.Fieldname = "RestartCapability_Review";
			if (oDataWorkflow.RestartCapability_Review) {
				oParam.Fieldvalue = oDataWorkflow.RestartCapability_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.RestartCapability_Review);

			oParam.Fieldname = "RestartCapability_Comments";
			uParam.Fieldname = "RestartCapability_Comments";
			oParam.Fieldvalue = oDataWorkflow.RestartCapability_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.RestartCapability_Comments);

			oParam.Fieldname = "WFAsumpDep_Review";
			uParam.Fieldname = "WFAsumpDep_Review";
			if (oDataWorkflow.WFAsumpDep_Review) {
				oParam.Fieldvalue = oDataWorkflow.WFAsumpDep_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFAsumpDep_Review);

			oParam.Fieldname = "WFAsumpDep_Comments";
			uParam.Fieldname = "WFAsumpDep_Comments";
			oParam.Fieldvalue = oDataWorkflow.WFAsumpDep_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFAsumpDep_Comments);

			oParam.Fieldname = "WFErrorHand_Review";
			uParam.Fieldname = "WFErrorHand_Review";
			if (oDataWorkflow.WFErrorHand_Review) {
				oParam.Fieldvalue = oDataWorkflow.WFErrorHand_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFErrorHand_Review);

			oParam.Fieldname = "WFErrorHand_Comments";
			uParam.Fieldname = "WFErrorHand_Comments";
			oParam.Fieldvalue = oDataWorkflow.WFErrorHand_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFErrorHand_Comments);

			//NEW FIELDS ADDED
			oParam.Fieldname = "HTTPS_SFTP_";
			uParam.Fieldname = "HTTPS_SFTP_";
			oParam.Fieldvalue = oDataWorkflow.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.HTTPS_SFTP_);
			oParam.Fieldname = "UserAuth";
			uParam.Fieldname = "UserAuth";
			oParam.Fieldvalue = oDataWorkflow.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.UserAuth);
			oParam.Fieldname = "Encryp";
			uParam.Fieldname = "Encryp";
			oParam.Fieldvalue = oDataWorkflow.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Encryp);
			oParam.Fieldname = "ErrorLog";
			uParam.Fieldname = "ErrorLog";
			oParam.Fieldvalue = oDataWorkflow.ErrorLog;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorLog);
			oParam.Fieldname = "AuditLog";
			uParam.Fieldname = "AuditLog";
			oParam.Fieldvalue = oDataWorkflow.AuditLog;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.AuditLog);
			oParam.Fieldname = "ErrorReport";
			uParam.Fieldname = "ErrorReport";
			oParam.Fieldvalue = oDataWorkflow.ErrorReport;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorReport);
			oParam.Fieldname = "ReturnRequirement";
			uParam.Fieldname = "ReturnRequirement";
			oParam.Fieldvalue = oDataWorkflow.ReturnRequirement;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Author);
			oParam.Fieldname = "SecValidations";
			uParam.Fieldname = "SecValidations";
			oParam.Fieldvalue = oDataWorkflow.SecValidations;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SecValidations);
			oParam.Fieldname = "ErrReconciliation";
			uParam.Fieldname = "ErrReconciliation";
			oParam.Fieldvalue = oDataWorkflow.ErrReconciliation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrReconciliation);

			// oParam.Fieldname = "UA1_TS";
			// uParam.Fieldname = "UA1_TS";
			// oParam.Fieldvalue = userAcceptTbl1Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.userAccept1);

			// if (oDataWorkflow.userAcceptance[1]) {
			// 	oParam.Fieldname = "UA2_TS";
			// 	uParam.Fieldname = "UA2_TS";
			// 	oParam.Fieldvalue = userAcceptTbl2Multi;
			// 	callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.userAccept2);
			// }
			var iCountBOR, oBOREntry, sBOREntry;

			for (iCountBOR = 0; iCountBOR < oDataWorkflow.BusinessObjModEnh.length; iCountBOR++) {

				oDataWorkflow.BusinessObjModEnhTemp = "";
				oParam.Fieldname = "TS_BOR_" + (iCountBOR + 1);
				uParam.Fieldname = "TS_BOR_" + (iCountBOR + 1);
				oBOREntry = oDataWorkflow.BusinessObjModEnh[iCountBOR];
				sBOREntry = oBOREntry.BorElementType + "~" + oBOREntry.BorElementName + "~" + oBOREntry.BorDescription;
				oParam.Fieldvalue = sBOREntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oBOREntry.flag);

			}

			var iCountWFSteps, oWFStepsEntry, sWFStepsEntry;

			for (iCountWFSteps = 0; iCountWFSteps < oDataWorkflow.StepsDetails.length; iCountWFSteps++) {

				oDataWorkflow.StepsDetailsTemp = "";
				oParam.Fieldname = "TS_StepsDetails_" + (iCountWFSteps + 1);
				uParam.Fieldname = "TS_StepsDetails_" + (iCountWFSteps + 1);
				oWFStepsEntry = oDataWorkflow.StepsDetails[iCountWFSteps];
				sWFStepsEntry = oWFStepsEntry.TaskNumber + "~" + oWFStepsEntry.TaskType + "~" + oWFStepsEntry.BusinessObj + "~" + oWFStepsEntry.TaskDescLogic +
					"~" + oWFStepsEntry.Deadline + "~" + oWFStepsEntry.RoleResol + "~" + oWFStepsEntry.OtherWFSteps;
				oParam.Fieldvalue = sWFStepsEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oWFStepsEntry.flag);

			}

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataWorkflow.userAcceptance.length; iCountUA++) {

				oDataWorkflow.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataWorkflow.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.testData + "~" + oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}
		},
		updateFormTS: function() {
			var FrmData = this.getView().getModel("enhData").getData();
			var FrmData2 = this.getView().getModel("FrmData").getData();

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

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

			// Run Mode
			var oDataRunModeCheckBx = [];
			if (this.getView().byId("FOREGROUND").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("FOREGROUND").getText());
			}
			if (this.getView().byId("BACKGROUND").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("BACKGROUND").getText());
			}
			if (this.getView().byId("BOTH").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("BOTH").getText());
			}
			var oDataoDataRunModeCheckBxMulti = oDataRunModeCheckBx.join("~");

			// Type
			var oDataTypeCheckBx = [];
			if (this.getView().byId("SAPSCRIPT").getSelected()) {
				oDataTypeCheckBx.push(this.getView().byId("SAPSCRIPT").getText());
			}
			if (this.getView().byId("ADOBEFORM").getSelected()) {
				oDataTypeCheckBx.push(this.getView().byId("ADOBEFORM").getText());
			}
			if (this.getView().byId("SMARTFORM").getSelected()) {
				oDataTypeCheckBx.push(this.getView().byId("SMARTFORM").getText());
			}
			var oDataTypeCheckBxMulti = oDataTypeCheckBx.join("~");

			// Page Format
			var oDataPageFormatCheckBx = [];
			if (this.getView().byId("DINA4").getSelected()) {
				oDataPageFormatCheckBx.push(this.getView().byId("DINA4").getText());
			}
			if (this.getView().byId("Letter").getSelected()) {
				oDataPageFormatCheckBx.push(this.getView().byId("Letter").getText());
			}
			if (this.getView().byId("Other").getSelected()) {
				oDataPageFormatCheckBx.push(this.getView().byId("Other").getText());
			}
			var oDataPageFormatCheckBxMulti = oDataPageFormatCheckBx.join("~");

			// Security
			var oDataSecurityCheckBx = [];
			if (this.getView().byId("CB2-01").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-01").getText());
			}
			if (this.getView().byId("CB2-02").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-02").getText());
			}
			if (this.getView().byId("CB2-03").getSelected()) {
				oDataSecurityCheckBx.push(this.getView().byId("CB2-03").getText());
			}
			var oDataSecurityCheckBxMulti = oDataSecurityCheckBx.join("~");

			//Margins
			var oDataMarginsRadioBtn;
			if (this.getView().byId("RB-Margins-Left").getSelected()) {
				oDataMarginsRadioBtn = this.getView().byId("RB-Margins-Left").getText();
			} else if (this.getView().byId("RB-Margins-Right").getSelected()) {
				oDataMarginsRadioBtn = this.getView().byId("RB-Margins-Right").getText();
			}

			oParam.Fieldname = "FormInterface";
			uParam.Fieldname = "FormInterface";
			oParam.Fieldvalue = FrmData2.FormInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormInterface);

			oParam.Fieldname = "FontDetails";
			uParam.Fieldname = "FontDetails";
			oParam.Fieldvalue = FrmData2.FontDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FontDetails);

			oParam.Fieldname = "DateFormat";
			uParam.Fieldname = "DateFormat";
			oParam.Fieldvalue = FrmData2.DateFormat;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.DateFormat);

			oParam.Fieldname = "CurrencyFormat";
			uParam.Fieldname = "CurrencyFormat";
			oParam.Fieldvalue = FrmData2.CurrencyFormat;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.CurrencyFormat);

			oParam.Fieldname = "Margins";
			uParam.Fieldname = "Margins";
			oParam.Fieldvalue = oDataMarginsRadioBtn;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Margins);

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);

			oParam.Fieldname = "Approver_TS";
			uParam.Fieldname = "Approver_TS";
			oParam.Fieldvalue = FrmData.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Approver);

			oParam.Fieldname = "Reviewer_TS";
			uParam.Fieldname = "Reviewer_TS";
			oParam.Fieldvalue = FrmData.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Reviewer);

			oParam.Fieldname = "Author_TS";
			uParam.Fieldname = "Author_TS";
			oParam.Fieldvalue = FrmData.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Author);

			oParam.Fieldname = "TechnicalAssumptions";
			uParam.Fieldname = "TechnicalAssumptions";
			oParam.Fieldvalue = FrmData2.TechnicalAssumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.TechnicalAssumptions);

			oParam.Fieldname = "ProcessingLogic";
			uParam.Fieldname = "ProcessingLogic";
			oParam.Fieldvalue = FrmData2.ProcessingLogic;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.ProcessingLogic);
			oParam.Fieldname = "CustObjAttr_frm";
			uParam.Fieldname = "CustObjAttr_frm";
			oParam.Fieldvalue = FrmData2.CustObjAttr_frm;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.CustObjAttr_frm);
			oParam.Fieldname = "HanaModelAttr_frm";
			uParam.Fieldname = "HanaModelAttr_frm";
			oParam.Fieldvalue = FrmData2.HanaModelAttr_frm;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.HanaModelAttr_frm);
			oParam.Fieldname = "OdataAttr_frm";
			uParam.Fieldname = "OdataAttr_frm";
			oParam.Fieldvalue = FrmData2.OdataAttr_frm;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.OdataAttr_frm);
			oParam.Fieldname = "attach_wfl";
			uParam.Fieldname = "attach_wfl";
			oParam.Fieldvalue = FrmData2.attach_wfl;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.attach_wfl);
			oParam.Fieldname = "AbapHanaAttr_frm";
			uParam.Fieldname = "AbapHanaAttr_frm";
			oParam.Fieldvalue = FrmData2.AbapHanaAttr_frm;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.AbapHanaAttr_frm);
			oParam.Fieldname = "ErrInfo";
			uParam.Fieldname = "ErrInfo";
			oParam.Fieldvalue = FrmData2.ErrInfo;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.ErrInfo);
			oParam.Fieldname = "PrinterTransaction";
			uParam.Fieldname = "PrinterTransaction";
			oParam.Fieldvalue = FrmData2.PrintTR;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrintTR);

			oParam.Fieldname = "OutputType";
			uParam.Fieldname = "OutputType";
			oParam.Fieldvalue = FrmData2.OutputTypes;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.OutputTypes);

			oParam.Fieldname = "RunMode";
			uParam.Fieldname = "RunMode";
			oParam.Fieldvalue = oDataoDataRunModeCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.RunMode);

			oParam.Fieldname = "DataVolumeRecords";
			uParam.Fieldname = "DataVolumeRecords";
			oParam.Fieldvalue = FrmData2.DataVol;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.DataVol);

			oParam.Fieldname = "Type";
			uParam.Fieldname = "Type";
			oParam.Fieldvalue = oDataTypeCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Type);

			oParam.Fieldname = "PrintProgramName";
			uParam.Fieldname = "PrintProgramName";
			oParam.Fieldvalue = FrmData2.PrintName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrintName);

			oParam.Fieldname = "StandardText";
			uParam.Fieldname = "StandardText";
			oParam.Fieldvalue = FrmData2.StdText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.StdText);

			oParam.Fieldname = "Logo";
			uParam.Fieldname = "Logo";
			oParam.Fieldvalue = FrmData2.Logo;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Logo);

			oParam.Fieldname = "PageFormat";
			uParam.Fieldname = "PageFormat";
			oParam.Fieldvalue = oDataPageFormatCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PageFormat);

			oParam.Fieldname = "PrinterSpecificRequirement";
			uParam.Fieldname = "PrinterSpecificRequirement";
			oParam.Fieldvalue = FrmData2.PrintSP;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrintSP);

			oParam.Fieldname = "OutputRequirement";
			uParam.Fieldname = "OutputRequirement";
			oParam.Fieldvalue = FrmData2.OpReq;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.OpReq);

			oParam.Fieldname = "SampleFormLayout";
			uParam.Fieldname = "SampleFormLayout";
			oParam.Fieldvalue = FrmData2.Sample;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Sample);

			oParam.Fieldname = "Security_TS";
			uParam.Fieldname = "Security_TS";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.security);

			oParam.Fieldname = "SecurityComments_TS";
			uParam.Fieldname = "SecurityComments_TS";
			oParam.Fieldvalue = FrmData.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.securityComments);

			oParam.Fieldname = "ProcessingLogic_Review";
			uParam.Fieldname = "ProcessingLogic_Review";
			if (FrmData.ProcessingLogic_Review) {
				oParam.Fieldvalue = FrmData.ProcessingLogic_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.ProcessingLogic_Review);

			oParam.Fieldname = "ProcessingLogic_Comments";
			uParam.Fieldname = "ProcessingLogic_Comments";
			oParam.Fieldvalue = FrmData.ProcessingLogic_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.ProcessingLogic_Comments);

			oParam.Fieldname = "FlowLogic_Review";
			uParam.Fieldname = "FlowLogic_Review";
			if (FrmData.FlowLogic_Review) {
				oParam.Fieldvalue = FrmData.FlowLogic_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FlowLogic_Review);

			oParam.Fieldname = "FlowLogic_Comments";
			uParam.Fieldname = "FlowLogic_Comments";
			oParam.Fieldvalue = FrmData.FlowLogic_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FlowLogic_Comments);

			oParam.Fieldname = "TechAss_Review";
			uParam.Fieldname = "TechAss_Review";
			if (FrmData.TechAss_Review) {
				oParam.Fieldvalue = FrmData.TechAss_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.TechAss_Review);

			oParam.Fieldname = "TechAss_Comments";
			uParam.Fieldname = "TechAss_Comments";
			oParam.Fieldvalue = FrmData.TechAss_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.TechAss_Comments);

			oParam.Fieldname = "FormErrorHandling_Review";
			uParam.Fieldname = "FormErrorHandling_Review";
			if (FrmData.FormErrorHandling_Review) {
				oParam.Fieldvalue = FrmData.FormErrorHandling_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormErrorHandling_Review);

			oParam.Fieldname = "FormErrorHandling_Comments";
			uParam.Fieldname = "FormErrorHandling_Comments";
			oParam.Fieldvalue = FrmData.FormErrorHandling_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormErrorHandling_Comments);

			this.updateUserAcceptanceFormTS();
		},
		updateUserAcceptanceFormTS: function() {
			var FrmData = this.getView().getModel("enhData").getData();

			var objInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var oParam = {
				Version: objInfo.Version,
				Repid: objInfo.Repid,
				Projectkey: objInfo.Projectkey,
				Processid: objInfo.Processid,
				Stepno: objInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: objInfo.Version,
				Repid: objInfo.Repid,
				Projectkey: objInfo.Projectkey,
				Processid: objInfo.Processid,
				Stepno: objInfo.Stepno,
				Fieldname: ''
			};

			for (var n = 0; n < FrmData.userAcceptance.length; n++) {
				var index = parseInt(FrmData.userAcceptance[n].Index);

				globalUserAcceptanceArray[index].Step = FrmData.userAcceptance[n].step;
				globalUserAcceptanceArray[index].TestType = FrmData.userAcceptance[n].testType;
				globalUserAcceptanceArray[index].Scenario = FrmData.userAcceptance[n].scenario;
				globalUserAcceptanceArray[index].TestData = FrmData.userAcceptance[n].testData;
				globalUserAcceptanceArray[index].StepsPer = FrmData.userAcceptance[n].stepsPer;
				globalUserAcceptanceArray[index].ActualResults = FrmData.userAcceptance[n].actualResults;
				globalUserAcceptanceArray[index].ExpectedResults = FrmData.userAcceptance[n].expectedResults;
			}

			for (var i = 0; i < globalUserAcceptanceArray.length; i++) {
				if (globalUserAcceptanceArray[i].Existance === "D") {
					for (var j = globalUserAcceptanceArray.length - 1; j > i; j--) {
						if (globalUserAcceptanceArray[j].Existance === "E") {
							var dData = {};
							var eData = {};

							dData.Step = globalUserAcceptanceArray[i].Step;
							dData.TestType = globalUserAcceptanceArray[i].TestType;
							dData.Scenario = globalUserAcceptanceArray[i].Scenario;
							dData.TestData = globalUserAcceptanceArray[i].TestData;
							dData.StepsPer = globalUserAcceptanceArray[i].StepsPer;
							dData.ActualResults = globalUserAcceptanceArray[i].ActualResults;
							dData.ExpectedResults = globalUserAcceptanceArray[i].ExpectedResults;
							dData.Existance = globalUserAcceptanceArray[i].Existance;

							eData.Step = globalUserAcceptanceArray[j].Step;
							eData.TestType = globalUserAcceptanceArray[j].TestType;
							eData.Scenario = globalUserAcceptanceArray[j].Scenario;
							eData.TestData = globalUserAcceptanceArray[j].TestData;
							eData.StepsPer = globalUserAcceptanceArray[j].StepsPer;
							eData.ActualResults = globalUserAcceptanceArray[j].ActualResults;
							eData.ExpectedResults = globalUserAcceptanceArray[j].ExpectedResults;
							eData.Existance = globalUserAcceptanceArray[j].Existance;

							globalUserAcceptanceArray[i].Step = eData.Step;
							globalUserAcceptanceArray[i].TestType = eData.TestType;
							globalUserAcceptanceArray[i].Scenario = eData.Scenario;
							globalUserAcceptanceArray[i].TestData = eData.TestData;
							globalUserAcceptanceArray[i].StepsPer = eData.StepsPer;
							globalUserAcceptanceArray[i].ActualResults = eData.ActualResults;
							globalUserAcceptanceArray[i].ExpectedResults = eData.ExpectedResults;
							globalUserAcceptanceArray[i].Existance = eData.Existance;

							globalUserAcceptanceArray[j].Step = dData.Step;
							globalUserAcceptanceArray[j].TestType = dData.TestType;
							globalUserAcceptanceArray[j].Scenario = dData.Scenario;
							globalUserAcceptanceArray[j].TestData = dData.TestData;
							globalUserAcceptanceArray[j].StepsPer = dData.StepsPer;
							globalUserAcceptanceArray[j].ActualResults = dData.ActualResults;
							globalUserAcceptanceArray[j].ExpectedResults = dData.ExpectedResults;
							globalUserAcceptanceArray[j].Existance = dData.Existance;

							break;
						} else {
							continue;
						}
					}
				}
			}

			var maxExistingUATCount = 0;

			for (var e = 0; e < globalUserAcceptanceArray.length; e++) {
				if (globalUserAcceptanceArray[e].Existance === "E") {
					maxExistingUATCount = maxExistingUATCount + 1;
				}
			}

			for (var a = 0; a < globalUserAcceptanceArray.length; a++) {
				var userAcceptanceTable;
				var userAcceptanceTblMulti;

				if (globalUserAcceptanceArray[a].Existance === "N") {
					maxExistingUATCount = maxExistingUATCount + 1;
					globalUserAcceptanceArray[a].Fieldname = "UA" + maxExistingUATCount.toString() + "_TS";
					userAcceptanceTable = Object.keys(globalUserAcceptanceArray[a]).map(function(key) {
						if (key !== "Index" && key !== "Fieldname" && key !== "Existance") {
							return [globalUserAcceptanceArray[a][key]];
						}
					});

					userAcceptanceTblMulti = userAcceptanceTable.join("~");
					userAcceptanceTblMulti = userAcceptanceTblMulti.substr(2, userAcceptanceTblMulti.length - 3);

					oParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					uParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					oParam.Fieldvalue = userAcceptanceTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, false);
				} else if (globalUserAcceptanceArray[a].Existance === "E") {
					userAcceptanceTable = Object.keys(globalUserAcceptanceArray[a]).map(function(key) {
						if (key !== "Index" && key !== "Fieldname" && key !== "Existance") {
							return [globalUserAcceptanceArray[a][key]];
						}
					});

					userAcceptanceTblMulti = userAcceptanceTable.join("~");
					userAcceptanceTblMulti = userAcceptanceTblMulti.substr(2, userAcceptanceTblMulti.length - 3);

					oParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					uParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					oParam.Fieldvalue = userAcceptanceTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, true);
				} else if (globalUserAcceptanceArray[a].Existance === "D") {
					oParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					uParam.Fieldname = globalUserAcceptanceArray[a].Fieldname;
					callServices.fnRemoveInMainTable(oParam);
				}
			}

		},

		onConfirmSave: function() {

			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainerTS").setVisible(true);

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oCurrentView = this.getView();

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

			oParam.Fieldname = "Status_TS";
			uParam.Fieldname = "Status_TS";
			oParam.Fieldvalue = 'SAVED';
			if (oInfo.Projectkey === "ENH") {

				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);

			} else if (oInfo.Projectkey === "WFLW") {

				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Status_TS);

			} else if (oInfo.Projectkey === "FRM") {

				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);

			}

			this.getView().byId("oBTHold").setEnabled(true);
			if (obj === "new") {
				this.oReadWflDataSuccess = {
					Approver: false,
					Reviewer: false,
					Author: false,
					wfName: false,
					templateNo: false,
					wfDesc: false,
					busiObj: false,
					busiObjSubTyp: false,
					fioriApp: false,
					authObjUsed: false,
					wfStartCond: false,
					wfTrigFreq: false,
					trigEvt: false,
					devClass: false,
					coaName: false,
					coaDesc: false,
					coaLogicDB: false,
					coaPkg: false,
					security: false,
					securityTS: false,
					userAccept1: false,
					userAccept2: false,
					Status_TS: false,
					attach_wfl: false,
					HanaModelAttr_wfl: false,
					CustObjAttr_wfl: false,
					AbapHanaAttr_wfl: false,
					TechLogflow_wfl: false,
					psp_wfl: false

				};
				/*this.oReadFormDataSuccess = {
					Approver: false,
					Reviewer: false,
					Author: false,
					PrintTR: false,
					OutputTypes: false,
					RunMode: false,
					DataVol: false,
					Type: false,
					PrintName: false,
					StdText: false,
					Logo: false,
					PageFormat: false,
					PrintSP: false,
					OpReq: false,
					Sample: false,
					security: false,
					securityComments: false
			};*/

				switch (type) {
					case "Workflow":
						this.updateWorkFlowTS();
						break;
					case "Enhancement":
						this.updateEnhancementTS();
						break;
					case "Form":
						this.updateFormTS();
						break;
				}
				// Update Process Lane Starts
				var oCurrentView = this.getView();
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

			} else if (obj === "existing") {
				var oParam = "";
				try {
					oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
					if (oParam.Projectkey === "ENH") {
						this.updateEnhancementTS();
					} else if (oParam.Projectkey === "WFLW") {

					
						this.updateWorkFlowTS();
					} else if (oParam.Projectkey === "FRM") {
						this.updateFormTS();
					}
					// Update Process Lane Starts
					var oCurrentView = this.getView();
					oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").updateModel();
					// Update Process Lane Ends

				} catch (exception) {
					return;
				}
			}
		},
		handleMessagePopoverPress: function(oEvent) {
			sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
		},

		onSave: function() {
			var that = this;
			sap.m.MessageBox.show(
				"Do You want to save the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmSave();
							that.getView().byId("idPrintScreen").setVisible(true);
						}

					}
				}
			);

		},

		addNewRowUA: function() {
			var type = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Projectkey;

			if (type === "FRM") {
				var uaIndex = globalUserAcceptanceArray.length;

				this.getView().getModel("enhData").getData().userAcceptance.push({
					Index: uaIndex.toString(),
					Fieldname: "",
					step: "",
					testType: "",
					scenario: "",
					testData: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: ""
				});

				globalUserAcceptanceArrayData = {};

				globalUserAcceptanceArrayData.Index = uaIndex;
				globalUserAcceptanceArrayData.Fieldname = "";
				globalUserAcceptanceArrayData.Step = "";
				globalUserAcceptanceArrayData.TestType = "";
				globalUserAcceptanceArrayData.Scenario = "";
				globalUserAcceptanceArrayData.TestData = "";
				globalUserAcceptanceArrayData.StepsPer = "";
				globalUserAcceptanceArrayData.ActualResults = "";
				globalUserAcceptanceArrayData.ExpectedResults = "";
				globalUserAcceptanceArrayData.Existance = "N";

				globalUserAcceptanceArray.push(globalUserAcceptanceArrayData);
			} else {
				this.getView().getModel("enhData").getData().userAcceptance.push({
					step: "",
					testType: "",
					scenario: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: ""
				});
			}

			this.getView().getModel("enhData").refresh();

		},
		// deleteRowUA: function(oEvent) {

		// 	if (this.getView().getModel("enhData").getData().userAcceptance.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/userAcceptance/")[1];
		// 		this.getView().getModel("enhData").getData().userAcceptance.splice(index, 1);
		// 		this.getView().getModel("enhData").refresh();
		// 	}
		// },
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
							var type = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Projectkey;

							if (type === "FRM") {
								if (that.getView().getModel("enhData").getData().userAcceptance.length > 1) {
									var sPath = sEvent.getParent().getParent().getBindingContextPath();
									var index = sPath.split("/userAcceptance/")[1];
									var counter = parseInt(that.getView().getModel("enhData").getData().userAcceptance[index].Index);

									if (globalUserAcceptanceArray[counter].Existance === "E") {
										globalUserAcceptanceArray[counter].Existance = "D";
									} else if (globalUserAcceptanceArray[counter].Existance === "N") {
										globalUserAcceptanceArray.splice(counter, 1);

										for (var i = 0; i < globalUserAcceptanceArray.length; i++) {
											globalUserAcceptanceArray[i].Index = i;
										}
									}

									that.getView().getModel("enhData").getData().userAcceptance.splice(index, 1);
									that.getView().getModel("enhData").refresh();
								}
							} else {
								that.onConfirmDelete(sEvent);
							}
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
			if (this.getView().getModel("enhData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				var FieldnameIndex = parseInt(index) + 1;
				// var index1 = this.getView().getModel("enhData").getData().userAcceptance.length;
				oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[index];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.testData + "~" + oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_" + FieldnameIndex;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" +
					oUAEntry.testData + "~" + oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
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
						if (that.getView().getModel("enhData").getData().userAcceptance.length === 1) {
							that.getView().getModel("enhData").getData().userAcceptance.splice(0, 1);

							that.getView().getModel("enhData").getData().userAcceptance.push({
								step: "",
								testType: "",
								scenario: "",
								stepsPer: "",
								actualResults: "",
								expectedResults: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							// that.updateUserAcc(oParam, uParam);
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

		addNewRowCustomTable: function() {
			this.getView().getModel("enhData").getData().reqCustTable.push({
				tableName: "",
				fieldDesc: "",
				fieldType: "",
				fieldLength: "",
				valRestrictions: "",
				sourceTable: ""
			});
			this.getView().getModel("enhData").refresh();
		},
		deleteRowCustomTable: function(oEvent) {

			if (this.getView().getModel("enhData").getData().reqCustTable.length > 1) {
				var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
				var index = sPath.split("/reqCustTable/")[1];
				this.getView().getModel("enhData").getData().reqCustTable.splice(index, 1);
				this.getView().getModel("enhData").refresh();
			}
		},

		addNewRowBOR: function() {
			this.getView().getModel("enhData").getData().BusinessObjModEnh.push({
				BorElementType: "",
				BorElementName: "",
				BorDescription: ""
			});
			this.getView().getModel("enhData").refresh();

		},
		deleteRowBOR: function(oEvent) {
			//confirmcode
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
							that.onConfirmBORRowDelete(sEvent);
						}

					}
				}
			);
			//EndConfirm code

			// if (this.getView().getModel("enhData").getData().BusinessObjModEnh.length > 1) {
			// 	var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
			// 	var index = sPath.split("/BusinessObjModEnh/")[1];
			// 	this.getView().getModel("enhData").getData().BusinessObjModEnh.splice(index, 1);
			// 	this.getView().getModel("enhData").refresh();
			// }
		},
		onConfirmBORRowDelete: function(sEvent) {
			var that = this;
			var oBREntry, sBREntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oParam = {
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			if (this.getView().getModel("enhData").getData().BusinessObjModEnh.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/BusinessObjModEnh/")[1];
				var FieldnameIndex = parseInt(index) + 1;
				// var index1 = this.getView().getModel("enhData").getData().BusinessObjModEnh.length;
				oBREntry = this.getView().getModel("enhData").getData().BusinessObjModEnh[index];
				sBREntry = oBREntry.BorElementType + "~" + oBREntry.BorElementName + "~" + oBREntry.BorDescription;
				oParam.Fieldvalue = sBREntry;
				oParam.Fieldname = "TS_BOR_" + FieldnameIndex;
				this.deleteBorCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().BusinessObjModEnh.length === 1) {
				oBREntry = this.getView().getModel("enhData").getData().BusinessObjModEnh[0];
				sBREntry = oBREntry.BorElementType + "~" + oBREntry.BorElementName + "~" + oBREntry.BorDescription;
				oParam.Fieldvalue = sBREntry;
				oParam.Fieldname = "TS_BOR_1";
				this.deleteBorCall(oParam, uParam, index);
			}
		},
		deleteBorCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("enhData").getData().BusinessObjModEnh.length === 1) {
							that.getView().getModel("enhData").getData().BusinessObjModEnh.splice(0, 1);

							that.getView().getModel("enhData").getData().BusinessObjModEnh.push({
								BorElementType: "",
								BorElementName: "",
								BorDescription: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().BusinessObjModEnh.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							// that.updateUserAcc(oParam, uParam);
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
		addNewRowStepDet: function() {
			this.getView().getModel("enhData").getData().StepsDetails.push({
				TaskNumber: "",
				TaskType: "",
				BusinessObj: "",
				TaskDescLogic: "",
				Deadline: "",
				RoleResol: "",
				OtherWFSteps: ""
			});
			this.getView().getModel("enhData").refresh();

		},
		deleteRowStepDet: function(oEvent) {
			//confirmcode
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
							that.onConfirmStepDetRowDelete(sEvent);
						}

					}
				}
			);
			//EndConfirm code

			// if (this.getView().getModel("enhData").getData().StepsDetails.length > 1) {
			// 	var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
			// 	var index = sPath.split("/StepsDetails/")[1];
			// 	this.getView().getModel("enhData").getData().StepsDetails.splice(index, 1);
			// 	this.getView().getModel("enhData").refresh();
			// }
		},
		onConfirmStepDetRowDelete: function(sEvent) {
			var that = this;
			var oStpDetEntry, sStpDetEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oParam = {
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			if (this.getView().getModel("enhData").getData().StepsDetails.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/StepsDetails/")[1];
				var FieldnameIndex = parseInt(index) + 1;
				// var index1 = this.getView().getModel("enhData").getData().StepsDetails.length;
				oStpDetEntry = this.getView().getModel("enhData").getData().StepsDetails[index];
				sStpDetEntry = oStpDetEntry.TaskNumber + "~" + oStpDetEntry.TaskType + "~" + oStpDetEntry.BusinessObj + "~" +
					oStpDetEntry.TaskDescLogic + "~" + oStpDetEntry.Deadline + "~" + oStpDetEntry.RoleResol + "~" + oStpDetEntry.OtherWFSteps;
				oParam.Fieldvalue = sStpDetEntry;
				oParam.Fieldname = "TS_StepsDetails_" + FieldnameIndex;
				this.deleteStpDetCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().StepsDetails.length === 1) {
				oStpDetEntry = this.getView().getModel("enhData").getData().StepsDetails[0];
				sStpDetEntry = oStpDetEntry.TaskNumber + "~" + oStpDetEntry.TaskType + "~" + oStpDetEntry.BusinessObj + "~" +
					oStpDetEntry.TaskDescLogic + "~" + oStpDetEntry.Deadline + "~" + oStpDetEntry.RoleResol + "~" + oStpDetEntry.OtherWFSteps;
				oParam.Fieldvalue = sStpDetEntry;
				oParam.Fieldname = "TS_StepsDetails_1";
				this.deleteStpDetCall(oParam, uParam, index);
			}
		},
		deleteStpDetCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("enhData").getData().StepsDetails.length === 1) {
							that.getView().getModel("enhData").getData().StepsDetails.splice(0, 1);

							that.getView().getModel("enhData").getData().StepsDetails.push({
								TaskNumber: "",
								TaskType: "",
								BusinessObj: "",
								TaskDescLogic: "",
								Deadline: "",
								RoleResol: "",
								OtherWFSteps: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().StepsDetails.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							// that.updateUserAcc(oParam, uParam);
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

		callAttachment: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: "S2"
			};

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachTechFlowLogic').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplTechFlowLogic"), "TechFlowLogic",
					oServiceParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
				//oServiceParam.FIELDNAME = "TechFlowLogic";
				// this.readAttachments(oServiceParam);
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachTechAssumpDep').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplTechAssumpDep"), "TechAssDepUploadData",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON"), "attachIntTechAssDep", "attachIntTechAssDepVisible");
				//oServiceParam.FIELDNAME = "TechAssumptions";
				// this.readAttachments(oServiceParam);
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadFormFlowChart').getId()) {
				/*	callServices.callAttachmentService(this.getView().byId("fileUploadFormFlowChart"), "FrmFlowReq");
					oServiceParam.FIELDNAME = "FrmFlowReq";
					this.readFormFlowChartAttachments(oServiceParam);*/
				callServices.callAttachmentService(this.getView().byId("fileUploadFormFlowChart"), "FrmFlowReq",
					oServiceParam, this.getView().getModel("intDataTechFlowChartJSON"), "attachIntTechFlowChart", "attachIntTechFlowChartVisible");

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachTechAssumpDep1').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplTechAssumpDep1"), "TechAssDepUploadData1",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON1"), "attachIntTechAssDep1", "attachIntTechAssDepVisible1");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachCustObjAttrDep').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplCustObjAttr"), "TechAssDepUploadData2",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON2"), "attachIntTechAssDep2", "attachIntTechAssDepVisible2");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachHanaModelAttrDep').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplHanaModelAttr "), "TechAssDepUploadData3",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON3"), "attachIntTechAssDep3", "attachIntTechAssDepVisible3");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachAbapHanaAttrDep').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplAbapHanaAttr"), "TechAssDepUploadData4",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON4"), "attachIntTechAssDep4", "attachIntTechAssDepVisible4");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachOdataAttrDep').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplOdataAttr"), "TechAssDepUploadData5",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON5"), "attachIntTechAssDep5", "attachIntTechAssDepVisible5");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachTechFlowLogic').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplTechFlowLogic"), "TechAssDepUploadData6",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON6"), "attachIntTechAssDep6", "attachIntTechAssDepVisible6");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachErrHandle').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplErrHandle"), "TechAssDepUploadData7",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON7"), "attachIntTechAssDep7", "attachIntTechAssDepVisible7");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachCustObjAttrDep_frm').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplCustObjAttr_frm"), "TechAssDepUploadData2_frm",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON2_frm"), "attachIntTechAssDep2_frm",
					"attachIntTechAssDepVisible2_frm");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachHanaModelAttrDep_frm').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplHanaModelAttr_frm"), "TechAssDepUploadData3_frm",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON3_frm"), "attachIntTechAssDep3_frm",
					"attachIntTechAssDepVisible3_frm");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachAbapHanaAttrDep_frm').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplAbapHanaAttr_frm"), "TechAssDepUploadData4_frm",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON4_frm"), "attachIntTechAssDep4_frm",
					"attachIntTechAssDepVisible4_frm");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachOdataAttrDep_frm').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplOdataAttr_frm"), "TechAssDepUploadData5_frm",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON5_frm"), "attachIntTechAssDep5_frm",
					"attachIntTechAssDepVisible5_frm");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachCustObjAttrDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplCustObjAttr_wfl"), "TechAssDepUploadData2_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON2_wfl"), "attachIntTechAssDep2_wfl",
					"attachIntTechAssDepVisible2_wfl");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachHanaModelAttrDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplHanaModelAttr_wfl"), "TechAssDepUploadData3_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON3_wfl"), "attachIntTechAssDep3_wfl",
					"attachIntTechAssDepVisible3_wfl");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachAbapHanaAttrDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplAbapHanaAttr_wfl"), "TechAssDepUploadData4_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON4_wfl"), "attachIntTechAssDep4_wfl",
					"attachIntTechAssDepVisible4_wfl");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachTechLogflowDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplTechLogflow_wfl"), "TechAssDepUploadData5_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON5_wfl"), "attachIntTechAssDep5_wfl",
					"attachIntTechAssDepVisible5_wfl");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachpspDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplpsp_wfl"), "TechAssDepUploadData6_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON6_wfl"), "attachIntTechAssDep6_wfl",
					"attachIntTechAssDepVisible6_wfl");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachAppendixDep_wfl').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUplappendix_wfl"), "TechAssDepUploadData7_wfl",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON7_wfl"), "attachIntTechAssDep7_wfl",
					"attachIntTechAssDepVisible7_wfl");
			}
			/*else if (oEvent.getSource().getId() === this.getView().byId('uploadFormTechAssumpDepend').getId()) 
			{
					callServices.callAttachmentService(this.getView().byId("fileUploadFormTechAssumpDepend"), "FrmAssumpDepend",
					oServiceParam, this.getView().getModel("intDataTechAssumpDependJSON"), "attachIntTechAssumpDepend", "attachIntTechAssumpDependVisible");
			
			}*/
			else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachWFTS').getId()) {

				callServices.callAttachmentService(this.getView().byId("fileUploadWfTS"), "WorflowTSAttach",
					oServiceParam, this.getView().getModel("attachDataWFTSJSON"), "attachWFTS", "attachWFTSVisible");
			}

			// else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachWFReq').getId()) {
			// 	callServices.callAttachmentService(this.getView().byId("fileUploadWfReq"), "WFAttachmentReq");
			// 	oServiceParam.FIELDNAME = "WFAttachmentReq";
			// 	this.readAttachments(oServiceParam);
			// } else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachFrmPrintReq').getId()) {
			// 	callServices.callAttachmentService(this.getView().byId("fileUploadFrmPrintReq"), "FrmPrintAttachmentReq");
			// 	oServiceParam.FIELDNAME = "FrmPrintAttachmentReq";
			// 	this.readFormAttachments(oServiceParam);
			// }
		},

		onChangeVersionExistingTech: function(oevent) {
			var currentversion = oevent.getSource().getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			this.changeVersionKeyFlag = true;
			var params = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			params = params.Projectkey;

			if (params === "ENH") {
				this.dataReadEnhancement(versionno[1]);
			} else if (params === "WFLW") {
				this.getDataForWorkflow("E", versionno[1]);
			} else if (params === "FRM") {
				this.dataRead2(versionno[1]);
			} else {
				return;
			}

		},

		readAttachments: function(mParameter) {

			var oView = this.getView();
			var oVal;
			var sParam = "?$filter=";
			$.each(mParameter, function(key, val) {
				sParam += key + " eq '" + val + "' and ";
			});
			sParam = sParam.substr(0, sParam.length - 5);
			sParam += "&$format=json";

			var sServiceURL = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam,
				datatype: "application/json"
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("enhData").getData().attachEnhReq = [];
				$.each(oVal, function(index, item) {
					oView.getModel("enhData").getData().attachEnhReq.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("enhData").getData().attachEnhReqVisible = true;
				});
				oView.getModel("enhData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		readAttachmentsWFTS: function(mParameter) {

			var oView = this.getView();
			var oVal;
			var sParam = "?$filter=";
			$.each(mParameter, function(key, val) {
				sParam += key + " eq '" + val + "' and ";
			});
			sParam = sParam.substr(0, sParam.length - 5);
			sParam += "&$format=json";

			var sServiceURL = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam,
				datatype: "application/json"
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("attachDataWFTSJSON").getData().attachWFTS = [];
				$.each(oVal, function(index, item) {
					oView.getModel("attachDataWFTSJSON").getData().attachWFTS.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("attachDataWFTSJSON").getData().attachWFTSVisible = true;
				});
				oView.getModel("attachDataWFTSJSON").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		readAttachmentsTechAssumpDep: function(mParameter) {

			var oView = this.getView();
			var oVal;
			var sParam = "?$filter=";
			$.each(mParameter, function(key, val) {
				sParam += key + " eq '" + val + "' and ";
			});
			sParam = sParam.substr(0, sParam.length - 5);
			sParam += "&$format=json";

			var sServiceURL = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam,
				datatype: "application/json"
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("enhData").getData().attachTechAssumpDep = [];
				$.each(oVal, function(index, item) {
					oView.getModel("enhData").getData().attachTechAssumpDep.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("enhData").getData().attachTechAssumpDepVisible = true;
				});
				oView.getModel("enhData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		deleteFileTechFlowLogic: function(oEvent) {

			var URI = oEvent.getSource().getActiveIcon();
			if (callServices.deleteAttachment(URI)) {
				var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				var oreadAttachmentsFlow = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechFlowLogic",
					TYPE: "O"
				};
				callServices.readAttachmentList(oreadAttachmentsFlow, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
			}
		},

		readAttachmentsTechAssDep: function(mParameter, oView) {

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
				oView.getModel("intDataTechAssDepJSON").getData().attachIntTechAssDep = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataTechAssDepJSON").getData().attachIntTechAssDep.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataTechAssDepJSON").getData().attachIntTechAssDepVisible = true;
				});
				oView.getModel("intDataTechAssDepJSON").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		deleteFileTechAssumpDep: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachTechAssumpDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON"), "attachIntTechAssDep",
					"attachIntConTSVisible");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep1: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachTechAssumpDep1");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData1",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON1"), "attachIntTechAssDep1",
					"attachIntConTSVisible1");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep2: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachCustObjAttrDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData2",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON2"), "attachIntTechAssDep2",
					"attachIntConTSVisible2");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep3: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachHanaModelAttrDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData3",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON3"), "attachIntTechAssDep3",
					"attachIntConTSVisible3");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep4: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachAbapHanaAttrDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData4",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON4"), "attachIntTechAssDep4",
					"attachIntConTSVisible4");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep5: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachOdataAttrDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData5",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON5"), "attachIntTechAssDep5",
					"attachIntConTSVisible5");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep2_frm: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachCustObjAttrDep_frm");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData2_frm",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON2_frm"),
					"attachIntTechAssDep2_frm",
					"attachIntConTSVisible2_frm");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep3_frm: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachHanaModelAttrDep_frm");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData3_frm",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON3_frm"),
					"attachIntTechAssDep3_frm",
					"attachIntConTSVisible3_frm");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep4_frm: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachAbapHanaAttrDep_frm");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData4_Frm",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON4_frm"),
					"attachIntTechAssDep4_frm",
					"attachIntConTSVisible4_frm");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep5_frm: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachOdataAttrDep_frm");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData5_frm",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON5_frm"),
					"attachIntTechAssDep5_frm",
					"attachIntConTSVisible5_frm");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep6: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachTechFlowAttrDep");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData6",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON6"), "attachIntTechAssDep6",
					"attachIntConTSVisible6");

			}
			oTable.setBusy(false);

		},
		deleteFileTechAssumpDep7: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachErrHandle");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData7",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON7"), "attachIntTechAssDep7",
					"attachIntConTSVisible7");

			}
			oTable.setBusy(false);

		},
		readAttachmentsTechFlowChart: function(mParameter, oView) {

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
				oView.getModel("intDataTechFlowChartJSON").getData().attachIntTechFlowChart = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataTechFlowChartJSON").getData().attachIntTechFlowChart.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataTechFlowChartJSON").getData().attachIntTechFlowChartVisible = true;
				});
				oView.getModel("intDataTechFlowChartJSON").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		/*readAttachmentsTechAssumpDepend: function(mParameter, oView) {

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
				oView.getModel("intDataTechAssumpDependJSON").getData().attachIntTechAssumpDepend = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataTechAssumpDependJSON").getData().attachIntTechAssumpDepend.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataTechAssumpDependJSON").getData().attachIntTechAssumpDependVisible = true;
				});
				oView.getModel("intDataTechAssumpDependJSON").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},*/

		deleteFileFlowChart: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachFormFlowChart");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: "S2",
					FIELDNAME: "FrmFlowReq",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechFlowChartJSON"), "attachIntTechFlowChart",
					"attachIntTechFlowChartVisible");

			}
			oTable.setBusy(false);

		}

		/*deleteFileTechAssumpDepend: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) 
			{
				var oTable = this.getView().byId("tableAttachFormTechAssumpDepend");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.repid,
					PROJECTKEY: oParam.projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S2",
					FIELDNAME: "FrmAssumpDepend",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssumpDependJSON"), "attachIntTechAssumpDepend", "attachIntTechAssumpDependVisible");
			}
			oTable.setBusy(false);

		}*/

		/*	deleteFileTechAssumpDep: function(oEvent) {

			var URI = oEvent.getSource().getActiveIcon();
			if (callServices.deleteAttachment(URI)) {
				var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				var oreadAttachmentsAssump = {
					REPID: oParam.repid,
					PROJECTKEY: oParam.projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssumptions",
					TYPE: "O"
				};
				callServices.readAttachmentList(oreadAttachmentsAssump, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
			}
		},
*/
		/*readFormFlowChartAttachments: function(mParameter) {

			var oView = this.getView();
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
				oView.getModel("FrmData").getData().attachFrmFlowChartReq = [];
				$.each(oVal, function(index, item) {
					oView.getModel("FrmData").getData().attachFrmFlowChartReq.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("FrmData").getData().attachFrmFlowChartReqVisible = true;
				});
				oView.getModel("FrmData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		}*/
		/*	onAccept: function() {

				var that = this;
				sap.m.MessageBox.show(
					"Do You want to Accept the data", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {

							if (oAction === "YES") {
								that.onConfirmAccept();

							}

						}
					}
				);

			},*/

		/*	onConfirmAccept: function() {
				//set staus here

				var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
				var versionno = currentversion.split(" ");

				var oParam = {
					Version: versionno[1],
					Repid: oInfo.repid,
					Projectkey: oInfo.projectkey,
					Processid: oInfo.processid,
					Stepno: oInfo.stepno,
					Fieldname: '',
					Fieldvalue: '',
					Longfieldvalue: ''
				};

				var uParam = {
					Version: versionno[1],
					Repid: oInfo.repid,
					Projectkey: oInfo.projectkey,
					Processid: oInfo.processid,
					Stepno: oInfo.stepno,
					Fieldname: ''
				};

				oParam.Fieldname = "Status_TS";
				uParam.Fieldname = "Status_TS";
				oParam.Fieldvalue = 'ACCEPTED';
				// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);
				if (oInfo.projectkey === "ENH") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_TS);
				} else if (oInfo.projectkey === "WFLW") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Status_TS);
				} else if (oInfo.projectkey === "FRM") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_TS);
				}

				var oCurrentView = this.getView();

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				//	oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends
				oCurrentView.byId("idPrintScreen").setVisible(true);


				oCurrentView.byId("oBTSave").setEnabled(false);
				//	oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("idPrintScreen").setVisible(true);

			}*/

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.automation.toolAutomationNew.view.TSDetail
		 */
		//  onBeforeRendering: function() {
		//
		//  },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.automation.toolAutomationNew.view.TSDetail
		 */
		//  onAfterRendering: function() {
		//
		//  },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.automation.toolAutomationNew.view.TSDetail
		 */
		//  onExit: function() {
		//
		//  }

	});

});