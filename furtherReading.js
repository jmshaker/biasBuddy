let articleStatusText = document.getElementById('articleStatusText');
let siteAddressText = document.getElementById('siteAddressText');

let backButton = document.getElementById('backButton');

backButton.addEventListener('click', function() { popupMain(); })

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.websiteNameText;

});

chrome.storage.local.get('siteStatus', function(data) {

  switch(data.siteStatus){

    case "trusted":

    document.getElementById("websiteStatus").style.backgroundColor="green";

    document.getElementById("websiteStatus").src="siteTypeIcons/trusted.png";

    break;

    case "satirical":

    document.getElementById("websiteStatus").style.backgroundColor="aqua";

    document.getElementById("websiteStatus").src="siteTypeIcons/satirical.png";

    break;

    case "fake":

    document.getElementById("websiteStatus").style.backgroundColor="red";

    document.getElementById("websiteStatus").src="siteTypeIcons/fake.png";

    break;

    case "unknown":

    document.getElementById("websiteStatus").style.backgroundColor="orange";

    document.getElementById("websiteStatus").src="siteTypeIcons/unknown.png";

    break;

  }

});

chrome.storage.local.get('relatedArticles', function(data) {

  for (i = 0; i < data.relatedArticles.length; i++){
  
    document.getElementById("relatedArticles").innerHTML = document.getElementById("relatedArticles").innerHTML + "<p><b>" + data.relatedArticles[i].source.name + "</b></p>" + "<a href=" + data.relatedArticles[i].url + ">" + data.relatedArticles[i].title + "</a> <br />"
    + "<img src=" + data.relatedArticles[i].urlToImage + " style=" + "width:200px;height:100px;>";

  }

});

function popupMain(){

  window.location.href="popup.html";

}