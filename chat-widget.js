/**
 * THE DATA PILOT - SUPPORT CHAT WIDGET v1.0.0
 * ---------------------------------------------------------
 * Plain DOM/fetch floating chat bubble. Injected site-wide
 * by site-loader.js. Talks to chat_start.php / chat_send.php
 * / chat_poll.php at the site root.
 * ---------------------------------------------------------
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tdp_chat_token';
    var POLL_INTERVAL = 8000;

    var state = {
        token: localStorage.getItem(STORAGE_KEY) || null,
        lastId: 0,
        open: false,
        pollTimer: null
    };

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent =
            '#tdp-chat-bubble{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border-radius:50%;' +
            'background:var(--brand-500,#658a55);color:#fff;display:flex;align-items:center;justify-content:center;' +
            'font-size:24px;cursor:pointer;z-index:9998;box-shadow:0 4px 14px rgba(0,0,0,.35);border:none;}' +
            '#tdp-chat-panel{position:fixed;bottom:88px;right:20px;width:320px;max-height:440px;background:var(--surface-card,#1e293b);' +
            'border:1px solid var(--border-color,#334155);border-radius:12px;display:none;flex-direction:column;overflow:hidden;z-index:9999;' +
            'font-family:system-ui,-apple-system,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.4);}' +
            '#tdp-chat-panel.open{display:flex;}' +
            '#tdp-chat-header{padding:.7rem 1rem;background:var(--bg-alt,#0f172a);color:var(--text-base,#e2e8f0);font-weight:600;font-size:.9rem;' +
            'display:flex;justify-content:space-between;align-items:center;}' +
            '#tdp-chat-close{cursor:pointer;background:none;border:none;color:inherit;font-size:1.1rem;line-height:1;}' +
            '#tdp-chat-messages{flex:1;overflow-y:auto;padding:.75rem;display:flex;flex-direction:column;gap:.5rem;min-height:200px;}' +
            '.tdp-msg{max-width:80%;padding:.5rem .7rem;border-radius:10px;font-size:.85rem;line-height:1.35;word-wrap:break-word;}' +
            '.tdp-msg.visitor{background:var(--brand-500,#658a55);color:#fff;align-self:flex-end;}' +
            '.tdp-msg.admin{background:var(--bg-alt,#0f172a);color:var(--text-base,#e2e8f0);align-self:flex-start;}' +
            '#tdp-chat-form{display:flex;border-top:1px solid var(--border-color,#334155);}' +
            '#tdp-chat-input{flex:1;border:none;padding:.6rem .8rem;background:transparent;color:var(--text-base,#e2e8f0);font-size:.85rem;outline:none;}' +
            '#tdp-chat-send{border:none;background:none;color:var(--brand-500,#658a55);font-weight:600;padding:0 .9rem;cursor:pointer;font-size:.85rem;}';
        document.head.appendChild(style);
    }

    function buildWidget() {
        var bubble = document.createElement('button');
        bubble.id = 'tdp-chat-bubble';
        bubble.setAttribute('aria-label', 'Open support chat');
        bubble.textContent = String.fromCodePoint(0x1F4AC);

        var panel = document.createElement('div');
        panel.id = 'tdp-chat-panel';
        panel.innerHTML =
            '<div id="tdp-chat-header">Chat with us' +
            '<button id="tdp-chat-close" aria-label="Close chat">&times;</button></div>' +
            '<div id="tdp-chat-messages"></div>' +
            '<form id="tdp-chat-form">' +
            '<input id="tdp-chat-input" type="text" placeholder="Type a message..." autocomplete="off">' +
            '<button id="tdp-chat-send" type="submit">Send</button>' +
            '</form>';

        document.body.appendChild(bubble);
        document.body.appendChild(panel);

        bubble.addEventListener('click', toggle);
        panel.querySelector('#tdp-chat-close').addEventListener('click', toggle);
        panel.querySelector('#tdp-chat-form').addEventListener('submit', onSubmit);
    }

    function toggle() {
        var panel = document.getElementById('tdp-chat-panel');
        state.open = !state.open;
        panel.classList.toggle('open', state.open);

        if (state.open) {
            ensureSession(function () {
                poll();
                startPolling();
            });
        } else {
            stopPolling();
        }
    }

    function ensureSession(cb) {
        if (state.token) {
            cb();
            return;
        }

        fetch('/chat_start.php', { method: 'POST' })
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (data.status === 'success' && data.token) {
                    state.token = data.token;
                    localStorage.setItem(STORAGE_KEY, state.token);
                }
                cb();
            })
            .catch(function () { cb(); });
    }

    function renderMessages(messages) {
        if (!messages || !messages.length) return;
        var box = document.getElementById('tdp-chat-messages');
        messages.forEach(function (m) {
            var div = document.createElement('div');
            div.className = 'tdp-msg ' + m.sender;
            div.textContent = m.message;
            box.appendChild(div);
            state.lastId = Math.max(state.lastId, parseInt(m.id, 10));
        });
        box.scrollTop = box.scrollHeight;
    }

    function poll() {
        if (!state.token) return;
        fetch('/chat_poll.php?token=' + encodeURIComponent(state.token) + '&since_id=' + state.lastId)
            .then(function (r) { return r.json(); })
            .then(function (data) { renderMessages(data.messages); })
            .catch(function () {});
    }

    function startPolling() {
        stopPolling();
        state.pollTimer = setInterval(poll, POLL_INTERVAL);
    }

    function stopPolling() {
        if (state.pollTimer) {
            clearInterval(state.pollTimer);
            state.pollTimer = null;
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        var input = document.getElementById('tdp-chat-input');
        var message = input.value.trim();
        if (!message || !state.token) return;
        input.value = '';

        var box = document.getElementById('tdp-chat-messages');
        var div = document.createElement('div');
        div.className = 'tdp-msg visitor';
        div.textContent = message;
        box.appendChild(div);
        box.scrollTop = box.scrollHeight;

        fetch('/chat_send.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'token=' + encodeURIComponent(state.token) + '&message=' + encodeURIComponent(message)
        }).then(poll).catch(function () {});
    }

    function init() {
        injectStyles();
        buildWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
