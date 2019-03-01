function checkSiteAddress(siteAddress){

  var siteStatus = "";

  var trustedSite = false, satiricalSite = false, fakeSite = false;

  var siteBias = "";
  
  //trustedSite = isSiteTrusted(siteAddress);

  siteBias = isSiteTrusted(siteAddress);

  if ((siteBias == "leftcenter") || (siteBias == "center") || (siteBias == "right-center"))
  {
    trustedSite == true

    return "trusted_" + siteBias

  }
  else{

    if ((siteBias == "left") || (siteBias == "right") || (siteBias == "conspiracy") || (siteBias == "pro-science")){

      return "biased_" + siteBias
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

  }

};

function isSiteTrusted(siteAddress){

  var bias = "";

  //var trustedSite = false;

  $.ajaxSetup({async: false});

  /*$.post("http://127.0.0.1:5002/whitelistedSites", {"url": siteAddress})

  .done(function(data) {

    if (data.whitelistedSites.length == 1){
  
      trustedSite = true;

    }

  });

  return trustedSite;*/

  $.post("http://127.0.0.1:5002/biasedSites", {"url": siteAddress})

  .done(function(data) {

    if (data.biasedSites.length == 1){
  
      bias = data.biasedSites[0];

    }

  });

  return bias;

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

  $.post("http://127.0.0.1:5002/fakeNewsSites", {"url": siteAddress})

  .done(function(data) {

    if (data.fakeNewsSites.length == 1){
  
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

      if (data.publishDate == "null"){

        chrome.storage.local.set({'articleStatus': "Article not found"}, function() {
        });

      }
      else{

        chrome.storage.local.set({'articleStatus': "Article found"}, function() {
        });

      }

      chrome.storage.local.set({'content': data.content}, function() {
      });

      chrome.storage.local.set({'keywords': data.keywords}, function() {
      });

      chrome.storage.local.set({'summary': data.summary}, function() {
      });

      var siteStatus = checkSiteAddress(url);

      chrome.storage.local.set({'siteStatus': siteStatus}, function() {
      });

      changeIconColor(tabId);

      chrome.storage.local.get('articleStatus', function(y) {

        if (y.articleStatus == "Article found"){

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
          
        }
        else{

          chrome.storage.local.set({'fakeWords': ""}, function() {
          });
            
          chrome.storage.local.set({'relatedArticles': ""}, function() {
          });

        }

      });
      

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

function removeRedundantWords(title, words){

  allWords = words.filter( onlyUnique );

  for (i = 0; i < words.length; i++){

    if (!title.includes(words[i])){

      words.splice(i, 1);
      i = i - 1;

    }
  }

  for (i = 0; i < words.length; i++){

    var position = i;
    var isDouble = false;

    for(j = 0; j < words.length; j++){

      if (j != position){

        if (words[j].includes(words[position])){

          isDouble = true;
          break;

        }

      }

    }

    if (isDouble == true){

      words.splice(i, 1);
      i = i - 1;

    }

  }

  var stringWords = "";

  for (i = 0; i < words.length; i++){

    if (stringWords == ""){

      stringWords = stringWords + words[i];

    }
    else
    {

      stringWords = stringWords + " OR " + words[i];
  
    }

  }

  return stringWords;

}

function getRelatedArticles(data, publishDate){

  var relatedArticles = [];

  var allKeywords = "", allPeople = "", allOrganisations = "", finalQuery = "";

  $.ajaxSetup({async: false});

  allKeywords = removeRedundantWords(data.title, data.keywords);

  allPeople = removeRedundantWords(data.title, data.people);

  allOrganisations = removeRedundantWords(data.title, data.organisations);

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

function changeIconColor(tabId){

  chrome.storage.local.get('siteStatus', function(data) {
  
    switch(data.siteStatus){

      case "trusted_leftcenter":
      case "trusted_center":
      case "trusted_right-center":

      chrome.browserAction.setIcon({path: "/pluginImages/trusted.png", tabId: tabId});

      break;

      case "biased_left":
      case "biased_right":
      case "biased_conspiracy":
      case "biased_pro-science":

      chrome.browserAction.setIcon({path: "/pluginImages/biased2.png", tabId: tabId});

      break;

      case "unknown":

      chrome.browserAction.setIcon({path: "/pluginImages/unknown.png", tabId: tabId});

      break;

      case "fake":

      chrome.browserAction.setIcon({path: "/pluginImages/fake.png", tabId: tabId});

      break;

      case "satirical":

      chrome.browserAction.setIcon({path: "/pluginImages/satirical.png", tabId: tabId});

      break;

      default:

      chrome.browserAction.setIcon({path: "/pluginImages/img.png", tabId: tabId});

      break;

    }

  });


}

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