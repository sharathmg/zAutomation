var globalUserAcceptanceArrayData;
var globalUserAcceptanceArray;
var globalCommLogArrayData;
var globalCommLogArray;
var sHtmlValue =
	'<ul style="list-style: none;"><li>Overview<ul  style="list-style: none;"><li>Business Driver</li><br><br><br><br><br></ul  style="list-style: none;"></li><li>Functional Specification Details<ul  style="list-style: none;"><li>Impacted Subprocess (es)</li><br><br><br><br><br></ul></li><li>Operational Considerations<ul  style="list-style: none;"><li>Data Source</li><br><br><br><br><br><li>Trigger</li><br><br><br><br><br></ul></li><li>Design Considerations<ul  style="list-style: none;"><li>Design Details<ul  style="list-style: none;"><li>Detailed Description of Form</li><br><br><br><br><br><li>Data Selection / Validation</li><br><br><br><br><br></ul></li><li>Output of Form</li><br><br><br><br><br></ul></li></ul>';
var sHtmlEnh1 =
	'<ul style="list-style: none;"><li>Overview<br><br><br><br><br></li></ul><li>Functional Specification Details<ul  style="list-style: none;"><li>Impacted Subprocess (es)</li><br><br><br><br><br></ul>';
var sHtmlEnh2 =
	'<ul style="list-style: none;"><li>Operational Considerations<br><br><br><br><br></li><li>Design Considerations<ul  style="list-style: none;"><li>Design Details<ul  style="list-style: none;"><li> Detailed Description of Enhancement<br><br><br><br><br></li></ul> <li>Error Handling, Correction and Recovery<br><br><br><br><br></li></li><br><br><br><br><br></ul></li><li>Security Requirements<br><br><br><br><br></li><li>Auditing and Control Requirements<br><br><br><br><br></li></ul>';

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/automation/toolAutomationNew/utils/callServices",
	"sap/m/MessageBox",
	"sap/ui/richtexteditor/RichTextEditor"
], function(Controller, callServices, MessageBox, RichTextEditor) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.DetailPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.automation.toolAutomationNew.view.DetailPage
		 */
		onInit: function() {

			this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this.onObjectMatched, this);

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
			this.CROpen = "";

			this.changeVersionKeyFlag = false;
			var oCurrentView = this.getView();
			var oModelProcFlowFS = new sap.ui.model.json.JSONModel(oDataProcessFlowLanesOnly);
			oCurrentView.setModel(oModelProcFlowFS, "pf2");
			oCurrentView.byId("processflow2").updateModel();
			oCurrentView.byId("processflow2").setZoomLevel("Two");

			/*		    this.getView().byId("formmapping").setValue(sHtmlValue); */
		},

		oReadWflDataSuccess: {

		},
		oReadEnhanDataSuccess: {

		},

		oReadFormDataSuccess: {

		},

		oProjectId: "",

		onChange: function() {
			sap.ui.getCore().getModel("CRnumber").getData().CRINFO.NavTS_FS = 1;
			this.getOwnerComponent().getRouter().navTo("techspec");
		},

		onOutboundChange: function(oEvent) {
			if (oEvent.getSource().getSelectedKey() === "outbound") {
				this.byId("source").addSelectedKeys("hana");
			}
		},

		onObjectMatched: function(oEvent) {
			this.changeVersionKeyFlag = false;
			//SOC Writwick 10 July 2018
			sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Stepno = "S1";
			//EOC Writwick 10 July 2018
			sap.ui.getCore().getModel("ObjectInformation").refresh();
			this.byId("idPopOverContainer").setVisible(false);

			this.byId("doctype").setSelectedKey("Functional");

			/**
			 * Intialize Screen
			 **/
			this.byId("outputrequirements").setVisible(false);
			this.byId("postload1").setVisible(false);
			this.byId("table0").setVisible(false);
			this.byId("upload1").setVisible(false);
			this.byId("enhreqimpact").setVisible(false);
			this.byId("enhancementreq").setVisible(false);
			this.byId("processarea").setVisible(false);
			this.byId("subProcessArea").setVisible(false);
			this.byId("itype").setVisible(false);
			this.byId("source").setVisible(false);
			this.byId("target").setVisible(false);
			this.byId("sb1").setVisible(false);
			this.byId("sb2").setVisible(false);
			this.byId("frequency").setVisible(false);
			this.byId("impactedSystem").setVisible(false);
			this.byId("Dependenciesid").setVisible(false);
			this.byId("DependenciesidText").setVisible(false);
			this.byId("Comp").setVisible(false);
			this.byId("accessMethod").setVisible(false);
			this.byId("customTablePanel").setVisible(false);
			this.byId("Printreq").setVisible(false);
			this.byId("FT").setVisible(false);
			this.byId("R1").setVisible(false);
			this.byId("R2").setVisible(false);
			this.byId("mappingSection1").setVisible(false);
			this.byId("mappingSection2").setVisible(false);
			this.byId("storynumber").setVisible(false);
			this.byId("errHandl").setVisible(false);
			this.byId("alertNotifSec").setVisible(false);
			this.byId("WfAssumptionCmtId").setVisible(false);
			this.byId("Summary").setVisible(false);
			this.byId("triggerPnt").setVisible(false);
			this.byId("usrIntrf").setVisible(false);
			//	this.byId("stages").setVisible(false);
			this.byId("specialReq").setVisible(false);
			this.byId("approvalTab").setVisible(false);
			this.byId("objectDetails").setVisible(false);
			this.byId("approvalRoles").setVisible(false);
			this.byId("fricedesc").setVisible(false);
			this.byId("inputGrid").setVisible(false);
			this.byId("ObjDescrp").setVisible(false);
			this.byId("Edpoint").setVisible(false);
			this.byId("commlogSection").setVisible(false);
			this.byId("frmCommlogSection").setVisible(false);
			this.byId("reviewSection").setVisible(false);
			//this.byId("versiontypeNew").setVisible(false);
			//	this.byId("versiontypeExisting").setVisible(false);
			//	this.byId("reviewComment0").setVisible(false);commented by utkarsh
			//			this.byId("reviewComment1").setVisible(false);
			//	this.byId("reviewComment2").setVisible(false);commented by utkarsh
			//	this.byId("reviewComment3").setVisible(false);commented by utkarsh
			//			this.byId("reviewComment4").setVisible(false);
			this.byId("reviewComment5").setVisible(false);
			this.byId("reviewComment6").setVisible(false);
			this.byId("reviewCommentIMP").setVisible(false);
			this.byId("barcodereq").setVisible(false);

			this.byId("oBTPrint").setVisible(false);

			// Reset Process Lane Starts
			var oCurrentView = this.getView();
			if (oCurrentView.byId("processflow2")._getLane("0")) {
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
			}
			// Reset Process Lane Ends

			var type = sap.ui.getCore().getModel().getData().Key;
			var sObjectTitle = "";
			var oParam = "";
			try {
				oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

				if (oParam) {
					//SOC Writwick 10 July 2018
					if (oParam.Projectid) {
						this.oProjectId = oParam.Projectid;
						delete oParam.Projectid;
						//EOC Writwick 10 July 2018
					}
				}

				if (oParam.Projectkey === "ENH" || type === "Enhancement") {
					sObjectTitle = "Enhancement";
					this.byId("Comp").setVisible(true);
					this.byId("fricedesc").setVisible(true);
					this.byId("storynumber").setVisible(true);

					this.byId("processarea").setVisible(true);
					this.byId("subProcessArea").setVisible(true);
					this.byId("customTablePanel").setVisible(true);
					this.byId("enhreqimpact").setVisible(true);
					this.byId("enhancementreq").setVisible(true);
					this.byId("formGenPanel").setVisible(false);
					this.byId("formMappingSheetPanel").setVisible(false);
					this.byId("formAttachmentsPanel").setVisible(true);
					this.byId("formDependenciesPanel").setVisible(false);
					this.byId("reviewComment5").setVisible(false);
					this.byId("reviewComment6").setVisible(false);
					this.byId("reviewCommentIMP").setVisible(false);
				} else if (oParam.Projectkey === "WFLW" || type === "Workflow") {
					sObjectTitle = "Workflow";
					this.byId("processarea").setVisible(true);
					this.byId("WFErrorHandling").setVisible(true);
					this.byId("alertNotifSec").setVisible(true);
					this.byId("WfAssumptionCmtId").setVisible(true);
					this.byId("Comp").setVisible(true);
					this.byId("ObjDescrp").setVisible(true);
					this.byId("Edpoint").setVisible(true);
					this.byId("triggerPnt").setVisible(true);
					this.byId("usrIntrf").setVisible(true);
					//	this.byId("stages").setVisible(true);
					this.byId("specialReq").setVisible(true);
					this.byId("inputGrid").setVisible(true);
					this.byId("objectDetails").setVisible(true);
					this.byId("approvalRoles").setVisible(true);
					this.byId("formGenPanel").setVisible(false);
					this.byId("formGenPanel").setVisible(false);
					this.byId("formMappingSheetPanel").setVisible(false);
					this.byId("formAttachmentsPanel").setVisible(false);
					this.byId("formDependenciesPanel").setVisible(false);
				} else if (oParam.Projectkey === "FRM" || type === "Form") {
					sObjectTitle = "Form";
					this.byId("Comp").setVisible(true);
					this.byId("processarea").setVisible(true);
					this.byId("Printreq").setVisible(true);
					this.byId("FT").setVisible(true);
					this.byId("R1").setVisible(true);
					this.byId("R2").setVisible(true);
					this.byId("UASIndex").setVisible(false);
					this.byId("CLIndex").setVisible(false);
					this.byId("formGenPanel").setVisible(true);
					this.byId("barcodereq").setVisible(true);
					this.byId("formMappingSheetPanel").setVisible(true);
					this.byId("formAttachmentsPanel").setVisible(true);
					this.byId("formDependenciesPanel").setVisible(false);
					this.byId("subProcessArea").setVisible(true);

					this.byId("storynumber").setVisible(true);
				}
			} catch (exception) {
				return;
			}

			// var title = "[" + sObjectTitle + "] " + "Object 2104 - Material Master Update";
			// this.byId("page").setTitle(title);

			/**
			 * New/Existing Control
			 */
			var obj = sap.ui.getCore().getModel().getData().Obj;

			switch (obj) {
				case "new":
					this.byId("versiontypeNew").setVisible(true);
					this.byId("versiontypeExisting").setVisible(false);
					//					this.byId("reviewComment1").setVisible(false);
					if (oParam.Projectkey === "ENH") {
						this.dataReadEnhancement();
					} else if (oParam.Projectkey === "WFLW") {
						this.getDataForWorkflow("N");
					} else if (oParam.Projectkey === "FRM") {
						this.dataRead2();
					}
					break;
				case "existing":
					this.byId("versiontypeExisting").setVisible(true);
					this.byId("versiontypeNew").setVisible(false);
					// this.byId("reviewComment0").setVisible(true);
					//					this.byId("reviewComment1").setVisible(false);
					//					this.byId("reviewComment2").setVisible(true);
					//					this.byId("reviewComment3").setVisible(true);
					//					this.byId("reviewComment4").setVisible(true);
					//					this.byId("reviewComment5").setVisible(true);
					//					this.byId("reviewCommentIMP").setVisible(true);
					this.byId("commlogSection").setVisible(true);

					if (oParam.Projectkey === "ENH") {
						var navigatedTo = sap.ui.getCore().getModel("CRnumber").getData().CRINFO.NavTS_FS;
						if (navigatedTo === 0) {
							this.byId('versiontypeExisting').destroyItems();
							var oSelect = this.getView().byId("versiontypeExisting");
							var newItem = new sap.ui.core.Item({
								key: "Version 1.0",
								text: "Version 1.0"
							});
							oSelect.addItem(newItem);
						}
						this.dataReadEnhancement();
					} else if (oParam.Projectkey === "WFLW") {
						this.byId('versiontypeExisting').destroyItems();
						var oSelect = this.getView().byId("versiontypeExisting");
						var newItem = new sap.ui.core.Item({
							key: "Version 1.0",
							text: "Version 1.0"
						});
						oSelect.addItem(newItem);
						this.getDataForWorkflow("E");
						// this.byId("oBTPrint").setEnabled(true);
					} else if (oParam.Projectkey === "FRM") {
						this.byId('versiontypeExisting').destroyItems();
						var oSelect = this.getView().byId("versiontypeExisting");
						var newItem = new sap.ui.core.Item({
							key: "Version 1.0",
							text: "Version 1.0"
						});
						oSelect.addItem(newItem);
						this.byId("commlogSection").setVisible(false);
						this.byId("frmCommlogSection").setVisible(true);
						this.dataRead2();
					}
					this.byId("oBTPrint").setVisible(true);
					break;
			}
		},
		dataReadEnhancement: function(versionNo) {
			this.getDataforARA("ENH");
			var that = this;
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (!oParam) {
				return;
			}
			//SOC Writwick 10 July 2018
			oParam.Version = "1.0";
			//EOC Writwick 10 July 2018

			// var oParam = {
			//  repid: 'ENH-083b-US-E-2104',
			//  Projectkey: 'ENH',
			//  processid: 'PR005',
			//  stepno: 'S1',
			//  fieldname: ''
			// };

			var enhData = {
				HeaderTitle: "",
				Approver: "",
				Reviewer: "",
				Author: "",
				ObjectId: "",
				ObjectTitle: "",
				StoryNumberComment: "",
				ProcessArea: "",
				SubProcessArea: "",
				impact: "",
				dependencies: "",
				ObjectIdEnhancementRequirement: "",
				Complexity: "",
				errorHandling: "",
				security: "",
				securityComments: "",
				securityReviewComments: "",
				ReviewComments: "",
				ReviewCommentsRating: 0,
				IMPComments: "",
				ImpReview: 0,
				ReviewComments_rc: "",
				ReviewCommentsRating_rc: 0,
				FormMapping: "",
				Rating: 0,
				CommLog: [],
				CommLogTemp: "",
				userAcceptance: [],
				userAcceptTemp: "",
				reqCustTable: [],
				reqCustTableTemp: "",
				attachEnhReq: [],
				attachEnhReqVisible: true,
				attachWfObjectDetails: [],
				attachWfObjectDetailsVisible: true,
				Status_FS: "",
				versionLatest: "",
				Assumptions: "",
				Dependencies: "",
				HTTPS_SFTP_: "",
				UserAuth: "",
				Encryp: ""

			};
			this.oReadEnhanDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectId: true,
				ObjectTitle: false,
				StoryNumberComment: false,
				ProcessArea: false,
				SubProcessArea: false,
				impact: false,
				dependencies: false,
				ObjectIdEnhancementRequirement: false,
				Complexity: false,
				errorHandling: false,
				security: false,
				securityComments: false,
				securityReviewComments: false,
				ReviewComments: false,
				ReviewCommentsRating: false,
				IMPComments: false,
				ImpReview: false,
				ReviewComments_rc: false,
				ReviewCommentsRating_rc: false,
				Rating: false,
				userAcceptTemp: false,
				CommLogTemp: false,
				reqCustTableTemp: false,
				Status_FS: false,
				versionLatest: false,
				Assumptions: false,
				Dependencies: false,
				HTTPS_SFTP_: false,
				UserAuth: false,
				Encryp: false

			};

			var enhJSON = new sap.ui.model.json.JSONModel(enhData);
			this.getView().setModel(enhJSON, "enhData");

			/****START*****DO NOT REMOVE THIS CODE (Meant to implement the Batach Call for Read Operation)*********/
			// callServices.fnReadDocDataBatchCall(oParam,
			// enhData,
			// this.oReadEnhanDataSuccess, [
			// 		["Status_FS", "STATUS_FS"],
			// 		["Approver", "Approver"],
			// 		["Reviewer", "Reviewer"],
			// 		["Author", "Author"],
			// 		["ObjectTitle", "Object%20Title"]
			// 	],
			// this.getView(),
			// "enhData",
			// function() {
			// 	// this.getView().getModel("enhData").refresh();
			// });
			/***END******DO NOT REMOVE THIS CODE (Meant to implement the Batach Call for Read Operation)*********/

			if (!oParam) {
				return;
			}
			if (oParam) {
				//SOC Writwick 10 July 2018
				if (oParam.Projectid) {
					delete oParam.Projectid;
					//EOC Writwick 10 July 2018
				}
			}
			//SOC Writwick 10 July 2018
			oParam.Version = "1.0";
			//EOC Writwick 10 July 2018
			this.getView().byId("oBTPrint").setVisible(true);

			if (versionNo) {
				//SOC Writwick 10 July 2018
				oParam.Version = versionNo;
				//EOC Writwick 10 July 2018
				var crNumber1 = sessionStorage.getItem("crNumber");
				var crData = sessionStorage.getItem("crData");
				if (crNumber1 !== "") {
					// this.getView().byId("storynumber").setValue(crNumber1);
					enhData.StoryNumberFComment = crNumber1;
				}
			} else {

				var num = 1;

				while (num > 0) {
					//SOC Writwick 10 July 2018
					oParam.Fieldname = "STATUS_FS";
					//EOC Writwick 10 July 2018
					callServices.fnGetDataMainTable(oParam, enhData, "Status_FS", this.oReadEnhanDataSuccess);
					enhData.versionLatest = enhData.Status_FS;
					//SOC Writwick 10 July 2018
					// if (enhData.versionLatest !== undefined) {
					if (enhData.versionLatest !== "") {
						num = num + 1;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";

						if (enhData.versionLatest === "ACCEPTED") {
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
						// enhData.versionLatest = undefined;
						// enhData.Status_FS = undefined;
						enhData.versionLatest = "";
						enhData.Status_FS = "";
						//EOC Writwick 12 July 2018
					} else if (num > 1){
						//versiontypeExisting  
						//Version 3.0
						//this.byId("versiontypeExisting").setValueState("Version 3.0");
						//SOC Writwick 10 July 2018
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
					//EOC Writwick 10 July 2018
				}
			}
			
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "Status_FS", this.oReadEnhanDataSuccess);
			var statusLastVersion = enhData.Status_FS;
			var statusLast = statusLastVersion;

		
			if (statusLastVersion === "ACCEPTED" && versionNo === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					// this.getView().byId("storynumber").setValue("");
				//	this.getView().byId("oBTHold").setVisible(true);
					enhData.StoryNumberFComment = "";
					//SOC Writwick 10 July 2018
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExisting').removeItem(vItem);

				} else {
					this.CROpen = sessionStorage.getItem("crData");
					//	this.getView().byId("oBTHold").setVisible(true);
					// this.getView().byId("storynumber").setValue(crNumber);
					enhData.StoryNumberFComment = crNumber;
					//SOC Writwick 10 July 2018
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					//EOC Writwick 10 July 2018
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);
					//	statusLast = undefined;
				}

			}

			statusLastVersion = undefined;
			enhData.Status_FS = undefined;

			///////////////

			enhData.Status_FS = "";
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "Status_FS", this.oReadEnhanDataSuccess);

			var oCurrentView = this.getView();
			//var oCurrentView = this.getView();
			if (enhData.Status_FS === 'SAVED') {

			
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("oBTPrint").setVisible(true);
				this.getStatusEnhReview(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (enhData.Status_FS === 'ON HOLD') {
				oCurrentView.byId("oBTSave").setEnabled(false);
				this.getView().byId("oBTHold").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				//	oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);

			

			} else if (enhData.Status_FS === 'SUBMITTED') {

				//var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				//oCurrentView.byId("oBTPrint").setVisible(true);
				this.getStatusEnhReview(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (enhData.Status_FS === 'APPROVED') {

				//var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				//oCurrentView.byId("oBTPrint").setVisible(true);
				this.getStatusEnhReview(true);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();

			} else if (enhData.Status_FS === 'ACCEPTED') {

				//var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
				this.getView().byId("oBTHold").setEnabled(true);
				//oCurrentView.byId("oBTPrint").setVisible(true);
				this.getStatusEnhReview(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();

			} else {

				//var oCurrentView = this.getView();
				//oCurrentView.byId("oBTSave").setVisible(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("oBTPrint").setVisible(false);
				this.getView().byId("oBTHold").setEnabled(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();
				this.getStatusEnhReview(false);
			}

			var procArea = callServices.fnGetProccessArea(enhData);

			if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
					sessionStorage.getItem("crNumber") !== "")) {
				//SOC Writwick 10 July 2018
				oParam.Version = parseInt(oParam.Version) - 1;
				oParam.Version = (oParam.Version).toString() + ".0";
				//EOC Writwick 10 July 2018
			}
			
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Dependencies";
			callServices.fnGetDataMainTable(oParam, enhData, "Dependencies", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Assumptions";
			callServices.fnGetDataMainTable(oParam, enhData, "Assumptions", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "HTTPSSFTP";
			callServices.fnGetDataMainTable(oParam, enhData, "HTTPS_SFTP_", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "UserAuthorization";
			callServices.fnGetDataMainTable(oParam, enhData, "UserAuth", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Encryption";
			callServices.fnGetDataMainTable(oParam, enhData, "Encryp", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Approver";
			callServices.fnGetDataMainTable(oParam, enhData, "Approver", this.oReadEnhanDataSuccess);
			// enhData.Approver = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Reviewer";
			callServices.fnGetDataMainTable(oParam, enhData, "Reviewer", this.oReadEnhanDataSuccess);
			// enhData.Reviewer = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Author";
			callServices.fnGetDataMainTable(oParam, enhData, "Author", this.oReadEnhanDataSuccess);
			// enhData.Author = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			// oParam.fieldname = "Object ID";
			// callServices.fnGetDataMainTable(oParam, enhData, "ObjectId", this.oReadEnhanDataSuccess);
			// // enhData.ObjectId = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			enhData.ObjectId = oParam.Repid;

			oParam.Fieldname = "Object Title";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjectTitle", this.oReadEnhanDataSuccess);
			// enhData.ObjectTitle = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			enhData.HeaderTitle = "Enhancement " + enhData.ObjectId + " - " + enhData.ObjectTitle;

			oParam.Fieldname = "Story Number%2FComment";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "StoryNumberComment", this.oReadEnhanDataSuccess);
			var crNumber2 = sap.ui.getCore().getModel("CRnumber").getData().CRINFO.CRNumber;
			if (crNumber2 !== "") {
				enhData.StoryNumberComment = crNumber2;
			}
			// enhData.StoryNumberComment = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Process Area";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "ProcessArea", this.oReadEnhanDataSuccess);
			// enhData.ProcessArea = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);
			if (enhData.ProcessArea) {
				var sProcessAreaOpt = enhData.ProcessArea.split("~");
				for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
					that.getView().byId("processarea").addSelectedKeys(sProcessAreaOpt[iProcAr]);
				}
			}
			
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Sub Process Area";
			callServices.fnGetDataMainTable(oParam, enhData, "SubProcessArea", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Impact";
			callServices.fnGetDataMainTable(oParam, enhData, "impact", this.oReadEnhanDataSuccess);
			if (!enhData.impact) {

				enhData.impact = sHtmlEnh1;
			}

			//oParam.fieldname = "Dependencies";
			//callServices.fnGetDataMainTable(oParam, enhData, "dependencies", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Enhancement Requirement";
			callServices.fnGetDataMainTable(oParam, enhData, "ObjectIdEnhancementRequirement", this.oReadEnhanDataSuccess);
			if (!enhData.ObjectIdEnhancementRequirement) {
				enhData.ObjectIdEnhancementRequirement = sHtmlEnh2;
			}
			// enhData.ObjectIdEnhancementRequirement = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Complexity";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "Complexity", this.oReadEnhanDataSuccess);
			var aComplexityBtn = this.byId("Comp").getButtons();
			for (var iCount = 0; iCount < aComplexityBtn.length; iCount++) {
				if (aComplexityBtn[iCount].getText() === enhData.Complexity) {
					this.byId("Comp").setSelectedIndex(iCount);
					break;
				}
			}

			// oParam.fieldname = "Error Handling";
			// callServices.fnGetDataMainTable(oParam, enhData, "errorHandling", this.oReadEnhanDataSuccess);
			// enhData.errorHandling = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Security";
			//EOC Writwick 10 July 2018
			callServices.fnGetDataMainTable(oParam, enhData, "security", this.oReadEnhanDataSuccess);
			// enhData.security = callServices.fnCallMainTable(oParam,this.oReadEnhanDataSuccess);

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
			//SOC Writwick 10 July 2018
			oParam.Fieldname = "Security Comments";
			callServices.fnGetDataMainTable(oParam, enhData, "securityComments", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Security%20Review%2FComments";
			callServices.fnGetDataMainTable(oParam, enhData, "securityReviewComments", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Review%2FComments";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewComments", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Review%2FCommentsRating";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewCommentsRating", this.oReadEnhanDataSuccess);
			oParam.Fieldname = "IMP_Comments";
			callServices.fnGetDataMainTable(oParam, enhData, "IMPComments", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Imp_Review";
			callServices.fnGetDataMainTable(oParam, enhData, "ImpReview", this.oReadEnhanDataSuccess);
			enhData.ImpReview = parseInt(enhData.ImpReview);
			oParam.Fieldname = "Review_Comments_rc";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewComments_rc", this.oReadEnhanDataSuccess);

			oParam.Fieldname = "Review_CommentsRating_rc";
			callServices.fnGetDataMainTable(oParam, enhData, "ReviewCommentsRating_rc", this.oReadEnhanDataSuccess);
			enhData.ReviewCommentsRating_rc = parseInt(enhData.ReviewCommentsRating_rc);
			oParam.Fieldname = "Security%20Review%20Rating";
			callServices.fnGetDataMainTable(oParam, enhData, "Rating", this.oReadEnhanDataSuccess);
			//EOC Writwick 10 July 2018

			// User Acceptance Table Starts
			var iCountUA, sUserAcptCols;
			
			for (iCountUA = 0;; iCountUA++) {

				enhData.userAcceptTemp = "";
				//SOC Writwick 10 July 2018
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, enhData, "userAcceptTemp", this.oReadEnhanDataSuccess);
				if (this.oReadEnhanDataSuccess.userAcceptTemp) {
					if (enhData.userAcceptTemp) {
						sUserAcptCols = enhData.userAcceptTemp.split("~");
						//if (sUserAcptCols && sUserAcptCols.length >= 7) {
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
						//}
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
			// User Acceptance Table Ends

			// Comm Log Table Starts

			var iCountCommLog, aCommLogCols;
			

			for (iCountCommLog = 0;; iCountCommLog++) {

				enhData.CommLogTemp = "";
				//SOC Writwick 10 July 2018
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTableUC(oParam, enhData, "CommLogTemp", this.oReadEnhanDataSuccess);
				if (this.oReadEnhanDataSuccess.CommLogTemp) {
					if (enhData.CommLogTemp) {
						aCommLogCols = enhData.CommLogTemp.split("~");
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

							// if (aCommLogCols[2] === "" || aCommLogCols[2] === "undefined") {
							// 	aCommLogCols[2] = "";
							// } else {
							// 	aCommLogCols[2] = new Date(aCommLogCols[2]);
							// }
							// if (aCommLogCols[4] === "" || aCommLogCols[4] === "undefined") {
							// 	aCommLogCols[4] = "";
							// } else {
							// 	aCommLogCols[4] = new Date(aCommLogCols[4]);
							// }

							enhData.CommLog.push({
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
			if (enhData.CommLog.length === 0) {
				enhData.CommLog.push({
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

			// Required Custom Table Starts
			var iCountCustTable, aCustTableCols;

			for (iCountCustTable = 0; iCountCustTable < 10; iCountCustTable++) {

				enhData.reqCustTableTemp = "";
				//SOC Writwick 10 July 2018
				oParam.Fieldname = "FS_ReqCustTable_" + (iCountCustTable + 1);
				//EOC Writwick 10 July 2018

				callServices.fnGetDataMainTable(oParam, enhData, "reqCustTableTemp", this.oReadEnhanDataSuccess);
				if (this.oReadEnhanDataSuccess.reqCustTableTemp) {
					if (enhData.reqCustTableTemp) {
						aCustTableCols = enhData.reqCustTableTemp.split("~");
						//if (aCustTableCols && aCustTableCols.length >= 7) {
						enhData.reqCustTable.push({
							tableName: aCustTableCols[0],
							fieldName: aCustTableCols[1],
							fieldDesc: aCustTableCols[2],
							fieldType: aCustTableCols[3],
							fieldLength: aCustTableCols[4],
							valRestrictions: aCustTableCols[5],
							sourceTable: aCustTableCols[6],
							flag: true
						});
						//}
					} else {
						continue;
					}
				} else {
					break;
				}
			}
			if (enhData.reqCustTable.length === 0) {
				enhData.reqCustTable.push({
					tableName: "",
					fieldName: "",
					fieldDesc: "",
					fieldType: "",
					fieldLength: "",
					valRestrictions: "",
					sourceTable: "",
					flag: false
				});
			}
			// Required Custom Table Ends

			// var oParam = {
			//  repid: 'ENH-083b-US-E-2104',
			//  projectkey: 'ENH',
			//  processid: 'PR005',
			//  stepno: 'S1',
			//  fieldname: ''
			// };

			// this.readAttachments({
			// 	REPID: oParam.repid,
			// 	PROJECTKEY: oParam.projectkey,
			// 	PROCESSID: oParam.processid,
			// 	STEPNO: oParam.stepno,
			// 	FIELDNAME: "EnhReq",
			// 	TYPE: "O"
			// });
			//SOC Writwick 11 July 2018
			var oReadAttachParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "EnhReq",
				TYPE: "O"
			};
			//EOC Writwick 11 July 2018
			callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
			//SOC Writwick 10 July 2018
			var oReadAttachParam = {
				REPID: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "WFAttachmentReqObjectDetails",
				TYPE: "O"
			};
			//EOC Writwick 10 July 2018
			callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("enhData"), "attachWfObjectDetails",
				"attachWfObjectDetailsVisible");

			sap.ui.core.BusyIndicator.hide();

			enhJSON.setData(enhData);
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

			var intWFObjectDetails = {
				attachWfObjectDetails: [],
				attachWfObjectDetailsVisible: true
			};
			var intWFObjectDetailsJSON = new sap.ui.model.json.JSONModel(intDataTechAssDep2);
			this.getView().setModel(intWFObjectDetailsJSON, "intWFObjectDetailsJSON");

		},

		resetFormElements: function() {
			var that = this;

			that.byId("R1").setSelected(true);
			that.byId("R2").setSelected(false);
			that.getView().byId("processarea").setSelectedKeys([]);
			that.byId("Simple").setSelected(true);
			that.byId("Medium").setSelected(false);
			that.byId("Complex").setSelected(false);
			//that.byId("hComplex").setSelected(false);
			that.byId("Printc").setSelected(false);
			that.byId("Faxc").setSelected(false);
			that.byId("Emailc").setSelected(false);
			that.byId("Portrait").setSelected(false);
			that.byId("Landscape").setSelected(false);
			that.byId("Thermal").setSelected(false);
			that.byId("Laser").setSelected(false);
			that.byId("Zebra").setSelected(false);
			that.byId("Others").setSelected(false);
			that.byId("HP").setSelected(false);
			that.byId("Xerox").setSelected(false);
			that.byId("Lexmark").setSelected(false);
			that.byId("Other").setSelected(false);
			that.byId("English").setSelected(false);
			that.byId("Spanish").setSelected(false);
			that.byId("Chinese").setSelected(false);
			that.byId("Dutch").setSelected(false);
			that.byId("Mandarin").setSelected(false);
			that.byId("Portuguese").setSelected(false);
			that.byId("German").setSelected(false);
			that.byId("Oth").setSelected(false);
			that.byId("Normal").setSelected(false);
			that.byId("Rotated").setSelected(false);
			that.byId("Inverted").setSelected(false);
			that.byId("Bottom").setSelected(false);

			this.byId("CB2-01").setSelected(false);
			this.byId("CB2-02").setSelected(false);
			this.byId("CB2-03").setSelected(false);

			this.byId("Configuration").setSelected(false);
			this.byId("Development").setSelected(false);
			this.byId("Execution").setSelected(false);

			for (var i = 1; i <= 16; i++) {
				var elementId = "cb" + i;
				that.byId(elementId).setSelected(false);
			}
		},

		// Form data call 
		dataRead2: function(Version) {
			var key = "FORM";
			this.getDataforARA(key);
			sap.ui.core.BusyIndicator.show();
			this.resetFormElements();

			var that = this;
			globalUserAcceptanceArray = [];
			globalCommLogArray = [];

			var FrmData = {
				"FormType": "",
				"OutputMethods": "",
				"PaperSize": "",
				"EmailID": "",
				"FaxNumber": "",
				"PageOrientation": "",
				"Special": "",
				"Preprintedstationary": "",
				"Multiplepageformats": "",
				"WatermarkRequired": "",
				"CompanyLogoRequired": "",
				"PositionoftheLOGO": "",
				"PrinterTrays": "",
				"Numberofcopies": "",
				"FormMapping": "",
				"PrinterType": "",
				"Rotation": "",
				"Printeraccessibility": "",
				"PrinterModelIdentified": "",
				"AnyRelated": "",
				"PrinterRequired": "",
				"PrintLanguages": "",
				"FontSize": "",
				"BarcodeType": "",
				"BarcodeAlignment": "",
				"FormGeneralDetails_Comments": "",
				"FormMapping_Comments": "",
				"PrintingReq_Comments": "",
				"BarcodeReq_Comments": "",
				"FormGeneralDetails_Review": "",
				"FormMapping_Review": "",
				"PrintingReq_Review": "",
				"BarcodeReq_Review": "",
				"userAcceptance": [],
				"attachFrmPrintReq": [],
				"attachFrmPrintReqVisible": false,
				"attachFrmMappingSheetReq": [],
				"attachFrmMappingSheetReqVisible": false
			};

			var frmJSON = new sap.ui.model.json.JSONModel(FrmData);
			this.getView().setModel(frmJSON, "FrmData");
			var url = "/sap/opu/odata/sap/ZDDL_MAINTABLE_CDS";
			var oModel = new sap.ui.model.odata.ODataModel(url);

			var oModelForm = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelForm, "enhData");

			var oDatafrm = {
				HeaderTitle: "",
				Approver: "",
				Reviewer: "",
				Author: "",
				ObjectId: "",
				Complexity: "",
				ProcessArea: "",
				security: "",
				securityComments: "",
				FormGeneralDetails: "",
				userAcceptanceString: "",
				userAcceptance: [],
				commLogString: "",
				commLog: [],
				Status_FS: '',
				dependencies: "",
				Dependencies: "",
				Assumptions: "",
				SubProcessArea: "",
				securityReviewComments: "",
				Rating: 0,
				versionLatest: "",
				StoryNumberComment: "",
				HTTPS_SFTP_: "",
				UserAuth: "",
				Encryp: "",
				FormGeneralDetails_Comments: "",
				FormMapping_Comments: "",
				PrintingReq_Comments: "",
				BarcodeReq_Comments: "",
				FormGeneralDetails_Review: "",
				FormMapping_Review: "",
				PrintingReq_Review: "",
				BarcodeReq_Review: ""

			};
			this.oReadFormDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectId: true,
				Complexity: false,
				ProcessArea: false,
				security: false,
				securityComments: false,
				AnyRelated: false,
				BarcodeAlignment: false,
				BarcodeType: false,
				CompanyLogoRequired: false,
				EmailID: false,
				FaxNumber: false,
				FontSize: false,
				FormType: false,
				Multiplepageformats: false,
				PageOrientation: false,
				PaperSize: false,
				Numberofcopies: false,
				OutputMethods: false,
				PositionoftheLOGO: false,
				Preprintedstationary: false,
				PrintLanguages: false,
				PrinterModelIdentified: false,
				PrinterRequired: false,
				PrinterTrays: false,
				PrinterType: false,
				Printeraccessibility: false,
				Rotation: false,
				Special: false,
				WatermarkRequired: false,
				FormGeneralDetails: false,
				userAcceptanceString: false,
				commLog: false,
				Status_FS: false,
				dependencies: false,
				Dependencies: false,
				Assumptions: false,
				SubProcessArea: false,
				securityReviewComments: false,
				Rating: false,
				versionLatest: false,
				StoryNumberComment: false,
				HTTPS_SFTP_: false,
				UserAuth: false,
				Encryp: false,
				FormGeneralDetails_Comments: false,
				FormMapping_Comments: false,
				PrintingReq_Comments: false,
				BarcodeReq_Comments: false,
				FormGeneralDetails_Review: false,
				FormMapping_Review: false,
				PrintingReq_Review: false,
				BarcodeReq_Review: false
			};

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			if (!oParam) {
				return;
			}

			//commented by utakrsh

			if (!oParam) {
				return;
			}
			if (oParam) {
				if (oParam.projectid) {
					delete oParam.projectid;
				}
			}
			oParam.Version = "1.0";
			this.getView().byId("oBTPrint").setVisible(true);

			if (Version) {
				oParam.Version = Version;
				var crNumber1 = sessionStorage.getItem("crNumber");
				var crData = sessionStorage.getItem("crData");
				if (crNumber1 !== "") {
					// this.getView().byId("storynumber").setValue(crNumber1);
					oDatafrm.StoryNumberFComment = crNumber1;
				}
			} else {

				var num = 1;

				while (num > 0) {
					//SOC Writwick 11 July 2018
					oParam.Fieldname = "STATUS_FS";
					//EOC Writwick 11 July 2018
					callServices.fnGetDataMainTable(oParam, oDatafrm, "Status_FS", this.oReadFormDataSuccess);
					oDatafrm.versionLatest = oDatafrm.Status_FS;
					//SOC Writwick 16 July 2018
					// if (oDatafrm.versionLatest !== undefined) {
					if (oDatafrm.versionLatest !== "") {
						num = num + 1;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";

						if (oDatafrm.versionLatest === "ACCEPTED") {
							var selectedKey = "Version " + oParam.Version;
							var oSelect = this.getView().byId("versiontypeExisting");
							var newItem = new sap.ui.core.Item({
								key: selectedKey,
								text: selectedKey
							});
							oSelect.addItem(newItem);

						}

						// oDatafrm.versionLatest = undefined;
						// oDatafrm.Status_FS = undefined;
						oDatafrm.versionLatest = "";
						oDatafrm.Status_FS = "";
						
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
					//EOC Writwick 16 July 2018
				}
			}
			
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Status_FS", this.oReadFormDataSuccess);
			var statusLastVersion = oDatafrm.Status_FS;
			var statusLast = statusLastVersion;

		
			if (statusLastVersion === "ACCEPTED" && Version === undefined) {

				var crNumber = sessionStorage.getItem("crNumber");
				if (crNumber === "") {
					// this.getView().byId("storynumber").setValue("");
			//		this.getView().byId("oBTHold").setVisible(true);
					oDatafrm.StoryNumberFComment = "";
					oParam.Version = parseInt(oParam.Version);
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);

					var vItem = parseInt(oParam.Version);
					this.byId('versiontypeExisting').removeItem(vItem);

				} else {
					this.CROpen = sessionStorage.getItem("crData");
				//	this.getView().byId("oBTHold").setVisible(false);
					// this.getView().byId("storynumber").setValue(crNumber);
					oDatafrm.StoryNumberFComment = crNumber;
					oParam.Version = parseInt(oParam.Version) + 1;
					oParam.Version = (oParam.Version).toString() + ".0";
					var selectedKey = "Version " + oParam.Version;
					this.byId('versiontypeExisting').setSelectedKey(selectedKey);
					//	statusLast = undefined;
				}

			}

			statusLastVersion = undefined;
			oDatafrm.Status_FS = undefined;

			///////////////

			oDatafrm.Status_FS = "";
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "STATUS_FS";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Status_FS", this.oReadFormDataSuccess);
var oCurrentView = this.getView();
			if (oDatafrm.Status_FS === 'SAVED') {

				var oCurrentView = this.getView();
				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.getReviewDataFORM(false);
				this.getStatusFormReview(false);
				this.getView().byId("oBTHold").setEnabled(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDatafrm.Status_FS === 'ON HOLD') {
				oCurrentView.byId("oBTSave").setEnabled(false);
this.getView().byId("oBTHold").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(false);
			

			}
			//New Change
			else if (oDatafrm.Status_FS === 'SUBMITTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Submit");
				this.getView().byId("oBTHold").setEnabled(true);
				//	oCurrentView.byId("oBTApprove").setVisible(true);
				//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.getReviewDataFORM(true);
				this.getStatusFormReview(true);
				//	this.byId("reviewComment1").setVisible(false);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDatafrm.Status_FS === 'APPROVED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				this.getView().byId("oBTHold").setEnabled(true);
				//		oCurrentView.byId("oBTApprove").setVisible(false);
				//		oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.getReviewDataFORM(true);
				this.getStatusFormReview(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();

			} else if (oDatafrm.Status_FS === 'ACCEPTED') {

				var oCurrentView = this.getView();
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTSubmit").setEnabled(false);
				//	oCurrentView.byId("oBTApprove").setVisible(false);
				//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.getReviewDataFORM(true);
				this.getStatusFormReview(false);
				this.getView().byId("oBTHold").setEnabled(true);

				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
				oCurrentView.byId("processflow2").updateModel();

			}

			//New Change End
			else {

				var oCurrentView = this.getView();

				// 		oCurrentView.byId("oBTSave").setVisible(true);
				// 		oCurrentView.byId("oBTSubmit").setVisible(true); //New Change
				// //		oCurrentView.byId("oBTApprove").setVisible(false); //New Change
				// //		oCurrentView.byId("oBTAcceptApproval").setVisible(false); //New Change
				// 		oCurrentView.byId("oBTPrint").setVisible(false);

				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Submit");
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.getView().byId("oBTHold").setEnabled(true);
				this.getReviewDataFORM(false);
				this.getStatusFormReview(false);
				oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
				oCurrentView.byId("processflow2").updateModel();

			}
			var procArea = callServices.fnGetProccessArea(oDatafrm);
			var availSys = callServices.fnGetAvailableSystems(oDatafrm);

			if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) && (sessionStorage.getItem("crNumber") !== undefined &&
					sessionStorage.getItem("crNumber") !== "")) {
				oParam.Version = parseInt(oParam.Version) - 1;
				oParam.Version = (oParam.Version).toString() + ".0";
			}

			var procArea = callServices.fnGetProccessArea(oDatafrm);
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "SecurityReviewComments";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "securityReviewComments", this.oReadFormDataSuccess);
			
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "SecurityRating";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Rating", this.oReadFormDataSuccess);

			/*oParam.fieldname = "Dependencies";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "dependencies", this.oReadFormDataSuccess);*/

			/*oParam.fieldname = "Dependencies";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "dependencies", this.oReadFormDataSuccess);
			if (oDatafrm.dependencies) {
				var sOpMethods2 = oDatafrm.dependencies.split("~");
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
			}*/
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "Dependencies";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Dependencies", this.oReadFormDataSuccess);

			oParam.Fieldname = "Assumptions";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Assumptions", this.oReadFormDataSuccess);

			oParam.Fieldname = "HTTPSSFTP";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "HTTPS_SFTP_", this.oReadFormDataSuccess);

			oParam.Fieldname = "UserAuthorization";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "UserAuth", this.oReadFormDataSuccess);

			oParam.Fieldname = "Encryption";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Encryp", this.oReadFormDataSuccess);

			oParam.Fieldname = "StoryNumberComment";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "StoryNumberComment", this.oReadFormDataSuccess);

			oParam.Fieldname = "SubProcessArea";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "SubProcessArea", this.oReadFormDataSuccess);

			oParam.Fieldname = "STATUS_FS";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Status_FS", this.oReadFormDataSuccess);

			oParam.Fieldname = "Approver";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Approver", this.oReadFormDataSuccess);

			oParam.Fieldname = "Reviewer";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Reviewer", this.oReadFormDataSuccess);

			oParam.Fieldname = "Author";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Author", this.oReadFormDataSuccess);

			oParam.Fieldname = "FormGeneralDetails_Review";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "FormGeneralDetails_Review", this.oReadFormDataSuccess);
			oDatafrm.FormGeneralDetails_Review = parseInt(oDatafrm.FormGeneralDetails_Review);
			oParam.Fieldname = "FormGeneralDetails_Comments";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "FormGeneralDetails_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "FormMapping_Review";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "FormMapping_Review", this.oReadFormDataSuccess);
			oDatafrm.FormMapping_Review = parseInt(oDatafrm.FormMapping_Review);
			oParam.Fieldname = "FormMapping_Comments";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "FormMapping_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "PrintingReq_Review";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "PrintingReq_Review", this.oReadFormDataSuccess);
			oDatafrm.PrintingReq_Review = parseInt(oDatafrm.PrintingReq_Review);
			oParam.Fieldname = "PrintingReq_Comments";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "PrintingReq_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "BarcodeReq_Review";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "BarcodeReq_Review", this.oReadFormDataSuccess);
			oDatafrm.BarcodeReq_Review = parseInt(oDatafrm.BarcodeReq_Review);
			oParam.Fieldname = "BarcodeReq_Comments";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "BarcodeReq_Comments", this.oReadFormDataSuccess);

			oParam.Fieldname = "ObjectID";
			oDatafrm.ObjectId = oParam.Repid;
			//callServices.fnGetDataMainTable(oParam, oDatafrm, "ObjectId", this.oReadFormDataSuccess);

			oDatafrm.HeaderTitle = "Forms " + oDatafrm.ObjectId;

			oParam.Fieldname = "Complexity";
			callServices.fnGetDataMainTable(oParam, oDatafrm, "Complexity", this.oReadFormDataSuccess);
			//EOC Writwick 11 July 2018
			var sComplexity = oDatafrm.Complexity.split("~");
			for (var iComplexity = 0; iComplexity < sComplexity.length; iComplexity++) {
				switch (sComplexity[iComplexity]) {
					case "Simple":
						that.byId("Simple").setSelected(true);
						break;
					case "Medium":
						that.byId("Medium").setSelected(true);
						break;
					case "Complex":
						that.byId("Complex").setSelected(true);
						break;
						//case "High Complex":
						//	that.byId("hComplex").setSelected(true);
						//	break;
				}
			}
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "ProcessArea";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "ProcessArea", this.oReadFormDataSuccess);
			if (oDatafrm.ProcessArea) {
				var sProcessAreaOpt = oDatafrm.ProcessArea.split("~");
				for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
					that.getView().byId("processarea").addSelectedKeys(sProcessAreaOpt[iProcAr]);
				}
			}

			//SOC Writwick 11 July 2018
			oParam.Fieldname = "Security";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "security", this.oReadFormDataSuccess);
			if (oDatafrm.security) {
				var sSecurityOpt = oDatafrm.security.split("~");
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
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "SecurityComments";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "securityComments", this.oReadFormDataSuccess);
			
			//SOC Writwick 11 July 2018
			oParam.Fieldname = "FormGeneralDetails";
			//EOC Writwick 11 July 2018
			callServices.fnGetDataMainTable(oParam, oDatafrm, "FormGeneralDetails", this.oReadFormDataSuccess);
			if (!oDatafrm.FormGeneralDetails) {
				oDatafrm.FormGeneralDetails = sHtmlValue;

			}

			// reading User Acceptance
			var userAcceptanceCounter = 1;

			do {
				//SOC Writwick 11 July 2018
				oParam.Fieldname = "UA" + userAcceptanceCounter.toString();
				//EOC Writwick 11 July 2018
				callServices.fnGetDataMainTable(oParam, oDatafrm, "userAcceptanceString", this.oReadFormDataSuccess);

				if (this.oReadFormDataSuccess.userAcceptanceString) {
					if (oDatafrm.userAcceptanceString) {
						var sUserAcptCols = oDatafrm.userAcceptanceString.split("~");

						if (sUserAcptCols.length > 1) {
							var userAcceptanceData = {};
							globalUserAcceptanceArrayData = {};

							userAcceptanceData.Index = (userAcceptanceCounter - 1).toString();
							//SOC Writwick 11 July 2018
							userAcceptanceData.FieldName = oParam.Fieldname;
							//EOC Writwick 11 July 2018
							userAcceptanceData.step = sUserAcptCols[0];
							userAcceptanceData.testType = sUserAcptCols[1];
							userAcceptanceData.scenario = sUserAcptCols[2];
							userAcceptanceData.testData = sUserAcptCols[3];
							userAcceptanceData.stepsPer = sUserAcptCols[4];
							userAcceptanceData.actualResults = sUserAcptCols[5];
							userAcceptanceData.expectedResults = sUserAcptCols[6];

							globalUserAcceptanceArrayData.Index = userAcceptanceCounter - 1;
							//SOC Writwick 11 July 2018
							globalUserAcceptanceArrayData.FieldName = oParam.Fieldname;
							//EOC Writwick 11 July 2018
							globalUserAcceptanceArrayData.Step = sUserAcptCols[0];
							globalUserAcceptanceArrayData.TestType = sUserAcptCols[1];
							globalUserAcceptanceArrayData.Scenario = sUserAcptCols[2];
							globalUserAcceptanceArrayData.TestData = sUserAcptCols[3];
							globalUserAcceptanceArrayData.StepsPer = sUserAcptCols[4];
							globalUserAcceptanceArrayData.ActualResults = sUserAcptCols[5];
							globalUserAcceptanceArrayData.ExpectedResults = sUserAcptCols[6];
							globalUserAcceptanceArrayData.Existance = "E";

							oDatafrm.userAcceptance.push(userAcceptanceData);
							globalUserAcceptanceArray.push(globalUserAcceptanceArrayData);
						}
					}

					userAcceptanceCounter = userAcceptanceCounter + 1;
				} else {
					userAcceptanceCounter = -1;
				}
			} while (userAcceptanceCounter !== -1);
			// } while (userAcceptanceCounter < 2);

			if (oDatafrm.userAcceptance.length === 0) {
				oDatafrm.userAcceptance.push({
					Index: "0",
					FieldName: "",
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
				globalUserAcceptanceArrayData.FieldName = "";
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

			// reading Comm Log
			var commLogCounter = 1;

			do {
				//SOC Writwick 11 July 2018
				oParam.Fieldname = "CL" + commLogCounter.toString();
				//EOC Writwick 11 July 2018
				callServices.fnGetDataMainTable(oParam, oDatafrm, "commLogString", this.oReadFormDataSuccess);

				if (this.oReadFormDataSuccess.commLogString) {
					if (oDatafrm.commLogString) {
						var sCommLogCols = oDatafrm.commLogString.split("~");

						if (sCommLogCols && sCommLogCols.length >= 6) {
							var commLogData = {};
							globalCommLogArrayData = {};

							$.each(sCommLogCols, function(iIndex, sValue) {

								if (iIndex === 2 || iIndex === 4) {

									var dateTemp = new Date(sValue);
									if ((dateTemp == "Invalid Date") || (sValue === null)) {
										sCommLogCols[iIndex] = "";
									} else {
										//sCommLogCols[iIndex] = new Date(sValue);
										sCommLogCols[iIndex] = dateTemp.toJSON().substring(0, 10);
									}

									// if (sValue === "" || sValue === "undefined" || sValue === "Invalid Date" || sValue === "null") {
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

							// if (sCommLogCols[2] === "" || sCommLogCols[2] === "undefined") {
							// 	sCommLogCols[2] = null;
							// } else {
							// 	sCommLogCols[2] = new Date(sCommLogCols[2]);
							// }
							// if (sCommLogCols[4] === "" || sCommLogCols[4] === "undefined") {
							// 	sCommLogCols[4] = null;
							// } else {
							// 	sCommLogCols[4] = new Date(sCommLogCols[4]);
							// }

							commLogData.Index = (commLogCounter - 1).toString();
							commLogData.FieldName = oParam.Fieldname;
							commLogData.IssueDesc = sCommLogCols[0];
							commLogData.Priority = sCommLogCols[1];
							commLogData.DateLogg = sCommLogCols[2];
							commLogData.Status = sCommLogCols[3];
							commLogData.DateResol = sCommLogCols[4];
							commLogData.Resolv = sCommLogCols[5];
							commLogData.AssignedTo = sCommLogCols[6];

							globalCommLogArrayData.Index = commLogCounter - 1;
							globalCommLogArrayData.FieldName = oParam.Fieldname;
							globalCommLogArrayData.IssueDesc = sCommLogCols[0];
							globalCommLogArrayData.Priority = sCommLogCols[1];
							globalCommLogArrayData.DateLogg = sCommLogCols[2];
							globalCommLogArrayData.Status = sCommLogCols[3];
							globalCommLogArrayData.DateResol = sCommLogCols[4];
							globalCommLogArrayData.Resolv = sCommLogCols[5];
							globalCommLogArrayData.AssignedTo = sCommLogCols[6];
							globalCommLogArrayData.Existance = "E";

							oDatafrm.commLog.push(commLogData);
							globalCommLogArray.push(globalCommLogArrayData);
						}
					}

					commLogCounter = commLogCounter + 1;
				} else {
					commLogCounter = -1;
				}
			} while (commLogCounter !== -1);
			// } while (commLogCounter < 2);

			if (oDatafrm.commLog.length === 0) {
				oDatafrm.commLog.push({
					Index: "0",
					FieldName: "",
					IssueDesc: "",
					Priority: "",
					DateLogg: "",
					Status: "",
					DateResol: "",
					Resolv: "",
					AssignedTo: "",
					flag: false
				});

				globalCommLogArrayData = {};

				globalCommLogArrayData.Index = 0;
				globalCommLogArrayData.FieldName = "";
				globalCommLogArrayData.IssueDesc = "";
				globalCommLogArrayData.Priority = "";
				globalCommLogArrayData.DateLogg = "";
				globalCommLogArrayData.Status = "";
				globalCommLogArrayData.DateResol = "";
				globalCommLogArrayData.Resolv = "";
				globalCommLogArrayData.AssignedTo = "";
				globalCommLogArrayData.Existance = "N";

				globalCommLogArray.push(globalCommLogArrayData);
			}

			//oModelUA.setData(oUserAcceptance);
			oModelForm.setData(oDatafrm);

			/*this.readFormAttachments({
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: oParam.stepno,
				FIELDNAME: "FrmReq",
				TYPE: "O"
			});

			this.readFormMappingAttachments({
				REPID: oParam.repid,
				PROJECTKEY: oParam.projectkey,
				PROCESSID: oParam.processid,
				STEPNO: oParam.stepno,
				FIELDNAME: "FrmMapReq",
				TYPE: "O"
			});*/

			var oReadAttachParam = {
				REPID: oParam.repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.Processid,
				STEPNO: oParam.Stepno,
				FIELDNAME: "FrmReq",
				TYPE: "O"
			};
			callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("FrmData"), "attachFrmPrintReq",
				"attachFrmPrintReqVisible");

			oReadAttachParam.FIELDNAME = "FrmMapReq";
			callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("FrmData"), "attachFrmMappingSheetReq",
				"attachFrmMappingSheetReqVisible");

			oParam.Fieldname = "FormType";
			callServices.fnGetDataMainTable(oParam, FrmData, "FormType", this.oReadFormDataSuccess);
			var sFormTyp = FrmData.FormType.split("~");
			for (var iFormTyp = 0; iFormTyp < sFormTyp.length; iFormTyp++) {
				switch (sFormTyp[iFormTyp]) {
					case "Standard SAP)":
						that.byId("R1").setSelected(true);
						break;
					case "Custom":
						that.byId("R2").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "OutputMethods";
			callServices.fnGetDataMainTable(oParam, FrmData, "OutputMethods", this.oReadFormDataSuccess);
			var sOpMethods = FrmData.OutputMethods.split("~");
			for (var iopmethods = 0; iopmethods < sOpMethods.length; iopmethods++) {
				switch (sOpMethods[iopmethods]) {
					case "Print":
						that.byId("Printc").setSelected(true);
						break;
					case "Fax":
						that.byId("Faxc").setSelected(true);
						break;
					case "Email":
						that.byId("Emailc").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "PaperSize";
			callServices.fnGetDataMainTable(oParam, FrmData, "PaperSize", this.oReadFormDataSuccess);
			var spprSize = FrmData.PaperSize.split("~");
			for (var ipprSize = 0; ipprSize < spprSize.length; ipprSize++) {
				switch (spprSize[ipprSize]) {
					case "A4(8.7 X 11.69)":
						that.byId("cb1").setSelected(true);
						break;
					case "Letter (8.5 X 11)":
						that.byId("cb2").setSelected(true);
						break;
					case "Legal (8.5 X 14)":
						that.byId("cb3").setSelected(true);
						break;
					case "Others":
						that.byId("cb4").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "EmailID";
			callServices.fnGetDataMainTable(oParam, FrmData, "EmailID", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "FaxNumber";
			callServices.fnGetDataMainTable(oParam, FrmData, "FaxNumber", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "PageOrientation";
			callServices.fnGetDataMainTable(oParam, FrmData, "PageOrientation", this.oReadFormDataSuccess);
			var spprOrint = FrmData.PageOrientation.split("~");
			for (var ipprOrint = 0; ipprOrint < spprOrint.length; ipprOrint++) {
				switch (spprOrint[ipprOrint]) {
					case "Portrait":
						that.byId("Portrait").setSelected(true);
						break;
					case "Landscape":
						that.byId("Landscape").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "SpecialPrintingRequirements";
			callServices.fnGetDataMainTable(oParam, FrmData, "Special", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "PrePrintedStationary";
			callServices.fnGetDataMainTable(oParam, FrmData, "Preprintedstationary", this.oReadFormDataSuccess);
			var sprePrint = FrmData.Preprintedstationary.split("~");
			for (var iprePrint = 0; iprePrint < sprePrint.length; iprePrint++) {
				switch (sprePrint[iprePrint]) {
					case "Yes":
						that.byId("cb5").setSelected(true);
						break;
					case "No":
						that.byId("cb6").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "MultiplePageFormats";
			callServices.fnGetDataMainTable(oParam, FrmData, "Multiplepageformats", this.oReadFormDataSuccess);
			var sMultipage = FrmData.Multiplepageformats.split("~");
			for (var iMultiPage = 0; iMultiPage < sMultipage.length; iMultiPage++) {
				switch (sMultipage[iMultiPage]) {
					case "Yes":
						that.byId("cb7").setSelected(true);
						break;
					case "No":
						that.byId("cb8").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "WatermarkRequired";
			callServices.fnGetDataMainTable(oParam, FrmData, "WatermarkRequired", this.oReadFormDataSuccess);
			var sWaterMarkreq = FrmData.WatermarkRequired.split("~");
			for (var iWaterMarkreq = 0; iWaterMarkreq < sWaterMarkreq.length; iWaterMarkreq++) {
				switch (sWaterMarkreq[iWaterMarkreq]) {
					case "Yes":
						that.byId("cb9").setSelected(true);
						break;
					case "No":
						that.byId("cb10").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "CompanyLogoRequired";
			callServices.fnGetDataMainTable(oParam, FrmData, "CompanyLogoRequired", this.oReadFormDataSuccess);
			var sCompanyLogoreq = FrmData.CompanyLogoRequired.split("~");
			for (var iCompanyLogoreq = 0; iCompanyLogoreq < sCompanyLogoreq.length; iCompanyLogoreq++) {
				switch (sCompanyLogoreq[iCompanyLogoreq]) {
					case "Yes":
						that.byId("cb11").setSelected(true);
						break;
					case "No":
						that.byId("cb12").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "PositionOfTheLogo";
			callServices.fnGetDataMainTable(oParam, FrmData, "PositionoftheLOGO", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "PrinterTrays";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrinterTrays", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "NumberOfCopies";
			callServices.fnGetDataMainTable(oParam, FrmData, "Numberofcopies", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "PrinterType";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrinterType", this.oReadFormDataSuccess);
			var sPrinterType = FrmData.PrinterType.split("~");
			for (var iPrinterType = 0; iPrinterType < sPrinterType.length; iPrinterType++) {
				switch (sPrinterType[iPrinterType]) {
					case "Thermal Printer":
						that.byId("Thermal").setSelected(true);
						break;
					case "Laser Printer":
						that.byId("Laser").setSelected(true);
						break;
					case "Zebra Printer":
						that.byId("Zebra").setSelected(true);
						break;
					case "Others":
						that.byId("Others").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "RotationRequirementsPrintingLabelsOnZebraPrinter";
			callServices.fnGetDataMainTable(oParam, FrmData, "Rotation", this.oReadFormDataSuccess);
			var sRotation = FrmData.Rotation.split("~");
			for (var iRotation = 0; iRotation < sRotation.length; iRotation++) {
				switch (sRotation[iRotation]) {
					case "Yes":
						that.byId("cb13").setSelected(true);
						break;
					case "No":
						that.byId("cb14").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "PrinterAccessibility";
			callServices.fnGetDataMainTable(oParam, FrmData, "Printeraccessibility", this.oReadFormDataSuccess);
			var sPrinteraccessibility = FrmData.Printeraccessibility.split("~");
			for (var iPrinteraccessibility = 0; iPrinteraccessibility < sPrinteraccessibility.length; iPrinteraccessibility++) {
				switch (sPrinteraccessibility[iPrinteraccessibility]) {
					case "Network":
						that.byId("cb15").setSelected(true);
						break;
					case "Local":
						that.byId("cb16").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "PrinterModelIdentified";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrinterModelIdentified", this.oReadFormDataSuccess);
			var sPrinterModIdent = FrmData.PrinterModelIdentified.split("~");
			for (var iPrinterModIdent = 0; iPrinterModIdent < sPrinterModIdent.length; iPrinterModIdent++) {
				switch (sPrinterModIdent[iPrinterModIdent]) {
					case "HP":
						that.byId("HP").setSelected(true);
						break;
					case "Xerox":
						that.byId("Xerox").setSelected(true);
						break;
					case "Lexmark":
						that.byId("Lexmark").setSelected(true);
						break;
					case "Others":
						that.byId("Other").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "AnyRelatedPrinterSpecificCutOverStepsIdentified";
			callServices.fnGetDataMainTable(oParam, FrmData, "AnyRelated", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "IsThePrinterRequiredToBeMappedInSAPInCaseYesPrinterSAPDeviceTypeIdentified";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrinterRequired", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "PrintLanguages";
			callServices.fnGetDataMainTable(oParam, FrmData, "PrintLanguages", this.oReadFormDataSuccess);
			var sPrintLang = FrmData.PrintLanguages.split("~");
			for (var iPrintLang = 0; iPrintLang < sPrintLang.length; iPrintLang++) {
				switch (sPrintLang[iPrintLang]) {
					case "English":
						that.byId("English").setSelected(true);
						break;
					case "Spanish":
						that.byId("Spanish").setSelected(true);
						break;
					case "Simple Chinese":
						that.byId("Chinese").setSelected(true);
						break;
					case "Dutch":
						that.byId("Dutch").setSelected(true);
						break;
					case "Mandarin":
						that.byId("Mandarin").setSelected(true);
						break;
					case "Portuguese":
						that.byId("Portuguese").setSelected(true);
						break;
					case "German":
						that.byId("German").setSelected(true);
						break;
					case "Others":
						that.byId("Oth").setSelected(true);
						break;
				}
			}

			oParam.Fieldname = "FontSize";
			callServices.fnGetDataMainTable(oParam, FrmData, "FontSize", this.oReadFormDataSuccess);
			that.setModel2(FrmData);
			oParam.Fieldname = "FormMapping";
			callServices.fnGetDataMainTable(oParam, FrmData, "FormMapping", this.oReadFormDataSuccess);
			that.setModel2(FrmData);
			oParam.Fieldname = "BarcodeType";
			callServices.fnGetDataMainTable(oParam, FrmData, "BarcodeType", this.oReadFormDataSuccess);
			that.setModel2(FrmData);

			oParam.Fieldname = "BarcodeAlignment";
			callServices.fnGetDataMainTable(oParam, FrmData, "BarcodeAlignment", this.oReadFormDataSuccess);
			var sBarcodeAlign = FrmData.BarcodeAlignment.split("~");
			for (var iBarcodeAlign = 0; iBarcodeAlign < sBarcodeAlign.length; iBarcodeAlign++) {
				switch (sBarcodeAlign[iBarcodeAlign]) {
					case "Normal":
						that.byId("Normal").setSelected(true);
						break;
					case "Rotated":
						that.byId("Rotated").setSelected(true);
						break;
					case "Inverted":
						that.byId("Inverted").setSelected(true);
						break;
					case "Bottom up":
						that.byId("Bottom").setSelected(true);
						break;
				}
			}
			//commeted by utkarsh
			/*	var oCurrentView = this.getView();

				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				oCurrentView.byId("oBTPrint").setVisible(true);

				oCurrentView.byId("oBTSave").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTApprove").setEnabled(true);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(true);
				oCurrentView.byId("oBTPrint").setEnabled(true);

				if (oDatafrm.Status_FS === 'SAVED') {

					//var oCurrentView = this.getView();
					//oCurrentView.byId("oBTSave").setVisible(true);
					//oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTApprove").setVisible(false);
					oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					//oCurrentView.byId("oBTPrint").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDatafrm.Status_FS === 'SUBMITTED') {

					//var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					//oCurrentView.byId("oBTApprove").setVisible(true);
					oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					//oCurrentView.byId("oBTPrint").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDatafrm.Status_FS === 'APPROVED') {

					//var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					oCurrentView.byId("oBTApprove").setEnabled(false);
					//oCurrentView.byId("oBTAcceptApproval").setVisible(true);
					//oCurrentView.byId("oBTPrint").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDatafrm.Status_FS === 'ACCEPTED') {

					//var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setVisible(false);
					oCurrentView.byId("oBTApprove").setEnabled(false);
					oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
					//oCurrentView.byId("oBTPrint").setVisible(true);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();

				} else {

					//var oCurrentView = this.getView();
					//oCurrentView.byId("oBTSave").setVisible(true);
					//oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTApprove").setVisible(false);
					oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					oCurrentView.byId("oBTPrint").setVisible(false);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				}*/
			sap.ui.core.BusyIndicator.hide();
		},

		setModel2: function(FrmData) {
			this.getView().getModel("FrmData").setData(FrmData);
			this.getView().getModel("FrmData").refresh();
		},

		setModel: function(enhData) {
			this.getView().getModel("enhData").setData(enhData);
			this.getView().getModel("enhData").refresh();
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
			if (str.length === 500) {
				this.byId("fsObjDetErr").setVisible(true);
			} else {
				this.byId("fsObjDetErr").setVisible(false);
			}
		},
		onLiveChangeDesignDetails: function() {
			var str = this.byId("objectDesigndetails").getValue();
			this.byId("fsDesigndetailsCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsDesigndetailsErr").setVisible(true);
			} else {
				this.byId("fsDesigndetailsErr").setVisible(false);
			}
		},
		onLiveChangeDetailsProcessDescription: function() {
			var str = this.byId("workflowDetailsProcessDesc").getValue();
			this.byId("fsWorkflowDetailsCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsWorkflowDetailsErr").setVisible(true);
			} else {
				this.byId("fsWorkflowDetailsErr").setVisible(false);
			}
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
		/*		onLiveChangeSecurity: function() {
					var str = this.byId("security").getValue();
					this.byId("fsSecurityCharCount").setText("Characters: " + str.length);
					if (str.length === 500) {
						this.byId("fsSecurityErr").setVisible(true);
					} else {
						this.byId("fsSecurityErr").setVisible(false);
					}
				},*/
		onLiveChangeAlertNotif: function() {
			var str = this.byId("alertNotif").getValue();
			this.byId("fsAlertNotifCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsAlertNotifErr").setVisible(true);
			} else {
				this.byId("fsAlertNotifErr").setVisible(false);
			}
		},
		onLiveChangeAssumpComment: function() {
			var str = this.byId("WfAssumptionCm").getValue();
			this.byId("fsAssumpCommentCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsAssumpCommentErr").setVisible(true);
			} else {
				this.byId("fsAssumpCommentErr").setVisible(false);
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

		onHold: function() {
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oDataWorkflow = this.getView().getModel("enhData").getData();

			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var oParam = "";
			try {
				oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

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
				oParam.Fieldvalue = "ON HOLD";

				if (oParam.Projectkey === "ENH") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

				} else if (oParam.Projectkey === "WFLW") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.STATUS_FS);

				} else if (oParam.Projectkey === "FRM") {
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);

				}
			} catch (exception) {
				return;
			}
		this.getView().byId("oBTHold").setEnabled(false);
	//		this.getView().byId("oBTHold").setVisible(false);
		},

		/*		onLiveChangeTechAssumptions: function() {
					var str = this.byId("enhReq").getValue();
					this.byId("enhReqHandlCharCount").setText("Characters: " + str.length);
					if (str.length === 500) {
						this.byId("enhReqHandlErr").setVisible(true);
					} else {
						this.byId("enhReqHandlErr").setVisible(false);
					}
				},*/
		// onLiveChangedependencies: function() {
		// 	var str = this.byId("dependencies").getValue();
		// 	this.byId("dependenciesHandlCharCount").setText("Characters: " + str.length);
		// 	if (str.length === 500) {
		// 		this.byId("dependenciesHandlErr").setVisible(true);
		// 	} else {
		// 		this.byId("dependenciesHandlErr").setVisible(false);
		// 	}
		// },
		onLiveChangeErrHandl: function() {
			var str = this.byId("errHanlFld").getValue();
			this.byId("fsErrHandlCharCount").setText("Characters: " + str.length);
			if (str.length === 500) {
				this.byId("fsErrHandlErr").setVisible(true);
			} else {
				this.byId("fsErrHandlErr").setVisible(false);
			}
		},
		onPrint: function() {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			var projectID = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			if (oParam && oParam.Projectkey) {
				var mParameter = "&Version=" + versionno[1] + "&Repid=" + oParam.Repid + "&Projectkey=" + oParam.Projectkey + "&Processid=" +
					oParam.Processid + "&Stepno=" +
					oParam.Stepno + "&projectid=" + projectID;

				if (oParam.Projectkey === "ENH") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Enhancement_FS.html?sap-language=EN" + mParameter,
						true);
				} else if (oParam.Projectkey === "WFLW") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Workflow_FS.html?sap-language=EN" + mParameter,
						true);
				} else if (oParam.Projectkey === "FRM") {
					sap.m.URLHelper.redirect(
						"/sap/bc/ui5_ui5/sap/ZAUTO_HTML_OT/Form_FS.html?sap-language=EN" + mParameter,
						true);
				}
			}
		},
		onSelectTriggerPoint: function(oEvent) {
			if (oEvent.getSource().getSelected() === true) {
				this.byId("manualTrigPt").setVisible(true);
			} else {
				this.byId("manualTrigPt").setVisible(false);
			}

		},
		onSelectTriggerPoint1: function(oEvent) {
			if (oEvent.getSource().getSelected() === true) {
				this.byId("StanardTrigText").setVisible(true);
			} else {
				this.byId("StanardTrigText").setVisible(false);
			}

		},
		onSelectTriggerPoint2: function(oEvent) {
			if (oEvent.getSource().getSelected() === true) {
				this.byId("CustomTrigText").setVisible(true);
			} else {
				this.byId("CustomTrigText").setVisible(false);
			}

		},
		onSelectTriggerPointO: function(oEvent) {
			if (oEvent.getSource().getSelected() === true) {
				this.byId("OtherTrigPt").setVisible(true);
			} else {
				this.byId("OtherTrigPt").setVisible(false);
			}

		},
		onSelectUIAccess: function(oEvent) {
			if (oEvent.getSource().getId() === this.getView().byId("UITypeBtn5").getId()) {
				this.byId("otherUIPts").setVisible(true);
			} else {
				this.byId("otherUIPts").setVisible(false);
			}
		},

		formatAmount: function(value) {
			try {
				return parseInt(value);
			} catch (ex) {
				//
			}
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

		openSampleSheet: function() {

			window.open(
				"/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='CNV',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='conversionUploadData',PROJECTID='',OBJECT_ID='CNV_SAM_2')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");
		},
		openSampleSheet1: function() {

			window.open(
				"/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='GENERIC',PROJECTKEY='CNV',PROCESSID='GENERIC',STEPNO='GENERIC',FIELDNAME='conversionUploadBusinessReq',PROJECTID='',OBJECT_ID='CNV_SAM_1')/$value",
				"_blank", "resizable, location, menubar, toolbar=no, scrollbars=yes, status");

		},
		getDataforARA: function(object) {
			var mServiceUrl = "/sap/opu/odata/sap/ZAUTOMATION_SRV";
			this.oModel = new sap.ui.model.odata.ODataModel(mServiceUrl);
			var that = this;
			var author, reviewer, approver;
			var projectid = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
			var repid = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Repid;
			var sPath = "/NEW_OBJECTSet?$filter=Projectid eq '" + projectid + "' and Ricefid eq '" + repid + "'";
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

			if (object === "WFLW") {
				var oDataWorkflow = this.oDataWorkflow;
				try {
					var SAPId = sap.ushell.Container.getUser().getId();
				} catch (ex) {
					//
				}
				if (reviewer !== "" || approver !== "") {
					this.getView().byId("reviewCommentFDS_I").setEnabled(true);
					this.getView().byId("reviewCommentFDS_R").setEnabled(true);
					this.getView().byId("reviewCommentAR_I").setEnabled(true);
					this.getView().byId("reviewCommentAR_R").setEnabled(true);
					this.getView().byId("reviewCommentSR_I").setEnabled(true);
					this.getView().byId("reviewCommentSR_R").setEnabled(true);
					this.getView().byId("reviewCommentAC_I").setEnabled(true);
					this.getView().byId("reviewCommentAC_R").setEnabled(true);
					this.getView().byId("reviewCommentAN_I").setEnabled(true);
					this.getView().byId("reviewCommentAN_R").setEnabled(true);
					this.getView().byId("reviewCommentEH_I").setEnabled(true);
					this.getView().byId("reviewCommentEH_R").setEnabled(true);
				} else {
					this.getView().byId("reviewCommentFDS_I").setEnabled(false);
					this.getView().byId("reviewCommentFDS_R").setEnabled(false);
					this.getView().byId("reviewCommentAR_I").setEnabled(false);
					this.getView().byId("reviewCommentAR_R").setEnabled(false);
					this.getView().byId("reviewCommentSR_I").setEnabled(false);
					this.getView().byId("reviewCommentSR_R").setEnabled(false);
					this.getView().byId("reviewCommentAC_I").setEnabled(false);
					this.getView().byId("reviewCommentAC_R").setEnabled(false);
					this.getView().byId("reviewCommentAN_I").setEnabled(false);
					this.getView().byId("reviewCommentAN_R").setEnabled(false);
					this.getView().byId("reviewCommentEH_I").setEnabled(false);
					this.getView().byId("reviewCommentEH_R").setEnabled(false);
				}
			} else if (object === "FORM") {
				try {
					var SAPId = sap.ushell.Container.getUser().getId();
				} catch (ex) {
					//

				}
				if (reviewer !== "" || approver !== "") {
					this.getView().byId("FormGeneralDetailsBox_I").setEnabled(true);
					this.getView().byId("FormGeneralDetailsBox_R").setEnabled(true);
					this.getView().byId("FormMappingBox_I").setEnabled(true);
					this.getView().byId("FormMappingBox_R").setEnabled(true);
					this.getView().byId("PrintingReqBox_I").setEnabled(true);
					this.getView().byId("PrintingReqBox_R").setEnabled(true);
					this.getView().byId("BarcodeReqBox_I").setEnabled(true);
					this.getView().byId("BarcodeReqBox_R").setEnabled(true);

				} else {
					this.getView().byId("FormGeneralDetailsBox_I").setEnabled(false);
					this.getView().byId("FormGeneralDetailsBox_R").setEnabled(false);
					this.getView().byId("FormMappingBox_I").setEnabled(false);
					this.getView().byId("FormMappingBox_R").setEnabled(false);
					this.getView().byId("PrintingReqBox_I").setEnabled(false);
					this.getView().byId("PrintingReqBox_R").setEnabled(false);
					this.getView().byId("BarcodeReqBox_I").setEnabled(false);
					this.getView().byId("BarcodeReqBox_R").setEnabled(false);
				}

			} else if (object === "ENH") {
				var data;
				if (reviewer !== "" || approver !== "") {
					this.getView().byId("reviewCommentIMP_I").setEnabled(true);
					this.getView().byId("reviewCommentIMP_R").setEnabled(true);
					this.getView().byId("input15").setEnabled(true);
					this.getView().byId("ri18").setEnabled(true);
				} else {
					this.getView().byId("reviewCommentIMP_I").setEnabled(false);
					this.getView().byId("reviewCommentIMP_R").setEnabled(false);
					this.getView().byId("input15").setEnabled(false);
					this.getView().byId("ri18").setEnabled(false);

				}

			}

		},

		getStatusWFReview: function(flag) {

			this.getView().byId("reviewCommentFDS_I").setEnabled(flag);
			this.getView().byId("reviewCommentFDS_R").setEnabled(flag);
			this.getView().byId("reviewCommentAR_I").setEnabled(flag);
			this.getView().byId("reviewCommentAR_R").setEnabled(flag);
			this.getView().byId("reviewCommentSR_I").setEnabled(flag);
			this.getView().byId("reviewCommentSR_R").setEnabled(flag);
			this.getView().byId("reviewCommentAC_I").setEnabled(flag);
			this.getView().byId("reviewCommentAC_R").setEnabled(flag);
			this.getView().byId("reviewCommentAN_I").setEnabled(flag);
			this.getView().byId("reviewCommentAN_R").setEnabled(flag);
			this.getView().byId("reviewCommentEH_I").setEnabled(flag);
			this.getView().byId("reviewCommentEH_R").setEnabled(flag);

		},

		getStatusFormReview: function(flag) {

			this.getView().byId("FormGeneralDetailsBox_I").setEnabled(flag);
			this.getView().byId("FormGeneralDetailsBox_R").setEnabled(flag);
			this.getView().byId("FormMappingBox_I").setEnabled(flag);
			this.getView().byId("FormMappingBox_R").setEnabled(flag);
			this.getView().byId("PrintingReqBox_I").setEnabled(flag);
			this.getView().byId("PrintingReqBox_R").setEnabled(flag);
			this.getView().byId("BarcodeReqBox_I").setEnabled(flag);
			this.getView().byId("BarcodeReqBox_R").setEnabled(flag);

		},
		getStatusEnhReview: function(flag) {
			this.byId("reviewComment5").setVisible(flag);
			this.byId("reviewComment6").setVisible(flag);
			this.byId("reviewCommentIMP").setVisible(flag);
			this.getView().byId("reviewCommentIMP_I").setEnabled(flag);
			this.getView().byId("reviewCommentIMP_R").setEnabled(flag);
			this.getView().byId("input14").setEnabled(flag);
			this.getView().byId("ri17").setEnabled(flag);
			this.getView().byId("input15").setEnabled(flag);
			this.getView().byId("ri18").setEnabled(flag);
		},

		getReviewDataWFLW: function(flag) {
			this.getView().byId("reviewCommentFDS").setVisible(flag);
			this.getView().byId("reviewCommentAR").setVisible(flag);
			this.getView().byId("reviewCommentSR").setVisible(flag);
			this.getView().byId("reviewCommentAC").setVisible(flag);
			this.getView().byId("reviewCommentAN").setVisible(flag);
			this.getView().byId("reviewCommentEH").setVisible(flag);

		},
		getReviewDataFORM: function(flag) {

			this.getView().byId("FormGeneralDetailsBox").setVisible(flag);
			this.getView().byId("FormMappingBox").setVisible(flag);
			this.getView().byId("PrintingReqBox").setVisible(flag);
			this.getView().byId("BarcodeReqBox").setVisible(flag);

		},

		getDataForWorkflow: function(sRequestType, Version) {
			var key = "WFLW";
			this.getDataforARA(key);
			var oModelWorkflow = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelWorkflow, "enhData");

			var oModelUA = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelUA, "reportData");

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (!oParam) {
				return;
			}

			var oDataWorkflow = {
				HeaderTitle: "",
				Approver: "",
				Reviewer: "",
				Author: "",
				ObjectId: oParam.Repid,
				ObjectTitle: oParam.Repid,
				ObjectDescrp: "",
				StanTransactText: "",
				CustmTransactText: "",
				MannulTransactText: "",
				TrigptOtherText: "",
				EndPoint: "",
				UserInterface: "",
				Dependencies: "",
				ImpactedSystems: "",
				ConversionType: "",
				ProcessArea: "",
				Complexity: "",
				TriggerPoint: "",
				objectDetails: "",
				objectDesigndetails: "",
				objectworkflowDetailsProcessDesc: "",
				approvalRoles: "",
				dependencyAssumptions: "",
				specialRequirements: "",
				SpecialReqText: "",
				StoryNumberFComment: "",
				alertNotif: "",
				AssumptionComment: "",
				errorHandling: "",
				selectionScreenVal: "",
				security: "",
				securityComments: "",
				securityReviewComments: "",
				Rating: parseInt(""),
				WFReviewComments: "",
				WFRatings: parseInt(""),
				userAccept1: "",
				userAccept2: "",
				userAcceptance: [],
				userAcceptTemp: "",
				CommLogTemp: "",
				CommLog: [],
				attachEnhReq: [],
				attachEnhReqVisible: false,
				attachWfObjectDetails: [],
				attachWfObjectDetailsVisible: false,
				STATUS_FS: "",
				FDSComments: "",
				FDSReview: "",
				ARComments: "",
				ARReview: "",
				SRComments: "",
				SRReview: "",
				ACComments: "",
				ACReview: "",
				ANComments: "",
				ANReview: "",
				ErrorHandlingCommentsEH: "",
				ErrorHandlingReview: ""

			};

			this.oReadWflDataSuccess = {
				Approver: false,
				Reviewer: false,
				Author: false,
				ObjectId: false,
				ObjectDescrp: false,
				ImpactedSystems: false,
				ConversionType: false,
				Dependencies: false,
				StanTransactText: false,
				CustmTransactText: false,
				MannulTransactText: false,
				TrigptOtherText: false,
				EndPoint: false,
				UserInterface: false,
				ProcessArea: false,
				Complexity: false,
				TriggerPoint: false,
				objectDetails: false,
				objectDesigndetails: false,
				objectworkflowDetailsProcessDesc: false,
				approvalRoles: false,
				dependencyAssumptions: false,
				specialRequirements: false,
				SpecialReqText: false,
				StoryNumberFComment: false,
				alertNotif: false,
				AssumptionComment: false,
				errorHandling: false,
				selectionScreenVal: "",
				security: false,
				securityComments: false,
				securityReviewComments: false,
				Rating: false,
				WFReviewComments: false,
				WFRatings: false,
				userAcceptance: false,
				userAcceptTemp: false,
				CommLog: false,
				CommLogTemp: false,
				STATUS_FS: false,
				FDSComments: false,
				FDSReview: false,
				ARComments: false,
				ARReview: false,
				SRComments: false,
				SRReview: false,
				ACComments: false,
				ACReview: false,
				ANComments: false,
				ANReview: false,
				ErrorHandlingCommentsEH: false,
				ErrorHandlingReview: false

			};

			// var oUserAcceptance = {
			//  userAcceptance: []
			// };
			// oUserAcceptance.userAcceptance[0] = {};
			// oUserAcceptance.userAcceptance[1] = {};
			this.byId("processarea").setSelectedKeys([]);
			if (Version) {
				oParam.Version = Version;
			}
			// else {
			// 	oParam.fieldname = "Status_FS";
			// 	callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_FS", this.oReadWflDataSuccess);
			// 	var counter = oDataWorkflow.Status_FS;
			// 	while (counter === "ACCEPTED" && this.oReadWflDataSuccess.Status_FS === true) {
			// 		oParam.version_id = parseInt(oParam.version_id) + 1;
			// 		oParam.version_id = (oParam.version_id).toString() + ".0";
			// 		oParam.fieldname = "Status_FS";
			// 		callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_FS", this.oReadWflDataSuccess);
			// 		counter = oDataWorkflow.Status_FS;
			// 	}
			// 	var selectedKey = "Version " + oParam.version_id;
			// 	this.byId('versiontypeExisting').setSelectedKey(selectedKey);
			// 	oParam.fieldname = "Status_FS";
			// 	callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Status_FS", this.oReadWflDataSuccess);
			// 	if (this.oReadWflDataSuccess.Status_FS === false) {

			// 		oParam.version_id = parseInt(oParam.version_id) - 1;
			// 		oParam.version_id = (oParam.version_id).toString() + ".0";
			// 	}

			// }
			if (sRequestType === 'N') {
				this.byId("UITypeBtn1").setSelected(true);
				this.byId("oBTSave").setVisible(true);
				this.byId("oBTSubmit").setVisible(true); // NEw change
				this.byId("oBTApprove").setVisible(false); // NEw change
				this.byId("oBTPrint").setVisible(false);

				// this.byId("triggerPntBtn1").setSelected(true);
				this.byId("DependencyConfiguration").setSelected(true);
				this.byId("CB_SPREQ_01").setSelected(false);
				this.byId("CB_SPREQ_02").setSelected(false);
				this.byId("CB_SPREQ_03").setSelected(false);
				this.byId("CB_SPREQ_04").setSelected(false);
				this.byId("CB_SPREQ_05").setSelected(false);
				this.byId("CB_SPREQ_06").setSelected(false);
				this.byId("CB_SPREQ_07").setSelected(false);

				this.byId("triggerPntBtn1").setSelected(false);
				this.byId("triggerPntBtn2").setSelected(false);
				this.byId("triggerPntBtn3").setSelected(false);
				this.byId("triggerPntBtn4").setSelected(false);
				this.byId("DependencyConfiguration").setSelected(false);
				this.byId("DependencyDevelopment").setSelected(false);
				this.byId("DependencyExecution").setSelected(false);
				this.byId("CB2-01").setSelected(false);
				this.byId("CB2-02").setSelected(false);
				this.byId("CB2-03").setSelected(false);
				// this.byId("CB_SCV").setSelected(false);
				this.byId("CB_SCV").setVisible(false);
				this.byId("formGenPanel").setVisible(false);

				var oDataWorkflow = {
					HeaderTitle: oParam.Repid,
					Approver: "",
					Reviewer: "",
					Author: "",
					ObjectId: oParam.Repid,
					ObjectTitle: oParam.Repid,
					ObjectDescrp: "",
					Dependencies: "",
					ImpactedSystems: "",
					ConversionType: "",
					StanTransactText: "",
					CustmTransactText: "",
					MannulTransactText: "",
					TrigptOtherText: "",
					EndPoint: "",
					UserInterface: "",
					ProcessArea: "",
					Complexity: "",
					TriggerPoint: "",
					objectDetails: "",
					objectDesigndetails: "",
					objectworkflowDetailsProcessDesc: "",
					approvalRoles: "",
					dependencyAssumptions: "",
					specialRequirements: "",
					SpecialReqText: "",
					alertNotif: "",
					AssumptionComment: "",
					errorHandling: "",
					selectionScreenVal: "",
					security: "",
					securityComments: "",
					securityReviewComments: "",
					Rating: parseInt(""),
					WFReviewComments: "",
					WFRatings: parseInt(""),
					userAccept1: "",
					userAccept2: "",
					STATUS_FS: "",
					FDSComments: "",
					FDSReview: "",
					ARComments: "",
					ARReview: "",
					SRComments: "",
					SRReview: "",
					ACComments: "",
					ACReview: "",
					ANComments: "",
					ANReview: "",
					ErrorHandlingCommentsEH: "",
					ErrorHandlingReview: "",
					userAcceptance: [{
						"actualResults": "",
						"expectedResults": "",
						"scenario": "",
						"testData": "",
						"step": "",
						"stepsPer": "",
						"testType": ""

					}],

					CommLog1: "",
					CommLog: []

				};
				oDataWorkflow.HeaderTitle = oParam.Repid + " - " + oDataWorkflow.ObjectDescrp;
				oModelWorkflow.setData(oDataWorkflow);
			}
			if (sRequestType === 'E') {
				var that = this;
				this.byId("formGenPanel").setVisible(false);
				this.byId("CB_SCV").setVisible(false);

				/////////version new changes

				/////
				if (!oParam) {
					return;
				}
				if (oParam) {
					if (oParam.projectid) {
						delete oParam.projectid;
					}
				}
				oParam.Version = "1.0";
				this.getView().byId("oBTPrint").setVisible(true);

				if (Version) {
					oParam.Version = Version;
					var crNumber1 = sessionStorage.getItem("crNumber");
					var crData = sessionStorage.getItem("crData");
					if (crNumber1 !== "") {
						// this.getView().byId("storynumber").setValue(crNumber1);
						oDataWorkflow.StoryNumberFComment = crNumber1;
					}
				} else {

					var num = 1;

					while (num > 0) {
						oParam.Fieldname = "STATUS_FS";
						callServices.fnGetDataMainTable(oParam, oDataWorkflow, "STATUS_FS", this.oReadWflDataSuccess);
						oDataWorkflow.versionLatest = oDataWorkflow.STATUS_FS;
						//SOC Writwick 16 July 2018
						// if (oDataWorkflow.versionLatest !== undefined) {
						if (oDataWorkflow.versionLatest !== "") {
							num = num + 1;
							oParam.Version = parseInt(oParam.Version) + 1;
							oParam.Version = (oParam.Version).toString() + ".0";

							var crNumber = sessionStorage.getItem("crNumber");

							if (oDataWorkflow.versionLatest === "ACCEPTED") {
								var selectedKey = "Version " + oParam.Version;
								var oSelect = this.getView().byId("versiontypeExisting");
								var newItem = new sap.ui.core.Item({
									key: selectedKey,
									text: selectedKey
								});
								oSelect.addItem(newItem);

							}

							// oDataWorkflow.versionLatest = undefined;
							// oDataWorkflow.STATUS_FS = undefined;
							oDataWorkflow.versionLatest = "";
							oDataWorkflow.STATUS_FS = "";
							
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
						//EOC Writwick 16 July 2018
					}
				}

				oParam.Fieldname = "STATUS_FS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "STATUS_FS", this.oReadWflDataSuccess);
				var statusLastVersion = oDataWorkflow.STATUS_FS;
				var statusLast = statusLastVersion;

			if (statusLastVersion === "ACCEPTED" && Version === undefined) {

					var crNumber = sessionStorage.getItem("crNumber");
					if (crNumber === "") {

					//	this.getView().byId("oBTHold").setVisible(true);
						// this.getView().byId("storynumber").setValue("");
						oDataWorkflow.StoryNumberFComment = "";
						oParam.Version = parseInt(oParam.Version);
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);

						var vItem = parseInt(oParam.Version);
						this.byId('versiontypeExisting').removeItem(vItem);

					} else {
						//	this.getView().byId("oBTHold").setVisible(false);
						this.CROpen = sessionStorage.getItem("crData");

						// this.getView().byId("storynumber").setValue(crNumber);
						oDataWorkflow.StoryNumberFComment = crNumber;
						oParam.Version = parseInt(oParam.Version) + 1;
						oParam.Version = (oParam.Version).toString() + ".0";
						var selectedKey = "Version " + oParam.Version;
						this.byId('versiontypeExisting').setSelectedKey(selectedKey);
						//	statusLast = undefined;
					}

				}
				//	var crNumber = sessionStorage.getItem("crNumber")

				/*	else if (statusLastVersion === "ON HOLD" && Version === undefined) {
						
					}*/

				statusLastVersion = undefined;
				oDataWorkflow.STATUS_FS = undefined;

				///////////////

				oDataWorkflow.STATUS_FS = "";
				oParam.Fieldname = "STATUS_FS";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "STATUS_FS", this.oReadWflDataSuccess);

				var crNumber = sessionStorage.getItem("crNumber");
				var oCurrentView = this.getView();
				if (oDataWorkflow.STATUS_FS === 'SAVED') {

					var oCurrentView = this.getView();
					/*	oCurrentView.byId("oBTSave").setEnabled(true);
						oCurrentView.byId("oBTSubmit").setVisible(true); //New Change
						//	oCurrentView.byId("oBTApprove").setVisible(false); //New Change
						//	oCurrentView.byId("oBTAcceptApproval").setVisible(false); //New Change
						oCurrentView.byId("oBTPrint").setVisible(true);*/
					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setVisible(true);
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.getView().byId("oBTHold").setEnabled(true);
					this.getReviewDataWFLW(false);
					this.getStatusWFReview(false);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDataWorkflow.STATUS_FS === 'ON HOLD') {
					oCurrentView.byId("oBTSave").setEnabled(true);
				//	oCurrentView.byId("oBTSubmit").setText("Accept");
					oCurrentView.byId("oBTSubmit").setEnabled(true);
					this.getView().byId("oBTHold").setEnabled(false);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
					//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					oCurrentView.byId("oBTPrint").setVisible(true);
				
				}
				//New Change
				else if (oDataWorkflow.STATUS_FS === 'SUBMITTED') {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Submit");
					this.getView().byId("oBTHold").setEnabled(true);
					//	oCurrentView.byId("oBTApprove").setVisible(true);
					//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.getReviewDataWFLW(true);
					this.getStatusWFReview(true);
					//	this.byId("reviewComment1").setVisible(false);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDataWorkflow.STATUS_FS === 'APPROVED') {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Approve");
					this.getView().byId("oBTHold").setEnabled(true);
					//		oCurrentView.byId("oBTApprove").setVisible(false);
					//		oCurrentView.byId("oBTAcceptApproval").setVisible(true);
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.getReviewDataWFLW(true);
					this.getStatusWFReview(true);
					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
					oCurrentView.byId("processflow2").updateModel();

				} else if (oDataWorkflow.STATUS_FS === 'ACCEPTED') {

					var oCurrentView = this.getView();
					oCurrentView.byId("oBTSave").setEnabled(false);
					oCurrentView.byId("oBTSubmit").setText("Accept");
					oCurrentView.byId("oBTSubmit").setEnabled(false);
					this.getView().byId("oBTHold").setEnabled(true);
					//	oCurrentView.byId("oBTApprove").setVisible(false);
					//	oCurrentView.byId("oBTAcceptApproval").setVisible(false);
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.getReviewDataWFLW(true);
					this.getStatusWFReview(false);

					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
					oCurrentView.byId("processflow2").updateModel();

				}

				//New Change End
				else {

					var oCurrentView = this.getView();

					// 		oCurrentView.byId("oBTSave").setVisible(true);
					// 		oCurrentView.byId("oBTSubmit").setVisible(true); //New Change
					// //		oCurrentView.byId("oBTApprove").setVisible(false); //New Change
					// //		oCurrentView.byId("oBTAcceptApproval").setVisible(false); //New Change
					// 		oCurrentView.byId("oBTPrint").setVisible(false);

					oCurrentView.byId("oBTSave").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setEnabled(true);
					oCurrentView.byId("oBTSubmit").setText("Submit");
					oCurrentView.byId("oBTPrint").setVisible(true);
					this.getView().byId("oBTHold").setEnabled(true);
					this.getReviewDataWFLW(false);
					this.getStatusWFReview(false);
					oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Neutral;
					oCurrentView.byId("processflow2").updateModel();

				}
				var procArea = callServices.fnGetProccessArea(oDataWorkflow);
				var availSys = callServices.fnGetAvailableSystems(oDataWorkflow);

				if (statusLast === "ACCEPTED" && (this.changeVersionKeyFlag === false) &&
				(sessionStorage.getItem("crNumber") !== undefined &&
						sessionStorage.getItem("crNumber") !== "")) {
					oParam.Version = parseInt(oParam.Version) - 1;
					oParam.Version = (oParam.Version).toString() + ".0";

				} 

				oParam.Fieldname = "Approver";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Approver", this.oReadWflDataSuccess);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Approver", this.oReadWflDataSuccess);

				oParam.Fieldname = "Reviewer";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Reviewer", this.oReadWflDataSuccess);

				oParam.Fieldname = "Author";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Author", this.oReadWflDataSuccess);
				// oParam.fieldname = "Object ID";
				// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ObjectId", this.oReadWflDataSuccess);

				oParam.Fieldname = "Object Description";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ObjectDescrp", this.oReadWflDataSuccess);

				// oDataWorkflow.HeaderTitle = oDataWorkflow.ObjectId + " - " + oDataWorkflow.ObjectDescrp;
				oDataWorkflow.HeaderTitle = oParam.Repid + " - " + oDataWorkflow.ObjectDescrp;

				if (oDataWorkflow.StoryNumberFComment === "") {
					oParam.Fieldname = "Story Number Comment";
					callServices.fnGetDataMainTable(oParam, oDataWorkflow, "StoryNumberFComment", this.oReadWflDataSuccess);
				}

				////Added by Utkarsh

				oParam.Fieldname = "Conversion Type";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ConversionType", this.oReadWflDataSuccess);
				if (oDataWorkflow.ConversionType) {
					var sOpMethods2 = oDataWorkflow.ConversionType.split("~");
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

				oParam.Fieldname = "Dependencies";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Dependencies", this.oReadWflDataSuccess);
				if (oDataWorkflow.Dependencies) {
					var sOpMethods2 = oDataWorkflow.Dependencies.split("~");
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

				oParam.Fieldname = "Conversion mapping and rules";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Conversionmappingrules", this.oReadWflDataSuccess);

				oParam.Fieldname = "Selection Screen";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SelectionScreen", this.oReadWflDataSuccess);

				oParam.Fieldname = "Load Data Validation";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "LoadDataValidation", this.oReadWflDataSuccess);

				oParam.Fieldname = "Reconciliation Requirements";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ReconciliationRequirements", this.oReadWflDataSuccess);

				oParam.Fieldname = "AuditingandControlRequirements";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "AuditingandControlRequirements", this.oReadWflDataSuccess);

				oParam.Fieldname = "Error Handling";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorHandling", this.oReadWflDataSuccess);

				oParam.Fieldname = "Error Handling Comments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorHandlingComments", this.oReadWflDataSuccess);

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

				oParam.Fieldname = "Assumptions";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Assumptions", this.oReadWflDataSuccess);
				oParam.Fieldname = "dependencies";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "dependencies", this.oReadWflDataSuccess);

				oParam.Fieldname = "FDSReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "FDSReview", this.oReadWflDataSuccess);
				oDataWorkflow.FDSReview = parseInt(oDataWorkflow.FDSReview);
				oParam.Fieldname = "FDSComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "FDSComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "ARReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ARReview", this.oReadWflDataSuccess);
				oDataWorkflow.ARReview = parseInt(oDataWorkflow.ARReview);
				oParam.Fieldname = "ARComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ARComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "SRReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SRReview", this.oReadWflDataSuccess);
				oDataWorkflow.SRReview = parseInt(oDataWorkflow.SRReview);
				oParam.Fieldname = "SRComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SRComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "ACReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ACReview", this.oReadWflDataSuccess);
				oDataWorkflow.ACReview = parseInt(oDataWorkflow.ACReview);
				oParam.Fieldname = "ACComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ACComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "ANReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ANReview", this.oReadWflDataSuccess);
				oDataWorkflow.ANReview = parseInt(oDataWorkflow.ANReview);
				oParam.Fieldname = "ANComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ANComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "ErrorHandlingReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorHandlingReview", this.oReadWflDataSuccess);
				oDataWorkflow.ErrorHandlingReview = parseInt(oDataWorkflow.ErrorHandlingReview);
				oParam.Fieldname = "ErrorHandlingCommentsEH";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorHandlingCommentsEH", this.oReadWflDataSuccess);

				oParam.Fieldname = "SelectionScreenComments";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SelectionScreenComments", this.oReadWflDataSuccess);
				oParam.Fieldname = "LoadDetailsReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "LoadDetailsReview", this.oReadWflDataSuccess);
				oDataWorkflow.LoadDetailsReview = parseInt(oDataWorkflow.LoadDetailsReview);
				oParam.Fieldname = "SelectionScreenReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SelectionScreenReview", this.oReadWflDataSuccess);
				oDataWorkflow.SelectionScreenReview = parseInt(oDataWorkflow.SelectionScreenReview);
				oParam.Fieldname = "SecurityReview";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SecurityReview", this.oReadWflDataSuccess);
				oDataWorkflow.SecurityReview = parseInt(oDataWorkflow.SecurityReview);

				oParam.Fieldname = "ErrorHandlingCheckBox";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ErrorHandlingCheckBox", this.oReadWflDataSuccess);
				if (oDataWorkflow.ErrorHandlingCheckBox) {
					var sOpMethods = oDataWorkflow.ErrorHandlingCheckBox.split("~");
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

				//////
				oParam.Fieldname = "End Point";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "EndPoint", this.oReadWflDataSuccess);

				oParam.Fieldname = "Standard Transaction Text";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "StanTransactText", this.oReadWflDataSuccess);

				oParam.Fieldname = "Custom Transaction Text";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CustmTransactText", this.oReadWflDataSuccess);

				oParam.Fieldname = "Manual Transaction Text";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "MannulTransactText", this.oReadWflDataSuccess);

				oParam.Fieldname = "Other triggerPt Text";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "TrigptOtherText", this.oReadWflDataSuccess);

				oParam.Fieldname = "User Interface";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "UserInterface", this.oReadWflDataSuccess);
				switch (oDataWorkflow.UserInterface) {
					case "Universal Worklist":
						this.byId("UITypeBtn1").setSelected(true);
						break;
					case "Netweaver Business Client":
						this.byId("UITypeBtn2").setSelected(true);
						break;
					case "SAP Business Workplace":
						this.byId("UITypeBtn3").setSelected(true);
						break;
					case "Fiori Dashboard":
						this.byId("UITypeBtn4").setSelected(true);
						break;
					case "Others":
						this.byId("UITypeBtn5").setSelected(true);
						break;
				}

				oParam.Fieldname = "Process Area";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "ProcessArea", this.oReadWflDataSuccess);
				if (oDataWorkflow.ProcessArea) {
					var sProcessAreaOpt = oDataWorkflow.ProcessArea.split("~");
					for (var iProcAr = 0; iProcAr < sProcessAreaOpt.length; iProcAr++) {
						that.getView().byId("processarea").addSelectedKeys(sProcessAreaOpt[iProcAr]);
					}
				}

				oParam.Fieldname = "Complexity";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Complexity", this.oReadWflDataSuccess);
				var aComplexityBtn = this.byId("Comp").getButtons();
				for (var iCount = 0; iCount < aComplexityBtn.length; iCount++) {
					if (aComplexityBtn[iCount].getText() === oDataWorkflow.Complexity) {
						this.byId("Comp").setSelectedIndex(iCount);
						break;
					}
				}

				oParam.Fieldname = "Trigger Point";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "TriggerPoint", this.oReadWflDataSuccess);
				// switch (oDataWorkflow.TriggerPoint) {
				// 	case "Standard Transaction":
				// 		this.byId("triggerPntBtn1").setSelected(true);
				// 		break;
				// 	case "Custom Transaction":
				// 		this.byId("triggerPntBtn2").setSelected(true);
				// 		break;
				// 	case "Manual":
				// 		this.byId("triggerPntBtn3").setSelected(true);
				// 		break;
				// }
				if (oDataWorkflow.TriggerPoint) {
					var striggPtOpt = oDataWorkflow.TriggerPoint.split("~");
					for (var iDepend = 0; iDepend < striggPtOpt.length; iDepend++) {
						switch (striggPtOpt[iDepend]) {
							case "Standard Transaction":
								this.byId("triggerPntBtn1").setSelected(true);
								this.byId("StanardTrigText").setVisible(true);
								break;
							case "Custom Transaction":
								this.byId("triggerPntBtn2").setSelected(true);
								this.byId("CustomTrigText").setVisible(true);
								break;
							case "Manual":
								this.byId("triggerPntBtn3").setSelected(true);
								this.byId("manualTrigPt").setVisible(true);
								break;
							case "Others":
								this.byId("triggerPntBtn4").setSelected(true);
								this.byId("OtherTrigPt").setVisible(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Design Details";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "objectDesigndetails", this.oReadWflDataSuccess);

				oParam.Fieldname = "Workflow Detailed Process Description";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "objectworkflowDetailsProcessDesc", this.oReadWflDataSuccess);

				oParam.Fieldname = "Object Details Business Requirement Process Flow";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "objectDetails", this.oReadWflDataSuccess);

				oParam.Fieldname = "Approval Roles";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "approvalRoles", this.oReadWflDataSuccess);

				oParam.Fieldname = "Dependency Assumptions";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "dependencyAssumptions", this.oReadWflDataSuccess);

				if (oDataWorkflow.dependencyAssumptions) {
					var sDepAssumpOpt = oDataWorkflow.dependencyAssumptions.split("~");
					for (var iDepend = 0; iDepend < sDepAssumpOpt.length; iDepend++) {
						switch (sDepAssumpOpt[iDepend]) {
							case "Configuration":
								this.byId("DependencyConfiguration").setSelected(true);
								break;
							case "Development":
								this.byId("DependencyDevelopment").setSelected(true);
								break;
							case "Execution":
								this.byId("DependencyExecution").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Special Requirements";
				//  oDataWorkflow.specialRequirements = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "specialRequirements", this.oReadWflDataSuccess);
				if (oDataWorkflow.specialRequirements) {
					var sSpecReqOpt = oDataWorkflow.specialRequirements.split("~");
					for (var iSpecReq = 0; iSpecReq < sSpecReqOpt.length; iSpecReq++) {
						switch (sSpecReqOpt[iSpecReq]) {
							case "Dead line monitoring":
								this.byId("CB_SPREQ_01").setSelected(true);
								break;
							case "Delegation required":
								this.byId("CB_SPREQ_02").setSelected(true);
								break;
							case "Reapproval required":
								this.byId("CB_SPREQ_03").setSelected(true);
								break;
							case "Integration to external systems":
								this.byId("CB_SPREQ_04").setSelected(true);
								break;
							case "Capturing user comments":
								this.byId("CB_SPREQ_05").setSelected(true);
								break;
							case "Attachments":
								this.byId("CB_SPREQ_06").setSelected(true);
								break;
							case "Other Special Requirement":
								this.byId("CB_SPREQ_07").setSelected(true);
								break;
						}
					}
				}

				oParam.Fieldname = "Special Requirement Text";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "SpecialReqText", this.oReadWflDataSuccess);

				oParam.Fieldname = "Alert Notification";
				// oDataWorkflow.alertNotif = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "alertNotif", this.oReadWflDataSuccess);

				oParam.Fieldname = "Assumption Comments";
				// oDataWorkflow.alertNotif = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "AssumptionComment", this.oReadWflDataSuccess);

				oParam.Fieldname = "Error Handling";
				// oDataWorkflow.errorHandling = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "errorHandling", this.oReadWflDataSuccess);

				oParam.Fieldname = "WorkFlow Error Handling Checkbox";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "selectionScreenVal", this.oReadWflDataSuccess);

				if (oDataWorkflow.selectionScreenVal) {
					var sSelScreenVal = oDataWorkflow.selectionScreenVal.split("~");
					for (var iSelScreenVal = 0; iSelScreenVal < sSelScreenVal.length; iSelScreenVal++) {
						switch (sSelScreenVal[iSelScreenVal]) {
							case "Selection Screen Validations":
								this.byId("CB_SCV").setSelected(true);
								break;
							case "":
								this.byId("CB_SCV").setSelected(false);
								break;
						}
					}
				}

				oParam.Fieldname = "Security";
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
				oParam.Fieldname = "Security Comments";
				// oDataWorkflow.securityComments = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "securityComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "Review Comments";
				// oDataWorkflow.securityComments = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "securityReviewComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "Rating";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "Rating", this.oReadWflDataSuccess);

				oParam.Fieldname = "WF Review Comments";
				// oDataWorkflow.securityComments = callServices.fnCallMainTable(oParam);
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFReviewComments", this.oReadWflDataSuccess);

				oParam.Fieldname = "WF Rating";
				callServices.fnGetDataMainTable(oParam, oDataWorkflow, "WFRatings", this.oReadWflDataSuccess);
				//test
				var iCountUA, sUserAcptCols;

				for (iCountUA = 0;; iCountUA++) {

					oDataWorkflow.userAcceptTemp = "";
					oParam.Fieldname = "FS_UA_" + (iCountUA + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataWorkflow, "userAcceptTemp", this.oReadWflDataSuccess);
					if (this.oReadWflDataSuccess.userAcceptTemp) {
						if (oDataWorkflow.userAcceptTemp) {
							sUserAcptCols = oDataWorkflow.userAcceptTemp.split("~");
							if (sUserAcptCols && sUserAcptCols.length === 7) {
								oDataWorkflow.userAcceptance.push({
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
				if (oDataWorkflow.userAcceptance.length === 0) {
					oDataWorkflow.userAcceptance.push({
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

				//test2
				var iCountCommLog, sCommLogCols;

				for (iCountCommLog = 0;; iCountCommLog++) {

					oDataWorkflow.CommLogTemp = "";
					oParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);

					callServices.fnGetDataMainTableUC(oParam, oDataWorkflow, "CommLogTemp", this.oReadWflDataSuccess);
					if (this.oReadWflDataSuccess.CommLogTemp) {
						if (oDataWorkflow.CommLogTemp) {
							sCommLogCols = oDataWorkflow.CommLogTemp.split("~");
							if (sCommLogCols && sCommLogCols.length >= 6) {

								$.each(sCommLogCols, function(iIndex, sValue) {

									if (iIndex === 2 || iIndex === 4) {

										var dateTemp = new Date(sValue);
										if ((dateTemp == "Invalid Date") || (sValue === null)) {
											sCommLogCols[iIndex] = "";
										} else {
											//sCommLogCols[iIndex] = new Date(sValue);
											sCommLogCols[iIndex] = dateTemp.toJSON().substring(0, 10);
										}

										// if (sValue === "" || sValue === "undefined" || sValue === "Invalid Date" || sValue === "null") {
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

								oDataWorkflow.CommLog.push({
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
				if (oDataWorkflow.CommLog.length === 0) {
					oDataWorkflow.CommLog.push({
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

				oModelWorkflow.setData(oDataWorkflow);

				this.readAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "WFAttachmentReq",
					TYPE: "O"
				});

				this.readAttachments({
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "WFAttachmentReqObjectDetails",
					TYPE: "O"
				});

				// oParam.fieldname = "UA1";
				// // oDataWorkflow.userAccept1 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "userAccept1", this.oReadWflDataSuccess);
				// var sUserAcptCols;
				// var sUserAcptCols1;
				// if (oDataWorkflow.userAccept1) {
				// 	sUserAcptCols = oDataWorkflow.userAccept1.split("~");
				// 	// if (sUserAcptCols & sUserAcptCols.length === 5) {
				// 	//  oUserAcceptance.userAcceptance[0].step = sUserAcptCols[0];
				// 	//  oUserAcceptance.userAcceptance[0].testType = sUserAcptCols[1];
				// 	//  oUserAcceptance.userAcceptance[0].scenario = sUserAcptCols[2];
				// 	//  oUserAcceptance.userAcceptance[0].stepsPer = sUserAcptCols[3];
				// 	//  oUserAcceptance.userAcceptance[0].actualResults = sUserAcptCols[4];
				// 	// }
				// 	if (sUserAcptCols.length > 1) {
				// 		var data1 = {};
				// 		data1.step = sUserAcptCols[0];
				// 		data1.testType = sUserAcptCols[1];
				// 		data1.scenario = sUserAcptCols[2];
				// 		data1.stepsPer = sUserAcptCols[3];
				// 		data1.actualResults = sUserAcptCols[4];
				// 		oDataWorkflow.userAcceptance.push(data1);

				// 	}
				// }

				// oParam.fieldname = "UA2";
				// // oDataWorkflow.userAccept2 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "userAccept2", this.oReadWflDataSuccess);
				// if (oDataWorkflow.userAccept2) {
				// 	sUserAcptCols1 = oDataWorkflow.userAccept2.split("~");
				// 	// if (sUserAcptCols1 & sUserAcptCols1.length === 5) {
				// 	//  oUserAcceptance.userAcceptance[1].step = sUserAcptCols1[0];
				// 	//  oUserAcceptance.userAcceptance[1].testType = sUserAcptCols1[1];
				// 	//  oUserAcceptance.userAcceptance[1].scenario = sUserAcptCols1[2];
				// 	//  oUserAcceptance.userAcceptance[1].stepsPer = sUserAcptCols1[3];
				// 	//  oUserAcceptance.userAcceptance[1].actualResults = sUserAcptCols1[4];
				// 	// }
				// 	if (sUserAcptCols1.length > 1) {
				// 		var data1 = {};
				// 		data1.step = sUserAcptCols1[0];
				// 		data1.testType = sUserAcptCols1[1];
				// 		data1.scenario = sUserAcptCols1[2];
				// 		data1.stepsPer = sUserAcptCols1[3];
				// 		data1.actualResults = sUserAcptCols1[4];
				// 		oDataWorkflow.userAcceptance.push(data1);

				// 	}
				// }

				// oParam.fieldname = "CommLog";
				// var sCommLogCol1;
				// // oDataWorkflow.userAccept2 = callServices.fnCallMainTable(oParam);
				// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CommLog1", this.oReadWflDataSuccess);
				// if (oDataWorkflow.CommLog1) {
				// 	sCommLogCol1 = oDataWorkflow.CommLog1.split("~");
				// 	// if (sUserAcptCols1 & sUserAcptCols1.length === 5) {
				// 	//  oUserAcceptance.userAcceptance[1].step = sUserAcptCols1[0];
				// 	//  oUserAcceptance.userAcceptance[1].testType = sUserAcptCols1[1];
				// 	//  oUserAcceptance.userAcceptance[1].scenario = sUserAcptCols1[2];
				// 	//  oUserAcceptance.userAcceptance[1].stepsPer = sUserAcptCols1[3];
				// 	//  oUserAcceptance.userAcceptance[1].actualResults = sUserAcptCols1[4];
				// 	// }
				// 	if (sCommLogCol1.length > 1) {
				// 		var data1 = {};
				// 		data1.IssueDesc = sCommLogCol1[0];
				// 		data1.Priority = sCommLogCol1[1];
				// 		data1.DateLogg = new Date(sCommLogCol1[2]);
				// 		data1.Status = sCommLogCol1[3];
				// 		data1.DateResol = new Date(sCommLogCol1[4]);
				// 		data1.Resolv = sCommLogCol1[5];
				// 		oDataWorkflow.CommLog.push(data1);

				// 	}
				// } else {
				// 	var data1 = {};
				// 	data1.IssueDesc = "";
				// 	data1.Priority = "";
				// 	data1.DateLogg = null;
				// 	data1.Status = "";
				// 	data1.DateResol = null;
				// 	data1.Resolv = "";
				// 	oDataWorkflow.CommLog.push(data1);
				// }

			}

		

			// oModelUA.setData(oUserAcceptance);

		},
		handleDescriptionChange: function(Oevent) {
			var data = Oevent.getParameters().value;
			var oDataWorkflow = this.getView().getModel("enhData").getData();
			oDataWorkflow.ObjectDescrp = data;
			oDataWorkflow.HeaderTitle = oDataWorkflow.ObjectId + " - " + oDataWorkflow.ObjectDescrp;
			this.getView().getModel("enhData").refresh();

		},
		onChangeVersionExisting: function(oevent) {
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
			}

		},
		onConfirmSave: function() {

			// var type = sap.ui.getCore().getModel().getData().Key;
			// var obj = sap.ui.getCore().getModel().getData().Obj;
			this.byId("idPopOverContainer").setVisible(true);

			//START
			var oParam = "";
			try {
				oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
				if (oParam.Projectkey === "ENH") {
					this.updateEnhancementFS();

				} else if (oParam.Projectkey === "WFLW") {
					this.updateWorkFlowFS();

				} else if (oParam.Projectkey === "FRM") {
					this.updateFormFS();

				}
				this.getView().byId("oBTHold").setEnabled(true);
				// Update Process Lane Starts
				var oCurrentView = this.getView();
				oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
				oCurrentView.byId("processflow2").updateModel();
				// Update Process Lane Ends

			} catch (exception) {
				return;
			}
			//END

			// if (obj === "new") {

			// 	this.oReadWflDataSuccess = {
			// 		Approver: false,
			// 		Reviewer: false,
			// 		Author: false,
			// 		ObjectId: false,
			// 		UserInterface: false,
			// 		ProcessArea: false,
			// 		TriggerPoint: false,
			// 		objectDetails: false,
			// 		approvalRoles: false,
			// 		dependencyAssumptions: false,
			// 		specialRequirements: false,
			// 		alertNotif: false,
			// 		AssumptionComment: false,
			// 		errorHandling: false,
			// 		selectionScreenVal: false,
			// 		security: false,
			// 		securityComments: false,
			// 		securityReviewComments: false,
			// 		Rating: false,
			// 		WFReviewComments: false,
			// 		WFRatings: false,
			// 		userAcceptance: false,
			// 		CommLog: false,
			// 		Status_FS: false

			// 	};

			// 	// this.oReadEnhanDataSuccess = {
			// 	// 	Approver: false,
			// 	// 	Reviewer: false,
			// 	// 	Author: false,
			// 	// 	ObjectId: false,
			// 	// 	ObjectTitle: false,
			// 	// 	StoryNumberComment: false,
			// 	// 	ProcessArea: false,
			// 	// 	ObjectIdEnhancementRequirement: false,
			// 	// 	Complexity: false,
			// 	// 	errorHandling: false,
			// 	// 	security: false,
			// 	// 	securityComments: false,
			// 	// 	ReviewComments: false,
			// 	// 	Rating: false,
			// 	// 	// userAccept1: false,
			// 	// 	// userAccept2: false,
			// 	// 	CommLog: false,
			// 	// 	Status_FS: false

			// 	// };

			// 	this.oReadFormDataSuccess = {
			// 		Approver: false,
			// 		Reviewer: false,
			// 		Author: false,
			// 		ObjectId: false,
			// 		Complexity: false,
			// 		ProcessArea: false,
			// 		security: false,
			// 		securityComments: false,
			// 		AnyRelated: false,
			// 		BarcodeAlignment: false,
			// 		BarcodeType: false,
			// 		CompanyLogoRequired: false,
			// 		EmailID: false,
			// 		FaxNumber: false,
			// 		FontSize: false,
			// 		FormType: false,
			// 		Multiplepageformats: false,
			// 		PageOrientation: false,
			// 		PaperSize: false,
			// 		Numberofcopies: false,
			// 		OutputMethods: false,
			// 		PositionoftheLOGO: false,
			// 		Preprintedstationary: false,
			// 		PrintLanguages: false,
			// 		PrinterModelIdentified: false,
			// 		PrinterRequired: false,
			// 		PrinterTrays: false,
			// 		PrinterType: false,
			// 		Printeraccessibility: false,
			// 		Rotation: false,
			// 		Special: false,
			// 		WatermarkRequired: false,
			// 		FormGeneralDetails: false,
			// 		dependencies: false,
			// 		SubProcessArea: false,
			// 		securityReviewComments: false,
			// 		Rating: false,
			// 		Status_FS: false
			// 	};

			// 	switch (type) {
			// 		case "Workflow":
			// 			this.updateWorkFlowFS();
			// 			break;
			// 		case "Enhancement":
			// 			this.updateEnhancementFS();
			// 			break;
			// 		case "Form":
			// 			this.updateFormFS();
			// 			break;
			// 	}
			// 	// Update Process Lane Starts
			// 	var oCurrentView = this.getView();
			// 	oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			// 	oCurrentView.byId("processflow2").updateModel();
			// 	// Update Process Lane Ends

			// } else if (obj === "existing") {

			// 	//START
			// 	var oParam = "";
			// 	try {
			// 		oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			// 		if (oParam.projectkey === "ENH") {
			// 			this.updateEnhancementFS();
			// 			break;
			// 		} else if (oParam.projectkey === "WFLW") {
			// 			this.updateWorkFlowFS();
			// 			break;
			// 		} else if (oParam.projectkey === "FRM") {
			// 			this.updateFormFS();
			// 			break;
			// 		}

			// 		// Update Process Lane Starts
			// 		var oCurrentView = this.getView();
			// 		oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			// 		oCurrentView.byId("processflow2").updateModel();
			// 		// Update Process Lane Ends

			// 	} catch (exception) {
			// 		return;
			// 	}
			// 	//END
			// }

		},

		onFooterButtonPressFS: function() {

			if (this.getView().byId("oBTSubmit").getText() === "Submit") {
				this.onSubmit();
			} else if (this.getView().byId("oBTSubmit").getText() === "Approve") {
				this.onApprove();
			} else if (this.getView().byId("oBTSubmit").getText() === "Accept") {
				this.onAccept();
			}

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

							// callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							// callServices.fnSendMail(oModelData.Email);
							var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
							var projectname = sap.ui.getCore().getModel("ProjectInformation").getData().projectInfo.ProjectId;
							var oDataForMail = that.getView().getModel("enhData").getData();
							var currentversion = that.byId("versiontypeExisting").getSelectedItem().getText();
							var sURL = callServices.fnGetURL(dataObject, projectname, currentversion);
							callServices.fnGetLoggedInUserDetails(oPayLoad, oModelData, "Email");
							//commented by burhan//callServices.fnSendMail(oModelData.Email, dataObject.repid, projectname, sURL, oDataForMail.Approver, oDataForMail.Reviewer,oDataForMail.ObjectTitle);
							callServices.fnSendMail(oModelData.Email, dataObject.Repid, projectname, sURL, oDataForMail.Reviewer, oDataForMail.Author,
								oDataForMail.ObjectTitle);
						}

					}
				}
			);

		},
		onConfirmSubmit: function() {

			//set staus here
			this.getStatusWFReview(true);
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SUBMITTED';
			if (oInfo.Projectkey === "ENH") {
				this.updateEnhancementFS();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);
				this.getStatusEnhReview(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(true);

			} else if (oInfo.Projectkey === "WFLW") {
				this.getReviewDataWFLW(true);
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.STATUS_FS);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Approve");
				oCurrentView.byId("oBTPrint").setVisible(true);
				this.updateWorkFlowFS();
			} else if (oInfo.Projectkey === "FRM") {
				this.getReviewDataFORM(true);
				this.getStatusFormReview(true);
				this.updateFormFS();
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);

				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(true);
			}

			// Update Process Lane Starts

			oCurrentView.byId("processflow2")._getLane("0").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2")._getLane("1").getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			// Update Process Lane Ends
			// oCurrentView.byId("oBTPrint").setVisible(true);
			this.getView().byId("oBTHold").setEnabled(true);

			// oCurrentView.byId("oBTSubmit").setVisible(false); //New change
			// oCurrentView.byId("oBTSave").setVisible(false); //New change
			// oCurrentView.byId("oBTApprove").setVisible(true); //New change

		},

		// onclick approve button

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
			this.getStatusWFReview(true);
			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'APPROVED';
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);
			if (oInfo.Projectkey === "ENH") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(true);
			} else if (oInfo.Projectkey === "WFLW") {
				this.getReviewDataWFLW(true);
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.STATUS_FS);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTSubmit").setEnabled(true);
				oCurrentView.byId("oBTSubmit").setText("Accept");
				oCurrentView.byId("oBTPrint").setVisible(true);

			} else if (oInfo.Projectkey === "FRM") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);
				this.getReviewDataFORM(true);
				this.getStatusFormReview(true);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
			//	oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(true);

			}

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Critical;
			oCurrentView.byId("processflow2").updateModel();
			this.getView().byId("oBTHold").setEnabled(true);
			// Update Process Lane Ends
			/*	oCurrentView.byId("oBTPrint").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setVisible(false);
				oCurrentView.byId("oBTApprove").setVisible(false);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);*/

		},

		// on click accept button

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

						}

					}
				}
			);

		},

		onConfirmAccept: function() {

			//set staus here
			this.getStatusWFReview(false);

			var oInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
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

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'ACCEPTED';
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);
			if (oInfo.Projectkey === "ENH") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
			//	this.getView().byId("oBTHold").setVisible(true);
			} else if (oInfo.Projectkey === "WFLW") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.STATUS_FS);
				oCurrentView.byId("oBTSave").setEnabled(false);

				oCurrentView.byId("oBTSubmit").setEnabled(false);
				oCurrentView.byId("oBTPrint").setVisible(true);
			//	this.getView().byId("oBTHold").setVisible(true);
			} else if (oInfo.Projectkey === "FRM") {
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);
				this.getStatusFormReview(false);
				//oCurrentView.byId("oBTSubmit").setVisible(true);
				oCurrentView.byId("oBTSave").setVisible(true);
				oCurrentView.byId("oBTApprove").setVisible(true);
				oCurrentView.byId("oBTAcceptApproval").setVisible(true);
				this.getView().byId("oBTHold").setVisible(true);

				oCurrentView.byId("oBTSubmit").setVisible(false);
				oCurrentView.byId("oBTSave").setEnabled(false);
				oCurrentView.byId("oBTApprove").setEnabled(false);
				oCurrentView.byId("oBTAcceptApproval").setEnabled(false);
			}

			oCurrentView.byId("processflow2").getLanes()[0].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[1].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").getLanes()[2].getState()[0].state = sap.suite.ui.commons.ProcessFlowNodeState.Positive;
			oCurrentView.byId("processflow2").updateModel();
			this.getView().byId("oBTHold").setEnabled(true);
			// Update Process Lane Ends
			/*	oCurrentView.byId("oBTPrint").setVisible(true);

			oCurrentView.byId("oBTSubmit").setVisible(false);
			oCurrentView.byId("oBTSave").setVisible(false);
			oCurrentView.byId("oBTApprove").setVisible(false);
			oCurrentView.byId("oBTAcceptApproval").setVisible(false);
*/

		},

		// Form Change
		updateFormFS: function() {

			var oDataForm = this.getView().getModel("enhData").getData();
			var oDataForm2 = this.getView().getModel("FrmData").getData();

			// for dependencies
			/*var oDataDependencyCheckBx = [];
			if (this.getView().byId("Configuration").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Configuration").getText());
			}
			if (this.getView().byId("Development").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Development").getText());
			}
			if (this.getView().byId("Execution").getSelected()) {
				oDataDependencyCheckBx.push(this.getView().byId("Execution").getText());
			}
			var oDataDependencyCheckBxMulti = oDataDependencyCheckBx.join("~");*/

			// for process area selection
			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();

			var idx = $.inArray("Operations", oDataProcessArea);
			if (idx !== -1) {
				oDataProcessArea.splice(idx, 1);
			}

			var oDataProcessAreaMulti = oDataProcessArea.join("~");

			// for form type selection
			var oDataFormTypeRadioBtn;
			if (this.getView().byId("R1").getSelected()) {
				oDataFormTypeRadioBtn = this.getView().byId("R1").getText();
			} else if (this.getView().byId("R2").getSelected()) {
				oDataFormTypeRadioBtn = this.getView().byId("R2").getText();
			}

			// for complexity type selection
			var oDataComplexityRadioBtn;
			if (this.getView().byId("Simple").getSelected()) {
				oDataComplexityRadioBtn = this.getView().byId("Simple").getText();
			} else if (this.getView().byId("Medium").getSelected()) {
				oDataComplexityRadioBtn = this.getView().byId("Medium").getText();
			} else if (this.getView().byId("Complex").getSelected()) {
				oDataComplexityRadioBtn = this.getView().byId("Complex").getText();
			}
			// else if (this.getView().byId("hComplex").getSelected()) {
			// 	oDataComplexityRadioBtn = this.getView().byId("hComplex").getText();
			// }

			// for output methods checkbox selection
			var oDataOutputCheckBx = [];
			if (this.getView().byId("Printc").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("Printc").getText());
			}
			if (this.getView().byId("Faxc").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("Faxc").getText());
			}
			if (this.getView().byId("Emailc").getSelected()) {
				oDataOutputCheckBx.push(this.getView().byId("Emailc").getText());
			}
			var oDataOutputCheckBxMulti = oDataOutputCheckBx.join("~");

			// for paper size checkbox selection
			var oDataPaperCheckBx = [];
			if (this.getView().byId("cb1").getSelected()) {
				oDataPaperCheckBx.push(this.getView().byId("cb1").getText());
			}
			if (this.getView().byId("cb2").getSelected()) {
				oDataPaperCheckBx.push(this.getView().byId("cb2").getText());
			}
			if (this.getView().byId("cb3").getSelected()) {
				oDataPaperCheckBx.push(this.getView().byId("cb3").getText());
			}
			if (this.getView().byId("cb4").getSelected()) {
				oDataPaperCheckBx.push(this.getView().byId("cb4").getText());
			}
			var oDataPaperCheckBxMulti = oDataPaperCheckBx.join("~");

			// for page orientation check box selection
			var oDataPageCheckBx = [];
			if (this.getView().byId("Portrait").getSelected()) {
				oDataPageCheckBx.push(this.getView().byId("Portrait").getText());
			}
			if (this.getView().byId("Landscape").getSelected()) {
				oDataPageCheckBx.push(this.getView().byId("Landscape").getText());
			}
			var oDataPageCheckBxMulti = oDataPageCheckBx.join("~");

			//for pre printed stationary radio button selection
			var oDataPreCheckBx = [];
			if (this.getView().byId("cb5").getSelected()) {
				oDataPreCheckBx.push(this.getView().byId("cb5").getText());
			}
			if (this.getView().byId("cb6").getSelected()) {
				oDataPreCheckBx.push(this.getView().byId("cb6").getText());
			}
			var oDataPreCheckBxMulti = oDataPreCheckBx.join("~");

			//for multiple page formats radio button selection
			var oDataMultipleCheckBx = [];
			if (this.getView().byId("cb7").getSelected()) {
				oDataMultipleCheckBx.push(this.getView().byId("cb7").getText());
			}
			if (this.getView().byId("cb8").getSelected()) {
				oDataMultipleCheckBx.push(this.getView().byId("cb8").getText());
			}
			var oDataMultipleCheckBxMulti = oDataMultipleCheckBx.join("~");

			//for watermarks required radio button selection
			var oDataWaterCheckBx = [];
			if (this.getView().byId("cb9").getSelected()) {
				oDataWaterCheckBx.push(this.getView().byId("cb9").getText());
			}
			if (this.getView().byId("cb10").getSelected()) {
				oDataWaterCheckBx.push(this.getView().byId("cb10").getText());
			}
			var oDataWaterCheckBxMulti = oDataWaterCheckBx.join("~");

			//for company logo required radio button selection
			var oDataCompanyCheckBx = [];
			if (this.getView().byId("cb11").getSelected()) {
				oDataCompanyCheckBx.push(this.getView().byId("cb11").getText());
			}
			if (this.getView().byId("cb12").getSelected()) {
				oDataCompanyCheckBx.push(this.getView().byId("cb12").getText());
			}
			var oDataCompanyCheckBxMulti = oDataCompanyCheckBx.join("~");

			//for printer type checkbpx selection
			var oDataPrinterCheckBx = [];
			if (this.getView().byId("Thermal").getSelected()) {
				oDataPrinterCheckBx.push(this.getView().byId("Thermal").getText());
			}
			if (this.getView().byId("Laser").getSelected()) {
				oDataPrinterCheckBx.push(this.getView().byId("Laser").getText());
			}
			if (this.getView().byId("Zebra").getSelected()) {
				oDataPrinterCheckBx.push(this.getView().byId("Zebra").getText());
			}
			if (this.getView().byId("Others").getSelected()) {
				oDataPrinterCheckBx.push(this.getView().byId("Others").getText());
			}
			var oDataPrinterCheckBxMulti = oDataPrinterCheckBx.join("~");

			//for rotation required radio button selection
			var oDataRotationCheckBx = [];
			if (this.getView().byId("cb13").getSelected()) {
				oDataRotationCheckBx.push(this.getView().byId("cb13").getText());
			}
			if (this.getView().byId("cb14").getSelected()) {
				oDataRotationCheckBx.push(this.getView().byId("cb14").getText());
			}
			var oDataRotationCheckBxMulti = oDataRotationCheckBx.join("~");

			//for printer accessibility checkbox selection
			var oDataAccessCheckBx = [];
			if (this.getView().byId("cb15").getSelected()) {
				oDataAccessCheckBx.push(this.getView().byId("cb15").getText());
			}
			if (this.getView().byId("cb16").getSelected()) {
				oDataAccessCheckBx.push(this.getView().byId("cb16").getText());
			}
			var oDataAccessCheckBxMulti = oDataAccessCheckBx.join("~");

			//for printer model identified checkbox selection
			var oDataModelCheckBx = [];
			if (this.getView().byId("HP").getSelected()) {
				oDataModelCheckBx.push(this.getView().byId("HP").getText());
			}
			if (this.getView().byId("Xerox").getSelected()) {
				oDataModelCheckBx.push(this.getView().byId("Xerox").getText());
			}
			if (this.getView().byId("Lexmark").getSelected()) {
				oDataModelCheckBx.push(this.getView().byId("Lexmark").getText());
			}
			if (this.getView().byId("Other").getSelected()) {
				oDataModelCheckBx.push(this.getView().byId("Other").getText());
			}
			var oDataModelCheckBxMulti = oDataModelCheckBx.join("~");

			//for printing languages checkbox selection
			var oDataLangCheckBx = [];
			if (this.getView().byId("English").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("English").getText());
			}
			if (this.getView().byId("Spanish").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Spanish").getText());
			}
			if (this.getView().byId("Chinese").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Chinese").getText());
			}
			if (this.getView().byId("Dutch").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Dutch").getText());
			}
			if (this.getView().byId("German").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("German").getText());
			}
			if (this.getView().byId("Mandarin").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Mandarin").getText());
			}
			if (this.getView().byId("Dutch").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Dutch").getText());
			}
			if (this.getView().byId("Portuguese").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Portuguese").getText());
			}
			if (this.getView().byId("Oth").getSelected()) {
				oDataLangCheckBx.push(this.getView().byId("Oth").getText());
			}
			var oDataLangCheckBxMulti = oDataLangCheckBx.join("~");

			//for data allignment check box selection
			var oDataAlignCheckBx = [];
			if (this.getView().byId("Normal").getSelected()) {
				oDataAlignCheckBx.push(this.getView().byId("Normal").getText());
			}
			if (this.getView().byId("Rotated").getSelected()) {
				oDataAlignCheckBx.push(this.getView().byId("Rotated").getText());
			}
			if (this.getView().byId("Inverted").getSelected()) {
				oDataAlignCheckBx.push(this.getView().byId("Inverted").getText());
			}
			if (this.getView().byId("Bottom").getSelected()) {
				oDataAlignCheckBx.push(this.getView().byId("Bottom").getText());
			}
			var oDataAlignCheckBxMulti = oDataAlignCheckBx.join("~");

			var objInfo = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oParam = {
				Version: versionno[1],
				Repid: objInfo.Repid,
				Projectkey: objInfo.Projectkey,
				Processid: objInfo.Processid,
				Stepno: objInfo.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};

			var uParam = {
				Version: versionno[1],
				Repid: objInfo.Repid,
				Projectkey: objInfo.Projectkey,
				Processid: objInfo.Processid,
				Stepno: objInfo.Stepno,
				Fieldname: ''
			};
			/*	
				oParam.Fieldname = "STATUS_FS";
				uParam.Fieldname = "STATUS_FS";
				oParam.Fieldvalue = 'SAVED';
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);*/

			/*	if(this.CROpen!==""){
				oParam.Version='1.0';
				uParam.Version='1.0';
				oParam.Fieldname = "CRDetails";
				uParam.Fieldname = "CRDetails";
				oParam.Fieldvalue = this.CROpen;
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.CRDetails);
				oParam.Version=versionno[1];
				uParam.Version=versionno[1];
				}*/

			oParam.Fieldname = "Dependencies";
			uParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataForm.Dependencies;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Dependencies);

			oParam.Fieldname = "Assumptions";
			uParam.Fieldname = "Assumptions";
			oParam.Fieldvalue = oDataForm.Assumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Assumptions);

			oParam.Fieldname = "HTTPSSFTP";
			uParam.Fieldname = "HTTPSSFTP";
			oParam.Fieldvalue = oDataForm.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.HTTPS_SFTP_);

			oParam.Fieldname = "UserAuthorization";
			uParam.Fieldname = "UserAuthorization";
			oParam.Fieldvalue = oDataForm.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.UserAuth);

			oParam.Fieldname = "Encryption";
			uParam.Fieldname = "Encryption";
			oParam.Fieldvalue = oDataForm.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Encryp);

			oParam.Fieldname = "StoryNumberComment";
			uParam.Fieldname = "StoryNumberComment";
			oParam.Fieldvalue = oDataForm.StoryNumberComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.StoryNumberComment);

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Status_FS);

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataForm.Approver;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Approver);
			oParam.Fieldname = "FormMapping";
			uParam.Fieldname = "FormMapping";
			oParam.Fieldvalue = oDataForm2.FormMapping;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.FormMapping);
			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataForm.Reviewer;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Reviewer);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataForm.Author;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Author);

			oParam.Fieldname = "FormType";
			uParam.Fieldname = "FormType";
			oParam.Fieldvalue = oDataFormTypeRadioBtn;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.FormType);

			oParam.Fieldname = "ObjectID";
			uParam.Fieldname = "ObjectID";
			oParam.Fieldvalue = oDataForm.ObjectId;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.ObjectId);

			oParam.Fieldname = "ProcessArea";
			uParam.Fieldname = "ProcessArea";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.ProcessArea);

			oParam.Fieldname = "SubProcessArea";
			uParam.Fieldname = "SubProcessArea";
			oParam.Fieldvalue = oDataForm.SubProcessArea;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.SubProcessArea);

			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataComplexityRadioBtn;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Complexity);

			oParam.Fieldname = "FormGeneralDetails";
			uParam.Fieldname = "FormGeneralDetails";
			oParam.Fieldvalue = oDataForm.FormGeneralDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormGeneralDetails);

			oParam.Fieldname = "OutputMethods";
			uParam.Fieldname = "OutputMethods";
			oParam.Fieldvalue = oDataOutputCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.OutputMethods);

			oParam.Fieldname = "EmailID";
			uParam.Fieldname = "EmailID";
			oParam.Fieldvalue = oDataForm2.EmailID;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.EmailID);

			oParam.Fieldname = "FaxNumber";
			uParam.Fieldname = "FaxNumber";
			oParam.Fieldvalue = oDataForm2.FaxNumber;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.FaxNumber);

			oParam.Fieldname = "PaperSize";
			uParam.Fieldname = "PaperSize";
			oParam.Fieldvalue = oDataPaperCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.PaperSize);

			oParam.Fieldname = "PageOrientation";
			uParam.Fieldname = "PageOrientation";
			oParam.Fieldvalue = oDataPageCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.PageOrientation);

			oParam.Fieldname = "SpecialPrintingRequirements";
			uParam.Fieldname = "SpecialPrintingRequirements";
			oParam.Fieldvalue = oDataForm2.Special;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Special);

			oParam.Fieldname = "PrePrintedStationary";
			uParam.Fieldname = "PrePrintedStationary";
			oParam.Fieldvalue = oDataPreCheckBxMulti;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Preprintedstationary);

			oParam.Fieldname = "MultiplePageFormats";
			uParam.Fieldname = "MultiplePageFormats";
			oParam.Fieldvalue = oDataMultipleCheckBxMulti;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Multiplepageformats);

			oParam.Fieldname = "WatermarkRequired";
			uParam.Fieldname = "WatermarkRequired";
			oParam.Fieldvalue = oDataWaterCheckBxMulti;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.WatermarkRequired);

			oParam.Fieldname = "CompanyLogoRequired";
			uParam.Fieldname = "CompanyLogoRequired";
			oParam.Fieldvalue = oDataCompanyCheckBxMulti;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.CompanyLogoRequired);

			oParam.Fieldname = "PositionOfTheLogo";
			uParam.Fieldname = "PositionOfTheLogo";
			oParam.Fieldvalue = oDataForm2.PositionoftheLOGO;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PositionoftheLOGO);

			oParam.Fieldname = "PrinterTrays";
			uParam.Fieldname = "PrinterTrays";
			oParam.Fieldvalue = oDataForm2.PrinterTrays;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrinterTrays);

			oParam.Fieldname = "NumberOfCopies";
			uParam.Fieldname = "NumberOfCopies";
			oParam.Fieldvalue = oDataForm2.Numberofcopies;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Numberofcopies);

			oParam.Fieldname = "PrinterType";
			uParam.Fieldname = "PrinterType";
			oParam.Fieldvalue = oDataPrinterCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.PrinterType);

			oParam.Fieldname = "RotationRequirementsPrintingLabelsOnZebraPrinter";
			uParam.Fieldname = "RotationRequirementsPrintingLabelsOnZebraPrinter";
			oParam.Fieldvalue = oDataRotationCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.Rotation);

			oParam.Fieldname = "PrinterAccessibility";
			uParam.Fieldname = "PrinterAccessibility";
			oParam.Fieldvalue = oDataAccessCheckBxMulti;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Printeraccessibility);

			oParam.Fieldname = "AnyRelatedPrinterSpecificCutOverStepsIdentified";
			uParam.Fieldname = "AnyRelatedPrinterSpecificCutOverStepsIdentified";
			oParam.Fieldvalue = oDataForm2.AnyRelated;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.AnyRelated);

			oParam.Fieldname = "PrinterModelIdentified";
			uParam.Fieldname = "PrinterModelIdentified";
			oParam.Fieldvalue =
				oDataModelCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrinterModelIdentified);

			oParam.Fieldname = "IsThePrinterRequiredToBeMappedInSAPInCaseYesPrinterSAPDeviceTypeIdentified";
			uParam.Fieldname = "IsThePrinterRequiredToBeMappedInSAPInCaseYesPrinterSAPDeviceTypeIdentified";
			oParam.Fieldvalue = oDataForm2.PrinterRequired;
			callServices
				.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrinterRequired);

			oParam.Fieldname = "PrintLanguages";
			uParam.Fieldname = "PrintLanguages";
			oParam.Fieldvalue = oDataLangCheckBxMulti;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.PrintLanguages);

			oParam.Fieldname = "FontSize";
			uParam.Fieldname = "FontSize";
			oParam.Fieldvalue = oDataForm2.FontSize;
			callServices.fnUpdateInMainTable(
				oParam, uParam, this.oReadFormDataSuccess.FontSize);

			oParam.Fieldname = "BarcodeType";
			uParam.Fieldname = "BarcodeType";
			oParam.Fieldvalue = oDataForm2.BarcodeType;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.BarcodeType);

			oParam.Fieldname = "BarcodeAlignment";
			uParam.Fieldname = "BarcodeAlignment";
			oParam.Fieldvalue = oDataAlignCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.BarcodeAlignment);

			//oParam.Fieldname = "Dependencies";
			//uParam.Fieldname = "Dependencies";
			//oParam.Fieldvalue = oDataForm.dependencies;
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.dependencies);

			//oParam.Fieldvalue = oDataDependencyCheckBxMulti;
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.dependencies);

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

			oParam.Fieldname = "Security";
			uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.security);

			oParam.Fieldname = "SecurityComments";
			uParam.Fieldname = "SecurityComments";
			oParam.Fieldvalue = oDataForm.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.securityComments);

			oParam.Fieldname = "FormGeneralDetails_Review";
			uParam.Fieldname = "FormGeneralDetails_Review";
			if (oDataForm.FormGeneralDetails_Review) {
				oParam.Fieldvalue = oDataForm.FormGeneralDetails_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormGeneralDetails_Review);

			oParam.Fieldname = "FormGeneralDetails_Comments";
			uParam.Fieldname = "FormGeneralDetails_Comments";
			oParam.Fieldvalue = oDataForm.FormGeneralDetails_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormGeneralDetails_Comments);

			oParam.Fieldname = "BarcodeReq_Review";
			uParam.Fieldname = "BarcodeReq_Review";
			if (oDataForm.BarcodeReq_Review) {
				oParam.Fieldvalue = oDataForm.BarcodeReq_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.BarcodeReq_Review);

			oParam.Fieldname = "BarcodeReq_Comments";
			uParam.Fieldname = "BarcodeReq_Comments";
			oParam.Fieldvalue = oDataForm.BarcodeReq_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.BarcodeReq_Comments);

			oParam.Fieldname = "FormMapping_Review";
			uParam.Fieldname = "FormMapping_Review";
			if (oDataForm.FormMapping_Review) {
				oParam.Fieldvalue = oDataForm.FormMapping_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormMapping_Review);

			oParam.Fieldname = "FormMapping_Comments";
			uParam.Fieldname = "FormMapping_Comments";
			oParam.Fieldvalue = oDataForm.FormMapping_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.FormMapping_Comments);

			oParam.Fieldname = "PrintingReq_Review";
			uParam.Fieldname = "PrintingReq_Review";
			if (oDataForm.PrintingReq_Review) {
				oParam.Fieldvalue = oDataForm.PrintingReq_Review.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrintingReq_Review);

			oParam.Fieldname = "PrintingReq_Comments";
			uParam.Fieldname = "PrintingReq_Comments";
			oParam.Fieldvalue = oDataForm.PrintingReq_Comments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.PrintingReq_Comments);

			oParam.Fieldname = "SecurityReviewComments";
			uParam.Fieldname = "SecurityReviewComments";

			oParam.Fieldvalue = oDataForm.securityReviewComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.securityReviewComments);

			oParam.Fieldname = "SecurityRating";
			uParam.Fieldname = "SecurityRating";
			if (oDataForm.Rating) {
				oParam.Fieldvalue = oDataForm.Rating.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadFormDataSuccess.Rating);

			this.updateUserAcceptanceFormFS();
			this.updateCommLogFormFS();
		},

		updateUserAcceptanceFormFS: function() {
			var oDataForm = this.getView().getModel("enhData").getData();

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

			for (var n = 0; n < oDataForm.userAcceptance.length; n++) {
				var index = parseInt(oDataForm.userAcceptance[n].Index);

				globalUserAcceptanceArray[index].Step = oDataForm.userAcceptance[n].step;
				globalUserAcceptanceArray[index].TestType = oDataForm.userAcceptance[n].testType;
				globalUserAcceptanceArray[index].Scenario = oDataForm.userAcceptance[n].scenario;
				globalUserAcceptanceArray[index].TestData = oDataForm.userAcceptance[n].testData;
				globalUserAcceptanceArray[index].StepsPer = oDataForm.userAcceptance[n].stepsPer;
				globalUserAcceptanceArray[index].ActualResults = oDataForm.userAcceptance[n].actualResults;
				globalUserAcceptanceArray[index].ExpectedResults = oDataForm.userAcceptance[n].expectedResults;
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

							//eData.Index = globalUserAcceptanceArray[j].Index;
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

					//globalUserAcceptanceArray[i].Index = globalUserAcceptanceArray.length-1;
				}
			}

			var maxExistingUATCount = 0;

			for (var e = 0; e < globalUserAcceptanceArray.length; e++) {
				if (globalUserAcceptanceArray[e].Existance === "E") {
					maxExistingUATCount = maxExistingUATCount + 1;
				}
			}

			for (var a = 0; a < globalUserAcceptanceArray.length; a++) {
			// for (var a = 0; a < 4; a++) {
				var userAcceptanceTable;
				var userAcceptanceTblMulti;

				if (globalUserAcceptanceArray[a].Existance === "N") {
					maxExistingUATCount = maxExistingUATCount + 1;
					globalUserAcceptanceArray[a].FieldName = "UA" + maxExistingUATCount.toString();
					userAcceptanceTable = Object.keys(globalUserAcceptanceArray[a]).map(function(key) {
						if (key !== "Index" && key !== "FieldName" && key !== "Existance") {
							return [globalUserAcceptanceArray[a][key]];
						}
					});

					userAcceptanceTblMulti = userAcceptanceTable.join("~");
					userAcceptanceTblMulti = userAcceptanceTblMulti.substr(2, userAcceptanceTblMulti.length - 3);

					oParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					uParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					oParam.Fieldvalue = userAcceptanceTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, false);
				} else if (globalUserAcceptanceArray[a].Existance === "E") {
					userAcceptanceTable = Object.keys(globalUserAcceptanceArray[a]).map(function(key) {
						if (key !== "Index" && key !== "FieldName" && key !== "Existance") {
							return [globalUserAcceptanceArray[a][key]];
						}
					});

					userAcceptanceTblMulti = userAcceptanceTable.join("~");
					userAcceptanceTblMulti = userAcceptanceTblMulti.substr(2, userAcceptanceTblMulti.length - 3);

					oParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					uParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					oParam.Fieldvalue = userAcceptanceTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, true);
				} else if (globalUserAcceptanceArray[a].Existance === "D") {
					/*userAcceptanceTable = Object.keys(globalUserAcceptanceArray[a]).map(function(key) 
					{
						if (key !== "Index" && key !== "FieldName" && key !== "Existance") 
						{
							return [globalUserAcceptanceArray[a][key]];
						}
					});

					userAcceptanceTblMulti = userAcceptanceTable.join("~");
					userAcceptanceTblMulti = userAcceptanceTblMulti.substr(2, userAcceptanceTblMulti.length - 3);*/

					oParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					uParam.Fieldname = globalUserAcceptanceArray[a].FieldName;
					//oParam.Fieldvalue = userAcceptanceTblMulti;
					callServices.fnRemoveInMainTable(oParam);
				}
			}

		},

		updateCommLogFormFS: function() {
			var oDataForm = this.getView().getModel("enhData").getData();

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

			for (var n = 0; n < oDataForm.commLog.length; n++) {
				var index = parseInt(oDataForm.commLog[n].Index);

				globalCommLogArray[index].IssueDesc = oDataForm.commLog[n].IssueDesc;
				globalCommLogArray[index].Priority = oDataForm.commLog[n].Priority;
				globalCommLogArray[index].DateLogg = oDataForm.commLog[n].DateLogg;
				globalCommLogArray[index].Status = oDataForm.commLog[n].Status;
				globalCommLogArray[index].DateResol = oDataForm.commLog[n].DateResol;
				globalCommLogArray[index].Resolv = oDataForm.commLog[n].Resolv;
				globalCommLogArray[index].AssignedTo = oDataForm.commLog[n].AssignedTo;
			}

			for (var i = 0; i < globalCommLogArray.length; i++) {
				if (globalCommLogArray[i].Existance === "D") {
					for (var j = globalCommLogArray.length - 1; j > i; j--) {
						if (globalCommLogArray[j].Existance === "E") {
							var dData = {};
							var eData = {};

							dData.IssueDesc = globalCommLogArray[i].IssueDesc;
							dData.Priority = globalCommLogArray[i].Priority;
							dData.DateLogg = globalCommLogArray[i].DateLogg;
							dData.Status = globalCommLogArray[i].Status;
							dData.DateResol = globalCommLogArray[i].DateResol;
							dData.Resolv = globalCommLogArray[i].Resolv;
							dData.AssignedTo = globalCommLogArray[i].AssignedTo;
							dData.Existance = globalCommLogArray[i].Existance;

							eData.IssueDesc = globalCommLogArray[j].IssueDesc;
							eData.Priority = globalCommLogArray[j].Priority;
							eData.DateLogg = globalCommLogArray[j].DateLogg;
							eData.Status = globalCommLogArray[j].Status;
							eData.DateResol = globalCommLogArray[j].DateResol;
							eData.Resolv = globalCommLogArray[j].Resolv;
							eData.AssignedTo = globalCommLogArray[j].AssignedTo;
							eData.Existance = globalCommLogArray[j].Existance;

							globalCommLogArray[i].IssueDesc = eData.IssueDesc;
							globalCommLogArray[i].Priority = eData.Priority;
							globalCommLogArray[i].DateLogg = eData.DateLogg;
							globalCommLogArray[i].Status = eData.Status;
							globalCommLogArray[i].DateResol = eData.DateResol;
							globalCommLogArray[i].Resolv = eData.Resolv;
							globalCommLogArray[i].AssignedTo = eData.AssignedTo;
							globalCommLogArray[i].Existance = eData.Existance;

							globalCommLogArray[j].IssueDesc = dData.IssueDesc;
							globalCommLogArray[j].Priority = dData.Priority;
							globalCommLogArray[j].DateLogg = dData.DateLogg;
							globalCommLogArray[j].Status = dData.Status;
							globalCommLogArray[j].DateResol = dData.DateResol;
							globalCommLogArray[j].Resolv = dData.Resolv;
							globalCommLogArray[j].AssignedTo = dData.AssignedTo;
							globalCommLogArray[j].Existance = dData.Existance;

							break;
						} else {
							continue;
						}
					}

					//globalUserAcceptanceArray[i].Index = globalUserAcceptanceArray.length-1;
				}
			}

			var maxExistingCLCount = 0;

			for (var e = 0; e < globalCommLogArray.length; e++) {
				if (globalCommLogArray[e].Existance === "E") {
					maxExistingCLCount = maxExistingCLCount + 1;
				}
			}

			for (var a = 0; a < globalCommLogArray.length; a++) {
			// for (var a = 0; a < 4; a++) {
				var commLogTable;
				var commLogTblMulti;

				if (globalCommLogArray[a].Existance === "N") {
					maxExistingCLCount = maxExistingCLCount + 1;
					globalCommLogArray[a].FieldName = "CL" + maxExistingCLCount.toString();
					commLogTable = Object.keys(globalCommLogArray[a]).map(function(key) {
						if (key !== "Index" && key !== "FieldName" && key !== "Existance") {
							return [globalCommLogArray[a][key]];
						}
					});

					commLogTblMulti = commLogTable.join("~");
					commLogTblMulti = commLogTblMulti.substr(2, commLogTblMulti.length - 3);

					oParam.Fieldname = globalCommLogArray[a].FieldName;
					uParam.Fieldname = globalCommLogArray[a].FieldName;
					oParam.Fieldvalue = commLogTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, false);
				} else if (globalCommLogArray[a].Existance === "E") {
					commLogTable = Object.keys(globalCommLogArray[a]).map(function(key) {
						if (key !== "Index" && key !== "FieldName" && key !== "Existance") {
							return [globalCommLogArray[a][key]];
						}
					});

					commLogTblMulti = commLogTable.join("~");
					commLogTblMulti = commLogTblMulti.substr(2, commLogTblMulti.length - 3);

					oParam.Fieldname = globalCommLogArray[a].FieldName;
					uParam.Fieldname = globalCommLogArray[a].FieldName;
					oParam.Fieldvalue = commLogTblMulti;
					callServices.fnUpdateInMainTable(oParam,
						uParam, true);
				} else if (globalCommLogArray[a].Existance === "D") {
					oParam.Fieldname = globalCommLogArray[a].FieldName;
					uParam.Fieldname = globalCommLogArray[a].FieldName;
					callServices.fnRemoveInMainTable(oParam);
				}
			}

		},

		updateEnhancementFS: function() {
			var oDataEnhancement = this.getView().getModel("enhData").getData();

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
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Status_FS);

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataEnhancement.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Approver);

			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataEnhancement.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Reviewer);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataEnhancement.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Author);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataEnhancement.ObjectId;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjectId);

			oParam.Fieldname = "Object Title";
			uParam.Fieldname = "Object Title";
			oParam.Fieldvalue = oDataEnhancement.ObjectTitle;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjectTitle);

			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.oDataProcessAreaMulti);

			oParam.Fieldname = "Sub Process Area";
			uParam.Fieldname = "Sub%20Process%20Area";
			oParam.Fieldvalue = oDataEnhancement.SubProcessArea;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.SubProcessArea);

			oParam.Fieldname = "Impact";
			uParam.Fieldname = "impact";
			oParam.Fieldvalue = oDataEnhancement.impact;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.impact);

			//oParam.Fieldname = "Dependencies";
			//uParam.Fieldname = "dependencies";
			//oParam.Fieldvalue = oDataEnhancement.dependencies;
			//callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.dependencies);

			oParam.Fieldname = "Dependencies";
			uParam.Fieldname = "Dependencies";
			oParam.Fieldvalue = oDataEnhancement.Dependencies;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Dependencies);

			oParam.Fieldname = "Assumptions";
			uParam.Fieldname = "Assumptions";
			oParam.Fieldvalue = oDataEnhancement.Assumptions;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Assumptions);

			oParam.Fieldname = "HTTPSSFTP";
			uParam.Fieldname = "HTTPSSFTP";
			oParam.Fieldvalue = oDataEnhancement.HTTPS_SFTP_;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.HTTPS_SFTP_);

			oParam.Fieldname = "UserAuthorization";
			uParam.Fieldname = "UserAuthorization";
			oParam.Fieldvalue = oDataEnhancement.UserAuth;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.UserAuth);

			oParam.Fieldname = "Encryption";
			uParam.Fieldname = "Encryption";
			oParam.Fieldvalue = oDataEnhancement.Encryp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Encryp);

			oParam.Fieldname = "Story Number/Comment";
			uParam.Fieldname = "Story%20Number%2FComment";
			oParam.Fieldvalue = oDataEnhancement.StoryNumberComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.StoryNumberComment);

			oDataEnhancement.Complexity = this.byId("Comp").getSelectedButton().getText();
			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataEnhancement.Complexity;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Complexity);

			oParam.Fieldname = "Enhancement Requirement";
			uParam.Fieldname = "Enhancement Requirement";
			oParam.Fieldvalue = oDataEnhancement.ObjectIdEnhancementRequirement;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ObjectIdEnhancementRequirement);

			oParam.Fieldname = "Security Review/Comments";
			uParam.Fieldname = "Security%20Review%2FComments";
			oParam.Fieldvalue = oDataEnhancement.securityReviewComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.securityReviewComments);

			oParam.Fieldname = "Security Comments";
			uParam.Fieldname = "Security%20Comments";
			oParam.Fieldvalue = oDataEnhancement.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.securityComments);

			oParam.Fieldname = "Review/Comments";
			uParam.Fieldname = "Review%2FComments";
			oParam.Fieldvalue = oDataEnhancement.ReviewComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewComments);

			oParam.Fieldname = "Review/CommentsRating";
			uParam.Fieldname = "Review%2FCommentsRating";
			if (oDataEnhancement.ReviewCommentsRating) {
				oParam.Fieldvalue = oDataEnhancement.ReviewCommentsRating.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewCommentsRating);
			oParam.Fieldname = "IMP_Comments";
			uParam.Fieldname = "IMP_Comments";
			oParam.Fieldvalue = oDataEnhancement.IMPComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.IMPComments);

			oParam.Fieldname = "Imp_Review";
			uParam.Fieldname = "Imp_Review";
			if (oDataEnhancement.ImpReview) {
				oParam.Fieldvalue = oDataEnhancement.ImpReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ImpReview);
			oParam.Fieldname = "Review_Comments_rc";
			uParam.Fieldname = "Review_Comments_rc";
			oParam.Fieldvalue = oDataEnhancement.ReviewComments_rc;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewComments_rc);

			oParam.Fieldname = "Review_CommentsRating_rc";
			uParam.Fieldname = "Review_CommentsRating_rc";
			if (oDataEnhancement.ReviewCommentsRating_rc) {
				oParam.Fieldvalue = oDataEnhancement.ReviewCommentsRating_rc.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.ReviewCommentsRating_rc);

			oParam.Fieldname = "Security Review Rating";
			uParam.Fieldname = "Security%20Review%20Rating";
			if (oDataEnhancement.Rating) {
				oParam.Fieldvalue = oDataEnhancement.Rating.toString();
			} else {
				oParam.Fieldvalue = "0";
			}

			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.Rating);

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

			oParam.Fieldname = "Security";
			uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadEnhanDataSuccess.security);

			// User Acceptance Starts
			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataEnhancement.userAcceptance.length; iCountUA++) {
				oDataEnhancement.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataEnhancement.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
			}
			// User Acceptance Ends

			// Comm Log Starts
			var iCountCommLog, oCommLogEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataEnhancement.CommLog.length; iCountCommLog++) {
				oDataEnhancement.CommLogTemp = "";
				oParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CommLog_" + (iCountCommLog + 1);
				oCommLogEntry = oDataEnhancement.CommLog[iCountCommLog];

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
			// Comm Log Ends

			// Req Custom Table Starts
			var iCountCustTable, oCustTableEntry, sCustTableEntry;

			for (iCountCustTable = 0; iCountCustTable < oDataEnhancement.reqCustTable.length; iCountCustTable++) {
				oDataEnhancement.reqCustTableTemp = "";
				oParam.Fieldname = "FS_ReqCustTable_" + (iCountCustTable + 1);
				uParam.Fieldname = "FS_ReqCustTable_" + (iCountCustTable + 1);
				oCustTableEntry = oDataEnhancement.reqCustTable[iCountCustTable];
				sCustTableEntry = oCustTableEntry.tableName + "~" + oCustTableEntry.fieldName + "~" + oCustTableEntry.fieldDesc + "~" +
					oCustTableEntry.fieldType + "~" +
					oCustTableEntry.fieldLength + "~" + oCustTableEntry.valRestrictions + "~" + oCustTableEntry.sourceTable;
				oParam.Fieldvalue = sCustTableEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oCustTableEntry.flag);
			}
			// Req Custom Table Ends
		},

		updateWorkFlowFS: function() {
			sap.ui.getCore().SucessFlag = false;
			var oDataWorkflow = this.getView().getModel("enhData").getData();
			var oDataProcessArea = this.getView().byId("processarea").getSelectedKeys();
			var oDataProcessAreaMulti = oDataProcessArea.join("~");
			var oDataDependencyAssumpCheckBx = [];
			if (this.getView().byId("DependencyConfiguration").getSelected()) {
				oDataDependencyAssumpCheckBx.push(this.getView().byId("DependencyConfiguration").getText());
			}
			if (this.getView().byId("DependencyDevelopment").getSelected()) {
				oDataDependencyAssumpCheckBx.push(this.getView().byId("DependencyDevelopment").getText());
			}
			if (this.getView().byId("DependencyExecution").getSelected()) {
				oDataDependencyAssumpCheckBx.push(this.getView().byId("DependencyExecution").getText());
			}
			var oDataDependencyAssumpCheckBxMulti = oDataDependencyAssumpCheckBx.join("~");

			var oDataSpecialReqCheckBx = [];
			if (this.getView().byId("CB_SPREQ_01").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_01").getText());
			}
			if (this.getView().byId("CB_SPREQ_02").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_02").getText());
			}
			if (this.getView().byId("CB_SPREQ_03").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_03").getText());
			}
			if (this.getView().byId("CB_SPREQ_04").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_04").getText());
			}
			if (this.getView().byId("CB_SPREQ_05").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_05").getText());
			}
			if (this.getView().byId("CB_SPREQ_06").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_06").getText());
			}
			if (this.getView().byId("CB_SPREQ_07").getSelected()) {
				oDataSpecialReqCheckBx.push(this.getView().byId("CB_SPREQ_07").getText());
			}

			var oDataSpecialReqCheckBxMulti = oDataSpecialReqCheckBx.join("~");

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

			var oDataTriggerPtRadioBtn = [];
			if (this.getView().byId("triggerPntBtn1").getSelected()) {
				// oDataTriggerPtRadioBtn = this.getView().byId("triggerPntBtn1").getText();
				oDataTriggerPtRadioBtn.push(this.getView().byId("triggerPntBtn1").getText());
			}
			if (this.getView().byId("triggerPntBtn2").getSelected()) {
				// oDataTriggerPtRadioBtn = this.getView().byId("triggerPntBtn2").getText();
				oDataTriggerPtRadioBtn.push(this.getView().byId("triggerPntBtn2").getText());
			}
			if (this.getView().byId("triggerPntBtn3").getSelected()) {
				// oDataTriggerPtRadioBtn = this.getView().byId("triggerPntBtn3").getText();
				oDataTriggerPtRadioBtn.push(this.getView().byId("triggerPntBtn3").getText());
			}
			if (this.getView().byId("triggerPntBtn4").getSelected()) {
				// oDataTriggerPtRadioBtn = this.getView().byId("triggerPntBtn3").getText();
				oDataTriggerPtRadioBtn.push(this.getView().byId("triggerPntBtn4").getText());
			}
			var oDataTriggerPtCheckBxMulti = oDataTriggerPtRadioBtn.join("~");
			var oDataselectionScreenVal = "";
			if (this.getView().byId("CB_SCV").getSelected()) {
				oDataselectionScreenVal = this.getView().byId("CB_SCV").getText();
			}

			/*	var oDataImpactedSys = this.getView().byId("multiImpacted").getSelectedKeys();
				var oDataImpacSysMulti = oDataImpactedSys.join("~");*/

			var oDataUserIntRadioBtn;
			if (this.getView().byId("UITypeBtn1").getSelected()) {
				oDataUserIntRadioBtn = this.getView().byId("UITypeBtn1").getText();
			} else if (this.getView().byId("UITypeBtn2").getSelected()) {
				oDataUserIntRadioBtn = this.getView().byId("UITypeBtn2").getText();
			} else if (this.getView().byId("UITypeBtn3").getSelected()) {
				oDataUserIntRadioBtn = this.getView().byId("UITypeBtn3").getText();
			} else if (this.getView().byId("UITypeBtn4").getSelected()) {
				oDataUserIntRadioBtn = this.getView().byId("UITypeBtn4").getText();
			} else if (this.getView().byId("UITypeBtn5").getSelected()) {
				oDataUserIntRadioBtn = this.getView().byId("UITypeBtn5").getText();
			}

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

			// if (oDataWorkflow.CommLog[0]) {
			// 	var commLogTbl1 = Object.keys(oDataWorkflow.CommLog[0]).map(function(key) {
			// 		return [oDataWorkflow.CommLog[0][key]];
			// 	});

			// 	var commLogTbl1Multi = commLogTbl1.join("~");
			// }

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

			//	mParameter.datetime = "W/"datetime'2018-02-07T16%3A42%3A43'"";

			//	var t = "W/\"datetimeoffset'2017-05-05T09%3A15%3A05.6050000Z'\"";

			oParam.Fieldname = "STATUS_FS";
			uParam.Fieldname = "STATUS_FS";
			oParam.Fieldvalue = 'SAVED';
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.STATUS_FS);

			//added by utkarsh
			if (this.CROpen !== "") {
				oParam.Version = '1.0';
				uParam.Version = '1.0';
				oParam.Fieldname = "CRDetails";
				uParam.Fieldname = "CRDetails";
				oParam.Fieldvalue = this.CROpen;
				callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CRDetails);
				oParam.Version = versionno[1];
				uParam.Version = versionno[1];
			}

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

			/*		oParam.Fieldname = "ErrorHandlingReview";
					uParam.Fieldname = "ErrorHandlingReview";
					if (oDataWorkflow.ErrorHandlingReview) {
						oParam.Fieldvalue = oDataWorkflow.ErrorHandlingReview.toString();
					} else {
						oParam.Fieldvalue = "0";
					}
					callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorHandlingReview);*/

			oParam.Fieldname = "ErrorHandlingReview";
			uParam.Fieldname = "ErrorHandlingReview";
			if (oDataWorkflow.ErrorHandlingReview) {
				oParam.Fieldvalue = oDataWorkflow.ErrorHandlingReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorHandlingReview);

			oParam.Fieldname = "SecurityReview";
			uParam.Fieldname = "SecurityReview";
			if (oDataWorkflow.SecurityReview) {
				oParam.Fieldvalue = oDataWorkflow.SecurityReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SecurityReview);

			oParam.Fieldname = "LoadDetailsReview";
			uParam.Fieldname = "LoadDetailsReview";
			if (oDataWorkflow.LoadDetailsReview) {
				oParam.Fieldvalue = oDataWorkflow.LoadDetailsReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.LoadDetailsReview);

			oParam.Fieldname = "SelectionScreenReview";
			uParam.Fieldname = "SelectionScreenReview";
			if (oDataWorkflow.SelectionScreenReview) {
				oParam.Fieldvalue = oDataWorkflow.SelectionScreenReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SelectionScreenReview);

			oParam.Fieldname = "SelectionScreenComments";
			uParam.Fieldname = "SelectionScreenComments";
			oParam.Fieldvalue = oDataWorkflow.SelectionScreenComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SelectionScreenComments);

			oParam.Fieldname = "FDSReview";
			uParam.Fieldname = "FDSReview";
			if (oDataWorkflow.FDSReview) {
				oParam.Fieldvalue = oDataWorkflow.FDSReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.FDSReview);

			oParam.Fieldname = "FDSComments";
			uParam.Fieldname = "FDSComments";
			oParam.Fieldvalue = oDataWorkflow.FDSComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.FDSComments);

			oParam.Fieldname = "ARReview";
			uParam.Fieldname = "ARReview";
			if (oDataWorkflow.ARReview) {
				oParam.Fieldvalue = oDataWorkflow.ARReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ARReview);

			oParam.Fieldname = "ARComments";
			uParam.Fieldname = "ARComments";
			oParam.Fieldvalue = oDataWorkflow.ARComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ARComments);

			oParam.Fieldname = "SRReview";
			uParam.Fieldname = "SRReview";
			if (oDataWorkflow.SRReview) {
				oParam.Fieldvalue = oDataWorkflow.SRReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SRReview);

			oParam.Fieldname = "SRComments";
			uParam.Fieldname = "SRComments";
			oParam.Fieldvalue = oDataWorkflow.SRComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SRComments);

			oParam.Fieldname = "ACReview";
			uParam.Fieldname = "ACReview";
			if (oDataWorkflow.ACReview) {
				oParam.Fieldvalue = oDataWorkflow.ACReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ACReview);

			oParam.Fieldname = "ACComments";
			uParam.Fieldname = "ACComments";
			oParam.Fieldvalue = oDataWorkflow.ACComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ACComments);

			oParam.Fieldname = "ErrorHandlingCommentsEH";
			uParam.Fieldname = "ErrorHandlingCommentsEH";
			if (oDataWorkflow.ErrorHandlingCommentsEH) {
				oParam.Fieldvalue = oDataWorkflow.ErrorHandlingCommentsEH.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorHandlingCommentsEH);

			oParam.Fieldname = "ErrorHandlingReview";
			uParam.Fieldname = "ErrorHandlingReview";
			oParam.Fieldvalue = oDataWorkflow.ErrorHandlingReview;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ErrorHandlingReview);

			oParam.Fieldname = "ANReview";
			uParam.Fieldname = "ANReview";
			if (oDataWorkflow.ANReview) {
				oParam.Fieldvalue = oDataWorkflow.ANReview.toString();
			} else {
				oParam.Fieldvalue = "0";
			}
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ANReview);

			oParam.Fieldname = "ANComments";
			uParam.Fieldname = "ANComments";
			oParam.Fieldvalue = oDataWorkflow.ANComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ANComments);

			oParam.Fieldname = "LoadDetailsComments";
			uParam.Fieldname = "LoadDetailsComments";
			oParam.Fieldvalue = oDataWorkflow.LoadDetailsComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.LoadDetailsComments);

			oParam.Fieldname = "Security Comments";
			uParam.Fieldname = "Security Comments";
			oParam.Fieldvalue = oDataWorkflow.SecurityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SecurityComments);

			/////

			/*	mParameter.datetime = "W/"datetime'2018-02-07T16%3A42%3A43'"";
				uParameter.datetime = "W/"datetime'2018-02-07T16%3A42%3A43'"";*/

			oParam.Fieldname = "Approver";
			uParam.Fieldname = "Approver";
			oParam.Fieldvalue = oDataWorkflow.Approver;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Approver);

			oParam.Fieldname = "Reviewer";
			uParam.Fieldname = "Reviewer";
			oParam.Fieldvalue = oDataWorkflow.Reviewer;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Reviewer);

			oParam.Fieldname = "Author";
			uParam.Fieldname = "Author";
			oParam.Fieldvalue = oDataWorkflow.Author;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Author);

			oParam.Fieldname = "Object ID";
			uParam.Fieldname = "Object ID";
			oParam.Fieldvalue = oDataWorkflow.ObjectId;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ObjectId);

			oParam.Fieldname = "Object Description";
			uParam.Fieldname = "Object Description";
			oParam.Fieldvalue = oDataWorkflow.ObjectDescrp;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ObjectDescrp);

			// oParam.fieldname = "Standard Transaction Text";
			// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "StanTransactText", this.oReadWflDataSuccess);

			// oParam.fieldname = "Custom Transaction Text";
			// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "CustmTransactText", this.oReadWflDataSuccess);

			// oParam.fieldname = "Manual Transaction Text";
			// callServices.fnGetDataMainTable(oParam, oDataWorkflow, "MannulTransactText", this.oReadWflDataSuccess);

			oParam.Fieldname = "Standard Transaction Text";
			uParam.Fieldname = "Standard Transaction Text";
			oParam.Fieldvalue = oDataWorkflow.StanTransactText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.StanTransactText);

			oParam.Fieldname = "Custom Transaction Text";
			uParam.Fieldname = "Custom Transaction Text";
			oParam.Fieldvalue = oDataWorkflow.CustmTransactText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CustmTransactText);

			oParam.Fieldname = "Manual Transaction Text";
			uParam.Fieldname = "Manual Transaction Text";
			oParam.Fieldvalue = oDataWorkflow.MannulTransactText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.MannulTransactText);

			oParam.Fieldname = "Other triggerPt Text";
			uParam.Fieldname = "Other triggerPt Text";
			oParam.Fieldvalue = oDataWorkflow.TrigptOtherText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.TrigptOtherText);

			oParam.Fieldname = "End Point";
			uParam.Fieldname = "End Point";
			oParam.Fieldvalue = oDataWorkflow.EndPoint;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.EndPoint);

			oParam.Fieldname = "Special Requirement Text";
			uParam.Fieldname = "Special Requirement Text";
			oParam.Fieldvalue = oDataWorkflow.SpecialReqText;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.SpecialReqText);

			oParam.Fieldname = "User Interface";
			uParam.Fieldname = "User Interface";
			oParam.Fieldvalue = oDataUserIntRadioBtn;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.UserInterface);

			oParam.Fieldname = "Process Area";
			uParam.Fieldname = "Process Area";
			oParam.Fieldvalue = oDataProcessAreaMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.ProcessArea);

			oDataWorkflow.Complexity = this.byId("Comp").getSelectedButton().getText();
			oParam.Fieldname = "Complexity";
			uParam.Fieldname = "Complexity";
			oParam.Fieldvalue = oDataWorkflow.Complexity;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Complexity);

			oParam.Fieldname = "Trigger Point";
			uParam.Fieldname = "Trigger Point";
			oParam.Fieldvalue = oDataTriggerPtCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.TriggerPoint);

			oParam.Fieldname = "Object Details Business Requirement Process Flow";
			uParam.Fieldname = "Object Details Business Requirement Process Flow";
			oParam.Fieldvalue = oDataWorkflow.objectDetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.objectDetails);

			oParam.Fieldname = "Design Details";
			uParam.Fieldname = "Design Details";
			oParam.Fieldvalue = oDataWorkflow.objectDesigndetails;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.objectDesigndetails);

			oParam.Fieldname = "Workflow Detailed Process Description";
			uParam.Fieldname = "Workflow Detailed Process Description";
			oParam.Fieldvalue = oDataWorkflow.objectworkflowDetailsProcessDesc;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.objectworkflowDetailsProcessDesc);

			oParam.Fieldname = "Approval Roles";
			uParam.Fieldname = "Approval Roles";
			oParam.Fieldvalue = oDataWorkflow.approvalRoles;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.approvalRoles);

			oParam.Fieldname = "Dependency Assumptions";
			uParam.Fieldname = "Dependency Assumptions";
			oParam.Fieldvalue = oDataDependencyAssumpCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.dependencyAssumptions);

			oParam.Fieldname = "Special Requirements";
			uParam.Fieldname = "Special Requirements";
			oParam.Fieldvalue = oDataSpecialReqCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.specialRequirements);

			oParam.Fieldname = "Alert Notification";
			uParam.Fieldname = "Alert Notification";
			oParam.Fieldvalue = oDataWorkflow.alertNotif;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.alertNotif);

			oParam.Fieldname = "Assumption Comments";
			uParam.Fieldname = "Assumption Comments";
			oParam.Fieldvalue = oDataWorkflow.AssumptionComment;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.AssumptionComment);

			oParam.Fieldname = "Error Handling";
			uParam.Fieldname = "Error Handling";
			oParam.Fieldvalue = oDataWorkflow.errorHandling;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.errorHandling);

			oParam.Fieldname = "WorkFlow Error Handling Checkbox";
			uParam.Fieldname = "WorkFlow Error Handling Checkbox";
			oParam.Fieldvalue = oDataselectionScreenVal;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.selectionScreenVal);

			oParam.Fieldname = "Security";
			uParam.Fieldname = "Security";
			oParam.Fieldvalue = oDataSecurityCheckBxMulti;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.security);

			oParam.Fieldname = "Security Comments";
			uParam.Fieldname = "Security Comments";
			oParam.Fieldvalue = oDataWorkflow.securityComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.securityComments);

			oParam.Fieldname = "Review Comments";
			uParam.Fieldname = "Review Comments";
			oParam.Fieldvalue = oDataWorkflow.securityReviewComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.securityReviewComments);

			oParam.Fieldname = "Rating";
			uParam.Fieldname = "Rating";
			oParam.Fieldvalue = String(oDataWorkflow.Rating);
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.Rating);

			oParam.Fieldname = "WF Review Comments";
			uParam.Fieldname = "WF Review Comments";
			oParam.Fieldvalue = oDataWorkflow.WFReviewComments;
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFReviewComments);

			oParam.Fieldname = "WF Rating";
			uParam.Fieldname = "WF Rating";
			oParam.Fieldvalue = String(oDataWorkflow.WFRatings);
			callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.WFRatings);

			// oParam.Fieldname = "UA1";
			// uParam.Fieldname = "UA1";
			// oParam.Fieldvalue = userAcceptTbl1Multi;
			// callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.userAccept1);

			// if (oDataWorkflow.userAcceptance[1]) {
			// 	oParam.Fieldname = "UA2";
			// 	uParam.Fieldname = "UA2";
			// 	oParam.Fieldvalue = userAcceptTbl2Multi;
			// 	callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.userAccept2);
			// }
			// if (oDataWorkflow.CommLog[0]) {
			// 	oParam.Fieldname = "CommLog";
			// 	uParam.Fieldname = "CommLog";
			// 	oParam.Fieldvalue = commLogTbl1Multi;
			// 	callServices.fnUpdateInMainTable(oParam, uParam, this.oReadWflDataSuccess.CommLog1);
			// }

			var iCountUA, oUAEntry, sUAEntry;

			for (iCountUA = 0; iCountUA < oDataWorkflow.userAcceptance.length; iCountUA++) {

				oDataWorkflow.userAcceptTemp = "";
				oParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				uParam.Fieldname = "FS_UA_" + (iCountUA + 1);
				oUAEntry = oDataWorkflow.userAcceptance[iCountUA];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);

			}

			var iCountCommLog, oCommLoggEntry, sCommLogEntry;

			for (iCountCommLog = 0; iCountCommLog < oDataWorkflow.CommLog.length; iCountCommLog++) {

				oDataWorkflow.CommLogTemp = "";
				oParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);
				uParam.Fieldname = "FS_CMLOG_" + (iCountCommLog + 1);
				oCommLoggEntry = oDataWorkflow.CommLog[iCountCommLog];

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

		},

		handleMessagePopoverPress: function(oEvent) {

			// if(sap.ui.getCore().SucessFlag === true)
			// {
			// 	var temp = sap.ui.getCore().oMessagePopover.getModel().getData();
			// 	temp.push({type: "Success",
			// 	title: "Fields Updated",
			// 	description: "All other fields updated",
			// 	icon: "sap-icon://message-success"});
			// 	sap.ui.getCore().oMessagePopover.getModel().setData(temp);
			// 	sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
			// }
			// else
			// {
			// 	sap.ui.getCore().oMessagePopover.openBy(oEvent.getSource());
			// }

			var temp = sap.ui.getCore().oMessagePopover.getModel().getData();
			var newarray = temp.filter(function(el) {
				return el.type !== "Success";
			});
			//			var success = temp.find(o => o.type === 'Success');
			//			var error = temp.find(o => o.type === 'Error');
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
		onSave: function(oEvent) {

			var that = this;
			sap.m.MessageBox.show(
				"Do You want to save the data", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {

						if (oAction === "YES") {
							that.onConfirmSave();
							that.byId("oBTPrint").setVisible(true);
						}

					}
				}
			);
			this.getReviewDataWFLW(false);

		},
		addNewRowUA: function() {
			var type = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Projectkey;

			if (type === "FRM") {
				var uaIndex = globalUserAcceptanceArray.length;

				this.getView().getModel("enhData").getData().userAcceptance.push({
					Index: uaIndex.toString(),
					FieldName: "",
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
				globalUserAcceptanceArrayData.FieldName = "";
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
				//var uaIndex = this.getView().getModel("enhData").getData().userAcceptance.length;

				this.getView().getModel("enhData").getData().userAcceptance.push({
					//Index: uaIndex.toString(),
					//FieldName: "", //"UA" + (uaIndex + 1).toString(),
					step: "",
					testType: "",
					scenario: "",
					stepsPer: "",
					actualResults: "",
					expectedResults: "",
					flag: false
				});
			}

			this.getView().getModel("enhData").refresh();
		},
		// deleteRowUA: function(oEvent) {

		// 	if (this.getView().getModel("enhData").getData().userAcceptance.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/userAcceptance/")[1];
		// 		var counter = parseInt(this.getView().getModel("enhData").getData().userAcceptance[index].Index);
		// 		this.getView().getModel("enhData").getData().userAcceptance.splice(index, 1);

		// 		if (globalUserAcceptanceArray[counter].Existance === "E") {
		// 			globalUserAcceptanceArray[counter].Existance = "D";
		// 		} else if (globalUserAcceptanceArray[counter].Existance === "N") {
		// 			globalUserAcceptanceArray.splice(counter, 1);

		// 			for (var i = 0; i < globalUserAcceptanceArray.length; i++) {
		// 				globalUserAcceptanceArray[i].Index = i;
		// 			}
		// 		}

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
		},

		onConfirmDelete: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
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
			if (this.getView().getModel("enhData").getData().userAcceptance.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/userAcceptance/")[1];
				// var index1 = this.getView().getModel("enhData").getData().userAcceptance.length;
				var FieldnameIndex = parseInt(index) + 1
				oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[index];
				sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
					oUAEntry.stepsPer + "~" + oUAEntry.actualResults + oUAEntry.expectedResults;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_UA_" + FieldnameIndex;
				this.deleteUserCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().userAcceptance.length === 1) {
				oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[0];
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
						if (that.getView().getModel("enhData").getData().userAcceptance.length === 1) {
							that.getView().getModel("enhData").getData().userAcceptance.splice(0, 1);

							that.getView().getModel("enhData").getData().userAcceptance.push({
								step: "",
								testType: "",
								scenario: "",
								testData: "",
								stepsPer: "",
								actualResults: "",
								expectedResults: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().userAcceptance.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							//that.updateUserAcc(oParam, uParam);
							that.updateUserAccEnhancement(oParam, uParam, index);
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

		updateUserAccEnhancement: function(oParam, uParam, index) {
			var that = this;
			var oUAEntry, sUAEntry;
			var aErrorMsgData = [];
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var iCountUA,
				slength;

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

				slength = this.getView().getModel("enhData").getData().userAcceptance.length;
				iCountUA = index;
				for (iCountUA; iCountUA < slength; iCountUA++) {
					//Update value
					var FieldnameIndex = parseInt(iCountUA) + 1;
					oParam.Fieldname = "FS_UA_" + FieldnameIndex;
					uParam.Fieldname = "FS_UA_" + FieldnameIndex;
					oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[index];
					sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
						oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
					oParam.Fieldvalue = sUAEntry;
					oUAEntry.flag = false;
					callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
					// Delete Value
					oParam.Fieldname = "FS_UA_" + (FieldnameIndex + 1);
					uParam.Fieldname = "FS_UA_" + (FieldnameIndex + 1);
					oUAEntry = this.getView().getModel("enhData").getData().userAcceptance[index];
					sUAEntry = oUAEntry.step + "~" + oUAEntry.testType + "~" + oUAEntry.scenario + "~" + oUAEntry.testData + "~" +
						oUAEntry.stepsPer + "~" + oUAEntry.actualResults + "~" + oUAEntry.expectedResults;
					oParam.Fieldvalue = sUAEntry;
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
										testData: "",
										stepsPer: "",
										actualResults: "",
										expectedResults: "",
										flag: false
									});
								} else {
									//do nothing
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
				} //For loop 
			} else {
				// DO NOTHING
			}

		}, //update after delete

		addNewRowComLog: function() {
			var type = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo.Projectkey;

			if (type === "FRM") {
				var clIndex = globalCommLogArray.length;

				this.getView().getModel("enhData").getData().commLog.push({
					Index: clIndex.toString(),
					FieldName: "",
					IssueDesc: "",
					Priority: "",
					DateLogg: "",
					Status: "",
					DateResol: "",
					Resolv: "",
					AssignedTo: ""
				});

				globalCommLogArrayData = {};

				globalCommLogArrayData.Index = clIndex;
				globalCommLogArrayData.FieldName = "";
				globalCommLogArrayData.IssueDesc = "";
				globalCommLogArrayData.Priority = "";
				globalCommLogArrayData.DateLogg = "";
				globalCommLogArrayData.Status = "";
				globalCommLogArrayData.DateResol = "";
				globalCommLogArrayData.Resolv = "";
				globalCommLogArrayData.AssignedTo = "";
				globalCommLogArrayData.Existance = "N";

				globalCommLogArray.push(globalCommLogArrayData);
			} else {
				this.getView().getModel("enhData").getData().CommLog.push({
					IssueDesc: "",
					Priority: "",
					DateLogg: "",
					Status: "",
					DateResol: "",
					Resolv: "",
					AssignedTo: ""
				});
			}
			this.getView().getModel("enhData").refresh();
		},
		// deleteRowComLog: function(oEvent) {

		// 	if (this.getView().getModel("enhData").getData().CommLog.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/CommLog/")[1];
		// 		this.getView().getModel("enhData").getData().CommLog.splice(index, 1);
		// 		this.getView().getModel("enhData").refresh();
		// 	}
		// },
		deleteRowComLog: function(oEvent) {
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
								if (that.getView().getModel("enhData").getData().commLog.length > 1) {
									var sPath = sEvent.getParent().getParent().getBindingContextPath();
									var index = sPath.split("/commLog/")[1];
									var counter = parseInt(that.getView().getModel("enhData").getData().commLog[index].Index);

									if (globalCommLogArray[counter].Existance === "E") {
										globalCommLogArray[counter].Existance = "D";
									} else if (globalCommLogArray[counter].Existance === "N") {
										globalCommLogArray.splice(counter, 1);

										for (var i = 0; i < globalCommLogArray.length; i++) {
											globalCommLogArray[i].Index = i;
										}
									}

									that.getView().getModel("enhData").getData().commLog.splice(index, 1);
									that.getView().getModel("enhData").refresh();
								}
							} else {
								that.onConfirmDeleteCommLog(sEvent);
							}
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
			if (this.getView().getModel("enhData").getData().CommLog.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/CommLog/")[1];
				var FieldnameIndex = parseInt(index) + 1;
				// var index1 = this.getView().getModel("enhData").getData().CommLog.length;
				oCMEntry = this.getView().getModel("enhData").getData().CommLog[index];

				if (!oCMEntry.DateLogg) {
					oCMEntry.DateLogg = "";
				}
				if (!oCMEntry.DateResol) {
					oCMEntry.DateResol = "";
				}

				sCMEntry = oCMEntry.IssueDesc + "~" + oCMEntry.Priority + "~" + oCMEntry.DateLogg + "~" +
					oCMEntry.Status + "~" + oCMEntry.DateResol + "~" + oCMEntry.Resolv + "~" + oCMEntry.AssignedTo;
				oParam.Fieldvalue = sCMEntry;
				oParam.Fieldname = "FS_CommLog_" + FieldnameIndex;
				this.deleteCommCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().CommLog.length === 1) {
				oCMEntry = this.getView().getModel("enhData").getData().CommLog[0];

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
						if (that.getView().getModel("enhData").getData().CommLog.length === 1) {
							that.getView().getModel("enhData").getData().CommLog.splice(0, 1);

							that.getView().getModel("enhData").getData().CommLog.push({
								IssueDesc: "",
								Priority: "",
								DateLogg: "",
								Status: "",
								DateResol: "",
								Resolv: "",
								AssignedTo: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().CommLog.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							//that.updateCommLog(oParam, uParam);
							that.updateCommLogtable(oParam, uParam, index);
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

		updateCommLogtable: function(oParam, uParam, index) {
			var that = this;
			var oUAEntry, sUAEntry;
			var aErrorMsgData = [];
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var iCountUA,
				slength;

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

			if (this.getView().getModel("enhData").getData().CommLog.length > 1) {

				slength = this.getView().getModel("enhData").getData().CommLog.length;
				iCountUA = index;
				for (iCountUA; iCountUA < slength; iCountUA++) {
					//Update value
					var FieldnameIndex = parseInt(iCountUA) + 1;
					oParam.Fieldname = "FS_CommLog_" + FieldnameIndex;
					uParam.Fieldname = "FS_CommLog_" + FieldnameIndex;
					oUAEntry = this.getView().getModel("enhData").getData().CommLog[index];

					if (!oUAEntry.DateLogg) {
						oUAEntry.DateLogg = "";
					}
					if (!oUAEntry.DateResol) {
						oUAEntry.DateResol = "";
					}

					sUAEntry = oUAEntry.IssueDesc + "~" + oUAEntry.Priority + "~" + oUAEntry.DateLogg + "~" + oUAEntry.Status + "~" +
						oUAEntry.DateResol + "~" + oUAEntry.Resolv + "~" + oUAEntry.AssignedTo;
					oParam.Fieldvalue = sUAEntry;
					oUAEntry.flag = false;
					callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
					// Delete Value
					oParam.Fieldname = "FS_CommLog_" + (FieldnameIndex + 1);
					uParam.Fieldname = "FS_CommLog_" + (FieldnameIndex + 1);
					oUAEntry = this.getView().getModel("enhData").getData().CommLog[index];

					if (!oUAEntry.DateLogg) {
						oUAEntry.DateLogg = "";
					}
					if (!oUAEntry.DateResol) {
						oUAEntry.DateResol = "";
					}

					sUAEntry = oUAEntry.IssueDesc + "~" + oUAEntry.Priority + "~" + oUAEntry.DateLogg + "~" + oUAEntry.Status + "~" +
						oUAEntry.DateResol + "~" + oUAEntry.Resolv + "~" + oUAEntry.AssignedTo;
					oParam.Fieldvalue = sUAEntry;
					var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
					oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
						"',Processid='" + oParam.Processid +
						"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
							success: function(oResult, mHeader) {
								if (that.getView().getModel("enhData").getData().CommLog.length === 1) {
									that.getView().getModel("enhData").getData().CommLog.splice(0, 1);

									that.getView().getModel("enhData").getData().CommLog.push({
										IssueDesc: "",
										Priority: "",
										DateLogg: "",
										Status: "",
										DateResol: "",
										Resolvs: "",
										AssignedTo: "",
										flag: false
									});
								} else {
									//do nothing
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
				} //For loop 
			} else {
				// DO NOTHING
			}

		}, //update after delete

		addNewRowCustomTable: function() {
			this.getView().getModel("enhData").getData().reqCustTable.push({
				tableName: "",
				fieldName: "",
				fieldDesc: "",
				fieldType: "",
				fieldLength: "",
				valRestrictions: "",
				sourceTable: ""
			});
			this.getView().getModel("enhData").refresh();
		},
		// deleteRowCustomTable: function(oEvent) {

		// 	if (this.getView().getModel("enhData").getData().reqCustTable.length > 1) {
		// 		var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
		// 		var index = sPath.split("/reqCustTable/")[1];
		// 		this.getView().getModel("enhData").getData().reqCustTable.splice(index, 1);
		// 		this.getView().getModel("enhData").refresh();
		// 	}
		// },

		deleteRowCustomTable: function(oEvent) {
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
								if (that.getView().getModel("enhData").getData().reqCustTable.length > 1) {
									var sPath = sEvent.getParent().getParent().getBindingContextPath();
									var index = sPath.split("/reqCustTable/")[1];
									var counter = parseInt(that.getView().getModel("enhData").getData().reqCustTable[index].Index);

									if (globalUserAcceptanceArray[counter].Existance === "E") {
										globalUserAcceptanceArray[counter].Existance = "D";
									} else if (globalUserAcceptanceArray[counter].Existance === "N") {
										globalUserAcceptanceArray.splice(counter, 1);

										for (var i = 0; i < globalUserAcceptanceArray.length; i++) {
											globalUserAcceptanceArray[i].Index = i;
										}
									}

									that.getView().getModel("enhData").getData().reqCustTable.splice(index, 1);
									that.getView().getModel("enhData").refresh();
								}
							} else {
								that.onConfirmDeleteCustomTable(sEvent);
							}
						}
					}
				}
			);
		},

		onConfirmDeleteCustomTable: function(sEvent) {
			var that = this;
			var oUAEntry, sUAEntry;
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");

			var oParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};
			if (this.getView().getModel("enhData").getData().reqCustTable.length > 1) {
				var sPath = sEvent.getParent().getParent().getBindingContextPath();
				var index = sPath.split("/reqCustTable/")[1];
				// var index1 = this.getView().getModel("enhData").getData().reqCustTable.length;
				var FieldnameIndex = parseInt(index) + 1
				oUAEntry = this.getView().getModel("enhData").getData().reqCustTable[index];
				sUAEntry = oUAEntry.tableName + "~" + oUAEntry.fieldName + "~" + oUAEntry.fieldDesc + "~" + oUAEntry.fieldType + "~" +
					oUAEntry.fieldLength + "~" + oUAEntry.valRestrictions + "~" + oUAEntry.sourceTable;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_ReqCustTable_" + FieldnameIndex;
				this.deleteCustCall(oParam, uParam, index);
			} else if (this.getView().getModel("enhData").getData().reqCustTable.length === 1) {
				oUAEntry = this.getView().getModel("enhData").getData().reqCustTable[0];
				sUAEntry = oUAEntry.tableName + "~" + oUAEntry.fieldName + "~" + oUAEntry.fieldDesc + "~" + oUAEntry.fieldType + "~" +
					oUAEntry.fieldLength + "~" + oUAEntry.valRestrictions + "~" + oUAEntry.sourceTable;
				oParam.Fieldvalue = sUAEntry;
				oParam.Fieldname = "FS_ReqCustTable_1";
				this.deleteCustCall(oParam, uParam, index);
			}
		},

		deleteCustCall: function(oParam, uParam, index) {
			var that = this;
			var aErrorMsgData = [];
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
						if (that.getView().getModel("enhData").getData().reqCustTable.length === 1) {
							that.getView().getModel("enhData").getData().reqCustTable.splice(0, 1);

							that.getView().getModel("enhData").getData().reqCustTable.push({
								tableName: "",
								fieldName: "",
								fieldDesc: "",
								fieldType: "",
								fieldLength: "",
								valRestrictions: "",
								sourceTable: "",
								flag: false
							});
							that.getView().getModel("enhData").refresh();
						} else {
							that.getView().getModel("enhData").getData().reqCustTable.splice(index, 1);
							that.getView().getModel("enhData").refresh();
							//that.updateUserAcc(oParam, uParam);
							that.updateCusttable(oParam, uParam, index);
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

		updateCusttable: function(oParam, uParam, index) {
			var that = this;
			var oUAEntry, sUAEntry;
			var aErrorMsgData = [];
			var dataObject = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var currentversion = this.byId("versiontypeExisting").getSelectedItem().getText();
			var versionno = currentversion.split(" ");
			var iCountUA,
				slength;

			var oParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.Stepno,
				Fieldname: '',
				Fieldvalue: '',
				Longfieldvalue: ''
			};
			var uParam = {
				Version: versionno[1],
				Repid: dataObject.Repid,
				Projectkey: dataObject.Projectkey,
				Processid: dataObject.processid,
				Stepno: dataObject.Stepno,
				Fieldname: ''
			};

			if (this.getView().getModel("enhData").getData().reqCustTable.length > 1) {

				slength = this.getView().getModel("enhData").getData().reqCustTable.length;
				iCountUA = index;
				for (iCountUA; iCountUA < slength; iCountUA++) {
					//Update value
					var FieldnameIndex = parseInt(iCountUA) + 1;
					oParam.Fieldname = "FS_ReqCustTable_" + FieldnameIndex;
					uParam.Fieldname = "FS_ReqCustTable_" + FieldnameIndex;
					oUAEntry = this.getView().getModel("enhData").getData().reqCustTable[index];
					sUAEntry = oUAEntry.tableName + "~" + oUAEntry.fieldName + "~" + oUAEntry.fieldDesc + "~" + oUAEntry.fieldType + "~" +
						oUAEntry.fieldLength + "~" + oUAEntry.valRestrictions + "~" + oUAEntry.sourceTable;
					oParam.Fieldvalue = sUAEntry;
					oUAEntry.flag = false;
					callServices.fnUpdateInMainTable(oParam, uParam, oUAEntry.flag);
					// Delete Value
					oParam.Fieldname = "FS_ReqCustTable_" + (FieldnameIndex + 1);
					uParam.Fieldname = "FS_ReqCustTable_" + (FieldnameIndex + 1);
					oUAEntry = this.getView().getModel("enhData").getData().reqCustTable[index];
					sUAEntry = oUAEntry.tableName + "~" + oUAEntry.fieldName + "~" + oUAEntry.fieldDesc + "~" + oUAEntry.fieldType + "~" +
						oUAEntry.fieldLength + "~" + oUAEntry.valRestrictions + "~" + oUAEntry.sourceTable;
					oParam.Fieldvalue = sUAEntry;
					var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
					oModelService.remove("/MAIN_TABLESet(Version='" + versionno[1] + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
						"',Processid='" + oParam.Processid +
						"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
							success: function(oResult, mHeader) {
								if (that.getView().getModel("enhData").getData().reqCustTable.length === 1) {
									that.getView().getModel("enhData").getData().reqCustTable.splice(0, 1);

									that.getView().getModel("enhData").getData().reqCustTable.push({
										tableName: "",
										fieldName: "",
										fieldDesc: "",
										fieldType: "",
										fieldLength: "",
										valRestrictions: "",
										sourceTable: "",
										flag: false
									});
								} else {
									//do nothing
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
				} //For loop 
			} else {
				// DO NOTHING
			}

		}, //update after delete

		callAttachment: function(oEvent) {

			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
			var oServiceParam = {
				Repid: oParam.Repid,
				PROJECTKEY: oParam.Projectkey,
				PROCESSID: oParam.processid,
				Stepno: oParam.Stepno
			};

			if (oEvent.getSource().getId() === this.getView().byId('uploadAttachEnhanceReq').getId()) {

				if (this.getView().byId("fileUploadEnhReq").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadEnhReq"), "EnhReq",
						oServiceParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachWFReq').getId()) {

				if (this.getView().byId("fileUploadWfReq").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadWfReq"), "WFAttachmentReq",
						oServiceParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachWFReqObjectDetails').getId()) {

				if (this.getView().byId("fileUploadWfReqObjectDetails").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadWfReqObjectDetails"), "WFAttachmentReq",
						oServiceParam, this.getView().getModel("enhData"), "attachWfObjectDetails", "attachWfObjectDetailsVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachFrmPrintReq').getId()) {

				if (this.getView().byId("fileUploadFrmPrintReq").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadFrmPrintReq"), "FrmReq",
						oServiceParam, this.getView().getModel("FrmData"), "attachFrmPrintReq", "attachFrmPrintReqVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

				//oServiceParam.FIELDNAME = "FrmReq";
				//this.readFormAttachments(oServiceParam);
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadFormMappingSheet').getId()) {

				if (this.getView().byId("fileUploadFormMappingSheet").getValue()) {
					callServices.callAttachmentService(this.getView().byId("fileUploadFormMappingSheet"), "FrmMapReq",
						oServiceParam, this.getView().getModel("FrmData"), "attachFrmMappingSheetReq", "attachFrmMappingSheetReqVisible");
				} else {
					sap.m.MessageBox.error("Please select a file to upload.", {
						title: "Error"
					});
				}

				//oServiceParam.FIELDNAME = "FrmMapReq";
				//this.readFormMappingAttachments(oServiceParam);
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachWFReq').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUploadWfReq"), "TechAssDepUploadData",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON"), "attachIntTechAssDep", "attachIntTechAssDepVisible");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachEnhanceReq2').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUploadEnhReq2"), "TechAssDepUploadData1",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON1"), "attachIntTechAssDep1", "attachIntTechAssDepVisible1");
			} else if (oEvent.getSource().getId() === this.getView().byId('uploadAttachEnhanceReq').getId()) {
				callServices.callAttachmentService(this.getView().byId("fileUploadEnhReq"), "TechAssDepUploadData2",
					oServiceParam, this.getView().getModel("intDataTechAssDepJSON2"), "attachIntTechAssDep2", "attachIntTechAssDepVisible2");
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
				if (oView.getModel("enhData").getData().attachEnhReq) {
					oView.getModel("enhData").getData().attachEnhReq = [];
					$.each(oVal, function(index, item) {
						oView.getModel("enhData").getData().attachEnhReq.push({
							fileName: item.FILENAME,
							fileURL: item.__metadata.media_src
						});
						oView.getModel("enhData").getData().attachEnhReqVisible = true;
					});
					oView.getModel("enhData").refresh();
				}

				if (oView.getModel("enhData").getData().attachWfObjectDetails) {
					oView.getModel("enhData").getData().attachWfObjectDetails = [];
					$.each(oVal, function(index, item) {
						oView.getModel("enhData").getData().attachWfObjectDetails.push({
							fileName: item.FILENAME,
							fileURL: item.__metadata.media_src
						});
						oView.getModel("enhData").getData().attachWfObjectDetailsVisible = true;
					});
					oView.getModel("enhData").refresh();
				}
			} else {
				console.info("Error in attachment service call");
			}

		},

		deleteFileEnhReq: function(oEvent) {

			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				if (oParam.Projectkey === "ENH") {
					var oTable = this.getView().byId("tableAttachEnhanceReq");
					oTable.setBusy(true);
					var oReadAttachParam = {
						Repid: oParam.Repid,
						PROJECTKEY: oParam.Projectkey,
						PROCESSID: oParam.processid,
						STEPNO: oParam.Stepno,
						FIELDNAME: "EnhReq",
						TYPE: "O"
					};
					callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");

				} else if (oParam.Projectkey === "WFLW") {
					var oTable = this.getView().byId("tableAttachWFReq");
					oTable.setBusy(true);
					var oReadAttachParam = {
						Repid: oParam.Repid,
						PROJECTKEY: oParam.Projectkey,
						PROCESSID: oParam.processid,
						STEPNO: oParam.Stepno,
						FIELDNAME: "WFAttachmentReq",
						TYPE: "O"
					};
					callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("enhData"), "attachEnhReq", "attachEnhReqVisible");
				} else if (oParam.Projectkey === "WFLW") {
					var oTable = this.getView().byId("tableAttachObjectDetails");
					oTable.setBusy(true);
					var oReadAttachParam = {
						REPID: oParam.Repid,
						PROJECTKEY: oParam.Projectkey,
						PROCESSID: oParam.processid,
						STEPNO: oParam.Stepno,
						FIELDNAME: "WFAttachmentReqObjectDetails",
						TYPE: "O"
					};
					callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("enhData"), "attachWfObjectDetails",
						"attachWfObjectDetailsVisible");
				}

			}
			oTable.setBusy(false);

		},
		deleteFileEnhReq1: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachWFReq");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S2",
					FIELDNAME: "TechAssDepUploadData",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON"), "attachIntTechAssDep",
					"attachIntConTSVisible");

			}
			oTable.setBusy(false);

		},

		deleteFileWFObjectDetails: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachWFReq");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.processid,
					STEPNO: "S1",
					FIELDNAME: "WFObjectDetailsUploadData",
					TYPE: "O"
				};
				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("intDataTechAssDepJSON"), "attachWfObjectDetails",
					"attachWfObjectDetailsVisible");

			}
			oTable.setBusy(false);

		},

		deleteFileEnhReq2: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachEnhanceReq2");
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
		deleteFileEnhReq3: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {

				var oTable = this.getView().byId("tableAttachEnhanceReq");
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
		deleteFileFrmPrintReq: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {
				var oTable = this.getView().byId("tableAttachFrmPrintReq");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "FrmReq",
					TYPE: "O"
				};

				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("FrmData"), "attachFrmPrintReq",
					"attachFrmPrintReqVisible");

			}
			oTable.setBusy(false);
		},

		deleteFileFrmMapngSht: function(oEvent) {
			var URI = oEvent.getSource().getActiveIcon();
			var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;

			if (callServices.deleteAttachment(URI)) {
				var oTable = this.getView().byId("tableAttachFormMappingSheet");
				oTable.setBusy(true);
				var oReadAttachParam = {
					REPID: oParam.Repid,
					PROJECTKEY: oParam.Projectkey,
					PROCESSID: oParam.Processid,
					STEPNO: oParam.Stepno,
					FIELDNAME: "FrmMapReq",
					TYPE: "O"
				};

				callServices.readAttachmentList(oReadAttachParam, this.getView().getModel("FrmData"), "attachFrmMappingSheetReq",
					"attachFrmMappingSheetReqVisible");

			}
			oTable.setBusy(false);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.automation.toolAutomationNew.view.DetailPage
		 */
		//  onBeforeRendering: function() {
		//
		//  },

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.automation.toolAutomationNew.view.DetailPage
		 */
		//  onAfterRendering: function() {
		//
		//  },

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.automation.toolAutomationNew.view.DetailPage
		 */
		//  onExit: function() {
		//
		//  }

	});

});