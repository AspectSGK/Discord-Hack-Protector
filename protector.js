// ==UserScript==
// @name         protector
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  keeps u safe
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    const url = location.href;
    if (
        url.startsWith("https://is.gd/") ||
        url.startsWith("https://protect.captcha-verified.cyou/")
    ) {
        const b = () => { throw new Error("Blocked"); };
        window.XMLHttpRequest = function() { return { open: b, send: b }; };
        window.fetch = b;
        navigator.sendBeacon = b;
        WebSocket.prototype.send = b;

        const d = document.createElement("div");
        d.style = `
            position:fixed;
            top:0;left:0;
            width:100vw;height:100vh;
            background:#1a0000;
            color:#ff4c4c;
            font-family:sans-serif;
            font-size:1.5rem;
            font-weight:bold;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:2rem;
            text-align:center;
            z-index:999999;
        `;
        d.innerHTML = `
            <div style="font-size:3rem; color:#ff0000;">🚨 PHISHING ALERT 🚨</div>
            <p>This link may impersonate Discord or a verification service.</p>
            <p>If you log in, your account can be stolen and used to spam <strong>NSFW scam links</strong>.</p>
            <p><span style="color:white; font-size:1.2rem;">Access has been permanently blocked for your safety.</span></p>
        `;
        document.body.innerHTML = "";
        document.body.appendChild(d);
        setTimeout(() => { while (true) {} }, 100);
    }
})();
