var selectedProjectInfo = {
	"ProjectName": "",
	"ProjectId": ""
};

var enteredCRNumber = {
	"CRNumber": "",
	"NavTS_FS": "",
	"VersionNo": 0
};

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/automation/toolAutomationNew/utils/callServices"
], function(Controller, JSONModel, callServices) {
	"use strict";

	return Controller.extend("com.automation.toolAutomationNew.controller.FirstPage", {
		onInit: function(oEvent) {
			this.oModel = new JSONModel("newmodel");

			this.getOwnerComponent().getRouter().getRoute("first").attachPatternMatched(this.onObjectMatched, this);
			this.byId("switch").setSelectedKey("existing");

			this.getView().byId("SimpleFormChange354").setVisible(false);
			this.getView().byId("nextHBox").setVisible(false);

			this.getView().byId("SimpleFormChange3541").setVisible(true);
			
			
			this.getView().byId("CRSelection").setVisible(true);
			this.byId("table0").setVisible(true);
			this.getView().byId("nextHBox1").setVisible(true);

			//			this.byId("switch").setSelectedButton("segmentNew");

			var oServiceModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZPROJECT_HEADER_SRV/", true);
			var relPath = "PROJECT_HEADERSET";
			var ref = this;
			oServiceModel.read(relPath, null, [], false, function(oData) {
					var sModel = new JSONModel();
					sModel.setData(oData.results);
					ref.getView().setModel(sModel, "projectlist");
				},
				function(oError) {
					var sModel = new JSONModel();
					sModel.setData([{
						Projectname: "Toyota",
						Projectid: "Toyota"
					}]);
					ref.getView().setModel(sModel, "projectlist");
				});

		},
		_getEnabled: function() {
			// var p = this.getView().byId("table0");
			// var q = p.getItems()[index].getId();
			// var r = this.getView().byId(q).getCells();
			// this.getView().byId(r[1].getId()).setEnabled(true);
			// this.getView().byId(r[2].getId()).setEnabled(true);
			// this.getView().byId(r[3].getId()).setEnabled(true);
			// this.getView().byId(r[0].getItems()[0].getId()).setEnabled(true);
			// this.getView().byId(r[0].getItems()[1].getId()).setEnabled(true);
			var p = this.getView().byId("table0");
			for (var i = 0; i < p.getItems().length; i++) {
				var q = p.getItems()[i].getId();
				var r = this.getView().byId(q).getCells();
				this.getView().byId(r[1].getId()).setEnabled(true);
				this.getView().byId(r[2].getId()).setEnabled(true);
				this.getView().byId(r[3].getId()).setEnabled(true);
				this.getView().byId(r[0].getItems()[0].getId()).setEnabled(true);
				this.getView().byId(r[0].getItems()[1].getId()).setEnabled(true);
				if (i === p.getItems().length - 1) {
					this.getView().byId(r[0].getItems()[0].getId()).setEnabled(true);
				}
			}
		},
		_getLastEnabled: function() {
			var p = this.getView().byId("table0");
			var q = p.getItems()[p.getItems().length - 1].getId();
			var r = this.getView().byId(q).getCells();
			this.getView().byId(r[1].getId()).setEnabled(false);
			this.getView().byId(r[2].getId()).setEnabled(false);
			this.getView().byId(r[3].getId()).setEnabled(false);
			this.getView().byId(r[0].getItems()[0].getId()).setEnabled(true);
			this.getView().byId(r[0].getItems()[1].getId()).setEnabled(false);
		},
		_getDisabled: function() {
			var p = this.getView().byId("table0");
			for (var i = 0; i < p.getItems().length; i++) {
				var q = p.getItems()[i].getId();
				var r = this.getView().byId(q).getCells();
				this.getView().byId(r[1].getId()).setEnabled(false);
				this.getView().byId(r[2].getId()).setEnabled(false);
				this.getView().byId(r[3].getId()).setEnabled(false);
				this.getView().byId(r[0].getItems()[0].getId()).setEnabled(false);
				this.getView().byId(r[0].getItems()[1].getId()).setEnabled(false);
				if (i === p.getItems().length - 1) {
					this.getView().byId(r[0].getItems()[0].getId()).setEnabled(true);
				}
			}
		},
		onAddCR: function(oEvent) {
			this.getView().getModel("firstPageData").getData().CRTable.push({
				Sprint: "",
				CRNumber: "",
				CRDesc: ""
			});
			this.getView().getModel("firstPageData").refresh();
		},
		onRemoveCR: function(oEvent) {
			var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
			var index = sPath.split("/CRTable/")[1];
			this.getView().getModel("firstPageData").getData().CRTable.splice(index, 1);
			if (this.getView().getModel("firstPageData").getData().CRTable.length === 0) {
				this.getView().getModel("firstPageData").getData().CRTable.push({
					Sprint: "",
					CRNumber: "",
					CRDesc: ""
				});
			}
			this.getView().getModel("firstPageData").refresh();
		},
		handleUpdateData: function(oEventF4Help) {

			var that = this;
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZMAIN_TABLE_SRV/", true);
			var projectID = this.byId('projectNew').getValue();
			if (!projectID) {
				projectID = this.byId('projectExisting').getValue();
			}
			var objIdSearchVal = this.byId('inpObject1').getValue();
			var relPath = "/STATUS_TABLESet?$filter=Projectid eq '" + projectID + "' and Ricefid eq '" + objIdSearchVal + "'";

			this.oSelect = new sap.m.SelectDialog({
				title: "Object List",
				rememberSelections: true,
				items: {
					path: relPath,
					template: new sap.m.StandardListItem({
						title: "{Ricefid}",
						description: "{Ricef_Desc}"
					})
				},
				search: function(oEvent) {

					var sObjValue = oEvent.getParameter("value");
					oEvent.getSource().removeAllItems();
					oEvent.getSource().bindAggregation("items", {
						path: "/STATUS_TABLESet?$filter=Projectid eq '" + projectID + "' and Ricefid eq '" + sObjValue + "'",
						template: new sap.m.StandardListItem({
							title: "{Ricefid}",
							description: "{Ricef_Desc}"
						})
					});
					oEvent.getSource().getModel().refresh();

					// var sServiceURL = "/sap/opu/odata/SAP/ZMAIN_TABLE_SRV/STATUS_TABLESet?$filter=Projectid eq '" + projectID +
					// 	"' and Ricefid eq '" + sObjValue + "'";
					// var searchObjList = [];
					// var oRes = jQuery.sap.sjax({
					// 	url: sServiceURL + "&$format=json",
					// 	datatype: "application/json"
					// });
					// if (oRes.success) {
					// 	searchObjList = oRes.data.d.results;
					// }

					//                     var sValue = oEvent.getParameter("value");
					//                     var filterProject = new sap.ui.model.Filter("Projectid", sap.ui.model.FilterOperator.EQ, "'" + projectID + "'");
					//var filterRicef = new sap.ui.model.Filter("Ricefid", sap.ui.model.FilterOperator.Contains,  "'" + sValue + "'");
					//                     var oFilter = new sap.ui.model.Filter(
					//                       [filterProject, filterRicef], true /*AND*/
					//                     );

					//                     oEvent.getSource().getBinding("items").filter(oFilter);
					//                       var aFilters = [];
					// var sQuery = oEvent.getParameter("value");
					// if (sQuery && sQuery.length > 0) {
					// 	var filter = new sap.ui.model.Filter("Ricefid", sap.ui.model.FilterOperator.Contains, sQuery);
					// 	aFilters.push(filter);
					// }

					// // update list binding
					// //var list = this.getView().byId("ProjTab");
					// sap.ui.getCore().getElementById("sam1").getBinding("items").filter(aFilters);

					/*					var sValue = oEvent.getParameter("value").toLowerCase();
										var items = oEvent.getSource().getItems();
										for (var i = 0; i < items.length; i++) {
											if (((oEvent.getSource().getItems()[i].getTitle().toLowerCase().indexOf(sValue)) !== -1)) {
												oEvent.getSource().getItems()[i].setProperty("visible", true);
											} else {
												oEvent.getSource().getItems()[i].setProperty("visible", false);
											}
										}*/
				},
				confirm: [that.materialConfirm, that],
				cancel: [that.materialCancel, that]
			});
			this.oSelect.setModel(oModel);
			this.oSelect.open();
		},

		materialSearch: function() {
			//                     var sValue = oEvent.getParameter("value");
			//                     var filterProject = new sap.ui.model.Filter("Projectid", sap.ui.model.FilterOperator.EQ, "'" + projectID + "'");
			//var filterRicef = new sap.ui.model.Filter("Ricefid", sap.ui.model.FilterOperator.Contains,  "'" + sValue + "'");
			//                     var oFilter = new sap.ui.model.Filter(
			//                       [filterProject, filterRicef], true /*AND*/
			//                     );

			//                     oEvent.getSource().getBinding("items").filter(oFilter);
			var aFilters = [];
			var sQuery = this.getParameter("value");
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("Ricefid", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			//var list = this.getView().byId("ProjTab");
			this.getBinding("items").filter(aFilters);

		},

		materialCancel: function() {},

		materialConfirm: function(oEvt) {
			var selectedItem = oEvt.getParameter('selectedItem').getTitle();
			var projectID = this.byId('projectNew').getValue();
			if (!projectID) {
				projectID = this.byId('projectExisting').getValue();
			}
			var oServiceModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZMAIN_TABLE_SRV/", true);
			var relPath = "/STATUS_TABLESet?$filter=Projectid eq '" + projectID + "' and Ricefid eq '" + selectedItem + "'";
			var ref = this;
			oServiceModel.read(relPath, null, [], false, function(oData) {
					if (oData.results.length > 0) {
						var WricefDescr = oData.results[0].Ricef_Desc;
						ref.getView().byId("objDescExists").setText(WricefDescr);
						var oObjListInfo = ref.getView().getModel("objectlistExisting").getData();
						var sSelectedObj = selectedItem;
						//SOC Writwick 10 July 2018
						// var oSelObjInfo = {
						// 	version_id: '',
						// 	fieldname: '',
						// 	repid: '',
						// 	projectkey: '',
						// 	processid: '',
						// 	stepno: ''
						// };
						var oSelObjInfo = {
							Version: '',
							Fieldname: '',
							Repid: '',
							Projectkey: '',
							Processid: '',
							Stepno: ''
						};
						//EOC Writwick 10 July 2018
						if (oObjListInfo && oObjListInfo.length > 0) {
							for (var iCount = 0; iCount < oObjListInfo.length; iCount++) {
								
								//SOC Writwick 10 July 2018
								if (oObjListInfo[iCount].Ricefid === sSelectedObj) {
									// oSelObjInfo.version_id = oObjListInfo[iCount].VersionId;
									// oSelObjInfo.repid = oObjListInfo[iCount].Ricefid;
									// oSelObjInfo.projectkey = oObjListInfo[iCount].Projectkey;
									// oSelObjInfo.processid = oObjListInfo[iCount].Processid;
									// oSelObjInfo.stepno = "S1"; // oObjListInfo[iCount].Stepno;
									oSelObjInfo.Version = oObjListInfo[iCount].VersionId;
									oSelObjInfo.Repid = oObjListInfo[iCount].Ricefid;
									oSelObjInfo.Projectkey = oObjListInfo[iCount].Projectkey;
									oSelObjInfo.Processid = oObjListInfo[iCount].Processid;
									oSelObjInfo.Stepno = "S1"; // oObjListInfo[iCount].Stepno;
									// oSelObjInfo.projectid = oObjListInfo[iCount].Projectid;
									break;
								}
								//EOC Writwick 10 July 2018
							}
							var oModelData = new sap.ui.model.json.JSONModel();
							ref.getView().setModel(oModelData, "firstPageData");
							var iCountUA, sUserAcptCols, uLenCol,sUserAcptCol;
							var oModelConversion = {
								CRTable: [],
								CRTemp: ""
							};
							oModelConversion.CRTemp = "";
							oModelConversion.CRTable = [];
							ref.firstPageDataSuccess = {};
							//SOC Writwick 10 July 2018
							// oSelObjInfo.fieldname = "CRDetails";
							oSelObjInfo.Fieldname = "CRDetails";
							//EOC Writwick 10 July 2018
							var rows = 0;
							callServices.fnGetDataMainTable(oSelObjInfo, oModelConversion, "CRTemp", ref.firstPageDataSuccess);
							if (ref.firstPageDataSuccess.CRTemp) {
								if (oModelConversion.CRTemp) {
									if (oModelConversion.CRTemp.indexOf("^") === -1) {
										sUserAcptCols = oModelConversion.CRTemp.split("~");
										if (sUserAcptCols && sUserAcptCols.length >= 2) {
											oModelConversion.CRTable.push({
												Sprint: sUserAcptCols[0],
												CRNumber: sUserAcptCols[1],
												CRDesc: sUserAcptCols[2]
											});
											rows++;

										}
									} else {
										uLenCol = oModelConversion.CRTemp.split("^");
										for (var x = 0; x < uLenCol.length; x++) {
											sUserAcptCol = uLenCol[x].split("~");
											if (sUserAcptCol && sUserAcptCol.length >= 2) {
												oModelConversion.CRTable.push({
													Sprint: sUserAcptCol[0],
													CRNumber: sUserAcptCol[1],
													CRDesc: sUserAcptCol[2]
												});
												rows++;

											}
										}
									}
								}
							}

							if (oModelConversion.CRTable.length === 0) {
								oModelConversion.CRTable.push({
									Sprint: "",
									CRNumber: "",
									CRDesc: ""
								});
								rows=0;
							}
							oModelData.setData(oModelConversion);
							if (oModelConversion.CRTable.length !== 0) {
								ref._getDisabled();
							}
							if (oModelConversion.CRTable.length === 1 && rows === 0) {
								ref._getEnabled();
							}
						}
					}
				},
				function(oError) {
					//
				});
			this.byId('inpObject').setValue(selectedItem);
			this.byId('inpObject1').setValue(selectedItem);
		},

		onChangeProject: function(oEvent) {

			var sSourceId = oEvent.getSource().getId();
			var sProjectList = "";

			// var oSelectedItem = oEvent.getSource().getSelectedItem();
			// var projectID = oSelectedItem.getText();
			// selectedProjectInfo.ProjectName = oEvent.getSource().getSelectedItem().getAdditionalText();

			if (this.byId("projectNew").getId() === sSourceId) {
				sProjectList = "N"; // New
				this.byId("projectNew").setValueState("None");
			} else if (this.byId("projectExisting").getId() === sSourceId) {
				sProjectList = "E"; // Existing
				this.byId("projectExisting").setValueState("None");
			}

			var oServiceModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZMAIN_TABLE_SRV/", true);
			var oSelectedItem = oEvent.getSource().getSelectedItem();
			var sModel = new sap.ui.model.json.JSONModel();
			var ref = this;

			if (oSelectedItem) {
				var projectID = oSelectedItem.getText();

				selectedProjectInfo.ProjectName = oEvent.getSource().getSelectedItem().getAdditionalText();
				selectedProjectInfo.ProjectId = projectID;

				var relPath = "STATUS_TABLESet?$filter=Projectid eq '" + projectID + "'";

				oServiceModel.read(relPath, null, [], false, function(oData) {

						var aResponseObjList = oData.results;
						var aUniqueObjectList = [];
						var oTempObjId = {};
						$.each(aResponseObjList, function(indKey, oObjDetail) {
							if (oTempObjId[oObjDetail.Ricefid] !== true) {
								aUniqueObjectList.push(oObjDetail);
								oTempObjId[oObjDetail.Ricefid] = true;
							}
						});
						sModel.setData(aUniqueObjectList);
						if (sProjectList === "N") {
							ref.getView().setModel(sModel, "objectlistNew");
							ref.getView().byId("inpObject").setEnabled(true);
							ref.getView().byId("inpObject").setValue("");
							ref.getView().byId("projDescNew").setText(selectedProjectInfo.ProjectName);
						} else if (sProjectList === "E") {
							ref.getView().setModel(sModel, "objectlistExisting");
							ref.getView().byId("inpObject1").setEnabled(true);
							ref.getView().byId("inpObject1").setValue("");
							ref.getView().byId("projDescExist").setText(selectedProjectInfo.ProjectName);
						}
					},
					function(oError) {
						//var msg = JSON.parse(oError.response.body).error.message.value;
						//	sap.m.MessageBox.error(msg);
					}
				);
			} else {
				sModel.setData([]);
				if (sProjectList === "N") {
					this.getView().setModel(sModel, "objectlistNew");
					this.byId("objectlist1").setEnabled(false);
					this.byId("projectNew").setValueState("Error");
				} else if (sProjectList === "E") {
					this.getView().setModel(sModel, "objectlistExisting");
					this.byId("objectlist").setEnabled(false);
					this.byId("projectExisting").setValueState("Error");
				}
			}
		},

		onObjectMatched: function() {

			var oObjMod = sap.ui.getCore().getModel();
			var oObjType = ""; //.getData().Obj;
			if (oObjMod && oObjMod.getData() && oObjMod.getData().Obj) {
				oObjType = oObjMod.getData().Obj;
				this.byId("switch").setSelectedKey(oObjType);
			} else {
				oObjType = "existing";
				this.byId("switch").setSelectedKey("existing");
			}

			/*if (oObjType === "new") {

				this.getView().byId("SimpleFormChange354").setVisible(true);
				this.getView().byId("nextHBox").setVisible(true);

				this.getView().byId("SimpleFormChange3541").setVisible(false);
				this.getView().byId("CRSelection").setVisible(false);
				this.byId("table0").setVisible(false);
				this.getView().byId("nextHBox1").setVisible(false);

			} else if (oObjType === "existing") {

				this.getView().byId("SimpleFormChange354").setVisible(false);
				this.getView().byId("nextHBox").setVisible(false);

				this.getView().byId("SimpleFormChange3541").setVisible(true);
				this.getView().byId("CRSelection").setVisible(true);
				this.byId("table0").setVisible(true);
				this.getView().byId("nextHBox1").setVisible(true);
			}*/
			this.getView().byId("SimpleFormChange354").setVisible(false);
			this.getView().byId("nextHBox").setVisible(false);

			this.getView().byId("SimpleFormChange3541").setVisible(true);
			this.getView().byId("CRSelection").setVisible(true);
			this.byId("table0").setVisible(true);
			this.getView().byId("nextHBox1").setVisible(true);
			var oModelConversion = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModelConversion, "firstPageData");
			// var firstPage = {
			// 	"CRTable": []
			// };
			// this.getView().getModel("firstPageData").setData(firstPage);
			// this.getView().getModel("firstPageData").getData().CRTable.push({
			// 	Sprint: "",
			// 	CRNumber: "",
			// 	CRDesc: ""
			// });
			this.getView().getModel("firstPageData").refresh();
			this.getView().byId("inpObject1").setValue("");
			this.getView().byId("objDescExists").setText("");
		},
		onSelectSegmentedBtn: function(oEvent) {
			if (oEvent.getParameters().key === "new") {
				this.getView().byId("SimpleFormChange354").setVisible(true);
				this.getView().byId("nextHBox").setVisible(true);

				this.getView().byId("SimpleFormChange3541").setVisible(false);
				this.getView().byId("CRSelection").setVisible(false);
				this.byId("table0").setVisible(false);
				this.getView().byId("nextHBox1").setVisible(false);
			} else {
				this.getView().byId("SimpleFormChange354").setVisible(false);
				this.getView().byId("nextHBox").setVisible(false);

				this.getView().byId("SimpleFormChange3541").setVisible(true);
				this.getView().byId("CRSelection").setVisible(true);
				this.byId("table0").setVisible(true);
				this.getView().byId("nextHBox1").setVisible(true);

			}
		},

		onOkPress: function(oEvent) {
			var sSelectedObj; // objectlist
			var oObjListInfo;
			var oMapWRICEF = {
				"REP": "Report",
				"INT": "Interface",
				"CNV": "Conversion",
				"ENH": "Enhancement",
				"FRM": "Form",
				"WFLW": "Workflow"
			};
			//SOC Writwick 10 July 2018
			// var oSelObjInfo = {
			// 	version_id: '',
			// 	fieldname: '',
			// 	repid: '',
			// 	projectkey: '',
			// 	processid: '',
			// 	stepno: ''
			// };
			var oSelObjInfo = {
				Version: '',
				Fieldname: '',
				Repid: '',
				Projectkey: '',
				Processid: '',
				Stepno: ''
			};
			//EOC Writwick 10 July 2018

			/** Wricef Object Type - Text from Radio Button in New */
			var type = this.byId("otype").getSelectedButton().getText();

			var sSourceId = oEvent.getSource().getId();
			var button = this.byId("switch").getSelectedKey();
			var projectName;

			if (this.byId("nextHBox").getId() === sSourceId) {

				projectName = this.byId("projectNew").getSelectedKey();

				// NEW
				if (button === "new") {
					// sSelectedObj = this.byId("objectlist1").getSelectedKey();
					sSelectedObj = this.byId("inpObject").getValue();
					if (this.getView().getModel("objectlistNew")) {
						oObjListInfo = this.getView().getModel("objectlistNew").getData();
					}
				}
			} else if (this.byId("nextHBox1").getId() === sSourceId) {

				projectName = this.byId("projectExisting").getSelectedKey();

				//EXISTING
				if (button === "existing") {
					// sSelectedObj = this.byId("objectlist").getSelectedKey();
					sSelectedObj = this.byId("inpObject1").getValue();
					if (this.getView().getModel("objectlistExisting")) {
						oObjListInfo = this.getView().getModel("objectlistExisting").getData();
					}
				}
			}

			if (!projectName) {

				var oView = this.getView();

				// create dialog via fragment factory
				var oDialogMsg = sap.ui.xmlfragment(oView.getId(), "com.automation.toolAutomationNew.fragment.dialog");
				// connect dialog to view (models, lifecycle)
				oView.addDependent(oDialogMsg);
				this.getView().getModel("dialogModel").setData({
					messageTxt: "Please choose a Project.",
					messageTitle: "Error",
					messageValueState: "Error"
				});
				this.getView().getModel("dialogModel").refresh();
				oDialogMsg.getBeginButton().attachPress(function() {
					oDialogMsg.close();
					oDialogMsg.destroy();
				});
				oDialogMsg.open();
				return;
			}

			if (!sSelectedObj) {

				var oView = this.getView();
				var oDialogMsg = oView.byId("sIdDialog");
				// create dialog lazily
				if (!oDialogMsg) {
					// create dialog via fragment factory
					oDialogMsg = sap.ui.xmlfragment(oView.getId(), "com.automation.toolAutomationNew.fragment.dialog");
					// connect dialog to view (models, lifecycle)
					oView.addDependent(oDialogMsg);
					this.getView().getModel("dialogModel").setData({
						messageTxt: "Please choose an Object Id.",
						messageTitle: "Error",
						messageValueState: "Error"
					});
					this.getView().getModel("dialogModel").refresh();
					oDialogMsg.getBeginButton().attachPress(function() {
						oDialogMsg.close();
						oDialogMsg.destroy();
					});
				}
				oDialogMsg.open();
				return;
			}

			if (oObjListInfo && oObjListInfo.length > 0) {
				for (var iCount = 0; iCount < oObjListInfo.length; iCount++) {

					if (oObjListInfo[iCount].Ricefid === sSelectedObj) {
						//SOC Writwick 10 July 2018
						// oSelObjInfo.version_id = oObjListInfo[iCount].VersionId;
						// oSelObjInfo.repid = oObjListInfo[iCount].Ricefid;
						// oSelObjInfo.projectkey = oObjListInfo[iCount].Projectkey;
						// oSelObjInfo.processid = oObjListInfo[iCount].Processid;
						// oSelObjInfo.stepno = "S1"; // oObjListInfo[iCount].Stepno;
						// oSelObjInfo.projectid = oObjListInfo[iCount].Projectid;
						oSelObjInfo.Version = oObjListInfo[iCount].VersionId;
						oSelObjInfo.Repid = oObjListInfo[iCount].Ricefid;
						oSelObjInfo.Projectkey = oObjListInfo[iCount].Projectkey;
						oSelObjInfo.Processid = oObjListInfo[iCount].Processid;
						oSelObjInfo.Stepno = "S1"; // oObjListInfo[iCount].Stepno;
						//oSelObjInfo.Projectid = oObjListInfo[iCount].Projectid;
						//EOC Writwick 10 July 2018
						break;
					}
				}
			}

			sap.ui.getCore().setModel((new JSONModel({
				objectInfo: oSelObjInfo
			})), "ObjectInformation");

			sap.ui.getCore().setModel((new JSONModel({
				projectInfo: selectedProjectInfo
			})), "ProjectInformation");

			sap.ui.getCore().setModel((new JSONModel({
				CRINFO: enteredCRNumber
			})), "CRnumber");

			var sWRICEFObjType = oSelObjInfo.Projectkey;
			var obj = '';

			if (button === "new") {

				if (oSelObjInfo && sWRICEFObjType && oMapWRICEF[sWRICEFObjType] !== type) {

					var oView = this.getView();
					var oDialogMsg = oView.byId("sIdDialog");
					// create dialog lazily
					if (!oDialogMsg) {
						// create dialog via fragment factory
						oDialogMsg = sap.ui.xmlfragment(oView.getId(), "com.automation.toolAutomationNew.fragment.dialog");
						// connect dialog to view (models, lifecycle)
						oView.addDependent(oDialogMsg);
						this.getView().getModel("dialogModel").setData({
							messageTxt: "Please choose correct Object Id/Object Type",
							messageTitle: "Error",
							messageValueState: "Error"
						});
						this.getView().getModel("dialogModel").refresh();
						oDialogMsg.getBeginButton().attachPress(function() {
							oDialogMsg.close();
							oDialogMsg.destroy();
						});
					}
					oDialogMsg.open();
				} else {
					obj = "new";
					//				this.byId("otype").setSelectedIndex(index);
					this.oModel.setProperty("/", {
						"Key": type,
						"Obj": obj
					});
					sap.ui.getCore().setModel(this.oModel);

					if (type === 'Report') {
						this.getOwnerComponent().getRouter().navTo("reportFS", {
							object: obj
						});
					} else if (type === 'Conversion') {
						this.getOwnerComponent().getRouter().navTo("conversionFS", {
							object: obj
						});
					} else if (type === 'Interface') {
						this.getOwnerComponent().getRouter().navTo("interfaceFS", {
							object: obj
						});
					} else {
						this.getOwnerComponent().getRouter().navTo("detail", {
							object: obj
						});
					}
				}
			}
			// Existing
			else {

				if (sWRICEFObjType) {

					obj = "existing";
					//				this.byId("otype").setSelectedIndex(index);
					this.oModel.setProperty("/", {
						"Key": type,
						"Obj": obj
					});
					var CrString = "";
					var Cr = "";
					var crdata = this.getView().getModel("firstPageData").getData();
					for (var i = 0; i < crdata.CRTable.length; i++) {
						if (crdata.CRTable[i].Sprint !== "" && crdata.CRTable[i].CRNumber !== "" && crdata.CRTable[i].CRDesc !== "") {
							CrString += crdata.CRTable[i].Sprint + "~" + crdata.CRTable[i].CRNumber + "~" + crdata.CRTable[i].CRDesc + "^";
							Cr += crdata.CRTable[i].CRNumber + ",";
						}
					}
					
					Cr = Cr.slice(0, -1);
					CrString = CrString.slice(0, -1);
					sap.ui.getCore().setModel(this.oModel);
					//var crNumber = this.byId("_text012").getValue();
					sessionStorage.setItem("crNumber", Cr);
					sessionStorage.setItem("crData", CrString);
					enteredCRNumber.CRNumber = Cr;
					enteredCRNumber.NavTS_FS = 0;
					enteredCRNumber.VersionNo = 1;

					if (sWRICEFObjType === 'REP') {
						this.getOwnerComponent().getRouter().navTo("reportFS", {
							object: obj
						});
					} else if (sWRICEFObjType === 'CNV') {
						this.getOwnerComponent().getRouter().navTo("conversionFS", {
							object: obj
						});
					} else if (sWRICEFObjType === 'INT') {
						this.getOwnerComponent().getRouter().navTo("interfaceFS", {
							object: obj
						});
					} else {
						this.getOwnerComponent().getRouter().navTo("detail");
					}
				} else {

					var oView = this.getView();
					var oDialogMsg = oView.byId("sIdDialog");
					// create dialog lazily
					if (!oDialogMsg) {
						// create dialog via fragment factory
						oDialogMsg = sap.ui.xmlfragment(oView.getId(), "com.automation.toolAutomationNew.fragment.dialog");
						// connect dialog to view (models, lifecycle)
						oView.addDependent(oDialogMsg);
						this.getView().getModel("dialogModel").setData({
							messageTxt: "Please select Object Id from list",
							messageTitle: "Error",
							messageValueState: "Error"
						});
						this.getView().getModel("dialogModel").refresh();
						oDialogMsg.getBeginButton().attachPress(function() {
							oDialogMsg.close();
							oDialogMsg.destroy();
						});
					}
					oDialogMsg.open();
				}
			}
		},
		onRefresh: function() {
			this.byId("oType").refresh();
		},
		onSelection: function() {
			this.byId("table0").setVisible(true);
		},
		onChange: function(oEvent) {
			var selectedKey = oEvent.getSource().getSelectedKey();

			this.byId('otype').setSelectedKey(selectedKey);
		},
		onExistingPress: function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("object");
		},
		onNewPress: function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("newobjectfuncspec");
		},

		selectObjectFromList: function(oEvent) {

			var sSelectedObj = this.byId("objectlist1").getSelectedKey();
			var oObjListInfo;
			if (this.getView().getModel("objectlistNew")) {
				oObjListInfo = this.getView().getModel("objectlistNew").getData();
			}

			var oMapWRICEF = {
				"REP": "Report",
				"INT": "Interface",
				"CNV": "Conversion",
				"ENH": "Enhancement",
				"FRM": "Form",
				"WFLW": "Workflow"
			};
			/** Wricef Object Type - Text */
			var oBTObjectType = this.byId("otype");

			if (oObjListInfo && oObjListInfo.length > 0) {
				for (var iCount = 0; iCount < oObjListInfo.length; iCount++) {

					if (oObjListInfo[iCount].Ricefid === sSelectedObj) {

						// WRICEF Type
						oBTObjectType.setSelectedButton(this.byId("WricefType_" + oObjListInfo[iCount].Projectkey));

						break;
					}
				}
			}

		}
	});
});