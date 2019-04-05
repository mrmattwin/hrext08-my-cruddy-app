var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text(message);
}

var updateBudgetStatus = function(message) {
	$('#statusBudget').text(message);
}

var chartData = Object.keys(localStorage).map(function(key) {
   return [key, Number(localStorage[key])];
});


var budgetAmount;

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	$('#btn-create').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			updateStatusLabel('Expense already exists, use update button instead!');
		} else if (key === '') {
			updateStatusLabel('Invalid input!')
		}else if (isNaN(Number(value)) || value === '') {
			updateStatusLabel('Amount must be a number!')
		}else {
			createEntry(key, value);
			updateStatusLabel('Expense added - ' + key);
			document.getElementById('key').value='';
			document.getElementById('value').value='';
		}

		loadLocalStorage();
		chartData = Object.keys(localStorage).map(function(key) {
		   return [key, Number(localStorage[key])];
		});
		checkTotalBudget();
		chart.load({
        columns: chartData
   		});

	});

	$('#btn-update').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('Expense not updated - that value already exists!')
		} else if (isNaN(Number(value))) {
			updateStatusLabel('Amount must be a number!')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('Expense updated - ' + key);
			document.getElementById('key').value='';
			document.getElementById('value').value='';
		} else if (key === '') {
			updateStatusLabel('Invalid input!')
		} else {
			updateStatusLabel('Expense doesn\'t exist, use create button instead!');
		}		
		
		loadLocalStorage();	
		chartData = Object.keys(localStorage).map(function(key) {
		   return [key, Number(localStorage[key])];
		});
		checkTotalBudget();
		chart.load({
        columns: chartData
   		});
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('Expense removed - ' + key);
			document.getElementById('key').value='';
			document.getElementById('value').value='';
		} else if (key === '') {
			updateStatusLabel('Invalid input!')
		} else {
			updateStatusLabel('Expense doesn\'t exist, nothing removed.');
		}

		loadLocalStorage();
		chartData = Object.keys(localStorage).map(function(key) {
		   return [key, Number(localStorage[key])];
		});
		checkTotalBudget();
		chart.load({
		unload: true,
        columns: chartData
   		});
	});

	$('#btn-budget').on('click', function(e){
		var sum = 0;
		chartData.forEach(function(element){
			sum += element[1];
		});
		budgetAmount = Number($('#totalBudget').val());

		if(sum > 0) {
			checkTotalBudget();
		} 

		if(isNaN(Number(budgetAmount))) {
			updateBudgetStatus(`Must enter a number!`);
		} else if(budgetAmount === 0) {
			updateBudgetStatus(`Must enter an amount!`);
		} else if (sum > 0) {
			checkTotalBudget();
		} else {
			updateBudgetStatus(`Total budget set to $${budgetAmount}`);
		}

		
	});	
});

var chart = c3.generate({
    data: {
        columns: chartData,  
        type : 'pie',
        empty: { label: { text: "No Data Available" }   }
    },
    tooltip: { 
    	format: { 
    		value: function (x) { 
				var format = d3.format('$,');
    			return format(x); } } },
	// pie: {
 //        label: {
 //            format: function (value, ratio, id) {
 //                return d3.format('$,')(value);
 //            }
 //        }
 //    }
});


// d3.selectAll(".c3-legend-item-chartData text").text(chartData)


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

var checkTotalBudget = function() {
	var sum = 0;
	chartData.forEach(function(element){
		sum += element[1];
	});
	if(!budgetAmount) {
		updateBudgetStatus(`Total budget not set yet!`);
	} else if(sum > budgetAmount) {
		updateBudgetStatus(`Overbudget by $${-(budgetAmount - sum)}!`);
	} else if(sum < budgetAmount) {
		updateBudgetStatus(`$${(budgetAmount - sum)} left in budget`);
	} else if (sum === budgetAmount) {
		updateBudgetStatus(`BUDGET MAXED`);
	} 
}



