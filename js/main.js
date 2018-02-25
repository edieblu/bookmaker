// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
	// get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}

	var bookmark = {
		'name': siteName,
		'url' : siteUrl
	}
	// test if bookmarks is null

	if(localStorage.getItem('bookmarks') === null) {
		// init array
		var bookmarks = [];
		// add to array
		bookmarks.push(bookmark);
		// set to Local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		// fetch from Local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to the array
		bookmarks.push(bookmark);
		// re-set to localStorage

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

		// clear form
		document.getElementById('myForm').reset();
		// Re-fetch bookmarks
		fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

// delete bookmark
function deleteBookmark(url){
	// get bookmarks from Local Storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
	// loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
			if(bookmarks[i].url === url) {
				bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output ID
	var bookmarksResults = document.getElementById('bookmarksResults');

	// build output
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResults.innerHTML += '<div class="well">'+
		                              '<h3>'+name+ 
		                              ' <a class = "btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
		                              ' <a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-default" href="#">Delete</a> ' +
		                              '</h3>' +
		                              '</div>'                             
	
		}
	}

	function validateForm(siteName, siteUrl){
		// validation
		if(!siteName || !siteUrl){
			alert("Please fill in the form.");
			return false;
		}

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);

		if(!siteUrl.match(regex)){
			alert("Please use a valid URL.");
			return false;
		}
		return true;
	}
