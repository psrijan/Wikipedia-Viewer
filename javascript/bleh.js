
var searchEnabled = false; 
var childNumber = 1; 
var searchString=""; 

function toggleSearchEnabled() {
	return searchEnabled == true ? false : true; 
}


function onButtonClick() {
	console.log("Button has been changed"); 
	if(!searchEnabled) {
		$('.search-button').animate({left: '-=100' } , 500 );
		$('.search-box').css({visibility: 'visible'}).animate({opacity: 1} , 1000);
	} else {
		$('.search-button').animate({left: '+=100' } , 500 );
		$('.search-box').animate({opacity: 0} , 1000).css({visibility: 'hidden'}); 
	}
	searchEnabled = toggleSearchEnabled(); 
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
	//captureSearchTextValue();
	moveSearchToTop(); 
	//useWikiRestApi(searchString);  
	createContainers();
}

 /*
 Capture text value in a variable 
  */
function captureSearchTextValue() {
	// searchString = $(".search-box").val(); 
	// console.log(searchString);
}


/*
will move the search button and textfield to
top of the view 
*/
function moveSearchToTop() {
	//hide current search box 
	$(".search-black-box").animate({opacity: '0.0'} , "slow");


}

/**
Consumes the rest api for 
wikipedia and gets all result set 
*/ 
// function useWikiRestApi(var searchValue ) {

// }


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
