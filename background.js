chrome.runtime.onInstalled.addListener(function() {


});

function retrieveSiteInfo(tabId){

  var url = "";

  chrome.tabs.get(tabId, function (currentTab) {

    url = currentTab.url;

  });

  chrome.storage.local.set({'siteAddress': url}, function() {
    console.log('Site address: ' + url);

    $.post("http://127.0.0.1:5002/hello", {"url": url})
    
    .done(function(data) {

      chrome.storage.local.set({'authors': data.authors}, function() {
      });

      chrome.storage.local.set({'title': data.title}, function() {
      });

      chrome.storage.local.set({'publishDate': data.publishDate}, function() {
      });

      chrome.storage.local.set({'content': data.content}, function() {
      });

      chrome.storage.local.set({'keywords': data.keywords}, function() {
      });

      chrome.storage.local.set({'summary': data.summary}, function() {
      });

    })

    .fail(function(response) {

      console.log('Error: ' + response.responseText);
      
    });

    var baseUrl = window.location.host;

    var baseUrl2 = baseUrl + "";

    /*var isAddress = false;

    for (var i = 0; i < url.length; i++){

      var c = url[i];

      if (c == '/')

    }*/

    $.get("https://newsapi.org/v2/sources?q=" + "bbc" + "&apiKey=6d5b5753b28949f59213beed43d315a2")

    .done(function(data) {

      console.log('Status: ' + data.status);

    });

  });

};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  var url = "";

  chrome.tabs.get(tabId, function (currentTab) {

    url = currentTab.url;

    if (changeInfo.url == url) {

      retrieveSiteInfo(tabId);
  
    }

  });

});

/*chrome.tabs.onUpdated.addListener(function(updatedInfo){

  console.log('Site address: ');

  retrieveSiteInfo();

});*/

chrome.tabs.onActivated.addListener(function(activeInfo) {

  retrieveSiteInfo(activeInfo.tabId);

});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {/*hostEquals: 'developer.chrome.com'*/ schemes: ['https']},
    })
    ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);

});