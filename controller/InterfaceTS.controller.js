//Gaurav 13th April 2018 1:00AM
var stepID = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	'sap/ui/richtexteditor/RichTextEditor'
], function(Controller, callServices, MessageBox, Export, ExportTypeCSV,RichTextEditor) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.InterfaceTS", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.InterfaceTS
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("interfaceTS").attachPatternMatched(this.onObjectMatched, this);

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
		onDataExport: function(oEvent) {

			var oReadExcel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oReadExcel, "excelData");

			var oDataReadExcel = {

				EuserAcceptance: [],
				EuserAcceptTemp: "",

			};

			var oDataReadExcelSuccess = {

				EuserAcceptance: true,
				EuserAcceptTemp: true,

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
				}, ]
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
					"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Interface_TS.html?sap-language=EN" + mParameter,
					true
				);
			}
		},

		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S2";
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.byId("doctype").setSelectedKey("Technical");
			var type = sap.ui.getCore().getModel().getData().Key;
			var title = "Interface TS - Object 2104 - Material Master Update";

			//this.byId("oDataService").setVisible(true);
			//this.byId("otherInfo").setVisible(true);
			//this.byId("mapping").setVisible(true);
			this.byId("page").setTitle(title);

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
			this.byId("approvalTab").setVisible(false);
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
			// 	Processid: 'PR001',
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
			this.getView().setModel(oModelInterface, "intData");

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
				StoryNumberComment: "",
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
				Security: "",
				HTTPSSFTP: "",
				UserAuthorization: "",
				GeneralInformation: "",
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
				TS_PI_IntegrationScenario: [],
				TS_PI_MessageMapping: [],
				TS_PI_OperationMapping: [],
				TS_PI_ServiceInterfaces: [],
				TS_PI_ImportedObjects: [],
				TS_PI_CommunicationComponent: [],
				TS_PI_SenderCommunicationDetails: [],
				TS_PI_ReceiverCommunicationDetails: [],
				TS_PI_IntegrationFlow: [],
				TS_PI_IntegratedConfigurations: [],
				userAcceptTemp: "",
				UAT1: "",
				TS_InterfaceDesign: "",
				TechnicalAssumption: "",
				ProxyBasedInterface: "",
				TS_MappingTextDef: "",
				IDOCBasedInterface: "",
				ServiceBasedInterface: "",
				SOAPAPI: "",
				RFCInterface: "",
				SecuritySection: "",
				ErrorHandling: "",
				TS_MessageType: "",
				TS_DataTypes: "",
				TS_DTEnh: "",
				TS_ExternalDef: "",
				TS_TAAD: "",
				TS_Part_y: "",
				TS_DirectC: "",
				TS_AlertCat: ""

			};

			this.oDataInterfaceSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectID: false,
				ProcessingMode: false,
				Source: false,
				Frequency: false,
				ImpactedSystem: false,
				ObjectTitle: false,
				StoryNumberComment: false,
				Target: false,
				InterfaceDirection: false,
				ProcessingType: false,
				ObjectDetails: false,
				Mapping: false,
				AIFFramework: false,
				ErrorHandlingUsingCustomIDOC: false,
				ManualInterfaceProgramLog: false,
				FTP: false,
				ExceptionHandling: false,
				Security: false,
				HTTPSSFTP: false,
				UserAuthorization: false,
				TechnicalAssumption: false,
				GeneralInformation: false,
				RFCInterface: false,
				Encryption: false,
				Step: false,
				TestType: false,
				Scenario: false,
				StepsPerformed: false,
				ActualResults: false,
				STATUS: false,
				CommLog: false,
				userAcceptance: false,
				TS_PI_IntegrationScenario: false,
				TS_PI_MessageMapping: false,
				TS_PI_OperationMapping: false,
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
						oParam.Fieldname = "STATUS_TS";
						callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_TS", this.oDataInterfaceSuccess);
						oDataInterface.versionLatest = oDataInterface.Status_TS;
						//SOC Writwick 12 July 2018
						if (oDataInterface.versionLatest !== "") {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							if (oDataInterface.versionLatest === "APPROVED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExistingTech");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							oDataInterface.versionLatest = "";
							oDataInterface.Status_TS = "";
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

				oParam.Fieldname = "STATUS_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Status_TS", this.oDataInterfaceSuccess);
				var statusLastVersion = oDataInterface.Status_TS;
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
				if (statusLastVersion === "APPROVED" && versionNo === undefined) {

					var crNumber = sessionStorage.getItem("crNumber");
					if (crNumber === "") {
						// this.getView().byId("storynumber").setValue("");
							this.getView().byId("oBTHold").setVisible(true);
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
				oDataInterface.Status_TS = undefined;
				this.readAttachments1({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "IntData_TS",
					TYPE: "O"
				});
				// oParam.fieldname = "Technical Specification";
				// oDataInterface.TechnicalSpecification = callServices.fnCallMainTable(oParam);

				this.checkStatus();
				if (statusLast === "APPROVED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
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

				oParam.Fieldname = "PI_Verion 1.0";
				oDataInterface.Verion10 = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "PI_Approver_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Approver", this.oDataInterfaceSuccess);

				oParam.Fieldname = "TS_InterfaceDesign";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_InterfaceDesign", this.oDataInterfaceSuccess);

				//lolx
				oParam.Fieldname = "TS_MessageType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_MessageType", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_DataTypes";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_DataTypes", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_DTEnh";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_DTEnh", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_ExternalDef";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_ExternalDef", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_TAAD";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_TAAD", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_Part_y";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_Part_y", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_DirectC";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_DirectC", this.oDataInterfaceSuccess);
				oParam.Fieldname = "TS_AlertCat";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_AlertCat", this.oDataInterfaceSuccess);

				oParam.Fieldname = "TS_MappingTextDef";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TS_MappingTextDef", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_Reviewer_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Reviewer", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_Author_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Author", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_BusinessScenario";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "BusinessScenario", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_SWCNamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SWCNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_PIDescription";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "PIDescription", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MMappingName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MMappingName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MSourceMessage";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MSourceMessage", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MTargetMessage";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MTargetMessage", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_Complexity";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Complexity", this.oDataInterfaceSuccess);
				if (oDataInterface.Complexity) {
					var sTypeofInterface = oDataInterface.Complexity.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "High":
								that.byId("MHigh").setSelected(true);
								break;
							case "Medium":
								that.byId("MMedium").setSelected(true);
								break;
							case "Low":
								that.byId("MLow").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "PI_ImplementationType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ImplementationType", this.oDataInterfaceSuccess);
				if (oDataInterface.ImplementationType) {
					var sTypeofInterface = oDataInterface.ImplementationType.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Graphical":
								that.byId("MGraphical").setSelected(true);
								break;
							case "Java":
								that.byId("MJava").setSelected(true);
								break;
							case "XSLT":
								that.byId("MXSLT").setSelected(true);
								break;
							case "ABAP":
								that.byId("MABAP").setSelected(true);
								break;

						}
					}
				}
				oParam.Fieldname = "PI_MPName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MPName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MPType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MPType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MArchiveName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MArchiveName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MArchiveNamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MArchiveNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MLibraryName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MLibraryName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_MLibraryNamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "MLibraryNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OMappingName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OMappingName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSourceMessage";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSourceMessage", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OTargetMessage";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OTargetMessage", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OPName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OPName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OPType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OPType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OMProgram";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OMProgram", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OMNamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OMNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OMParameterName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OMParameterName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OMParameterType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OMParameterType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_TypeofMapping_";
				// oDataInterface.TypeofInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "_TypeofMapping_", this.oDataInterfaceSuccess);
				if (oDataInterface._TypeofMapping_) {
					var sTypeofInterface = oDataInterface._TypeofMapping_.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Graphical":
								that.byId("OGraphical").setSelected(true);
								break;
							case "Java":
								that.byId("OJava").setSelected(true);
								break;
							case "XSLT":
								that.byId("OXSLT").setSelected(true);
								break;
							case "ABAP":
								that.byId("OABAP").setSelected(true);
								break;
						}
					}
				}
				oParam.Fieldname = "PI_SIName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SIName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_SIDescription";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SIDescription", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_SINamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SINamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_SICategory";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SICategory", this.oDataInterfaceSuccess);
				if (oDataInterface.SICategory) {
					var sTypeofInterface = oDataInterface.SICategory.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Inbound":
								that.byId("SIInbound").setSelected(true);
								break;
							case "Outbound":
								that.byId("SIOutbound").setSelected(true);
								break;
							case "Abstract":
								that.byId("SIAbstract").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SIInterfacePattern";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SIInterfacePattern", this.oDataInterfaceSuccess);
				if (oDataInterface.SIInterfacePattern) {
					var sTypeofInterface = oDataInterface.SIInterfacePattern.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Stateless":
								that.byId("SIStateless").setSelected(true);
								break;
							case "Stateless(XI 3.0 compatible)":
								that.byId("SIStatelessXIC").setSelected(true);
								break;
							case "Stateful":
								that.byId("SIAStateful").setSelected(true);
								break;
							case "TU and C C":
								that.byId("SITUCC").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SIAssociatedOperations";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SIAssociatedOperations", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSIName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSIDescription";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIDescription", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSINamespace";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSINamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSIPattern";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIPattern", this.oDataInterfaceSuccess);
				if (oDataInterface.OSIPattern) {
					var sTypeofInterface = oDataInterface.OSIPattern.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Normal":
								that.byId("OSINormal").setSelected(true);
								break;
							case "Commit":
								that.byId("OSICommit").setSelected(true);
								break;
							case "Rollback":
								that.byId("OSIRollback").setSelected(true);
								break;
							case "Compensate":
								that.byId("OSICompensate").setSelected(true);
								break;
							case "Confirm":
								that.byId("OSIConfirm").setSelected(true);
								break;
							case "Tentative Update":
								that.byId("OSITentativeUpdate").setSelected(true);
								break;

						}
					}
				}
				oParam.Fieldname = "PI_OSIMode";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIMode", this.oDataInterfaceSuccess);
				if (oDataInterface.OSIMode) {
					var sTypeofInterface = oDataInterface.OSIMode.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Synchronous":
								that.byId("OSISynchronous").setSelected(true);
								break;
							case "Asynchronous":
								that.byId("OSIASynchronous").setSelected(true);
								break;

						}
					}
				}
				oParam.Fieldname = "PI_OSIAssociatedMessageType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIAssociatedMessageType", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_OSIRole";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "OSIRole", this.oDataInterfaceSuccess);
				if (oDataInterface.OSIRole) {
					var sTypeofInterface = oDataInterface.OSIRole.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Request":
								that.byId("OSIRequest").setSelected(true);
								break;
							case "Fault":
								that.byId("OSIFault").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_IOType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IOType", this.oDataInterfaceSuccess);
				if (oDataInterface.IOType) {
					var sTypeofInterface = oDataInterface.IOType.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "IDOC":
								that.byId("IOIDOC").setSelected(true);
								break;
							case "RFC":
								that.byId("IORFC").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_IOName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IOName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_CC1Name";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "CC1Name", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_CC2Name";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "CC2Name", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_CC1Type";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "CC1Type", this.oDataInterfaceSuccess);
				if (oDataInterface.CC1Type) {
					var sTypeofInterface = oDataInterface.CC1Type.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Business System":
								that.byId("CC1BussinessSystem").setSelected(true);
								break;
							case "Business Component":
								that.byId("CC1BussinessComponent").setSelected(true);
								break;
							case "Integration Process":
								that.byId("CC1IntegrationProcess").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_CC2Type";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "CC2Type", this.oDataInterfaceSuccess);
				if (oDataInterface.CC2Type) {
					var sTypeofInterface = oDataInterface.CC2Type.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Business System":
								that.byId("CC2BussinessSystem").setSelected(true);
								break;
							case "Business Component":
								that.byId("CC2BussinessComponent").setSelected(true);
								break;
							case "Integration Process":
								that.byId("CC2IntegrationProcess").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SCAdapter_Engine";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCAdapter_Engine", this.oDataInterfaceSuccess);
				if (oDataInterface.SCAdapter_Engine) {
					var sTypeofInterface = oDataInterface.SCAdapter_Engine.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Central":
								that.byId("SCCentral").setSelected(true);
								break;
							case "Decentral":
								that.byId("SCDecentral").setSelected(true);
								break;
							case "PCK":
								that.byId("SCPCK").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SCParty";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCParty", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_SCChannel";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCChannel", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_SCCC";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCCC", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_SCAdapterType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCAdapterType", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_SCServiceName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCServiceName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_SCMessageFormat";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCMessageFormat", this.oDataInterfaceSuccess);
				if (oDataInterface.SCMessageFormat) {
					var sTypeofInterface = oDataInterface.SCMessageFormat.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "JSON":
								that.byId("SCJSON").setSelected(true);
								break;
							case "Flat":
								that.byId("SCFlat").setSelected(true);
								break;
							case "CSV":
								that.byId("SCCSV").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SCMessageProtocol";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCMessageProtocol", this.oDataInterfaceSuccess);
				if (oDataInterface.SCMessageProtocol) {
					var sTypeofInterface = oDataInterface.SCMessageProtocol.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "HTTP":
								that.byId("SCHTTP").setSelected(true);
								break;
							case "HTTPS":
								that.byId("SCHTTPS").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "PI_SCAuthenticationMethod";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCAuthenticationMethod", this.oDataInterfaceSuccess);
				if (oDataInterface.SCAuthenticationMethod) {
					var sTypeofInterface = oDataInterface.SCAuthenticationMethod.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Certificate":
								that.byId("SCcertificate").setSelected(true);
								break;
							case "HTTP Post":
								that.byId("SCHTTPPost").setSelected(true);
								break;
							case "HTTP Get":
								that.byId("SCHTTPGet").setSelected(true);
								break;
							case "other":
								that.byId("SCother").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_SCAdditionalInformation";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SCAdditionalInformation", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_RCAdapterEngine";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCAdapterEngine", this.oDataInterfaceSuccess);
				if (oDataInterface.RCAdapterEngine) {
					var sTypeofInterface = oDataInterface.RCAdapterEngine.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Central":
								that.byId("RCCentral").setSelected(true);
								break;
							case "Decentral":
								that.byId("RCDecentral").setSelected(true);
								break;
							case "PCK":
								that.byId("RCPCK").setSelected(true);
								break;

						}
					}
				}
				oParam.Fieldname = "PI_RCParty";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCParty", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_RCChannel";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCChannel", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_RCCC";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCCC", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_RCAdapterType";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCAdapterType", this.oDataInterfaceSuccess);
				oParam.Fieldname = "PI_RCFunctionModule";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCFunctionModule", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_RCExecutionMode";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCExecutionMode", this.oDataInterfaceSuccess);
				if (oDataInterface.RCExecutionMode) {
					var sTypeofInterface = oDataInterface.RCExecutionMode.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "synchronous":
								that.byId("RCsynchronous").setSelected(true);
								break;
							case "asynchronous":
								that.byId("RCasynchronous").setSelected(true);
								break;

						}
					}
				}

				oParam.Fieldname = "PI_RCAdditionalInformation";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RCAdditionalInformation", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_IFFlowName";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IFFlowName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_IFEnterpriseIntegrationPatterns";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IFEnterpriseIntegrationPatterns", this.oDataInterfaceSuccess);
				if (oDataInterface.IFEnterpriseIntegrationPatterns) {
					var sTypeofInterface = oDataInterface.IFEnterpriseIntegrationPatterns.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Point-to-Point Channel":
								that.byId("IFPointtoPointChannel").setSelected(true);
								break;
							case "Message Translator":
								that.byId("IFMessageTranslator").setSelected(true);
								break;
							case "Recipient List":
								that.byId("IFRecipientList").setSelected(true);
								break;
							case "Recipient List (Dynamic Conditions)":
								that.byId("IFecipientListD").setSelected(true);
								break;

						}
					}
				}
				oParam.Fieldname = "PI_ICOSCommunicationParty";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICOSCommunicationParty", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICOSCommunicationcomponent";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICOSCommunicationcomponent", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICOSInterface";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICOSInterface", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICOSNamespace";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICOSNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICORCommunicationParty";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICORCommunicationParty", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICORCommunicationcomponent";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICORCommunicationcomponent", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICORInterface";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICORInterface", this.oDataInterfaceSuccess);

				oParam.Fieldname = "PI_ICORNamespace";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ICORNamespace", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Approver_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Approver", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Reviewer_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Reviewer", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Author_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Author", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Program Name(s)";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProgramName", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Include Files";
				// oDataInterface.IncludeFiles = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IncludeFiles", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Interface Transaction";
				// oDataInterface.InterfaceTransaction = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "InterfaceTransaction", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Called Transaction(s)";
				// oDataInterface.CalledTransaction = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "CalledTransaction", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Authorization Object Used";
				// oDataInterface.AuthorizationObjectUsed = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "AuthorizationObjectUsed", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Type of Interface";
				// oDataInterface.TypeofInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TypeofInterface", this.oDataInterfaceSuccess);
				if (oDataInterface.TypeofInterface) {
					var sTypeofInterface = oDataInterface.TypeofInterface.split("~");
					for (var iTypeofInterface = 0; iTypeofInterface < sTypeofInterface.length; iTypeofInterface++) {
						switch (sTypeofInterface[iTypeofInterface]) {
							case "Inbound":
								that.byId("CB1-01").setSelected(true);
								break;
							case "Outbound":
								that.byId("CB1-02").setSelected(true);
								break;
							case "Both":
								that.byId("CB1-03").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Frequency_TS";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Frequency", this.oDataInterfaceSuccess);
				if (oDataInterface.Frequency) {
					var sFrequency = oDataInterface.Frequency.split("~");
					for (var iFrequency = 0; iFrequency < sFrequency.length; iFrequency++) {
						switch (sFrequency[iFrequency]) {
							case "ALE/IDOC":
								that.byId("CB3-01").setSelected(true);
								break;
							case "Batch Input":
								that.byId("CB3-02").setSelected(true);
								break;
							case "Direct Input":
								that.byId("CB3-03").setSelected(true);
								break;
							case "BAPI/RFC":
								that.byId("CB3-04").setSelected(true);
								break;
							case "Other":
								that.byId("CB3-05").setSelected(true);
								break;
						}
					}
				}
				// oParam.Fieldname = "Outbound";
				// oDataInterface.Outbound = callServices.fnCallMainTable(oParam);

				// oParam.Fieldname = "Both";
				// oDataInterface.Both = callServices.fnCallMainTable(oParam);

				oParam.Fieldname = "Run Mode";
				// oDataInterface.Foreground = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RunMode", this.oDataInterfaceSuccess);
				if (oDataInterface.RunMode) {
					var sRunMode = oDataInterface.RunMode.split("~");
					for (var iRunMode = 0; iRunMode < sRunMode.length; iRunMode++) {
						switch (sRunMode[iRunMode]) {
							case "Foreground":
								that.byId("CB2-01").setSelected(true);
								break;
							case "Background":
								that.byId("CB2-02").setSelected(true);
								break;
							case "Both":
								that.byId("CB2-03").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Background";
				// oDataInterface.Background = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Background", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Both";
				// oDataInterface.Both2 = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Both2", this.oDataInterfaceSuccess);

				oParam.Fieldname = "ALE/IDOC";
				// oDataInterface.ALEIDOC = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ALEIDOC", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Batch Input";
				// oDataInterface.BatchInput = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "BatchInput", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Direct Input";
				// oDataInterface.DirectInput = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "DirectInput", this.oDataInterfaceSuccess);

				oParam.Fieldname = "BAPI/RFC";
				// oDataInterface.BAPIRFC = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "BAPIRFC", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Other";
				// oDataInterface.Other = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "Other", this.oDataInterfaceSuccess);

				oParam.Fieldname = "External System(s)";
				// oDataInterface.ExternalSystem = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ExternalSystem", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Data Volume (Records)";
				// oDataInterface.DataVolume = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "DataVolume", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Upload File Type and Format";
				// oDataInterface.UploadFileTypeandFormat = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "UploadFileTypeandFormat", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Logical Path";
				// oDataInterface.LogicalPath = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "LogicalPath", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Logical File";
				// oDataInterface.LogicalFile = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "LogicalFile", this.oDataInterfaceSuccess);

				oParam.Fieldname = "GeneralInformation";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "GeneralInformation", this.oDataInterfaceSuccess);

				oParam.Fieldname = "RFCInterface";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "RFCInterface", this.oDataInterfaceSuccess);

				oParam.Fieldname = "TechnicalAssumption";
				callServices.fnGetDataMainTable(oParam, oDataInterface, "TechnicalAssumption", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Proxy Based Interface";
				// oDataInterface.ProxyBasedInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ProxyBasedInterface", this.oDataInterfaceSuccess);

				oParam.Fieldname = "IDOC Based Interface";
				// oDataInterface.IDOCBasedInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "IDOCBasedInterface", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Service Based Interface";
				// oDataInterface.ServiceBasedInterface = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ServiceBasedInterface", this.oDataInterfaceSuccess);
				if (!oDataInterface.ServiceBasedInterface) {
					oDataInterface.ServiceBasedInterface = "OData Service Related Custom Object Attributes:";
				}

				oParam.Fieldname = "SOAP API";
				// oDataInterface.SOAPAPI = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SOAPAPI", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Security Section_TS";
				// oDataInterface.SecuritySection = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "SecuritySection", this.oDataInterfaceSuccess);

				oParam.Fieldname = "Error Handling";
				// oDataInterface.ErrorHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataInterface, "ErrorHandling", this.oDataInterfaceSuccess);

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

			this._setTableData("1", oDataInterface, oParam);
			this._setTableData("2", oDataInterface, oParam);
			this._setTableData("3", oDataInterface, oParam);
			this._setTableData("4", oDataInterface, oParam);
			this._setTableData("5", oDataInterface, oParam);
			this._setTableData("6", oDataInterface, oParam);
			this._setTableData("7", oDataInterface, oParam);
			this._setTableData("8", oDataInterface, oParam);
			this._setTableData("9", oDataInterface, oParam);
			this._setTableData("10", oDataInterface, oParam);
			oModelInterface.setData(oDataInterface);

		},
		setUpdateTableData: function(fieldName, strfieldName, oDataInterface, oParam, uParam) {
			var iCountUA, oUAEntry;

			for (iCountUA = 0; iCountUA < oDataInterface[fieldName].length; iCountUA++) {
				var sUAEntry = "";
				oDataInterface[strfieldName] = "";
				oParam.Fieldname = fieldName + "_" + (iCountUA + 1);
				uParam.Fieldname = fieldName + "_" + (iCountUA + 1);
				oUAEntry = oDataInterface[fieldName][iCountUA];
				var KeyArray = Object.keys(oUAEntry);
				for (var a = 0; a < KeyArray.length; a++) {
					sUAEntry += oUAEntry[KeyArray[a]] + "~";
				}
				sUAEntry = sUAEntry.slice(0, -1);
				//sUAEntry = oUAEntry.TS_PI_BusinessScenario + "~" + oUAEntry.TS_PI_SWCNamespace + "~" + oUAEntry.TS_PI_PIDescription;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}
		},
		_setTableData: function(str, oDataInterface, oParam) {
			if (str === "1") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {


					oDataInterface.TS_PI_IntegrationScenarioTemp = "";
					oParam.Fieldname = "TS_PI_IntegrationScenario_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_IntegrationScenarioTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_IntegrationScenarioTemp) {
						if (oDataInterface.TS_PI_IntegrationScenarioTemp) {
							sUserAcptCols = oDataInterface.TS_PI_IntegrationScenarioTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 2) {
								oDataInterface.TS_PI_IntegrationScenario.push({
									TS_PI_BusinessScenario: sUserAcptCols[0],
									TS_PI_SWCNamespace: sUserAcptCols[1],
									TS_PI_PIDescription: sUserAcptCols[2]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_IntegrationScenario.length === 0) {
					oDataInterface.TS_PI_IntegrationScenario.push({
						TS_PI_BusinessScenario: "",
						TS_PI_SWCNamespace: "",
						TS_PI_PIDescription: ""
					});
				}
			}
			if (str === "2") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_MessageMappingTemp = "";
					oParam.Fieldname = "TS_PI_MessageMapping_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_MessageMappingTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_MessageMappingTemp) {
						if (oDataInterface.TS_PI_MessageMappingTemp) {
							sUserAcptCols = oDataInterface.TS_PI_MessageMappingTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 11) {
								oDataInterface.TS_PI_MessageMapping.push({
									MMappingName: sUserAcptCols[0],
									MSourceMessage: sUserAcptCols[1],
									MTargetMessage: sUserAcptCols[2],
									MPI_Freq: sUserAcptCols[3],
									MPI_FreqMode: sUserAcptCols[4],
									MPName: sUserAcptCols[5],
									MPType: sUserAcptCols[6],
									MArchiveName: sUserAcptCols[7],
									MArchiveNamespace: sUserAcptCols[8],
									MLibraryName: sUserAcptCols[9],
									InterfaceTransaction: sUserAcptCols[10],
									MLibraryNamespace: sUserAcptCols[11]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_MessageMapping.length === 0) {
					oDataInterface.TS_PI_MessageMapping.push({
						MMappingName: "",
						MSourceMessage: "",
						MTargetMessage: "",
						MPI_Freq: "",
						MPI_FreqMode: "",
						MPName: "",
						MPType: "",
						MArchiveName: "",
						MArchiveNamespace: "",
						MLibraryName: "",
						InterfaceTransaction: "",
						MLibraryNamespace: ""
					});
				}
			}
			if (str === "3") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_OperationMappingTemp = "";
					oParam.Fieldname = "TS_PI_OperationMapping_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_OperationMappingTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_OperationMappingTemp) {
						if (oDataInterface.TS_PI_OperationMappingTemp) {
							sUserAcptCols = oDataInterface.TS_PI_OperationMappingTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 9) {
								oDataInterface.TS_PI_OperationMapping.push({
									OMappingName: sUserAcptCols[0],
									OSourceMessage: sUserAcptCols[1],
									OTargetMessage: sUserAcptCols[2],
									OPName: sUserAcptCols[3],
									OPType: sUserAcptCols[4],
									OMProgram: sUserAcptCols[5],
									OMNamespace: sUserAcptCols[6],
									OPI_FreqMode: sUserAcptCols[7],
									OMParameterName: sUserAcptCols[8],
									OMParameterType: sUserAcptCols[9]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_OperationMapping.length === 0) {
					oDataInterface.TS_PI_OperationMapping.push({
						OMappingName: "",
						OSourceMessage: "",
						OTargetMessage: "",
						OPName: "",
						OPType: "",
						OMProgram: "",
						OMNamespace: "",
						OPI_FreqMode: "",
						OMParameterName: "",
						OMParameterType: ""
					});
				}
			}
			if (str === "4") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_ServiceInterfacesTemp = "";
					oParam.Fieldname = "TS_PI_ServiceInterfaces_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_ServiceInterfacesTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_ServiceInterfacesTemp) {
						if (oDataInterface.TS_PI_ServiceInterfacesTemp) {
							sUserAcptCols = oDataInterface.TS_PI_ServiceInterfacesTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 11) {
								oDataInterface.TS_PI_ServiceInterfaces.push({
									SIName: sUserAcptCols[0],
									SIDescription: sUserAcptCols[1],
									SINamespace: sUserAcptCols[2],
									TS_S1_Mode_1: sUserAcptCols[3],
									TS_S1_Mode_2: sUserAcptCols[4],
									SIAssociatedOperations: sUserAcptCols[5],
									OSIName: sUserAcptCols[6],
									OSIDescription: sUserAcptCols[7],
									OSINamespace: sUserAcptCols[8],
									TS_S1_Mode_3:sUserAcptCols[9],
									TS_S1_Mode_4: sUserAcptCols[10],
									OSIAssociatedMessageType: sUserAcptCols[11],
									TS_S1_Mode_5: sUserAcptCols[12]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_ServiceInterfaces.length === 0) {
					oDataInterface.TS_PI_ServiceInterfaces.push({
						SIName: "",
						SIDescription: "",
						SINamespace: "",
						TS_S1_Mode_1: "",
						TS_S1_Mode_2: "",
						SIAssociatedOperations: "",
						OSIName: "",
						OSIDescription: "",
						OSINamespace: "",
						TS_S1_Mode_3:"",
						TS_S1_Mode_4: "",
						OSIAssociatedMessageType: "",
						TS_S1_Mode_5: ""
					});
				}
			}
			if (str === "10") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_ImportedObjectsTemp = "";
					oParam.Fieldname = "TS_PI_ImportedObjects_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_ImportedObjectsTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_ImportedObjectsTemp) {
						if (oDataInterface.TS_PI_ImportedObjectsTemp) {
							sUserAcptCols = oDataInterface.TS_PI_ImportedObjectsTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 1) {
								oDataInterface.TS_PI_ImportedObjects.push({
									TS_IO_Mode_1: sUserAcptCols[0],
									IOName: sUserAcptCols[1]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_ImportedObjects.length === 0) {
					oDataInterface.TS_PI_ImportedObjects.push({
						TS_IO_Mode_1: "",
						IOName: ""
					});
				}
			}
			if (str === "5") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_CommunicationComponentTemp = "";
					oParam.Fieldname = "TS_PI_CommunicationComponent_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_CommunicationComponentTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_CommunicationComponentTemp) {
						if (oDataInterface.TS_PI_CommunicationComponentTemp) {
							sUserAcptCols = oDataInterface.TS_PI_CommunicationComponentTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 3) {
								oDataInterface.TS_PI_CommunicationComponent.push({
									CC1Name: sUserAcptCols[0],
									TS_CC_Mode_1: sUserAcptCols[1],
									CC2Name: sUserAcptCols[2],
									TS_CC_Mode_2: sUserAcptCols[3]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_CommunicationComponent.length === 0) {
					oDataInterface.TS_PI_CommunicationComponent.push({
						CC1Name: "",
						TS_CC_Mode_1: "",
						CC2Name: "",
						TS_CC_Mode_2: ""
					});
				}
			}
			if (str === "6") {
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_IntegrationFlowTemp = "";
					oParam.Fieldname = "TS_PI_IntegrationFlow_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_IntegrationFlowTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_IntegrationFlowTemp) {
						if (oDataInterface.TS_PI_IntegrationFlowTemp) {
							sUserAcptCols = oDataInterface.TS_PI_IntegrationFlowTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 1) {
								oDataInterface.TS_PI_IntegrationFlow.push({
									IFFlowName: sUserAcptCols[0],
									TS_IFFlowName_1: sUserAcptCols[1]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_IntegrationFlow.length === 0) {
					oDataInterface.TS_PI_IntegrationFlow.push({
						IFFlowName: "",
						TS_IFFlowName_1: ""
					});
				}
			}
			if (str === "7") {
				var iCountUA, sUserAcptCols;
				
				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_IntegratedConfigurationsTemp = "";
					oParam.Fieldname = "TS_PI_IntegratedConfigurations_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_IntegratedConfigurationsTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_IntegratedConfigurationsTemp) {
						if (oDataInterface.TS_PI_IntegratedConfigurationsTemp) {
							sUserAcptCols = oDataInterface.TS_PI_IntegratedConfigurationsTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 7) {
								oDataInterface.TS_PI_IntegratedConfigurations.push({
									ICOSCommunicationParty: sUserAcptCols[0],
									ICOSCommunicationcomponent: sUserAcptCols[1],
									ICOSInterface: sUserAcptCols[2],
									ICOSNamespace: sUserAcptCols[3],
									ICORCommunicationParty: sUserAcptCols[4],
									ICORCommunicationcomponent: sUserAcptCols[5],
									ICORInterface: sUserAcptCols[6],
									ICORNamespace: sUserAcptCols[7]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_IntegratedConfigurations.length === 0) {
					oDataInterface.TS_PI_IntegratedConfigurations.push({
						ICOSCommunicationParty: "",
						ICOSCommunicationcomponent: "",
						ICOSInterface: "",
						ICOSNamespace: "",
						ICORCommunicationParty: "",
						ICORCommunicationcomponent: "",
						ICORInterface: "",
						ICORNamespace: ""
					});
				}
			}
			if (str === "8") {
				var iCountUA, sUserAcptCols;
				
				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_SenderCommunicationDetailsTemp = "";
					oParam.Fieldname = "TS_PI_SenderCommunicationDetails_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_SenderCommunicationDetailsTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_SenderCommunicationDetailsTemp) {
						if (oDataInterface.TS_PI_SenderCommunicationDetailsTemp) {
							sUserAcptCols = oDataInterface.TS_PI_SenderCommunicationDetailsTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 9) {
								oDataInterface.TS_PI_SenderCommunicationDetails.push({
									TS_SC_Mode_1: sUserAcptCols[0],
									SCParty: sUserAcptCols[1],
									SCChannel: sUserAcptCols[2],
									SCCC: sUserAcptCols[3],
									SCAdapterType: sUserAcptCols[4],
									SCServiceName: sUserAcptCols[5],
									TS_SC_Mode_2: sUserAcptCols[6],
									TS_SC_Mode_3: sUserAcptCols[7],
									TS_SC_Mode_4: sUserAcptCols[8],
									SCAdditionalInformation: sUserAcptCols[9]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_SenderCommunicationDetails.length === 0) {
					oDataInterface.TS_PI_SenderCommunicationDetails.push({
						TS_SC_Mode_1: "",
						SCParty: "",
						SCChannel: "",
						SCCC: "",
						SCAdapterType: "",
						SCServiceName: "",
						TS_SC_Mode_2: "",
						TS_SC_Mode_3: "",
						TS_SC_Mode_4: "",
						SCAdditionalInformation: ""
					});
				}
			}
			if (str === "9") {
				var iCountUA, sUserAcptCols;
				
				for (iCountUA = 0;; iCountUA++) {

					oDataInterface.TS_PI_ReceiverCommunicationDetailsTemp = "";
					oParam.Fieldname = "TS_PI_ReceiverCommunicationDetails_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataInterface, "TS_PI_ReceiverCommunicationDetailsTemp", this.oDataInterfaceSuccess);
					if (this.oDataInterfaceSuccess.TS_PI_ReceiverCommunicationDetailsTemp) {
						if (oDataInterface.TS_PI_ReceiverCommunicationDetailsTemp) {
							sUserAcptCols = oDataInterface.TS_PI_ReceiverCommunicationDetailsTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length >= 7) {
								oDataInterface.TS_PI_ReceiverCommunicationDetails.push({
									TS_RC_Mode_1: sUserAcptCols[0],
									RCParty: sUserAcptCols[1],
									RCChannel: sUserAcptCols[2],
									RCCC: sUserAcptCols[3],
									RCAdapterType: sUserAcptCols[4],
									RCFunctionModule: sUserAcptCols[5],
									TS_RC_Mode_2: sUserAcptCols[6],
									RCAdditionalInformation: sUserAcptCols[7]
								});
							}
						} else {
							continue;
						}
					} else {
						break;
					}
				}
				if (oDataInterface.TS_PI_ReceiverCommunicationDetails.length === 0) {
					oDataInterface.TS_PI_ReceiverCommunicationDetails.push({
						TS_RC_Mode_1: "",
						RCParty: "",
						RCChannel: "",
						RCCC: "",
						RCAdapterType: "",
						RCFunctionModule: "",
						TS_RC_Mode_2: "",
						RCAdditionalInformation: ""
					});
				}
			}
		},
		onConfirmSave: function() {
			var type = sap.ui.getCore().getModel().getData().Key;
			var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainer").setVisible(true);

			if (obj === "new") {
				this.oDataInterfaceSuccess = {
					Approver: false,
					Reviewer: false,
					Author: false,
					ObjectID: false,
					ProcessingMode: false,
					Source: false,
					Frequency: false,
					ImpactedSystem: false,
					ObjectTitle: false,
					StoryNumberComment: false,
					Target: false,
					InterfaceDirection: false,
					ProcessingType: false,
					ObjectDetails: false,
					Mapping: false,
					AIFFramework: false,
					ErrorHandlingUsingCustomIDOC: false,
					ManualInterfaceProgramLog: false,
					FTP: false,
					ExceptionHandling: false,
					Security: false,
					HTTPSSFTP: false,
					UserAuthorization: false,
					Encryption: false,
					Step: false,
					TestType: false,
					STATUS: false,
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
				oCurrentView.byId("oBTSave").setVisible(false);
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

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
			var oDataInterface = this.getView().getModel("intData").getData();
			// var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			// if (oParam) {
			// 	if (oParam.projectid) {
			// 		this.oProjectId = oParam.projectid;
			// 		delete oParam.projectid;
			// 	}
			// }

			//var oDataTechnicalSpecification = this.getView().byId("FunctionalSpecification").getSelectedKeys();
			//var oDataTechnicalSpecificationMulti = oDataTechnicalSpecification.join("~");

			// var oDataVersion10 = this.getView().byId("Version10").getSelectedKeys();
			// var oDataVersion10Multi = oDataVersion10.join("~");

			var oDataTypeInterfaceCheckBx = [];
			if (this.getView().byId("CB1-01").getSelected()) {
				oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-01").getText());
			}
			if (this.getView().byId("CB1-02").getSelected()) {
				oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			}
			if (this.getView().byId("CB1-02").getSelected()) {
				oDataTypeInterfaceCheckBx.push(this.getView().byId("CB1-02").getText());
			}
			var oDataTypeInterfaceCheckBxMulti = oDataTypeInterfaceCheckBx.join("~");

			var oDataRunModeCheckBx = [];
			if (this.getView().byId("CB2-01").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("CB2-01").getText());
			}
			if (this.getView().byId("CB2-02").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("CB2-02").getText());
			}
			if (this.getView().byId("CB2-03").getSelected()) {
				oDataRunModeCheckBx.push(this.getView().byId("CB2-03").getText());
			}
			var oDataRunModeCheckBxMulti = oDataRunModeCheckBx.join("~");

			var oDataFrequencyCheckBx = [];
			if (this.getView().byId("CB3-01").getSelected()) {
				oDataFrequencyCheckBx.push(this.getView().byId("CB3-01").getText());
			}
			if (this.getView().byId("CB3-02").getSelected()) {
				oDataFrequencyCheckBx.push(this.getView().byId("CB3-02").getText());
			}
			if (this.getView().byId("CB3-03").getSelected()) {
				oDataFrequencyCheckBx.push(this.getView().byId("CB3-03").getText());
			}
			if (this.getView().byId("CB3-04").getSelected()) {
				oDataFrequencyCheckBx.push(this.getView().byId("CB3-04").getText());
			}
			if (this.getView().byId("CB3-05").getSelected()) {
				oDataFrequencyCheckBx.push(this.getView().byId("CB3-05").getText());
			}
			var oDataFrequencyCheckBxMulti = oDataFrequencyCheckBx.join("~");

			// var oDataTestType = this.getView().byId("Version10").getSelectedKeys();
			// var oDataTestTypeMulti = oDataTestType.join("~");
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

			// oParam.fieldname = "Technical Specification";
			// oParam.TechnicalSpecification = oDataTechnicalSpecificationMulti;
			// callServices.fnSubmitInMainTable(oParam);

			// oParam.fieldname = "Verion 1.0";
			// oParam.Verion10 = oDataVersion10Multi;
			// callServices.fnSubmitInMainTable(oParam);
			oParam.Fieldname = uParam.Fieldname = "STATUS_TS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS);

			oParam.Fieldname = uParam.Fieldname = "Approver_TS";
			oParam.Fieldvalue = oDataInterface.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Approver);

			oParam.Fieldname = uParam.Fieldname = "Reviewer_TS";
			oParam.Fieldvalue = oDataInterface.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Reviewer);

			oParam.Fieldname = uParam.Fieldname = "Author_TS";
			oParam.Fieldvalue = oDataInterface.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Author);

			oParam.Fieldname = uParam.Fieldname = "Program Name(s)";
			oParam.Fieldvalue = oDataInterface.ProgramName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProgramName);

			oParam.Fieldname = uParam.Fieldname = "Include Files";
			oParam.Fieldvalue = oDataInterface.IncludeFiles;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IncludeFiles);

			oParam.Fieldname = uParam.Fieldname = "Interface Transaction";
			oParam.Fieldvalue = oDataInterface.InterfaceTransaction;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.InterfaceTransaction);

			oParam.Fieldname = "Called Transaction(s)";
			oParam.Fieldvalue = oDataInterface.CalledTransaction;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.CalledTransaction);

			oParam.Fieldname = uParam.Fieldname = "Authorization Object Used";
			oParam.Fieldvalue = oDataInterface.AuthorizationObjectUsed;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.AuthorizationObjectUsed);

			oParam.Fieldname = uParam.Fieldname = "Type of Interface";
			oParam.Fieldvalue = oDataTypeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TypeOfInterface);

			oParam.Fieldname = "Run Mode";
			oParam.Fieldvalue = oDataRunModeCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RunMode);

			oParam.Fieldname = uParam.Fieldname = "Frequency_TS";
			oParam.Fieldvalue = oDataFrequencyCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Frequency);

			oParam.Fieldname = uParam.Fieldname = "External System(s)";
			oParam.Fieldvalue = oDataInterface.ExternalSystem;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ExternalSystem);

			oParam.Fieldname = uParam.Fieldname = "Data Volume (Records)";
			oParam.Fieldvalue = oDataInterface.DataVolume;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.DataVolume);

			oParam.Fieldname = uParam.Fieldname = "Upload File Type and Format";
			oParam.Fieldvalue = oDataInterface.UploadFileTypeandFormat;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.UploadFileTypeandFormat);

			oParam.Fieldname = uParam.Fieldname = "Logical Path";
			oParam.Fieldvalue = oDataInterface.LogicalPath;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.LogicalPath);

			oParam.Fieldname = uParam.Fieldname = "TS_MessageType";
			oParam.Fieldvalue = oDataInterface.TS_MessageType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_MessageType);
			oParam.Fieldname = uParam.Fieldname = "TS_DataTypes";
			oParam.Fieldvalue = oDataInterface.TS_DataTypes;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_DataTypes);
			oParam.Fieldname = uParam.Fieldname = "TS_DTEnh";
			oParam.Fieldvalue = oDataInterface.TS_DTEnh;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_DTEnh);
			oParam.Fieldname = uParam.Fieldname = "TS_ExternalDef";
			oParam.Fieldvalue = oDataInterface.TS_ExternalDef;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_ExternalDef);
			oParam.Fieldname = uParam.Fieldname = "TS_TAAD";
			oParam.Fieldvalue = oDataInterface.TS_TAAD;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_TAAD);
			oParam.Fieldname = uParam.Fieldname = "TS_Part_y";
			oParam.Fieldvalue = oDataInterface.TS_Part_y;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_Part_y);
			oParam.Fieldname = uParam.Fieldname = "TS_DirectC";
			oParam.Fieldvalue = oDataInterface.TS_DirectC;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_DirectC);
			oParam.Fieldname = uParam.Fieldname = "TS_AlertCat";
			oParam.Fieldvalue = oDataInterface.TS_AlertCat;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_AlertCat);

			oParam.Fieldname = uParam.Fieldname = "Logical File";
			oParam.Fieldvalue = oDataInterface.LogicalFile;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.LogicalFile);

			oParam.Fieldname = uParam.Fieldname = "Proxy Based Interface";
			oParam.Fieldvalue = oDataInterface.ProxyBasedInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ProxyBasedInterface);

			oParam.Fieldname = uParam.Fieldname = "RFCInterface";
			oParam.Fieldvalue = oDataInterface.RFCInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RFCInterface);

			oParam.Fieldname = uParam.Fieldname = "TS_InterfaceDesign";
			oParam.Fieldvalue = oDataInterface.TS_InterfaceDesign;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_InterfaceDesign);

			oParam.Fieldname = uParam.Fieldname = "TS_MappingTextDef";
			oParam.Fieldvalue = oDataInterface.TS_MappingTextDef;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TS_MappingTextDef);

			oParam.Fieldname = uParam.Fieldname = "GeneralInformation";
			oParam.Fieldvalue = oDataInterface.GeneralInformation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.GeneralInformation);

			oParam.Fieldname = uParam.Fieldname = "TechnicalAssumption";
			oParam.Fieldvalue = oDataInterface.TechnicalAssumption;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.TechnicalAssumption);

			oParam.Fieldname = "IDOC Based Interface";
			oParam.Fieldvalue = oDataInterface.IDOCBasedInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IDOCBasedInterface);

			oParam.Fieldname = uParam.Fieldname = "Service Based Interface";
			oParam.Fieldvalue = oDataInterface.ServiceBasedInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ServiceBasedInterface);

			oParam.Fieldname = uParam.Fieldname = "SOAP API";
			oParam.Fieldvalue = oDataInterface.SOAPAPI;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SOAPAPI);

			oParam.Fieldname = uParam.Fieldname = "Security Section_TS";
			oParam.Fieldvalue = oDataInterface.SecuritySection;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SecuritySection);

			oParam.Fieldname = uParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataInterface.ErrorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ErrorHandling);

			oParam.Fieldname = uParam.Fieldname = "Step";
			oParam.Fieldvalue = oDataInterface.Step;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Step);

			// oParam.Fieldname = uParam.Fieldname = "Test Type";
			// oParam.Fieldvalue = oDataTestTypeMulti;
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Approver);

			oParam.Fieldname = uParam.Fieldname = "Scenario";
			oParam.Fieldvalue = oDataInterface.Scenario;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Scenario);

			oParam.Fieldname = uParam.Fieldname = "Steps Performed";
			oParam.Fieldvalue = oDataInterface.StepsPerformed;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.StepsPerformed);

			oParam.Fieldname = uParam.Fieldname = "ActualResults";
			oParam.Fieldvalue = oDataInterface.ActualResults;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ActualResults);

			var oDataComplexityInterfaceCheckBx = [];
			if (this.getView().byId("MHigh").getSelected()) {
				oDataComplexityInterfaceCheckBx.push(this.getView().byId("MHigh").getText());
			}
			if (this.getView().byId("MMedium").getSelected()) {
				oDataComplexityInterfaceCheckBx.push(this.getView().byId("MMedium").getText());
			}
			if (this.getView().byId("MLow").getSelected()) {
				oDataComplexityInterfaceCheckBx.push(this.getView().byId("MLow").getText());
			}
			var oDataTypeComplexityInterfaceCheckBxMulti = oDataComplexityInterfaceCheckBx.join("~");

			var oDataImplementationTypeInterfaceCheckBx = [];
			if (this.getView().byId("MGraphical").getSelected()) {
				oDataImplementationTypeInterfaceCheckBx.push(this.getView().byId("MGraphical").getText());
			}
			if (this.getView().byId("MJava").getSelected()) {
				oDataImplementationTypeInterfaceCheckBx.push(this.getView().byId("MJava").getText());
			}
			if (this.getView().byId("MXSLT").getSelected()) {
				oDataImplementationTypeInterfaceCheckBx.push(this.getView().byId("MXSLT").getText());
			}
			if (this.getView().byId("MABAP").getSelected()) {
				oDataImplementationTypeInterfaceCheckBx.push(this.getView().byId("OABAP").getText());
			}
			var oDataImplementationTypeInterfaceCheckBxMulti = oDataImplementationTypeInterfaceCheckBx.join("~");

			var oDataTypeofMappingInterfaceCheckBx = [];
			if (this.getView().byId("OGraphical").getSelected()) {
				oDataTypeofMappingInterfaceCheckBx.push(this.getView().byId("OGraphical").getText());
			}
			if (this.getView().byId("OJava").getSelected()) {
				oDataTypeofMappingInterfaceCheckBx.push(this.getView().byId("OJava").getText());
			}
			if (this.getView().byId("OXSLT").getSelected()) {
				oDataTypeofMappingInterfaceCheckBx.push(this.getView().byId("OXSLT").getText());
			}
			if (this.getView().byId("OABAP").getSelected()) {
				oDataTypeofMappingInterfaceCheckBx.push(this.getView().byId("OABAP").getText());
			}
			var oDataTypeofMappingInterfaceCheckBxMulti = oDataTypeofMappingInterfaceCheckBx.join("~");

			var oDataRTypeofMappingInterfaceCheckBx = [];
			if (this.getView().byId("OGraphical").getSelected()) {
				oDataRTypeofMappingInterfaceCheckBx.push(this.getView().byId("OGraphical").getText());
			}
			if (this.getView().byId("OJava").getSelected()) {
				oDataRTypeofMappingInterfaceCheckBx.push(this.getView().byId("OJava").getText());
			}
			if (this.getView().byId("OXSLT").getSelected()) {
				oDataRTypeofMappingInterfaceCheckBx.push(this.getView().byId("OXSLT").getText());
			}
			if (this.getView().byId("OABAP").getSelected()) {
				oDataRTypeofMappingInterfaceCheckBx.push(this.getView().byId("OABAP").getText());
			}
			var oDataTypeofMappingInterfaceCheckBxMulti = oDataRTypeofMappingInterfaceCheckBx.join("~");

			var oDataSICategoryInterfaceCheckBx = [];
			if (this.getView().byId("SIInbound").getSelected()) {
				oDataSICategoryInterfaceCheckBx.push(this.getView().byId("SIInbound").getText());
			}
			if (this.getView().byId("SIOutbound").getSelected()) {
				oDataSICategoryInterfaceCheckBx.push(this.getView().byId("SIOutbound").getText());
			}
			if (this.getView().byId("SIAbstract").getSelected()) {
				oDataSICategoryInterfaceCheckBx.push(this.getView().byId("SIAbstract").getText());
			}
			var oDataSICategoryInterfaceCheckBxMulti = oDataSICategoryInterfaceCheckBx.join("~");

			var oDataSIInterfacePatternInterfaceCheckBx = [];
			if (this.getView().byId("SIStateless").getSelected()) {
				oDataSIInterfacePatternInterfaceCheckBx.push(this.getView().byId("SIStateless").getText());
			}
			if (this.getView().byId("SIStatelessXIC").getSelected()) {
				oDataSIInterfacePatternInterfaceCheckBx.push(this.getView().byId("SIStatelessXIC").getText());
			}
			if (this.getView().byId("SIAStateful").getSelected()) {
				oDataSIInterfacePatternInterfaceCheckBx.push(this.getView().byId("SIAStateful").getText());
			}
			if (this.getView().byId("SITUCC").getSelected()) {
				oDataSIInterfacePatternInterfaceCheckBx.push(this.getView().byId("SITUCC").getText());
			}
			var oDataSIInterfacePatternInterfaceCheckBxMulti = oDataSIInterfacePatternInterfaceCheckBx.join("~");

			var oDataOSIPatternInterfaceCheckBx = [];
			if (this.getView().byId("OSINormal").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSINormal").getText());
			}
			if (this.getView().byId("OSICommit").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSICommit").getText());
			}
			if (this.getView().byId("OSIRollback").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSIRollback").getText());
			}
			if (this.getView().byId("OSICompensate").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSICompensate").getText());
			}
			if (this.getView().byId("OSIConfirm").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSIConfirm").getText());
			}
			if (this.getView().byId("OSITentativeUpdate").getSelected()) {
				oDataOSIPatternInterfaceCheckBx.push(this.getView().byId("OSITentativeUpdate").getText());
			}
			var oDataOSIPatternInterfaceCheckBxMulti = oDataOSIPatternInterfaceCheckBx.join("~");

			var oDataOSIModeInterfaceCheckBx = [];
			if (this.getView().byId("OSISynchronous").getSelected()) {
				oDataOSIModeInterfaceCheckBx.push(this.getView().byId("OSISynchronous").getText());
			}
			if (this.getView().byId("OSIASynchronous").getSelected()) {
				oDataOSIModeInterfaceCheckBx.push(this.getView().byId("OSIASynchronous").getText());
			}
			var oDataOSIModeInterfaceCheckBxMulti = oDataOSIModeInterfaceCheckBx.join("~");

			var oDataOSIRoleInterfaceCheckBx = [];
			if (this.getView().byId("OSIRequest").getSelected()) {
				oDataOSIRoleInterfaceCheckBx.push(this.getView().byId("OSIRequest").getText());
			}
			if (this.getView().byId("OSIFault").getSelected()) {
				oDataOSIRoleInterfaceCheckBx.push(this.getView().byId("OSIFault").getText());
			}
			var oDataOSIRoleInterfaceCheckBxMulti = oDataOSIRoleInterfaceCheckBx.join("~");

			var oDataIOTypeInterfaceCheckBx = [];
			if (this.getView().byId("IOIDOC").getSelected()) {
				oDataIOTypeInterfaceCheckBx.push(this.getView().byId("IOIDOC").getText());
			}
			if (this.getView().byId("IORFC").getSelected()) {
				oDataIOTypeInterfaceCheckBx.push(this.getView().byId("IORFC").getText());
			}
			var oDataIOTypeInterfaceCheckBxMulti = oDataIOTypeInterfaceCheckBx.join("~");

			var oDataCC1TypeInterfaceCheckBx = [];
			if (this.getView().byId("CC1BussinessSystem").getSelected()) {
				oDataCC1TypeInterfaceCheckBx.push(this.getView().byId("CC1BussinessSystem").getText());
			}
			if (this.getView().byId("CC1BussinessComponent").getSelected()) {
				oDataCC1TypeInterfaceCheckBx.push(this.getView().byId("CC1BussinessComponent").getText());
			}
			if (this.getView().byId("CC1IntegrationProcess").getSelected()) {
				oDataCC1TypeInterfaceCheckBx.push(this.getView().byId("CC1IntegrationProcess").getText());
			}
			var oDataCC1TypeInterfaceCheckBxMulti = oDataCC1TypeInterfaceCheckBx.join("~");

			var oDataCC2TypeInterfaceCheckBx = [];
			if (this.getView().byId("CC2BussinessSystem").getSelected()) {
				oDataCC2TypeInterfaceCheckBx.push(this.getView().byId("CC2BussinessSystem").getText());
			}
			if (this.getView().byId("CC2BussinessComponent").getSelected()) {
				oDataCC2TypeInterfaceCheckBx.push(this.getView().byId("CC2BussinessComponent").getText());
			}
			if (this.getView().byId("CC2IntegrationProcess").getSelected()) {
				oDataCC2TypeInterfaceCheckBx.push(this.getView().byId("CC2IntegrationProcess").getText());
			}
			var oDataCC2TypeInterfaceCheckBxMulti = oDataCC2TypeInterfaceCheckBx.join("~");

			var oDataSCAdapter_EngineInterfaceCheckBx = [];
			if (this.getView().byId("SCCentral").getSelected()) {
				oDataSCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("SCCentral").getText());
			}
			if (this.getView().byId("SCDecentral").getSelected()) {
				oDataSCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("SCDecentral").getText());
			}
			if (this.getView().byId("SCPCK").getSelected()) {
				oDataSCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("SCPCK").getText());
			}
			var oDataSCAdapter_EngineInterfaceCheckBxMulti = oDataSCAdapter_EngineInterfaceCheckBx.join("~");

			var oDataSCMessageFormatInterfaceCheckBx = [];
			if (this.getView().byId("SCJSON").getSelected()) {
				oDataSCMessageFormatInterfaceCheckBx.push(this.getView().byId("SCJSON").getText());
			}
			if (this.getView().byId("SCFlat").getSelected()) {
				oDataSCMessageFormatInterfaceCheckBx.push(this.getView().byId("SCFlat").getText());
			}
			if (this.getView().byId("SCCSV").getSelected()) {
				oDataSCMessageFormatInterfaceCheckBx.push(this.getView().byId("SCCSV").getText());
			}
			var oDataSCMessageFormatInterfaceCheckBxMulti = oDataSCMessageFormatInterfaceCheckBx.join("~");

			var oDataSCMessageProtocolInterfaceCheckBx = [];
			if (this.getView().byId("SCHTTP").getSelected()) {
				oDataSCMessageProtocolInterfaceCheckBx.push(this.getView().byId("SCHTTP").getText());
			}
			if (this.getView().byId("SCHTTPS").getSelected()) {
				oDataSCMessageProtocolInterfaceCheckBx.push(this.getView().byId("SCHTTPS").getText());
			}
			var oDataSCMessageProtocolInterfaceCheckBxMulti = oDataSCMessageProtocolInterfaceCheckBx.join("~");

			var oDataSCAuthenticationMethodInterfaceCheckBx = [];
			if (this.getView().byId("SCcertificate").getSelected()) {
				oDataSCAuthenticationMethodInterfaceCheckBx.push(this.getView().byId("SCcertificate").getText());
			}
			if (this.getView().byId("SCHTTPPost").getSelected()) {
				oDataSCAuthenticationMethodInterfaceCheckBx.push(this.getView().byId("SCHTTPPost").getText());
			}
			if (this.getView().byId("SCHTTPGet").getSelected()) {
				oDataSCAuthenticationMethodInterfaceCheckBx.push(this.getView().byId("SCHTTPGet").getText());
			}
			if (this.getView().byId("SCother").getSelected()) {
				oDataSCAuthenticationMethodInterfaceCheckBx.push(this.getView().byId("SCother").getText());
			}
			var oDataSCAuthenticationMethodInterfaceCheckBxMulti = oDataSCAuthenticationMethodInterfaceCheckBx.join("~");

			var oDataRCAdapter_EngineInterfaceCheckBx = [];
			if (this.getView().byId("RCCentral").getSelected()) {
				oDataRCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("RCCentral").getText());
			}
			if (this.getView().byId("RCDecentral").getSelected()) {
				oDataRCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("RCDecentral").getText());
			}
			if (this.getView().byId("RCPCK").getSelected()) {
				oDataRCAdapter_EngineInterfaceCheckBx.push(this.getView().byId("RCPCK").getText());
			}
			var oDataRCAdapter_EngineInterfaceCheckBxMulti = oDataRCAdapter_EngineInterfaceCheckBx.join("~");

			var oDataRCExecutionModeInterfaceCheckBx = [];
			if (this.getView().byId("RCsynchronous").getSelected()) {
				oDataRCExecutionModeInterfaceCheckBx.push(this.getView().byId("RCsynchronous").getText());
			}
			if (this.getView().byId("RCasynchronous").getSelected()) {
				oDataRCExecutionModeInterfaceCheckBx.push(this.getView().byId("RCasynchronous").getText());
			}
			var oDataRCExecutionModeInterfaceCheckBxMulti = oDataRCExecutionModeInterfaceCheckBx.join("~");

			var oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx = [];
			if (this.getView().byId("IFPointtoPointChannel").getSelected()) {
				oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx.push(this.getView().byId("IFPointtoPointChannel").getText());
			}
			if (this.getView().byId("IFMessageTranslator").getSelected()) {
				oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx.push(this.getView().byId("IFMessageTranslator").getText());
			}
			if (this.getView().byId("IFRecipientList").getSelected()) {
				oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx.push(this.getView().byId("IFRecipientList").getText());
			}
			if (this.getView().byId("IFecipientListD").getSelected()) {
				oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx.push(this.getView().byId("IFecipientListD").getText());
			}
			var oDataIFEnterpriseIntegrationPatternsInterfaceCheckBxMulti = oDataIFEnterpriseIntegrationPatternsInterfaceCheckBx.join("~");

			//after this

			// var oDataTestType = this.getView().byId("Version10").getSelectedKeys();
			// var oDataTestTypeMulti = oDataTestType.join("~");
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

			// oParam.fieldname = "Technical Specification";
			// oParam.TechnicalSpecification = oDataTechnicalSpecificationMulti;
			// callServices.fnSubmitInMainTable(oParam);

			// oParam.fieldname = "Verion 1.0";
			// oParam.Verion10 = oDataVersion10Multi;
			// callServices.fnSubmitInMainTable(oParam);

			oParam.Fieldname = uParam.Fieldname = "PI_Approver_TS";
			oParam.Fieldvalue = oDataInterface.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Approver);

			oParam.Fieldname = uParam.Fieldname = "PI_Reviewer_TS";
			oParam.Fieldvalue = oDataInterface.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Reviewer);

			oParam.Fieldname = uParam.Fieldname = "PI_Author_TS";
			oParam.Fieldvalue = oDataInterface.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Author);

			oParam.Fieldname = uParam.Fieldname = "PI_BusinessScenario";
			oParam.Fieldvalue = oDataInterface.BusinessScenario;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.BusinessScenario);

			oParam.Fieldname = uParam.Fieldname = "PI_SWCNamespace";
			oParam.Fieldvalue = oDataInterface.SWCNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SWCNamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_PIDescription";
			oParam.Fieldvalue = oDataInterface.PIDescription;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.PIDescription);

			oParam.Fieldname = uParam.Fieldname = "PI_MMappingName";
			oParam.Fieldvalue = oDataInterface.MMappingName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MMappingName);

			oParam.Fieldname = uParam.Fieldname = "PI_MSourceMessage";
			oParam.Fieldvalue = oDataInterface.MSourceMessage;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MSourceMessage);

			oParam.Fieldname = uParam.Fieldname = "PI_MTargetMessage";
			oParam.Fieldvalue = oDataInterface.MTargetMessage;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MTargetMessage);

			oParam.Fieldname = uParam.Fieldname = "PI_MPName";
			oParam.Fieldvalue = oDataInterface.MPName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MPName);

			oParam.Fieldname = uParam.Fieldname = "PI_MPType";
			oParam.Fieldvalue = oDataInterface.MPType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MPType);

			oParam.Fieldname = uParam.Fieldname = "PI_MArchiveName";
			oParam.Fieldvalue = oDataInterface.MArchiveName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MArchiveName);

			oParam.Fieldname = uParam.Fieldname = "PI_MArchiveNamespace";
			oParam.Fieldvalue = oDataInterface.MArchiveNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MArchiveNamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_MLibraryName";
			oParam.Fieldvalue = oDataInterface.MLibraryName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MLibraryName);

			oParam.Fieldname = uParam.Fieldname = "PI_MLibraryNamespace";
			oParam.Fieldvalue = oDataInterface.MLibraryNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.MLibraryNamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_OMappingName";
			oParam.Fieldvalue = oDataInterface.OMappingName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OMappingName);

			oParam.Fieldname = uParam.Fieldname = "PI_OSourceMessage";
			oParam.Fieldvalue = oDataInterface.OSourceMessage;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSourceMessage);

			oParam.Fieldname = uParam.Fieldname = "PI_OTargetMessage";
			oParam.Fieldvalue = oDataInterface.OTargetMessage;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OTargetMessage);

			oParam.Fieldname = uParam.Fieldname = "PI_OPName";
			oParam.Fieldvalue = oDataInterface.OPName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OPName);

			oParam.Fieldname = uParam.Fieldname = "PI_OPType";
			oParam.Fieldvalue = oDataInterface.OPType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OPType);

			oParam.Fieldname = uParam.Fieldname = "PI_OMProgram";
			oParam.Fieldvalue = oDataInterface.OMProgram;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OMProgram);

			oParam.Fieldname = uParam.Fieldname = "PI_OMNamespace";
			oParam.Fieldvalue = oDataInterface.OMNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OMNamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_OMParameterName";
			oParam.Fieldvalue = oDataInterface.OMParameterName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OMParameterName);

			oParam.Fieldname = uParam.Fieldname = "PI_OMParameterType";
			oParam.Fieldvalue = oDataInterface.OMParameterType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OMParameterType);

			oParam.Fieldname = uParam.Fieldname = "PI_Complexity";
			oParam.Fieldvalue = oDataTypeComplexityInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.Complexity);

			oParam.Fieldname = "PI_ImplementationType";
			oParam.Fieldvalue = oDataImplementationTypeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ImplementationType);

			oParam.Fieldname = uParam.Fieldname = "PI_TypeofMapping_";
			oParam.Fieldvalue = oDataTypeofMappingInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess._TypeofMapping_);

			oParam.Fieldname = uParam.Fieldname = "PI_SIName";
			oParam.Fieldvalue = oDataInterface.SIName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SIName);

			oParam.Fieldname = uParam.Fieldname = "PI_SIDescription";
			oParam.Fieldvalue = oDataInterface.SIDescription;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SIDescription);

			oParam.Fieldname = uParam.Fieldname = "PI_SINamespace";
			oParam.Fieldvalue = oDataInterface.SINamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SINamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_SICategory";
			oParam.Fieldvalue = oDataSICategoryInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SICategory);

			oParam.Fieldname = uParam.Fieldname = "PI_SIInterfacePattern";
			oParam.Fieldvalue = oDataSIInterfacePatternInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SIInterfacePattern);

			oParam.Fieldname = uParam.Fieldname = "PI_SIAssociatedOperations";
			oParam.Fieldvalue = oDataInterface.SIAssociatedOperations;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SIAssociatedOperations);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIName";
			oParam.Fieldvalue = oDataInterface.OSIName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIName);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIDescription";
			oParam.Fieldvalue = oDataInterface.OSIDescription;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIDescription);

			oParam.Fieldname = uParam.Fieldname = "PI_OSINamespace";
			oParam.Fieldvalue = oDataInterface.OSINamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSINamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIPattern";
			oParam.Fieldvalue = oDataOSIPatternInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIPattern);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIMode";
			oParam.Fieldvalue = oDataOSIModeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIMode);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIAssociatedMessageType";
			oParam.Fieldvalue = oDataInterface.OSIAssociatedMessageType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIAssociatedMessageType);

			oParam.Fieldname = uParam.Fieldname = "PI_OSIRole";
			oParam.Fieldvalue = oDataOSIRoleInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.OSIRole);

			oParam.Fieldname = uParam.Fieldname = "PI_IOType";
			oParam.Fieldvalue = oDataIOTypeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IOType);

			oParam.Fieldname = uParam.Fieldname = "PI_IOName";
			oParam.Fieldvalue = oDataInterface.IOName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IOName);

			oParam.Fieldname = uParam.Fieldname = "PI_CC1Name";
			oParam.Fieldvalue = oDataInterface.CC1Name;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.CC1Name);

			oParam.Fieldname = uParam.Fieldname = "PI_CC2Name";
			oParam.Fieldvalue = oDataInterface.CC2Name;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.CC2Name);

			oParam.Fieldname = uParam.Fieldname = "PI_CC1Type";
			oParam.Fieldvalue = oDataCC1TypeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.CC1Type);

			oParam.Fieldname = uParam.Fieldname = "PI_CC2Type";
			oParam.Fieldvalue = oDataCC2TypeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.CC2Type);

			oParam.Fieldname = uParam.Fieldname = "PI_SCAdapter_Engine";
			oParam.Fieldvalue = oDataSCAdapter_EngineInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCAdapter_Engine);

			oParam.Fieldname = uParam.Fieldname = "PI_SCParty";
			oParam.Fieldvalue = oDataInterface.SCParty;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCParty);

			oParam.Fieldname = uParam.Fieldname = "PI_SCChannel";
			oParam.Fieldvalue = oDataInterface.SCChannel;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCChannel);

			oParam.Fieldname = uParam.Fieldname = "PI_SCCC";
			oParam.Fieldvalue = oDataInterface.SCCC;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCCC);

			oParam.Fieldname = uParam.Fieldname = "PI_SCAdapterType";
			oParam.Fieldvalue = oDataInterface.SCAdapterType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCAdapterType);

			oParam.Fieldname = uParam.Fieldname = "PI_SCServiceName";
			oParam.Fieldvalue = oDataInterface.SCServiceName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCServiceName);

			oParam.Fieldname = uParam.Fieldname = "PI_SCMessageFormat";
			oParam.Fieldvalue = oDataSCMessageFormatInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCMessageFormat);

			oParam.Fieldname = uParam.Fieldname = "PI_SCMessageProtocol";
			oParam.Fieldvalue = oDataSCMessageProtocolInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCMessageProtocol);

			oParam.Fieldname = uParam.Fieldname = "PI_SCAuthenticationMethod";
			oParam.Fieldvalue = oDataSCAuthenticationMethodInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCMessageProtocol);

			oParam.Fieldname = uParam.Fieldname = "PI_SCAdditionalInformation";
			oParam.Fieldvalue = oDataInterface.SCAdditionalInformation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.SCAdditionalInformation);

			oParam.Fieldname = uParam.Fieldname = "PI_RCAdapterEngine";
			oParam.Fieldvalue = oDataRCAdapter_EngineInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCAdapterEngine);

			oParam.Fieldname = uParam.Fieldname = "PI_RCParty";
			oParam.Fieldvalue = oDataInterface.RCParty;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCParty);

			oParam.Fieldname = uParam.Fieldname = "PI_RCChannel";
			oParam.Fieldvalue = oDataInterface.RCChannel;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCChannel);

			oParam.Fieldname = uParam.Fieldname = "PI_RCCC";
			oParam.Fieldvalue = oDataInterface.RCCC;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCCC);

			oParam.Fieldname = uParam.Fieldname = "PI_RCAdapterType";
			oParam.Fieldvalue = oDataInterface.RCAdapterType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCAdapterType);

			oParam.Fieldname = uParam.Fieldname = "PI_RCFunctionModule";
			oParam.Fieldvalue = oDataInterface.RCFunctionModule;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCFunctionModule);

			oParam.Fieldname = uParam.Fieldname = "PI_RCExecutionMode";
			oParam.Fieldvalue = oDataRCExecutionModeInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCExecutionMode);

			oParam.Fieldname = uParam.Fieldname = "PI_RCAdditionalInformation";
			oParam.Fieldvalue = oDataInterface.RCAdditionalInformation;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.RCAdditionalInformation);

			oParam.Fieldname = uParam.Fieldname = "PI_IFFlowName";
			oParam.Fieldvalue = oDataInterface.IFFlowName;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IFFlowName);

			oParam.Fieldname = uParam.Fieldname = "PI_IFEnterpriseIntegrationPatterns";
			oParam.Fieldvalue = oDataIFEnterpriseIntegrationPatternsInterfaceCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.IFEnterpriseIntegrationPatterns);

			oParam.Fieldname = uParam.Fieldname = "PI_ICOSCommunicationParty";
			oParam.Fieldvalue = oDataInterface.ICOSCommunicationParty;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICOSCommunicationParty);
			oParam.Fieldname = uParam.Fieldname = "PI_ICORCommunicationParty";
			oParam.Fieldvalue = oDataInterface.ICORCommunicationParty;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICORCommunicationParty);

			oParam.Fieldname = uParam.Fieldname = "PI_ICOSCommunicationcomponent";
			oParam.Fieldvalue = oDataInterface.ICOSCommunicationcomponent;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICOSCommunicationcomponent);
			oParam.Fieldname = uParam.Fieldname = "PI_ICORCommunicationcomponent";
			oParam.Fieldvalue = oDataInterface.ICORCommunicationcomponent;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICORCommunicationcomponent);

			oParam.Fieldname = uParam.Fieldname = "PI_ICOSInterface";
			oParam.Fieldvalue = oDataInterface.ICOSInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICOSInterface);

			oParam.Fieldname = uParam.Fieldname = "PI_ICORInterface";
			oParam.Fieldvalue = oDataInterface.ICORInterface;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICORInterface);

			oParam.Fieldname = uParam.Fieldname = "PI_ICOSNamespace";
			oParam.Fieldvalue = oDataInterface.ICOSNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICOSNamespace);

			oParam.Fieldname = uParam.Fieldname = "PI_ICORNamespace";
			oParam.Fieldvalue = oDataInterface.ICORNamespace;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.ICORNamespace);

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
			this.setUpdateTableData("TS_PI_IntegrationScenario", "TS_PI_IntegrationScenarioTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_MessageMapping", "TS_PI_MessageMappingTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_OperationMapping", "TS_PI_OperationMappingTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_ServiceInterfaces", "TS_PI_ServiceInterfacesTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_ImportedObjects", "TS_PI_ImportedObjectsTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_CommunicationComponent", "TS_PI_CommunicationComponentTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_IntegrationFlow", "TS_PI_IntegrationFlowTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_IntegratedConfigurations", "TS_PI_IntegratedConfigurationsTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_SenderCommunicationDetails", "TS_PI_SenderCommunicationDetailsTemp", oDataInterface, oParam, uParam);
			this.setUpdateTableData("TS_PI_ReceiverCommunicationDetails", "TS_PI_ReceiverCommunicationDetailsTemp", oDataInterface, oParam,
				uParam);
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

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachIntDet').getId()) {
				//callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet");
				// callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntDet", this.readAttachments1, oServiceParam, this.getView());
				// oServiceParam.FIELDNAME = "IntDet";

				if (this.getView().byId("fileUploadIntDet").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadIntDet"), "IntData_TS",
						oServiceParam, this.getView().getModel("intDataDet"), "attachIntDet", "attachIntDetVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

				//this.readAttachments1(oServiceParam);

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

			} else if ((this.getView().byId("oBTSubmit").getText() === "Approve")) {
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("intData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_TS";
				uParam.Fieldname = "STATUS_TS";
				oParam.Fieldvalue = "SUBMITTED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_TS);
			} else if (this.getView().byId("oBTSubmit").getText() === "Approve") {
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

			//	oCurrentView.byId("oBTSubmit").setText("Accept");
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("intData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_TS";
				uParam.Fieldname = "STATUS_TS";
				oParam.Fieldvalue = "APPROVED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_TS);
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

				var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
				var oDataForMail = that.getView().getModel("intData").getData();
				var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
				callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
				callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
					oDataForMail.ObjectTitle);

				oParam.Fieldname = "STATUS_TS";
				uParam.Fieldname = "STATUS_TS";
				oParam.Fieldvalue = "ACCEPTED";
				callServices.fnUpdateInMainTable(oParam, uParam, this.oDataInterfaceSuccess.STATUS_TS);
			}

		},
		checkStatus: function() {
			var oCurrentView = this.getView();
			var intData1 = {
				STATUS_TS: ""

			};
			this.oReadInterfaceDataSuccess = {
				STATUS_TS: false

			};

			var intJSON = new sap.ui.model.json.JSONModel(intData1);

			this.getView().setModel(intJSON, "intData1");
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			oParam.Fieldname = "STATUS_TS";
			callServices.fnGetDataMainTable(oParam, intData1, "STATUS_TS", this.oReadInterfaceDataSuccess);

			if (intData1.STATUS_TS === "SUBMITTED") {

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

			} else if (intData1.STATUS_TS === "APPROVED") {

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();
				oCurrentView.byId("oBTPrint").setEnabled(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(false);
			} else if (intData1.STATUS_TS === "SAVED") {
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
			} else if (intData1.STATUS_TS === "ACCEPTED") {
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
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSave").setEnabled(true);
			}
		},
		deleteRowTabData: function(oEvt) {
			var parentField = oEvt.getSource().getBindingContext("intData").sPath.split("/")[1];
			var mainObjectArray = oEvt.getSource().getBindingContext("intData").oModel.oData[parentField];
			if (mainObjectArray.length > 1) {
				mainObjectArray.length = (mainObjectArray.length - 1);
			}
			this.getView().getModel("intData").refresh();
		},
		addNewRowTabData: function(oEvt) {
			var parentField = oEvt.getSource().getBindingContext("intData").sPath.split("/")[1];
			var mainObjectArray = this.getView().getModel("intData").getData()[parentField];
			//var mainObjectArrayLength = this.getView().getModel("intData").getData()[parentField].length;
			var keysArray = Object.keys(mainObjectArray[0]);
			var resultArray = [{}];
			for (var i = 0; i < keysArray.length; i++) {
				resultArray[0][keysArray[i]] = "";
			}
			this.getView().getModel("intData").getData()[parentField].push(resultArray[0]);
			this.getView().getModel("intData").refresh();
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
				var FieldnameIndex = parseInt(index) + 1
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