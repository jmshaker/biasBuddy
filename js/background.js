function checkSiteAddress(siteAddress){

  var siteStatus = "";

  var trustedSite = false, satiricalSite = false, fakeSite = false, isInternalPage = false;;

  var internalChromeUrls = ["chrome://about/","chrome://accessibility/","chrome://appcache-internals/","chrome://apps/","chrome://badcastcrash/","chrome://blob-internals/",
  "chrome://bluetooth-internals/","chrome://bookmarks/","chrome://chrome/","chrome://chrome-urls/","chrome://components/","chrome://conflicts/","chrome://crash/",
  "chrome://crashdump/","chrome://crashes/","chrome://credits/","chrome://device-log/","chrome://devices/","chrome://dino/","chrome://discards/","chrome://dns/",
  "chrome://download-internals/","chrome://downloads/","chrome://extensions/","chrome://flags/","chrome://flash/","chrome://gcm-internals/","chrome://gpu/","chrome://gpuclean/",
  "chrome://gpucrash/","chrome://gpuhang/","chrome://hang/","chrome://help/","chrome://histograms/","chrome://history/","chrome://indexeddb-internals/",
  "chrome://inducebrowsercrashforrealz/","chrome://inspect/","chrome://interventions-internals/","chrome://invalidations/","chrome://kill/","chrome://local-state/",
  "chrome://media-engagement/","chrome://media-internals/","chrome://memory-exhaust/","chrome://nacl/","chrome://net-export/","chrome://net-internals/","chrome://network-error/",
  "chrome://network-errors/","chrome://newtab/","chrome://ntp-tiles-internals/","chrome://omnibox/","chrome://password-manager-internals/","chrome://policy/",
  "chrome://ppapiflashcrash/","chrome://ppapiflashhang/","chrome://predictors/","chrome://print/","chrome://quit/","chrome://quota-internals/","chrome://restart/",
  "chrome://safe-browsing/","chrome://serviceworker-internals/","chrome://settings/","chrome://shorthang/","chrome://signin-internals/","chrome://site-engagement/",
  "chrome://suggestions/","chrome://supervised-user-internals/","chrome://sync-internals/","chrome://system/","chrome://taskscheduler-internals/","chrome://terms/",
  "chrome://thumbnails/","chrome://tracing/","chrome://translate-internals/","chrome://usb-internals/","chrome://user-actions/","chrome://version/","chrome://webrtc-internals/",
  "chrome://webrtc-logs/"];

  if (internalChromeUrls.includes(siteAddress)){

    return "internal";

  }

  var siteBias = "";
  
  siteBias = isSiteTrusted(siteAddress);

  if (siteBias != "")
  {

    return siteBias;

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

  var bias = "";

  $.ajaxSetup({async: false});

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

    chrome.storage.local.get('lastUrl', function(y) {

      var baseAddress = $('<a>').prop('href', y.lastUrl).prop('hostname');
  
      if ((!url.includes(baseAddress)) || (baseAddress == "")){
  
        var siteStatus = checkSiteAddress(url);
  
        chrome.storage.local.set({'siteStatus': siteStatus}, function() {
        });
      
      }

      changeIconColor(tabId);
  
      chrome.storage.local.set({'lastUrl': url}, function() {
      });
  
      chrome.storage.local.set({'tabId': tabId}, function() {
      });

    });

  });

  chrome.storage.local.set({'siteAddress': url}, function() {

    $.post("http://127.0.0.1:5002/hello", {"url": url})
    
    .done(function(data) {

      chrome.storage.local.set({'authors': data.authors}, function() {
      });

      chrome.storage.local.set({'title': data.title}, function() {
      });

      chrome.storage.local.set({'content': data.content}, function() {
      });

      chrome.storage.local.set({'keywords': data.keywords}, function() {
      });

      chrome.storage.local.set({'summary': data.summary}, function() {
      });

      chrome.storage.local.set({'noNewsAPIdata': "true"}, function() {
      });


      chrome.storage.local.get('submittedDate', function(y) {

        if (y.submittedDate != undefined){

          data.publishDate = y.submittedDate;

          chrome.storage.local.set({'submittedDate': undefined.value}, function() {
          });

        }

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

        chrome.storage.local.get('articleStatus', function(y) {

          if (y.articleStatus == "Article found"){
  
            if (data.content != undefined){
  
              var fakeWords = getFakeWords(data.content);
  
              chrome.storage.local.set({'fakeWords': fakeWords}, function() {
              });
  
              if (fakeWords.length > 0){
  
                var types = getTypes(fakeWords);
  
                chrome.storage.local.set({'types': types}, function() {
                });
  
                var definitions = getDefinitions(fakeWords);
  
                chrome.storage.local.set({'definitions': definitions}, function() {
                });
  
              } 
  
              var sentences = getSentences(data.content)
  
              chrome.storage.local.set({'sentences': sentences}, function() {
              });
              
              var sentiment = getSentiment(data.content);
  
              chrome.storage.local.set({'sentiment': sentiment}, function() {
              });
  
  
              //
      
              var relatedArticles;
      
              chrome.storage.local.get('publishDate', function(x) {
  
                var today = new Date();
                today.dd = today.getDate();
                today.mm = today.getMonth() + 1;
                today.yyyy = today.getFullYear();
  
                var publishDate = Date.parse(x.publishDate);
  
                var daysSincePublished = Math.floor((today - publishDate)/(1000*60*60*24));
  
                if (daysSincePublished < 180){
  
                  chrome.storage.local.set({'noNewsAPIdata': "false"}, function() {
                  });
                 
                  relatedArticles = getRelatedArticles(data, x.publishDate);
  
                  var relatedArticlesBias = [];
  
                  for (i = 0; i < relatedArticles.length; i++){
  
                    siteBias = isSiteTrusted(relatedArticles[i].url);
  
                    relatedArticlesBias.push(siteBias);
  
                  }
  
                }
                /*else{
  
                  chrome.storage.local.set({'noNewsAPIdata': "true"}, function() {
                  });
  
                }*/
              
                chrome.storage.local.set({'relatedArticles': relatedArticles}, function() {
                });
  
                chrome.storage.local.set({'relatedArticlesBias': relatedArticlesBias}, function() {
                });
      
              });
      
              //
      
            }
            
          }
          else{
  
            chrome.storage.local.get('content', function(y) {
  
              if (y.content.trim().split(/\s+/).length > 300){
  
                var NotificationOptions = {
  
                  type: 'basic',
                  iconUrl: 'pluginImages/icon.png',
                  title: 'Is this an article?',
                  message: 'We have found article content, but no publish date. Please manually enter it by opening the biasBuddy extension.'
  
                };
  
                chrome.notifications.create('noPublishDateNotif', NotificationOptions);
  
                chrome.notifications.onClicked.addListener(notificationClicked);
  
              }
  
            });
  
            chrome.storage.local.set({'fakeWords': ""}, function() {
            });
              
            chrome.storage.local.set({'relatedArticles': ""}, function() {
            });
  
            chrome.storage.local.set({'sentences': ""}, function() {
            });
  
            chrome.storage.local.set({'sentiment': ""}, function() {
            });
  
          }
  
        });

      });

    })

    .fail(function(response) {

      console.log('Error: ' + response.responseText);
      
    });

    //var isAddress = false;

    var baseAddress = $('<a>').prop('href', url).prop('hostname');

    chrome.storage.local.set({'siteName': baseAddress}, function() {
    });

  });
};

function notificationClicked() {

  chrome.storage.local.get('tabId', function(data) {

    chrome.browserAction.setPopup({"tabId":data.tabId,"popup":'setPublishDate.html'});

  });

}

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

function getSentences(content){

  var sentences = [];

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/sentences", {"content": content})

  .done(function(data) {

    if (data.sentences.length != 0){
  
      for (var i = 0; i < data.sentences.length; i++){

        sentences.push(data.sentences[i]);
      
      }

    }

  });

  return sentences;

};

function getTypes(fakeWords){

  var types = [];

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/keywordsType", {'words': JSON.stringify(fakeWords)})

  .done(function(y) {

    types = y;

  });

  return types;

}

function getDefinitions(fakeWords){

  var definitions = [];

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/keywordsDef", {'words': JSON.stringify(fakeWords)})

  .done(function(y) {

    definitions = y;

  });

  return definitions;

}

function getSentiment(content){

  var sentiment = [];

  $.ajaxSetup({async: false});

  $.post("http://127.0.0.1:5002/sentiment", {"content": content})

  .done(function(data) {

    if (data.sentiments.length != 0){
  
      for (var i = 0; i < data.sentiments.length; i++){

        sentiment.push(data.sentiments[i]);
      
      }

    }

  });

  return sentiment;

};

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function arrayDiff(a, b) {
  return a.filter( 
    function(el) {
      return b.indexOf(el) < 0;
    }
  );
}

function removeRedundantWords(title, words){

  allWords = words.filter( onlyUnique );

  for (i = 0; i < allWords.length; i++){

    if (!(title.toLowerCase()).includes(allWords[i].toLowerCase())){

      allWords.splice(i, 1);
      i = i - 1;

    }
  }

  for (i = 0; i < allWords.length; i++){

    var position = i;
    var isDouble = false;

    for (j = 0; j < allWords.length; j++){

      if (j != position){

        if (allWords[j].includes(allWords[position])){

          isDouble = true;
          break;

        }

      }

    }

    if (isDouble == true){

      allWords.splice(i, 1);
      i = i - 1;

    }

  }

  var stringWords = "";

  for (i = 0; i < allWords.length; i++){

    if (stringWords == ""){

      stringWords = stringWords + allWords[i];

    }
    else
    {

      stringWords = stringWords + " OR " + allWords[i];
  
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

  var hello = allKeywords.split(" OR ");

  var y = removeRedundantWords(allPeople, hello);

  //var z = removeRedundantWords(allOrganisations, hello);

  var i = y.split(" OR ");

  hello = arrayDiff(hello, i);

//

  var z = removeRedundantWords(allOrganisations, hello);

  var j = z.split(" OR ");

//

  var hello = arrayDiff(hello, j);

  allKeywords = hello.toString().split(",").join(" OR ");

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

  /*if ((allOrganisations == "") && (allPeople == "")){

    finalQuery = hello.toString().split(",").join(" AND ");

  }*/

  $.get("https://newsapi.org/v2/everything?q=" + finalQuery + "&from=" + publishDate + "&to=" + publishDate + "&sortBy=relevancy&apiKey=6d5b5753b28949f59213beed43d315a2")

  .done(function(newsApiData) {

    console.log('Status: ' + newsApiData.status);

    for (i = 0; i < newsApiData.articles.length; i++){

      x = newsApiData.articles[i];

      relatedArticles.push(newsApiData.articles[i]);

    }

  });

  return relatedArticles;

};

function changeIconColor(tabId){

  chrome.storage.local.get('siteStatus', function(data) {
  
    switch(data.siteStatus){

      case "leftcenter":
      case "center":
      case "right-center":
      case "pro-science":

      chrome.browserAction.setIcon({path: "/pluginImages/trusted.png", tabId: tabId});

      break;

      case "left":
      case "right":
      case "conspiracy":

      chrome.browserAction.setIcon({path: "/pluginImages/biased2.png", tabId: tabId});

      break;

      case "unknown":

      chrome.browserAction.setIcon({path: "/pluginImages/unknown.png", tabId: tabId});

      break;

      case "internal":

      chrome.browserAction.setIcon({path: "/pluginImages/internal.png", tabId: tabId});

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
      pageUrl: {schemes: ['https']},
    })
    ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);

});