let levelOfError = 0;

function clickOnButtons(label) {
    var buttons = document.querySelectorAll('button');
    Array.prototype.forEach.call(buttons, function (button) {
        if (button.textContent.trim() === label) {
            button.click();
        }
    });
}

function viewCorrection(){
    clickOnButtons("View correction");
}

function clickOnAnswer(successPercentage) {
    var radios = document.querySelectorAll('.bg-success-05 input[type="radio"]');
    var totalRadios = radios.length;



    document.querySelectorAll('.bg-success-05 input[type="radio"]').forEach(function(radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
    });
}


chrome.storage.local.get('levelOfError', function (items) {
    console.log(items.levelOfError);
    levelOfError = items.levelOfError;
    chrome.storage.local.remove('levelOfError');
});

viewCorrection();
setTimeout(() => {
    clickOnAnswer(100);
}, 500);