var interval_id;

function init(){
    chrome.storage.sync.set({status: "ok"}, function() {
        console.log("[FacebookTreasureClicker] FacebookTreasureClicker Start Success");
    });
    chrome.storage.sync.set({treasure: []}, function() {});
    chrome.storage.sync.get(['scanFreq'], function(items) {
        console.log("[FacebookTreasureClicker] Scan period : "+items.scanFreq+" second"+((items.scanFreq!=1)?"s":""));
        scanRun(items.scanFreq);
    });
}

function scanRun(freq)
{
    interval_id = setInterval(function(){
        checkTreasureExist();
    },freq*1000);
}

function checkTreasureExist(){
    var click_btn = document.getElementsByClassName("_22lc _4jy0 _4jy3 _4jy2");
    var close_btn = document.getElementsByClassName("_22lc _4jy0 _4jy3 _517h _51sy _42ft");
    
    var prize_tag = document.getElementsByClassName("_3c0i");
    
    if(click_btn.length > 0)
    {
        click_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Clicked");
    }
    
    if(close_btn.length > 0)
    {
        var time = getClickTime();
        var prize_str = (typeof prize_tag == "undefined")?"":prize_tag[0].innerHTML;
        getTreasure(time, prize_str);
        
        close_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Panel Closed");
    }
}

function getClickTime()
{
    var d = new Date();
    return addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
}

function addZero(i) {
    if(i < 10) i = "0" + i;
    return i;
}

function getTreasure(time, prize)
{
    chrome.storage.sync.get(['treasure'], function(items) {
        var treasure_array = items.treasure;
        treasure_array.push({'time': time, 'prize': prize});
        chrome.storage.sync.set({treasure: treasure_array}, function() {});
    });
    
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if(msg.action == 'getStatus')
    {
        chrome.storage.sync.get(['status'], function(items) {
            if(items.status == "ok") chrome.runtime.sendMessage({action: "setStatusOK"});
        });
    }
    else if(msg.action == 'getTreasure')
    {
        chrome.storage.sync.get(['treasure'], function(items) {
            chrome.runtime.sendMessage({action: "showTreasure", data: items.treasure});
        });
    }
    else if(msg.action == 'newPage')
    {
        init();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    init();
});
