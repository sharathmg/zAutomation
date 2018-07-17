sap.ui.define(["sap/ui/model/odata/ODataModel", "sap/m/MessageToast", "com/automation/toolAutomationNew/utils/constants"], function(
	ODataModel, MessageToast, constants) {
	"use strict";
	var oMessageTemplate = new sap.m.MessagePopoverItem({
		Icon: '{Icon}',
		type: '{type}',
		title: '{title}',
		description: '{description}'
	});
	var aErrorMsgData = [];
	// sap.ui.getCore().SucessFlag = false;
	sap.ui.getCore().oMessagePopover = new sap.m.MessagePopover({
		items: {
			path: '/',
			template: oMessageTemplate
		}
	});
	var oModelp = new sap.ui.model.json.JSONModel();
	oModelp.setData(aErrorMsgData);
	sap.ui.getCore().oMessagePopover.setModel(oModelp);

	return {
		fnCallMainTable: function(mParameter) {
			var oVal;
			var sParam = "(";

			$.each(mParameter, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			//SOC Writwick 10 July 2018
			//Changing the service URL from CDS to normal services
			//var sServiceURL = "/sap/opu/odata/sap/ZDDL_MAINTABLE_CDS/ZDDL_MAINTABLE";
			var sServiceURL = "/sap/opu/odata/sap/ZMAIN_TABLE_SRV/MAIN_TABLESet";
			//EOC Writwick 10 July 2018
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam + "?$format=json",
				datatype: "application/json"
			});
			if (oRes.success) {
				//SOC Writwick 16 July 2018
				// oVal = oRes.data.d.fieldvalue;
				oVal = oRes.data.d.Fieldvalue;
				//EOC Writwick 16 July 2018
			}
			return oVal;
		},

		fnGetDataMainTable: function(oPayload, oModelData, paraName, oModelDataSuccess) {
			var sParam = "(";

			$.each(oPayload, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			var sServiceURL = "";
			//SOC Writwick 10 July 2018
			// if(oPayload.stepno === "S1") {
			if(oPayload.Stepno === "S1") {
				//Changing the service URL from CDS to normal services
				//sServiceURL = "/sap/opu/odata/sap/ZDDL_MAINTABLE_CDS/ZDDL_MAINTABLE";
				sServiceURL = "/sap/opu/odata/sap/ZMAIN_TABLE_SRV/MAIN_TABLESet";
			}
			// else if (oPayload.stepno === "S2") {
			else if (oPayload.Stepno === "S2") {
				// sServiceURL = "/sap/opu/odata/sap/ZDDL_MAINTABLE_TS_CDS/ZDDL_MAINTABLE_TS";
				sServiceURL = "/sap/opu/odata/sap/ZMAIN_TABLE_SRV/MAIN_TABLESet";
				//EOC Writwick 10 July 2018
			}
			
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam + "?$format=json",
				datatype: "application/json",
				async: true
			});
			
			//SOC Writwick 16 July 2018
			if (oRes.data.d.Fieldname === "" && oRes.data.d.Processid === "" && oRes.data.d.Projectkey === "") {
				oRes.success = false;
			}
			
			if (oRes.success) {
				if ((paraName === "Rating") || (paraName === "ReviewCommentsRating") || (paraName === "WFRatings")) {
					//SOC Writwick 16 July 2018
					// oModelData[paraName] = parseInt(oRes.data.d.fieldvalue);
					oModelData[paraName] = parseInt(oRes.data.d.Fieldvalue);
					//EOC Writwick 16 July 2018
				} else {
					//SOC Writwick 12 July 2018
					// oModelData[paraName] = oRes.data.d.fieldvalue;
					oModelData[paraName] = oRes.data.d.Fieldvalue;
					//EOC Writwick 12 July 2018
				}

				if (oModelDataSuccess) {
					oModelDataSuccess[paraName] = true;
				}
			} else {
				oModelDataSuccess[paraName] = false;
			}
		},
		fnGetDataMainTableUC: function(oPayload, oModelData, paraName, oModelDataSuccess) {
			var sParam = "(";

			$.each(oPayload, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			var sServiceURL = "";
			//SOC Writwick 10 July 2018
			// if(oPayload.stepno === "S1") {
			if(oPayload.Stepno === "S1") {
				//Changing the service URL from CDS to normal services
				//sServiceURL = "/sap/opu/odata/sap/ZDDL_MAINTABLE_CDS/ZDDL_MAINTABLE";
				sServiceURL = "/sap/opu/odata/sap/ZMAIN_TABLE_SRV/MAIN_TABLESet";
			}
			// else if (oPayload.stepno === "S2") {
			else if (oPayload.Stepno === "S2") {
				// sServiceURL = "/sap/opu/odata/sap/ZDDL_MAINTABLE_TS_CDS/ZDDL_MAINTABLE_TS";
				sServiceURL = "/sap/opu/odata/sap/ZMAIN_TABLE_SRV/MAIN_TABLESet";
				//EOC Writwick 10 July 2018
			}
			
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam + "?$format=json",
				datatype: "application/json",
				async: true
			});
			//SOC 16th July 2018
			if (oRes.data.d.Fieldname === "" && oRes.data.d.Processid === "" && oRes.data.d.Projectkey === "") {
				oRes.success = false;
			}
			//EOC 16th July 2018
			if (oRes.success) {
				if ((paraName === "Rating") || (paraName === "ReviewCommentsRating") || (paraName === "WFRatings")) {
					//SOC Writwick 16 July 2018
					// oModelData[paraName] = parseInt(oRes.data.d.fieldvalue);
					oModelData[paraName] = parseInt(oRes.data.d.Fieldvalue);
					//EOC Writwick 16 July 2018
				} else {
					//SOC Writwick 16 July 2018
					oModelData[paraName] = oRes.data.d.Fieldvalue;
					//EOC Writwick 16 July 2018
				}

				if (oModelDataSuccess) {
					oModelDataSuccess[paraName] = true;
				}
			} else {
				oModelDataSuccess[paraName] = false;
				return;
			}
		},
		fnGetProccessArea: function(oModelData) {

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			var sServiceURL = "/sap/opu/odata/SAP/ZPROJECT_HEADER_SRV/ProcessAreaSet";
			var oVal;
			var oArr = [];
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + "?$format=json",
				datatype: "application/json",
				async: true
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;

				for (var i = 0; i < ((oVal.length)); i++) {
					oArr.push({
						ProcessAreaName: oVal[i].ProcessAreaName
					});

				}
				oModelData["processArea"] = oArr;

			} else {
				console.info("Error in service call");
			}

			return oArr;
		},
		fnGetInterfaceType: function(oModelData) {

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			var sServiceURL = "/sap/opu/odata/SAP/ZAUTOMATION_SRV/InterfaceTypeSet";
			var oVal;
			var oArr = [];
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + "?$format=json",
				datatype: "application/json",
				async: true
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;

				for (var i = 0; i < ((oVal.length)); i++) {
					oArr.push({
						InterfaceTypeName: oVal[i].InterfaceTypeName
					});

				}
				oModelData["intType"] = oArr;

			} else {
				console.info("Error in service call");
			}

			return oArr;
		},
		fnGetAvailableSystems: function(oModelData) {

			//	var sServiceURL = "/R4E_HANA/AutoFSTS/AutoFSTS_XSProject/DADG_ODS_MAINTABLE.xsodata/MainTable";
			var sServiceURL = "/sap/opu/odata/SAP/ZPROJECT_HEADER_SRV/AvailableSystemSet";
			var oVal;
			var oArr = [];
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + "?$format=json",
				datatype: "application/json",
				async: true
			});
			if (oRes.success) {
				oVal = oRes.data.d.results;

				for (var i = 0; i < ((oVal.length)); i++) {
					oArr.push({
						AvailableSystemName: oVal[i].AvailableSystemName
					});

				}
				oModelData["AvailableSystem"] = oArr;

			} else {
				console.info("Error in service call");
			}

			return oArr;
		},
		fnSubmitInMainTable: function(mParameter) {

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.create("/MAIN_TABLESet", mParameter, {
				async: true,
				success: function(oResult) {
					
				},
				error: function(errorRes) {
					
				}
			});
		},
		/**
		 * @mParameter (Map): Request Payload
		 * @uParameter (Map): URL Parameter
		 * @bUpdate (Boolean): This is true in case of Update Scenario otherwise a Create Screnario. Is Create scenario by default.
		 **/
		fnUpdateInMainTable: function(mParameter, uParameter, bUpdate) {
			var sParam = "(";

			$.each(uParameter, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);

			if (bUpdate) {

				oModelService.update(
					"/MAIN_TABLESet" + sParam, mParameter, {
						async: true,
						success: function(oResult, mHeader) {
							// if(mParameter.Projectkey === "WFLW" || mParameter.Projectkey === "WFLW" ||mParameter.Projectkey === "ENH")
							// {
							// 	sap.ui.getCore().SucessFlag = true;
							// }
							// else{

							// }
							// var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
							// aErrorMsgData.push({
							// 	icon: "sap-icon://message-success",
							// 	type: 'Success',
							// 	title: 'Details Updated',
							// 	description: messageServ

							// });
							// sap.ui.getCore().oMessagePopover.destroyItems();
							// var oModelp = new sap.ui.model.json.JSONModel();
							// oModelp.setData(aErrorMsgData);
							// sap.ui.getCore().oMessagePopover.setModel(oModelp);
							// sap.ui.getCore().oMessagePopover.setVisible(true);

						},
						error: function(oResult, mHeader) {
							// var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
							// aErrorMsgData.push({
							// 	icon: "sap-icon://message-error",
							// 	type: 'Error',
							// 	title: 'Error In Update',
							// 	description: messageServ

							// });
							// sap.ui.getCore().oMessagePopover.destroyItems();
							// var oModelp = new sap.ui.model.json.JSONModel();
							// oModelp.setData(aErrorMsgData);
							// sap.ui.getCore().oMessagePopover.setModel(oModelp);
							// sap.ui.getCore().oMessagePopover.setVisible(true);
						}
					});
			} else {
				oModelService.create("/MAIN_TABLESet", mParameter, {
					async: true,
					success: function(oResult) {
						// aErrorMsgData.push({
						// 	icon: "sap-icon://message-success",
						// 	type: 'Success',
						// 	title: 'Details Created',
						// 	description: oResult.Message

						// });
						// var oModelp = new sap.ui.model.json.JSONModel();
						// oModelp.setData(aErrorMsgData);
						// sap.ui.getCore().oMessagePopover.setModel(oModelp);
						// sap.ui.getCore().oMessagePopover.setVisible(true);
						sap.ui.getCore().SucessFlag = true;
					},
					error: function(oResult) {
						// aErrorMsgData.push({
						// 	icon: "sap-icon://message-error",
						// 	type: 'Error',
						// 	title: 'Error In Create',
						// 	description: "Error In Create:" + JSON.parse(oResult.request.body).Fieldname

						// });
						// sap.ui.getCore().oMessagePopover.destroyItems();
						// var oModelp = new sap.ui.model.json.JSONModel();
						// oModelp.setData(aErrorMsgData);
						// sap.ui.getCore().oMessagePopover.setModel(oModelp);
						// sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
			}

		},
		
			fnUpdateInMainTableApprover: function(mParameter, uParameter, bUpdate) {
			var sParam = "(";
			

			$.each(uParameter, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);

			if (bUpdate) {

				oModelService.update(
					"/MAIN_TABLESet" + sParam, mParameter, {
						async: true,
						headers :	{"if-match": "W/\"datetimeoffset'2017-05-05T09%3A15%3A05.6050000Z'\""},
						success: function(oResult, mHeader) {
							// if(mParameter.Projectkey === "WFLW" || mParameter.Projectkey === "WFLW" ||mParameter.Projectkey === "ENH")
							// {
							// 	sap.ui.getCore().SucessFlag = true;
							// }
							// else{

							// }
							// var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
							// aErrorMsgData.push({
							// 	icon: "sap-icon://message-success",
							// 	type: 'Success',
							// 	title: 'Details Updated',
							// 	description: messageServ

							// });
							// sap.ui.getCore().oMessagePopover.destroyItems();
							// var oModelp = new sap.ui.model.json.JSONModel();
							// oModelp.setData(aErrorMsgData);
							// sap.ui.getCore().oMessagePopover.setModel(oModelp);
							// sap.ui.getCore().oMessagePopover.setVisible(true);

						},
						error: function(oResult, mHeader) {
							// var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
							// aErrorMsgData.push({
							// 	icon: "sap-icon://message-error",
							// 	type: 'Error',
							// 	title: 'Error In Update',
							// 	description: messageServ

							// });
							// sap.ui.getCore().oMessagePopover.destroyItems();
							// var oModelp = new sap.ui.model.json.JSONModel();
							// oModelp.setData(aErrorMsgData);
							// sap.ui.getCore().oMessagePopover.setModel(oModelp);
							// sap.ui.getCore().oMessagePopover.setVisible(true);
						}
					});
			} else {
				oModelService.create("/MAIN_TABLESet", mParameter, {
					async: true,
					success: function(oResult) {
						// aErrorMsgData.push({
						// 	icon: "sap-icon://message-success",
						// 	type: 'Success',
						// 	title: 'Details Created',
						// 	description: oResult.Message

						// });
						// var oModelp = new sap.ui.model.json.JSONModel();
						// oModelp.setData(aErrorMsgData);
						// sap.ui.getCore().oMessagePopover.setModel(oModelp);
						// sap.ui.getCore().oMessagePopover.setVisible(true);
						sap.ui.getCore().SucessFlag = true;
					},
					error: function(oResult) {
						// aErrorMsgData.push({
						// 	icon: "sap-icon://message-error",
						// 	type: 'Error',
						// 	title: 'Error In Create',
						// 	description: "Error In Create:" + JSON.parse(oResult.request.body).Fieldname

						// });
						// sap.ui.getCore().oMessagePopover.destroyItems();
						// var oModelp = new sap.ui.model.json.JSONModel();
						// oModelp.setData(aErrorMsgData);
						// sap.ui.getCore().oMessagePopover.setModel(oModelp);
						// sap.ui.getCore().oMessagePopover.setVisible(true);
					}
				});
			}

		},

		fnDeleteInMainTable: function(mParameter, uParameter) {
			var sParam = "(";

			$.each(uParameter, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);

			oModelService.remove(
				"/MAIN_TABLESet" + sParam, mParameter, {
					async: true,
					success: function(oResult, mHeader) {
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

		callAttachmentService: function(oFileUploader, sField, readAttachPara, oViewModel, attachPropList, attachTableVisib) { // fnCallReadAttachments
			var oRef = this;
			var count = 0;
			/* Generate URL with service name and entity name */
			var sFileUploadUrl =
				//	/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet(REPID='ENH-083b-US-E-2104',PROJECTKEY='ENH',PROCESSID='PR005',STEPNO='S1',FIELDNAME='EnhReq')/$value";
				"/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV/ZTATTACHMENTSet";
			oFileUploader.setUploadUrl(sFileUploadUrl);

			//	var fnReadAttachments = fnCallReadAttachments;
			var oReadAttachPara = readAttachPara;
			oReadAttachPara.FIELDNAME = sField;
			oRef.stepNo = oReadAttachPara.STEPNO;
			var oModelView = oViewModel;
			var aAttachPropList = attachPropList;
			var sAttachTableVisibility = attachTableVisib;
			oFileUploader.attachUploadComplete(function(oEvent) {
				sap.ui.core.BusyIndicator.hide();
				count++;
				var sStatusResp = oEvent.getParameter("status");

				if ((sStatusResp == 200 || sStatusResp == 201)) {
					if (oReadAttachPara && oModelView && aAttachPropList) {
						oRef.readAttachmentList(oReadAttachPara, oModelView, aAttachPropList, sAttachTableVisibility);
					}
					if (count === 1) {
						sap.m.MessageBox.show(
							"Attachment uploaded successfully.", {
								icon: sap.m.MessageBox.Icon.SUCCESS,
								title: "Success",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function(oAction) {

									if (oAction === "OK") {
										// Do nothings
										oFileUploader.setValue("");
									}

								}
							}
						);
					}
				} else {
					if (count === 1) {
						sap.m.MessageBox.show(
							"Attachment upload failed.", {
								icon: sap.m.MessageBox.Icon.ERROR,
								title: "Error",
								actions: [sap.m.MessageBox.Action.OK],
								onClose: function(oAction) {

									if (oAction === "OK") {
										// Do nothings
										oFileUploader.setValue("");
									}

								}
							}
						);
					}
				}
			});
			var sCsrfToken = "";

			jQuery.ajax({
				url: "/sap/opu/odata/SAP/ZATTACHMENT_EXEL_SRV",
				method: "GET",
				headers: {
					"X-CSRF-Token": "fetch"
				},
				dataType: 'json',
				contentType: "application/json",
				success: function(data, response, headers) {

					sCsrfToken = headers.getResponseHeader("x-csrf-token");

					oFileUploader.removeAllHeaderParameters();

					var oParam = sap.ui.getCore().getModel("ObjectInformation").getData().objectInfo;
					
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "X-CSRF-Token",
						value: sCsrfToken
					}));

					//(REPID='ENH-083b-US-E-2104',PROJECTKEY='ENH',PROCESSID='PR005',STEPNO='S1',FIELDNAME='EnhReq')/$value";
					//SOC Writwick 10 July 2018
					// oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					// 	name: "repid",
					// 	value: oParam.repid
					// }));
					// oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					// 	name: "projectkey",
					// 	value: oParam.projectkey
					// }));
					// oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					// 	name: "processid",
					// 	value: oParam.processid
					// }));
					// oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					// 	name: "stepno",
					// 	value: oRef.stepNo
					// }));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "repid",
						value: oParam.Repid
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "projectkey",
						value: oParam.Projectkey
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "processid",
						value: oParam.Processid
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "stepno",
						value: oRef.StepNo
					}));
					//EOC Writwick 10 July 2018
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "fieldname",
						value: sField
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "type",
						value: "O"
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "filename",
						value: oFileUploader.getValue()
					}));
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						name: "projectid",
						value: ""
					}));
					sap.ui.core.BusyIndicator.show();
					oFileUploader.upload();
				},
				error: function(resp) {
					sap.ui.core.BusyIndicator.hide();
					console.log(resp);
				}
			});

		},

		readAttachmentList: function(mParameter, oViewModel, attachPropList, attachTableVisib) {

			var aAttachList;
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
				aAttachList = oRes.data.d.results;
				oViewModel.getData()[attachPropList] = [];
				$.each(aAttachList, function(index, item) {
					oViewModel.getData()[attachPropList].push({
						fileName: item.FILENAME,
						fileURL: item.__metadata.media_src,
						fileDelURI: item.__metadata.uri
					});
					oViewModel.getData()[attachTableVisib] = true;
				});
				oViewModel.refresh();

			} else {
//				console.info("Error in attachment service call");
			}
		},

		deleteAttachment: function(filePath) {

			var sServUrl = "/sap/opu/odata/sap/ZATTACHMENT_EXEL_SRV/";
			var oModelService = new sap.ui.model.odata.ODataModel(sServUrl);
			var bSuccess = false;
			oModelService.remove(filePath.split(sServUrl)[1], {
				success: function() {
					bSuccess = true;
				},
				error: function() {

				}
			});
			return bSuccess;
		},

		fnSendMail: function(pReceiverMailID, pObjectId, pProjectID, pURL, pApprover, pSender, pObjectTitle, pMailSubject, pMailBody) {
			var mailSubject = pMailSubject && pMailSubject.trim().length ? pMailSubject : constants.getEmailSubject(pObjectId, pProjectID);
			var mailBody = pMailBody && pMailBody.trim().length ? pMailBody : constants.getEmailBody(pApprover, pSender, pURL, pObjectId,
				pObjectTitle);

			//document.location = "mailto:" + pReceiverMailID + "?subject=" + mailSubject + "&body=" + mailBody;
			// document.location.
			sap.m.URLHelper.triggerEmail(pReceiverMailID, mailSubject, mailBody, '', '');
		},

		fnGetURL: function(pParam, pProjectID, pCurrentVersion) {
			var versionno = pCurrentVersion.split(" ");
			if (pParam && pParam.projectkey) {
				//SOC Writwick 10 July 2018
				// var mParameter = "&version_id=" + versionno[1] + "&repid=" + pParam.repid + "&projectkey=" + pParam.projectkey + "&processid=" +
				// 	pParam.processid + "&stepno=" +
				// 	pParam.stepno + "&projectid=" + pProjectID;
				var mParameter = "&Version" + versionno[1] + "&Repid=" + pParam.Repid + "&Projectkey=" + pParam.Projectkey + "&Processid=" +
					pParam.Processid + "&Stepno=" +
					pParam.Stepno + "&Projectid=" + pProjectID;
				//EOC Writwick 10 July 2018
				var projectKey;
				switch (pParam.projectkey) {
					case "INT":
						projectKey = "Interface";
						break;
					case "REP":
						projectKey = "Report";
						break;
					case "CNV":
						projectKey = "Conversion";
						break;
					case "ENH":
						projectKey = "Enhancement";
						break;
					case "FRM":
						projectKey = "Form";
						break;
					case "WFLW":
						projectKey = "Workflow";
						break;
				}

				var sURL = "/sap/bc/ui5_ui5/sap/ZAUTO_HTML/" + projectKey + "_FS.html?sap-language=EN" + mParameter;
			}
			return sURL;
		},

		fnGetLoggedInUserDetails: function(oPayload, oModelData, paraName) {
			var sParam = "(";

			$.each(oPayload, function(key, val) {
				sParam += key + "='" + val + "',";
			});
			sParam = sParam.substr(0, sParam.length - 1);
			sParam += ")";

			var sServiceURL = "/sap/opu/odata/sap/ZUSER_MASTER_SRV/USER_DATASet";
			var oRes = jQuery.sap.sjax({
				url: sServiceURL + sParam + "?$format=json",
				datatype: "application/json",
				async: true
			});
			if (oRes.success) {
				oModelData[paraName] = oRes.data.d[paraName];
			} else {
				console.info("Error in service call");
			}
		},

		fnRemoveInMainTable: function(oParam) {
			var that = this;
			var aErrorMsgData = [];
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			oModelService.remove("/MAIN_TABLESet(Version='" + oParam.Version + "',Repid='" + oParam.Repid + "',Projectkey='" + oParam.Projectkey +
				"',Processid='" + oParam.Processid +
				"',Stepno='" + oParam.Stepno + "',Fieldname='" + oParam.Fieldname + "')", {
					success: function(oResult, mHeader) {
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
		fnUpdateMainTableBatchCall: function(mParameter, uParameter, bUpdatePara) {

			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);

			var batchChanges = [];
			$.each(bUpdatePara, function(index, sValue) {

				// Update Scenario
				if (sValue[0]) {

					uParameter.Fieldname = sValue[1];
					mParameter.Fieldname = sValue[2];
					mParameter.Fieldvalue = sValue[3];

					var sParam = "(";
					$.each(uParameter, function(key, val) {
						sParam += key + "='" + val + "',";
					});
					sParam = sParam.substr(0, sParam.length - 1);
					sParam += ")";
					batchChanges.push(oModelService.createBatchOperation("/MAIN_TABLESet" + sParam, "PUT", mParameter));

				} else {

					mParameter.Fieldname = sValue[2];
					mParameter.Fieldvalue = sValue[3];
					batchChanges.push(oModelService.createBatchOperation("/MAIN_TABLESet", "POST", mParameter));

				}
			});
			oModelService.addBatchChangeOperations(batchChanges);
			oModelService.submitBatch(function(oResult, mHeader) {
				debugger;
				var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
				aErrorMsgData.push({
					icon: "sap-icon://message-success",
					type: 'Success',
					title: 'Details Updated',
					description: messageServ

				});
				var oModelp = new sap.ui.model.json.JSONModel();
				oModelp.setData(aErrorMsgData);
				sap.ui.getCore().oMessagePopover.setModel(oModelp);
				sap.ui.getCore().oMessagePopover.setVisible(true);
			}, function(oResult, mHeader) {
				debugger;
				var messageServ = JSON.parse(mHeader.headers["sap-message"]).message;
				aErrorMsgData.push({
					icon: "sap-icon://message-error",
					type: 'Error',
					title: 'Error In Update',
					description: messageServ

				});
				var oModelp = new sap.ui.model.json.JSONModel();
				oModelp.setData(aErrorMsgData);
				sap.ui.getCore().oMessagePopover.setModel(oModelp);
				sap.ui.getCore().oMessagePopover.setVisible(true);
			});
		},

		/**
		 * Description: Batch Read Call for reading document details
		 * uParameter: URL Parameter
		 * oModelData: Model Bound to view data
		 * oModelReadSuccess: Model retaining if the field is maintained in backend on not.
		 * aReadDocData: Array of size 2 [FrontEndModelFieldName, BackendFieldName]
		 * currentView: Current View
		 * fnCallBackOnSuccess: Call Back Function on Success
		 */
		fnReadDocDataBatchCall: function(uParameter, oModelData, oModelReadSuccess, aReadDocData, currentView, oViewModelName,
			fnCallBackOnSuccess) {
			
			//SOC Writwick 10 July 2018
			//Changing the service URL from CDS to normal services
			// var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDDL_MAINTABLE_CDS", {
			// 	json: true
			// });
			var oModelService = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZMAIN_TABLE_SRV", true);
			//EOC Writwick 10 July 2018

			var batchChanges = [];
			var paraName, fieldName, fieldValue;
			$.each(aReadDocData, function(index, sValue) {

				// Pass Backend Field Name in URL
				uParameter.fieldname = sValue[1];

				var sParam = "(";
				$.each(uParameter, function(key, val) {
					sParam += key + "='" + val + "',";
				});
				sParam = sParam.substr(0, sParam.length - 1);
				sParam += ")";
				//SOC Writwick 10 July 2018
				//Changing the service URL from CDS to normal services
				// batchChanges.push(oModelService.createBatchOperation("/ZDDL_MAINTABLE" + sParam + "?$format=json", "GET"));
				batchChanges.push(oModelService.createBatchOperation("/MAIN_TABLESet" + sParam + "?$format=json", "GET"));
				//EOC Writwick 10 July 2018
			});
			//			oModelService.setUseBatch(true);
			oModelService.addBatchReadOperations(batchChanges);
			oModelService.submitBatch(function(oResult, mHeader) {

				$.each(oResult.__batchResponses, function(index, sValue) {

					fieldName = sValue.data.fieldname;
					fieldValue = sValue.data.fieldvalue;

					/** Read front end field Name bound to View Model */
					paraName = (aReadDocData[index])[0];

					if ((paraName === "Rating") || (paraName === "ReviewCommentsRating") || (paraName === "WFRatings")) {
						oModelData[paraName] = parseInt(fieldValue);
					} else {
						oModelData[paraName] = fieldValue;
					}

					currentView.getModel(oViewModelName).setProperty(paraName, oModelData[paraName]);

					/** Update Boolean Model to retain information if field exists in Backend or not */
					if (oModelReadSuccess) {
						oModelReadSuccess[paraName] = true;
					}
				});
				currentView.getModel(oViewModelName).refresh();
				if (fnCallBackOnSuccess) {
					fnCallBackOnSuccess();
				}
			}, function(oResult, mHeader) {

				try {
					var messageServ = (JSON.parse(oResult.response.body)).error.message.value;
					console.info(messageServ);
				} catch (excp) {
					console.info(excp);
				}
				try {
					$.each(oResult.__batchResponses, function(index, sValue) {

						paraName = (aReadDocData[index])[0];
						if (oModelReadSuccess) {
							oModelReadSuccess[paraName] = false;
						}
					});
				} catch (excp) {
					console.info(excp + " Batch read failed");
				}
			});
		}
	};
});