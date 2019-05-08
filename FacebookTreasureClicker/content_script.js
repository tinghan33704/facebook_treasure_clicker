var interval_id = 0;

function init(){
    console.log("[FacebookTreasureClicker] FacebookTreasureClicker start success");
    chrome.storage.sync.get(['scanFreq'], function(items) {
        console.log("[FacebookTreasureClicker] Scan period : "+items.scanFreq+" second"+((items.scanFreq!=1)?"s":""));
        interval_id = setInterval(function(){checkTreasureExist();},items.scanFreq*1000);
    });
}

function checkTreasureExist(){
    var click_btn = document.getElementsByClassName("_22lc _4jy0 _4jy3 _4jy2");
    var close_btn = document.getElementsByClassName("_22lc _4jy0 _4jy3 _517h _51sy _42ft");
    
    if(click_btn.length > 0)
    {
        click_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Clicked");
    }
    
    if(close_btn.length > 0)
    {
        close_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Panel Closed");
    }
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if (msg.action == 'new_page') {
        init();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    init();
});