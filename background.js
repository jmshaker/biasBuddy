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

    $.post("http://127.0.0.1:5002/hello2", {"url": url})
    
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

      if (data.content != undefined){

        var fakeWords = getFakeWords(data.content);

        chrome.storage.local.set({'fakeWords': fakeWords}, function() {
        });

        //

        var relatedArticles;

        chrome.storage.local.get('publishDate', function(x) {

          relatedArticles = getRelatedArticles(data, x.publishDate);
        
          chrome.storage.local.set({'relatedArticles': relatedArticles}, function() {
          });

        });

        //

      }

    })

    .fail(function(response) {

      console.log('Error: ' + response.responseText);
      
    });

    var isAddress = false;

    var baseAddress = "";

    for (var i = 0; i < url.length; i++){

      var c = url[i];

      if (isAddress == true){

        if (c == "/"){

          break;

        }
        else{

          baseAddress = baseAddress + c; 

        }

      }
      else{

        if (c == '.'){

          isAddress = true;
  
        }

      }

    }

    chrome.storage.local.set({'siteName': baseAddress}, function() {
    });

  });

};


function getFakeWords(content){

  var fakeWordsList = [];

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/keywords", {"text": content})

  .done(function(data) {

    if (data.keywords.length != 0){
  
      for (var i = 0; i < data.keywords.length; i++){

        fakeWordsList.push(data.keywords[i]);
      
      }

    }

  });

  return fakeWordsList;

};

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function getRelatedArticles(data, publishDate){

  var relatedArticles = [];

  var allKeywords = "", allPeople = "", allOrganisations = "", finalQuery = "";

  $.ajaxSetup({async: false});

  data.keywords = data.keywords.filter( onlyUnique );
  
  for (i = 0; i < data.keywords.length; i++){

    //if (data.title.includes(data.keywords[i])){

      if (allKeywords == "") {

        allKeywords = allKeywords + data.keywords[i]
  
      }
      else
      {
  
        allKeywords = allKeywords + " OR " + data.keywords[i];
    
      }

  //}

  }

  data.people = data.people.filter( onlyUnique );

  for (i = 0; i < data.people.length; i++){

    if (data.title.includes(data.people[i])){

      if (allPeople == ""){

        allPeople = allPeople + data.people[i];

      }
      else
      {

        allPeople = allPeople + " OR " + data.people[i];
    
      }

    }
  }

  data.organisations = data.organisations.filter( onlyUnique );

  for (i = 0; i < data.organisations.length; i++){

    if (data.title.includes(data.organisations[i])){

      if (allOrganisations == ""){

        allOrganisations = allOrganisations + data.organisations[i];

      }
      else
      {

        allOrganisations = allOrganisations + " OR " + data.organisations[i];
    
      }

    }
  }

  if (allKeywords != ""){

    finalQuery = allKeywords;

  }

  if (allPeople != ""){

    if (finalQuery == ""){

      finalQuery = allPeople;

    }
    else{

      finalQuery = finalQuery + " AND (" + allPeople + ")";

    }

  }

  if (allOrganisations != ""){

    if (finalQuery == ""){

      finalQuery = allOrganisations;

    }
    else{

      finalQuery = finalQuery + " AND (" + allOrganisations + ")";

    }

  }

  $.get("https://newsapi.org/v2/everything?q=" + finalQuery + "&from=" + publishDate + "&to=" + publishDate + "&sortBy=relevancy&apiKey=6d5b5753b28949f59213beed43d315a2")

  .done(function(newsApiData) {

    console.log('Status: ' + newsApiData.status);

    for (i = 0; i < 10; i++){

      x = newsApiData.articles[i];

      relatedArticles.push(newsApiData.articles[i]);

    }

  });

  return relatedArticles;

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