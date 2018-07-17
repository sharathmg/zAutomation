var stepID = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV'
], function(Controller, callServices, MessageBox, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.MiddlewareTS", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceTS
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("middlewareSpec").attachPatternMatched(this.onObjectMatched, this);

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
			var that = this;
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor"],
				function(RTE) {
					var oRichTextEditor1 = new RTE("middlewareRTE1", {
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
						value: "{middlewareData>/TechnicalAssumptionsDependencies_MW}"
					});

					var oRichTextEditor2 = new RTE("middlewareRTE2", {
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
						value: "{middlewareData>/EnvironmentConnectivityDetails_MW}"
					});

					var oRichTextEditor3 = new RTE("middlewareRTE3", {
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
						value: "{middlewareData>/ProcessFlowDesign_MW}"
					});

					var oRichTextEditor4 = new RTE("middlewareRTE4", {
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
						value: "{middlewareData>/Mapping_MW}"
					});

					var oRichTextEditor5 = new RTE("middlewareRTE5", {
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
						value: "{middlewareData>/AttachmentsDocumentation_MW}"
					});

					var oRichTextEditor6 = new RTE("middlewareRTE6", {
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
						value: "{middlewareData>/SecuritySection_MW}"
					});

					var oRichTextEditor7 = new RTE("middlewareRTE7", {
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
						value: "{middlewareData>/TechnicalDesign_MW}"
					});
					var oRichTextEditor8 = new RTE("middlewareRTE8", {
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
						value: "{middlewareData>/ErrorHandling_MW}"
					});
					that.getView().byId("idVerticalLayout7").addContent(oRichTextEditor7);
					that.getView().byId("idVerticalLayout1").addContent(oRichTextEditor1);
					that.getView().byId("idVerticalLayout2").addContent(oRichTextEditor2);
					that.getView().byId("idVerticalLayout3").addContent(oRichTextEditor3);
					that.getView().byId("idVerticalLayout4").addContent(oRichTextEditor4);
					that.getView().byId("idVerticalLayout5").addContent(oRichTextEditor5);
					that.getView().byId("idVerticalLayout6").addContent(oRichTextEditor6);
					that.getView().byId("idVerticalLayout8").addContent(oRichTextEditor8);
					sap.ui.getCore().applyChanges();
					oRichTextEditor1.addButtonGroup("styleselect").addButtonGroup("table");
				});
			this.changeVersionKeyFlag = false;
			var oModelPf2 = new sap.ui.model.json.JSONModel();
			var viewPf2 = this.getView();
			oModelPf2.setData(oDataProcessFlowLanesOnly);
			viewPf2.setModel(oModelPf2, "pf2");
			viewPf2.byId("processflow2").updateModel();
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
				oParam.Fieldname = "TS_UA_" + (EiCountUA + 1);

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
				} ]
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

			today = mm + '_' + dd + '_' + yyyy;
			// download exported file
			oExport.saveFile("TS_UAT_" + today).catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},

		onPrint: function() {
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var versionno = currentversion.split(" ");
			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&projectid=" + projectID;
				sap.m.URLHelper.redirect(
					"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Interface_MS.html?sap-language=EN" + mParameter,
					true
				);
			}
		},

		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S2";
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.byId("doctype").setSelectedKey("Middleware");
			var type = sap.ui.getCore().getModel().getData().Key;

			var obj = sap.ui.getCore().getModel().getData().Obj;
			switch (obj) {
				case "new":
					// this.byId("commLog").setVisible(false);
					this.byId("versiontypeNewTech").setVisible(true);
					//		this.byId("versiontypeExistingTech").setVisible(false);
					this.getDataForInterface("N");
					break;
				case "existing":
					// this.byId("commLog").setVisible(true);
					this.byId("versiontypeNewTech").setVisible(false);
					this.byId("versiontypeExistingTech").setVisible(true);
					this.byId("versiontypeExistingTech").destroyItems();

					var oSelect = this.getView().byId("versiontypeExistingTech");
					var newItem = new sap.ui.core.Item({
						key: "Version 1.0",
						text: "Version 1.0"
					});

					oSelect.addItem(newItem);
					this.getDataForInterface("E");
					break;
			}

			// this.byId("approvalTab").setVisible(false);
			// this.byId("mappingTab").setVisible(false);
		},
		onChangeVersionExistingTech: function(oevent) {
			this.changeVersionKeyFlag = true;
			var currentversion = oevent.getSource().getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var params = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			params = params.Projectkey;

			this.dataRead("E", versionno[1]);

		},
		onLiveChangeTechFlow: function() {
			var str = this.byId("security").getValue();
			this.byId("techFlowCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("techFlowErr").setVisible(true);
			} else {
				this.byId("techFlowErr").setVisible(false);
			}
		},
		onLiveChangeTechAssumptions: function() {
			var str = this.byId("security").getValue();
			this.byId("techAsmCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("techAsmErr").setVisible(true);
			} else {
				this.byId("techAsmErr").setVisible(false);
			}
		},
		onChange: function(oEvent) {
			if (oEvent.getSource().getSelectedKey() === "Middleware") {
				this.getOwnerComponent().getRouter().navTo("middlewareSpec");
			} else if (oEvent.getSource().getSelectedKey() === "Technical") {
				this.getOwnerComponent().getRouter().navTo("interfaceTS");
			} else {
				this.getOwnerComponent().getRouter().navTo("interfaceFS");
			}
		},
		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("interfaceFS");
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
			// var oDataInterface = {};
			// var oUserAcceptance = {
			// 	userAcceptance: []
			// };
			// oUserAcceptance.userAcceptance[0] = {};
			// oUserAcceptance.userAcceptance[1] = {};

			var oModelInterface = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelInterface, "middlewareData");

			var oDataInterface = {
				Approver_MW: "",
				Reviewer_MW: "",
				Author_MW: "",
				TechnicalDesign_MW: "",
				TechnicalAssumptionsDependencies_MW: "",
				EnvironmentConnectivityDetails_MW: "",
				ProcessFlowDesign_MW: "",
				Mapping_MW: "",
				AttachmentsDocumentation_MW: "",
				SecuritySection_MW: "",
				ErrorHandling_MW: "",
				Status_MW: "",
				CommLog: [],
				CommLog1: "",
				userAcceptance: [],
				userAcceptTemp: "",
				UAT1: ""
			};

			this.oDataInterfaceSuccess = {
				Approver_MW: false,
				Reviewer_MW: false,
				Author_MW: false,
				ObjectID_MW: false,
				TechnicalDesign_MW: false,
				TechnicalAssumptionsDependencies_MW: false,
				EnvironmentConnectivityDetails_MW: false,
				ProcessFlowDesign_MW: false,
				Mapping_MW: false,
				AttachmentsDocumentation_MW: false,
				SecuritySection_MW: false,
				ErrorHandling_MW: false,
				Status_MW: false,
				CommLog: false,
				userAcceptance: false,
				userAcceptTemp: false
			};
			var intDataDet = {
				attachIntDet: [],
				attachIntDetVisible: false
			};
			var intDataDetJSON = new sap.ui.model.json.JSONModel(intDataDet);
			this.getView().setModel(intDataDetJSON, "intDataDet");

			if (sRequestType === "N") {
				// this.byId("frequency").removeAllSelectedItems();
				// this.byId("target").removeAllSelectedItems();
				// this.byId("impactedSystem").removeAllSelectedItems();

				this.byId("CB1-01").setSelected(false);
				this.byId("CB1-02").setSelected(false);
				this.byId("CB1-03").setSelected(false);
				this.byId("CB2-01").setSelected(false);
				this.byId("CB2-02").setSelected(false);
				this.byId("CB2-03").setSelected(false);
				this.byId("CB3-01").setSelected(false);
				this.byId("CB3-02").setSelected(false);
				this.byId("CB3-03").setSelected(false);
				this.byId("CB3-04").setSelected(false);
				this.byId("CB3-05").setSelected(false);
				// this.byId("RB2-11").setSelected(true);
				// this.byId("RB1-1").setSelected(true);
				// this.byId("RB1-11").setSelected(true);
				// this.byId("CB-1").setSelected(false);
				// this.byId("CB-2").setSelected(false);
				// this.byId("CB-3").setSelected(false);
				// this.byId("CB-4").setSelected(false);
				// this.byId("CB2-01").setSelected(false);
				// this.byId("CB2-02").setSelected(false);
				// this.byId("CB2-03").setSelected(false);

				var oDataInterface = {
					Approver: "",
					Reviewer: "",
					Author: "",
					ObjectID: "",
					ProcessingMode: "",
					Source: "",
					Frequency: "",
					ImpactedSystem: "",
					ObjectTitle: "",
					StoryNumber: "",
					Target: "",
					InterfaceDirection: "",
					ProcessingType: "",
					ObjectDetails: "",
					Mapping: "",
					AIFFramework: "",
					ErrorHandlingUsingCustomIDOC: "",
					ManualInterfaceProgramLog: "",
					FTP: "",
					ExceptionHandling: "",
					ExceptionHandlingOptions: "",
					Security: "",
					SecuritySection: "",
					HTTPSSFTP: "",
					UserAuthorization: "",
					TechnicalAssumption: "",
					GeneralInformation: "",
					RFCInterface: "",
					Encryption: "",
					Step: "",
					TestType: "",
					Scenario: "",
					StepsPerformed: "",
					ActualResults: "",
					STATUS: "",
					CommLog: [],
					CommLog1: "",
					userAcceptance: [],
					userAcceptTemp: "",
					UAT1: ""
				};
			}

			var middlewareAttach = {
				middlewareAttachCommon: [],
				middlewareAttachCommonVisible: false
			};
			var middlewareAttachJSON = new sap.ui.model.json.JSONModel(middlewareAttach);
			this.getView().setModel(middlewareAttachJSON, "middlewareAttach");

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
						oParam.Fieldname = "STATUS_MW";
						callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_MW", this.oDataInterfaceSuccess);
						oDataInterface.versionLatest = oDataInterface.Status_MW;
						//SOC Writwick 12 July 2018
						// if (oDataInterface.versionLatest !== undefined) {
						if (oDataInterface.versionLatest !== "") {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							if (oDataInterface.versionLatest === "ACCEPTED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExistingTech");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							// oDataInterface.versionLatest = undefined;
							// oDataInterface.Status_MW = undefined;
							oDataInterface.versionLatest = "";
							oDataInterface.Status_MW = "";
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

				oParam.Fieldname = "STATUS_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_MW", this.oDataInterfaceSuccess);
				var statusLastVersion = oDataInterface.Status_MW;
				var statusLast = statusLastVersion;
				if (statusLastVersion === "ACCEPTED" && versionNo === undefined) {

					var crNumber = sessionStorage.getItem("crNumber");
					if (crNumber === "") {
						// this.getView().byId("storynumber").setValue("");
						oDataInterface.StoryNumber = "";
						oParam.Version = parseInt(oParam.Version);
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);

						var vItem = parseInt(oParam.Version);
						this.byId('versiontypeExistingTech').removeItem(vItem);

					} else {
						// this.getView().byId("storynumber").setValue(crNumber);
						oDataInterface.StoryNumber = crNumber;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExistingTech').setSelectedKey(selectedKey);
					}

				}
				statusLastVersion = undefined;
				oDataInterface.Status_MW = undefined;
				this.readAttachments1({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntData_TS",
					TYPE: "O"
				});

				this.readAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "middlewareAttach",
					TYPE: "O"
				});
				// oParam.fieldname = "Technical Specification";
				// oDataInterface.TechnicalSpecification = callServices.fnCallMainTable(oParam);

				this.checkStatus();
				if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
						sessionStorage.getItem("crNumber") !== "")) {
					oParam.Version = parseInt(oParam.Version) - 1;
					oParam.Version = (oParam.Version).toString() + ".0";
				}

				oParam.Fieldname = "Object Title";
				oParam.Stepno = "S1";
				// oDataInterface.ObjectTitle = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ObjectTitle", this.oDataInterfaceSuccess);
				oDataInterface.Title = "Interface - " + oParam.Repid + " - " + oDataInterface.ObjectTitle;

				oParam.Stepno = "S2";

				oParam.Fieldname = "Verion 1.0";
				oDataInterface.Verion10 = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Approver_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Approver_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Reviewer_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Reviewer_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Author_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Author_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "TechnicalDesign_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TechnicalDesign_MW", this.oDataInterfaceSuccess);
				if (!oDataInterface.TechnicalDesign_MW) {
					oDataInterface.TechnicalDesign_MW =
						"<b>Introduction</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Configuration details</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Source File Structure</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>RFC Structure</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>High Level Desgin</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>High Level Architecture</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Trigger mechanism</b><br><br><br><br>";
				}

				oParam.Fieldname = "TechnicalAssumptionsDependencies_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TechnicalAssumptionsDependencies_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "EnvironmentConnectivityDetails_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "EnvironmentConnectivityDetails_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ProcessFlowDesign_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProcessFlowDesign_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Mapping_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Mapping_MW", this.oDataInterfaceSuccess);
				if (!oDataInterface.Mapping_MW) {
					oDataInterface.Mapping_MW =
						"<b>ETL Technical – High Level Overview Mappings</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Session & mapping details</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Mapping Parameter & Variable</b><br><br><br>";
				}

				oParam.Fieldname = "AttachmentsDocumentation_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AttachmentsDocumentation_MW", this.oDataInterfaceSuccess);
				if (!oDataInterface.AttachmentsDocumentation_MW) {
					oDataInterface.AttachmentsDocumentation_MW =
						"<b>Appendix</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Glossary</b><br><br><br><br><br><br><br><br><b>Transformation Details Document</b><br><br><br>";
				}

				oParam.Fieldname = "SecuritySection_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecuritySection_MW", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ErrorHandling_MW";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrorHandling_MW", this.oDataInterfaceSuccess);
				if (!oDataInterface.ErrorHandling_MW) {
					oDataInterface.ErrorHandling_MW =
						"<b>Error Handling</b><br><br><br><br><br><br><br><br><br><br><br><br><br><br><b>Failure and Recovery</b><br><br><br><br><br><br><br><br>";
				}
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.userAcceptTemp = "";
					oParam.Fieldname = "TS_UA_" + (iCountUA + 1);

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
			}

			oModelInterface.setData(oDataInterface);

		},
		onConfirmSave: function() {
			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainer").setVisible(true);

			if (obj === "new") {
				this.oDataInterfaceSuccess = {
					Approver_MW: false,
					Reviewer_MW: false,
					Author_MW: false,
					ObjectID: false,
					TechnicalDesign_MW: false,
					TechnicalAssumptionsDependencies_MW: false,
					EnvironmentConnectivityDetails_MW: false,
					ProcessFlowDesign_MW: false,
					Mapping_MW: false,
					AttachmentsDocumentation_MW: false,
					SecuritySection_MW: false,
					ErrorHandling_MW: false,
					// ProcessingMode: false,
					// Source: false,
					// Frequency: false,
					// ImpactedSystem: false,
					// ObjectTitle: false,
					// StoryNumberComment: false,
					// Target: false,
					// InterfaceDirection: false,
					// ProcessingType: false,
					// ObjectDetails: false,
					// Mapping: false,
					// AIFFramework: false,
					// ErrorHandlingUsingCustomIDOC: false,
					// ManualInterfaceProgramLog: false,
					// FTP: false,
					// ExceptionHandling: false,
					// Security: false,
					// HTTPSSFTP: false,
					// UserAuthorization: false,
					// Encryption: false,
					// Step: false,
					// TestType: false,
					STATUS_MW: false,
					Scenario: false,
					StepsPerformed: false,
					ActualResults: false,
					CommLog: false,
					userAcceptance: false
				};
				this.updateInterfaceTS();

				// Update Process Lane Starts
				var oCurrentView = this.getView();
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends
			} else if (obj === "existing") {

				this.updateInterfaceTS();

				// Update Process Lane Starts
				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

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
				oView.getModel("middlewareAttach").getData().middlewareAttachCommon = [];
				$.each(oVal, function(index, item) {
					oView.getModel("middlewareAttach").getData().middlewareAttachCommon.push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src
					});
					oView.getModel("middlewareAttach").getData().middlewareAttachCommonVisible = true;
				});
				oView.getModel("middlewareAttach").refresh();

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
		updateInterfaceTS: function() {
			var oDataInterface = this.getView().getModel("middlewareData").getData();

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

			oParam.Fieldname = uParam.Fieldname = "STATUS_MW";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_MW);

			oParam.Fieldname = uParam.Fieldname = "Approver_MW";
			oParam.Fieldvalue = oDataInterface.Approver_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Approver_MW);

			oParam.Fieldname = uParam.Fieldname = "Reviewer_MW";
			oParam.Fieldvalue = oDataInterface.Reviewer_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Reviewer_MW);

			oParam.Fieldname = uParam.Fieldname = "Author_MW";
			oParam.Fieldvalue = oDataInterface.Author_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Author_MW);

			oParam.Fieldname = uParam.Fieldname = "TechnicalDesign_MW";
			oParam.Fieldvalue = oDataInterface.TechnicalDesign_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TechnicalDesign_MW);

			oParam.Fieldname = uParam.Fieldname = "TechnicalAssumptionsDependencies_MW";
			oParam.Fieldvalue = oDataInterface.TechnicalAssumptionsDependencies_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TechnicalAssumptionsDependencies_MW);

			oParam.Fieldname = uParam.Fieldname = "EnvironmentConnectivityDetails_MW";
			oParam.Fieldvalue = oDataInterface.EnvironmentConnectivityDetails_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.EnvironmentConnectivityDetails_MW);

			oParam.Fieldname = uParam.Fieldname = "ProcessFlowDesign_MW";
			oParam.Fieldvalue = oDataInterface.ProcessFlowDesign_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProcessFlowDesign_MW);

			oParam.Fieldname = uParam.Fieldname = "Mapping_MW";
			oParam.Fieldvalue = oDataInterface.Mapping_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Mapping_MW);

			oParam.Fieldname = uParam.Fieldname = "AttachmentsDocumentation_MW";
			oParam.Fieldvalue = oDataInterface.AttachmentsDocumentation_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.AttachmentsDocumentation_MW);

			oParam.Fieldname = uParam.Fieldname = "SecuritySection_MW";
			oParam.Fieldvalue = oDataInterface.SecuritySection_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SecuritySection_MW);

			oParam.Fieldname = uParam.Fieldname = "ErrorHandling_MW";
			oParam.Fieldvalue = oDataInterface.ErrorHandling_MW;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrorHandling_MW);

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataInterface.userAcceptance.length; iCountUA++) {

				oDataInterface.userAcceptTemp = "";
				oParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "TS_UA_" + (iCountUA + 1);
				oUAEntry = oDataInterface.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}

			sap.m.MessageToast.show("Data saved");
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
					FIELDNAME: "IntData_TS",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");

			}
			oTable.setBusy(false);

		},
		callAttachment: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno
			};
			if (oEvent.getSource().getId() === this.getView().byId('uploadMiddlewareAttach').getId()) {
				if (this.getView().byId("fileUploadAttach").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadAttach"), "middlewareAttach",
						oServiceParam, this.getView().getModel("middlewareAttach"), "middlewareAttachCommon", "middlewareAttachCommonVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadMiddlewareAttach1').getId()) {
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
							that.getView().byId("oBTSubmit").setVisible(true);
							that.getView().byId("oBTSubmit").setEnabled(true);
							that.getView().byId("oBTSave").setVisible(true);
							that.getView().byId("oBTSave").setEnabled(true);
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

			// var oDataTechnicalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			// var oDataTechnicalSpecificationMulti = oDataTechnicalSpecification.join("~");

			// var oDataVersion10 = this.getView().byId("Version10").getSelectedKeys();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			// var oDataTypeInterfaceCheckBx = [];
			// if (this.getView().byId("CB1-01").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-01").getText());
			// }
			// if (this.getView().byId("CB1-02").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			// }
			// if (this.getView().byId("CB1-02").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			// }
			// var oDataTypeInterfaceCheckBxMulti = oDataTypeInterfaceCheckBx.join("~");

			// var oDataRunModeCheckBx = [];
			// if (this.getView().byId("CB2-01").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-01").getText());
			// }
			// if (this.getView().byId("CB2-02").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-02").getText());
			// }
			// if (this.getView().byId("CB2-03").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-03").getText());
			// }
			// var oDataRunModeCheckBxMulti = oDataRunModeCheckBx.join("~");

			// var oDataFrequencyCheckBx = [];
			// if (this.getView().byId("CB3-01").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-01").getText());
			// }
			// if (this.getView().byId("CB3-02").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-02").getText());
			// }
			// if (this.getView().byId("CB3-03").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-03").getText());
			// }
			// if (this.getView().byId("CB3-04").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-04").getText());
			// }
			// if (this.getView().byId("CB3-05").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-05").getText());
			// }
			// var oDataFrequencyCheckBxMulti = oDataFrequencyCheckBx.join("~");

			// var oDataTestType = this.getView().byId("Version10").getSelectedKeys();
			// var oDataTestTypeMulti = oDataTestType.join("~");

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
			// oParam.fieldname = "Technical Specification";
			// uParam.fieldname = "Technical Specification";
			// oParam.TechnicalSpecification = oDataTechnicalSpecificationMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Verion 1.0";
			// uParam.fieldname = "Verion 1.0";
			// oParam.Verion10 = oDataVersion10Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Approver";
			// uParam.fieldname = "Approver";
			// oParam.Step = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Reviewer";
			// uParam.fieldname = "Reviewer";
			// oParam.Step = oDataInterface.Reviewer;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Author";
			// uParam.fieldname = "Author";
			// oParam.Step = oDataInterface.Author;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Program Name(s)";
			// uParam.fieldname = "Program Name(s)";
			// oParam.Step = oDataInterface.ProgramName;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Include Files";
			// uParam.fieldname = "Include Files";
			// oParam.Step = oDataInterface.IncludeFiles;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Interface Transaction";
			// uParam.fieldname = "Interface Transaction";
			// oParam.Step = oDataInterface.InterfaceTransaction;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Called Transaction(s)";
			// uParam.fieldname = "Called Transaction(s)";
			// oParam.Step = oDataInterface.CalledTransaction;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Authorization Object Used";
			// uParam.fieldname = "Authorization Object Used";
			// oParam.Step = oDataInterface.AuthorizationObjectUsed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Type of Interface";
			// uParam.fieldname = "Type of Interface";
			// oParam.Step = oDataTypeInterfaceCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Run Mode";
			// uParam.fieldname = "Run Mode";
			// oParam.Step = oDataRunModeCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Frequency";
			// uParam.fieldname = "Frequency";
			// oParam.Step = oDataFrequencyCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "External System(s)";
			// uParam.fieldname = "External System(s)";
			// oParam.Step = oDataInterface.ExternalSystem;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Data Volume (Records)";
			// uParam.fieldname = "Data Volume (Records)";
			// oParam.Step = oDataInterface.DataVolume;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Upload File Type and Format";
			// uParam.fieldname = "Upload File Type and Format";
			// oParam.Step = oDataInterface.UploadFileTypeandFormat;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Logical Path";
			// uParam.fieldname = "Logical Path";
			// oParam.Step = oDataInterface.LogicalPath;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Logical File";
			// uParam.fieldname = "Logical File";
			// oParam.Step = oDataInterface.LogicalFile;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Proxy Based Interface";
			// uParam.fieldname = "Proxy Based Interface";
			// oParam.Step = oDataInterface.ProxyBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "IDOC Based Interface";
			// uParam.fieldname = "IDOC Based Interface";
			// oParam.Step = oDataInterface.IDOCBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Service Based Interface";
			// uParam.fieldname = "Service Based Interface";
			// oParam.Step = oDataInterface.ServiceBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "SOAP API";
			// uParam.fieldname = "SOAP API";
			// oParam.Step = oDataInterface.SOAPAPI;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security Section";
			// uParam.fieldname = "Security Section";
			// oParam.Step = oDataInterface.SecuritySection;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Error Handling";
			// uParam.fieldname = "Error Handling";
			// oParam.Step = oDataInterface.ErrorHandling;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Step";
			// uParam.fieldname = "Step";
			// oParam.Step = oDataInterface.Step;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Test Type";
			// uParam.fieldname = "Test Type";
			// oParam.Step = oDataTestTypeMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Scenario";
			// uParam.fieldname = "Scenario";
			// oParam.Step = oDataInterface.Scenario;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Steps Performed";
			// uParam.fieldname = "Steps Performed";
			// oParam.Step = oDataInterface.StepsPerformed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "ActualResults";
			// uParam.fieldname = "ActualResults";
			// oParam.Step = oDataInterface.ActualResults;
			// callServices.fnUpdateInMainTable(oParam, uParam);
		},*/
		onSubmit: function() {
			// Update Process Lane Starts
			/*var oCurrentView = this.getView();
			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();*/
			var oCurrentView = this.getView();
			var msg;
			var that = this;
			if (this.getView().byId("oBTSubmit").getText() === "Submit") {
				msg = "Do You want to Submit the data";

			} else if ((this.getView().byId("oBTSubmit").getText() === "Accept")) {
				msg = "Do You want to Accept the data";
			} else {
				msg = "Do You want to Approve the data";
			}
			sap.m.MessageBox.show(
				msg, {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmSumit();
						}

					}
				}
			);

			// Update Process Lane Ends

			// var oDataInterface = this.getView().getModel("intData").getData();

			// var oDataTechnicalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			// var oDataTechnicalSpecificationMulti = oDataTechnicalSpecification.join("~");

			// var oDataVersion10 = this.getView().byId("Version10").getSelectedKeys();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			// var oDataTypeInterfaceCheckBx = [];
			// if (this.getView().byId("CB1-01").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-01").getText());
			// }
			// if (this.getView().byId("CB1-02").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			// }
			// if (this.getView().byId("CB1-02").getSelected()) {
			// 	oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			// }
			// var oDataTypeInterfaceCheckBxMulti = oDataTypeInterfaceCheckBx.join("~");

			// var oDataRunModeCheckBx = [];
			// if (this.getView().byId("CB2-01").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-01").getText());
			// }
			// if (this.getView().byId("CB2-02").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-02").getText());
			// }
			// if (this.getView().byId("CB2-03").getSelected()) {
			// 	oDataRunModeCheckBx.push(this.getView().byId("CB2-03").getText());
			// }
			// var oDataRunModeCheckBxMulti = oDataRunModeCheckBx.join("~");

			// var oDataFrequencyCheckBx = [];
			// if (this.getView().byId("CB3-01").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-01").getText());
			// }
			// if (this.getView().byId("CB3-02").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-02").getText());
			// }
			// if (this.getView().byId("CB3-03").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-03").getText());
			// }
			// if (this.getView().byId("CB3-04").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-04").getText());
			// }
			// if (this.getView().byId("CB3-05").getSelected()) {
			// 	oDataFrequencyCheckBx.push(this.getView().byId("CB3-05").getText());
			// }
			// var oDataFrequencyCheckBxMulti = oDataFrequencyCheckBx.join("~");

			// var oDataTestType = this.getView().byId("Version10").getSelectedKeys();
			// var oDataTestTypeMulti = oDataTestType.join("~");

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
			// oParam.fieldname = "Technical Specification";
			// uParam.fieldname = "Technical Specification";
			// oParam.TechnicalSpecification = oDataTechnicalSpecificationMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Verion 1.0";
			// uParam.fieldname = "Verion 1.0";
			// oParam.Verion10 = oDataVersion10Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Approver";
			// uParam.fieldname = "Approver";
			// oParam.Step = oDataInterface.Approver;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Reviewer";
			// uParam.fieldname = "Reviewer";
			// oParam.Step = oDataInterface.Reviewer;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Author";
			// uParam.fieldname = "Author";
			// oParam.Step = oDataInterface.Author;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Program Name(s)";
			// uParam.fieldname = "Program Name(s)";
			// oParam.Step = oDataInterface.ProgramName;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Include Files";
			// uParam.fieldname = "Include Files";
			// oParam.Step = oDataInterface.IncludeFiles;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Interface Transaction";
			// uParam.fieldname = "Interface Transaction";
			// oParam.Step = oDataInterface.InterfaceTransaction;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Called Transaction(s)";
			// uParam.fieldname = "Called Transaction(s)";
			// oParam.Step = oDataInterface.CalledTransaction;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Authorization Object Used";
			// uParam.fieldname = "Authorization Object Used";
			// oParam.Step = oDataInterface.AuthorizationObjectUsed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Type of Interface";
			// uParam.fieldname = "Type of Interface";
			// oParam.Step = oDataTypeInterfaceCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Run Mode";
			// uParam.fieldname = "Run Mode";
			// oParam.Step = oDataRunModeCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Frequency";
			// uParam.fieldname = "Frequency";
			// oParam.Step = oDataFrequencyCheckBxMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "External System(s)";
			// uParam.fieldname = "External System(s)";
			// oParam.Step = oDataInterface.ExternalSystem;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Data Volume (Records)";
			// uParam.fieldname = "Data Volume (Records)";
			// oParam.Step = oDataInterface.DataVolume;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Upload File Type and Format";
			// uParam.fieldname = "Upload File Type and Format";
			// oParam.Step = oDataInterface.UploadFileTypeandFormat;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Logical Path";
			// uParam.fieldname = "Logical Path";
			// oParam.Step = oDataInterface.LogicalPath;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Logical File";
			// uParam.fieldname = "Logical File";
			// oParam.Step = oDataInterface.LogicalFile;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Proxy Based Interface";
			// uParam.fieldname = "Proxy Based Interface";
			// oParam.Step = oDataInterface.ProxyBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "IDOC Based Interface";
			// uParam.fieldname = "IDOC Based Interface";
			// oParam.Step = oDataInterface.IDOCBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Service Based Interface";
			// uParam.fieldname = "Service Based Interface";
			// oParam.Step = oDataInterface.ServiceBasedInterface;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "SOAP API";
			// uParam.fieldname = "SOAP API";
			// oParam.Step = oDataInterface.SOAPAPI;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Security Section";
			// uParam.fieldname = "Security Section";
			// oParam.Step = oDataInterface.SecuritySection;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Error Handling";
			// uParam.fieldname = "Error Handling";
			// oParam.Step = oDataInterface.ErrorHandling;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Step";
			// uParam.fieldname = "Step";
			// oParam.Step = oDataInterface.Step;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Test Type";
			// uParam.fieldname = "Test Type";
			// oParam.Step = oDataTestTypeMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Scenario";
			// uParam.fieldname = "Scenario";
			// oParam.Step = oDataInterface.Scenario;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "Steps Performed";
			// uParam.fieldname = "Steps Performed";
			// oParam.Step = oDataInterface.StepsPerformed;
			// callServices.fnUpdateInMainTable(oParam, uParam);

			// oParam.fieldname = "ActualResults";
			// uParam.fieldname = "ActualResults";
			// oParam.Step = oDataInterface.ActualResults;
			// callServices.fnUpdateInMainTable(oParam, uParam);
		},
		onConfirmSumit: function() {
			// Update Process Lane Starts

			var oCurrentView = this.getView();
			var that = this;
			if (this.getView().byId("oBTSubmit").getText() === "Submit") {
				this.updateInterfaceTS();

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);

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

				var user = that.getView().getModel("middlewareData").getData().Approver;
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("intData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_MW";
				uParam.Fieldname = "STATUS_MW";
				oParam.Fieldvalue = "SUBMITTED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_MW);
			} else if (this.getView().byId("oBTSubmit").getText() === "Approve") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);

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
				var user = that.getView().getModel("middlewareData").getData().Approver;
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("middlewareData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_MW";
				uParam.Fieldname = "STATUS_MW";
				oParam.Fieldvalue = "APPROVED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_MW);
			} else if (this.getView().byId("oBTSubmit").getText() === "Accept") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);

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
				var user = that.getView().getModel("middlewareData").getData().Approver;
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("middlewareData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_MW";
				uParam.Fieldname = "STATUS_MW";
				oParam.Fieldvalue = "ACCEPTED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_MW);
			}

		},
		checkStatus: function() {
			var oCurrentView = this.getView();
			var intData1 = {
				STATUS_MW: ""

			};
			this.oReadInterfaceDataSuccess = {
				STATUS_MW: false

			};

			var intJSON = new sap.ui.model.json.JSONModel(intData1);

			this.getView().setModel(intJSON, "intData1");
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			oParam.Fieldname = "STATUS_MW";
			callServices.fnGetDataMainTable(oParam, intData1, "STATUS_MW", this.oReadInterfaceDataSuccess);

			if (intData1.STATUS_MW === "SUBMITTED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);

			} else if (intData1.STATUS_MW === "APPROVED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
			} else if (intData1.STATUS_MW === "SAVED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
			} else if (intData1.STATUS_MW === "ACCEPTED") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
			} else {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
			}
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
				var FieldnameIndex = parseInt(index) + 1;
					// var index1 = this.getView().getModel("enhData").getData().userAcceptance.length;
				oUAEntry = this.getView().getModel("intData").getData().userAcceptance[index];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_" + FieldnameIndex;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("intData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("intData").getData().userAcceptance[0];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "TS_UA_1";
				this.deleteUserCall(oParam, uParam, index);
			}
		},

		deleteUserCall: function(oParam, uParam, index) {
			stepID--;
			var currentversion = this.byId("versiontypeExistingTech").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var that = this;
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
		}

	});

});