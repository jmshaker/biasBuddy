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

  function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0]; 
      var url = tab.url;
      callback(url);
    });
  }
  
  function renderURL(statusText) {
    chrome.storage.local.set({'siteAddress': statusText}, function() {

      chrome.runtime.sendMessage({ message: "save_text", statusText });

      console.log('Site address: ' + statusText);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
      renderURL(url); 
    });
  });