chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      id = youtube_parser(changeInfo.url);
      console.log(id);
        if(id != false){
        chrome.storage.sync.get(['youtubeId'] , function(result){
        key = result.youtubeId; 
          if(key == undefined){
            let key = [];
            key.push(id);
            chrome.storage.sync.set({"youtubeId": JSON.stringify(key)});  
          } else {
            key = JSON.parse(result.youtubeId);
            key.push(id);
            chrome.storage.sync.set({"youtubeId": JSON.stringify(key)});  
          }
      });
     }
    }
  });

function youtube_parser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}