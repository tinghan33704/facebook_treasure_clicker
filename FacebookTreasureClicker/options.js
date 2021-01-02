const page = document.getElementById('buttonDiv');
const timeLimit = 120;
let defaultClickBtnClass = "";
let defaultCloseBtnClass = "";
let clickBtnClass = "";
let closeBtnClass = "";

function init()
{
    chrome.storage.sync.get(['scanFreq'], function(items) {
        document.getElementById('freqText').innerHTML = items.scanFreq;
    });
    chrome.storage.sync.get(['defaultClickBtnClass'], function(items) {
        defaultClickBtnClass = items.defaultClickBtnClass;
        clickBtnClass = items.defaultClickBtnClass;
    });
    chrome.storage.sync.get(['defaultCloseBtnClass'], function(items) {
        defaultCloseBtnClass = items.defaultCloseBtnClass;
        closeBtnClass = items.defaultCloseBtnClass;
    });
    
    chrome.storage.sync.get(['clickBtnClass'], function(items) {
        if(items.clickBtnClass && items.clickBtnClass.length > 0) {
            clickBtnClass = items.clickBtnClass;
        }
        document.getElementById('clkClass').value = clickBtnClass;
    });
    chrome.storage.sync.get(['closeBtnClass'], function(items) {
        if(items.closeBtnClass && items.closeBtnClass.length > 0) {
            closeBtnClass = items.closeBtnClass;
        }
        document.getElementById('clsClass').value = closeBtnClass;
    });
}

function showFreq(val)
{
    document.getElementById('freqText').innerHTML = val;
}

function changeFreq(val)
{
    chrome.storage.sync.set({scanFreq: val}, function() {
        console.log('[FacebookTreasureClicker] Change scanning period to ' + val + ' second' + ((val == 1)?'':'s'));
    });
    
    if(val >= timeLimit) {
        alert("寶箱點擊時限為 " + timeLimit + " 秒，偵測時間間隔若超過 " + timeLimit + " 秒可能導致偵測不到寶箱的出現。");
    }
}

function changeClass(type, val) {
    if(type === 'click') {
        chrome.storage.sync.set({clickBtnClass: val}, function() {
            console.log('[FacebookTreasureClicker] Change detection class for click unit to \'' + val + '\'');
        });
    }
    else if(type === 'close') {
        chrome.storage.sync.set({closeBtnClass: val}, function() {
            console.log('[FacebookTreasureClicker] Change detection class for close unit to \'' + val + '\'');
        });
    }
}

function addListener()
{
    let ranger = document.getElementById('scanFreq');
    chrome.storage.sync.get(['scanFreq'], function(items) {
        ranger.value = items.scanFreq;
    });
    
    ranger.addEventListener("input", function() {
        showFreq(ranger.value);
    });
    ranger.addEventListener("change", function() {
        changeFreq(ranger.value);
    });
    
    let textClick = document.getElementById('clkClass');
    textClick.addEventListener("change", function() {
        changeClass('click', textClick.value);
    });
    
    let textClose = document.getElementById('clsClass');
    textClose.addEventListener("change", function() {
        changeClass('close', textClose.value);
    });
    
    let resetClick = document.getElementById('resetClkClass');
    resetClick.addEventListener("click", function() {
        changeClass('click', defaultClickBtnClass);
        
        let textClick = document.getElementById('clkClass');
        textClick.value = defaultClickBtnClass;
    });
    
    let resetClose = document.getElementById('resetClsClass');
    resetClose.addEventListener("click", function() {
        changeClass('close', defaultCloseBtnClass);
        
        let textClose = document.getElementById('clsClass');
        textClose.value = defaultCloseBtnClass;
    });
}

init();
addListener();