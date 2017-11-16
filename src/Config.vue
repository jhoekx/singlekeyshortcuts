<template>
<form id="config">
    <p v-for="(shortcut, index) in shortcuts">
        <input type="text" v-model="shortcut.key" placeholder="key">
        <select v-model="shortcut.command">
            <option value="historyBack">History Back</option>
            <option value="historyForward">History Forward</option>
            <option value="tabPrevious">Previous Tab</option>
            <option value="tabNext">Next Tab</option>
        </select>
        <button class="default" v-on:click.stop.prevent="remove(index)">Remove</button>
    </p>
    <p><button class="default" v-on:click.stop.prevent="add">Add</button></p>
</form>
</template>

<script>

var defaultShortcuts = [
    {key: "z", command: "historyBack"},
    {key: "x", command: "historyForward"},
    {key: "c", command: "tabPrevious"},
    {key: "v", command: "tabNext"}
];

export default {
    name: 'config',
    data: function() {
        var configData = {
            shortcuts: [],
        };

        browser.storage.local.get('shortcuts').then(function (storage) {
            var shortcuts = storage.shortcuts;
            if (shortcuts === undefined) {
                shortcuts = defaultShortcuts;
            }
            configData.shortcuts = shortcuts;
        });

        return configData;
    },
    methods: {
        remove: function (index) {
            this.shortcuts.splice(index, 1);
        },
        add: function () {
            this.shortcuts.push({key: "", command: ""});
        }
    },
    watch: {
        shortcuts: {
            deep: true,
            handler: function (value) {
                browser.storage.local.set({shortcuts: value});
            }
        }
    }
}
</script>

<style>
</style>
