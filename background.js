// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onMessage.addListener((req, sender) => {
    if (sender.tab) {
        let is_company_known = is_known_page(req.page);
        let suffix = is_company_known ? "blue" : "gray";
        chrome.browserAction.setIcon({
                tabId: sender.tab.id,
                path: {
                    16: `images/icon_${suffix}_16.png`,
                    32: `images/icon_${suffix}_32.png`,
                    48: `images/icon_${suffix}_48.png`,
                    128: `images/icon_${suffix}_128.png`
                }
            }
        );
        chrome.browserAction.setPopup({
            tabId: sender.tab.id,
            popup: is_company_known ? `popups/company-found.html` : `popups/company-not-found.html`
        })
    }
});

chrome.runtime.onInstalled.addListener(function () {

    fetch("https://pastebin.com/raw/9NwhhGCN") // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.text())
        .then(function(data) {
            chrome.storage.sync.set({websites: data.split("\n")});
        })
        .catch(function(error) {
            console.log(error);
        });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

function is_known_page(page) {
    let known_pages = ["pvcase.com", "e0.lt", "seasafari.lt"];

    if(known_pages.indexOf(page) == -1){
        return false
    }
    return true
}