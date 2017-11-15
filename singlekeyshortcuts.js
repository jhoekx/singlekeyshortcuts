"use strict";

// single key shortcuts

var keys = {
    "z": function () {
        window.history.back();
    },
    "x": function () {
        window.history.forward();
    },
    "c": function () {
        browser.runtime.sendMessage({command: "previousTab"});
    },
    "v": function () {
        browser.runtime.sendMessage({command: "nextTab"});
    }
};

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

document.addEventListener("keydown", function (event) {
    if (isFocusedOnInput(event)) {
        return;
    }

    if (isMetaKeyPressed(event)) {
        return;
    }

    if (keys.hasOwnProperty(event.key)) {
        keys[event.key](event);
        event.preventDefault();
        event.stopPropagation();
    }
})
