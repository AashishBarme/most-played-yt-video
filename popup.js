let res = document.getElementById('result');
let songList = [];
let ul = document.createElement('ol');
ul.setAttribute('id','songList');

chrome.storage.sync.get(['youtubeId'], function(result) {
          console.log('Value currently is ' + result.youtubeId.length);
          if (result.youtubeId.length > 2) {
            let data = JSON.parse(result.youtubeId);
            
            //calling resursive function
            var list = operation(data, 10);
            console.log(list);

            res.appendChild(ul);
            list.forEach(createHtmlList);
            // res.innerHTML = ul; 
          } else {
              res.innerHTML = "No song selected yet";
          }
});

chrome.storage.sync.getBytesInUse(['youtubeId'], function(value){
    console.log(value);
});

function createHtmlList(element,index,arr)
{
    var li = document.createElement('li');
    li.setAttribute('class','item');
    ul.appendChild(li);
    li.innerHTML  = li.innerHTML + element;
}



function operation(savedArray, counter)
{
     if(counter == 0)
     {
        return songList;
     } else {
        songList.push(mostOccuredItem(savedArray)); //adding id in array
        var newArray =  removeItemFromArray(savedArray, mostOccuredItem(savedArray)); //removing previous id from array
        return operation(newArray, counter-1);
     }
}

function mostOccuredItem(array)
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


function removeItemFromArray(arr, value)
{
    return arr.filter(function(ele){
         return ele != value; });
}