// Updated by Aashish Jainani
// 3.15.2018 | 1415 IST

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices"
], function(Controller, callServices) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.ReportTS", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("reportTS").attachPatternMatched(this.onObjectMatched, this);
			var oDataProcessFlowLanesOnly = {
				lanes: [{
						id: "0",
						icon: "sap-icon://complete",
						label: "TS Submitted",
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
					}
					// ,{
					// 	id: "2",
					// 	icon: "sap-icon://payment-approval",
					// 	label: "TS Accepted",
					// 	position: 2,
					// 	state: [{
					// 		state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
					// 		value: 50
					// 	}]
					// }
				]
			};
			var that = this;
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],
				function(RTE) {
					var oRichTextEditor2 = new RTE("myRTE2", {
						editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
						width: "100%",
						height: "600px",
						customToolbar: true,
						showGroupFont: true,
						showGroupClipboard: true,
						showGroupStructure: true,
						showGroupInsert: true,
						showGroupLink: true,
						showGroupUndo: true,
						value: "{reportData>/ObjectInformationHANA}"
					}); 
					
                    that.getView().byId("idVerticalLayoutOBJ").addContent(oRichTextEditor2);
                    sap.ui.getCore().applyChanges();
				
					var oRichTextEditor1 = new RTE("myRTE1", {
						editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
						width: "100%",
						height: "600px",
						customToolbar: true,
						showGroupFont: true,
						showGroupClipboard: true,
						showGroupStructure: true,
						showGroupInsert: true,
						showGroupLink: true,
						showGroupUndo: true,
						value: "{reportData>/TechnicalDetails}"
					}); 
					
                    that.getView().byId("idVerticalLayoutTD").addContent(oRichTextEditor1);
                    sap.ui.getCore().applyChanges();
				
				});
			var oModelPf2 = new sap.ui.model.json.JSONModel();
			var viewPf2 = this.getView();
			oModelPf2.setData(oDataProcessFlowLanesOnly);
			viewPf2.setModel(oModelPf2, "pf2");
			viewPf2.byId("processflow2").updateModel();
		},

		oDataReportSuccess: {},

		oProjectId: "",
		

		onObjectMatched: function(oEvent) {
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S2";
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			var that = this;
			var oDataReport = this.oDataReport;
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			this.mArguments = oEvent.getParameters().arguments;
			var title = "Report TS " + this.mArguments.objectlist + " Material Master Update";

			this.byId("repTSPopOver").setVisible(false);
			
			this.byId("doctype").setSelectedKey("Technical");

			var obj = this.mArguments.object;

			this.oDataReport = {
				ProgramName: "",
				IncludeProgram: "",
				ProcessArea: "",
				FioriApp: "",
				AuthorizationObjectTS: "",
				ReportLayout: "",
				InteractiveReport: "",
				RunMode: "",
				TypeofReport: "",
				ObjectInformationHANA:"",
				HANAModellingAttributes: "",
				ABAPHANACustomObjectAttributes: "",
				TechnicalDetails: "",
				SecuritySection: "",
				ErrorHandlingTS: "",
				Reviewer: "",
				Approver: "",
				Author: "",
				STATUS: "",
				userAccept1: "",
				userAccept2: "",
				userAcceptance: []
			};

			this.oDataReportSuccess = {
				ProgramName: false,
				IncludeProgram: false,
				ProcessArea: false,
				FioriApp: false,
				AuthorizationObjectTS: false,
				ReportLayout: false,
				InteractiveReport: false,
				RunMode: false,
				TypeofReport: false,
				ObjectInformationHANA: false,
				HANAModellingAttributes: false,
				ABAPHANACustomObjectAttributes: false,
				TechnicalDetails: false,
				SecuritySection: false,
				ErrorHandlingTS: false,
				Reviewer: false,
				Approver: false,
				Author: false,
				STATUS: false,
				userAccept1: false,
				userAccept2: false
				
			};
			var oModelReport = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelReport, "reportData");

			if (obj === "new") {
				this.byId("versiontypeNewTech").setVisible(true);
				this.byId("onPrintRepTS").setEnabled(false);
				oModelReport.setData(this.oDataReport);
				this.dataRead();
			} else {
				this.byId("versiontypeNewTech").setVisible(false);
				this.byId("versiontypeExistingTech").setVisible(true);
				this.byId("versiontypeExistingTech").destroyItems();
				this.byId("onPrintRepTS").setEnabled(true);

				var oSelect = this.getView().byId("versiontypeExistingTech");
				var newItem = new sap.ui.core.Item({
					key: "Version 1.0",
					text: "Version 1.0"
				});

				oSelect.addItem(newItem);
				this.dataRead();
			}

			this.byId("idIconTabBarNoIcons").setSelectedKey("reportTechDesign");

			if (this.byId("idIconTabBarNoIcons").getSelectedKey() === "reportTechDesign") {
				this.byId("reportTechObjectInfo").setExpanded(true);
			//	this.byId("reportTechOBJ").setExpanded(false);
				this.byId("reportTechHANA").setExpanded(false);
				this.byId("reportTechABAP").setExpanded(false);
				this.byId("reportTechPanel").setExpanded(false);
			}
		},

		onChangeVersionExistingTech: function(oevent) {
			var currentversion = oevent.getSource().getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var params = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			params = params.Projectkey;
			this.dataRead(versionno[1]);
		},

		dataRead: function(versionNo) {
			var that = this;
			var oDataReport = this.oDataReport;
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (!oParam) {
				return;
			}
			if (oParam) {
				if (oParam.projectid) {
					delete oParam.projectid;
				}
			}
			oParam.Version = "1.0";

			if (versionNo) {
				oParam.Version = versionNo;
				var crNumber1 = sessionStorage.getItem("crNumber");
				if (crNumber1 !== "") {
					oDataReport.StoryNumberFComment = crNumber1;
				}
			} else {
				var num = 1;
				while (num > 0) {
					oParam.Fieldname = "STATUS_TS";
					callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);
					oDataReport.versionLatest = oDataReport.STATUS;
					//SOC Writwick 12 July 2018
					if (oDataReport.versionLatest !== "") {
						num = num + 1;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";

						if (oDataReport.versionLatest === "TS APPROVED") {
							var selectedKey = "Version " + oParam.Version;
							var oSelect = this.getView().byId("versiontypeExistingTech");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);
						}
						oDataReport.versionLatest = "";
						oDataReport.STATUS = "";
						
					} else if (num > 1){
						oParam.Version = parseInt(oParam.Version) - 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId("versiontypeExistingTech").setSelectedKey(selectedKey);
						num = -1;
					}
					else {
						var selectedKey = "Version " + oParam.Version;
						this.byId("versiontypeExistingTech").setSelectedKey(selectedKey);
						num = -1;
					}
					//EOC Writwick 12 July 2018
				}
			}
			
			

			oParam.Fieldname = "STATUS_TS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);
			var statusLastVersion = oDataReport.STATUS;
			
				if (statusLastVersion === 'ON HOLD' && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {

					this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("repTSSave").setEnabled(false);
					oCurrentView.byId("repTSSubmit").setEnabled(false);
					oCurrentView.byId("onPrintRepTS").setVisible(true);

					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					this.byId('versiontypeExisting').removeItem(vItem);

				} else {
					//		this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("repTSSave").setEnabled(false);
					oCurrentView.byId("repTSSubmit").setEnabled(false);
					oCurrentView.byId("onPrintRepTS").setVisible(true);
					this.CROpen = sessionStorage.getItem("crData");

					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

				}

			}

			if (statusLastVersion === "TS APPROVED" && versionNo === undefined) {
				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					this.getView().byId("oBTHold").setVisible(true);
					oDataReport.StoryNumberFComment = "";
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId("versiontypeExistingTech").setSelectedKey(selectedKey);
					var vItem = parseInt(oParam.Version);
					this.byId("versiontypeExistingTech").removeItem(vItem);
				} else {
					oDataReport.StoryNumberFComment = crNumber;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId("versiontypeExistingTech").setSelectedKey(selectedKey);
				}
			}
			statusLastVersion = undefined;
			oDataReport.STATUS = undefined;

			oParam.Fieldname = "STATUS_TS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);

			oParam.Fieldname = "Approver";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Approver", this.oDataReportSuccess);

			oParam.Fieldname = "Reviewer";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Reviewer", this.oDataReportSuccess);

			oParam.Fieldname = "Author";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Author", this.oDataReportSuccess);

			oParam.Fieldname = "Program Name(s)";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ProgramName", this.oDataReportSuccess);

			oParam.Fieldname = "Include Program(s)";
			callServices.fnGetDataMainTable(oParam, oDataReport, "IncludeProgram", this.oDataReportSuccess);

			oParam.Fieldname = "Fiori app(s)";
			callServices.fnGetDataMainTable(oParam, oDataReport, "FioriApp", this.oDataReportSuccess);

			oParam.Fieldname = "Authorization Object Used_TS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "AuthorizationObjectTS", this.oDataReportSuccess);

			oParam.Fieldname = "Process Area_TS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ProcessArea", this.oDataReportSuccess);
			if (oDataReport.ProcessArea) {
				var sProcessAreaOpt = oDataReport.ProcessArea.split("~");
				for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
					that.getView().byId("processareaTS").addSelectedKeys(sProcessAreaOpt[iProcAr]);
				}
			}

			oParam.Fieldname = "Error Handling_TS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ErrorHandlingTS", this.oDataReportSuccess);

			oParam.Fieldname = "Security Section";
			callServices.fnGetDataMainTable(oParam, oDataReport, "SecuritySection", this.oDataReportSuccess);

			oParam.Fieldname = "Report Layout";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ReportLayout", this.oDataReportSuccess);
			var aReportLayoutBtn = this.byId("reportLayoutRBId").getButtons();
			for (var iCount = 0; iCount < aReportLayoutBtn.length; iCount++) {
				if (aReportLayoutBtn[iCount].getText() === oDataReport.InteractiveReport) {
					this.byId("reportLayoutRBId").setSelectedIndex(iCount);
					break;
				}
			}

			oParam.Fieldname = "Interactive Report";
			callServices.fnGetDataMainTable(oParam, oDataReport, "InteractiveReport", this.oDataReportSuccess);
			var aInteractiveReportBtn = this.byId("interactiveReportRBId").getButtons();
			for (var iCount = 0; iCount < aInteractiveReportBtn.length; iCount++) {
				if (aInteractiveReportBtn[iCount].getText() === oDataReport.InteractiveReport) {
					this.byId("interactiveReportRBId").setSelectedIndex(iCount);
					break;
				}
			}

			oParam.Fieldname = "Run Mode";
			callServices.fnGetDataMainTable(oParam, oDataReport, "RunMode", this.oDataReportSuccess);
			var aRunModeBtn = this.byId("runModeRBId").getButtons();
			for (var iCount = 0; iCount < aRunModeBtn.length; iCount++) {
				if (aRunModeBtn[iCount].getText() === oDataReport.RunMode) {
					this.byId("runModeRBId").setSelectedIndex(iCount);
					break;
				}
			}

			oParam.Fieldname = "Type of Report";
			callServices.fnGetDataMainTable(oParam, oDataReport, "TypeofReport", this.oDataReportSuccess);
			
			oParam.Fieldname = "Object Information Text";
           callServices.fnGetDataMainTable(oParam, oDataReport, "ObjectInformationHANA", this.oDataReportSuccess);
            if (!oDataReport.ObjectInformationHANA ) {
					oDataReport.ObjectInformationHANA =
						"<b>General Attributes</b><br><br><br><br><br><br><br><br><br><br><b>Custom Object Attributes</b><br><br><br><br><br>";
				}
			oParam.Fieldname = "HANA Modelling Attributes";
			callServices.fnGetDataMainTable(oParam, oDataReport, "HANAModellingAttributes", this.oDataReportSuccess);
          
			oParam.Fieldname = "ABAP or HANA Custom Object Attributes";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ABAPHANACustomObjectAttributes", this.oDataReportSuccess);
          
            oParam.Fieldname = "Technical Details";
			callServices.fnGetDataMainTable(oParam, oDataReport, "TechnicalDetails", this.oDataReportSuccess);
            if (!oDataReport.TechnicalDetails ) {
					oDataReport.TechnicalDetails =
						"<b>Technical Logic Flow</b><br><br><br><br><br><br><br><br><br><br><b>Program Structure and Processing</b><br><br><br><br><br>";
				}
				



			var iCountUA, sUserAcptCols;

			for (iCountUA = 0;; iCountUA++) {

				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				callServices.fnGetDataMainTableUC(oParam, oDataReport, "userAcceptTemp", this.oDataReportSuccess);
				if (this.oDataReportSuccess.userAcceptTemp) {
					if (oDataReport.userAcceptTemp) {
						sUserAcptCols = oDataReport.userAcceptTemp.split("~");
						if (sUserAcptCols && sUserAcptCols.length >= 7) {
							oDataReport.userAcceptance.push({
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

			if (oDataReport.userAcceptance.length === 0) {
				oDataReport.userAcceptance.push({
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

			var oModelReport = this.getView().getModel("reportData");
			oModelReport.setData(oDataReport);
			this.checkStatus();
			this.byId("page").setTitle(oParam.Repid + " - " + this.mArguments.objectTitle);
		},

		checkStatus: function() {
			//debugger;
			var oCurrentView = this.getView();
			var oDataReport = this.getView().getModel("reportData").getData();
				var crNumber = sessionStorage.getItem("crNumber");
			if (oDataReport.STATUS === "TS SAVED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepTS").setEnabled(true);
				oCurrentView.byId("onPrintRepTS").setVisible(true);
				oCurrentView.byId("repTSSubmit").setVisible(true);
				oCurrentView.byId("repTSSubmit").setText("Submit");
				oCurrentView.byId("repTSSave").setEnabled(true);
			}
			
				else if (oDataReport.STATUS === 'ON HOLD' && crNumber === "") {
					oCurrentView.byId("repTSSave").setEnabled(false);
				
					oCurrentView.byId("repTSSubmit").setEnabled(false);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
						//oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				//	oCurrentView.byId("oBTPrint").setVisible(true);

				}
			else if (oDataReport.STATUS === "TS SUBMITTED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepTS").setEnabled(true);
				oCurrentView.byId("onPrintRepTS").setVisible(true);
				oCurrentView.byId("repTSSubmit").setVisible(true);
				oCurrentView.byId("repTSSubmit").setText("Approve");
				oCurrentView.byId("repTSSave").setEnabled(false);
			} else if (oDataReport.STATUS === "TS APPROVED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepTS").setEnabled(true);
				oCurrentView.byId("onPrintRepTS").setVisible(true);
				oCurrentView.byId("repTSSubmit").setVisible(true);
				oCurrentView.byId("repTSSubmit").setText("Accept");
				oCurrentView.byId("repTSSave").setEnabled(false);
			} else if (oDataReport.STATUS === "TS ACCEPTED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepTS").setEnabled(true);
				oCurrentView.byId("onPrintRepTS").setVisible(true);
				oCurrentView.byId("repTSSubmit").setVisible(false);
				oCurrentView.byId("repTSSave").setEnabled(false);
			} else {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepTS").setEnabled(true);
				oCurrentView.byId("onPrintRepTS").setVisible(true);
				oCurrentView.byId("repTSSubmit").setText("Submit");
				oCurrentView.byId("repTSSubmit").setVisible(false);
				oCurrentView.byId("repTSSave").setEnabled(true);
			}
		},

		onSubmit: function() {
			if (this.getView().byId("repTSSubmit").getText() === "Submit") {
				var that = this;
				sap.m.MessageBox.show(
					"Do you want to Submit the data", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === "YES") {
								that.onConfirmSubmit();
								var user = that.getView().getModel("reportData").getData().Reviewer;
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
								var oDataForMail = that.getView().getModel("reportData").getData();
								var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
									that.mArguments.objectTitle);

							}
						}
					}
				);
			} else if (this.getView().byId("repTSSubmit").getText() === "Approve") {
				var that = this;
				sap.m.MessageBox.show(
					"Do you want to Approve the data", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === "YES") {
								that.onConfirmApprove();
								var user = that.getView().getModel("reportData").getData().Approver;
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
								var oDataForMail = that.getView().getModel("reportData").getData();
								var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
									that.mArguments.objectTitle);
							}
						}
					}
				);
			} else if (this.getView().byId("repTSSubmit").getText() === "Accept") {
				var that = this;
				sap.m.MessageBox.show(
					"Do you want to Accept the data", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === "YES") {
								that.onConfirmAccept();
								var user = that.getView().getModel("reportData").getData().Approver;
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
								var oDataForMail = that.getView().getModel("reportData").getData();
								var currentversion = that.byId("versiontypeExistingTech").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
									that.mArguments.objectTitle);
							}
						}
					}
				);
			}
		},

		onConfirmSubmit: function(oEvent) {
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
			oCurrentView.byId("processflow2").updateModel();
			oCurrentView.byId("onPrintRepTS").setEnabled(true);
			oCurrentView.byId("repTSSubmit").setText("Approve");
			oCurrentView.byId("repTSSave").setEnabled(false);
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
			oParam.Fieldname = "STATUS_TS";
			uParam.Fieldname = "STATUS_TS";
			oParam.Fieldvalue = "TS SUBMITTED";
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},

		onConfirmApprove: function() {
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
		//	oCurrentView.byId("repTSSubmit").setText("Accept");
			oCurrentView.byId("repTSSave").setEnabled(false);
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
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
			oParam.Fieldvalue = 'TS APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},

		onConfirmAccept: function() {
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			this.byId("repTSSubmit").setEnabled(false);
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
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
			oParam.Fieldvalue = 'TS ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},
		
		onHold: function(){
			
		var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
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
			oParam.Fieldvalue = 'TS ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);	
				this.getView().byId("oBTHold").setVisible(false);
		},
		
			callAttachment: function(oEvent) {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				Stepno: oParam.stepno
			};

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachRepReq').getId()) {
				if (this.getView().byId("fileUploadRepReq").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadRepReq"), "reportUploadData",
						oServiceParam, this.getView().getModel("reportData"), "attachRepReq", "attachRepReqVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachCommon').getId()) {
				if (this.getView().byId("fileUploadCommon").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadCommon"), "reportUploadAttach",
						oServiceParam, this.getView().getModel("reportData"), "attachRepCommon", "attachRepCommonVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}
			}

		},
		
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
				oView.getModel("reportData").getData().attachRepReq = [];
				$.each(oVal, function(index, item) {
					oView.getModel("reportData").getData().attachRepReq.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("reportData").getData().attachRepReqVisible = true;
				});
				oView.getModel("reportData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},
		
		readAttachmentsAll: function(mParameter, oView) {
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
				oView.getModel("reportData").getData().attachRepCommon = [];
				$.each(oVal, function(index, item) {
					oView.getModel("reportData").getData().attachRepCommon.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("reportData").getData().attachRepCommonVisible = true;
				});
				oView.getModel("reportData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},
		deleteFileAttachCommonCheck: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the attachment?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.deleteFileAttachCommon(sEvent);
						}

					}
				}
			);
		},
		deleteFileAttachCommon: function(oEvent) {
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("attachments");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "reportUploadAttach",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("reportData"), "attachRepCommon", "attachRepCommonVisible");

			}
			oTable.setBusy(false);

		},
		callAttachmentError: function() {

			/*	var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: "S2"
			};

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachConTSReq').getId()) {

				if (this.getView().byId("fileUploadConTSReq1").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadConTSReq1"), "conversionUploadData",
						oServiceParam, this.getView().getModel("intDataConTS"), "attachIntConTS", "attachIntConTSVisible");
	
				}*/

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};
			//	oServiceParam.FIELDNAME = "reportUploadDataErr";

			if (this.getView().byId("fileUploadRepReqError").getValue()) {
				/*	callServices.callAttachmentService(this.getView().byId("fileUploadRepReqError"), "reportUploadDataErr", this.readAttachmentsErr,
						oServiceParam, this.getView());*/

				callServices.callAttachmentService(this.getView().byId("fileUploadRepReqError"), "reportUploadDataErr",
					oServiceParam, this.getView().getModel("reportData"), "attachRepReqError", "attachRepReqVisibleError");

			} else {
				sap.m.MessageBox.error("Please select a file to upload.", {
					title: "Error"
				});
			}

		},
		

		readAttachmentsErr: function(mParameter, oView) {
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
				oView.getModel("reportData").getData().attachRepReqError = [];
				$.each(oVal, function(index, item) {
					oView.getModel("reportData").getData().attachRepReqError.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("reportData").getData().attachRepReqVisibleError = true;
				});
				oView.getModel("reportData").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		addNewRowUA: function() {
			var Stepno = this.getView().getModel("reportData").getData().userAcceptance.length + 1;
			this.getView().getModel("reportData").getData().userAcceptance.push({
				step: Stepno,
				testtype: "",
				scenario: "",
				testData: "",
				stepsperformed: "",
				actualresults: "",
				expectedResults: "",
				newRow: true
			});
			this.getView().getModel("reportData").refresh();
		},

		deleteRowUA: function(oEvent) {
			// if (this.getView().getModel("reportData").getData().userAcceptance.length > 1) {
			// 	var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
			// 	var index = sPath.split("/userAcceptance/")[1];
			// 	this.getView().getModel("reportData").getData().userAcceptance.splice(index, 1);
			// 	this.getView().getModel("reportData").refresh();
			// }

			var that = this;
			var sEvent = oEvent.getSource();
			var length = sEvent.getId().split("-").length;
			var index = sEvent.getId().split("-")[length - 1];
			var data = this.getView().getModel("reportData").getData().userAcceptance[index];
			if (data.newRow) {
				if (index !== 0) {
					that.getView().getModel("reportData").getData().userAcceptance.splice(index, 1);
					that.getView().getModel("reportData").refresh();
				}
			} else {
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
			}
		},

		onConfirmDelete: function(sEvent) {
			var that = this;
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
			if (this.getView().getModel("reportData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				var index1 = this.getView().getModel("reportData").getData().userAcceptance.length;
				var oUAEntry = this.getView().getModel("reportData").getData().userAcceptance[index1 - 1];
				var sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_" + index1;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("reportData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("reportData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_1";
				this.deleteUserCall(oParam, uParam, index);
			}
		},

		deleteUserCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey + "',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("reportData").getData().userAcceptance.length === 1) {
							that.getView().getModel("reportData").getData().userAcceptance.splice(0, 1);

							that.getView().getModel("reportData").getData().userAcceptance.push({
								step: "",
								testType: "",
								scenario: "",
								testData: "",
								stepsPer: "",
								actualResults: "",
								expectedResults: "",
								flag: false
							});
							that.getView().getModel("reportData").refresh();
						} else {
							that.getView().getModel("reportData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("reportData").refresh();
							that.updateUserAcc(oParam, uParam);
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

		updateUserAcc: function(oParam, uParam) {
			var oDataReport = this.getView().getModel("reportData").getData();
			var iCountUA, oUAEntry, sUAEntry;
			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {
				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}
		},

		onSave: function() {
			var that = this;
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to save the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							sap.ui.getCore().oMessagePopover.removeAllItems();
							that.onConfirmSave();
						}
					}
				}
			);
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

		onConfirmSave: function() {
			var oCurrentView = this.getView();
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
			// oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
			oCurrentView.byId("processflow2").updateModel();
			
			var oDataReport = this.getView().getModel("reportData").getData();
			this.byId("repTSPopOver").setVisible(true);
			this.getView().byId("repTSSubmit").setVisible(true);

			var oDataProcessAreaArr = [];
			var oDataProcessArea = this.getView().byId("processareaTS").getSelectedItems();
			for (var z = 0; z < oDataProcessArea.length; z++) {
				oDataProcessAreaArr.push(oDataProcessArea[z].getKey());
			}
			var oDataProcessAreaMulti = oDataProcessAreaArr.join("~");

			var oInteractiveRadioBtn;
			if (this.getView().byId("Yes").getSelected()) {
				oInteractiveRadioBtn = this.getView().byId("Yes").getText();
			} else if (this.getView().byId("No").getSelected()) {
				oInteractiveRadioBtn = this.getView().byId("No").getText();
			}

			var oRunModeRadioBtn;
			if (this.getView().byId("Foreground").getSelected()) {
				oRunModeRadioBtn = this.getView().byId("Foreground").getText();
			} else if (this.getView().byId("Background").getSelected()) {
				oRunModeRadioBtn = this.getView().byId("Background").getText();
			} else if (this.getView().byId("Both").getSelected()) {
				oRunModeRadioBtn = this.getView().byId("Both").getText();
			}

			var oReportLayoutRadioBtn;
			if (this.getView().byId("YesRL").getSelected()) {
				oReportLayoutRadioBtn = this.getView().byId("YesRL").getText();
			} else if (this.getView().byId("NoRL").getSelected()) {
				oReportLayoutRadioBtn = this.getView().byId("NoRL").getText();
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
			oParam.Fieldname = "Program Name(s)";
			uParam.Fieldname = "Program Name(s)";
			oParam.Fieldvalue = oDataReport.ProgramName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ProgramName);

			oParam.Fieldname = "Include Program(s)";
			uParam.Fieldname = "Include Program(s)";
			oParam.Fieldvalue = oDataReport.IncludeProgram;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.IncludeProgram);

			oParam.Fieldname = "Fiori app(s)";
			uParam.Fieldname = "Fiori app(s)";
			oParam.Fieldvalue = oDataReport.FioriApp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.FioriApp);

			oParam.Fieldname = "Authorization Object Used_TS";
			uParam.Fieldname = "Authorization Object Used_TS";
			oParam.Fieldvalue = oDataReport.AuthorizationObjectTS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.AuthorizationObjectTS);

			oParam.Fieldname = "Process Area_TS";
			uParam.Fieldname = "Process Area_TS";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ProcessArea);

			oParam.Fieldname = "Report Layout";
			uParam.Fieldname = "Report Layout";
			oParam.Fieldvalue = oReportLayoutRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ReportLayout);

			oParam.Fieldname = "Interactive Report";
			uParam.Fieldname = "Interactive Report";
			oParam.Fieldvalue = oInteractiveRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.InteractiveReport);

			oParam.Fieldname = "Run Mode";
			uParam.Fieldname = "Run Mode";
			oParam.Fieldvalue = oRunModeRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.RunMode);

			oParam.Fieldname = "Type of Report";
			uParam.Fieldname = "Type of Report";
			oParam.Fieldvalue = oDataReport.TypeofReport;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.TypeofReport);
			
			oParam.Fieldname = "Object Information Text";
			uParam.Fieldname = "Object Information Text";
			oParam.Fieldvalue = oDataReport.ObjectInformationHANA;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ObjectInformationHANA);
            
			oParam.Fieldname = "HANA Modelling Attributes";
			uParam.Fieldname = "HANA Modelling Attributes";
			oParam.Fieldvalue = oDataReport.HANAModellingAttributes;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.HANAModellingAttributes);

			oParam.Fieldname = "ABAP or HANA Custom Object Attributes";
			uParam.Fieldname = "ABAP or HANA Custom Object Attributes";
			oParam.Fieldvalue = oDataReport.ABAPHANACustomObjectAttributes;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ABAPHANACustomObjectAttributes);
           
            oParam.Fieldname = "Technical Details";
			uParam.Fieldname = "Technical Details";
			oParam.Fieldvalue = oDataReport.TechnicalDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.TechnicalDetails);
           
			oParam.Fieldname = "Security Section";
			uParam.Fieldname = "Security Section";
			oParam.Fieldvalue = oDataReport.SecuritySection;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.SecuritySection);

			oParam.Fieldname = "Error Handling_TS";
			uParam.Fieldname = "Error Handling_TS";
			oParam.Fieldvalue = oDataReport.ErrorHandlingTS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ErrorHandlingTS);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataReport.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Author);

			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataReport.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Reviewer);

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataReport.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Approver);

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {

				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}

			oParam.Fieldname = "STATUS_TS";
			uParam.Fieldname = "STATUS_TS";
			oParam.Fieldvalue = "TS SAVED";
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
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

				if (oParam.Projectkey === "REP") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Report_TS.html?sap-language=EN" + mParameter,
						true);
				}
			}
			// sap.m.URLHelper.redirect(
			// 	"http://ussltccsl1209.solutions.glbsnet.com:8002/sap/bc/ui5_ui5/sap/ZAUTO_HTML/Report_TS.html?sap-client=100&sap-language=EN",
			// 	true
			// );
		},

		onChange: function() {
			var that = this;
			this.getOwnerComponent().getRouter().navTo("reportFS", {
				objectlist: that.mArguments.objectlist
			});
		},
		
	//	onLiveChangeObjectDetails: function() {
	//		var str = this.byId("objectdetails").getValue();
	//		this.byId("fsObjDetCharObjCountHANA").setText("Characters: " + str.length);
			// if (str.length >= 500) {
			// 	this.byId("fsObjDetErrHANA").setVisible(true);
			// } else {
			// 	this.byId("fsObjDetErrHANA").setVisible(false);
			// }
	//	},

		onLiveChangeReportDetailsHANA: function() {
			var str = this.byId("reportdetailsHANA").getValue();
			this.byId("fsObjDetCharCountHANA").setText("Characters: " + str.length);
			// if (str.length >= 500) {
			// 	this.byId("fsObjDetErrHANA").setVisible(true);
			// } else {
			// 	this.byId("fsObjDetErrHANA").setVisible(false);
			// }
		},

		onLiveChangeErrorDetailsABAP: function() {
			var str = this.byId("errorRepdetailsABAP").getValue();
			this.byId("fsObjDetErrorCharCountABAP").setText("Characters: " + str.length);
			// if (str.length >= 500) {
			// 	this.byId("fsObjDetErrorErrABAP").setVisible(true);
			// } else {
			// 	this.byId("fsObjDetErrorErrABAP").setVisible(false);
			// }
		},

		onNavBack: function() {
			var that = this;
			this.getOwnerComponent().getRouter().navTo("reportFS", {
				objectlist: that.mArguments.objectlist
			});
		}
	});

});