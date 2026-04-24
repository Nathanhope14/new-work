/* ============================================================
js/lessons.js
Reads from lessons-data.js and renders the full-screen
lesson overlay. Handles quiz logic and module completion.
============================================================ */

/* Maps lesson ID → skillData[] index for progress tracking */
const progressMap = {
    recon:      0,
    networking: 1,
    linux:      2,
    webvulns:   3,
    };
    
    /* ── Open a lesson overlay ── */
    function openLesson(id) {
    const data = lessons[id];
    if (!data) return;
    
    const container  = document.getElementById('lesson-content');
    const overlay    = document.getElementById('lesson-view');
    
    /* ── Build HTML string ── */
    let html = ` <button class="lesson-back" onclick="closeLesson()">← BACK TO MODULES</button> <div class="lesson-module-tag">${data.module}</div> <h1 class="lesson-title">${data.title}</h1> <div class="lesson-meta"> <span>⏱ ${data.time}</span> <span>⚡ ${data.difficulty}</span> <span>★ ${data.xp}</span> </div> <div class="lesson-steps">`;
    
    /* ── Steps ── */
    data.steps.forEach((step, i) => {
    html += `<div class="lesson-step" data-step="${i + 1}"> <div class="lesson-step-title">${step.title}</div> <p class="lesson-text">${step.text}</p>`;
    
    ```
    if (step.code) {
      html += `<div class="lesson-code">
        <button class="copy-btn" onclick="copyCode(this)">COPY</button>
        ${step.code}
      </div>`;
    }
    
    if (step.callout) {
      /* 'warn' maps to no extra class (default amber style) */
      const cls = step.callout.type === 'warn' ? '' : step.callout.type;
      html += `<div class="lesson-callout ${cls}">
        <strong>[${step.callout.label}]</strong><br>${step.callout.text}
      </div>`;
    }
    
    html += `</div>`; /* close .lesson-step */
    ```
    
    });
    
    /* ── Quiz ── */
    const q = data.quiz;
    html += `</div><!-- .lesson-steps -->
    
      <div class="quiz-box">
        <div class="quiz-header">▣ KNOWLEDGE CHECK</div>
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-options" id="quiz-opts">`;
    
    q.opts.forEach((opt, i) => {
    html += `<button class="quiz-opt" onclick="checkAnswer(${i}, ${q.correct}, '${id}')"> ${opt} </button>`;
    });
    
    html += `</div><!-- .quiz-options -->
    <div class="quiz-feedback" id="quiz-fb"></div>
    
      </div><!-- .quiz-box -->
    
      <div class="lesson-nav-btns">
        <button class="btn-primary"   onclick="completeLesson('${id}')">MARK COMPLETE ✓</button>
        <button class="btn-secondary" onclick="closeLesson()">← BACK</button>
      </div>`;
    
    /* ── Inject and show ── */
    container.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
    }
    
    /* ── Close the overlay ── */
    function closeLesson() {
    document.getElementById('lesson-view').classList.remove('open');
    document.body.style.overflow = '';
    }
    
    /* ── Quiz answer checking ── */
    function checkAnswer(selected, correct, lessonId) {
    const opts = document.querySelectorAll('.quiz-opt');
    const fb   = document.getElementById('quiz-fb');
    const data = lessons[lessonId].quiz;
    
    /* Lock all options */
    opts.forEach(o => { o.onclick = null; });
    
    if (selected === correct) {
    opts[selected].classList.add('correct');
    fb.className  = 'quiz-feedback show ok';
    fb.textContent = data.feedback.ok;
    showToast('✓ Correct answer! +10 XP earned.', false);
    } else {
    opts[selected].classList.add('wrong');
    opts[correct].classList.add('correct');
    fb.className  = 'quiz-feedback show fail';
    fb.textContent = data.feedback.fail;
    showToast('✗ Incorrect. Review the lesson.', true);
    }
    }
    
    /* ── Mark a module as 100 % complete ── */
    function completeLesson(id) {
    const idx = progressMap[id];
    if (idx !== undefined && skillData[idx].pct < 100) {
    skillData[idx].pct = 100;
    renderProgressBars();
    showToast('✓ Module complete! Achievement unlocked.', false);
    }
    closeLesson();
    }
    
    /* ── Copy code block to clipboard ── */
    function copyCode(btn) {
    /* Remove the “COPY” button text before grabbing the code */
    const code = btn.parentElement.innerText.replace('COPY', '').trim();
    navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'COPIED!';
    setTimeout(() => { btn.textContent = 'COPY'; }, 1500);
    });
    }