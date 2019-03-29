var loadLocalStorage = function () {
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	//loadLocalStorage();

	$('#btn-create').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = !!localStorage.getItem(key);

		if (keyExists) {
			updateStatusLabel('key already exists, please use update button instead! :D');
		} else {
			createEntry(key, value);
			updateStatusLabel('key created - ' + key);
		}
	});

	$('#btn-update').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = !!localStorage.getItem(key);

		if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('key updated - ' + key);
		} else {
			updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
		}		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = !!localStorage.getItem(key);

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('key removed - ' + key);
		} else {
			updateStatusLabel('key doesn\'t exist, nothing removed. :|');
		}		
	});	

});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
