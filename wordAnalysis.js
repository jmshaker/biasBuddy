let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

let sentimentText = document.getElementById('sentimentText');

let backButton = document.getElementById('backButton');

backButton.addEventListener('click', function() { popupMain(); })

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.websiteNameText;

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

  }

});

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.siteName;

});

$('#websiteStatus').click(function(){

  if ($(':animated').length) {

  }
  else{

    if (document.getElementById("websiteName").style.left > "1000px") {

      $('#websiteStatus').animate({left:'+=50'},1000);
  
      $('#websiteType').animate({left:'+=900'},1000);
      $('#websiteName').animate({left:'+=900'},1000);
  
    }
    else{
  
      $('#websiteStatus').animate({left:'-=50'},1000);
  
      $('#websiteType').animate({left:'-=900'},1000);
      $('#websiteName').animate({left:'-=900'},1000);
  
    }

  }

});

/*chrome.storage.local.get('summary', function(data) {

  summaryText.innerHTML = data.summary;

});*/

chrome.storage.local.get('keywords', function(data) {

  keywordsText.innerHTML = data.keywords;

});

chrome.storage.local.get('fakeWords', function(data) {

  var allwordTypes = ['informal', 'vulgar', 'derogatory', 'offensive', 'dated'];

  var informalList = []
  var vulgarList = []
  var offensiveList = []

  var wordDict = []

  /*for (i = 0; i < data.fakeWords.length; i++){

    var wordType, wordDefinition;

    $.post("http://127.0.0.1:5002/keywordsType", {"word": data.fakeWords[i]})

    .done(function(x) {

      wordType = x.type;

      $.post("http://127.0.0.1:5002/keywordsDef", {"word": data.fakeWords[i]})

      .done(function(y) {

        wordDefinition = y.definition;

        wordDict.push({ word: data.fakeWords[i], type: wordType, definition: wordDefinition })


      });

    });


    /*switch(wordDict[i].type){

      case "vulgar slang":
      case "vulgar":

      vulgarList.push(data.fakeWords[i]);

      break;

      case "informal":

      informalList.push(data.fakeWords[i]);

      break;

      case "offensive":

      offensiveList.push(data.fakeWords[i]);

      break;

    }*/

  //}

  if (offensiveList.length > 0){

    fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<b>Offensive words found:</b><br /><br />"

    for (i = 0; i < offensiveList; i++){

      fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<li>";
      
      
      
      + offensiveList[i] + "</li>"

    }
    
  }
  

  fakeWordsText.innerHTML = data.fakeWords;

});

chrome.storage.local.get('sentiment', function(data) {

  if (data.sentiment.length > 0){

    var avPos = 0, avNeu = 0, avNeg = 0, mostNeg = 0, mostNegSentence = 0;

    chrome.storage.local.get('sentences', function(x) {

      for (i = 0; i < data.sentiment.length; i++){

        avPos = avPos + data.sentiment[i].pos;
        avNeu = avNeu + data.sentiment[i].neu;
        avNeg = avNeg + data.sentiment[i].neg;

        if (data.sentiment[i].neg > mostNeg){

          mostNeg = data.sentiment[i].neg;
          mostNegSentence = i;

        }

      }

      avPos = avPos / data.sentiment.length;
      avNeu = avNeu / data.sentiment.length;
      avNeg = avNeg / data.sentiment.length;

      sentimentText.innerHTML = "<b>Average sentence sentiment:</b> <br />Positive: " + (avPos * 100).toFixed(2) + "%<br />Neutral: " + (avNeu * 100).toFixed(2) + "%<br />Negative: " + (avNeg * 100).toFixed(2) + "%";

      sentimentText.innerHTML = sentimentText.innerHTML + "<br /><br /> <b>Most impartial sentence:</b><br /><br />\"..." + x.sentences[mostNegSentence] + "\"...";

    });

  }

});

function popupMain(){

  window.location.href="popup.html";

}