chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({"checker":0});
  chrome.storage.sync.set({"youtubeId":"[]"});
});


chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      id = youtube_parser(changeInfo.url);
        if(id != false){
          chrome.storage.sync.get(['youtubeId'] , function(result){
            chrome.storage.sync.get(['checker'], function(res){
               var date = new Date();
               var currentDay = date.getDay();
               var key;
                if (currentDay === 0 && res.checker === 0) {
                   key = [];
                   UpdateStorage(key);
                   chrome.storage.sync.set({"checker":1});
                } else if(currentDay === 0 && res.checker === 1) {
                   key = JSON.parse(result.youtubeId);
                   UpdateStorage(key); 
                } else {  
                    key = JSON.parse(result.youtubeId);
                    UpdateStorage(key);
                    chrome.storage.sync.set({"checker":0});  
                }  
              });  
        });
      }
    }
});


function UpdateStorage(key){
   key.push(id);
   chrome.storage.sync.set({"youtubeId": JSON.stringify(key)});
}


function youtube_parser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

