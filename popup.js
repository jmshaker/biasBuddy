let articleStatusText = document.getElementById('articleStatus');
let siteAddressText = document.getElementById('siteAddressText');
let authorsText = document.getElementById('authorsText');
let titleText = document.getElementById('titleText');
let publishDateText = document.getElementById('publishDateText');
let contentText = document.getElementById('contentText');
let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

chrome.storage.local.get('siteAddress', function(data) {

  siteAddressText.innerHTML = data.siteAddress;

});

chrome.storage.local.get('authors', function(data) {

  authorsText.innerHTML = data.authors;

});

chrome.storage.local.get('title', function(data) {

  titleText.innerHTML = data.title;

});

chrome.storage.local.get('publishDate', function(data) {

  if (data.publishDate == undefined){

    //articleStatusText.innerHTML = "No article found.";

    document.getElementById("header").style.backgroundColor="red";

  }

  publishDateText.innerHTML = data.publishDate;

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