function checkSiteAddress(siteAddress){

  var siteStatus = "";

  var trustedSite = false, satiricalSite = false, fakeSite = false;
  
  trustedSite = isSiteTrusted(siteAddress);

  if (trustedSite == true){

    return "trusted";

  }
  else{

    satiricalSite = isSiteSatirical(siteAddress);

    if (satiricalSite == true){

      return "satirical";

    }
    else{

      fakeSite = isSiteFake(siteAddress);
  
      if (fakeSite == true){
  
        return "fake";
  
      }
      else{

        return "unknown";

      }
  
    }

  }

};

function isSiteTrusted(siteAddress){

  var trustedSite = false;

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/whitelistedSites", {"url": siteAddress})

  .done(function(data) {

    if (data.whitelistedSites.length == 1){
  
      trustedSite = true;

    }

  });

  return trustedSite;

};

function isSiteSatirical(siteAddress){

  var satiricalSite = false;

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/satiricalSites", {"url": siteAddress})

  .done(function(data) {

    if (data.satiricalSites.length == 1){
  
      satiricalSite = true;

    }

  });

  return satiricalSite;

};

function isSiteFake(siteAddress){

  var fakeSite = false;

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/blacklistedSites", {"url": siteAddress})

  .done(function(data) {

    if (data.blacklistedSites.length == 1){
  
      fakeSite = true;

    }

  });

  return fakeSite;

};


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

      var siteStatus = checkSiteAddress(url);

      chrome.storage.local.set({'siteStatus': siteStatus}, function() {
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