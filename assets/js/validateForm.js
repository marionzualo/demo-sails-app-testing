function validateForm(name, email, password, form, error){
	//form and error are jQuery objects that are passed as inputs
	//this way it is easier to test the function

	if(!form || !error){
		return;
	}

	if( !name || !email || !password){
		error.css('display','block');
		return;
	}

	form.submit();
	return;
}


//module.exports is not available in the browser
//so it is only exposed in the server for testing purposes
if (typeof module !== 'undefined') {
   module.exports.validateForm = validateForm;
}
