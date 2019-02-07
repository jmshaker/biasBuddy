let articleStatusText = document.getElementById('articleStatusText');
let siteAddressText = document.getElementById('siteAddressText');
let authorsText = document.getElementById('authorsText');
let titleText = document.getElementById('titleText');
let publishDateText = document.getElementById('publishDateText');
let contentText = document.getElementById('contentText');
let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

/*let siteContentButton = document.getElementById('siteContent');
let wordAnalysisButton = document.getElementById('wordAnalysis');
let furtherReadingButton = document.getElementById('furtherReading');

siteContentButton.addEventListener('click', function() { siteContent(); })

wordAnalysisButton.addEventListener('click', function() { wordAnalysis(); })

furtherReadingButton.addEventListener('click', function() { furtherReading(); })*/


chrome.storage.local.get('siteAddress', function(data) {

  siteAddressText.innerHTML = data.siteAddress;

});

chrome.storage.local.get('siteStatus', function(data) {

  switch(data.siteStatus){

    case "trusted":

    document.getElementById("websiteStatus").style.backgroundColor="green";

    document.getElementById("websiteStatusIcon").src="siteTypeIcons/trusted.png";

    break;

    case "satirical":

    document.getElementById("websiteStatus").style.backgroundColor="aqua";

    document.getElementById("websiteStatusIcon").src="siteTypeIcons/satirical.png";

    break;

    case "fake":

    document.getElementById("websiteStatus").style.backgroundColor="red";

    document.getElementById("websiteStatusIcon").src="siteTypeIcons/fake.png";

    break;

    case "unknown":

    document.getElementById("websiteStatus").style.backgroundColor="orange";

    document.getElementById("websiteStatusIcon").src="siteTypeIcons/unknown.png";

    break;

  }

});

chrome.storage.local.get('authors', function(data) {

  authorsText.innerHTML = data.authors;

});

chrome.storage.local.get('title', function(data) {

  titleText.innerHTML = data.title;

});

chrome.storage.local.get('publishDate', function(data) {

  if (data.publishDate == undefined){

    chrome.storage.local.set({'articleStatus': 'No article found'}, function() {
    });

  }
  else{

    chrome.storage.local.set({'articleStatus': 'Article found'}, function() {
    });

    publishDateText.innerHTML = data.publishDate;

  }

});

chrome.storage.local.get('articleStatus', function(data) {

  articleStatusText.innerHTML = data.articleStatus;

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

function siteContent(){

  

}

function wordAnalysis(){

  document.getElementById("wordAnalysis").style.backgroundColor="black";

}

function furtherReading(){

  document.getElementById("furtherReading").style.backgroundColor="black";

}