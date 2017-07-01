
var searchEnabled = false; 
var childNumber = 1; 
var searchString=""; 
var dataSet; // userful data inside response JSON from WIKI
var searchToolBarEnabled = false; 


var WikiSandBox = {
	"api": "https://en.wikipedia.org/w/api.php?", 
	"properties": "format=jsonfm&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=",
	"site" : "https://en.wikipedia.org/?curid="
}


function closeSearch() {
	console.log("CLOSE LOG");
	// removeExistingSearchItems(); 
	// hideSearchToolBar();
	// showMainSearchPanel();

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

		removeExistingSearchItems(); 
		initiateWikipediaSearch(); 
		
		if(searchToolBarEnabled== false) {
			hideMainSearchPanel();
			showSearchToolBar(); 
			searchToolBarEnabled = true;  
		}
	}
}

function removeExistingSearchItems(){
	console.log("REMOVING ITEMS ")
	$(".search-item-container").empty();
}

function showSearchToolBar(){
	$(".toolbar").css("visibility" , "visible"); 
	$(".toolbar").css("opacity" , "0"); 
	$(".toolbar").animate({opacity: 1} , 1000);
	$("#search-input").val(searchString);
}

function hideSearchToolBar(){
	$(".toolbar").animate({opacity: 0} , 1000,function() {
		$(".toolbar").css("visibility" , "hidden"); 
	});
}

function showMainSearchPanel() {
		// $(".search-container").css("visibility" , "visible");
		// $(".search-container").css("opacity" , "0");
		// $('.search-box').animate({opacity: 1} , 1000); 
}

function hideMainSearchPanel() {
	$(".search-container").animate({opacity:0}, 1000 , function() {
		$(".search-container").css("visibility" , "hidden");
	}) ;

	 $(".search-button").attr("disabled" , true);
	 $(".search-box").attr("disabled" , true);
	 $('.search-box').animate({opacity: 0} , 1000).css({visibility: 'hidden'}); 

}


/**
initiate all wiki related calls 
**/
function initiateWikipediaSearch() {
	console.log("WikiPedia Search started "); 
	captureSearchTextValue(); 
	doRestCall(searchString);
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
	if(!searchToolBarEnabled){
		searchString = $(".search-box").val(); 
	} else {
		searchString = $("#search-input").val();
	}
	console.log("Search String " + searchString); 
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

	$(".search-item-container").append(appendBlock);

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
