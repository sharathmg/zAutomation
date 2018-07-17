sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel"
], function(Controller, callServices, MessageBox, Fragment, JSONModel) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.ConversionsFS", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.DetailPage
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("conversionFS").attachPatternMatched(this.onObjectMatched, this);
			var oDataProcessFlowLanesOnly = {
				lanes: [{
					id: "0",
					icon: "sap-icon://activity-assigned-to-goal",
					label: "FS submitted",
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
			this.CROpen = "";
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],
				function(RTE) {
					var oRichTextEditor = new RTE("myRTE", {
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
						tooltip: "Conversion Mapping",
						value: "{conversionData>/Conversionmappingrules}"
					});

					var oRichTextEditor1 = new RTE("myRTE2038", {
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
						tooltip: "Load Data Validations",
						value: "{conversionData>/LoadDataValidation}"
					});

					var oRichTextEditor2 = new RTE("myRTE2039", {
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
						tooltip: "Reconciliation Requirements",
						value: "{conversionData>/ReconciliationRequirements}"
					});

					var oRichTextEditor3 = new RTE("myRTE2040", {
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
						value: "{conversionData>/AuditingandControlRequirements}"
					});

					that.getView().byId("idVerticalLayout").addContent(oRichTextEditor);
					that.getView().byId("idVerticalLayout1").addContent(oRichTextEditor1);
					that.getView().byId("idVerticalLayout2").addContent(oRichTextEditor2);
					that.getView().byId("idVerticalLayoutACR").addContent(oRichTextEditor3);
					sap.ui.getCore().applyChanges();
					oRichTextEditor.addButtonGroup("styleselect").addButtonGroup("table");
				});
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

		onPrint: function() {
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			//SOC Writwick 10 July 2018
			// if (oParam && oParam.projectkey) {
			// 	var mParameter = "&version_id=" + versionno[1] + "&repid=" + oParam.repid + "&projectkey=" + oParam.projectkey + "&processid=" +
			// 		oParam.processid + "&stepno=" +
			// 		oParam.stepno + "&projectid=" + projectID;
			if (oParam && oParam.Projectkey) {
				var mParameter = "&version_id=" + versionno[1] + "&repid=" + oParam.Repid + "&projectkey=" + oParam.Projectkey + "&processid=" +
					oParam.Processid + "&stepno=" +
					oParam.Stepno + "&projectid=" + projectID;
			//EOC Writwick 10 July 2018

				if (oParam.projectkey === "CNV") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Conversion_FS.html?sap-language=EN" + mParameter,
						true);
				}
				// sap.m.URLHelper.redirect(
				// 	"http://ussltccsl1209.solutions.glbsnet.com:8002/sap/bc/ui5_ui5/sap/ZAUTO_HTML/Report_FS.html?sap-client=100&sap-language=EN",
				// 	true
				// );
			}
		},

		addNewRowUA: function() {
			this.getView().getModel("conversionData").getData().userAcceptance.push({
				step: "",
				testType: "",
				scenario: "",
				testData: "",
				stepsPer: "",
				actualResults: "",
				expectedResults: ""
			});
			this.getView().getModel("conversionData").refresh();
		},

		deleteRowUA: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the data?", {
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
			//handleInfoMessageBoxPress()
		},
		deleteFileFrmConvMapValiC: function(oEvent) {
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
							that.deleteFileFrmConvMapVali(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},
		deleteFileFrmSelScreenC: function(oEvent) {
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
							that.deleteFileFrmSelScreen(sEvent);
						}

					}
				}
			);
			// }
			//handleInfoMessageBoxPress()
		},

		onConfirmDelete: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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
			// var uParam = {
			// 	Version: versionno[1],
			// 	Repid: dataObject.repid,
			// 	Projectkey: dataObject.projectkey,
			// 	Processid: dataObject.processid,
			// 	Stepno: dataObject.stepno,
			// 	Fieldname: ''
			// };
			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			if (this.getView().getModel("conversionData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				var index1 = this.getView().getModel("conversionData").getData().userAcceptance.length;
				oUAEntry = this.getView().getModel("conversionData").getData().userAcceptance[index1 - 1];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_" + index1;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("conversionData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("conversionData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_1";
				this.deleteUserCall(oParam, uParam, index);
			}
		},

		deleteUserCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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
								testData: "",
								stepsPer: "",
								actualResults: "",
								expectedResults: "",
								flag: false
							});
							that.getView().getModel("conversionData").refresh();
						} else {
							that.getView().getModel("conversionData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("conversionData").refresh();
							that.updateUserAcc(oParam, uParam);
						}
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-success",
							type: 'Success',
							title: 'Details Deleted',
							description: messageServ

						});
						sap.ui.getCore().oMessagePopover.destroyItems();
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
						sap.ui.getCore().oMessagePopover.destroyItems();
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
		},

		// add delete row for comm log start
		/*
		addNewRowUA2: function() {
			this.getView().getModel("conversionData").getData().CommLog.push({
				IssueDesc: "",
				Priority: "",
				DateLogg: new Date(),
				Status: "",
				DateResol: new Date(),
				Resolv: ""
			});
			this.getView().getModel("conversionData").refresh();
		},

		deleteRowUA2: function(oEvent) {
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
							that.onConfirmDelete2(sEvent);
						}

					}
				}
			);
			// }
		},
		
		onConfirmDelete2: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
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
			var uParam = {
				Repid: dataObject.repid,
				Projectkey: dataObject.projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.stepno,
				Fieldname: ''
			};
			if (this.getView().getModel("conversionData").getData().CommLog.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/CommLog/")[1];
				var index1 = this.getView().getModel("conversionData").getData().CommLog.length;
				oUAEntry = this.getView().getModel("conversionData").getData().CommLog[index1 - 1];
				sUAEntry = oUAEntry.IssueDesc + "~" + oUAEntry.Priority + "~" + oUAEntry.DateLogg + "~" +
					oUAEntry.Status + "~" + oUAEntry.DateResol  + "~" + oUAEntry.Resolv;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_" + index1;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("conversionData").getData().CommLog.length === 1) {
				oUAEntry = this.getView().getModel("conversionData").getData().CommLog[0];
				sUAEntry = oUAEntry.IssueDesc + "~" + oUAEntry.Priority + "~" + oUAEntry.DateLogg + "~" +
					oUAEntry.Status + "~" + oUAEntry.DateResol  + "~" + oUAEntry.Resolv;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_1";
				this.deleteUserCall2(oParam, uParam, index);
			}
		},

		deleteUserCall2: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey + "',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if(that.getView().getModel("conversionData").getData().CommLog.length === 1){
							that.getView().getModel("conversionData").getData().CommLog.splice(0, 1);
						
								that.getView().getModel("conversionData").getData().CommLog.push({
					step: "",
					testType: "",
					scenario: "",
					stepsPer: "",
					actualResults: "",
					flag: false
				});
				that.getView().getModel("conversionData").refresh();
						}else{
						that.getView().getModel("conversionData").getData().CommLog.splice(index, 1);
						that.getView().getModel("conversionData").refresh();
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
		*/
		// add-delete row for comm log end
		// {
		// 	sap.m.URLHelper.redirect(
		// 		"http://ussltccsl1209.solutions.glbsnet.com:8002/sap/bc/ui5_ui5/sap/ZAUTO_HTML/Conversion_FS.html?sap-client=100&sap-language=EN",
		// 		true
		// 	);

		// },

		addNewRowComLog: function() {
			this.getView().getModel("conversionData").getData().CommLog.push({
				IssueDesc: "",
				Priority: "",
				DateLogg: "",
				Status: "",
				DateResol: "",
				Resolv: "",
				AssignedTo: "",
				flag: false
			});
			this.getView().getModel("conversionData").refresh();
		},

		onHold: function() {
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'ON HOLD';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);
			this.getView().byId("oBTHold").setEnabled(false);
		},

		deleteRowComLog: function(oEvent) {
			var that = this;
			var sEvent = oEvent.getSource();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to delete the data?", {
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
		},
		deleteFileFrmConvMapVali: function(oEvent) {
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
				// 	FIELDNAME: "conversionUploadData",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "conversionUploadData",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");

			}
			oTable.setBusy(false);

		},
		deleteFileFrmSelScreen: function(oEvent) {
			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachIntMap");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: oParam.stepno,
				// 	FIELDNAME: "conversionUploadDet",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "conversionUploadDet",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataMap"), "attachIntMap", "attachIntMapVisible");

			}
			oTable.setBusy(false);

		},
		onConfirmDeleteCommLog: function(sEvent) {
			var oCMEntry, sCMEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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
			if (this.getView().getModel("conversionData").getData().CommLog.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/CommLog/")[1];
				var index1 = this.getView().getModel("conversionData").getData().CommLog.length;
				oCMEntry = this.getView().getModel("conversionData").getData().CommLog[index1 - 1];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CommLog_" + index1;
				this.deleteCommCall(oParam, uParam, index);
			} else if (this.getView().getModel("conversionData").getData().CommLog.length === 1) {
				oCMEntry = this.getView().getModel("conversionData").getData().CommLog[0];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CommLog_1";
				this.deleteCommCall(oParam, uParam, index);
			}
		},

		deleteCommCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("conversionData").getData().CommLog.length === 1) {
							that.getView().getModel("conversionData").getData().CommLog.splice(0, 1);

							that.getView().getModel("conversionData").getData().CommLog.push({
								IssueDesc: "",
								Priority: "",
								DateLogg: "",
								Status: "",
								DateResol: "",
								Resolv: "",
								AssignedTo: "",
								flag: false
							});
							that.getView().getModel("conversionData").refresh();
						} else {
							that.getView().getModel("conversionData").getData().CommLog.splice(index, 1);
							that.getView().getModel("conversionData").refresh();
							that.updateCommLog(oParam, uParam);
						}
						var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
						aErrorMsgData.push({
							icon: "sap-icon://message-success",
							type: 'Success',
							title: 'Details Deleted',
							description: messageServ

						});
						sap.ui.getCore().oMessagePopover.destroyItems();
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
						sap.ui.getCore().oMessagePopover.destroyItems();
						var oModelp = new sap.ui.model.json.JSONModel();
						oModelp.setData(aErrorMsgData);
						sap.ui.getCore().oMessagePopover.setModel(oModelp);
						sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
		},

		updateCommLog: function(oParam, uParam) {
			var oDataReport = this.getView().getModel("conversionData").getData();
			var iCountCM, oCMEntry, sCMEntry;
			for (iCountCM = 0; iCountCM < oDataReport.CommLog.length; iCountCM++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CommLog_" + (iCountCM + 1);
				uParam.Fieldname = "FS_CommLog_" + (iCountCM + 1);
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
			var oDataReport = this.getView().getModel("conversionData").getData();
			var iCountUA, oUAEntry, sUAEntry;
			for (iCountUA = 0; iCountUA < oDataReport.userAcceptance.length; iCountUA++) {
				oDataReport.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataReport.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}
		},

		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			//SOC Writwick 10 July 2018
			// sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.stepno = "S1";
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S1";
			//EOC Writwick 10 July 2018
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.mArguments = oEvent.getParameters().arguments;
			var title = "Conversion FS " + this.mArguments.objectlist + " Material Master Update";
			this.byId("page").setTitle(title);
			this.byId("doctype").setSelectedKey("Functional");

			var obj = this.mArguments.object;

			this.oDataConversion = {
				Approver: "",
				Reviewer: "",
				Author: "",
				ObjectID: "",
				ObjectTitle: "",
				StoryNumberFComment: "",
				Complexity: "",
				ProcessArea: "",
				ImpactedSystems: "",
				ConversionType: "",
				Dependencies: "",
				Conversionmappingrules: "",
				SelectionScreen: "",
				LoadDataValidation: "",
				ReconciliationRequirements: "",
				ErrorHandling: "",
				ErrorHandlingComments: "",
				Security: "",
				SecurityComments: "",
				userAcceptance1: "",
				userAcceptance2: "",
				userAcceptance: [],
				userAcceptTemp: "",
				CommLog: [],
				CommLog1: "",
				CommLogTemp: "",
				Status_FS: "",
				versionLatest: "",
				AuditingandControlRequirements: ""
			};

			this.oDataConversionSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectID: false,
				ObjectTitle: false,
				StoryNumberFComment: false,
				Complexity: false,
				ProcessArea: false,
				ImpactedSystems: false,
				ConversionType: false,
				Dependencies: false,
				Conversionmappingrules: false,
				SelectionScreen: false,
				LoadDataValidation: false,
				ReconciliationRequirements: false,
				ErrorHandling: false,
				ErrorHandlingComments: false,
				Security: false,
				SecurityComments: false,
				userAcceptance1: false,
				userAcceptance2: false,
				userAcceptTemp: false,
				CommLog: false,
				CommLogTemp: false,
				Status_FS: false,
				versionLatest: false,
				AuditingandControlRequirements: false
			};
			var oParam = "";
			try {
				var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				//SOC Writwick 10 July 2018
				// if (oParam) {
				// 	if (oParam.projectid) {
				// 		this.oProjectId = oParam.projectid;
				// 		delete oParam.projectid;
				// 	}
				// }
				if (oParam) {
					if (oParam.Projectid) {
						this.oProjectId = oParam.Projectid;
						delete oParam.Projectid;
					}
				}
				//EOC Writwick 10 July 2018
			} catch (exception) {
				return;
			}

			var oModelConversion = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelConversion, "conversionData");

			this.byId("processarea").setSelectedKeys("");
			this.byId("multiImpacted").setSelectedKeys("");

			if (obj === "new") {
				this.byId("commLog").setVisible(false);
				this.byId("versiontypeNew").setVisible(true);
				this.byId("versiontypeExisting").setVisible(false);
				//				this.byId("reviewComment3").setVisible(false);
				//				this.byId("reviewComment0").setVisible(false);
				//				this.byId("reviewComment4").setVisible(false);
				this.byId("oBTPrint").setEnabled(false);
				this.byId("oBTPrint").setVisible(true);
				oModelConversion.setData(this.oDataConversion);
				this.dataRead();
			} else {
				this.byId("commLog").setVisible(true);
				this.byId("versiontypeNew").setVisible(false);
				this.byId("versiontypeExisting").setVisible(true);
				//				this.byId("reviewComment3").setVisible(true);
				//				this.byId("reviewComment0").setVisible(false);
				//				this.byId("reviewComment4").setVisible(true);
				this.byId("oBTPrint").setEnabled(true);
				this.byId("oBTPrint").setVisible(true);
				this.byId('versiontypeExisting').destroyItems();
				var oSelect = this.getView().byId("versiontypeExisting");
				var newItem = new sap.ui.core.Item({
					key: "Version 1.0",
					text: "Version 1.0"
				});
				oSelect.addItem(newItem);

				this.dataRead();
			}
		},

		// dataRead: function() {
		// 	var that = this;
		// 	var conversionData = {
		// 		"userAcceptance": []
		// 	};
		// 	var conversionJSON = new sap.ui.model.json.JSONModel(conversionData);
		// 	this.getView().setModel(conversionJSON, "conversionData");
		// 	var objectID;
		// 	if (this.mArguments.objectID !== "" && this.mArguments.objectID !== undefined) {
		// 		objectID = this.mArguments.objectID;
		// 	} else {
		// 		objectID = "PR003";
		// 	}
		// 	that.getView().byId("processarea").clearSelection();
		// 	that.getView().byId("multiImpacted").clearSelection();

		// 	var oParam = {
		// 		repid: 'CNV-083b-US-F-2104',
		// 		projectkey: 'CNV',
		// 		processid: objectID,
		// 		stepno: 'S1',
		// 		fieldname: ''
		// 	};
		// 	var oRes, oRes1;

		// 	oParam.fieldname = "Object Title";
		// 	conversionData.ObjectTitle = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Object ID";
		// 	conversionData.ObjectID = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Process Area";
		// 	oRes1 = callServices.fnCallMainTable(oParam);
		// 	if (oRes1 !== undefined) {
		// 		oRes = oRes1.split("~");
		// 		for (var i = 0; i < oRes.length; i++) {
		// 			that.getView().byId("processarea").addSelectedKeys(oRes[i]);
		// 		}
		// 	}

		// 	oParam.fieldname = "Story Number%2FComment";
		// 	conversionData.StoryNumberFComment = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Complexity";
		// 	conversionData.Complexity = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Impacted Systems";
		// 	oRes1 = callServices.fnCallMainTable(oParam);
		// 	if (oRes1 !== undefined) {
		// 		oRes = oRes1.split("~");
		// 		for (i = 0; i < oRes.length; i++) {
		// 			that.getView().byId("multiImpacted").addSelectedKeys(oRes[i]);
		// 		}
		// 	}

		// 	oParam.fieldname = "Conversion Type";
		// 	conversionData.ConversionType = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Dependencies";
		// 	conversionData.Dependencies = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Conversion mapping, validation and transformational rules";
		// 	conversionData.Conversionmappingrules = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Selection Screen";
		// 	conversionData.SelectionScreen = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Load Data Validation";
		// 	conversionData.LoadDataValidation = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Reconciliation Requirements";
		// 	conversionData.ReconciliationRequirements = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Error Handling Comments";
		// 	conversionData.ErrorHandlingComments = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Error Handling";
		// 	conversionData.ErrorHandling = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Author";
		// 	conversionData.Author = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Reviewer";
		// 	conversionData.Reviewer = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Approver";
		// 	conversionData.Approver = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Security Comments";
		// 	conversionData.SecurityComments = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "Security";
		// 	conversionData.Security = callServices.fnCallMainTable(oParam);

		// 	oParam.fieldname = "UA1";
		// 	oRes1 = callServices.fnCallMainTable(oParam);
		// 	if (oRes1 !== undefined) {
		// 		oRes = oRes1.split("~");
		// 		if (oRes.length > 1) {
		// 			var data = {};
		// 			data.step = oRes[0];
		// 			data.testType = oRes[1];
		// 			data.scenario = oRes[2];
		// 			data.stepsPer = oRes[3];
		// 			data.actualResults = oRes[4];
		// 			conversionData.userAcceptance.push(data);
		// 		}
		// 	}

		// 	oParam.fieldname = "UA2";
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
		onChangeVersionExisting: function(oevent) {
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
		formatAmount: function(value) {
			try {
				return parseInt(value);
			} catch (ex) {
				//
			}
		},
		getDataforARA: function() {
			var mServiceUrl = "/sap/opu/odata/sap/ZAUTOMATION_SRV";
			this.oModel = new sap.ui.model.odata.ODataModel(mServiceUrl);
			var that = this;
			var author, reviewer, approver;
			var projectid = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			//SOC Writwick 10 July 2018
			// var repid = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.repid;
			var repid = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Repid;
			//EOC Writwick 10 July 2018
			var sPath = "/NEW_OBJECTSet?$filter=Projectid eq '" + projectid + "' and Ricefid eq '" + repid + "'";
			this.oModel.read(sPath, null, [], false, function(oData) {
				if (oData !== undefined) {
					try {
						author = oData.results[0].fsauthorid;
						reviewer = oData.results[0].fsreviewerid;
						approver = oData.results[0].fsapproverid;
						that.getStyleVisible(author, reviewer, approver);
					} catch (ex) {
						//
					}
				}
			}, function(oError) {
				//
			});
		},
		getStyleVisible: function(author, reviewer, approver) {
			var oDataConversion = this.oDataConversion;
			try {
				var SAPId = sap.ushell.Container.getUser().getId();
			} catch (ex) {
				//
			}
			if (SAPId === reviewer || SAPId === approver) {
				this.getView().byId("reviewComment0C").setEnabled(true);
				this.getView().byId("reviewComment0R").setEnabled(true);
				this.getView().byId("reviewComment3C").setEnabled(true);
				this.getView().byId("reviewComment3R").setEnabled(true);
				this.getView().byId("reviewComment4C").setEnabled(true);
				this.getView().byId("reviewComment4R").setEnabled(true);
				this.getView().byId("reviewComment002C").setEnabled(true);
				this.getView().byId("reviewComment002R").setEnabled(true);
				this.getView().byId("reviewComment001C").setEnabled(true);
				this.getView().byId("reviewComment001R").setEnabled(true);
			} else {
				this.getView().byId("reviewComment0C").setEnabled(false);
				this.getView().byId("reviewComment0R").setEnabled(false);
				this.getView().byId("reviewComment3C").setEnabled(false);
				this.getView().byId("reviewComment3R").setEnabled(false);
				this.getView().byId("reviewComment4C").setEnabled(false);
				this.getView().byId("reviewComment4R").setEnabled(false);
				this.getView().byId("reviewComment002C").setEnabled(false);
				this.getView().byId("reviewComment002R").setEnabled(false);
				this.getView().byId("reviewComment001C").setEnabled(false);
				this.getView().byId("reviewComment001R").setEnabled(false);
			}
		},
		getReviewData: function(flag) {
			this.getView().byId("reviewComment0").setVisible(flag);
			this.getView().byId("reviewComment002").setVisible(flag);
			this.getView().byId("reviewComment001").setVisible(flag);
			this.getView().byId("reviewComment3").setVisible(flag);
			this.getView().byId("reviewComment4").setVisible(flag);

		},
		dataRead: function(versionNo) {

			// var oModelUA = new sap.ui.model.json.JSONModel();
			// this.getView().setModel(oModelUA, "userData");

			// var oUserAcceptance = {
			// 	userAcceptance: []
			// };
			this.getDataforARA();
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
			//SOC Writwick 10 July 2018
			// if (!oParam) {
			// 	return;
			// }
			// if (oParam) {
			// 	if (oParam.projectid) {
			// 		delete oParam.projectid;
			// 	}
			// }
			if (!oParam) {
				return;
			}
			if (oParam) {
				if (oParam.Projectid) {
					delete oParam.Projectid;
				}
			}
			//oParam.version_id = "1.0";
			oParam.Version = "1.0";
			//EOC Writwick 10 July 2018
			this.getView().byId("oBTPrint").setVisible(true);

			if (versionNo) {
				//SOC Writwick 10 July 2018
				// oParam.version_id = versionNo;
				oParam.Version = versionNo;
				//EOC Writwick 10 July 2018
				var crNumber1 = sessionStorage.getItem("crNumber");
				var crData = sessionStorage.getItem("crData");
				if (crNumber1 !== "") {
					// this.getView().byId("storynumber").setValue(crNumber1);
					oDataConversion.StoryNumberFComment = crNumber1;
				}
			} else {

				var num = 1;

				while (num > 0) {
					//SOC Writwick 10 July 2018
					// oParam.fieldname = "STATUS_FS";
					oParam.Fieldname = "STATUS_FS";
					//EOC Writwick 10 July 2018
					callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_FS", this.oDataConversionSuccess);
					oDataConversion.versionLatest = oDataConversion.Status_FS;
					//SOC Writwick 12 July 2018
					// if (oDataConversion.versionLatest !== undefined) {
					if (oDataConversion.versionLatest !== "") {
					//EOC Writwick 12 July 2018
						num = num + 1;
						//SOC Writwick 10 July 2018
						// oParam.version_id = parseInt(oParam.version_id) + 1;
						// oParam.version_id = (oParam.version_id).toString() + ".0";
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						//EOC Writwick 10 July 2018
						
						if (oDataConversion.versionLatest === "ACCEPTED") {
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
						// oDataConversion.versionLatest = undefined;
						// oDataConversion.Status_FS = undefined;
						oDataConversion.versionLatest = "";
						oDataConversion.Status_FS = "";
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
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);
						num = -1;
					}
					else {
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);
						num = -1;
					}
					//EOC Writwick 12 July 2018
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "STATUS_FS";
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_FS", this.oDataConversionSuccess);
			var statusLastVersion = oDataConversion.Status_FS;
			var statusLast = statusLastVersion;

		

			if (statusLastVersion === "ACCEPTED" && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					// this.getView().byId("storynumber").setValue("");
			//		this.getView().byId("oBTHold").setVisible(true);
					oDataConversion.StoryNumberFComment = "";
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
					this.CROpen = sessionStorage.getItem("crData");

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
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);
				}

			}
			statusLastVersion = undefined;
			oDataConversion.Status_FS = undefined;
			// if (versionNo) {
			// 	oParam.version_id = versionNo;
			// }
			// else {

			// 	var num = 1;
			// 	while (num > 0) {
			// 		oParam.fieldname = "Approver";
			// 		callServices.fnGetDataMainTable(oParam, oDataConversion, "Approver", this.oDataConversionSuccess);
			// 		oDataConversion.versionLatest = oDataConversion.Approver;
			// 		if (oDataConversion.versionLatest !== undefined) {
			// 			num = num + 1;
			// 			oParam.version_id = parseInt(oParam.version_id) + 1;
			// 			oParam.version_id = (oParam.version_id).toString() + ".0";
			// 			oDataConversion.versionLatest = undefined;
			// 			oDataConversion.Approver = undefined;
			// 		} else {
			// 			//versiontypeExisting  
			// 			//Version 3.0
			// 			//this.byId("versiontypeExisting").setValueState("Version 3.0");
			// 			oParam.version_id = parseInt(oParam.version_id) - 1;
			// 			oParam.version_id = (oParam.version_id).toString() + ".0";
			// 			var selectedKey = "Version " + oParam.version_id;
			// 			this.byId('versiontypeExisting').setSelectedKey(selectedKey);
			// 			num = -1;
			// 		}
			// 	}
			// }
			oDataConversion.Status_FS = "";
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "STATUS_FS";
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Status_FS", this.oDataConversionSuccess);
			var oCurrentView = this.getView();
			// logic to show/hide buttons in ENH

			if (oDataConversion.Status_FS === 'SAVED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				this.getReviewData(false);
				this.getView().byId("oBTHold").setEnabled(true);
				// oCurrentView.byId("oBTApprove").setVisible(false);
				// oCurrentView.byId("oBTAcceptApproval").setVisible(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDataConversion.Status_FS === 'ON HOLD') {
			//	oCurrentView.byId("oBTSave").setEnabled(false);
				this.getView().byId("oBTHold").setEnabled(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
			
			} else if (oDataConversion.Status_FS === 'SUBMITTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(true);
				//oCurrentView.byId("oBTApprove").setVisible(true);
			//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				this.getReviewData(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				this.getView().byId("oBTHold").setEnabled(true);

			} else if (oDataConversion.Status_FS === 'APPROVED') {

				var oCurrentView = this.getView();

				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				this.getView().byId("oBTHold").setEnabled(true);
				this.getReviewData(true);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDataConversion.Status_FS === 'ACCEPTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
					this.getView().byId("oBTHold").setEnabled(true);
						this.getView().byId("oBTHold").setVisible(true);
				this.getReviewData(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();

			} else {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				this.getView().byId("oBTHold").setEnabled(true);
					this.getView().byId("oBTHold").setVisible(true);
				this.getReviewData(false);
				// oCurrentView.byId("oBTSubmit").setVisible(true);
				// oCurrentView.byId("oBTApprove").setVisible(false);
				// oCurrentView.byId("oBTAcceptApproval").setVisible(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			}

			if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
					sessionStorage.getItem("crNumber") !== "")) {
				//SOC Writwick 10 July 2018
				// oParam.version_id = parseInt(oParam.version_id) - 1;
				// oParam.version_id = (oParam.version_id).toString() + ".0";
				oParam.Version = parseInt(oParam.Version) - 1;
				oParam.Version = (oParam.Version).toString() + ".0";
				//EOC Writwick 10 July 2018
			}

			var procArea = callServices.fnGetProccessArea(oDataConversion);
			var availSys = callServices.fnGetAvailableSystems(oDataConversion);
			
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Approver";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Approver", this.oDataConversionSuccess);

			oParam.Fieldname = "Reviewer";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Reviewer", this.oDataConversionSuccess);

			oParam.Fieldname = "Author";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Author", this.oDataConversionSuccess);
			//EOC Writwick 10 July 2018

			// oParam.fieldname = "Object ID";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ObjectID", this.oDataConversionSuccess);
			
			//SOC Writwick 10 July 2018
			// oDataConversion.ObjectID = oParam.repid;
			oDataConversion.ObjectID = oParam.Repid;
			
			// oParam.fieldname = "Object Title";
			oParam.Fieldname = "Object Title";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ObjectTitle", this.oDataConversionSuccess);

			oDataConversion.Title = "Conversions - " + oDataConversion.ObjectID + " - " + oDataConversion.ObjectTitle;

			if (oDataConversion.StoryNumberFComment === "") {
				//SOC Writwick 10 July 2018
				// oParam.fieldname = "Story Number Comment";
				oParam.Fieldname = "Story Number Comment";
				//EOC Writwick 10 July 2018
				callServices.fnGetDataMainTable(oParam, oDataConversion, "StoryNumberFComment", this.oDataConversionSuccess);
			}
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Complexity";
			oParam.Fieldname = "Complexity";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Complexity", this.oDataConversionSuccess);
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Process Area";
			oParam.Fieldname = "Process Area";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ProcessArea", this.oDataConversionSuccess);
			if (oDataConversion.ProcessArea) {
				var sProcessAreaOpt = oDataConversion.ProcessArea.split("~");
				for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
					that.getView().byId("processarea").addSelectedKeys(sProcessAreaOpt[iProcAr]);
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Impacted Systems";
			oParam.Fieldname = "Impacted Systems";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ImpactedSystems", this.oDataConversionSuccess);
			if (oDataConversion.ImpactedSystems) {
				var sImpactedSysOpt = oDataConversion.ImpactedSystems.split("~");
				for (var iImpacSysAr = 0; iImpacSysAr < sImpactedSysOpt.length; iImpacSysAr++) {
					that.getView().byId("multiImpacted").addSelectedKeys(sImpactedSysOpt[iImpacSysAr]);
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Conversion Type";
			oParam.Fieldname = "Conversion Type";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ConversionType", this.oDataConversionSuccess);
			if (oDataConversion.ConversionType) {
				var sOpMethods2 = oDataConversion.ConversionType.split("~");
				for (var iopmethods2 = 0; iopmethods2 < sOpMethods2.length; iopmethods2++) {
					switch (sOpMethods2[iopmethods2]) {
						case "Master Data":
							that.byId("Master").setSelected(true);
							break;
						case "Transactional":
							that.byId("Transactional").setSelected(true);
							break;
						case "Historical":
							that.byId("Historical").setSelected(true);
							break;
						case "Others":
							that.byId("OtherDCT").setSelected(true);
							break;
					}
				}
			}
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Dependencies";
			oParam.Fieldname = "Dependencies";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Dependencies", this.oDataConversionSuccess);
			if (oDataConversion.Dependencies) {
				var sOpMethods2 = oDataConversion.Dependencies.split("~");
				for (var iopmethods2 = 0; iopmethods2 < sOpMethods2.length; iopmethods2++) {
					switch (sOpMethods2[iopmethods2]) {
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
			// oParam.fieldname = "Conversion mapping and rules";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Conversionmappingrules", this.oDataConversionSuccess);

			// oParam.fieldname = "Selection Screen";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreen", this.oDataConversionSuccess);

			// oParam.fieldname = "Load Data Validation";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDataValidation", this.oDataConversionSuccess);

			// oParam.fieldname = "Reconciliation Requirements";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ReconciliationRequirements", this.oDataConversionSuccess);

			// oParam.fieldname = "AuditingandControlRequirements";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "AuditingandControlRequirements", this.oDataConversionSuccess);

			// oParam.fieldname = "Error Handling";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandling", this.oDataConversionSuccess);

			// oParam.fieldname = "Error Handling Comments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingComments", this.oDataConversionSuccess);

			// oParam.fieldname = "Error Handling Comments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingComments", this.oDataConversionSuccess);

			// oParam.fieldname = "ErrorLog";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorLog", this.oDataConversionSuccess);
			// oParam.fieldname = "AuditLog";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "AuditLog", this.oDataConversionSuccess);

			// oParam.fieldname = "ErrorReport";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorReport", this.oDataConversionSuccess);
			// oParam.fieldname = "ReturnRequirement";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ReturnRequirement", this.oDataConversionSuccess);
			// oParam.fieldname = "SecValidations";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SecValidations", this.oDataConversionSuccess);
			// oParam.fieldname = "ErrReconciliation";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrReconciliation", this.oDataConversionSuccess);
			// oParam.fieldname = "HTTPS_SFTP_";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "HTTPS_SFTP_", this.oDataConversionSuccess);
			// oParam.fieldname = "UserAuth";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "UserAuth", this.oDataConversionSuccess);
			// oParam.fieldname = "Encryp";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Encryp", this.oDataConversionSuccess);

			// oParam.fieldname = "ConversionAssumptions";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ConversionAssumptions", this.oDataConversionSuccess);
			// oParam.fieldname = "ConversionDependencies";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ConversionDependencies", this.oDataConversionSuccess);
			// oParam.fieldname = "ErrorHandlingReview";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingReview", this.oDataConversionSuccess);
			// oDataConversion.ErrorHandlingReview = parseInt(oDataConversion.ErrorHandlingReview);
			// oParam.fieldname = "CMReview";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "CMReview", this.oDataConversionSuccess);
			// oDataConversion.CMReview = parseInt(oDataConversion.CMReview);
			// oParam.fieldname = "CMComments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "CMComments", this.oDataConversionSuccess);

			// oParam.fieldname = "SelectionScreenComments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenComments", this.oDataConversionSuccess);
			// oParam.fieldname = "LoadDetailsReview";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDetailsReview", this.oDataConversionSuccess);
			// oDataConversion.LoadDetailsReview = parseInt(oDataConversion.LoadDetailsReview);
			// oParam.fieldname = "SelectionScreenReview";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenReview", this.oDataConversionSuccess);
			// oDataConversion.SelectionScreenReview = parseInt(oDataConversion.SelectionScreenReview);
			// oParam.fieldname = "SecurityReview";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SecurityReview", this.oDataConversionSuccess);
			// oDataConversion.SecurityReview = parseInt(oDataConversion.SecurityReview);

			// oParam.fieldname = "ErrorHandlingCheckBox";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingCheckBox", this.oDataConversionSuccess);
			oParam.Fieldname = "Conversion mapping and rules";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Conversionmappingrules", this.oDataConversionSuccess);

			oParam.Fieldname = "Selection Screen";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreen", this.oDataConversionSuccess);

			oParam.Fieldname = "Load Data Validation";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDataValidation", this.oDataConversionSuccess);

			oParam.Fieldname = "Reconciliation Requirements";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ReconciliationRequirements", this.oDataConversionSuccess);

			oParam.Fieldname = "AuditingandControlRequirements";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "AuditingandControlRequirements", this.oDataConversionSuccess);

			oParam.Fieldname = "Error Handling";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandling", this.oDataConversionSuccess);

			oParam.Fieldname = "Error Handling Comments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingComments", this.oDataConversionSuccess);

			oParam.Fieldname = "Error Handling Comments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingComments", this.oDataConversionSuccess);

			oParam.Fieldname = "ErrorLog";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorLog", this.oDataConversionSuccess);
			oParam.Fieldname = "AuditLog";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "AuditLog", this.oDataConversionSuccess);

			oParam.Fieldname = "ErrorReport";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorReport", this.oDataConversionSuccess);
			oParam.Fieldname = "ReturnRequirement";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ReturnRequirement", this.oDataConversionSuccess);
			oParam.Fieldname = "SecValidations";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecValidations", this.oDataConversionSuccess);
			oParam.Fieldname = "ErrReconciliation";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrReconciliation", this.oDataConversionSuccess);
			oParam.Fieldname = "HTTPS_SFTP_";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "HTTPS_SFTP_", this.oDataConversionSuccess);
			oParam.Fieldname = "UserAuth";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "UserAuth", this.oDataConversionSuccess);
			oParam.Fieldname = "Encryp";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Encryp", this.oDataConversionSuccess);

			oParam.Fieldname = "ConversionAssumptions";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ConversionAssumptions", this.oDataConversionSuccess);
			oParam.Fieldname = "ConversionDependencies";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ConversionDependencies", this.oDataConversionSuccess);
			oParam.Fieldname = "ErrorHandlingReview";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingReview", this.oDataConversionSuccess);
			oDataConversion.ErrorHandlingReview = parseInt(oDataConversion.ErrorHandlingReview);
			oParam.Fieldname = "CMReview";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "CMReview", this.oDataConversionSuccess);
			oDataConversion.CMReview = parseInt(oDataConversion.CMReview);
			oParam.Fieldname = "CMComments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "CMComments", this.oDataConversionSuccess);

			oParam.Fieldname = "SelectionScreenComments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenComments", this.oDataConversionSuccess);
			oParam.Fieldname = "LoadDetailsReview";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDetailsReview", this.oDataConversionSuccess);
			oDataConversion.LoadDetailsReview = parseInt(oDataConversion.LoadDetailsReview);
			oParam.Fieldname = "SelectionScreenReview";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SelectionScreenReview", this.oDataConversionSuccess);
			oDataConversion.SelectionScreenReview = parseInt(oDataConversion.SelectionScreenReview);
			oParam.Fieldname = "SecurityReview";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecurityReview", this.oDataConversionSuccess);
			oDataConversion.SecurityReview = parseInt(oDataConversion.SecurityReview);

			oParam.Fieldname = "ErrorHandlingCheckBox";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "ErrorHandlingCheckBox", this.oDataConversionSuccess);
			//EOC Writwick 10 July 2018
			
			if (oDataConversion.ErrorHandlingCheckBox) {
				var sOpMethods = oDataConversion.ErrorHandlingCheckBox.split("~");
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
			// oParam.fieldname = "SecurityCheckBox";
			oParam.Fieldname = "SecurityCheckBox";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecurityCheckBox", this.oDataConversionSuccess);
			if (oDataConversion.SecurityCheckBox) {
				var sOpMethods1 = oDataConversion.SecurityCheckBox.split("~");
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
			
			//SOC Writwick 10 July 2018
			// oParam.fieldname = "Security";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "Security", this.oDataConversionSuccess);

			// oParam.fieldname = "Security Comments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "SecurityComments", this.oDataConversionSuccess);

			// oParam.fieldname = "LoadDetailsComments";
			// callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDetailsComments", this.oDataConversionSuccess);
			oParam.Fieldname = "Security";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "Security", this.oDataConversionSuccess);

			oParam.Fieldname = "Security Comments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "SecurityComments", this.oDataConversionSuccess);

			oParam.Fieldname = "LoadDetailsComments";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "LoadDetailsComments", this.oDataConversionSuccess);
			//EOC Writwick 10 July 2018
			var iCountUA, sUserAcptCols;

			for (iCountUA = 0;; iCountUA++) {

				oDataConversion.userAcceptTemp = "";
				//SOC Writwick 10 July 2018
				// oParam.fieldname = "FS_UA_" + (iCountUA + 1);
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, oDataConversion, "userAcceptTemp", this.oDataConversionSuccess);
				if (this.oDataConversionSuccess.userAcceptTemp) {
					if (oDataConversion.userAcceptTemp) {
						sUserAcptCols = oDataConversion.userAcceptTemp.split("~");
						if (sUserAcptCols && sUserAcptCols.length >= 5) {

							$.each(sUserAcptCols, function(iIndex, sValue) {
								if ((sValue === "undefined") || (!sValue)) {
									sUserAcptCols[iIndex] = "";
								}
							});

							oDataConversion.userAcceptance.push({
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
			if (oDataConversion.userAcceptance.length === 0) {
				oDataConversion.userAcceptance.push({
					step: "1",
					testType: "",
					scenario: "",
					testData: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: "",
					flag: false
				});
			}

			/*oParam.fieldname = "UA1";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "userAcceptance1", this.oDataConversionSuccess);
			var sUserAcptCols;
			var sUserAcptCols1;
			if (oDataConversion.userAcceptance1) {
				sUserAcptCols = oDataConversion.userAcceptance1.split("~");
				if (sUserAcptCols.length > 1) {
					var data1 = {};
					data1.step = sUserAcptCols[0];
					data1.testType = sUserAcptCols[1];
					data1.scenario = sUserAcptCols[2];
					data1.stepsPer = sUserAcptCols[3];
					data1.actualResults = sUserAcptCols[4];
					oDataConversion.userAcceptance.push(data1);
				}
			}else{
				var data1 = {};
					data1.step = "";
					data1.testType = "";
					data1.scenario = "";
					data1.stepsPer = "";
					data1.actualResults = "";
					this.oDataConversion.userAcceptance.push(data1);
			}

			oParam.fieldname = "UA2";
			callServices.fnGetDataMainTable(oParam, oDataConversion, "userAcceptance2", this.oDataConversionSuccess);
			if (oDataConversion.userAcceptance12) {
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
			}*/

			/*oParam.fieldname = "CommLog";
			var sCommLogCol1;
			callServices.fnGetDataMainTable(oParam, oDataConversion, "CommLog1", this.oDataConversionSuccess);
			if (oDataConversion.CommLog1) {
				sCommLogCol1 = oDataConversion.CommLog1.split("~");
				if (sCommLogCol1.length > 1) {
					data1 = {};
					data1.IssueDesc = sCommLogCol1[0];
					data1.Priority = sCommLogCol1[1];
					data1.DateLogg = new Date(sCommLogCol1[2]);
					data1.Status = sCommLogCol1[3];
					data1.DateResol = new Date(sCommLogCol1[4]);
					data1.Resolv = sCommLogCol1[5];
					oDataConversion.CommLog.push(data1);

				}
			}else{
				data1 = {};
					data1.IssueDesc = "";
					data1.Priority = "";
					data1.DateLogg = new Date();
					data1.Status = "";
					data1.DateResol = new Date();
					data1.Resolv = "";
					oDataConversion.CommLog.push(data1);
			}*/

			var iCountCommLog, aCommLogCols;
			

			for (iCountCommLog = 0;; iCountCommLog++) {

				oDataConversion.CommLogTemp = "";
				//SOC Writwick 10 July 2018
				// oParam.fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, oDataConversion, "CommLogTemp", this.oDataConversionSuccess);
				if (this.oDataConversionSuccess.CommLogTemp) {
					if (oDataConversion.CommLogTemp) {
						aCommLogCols = oDataConversion.CommLogTemp.split("~");
						if (aCommLogCols && aCommLogCols.length >= 6) {

							$.each(aCommLogCols, function(iIndex, sValue) {

								if (iIndex === 2 || iIndex === 4) {
									var dateTemp = new Date(sValue);
									if ((dateTemp == "Invalid Date") || (sValue === null)) {
										aCommLogCols[iIndex] = "";
									} else {
										//aCommLogCols[iIndex] = new Date(sValue);
										aCommLogCols[iIndex] = dateTemp.toJSON().substring(0, 10);
									}
									// if ((sValue === "") || (sValue === "undefined") || (sValue === "Invalid Date") || (sValue === "null")) {
									// 	aCommLogCols[iIndex] = "";
									// } else {
									// 	//aCommLogCols[iIndex] = new Date(sValue);
									// 	aCommLogCols[iIndex] = sValue;
									// }
								} else {
									if ((sValue === "undefined") || (!sValue)) {
										aCommLogCols[iIndex] = "";
									}
								}
							});

							oDataConversion.CommLog.push({
								IssueDesc: aCommLogCols[0],
								Priority: aCommLogCols[1],
								DateLogg: aCommLogCols[2],
								Status: aCommLogCols[3],
								DateResol: aCommLogCols[4],
								Resolv: aCommLogCols[5],
								AssignedTo: aCommLogCols[6],
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
			if (oDataConversion.CommLog.length === 0) {
				oDataConversion.CommLog.push({
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
			var intDataDet = {
				attachIntDet: [],
				attachIntDetVisible: false,
				attachIntDetn: [],
				attachIntDetVisiblen: false
			};
			var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
			this.getView().setModel(intDataDetJSON, "intDataDet");
			var intDataMap = {
				attachIntMap: [],
				attachIntMapVisible: false
			};
			var intDataMapJSON = new sap.ui.model.json.JSONModel(intDataMap);
			this.getView().setModel(intDataMapJSON, "intDataMap");
			
			//SOC Writwick 10 July 2018
			// this.readAttachments({
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: oParam.stepno,
			// 	FIELDNAME: "conversionUploadDet",
			// 	TYPE: "O"
			// });
			// this.readAttachments1({
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: oParam.stepno,
			// 	FIELDNAME: "conversionUploadData",
			// 	TYPE: "O"
			// });
			this.readAttachments({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "conversionUploadDet",
				TYPE: "O"
			});
			this.readAttachments1({
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "conversionUploadData",
				TYPE: "O"
			});
			//EOC Writwick 10 July 2018
			var oModelConversion = this.getView().getModel("conversionData");
			oModelConversion.setData(oDataConversion);
			// oModelUA.setData(oUserAcceptance);
		},

		handleInfoMessageBoxPress: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.information(
				"Data Submitted.", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		},

		handleInfoMessageBoxPress2: function(oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.information(
				"Data Saved.", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
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
							sap.ui.getCore().oMessagePopover.destroyItems();
							that.onConfirmSave();
							that.byId("oBTPrint").setEnabled(true);
							that.byId("oBTPrint").setVisible(true);
							that.byId("oBTSubmit").setVisible(true);
							that.byId("oBTSave").setVisible(true);
							that.byId("oBTSave").setEnabled(true);
							var aErrorMsgData = [{
								icon: "sap-icon://message-success",
								type: 'Success',
								title: 'Fields Updated',
								description: 'All fields updated'

							}];
							sap.ui.getCore().oMessagePopover.destroyItems();
							var oModelp = new sap.ui.model.json.JSONModel();
							oModelp.setData(aErrorMsgData);
							sap.ui.getCore().oMessagePopover.setModel(oModelp);
							sap.ui.getCore().oMessagePopover.setVisible(true);
							this.getReviewData(false);
						}

					}
				}
			);

			/*var oDataReport = this.getView().getModel("conversionData").getData();
			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");

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

			var oDataImpactedSys = this.getView().byId("multiImpacted").getSelectedKeys();
			var oDataImpacSysMulti = oDataImpactedSys.join("~");

			var oDataConversionTypeCheckBx = [];
			if (this.getView().byId("Master").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Master").getText());
			}
			if (this.getView().byId("Transactional").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Transactional").getText());
			}
			var oDataConvTypeCheckBxMulti = oDataConversionTypeCheckBx.join("~");

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

			if (oDataReport.CommLog[0] !== undefined) {
				var CommLogTbl = Object.keys(oDataReport.CommLog[0]).map(function(key) {
					return [oDataReport.CommLog[0][key]];
				});
				var commLogTblMulti = CommLogTbl.join("~");
			}

			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

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
			var uParam = {
				Repid: dataObject.repid,
				Projectkey: dataObject.projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.stepno,
				Fieldname: ''
			};
			oParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataReport.ObjectTitle;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Story Number%2FComment";
			oParam.Fieldvalue = oDataReport.StoryNumberFComment;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataReport.Complexity;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Impacted Systems";
			oParam.Fieldvalue = oDataImpacSysMulti;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Conversion Type";
			oParam.Fieldvalue = oDataConvTypeCheckBxMulti;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataDependencyCheckBxMulti;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Conversion mapping, validation and transformational rules";
			oParam.Fieldvalue = oDataReport.Conversionmappingrules;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Selection Screen";
			oParam.Fieldvalue = oDataReport.SelectionScreen;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Load Data Validation";
			oParam.Fieldvalue = oDataReport.LoadDataValidation;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Reconciliation Requirements";
			oParam.Fieldvalue = oDataReport.ReconciliationRequirements;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Error Handling Comments";
			oParam.Fieldvalue = oDataReport.ErrorHandlingComments;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataReport.ErrorHandling;
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

			oParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataReport.Security;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "Security Comments";
			oParam.Fieldvalue = oDataReport.SecurityComments;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "UA1";
			oParam.Fieldvalue = userAcceptTbl1Multi;
			callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = "UA2";
			oParam.Fieldvalue = userAcceptTbl2Multi;
			callServices.fnSubmitInMainTable(oParam);

			//oParam.Fieldname = "CommLog";
			//oParam.Fieldvalue = commLogTblMulti;
			//callServices.fnSubmitInMainTable(oParam);
				var iCountCommLog, oCommLogEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataReport.CommLog.length; iCountCommLog++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				oCommLogEntry = oDataReport.CommLog[iCountCommLog];
				sCommLogEntry = oCommLogEntry.IssueDesc + "~" + oCommLogEntry.Priority + "~" + oCommLogEntry.DateLogg + "~" +
					oCommLogEntry.Status + "~" + oCommLogEntry.DateResol + "~" + oCommLogEntry.Resolv;
				oParam.Fieldvalue = sCommLogEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCommLogEntry.flag);
			}*/

			this.byId("oBTPrint").setEnabled(true);

		},
		onConfirmSave: function() {

			// if (obj === "new") {
			// 	this.oDataConversionSuccess = {
			// 		ObjectTitle: false,
			// 		ObjectID: false,
			// 		StoryNumberFComment: false,
			// 		Complexity: false,
			// 		ImpactedSystems: false,
			// 		ProcessArea: false,
			// 		ConversionType: false,
			// 		Dependencies: false,
			// 		Conversionmappingrules: false,
			// 		SelectionScreen: false,
			// 		LoadDataValidation: false,
			// 		ReconciliationRequirements: false,
			// 		ErrorHandlingComments: false,
			// 		ErrorHandling: false,
			// 		Author: false,
			// 		Reviewer: false,
			// 		Approver: false,
			// 		Security: false,
			// 		SecurityComments: false,
			// 		ErrorHandlingCheckBox: false,
			// 		SecurityCheckBox: false,
			// 		SecurityReview: false,
			// 		ErrorHandlingReview: false,
			// 		Status_FS: false
			// 	};
			// }

			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainer").setVisible(true);

			var oDataReport = this.getView().getModel("conversionData").getData();
			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");

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

			var oDataImpactedSys = this.getView().byId("multiImpacted").getSelectedKeys();
			var oDataImpacSysMulti = oDataImpactedSys.join("~");

			var oDataConversionTypeCheckBx = [];
			if (this.getView().byId("Master").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Master").getText());
			}
			if (this.getView().byId("Transactional").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Transactional").getText());
			}
			if (this.getView().byId("Historical").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Historical").getText());
			}
			if (this.getView().byId("OtherDCT").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("OtherDCT").getText());
			}
			var oDataConvTypeCheckBxMulti = oDataConversionTypeCheckBx.join("~");

			if (oDataReport.userAcceptance[0] !== undefined) {
				var userAcceptTbl1 = Object.keys(oDataReport.userAcceptance[0]).map(function(key) {
					return [oDataReport.userAcceptance[0][key]];
				});
				var userAcceptTbl1Multi = userAcceptTbl1.join("~");
			}
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

			if (oDataReport.userAcceptance[1] !== undefined) {
				var userAcceptTbl2 = Object.keys(oDataReport.userAcceptance[1]).map(function(key) {
					return [oDataReport.userAcceptance[1][key]];
				});
				var userAcceptTbl2Multi = userAcceptTbl2.join("~");
			}

			if (oDataReport.CommLog[0] !== undefined) {
				var CommLogTbl = Object.keys(oDataReport.CommLog[0]).map(function(key) {
					return [oDataReport.CommLog[0][key]];
				});
				var commLogTblMulti = CommLogTbl.join("~");
			}

			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			// callServices.fnUpdateMainTableBatchCall(oParam, uParam, [
			// 	[this.oDataConversionSuccess.Status_FS, "STATUS_FS", "STATUS_FS", "SAVED"],
			// 	[this.oDataConversionSuccess.ObjectTitle, "Object Title", "Object Title", oDataReport.ObjectTitle]
			// ]);  

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);

			if (this.CROpen !== "") {
				oParam.Version = '1.0';
				uParam.Version = '1.0';
				oParam.Fieldname = "CRDetails";
				uParam.Fieldname = "CRDetails";
				oParam.Fieldvalue = this.CROpen;
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.CRDetails);
				oParam.Version = versionno[1];
				uParam.Version = versionno[1];
			}

			oParam.Fieldname = "Object Title";
			uParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataReport.ObjectTitle;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectTitle);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectID);

			oParam.Fieldname = "Story Number Comment";
			uParam.Fieldname = "Story Number Comment";
			oParam.Fieldvalue = oDataReport.StoryNumberFComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.StoryNumberFComment);

			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataReport.Complexity;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Complexity);

			oParam.Fieldname = "Impacted Systems";
			uParam.Fieldname = "Impacted Systems";
			oParam.Fieldvalue = oDataImpacSysMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ImpactedSystems);

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ProcessArea);

			oParam.Fieldname = "Conversion Type";
			uParam.Fieldname = "Conversion Type";
			oParam.Fieldvalue = oDataConvTypeCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ConversionType);

			oParam.Fieldname = "Dependencies";
			uParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataDependencyCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Dependencies);

			oParam.Fieldname = "Conversion mapping and rules";
			uParam.Fieldname = "Conversion mapping and rules";
			oParam.Fieldvalue = oDataReport.Conversionmappingrules;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Conversionmappingrules);

			oParam.Fieldname = "Selection Screen";
			uParam.Fieldname = "Selection Screen";
			if (oDataReport.SelectionScreen) {
				oParam.Fieldvalue = "true";
			} else {
				oParam.Fieldvalue = "false";
			}

			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SelectionScreen);

			oParam.Fieldname = "Load Data Validation";
			uParam.Fieldname = "Load Data Validation";
			oParam.Fieldvalue = oDataReport.LoadDataValidation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.LoadDataValidation);

			oParam.Fieldname = "Reconciliation Requirements";
			uParam.Fieldname = "Reconciliation Requirements";
			oParam.Fieldvalue = oDataReport.ReconciliationRequirements;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ReconciliationRequirements);

			oParam.Fieldname = "AuditingandControlRequirements";
			uParam.Fieldname = "AuditingandControlRequirements";
			oParam.Fieldvalue = oDataReport.AuditingandControlRequirements;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.AuditingandControlRequirements);

			oParam.Fieldname = "Error Handling Comments";
			uParam.Fieldname = "Error Handling Comments";
			oParam.Fieldvalue = oDataReport.ErrorHandlingComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandlingComments);

			oParam.Fieldname = "ErrorHandlingCheckBox";
			uParam.Fieldname = "ErrorHandlingCheckBox";
			oParam.Fieldvalue = oDataOutputCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oDataConversionSuccess.ErrorHandlingCheckBox);

			oParam.Fieldname = "Error Handling";
			uParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataReport.ErrorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandling);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataReport.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Author);

			oParam.Fieldname = "ConversionDependencies";
			uParam.Fieldname = "ConversionDependencies";
			oParam.Fieldvalue = oDataReport.ConversionDependencies;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ConversionDependencies);

			oParam.Fieldname = "ConversionAssumptions";
			uParam.Fieldname = "ConversionAssumptions";
			oParam.Fieldvalue = oDataReport.ConversionAssumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ConversionAssumptions);

			oParam.Fieldname = "HTTPS_SFTP_";
			uParam.Fieldname = "HTTPS_SFTP_";
			oParam.Fieldvalue = oDataReport.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.HTTPS_SFTP_);
			oParam.Fieldname = "UserAuth";
			uParam.Fieldname = "UserAuth";
			oParam.Fieldvalue = oDataReport.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.UserAuth);
			oParam.Fieldname = "Encryp";
			uParam.Fieldname = "Encryp";
			oParam.Fieldvalue = oDataReport.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Encryp);
			oParam.Fieldname = "ErrorLog";
			uParam.Fieldname = "ErrorLog";
			oParam.Fieldvalue = oDataReport.ErrorLog;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorLog);
			oParam.Fieldname = "AuditLog";
			uParam.Fieldname = "AuditLog";
			oParam.Fieldvalue = oDataReport.AuditLog;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.AuditLog);
			oParam.Fieldname = "ErrorReport";
			uParam.Fieldname = "ErrorReport";
			oParam.Fieldvalue = oDataReport.ErrorReport;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorReport);
			oParam.Fieldname = "ReturnRequirement";
			uParam.Fieldname = "ReturnRequirement";
			oParam.Fieldvalue = oDataReport.ReturnRequirement;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Author);
			oParam.Fieldname = "SecValidations";
			uParam.Fieldname = "SecValidations";
			oParam.Fieldvalue = oDataReport.SecValidations;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SecValidations);
			oParam.Fieldname = "ErrReconciliation";
			uParam.Fieldname = "ErrReconciliation";
			oParam.Fieldvalue = oDataReport.ErrReconciliation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrReconciliation);

			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataReport.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Reviewer);

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataReport.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Approver);

			oParam.Fieldname = "Security";
			uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataReport.Security;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Security);

			oParam.Fieldname = "SecurityCheckBox";
			uParam.Fieldname = "SecurityCheckBox";
			oParam.Fieldvalue = oDataOutputCheckBxMulti1;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oDataConversionSuccess.SecurityCheckBox);

			oParam.Fieldname = "ErrorHandlingReview";
			uParam.Fieldname = "ErrorHandlingReview";
			if (oDataReport.ErrorHandlingReview) {
				oParam.Fieldvalue = oDataReport.ErrorHandlingReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandlingReview);

			oParam.Fieldname = "ErrorHandlingReview";
			uParam.Fieldname = "ErrorHandlingReview";
			if (oDataReport.ErrorHandlingReview) {
				oParam.Fieldvalue = oDataReport.ErrorHandlingReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandlingReview);

			oParam.Fieldname = "SecurityReview";
			uParam.Fieldname = "SecurityReview";
			if (oDataReport.SecurityReview) {
				oParam.Fieldvalue = oDataReport.SecurityReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SecurityReview);

			oParam.Fieldname = "LoadDetailsReview";
			uParam.Fieldname = "LoadDetailsReview";
			if (oDataReport.LoadDetailsReview) {
				oParam.Fieldvalue = oDataReport.LoadDetailsReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.LoadDetailsReview);

			oParam.Fieldname = "SelectionScreenReview";
			uParam.Fieldname = "SelectionScreenReview";
			if (oDataReport.SelectionScreenReview) {
				oParam.Fieldvalue = oDataReport.SelectionScreenReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SelectionScreenReview);

			oParam.Fieldname = "SelectionScreenComments";
			uParam.Fieldname = "SelectionScreenComments";
			oParam.Fieldvalue = oDataReport.SelectionScreenComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SelectionScreenComments);

			oParam.Fieldname = "CMReview";
			uParam.Fieldname = "CMReview";
			if (oDataReport.CMReview) {
				oParam.Fieldvalue = oDataReport.CMReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.CMReview);

			oParam.Fieldname = "CMComments";
			uParam.Fieldname = "CMComments";
			oParam.Fieldvalue = oDataReport.CMComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.CMComments);

			oParam.Fieldname = "LoadDetailsComments";
			uParam.Fieldname = "LoadDetailsComments";
			oParam.Fieldvalue = oDataReport.LoadDetailsComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.LoadDetailsComments);

			oParam.Fieldname = "Security Comments";
			uParam.Fieldname = "Security Comments";
			oParam.Fieldvalue = oDataReport.SecurityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SecurityComments);

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

			/*oParam.Fieldname = "CommLog";
			uParam.Fieldname = "CommLog";
			oParam.Fieldvalue = commLogTblMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.CommLog1);
			*/

			var iCountCommLog, oCommLogEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataReport.CommLog.length; iCountCommLog++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				oCommLogEntry = oDataReport.CommLog[iCountCommLog];

				if (!oCommLogEntry.DateLogg) {
					oCommLogEntry.DateLogg = "";
				}
				if (!oCommLogEntry.DateResol) {
					oCommLogEntry.DateResol = "";
				}

				sCommLogEntry = oCommLogEntry.IssueDesc + "~" + oCommLogEntry.Priority + "~" + oCommLogEntry.DateLogg + "~" +
					oCommLogEntry.Status + "~" + oCommLogEntry.DateResol + "~" + oCommLogEntry.Resolv + "~" + oCommLogEntry.AssignedTo;
				oParam.Fieldvalue = sCommLogEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCommLogEntry.flag);
			}
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();

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
							that.byId("oBTPrint").setEnabled(true);
							that.byId("oBTPrint").setVisible(true);
							that.getReviewData(true);
						}

					}
				}
			);

		},

		onPressHelp: function(oEvt) {
			var oButton = oEvt.getSource();
			this._menu = this.getView().byId("HelpMenu");
			var eDock = sap.ui.core.Popup.Dock;
			if (oButton.getId().includes("DependenciesHelp")) {
				this._menu.removeAllItems();
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Configuration Dependencies"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Development Dependencies"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Execution Dependencies"
				}));
				this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
			} else if (oButton.getId().includes("ConvMapping")) {
				this._menu.removeAllItems();
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Busines Process Considerations"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Process Description and Flow"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Data Extraction Requirements"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Source System Inventory"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Profiling and Data assessment"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Scope, Selection Criteria & Filtering Requirement"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Expected Extraction Volume"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Data Construction Process"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Manual construction Approach and Manual Template Location"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Manual Template Location and File Format"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Data cleansing Strategy"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "De-Duplication Process"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Delta Extraction"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Data Transformation and Loading Requirements"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Mapping, Validation and Transformation Rules"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Transaction Information"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Transaction Code"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Expected Load Volume"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Re-run Requirements"
				}));
				this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
			}

		},

		onConfirmAccept: function() {

			//set staus here
			this.onConfirmSave();
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);

		//	this.getView().byId("oBTHold").setVisible(true);
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

			var oCurrentView = this.getView();
			var that = this;
			var user = that.getView().getModel("conversionData").getData().Approver;
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
			// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Author, oDataForMail.Reviewer,
			// 	oDataForMail.ObjectTitle);
			callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Author, oDataForMail.Reviewer,
				oDataForMail.ObjectTitle);
			//EOC Writwick 10 July 2018
			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("oBTPrint").setVisible(true);

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
							that.byId("oBTPrint").setEnabled(true);
							that.byId("oBTPrint").setVisible(true);
							that.getReviewData(true);
						}

					}
				}
			);

		},

		onConfirmApprove: function() {

			//set staus here
			this.onConfirmSave();
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);
			var that = this;
			var user = that.getView().getModel("conversionData").getData().Approver;
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
			var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
			var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
			callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
			//SOC Writwick 10 July 2018
			// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
			// 	oDataForMail.ObjectTitle);
			callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
				oDataForMail.ObjectTitle);
			//EOC Writwick 10 July 2018

			var oCurrentView = this.getView();

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("oBTPrint").setVisible(true);

			oCurrentView.byId("oBTSubmit").setVisible(false);
		//	oCurrentView.byId("oBTApprove").setVisible(true);
		//	oCurrentView.byId("oBTApprove").setEnabled(false);
			oCurrentView.byId("oBTAcceptApproval").setVisible(true);
			
		
		},

		/*	onApprove: function() {

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

			var oParam = {
				Repid: oInfo.repid,
				Projectkey: oInfo.projectkey,
				Processid: oInfo.processid,
				Stepno: oInfo.stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Repid: oInfo.repid,
				Projectkey: oInfo.projectkey,
				Processid: oInfo.processid,
				Stepno: oInfo.stepno,
				Fieldname: ''
			};
			
			oParam.Fieldname = "Status_FS";
			uParam.Fieldname = "Status_FS";
			oParam.Fieldvalue = 'APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);
			
			 

		},*/
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
							// that.byId("oBTPrint").setEnabled(true);
							that.byId("oBTPrint").setEnabled(true);
							that.byId("oBTPrint").setVisible(true);

							var user = that.getView().getModel("conversionData").getData().Approver;
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
							var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
							var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
							callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							//SOC Writwick 10 July 2018
							// callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
							// 	oDataForMail.ObjectTitle);
							callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
								oDataForMail.ObjectTitle);
							//EOC Writwick 10 July 2018
							that.getReviewData(true);
						}

					}
				}
			);

			/*
			var oDataReport = this.getView().getModel("conversionData").getData();
			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");

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

			var oDataImpactedSys = this.getView().byId("multiImpacted").getSelectedKeys();
			var oDataImpacSysMulti = oDataImpactedSys.join("~");

			var oDataConversionTypeCheckBx = [];
			if (this.getView().byId("Master").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Master").getText());
			}
			if (this.getView().byId("Transactional").getSelected()) {
				oDataConversionTypeCheckBx.push(this.getView().byId("Transactional").getText());
			}
			var oDataConvTypeCheckBxMulti = oDataConversionTypeCheckBx.join("~");

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

			if (oDataReport.CommLog[0] !== undefined) {
				var CommLogTbl = Object.keys(oDataReport.CommLog[0]).map(function(key) {
					return [oDataReport.CommLog[0][key]];
				});
				var commLogTblMulti = CommLogTbl.join("~");
			}

			// var repid = this.mArguments.objectlist;
			// if (repid === undefined) {
			// 	repid = 'CNV-083b-US-F-2104';
			// }

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

			var uParam = {
				Repid: dataObject.repid,
				Projectkey: dataObject.projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.stepno,
				Fieldname: ''
			};

			oParam.Fieldname = "Object Title";
			uParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataReport.ObjectTitle;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectTitle);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataReport.ObjectID;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ObjectID);

			oParam.Fieldname = "Story Number%2FComment";
			uParam.Fieldname = "Story Number%2FComment";
			oParam.Fieldvalue = oDataReport.StoryNumberFComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.StoryNumberFComment);

			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataReport.Complexity;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Complexity);

			oParam.Fieldname = "Impacted Systems";
			uParam.Fieldname = "Impacted Systems";
			oParam.Fieldvalue = oDataImpacSysMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ImpactedSystems);

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ProcessArea);

			oParam.Fieldname = "Conversion Type";
			uParam.Fieldname = "Conversion Type";
			oParam.Fieldvalue = oDataConvTypeCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ConversionType);

			oParam.Fieldname = "Dependencies";
			uParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataDependencyCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Dependencies);

			oParam.Fieldname = "Conversion mapping, validation and transformational rules";
			uParam.Fieldname = "Conversion mapping, validation and transformational rules";
			oParam.Fieldvalue = oDataReport.Conversionmappingrules;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Conversionmappingrules);

			oParam.Fieldname = "Selection Screen";
			uParam.Fieldname = "Selection Screen";
			oParam.Fieldvalue = oDataReport.SelectionScreen;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SelectionScreen);

			oParam.Fieldname = "Load Data Validation";
			uParam.Fieldname = "Load Data Validation";
			oParam.Fieldvalue = oDataReport.LoadDataValidation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.LoadDataValidation);

			oParam.Fieldname = "Reconciliation Requirements";
			uParam.Fieldname = "Reconciliation Requirements";
			oParam.Fieldvalue = oDataReport.ReconciliationRequirements;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ReconciliationRequirements);

			oParam.Fieldname = "Error Handling Comments";
			uParam.Fieldname = "Error Handling Comments";
			oParam.Fieldvalue = oDataReport.ErrorHandlingComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandlingComments);

			oParam.Fieldname = "Error Handling";
			uParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataReport.ErrorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.ErrorHandling);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataReport.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Author);

			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataReport.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Reviewer);

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataReport.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Approver);

			oParam.Fieldname = "Security";
			uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataReport.Security;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Security);

			oParam.Fieldname = "Security Comments";
			uParam.Fieldname = "Security Comments";
			oParam.Fieldvalue = oDataReport.SecurityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.SecurityComments);

			oParam.Fieldname = "UA1";
			uParam.Fieldname = "UA1";
			oParam.Fieldvalue = userAcceptTbl1Multi;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.userAcceptance1);

			oParam.Fieldname = "UA2";
			uParam.Fieldname = "UA2";
			oParam.Fieldvalue = userAcceptTbl2Multi;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.userAcceptance2);

			/*oParam.Fieldname = "CommLog";
			uParam.Fieldname = "CommLog";
			oParam.Fieldvalue = commLogTblMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.CommLog1);
			*/
			/*
				var iCountCommLog, oCommLogEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataReport.CommLog.length; iCountCommLog++) {
				oDataReport.CommLogTemp = "";
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				oCommLogEntry = oDataReport.CommLog[iCountCommLog];
				sCommLogEntry = oCommLogEntry.IssueDesc + "~" + oCommLogEntry.Priority + "~" + oCommLogEntry.DateLogg + "~" +
					oCommLogEntry.Status + "~" + oCommLogEntry.DateResol + "~" + oCommLogEntry.Resolv;
				oParam.Fieldvalue = sCommLogEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCommLogEntry.flag);
			}
	
				// jQuery.sap.require("sap.m.MessageBox");
			
			// }
			//handleInfoMessageBoxPress()
			*/
		},
		onConfirmSubmit: function() {

			//set staus here
			var that = this;
			//set staus here
			that.onConfirmSave();
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SUBMITTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataConversionSuccess.Status_FS);
			// Update Process Lane Starts
			var oCurrentView = this.getView();

			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("oBTPrint").setEnabled(true);
			oCurrentView.byId("oBTSave").setEnabled(false);
			oCurrentView.byId("oBTSubmit").setVisible(false);

			oCurrentView.byId("oBTApprove").setVisible(true);

		},
		/*	callAttachment: function() {
				callServices.callAttachmentService(this.getView().byId("fileUploadRepReq1"),"conversionUploadData");
			},*/
		deleteConvMapValidc: function(oEvent) {
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
							that.deleteConvMapValidic(sEvent);
						}

					}
				}
			);
		},
		deleteConvMapValidic: function(oEvent) {

			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachIntDetn");
				oTable.setBusy(true);
				//SOC Writwick 10 July 2018
				// var oReadAttachParam = {
				// 	REPID: oParam.repid,
				// 	PROJECTKEY: oParam.projectkey,
				// 	PROCESSID: oParam.processid,
				// 	STEPNO: oParam.stepno,
				// 	FIELDNAME: "conversionUploadDatan",
				// 	TYPE: "O"
				// };
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "conversionUploadDatan",
					TYPE: "O"
				};
				//EOC Writwick 10 July 2018
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDetn", "attachIntDetVisiblen");

			}
			oTable.setBusy(false);

		},
		callAttachment: function(oEvent) {

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

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachRepReq1').getId()) {
				//callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet");
				// callServices.callAttachmentService(this.getView().byId("fileUploadRepReq1"), "conversionUploadData", this.readAttachments1,
				// 	oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "conversionUploadData";
				//this.readAttachments1(oServiceParam);

				if (this.getView().byId("fileUploadRepReq1").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadRepReq1"), "conversionUploadData",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachRepReq2').getId()) {
				// //callServices.callAttachmentService(this.getView().byId("fileUploadIntMap"), "IntMap");
				// callServices.callAttachmentService(this.getView().byId("fileUploadRepReq2"), "conversionUploadDet", this.readAttachments,
				// 	oServiceParam, this.getView());
				// //callServices.callAttachmentService(this.getView().byId("fileUploadRepReq2"), "conversionUploadDet", this.readAttachments, oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "conversionUploadDet";
				// //this.readAttachments(oServiceParam);

				if (this.getView().byId("fileUploadRepReq2").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadRepReq2"), "conversionUploadDet",
						oServiceParam, this.getView().getModel("intDataMap"), "attachIntMap", "attachIntMapVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachRepReqn').getId()) {
				if (this.getView().byId("fileUploadRepReqn").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadRepReqn"), "conversionUploadDatan",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDetn", "attachIntDetVisiblen");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}
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
				datatype: "application/json",
				headers: {
					user: "DEVID1",
					password: "Welcome.1"
				}
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;
				oView.getModel("intDataMap").getData().attachIntMap = [];
				$.each(oVal, function(index, item) {
					oView.getModel("intDataMap").getData().attachIntMap.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("intDataMap").getData().attachIntMapVisible = true;
				});
				oView.getModel("intDataMap").refresh();

			} else {
				console.info("Error in attachment service call");
			}
		},

		handleMessagePopoverPress: function(oEvent) {

			var temp = sap.ui.getCore().oMessagePopover.getModel().getData();
			if (temp) {
				// var newarray = temp.filter(function(el) {
				// 	return el.type !== "Success";
				// });
				// // var success = temp.find(o => o.type === 'Success');
				// // var error = temp.find(o => o.type === 'Error');
				// var success = temp.find(function(message) {
				// 	return message.type === "Success";
				// });
				// var error = temp.find(function(message) {
				// 	return message.type === "Error";
				// });
				// if (success && !error) {
				// 	newarray.push({
				// 		type: "Success",
				// 		title: "Fields Updated",
				// 		description: "All fields updated",
				// 		icon: "sap-icon://message-success"
				// 	});
				// 	sap.ui.getCore().oMessagePopover.destroyItems();
				// 	sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
				// }
				// if (success && error) {
				// 	newarray.push({
				// 		type: "Success",
				// 		title: "Fields Updated",
				// 		description: "All other fields updated",
				// 		icon: "sap-icon://message-success"
				// 	});
				// 	sap.ui.getCore().oMessagePopover.destroyItems();
				// 	sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
				// }
				sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
			}

		},

		onChange: function() {

			var that = this;
			this.getOwnerComponent().getRouter().navTo("conversionTS", {
				object: that.mArguments.object,
				objectlist: that.mArguments.objectlist
			});
		},

		// reportTabSelect: function(oEvent) {
		// 	if (oEvent.getSource().getSelectedKey() === "reportReqTab") {
		// 		this.byId("conversionPanel").setExpanded(false);
		// 		this.byId("dataExtractionPanel").setExpanded(false);
		// 		this.byId("selectionScreenPanel").setExpanded(false);
		// 		this.byId("loadDetailsPanel").setExpanded(false);
		// 		this.byId("reportErrorHandlePanel").setExpanded(false);
		// 	}
		// },

		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("first");

		},

		openSampleSheet: function() {

			window.open(
				"/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='CNV',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='conversionUploadData',PROJECTID='',OBJECT_ID='CNV_SAM_2')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		},
		openSampleSheet1: function() {

			window.open(
				"/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='CNV',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='conversionUploadBusinessReq',PROJECTID='',OBJECT_ID='CNV_SAM_1')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");

		}

	});
});