/*class Article {

  constructor (name) {
      this.name = name;
  }

}*/

chrome.runtime.onInstalled.addListener(function() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    
    var url = tabs[0].url;

    chrome.storage.local.set({'siteAddress': url}, function() {
      console.log('Site address: ' + url);
    });

    const saveExtractedText = (url) => {

      $.post("http://127.0.0.1:5002/hello", {"url": url})
      
      //var article = new Article("hello")

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

      });
    
    }
    
    chrome.runtime.onMessage.addListener(
      (request, sender, senderResponse) => {
        switch (request.message) {
          case 'save_text': {

            saveExtractedText(request.statusText);

            break;
          }
          default:
        }
      }
    );
    


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

});