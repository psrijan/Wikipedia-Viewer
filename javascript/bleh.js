function onButtonClick() {
	console.log("Button has been changed"); 
	$('.search-box').css('visibility' , 'visible');

}


function onTextChange() {
	console.log("TEXT HAS BEEN CHANGED "); 

	var key = window.event.keyCode; 
	if(key === 13) {
		initiateWikipediaSearch(); 
	}
}

function initiateWikipediaSearch() {
	console.log("WikiPedia Search started "); 
	createContainers();
}

var childNumber = 1; 

function createContainers() {

	childNumber++; 
	var newChild = '<div class=\"row childrow\">' + 
		'<div class=\"row new-child-item\">' +
			'<div class=\" col col-sm-4 \"> <h1> TOPIC </div>' + 
			'<div class=\" col col-sm-4\"><h2> Body </h2> </div>' + 
		'</div>'

	'</div>' ;
	var parent = document.getElementById('want-more-children'); 
	console.log("Parent " + parent);
	parent.insertAdjacentHTML('beforeend' , newChild); 
}
