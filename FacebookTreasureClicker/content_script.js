var interval_id;
var treasure_clicked;
var click_btn_class = "";
var close_btn_class = "";

function init(){
    chrome.storage.sync.set({status: "ok"}, function() {
        console.log("[FacebookTreasureClicker] FacebookTreasureClicker Start Success");
    });
    chrome.storage.sync.set({treasure: []}, function() {});
    chrome.storage.sync.get(['scanFreq', 'defaultClickBtnClass', 'defaultCloseBtnClass', 'clickBtnClass', 'closeBtnClass'], function(items) {
        click_btn_class = (items.clickBtnClass && items.clickBtnClass.length > 0) ? items.clickBtnClass : items.defaultClickBtnClass;
        close_btn_class = (items.closeBtnClass && items.closeBtnClass.length > 0) ? items.closeBtnClass : items.defaultCloseBtnClass;
        console.log("[FacebookTreasureClicker] Scan period : "+items.scanFreq+" second"+((items.scanFreq!=1)?"s":""));
        scanRun(items.scanFreq);
    });
    treasure_clicked = false;
}

function scanRun(freq)
{
    interval_id = setInterval(function(){
        checkTreasureExist();
        checkLivePaused();
    },freq*1000);
}

function checkTreasureExist(){
    var click_btn = document.getElementsByClassName(click_btn_class);
    var close_btn = document.getElementsByClassName(close_btn_class);
    
    var prize_tag = document.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql rrkovp55 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d3f4x2em fe6kdd0r mau55g9w c8b282yb mdeji52x a5q79mjw g1cxx5fr ekzkrbhg oo9gr5id hzawbc8m");
    
    if(click_btn.length > 0 && !treasure_clicked)
    {
        click_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Clicked");
        treasure_clicked = true;
    }
    else if(close_btn.length > 0 && treasure_clicked)
    {
        var time = getClickTime();
        var prize_str = prize_tag.length <= 0 ? "" : prize_tag[0].innerHTML;
        getTreasure(time, prize_str);
        
        close_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Panel Closed");
        treasure_clicked = false;
    }
}

function checkLivePaused()
{
    var pause_btn_hide = document.getElementsByClassName("_1jto _bsl _4ubd _3htz hidden_elem");
    var pause_btn = document.getElementsByClassName("_1jto _bsl _4ubd _3htz");
    
    if(pause_btn_hide.length == 0 && pause_btn.length > 0)
    {
        pause_btn[0].click();
        //console.log('Pause clicked');
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
