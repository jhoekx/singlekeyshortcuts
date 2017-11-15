"use strict";

var commands = {
    previousTab: function () {
        browser.tabs.query({currentWindow: true}).then(function (tabs) {
            var currentTab = tabs.find(tab => tab.active);
            var previousIndex = (currentTab.index - 1) % tabs.length;
            if (previousIndex === -1) {
                previousIndex = tabs.length - 1;
            }
            browser.tabs.update(tabs[previousIndex].id, {active: true});
        });
    },
    nextTab: function (request, sender) {
        browser.tabs.query({currentWindow: true}).then(function (tabs) {
            var currentTab = tabs.find(tab => tab.active);
            var nextIndex = (currentTab.index + 1) % tabs.length;
            browser.tabs.update(tabs[nextIndex].id, {active: true});
        });
    }
};

browser.runtime.onMessage.addListener(function (request, sender) {
    if (commands.hasOwnProperty(request.command)) {
        commands[request.command](request, sender);
    }
});
