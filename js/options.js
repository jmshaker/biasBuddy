let allNotificationsCheckbox = document.getElementById('allNotifications');
let foundArticleNotificationsCheckbox = document.getElementById('foundArticleNotifications');
let furtherReadingNotificationsCheckbox = document.getElementById('furtherReadingNotifications');

let saveSettingsButton = document.getElementById('saveOptions');

allNotificationsCheckbox.addEventListener('click', function() { enableCheckboxes(); })
foundArticleNotificationsCheckbox.addEventListener('click', function() { enableCheckboxes(); })
furtherReadingNotificationsCheckbox.addEventListener('click', function() { enableCheckboxes(); })

saveSettingsButton.addEventListener('click', function() { saveSettings(); })

chrome.storage.local.get('foundArticleNotifications', function(data) {

  chrome.storage.local.get('furtherReadingNotifications', function(y) {

    if (data.foundArticleNotifications == true){

      if (y.furtherReadingNotifications == true){

        foundArticleNotificationsCheckbox.disabled = "disabled";

        furtherReadingNotificationsCheckbox.disabled = "disabled";

        foundArticleNotificationsCheckbox.checked = true;

        furtherReadingNotificationsCheckbox.checked = true;

        allNotificationsCheckbox.checked = true;

      }
      else{

        foundArticleNotificationsCheckbox.checked = true;

      }

  
    }
    else{

      foundArticleNotificationsCheckbox.checked = "";

      if (y.furtherReadingNotifications == true){

        foundArticleNotificationsCheckbox.checked = true;

      }

    }

  });

});

function enableCheckboxes(){

  if (allNotificationsCheckbox.checked == true){

    foundArticleNotificationsCheckbox.disabled = "disabled";

    furtherReadingNotificationsCheckbox.disabled = "disabled";

    foundArticleNotificationsCheckbox.checked = true;

    furtherReadingNotificationsCheckbox.checked = true;

  }
  else{

    foundArticleNotificationsCheckbox.disabled = "";

    furtherReadingNotificationsCheckbox.disabled = "";

  }

}


function saveSettings(){

  if (foundArticleNotificationsCheckbox.checked == true){

    chrome.storage.local.set({'foundArticleNotifications': true}, function() {
    });

  }
  else{

    chrome.storage.local.set({'foundArticleNotifications': false}, function() {
    });

  }

  if (furtherReadingNotificationsCheckbox.checked == true){

    chrome.storage.local.set({'furtherReadingNotifications': true}, function() {
    });

  }
  else{

    chrome.storage.local.set({'furtherReadingNotifications': false}, function() {
    });

  }

}
