let siteAddressText = document.getElementById('siteAddressText');
let authorsText = document.getElementById('authorsText');
let titleText = document.getElementById('titleText');
let publishDateText = document.getElementById('publishDateText');
let contentText = document.getElementById('contentText');
let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

let websiteNameText = document.getElementById('websiteName');

let backButton = document.getElementById('backButton');

let optionsButton = document.getElementById('optionsButton');

backButton.addEventListener('click', function() { popupMain(); })

optionsButton.addEventListener('click', function() { openOptions(); })

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.siteName;

});

chrome.storage.local.get('siteStatus', function(data) {

  switch(data.siteStatus){

    case "leftcenter":
    case "center":
    case "right-center":
    case "pro-science":

    document.getElementById("websiteStatus").style.backgroundColor="green";

    document.getElementById("websiteStatus").src="siteTypeIcons/trusted.png";

    document.getElementById("websiteType").innerHTML = "TRUSTED SITE (" + data.siteStatus + ")";

    break;

    case "left":
    case "right":
    case "conspiracy":

    document.getElementById("websiteStatus").style.backgroundColor="orange";

    document.getElementById("websiteStatus").src="siteTypeIcons/biased.png";

    document.getElementById("websiteType").innerHTML = "BIASED SITE (" + data.siteStatus + ")";

    break;

    case "satirical":

    document.getElementById("websiteStatus").style.backgroundColor="aqua";

    document.getElementById("websiteStatus").src="siteTypeIcons/satirical.png";

    document.getElementById("websiteType").innerHTML = "SATIRICAL SITE";

    break;

    case "fake":

    document.getElementById("websiteStatus").style.backgroundColor="red";

    document.getElementById("websiteStatus").src="siteTypeIcons/fake.png";

    document.getElementById("websiteType").innerHTML = "FAKE NEWS SITE";

    break;

    case "unknown":

    document.getElementById("websiteStatus").style.backgroundColor="yellow";

    document.getElementById("websiteStatus").src="siteTypeIcons/unknown.png";

    document.getElementById("websiteType").innerHTML = "UNKNOWN SITE";

    break;
    case "internal":

    document.getElementById("websiteStatus").style.backgroundColor="gray";

    document.getElementById("websiteStatus").src="siteTypeIcons/internal.png";

    document.getElementById("websiteType").innerHTML = "INTERNAL CHROME PAGE";

    break;

  }

});

chrome.storage.local.get('articleStatus', function(data) {

  if (data.articleStatus == "Article found"){

    displayArticleContent(data);

  }

});

function openOptions(){

  chrome.tabs.create({ url: "options.html" });

}

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
  
  /*chrome.storage.local.get('keywords', function(data) {
  
    keywordsText.innerHTML = data.keywords;
  
  });
  
  chrome.storage.local.get('summary', function(data) {
  
    summaryText.innerHTML = data.summary;
  
  });*/

}

$("#optionsButton").hover(function(){
  $(this).animate({
    height: '+=2px',
    width: '+=2px'
  }, 200);

}, function() {
  $(this).animate({
    height: '-=2px',
    width: '-=2px'
  },200);

});

function popupMain(){

  window.location.href="popup.html";

}