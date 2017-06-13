
var searchEnabled = false; 
var childNumber = 1; 



function toggleSearchEnabled() {
	return searchEnabled == true ? false : true; 
}


function onButtonClick() {
	console.log("Button has been changed"); 
	searchEnabled = toggleSearchEnabled(); 
	$('.search-button').animate({left: '-=100' } , 500 );
	$('.search-box').css('visibility' , 'visible');
	
}


/*
What to do on text change
if it is ENTER button then 
initiate the search 
*/
function onTextChange() {
	console.log("TEXT HAS BEEN CHANGED "); 

	var key = window.event.keyCode; 
	if(key === 13) {
		initiateWikipediaSearch(); 
	}
}

/**
initiate all wiki related calls 

**/
function initiateWikipediaSearch() {
	console.log("WikiPedia Search started "); 
	createContainers();
}


/**
This function will create new containers to hold the 
wiki data 
**/
function createContainers() {

	childNumber++; 
	var newChild = '<div class=\"row childrow\">' + 
		'<div class=\"row new-child-item\">' +
			'<div class=\" row child-heading \"> <h1> TOPIC </div>' + 
			'<div class=\" row child-data\"><h2> Body </h2> </div>' + 
		'</div>'

	'</div>' ;
	var parent = document.getElementById('want-more-children'); 
	console.log("Parent " + parent);
	parent.insertAdjacentHTML('beforeend' , newChild); 
}
