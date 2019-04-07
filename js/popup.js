let websiteNameText = document.getElementById('websiteName');

let websiteStatusButton = document.getElementById('websiteStatus');

let articleContentButton = document.getElementById('articleContent');
let wordAnalysisButton = document.getElementById('wordAnalysis');
let furtherReadingButton = document.getElementById('furtherReading');

let optionsButton = document.getElementById('optionsButton');

//websiteStatusButton.addEventListener('click', function() { displaySiteInfo(); })

articleContentButton.addEventListener('click', function() { articleContent(); })

wordAnalysisButton.addEventListener('click', function() { wordAnalysis(); })

furtherReadingButton.addEventListener('click', function() { furtherReading(); })

optionsButton.addEventListener('click', function() { openOptions(); })


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

chrome.storage.local.get('articleStatus', function(data) {

  switch(data.articleStatus){

    case "Article found":

    $("#articleContent").removeAttr("disabled");

    $("#articleContent").css("opacity", 1);

    $("#wordAnalysis").removeAttr("disabled");

    $("#wordAnalysis").css("opacity", 1);

    chrome.storage.local.get('relatedArticles', function(y) {

      if (y.relatedArticles.length > 0){

        $("#furtherReading").removeAttr("disabled");

        $("#furtherReading").css("opacity", 1);

      }
    });

    break;

    case "Article not found":

    $("#articleContent").attr("disabled","disabled")

    $("#articleContent").css("opacity", 0.2);

    $("#wordAnalysis").attr("disabled","disabled")

    $("#wordAnalysis").css("opacity", 0.2);

    $("#furtherReading").attr("disabled","disabled")

    $("#furtherReading").css("opacity", 0.2);

    break;

  }

});

$("#articleContent").hover(function(){
  $(this).animate({
    height: '+=5px',
    width: '+=5px'
  }, 200);

  $("#selectedButton").text("Article content");

}, function() {
  $(this).animate({
    height: '-=5px',
    width: '-=5px'
  },200);

  $("#selectedButton").text("");

});

$("#wordAnalysis").hover(function(){
  $(this).animate({
    height: '+=5px',
    width: '+=5px'
  }, 200);

  $("#selectedButton").text("Article analysis");

}, function() {
  $(this).animate({
    height: '-=5px',
    width: '-=5px'
  },200);

  $("#selectedButton").text("");

}); 

$("#furtherReading").hover(function(){
  $(this).animate({
    height: '+=5px',
    width: '+=5px'
  }, 200);

  $("#selectedButton").text("Further reading");

}, function() {
  $(this).animate({
    height: '-=5px',
    width: '-=5px'
  },200);

  $("#selectedButton").text("");

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

function openOptions(){

  chrome.tabs.create({ url: "options.html" });

}

function articleContent(){

  window.location.href="articleContent.html";

}

function wordAnalysis(){

  window.location.href="wordAnalysis.html";

}

function furtherReading(){

  window.location.href="furtherReading.html";

}