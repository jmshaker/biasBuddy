let keywordsText = document.getElementById('keywordsText');
let summaryText = document.getElementById('summaryText');

let sentimentText = document.getElementById('sentimentText');

let backButton = document.getElementById('backButton');

backButton.addEventListener('click', function() { popupMain(); })

optionsButton.addEventListener('click', function() { openOptions(); })

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

    case "internal":

    document.getElementById("websiteStatus").style.backgroundColor="gray";

    document.getElementById("websiteStatus").src="siteTypeIcons/internal.png";

    document.getElementById("websiteType").innerHTML = "INTERNAL CHROME PAGE";

    break;

  }

});

chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.siteName;

});

/*$('#websiteStatus').click(function(){

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

});*/

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
  
  var wordTypes;
  var wordDefs;

  chrome.storage.local.get('types', function(y) {

    wordTypes = y.types;

    chrome.storage.local.get('definitions', function(x) {

      wordDefs = x.definitions;

      for (i = 0; i < data.fakeWords.length; i++){

        switch(String(wordTypes[i]).trim()){
    
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
    
        }
    
      }

      if (offensiveList.length > 0){

        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<b>Offensive words found:</b><br /><br /><ul>"
    
        for (i = 0; i < offensiveList.length; i++){
    
          fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<li> <div class='tooltip'> " + offensiveList[i] + "<span class='tooltiptext'>" + wordDefs[data.fakeWords.indexOf(offensiveList[i])] + "</span> </div> </li>"
    
        }

        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "</ul>"
        
      }
    
      if (vulgarList.length > 0){
    
        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<b>Slang words found:</b><br /><br />"
    
        for (i = 0; i < vulgarList.length; i++){
    
          fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<li> <div class='tooltip'> " + vulgarList[i] + "<span class='tooltiptext'>" + wordDefs[data.fakeWords.indexOf(vulgarList[i])] + "</span> </div> </li>"
    
        }

        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "</ul>"
        
      }
    
      if (informalList.length > 0){
    
        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<b>Informal words found:</b><br /><br />"
    
        for (i = 0; i < informalList.length; i++){
    
          fakeWordsText.innerHTML = fakeWordsText.innerHTML + "<li> <div class='tooltip'> " + informalList[i] + "<span class='tooltiptext'>" + wordDefs[data.fakeWords.indexOf(informalList[i])] + "</span> </div> </li>"
    
        }

        fakeWordsText.innerHTML = fakeWordsText.innerHTML + "</ul>"
        
      }
  
    });

  });


  
  //fakeWordsText.innerHTML = data.fakeWords;

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

$("#optionsButton").hover(function(){
  $(this).animate({
    height: '+=2px',
    width: '+=2px'
  }, 200);

}, function() {
  $(this).animate({
    height: '-=2px',
    width: '-=2px'
  },200);

});

function popupMain(){

  window.location.href="popup.html";

}