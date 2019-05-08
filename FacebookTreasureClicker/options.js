let page = document.getElementById('buttonDiv');

function init()
{
    chrome.storage.sync.get(['scanFreq'], function(items) {
        document.getElementById('freqText').innerHTML = items.scanFreq;
    });
}

function changeFreq(val)
{
    document.getElementById('freqText').innerHTML = val;
    chrome.storage.sync.set({scanFreq: val}, function() {
          console.log('[FacebookTreasureClicker] Change scanning period to ' + val + ' second' + ((val == 1)?'':'s'));
    });
}

function rangeListen()
{
    let ranger = document.getElementById('scanFreq');
    chrome.storage.sync.get(['scanFreq'], function(items) {
        ranger.value = items.scanFreq;
    });
    
    ranger.addEventListener("change", function() {
        changeFreq(ranger.value);
    });
}

init();
rangeListen();