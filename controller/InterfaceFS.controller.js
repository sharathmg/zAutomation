//Gaurav 13th April 2018 1:00AM
var stepID = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV'

], function(Controller, callServices, MessageBox, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.InterfaceFS", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceFS
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("interfaceFS").attachPatternMatched(this.onObjectMatched, this);
			this.byId("fsObjDetCharCount").setVisible(false);
			this.byId("otherimpactLabel").setVisible(false);
			this.byId("otherimpact").setVisible(false);
			this.byId("otherfreqencyLabel").setVisible(false);
			this.byId("otherfrequency").setVisible(false);
			this.byId("othersourceLabel").setVisible(false);
			this.byId("othersource").setVisible(false);
			this.byId("othertargetLabel").setVisible(false);
			this.byId("othertarget").setVisible(false);
			this.getView().byId("oBTPrint").setVisible(true);
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
					var oRichTextEditor = new RTE({
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
						value: "{intData>/Mapping}"
					});

					var oRichTextEditor1 = new RTE({
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
						value: "{intData>/es1}"
					});

					var oRichTextEditor2 = new RTE({
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
						value: "{intData>/ObjectDetails}"
					});

					var oRichTextEditor3 = new RTE({
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
						value: "{intData>/AuditingandControlRequirements}"
					});

					var oRichTextEditor4 = new RTE({
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
						value: "{intData>/AIFFramework}"
					});

					var oRichTextEditor5 = new RTE({
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
						value: "{intData>/ErrorHandlingUsingCustomIDOC}"
					});

					var oRichTextEditor6 = new RTE({
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
						value: "{intData>/ManualInterfaceProgramLog}"
					});
					var oRichTextEditor7 = new RTE({
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
						value: "{intData>/ErrFTP}"
					});
					var oRichTextEditor8 = new RTE({
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
						value: "{intData>/ErrReport}"
					});
					var oRichTextEditor9 = new RTE({
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
						value: "{intData>/ErrReconciliation}"
					});
					var oRichTextEditor10 = new RTE({
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
						value: "{intData>/ErrReprocessing}"
					});
					var oRichTextEditor11 = new RTE({
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
						value: "{intData>/HTTPS_SFTP_}"
					});

					var oRichTextEditor12 = new RTE({
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
						value: "{intData>/UserAuth}"
					});

					var oRichTextEditor13 = new RTE({
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
						value: "{intData>/Encryp}"
					});

					that.getView().byId("idVerticalLayout3").addContent(oRichTextEditor);
					that.getView().byId("idVerticalLayout1").addContent(oRichTextEditor1);
					that.getView().byId("idVerticalLayout2").addContent(oRichTextEditor2);
					that.getView().byId("idVerticalLayoutACR").addContent(oRichTextEditor3);
					that.getView().byId("idVerticalLayout4").addContent(oRichTextEditor4);
					that.getView().byId("idVerticalLayout5").addContent(oRichTextEditor5);
					that.getView().byId("idVerticalLayout6").addContent(oRichTextEditor6);
					that.getView().byId("idVerticalLayout7").addContent(oRichTextEditor7);
					that.getView().byId("idVerticalLayout8").addContent(oRichTextEditor8);
					that.getView().byId("idVerticalLayout9").addContent(oRichTextEditor9);
					that.getView().byId("idVerticalLayout10").addContent(oRichTextEditor10);
					that.getView().byId("idVerticalLayout11").addContent(oRichTextEditor11);
					that.getView().byId("idVerticalLayout12").addContent(oRichTextEditor12);
					that.getView().byId("idVerticalLayout13").addContent(oRichTextEditor13);
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
		getReviewData: function(flag) {
			this.getView().byId("reviewComment333").setVisible(flag);
			this.getView().byId("reviewComment1").setVisible(flag);
			this.getView().byId("reviewComment2").setVisible(flag);
			this.getView().byId("reviewComment3").setVisible(flag);
			this.getView().byId("reviewComment4").setVisible(flag);
			this.getView().byId("reviewComment9987").setVisible(flag);
			this.getView().byId("reviewComment9997").setVisible(flag);

		},
		onChangeVersionExisting: function(oevent) {
			this.changeVersionKeyFlag = true;
			var currentversion = oevent.getSource().getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var params = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			params = params.Projectkey;

			this.dataRead("E", versionno[1]);

		},
		onChange: function(oEvent) {

			if (oEvent.getSource().getSelectedKey() === "Middleware") {
				this.getOwnerComponent().getRouter().navTo("middlewareSpec");
			} else {
				this.getOwnerComponent().getRouter().navTo("interfaceTS");
			}
		},
		deleteFileintDataMapCheck: function(oEvent) {
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
							that.deleteFileintDataMap(sEvent);
						}

					}
				}
			);
		},
		deleteConvMapValidi: function(oEvent) {
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

				var oTable = this.getView().byId("tableAttachIntDeti");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "conversionUploadDatai",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDeti", "attachIntDetVisiblei");

			}
			oTable.setBusy(false);

		},
		deleteFileintDataMap: function(oEvent) {

			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachIntMap");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntMap",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataMap"), "attachIntMap", "attachIntMapVisible");

			}
			oTable.setBusy(false);

		},
		deleteFileintDataDetCheck: function(oEvent) {
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
							that.deleteFileintDataDet(sEvent);
						}

					}
				}
			);
		},
		deleteFileintDataDet: function(oEvent) {

			// var URI = oEvent.getSource().getActiveIcon();
			var URI = oEvent.getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachIntDet");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntDet",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");

			}
			oTable.setBusy(false);

		},
		onOutboundChange: function(oEvent) {
			if (oEvent.getSource().getSelectedKey() === "outbound") {
				this.byId("source").addSelectedKeys("hana");
			}
		},
		onDataExport: function(oEvent) {

			var oReadExcel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oReadExcel, "excelData");

			var oDataReadExcel = {

				EuserAcceptance: [],
				EuserAcceptTemp: ""

			};

			var oDataReadExcelSuccess = {

				EuserAcceptance: true,
				EuserAcceptTemp: true

			};

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			if (!oParam) {
				return;
			}

			var EiCountUA, EsUserAcptCols;
			for (EiCountUA = 0; EiCountUA < 10; EiCountUA++) {

				oDataReadExcel.EuserAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (EiCountUA + 1);

				callServices.fnGetDataMainTable(oParam, oDataReadExcel, "EuserAcceptTemp", oDataReadExcelSuccess);
				if (oDataReadExcelSuccess.EuserAcceptTemp) {
					if (oDataReadExcel.EuserAcceptTemp) {
						EsUserAcptCols = oDataReadExcel.EuserAcceptTemp.split("~");
						if (EsUserAcptCols && EsUserAcptCols.length >= 7) { //6
							oDataReadExcel.EuserAcceptance.push({
								Estep: EsUserAcptCols[0],
								EtestType: EsUserAcptCols[1],
								Escenario: EsUserAcptCols[2],
								EtestData: EsUserAcptCols[3],
								EstepsPer: EsUserAcptCols[4],
								EactualResults: EsUserAcptCols[5],
								EexpectedResults: EsUserAcptCols[6],
								Eflag: true
							});
						}
					} else {
						continue;
					}
				} else {
					break;
				}
			}

			oReadExcel.setData(oDataReadExcel);
			oReadExcel.refresh(true);
			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ","
				}),

				// Pass in the model created above
				models: oReadExcel,

				// binding information for the rows aggregation
				rows: {
					path: "/EuserAcceptance"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "Step No",
					template: {
						content: "{Estep}"
					}
				}, {
					name: "Test Type",
					template: {
						content: "{EtestType}"
					}
				}, {
					name: "Scenario",
					template: {
						content: "{Escenario}"
					}
				}, {
					name: "Test Data",
					template: {
						content: "{EtestData}"
					}
				}, {
					name: "Steps Performed",
					template: {
						content: "{EstepsPer}"
					}
				}, {
					name: "Actual Results",
					template: {
						content: "{EactualResults}"
					}
				}, {
					name: "Expected Results",
					template: {
						content: "{EexpectedResults}"
					}
				}]
			});
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1; //January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}

			today = yyyy + '_' + mm + '_' + dd;
			// download exported file
			oExport.saveFile("FS_UAT_" + today).catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},
		handleSelectionFinishFrequency: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			for (var i = 0; i < selectedItems.length; i++) {
				if (selectedItems[i].getText() == "Other") {
					this.byId("otherfreqencyLabel").setVisible(true);
					this.byId("otherfrequency").setVisible(true);
				} else {
					this.byId("otherfreqencyLabel").setVisible(false);
					this.byId("otherfrequency").setVisible(false);

				}
			}
		},
		handleSelectionFinishTarget: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			for (var i = 0; i < selectedItems.length; i++) {
				if (selectedItems[i].getText() == "Others") {
					this.byId("othertargetLabel").setVisible(true);
					this.byId("othertarget").setVisible(true);
				} else {
					this.byId("othertargetLabel").setVisible(false);
					this.byId("othertarget").setVisible(false);

				}
			}
		},
		handleSelectionFinishImpact: function(oEvent) {
			var selectedItems = oEvent.getParameter("selectedItems");
			for (var i = 0; i < selectedItems.length; i++) {
				if (selectedItems[i].getText() == "Others") {
					this.byId("otherimpactLabel").setVisible(true);
					this.byId("otherimpact").setVisible(true);
				} else {
					this.byId("otherimpactLabel").setVisible(false);
					this.byId("otherimpact").setVisible(false);

				}
			}
		},
		handleSelectionChangeSource: function(oEvent) {
			var selectedItems = this.byId("source").getSelectedItem().getText();

			if (selectedItems == "Others") {
				this.byId("othersourceLabel").setVisible(true);
				this.byId("othersource").setVisible(true);
			} else {
				this.byId("othersourceLabel").setVisible(false);
				this.byId("othersource").setVisible(false);

			}

		},
		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S1";
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			var title = "Interface FS - Object 2014 - Material Master Update";
			this.byId("page").setTitle(title);

			this.byId("doctype").setSelectedKey("Functional");
			//var type = sap.ui.getCore().getModel().getData().Key;
			// this.byId("otype").setSelectedKey(type);
			this.byId("outputrequirements").setVisible(false);
			this.byId("postload1").setVisible(false);
			this.byId("table0").setVisible(false);
			this.byId("upload1").setVisible(false);
			//this.byId("enhancementreq").setVisible(false);
			// this.byId("processarea").setVisible(false);
			this.byId("itype").setVisible(false);
			this.byId("source").setVisible(false);
			this.byId("interfaceType").setVisible(false);
			this.byId("target").setVisible(false);
			this.byId("sb1").setVisible(false);
			this.byId("sb2").setVisible(false);
			this.byId("frequency").setVisible(false);
			this.byId("impactedSystem").setVisible(false);
			// this.byId("Comp").setVisible(false);
			//this.byId("accessMethod").setVisible(false);
			//this.byId("customTablePanel").setVisible(false);
			//this.byId("Printreq").setVisible(false);
			//this.byId("FT").setVisible(false);
			//this.byId("R1").setVisible(false);
			//this.byId("R2").setVisible(false);
			this.byId("mappingSection1").setVisible(false);
			this.byId("mappingSection2").setVisible(false);

			//this.byId("errHandl").setVisible(false);
			//this.byId("alertNotifSec").setVisible(false);
			//this.byId("Summary").setVisible(false);
			this.byId("triggerPnt").setVisible(false);
			this.byId("usrIntrf").setVisible(false);
			//this.byId("stages").setVisible(false);
			//this.byId("specialReq").setVisible(false);
			this.byId("approvalTab").setVisible(false);
			//this.byId("objectDetails").setVisible(false);
			// this.byId("approvRoles").setVisible(false);

			// var sObjectTitle = "Interface";
			this.byId("approvalTab").setVisible(false);
			// this.byId("processarea").setVisible(true);
			this.byId("itype").setVisible(true);
			this.byId("source").setVisible(true);
			this.byId("interfaceType").setVisible(true);
			this.byId("target").setVisible(true);
			this.byId("sb1").setVisible(true);
			this.byId("sb2").setVisible(true);
			this.byId("frequency").setVisible(true);
			this.byId("impactedSystem").setVisible(true);
			this.byId("mappingSection1").setVisible(true);
			this.byId("mappingSection2").setVisible(true);
			this.byId("fricedesc").setVisible(true);
			this.byId("storynumber").setVisible(true);
			// this.byId("objectDetails").setVisible(true);

			this.byId("commlogSection").setVisible(false);
			this.byId("reviewSection").setVisible(false);
			this.byId("versiontypeNew").setVisible(false);
			this.byId("versiontypeExisting").setVisible(false);
			//this.byId("reviewComment0").setVisible(false);
			this.byId("reviewComment1").setVisible(false);
			this.byId("reviewComment2").setVisible(false);
			this.byId("reviewComment3").setVisible(false);
			this.byId("reviewComment4").setVisible(false);

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (oParam) {
				if (oParam.projectid) {
					this.oProjectId = oParam.projectid;
					delete oParam.projectid;
				}
			}

			var obj = sap.ui.getCore().getModel().getData().Obj;
			switch (obj) {
				case "new":
					this.byId("versiontypeNew").setVisible(true);
					this.getDataForInterface("N");
					break;
				case "existing":
					this.byId("versiontypeExisting").setVisible(true);
					//this.byId("reviewComment0").setVisible(true);
					this.byId("reviewComment1").setVisible(true);
					this.byId("reviewComment2").setVisible(true);
					this.byId("reviewComment3").setVisible(true);
					this.byId("reviewComment4").setVisible(true);
					this.byId("commlogSection").setVisible(true);
					this.byId('versiontypeExisting').destroyItems();
					var oSelect = this.getView().byId("versiontypeExisting");
					var newItem = new sap.ui.core.Item({
						key: "Version 1.0",
						text: "Version 1.0"
					});
					oSelect.addItem(newItem);
					this.getDataForInterface("E");
					break;
			}

		},
		// clearData: function() {

		// 	// oModelInterface.setData(oDataInterface);
		// },
		onPrint: function() {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var versionno = currentversion.split(" ");
			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&projectid=" + projectID;
				sap.m.URLHelper.redirect(
					"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Interface_FS.html?sap-language=EN" + mParameter,
					true
				);
			}

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
			} else if (oButton.getId().includes("ExecutiveSummaryHelp")) {
				this._menu.removeAllItems();
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Overview"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Business Driver"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "As-Is process"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "To-be process"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Business Risks/Issues"
				}));
				this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
			} else if (oButton.getId().includes("BProcessHelp")) {
				this._menu.removeAllItems();
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Process Description and Flow"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Data Source"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Filtering Criteria"
				}));
				this._menu.addItem(new sap.ui.unified.MenuItem({
					text: "Mapping and Transformation"
				}));
				this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
			}

		},
		/**
		 * Event handler  for navigating back.
		 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("first");

		},
		onLiveChangeObjectDetails: function() {

			var str = this.byId("objectdetails").getValue();
			this.byId("fsObjDetCharCount").setText("Characters: " + str.length);
			this.byId("fsObjDetCharCount").setVisible(true);
			this.byId("fsObjDetErr").setVisible(false);
			/*	if (str.length === 500) {
					this.byId("fsObjDetErr").setVisible(true);
				} else {
					this.byId("fsObjDetErr").setVisible(false);
				}*/
		},
		onLiveChangeDependancy: function() {
			var str = this.byId("dependancy").getValue();
			this.byId("fsDependencyCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsDependency").setVisible(true);
			} else {
				this.byId("fsDependency").setVisible(false);
			}
		},
		onLiveChangeSecurity: function() {
			var str = this.byId("security").getValue();
			this.byId("fsSecurityCharCount").setText("Characters: " + str.length);
			/*if (str.length === 500) {
				this.byId("fsSecurityErr").setVisible(true);
			} else {
				this.byId("fsSecurityErr").setVisible(false);
			}*/
		},
		onLiveChangeAlertNotif: function() {
			var str = this.byId("alertNotif").getValue();
			this.byId("fsAlertNotifCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsAlertNotifErr").setVisible(true);
			} else {
				this.byId("fsAlertNotifErr").setVisible(false);
			}
		},
		onLiveChangeApprovalRoles: function() {
			var str = this.byId("security").getValue();
			this.byId("fsApprovRolesCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsApprovRolesErr").setVisible(true);
			} else {
				this.byId("fsApprovRolesErr").setVisible(false);
			}
		},
		onLiveChangeErrHandl: function() {
			var str = this.byId("errHanlFld").getValue();
			this.byId("fsErrHandlCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsErrHandlErr").setVisible(true);
			} else {
				this.byId("fsErrHandlErr").setVisible(false);
			}
		},
		onSelectTriggerPoint: function(oEvent) {
			if (oEvent.getSource().getId() === this.getView().byId("triggerPntBtn3").getId()) {
				this.byId("manualTrigPt").setVisible(true);
			} else {
				this.byId("manualTrigPt").setVisible(false);
			}

		},
		onSelectUIAccess: function(oEvent) {
			if (oEvent.getSource().getId() === this.getView().byId("UITypeBtn5").getId()) {
				this.byId("otherUIPts").setVisible(true);
			} else {
				this.byId("otherUIPts").setVisible(false);
			}
		},
		
			onHold: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'ON HOLD';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Status_FS);
			this.getView().byId("oBTHold").setVisible(false);
			},
		getDataForInterface: function(sRequestType, versionNo) {

			var that = this;

			// var oParam = {
			// 	repid: 'INT-083b-US-R-2574',
			// 	projectkey: 'INT',
			// 	processid: 'PR001',
			// 	stepno: 'S1',
			// 	fieldname: ''
			// };
			//var oDataInterface = {};
			// var oUserAcceptance = {
			// 	userAcceptance: []
			// };
			// oUserAcceptance.userAcceptance[0] = {};
			// oUserAcceptance.userAcceptance[1] = {};

			var oModelInterface = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelInterface, "intData");
			this.getView().byId("fsSecurityCharCount").setText("");
			this.getView().byId("fsObjDetCharCount").setText("");

			var oDataInterface = {
				Approver: "",
				Reviewer: "",
				Author: "",
				ObjectID: "",
				ProcessingMode: "",
				Source: "",
				InterfaceType: "",
				Frequency: "",
				ImpactedSystem: "",
				ObjectTitle: "",
				Title: "",
				StoryNumber: "",
				Target: "",
				InterfaceDirection: "",
				ObjectDetails: "",
				ProcessingType: "",
				OBPRating: 0,
				OBPReviewComment: "",
				Mapping: "",
				MappingRating: 0,
				MappingReviewComment: "",
				AIFFramework: "",
				ErrorHandlingUsingCustomIDOC: "",
				ManualInterfaceProgramLog: "",
				FTP: "",
				ExceptionHandling: "",
				ExceptionHandlingOptions: "",
				ExceptionHandlingRating: 0,
				ExceptionHandlingComment: "",
				Security: "",
				SecuritySection: "",
				SecurityRating: 0,
				SecurityComment: "",
				HTTPSSFTP: "",
				UserAuthorization: "",
				Encryption: "",
				Step: "",
				TestType: "",
				Scenario: "",
				StepsPerformed: "",
				ActualResults: "",
				CommLog: [],
				CommLog1: "",
				CommLogTemp: "",
				userAcceptance: [],
				userAcceptTemp: "",
				UAT1: "",
				IntDet: "",
				IntMap: "",
				STATUS: "",
				OtherImpact: "",
				OtherFrequency: "",
				OtherTarget: "",
				OtherSource: "",
				es1: "",
				tp1: "",
				AuditingandControlRequirements: ""
			};

			this.oDataInterfaceSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectID: false,
				ProcessingMode: false,
				Source: false,
				InterfaceType: false,
				Frequency: false,
				es1: false,
				tp1: false,
				ImpactedSystem: false,
				ObjectTitle: false,
				Title: false,
				StoryNumber: false,
				Target: false,
				InterfaceDirection: false,
				ProcessingType: false,
				ObjectDetails: false,
				OBPRating: false,
				OBPReviewComment: false,
				Mapping: false,
				MappingRating: false,
				MappingReviewComment: false,
				AIFFramework: false,
				ErrorHandlingUsingCustomIDOC: false,
				ManualInterfaceProgramLog: false,
				FTP: false,
				ExceptionHandling: false,
				ExceptionHandlingOptions: false,
				ExceptionHandlingRating: false,
				ExceptionHandlingComment: false,
				Security: false,
				SecuritySection: false,
				SecurityRating: false,
				SecurityComment: false,
				HTTPSSFTP: false,
				UserAuthorization: false,
				Encryption: false,
				Step: false,
				OtherImpact: false,
				TestType: false,
				Scenario: false,
				StepsPerformed: false,
				ActualResults: false,
				CommLog: false,
				CommLogTemp: false,
				userAcceptance: false,
				userAcceptTemp: false,
				STATUS: false,
				OtherFrequency: false,
				OtherTarget: false,
				OtherSource: false,
				AuditingandControlRequirements: false
			};

			if (sRequestType === "N") {
				this.byId("frequency").removeAllSelectedItems();
				this.byId("target").removeAllSelectedItems();
				this.byId("impactedSystem").removeAllSelectedItems();

				this.byId("RB2-11").setSelected(true);
				this.byId("RB1-1").setSelected(true);
				this.byId("RB1-11").setSelected(true);
				this.byId("CB-1").setSelected(false);
				this.byId("CB-2").setSelected(false);
				this.byId("CB-3").setSelected(false);
				this.byId("CB-4").setSelected(false);
				this.byId("CB2-01").setSelected(false);
				this.byId("CB2-02").setSelected(false);
				this.byId("CB2-03").setSelected(false);
				this.byId("ri6").setValue(0);
				this.getView().byId("ri15").setValue(0);
				this.getView().byId("ri9").setValue(0);
				this.getView().byId("ri16").setValue(0);

				var oDataInterface = {
					Approver: "",
					Reviewer: "",
					Author: "",
					ObjectID: "",
					ProcessingMode: "",
					Source: "",
					InterfaceType: "",
					Frequency: "",
					ImpactedSystem: "",
					OtherFrequency: "",
					ObjectTitle: "",
					Title: "",
					StoryNumber: "",
					Target: "",
					InterfaceDirection: "",
					ProcessingType: "",
					ObjectDetails: "",
					OBPRating: 0,
					OBPReviewComment: "",
					Mapping: "",
					MappingRating: 0,
					MappingReviewComment: "",
					AIFFramework: "",
					ErrorHandlingUsingCustomIDOC: "",
					ManualInterfaceProgramLog: "",
					FTP: "",
					ExceptionHandling: "",
					ExceptionHandlingOptions: "",
					ExceptionHandlingRating: 0,
					ExceptionHandlingComment: "",
					Security: "",
					SecuritySection: "",
					SecurityRating: 0,
					SecurityComment: "",
					HTTPSSFTP: "",
					UserAuthorization: "",
					OtherImpact: "",
					Encryption: "",
					Step: "",
					TestType: "",
					Scenario: "",
					StepsPerformed: "",
					ActualResults: "",
					CommLog: [],
					CommLog1: "",
					CommLogTemp: "",
					userAcceptance: [{
						"step": "",
						"testType": "",
						"scenario": "",
						"testData": "",
						"stepsPer": "",
						"actualResults": "",
						"expectedResults": ""
					}],
					userAcceptTemp: "",
					UAT1: "",
					OtherTarget: "",
					OtherSource: "",
					es1: "",
					tp1: ""

				};
				var procArea = callServices.fnGetProccessArea(oDataInterface);
				var availSys = callServices.fnGetAvailableSystems(oDataInterface);
				var intType = callServices.fnGetInterfaceType(oDataInterface);
				var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				if (!oParam) {
					return;
				}
				var intDataDet = {
					attachIntDet: [],
					attachIntDetVisible: false,
					attachIntDeti: [],
					attachIntDetVisiblei: false
				};
				var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
				this.getView().setModel(intDataDetJSON, "intDataDet");

				var intDataMap = {
					attachIntMap: [],
					attachIntMapVisible: false
				};
				var intDataMapJSON = new sap.ui.model.json.JSONModel(intDataMap);
				this.getView().setModel(intDataMapJSON, "intDataMap");

				this.readAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntMap",
					TYPE: "O"
				});
				this.readAttachments1({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntDet",
					TYPE: "O"
				});
				// oParam.fieldname = "Functional Specification";
				// oDataInterface.doctype = callServices.fnCallMainTable(oParam);

				// oParam.fieldname = "Version 1.0";
				// oDataInterface.complexity = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Approver";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Approver", this.oDataInterfaceSuccess);
				// oDataInterface.Approver = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Reviewer";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Reviewer", this.oDataInterfaceSuccess);
				// oDataInterface.Reviewer = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Author";
				// oDataInterface.Author = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Author", this.oDataInterfaceSuccess);

				/*	oParam.fieldname = "Object ID";
					// oDataInterface.ObjectID = callServices.fnCallMainTable(oParam);
					callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectID", this.oDataInterfaceSuccess);*/

				oDataInterface.ObjectID = oParam.Repid;

				oParam.Fieldname = "Processing Mode";
				//oDataInterface.ProcessingMode = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessingMode", this.oDataInterfaceSuccess);

				oParam.Fieldname = "es1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "es1", this.oDataInterfaceSuccess);

				oParam.Fieldname = "tp1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "tp1", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Source";
				//oDataInterface.Source = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Source", this.oDataInterfaceSuccess);
				if (oDataInterface.Source) {
					switch (oDataInterface.Source) {
						// case "S/4 HANA":
						// 	key = "hana";
						// 	break;
						// case "BW":
						// 	key = "bw";
						// 	break;
						// case "BPC":
						// 	key = "bpc";
						// 	break;
						// case "Ariba":
						// 	key = "ariba";
						// 	break;
						// case "MDG":
						// 	key = "mdg";
						// 	break;
						// case "Vertex":
						// 	key = "vertex";
						// 	break;
						// case "Cloud based-SAP/Non-SAP ":
						// 	key = "cloud";
						// 	break;
						// case "SAP XI/PI":
						// 	key = "xi";
						// 	break;
						// case "HCI-PI":
						// 	key = "pi";
						// 	break;
						// case "CAS":
						// 	key = "CAS";
						// 	break;
						// case "Vistex":
						// 	key = "Vistex";
						// 	break;
						// case "HCI-DS":
						// 	key = "ds";
						// 	break;
						// case "IBP":
						// 	key = "ibp";
						// 	break;
						case "Others":
							//							key = "others1";
							this.byId("othersourceLabel").setVisible(true);
							this.byId("othersource").setVisible(true);
							oParam.Fieldname = "OtherSource";
							//oDataInterface.Source = callServices.fnCallMainTable(oParam);
							callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherSource", this.oDataInterfaceSuccess);
							break;
					}
					//					oDataInterface.Source = key;
				}

				oParam.Fieldname = "InterfaceType";
				//oDataInterface.ImpactedSystem = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceType", this.oDataInterfaceSuccess);
				/*if (oDataInterface.InterfaceType) {
					switch (oDataInterface.InterfaceType) {
						case "File Interface":
							key = "FI";
							break;
						case "Proxy Based Interface":
							key = "PBI";
							break;
						case "IDOC Based Interface":
							key = "IBI";
							break;
						case "Service Based Interface – OData":
							key = "SBI";
							break;
						case "SOAP API":
							key = "SA";
							break;
						case "HCI Interface":
							key = "HCI Interface";
							break;
					}
					oDataInterface.InterfaceType = key;
				}*/

				oParam.Fieldname = "Frequency";
				//oDataInterface.Frequency = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Frequency", this.oDataInterfaceSuccess);
				if (oDataInterface.Frequency) {
					var sFreq = oDataInterface.Frequency.split("~");
					for (var iFreq = 0; iFreq < sFreq.length; iFreq++) {
						var key;
						var text;
						switch (sFreq[iFreq]) {
							case "Annually":
								key = "0";
								break;
							case "Quarterly":
								key = "1";
								break;
							case "Monthly":
								key = "2";
								break;
							case "Weekly":
								key = "3";
								break;
							case "Daily":
								key = "4";
								break;
							case "On Demand":
								key = "5";
								break;
							case "Other":
								key = "6";
								this.byId("otherfreqencyLabel").setVisible(true);
								this.byId("otherfrequency").setVisible(true);
								oParam.Fieldname = "OtherFrequency";
								//oDataInterface.Source = callServices.fnCallMainTable(oParam);
								callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherFrequency", this.oDataInterfaceSuccess);
								break;
						}
						that.getView().byId("frequency").addSelectedKeys(key);
						// var oItemTemplate = new sap.ui.core.Item({
						// 	key: key,
						// 	text: text
						// });
						// that.getView().byId("impactedSystem").addSelectedItem(oItemTemplate);
					}
				}

				oParam.Fieldname = "Impacted System";
				//oDataInterface.ImpactedSystem = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ImpactedSystem", this.oDataInterfaceSuccess);
				if (oDataInterface.ImpactedSystem) {
					var sImpact = oDataInterface.ImpactedSystem.split("~");
					for (var iImpact = 0; iImpact < sImpact.length; iImpact++) {
						/*switch (sImpact[iImpact]) {
							case "S/4 HANA":
								key = "hana";
								break;
							case "BW":
								key = "bw";
								break;
							case "BPC":
								key = "bpc";
								break;
							case "Ariba":
								key = "ariba";
								text = sImpact[iImpact];
								break;
							case "MDG":
								key = "mdg";
								break;
							case "Vertex":
								key = "vertex";
								break;
							case "Cloud based-SAP/Non-SAP":
								key = "cloud";
								break;
							case "SAP XI/PI":
								key = "xi";
								break;
							case "HCI-PI":
								key = "pi";
								break;
							case "CAS":
							key = "CAS";
								break;
							case "Vistex":
							key = "Vistex";
								break;
							case "HCI-DS":
								key = "ds";
								break;
							case "IBP":
								key = "ibp";
								break;
							case "Others":
								key = "others1";
								this.byId("otherimpactLabel").setVisible(true);
							this.byId("otherimpact").setVisible(true);
							oParam.fieldname = "OtherImpact";
							//oDataInterface.Source = callServices.fnCallMainTable(oParam);
							callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherImpact", this.oDataInterfaceSuccess);
								break;
						}*/
						that.getView().byId("impactedSystem").addSelectedKeys(sImpact[iImpact]);
						// var oItemTemplate = new sap.ui.core.Item({
						// 	key: key,
						// 	text: text
						// });
						// that.getView().byId("impactedSystem").addSelectedItem(oItemTemplate);
					}
				}

				oParam.Fieldname = "Object Title";
				// oDataInterface.ObjectTitle = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectTitle", this.oDataInterfaceSuccess);

				oDataInterface.Title = "Interface - " + oDataInterface.ObjectID + " - " + oDataInterface.ObjectTitle;

				oParam.Fieldname = "Story%20Number%2FComment";
				// oDataInterface.StoryNumberComment = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "StoryNumber", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Target";
				// oDataInterface.Target = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Target", this.oDataInterfaceSuccess);
				if (oDataInterface.Target) {
					var sTarget = oDataInterface.Target.split("~");
					for (var iTarget = 0; iTarget < sTarget.length; iTarget++) {
						/*switch (sTarget[iTarget]) {
							case "S/4 HANA":
								key = "hana";
								// text = "S/4 HANA";
								break;
							case "BW":
								key = "bw";
								break;
							case "BPC":
								key = "bpc";
								break;
							case "Ariba":
								key = "ariba";
								break;
							case "MDG":
								key = "mdg";
								break;
							case "Vertex":
								key = "vertex";
								break;
							case "CAS":
							key = "CAS";
								break;
							case "Vistex":
							key = "Vistex";
								break;
							case "Cloud based-SAP/Non-SAP":
								key = "cloud";
								break;
							case "SAP XI/PI":
								key = "xi";
								break;
							case "HCI-PI":
								key = "pi";
								break;
							case "HCI-DS":
								key = "ds";
								break;
							case "IBP":
								key = "ibp";
								break;
							case "Others":
								key = "others1";
								this.byId("othertargetLabel").setVisible(true);
								this.byId("othertarget").setVisible(true);
								oParam.Fieldname = "OtherTarget";
								//oDataInterface.Source = callServices.fnCallMainTable(oParam);
								callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherTarget", this.oDataInterfaceSuccess);
								break;
						}*/
						that.getView().byId("target").addSelectedKeys(sTarget[iTarget]);
					}
				}
				oParam.Fieldname = "Interface Direction";
				// oDataInterface.InterfaceDirection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceDirection", this.oDataInterfaceSuccess);
				switch (oDataInterface.InterfaceDirection) {
					case "Inbound":
						this.byId("RB2-11").setSelected(true);
						break;
					case "Outbound":
						this.byId("RB2-12").setSelected(true);
						break;
					case "Bidirectional":
						this.byId("RB2-13").setSelected(true);
						break;
				}

				oParam.Fieldname = "Processing Type";
				// oDataInterface.ProcessingType = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessingType", this.oDataInterfaceSuccess);
				switch (oDataInterface.ProcessingType) {
					case "Synchronous":
						this.byId("RB1-1").setSelected(true);
						break;
					case "Asynchronous":
						this.byId("RB1-2").setSelected(true);
						break;
					case "Others":
						this.byId("RB1-3").setSelected(true);
						break;
				}

				oParam.Fieldname = "Object Details%2FBusiness Requirement%2FProcess Flow";
				// oDataInterface.ObjectDetails = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectDetails", this.oDataInterfaceSuccess);

				if (oDataInterface.ObjectDetails) {
					var len = oDataInterface.ObjectDetails.length;
					this.byId("fsObjDetCharCount").setText("Characters: " + len);

				}

				oParam.Fieldname = "OBP%20Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPRating", this.oDataInterfaceSuccess);
				oDataInterface.OBPRating = parseFloat(oDataInterface.OBPRating);

				oParam.Fieldname = "OBP%20Review%2FComments";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "OBPReviewCommentR1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewCommentR1", this.oDataInterfaceSuccess);
				oDataInterface.OBPReviewCommentR1 = parseFloat(oDataInterface.OBPReviewCommentR1);

				oParam.Fieldname = "OBPReviewComment1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewComment1", this.oDataInterfaceSuccess);

				oParam.Fieldname = "OBPReviewCommentR2";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewCommentR2", this.oDataInterfaceSuccess);
				oDataInterface.OBPRating = parseFloat(oDataInterface.OBPReviewCommentR2);

				oParam.Fieldname = "OBPReviewComment2";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewComment2", this.oDataInterfaceSuccess);

				oParam.Fieldname = "OBPReviewCommentR3";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewCommentR3", this.oDataInterfaceSuccess);
				oDataInterface.OBPRating = parseFloat(oDataInterface.OBPReviewComment1);

				oParam.Fieldname = "OBPReviewComment3";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewComment3", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Mapping";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Mapping", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Mapping%20Rating";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MappingRating", this.oDataInterfaceSuccess);
				oDataInterface.MappingRating = parseFloat(oDataInterface.MappingRating);

				oParam.Fieldname = "Mapping%20Review%2FComment";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MappingReviewComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "AIF Framework";
				// oDataInterface.AIFFramework = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AIFFramework", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Error Handling Using Custom IDOC";
				// oDataInterface.ErrorHandlingUsingCustomIDOC = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrorHandlingUsingCustomIDOC", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Manual Interface Program Log";
				// oDataInterface.ManualInterfaceProgramLog = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ManualInterfaceProgramLog", this.oDataInterfaceSuccess);

				oParam.Fieldname = "FTP";
				// oDataInterface.FTP = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "FTP", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Exceptional Handling";
				// oDataInterface.ExceptionHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandling", this.oDataInterfaceSuccess);

				oParam.Fieldname = "AuditingandControlRequirements";
				// oDataInterface.ExceptionHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AuditingandControlRequirements", this.oDataInterfaceSuccess);
				if (!oDataInterface.AuditingandControlRequirements) {
					oDataInterface.AuditingandControlRequirements =
						"<b>Special Processing Requirement</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Routing Rules</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
				}
				oParam.Fieldname = "Exceptional Handling Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingRating", this.oDataInterfaceSuccess);
				oDataInterface.ExceptionHandlingRating = parseFloat(oDataInterface.ExceptionHandlingRating);

				oParam.Fieldname = "Exceptional Handling Comment";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Exception Handling Options";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingOptions", this.oDataInterfaceSuccess);
				if (oDataInterface.ExceptionHandlingOptions) {
					var sExcepHand = oDataInterface.ExceptionHandlingOptions.split("~");
					for (var iExcepHand = 0; iExcepHand < sExcepHand.length; iExcepHand++) {
						switch (sExcepHand[iExcepHand]) {
							case "AIF Framework":
								that.byId("CB-1").setSelected(true);
								break;
							case "Error Handling Using Custom IDOC":
								that.byId("CB-2").setSelected(true);
								break;
							case "Manual Interface Program Log":
								that.byId("CB-3").setSelected(true);
								break;
							case "FTP":
								that.byId("CB-4").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Security";
				// oDataInterface.TypeofInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Security", this.oDataInterfaceSuccess);
				if (oDataInterface.Security) {
					var sSecurity = oDataInterface.Security.split("~");
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

				oParam.Fieldname = "Security Section";
				// oDataInterface.Security = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecuritySection", this.oDataInterfaceSuccess);

				if (oDataInterface.SecuritySection) {
					var len = oDataInterface.SecuritySection.length;
					this.byId("fsSecurityCharCount").setText("Characters: " + len);

				}

				oParam.Fieldname = "Security Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecurityRating", this.oDataInterfaceSuccess);
				oDataInterface.SecurityRating = parseFloat(oDataInterface.SecurityRating);

				oParam.Fieldname = "Security Comment";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecurityComment", this.oDataInterfaceSuccess);

				// oParam.fieldname = "HTTPS/SFTP";
				// // oDataInterface.HTTPSSFTP = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "HTTPSSFTP", this.oDataInterfaceSuccess);

				// oParam.fieldname = "User Authorization";
				// // oDataInterface.UserAuthorization = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "UserAuthorization", this.oDataInterfaceSuccess);

				// oParam.fieldname = "Encryption";
				// // oDataInterface.Encryption = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "Encryption", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Step";
				// oDataInterface.Step = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Step", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Test Type";
				// oDataInterface.TestType = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TestType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Scenario";
				// oDataInterface.Scenario = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Scenario", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Steps Performed";
				// oDataInterface.StepsPerformed = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "StepsPerformed", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ActualResults";
				// oDataInterface.ActualResults = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ActualResults", this.oDataInterfaceSuccess);

				// oParam.fieldname = "CommLog";
				// oDataInterface.CommLog = [];
				// // oDataInterface.CommLog1 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "CommLog1", this.oDataInterfaceSuccess);
				// var sCommLogCol1;
				// if (oDataInterface.CommLog1) {
				// 	sCommLogCol1 = oDataInterface.CommLog1.split("~");
				// 	if (sCommLogCol1.length > 1) {
				// 		var data1 = {};
				// 		data1.IssueDesc = sCommLogCol1[0];
				// 		data1.Priority = sCommLogCol1[1];
				// 		data1.DateLogg = new Date(sCommLogCol1[2]);
				// 		data1.Status = sCommLogCol1[3];
				// 		data1.DateResol = new Date(sCommLogCol1[4]);
				// 		data1.Resolv = sCommLogCol1[5];
				// 		oDataInterface.CommLog.push(data1);
				// 	}
				// }

				//		debugger;

				var iCountUA, sUserAcptCols;
				//SOC Writwick 11 July 2018
				// for (iCountUA = 0;; iCountUA++) {
				for (iCountUA = 0; iCountUA < 5; iCountUA++) {
				//EOC Writwick 11 July 2018

					oDataInterface.userAcceptTemp = "";
					oParam.Fieldname = "FS_UA_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "userAcceptTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.userAcceptTemp) {
						if (oDataInterface.userAcceptTemp) {
							sUserAcptCols = oDataInterface.userAcceptTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 7) {

								$.each(sUserAcptCols, function(iIndex, sValue) {
									if ((sValue === "undefined") || (!sValue)) {
										sUserAcptCols[iIndex] = "";
									}
								});

								oDataInterface.userAcceptance.push({
									step: sUserAcptCols[0],
									testType: sUserAcptCols[1],
									scenario: sUserAcptCols[2],
									testData: sUserAcptCols[3],
									stepsPer: sUserAcptCols[4],
									actualResults: sUserAcptCols[5],
									expectedResults: sUserAcptCols[6],
									flag: true
								});
								stepID = sUserAcptCols[0];
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.userAcceptance.length === 0) {
					oDataInterface.userAcceptance.push({
						step: "1",
						testType: "",
						scenario: "",
						testData: "",
						stepsPer: "",
						actualResults: "",
						expectedResults: "",
						flag: false
					});
					stepID = 1;
				}

				//Comm Log Logic
				var iCountCommLog, aCommLogCols;
				//SOC Writwick 11 July 2018
				// for (iCountCommLog = 0;; iCountCommLog++) {
				for (iCountCommLog = 0; iCountCommLog < 5; iCountCommLog++) {
				//EOC Writwick 11 July 2018

					oDataInterface.CommLogTemp = "";
					//FS_CMLOG_1
					oParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "CommLogTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.CommLogTemp) {
						if (oDataInterface.CommLogTemp) {
							aCommLogCols = oDataInterface.CommLogTemp.split("~");
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

										// if (sValue === "" || sValue === "undefined" || sValue === "Invalid Date" || sValue === "null") {
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

								oDataInterface.CommLog.push({
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
				if (oDataInterface.CommLog.length === 0) {
					oDataInterface.CommLog.push({
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
			}
			if (sRequestType === "E") {
				var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				if (!oParam) {
					return;
				}
				oParam.Version = "1.0";
				if (versionNo) {
					oParam.Version = versionNo;
					var crNumber1 = sessionStorage.getItem("crNumber");
					if (crNumber1 !== "") {
						// this.getView().byId("storynumber").setValue(crNumber1);
						oDataInterface.StoryNumber = crNumber1;
					}
				} else {

					var num = 1;

					while (num > 0) {
						oParam.Fieldname = "STATUS_FS";
						callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_FS", this.oDataInterfaceSuccess);
						oDataInterface.versionLatest = oDataInterface.Status_FS;
						//SOC Writwick 12 July 2018
						// if (oDataInterface.versionLatest !== undefined) {
						if (oDataInterface.versionLatest !== "") {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							if (oDataInterface.versionLatest === "ACCEPTED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExisting");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							// oDataInterface.versionLatest = undefined;
							// oDataInterface.Status_FS = undefined;
							oDataInterface.versionLatest = "";
							oDataInterface.Status_FS = "";

						} else if (num > 1){
							//versiontypeExisting  
							//Version 3.0
							//this.byId("versiontypeExisting").setValueState("Version 3.0");
							oParam.Version = parseInt(oParam.Version) - 1;
							oParam.Version = (oParam.Version).toString() + ".0";
							var selectedKey = "Version " + oParam.Version;
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

				oParam.Fieldname = "STATUS_FS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_FS", this.oDataInterfaceSuccess);
				var statusLastVersion = oDataInterface.Status_FS;
				var statusLast = statusLastVersion;
				
					if (statusLastVersion === 'ON HOLD' && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {

					this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					oCurrentView.byId("oBTPrint").setVisible(true);

					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					this.byId('versiontypeExisting').removeItem(vItem);

				} else {
					//		this.getView().byId("oBTHold").setVisible(false);
					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.CROpen = sessionStorage.getItem("crData");

					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

				}

			}
				if (statusLastVersion === "ACCEPTED" && versionNo === undefined) {

					var crNumber = sessionStorage.getItem("crNumber");
					if (crNumber === "") {
						// this.getView().byId("storynumber").setValue("");
						this.getView().byId("oBTHold").setVisible(true);
						oDataInterface.StoryNumber = "";
						oParam.Version = parseInt(oParam.Version);
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);

						var vItem = parseInt(oParam.Version);
						this.byId('versiontypeExisting').removeItem(vItem);

					} else {
						// this.getView().byId("storynumber").setValue(crNumber);
						oDataInterface.StoryNumber = crNumber;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);
					}

				}
				statusLastVersion = undefined;
				oDataInterface.Status_FS = undefined;

				var procArea = callServices.fnGetProccessArea(oDataInterface);
				var availSys = callServices.fnGetAvailableSystems(oDataInterface);
				var intType = callServices.fnGetInterfaceType(oDataInterface);

				var intDataDet = {
					attachIntDet: [],
					attachIntDetVisible: false,
					attachIntDeti: [],
					attachIntDetVisiblei: false
				};
				var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
				this.getView().setModel(intDataDetJSON, "intDataDet");
				var intDataMap = {
					attachIntMap: [],
					attachIntMapVisible: false
				};
				var intDataMapJSON = new sap.ui.model.json.JSONModel(intDataMap);
				this.getView().setModel(intDataMapJSON, "intDataMap");

				this.readAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntMap",
					TYPE: "O"
				});
				this.readAttachments1({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntDet",
					TYPE: "O"
				});
				this.checkStatus();
				if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
						sessionStorage.getItem("crNumber") !== "")) {
					oParam.Version = parseInt(oParam.Version) - 1;
					oParam.Version = (oParam.Version).toString() + ".0";
				}
				// oParam.fieldname = "Functional Specification";
				// oDataInterface.doctype = callServices.fnCallMainTable(oParam);

				// oParam.fieldname = "Version 1.0";
				// oDataInterface.complexity = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Approver";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Approver", this.oDataInterfaceSuccess);
				// oDataInterface.Approver = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Reviewer";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Reviewer", this.oDataInterfaceSuccess);
				// oDataInterface.Reviewer = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Author";
				// oDataInterface.Author = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Author", this.oDataInterfaceSuccess);

				/*	oParam.fieldname = "Object ID";
					// oDataInterface.ObjectID = callServices.fnCallMainTable(oParam);
					callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectID", this.oDataInterfaceSuccess);*/

				oDataInterface.ObjectID = oParam.Repid;

				oParam.Fieldname = "Processing Mode";
				//oDataInterface.ProcessingMode = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessingMode", this.oDataInterfaceSuccess);
				switch (oDataInterface.ProcessingMode) {
					case "Batch":
						this.byId("RB1-11").setSelected(true);
						break;
					case "Real Time":
						this.byId("RB1-12").setSelected(true);
						break;
					case "Near Real Time":
						this.byId("RB1-13").setSelected(true);
						break;
				}
				oParam.Fieldname = "es1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "es1", this.oDataInterfaceSuccess);
				if (!oDataInterface.es1) {
					oDataInterface.es1 =
						"<b>Overview</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Operational Considerations</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Expected system Load:</b>";
				}

				oParam.Fieldname = "tp1";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "tp1", this.oDataInterfaceSuccess);

				oParam.Fieldname = "AuditingandControlRequirements";
				// oDataInterface.ExceptionHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AuditingandControlRequirements", this.oDataInterfaceSuccess);
				if (!oDataInterface.AuditingandControlRequirements) {
					oDataInterface.AuditingandControlRequirements =
						"<b>Special Processing Requirement</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Routing Rules</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
				}
				oParam.Fieldname = "Source";
				//oDataInterface.Source = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Source", this.oDataInterfaceSuccess);
				if (oDataInterface.Source) {
					switch (oDataInterface.Source) {
						// case "S/4 HANA":
						// 	key = "hana";
						// 	break;
						// case "BW":
						// 	key = "bw";
						// 	break;
						// case "BPC":
						// 	key = "bpc";
						// 	break;
						// case "Ariba":
						// 	key = "ariba";
						// 	break;
						// case "MDG":
						// 	key = "mdg";
						// 	break;
						// case "Vertex":
						// 	key = "vertex";
						// 	break;
						// case "Cloud based-SAP/Non-SAP ":
						// 	key = "cloud";
						// 	break;
						// case "SAP XI/PI":
						// 	key = "xi";
						// 	break;
						// case "CAS":
						// 	key = "CAS";
						// 	break;
						// case "Vistex":
						// 	key = "Vistex";
						// 	break;
						// case "HCI-PI":
						// 	key = "pi";
						// 	break;
						// case "HCI-DS":
						// 	key = "ds";
						// 	break;
						// case "IBP":
						// 	key = "ibp";
						// 	break;
						case "Others":
							//							key = "others1";
							this.byId("othersourceLabel").setVisible(true);
							this.byId("othersource").setVisible(true);
							oParam.Fieldname = "OtherSource";
							//oDataInterface.Source = callServices.fnCallMainTable(oParam);
							callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherSource", this.oDataInterfaceSuccess);
							break;
					}
					//					oDataInterface.Source = key;
				}

				oParam.Fieldname = "InterfaceType";
				//oDataInterface.ImpactedSystem = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceType", this.oDataInterfaceSuccess);
				/*if (oDataInterface.InterfaceType) {
					switch (oDataInterface.InterfaceType) {
						case "File Interface":
							key = "FI";
							break;
						case "Proxy Based Interface":
							key = "PBI";
							break;
						case "IDOC Based Interface":
							key = "IBI";
							break;
						case "Service Based Interface – OData":
							key = "SBI";
							break;
						case "SOAP API":
							key = "SA";
							break;
						case "HCI Interface":
							key = "HCI Interface";
							break;
					}
					oDataInterface.InterfaceType = key;
				}*/

				oParam.Fieldname = "Frequency";
				//oDataInterface.Frequency = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Frequency", this.oDataInterfaceSuccess);
				if (oDataInterface.Frequency) {
					var sFreq = oDataInterface.Frequency.split("~");
					for (var iFreq = 0; iFreq < sFreq.length; iFreq++) {
						var key;
						var text;
						switch (sFreq[iFreq]) {
							case "Annually":
								key = "0";
								break;
							case "Quarterly":
								key = "1";
								break;
							case "Monthly":
								key = "2";
								break;
							case "Weekly":
								key = "3";
								break;
							case "Daily":
								key = "4";
								break;
							case "On Demand":
								key = "5";
								break;
							case "Other":
								key = "6";
								this.byId("otherfreqencyLabel").setVisible(true);
								this.byId("otherfrequency").setVisible(true);
								oParam.Fieldname = "OtherFrequency";
								//oDataInterface.Source = callServices.fnCallMainTable(oParam);
								callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherFrequency", this.oDataInterfaceSuccess);
								break;
						}
						that.getView().byId("frequency").addSelectedKeys(key);
						// var oItemTemplate = new sap.ui.core.Item({
						// 	key: key,
						// 	text: text
						// });
						// that.getView().byId("impactedSystem").addSelectedItem(oItemTemplate);
					}
				}
				oParam.Fieldname = "Process Area";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessArea", this.oDataInterfaceSuccess);
				if (oDataInterface.ProcessArea) {
					var sProcessAreaOpt = oDataInterface.ProcessArea.split("~");
					for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
						that.getView().byId("processarea").addSelectedKeys(sProcessAreaOpt[iProcAr]);
					}
				}

				oParam.Fieldname = "InterfaceDependencies";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceDependencies", this.oDataInterfaceSuccess);

				if (!oDataInterface.InterfaceDependencies) {
					oDataInterface.InterfaceDependencies =
						"Environment / Configuration \n\n\nDevelopment Dependencies \n\n\nRun / Execution Dependencies";
				}

				oParam.Fieldname = "InterfaceAssumptions";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceAssumptions", this.oDataInterfaceSuccess);

				oParam.Fieldname = "AIFFramework";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AIFFramework", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ErrorHandlingUsingCustomIDOC";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrorHandlingUsingCustomIDOC", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ManualInterfaceProgramLog";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ManualInterfaceProgramLog", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ErrFTP";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrFTP", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ErrReport";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrReport", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ErrReconciliation";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrReconciliation", this.oDataInterfaceSuccess);
				oParam.Fieldname = "ErrReprocessing";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrReprocessing", this.oDataInterfaceSuccess);

				oParam.Fieldname = "HTTPS_SFTP_";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "HTTPS_SFTP_", this.oDataInterfaceSuccess);
				oParam.Fieldname = "UserAuth";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "UserAuth", this.oDataInterfaceSuccess);
				oParam.Fieldname = "Encryp";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Encryp", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Impacted System";
				//oDataInterface.ImpactedSystem = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ImpactedSystem", this.oDataInterfaceSuccess);
				if (oDataInterface.ImpactedSystem) {
					var sImpact = oDataInterface.ImpactedSystem.split("~");
					for (var iImpact = 0; iImpact < sImpact.length; iImpact++) {
						/*switch (sImpact[iImpact]) {
							case "S/4 HANA":
								key = "hana";
								break;
							case "BW":
								key = "bw";
								break;
							case "BPC":
								key = "bpc";
								break;
							case "Ariba":
								key = "ariba";
								text = sImpact[iImpact];
								break;
							case "MDG":
								key = "mdg";
								break;
							case "Vertex":
								key = "vertex";
								break;
							case "CAS":
							key = "CAS";
								break;
							case "Vistex":
							key = "Vistex";
								break;
							case "Cloud based-SAP/Non-SAP":
								key = "cloud";
								break;
							case "SAP XI/PI":
								key = "xi";
								break;
							case "HCI-PI":
								key = "pi";
								break;
							case "HCI-DS":
								key = "ds";
								break;
							case "IBP":
								key = "ibp";
								break;
							case "Others":
								key = "others1";
								this.byId("otherimpactLabel").setVisible(true);
							this.byId("otherimpact").setVisible(true);
							oParam.fieldname = "OtherImpact";
							//oDataInterface.Source = callServices.fnCallMainTable(oParam);
							callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherImpact", this.oDataInterfaceSuccess);
								break;
						}*/
						that.getView().byId("impactedSystem").addSelectedKeys(sImpact[iImpact]);
						// var oItemTemplate = new sap.ui.core.Item({
						// 	key: key,
						// 	text: text
						// });
						// that.getView().byId("impactedSystem").addSelectedItem(oItemTemplate);
					}
				}

				oParam.Fieldname = "Object Title";
				// oDataInterface.ObjectTitle = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectTitle", this.oDataInterfaceSuccess);

				oDataInterface.Title = "Interface - " + oDataInterface.ObjectID + " - " + oDataInterface.ObjectTitle;

				oParam.Fieldname = "Story%20Number%2FComment";
				// oDataInterface.StoryNumberComment = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "StoryNumber", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Target";
				// oDataInterface.Target = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Target", this.oDataInterfaceSuccess);
				if (oDataInterface.Target) {
					var sTarget = oDataInterface.Target.split("~");
					for (var iTarget = 0; iTarget < sTarget.length; iTarget++) {
						/*switch (sTarget[iTarget]) {
							case "S/4 HANA":
								key = "hana";
								// text = "S/4 HANA";
								break;
							case "BW":
								key = "bw";
								break;
							case "BPC":
								key = "bpc";
								break;
							case "Ariba":
								key = "ariba";
								break;
							case "MDG":
								key = "mdg";
								break;
							case "CAS":
							key = "CAS";
								break;
							case "Vistex":
							key = "Vistex";
								break;
							case "Vertex":
								key = "vertex";
								break;
							case "Cloud based-SAP/Non-SAP":
								key = "cloud";
								break;
							case "SAP XI/PI":
								key = "xi";
								break;
							case "HCI-PI":
								key = "pi";
								break;
							case "HCI-DS":
								key = "ds";
								break;
							case "IBP":
								key = "ibp";
								break;
							case "Others":
								key = "others1";
								this.byId("othertargetLabel").setVisible(true);
								this.byId("othertarget").setVisible(true);
								oParam.fieldname = "OtherTarget";
								//oDataInterface.Source = callServices.fnCallMainTable(oParam);
								callServices.fnGetDataMainTable(oParam, oDataInterface, "OtherTarget", this.oDataInterfaceSuccess);
								break;
						}*/
						that.getView().byId("target").addSelectedKeys(sTarget[iTarget]);
					}
				}
				oParam.Fieldname = "Interface Direction";
				// oDataInterface.InterfaceDirection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceDirection", this.oDataInterfaceSuccess);
				switch (oDataInterface.InterfaceDirection) {
					case "Inbound":
						this.byId("RB2-11").setSelected(true);
						break;
					case "Outbound":
						this.byId("RB2-12").setSelected(true);
						break;
					case "Bidirectional":
						this.byId("RB2-13").setSelected(true);
						break;
				}

				oParam.Fieldname = "Processing Type";
				// oDataInterface.ProcessingType = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessingType", this.oDataInterfaceSuccess);
				switch (oDataInterface.ProcessingType) {
					case "Synchronous":
						this.byId("RB1-1").setSelected(true);
						break;
					case "Asynchronous":
						this.byId("RB1-2").setSelected(true);
						break;
					case "Others":
						this.byId("RB1-3").setSelected(true);
						break;
				}

				oParam.Fieldname = "Object Details%2FBusiness Requirement%2FProcess Flow";
				// oDataInterface.ObjectDetails = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectDetails", this.oDataInterfaceSuccess);

				if (oDataInterface.ObjectDetails) {
					var len = oDataInterface.ObjectDetails.length;
					this.byId("fsObjDetCharCount").setText("Characters: " + len);

				} else {
					oDataInterface.ObjectDetails =
						"<b>Business Driver</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Functional Specification Details:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><bImpacted Subprocess(es)</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Design Considerations:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Design Details:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Filtering Criteria:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";
				}

				oParam.Fieldname = "OBP%20Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPRating", this.oDataInterfaceSuccess);
				oDataInterface.OBPRating = parseFloat(oDataInterface.OBPRating);

				oParam.Fieldname = "OBP%20Review%2FComments";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OBPReviewComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ExpectedSystemLoad";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExpectedSystemLoad", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Mapping";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Mapping", this.oDataInterfaceSuccess);
				if (!oDataInterface.Mapping) {
					oDataInterface.Mapping =
						"<b>Mapping and Transformation:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br>	<b>Triggers and Other Process Requirements:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Triggers:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Transaction Information:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Legacy Transaction Information:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>EDI Functional Requirements:</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br>";

				}

				oParam.Fieldname = "Mapping%20Rating";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MappingRating", this.oDataInterfaceSuccess);
				oDataInterface.MappingRating = parseFloat(oDataInterface.MappingRating);

				oParam.Fieldname = "Mapping%20Review%2FComment";
				// oDataInterface.Mapping = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MappingReviewComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "AIF Framework";
				// oDataInterface.AIFFramework = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AIFFramework", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Error Handling Using Custom IDOC";
				// oDataInterface.ErrorHandlingUsingCustomIDOC = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrorHandlingUsingCustomIDOC", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Manual Interface Program Log";
				// oDataInterface.ManualInterfaceProgramLog = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ManualInterfaceProgramLog", this.oDataInterfaceSuccess);

				oParam.Fieldname = "FTP";
				// oDataInterface.FTP = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "FTP", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Exceptional Handling";
				// oDataInterface.ExceptionHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandling", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Exceptional Handling Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingRating", this.oDataInterfaceSuccess);
				oDataInterface.ExceptionHandlingRating = parseFloat(oDataInterface.ExceptionHandlingRating);

				oParam.Fieldname = "Exceptional Handling Comment";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingComment", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Exception Handling Options";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExceptionHandlingOptions", this.oDataInterfaceSuccess);
				if (oDataInterface.ExceptionHandlingOptions) {
					var sExcepHand = oDataInterface.ExceptionHandlingOptions.split("~");
					for (var iExcepHand = 0; iExcepHand < sExcepHand.length; iExcepHand++) {
						switch (sExcepHand[iExcepHand]) {
							case "AIF Framework":
								that.byId("CB-1").setSelected(true);
								break;
							case "Error Handling Using Custom IDOC":
								that.byId("CB-2").setSelected(true);
								break;
							case "Manual Interface Program Log":
								that.byId("CB-3").setSelected(true);
								break;
							case "FTP":
								that.byId("CB-4").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Security";
				// oDataInterface.TypeofInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Security", this.oDataInterfaceSuccess);
				if (oDataInterface.Security) {
					var sSecurity = oDataInterface.Security.split("~");
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

				oParam.Fieldname = "Security Section";
				// oDataInterface.Security = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecuritySection", this.oDataInterfaceSuccess);

				if (oDataInterface.SecuritySection) {
					var len = oDataInterface.SecuritySection.length;
					this.byId("fsSecurityCharCount").setText("Characters: " + len);

				}

				oParam.Fieldname = "Security Rating";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecurityRating", this.oDataInterfaceSuccess);
				oDataInterface.SecurityRating = parseFloat(oDataInterface.SecurityRating);

				oParam.Fieldname = "Security Comment";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecurityComment", this.oDataInterfaceSuccess);

				// oParam.fieldname = "HTTPS/SFTP";
				// // oDataInterface.HTTPSSFTP = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "HTTPSSFTP", this.oDataInterfaceSuccess);

				// oParam.fieldname = "User Authorization";
				// // oDataInterface.UserAuthorization = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "UserAuthorization", this.oDataInterfaceSuccess);

				// oParam.fieldname = "Encryption";
				// // oDataInterface.Encryption = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "Encryption", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Step";
				// oDataInterface.Step = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Step", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Test Type";
				// oDataInterface.TestType = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TestType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Scenario";
				// oDataInterface.Scenario = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Scenario", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Steps Performed";
				// oDataInterface.StepsPerformed = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "StepsPerformed", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ActualResults";
				// oDataInterface.ActualResults = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ActualResults", this.oDataInterfaceSuccess);

				// oParam.fieldname = "CommLog";
				// oDataInterface.CommLog = [];
				// // oDataInterface.CommLog1 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "CommLog1", this.oDataInterfaceSuccess);
				// var sCommLogCol1;
				// if (oDataInterface.CommLog1) {
				// 	sCommLogCol1 = oDataInterface.CommLog1.split("~");
				// 	if (sCommLogCol1.length > 1) {
				// 		var data1 = {};
				// 		data1.IssueDesc = sCommLogCol1[0];
				// 		data1.Priority = sCommLogCol1[1];
				// 		data1.DateLogg = new Date(sCommLogCol1[2]);
				// 		data1.Status = sCommLogCol1[3];
				// 		data1.DateResol = new Date(sCommLogCol1[4]);
				// 		data1.Resolv = sCommLogCol1[5];
				// 		oDataInterface.CommLog.push(data1);
				// 	}
				// }
				var iCountUA, sUserAcptCols;
				//SOC Writwick 11 July 2018
				// for (iCountUA = 0;; iCountUA++) {
				for (iCountUA = 0; iCountUA < 5; iCountUA++) {
				//EOC Writwick 11 July 2018

					oDataInterface.userAcceptTemp = "";
					oParam.Fieldname = "FS_UA_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "userAcceptTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.userAcceptTemp) {
						if (oDataInterface.userAcceptTemp) {
							sUserAcptCols = oDataInterface.userAcceptTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 7) {
								oDataInterface.userAcceptance.push({
									step: sUserAcptCols[0],
									testType: sUserAcptCols[1],
									scenario: sUserAcptCols[2],
									testData: sUserAcptCols[3],
									stepsPer: sUserAcptCols[4],
									actualResults: sUserAcptCols[5],
									expectedResults: sUserAcptCols[6],
									flag: true
								});
								stepID = sUserAcptCols[0];
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.userAcceptance.length === 0) {
					oDataInterface.userAcceptance.push({
						step: "1",
						testType: "",
						scenario: "",
						testData: "",
						stepsPer: "",
						actualResults: "",
						expectedResults: "",
						flag: false
					});
					stepID = 1;
				}

				/*	//Comm Log Logic
				var iCountCommLog, aCommLogCols;

				for (iCountCommLog = 0; iCountCommLog < 10; iCountCommLog++) {

					oDataInterface.CommLogTemp = "";
					//FS_CMLOG_1
					oParam.fieldname = "FS_CMLOG_" + (iCountCommLog + 1);

					callServices.fnGetDataMainTable(oParam, oDataInterface, "CommLogTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.CommLogTemp) {
						if (oDataInterface.CommLogTemp) {
							aCommLogCols = oDataInterface.CommLogTemp.split("~");
							if (aCommLogCols && aCommLogCols.length >= 6) {

								if (aCommLogCols[2] === "" || aCommLogCols[2] === "undefined") {
									aCommLogCols[2] = null;
								} else {
									aCommLogCols[2] = new Date(aCommLogCols[2]);
								}
								if (aCommLogCols[4] === "" || aCommLogCols[4] === "undefined") {
									aCommLogCols[4] = null;
								} else {
									aCommLogCols[4] = new Date(aCommLogCols[4]);
								}

								oDataInterface.CommLog.push({
									IssueDesc: aCommLogCols[0],
									Priority: aCommLogCols[1],
									DateLogg: aCommLogCols[2],
									Status: aCommLogCols[3],
									DateResol: aCommLogCols[4],
									Resolv: aCommLogCols[5],
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
				if (oDataInterface.CommLog.length === 0) {
					oDataInterface.CommLog.push({
						IssueDesc: "",
						Priority: "",
						DateLogg: null,
						Status: "",
						DateResol: null,
						Resolv: "",
						flag: false
					});
				}*/

				// Comm Log Table Starts

				var iCountCommLog, aCommLogCols;
				for (iCountCommLog = 0;; iCountCommLog++) {

					oDataInterface.CommLogTemp = "";
					oParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "CommLogTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.CommLogTemp) {
						if (oDataInterface.CommLogTemp) {
							aCommLogCols = oDataInterface.CommLogTemp.split("~");
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

								oDataInterface.CommLog.push({
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
				if (oDataInterface.CommLog.length === 0) {
					oDataInterface.CommLog.push({
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
				// Comm Log Table Ends

				// oParam.fieldname = "UA2";
				// oDataInterface.userAcceptance = [];
				// // oDataInterface.UAT1 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataInterface, "UAT1", this.oDataInterfaceSuccess);
				// var sUserAcptCols1;
				// if (oDataInterface.UAT1) {
				// 	sUserAcptCols1 = oDataInterface.UAT1.split("~");
				// 	if (sUserAcptCols1.length > 1) {
				// 		data1 = {};
				// 		data1.step = sUserAcptCols1[0];
				// 		data1.testType = sUserAcptCols1[1];
				// 		data1.scenario = sUserAcptCols1[2];
				// 		data1.stepsPer = sUserAcptCols1[3];
				// 		data1.actualResults = sUserAcptCols1[4];
				// 		oDataInterface.userAcceptance.push(data1);
				// 	}
				// }
			}

			oModelInterface.setData(oDataInterface);

		},
		onConfirmSave: function() {

			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainer").setVisible(true);
			/*
						if (obj === "new") {
							this.oDataInterfaceSuccess = {
								Approver: false,
								Reviewer: false,
								tp1:false,
								es1:false,
								Author: false,
								ObjectID: false,
								ProcessingMode: false,
								Source: false,
								InterfaceType: false,
								Frequency: false,
								ImpactedSystem: false,
								ObjectTitle: false,
								StoryNumber: false,
								Target: false,
								InterfaceDirection: false,
								ProcessingType: false,
								ObjectDetails: false,
								OBPRating: false,
								OBPReviewComment: false,
								Mapping: false,
								MappingRating: false,
								MappingReviewComment: false,
								AIFFramework: false,
								ErrorHandlingUsingCustomIDOC: false,
								ManualInterfaceProgramLog: false,
								FTP: false,
								ExceptionHandling: false,
								ExceptionHandlingOptions: false,
								ExceptionHandlingRating: false,
								ExceptionHandlingComment: false,
								Security: false,
								SecuritySection: false,
								SecurityRating: false,
								SecurityComment: false,
								HTTPSSFTP: false,
								UserAuthorization: false,
								Encryption: false,
								Step: false,
								TestType: false,
								Scenario: false,
								StepsPerformed: false,
								ActualResults: false,
								CommLog: false,
								userAcceptance: false,
								OtherSource:false,
								OtherTarget:false,
								OtherFrequency:false,
								OherImpact:false
							};

							this.updateInterfaceFS();

							// Update Process Lane Starts
							var oCurrentView = this.getView();
							oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
							oCurrentView.byId("processflow2").updateModel();
							// Update Process Lane Ends

						} else if (obj === "existing") {
							this.updateInterfaceFS();

							// Update Process Lane Starts
							var oCurrentView = this.getView();
							oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
							oCurrentView.byId("processflow2").updateModel();

							// Update Process Lane Ends
						}*/
			this.updateInterfaceFS();

			// Update Process Lane Starts
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
		},

		updateInterfaceFS: function() {
			var oDataInterface = this.getView().getModel("intData").getData();

			var oDataSource = this.getView().byId("source").getSelectedItem().getProperty("text");

			var oDataInterfaceType = this.getView().byId("interfaceType").getSelectedItem().getProperty("text");
			//var oDataSourceMulti = oDataSource.join("~");

			//var oDataFunctionalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			//var oDataFunctionalSpecificationMulti = oDataFunctionalSpecification.join("~");

			var oDataVersionExisting = this.getView().byId("versiontypeExisting").getSelectedKey();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			var oDataProcessmodeRadioBtn;
			if (this.getView().byId("RB1-11").getSelected()) {
				oDataProcessmodeRadioBtn = this.getView().byId("RB1-11").getText();
			} else if (this.getView().byId("RB1-12").getSelected()) {
				oDataProcessmodeRadioBtn = this.getView().byId("RB1-12").getText();
			} else if (this.getView().byId("RB1-13").getSelected()) {
				oDataProcessmodeRadioBtn = this.getView().byId("RB1-13").getText();
			}
			var oDataFrequency = this.getView().byId("frequency").getSelectedItems();
			var oDataFrequencyMulti = []; //oDataFrequency.join("~");
			for (var iFreq = 0; iFreq < oDataFrequency.length; iFreq++) {
				oDataFrequencyMulti[iFreq] = oDataFrequency[iFreq].getProperty("text");
			}
			var oDataFrequencyValue = oDataFrequencyMulti.join("~");

			var oDataImpSys = this.getView().byId("impactedSystem").getSelectedItems();
			var oDataImpSysMulti = []; //oDataImpSys.join("~");
			for (var iImp = 0; iImp < oDataImpSys.length; iImp++) {
				oDataImpSysMulti[iImp] = oDataImpSys[iImp].getProperty("text");
			}
			var oDataImpSysValue = oDataImpSysMulti.join("~");

			var oDataTarget = this.getView().byId("target").getSelectedItems();
			var oDataTargetMulti = [];
			for (var iTarget = 0; iTarget < oDataTarget.length; iTarget++) {
				oDataTargetMulti[iTarget] = oDataTarget[iTarget].getProperty("text");
			}
			var oDataTargetValue = oDataTargetMulti.join("~");

			var oDataDirectionRadioBtn;
			if (this.getView().byId("RB2-11").getSelected()) {
				oDataDirectionRadioBtn = this.getView().byId("RB2-11").getText();
			} else if (this.getView().byId("RB2-12").getSelected()) {
				oDataDirectionRadioBtn = this.getView().byId("RB2-12").getText();
			} else if (this.getView().byId("RB2-13").getSelected()) {
				oDataDirectionRadioBtn = this.getView().byId("RB2-13").getText();
			}

			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");

			var oDataProcessTypeRadioBtn;
			if (this.getView().byId("RB1-1").getSelected()) {
				oDataProcessTypeRadioBtn = this.getView().byId("RB1-1").getText();
			} else if (this.getView().byId("RB1-2").getSelected()) {
				oDataProcessTypeRadioBtn = this.getView().byId("RB1-2").getText();
			} else if (this.getView().byId("RB1-3").getSelected()) {
				oDataProcessTypeRadioBtn = this.getView().byId("RB1-3").getText();
			}

			var oDataExceptionCheckBx = [];
			if (this.getView().byId("CB-1").getSelected()) {
				oDataExceptionCheckBx.push(this.getView().byId("CB-1").getText());
			}
			if (this.getView().byId("CB-2").getSelected()) {
				oDataExceptionCheckBx.push(this.getView().byId("CB-2").getText());
			}
			if (this.getView().byId("CB-3").getSelected()) {
				oDataExceptionCheckBx.push(this.getView().byId("CB-3").getText());
			}
			if (this.getView().byId("CB-4").getSelected()) {
				oDataExceptionCheckBx.push(this.getView().byId("CB-4").getText());
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

			var oDataOBPRating = this.getView().byId("ri6").getValue();
			var oDataMappingRating = this.getView().byId("ri15").getValue();
			var oDataSecurityRating = this.getView().byId("ri9").getValue();
			var oDataExceptionHandlingRating = this.getView().byId("ri16").getValue();

			// var oDataTestType = this.getView().byId("TestType").getSelectedKeys();
			// var oDataTestTypeMulti = oDataTestType.join("~");
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oParam = {
				//Version:versionno[1],
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
				//Version:versionno[1],
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.Processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			// var oParam = {
			// 	Repid: 'INT-083b-US-R-2574',
			// 	Projectkey: 'INT',
			// 	Processid: 'PR001',
			// 	Stepno: 'S1',
			// 	Fieldname: '',
			// 	Fieldvalue: ''
			// };

			// var uParam = {
			// 	Repid: 'INT-083b-US-R-2574',
			// 	Projectkey: 'INT',
			// 	Processid: 'PR001',
			// 	Stepno: 'S1',
			// 	Fieldname: ''
			// };

			// oParam.Fieldname = "Functional Specification";
			// oParam.Fieldvalue = oDataFunctionalSpecificationMulti;
			// callServices.fnSubmitInMainTable(oParam);

			// oParam.Fieldname = "Version 1.0";
			// oParam.Fieldvalue = oDataVersion10Multi;
			// callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS);

			oParam.Fieldname = uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataInterface.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Approver);

			oParam.Fieldname = uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataInterface.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Reviewer);

			oParam.Fieldname = uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataInterface.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Author);

			oParam.Fieldname = uParam.Fieldname = "es1";
			oParam.Fieldvalue = oDataInterface.es1;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.es1);

			oParam.Fieldname = uParam.Fieldname = "tp1";
			oParam.Fieldvalue = oDataInterface.tp1;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.tp1);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataInterface.ObjectID;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ObjectID);

			oParam.Fieldname = uParam.Fieldname = "Processing Mode";
			oParam.Fieldvalue = oDataProcessmodeRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProcessingMode);

			oParam.Fieldname = uParam.Fieldname = "Source";
			oParam.Fieldvalue = oDataSource;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Source);

			oParam.Fieldname = uParam.Fieldname = "InterfaceType";
			oParam.Fieldvalue = oDataInterfaceType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.InterfaceType);

			oParam.Fieldname = uParam.Fieldname = "ExpectedSystemLoad";
			oParam.Fieldvalue = oDataInterface.ExpectedSystemLoad;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExpectedSystemLoad);

			oParam.Fieldname = uParam.Fieldname = "Frequency";
			oParam.Fieldvalue = oDataFrequencyValue;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Frequency);

			oParam.Fieldname = uParam.Fieldname = "Impacted System";
			oParam.Fieldvalue = oDataImpSysValue;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ImpactedSystem);

			oParam.Fieldname = uParam.Fieldname = "Target";
			oParam.Fieldvalue = oDataTargetValue;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Target);

			oParam.Fieldname = uParam.Fieldname = "OtherTarget";
			oParam.Fieldvalue = oDataInterface.OtherTarget;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OtherTarget);

			oParam.Fieldname = uParam.Fieldname = "OtherSource";
			oParam.Fieldvalue = oDataInterface.OtherSource;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OtherSource);

			oParam.Fieldname = uParam.Fieldname = "OtherFrequency";
			oParam.Fieldvalue = oDataInterface.OtherFrequency;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OtherFrequency);

			oParam.Fieldname = uParam.Fieldname = "OtherImpact";
			oParam.Fieldvalue = oDataInterface.OtherFrequency;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OtherImpact);

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProcessArea);

			oParam.Fieldname = "InterfaceDependencies";
			uParam.Fieldname = "InterfaceDependencies";
			oParam.Fieldvalue = oDataInterface.InterfaceDependencies;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.InterfaceDependencies);

			oParam.Fieldname = "InterfaceAssumptions";
			uParam.Fieldname = "InterfaceAssumptions";
			oParam.Fieldvalue = oDataInterface.InterfaceAssumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.InterfaceAssumptions);

			oParam.Fieldname = "AIFFramework";
			uParam.Fieldname = "AIFFramework";
			oParam.Fieldvalue = oDataInterface.AIFFramework;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.AIFFramework);

			oParam.Fieldname = "ErrorHandlingUsingCustomIDOC";
			uParam.Fieldname = "ErrorHandlingUsingCustomIDOC";
			oParam.Fieldvalue = oDataInterface.ErrorHandlingUsingCustomIDOC;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrorHandlingUsingCustomIDOC);

			oParam.Fieldname = "ManualInterfaceProgramLog";
			uParam.Fieldname = "ManualInterfaceProgramLog";
			oParam.Fieldvalue = oDataInterface.ManualInterfaceProgramLog;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ManualInterfaceProgramLog);

			oParam.Fieldname = "ErrFTP";
			uParam.Fieldname = "ErrFTP";
			oParam.Fieldvalue = oDataInterface.ErrFTP;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrFTP);

			oParam.Fieldname = "ErrReport";
			uParam.Fieldname = "ErrReport";
			oParam.Fieldvalue = oDataInterface.ErrReport;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrReport);

			oParam.Fieldname = "ErrReconciliation";
			uParam.Fieldname = "ErrReconciliation";
			oParam.Fieldvalue = oDataInterface.ErrReconciliation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrReconciliation);

			oParam.Fieldname = "ErrReprocessing";
			uParam.Fieldname = "ErrReprocessing";
			oParam.Fieldvalue = oDataInterface.ErrReprocessing;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrReprocessing);

			oParam.Fieldname = "HTTPS_SFTP_";
			uParam.Fieldname = "HTTPS_SFTP_";
			oParam.Fieldvalue = oDataInterface.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.HTTPS_SFTP_);

			oParam.Fieldname = "UserAuth";
			uParam.Fieldname = "UserAuth";
			oParam.Fieldvalue = oDataInterface.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.UserAuth);

			oParam.Fieldname = "Encryp";
			uParam.Fieldname = "Encryp";
			oParam.Fieldvalue = oDataInterface.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Encryp);

			oParam.Fieldname = uParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataInterface.ObjectTitle;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ObjectTitle);

			oParam.Fieldname = "Story Number/Comment";
			uParam.Fieldname = "Story%20Number%2FComment";
			oParam.Fieldvalue = oDataInterface.StoryNumber;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.StoryNumber);

			oParam.Fieldname = uParam.Fieldname = "Interface Direction";
			oParam.Fieldvalue = oDataDirectionRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.InterfaceDirection);

			oParam.Fieldname = uParam.Fieldname = "Processing Type";
			oParam.Fieldvalue = oDataProcessTypeRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProcessingType);

			oParam.Fieldname = "Object Details/Business Requirement/Process Flow";
			uParam.Fieldname = "Object%20Details%2FBusiness%20Requirement%2FProcess%20Flow";
			oParam.Fieldvalue = oDataInterface.ObjectDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ObjectDetails);

			oParam.Fieldname = "OBP Rating";
			uParam.Fieldname = "OBP%20Rating";
			oParam.Fieldvalue = oDataOBPRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPRating);

			oParam.Fieldname = "OBP Review/Comments";
			uParam.Fieldname = "OBP%20Review%2FComments";
			oParam.Fieldvalue = oDataInterface.OBPReviewComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewComment);

			oParam.Fieldname = "OBPReviewCommentR1";
			uParam.Fieldname = "OBPReviewCommentR1";
			//SOC Writwick 23/06/2018
			//oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR1).toString();
			if((oDataInterface.OBPReviewCommentR1) != null){
				oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR1).toString();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR1);
			}
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR1);
			//EOC Writwick 23/06/2018

			oParam.Fieldname = "OBPReviewComment1";
			uParam.Fieldname = "OBPReviewComment1";
			oParam.Fieldvalue = oDataInterface.OBPReviewComment1;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewComment1);

			oParam.Fieldname = "OBPReviewCommentR2";
			uParam.Fieldname = "OBPReviewCommentR2";
			//SOC Writwick 23/06/2018
			//oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR2).toString();
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR2);
			if((oDataInterface.OBPReviewCommentR2) != null){
				oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR2).toString();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR2);
			}
			//EOC Writwick 23/06/2018

			oParam.Fieldname = "OBPReviewComment2";
			uParam.Fieldname = "OBPReviewComment2";
			oParam.Fieldvalue = oDataInterface.OBPReviewComment2;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewComment2);

			oParam.Fieldname = "OBPReviewCommentR3";
			uParam.Fieldname = "OBPReviewCommentR3";
			//SOC Writwick 23/06/2018
			//oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR3).toString();
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR3);
			if((oDataInterface.OBPReviewCommentR3) != null){
				oParam.Fieldvalue = (oDataInterface.OBPReviewCommentR3).toString();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewCommentR3);
			}
			//EOC Writwick 23/06/2018

			oParam.Fieldname = "OBPReviewComment3";
			uParam.Fieldname = "OBPReviewComment3";
			oParam.Fieldvalue = oDataInterface.OBPReviewComment3;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OBPReviewComment3);

			oParam.Fieldname = uParam.Fieldname = "Mapping";
			oParam.Fieldvalue = oDataInterface.Mapping;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Mapping);

			oParam.Fieldname = "Mapping Rating";
			uParam.Fieldname = "Mapping%20Rating";
			oParam.Fieldvalue = oDataMappingRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MappingRating);

			oParam.Fieldname = "Mapping Review/Comment";
			uParam.Fieldname = "Mapping%20Review%2FComment";
			oParam.Fieldvalue = oDataInterface.MappingReviewComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MappingReviewComment);

			oParam.Fieldname = uParam.Fieldname = "Exceptional Handling";
			// oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			oParam.Fieldvalue = oDataInterface.ExceptionHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExceptionHandling);

			oParam.Fieldname = uParam.Fieldname = "AuditingandControlRequirements";
			// oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			oParam.Fieldvalue = oDataInterface.AuditingandControlRequirements;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.AuditingandControlRequirements);

			oParam.Fieldname = uParam.Fieldname = "Exception Handling Options";
			oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExceptionHandlingOptions);

			oParam.Fieldname = uParam.Fieldname = "Exceptional Handling Rating";
			oParam.Fieldvalue = oDataExceptionHandlingRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExceptionHandlingRating);

			oParam.Fieldname = uParam.Fieldname = "Exceptional Handling Comment";
			oParam.Fieldvalue = oDataInterface.ExceptionHandlingComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExceptionHandlingComment);

			oParam.Fieldname = uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Security);

			oParam.Fieldname = uParam.Fieldname = "Security Section";
			oParam.Fieldvalue = oDataInterface.SecuritySection;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SecuritySection);

			oParam.Fieldname = uParam.Fieldname = "Security Rating";
			oParam.Fieldvalue = oDataSecurityRating.toString();
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SecurityRating);

			oParam.Fieldname = uParam.Fieldname = "Security Comment";
			oParam.Fieldvalue = oDataInterface.SecurityComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SecurityComment);

			oParam.Fieldname = uParam.Fieldname = "Step";
			oParam.Fieldvalue = oDataInterface.Step;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Step);

			// oParam.Fieldname = uParam.Fieldname = "Test Type";
			// oParam.TestType = oDataTestTypeMulti;
			// callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = uParam.Fieldname = "Scenario";
			oParam.Fieldvalue = oDataInterface.Scenario;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Scenario);

			oParam.Fieldname = uParam.Fieldname = "Steps Performed";
			oParam.Fieldvalue = oDataInterface.StepsPerformed;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.StepsPerformed);

			oParam.Fieldname = uParam.Fieldname = "Actual Results";
			oParam.Fieldvalue = oDataInterface.ActualResults;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ActualResults);

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataInterface.userAcceptance.length; iCountUA++) {

				oDataInterface.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataInterface.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}

			var iCountCommLog, oCommLoggEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataInterface.CommLog.length; iCountCommLog++) {

				oDataInterface.CommLogTemp = "";
				oParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);
				oCommLoggEntry = oDataInterface.CommLog[iCountCommLog];

				if (!oCommLoggEntry.DateLogg) {
					oCommLoggEntry.DateLogg = "";
				}
				if (!oCommLoggEntry.DateResol) {
					oCommLoggEntry.DateResol = "";
				}

				sCommLogEntry = oCommLoggEntry.IssueDesc + "~" + oCommLoggEntry.Priority + "~" + oCommLoggEntry.DateLogg + "~" +
					oCommLoggEntry.Status + "~" + oCommLoggEntry.DateResol + "~" + oCommLoggEntry.Resolv + "~" + oCommLoggEntry.AssignedTo;
				oParam.Fieldvalue = sCommLogEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCommLoggEntry.flag);

			}

			sap.m.MessageToast.show("Data saved");
		},
		/**
		 * Save method is triggered when the Save button is pressed on the screen
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceFS
		 */
		onSave: function(oEvent) {

			var that = this;
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to save the data?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							sap.ui.getCore().oMessagePopover.destroyItems();
							that.onConfirmSave();
							that.getView().byId("oBTSubmit").setVisible(true);
							that.getView().byId("oBTSubmit").setEnabled(true);
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(true);
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
							that.getReviewData(false);
						}

					}
				}
			);
		},

		/*onSubmit: function() {
			// Update Process Lane Starts
			var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends

			// var oDataInterface = this.getView().getModel("intData").getData();

			// var oDataSource = this.getView().byId("source").getSelectedKeys();
			// var oDataSourceMulti = oDataSource.join("~");

			// var oDataFunctionalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			// var oDataFunctionalSpecificationMulti = oDataFunctionalSpecification.join("~");

			// var oDataVersion10 = this.getView().byId("Version10").getSelectedKeys();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			// var oDataProcessmodeRadioBtn;
			// if (this.getView().byId("RB1-11").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-11").getText();
			// } else if (this.getView().byId("RB1-12").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-12").getText();
			// } else if (this.getView().byId("RB1-13").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-13").getText();
			// }
			// var oDataFrequency = this.getView().byId("frequency").getSelectedKeys();
			// var oDataFrequencyMulti = oDataFrequency.join("~");

			// var oDataImpSys = this.getView().byId("impactedSystem").getSelectedKeys();
			// var oDataImpSysMulti = oDataImpSys.join("~");

			// var oDataTarget = this.getView().byId("target").getSelectedKeys();
			// var oDataTargetMulti = oDataTarget.join("~");

			// var oDataDirectionRadioBtn;
			// if (this.getView().byId("RB2-11").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-11").getText();
			// } else if (this.getView().byId("RB2-12").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-12").getText();
			// } else if (this.getView().byId("RB2-13").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-13").getText();
			// }

			// var oDataProcessTypeRadioBtn;
			// if (this.getView().byId("RB1-1").getSelected()) {
			// 	oDataProcessTypeRadioBtn = this.getView().byId("RB1-1").getText();
			// } else if (this.getView().byId("RB1-2").getSelected()) {
			// 	oDataProcessTypeRadioBtn = this.getView().byId("RB1-2").getText();
			// }

			// var oDataExceptionCheckBx = [];
			// if (this.getView().byId("CB-1").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-1").getText());
			// }
			// if (this.getView().byId("CB-2").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-2").getText());
			// }
			// if (this.getView().byId("CB-3").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-3").getText());
			// }
			// if (this.getView().byId("CB-4").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-4").getText());
			// }
			// var oDataExceptionCheckBxMulti = oDataExceptionCheckBx.join("~");

			// var oDataSecurityCheckBx = [];
			// if (this.getView().byId("CB2-01").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB2-01").getText());
			// }
			// if (this.getView().byId("CB2-02").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB2-02").getText());
			// }
			// if (this.getView().byId("CB3-03").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB3-03").getText());
			// }
			// var oDataSecurityCheckBxMulti = oDataSecurityCheckBx.join("~");

			// // var oDataTestType = this.getView().byId("TestType").getSelectedKeys();
			// // var oDataTestTypeMulti = oDataTestType.join("~");

			// var oParam = {
			// 	repid: 'INT-083b-US-R-2574',
			// 	projectkey: 'INT',
			// 	processid: 'PR001',
			// 	stepno: 'S1',
			// 	fieldname: ''
			// };

			// var uParam = {
			// 	repid: 'INT-083b-US-R-2574',
			// 	projectkey: 'INT',
			// 	processid: 'PR002',
			// 	stepno: 'S2',
			// 	fieldname: ''
			// };
			// oParam.fieldname = "Functional Specification";
			// uParam.fieldname = "Functional Specification";
			// oParam.Fieldvalue = oDataFunctionalSpecificationMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Version 1.0";
			// uParam.fieldname = "Version 1.0";
			// oParam.Fieldvalue = oDataVersion10Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.Fieldname = "Approver";
			// uParam.Fieldname = "Approver";
			// oParam.Fieldvalue = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Reviewer";
			// uParam.fieldname = "Reviewer";
			// oParam.Fieldvalue = oDataInterface.Reviewer;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Author";
			// uParam.fieldname = "Author";
			// oParam.Fieldvalue = oDataInterface.Authorr;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Processing Mode";
			// uParam.fieldname = "Processing Mode";
			// oParam.Fieldvalue = oDataProcessmodeRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Source";
			// uParam.fieldname = "Source";
			// oParam.Fieldvalue = oDataSourceMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Frequency";
			// uParam.fieldname = "Frequency";
			// oParam.Fieldvalue = oDataFrequencyMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Impacted System";
			// uParam.fieldname = "Impacted System";
			// oParam.Fieldvalue = oDataImpSysMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Target";
			// uParam.fieldname = "Target";
			// oParam.Fieldvalue = oDataTargetMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Object Title";
			// uParam.fieldname = "Object Title";
			// oParam.Fieldvalue = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Story Number/Comment";
			// uParam.fieldname = "Story Number/Comment";
			// oParam.Fieldvalue = oDataInterface.StoryNumber;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Interface Direction";
			// uParam.fieldname = "Interface Direction";
			// oParam.Fieldvalue = oDataDirectionRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Processing Type";
			// uParam.fieldname = "Processing Type";
			// oParam.Fieldvalue = oDataProcessTypeRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Object Details/Business Requirement/Process Flow(max. 500 Chars)";
			// uParam.fieldname = "Object Details/Business Requirement/Process Flow(max. 500 Chars)";
			// oParam.Fieldvalue = oDataInterface.ObjectDetailsBusinessRequirement;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Mapping";
			// uParam.fieldname = "Mapping";
			// oParam.Fieldvalue = oDataInterface.Mapping;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Exception Handling";
			// uParam.fieldname = "Exception Handling";
			// oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security";
			// uParam.fieldname = "Security";
			// oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security Section(max. 500 Chars)";
			// uParam.fieldname = "Security Section(max. 500 Chars)";
			// oParam.Fieldvalue = oDataInterface.SecuritySection;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Step";
			// uParam.fieldname = "Step";
			// oParam.Step = oDataInterface.Step;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// // oParam.fieldname = "Test Type";
			// // uParam.fieldname = "Test Type";
			// // oParam.TestType = oDataTestTypeMulti;
			// // callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Scenario";
			// uParam.fieldname = "Scenario";
			// oParam.Scenario = oDataInterface.Scenario;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Steps Performed";
			// uParam.fieldname = "Steps Performed";
			// oParam.Fieldvalue = oDataInterface.StepsPerformed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Actual Results";
			// uParam.fieldname = "Actual Results";
			// oParam.Fieldvalue = oDataInterface.ActualResults;
			// callServices.fnUpdateInMainTable(oParam, uParam);
			this.byId("oBTPrint").setVisible(true);
		},*/
		onSubmit: function(oEvt) {
			// Update Process Lane Starts
			var oCurrentView = this.getView();
			var oEvent = oEvt.getSource();
			var that = this;
			if (oEvent.getText() === "Submit") {
				sap.m.MessageBox.show(
					"Do you want to submit the data?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {

							if (oAction === "YES") {
								that.updateInterfaceFS();
								that.onConfirmSumit();
								// that.byId("oBTPrint").setEnabled(true);
								that.getView().byId("oBTSave").setVisible(true);
								that.getView().byId("oBTSave").setEnabled(false);
								that.getView().byId("oBTSubmit").setVisible(true);
								that.getView().byId("oBTSubmit").setEnabled(true);
								var user = that.getView().getModel("intData").getData().Approver;
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
								var oDataForMail = that.getView().getModel("intData").getData();
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
									oDataForMail.ObjectTitle);
								that.getReviewData(true);
							}

						}
					}

				);
			} else if (oEvent.getText() === "Approve") {
				sap.m.MessageBox.show(
					"Do you want to Approve the data?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {

							if (oAction === "YES") {
								that.updateInterfaceFS();
								that.onConfirmApprove();
								// that.byId("oBTPrint").setEnabled(true);
								that.getView().byId("oBTSave").setVisible(true);
								that.getView().byId("oBTSave").setEnabled(false);
								that.getView().byId("oBTSubmit").setVisible(true);
								that.getView().byId("oBTSubmit").setEnabled(true);
								oEvent.setText("Accept");
								that.getReviewData(true);
							}

						}
					}

				);
			} else {
				sap.m.MessageBox.show(
					"Do you want to Accept the data?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirm",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {

							if (oAction === "YES") {
								that.updateInterfaceFS();
								that.onConfirmAccept();
								var user = that.getView().getModel("intData").getData().Approver;
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
								var oDataForMail = that.getView().getModel("intData").getData();
								var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
								var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
								callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
								callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Author, oDataForMail.Reviewer,
									oDataForMail.ObjectTitle);
								// that.byId("oBTPrint").setEnabled(true);
								that.getView().byId("oBTSave").setVisible(true);
								that.getView().byId("oBTSubmit").setVisible(true);
								that.getView().byId("oBTSubmit").setEnabled(false);
								that.getReviewData(true);
							}

						}
					}

				);
			}
			//oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends

			// var oDataInterface = this.getView().getModel("intData").getData();

			// var oDataSource = this.getView().byId("source").getSelectedKeys();
			// var oDataSourceMulti = oDataSource.join("~");

			// var oDataFunctionalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			// var oDataFunctionalSpecificationMulti = oDataFunctionalSpecification.join("~");

			// var oDataVersion10 = this.getView().byId("Version10").getSelectedKeys();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			// var oDataProcessmodeRadioBtn;
			// if (this.getView().byId("RB1-11").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-11").getText();
			// } else if (this.getView().byId("RB1-12").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-12").getText();
			// } else if (this.getView().byId("RB1-13").getSelected()) {
			// 	oDataProcessmodeRadioBtn = this.getView().byId("RB1-13").getText();
			// }
			// var oDataFrequency = this.getView().byId("frequency").getSelectedKeys();
			// var oDataFrequencyMulti = oDataFrequency.join("~");

			// var oDataImpSys = this.getView().byId("impactedSystem").getSelectedKeys();
			// var oDataImpSysMulti = oDataImpSys.join("~");

			// var oDataTarget = this.getView().byId("target").getSelectedKeys();
			// var oDataTargetMulti = oDataTarget.join("~");

			// var oDataDirectionRadioBtn;
			// if (this.getView().byId("RB2-11").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-11").getText();
			// } else if (this.getView().byId("RB2-12").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-12").getText();
			// } else if (this.getView().byId("RB2-13").getSelected()) {
			// 	oDataDirectionRadioBtn = this.getView().byId("RB2-13").getText();
			// }

			// var oDataProcessTypeRadioBtn;
			// if (this.getView().byId("RB1-1").getSelected()) {
			// 	oDataProcessTypeRadioBtn = this.getView().byId("RB1-1").getText();
			// } else if (this.getView().byId("RB1-2").getSelected()) {
			// 	oDataProcessTypeRadioBtn = this.getView().byId("RB1-2").getText();
			// }

			// var oDataExceptionCheckBx = [];
			// if (this.getView().byId("CB-1").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-1").getText());
			// }
			// if (this.getView().byId("CB-2").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-2").getText());
			// }
			// if (this.getView().byId("CB-3").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-3").getText());
			// }
			// if (this.getView().byId("CB-4").getSelected()) {
			// 	oDataExceptionCheckBx.push(this.getView().byId("CB-4").getText());
			// }
			// var oDataExceptionCheckBxMulti = oDataExceptionCheckBx.join("~");

			// var oDataSecurityCheckBx = [];
			// if (this.getView().byId("CB2-01").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB2-01").getText());
			// }
			// if (this.getView().byId("CB2-02").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB2-02").getText());
			// }
			// if (this.getView().byId("CB3-03").getSelected()) {
			// 	oDataSecurityCheckBx.push(this.getView().byId("CB3-03").getText());
			// }
			// var oDataSecurityCheckBxMulti = oDataSecurityCheckBx.join("~");

			// // var oDataTestType = this.getView().byId("TestType").getSelectedKeys();
			// // var oDataTestTypeMulti = oDataTestType.join("~");

			// var oParam = {
			// 	repid: 'INT-083b-US-R-2574',
			// 	projectkey: 'INT',
			// 	processid: 'PR001',
			// 	stepno: 'S1',
			// 	fieldname: ''
			// };

			// var uParam = {
			// 	repid: 'INT-083b-US-R-2574',
			// 	projectkey: 'INT',
			// 	processid: 'PR002',
			// 	stepno: 'S2',
			// 	fieldname: ''
			// };
			// oParam.fieldname = "Functional Specification";
			// uParam.fieldname = "Functional Specification";
			// oParam.Fieldvalue = oDataFunctionalSpecificationMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Version 1.0";
			// uParam.fieldname = "Version 1.0";
			// oParam.Fieldvalue = oDataVersion10Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.Fieldname = "Approver";
			// uParam.Fieldname = "Approver";
			// oParam.Fieldvalue = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Reviewer";
			// uParam.fieldname = "Reviewer";
			// oParam.Fieldvalue = oDataInterface.Reviewer;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Author";
			// uParam.fieldname = "Author";
			// oParam.Fieldvalue = oDataInterface.Authorr;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Processing Mode";
			// uParam.fieldname = "Processing Mode";
			// oParam.Fieldvalue = oDataProcessmodeRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Source";
			// uParam.fieldname = "Source";
			// oParam.Fieldvalue = oDataSourceMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Frequency";
			// uParam.fieldname = "Frequency";
			// oParam.Fieldvalue = oDataFrequencyMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Impacted System";
			// uParam.fieldname = "Impacted System";
			// oParam.Fieldvalue = oDataImpSysMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Target";
			// uParam.fieldname = "Target";
			// oParam.Fieldvalue = oDataTargetMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Object Title";
			// uParam.fieldname = "Object Title";
			// oParam.Fieldvalue = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Story Number/Comment";
			// uParam.fieldname = "Story Number/Comment";
			// oParam.Fieldvalue = oDataInterface.StoryNumber;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Interface Direction";
			// uParam.fieldname = "Interface Direction";
			// oParam.Fieldvalue = oDataDirectionRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Processing Type";
			// uParam.fieldname = "Processing Type";
			// oParam.Fieldvalue = oDataProcessTypeRadioBtn;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Object Details/Business Requirement/Process Flow(max. 500 Chars)";
			// uParam.fieldname = "Object Details/Business Requirement/Process Flow(max. 500 Chars)";
			// oParam.Fieldvalue = oDataInterface.ObjectDetailsBusinessRequirement;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Mapping";
			// uParam.fieldname = "Mapping";
			// oParam.Fieldvalue = oDataInterface.Mapping;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Exception Handling";
			// uParam.fieldname = "Exception Handling";
			// oParam.Fieldvalue = oDataExceptionCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security";
			// uParam.fieldname = "Security";
			// oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security Section(max. 500 Chars)";
			// uParam.fieldname = "Security Section(max. 500 Chars)";
			// oParam.Fieldvalue = oDataInterface.SecuritySection;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Step";
			// uParam.fieldname = "Step";
			// oParam.Step = oDataInterface.Step;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// // oParam.fieldname = "Test Type";
			// // uParam.fieldname = "Test Type";
			// // oParam.TestType = oDataTestTypeMulti;
			// // callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Scenario";
			// uParam.fieldname = "Scenario";
			// oParam.Scenario = oDataInterface.Scenario;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Steps Performed";
			// uParam.fieldname = "Steps Performed";
			// oParam.Fieldvalue = oDataInterface.StepsPerformed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Actual Results";
			// uParam.fieldname = "Actual Results";
			// oParam.Fieldvalue = oDataInterface.ActualResults;
			// callServices.fnUpdateInMainTable(oParam, uParam);
			//this.byId("oBTPrint").setVisible(true);
		},

		onConfirmApprove: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'APPROVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Status_FS);
			var that = this;
			var user = that.getView().getModel("intData").getData().Approver;
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
			var oDataForMail = that.getView().getModel("intData").getData();
			var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
			var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
			callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
			callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
				oDataForMail.ObjectTitle);

			var oCurrentView = this.getView();

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("oBTPrint").setVisible(true);

		},
		onConfirmAccept: function() {

			//set staus here

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'ACCEPTED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Status_FS);
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

			var oCurrentView = this.getView();

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			oCurrentView.byId("oBTPrint").setVisible(true);
		},

		onConfirmSumit: function() {
			// Update Process Lane Starts

			var oCurrentView = this.getView();
			if (this.getView().byId("oBTSubmit").getText() === "Submit") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

				oCurrentView.byId("oBTSubmit").setText("Approve");

				var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

				oParam.Fieldname = "STATUS_FS";
				uParam.Fieldname = "STATUS_FS";
				oParam.Fieldvalue = "SUBMITTED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS);

			}
		},

		checkStatus: function() {
			var oCurrentView = this.getView();
			var intData1 = {
				STATUS: ""

			};
			this.oReadInterfaceDataSuccess = {
				STATUS: false

			};

			var intJSON = new sap.ui.model.json.JSONModel(intData1);

			this.getView().setModel(intJSON, "intData1");
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			oParam.Fieldname = "STATUS_FS";
			callServices.fnGetDataMainTable(oParam, intData1, "STATUS", this.oReadInterfaceDataSuccess);
	var crNumber = sessionStorage.getItem("crNumber");
			if (intData1.STATUS === "SAVED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				this.getReviewData(false);
			}
				else if (intData1.STATUS === 'ON HOLD' && crNumber === "") {
					oCurrentView.byId("oBTSave").setEnabled(false);
				
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
						//oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				//	oCurrentView.byId("oBTPrint").setVisible(true);

				}
			else if (intData1.STATUS === "SUBMITTED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				this.getReviewData(true);
			} else if (intData1.STATUS === "APPROVED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				this.getReviewData(true);
			} else if (intData1.STATUS === "ACCEPTED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
				this.getReviewData(true);
			} else {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
				this.getReviewData(false);
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
				// 	sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
				// }
				// if (success && error) {
				// 	newarray.push({
				// 		type: "Success",
				// 		title: "Fields Updated",
				// 		description: "All other fields updated",
				// 		icon: "sap-icon://message-success"
				// 	});
				// 	sap.ui.getCore().oMessagePopover.getModel().setData(newarray);
				// }
				sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
			}

		},
		addNewRowComLog: function() {
			this.getView().getModel("intData").getData().CommLog.push({
				IssueDesc: "",
				Priority: "",
				DateLogg: "",
				Status: "",
				DateResol: "",
				Resolv: "",
				AssignedTo: "",
				flag: false
			});
			this.getView().getModel("intData").refresh();
		},
		// deleteRowComLog: function(oEvent) {

		// 	if (this.getView().getModel("intData").getData().CommLog.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/CommLog/")[1];
		// 		this.getView().getModel("intData").getData().CommLog.splice(index, 1);
		// 		this.getView().getModel("intData").refresh();
		// 	}
		// },
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

		onConfirmDeleteCommLog: function(sEvent) {
			var oCMEntry, sCMEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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
			if (this.getView().getModel("intData").getData().CommLog.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/CommLog/")[1];
				var FieldnameIndex = parseInt(index) + 1;
				// var index1 = this.getView().getModel("enhData").getData().CommLog.length;
				oCMEntry = this.getView().getModel("intData").getData().CommLog[index];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CMLOG_" + FieldnameIndex;
				this.deleteCommCall(oParam, uParam, index);
			} else if (this.getView().getModel("intData").getData().CommLog.length === 1) {
				oCMEntry = this.getView().getModel("intData").getData().CommLog[0];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CMLOG_1";
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
						if (that.getView().getModel("intData").getData().CommLog.length === 1) {
							that.getView().getModel("intData").getData().CommLog.splice(0, 1);

							that.getView().getModel("intData").getData().CommLog.push({
								IssueDesc: "",
								Priority: "",
								DateLogg: "",
								Status: "",
								DateResol: "",
								Resolv: "",
								AssignedTo: "",
								flag: false
							});
							that.getView().getModel("intData").refresh();
						} else {
							that.getView().getModel("intData").getData().CommLog.splice(index, 1);
							that.getView().getModel("intData").refresh();
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
		addNewRowUA: function() {
			stepID++;
			this.getView().getModel("intData").getData().userAcceptance.push({
				step: stepID,
				testType: "",
				scenario: "",
				testData: "",
				stepsPer: "",
				actualResults: "",
				expectedResults: ""
			});
			this.getView().getModel("intData").refresh();
		},
		// deleteRowUA: function(oEvent) {

		// 	if (this.getView().getModel("intData").getData().userAcceptance.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/userAcceptance/")[1];
		// 		this.getView().getModel("intData").getData().userAcceptance.splice(index, 1);
		// 		this.getView().getModel("intData").refresh();
		// 	}
		// },
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
		},

		onConfirmDelete: function(sEvent) {
			var that = this;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oUAEntry, sUAEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
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
			if (this.getView().getModel("intData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				// var index1 = this.getView().getModel("enhData").getData().userAcceptance.length;
				var FieldnameIndex = parseInt(index) + 1;
				oUAEntry = this.getView().getModel("intData").getData().userAcceptance[index];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_" + FieldnameIndex;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("intData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("intData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_1";
				this.deleteUserCall(oParam, uParam, index);
			}
		},

		deleteUserCall: function(oParam, uParam, index) {
			stepID--;
			var that = this;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var aErrorMsgData = [];
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("intData").getData().userAcceptance.length === 1) {
							that.getView().getModel("intData").getData().userAcceptance.splice(0, 1);

							that.getView().getModel("intData").getData().userAcceptance.push({
								step: "1",
								testType: "",
								scenario: "",
								testData: "",
								stepsPer: "",
								actualResults: "",
								expectedResults: "",
								flag: false
							});
							stepID = 1;
							that.getView().getModel("intData").refresh();
						} else {
							that.getView().getModel("intData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("intData").refresh();
							//that.updateUserAcc(oParam, uParam);
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
		callAttachment: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachIntDet').getId()) {
				//callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet");
				// callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet", this.readAttachments1, oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "IntDet";

				if (this.getView().byId("fileUploadIntDet").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

				//this.readAttachments1(oServiceParam);

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachIntMap').getId()) {
				//callServices.callAttachmentService(this.getView().byId("fileUploadIntMap"), "IntMap");
				// callServices.callAttachmentService(this.getView().byId("fileUploadIntMap"), "IntMap", this.readAttachments, oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "IntMap";
				//this.readAttachments(oServiceParam);

				if (this.getView().byId("fileUploadIntMap").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadIntMap"), "IntMap",
						oServiceParam, this.getView().getModel("intDataMap"), "attachIntMap", "attachIntMapVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachRepReqi').getId()) {
				if (this.getView().byId("fileUploadRepReqi").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadRepReqi"), "conversionUploadDatai",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDeti", "attachIntDetVisiblei");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}
			}
		},

		/*readAttachments1: function(mParameter) {

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
				},*/
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
				datatype: "application/json"
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

		openSampleDataSheet: function() {

			window.open(
				"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='INT',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='IntDet',FILENAME='Sample_Data_Sheet.xlsx')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		},

		openTechSpecDoc: function() {

			window.open(
				"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='INT',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='IntPHLTS',PROJECTID='',OBJECT_ID='INT_SAM_2')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		},

		openSampleMappingSheet: function() {

			window.open(
				"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='INT',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='IntMap',PROJECTID='',OBJECT_ID='INT_SAM_1')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		}

		/*readAttachments: function(mParameter) {

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
				}*/

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceFS
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceFS
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceFS
		 */
		//	onExit: function() {
		//
		//	}

	});

});