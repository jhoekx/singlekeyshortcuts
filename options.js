"use strict";

let template = document.getElementById("shortcut");

let shortcuts = [];
let defaultShortcuts = [
    { key: "z", command: "historyBack" },
    { key: "x", command: "historyForward" },
    { key: "c", command: "tabPrevious" },
    { key: "v", command: "tabNext" }
];

function addShortcut() {
    shortcuts.push({ key: "", command: "historyBack" });
    updateShortcuts();
}

function removeShortcut(index) {
    shortcuts.splice(index, 1);
    updateShortcuts();
}

function updateKey(index, newKey) {
    shortcuts[index].key = newKey;
    updateShortcuts();
}

function updateCommand(index, newCommand) {
    shortcuts[index].command = newCommand;
    updateShortcuts();
}

function updateShortcuts() {
    browser.storage.local.set({ shortcuts: shortcuts });
}

browser.storage.local.get("shortcuts").then(function (data) {
    if (data.shortcuts !== undefined) {
        shortcuts = data.shortcuts;
    } else {
        shortcuts = defaultShortcuts;
    }
    shortcuts.forEach(function (shortcut, index) {
        let content = template.content.cloneNode(true);
        let form = content.querySelector("form");
        form.dataset.index = index;
        form.elements["key"].value = shortcut.key;
        form.elements["command"].value = shortcut.command;
        document.querySelector("#shortcuts > div").appendChild(content);
    })
});

document.getElementById("shortcuts").addEventListener("change", function (event) {
    if (!["key", "command"].includes(event.target.name)) {
        return;
    }
    let form = event.target.parentNode;
    if (event.target.name === "key") {
        updateKey(form.dataset.index, event.target.value);
    }
    if (event.target.name === "command") {
        updateCommand(form.dataset.index, event.target.value);
    }
});

document.getElementById("shortcuts").addEventListener("click", function (event) {
    if (!["add", "remove"].includes(event.target.name)) {
        return;
    }
    event.preventDefault();
    if (event.target.name === "add") {
        addShortcut();

        let content = template.content.cloneNode(true);
        content.querySelector("form").dataset.index = shortcuts.length - 1;
        document.querySelector("#shortcuts > div").appendChild(content);
    }
    if (event.target.name === "remove") {
        let form = event.target.parentNode;
        removeShortcut(form.dataset.index);

        let div = form.parentNode;
        div.removeChild(form);
        for (let i = 0; i < div.children.length; i++) {
            div.children[i].dataset.index = i;
        }
    }
});
