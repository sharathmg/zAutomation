sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox"
], function(Controller, callServices, MessageBox) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.ReportFS", {

		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("reportFS").attachPatternMatched(this.onObjectMatched, this);
			var oDataProcessFlowLanesOnly = {
				lanes: [{
					id: "0",
					icon: "sap-icon://activity-assigned-to-goal",
					label: "FS Submitted",
					position: 0,
					state: [{
						state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
						value: 25
					}]
				}, {
					id: "1",
					icon: "sap-icon://inspection",
					label: "FS Approved",
					position: 1,
					state: [{
						state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
						value: 50
					}]
				}, {
					id: "2",
					icon: "sap-icon://complete",
					label: "FS Accepted",

					position: 2,
					state: [{
						state: sap.suite.ui.commons.ProcessFlowNodeState.Neutral,
						value: 50
					}]
				}]
			};
			var that = this;
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],
				function(RTE) {
					// var oRichTextEditor = new RTE("myRTEN", {
					// 	editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
					// 	width: "100%",
					// 	height: "600px",
					// 	customToolbar: true,
					// 	showGroupFont: true,
					// 	showGroupClipboard: true,
					// 	showGroupStructure: true,
					// 	showGroupInsert: true,
					// 	showGroupLink: true,
					// 	showGroupUndo: true,
					// 	value: "{intData>/Mapping}"
					// });

					// var oRichTextEditor1 = new RTE("myRTE1", {
					// 	editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
					// 	width: "100%",
					// 	height: "600px",
					// 	customToolbar: true,
					// 	showGroupFont: true,
					// 	showGroupClipboard: true,
					// 	showGroupStructure: true,
					// 	showGroupInsert: true,
					// 	showGroupLink: true,
					// 	showGroupUndo: true,
					// 	value: "{intData>/es1}"
					// });

					// var oRichTextEditor2 = new RTE("myRTE2", {
					// 	editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
					// 	width: "100%",
					// 	height: "600px",
					// 	customToolbar: true,
					// 	showGroupFont: true,
					// 	showGroupClipboard: true,
					// 	showGroupStructure: true,
					// 	showGroupInsert: true,
					// 	showGroupLink: true,
					// 	showGroupUndo: true,
					// 	value: "{intData>/ObjectDetails}"
					// });
					var oRichTextEditor4 = new RTE("myRTE4", {
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
						value: "{reportData>/ReportGeneralDetails}"
					}); 
					
                    that.getView().byId("idVerticalLayoutRCD").addContent(oRichTextEditor4);
                    sap.ui.getCore().applyChanges();
					var oRichTextEditor3 = new RTE("myRTE3", {
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
						value: "{reportData>/AuditingandControlRequirements}"
					});

					//that.getView().byId("idVerticalLayout3").addContent(oRichTextEditor);
					//that.getView().byId("idVerticalLayout1").addContent(oRichTextEditor1);
					//that.getView().byId("idVerticalLayout2").addContent(oRichTextEditor2);
					that.getView().byId("idVerticalLayoutACR").addContent(oRichTextEditor3);
					sap.ui.getCore().applyChanges();
					// oRichTextEditor.addButtonGroup("styleselect").addButtonGroup("table");
				});
			var oModelPf2 = new sap.ui.model.json.JSONModel();
			var viewPf2 = this.getView();
			oModelPf2.setData(oDataProcessFlowLanesOnly);
			viewPf2.setModel(oModelPf2, "pf2");
			viewPf2.byId("processflow2").updateModel();

		},

		oDataReportSuccess: {

		},
		
      
		oProjectId: "",
       
		onObjectMatched: function(oEvent) {
			//SOC Writwick 10 July 2018
			// sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.stepno = "S1";
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S1";
			//EOC Writwick 10 July 2018
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			var that = this;
			var oDataReport = this.oDataReport;
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			this.deletedUserAccRecords = [];
			this.mArguments = oEvent.getParameters().arguments;
			var title = "Report FS " + this.mArguments.objectlist + " Material Master Update";

			this.byId("doctype").setSelectedKey("Functional");

			this.byId("repFSPopOver").setVisible(false);

			var obj = this.mArguments.object;

			this.oDataReport = {
				ObjectTitle: "",
				ObjectID: "",
				ProcessArea: "",
				StoryNumberFComment: "",
				Complexity: "",
				Frequency: "",
				Dependencies: "",
				ReportType: "",
				ProcessingMode: "",
				ReportGeneralDetails: "",
				ReportDetailsRating: 0,
				ReportDetailsComment: "",
				ErrorCheckboxes: "",
				ErrorHandling: "",
				ErrorHandlingRating: 0,
				ErrorHandlingComments: "",
				HTTPSFSFTP: "",
				Security: "",
				SecuritySection: "",
				SecurityRating: 0,
				SecurityComment: "",
				UserAuthorisation: "",
				Author: "",
				Reviewer: "",
				Approver: "",
				Encryption: "",
				userAccept1: "",
				userAccept2: "",
				userAcceptance: [],
				CommLog1: "",
				CommLog: [],
				STATUS: "",
				attachRepReq: [],
				attachRepReqVisible: false,
				attachRepCommon: [],
				attachRepCommonVisible: false,
				attachRepReqError: [],
				attachRepReqVisibleError: false,
				AuditingandControlRequirements: ""
			};

			this.oDataReportSuccess = {
				STATUS: false,
				ObjectTitle: false,
				ObjectID: false,
				ProcessArea: false,
				StoryNumberFComment: false,
				Complexity: false,
				Frequency: false,
				Dependencies: false,
				ReportType: false,
				ProcessingMode: false,
				ReportGeneralDetails: false,
				ReportDetailsRating: false,
				ReportDetailsComment: false,
				ErrorCheckboxes: false,
				ErrorHandling: false,
				ErrorHandlingRating: false,
				ErrorHandlingComments: false,
				HTTPSFSFTP: false,
				UserAuthorisation: false,
				Author: false,
				Reviewer: false,
				Approver: false,
				Encryption: false,
				Security: false,
				SecuritySection: false,
				SecurityRating: false,
				SecurityComment: false,
				userAccept1: false,
				userAccept2: false,
				CommLog1: false,
				AuditingandControlRequirements: false
			};

			var oModelReport = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelReport, "reportData");

			this.byId("processareaFS").setSelectedKeys("");
			this.byId("repComplexity").setSelectedKeys("");
			this.byId("multiComboFreq").setSelectedKeys("");
			this.byId("multireportType").setSelectedKeys("");
			this.byId("repRadioGrp").setSelectedButton("");

			if (obj === "new") {
				this.byId("commLog").setVisible(false);
				this.byId("versiontypeNew").setVisible(true);
				this.byId("versiontypeExisting").setVisible(false);
				this.byId("reviewComment3").setVisible(false);
				this.byId("reviewComment0").setVisible(false);
				this.byId("reviewComment4").setVisible(false);
				this.byId("onPrintRepFS").setEnabled(false);

				oModelReport.setData(this.oDataReport);
				this.dataRead();

			} else {
				this.byId("commLog").setVisible(true);
				this.byId("versiontypeNew").setVisible(false);
				this.byId("reviewComment3").setVisible(false);
				this.byId("reviewComment0").setVisible(false);
				this.byId("reviewComment4").setVisible(false);
				this.byId("onPrintRepFS").setEnabled(true);
				this.byId("versiontypeExisting").setVisible(true);
				this.byId("versiontypeExisting").destroyItems();

				var oSelect = this.getView().byId("versiontypeExisting");
				var newItem = new sap.ui.core.Item({
					key: "Version 1.0",
					text: "Version 1.0"
				});

				oSelect.addItem(newItem);
				this.dataRead();
			}
			this.byId("idIconTabBarNoIcons").setSelectedKey("reportReqTab");
			if (this.byId("idIconTabBarNoIcons").getSelectedKey() === "reportReqTab") {
				this.byId("reportGenPanel").setExpanded(false);
				this.byId("reportErrorHandlePanel").setExpanded(false);
			}
		},

		deleteFileFrmRepError: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachReportReqError");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: oParam.stepno,
				// 	FIELDNAME: "reportUploadDataErr",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "reportUploadDataErr",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("reportData"), "attachRepReqError",
					"attachRepReqVisibleError");
			}
			oTable.setBusy(false);
		},
		deleteFileFrmRepErrVali: function(oEvent) {
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
							that.deleteFileFrmRepError(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},

		deleteFileFrmRepVali: function(oEvent) {
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
							that.deleteFileFrmRep(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},
		deleteFileFrmRep: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachReportReq");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: oParam.stepno,
				// 	FIELDNAME: "reportUploadData",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "reportUploadData",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("reportData"), "attachRepReq", "attachRepReqVisible");
			}
			oTable.setBusy(false);
		},

		onChangeVersionExisting: function(oevent) {
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
			var that = this;
			var oDataReport = this.oDataReport;
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
			// oParam.version_id = "1.0";
			oParam.Version = "1.0";
			//EOC Writwick 10 July 2018

			if (versionNo) {
				//SOC Writwick 10 July 2018
				// oParam.version_id = versionNo;
				oParam.Version = versionNo;
				//EOC Writwick 10 July 2018
				var crNumber1 = sessionStorage.getItem("crNumber");
				if (crNumber1 !== "") {
					oDataReport.StoryNumberFComment = crNumber1;
				}
			} else {
				var num = 1;
				while (num > 0) {
					//SOC Writwick 10 July 2018
					// oParam.fieldname = "STATUS";
					oParam.Fieldname = "STATUS";
					//EOC Writwick 10 July 2018
					callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);
					oDataReport.versionLatest = oDataReport.STATUS;
					//SOC Writwick 12 July 2018
					// if (oDataReport.versionLatest !== undefined) {
					if (oDataReport.versionLatest !== "") {
					//EOC Writwick 12 July 2018
						num = num + 1;
						//SOC Writwick 10 July 2018
						// oParam.version_id = parseInt(oParam.version_id) + 1;
						// oParam.version_id = (oParam.version_id).toString() + ".0";
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						//EOC Writwick 10 July 2018

						if (oDataReport.versionLatest === "FS ACCEPTED") {
							//SOC Writwick 10 July 2018
							// var selectedKey = "Version " + oParam.version_id;
							var selectedKey = "Version " + oParam.Version;
							//EOC Writwick 10 July 2018
							var oSelect = this.getView().byId("versiontypeExisting");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);
						}
						//SOC Writwick 12 July 2018
						// oDataReport.versionLatest = undefined;
						// oDataReport.STATUS = undefined;
						oDataReport.versionLatest = "";
						oDataReport.STATUS = "";
					} else if (num > 1){
						//SOC Writwick 10 July 2018
						// oParam.version_id = parseInt(oParam.version_id) - 1;
						// oParam.version_id = (oParam.version_id).toString() + ".0";
						// var selectedKey = "Version " + oParam.version_id;
						oParam.Version = parseInt(oParam.Version) - 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						//EOC Writwick 10 July 2018
						this.byId("versiontypeExisting").setSelectedKey(selectedKey);
						num = -1;
					}
					else {
						var selectedKey = "Version " + oParam.Version;
						this.byId("versiontypeExisting").setSelectedKey(selectedKey);
						num = -1;
					}
					//EOC Writwick 12 July 2018
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "STATUS";
			oParam.Fieldname = "STATUS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);
			var statusLastVersion = oDataReport.STATUS;
			
				if (statusLastVersion === 'ON HOLD' && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {

					this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("repSave").setEnabled(false);
					oCurrentView.byId("repFSSubmit").setEnabled(false);
					oCurrentView.byId("onPrintRepFS").setVisible(true);
					
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id);
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);
					
					//SOC Writwick 10 July 2018
					// var vItem = parseInt(oParam.version_id);
					var vItem = parseInt(oParam.Version);
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExisting').removeItem(vItem);

				} else {
					//		this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("repSave").setEnabled(false);
					oCurrentView.byId("repFSSubmit").setEnabled(false);
					oCurrentView.byId("onPrintRepFS").setVisible(true);
					this.CROpen = sessionStorage.getItem("crData");
					
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id) + 1;
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

				}

			}

			if (statusLastVersion === "FS ACCEPTED" && versionNo === undefined) {
				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					this.getView().byId("oBTHold").setVisible(true);
					oDataReport.StoryNumberFComment = "";
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id);
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					// this.byId("versiontypeExisting").setSelectedKey(selectedKey);
					// var vItem = parseInt(oParam.version_id);
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId("versiontypeExisting").setSelectedKey(selectedKey);
					var vItem = parseInt(oParam.Version);
					//EOC Writwick 10 July 2018
					this.byId("versiontypeExisting").removeItem(vItem);
				} else {
					oDataReport.StoryNumberFComment = crNumber;
					//SOC Writwick 10 July 2018
					// oParam.version_id = parseInt(oParam.version_id) + 1;
					// oParam.version_id = (oParam.version_id).toString() + ".0";
					// var selectedKey = "Version " + oParam.version_id;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId("versiontypeExisting").setSelectedKey(selectedKey);
				}
			}
			statusLastVersion = undefined;
			oDataReport.STATUS = undefined;
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "STATUS";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);

			// oParam.fieldname = "Approver";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "Approver", this.oDataReportSuccess);

			// oParam.fieldname = "Reviewer";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "Reviewer", this.oDataReportSuccess);

			// oParam.fieldname = "Author";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "Author", this.oDataReportSuccess);

			// oDataReport.ObjectID = oParam.repid;

			// oParam.fieldname = "Object Title";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "ObjectTitle", this.oDataReportSuccess);

			// oParam.fieldname = "Story Number%2FComment";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "StoryNumberFComment", this.oDataReportSuccess);

			// oParam.fieldname = "Complexity";
			// callServices.fnGetDataMainTable(oParam, oDataReport, "Complexity", this.oDataReportSuccess);
			oParam.Fieldname = "STATUS";
			callServices.fnGetDataMainTable(oParam, oDataReport, "STATUS", this.oDataReportSuccess);

			oParam.Fieldname = "Approver";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Approver", this.oDataReportSuccess);

			oParam.Fieldname = "Reviewer";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Reviewer", this.oDataReportSuccess);

			oParam.Fieldname = "Author";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Author", this.oDataReportSuccess);

			oDataReport.ObjectID = oParam.Repid;

			oParam.Fieldname = "Object Title";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ObjectTitle", this.oDataReportSuccess);

			oParam.Fieldname = "Story Number%2FComment";
			callServices.fnGetDataMainTable(oParam, oDataReport, "StoryNumberFComment", this.oDataReportSuccess);

			oParam.Fieldname = "Complexity";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Complexity", this.oDataReportSuccess);
			//EOC Writwick 10 July 2018
			if (oDataReport.Complexity) {
				var sComplexity = oDataReport.Complexity.split("~");
				for (var iCompAr = 0; iCompAr < sComplexity.length; iCompAr++) {
					that.getView().byId("repComplexity").addSelectedKeys(sComplexity[iCompAr]);
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Frequency";
			oParam.Fieldname = "Frequency";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "Frequency", this.oDataReportSuccess);
			if (oDataReport.Frequency) {
				var sFrequency = oDataReport.Frequency.split("~");
				for (var iFreqAr = 0; iFreqAr < sFrequency.length; iFreqAr++) {
					that.getView().byId("multiComboFreq").addSelectedKeys(sFrequency[iFreqAr]);
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Report Type";
			oParam.Fieldname = "Report Type";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "ReportType", this.oDataReportSuccess);
			if (oDataReport.ReportType) {
				var sReportType = oDataReport.ReportType.split("~");
				for (var iRepAr = 0; iRepAr < sReportType.length; iRepAr++) {
					that.getView().byId("multireportType").addSelectedKeys(sReportType[iRepAr]);
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Process Area";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "ProcessArea", this.oDataReportSuccess);
			if (oDataReport.ProcessArea) {
				var sProcessAreaOpt = oDataReport.ProcessArea.split("~");
				for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
					that.getView().byId("processareaFS").addSelectedKeys(sProcessAreaOpt[iProcAr]);
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Processing Mode";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "ProcessingMode", this.oDataReportSuccess);
			switch (oDataReport.ProcessingMode) {
				case "Batch":
					this.byId("RB1-11").setSelected(true);
					break;
				case "Online/Dialog":
					this.byId("RB1-12").setSelected(true);
					break;
				case "Others":
					this.byId("RB1-13").setSelected(true);
					break;
			}
			
			
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Report General Details";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "ReportGeneralDetails", this.oDataReportSuccess);
            if (!oDataReport.ReportGeneralDetails ) {
					oDataReport.ReportGeneralDetails =
						"<b>Overview</b><br><br><br><br><br><b>Functional Specification Details</b><br><br><br><br><br><br><b>Impacted Subprocess(es)</b><br><br><br><br><br><br><br><b>Operational Considerations</b><br><br><br><br><br><b>Data Source</b><br><br><br><br><br><br><b>Design Considerations</b><br><br><b>Design Details</b><br><br><br><br><br><b>Selection Screen</b><br><br><br><br><br><b>Output of Report</b><br><br><b>Layout – Title, Header, Footer</b><br><br><br><br><br><b>Report Contents</b><br><br><br><br><br><b>Performance Requirements</b><br><br><br><br><br><b>Special Report Functions</b><br><br><br><br><br><b>Frequency and Schedule Information</b><br><br><br><br><br> ";
				}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Error Checkboxes";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "ErrorCheckboxes", this.oDataReportSuccess);
			if (oDataReport.ErrorCheckboxes) {
				var sExcepHand = oDataReport.ErrorCheckboxes.split("~");
				for (var iExcepHand = 0; iExcepHand < sExcepHand.length; iExcepHand++) {
					switch (sExcepHand[iExcepHand]) {
						case "Selection screen validations":
							that.byId("CB-001").setSelected(true);
							break;
					}
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Security";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataReport, "Security", this.oDataReportSuccess);
			if (oDataReport.Security) {
				var sSecurity = oDataReport.Security.split("~");
				for (var iSecurity = 0; iSecurity < sSecurity.length; iSecurity++) {
					switch (sSecurity[iSecurity]) {
						case "HTTPS/SFTP":
							that.byId("CB2-01").setSelected(true);
							break;
						case "User Authorization":
							that.byId("CB2-02").setSelected(true);
							break;
						case "Encryption":
							that.byId("CB2-03").setSelected(true);
							break;
					}
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Security Section";
			callServices.fnGetDataMainTable(oParam, oDataReport, "SecuritySection", this.oDataReportSuccess);

			oParam.Fieldname = "Security Rating";
			callServices.fnGetDataMainTable(oParam, oDataReport, "SecurityRating", this.oDataReportSuccess);
			oDataReport.SecurityRating = parseFloat(oDataReport.SecurityRating);

			oParam.Fieldname = "Security Comment";
			callServices.fnGetDataMainTable(oParam, oDataReport, "SecurityComment", this.oDataReportSuccess);

			oParam.Fieldname = "Report Details Rating";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ReportDetailsRating", this.oDataReportSuccess);
			oDataReport.ReportDetailsRating = parseFloat(oDataReport.ReportDetailsRating);

			oParam.Fieldname = "Report Details Comment";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ReportDetailsComment", this.oDataReportSuccess);

			oParam.Fieldname = "Dependencies";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Dependencies", this.oDataReportSuccess);
			//EOC Writwick 10 July 2018
			if (oDataReport.Dependencies) {
				var sDependencies = oDataReport.Dependencies.split("~");
				for (var iDependencies = 0; iDependencies < sDependencies.length; iDependencies++) {
					switch (sDependencies[iDependencies]) {
						case "Configuration":
							that.byId("Configuration").setSelected(true);
							break;
						case "Development":
							that.byId("Development").setSelected(true);
							break;
						case "Execution":
							that.byId("Execution").setSelected(true);
							break;
					}
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Encryption";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Encryption", this.oDataReportSuccess);

			oParam.Fieldname = "Error Handling";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ErrorHandling", this.oDataReportSuccess);

			oParam.Fieldname = "Error Handling Rating";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ErrorHandlingRating", this.oDataReportSuccess);
			oDataReport.ErrorHandlingRating = parseFloat(oDataReport.ErrorHandlingRating);

			oParam.Fieldname = "Error Handling Comment";
			callServices.fnGetDataMainTable(oParam, oDataReport, "ErrorHandlingComment", this.oDataReportSuccess);

			oParam.Fieldname = "Security";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Security", this.oDataReportSuccess);

			oParam.Fieldname = "Security Comments";
			callServices.fnGetDataMainTable(oParam, oDataReport, "SecurityComments", this.oDataReportSuccess);

			oParam.Fieldname = "HTTPS_SFTP_";
			callServices.fnGetDataMainTable(oParam, oDataReport, "HTTPS_SFTP_", this.oDataReportSuccess);

			oParam.Fieldname = "UserAuth";
			callServices.fnGetDataMainTable(oParam, oDataReport, "UserAuth", this.oDataReportSuccess);

			oParam.Fieldname = "Encryp";
			callServices.fnGetDataMainTable(oParam, oDataReport, "Encryp", this.oDataReportSuccess);

			oParam.Fieldname = "AuditingandControlRequirements";
			callServices.fnGetDataMainTable(oParam, oDataReport, "AuditingandControlRequirements", this.oDataReportSuccess);
			//EOC Writwick 10 July 2018

			var iCountUA, sUserAcptCols;

			for (iCountUA = 0;; iCountUA++) {

				oDataReport.userAcceptTemp = "";
				//SOC Writwick 10 July 2018
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				//EOC Writwick 10 July 2018

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

			var iCountCM, sCommLogCols;

			for (iCountCM = 0;; iCountCM++) {

				oDataReport.commLogTemp = "";
				//SOC Writwick 10 July 2018
				oParam.Fieldname = "FS_CM_" + (iCountCM + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, oDataReport, "commLogTemp", this.oDataReportSuccess);
				if (this.oDataReportSuccess.commLogTemp) {
					if (oDataReport.commLogTemp) {
						sCommLogCols = oDataReport.commLogTemp.split("~");
						if (sCommLogCols && sCommLogCols.length >= 6) {

							$.each(sCommLogCols, function(iIndex, sValue) {

								if (iIndex === 2 || iIndex === 4) {

									var dateTemp = new Date(sValue);
									if ((dateTemp == "Invalid Date") || (sValue === null)) {
										sCommLogCols[iIndex] = "";
									} else {
										//aCommLogCols[iIndex] = new Date(sValue);
										sCommLogCols[iIndex] = dateTemp.toJSON().substring(0, 10);
									}

									// if ((sValue === "") || (sValue === "undefined") || (sValue === "Invalid Date") || (sValue === "null")) {
									// 	sCommLogCols[iIndex] = "";
									// } else {
									// 	//sCommLogCols[iIndex] = new Date(sValue);
									// 	sCommLogCols[iIndex] = sValue;
									// }
								} else {
									if ((sValue === "undefined") || (!sValue)) {
										sCommLogCols[iIndex] = "";
									}
								}
							});

							oDataReport.CommLog.push({
								IssueDesc: sCommLogCols[0],
								Priority: sCommLogCols[1],
								DateLogg: sCommLogCols[2],
								Status: sCommLogCols[3],
								DateResol: sCommLogCols[4],
								Resolv: sCommLogCols[5],
								AssignedTo: sCommLogCols[6],
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
			if (oDataReport.CommLog.length === 0) {
				oDataReport.CommLog.push({
					IssueDesc: "",
					Priority: "",
					DateLogg: "",
					Status: "",
					DateResol: "",
					Resolv: "",
					AssignedTo: "",
					flag: false
				});
			}
			
			//SOC Writwick 10 July 2018
			this.readAttachments({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "reportUploadData"
			});
			this.readAttachmentsAll({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "reportUploadAttach"
			});

			this.readAttachmentsErr({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "reportUploadDataErr"
			});
			//EOC Writwick 10 July 2018

			var oModelReport = this.getView().getModel("reportData");
			oModelReport.setData(oDataReport);
			this.checkStatus();
			//SOC Writwick 10 July 2018
			this.byId("page").setTitle(oParam.Repid + " - " + oDataReport.ObjectTitle);
			//EOC Writwick 10 July 2018
		},

		onLiveChangeReportDetails: function() {
			var str = this.byId("reportdetails").getValue();
			this.byId("fsObjDetCharCount").setText("Characters: " + str.length);
			// if (str.length >= 500) {
			// 	this.byId("fsObjDetErr").setVisible(true);
			// } else {
			// 	this.byId("fsObjDetErr").setVisible(false);
			// }
		},

		onLiveChangeErrorDetails: function() {
			var str = this.byId("errorRepdetails").getValue();
			this.byId("fsObjDetErrorCharCount").setText("Characters: " + str.length);
			// if (str.length >= 500) {
			// 	this.byId("fsObjDetErrorErr").setVisible(true);
			// } else {
			// 	this.byId("fsObjDetErrorErr").setVisible(false);
			// }
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
							var oCurrentView = that.getView();
							if (oCurrentView) {
								oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
								oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
								oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
							}
							that.onConfirmSave();
						}
					}
				}
			);
		},

		onConfirmSave: function() {
			var oDataReport = this.getView().getModel("reportData").getData();
			this.byId("repFSPopOver").setVisible(true);
			this.byId("repFSSubmit").setVisible(true);
			this.byId("repFSSubmit").setEnabled(true);

			var oDataProcessAreaArr = [];
			var oDataProcessArea = this.getView().byId("processareaFS").getSelectedItems();
			for (var z = 0; z < oDataProcessArea.length; z++) {
				oDataProcessAreaArr.push(oDataProcessArea[z].getKey());
			}
			var oDataProcessAreaMulti = oDataProcessAreaArr.join("~");

			var oDataComplexityArr = [];
			var oDataComplexity = this.getView().byId("repComplexity").getSelectedItems();
			for (z = 0; z < oDataComplexity.length; z++) {
				oDataComplexityArr.push(oDataComplexity[z].getKey());
			}
			var oDataComplexityMulti = oDataComplexityArr.join("~");

			var oDataFrequencyArr = [];
			var oDataFrequency = this.getView().byId("multiComboFreq").getSelectedItems();
			for (z = 0; z < oDataFrequency.length; z++) {
				oDataFrequencyArr.push(oDataFrequency[z].getKey());
			}
			var oDataFrequencyMulti = oDataFrequencyArr.join("~");

			var oDataReportTypeArr = [];
			var oDataReportType = this.getView().byId("multireportType").getSelectedItems();
			for (z = 0; z < oDataReportType.length; z++) {
				oDataReportTypeArr.push(oDataReportType[z].getKey());
			}
			var oDataReportTypeMulti = oDataReportTypeArr.join("~");

			var oDataDependencyCheckBx = [];
			if (this.getView().byId("Configuration").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Configuration").getText());
			}
			if (this.getView().byId("Development").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Development").getText());
			}
			if (this.getView().byId("Execution").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Execution").getText());
			}
			var oDataDependencyCheckBxMulti = oDataDependencyCheckBx.join("~");

			var oDataExceptionCheckBx = [];
			if (this.getView().byId("CB-001").getSelected()) {
				oDataExceptionCheckBx.push(this.getView().byId("CB-001").getText());
			}
			var oDataExceptionCheckBxMulti = oDataExceptionCheckBx.join("~");

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

			var oDataSecurityRating = this.getView().byId("ri9").getValue();
			var oDataReportDetailsRating = this.getView().byId("ri19").getValue();

			var oDataErrorHandlingRating = this.getView().byId("ri119").getValue();

			var oDataProcessingModeRadioBtn;
			if (this.getView().byId("RB1-11").getSelected()) {
				oDataProcessingModeRadioBtn = this.getView().byId("RB1-11").getText();
			} else if (this.getView().byId("RB1-12").getSelected()) {
				oDataProcessingModeRadioBtn = this.getView().byId("RB1-12").getText();
			} else if (this.getView().byId("RB1-13").getSelected()) {
				oDataProcessingModeRadioBtn = this.getView().byId("RB1-13").getText();
			}

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
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
			oParam.Fieldname = "Object Title";
			uParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataReport.ObjectTitle;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ObjectTitle);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ObjectID);

			oParam.Fieldname = "Story Number/Comment";
			uParam.Fieldname = "Story Number%2FComment";
			oParam.Fieldvalue = this.getView().byId("repStoryCom").getValue();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.StoryNumberFComment);

			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataComplexityMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Complexity);

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ProcessArea);

			oParam.Fieldname = "Frequency";
			uParam.Fieldname = "Frequency";
			oParam.Fieldvalue = oDataFrequencyMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Frequency);

			oParam.Fieldname = "Dependencies";
			uParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataDependencyCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Dependencies);

			oParam.Fieldname = "Report Type";
			uParam.Fieldname = "Report Type";
			oParam.Fieldvalue = oDataReportTypeMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ReportType);

			oParam.Fieldname = "Processing Mode";
			uParam.Fieldname = "Processing Mode";
			oParam.Fieldvalue = oDataProcessingModeRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ProcessingMode);

			oParam.Fieldname = "Report General Details";
			uParam.Fieldname = "Report General Details";
			oParam.Fieldvalue = oDataReport.ReportGeneralDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ReportGeneralDetails);

			oParam.Fieldname = uParam.Fieldname = "Report Details Rating";
			oParam.Fieldvalue = oDataReportDetailsRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ReportDetailsRating);

			oParam.Fieldname = uParam.Fieldname = "Report Details Comment";
			oParam.Fieldvalue = oDataReport.ReportDetailsComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ReportDetailsComment);

			oParam.Fieldname = "Error Handling";
			uParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataReport.ErrorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ErrorHandling);

			oParam.Fieldname = uParam.Fieldname = "Error Checkboxes";
			oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ErrorCheckboxes);

			oParam.Fieldname = uParam.Fieldname = "Error Handling Rating";
			oParam.Fieldvalue = oDataErrorHandlingRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ErrorHandlingRating);

			oParam.Fieldname = uParam.Fieldname = "Error Handling Comment";
			oParam.Fieldvalue = oDataReport.ErrorHandlingComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.ErrorHandlingComment);

			oParam.Fieldname = uParam.Fieldname = "Security Rating";
			oParam.Fieldvalue = oDataSecurityRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.SecurityRating);

			oParam.Fieldname = uParam.Fieldname = "Security Comment";
			oParam.Fieldvalue = oDataReport.SecurityComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.SecurityComment);

			oParam.Fieldname = uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Security);

			oParam.Fieldname = uParam.Fieldname = "Security Section";
			oParam.Fieldvalue = oDataReport.SecuritySection;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.SecuritySection);

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

			oParam.Fieldname = "STATUS";
			uParam.Fieldname = "STATUS";
			oParam.Fieldvalue = oDataReport.STATUS;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);

			oParam.Fieldname = "HTTPS_SFTP_";
			uParam.Fieldname = "HTTPS_SFTP_";
			oParam.Fieldvalue = oDataReport.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.HTTPS_SFTP_);

			oParam.Fieldname = "UserAuth";
			uParam.Fieldname = "UserAuth";
			oParam.Fieldvalue = oDataReport.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.UserAuth);

			oParam.Fieldname = "Encryp";
			uParam.Fieldname = "Encryp";
			oParam.Fieldvalue = oDataReport.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.Encryp);

			oParam.Fieldname = uParam.Fieldname = "AuditingandControlRequirements";
			oParam.Fieldvalue = oDataReport.AuditingandControlRequirements;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.AuditingandControlRequirements);

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {
				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}

			var iCountCM, oCMEntry, sCMEntry;

			for (iCountCM = 0; iCountCM < oDataReport.CommLog.length; iCountCM++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CM_" + (iCountCM + 1);
				uParam.Fieldname = "FS_CM_" + (iCountCM + 1);
				oCMEntry = oDataReport.CommLog[iCountCM];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCMEntry.flag);
			}
		},

		checkStatus: function() {
			var oCurrentView = this.getView();
			var oDataReport = this.getView().getModel("reportData").getData();
			// if (oDataReport.STATUS === "FS SAVED") {
			// 	oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			// 	oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
			// 	oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
			// 	oCurrentView.byId("processflow2").updateModel();
			// 	oCurrentView.byId("onPrintRepFS").setEnabled(true);
			// 	oCurrentView.byId("onPrintRepFS").setVisible(true);
			// 	oCurrentView.byId("repFSSubmit").setVisible(true);
			// } 
				var crNumber = sessionStorage.getItem("crNumber");
			if (oDataReport.STATUS === "FS SUBMITTED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepFS").setEnabled(true);
				oCurrentView.byId("onPrintRepFS").setVisible(true);
				oCurrentView.byId("repFSSubmit").setText("Approve");
				oCurrentView.byId("repSave").setEnabled(false);
			} 
			
				else if (oDataReport.STATUS === 'ON HOLD' && crNumber === "") {
					oCurrentView.byId("repSave").setEnabled(false);
				
					oCurrentView.byId("repFSSubmit").setEnabled(false);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
						//oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				//	oCurrentView.byId("oBTPrint").setVisible(true);

				}
			else if (oDataReport.STATUS === "FS APPROVED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepFS").setEnabled(true);
				oCurrentView.byId("onPrintRepFS").setVisible(true);
				oCurrentView.byId("repFSSubmit").setText("Accept");
				oCurrentView.byId("repSave").setEnabled(false);
			} else if (oDataReport.STATUS === "FS ACCEPTED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepFS").setEnabled(true);
				oCurrentView.byId("onPrintRepFS").setVisible(true);
				oCurrentView.byId("repSave").setEnabled(false);
			} else {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("onPrintRepFS").setEnabled(true);
				oCurrentView.byId("onPrintRepFS").setVisible(true);
				oCurrentView.byId("repSave").setVisible(true);
				oCurrentView.byId("repSave").setEnabled(true);
				oCurrentView.byId("repFSSubmit").setText("Submit");
				oCurrentView.byId("repFSSubmit").setVisible(false);
			}
		},

		onSubmit: function() {
			var that = this;
			if (this.getView().byId("repFSSubmit").getText() === "Submit") {
				sap.m.MessageBox.show(
					"Do you want to Submit the data", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === "YES") {
								that.onConfirmSubmit();
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
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								//SOC Writwick 10 July 2018
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
									oDataForMail.ObjectTitle);
								//EOC Writwick 10 July 2018
							}
						}
					}
				);
			} else if (this.getView().byId("repFSSubmit").getText() === "Approve") {
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
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								//SOC Writwick 10 July 2018
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
									oDataForMail.ObjectTitle);
								//EOC Writwick 10 July 2018
							}
						}
					}
				);
			} else if (this.getView().byId("repFSSubmit").getText() === "Accept") {
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
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);

								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								//SOC Writwick 10 July 2018
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Author, oDataForMail.Approver,
									oDataForMail.ObjectTitle);
								//EOC Writwick 10 July 2018
							}
						}
					}
				);
			}
		},

		onConfirmSubmit: function() {
			var that = this;
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();

			oCurrentView.byId("onPrintRepFS").setEnabled(true);
			oCurrentView.byId("repSave").setEnabled(false);
			oCurrentView.byId("repFSSubmit").setText("Approve");

			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
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
			oParam.Fieldname = "STATUS";
			uParam.Fieldname = "STATUS";
			oParam.Fieldvalue = "FS SUBMITTED";
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},

		onConfirmApprove: function() {
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();

			oCurrentView.byId("repSave").setEnabled(false);
			oCurrentView.byId("repFSSubmit").setText("Accept");

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
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
			oParam.Fieldname = "STATUS";
			uParam.Fieldname = "STATUS";
			oParam.Fieldvalue = 'FS APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},

		onConfirmAccept: function() {
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();

			oCurrentView.byId("repSave").setEnabled(false);
			oCurrentView.byId("repFSSubmit").setEnabled(false);
			//set staus here
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
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
			oParam.Fieldname = "STATUS";
			uParam.Fieldname = "STATUS";
			oParam.Fieldvalue = 'FS ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
		},

		callAttachment: function(oEvent) {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};
			//EOC Writwick 10 July 2018

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
		
		onHold: function(){
		
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
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
			oParam.Fieldname = "STATUS";
			uParam.Fieldname = "STATUS";
			oParam.Fieldvalue = 'ON HOLD';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataReportSuccess.STATUS);
				this.getView().byId("oBTHold").setVisible(false);
			
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
				//SOC Writwick 10 July 2018
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "reportUploadAttach",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
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
			//SOC Writwick 10 July 2018
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};
			//EOC Writwick 10 July 2018
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

		onChange: function() {

			var that = this;
			var oDataReport = this.getView().getModel("reportData").getData();
			var objectTitle = oDataReport.ObjectTitle;
			this.getOwnerComponent().getRouter().navTo("reportTS", {
				object: that.mArguments.object,
				objectlist: that.mArguments.objectlist,
				objectTitle: objectTitle
			});
		},

		reportTabSelect: function(oEvent) {
			if (oEvent.getSource().getSelectedKey() === "reportReqTab") {
				this.byId("reportGenPanel").setExpanded(false);
				this.byId("reportErrorHandlePanel").setExpanded(false);

			}
		},

		onPrint: function() {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			//SOC Writwick 10 July 2018
			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&Projectid=" + projectID;

				if (oParam.Projectkey === "REP") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Report_FS.html?sap-language=EN" + mParameter,
						true);
				}
			}
			//EOC Writwick 10 July 2018
		},

		addNewRowUA: function() {
			var stepNo = this.getView().getModel("reportData").getData().userAcceptance.length + 1;
			this.getView().getModel("reportData").getData().userAcceptance.push({
				step: stepNo,
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
			var oUAEntry, sUAEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			var oParam = {
				Repid: dataObject.repid,
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
			//EOC Writwick 10 July 2018
			if (this.getView().getModel("reportData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				var index1 = this.getView().getModel("reportData").getData().userAcceptance.length;
				oUAEntry = this.getView().getModel("reportData").getData().userAcceptance[index1 - 1];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_" + index1;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("reportData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("reportData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_1";
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

		addNewRowComLog: function() {
			this.getView().getModel("reportData").getData().CommLog.push({
				IssueDesc: "",
				Priority: "",
				DateLogg: "",
				Status: "",
				DateResol: "",
				Resolv: "",
				AssignedTo: "",
				newRow: true
			});
			this.getView().getModel("reportData").refresh();
		},

		deleteRowComLog: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			var length = sEvent.getId().split("-").length;
			var index = sEvent.getId().split("-")[length - 1];
			var data = this.getView().getModel("reportData").getData().CommLog[index];
			if (data.newRow) {
				if (index !== 0) {
					that.getView().getModel("reportData").getData().CommLog.splice(index, 1);
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
								that.onConfirmDeleteCommLog(sEvent);
							}

						}
					}
				);
			}
		},

		onConfirmDeleteCommLog: function(sEvent) {
			var oCMEntry, sCMEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
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
			//EOC Writwick 10 July 2018
			if (this.getView().getModel("reportData").getData().CommLog.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/CommLog/")[1];
				var index1 = this.getView().getModel("reportData").getData().CommLog.length;
				oCMEntry = this.getView().getModel("reportData").getData().CommLog[index1 - 1];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CM_" + index1;
				this.deleteCommCall(oParam, uParam, index);
			} else if (this.getView().getModel("reportData").getData().CommLog.length === 1) {
				oCMEntry = this.getView().getModel("reportData").getData().CommLog[0];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CM_1";
				this.deleteCommCall(oParam, uParam, index);
			}
		},

		deleteCommCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey + "',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("reportData").getData().CommLog.length === 1) {
							that.getView().getModel("reportData").getData().CommLog.splice(0, 1);

							that.getView().getModel("reportData").getData().CommLog.push({
								IssueDesc: "",
								Priority: "",
								DateLogg: "",
								Status: "",
								DateResol: "",
								Resolv: "",
								AssignedTo: "",
								flag: false
							});
							that.getView().getModel("reportData").refresh();
						} else {
							that.getView().getModel("reportData").getData().CommLog.splice(index, 1);
							that.getView().getModel("reportData").refresh();
							that.updateCommLog(oParam, uParam);
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

		updateCommLog: function(oParam, uParam) {
			var oDataReport = this.getView().getModel("reportData").getData();
			var iCountCM, oCMEntry, sCMEntry;
			for (iCountCM = 0; iCountCM < oDataReport.CommLog.length; iCountCM++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CM_" + (iCountCM + 1);
				uParam.Fieldname = "FS_CM_" + (iCountCM + 1);
				oCMEntry = oDataReport.CommLog[iCountCM];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCMEntry.flag);
			}
		},

		updateUserAcc: function(oParam, uParam) {
			var oDataReport = this.getView().getModel("reportData").getData();
			var iCountUA, oUAEntry, sUAEntry;
			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {
				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}
		},

		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("first");
		},

		openSampleSheet: function() {
			window.open(
				"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='REP',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='reportUploadData',PROJECTID='',OBJECT_ID='')/$value",
				//	"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='REP',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='reportUploadData',FILENAME='Sample_Data_Sheet.xlsx')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		}

	});
});