/* ============================================================
   app.js — Zero Trace Cyber Legacy
   All logic wrapped in DOMContentLoaded
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {

    /* ── CONSTANTS ── */
    const MODULES = [
      { id: 0, icon: '🔍', name: 'RECON & OSINT',        desc: 'Master passive and active reconnaissance. Learn WHOIS, DNS enumeration, Google dorking, and Shodan.' },
      { id: 1, icon: '🌐', name: 'NETWORKING',            desc: 'TCP/IP deep dive, packet analysis with Wireshark, port scanning, and network topology mapping.' },
      { id: 2, icon: '🐧', name: 'LINUX FUNDAMENTALS',   desc: 'Command line mastery, file permissions, process management, bash scripting, and privilege basics.' },
      { id: 3, icon: '🕷️', name: 'WEB VULNERABILITIES',  desc: 'OWASP Top 10, SQL injection, XSS, CSRF, IDOR, and file inclusion vulnerabilities explained and tested.' },
      { id: 4, icon: '🔐', name: 'CRYPTOGRAPHY',          desc: 'Symmetric & asymmetric encryption, hashing algorithms, PKI, TLS handshakes, and crypto attacks.' },
      { id: 5, icon: '⚔️', name: 'PENTEST METHODOLOGY',  desc: 'Full engagement lifecycle: scoping, recon, exploitation, post-exploitation, pivoting, and reporting.' },
    ];
  
    const CTF_CHALLENGES = [
      {
        id: 'rot13',
        icon: '🔄',
        name: 'ROT13 DECODER',
        desc: 'Decode the following cipher to capture the flag.',
        hint: 'Ciphertext: SYNT{ebg_guergrra_vf_rnfl}\n\nHint: ROT13 shifts each letter by 13 positions.',
        points: 100,
        flag: 'FLAG{rot_thirteen_is_easy}',
      },
      {
        id: 'sqli',
        icon: '💉',
        name: 'SQL INJECTION',
        desc: 'Bypass the login using a classic SQL injection payload.',
        hint: "Login form accepts: username + password\n\nHint: What happens if username = admin'--",
        points: 200,
        flag: "FLAG{admin'--_bypass}",
      },
      {
        id: 'steg',
        icon: '🖼️',
        name: 'STEGANOGRAPHY',
        desc: 'Hidden data is concealed within plain sight. Find the flag.',
        hint: 'Base64 encoded string: RkxBR3toaWRkZW5faW5fcGxhaW5fc2lnaHR9\n\nHint: Decode the Base64 string above.',
        points: 300,
        flag: 'FLAG{hidden_in_plain_sight}',
      },
      {
        id: 'bof',
        icon: '💥',
        name: 'BUFFER OVERFLOW',
        desc: 'Identify the offset and control the instruction pointer.',
        hint: 'Program crashes at offset 40 bytes.\nPattern: AAAABBBBCCCCDDDD...\n\nHint: The flag is the EIP value in hex: FLAG{0x41414141}',
        points: 500,
        flag: 'FLAG{0x41414141}',
      },
    ];
  
    /* ── STATE (localStorage) ── */
    const LS_KEY = 'ztrace_v1';
  
    function defaultState() {
      return {
        moduleStatus: MODULES.map((m, i) => i === 0 ? 'unlocked' : 'locked'), // 'locked' | 'unlocked' | 'completed'
        ctfSolved: {},   // { challengeId: true }
        ctfPoints: 0,
        overallPct: 0,
      };
    }
  
    function loadState() {
      try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : defaultState();
      } catch { return defaultState(); }
    }
  
    function saveState() {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    }
  
    let state = loadState();
  
    function recalcProgress() {
      const completedModules = state.moduleStatus.filter(s => s === 'completed').length;
      const solvedCtf = Object.keys(state.ctfSolved).length;
      // 60% from modules, 40% from CTF
      const modPct = (completedModules / MODULES.length) * 60;
      const ctfPct = (solvedCtf / CTF_CHALLENGES.length) * 40;
      state.overallPct = Math.round(modPct + ctfPct);
      saveState();
    }
  
    /* ── CUSTOM CURSOR ── */
    const cursorDot  = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
  
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  
    (function animateCursor() {
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    })();
  
    /* ── MATRIX RAIN ── */
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');
    let cols, drops;
  
    function initMatrix() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const fontSize = 13;
      cols  = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    }
  
    function drawMatrix() {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#39ff14';
      ctx.font = '13px Share Tech Mono';
      const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01'.split('');
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 13, y * 13);
        if (y * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
    }
  
    initMatrix();
    setInterval(drawMatrix, 50);
    window.addEventListener('resize', initMatrix);
  
    /* ── SPA NAVIGATION ── */
    const views   = document.querySelectorAll('.view');
    const navBtns = document.querySelectorAll('.nav-btn');
  
    function showView(name) {
      views.forEach(v => v.classList.remove('active'));
      navBtns.forEach(b => b.classList.remove('active'));
  
      const target = document.getElementById('view-' + name);
      if (target) target.classList.add('active');
  
      navBtns.forEach(b => { if (b.dataset.view === name) b.classList.add('active'); });
  
      if (name === 'progress') renderProgress();
    }
  
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => showView(btn.dataset.view));
    });
  
    // Footer nav links
    document.querySelectorAll('[data-view]').forEach(el => {
      if (!el.classList.contains('nav-btn')) {
        el.addEventListener('click', e => { e.preventDefault(); showView(el.dataset.view); });
      }
    });
  
    /* ── UPDATE NAV BADGE ── */
    function updateBadge() {
      document.getElementById('nav-progress-badge').textContent = state.overallPct + '% COMPLETE';
    }
  
    /* ── RENDER MODULES ── */
    function renderModules() {
      const grid = document.getElementById('modules-grid');
      grid.innerHTML = '';
  
      MODULES.forEach((mod, i) => {
        const status = state.moduleStatus[i]; // 'locked' | 'unlocked' | 'completed'
        const card = document.createElement('div');
        card.className = `module-card ${status}`;
  
        let statusBadge = '';
        let actionBtn   = '';
  
        if (status === 'locked') {
          statusBadge = `<span class="module-status status-locked">🔒 LOCKED</span>`;
          actionBtn   = `<button class="btn-secondary" disabled style="opacity:0.3">LOCKED</button>`;
        } else if (status === 'unlocked') {
          statusBadge = `<span class="module-status status-unlocked">⚡ UNLOCKED</span>`;
          actionBtn   = `<button class="btn-primary module-start-btn" data-idx="${i}">START MODULE</button>`;
        } else {
          statusBadge = `<span class="module-status status-complete">✓ COMPLETED</span>`;
          actionBtn   = `<button class="btn-secondary module-start-btn" data-idx="${i}">REVIEW</button>`;
        }
  
        card.innerHTML = `
          <div class="module-num">MODULE ${String(i + 1).padStart(2, '0')}</div>
          <span class="module-icon">${mod.icon}</span>
          <div class="module-name">${mod.name}</div>
          <div class="module-desc">${mod.desc}</div>
          ${statusBadge}
          <br/>
          ${actionBtn}
        `;
        grid.appendChild(card);
      });
  
      // Attach start/complete events
      document.querySelectorAll('.module-start-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          if (state.moduleStatus[idx] === 'unlocked') {
            completeModule(idx);
          }
        });
      });
    }
  
    function completeModule(idx) {
      state.moduleStatus[idx] = 'completed';
      // Unlock next
      if (idx + 1 < MODULES.length) {
        state.moduleStatus[idx + 1] = 'unlocked';
      }
      recalcProgress();
      updateBadge();
      renderModules();
      // Show success modal
      document.getElementById('module-modal-desc').textContent =
        `${MODULES[idx].name} completed. ${idx + 1 < MODULES.length ? MODULES[idx + 1].name + ' is now unlocked.' : 'You have completed all modules!'}`;
      openModal('module-modal');
    }
  
    /* ── RENDER PROGRESS VIEW ── */
    function renderProgress() {
      recalcProgress();
      document.getElementById('stat-overall').textContent = state.overallPct + '%';
      document.getElementById('bar-overall').style.width  = state.overallPct + '%';
      document.getElementById('stat-points').textContent  = state.ctfPoints;
      const completed = state.moduleStatus.filter(s => s === 'completed').length;
      document.getElementById('stat-modules').textContent = completed + '/6';
      const solved = Object.keys(state.ctfSolved).length;
      document.getElementById('stat-flags').textContent   = solved + '/4';
  
      // Module rows
      const list = document.getElementById('module-progress-list');
      list.innerHTML = '';
      MODULES.forEach((mod, i) => {
        const s = state.moduleStatus[i];
        const pct = s === 'completed' ? 100 : s === 'unlocked' ? 0 : 0;
        const color = s === 'completed' ? 'var(--green)' : s === 'unlocked' ? 'var(--amber)' : '#333';
        const label = s === 'completed' ? '✓ DONE' : s === 'unlocked' ? '⚡ IN PROGRESS' : '🔒 LOCKED';
        const row = document.createElement('div');
        row.className = 'mp-row';
        row.innerHTML = `
          <span class="mp-icon">${mod.icon}</span>
          <span class="mp-name">${mod.name}</span>
          <span class="mp-status" style="color:${color}">${label}</span>
          <div class="mp-bar-wrap"><div class="mp-bar" style="width:${pct}%;background:${color}"></div></div>
        `;
        list.appendChild(row);
      });
    }
  
    /* ── RENDER CTF ── */
    function renderCTF() {
      const grid = document.getElementById('ctf-grid');
      grid.innerHTML = '';
  
      CTF_CHALLENGES.forEach(ch => {
        const solved = !!state.ctfSolved[ch.id];
        const card = document.createElement('div');
        card.className = `ctf-card ${solved ? 'solved' : ''}`;
        card.innerHTML = `
          <div class="ctf-pts">${ch.points} PTS</div>
          <span class="ctf-icon">${ch.icon}</span>
          <div class="ctf-name">${ch.name}</div>
          <div class="ctf-desc">${ch.desc}</div>
          ${solved
            ? `<span class="ctf-solved-badge">✓ FLAG CAPTURED</span>`
            : `<button class="btn-primary ctf-attempt-btn" data-id="${ch.id}">ATTEMPT</button>`
          }
        `;
        grid.appendChild(card);
      });
  
      document.querySelectorAll('.ctf-attempt-btn').forEach(btn => {
        btn.addEventListener('click', () => openCTFModal(btn.dataset.id));
      });
    }
  
    /* ── CTF MODAL ── */
    let activeChallengeId = null;
  
    function openCTFModal(id) {
      const ch = CTF_CHALLENGES.find(c => c.id === id);
      if (!ch) return;
      activeChallengeId = id;
      document.getElementById('modal-tag').textContent   = `// ${ch.points} POINTS`;
      document.getElementById('modal-title').textContent = ch.name;
      document.getElementById('modal-hint').textContent  = ch.hint;
      document.getElementById('flag-input').value        = '';
      document.getElementById('modal-feedback').textContent = '';
      document.getElementById('modal-feedback').className = 'modal-feedback';
      openModal('ctf-modal');
      setTimeout(() => document.getElementById('flag-input').focus(), 300);
    }
  
    document.getElementById('submit-flag').addEventListener('click', submitFlag);
    document.getElementById('flag-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') submitFlag();
    });
  
    function submitFlag() {
      if (!activeChallengeId) return;
      const ch = CTF_CHALLENGES.find(c => c.id === activeChallengeId);
      const entered = document.getElementById('flag-input').value.trim();
      const fb = document.getElementById('modal-feedback');
  
      if (entered === ch.flag) {
        fb.textContent = '✓ CORRECT FLAG! +' + ch.points + ' POINTS AWARDED';
        fb.className = 'modal-feedback ok';
        state.ctfSolved[ch.id] = true;
        state.ctfPoints += ch.points;
        recalcProgress();
        updateBadge();
        saveState();
        setTimeout(() => {
          closeModal('ctf-modal');
          renderCTF();
        }, 1400);
      } else {
        fb.textContent = '✗ INCORRECT FLAG. TRY AGAIN.';
        fb.className = 'modal-feedback err';
        document.getElementById('flag-input').focus();
      }
    }
  
    /* ── MODULE SUCCESS MODAL ── */
    document.getElementById('module-modal-close').addEventListener('click', () => closeModal('module-modal'));
  
    /* ── MODAL HELPERS ── */
    function openModal(id) {
      document.getElementById(id).classList.add('open');
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove('open');
    }
  
    document.getElementById('modal-close').addEventListener('click', () => closeModal('ctf-modal'));
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeModal('ctf-modal');
        closeModal('module-modal');
      }
    });
  
    /* ── INTERACTIVE TERMINAL ── */
    const termOutput = document.getElementById('terminal-output');
    const termInput  = document.getElementById('terminal-input');
    const history    = [];
    let histIdx = -1;
  
    const COMMANDS = {
      help: () => [
        { cls: 't-green', text: '┌─────────────────────────────────────────┐' },
        { cls: 't-green', text: '│         ZERO TRACE COMMAND REFERENCE     │' },
        { cls: 't-green', text: '└─────────────────────────────────────────┘' },
        { cls: 't-white', text: '  help         — show this reference' },
        { cls: 't-white', text: '  whoami       — display current user' },
        { cls: 't-white', text: '  ls -la       — list directory contents' },
        { cls: 't-white', text: '  clear        — clear terminal' },
        { cls: 't-white', text: '  nmap scan    — run network scan simulation' },
        { cls: 't-dim',   text: '' },
        { cls: 't-dim',   text: '  Use arrow keys to navigate history.' },
      ],
  
      whoami: () => [
        { cls: 't-green', text: 'root' },
        { cls: 't-dim',   text: 'uid=0(root) gid=0(root) groups=0(root)' },
        { cls: 't-dim',   text: 'Context: zerotrace-operator' },
        { cls: 't-amber', text: '[!] You have elevated privileges. Use responsibly.' },
      ],
  
      'ls -la': () => [
        { cls: 't-dim',   text: 'total 64' },
        { cls: 't-blue',  text: 'drwxr-xr-x  2 root root 4096 Jan 01 00:00 .' },
        { cls: 't-blue',  text: 'drwxr-xr-x 18 root root 4096 Jan 01 00:00 ..' },
        { cls: 't-green', text: '-rw-------  1 root root  220 Jan 01 00:00 .bash_history' },
        { cls: 't-green', text: '-rw-r--r--  1 root root 3526 Jan 01 00:00 .bashrc' },
        { cls: 't-white', text: '-rwxr-xr-x  1 root root 8192 Jan 01 00:00 exploit.py' },
        { cls: 't-white', text: '-rw-r--r--  1 root root  512 Jan 01 00:00 notes.txt' },
        { cls: 't-amber', text: '-rw-------  1 root root  128 Jan 01 00:00 secret.key' },
        { cls: 't-blue',  text: 'drwxr-xr-x  4 root root 4096 Jan 01 00:00 tools/' },
      ],
  
      'nmap scan': () => 'NMAP_ANIMATION',
  
      clear: () => 'CLEAR',
    };
  
    function addLine(text, cls = 't-white') {
      const line = document.createElement('div');
      line.className = `t-line ${cls}`;
      line.textContent = text;
      termOutput.appendChild(line);
      termOutput.scrollTop = termOutput.scrollHeight;
    }
  
    function addPromptEcho(cmd) {
      const line = document.createElement('div');
      line.className = 't-line';
      line.innerHTML = `<span class="t-green">root@zerotrace</span><span class="t-white">:</span><span class="t-blue">~</span><span class="t-white">$</span> <span class="t-cmd-echo">${escHtml(cmd)}</span>`;
      termOutput.appendChild(line);
    }
  
    function escHtml(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
  
    async function runNmap() {
      const target = '192.168.' + Math.floor(Math.random()*255) + '.1';
      addLine(`Starting Nmap 7.94 ( https://nmap.org )`, 't-dim');
      addLine(`Nmap scan report for ${target}`, 't-white');
  
      const steps = [
        { delay: 400,  text: 'Scanning host...', cls: 'scan-line t-green' },
        { delay: 800,  text: 'Host is up (0.0012s latency).', cls: 't-dim' },
        { delay: 1200, text: 'PORT     STATE  SERVICE    VERSION', cls: 't-amber' },
        { delay: 1500, text: '22/tcp   open   ssh        OpenSSH 8.9', cls: 't-green' },
        { delay: 1800, text: '80/tcp   open   http       Apache 2.4.54', cls: 't-green' },
        { delay: 2100, text: '443/tcp  open   https      OpenSSL', cls: 't-green' },
        { delay: 2400, text: '3306/tcp open   mysql      MySQL 8.0.32', cls: 't-amber' },
        { delay: 2700, text: '8080/tcp open   http-proxy Squid 5.7', cls: 't-green' },
        { delay: 3100, text: '─────────────────────────────────────────', cls: 't-dim' },
        { delay: 3200, text: '[!] Potential vulnerability: MySQL 8.0.32 — CVE-2023-21980', cls: 't-red' },
        { delay: 3500, text: 'Nmap done: 1 IP address scanned in 3.47s', cls: 't-dim' },
      ];
  
      for (const s of steps) {
        await delay(s.delay);
        addLine(s.text, s.cls);
      }
      termInput.disabled = false;
      termInput.focus();
    }
  
    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  
    async function processCommand(raw) {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
  
      history.unshift(cmd);
      histIdx = -1;
      addPromptEcho(raw.trim());
  
      if (cmd === 'clear') {
        termOutput.innerHTML = '';
        return;
      }
  
      if (cmd === 'nmap scan') {
        termInput.disabled = true;
        await runNmap();
        return;
      }
  
      const handler = COMMANDS[cmd];
      if (handler) {
        const result = handler();
        if (Array.isArray(result)) {
          result.forEach(r => addLine(r.text, r.cls));
        }
      } else {
        addLine(`bash: ${cmd}: command not found`, 't-red');
        addLine(`Type 'help' to see available commands.`, 't-dim');
      }
  
      termOutput.scrollTop = termOutput.scrollHeight;
    }
  
    termInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = termInput.value;
        termInput.value = '';
        processCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < history.length - 1) histIdx++;
        termInput.value = history[histIdx] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) histIdx--;
        else histIdx = -1;
        termInput.value = histIdx >= 0 ? history[histIdx] : '';
      }
    });
  
    // Focus terminal input when clicking terminal area
    document.getElementById('view-terminal').addEventListener('click', () => {
      if (!termInput.disabled) termInput.focus();
    });
  
    /* ── RESET ── */
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
        state = defaultState();
        saveState();
        updateBadge();
        renderModules();
        renderCTF();
        renderProgress();
      }
    });
  
    /* ── INIT ── */
    recalcProgress();
    updateBadge();
    renderModules();
    renderCTF();
    showView('modules');
  
  });

 