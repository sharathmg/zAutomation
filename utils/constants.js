sap.ui.define([], function() {

	var fsSubmitted_EmailSubject = "FS Ready for Review";
	//var fsSubmitted_EmailBody = "FS has been submitted successfully. Please Approve.";

	return {
		getEmailSubject: function(pObjectId, pProjectID) {
			var subject = pProjectID + " - " + pObjectId + " - " + fsSubmitted_EmailSubject;
			return subject;
		},
		getEmailBody: function(pApprover, pSender, pURL, pObjectId, pObjectTitle) {
			var emailBody = "Hi " + pApprover + "," + "\r\n\n" +
			"FS for caption object is completed and ready for review and kindly follow the link below to review the object ." + "\r\n\n" + 
			pObjectId + " - " + pObjectTitle + "\r\n\n" + "Link - " + pURL + "\r\n\n" + "Regards," + "\r\n" + pSender;
			return emailBody;
		},
		getRandomNumber: function(){
			var min=1000, max=100000;
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	};

});