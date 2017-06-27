
var searchEnabled = false; 
var childNumber = 1; 
var searchString=""; 
var dataSet; // userful data inside response JSON from WIKI

var WikiSandBox = {
	"api": "https://en.wikipedia.org/w/api.php?", 
	"properties": "format=jsonfm&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=",
	"site" : "https://en.wikipedia.org/?curid="
}


function toggleSearchEnabled() {
	return searchEnabled == true ? false : true; 
}


function onButtonClick() {
	console.log("Button has been changed"); 

	if(!searchEnabled) {
		$(".search-button").removeClass("animate").removeClass("pulse");
		$('.search-button').animate({left: '-=100' } , 500 );
		$('.search-box').css({visibility: 'visible'}).animate({opacity: 1} , 1000);
	} else {
		$(".search-button").addClass("animate").addClass("pulse");
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
	captureSearchTextValue();
	moveSearchToTop(); 
	doRestCall(searchString);
	createContainers();
}
 
function doRestCall(searchParam) {
	console.log("Performing rest call + SERACH STRING: " + searchParam ); 
	var completeApi = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
	var enddStr = '&callback=?';
	var searchUrl = completeApi +searchParam + enddStr; 
	console.log(searchUrl);

	$.getJSON(searchUrl, function(data){
		console.log("json fetch success " + JSON.stringify(data)); 
		dataSet = data.query.pages;
		$.each( dataSet , function(key , value ) {
			createContainers(value.title , value.extract , WikiSandBox.site + value.pageid); 
		});
	});
}


 /*
 Capture text value in a variable 
  */
function captureSearchTextValue() {
	searchString = $(".search-box").val(); 
	console.log("Search String " + searchString); 
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
This function will create new containers to hold the 
wiki data 
**/
function createContainers(heading , body, url ) {
	console.log("HEADING: " + heading); 
	console.log("BODY: " + body );
	console.log("URL: " + url); 

	childNumber++;

	var appendBlock = "<div class='block-link search-item pretty'>";
	appendBlock += "<h1>" + heading + " </h1> " ;  
	appendBlock += "<p> " + body + " </p> " ;
	appendBlock += " <a class='site-link' href='" + url + "' class = 'block-link__overlay-link'> This entire box </a>  "  ; 
	appendBlock+= "</div>"; 

	$(".container").append(appendBlock);

	// var divStart  = '<div class="row childrow">' + 
	// var 
	// 	'<div class=\"row new-child-item\">' +
	// 		'<h1> ' + heading + ' </h1><br/>' + 
	// 		'<h3> ' + body+ ' </h3>' + 
	// 	'</div>'

	// '</div>' ;
	// var parent = document.getElementById('want-more-children'); 
	// console.log("Parent " + parent);
	// parent.insertAdjacentHTML('beforeend' , newChild); 
}
