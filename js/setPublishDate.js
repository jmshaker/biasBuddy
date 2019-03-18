let websiteNameText = document.getElementById('websiteName');

let websiteStatusButton = document.getElementById('websiteStatus');

let backButton = document.getElementById('backButton');

let inputTextbox = document.getElementById('myTextBox');

let setPublishDateButton = document.getElementById('setPublishDateButton');

inputTextbox.addEventListener('input', function() { dateChanged(); })

setPublishDateButton.addEventListener('click', function() { dateSubmitted(); })

backButton.addEventListener('click', function() { popupMain(); })

//websiteStatusButton.addEventListener('click', function() { displaySiteInfo(); })

siteContentButton.addEventListener('click', function() { siteContent(); })

wordAnalysisButton.addEventListener('click', function() { wordAnalysis(); })

furtherReadingButton.addEventListener('click', function() { furtherReading(); })

siteContentButton.addEventListener('click', function() { siteContent(); })

/*chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.siteName;

});*/

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

function isDate(value) {
  var dateFormat;
  if (toString.call(value) === '[object Date]') {
      return true;
  }
  if (typeof value.replace === 'function') {
      value.replace(/^\s+|\s+$/gm, '');
  }
  dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
  return dateFormat.test(value);
}

function dateChanged(){


  d = isDate(inputTextbox.value);

  
  if (d == true){

    setPublishDateButton.disabled = false;

  }
  else{

    setPublishDateButton.disabled = true;

  }

};

function dateSubmitted(){

  var submittedDate = inputTextbox.value;

  chrome.storage.local.set({'submittedDate': submittedDate}, function() {
  });

  chrome.storage.local.get('tabId', function(data) {

    chrome.browserAction.setPopup({"tabId":data.tabId,"popup":'popup.html'});

    retrieveSiteInfo(data.tabId);

    //window.close();

    //window.location.href = "popup.html";

  });

};

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