let articleStatusText = document.getElementById('articleStatusText');
let siteAddressText = document.getElementById('siteAddressText');
let authorsText = document.getElementById('authorsText');
let titleText = document.getElementById('titleText');
let publishDateText = document.getElementById('publishDateText');
let contentText = document.getElementById('contentText');
let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

let backButton = document.getElementById('backButton');

backButton.addEventListener('click', function() { popupMain(); })

/*chrome.storage.local.get('siteAddress', function(data) {

  siteAddressText.innerHTML = data.siteAddress;

});*/

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

/*chrome.storage.local.get('publishDate', function(data) {

  chrome.storage.local.get('articleStatus', function(data) {

    articleStatusText.innerHTML = data.articleStatus;

    if (data.articleStatus == "Article found"){

      displayArticleContent(data);

    }
  
  });

});*/

chrome.storage.local.get('articleStatus', function(data) {

  articleStatusText.innerHTML = data.articleStatus;

  if (data.articleStatus == "Article found"){

    displayArticleContent(data);

  }

});

function displayArticleContent(data){

  chrome.storage.local.get('publishDate', function(data) {
  
    publishDateText.innerHTML = data.publishDate;
  
  });

  chrome.storage.local.get('authors', function(data) {

    authorsText.innerHTML = data.authors;
  
  });
  
  chrome.storage.local.get('title', function(data) {
  
    titleText.innerHTML = data.title;
  
  });
  
  chrome.storage.local.get('content', function(data) {
  
    contentText.innerHTML = data.content;
  
  });
  
  chrome.storage.local.get('keywords', function(data) {
  
    keywordsText.innerHTML = data.keywords;
  
  });
  
  chrome.storage.local.get('summary', function(data) {
  
    summaryText.innerHTML = data.summary;
  
  });

}

function popupMain(){

  window.location.href="popup.html";

}