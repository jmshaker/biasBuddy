//let articleStatusText = document.getElementById('articleStatusText');

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

chrome.storage.local.get('fakeWords', function(data) {

  fakeWordsText.innerHTML = data.fakeWords;

});

function popupMain(){

  window.location.href="popup.html";

}