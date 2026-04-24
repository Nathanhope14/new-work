/* ============================================================
js/lessons-data.js
All lesson content lives here as a plain JS object.
To add a new lesson: copy an existing entry, change the key,
and update the module card in index.html to call
openLesson('your-new-key').
============================================================ */

const lessons = {

/* ── MODULE 01 ─────────────────────────────────────── */
recon: {
module:     'MODULE_01 — RECONNAISSANCE & OSINT',
title:      'Passive Reconnaissance',
time:       '~20 min',
difficulty: 'BEGINNER',
xp:         '+150 XP',
steps: [
{
title: 'What Is Reconnaissance?',
text: `Reconnaissance (recon) is the first phase of any penetration test. It's the process of gathering information about a target <em>before</em> attempting any attack. Think of it as casing the building before a heist — the more intel you have, the better prepared you are.`,
code: null,
callout: {
type:  'info',
label: 'KEY CONCEPT',
text:  'Reconnaissance divides into <strong>passive</strong> (no direct contact with target) and <strong>active</strong> (directly probing the target). Passive recon is harder to detect.',
},
},
{
title: 'OSINT: Open Source Intelligence',
text: `OSINT uses publicly available data — search engines, social media, DNS records, WHOIS, job postings, and more. You can learn a stunning amount about a target without ever touching their systems.`,
code: `<span class="kw"># WHOIS lookup — who owns this domain?</span>
<span class="fn">whois</span> example.com

<span class="kw"># DNS enumeration — find subdomains</span>
<span class="fn">dig</span> +short example.com
<span class="fn">dnsenum</span> example.com

<span class="kw"># Find emails using theHarvester</span>
<span class="fn">theHarvester</span> <span class="str">-d example.com -b google</span>

<span class="kw"># Google dorks — advanced search operators</span>
<span class="str">site:example.com filetype:pdf</span>
<span class="str">site:example.com inurl:admin</span>`, callout: { type:  'warn', label: 'IMPORTANT', text:  '<strong>Always have written permission</strong> before performing reconnaissance on any system you do not own. Even passive recon can have legal implications.', }, }, { title: 'Tools of the Trade', text: `Several powerful, free tools exist for OSINT reconnaissance.
Here are the most important ones every security professional
should know:`, code: `<span class="kw"># Maltego — visual link analysis tool</span>
<span class="kw"># Shodan — search engine for internet-connected devices</span>
<span class="fn">shodan</span> search <span class="str">“apache” port:80</span>

<span class="kw"># Recon-ng framework</span>
<span class="fn">recon-ng</span>
<span class="num">marketplace</span> <span class="fn">search</span> whois
<span class="num">modules</span> <span class="fn">load</span> recon/domains-contacts/whois_pocs
<span class="fn">run</span>

<span class="kw"># Amass — subdomain enumeration</span>
<span class="fn">amass enum</span> <span class="str">-d example.com</span>`,
callout: null,
},
],
quiz: {
q:       “Which type of reconnaissance involves NO direct contact with the target's systems?”,
opts:    ['Active Reconnaissance', 'Passive Reconnaissance', 'Network Scanning', 'Port Enumeration'],
correct: 1,
feedback: {
ok:   “[✓] Correct! Passive reconnaissance uses public data sources — OSINT, WHOIS, DNS records — without touching the target's infrastructure. This makes it much harder to detect.”,
fail: “[✗] Not quite. Passive reconnaissance uses only publicly available information and makes NO direct contact with the target systems, making it nearly undetectable.”,
},
},
},

/* ── MODULE 02 ─────────────────────────────────────── */
networking: {
module:     'MODULE_02 — NETWORK FUNDAMENTALS',
title:      'TCP/IP & The OSI Model',
time:       '~25 min',
difficulty: 'BEGINNER',
xp:         '+175 XP',
steps: [
{
title: 'The OSI Model — 7 Layers of Networking',
text: `Every packet that travels across a network passes through a stack of protocols known as the OSI (Open Systems Interconnection) model. Understanding this model is fundamental to understanding how attacks and defenses work.`,
code: `<span class="kw">Layer 7 — Application:</span>   HTTP, HTTPS, FTP, SSH, DNS <span class="kw">Layer 6 — Presentation:</span>  TLS/SSL, JPEG, MPEG, encryption <span class="kw">Layer 5 — Session:</span>       Session management, NetBIOS <span class="kw">Layer 4 — Transport:</span>     TCP, UDP, port numbers <span class="kw">Layer 3 — Network:</span>      IP, ICMP, routing <span class="kw">Layer 2 — Data Link:</span>    Ethernet, MAC addresses, ARP <span class="kw">Layer 1 — Physical:</span>     Cables, Wi-Fi, electrical signals`,
callout: {
type:  'info',
label: 'MEMORY TIP',
text:  '<strong>Please Do Not Throw Sausage Pizza Away</strong> — Physical, Data Link, Network, Transport, Session, Presentation, Application.',
},
},
{
title: 'TCP Three-Way Handshake',
text: `Before any TCP connection is established, a three-way handshake occurs. This is critical to understand for attack techniques like SYN floods and port scanning.`,
code: `<span class="kw"># The TCP 3-way handshake:</span>

<span class="fn">CLIENT</span>  ──── SYN ────►  <span class="str">SERVER</span>
<span class="kw">“I want to connect, seq=1000”</span>

<span class="fn">CLIENT</span>  ◄── SYN-ACK ──  <span class="str">SERVER</span>
<span class="kw">“OK, seq=5000, ack=1001”</span>

<span class="fn">CLIENT</span>  ──── ACK ────►  <span class="str">SERVER</span>
<span class="kw">“Acknowledged, ack=5001”</span>

<span class="cm"># Connection established! Data can now flow.</span>
<span class="cm"># A SYN scan sends SYN but never completes the</span>
<span class="cm"># handshake — stealthy port scanning technique.</span>`,
callout: {
type:  'danger',
label: 'ATTACK RELEVANCE',
text:  '<strong>SYN Flood attacks</strong> exploit this handshake by sending millions of SYN packets without completing the connection, exhausting server resources (DoS).',
},
},
],
quiz: {
q:       'On which OSI layer do IP addresses operate?',
opts:    ['Layer 2 — Data Link', 'Layer 3 — Network', 'Layer 4 — Transport', 'Layer 7 — Application'],
correct: 1,
feedback: {
ok:   '[✓] Correct! IP addresses (IPv4/IPv6) operate at Layer 3 — the Network layer. This layer handles routing packets between different networks.',
fail: '[✗] Not quite. IP addresses live at Layer 3 (Network). Layer 2 uses MAC addresses, Layer 4 uses ports, and Layer 7 handles application protocols.',
},
},
},

/* ── MODULE 03 ─────────────────────────────────────── */
linux: {
module:     'MODULE_03 — LINUX FOR HACKERS',
title:      'Essential Linux Commands',
time:       '~30 min',
difficulty: 'BEGINNER',
xp:         '+200 XP',
steps: [
{
title: 'Why Linux for Cybersecurity?',
text: `The vast majority of servers, network devices, and cybersecurity tools run on Linux. Kali Linux, Parrot OS, and BlackArch are purpose-built distributions with hundreds of security tools pre-installed.`,
code: `<span class="kw"># File system navigation</span>
<span class="fn">ls</span> <span class="str">-la</span>              <span class="cm"># list all files with permissions</span>
<span class="fn">cd</span> <span class="str">/var/www</span>       <span class="cm"># change directory</span>
<span class="fn">pwd</span>               <span class="cm"># print working directory</span>
<span class="fn">find</span> <span class="str">/ -name “*.conf” 2>/dev/null</span>  <span class="cm"># search files</span>

<span class="kw"># Read files</span>
<span class="fn">cat</span> <span class="str">/etc/passwd</span>    <span class="cm"># show contents</span>
<span class="fn">less</span> logfile.txt   <span class="cm"># paginated view</span>
<span class="fn">grep</span> <span class="str">“error” /var/log/syslog</span>  <span class="cm"># search in file</span>

<span class="kw"># Permissions</span>
<span class="fn">chmod</span> <span class="num">755</span> script.sh   <span class="cm"># rwxr-xr-x</span>
<span class="fn">chown</span> root:root file   <span class="cm"># change owner</span>`, callout: { type:  'info', label: 'PRO TIP', text:  '<strong>Tab completion</strong> is your best friend. Press Tab to autocomplete file paths and command names. Use the Up arrow to recall previous commands.', }, }, { title: 'Networking Commands', text: `These Linux networking commands are used constantly in penetration
testing and network analysis:`, code: `<span class="fn">ifconfig</span>               <span class="cm"># display network interfaces</span>
<span class="fn">ip addr show</span>           <span class="cm"># modern alternative to ifconfig</span>
<span class="fn">ping</span> <span class="str">192.168.1.1</span>      <span class="cm"># test connectivity</span>
<span class="fn">traceroute</span> google.com  <span class="cm"># trace packet path</span>
<span class="fn">netstat</span> <span class="str">-tuln</span>          <span class="cm"># list open ports</span>
<span class="fn">ss</span> <span class="str">-tulnp</span>             <span class="cm"># modern netstat</span>
<span class="fn">arp</span> <span class="str">-a</span>                 <span class="cm"># ARP table (IP→MAC mapping)</span>
<span class="fn">curl</span> <span class="str">-I https://example.com</span>   <span class="cm"># HTTP headers</span>
<span class="fn">wget</span> <span class="str">http://example.com/file</span>  <span class="cm"># download file</span>`,
callout: null,
},
],
quiz: {
q:       'Which command lists all files including hidden ones with detailed permissions?',
opts:    ['ls -la', 'cat -a', 'find / -all', 'dir /h'],
correct: 0,
feedback: {
ok:   '[✓] Correct! “ls -la” uses -l for long format (shows permissions, owner, size, date) and -a to show all files including hidden ones (starting with .).',
fail: '[✗] The correct answer is “ls -la”. The -l flag shows long format with permissions and metadata, while -a shows hidden files (those starting with a dot).',
},
},
},

/* ── MODULE 04 ─────────────────────────────────────── */
webvulns: {
module:     'MODULE_04 — WEB VULNERABILITIES',
title:      'SQL Injection',
time:       '~35 min',
difficulty: 'INTERMEDIATE',
xp:         '+250 XP',
steps: [
{
title: 'What is SQL Injection?',
text: `SQL Injection (SQLi) is one of the oldest and most dangerous web vulnerabilities. It occurs when user input is directly embedded into a SQL query without proper sanitisation, allowing an attacker to manipulate the database.`,
code: `<span class="kw"># Vulnerable PHP code:</span>
<span class="fn">$query</span> = <span class="str">“SELECT * FROM users WHERE username='”</span>
. <span class="fn">$_POST</span>[<span class="str">'username'</span>] . <span class="str">”'”</span>;

<span class="kw"># Normal input:    admin

# Results in:</span>   SELECT * FROM users WHERE username='admin'

<span class="kw"># Malicious input:</span>
<span class="str">admin' OR '1'='1</span>
<span class="cm"># Results in: WHERE username='admin' OR '1'='1'</span>
<span class="cm"># '1'='1' is always TRUE → returns ALL users!</span>`, callout: { type:  'danger', label: 'LEGAL WARNING', text:  '<strong>Only test SQL injection on systems you own or have explicit written permission to test.</strong> Unauthorised SQL injection is a federal crime in most countries.', }, }, { title: 'Types of SQL Injection', text: `There are several variants of SQL injection, each requiring
different techniques to detect and exploit:`, code: `<span class="kw"># 1. In-band SQLi (most common)</span>
<span class="str">' OR 1=1–</span>               <span class="cm"># authentication bypass</span>
<span class="str">' UNION SELECT 1,2,3–</span>   <span class="cm"># extract data</span>

<span class="kw"># 2. Blind Boolean SQLi (no visible output)</span>
<span class="str">' AND 1=1–</span>   <span class="cm"># page loads   = vulnerable</span>
<span class="str">' AND 1=2–</span>   <span class="cm"># page breaks  = vulnerable</span>

<span class="kw"># 3. Time-based Blind SQLi</span>
<span class="str">' AND SLEEP(5)–</span>   <span class="cm"># 5-second delay confirms injection</span>

<span class="kw"># 4. Using sqlmap (automated)</span>
<span class="fn">sqlmap</span> <span class="str">-u “http://target.com/page?id=1” –dbs</span>`,
callout: {
type:  'info',
label: 'DEFENSE',
text:  '<strong>Prevention:</strong> Always use <strong>parameterized queries</strong> (prepared statements) or ORMs. Never concatenate user input directly into SQL strings.',
},
},
],
quiz: {
q:       'What is the PRIMARY defense against SQL injection attacks?',
opts:    ['Input length limits', 'Parameterized queries / prepared statements', 'Hiding database errors', 'Using a firewall'],
correct: 1,
feedback: {
ok:   '[✓] Correct! Parameterized queries (prepared statements) separate SQL code from data — user input is never interpreted as SQL, making injection impossible.',
fail: '[✗] The primary defense is parameterized queries (prepared statements). These ensure user input is always treated as data, never as executable SQL code.',
},
},
},
};