/* ============================================================
js/hero-terminal.js
Timed line-by-line boot animation inside the hero terminal
widget. Add or edit the `lines` array to customise the output.
============================================================ */

(function initHeroTerminal() {
    const output = document.getElementById('hero-terminal-output');
    
    /* Each entry: text shown, CSS class for colour, delay in ms */
    const lines = [
    { text: '$ whoami',                         cls: 't-prompt',  delay: 600  },
    { text: 'root@zero-trace',                   cls: 't-success', delay: 900  },
    { text: '$ cat /etc/target.conf',            cls: 't-prompt',  delay: 1300 },
    { text: 'TARGET: cybersecurity education',   cls: 't-output',  delay: 1600 },
    { text: 'MISSION: empower ethical hackers',  cls: 't-output',  delay: 1900 },
    { text: '$ ./launch_training.sh',            cls: 't-prompt',  delay: 2400 },
    { text: '[+] Loading modules…    [OK]',    cls: 't-success', delay: 2700 },
    { text: '[+] Initializing CTF lab..[OK]',    cls: 't-success', delay: 3000 },
    { text: '[+] Starting simulator….[OK]',    cls: 't-success', delay: 3300 },
    { text: '[!] 12 modules ready. Begin?',      cls: 't-warn',    delay: 3700 },
    { text: '$ _',                               cls: 't-prompt',  delay: 4000 },
    ];
    
    lines.forEach(({ text, cls, delay }) => {
    setTimeout(() => {
    const span = document.createElement('span');
    span.className = 't-line ' + cls;
    span.textContent = text;
    output.appendChild(span);
    output.scrollTop = output.scrollHeight;
    }, delay);
    });
    })();