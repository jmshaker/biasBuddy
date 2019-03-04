let articleStatusText = document.getElementById('articleStatusText');
let siteAddressText = document.getElementById('siteAddressText');

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

chrome.storage.local.get('noNewsAPIdata', function(x) {

  if (x.noNewsAPIdata == "false"){

    chrome.storage.local.get('relatedArticles', function(data) {

      if (data.relatedArticles.length > 0){

        for (i = 0; i < data.relatedArticles.length; i++){
      
          document.getElementById("relatedArticles").innerHTML = document.getElementById("relatedArticles").innerHTML + "<p><b>" + data.relatedArticles[i].source.name + "</b></p>" + "<a href=" + data.relatedArticles[i].url + " target=" + "blank>" + data.relatedArticles[i].title + "</a> <br />"
          + "<img src=" + data.relatedArticles[i].urlToImage + " style=" + "width:200px;height:100px;>";
      
        }

      }
      else{

        document.getElementById("relatedArticles").innerHTML = "<p><b> No related articles were found. </b></p>";

      }
    
    });

  }
  else{

    document.getElementById("relatedArticles").innerHTML = "<p><b> The current article was written over 6 months ago. News API doesn't index articles written this long ago. </b></p>";

  }

});

/*chrome.storage.local.get('relatedArticles', function(data) {

  for (i = 0; i < data.relatedArticles.length; i++){
  
    document.getElementById("relatedArticles").innerHTML = document.getElementById("relatedArticles").innerHTML + "<p><b>" + data.relatedArticles[i].source.name + "</b></p>" + "<a href=" + data.relatedArticles[i].url + " target=" + "blank>" + data.relatedArticles[i].title + "</a> <br />"
    + "<img src=" + data.relatedArticles[i].urlToImage + " style=" + "width:200px;height:100px;>";

  }

});*/

function popupMain(){

  window.location.href="popup.html";

}