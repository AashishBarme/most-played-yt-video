let res = document.getElementById('result');

chrome.storage.sync.get(['youtubeId'], function(result) {
          console.log('Value currently is ' + result.youtubeId.length);
          if (result.youtubeId.length > 2) {
          let data = JSON.parse(result.youtubeId);
          console.log(data);
          res.innerHTML = "<a href='https://www.youtube.com/watch?v="+mode(data)+"' target='_blank'>Here is the song</a>"
          } else {
              res.innerHTML = "No song selected yet";
          }
});

chrome.storage.sync.getBytesInUse(['youtubeId'], function(value){
    
    console.log(value);
});

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}