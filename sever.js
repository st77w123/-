index.html
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAIL_DAEMON v2.0</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

:root {
  --green:#00ff41; --green-dim:#00cc33; --green-glow:rgba(0,255,65,0.35);
  --green-faint:rgba(0,255,65,0.06); --white:#d8ffe0; --grey:#3d6645;
  --red:#ff3131; --yellow:#ffe600; --bg:#000; --panel:#030a04;
  --border:rgba(0,255,65,0.18);
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html,body{height:100%;}
body{background:var(--bg);color:var(--green);font-family:'Share Tech Mono','Courier New',monospace;min-height:100vh;overflow-x:hidden;}
body::after{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.12) 2px,rgba(0,0,0,0.12) 4px);pointer-events:none;z-index:9999;}
@keyframes flicker{0%,89%,91%,93%,95%,100%{opacity:1}90%,94%{opacity:.88}92%{opacity:.82}}
body{animation:flicker 10s infinite;}

.hdr{position:sticky;top:0;z-index:200;background:var(--panel);border-bottom:1px solid var(--border);padding:14px 28px;display:flex;align-items:center;gap:16px;}
.hdr-logo{font-family:'Orbitron',monospace;font-size:20px;font-weight:900;letter-spacing:4px;text-shadow:0 0 18px var(--green-glow),0 0 36px var(--green-glow);}
.hdr-sub{font-size:10px;color:var(--grey);letter-spacing:2px;margin-top:2px;}
.hdr-right{margin-left:auto;display:flex;align-items:center;gap:8px;}
.badge{font-size:9px;letter-spacing:1.5px;color:var(--green);border:1px solid var(--green);padding:3px 8px;}
.dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:pulse 2s infinite;}
@keyframes pulse{50%{opacity:.4;box-shadow:0 0 2px var(--green);}}

.layout{display:grid;grid-template-columns:400px 1fr;height:calc(100vh - 57px);}
.panel{background:var(--panel);border-right:1px solid var(--border);overflow-y:auto;padding:20px;}
.panel::-webkit-scrollbar{width:3px;}
.panel::-webkit-scrollbar-thumb{background:var(--green-dim);}

.box{border:1px solid var(--border);background:var(--green-faint);padding:14px;margin-bottom:18px;position:relative;}
.box-lbl{position:absolute;top:-8px;left:10px;background:var(--panel);padding:0 6px;font-size:9px;color:var(--green-dim);letter-spacing:2px;}

label{display:block;font-size:10px;color:var(--grey);letter-spacing:1.5px;margin:10px 0 4px;}
label:first-of-type{margin-top:0;}
input,select,textarea{width:100%;background:#010601;border:1px solid var(--border);color:var(--white);font-family:'Share Tech Mono',monospace;font-size:12px;padding:7px 9px;outline:none;transition:border-color .2s,box-shadow .2s;}
input:focus,select:focus,textarea:focus{border-color:var(--green-dim);box-shadow:0 0 8px var(--green-glow);}
select option{background:#010f03;}
textarea{resize:vertical;min-height:80px;}
.hint{font-size:9px;color:#164d20;margin-top:3px;line-height:1.5;}
.hint.warn{color:#7a5500;}

.tabs{display:flex;margin-bottom:10px;}
.tab{flex:1;background:transparent;border:1px solid var(--border);color:var(--grey);font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:1px;padding:6px;cursor:pointer;transition:all .2s;}
.tab.on{background:var(--green-faint);border-color:var(--green-dim);color:var(--green);}
.pane{display:none;}
.pane.on{display:block;}

.drop-zone{border:1px dashed var(--border);padding:18px;text-align:center;font-size:10px;color:var(--grey);letter-spacing:1px;cursor:pointer;position:relative;transition:all .2s;}
.drop-zone:hover,.drop-zone.over{border-color:var(--green-dim);background:var(--green-faint);color:var(--green);}
.drop-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
.rcpt-count{margin-top:6px;font-size:10px;color:var(--grey);}
.rcpt-count.loaded{color:var(--green);}

.btn{display:block;width:100%;padding:11px;font-family:'Orbitron',monospace;font-size:12px;font-weight:700;letter-spacing:3px;border:1px solid var(--green);background:transparent;color:var(--green);cursor:pointer;text-transform:uppercase;transition:all .2s;margin-top:6px;}
.btn:hover:not(:disabled){background:var(--green);color:#000;box-shadow:0 0 18px var(--green-glow),0 0 36px var(--green-glow);}
.btn:disabled{opacity:.3;cursor:not-allowed;}

.drow{display:flex;align-items:center;gap:8px;}
.drow input{width:70px;}
.dlbl{font-size:10px;color:var(--grey);}

.term{display:flex;flex-direction:column;background:#000;overflow:hidden;}
.term-hdr{padding:8px 18px;border-bottom:1px solid var(--border);background:var(--panel);display:flex;align-items:center;gap:10px;flex-shrink:0;}
.term-title{font-family:'Orbitron',monospace;font-size:10px;letter-spacing:2px;color:var(--green-dim);}
.term-acts{margin-left:auto;display:flex;gap:6px;}
.tbtn{background:transparent;border:1px solid var(--border);color:var(--grey);font-family:'Share Tech Mono',monospace;font-size:9px;padding:3px 9px;cursor:pointer;letter-spacing:1px;transition:all .15s;}
.tbtn:hover{border-color:var(--green-dim);color:var(--green);}
.term-body{flex:1;overflow-y:auto;padding:16px 18px;font-size:12px;line-height:1.75;letter-spacing:.3px;}
.term-body::-webkit-scrollbar{width:3px;}
.term-body::-webkit-scrollbar-thumb{background:var(--green-dim);}
.L{display:block;}
.L.sys{color:var(--green);}.L.dim{color:var(--grey);}.L.ok{color:var(--green-dim);}.L.fail{color:var(--red);}.L.done{color:var(--yellow);font-weight:bold;}.L.err{color:var(--red);}

.prog-wrap{padding:0 18px 10px;flex-shrink:0;}
.prog-info{display:flex;justify-content:space-between;font-size:10px;color:var(--grey);margin-bottom:4px;}
.prog-bg{height:2px;background:#0a1a0c;border:1px solid var(--border);}
.prog-fill{height:100%;background:var(--green);box-shadow:0 0 6px var(--green-glow);width:0%;transition:width .25s;}

.cur{display:inline-block;width:7px;height:13px;background:var(--green);vertical-align:middle;animation:blink 1s steps(1) infinite;margin-left:2px;}
@keyframes blink{50%{opacity:0;}}

@media(max-width:860px){.layout{grid-template-columns:1fr;grid-template-rows:auto 1fr;height:auto;}.panel{border-right:none;border-bottom:1px solid var(--border);max-height:55vh;}.term{height:50vh;}}
</style>
</head>
<body>

<header class="hdr">
  <div>
    <div class="hdr-logo">⬛ MAIL_DAEMON</div>
    <div class="hdr-sub">BULK MAIL SYSTEM v2.0 // RESEND API // NO SERVER REQUIRED</div>
  </div>
  <div class="hdr-right">
    <span class="badge">RESEND API</span>
    <div class="dot"></div>
  </div>
</header>

<div class="layout">
  <div class="panel">

    <!-- API Key -->
    <div class="box">
      <span class="box-lbl">// RESEND_API</span>
      <label>API KEY</label>
      <input id="apiKey" type="password" placeholder="re_xxxxxxxxxxxxxxxxxxxx">
      <div class="hint warn">// resend.com → API Keys → Create API Key</div>
      <label>FROM EMAIL（送信元）</label>
      <input id="fromEmail" type="email" placeholder="onboarding@resend.dev" value="onboarding@resend.dev">
      <div class="hint">// 独自ドメイン未設定の場合は onboarding@resend.dev を使用</div>
      <label>SENDER NAME（表示名）</label>
      <input id="fromName" type="text" placeholder="Your Name / Company">
    </div>

    <!-- Recipients -->
    <div class="box">
      <span class="box-lbl">// RECIPIENTS</span>
      <div class="tabs">
        <button class="tab on" id="tab-manual-btn" onclick="switchTab('manual')">MANUAL INPUT</button>
        <button class="tab" id="tab-csv-btn" onclick="switchTab('csv')">CSV UPLOAD</button>
      </div>
      <div class="pane on" id="pane-manual">
        <label>EMAIL LIST（1行1アドレス or "名前,メール"形式）</label>
        <textarea id="manualInput" rows="6" placeholder="client01@example.com&#10;client02@business.jp&#10;田中 太郎,taro@example.com" oninput="parseManual()"></textarea>
      </div>
      <div class="pane" id="pane-csv">
        <div class="drop-zone" id="dropZone">
          <input type="file" id="csvFile" accept=".csv" onchange="handleCSV()">
          ⬛ CSV をドロップ or クリックして選択<br>
          <span style="font-size:9px;color:#164d20">columns: email（必須）, name（任意）</span>
        </div>
      </div>
      <div class="rcpt-count" id="rcptCount">// NO RECIPIENTS LOADED</div>
    </div>

    <!-- Message -->
    <div class="box">
      <span class="box-lbl">// MESSAGE</span>
      <label>SUBJECT（件名）</label>
      <input id="subject" type="text" placeholder="件名 — {{name}} で宛名差し込み可">
      <label>BODY（本文）</label>
      <textarea id="body" rows="7" placeholder="メッセージ本文&#10;{{name}} を使うと自動で名前が入ります。&#10;&#10;例: こんにちは {{name}} さん、"></textarea>
      <div class="hint">// {{name}} → 宛先名に自動置換</div>
    </div>

    <!-- Options -->
    <div class="box">
      <span class="box-lbl">// OPTIONS</span>
      <label>SEND DELAY（送信間隔）</label>
      <div class="drow">
        <input id="delayMs" type="number" value="1000" min="500" max="30000">
        <span class="dlbl">ms / mail &nbsp;（推奨: 1000ms以上）</span>
      </div>
    </div>

    <button class="btn" id="sendBtn" onclick="startSend()">▶ EXECUTE_SEND</button>

  </div>

  <!-- Terminal -->
  <div class="term">
    <div class="term-hdr">
      <span class="term-title">// TRANSMISSION_LOG</span>
      <div class="term-acts">
        <button class="tbtn" onclick="clearTerm()">CLEAR</button>
        <button class="tbtn" onclick="copyLogs()">COPY</button>
      </div>
    </div>
    <div class="term-body" id="tb">
      <span class="L sys">&gt; MAIL_DAEMON v2.0 — SYSTEM INIT</span>
      <span class="L dim">&gt; Backend: Resend API (no server required)</span>
      <span class="L dim">&gt; Enter API key, recipients and message, then EXECUTE_SEND.</span>
      <span class="L dim">&gt; <span class="cur"></span></span>
    </div>
    <div class="prog-wrap" id="progWrap" style="display:none">
      <div class="prog-info"><span id="progLbl">0 / 0</span><span id="progPct">0%</span></div>
      <div class="prog-bg"><div class="prog-fill" id="progBar"></div></div>
    </div>
  </div>
</div>

<script>
let recipients = [], isSending = false, logBuffer = [];

// ── Recipients ───────────────────────────────────────────────────────────────
function switchTab(t) {
  ['manual','csv'].forEach(n => {
    document.getElementById(`tab-${n}-btn`).classList.toggle('on', n === t);
    document.getElementById(`pane-${n}`).classList.toggle('on', n === t);
  });
  recipients = []; updCount();
}

function parseManual() {
  const lines = document.getElementById('manualInput').value.split('\n').map(l => l.trim()).filter(Boolean);
  recipients = lines.map(l => {
    if (l.includes(',')) { const p = l.split(','); return { name: p[0].trim(), email: p.slice(1).join(',').trim() }; }
    return { name:'', email: l };
  }).filter(r => r.email && r.email.includes('@'));
  updCount();
}

function handleCSV() {
  const file = document.getElementById('csvFile').files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const rows = e.target.result.split(/\r?\n/).map(r => r.trim()).filter(Boolean);
    const hasHeader = rows[0].toLowerCase().includes('email') || rows[0].toLowerCase().includes('mail');
    const data = hasHeader ? rows.slice(1) : rows;
    recipients = data.map(row => {
      const cols = row.match(/(".*?"|[^,]+)/g)?.map(c => c.replace(/^"|"$/g,'').trim()) || [row];
      const ei = cols.findIndex(c => c.includes('@'));
      if (ei === -1) return null;
      return { email: cols[ei], name: cols.find((c,i) => i !== ei && c && !c.includes('@')) || '' };
    }).filter(Boolean).filter(r => r.email.includes('@'));
    updCount();
    tlog(`&gt; CSV LOADED: ${recipients.length} recipients ✓`, 'sys');
    scrollTerm();
  };
  reader.readAsText(file, 'UTF-8');
}

const dz = document.getElementById('dropZone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
dz.addEventListener('dragleave', () => dz.classList.remove('over'));
dz.addEventListener('drop', e => {
  e.preventDefault(); dz.classList.remove('over');
  const f = e.dataTransfer.files[0];
  if (f) { document.getElementById('csvFile').files = e.dataTransfer.files; handleCSV(); }
});

function updCount() {
  const el = document.getElementById('rcptCount');
  el.textContent = recipients.length ? `// ${recipients.length} RECIPIENTS LOADED ✓` : '// NO RECIPIENTS LOADED';
  el.className = 'rcpt-count' + (recipients.length ? ' loaded' : '');
}

// ── Send ─────────────────────────────────────────────────────────────────────
async function startSend() {
  if (isSending) return;
  if (document.getElementById('pane-manual').classList.contains('on')) parseManual();

  const apiKey   = document.getElementById('apiKey').value.trim();
  const from     = document.getElementById('fromEmail').value.trim();
  const fromName = document.getElementById('fromName').value.trim();
  const subject  = document.getElementById('subject').value.trim();
  const body     = document.getElementById('body').value.trim();
  const delayMs  = parseInt(document.getElementById('delayMs').value) || 1000;

  if (!apiKey)            { errLog('API Key required.'); return; }
  if (!from)              { errLog('From email required.'); return; }
  if (!recipients.length) { errLog('No recipients loaded.'); return; }
  if (!subject || !body)  { errLog('Subject and body required.'); return; }

  isSending = true;
  const btn = document.getElementById('sendBtn');
  btn.disabled = true; btn.textContent = '⏳ TRANSMITTING...';

  removeCursor();
  tlog('&gt; INITIALIZING MAIL_DAEMON v2.0', 'sys');
  tlog('&gt; CONNECTING TO RESEND API...', 'sys');
  tlog(`&gt; TARGET COUNT: ${recipients.length} RECIPIENTS`, 'dim');
  tlog('&gt; ──────────────────────────────────────────────', 'dim');
  showProg(0, recipients.length);
  scrollTerm();

  let sent = 0, failed = 0;

  for (let i = 0; i < recipients.length; i++) {
    const r   = recipients[i];
    const idx = pad(i + 1);
    const personalName    = r.name || r.email.split('@')[0];
    const personalSubject = subject.replace(/\{\{name\}\}/gi, personalName);
    const personalBody    = body.replace(/\{\{name\}\}/gi, personalName);
    const fromField       = fromName ? `${fromName} <${from}>` : from;

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: fromField,
          to: [r.email],
          subject: personalSubject,
          text: personalBody,
          html: personalBody.replace(/\n/g, '<br>')
        })
      });

      if (res.ok) {
        sent++;
        tlog(`&gt; [${idx}] SENDING → ${esc(r.email)} | STATUS: <span style="color:var(--green);font-weight:bold">SENT</span>`, 'ok');
      } else {
        const err = await res.json();
        failed++;
        tlog(`&gt; [${idx}] SENDING → ${esc(r.email)} | STATUS: <span style="color:var(--red)">FAILED</span> — ${esc(err.message || res.status)}`, 'fail');
      }
    } catch(e) {
      failed++;
      tlog(`&gt; [${idx}] SENDING → ${esc(r.email)} | STATUS: <span style="color:var(--red)">FAILED</span> — ${esc(e.message)}`, 'fail');
    }

    updProg(i + 1, recipients.length);
    scrollTerm();

    if (i < recipients.length - 1) await sleep(delayMs);
  }

  tlog('&gt; ──────────────────────────────────────────────', 'dim');
  tlog('&gt; MAIL_DAEMON COMPLETE ✓', 'done');
  tlog(`&gt; SENT: ${sent} | FAILED: ${failed} | TOTAL: ${recipients.length}`, 'done');
  tlog('&gt; SYSTEM READY FOR NEW REQUEST', 'sys');
  tlog('&gt; <span class="cur"></span>', 'dim');
  hideProg();
  scrollTerm();
  isSending = false;
  btn.disabled = false; btn.textContent = '▶ EXECUTE_SEND';
}

// ── Terminal ──────────────────────────────────────────────────────────────────
function tlog(html, cls='dim') {
  const tb = document.getElementById('tb');
  const span = document.createElement('span');
  span.className = `L ${cls}`; span.innerHTML = html;
  tb.appendChild(span); logBuffer.push(span.textContent);
}
function removeCursor() { document.querySelectorAll('#tb .cur').forEach(el => el.closest('.L')?.remove()); }
function scrollTerm() { const tb = document.getElementById('tb'); tb.scrollTop = tb.scrollHeight; }
function errLog(msg) { removeCursor(); tlog(`&gt; [ERROR] ${esc(msg)}`, 'err'); tlog('&gt; <span class="cur"></span>','dim'); scrollTerm(); }
function clearTerm() { document.getElementById('tb').innerHTML=''; logBuffer=[]; tlog('&gt; TERMINAL CLEARED','dim'); tlog('&gt; <span class="cur"></span>','dim'); }
function copyLogs() { navigator.clipboard.writeText(logBuffer.join('\n')).then(() => { tlog('&gt; LOG COPIED ✓','sys'); scrollTerm(); }); }

// ── Progress ──────────────────────────────────────────────────────────────────
function showProg(d,t){ document.getElementById('progWrap').style.display='block'; updProg(d,t); }
function updProg(d,t){ const p=t?Math.round(d/t*100):0; document.getElementById('progLbl').textContent=`${d} / ${t}`; document.getElementById('progPct').textContent=`${p}%`; document.getElementById('progBar').style.width=p+'%'; }
function hideProg(){ updProg(1,1); setTimeout(()=>{ document.getElementById('progWrap').style.display='none'; },2000); }

// ── Utils ─────────────────────────────────────────────────────────────────────
function pad(n){ return String(n).padStart(3,'0'); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
</script>
</body>
</html>
