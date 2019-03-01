let websiteNameText = document.getElementById('websiteName');

let websiteStatusButton = document.getElementById('websiteStatus');

let siteContentButton = document.getElementById('siteContent');
let wordAnalysisButton = document.getElementById('wordAnalysis');
let furtherReadingButton = document.getElementById('furtherReading');

websiteStatusButton.addEventListener('click', function() { displaySiteInfo(); })

siteContentButton.addEventListener('click', function() { siteContent(); })

wordAnalysisButton.addEventListener('click', function() { wordAnalysis(); })

furtherReadingButton.addEventListener('click', function() { furtherReading(); })

/*chrome.storage.local.get('siteName', function(data) {

  websiteNameText.innerHTML = data.siteName;

});*/

chrome.storage.local.get('siteStatus', function(data) {

  switch(data.siteStatus){

    case "trusted_leftcenter":
    case "trusted_center":
    case "trusted_right-center":

    document.getElementById("websiteStatus").style.backgroundColor="green";

    document.getElementById("websiteStatus").src="siteTypeIcons/trusted.png";

    break;

    case "biased_left":
    case "biased_right":
    case "biased_conspiracy":
    case "biased_pro-science":

    document.getElementById("websiteStatus").style.backgroundColor="orange";

    document.getElementById("websiteStatus").src="siteTypeIcons/biased.png";

    break;

    case "satirical":

    document.getElementById("websiteStatus").style.backgroundColor="aqua";

    document.getElementById("websiteStatus").src="siteTypeIcons/satirical.png";

    break;

    case "fake":

    document.getElementById("websiteStatus").style.backgroundColor="red";

    document.getElementById("websiteStatus").src="siteTypeIcons/fake.png";

    break;

    case "unknown":

    document.getElementById("websiteStatus").style.backgroundColor="yellow";

    document.getElementById("websiteStatus").src="siteTypeIcons/unknown.png";

    break;

  }

});

function displaySiteInfo(){
  
  chrome.storage.local.get('siteName', function(data) {

    websiteNameText.innerHTML = data.siteName;
  
  });

  chrome.storage.local.get('siteStatus', function(data) {

    if (document.getElementById("websiteName").style.visibility == "visible"){

      hideSiteInfo();

    }
    else{

      document.getElementById("websiteName").style.visibility = "visible";

      document.getElementById("websiteType").style.visibility = "visible";
    
      switch(data.siteStatus){
    
        case "trusted_leftcenter":
        case "trusted_center":
        case "trusted_right-center":
    
        document.getElementById("websiteType").innerHTML = "TRUSTED SITE"
    
        break;

        case "biased_left":
        case "biased_right":
        case "biased_conspiracy":
        case "biased_pro-science":
    
        document.getElementById("websiteType").innerHTML = "BIASED SITE"

        break;
    
        case "satirical":
    
        document.getElementById("websiteType").innerHTML = "SATIRICAL SITE"
    
        break;
    
        case "fake":
    
        document.getElementById("websiteType").innerHTML = "FAKE NEWS SITE"
    
        break;
    
        case "unknown":
    
        document.getElementById("websiteType").innerHTML = "UNKNOWN SITE"
    
        break;
    
      }
    }
  });
  
  document.getElementById("header").style.height = "100px";

  $('body').css('height', '230px');

}

function hideSiteInfo(){

  document.getElementById("websiteName").style.visibility = "hidden";

  document.getElementById("websiteType").style.visibility = "hidden";

}

function siteContent(){

  window.location.href="siteContent.html";

}

function wordAnalysis(){

  window.location.href="wordAnalysis.html";

}

function furtherReading(){

  window.location.href="furtherReading.html";

}