let changeColor = document.getElementById('siteAddressText');

  chrome.storage.sync.get('siteAddress', function(data) {

    changeColor.innerHTML = data.siteAddress;

  });