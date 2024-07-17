console.log("This is a popup!")


var button = document.getElementById("mybutton");
var rangeIn = document.getElementById("rangeIn");

let errorValue = 70;
document.getElementById("labelRange").innerHTML = errorValue;
/* button.person_name = "Bob";*/

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    console.log(tabs[0].url);
    my_tabid = tabs[0].id;
});


button.addEventListener(
    "click", () => {
        console.log("Helo");
        chrome.scripting
            .registerContentScripts([{
                id: "session-script",
                js: ["scripts/content.js"],
                persistAcrossSessions: false,
                matches: ["*://*.global-exam.com/training/*"],
                runAt: "document_start",
            }])
            .then(() => console.log("registration complete"))
            .catch((err) => console.warn("unexpected error", err));
        chrome.storage.local.set({ levelOfError: errorValue }).then(() => {
            chrome.scripting
                .executeScript({
                    target: { tabId: my_tabid },
                    files: ["scripts/content.js"],
                })
                .then(() => console.log("script injected"))
        });
    }, false);


rangeIn.addEventListener(
    "change", (value) => {
        console.log(value)
        errorValue = value.target.value
        document.getElementById("labelRange").innerHTML = errorValue;
    }, false);