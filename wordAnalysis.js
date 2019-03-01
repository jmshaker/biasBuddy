//let articleStatusText = document.getElementById('articleStatusText');

let backButton = document.getElementById('backButton');

backButton.addEventListener('click', function() { popupMain(); })

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.websiteNameText;

});

chrome.storage.local.get('siteStatus', function(data) {

  switch(data.siteStatus){

    case "trusted_leftcenter":
    case "trusted_center":
    case "trusted_right-center":

    document.getElementById("websiteStatus").style.backgroundColor="green";

    document.getElementById("websiteStatus").src="siteTypeIcons/trusted.png";

    break;

    case "biased_left":
    case "biased_right":
    case "biased_conspiracy":
    case "biased_pro-science":

    document.getElementById("websiteStatus").style.backgroundColor="orange";

    document.getElementById("websiteStatus").src="siteTypeIcons/biased.png";

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

    document.getElementById("websiteStatus").style.backgroundColor="yellow";

    document.getElementById("websiteStatus").src="siteTypeIcons/unknown.png";

    break;

  }

});

chrome.storage.local.get('fakeWords', function(data) {

  fakeWordsText.innerHTML = data.fakeWords;

});

function popupMain(){

  window.location.href="popup.html";

}