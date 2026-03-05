/**
 * Calculus AI Chatbot Widget
 * Self-contained floating chat widget — no dependencies
 */
(function () {
  var BRAND = { green: '#0F4D2C', greenLight: '#3E9B5F', gold: '#F2A41F', charcoal: '#1C1F22', surface: '#F7F9F8', surface2: '#EEF2F0', border: '#DDE6E1', mist: '#A9B7AE' };
  var API_URL = '/api/chat';
  var isOpen = false;
  var isLoading = false;
  var history = JSON.parse(sessionStorage.getItem('cr_chat_history') || '[]');

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '#cr-chat-bubble{position:fixed!important;bottom:24px!important;right:24px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:' + BRAND.green + '!important;color:#fff!important;border:none!important;cursor:pointer;z-index:9999!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 4px 20px rgba(0,0,0,.25);transition:transform .2s,box-shadow .2s;padding:0!important;-webkit-appearance:none!important;appearance:none!important;background-image:none!important}',
    '#cr-chat-bubble:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(0,0,0,.35)}',
    '#cr-chat-bubble svg{width:28px!important;height:28px!important;fill:#fff!important;pointer-events:none}',
    '#cr-chat-panel{position:fixed!important;bottom:96px!important;right:24px!important;width:380px;max-height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);z-index:9999!important;display:flex!important;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(16px) scale(.96);pointer-events:none;transition:opacity .25s,transform .25s}',
    '#cr-chat-panel.open{opacity:1!important;transform:translateY(0) scale(1)!important;pointer-events:auto!important}',
    '#cr-chat-header{background:' + BRAND.green + ';color:#fff;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}',
    '#cr-chat-header h3{margin:0;font-size:15px;font-weight:600;font-family:"Space Grotesk","Inter",sans-serif;letter-spacing:-.01em}',
    '#cr-chat-header span{font-size:11px;opacity:.7;display:block;margin-top:2px;font-family:"Inter",sans-serif}',
    '#cr-chat-close{background:none!important;border:none!important;color:#fff!important;cursor:pointer;font-size:20px;padding:4px 8px;opacity:.7;transition:opacity .2s;-webkit-appearance:none!important;appearance:none!important;background-image:none!important}',
    '#cr-chat-close:hover{opacity:1}',
    '#cr-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;min-height:280px;max-height:340px;background:' + BRAND.surface + '}',
    '.cr-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.55;font-family:"Inter",system-ui,sans-serif;word-wrap:break-word}',
    '.cr-msg a{color:' + BRAND.green + ';text-decoration:underline}',
    '.cr-msg-user{background:' + BRAND.green + ';color:#fff;align-self:flex-end;border-bottom-right-radius:4px}',
    '.cr-msg-bot{background:#fff;color:' + BRAND.charcoal + ';align-self:flex-start;border:1px solid ' + BRAND.border + ';border-bottom-left-radius:4px}',
    '.cr-msg-bot strong{color:' + BRAND.green + '}',
    '#cr-chat-input-wrap{padding:12px;border-top:1px solid ' + BRAND.border + ';display:flex;gap:8px;background:#fff;flex-shrink:0}',
    '#cr-chat-input{flex:1;border:1px solid ' + BRAND.border + ';border-radius:10px;padding:10px 14px;font-size:13.5px;font-family:"Inter",system-ui,sans-serif;outline:none;transition:border-color .2s;resize:none;background:#fff!important;color:' + BRAND.charcoal + '!important}',
    '#cr-chat-input:focus{border-color:' + BRAND.greenLight + '}',
    '#cr-chat-send{background:' + BRAND.green + '!important;color:#fff!important;border:none!important;border-radius:10px;padding:10px 16px;cursor:pointer;font-size:13px;font-weight:600;font-family:"Inter",sans-serif;transition:background .2s;flex-shrink:0;-webkit-appearance:none!important;appearance:none!important;background-image:none!important}',
    '#cr-chat-send:hover{background:' + BRAND.greenLight + '!important}',
    '#cr-chat-send:disabled{opacity:.5;cursor:not-allowed}',
    '.cr-typing{display:flex;gap:4px;padding:10px 14px;align-self:flex-start}',
    '.cr-typing span{width:7px;height:7px;background:' + BRAND.mist + ';border-radius:50%;animation:cr-bounce .6s infinite alternate}',
    '.cr-typing span:nth-child(2){animation-delay:.15s}',
    '.cr-typing span:nth-child(3){animation-delay:.3s}',
    '@keyframes cr-bounce{to{opacity:.3;transform:translateY(-4px)}}',
    '@media(max-width:480px){#cr-chat-panel{right:8px!important;left:8px;bottom:88px!important;width:auto;max-height:70vh}#cr-chat-bubble{bottom:16px!important;right:16px!important}}'
  ].join('\n');
  document.head.appendChild(style);

  // Create bubble
  var bubble = document.createElement('button');
  bubble.id = 'cr-chat-bubble';
  bubble.setAttribute('aria-label', 'Open chat');
  bubble.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/><path d="M7 9h10v2H7zm0-3h10v2H7z"/></svg>';
  bubble.onclick = toggleChat;

  // Create panel
  var panel = document.createElement('div');
  panel.id = 'cr-chat-panel';
  panel.innerHTML = '<div id="cr-chat-header"><div><h3>Calculus AI</h3><span>Powered by Calculus Swarm</span></div><button id="cr-chat-close" aria-label="Close chat">&times;</button></div><div id="cr-chat-messages"></div><div id="cr-chat-input-wrap"><input id="cr-chat-input" type="text" placeholder="Ask a question..." autocomplete="off" /><button id="cr-chat-send">Send</button></div>';

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // Event listeners
  document.getElementById('cr-chat-close').onclick = toggleChat;
  document.getElementById('cr-chat-send').onclick = sendMessage;
  document.getElementById('cr-chat-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  // Render existing history
  if (history.length === 0) {
    addBotMessage("Hi! I'm Calculus AI, powered by our private network. I can help you with loan products, rates, services, and more. What can I help you with?");
  } else {
    history.forEach(function (msg) {
      if (msg.role === 'user') addUserBubble(msg.content);
      else if (msg.role === 'assistant') addBotBubble(msg.content);
    });
  }

  // Auto-open on first visit (2s delay)
  if (!sessionStorage.getItem('cr_chat_dismissed')) {
    setTimeout(function () {
      if (!isOpen) {
        isOpen = true;
        panel.classList.add('open');
        scrollToBottom();
      }
    }, 2000);
  }

  function toggleChat() {
    isOpen = !isOpen;
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      setTimeout(function () { document.getElementById('cr-chat-input').focus(); }, 300);
      scrollToBottom();
    } else {
      // Remember that user dismissed the chat
      sessionStorage.setItem('cr_chat_dismissed', '1');
    }
  }

  function sendMessage() {
    if (isLoading) return;
    var input = document.getElementById('cr-chat-input');
    var text = input.value.trim();
    if (!text) return;

    input.value = '';
    addUserBubble(text);
    history.push({ role: 'user', content: text });
    saveHistory();

    isLoading = true;
    document.getElementById('cr-chat-send').disabled = true;
    showTyping();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        hideTyping();
        if (data.reply) {
          addBotBubble(data.reply);
          history.push({ role: 'assistant', content: data.reply });
          saveHistory();
        } else if (data.detail) {
          addBotBubble("Sorry, I encountered an error. Please try again or contact us at hello@calculusresearch.io.");
        }
      })
      .catch(function () {
        hideTyping();
        addBotBubble("Sorry, I'm having trouble connecting right now. Please try again or email hello@calculusresearch.io.");
      })
      .finally(function () {
        isLoading = false;
        document.getElementById('cr-chat-send').disabled = false;
      });
  }

  function addUserBubble(text) {
    var msgs = document.getElementById('cr-chat-messages');
    var div = document.createElement('div');
    div.className = 'cr-msg cr-msg-user';
    div.textContent = text;
    msgs.appendChild(div);
    scrollToBottom();
  }

  function addBotBubble(text) {
    var msgs = document.getElementById('cr-chat-messages');
    var div = document.createElement('div');
    div.className = 'cr-msg cr-msg-bot';
    div.innerHTML = formatMarkdown(text);
    msgs.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(text) {
    addBotBubble(text);
    history.push({ role: 'assistant', content: text });
    saveHistory();
  }

  function showTyping() {
    var msgs = document.getElementById('cr-chat-messages');
    var div = document.createElement('div');
    div.className = 'cr-typing';
    div.id = 'cr-typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    var el = document.getElementById('cr-typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    var msgs = document.getElementById('cr-chat-messages');
    setTimeout(function () { msgs.scrollTop = msgs.scrollHeight; }, 50);
  }

  function saveHistory() {
    if (history.length > 20) history = history.slice(-20);
    sessionStorage.setItem('cr_chat_history', JSON.stringify(history));
  }

  function formatMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((\/[^\)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n- /g, '<br>• ')
      .replace(/\n\d+\. /g, function (m) { return '<br>' + m.trim() + ' '; })
      .replace(/\n/g, '<br>');
  }
})();
