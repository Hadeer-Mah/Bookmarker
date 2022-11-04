var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var notValid = document.getElementById("notValid");
var noName = document.getElementById("noName");
var tableHead = document.getElementById("tableHead");
var bookmarksContainer = []
if (localStorage.getItem('bookmarks') != null) {
    bookmarksContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmark();
    
}
if (bookmarksContainer.length > 0) {
    tableHead.classList.replace("d-none", "d-block");
    displayBookmark();

}
function addBookmark() {
    if (validSite() == true && siteName.value != "") {
        noName.classList.replace("d-block", "d-none");
        notValid.classList.replace("d-block", "d-none");

        var bookmark = {
            name : siteName.value,
            url: siteUrl.value
        }
        bookmarksContainer.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarksContainer))
        clearForm();
        displayBookmark(); 
        
    } else if (siteName.value == "") {
        noName.classList.replace("d-none", "d-block");
        notValid.classList.replace("d-block", "d-none");


    }
    
     else {
        notValid.classList.replace("d-none", "d-block");
        noName.classList.replace("d-block", "d-none");


    }

}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}
function displayBookmark() {
    if (bookmarksContainer.length > 0) {
        tableHead.classList.replace("d-none", "d-block");

    }
    var cartoona = '';
    for (var i = 0; i < bookmarksContainer.length; i++ ) {
        cartoona += `<tr>
            <td>${bookmarksContainer[i].name}</td>
            <td>${bookmarksContainer[i].url}</td>
            <td><a href="https://${bookmarksContainer[i].url}" class="btn btn-info" target="_blank">Visit</a></td>
            <td><button class="btn btn-danger" onClick="deleteBookmark(${i});">Delete</button></td>
        </tr>`;

        }
        document.getElementById("tableBody").innerHTML = cartoona;        
    
}

function deleteBookmark(deletedIndex) {

    bookmarksContainer.splice(deletedIndex , 1);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksContainer));
    
if (bookmarksContainer.length < 1) {
    tableHead.classList.replace("d-block", "d-none");

}
    displayBookmark();

    
}

function validSite() {
    var regex = /^www\.(\w|-){1,}(\.com|\.net)$/i;
    if (regex.test(siteUrl.value) == true ) {
        return true;    
    } else {
        return false;
    }
}

