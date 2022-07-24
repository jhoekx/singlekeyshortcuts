"use strict";

// single key shortcuts

var commands = {
    historyBack: function () {
        window.history.back();
    },
    historyForward: function () {
        window.history.forward();
    },
    tabPrevious: function () {
        browser.runtime.sendMessage({command: "previousTab"});
    },
    tabNext:function () {
        browser.runtime.sendMessage({command: "nextTab"});
    }
};

var shortcuts = null;
var defaultShortcuts = [
    {key: "z", command: "historyBack"},
    {key: "x", command: "historyForward"},
    {key: "c", command: "tabPrevious"},
    {key: "v", command: "tabNext"}
];

function updateShortcuts(config) {
    shortcuts = {};
    config.forEach(function (shortcut) {
        if (shortcut.key && shortcut.command) {
            shortcuts[shortcut.key] = shortcut.command;
        }
    });
}

function isFocusedOnInput(event) {
    var element = event.target;

    if (!element) {
        return
    }

    var name = element.localName.toLowerCase();
    if (name === "input"
    ||  name === "textarea"
    ||  name === "select"
    ||  name === "button"
    ||  name === "isindex"
    ||  element.isContentEditable) {
        return true;
    }

    if(element.ownerDocument.designMode === "on") {
        return true;
    }

    return false;
}

function isMetaKeyPressed(event) {
    if (event.shiftKey
    ||  event.ctrlKey
    ||  event.altKey
    ||  event.metaKey) {
      return true;
    }
    return false;
}

browser.storage.local.get("shortcuts").then(function (data) {
    if (data.shortcuts !== undefined) {
        updateShortcuts(data.shortcuts);
    }
});

browser.storage.local.onChanged.addListener(function (changes) {
    if (changes.shortcuts && changes.shortcuts.newValue) {
        updateShortcuts(changes.shortcuts.newValue);
    }
});

document.addEventListener("keydown", function (event) {
    if (isFocusedOnInput(event)) {
        return;
    }

    if (isMetaKeyPressed(event)) {
        return;
    }

    var keys = shortcuts;
    if (keys === null) {
        updateShortcuts(defaultShortcuts);
        keys = shortcuts;
    }

    if (keys.hasOwnProperty(event.key)) {
        if (commands.hasOwnProperty(keys[event.key])) {
            commands[keys[event.key]](event);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}, false);
