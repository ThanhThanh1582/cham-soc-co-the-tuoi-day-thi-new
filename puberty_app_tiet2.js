// ==========================================================================
// TIẾT 2: BÁC SĨ CỘNG ĐỒNG - INTERACTIVE APPLICATION CONTROLLER
// ==========================================================================

// --- AUDIO SYNTHESIZER MANAGER (WEB AUDIO API) ---
class AudioSynthManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq, duration, type = 'sine') {
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context failed:", e);
    }
  }

  playSuccess() {
    this.init();
    // Ascending clinical sound chord
    const now = this.ctx.currentTime;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playBeep(freq, 0.25, 'triangle');
      }, index * 80);
    });
  }

  playError() {
    this.init();
    // Buzzing clinic error chime
    this.playBeep(180, 0.35, 'sawtooth');
  }

  playStamp() {
    this.init();
    // Thumping wet ink stamp sound
    this.playBeep(90, 0.15, 'triangle');
    setTimeout(() => {
      this.playBeep(140, 0.08, 'sine');
    }, 40);
  }
}

const AudioSynth = new AudioSynthManager();

// --- CHEERFUL BACKGROUND MUSIC SYNTHESIZER ---
class CheerfulMusicLoop {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentNoteIndex = 0;
    
    // Upbeat melody in C major pentatonic (C4, D4, E4, G4, A4)
    this.melody = [
      261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66,
      329.63, 329.63, 329.63, 392.00, 440.00, 440.00, 493.88, 523.25
    ];
    this.tempo = 0.25; // 125ms per eighth note
  }
  
  init() {
    AudioSynth.init();
    this.ctx = AudioSynth.ctx;
  }
  
  start() {
    this.init();
    if (this.isPlaying) return;
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    
    const playNextNote = () => {
      if (!this.isPlaying) return;
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      const freq = this.melody[this.currentNoteIndex];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle'; // pleasant chiptune tone
      osc.frequency.setValueAtTime(freq, now);
      
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq / 2, now); // sub-octave support
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + this.tempo - 0.02);
      
      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.03, now + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + this.tempo - 0.02);
      
      osc.connect(gain);
      subOsc.connect(subGain);
      
      gain.connect(this.ctx.destination);
      subGain.connect(this.ctx.destination);
      
      osc.start(now);
      subOsc.start(now);
      
      osc.stop(now + this.tempo);
      subOsc.stop(now + this.tempo);
      
      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      
      this.timerId = setTimeout(playNextNote, this.tempo * 1000);
    };
    
    playNextNote();
  }
  
  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

const BackgroundMusic = new CheerfulMusicLoop();


// --- MATCH GAME SVG DYNAMIC LINES DRAWING ---
function drawMatchLines() {
  const svg = document.getElementById('match-lines-svg');
  if (!svg) return;
  svg.innerHTML = '';
  
  const container = document.querySelector('.match-game-container');
  if (!container || container.offsetParent === null) return; // Not visible
  const containerRect = container.getBoundingClientRect();
  
  const leftItems = document.querySelectorAll('#match-left-col .match-item.matched');
  leftItems.forEach(leftEl => {
    const matchId = leftEl.getAttribute('data-match');
    const rightEl = document.querySelector(`#match-right-col .match-item.matched[data-match="${matchId}"]`);
    if (rightEl) {
      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();
      
      const x1 = leftRect.right - containerRect.left;
      const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
      
      const x2 = rightRect.left - containerRect.left;
      const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;
      
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      
      // Match color coordinates matching card borders
      const colors = {
        '1': '#10B981', // mint
        '2': '#8B5CF6', // purple
        '3': '#F59E0B', // amber
        '4': '#DB2777'  // coral
      };
      line.setAttribute('stroke', colors[matchId] || '#0891B2');
      line.setAttribute('stroke-width', '4');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-dasharray', '8');
      
      svg.appendChild(line);
    }
  });
}
window.drawMatchLines = drawMatchLines;
window.addEventListener('resize', drawMatchLines);

// --- STATE MANAGEMENT ---
const AppState = {
  currentSlide: 1,
  totalSlides: 25,
  
  // Slide 14 State: Checked hotspots per letter case
  auditState: {
    face: {
      found: new Set(),
      total: 2, // "xà phòng bánh giặt đồ", "nặn mụn"
      correctIds: ["h1-1", "h1-2"]
    },
    odor: {
      found: new Set(),
      total: 2, // "tắm bằng nước lã", "mặc lại quần áo bẩn"
      correctIds: ["h2-1", "h2-2"]
    },
    sensitive: {
      found: new Set(),
      total: 2, // "không đi tất", "thay đồ lót 2 ngày một lần"
      correctIds: ["h3-1", "h3-2"]
    }
  },
  activeAuditCase: 'face',

  // Checked commitments & cert
  checkedCommitments: new Set(),
  studentName: '',
  isStamped: false,

  // Registries for timers
  reflexTimers: {},
  slideTimers: {}
};

// Slide List mappings (id to relative number)
const slideIds = Array.from({length: AppState.totalSlides}, (_, i) => `slide-${i + 1}`);

// Slide metadata for title header sync
const slideMetadata = {
  "slide-1": "HOẠT ĐỘNG 1: MỞ KHÓA CHIẾN DỊCH",
  "slide-2": "QUY CHẾ PHẢN ỨNG NHANH",
  "slide-3": "CÂU HỎI PHẢN XẠ 1",
  "slide-4": "CÂU HỎI PHẢN XẠ 2",
  "slide-5": "CÂU HỎI PHẢN XẠ 3",
  "slide-6": "CÂU HỎI PHẢN XẠ 4",
  "slide-7": "CÂU HỎI PHẢN XẠ 5",
  "slide-8": "CÂU HỎI PHẢN XẠ 6",
  "slide-9": "CÂU HỎI PHẢN XẠ 7",
  "slide-10": "CÂU HỎI PHẢN XẠ 8",
  "slide-11": "MỞ KHÓA CHIẾN DỊCH THÀNH CÔNG!",
  "slide-12": "HOẠT ĐỘNG 2: HẬU QUẢ BỎ BÊ CƠ THỂ",
  "slide-13": "GIÁM ĐỊNH 3 HỒ SƠ VỆ SINH SAI",
  "slide-14": "BÓC TÁCH TỪ KHÓA VỆ SINH SAI",
  "slide-15": "GAME: ĐẤU NỐI NGUY CƠ Y KHOA",
  "slide-16": "KẾT LUẬN CỘNG ĐỒNG: CẨM NANG Y KHOA CHUẨN",
  "slide-17": "HOẠT ĐỘNG 3: XƯỞNG IN TỜ RƠI TUYÊN TRUYỀN",
  "slide-18": "NHIỆM VỤ THIẾT KẾ & TRANG TRÍ TỜ RƠI",
  "slide-19": "XƯỞNG THIẾT KẾ & THAM KHẢO MẪU",
  "slide-20": "THANG ĐO CHẤT LƯỢNG TỜ RƠI TRUYỀN THÔNG",
  "slide-21": "HỘI CHẨN TỔNG KẾT LÂM SÀNG",
  "slide-22": "NHẬT KÝ LÂM SÀNG - CÂU 1",
  "slide-23": "NHẬT KÝ LÂM SÀNG - CÂU 2",
  "slide-24": "NHẬT KÝ LÂM SÀNG - CÂU 3",
  "slide-25": "TƯ DUY PHÒNG BỆNH: CAM KẾT HÀNH ĐỘNG MỖI NGÀY"
};

// --- NAVIGATION & INTERFACE ROUTINES ---
function navigateToSlide(slideNum) {
  if (slideNum < 1 || slideNum > AppState.totalSlides) return;
  
  // Transition sound effect
  AudioSynth.playBeep(450, 0.08, 'triangle');

  const oldSlideNum = AppState.currentSlide;
  const oldSlideId = `slide-${oldSlideNum}`;
  const newSlideId = `slide-${slideNum}`;
  
  // Stop any running reflex timers when navigating away
  for (let s = 3; s <= 10; s++) {
    if (AppState.reflexTimers[s] && AppState.reflexTimers[s].isRunning()) {
      AppState.reflexTimers[s].pause();
    }
  }
  
  // Stop slide timer when navigating away from slide 19
  if (AppState.slideTimers[19] && AppState.slideTimers[19].isRunning()) {
    AppState.slideTimers[19].pause();
  }

  // Update visibility
  const oldSlideEl = document.getElementById(oldSlideId);
  const newSlideEl = document.getElementById(newSlideId);
  if (oldSlideEl) oldSlideEl.classList.remove('active');
  if (newSlideEl) newSlideEl.classList.add('active');

  // Update State
  AppState.currentSlide = slideNum;

  // Sync Sidebar active navigation
  document.querySelectorAll('.slide-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-slide') === newSlideId) {
      item.classList.add('active');
    }
  });

  // Sync Top Header Text
  const headerTopic = document.getElementById('display-header-topic');
  if (headerTopic && slideMetadata[newSlideId]) {
    headerTopic.innerText = slideMetadata[newSlideId];
  }

  // Sync Right Sidebar Guide Content
  document.querySelectorAll('.guide-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const activeGuidePanel = document.getElementById(`guide-${newSlideId}`);
  if (activeGuidePanel) {
    activeGuidePanel.classList.add('active');
  }

  // Auto-start reflex timer when entering reflex slides or slide 19 design timer
  if (slideNum >= 3 && slideNum <= 10) {
    if (AppState.reflexTimers[slideNum]) {
      setTimeout(() => {
        if (AppState.currentSlide === slideNum) {
          AppState.reflexTimers[slideNum].start();
        }
      }, 500);
    }
  } else if (slideNum === 19) {
    if (AppState.slideTimers[19]) {
      setTimeout(() => {
        if (AppState.currentSlide === slideNum) {
          AppState.slideTimers[19].start();
        }
      }, 500);
    }
  }

  // Stop background music if navigating away from Slide 19
  if (oldSlideNum === 19 && slideNum !== 19) {
    BackgroundMusic.stop();
    const musicBtn = document.getElementById('btn-music-toggle');
    if (musicBtn) musicBtn.innerText = '🎵 BẬT NHẠC NỀN';
  }

  // Redraw SVG match lines when entering slide 15
  if (slideNum === 15) {
    setTimeout(drawMatchLines, 100);
  }

  // Confetti on slide 11 (unlock success)
  if (slideNum === 11) {
    setTimeout(() => {
      triggerGraduationConfetti();
    }, 300);
  }
}

// Global Keyboard Navigation
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    navigateToSlide(AppState.currentSlide + 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    navigateToSlide(AppState.currentSlide - 1);
  }
});

// Bind Sidebar click events
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slide-item').forEach(item => {
    item.addEventListener('click', () => {
      const slideId = item.getAttribute('data-slide');
      const num = parseInt(slideId.replace('slide-', ''));
      navigateToSlide(num);
    });
  });

  // Sidebar Toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const appContainer = document.querySelector('.app-container');
  if (sidebarToggle && appContainer) {
    sidebarToggle.addEventListener('click', () => {
      AudioSynth.playBeep(400, 0.05);
      appContainer.classList.toggle('sidebar-collapsed');
    });
  }

  // Teacher Guide Sidebar Toggle
  const teacherGuideToggle = document.getElementById('teacher-guide-toggle');
  if (teacherGuideToggle && appContainer) {
    teacherGuideToggle.addEventListener('click', () => {
      AudioSynth.playBeep(400, 0.05);
      appContainer.classList.toggle('sidebar-collapsed-right');
    });
  }

  // Teacher Guide Sidebar Close Button
  const teacherGuideClose = document.getElementById('teacher-guide-close');
  if (teacherGuideClose && appContainer) {
    teacherGuideClose.addEventListener('click', () => {
      AudioSynth.playBeep(400, 0.05);
      appContainer.classList.add('sidebar-collapsed-right');
    });
  }

  // Initialize features
  initReflexGame();
  initAuditGame();
  initMatchGame();
  initCommitmentCert();
  initSlideTimers();
  initEvalChecklist();
  
  // Fullscreen button toggle
  const fullscreenBtn = document.getElementById('fullscreen-toggle');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      AudioSynth.playBeep(400, 0.05);
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          fullscreenBtn.innerText = '📺 THU NHỎ';
        }).catch(err => {
          console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen().then(() => {
          fullscreenBtn.innerText = '📺 TOÀN MÀN HÌNH';
        });
      }
    });
  }

  // Listen to fullscreenchange events (e.g. if user presses Esc to exit)
  document.addEventListener('fullscreenchange', () => {
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    if (fullscreenBtn) {
      if (document.fullscreenElement) {
        fullscreenBtn.innerText = '📺 THU NHỎ';
      } else {
        fullscreenBtn.innerText = '📺 TOÀN MÀN HÌNH';
      }
    }
  });

  // Music button toggle
  const musicBtn = document.getElementById('btn-music-toggle');
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      BackgroundMusic.init();
      const playing = BackgroundMusic.isPlaying;
      if (playing) {
        BackgroundMusic.stop();
        musicBtn.innerText = '🎵 BẬT NHẠC NỀN';
        AudioSynth.playBeep(400, 0.05);
      } else {
        BackgroundMusic.start();
        musicBtn.innerText = '⏸ TẮT NHẠC NỀN';
        AudioSynth.playBeep(600, 0.05);
      }
    });
  }
});

// --- SLIDE-LEVEL COUNTDOWN TIMERS ---
const slideTimersConfig = {
  19: { duration: 1200, label: "20M" }
};

const slideTimerStates = {};

function initSlideTimers() {
  Object.keys(slideTimersConfig).forEach(slideNum => {
    const num = parseInt(slideNum);
    const config = slideTimersConfig[num];
    const displayEl = document.getElementById(`slide-timer-${num}`);
    const startBtn = document.getElementById(`btn-timer-start-${num}`);
    
    if (!displayEl || !startBtn) return;
    
    let secondsRemaining = config.duration;
    let intervalId = null;
    let running = false;
    
    function formatTime(totalSecs) {
      const mins = Math.floor(totalSecs / 60);
      const secs = totalSecs % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateDisplay() {
      displayEl.innerText = formatTime(secondsRemaining);
    }
    
    function startTimer() {
      if (running) return;
      AudioSynth.playBeep(600, 0.05);
      running = true;
      startBtn.innerText = `⏸ TẠM DỪNG`;
      
      intervalId = setInterval(() => {
        if (secondsRemaining > 0) {
          secondsRemaining--;
          updateDisplay();
          if (secondsRemaining <= 10 && secondsRemaining > 0) {
            // Play ticking warning sound
            AudioSynth.playBeep(880, 0.03, 'sine');
          }
        } else {
          stopTimer();
          AudioSynth.playError();
          alert(`Hết giờ làm việc trên slide ${num}!`);
        }
      }, 1000);
    }
    
    function pauseTimer() {
      if (!running) return;
      clearInterval(intervalId);
      running = false;
      startBtn.innerText = `▶ KHỞI ĐỘNG ${config.label}`;
      AudioSynth.playBeep(500, 0.05);
    }
    
    function stopTimer() {
      clearInterval(intervalId);
      running = false;
      secondsRemaining = config.duration;
      updateDisplay();
      startBtn.innerText = `▶ KHỞI ĐỘNG ${config.label}`;
    }
    
    AppState.slideTimers[num] = {
      start: startTimer,
      pause: pauseTimer,
      stop: stopTimer,
      isRunning: () => running
    };
    
    startBtn.addEventListener('click', () => {
      if (running) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  });
  
  // Real-time system clock in clinical header
  setInterval(() => {
    const clock = document.getElementById('system-time');
    if (clock) {
      const d = new Date();
      clock.innerText = d.toTimeString().split(' ')[0];
    }
  }, 1000);
}

// ==========================================================================
// FEATURE 1: SLIDE 3-10 REFLEX GAME (30S COUNTDOWNS)
// ==========================================================================
function initReflexGame() {
  for (let slideNum = 3; slideNum <= 10; slideNum++) {
    const startBtn = document.getElementById(`btn-reflex-start-${slideNum}`);
    const revealBtn = document.getElementById(`btn-reflex-reveal-${slideNum}`);
    const timerDisplay = document.getElementById(`reflex-timer-${slideNum}`);
    const answerPanel = document.getElementById(`reflex-answer-${slideNum}`);
    
    if (!timerDisplay) continue;

    let secondsRemaining = 30;
    let intervalId = null;
    let running = false;

    function updateDisplay() {
      timerDisplay.innerText = `00:${secondsRemaining.toString().padStart(2, '0')}`;
    }

    function startTimer() {
      if (running) return;
      AudioSynth.playBeep(600, 0.05);
      running = true;
      if (startBtn) startBtn.innerText = `⏸ TẠM DỪNG`;
      
      intervalId = setInterval(() => {
        if (secondsRemaining > 0) {
          secondsRemaining--;
          updateDisplay();
          if (secondsRemaining <= 5 && secondsRemaining > 0) {
            // Play ticking warning sound
            AudioSynth.playBeep(880, 0.03, 'sine');
          }
        } else {
          stopTimer();
          AudioSynth.playError();
          // Auto-reveal answer
          if (answerPanel) {
            answerPanel.style.visibility = 'visible';
          }
        }
      }, 1000);
    }

    function pauseTimer() {
      if (!running) return;
      clearInterval(intervalId);
      running = false;
      if (startBtn) startBtn.innerText = `▶ BẮT ĐẦU 30S`;
      AudioSynth.playBeep(500, 0.05);
    }

    function stopTimer() {
      clearInterval(intervalId);
      running = false;
      secondsRemaining = 30;
      updateDisplay();
      if (startBtn) startBtn.innerText = `▶ BẮT ĐẦU 30S`;
    }

    function revealAnswer() {
      if (answerPanel) {
        if (answerPanel.style.visibility === 'visible') {
          answerPanel.style.visibility = 'hidden';
        } else {
          answerPanel.style.visibility = 'visible';
          AudioSynth.playSuccess();
        }
      }
    }

    // Register controller in AppState
    AppState.reflexTimers[slideNum] = {
      start: startTimer,
      pause: pauseTimer,
      stop: stopTimer,
      reveal: revealAnswer,
      isRunning: () => running
    };

    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (running) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    if (revealBtn) {
      revealBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        revealAnswer();
      });
    }
  }
}

// ==========================================================================
// FEATURE 2: SLIDE 8 & 9 MEDICAL AUDIT
// ==========================================================================
function initAuditGame() {
  const tabButtons = document.querySelectorAll('.audit-tab-btn');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const caseName = btn.getAttribute('data-case');
      switchAuditCase(caseName);
    });
  });

  document.querySelectorAll('.audit-hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
      if (spot.classList.contains('circled')) return;
      
      const caseName = AppState.activeAuditCase;
      const spotId = spot.getAttribute('id');
      const caseConfig = AppState.auditState[caseName];

      if (caseConfig.correctIds.includes(spotId)) {
        spot.classList.add('circled');
        caseConfig.found.add(spotId);
        AudioSynth.playBeep(659.25, 0.15, 'sine'); // E5 Tone
        
        // Update found count text
        updateAuditCounters(caseName);

        // Check if case completed
        if (caseConfig.found.size === caseConfig.total) {
          AudioSynth.playSuccess();
          updateTabStatus(caseName, "ĐÃ KIỂM ĐỊNH ✓");
        }
      } else {
        AudioSynth.playError();
      }
    });
  });
}

function switchAuditCase(caseName) {
  AudioSynth.playBeep(350, 0.05);
  AppState.activeAuditCase = caseName;

  // Active tab button
  document.querySelectorAll('.audit-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-case') === caseName) {
      btn.classList.add('active');
    }
  });

  // Show corresponding EMR letter sheet
  document.querySelectorAll('.audit-letter').forEach(sheet => {
    sheet.style.display = 'none';
  });
  const activeSheet = document.getElementById(`audit-sheet-${caseName}`);
  if (activeSheet) activeSheet.style.display = 'block';

  updateAuditCounters(caseName);
}

function updateAuditCounters(caseName) {
  const caseConfig = AppState.auditState[caseName];
  const countEl = document.getElementById(`audit-count-${caseName}`);
  if (countEl) {
    countEl.innerText = `${caseConfig.found.size}/${caseConfig.total}`;
  }
}

function updateTabStatus(caseName, statusText) {
  const btn = document.querySelector(`.audit-tab-btn[data-case="${caseName}"]`);
  if (btn) {
    const statusEl = btn.querySelector('.audit-tab-status');
    if (statusEl) {
      statusEl.innerText = statusText;
      statusEl.style.color = "var(--mint)";
    }
  }
}

// Function to force-reveal all answers in Slide 9
function revealAuditAnswers() {
  AudioSynth.playSuccess();
  
  // Loop through all cases and force mark all hotspots
  Object.keys(AppState.auditState).forEach(caseName => {
    const caseConfig = AppState.auditState[caseName];
    caseConfig.correctIds.forEach(id => {
      const spot = document.getElementById(id);
      if (spot) {
        spot.classList.add('circled');
        caseConfig.found.add(id);
      }
    });
    updateAuditCounters(caseName);
    updateTabStatus(caseName, "GIÁM ĐỊNH LÂM SÀNG ĐẠT");
  });
}
window.revealAuditAnswers = revealAuditAnswers;

// ==========================================================================
// FEATURE 3: SLIDE 15 INTERACTIVE CLINICAL MATCH GAME
// ==========================================================================
function initMatchGame() {
  let selectedLeft = null;

  const leftItems = document.querySelectorAll('#match-left-col .match-item');
  const rightItems = document.querySelectorAll('#match-right-col .match-item');

  leftItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.classList.contains('matched')) return;

      // Toggle selected state
      if (selectedLeft === item) {
        item.classList.remove('selected');
        selectedLeft = null;
        AudioSynth.playBeep(350, 0.05);
      } else {
        leftItems.forEach(l => l.classList.remove('selected'));
        item.classList.add('selected');
        selectedLeft = item;
        AudioSynth.playBeep(440, 0.08, 'triangle');
      }
    });
  });

  rightItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.classList.contains('matched')) return;

      if (!selectedLeft) {
        AudioSynth.playError();
        alert("Vui lòng chọn thói quen bên trái trước!");
        return;
      }

      const leftMatch = selectedLeft.getAttribute('data-match');
      const rightMatch = item.getAttribute('data-match');

      if (leftMatch === rightMatch) {
        // It's a match!
        AudioSynth.playSuccess();
        selectedLeft.classList.remove('selected');
        selectedLeft.classList.add('matched', `matched-${leftMatch}`);
        item.classList.add('matched', `matched-${rightMatch}`);
        selectedLeft = null;
        
        // Redraw SVG match lines
        drawMatchLines();

        // Check if all matched
        const totalMatched = document.querySelectorAll('.match-item.matched').length;
        if (totalMatched === 8) {
          setTimeout(() => {
            AudioSynth.playSuccess();
            triggerGraduationConfetti();
          }, 600);
        }
      } else {
        // Mis-match
        AudioSynth.playError();
        selectedLeft.classList.remove('selected');
        selectedLeft = null;
      }
    });
  });
}

// ==========================================================================
// FEATURE 4: SLIDE 23-25 CLINICAL JOURNAL ANSWER REVEALS
// ==========================================================================
function revealJournalAnswer(slideId) {
  const panel = document.getElementById(`journal-answer-${slideId}`);
  if (panel) {
    if (panel.style.display === 'none') {
      panel.style.display = 'block';
      AudioSynth.playSuccess();
    } else {
      panel.style.display = 'none';
    }
  }
}
window.revealJournalAnswer = revealJournalAnswer;

// ==========================================================================
// FEATURE 7: SLIDE 16 COMMITMENTS CERTIFICATE & STAMP
// ==========================================================================
function initCommitmentCert() {
  const nameInput = document.getElementById('student-signature');
  const recipientName = document.getElementById('cert-recipient-name');
  const certSig = document.getElementById('cert-signature-output');
  const stampBtn = document.getElementById('btn-stamp-cert');

  function updateStampButtonState() {
    if (stampBtn) {
      const hasName = nameInput && nameInput.value.trim().length > 0;
      const hasCommitment = AppState.checkedCommitments.size > 0;
      stampBtn.disabled = !(hasName && hasCommitment);
    }
  }

  if (nameInput && recipientName && certSig) {
    nameInput.addEventListener('input', () => {
      AppState.studentName = nameInput.value.toUpperCase();
      recipientName.innerText = AppState.studentName || "........................................";
      certSig.innerText = AppState.studentName || "....................";
      updateStampButtonState();
    });
  }

  // Only sync checkboxes on Slide 25 for commitment cert
  const commitBoxes = document.querySelectorAll('#slide-25 .commitment-checklist input[type="checkbox"]');
  const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
  commitBoxes.forEach((box, index) => {
    box.addEventListener('change', () => {
      if (box.checked) {
        AudioSynth.playBeep(notes[index] || 520, 0.1, 'sine');
        AppState.checkedCommitments.add(index);
      } else {
        AudioSynth.playBeep(350, 0.05);
        AppState.checkedCommitments.delete(index);
      }
      updateStampButtonState();
    });
  });

  if (stampBtn) {
    stampBtn.addEventListener('click', stampDoctorCommitment);
  }
}

function initEvalChecklist() {
  const evalCheckboxes = [
    document.getElementById('eval-crit-1'),
    document.getElementById('eval-crit-2'),
    document.getElementById('eval-crit-3')
  ];
  // Chime notes: A4 (440.00Hz), B4 (493.88Hz), C#5 (554.37Hz)
  const notes = [440.00, 493.88, 554.37];
  evalCheckboxes.forEach((box, index) => {
    if (box) {
      box.addEventListener('change', () => {
        if (box.checked) {
          AudioSynth.playBeep(notes[index], 0.15, 'triangle');
        } else {
          AudioSynth.playBeep(350, 0.05, 'sine');
        }
      });
    }
  });
}

function stampDoctorCommitment() {
  const nameInput = document.getElementById('student-signature');
  
  if (!AppState.studentName || AppState.studentName.trim() === '') {
    AudioSynth.playError();
    alert("Vui lòng nhập họ và tên bác sĩ để ký cam kết số!");
    if (nameInput) nameInput.focus();
    return;
  }

  if (AppState.checkedCommitments.size === 0) {
    AudioSynth.playError();
    alert("Vui lòng tích chọn cam kết ít nhất 1 hành động vệ sinh lâm sàng!");
    return;
  }

  if (AppState.isStamped) return;

  AppState.isStamped = true;
  
  // Apply visual stamp
  const stamp = document.getElementById('cert-stamp-seal');
  if (stamp) {
    stamp.style.opacity = '1';
    stamp.classList.add('stamped');
  }

  // Shake animation on the frame
  const frame = document.getElementById('cert-panel-card');
  if (frame) {
    frame.classList.add('shake-animation');
    setTimeout(() => { frame.classList.remove('shake-animation'); }, 400);
  }

  AudioSynth.playStamp();
  
  // Trigger graduation celebration confetti
  setTimeout(() => {
    AudioSynth.playSuccess();
    triggerGraduationConfetti();
  }, 400);
}
window.stampDoctorCommitment = stampDoctorCommitment;

// --- CONFETTI CANVAS PARTICLES SYSTEM ---
let confettiCanvas = null;
let confettiCtx = null;
let confettiParticles = [];
let confettiActive = false;

function resizeConfettiCanvas() {
  if (confettiCanvas) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
}

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * (confettiCanvas ? confettiCanvas.width : window.innerWidth);
    this.y = Math.random() * (confettiCanvas ? confettiCanvas.height : window.innerHeight) - (confettiCanvas ? confettiCanvas.height : window.innerHeight);
    this.r = Math.random() * 6 + 4;
    this.d = Math.random() * (confettiCanvas ? confettiCanvas.height : window.innerHeight);
    this.color = `hsl(${Math.random() * 360}, 90%, 65%)`;
    this.tilt = Math.random() * 10 - 5;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.02;
    this.tiltAngle = 0;
  }
  
  draw() {
    if (!confettiCtx) return;
    confettiCtx.beginPath();
    confettiCtx.lineWidth = this.r;
    confettiCtx.strokeStyle = this.color;
    confettiCtx.moveTo(this.x + this.tilt + this.r / 2, this.y);
    confettiCtx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 2);
    confettiCtx.stroke();
  }
  
  update() {
    this.tiltAngle += this.tiltAngleIncremental;
    this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
    this.x += Math.sin(this.tiltAngle);
    this.tilt = Math.sin(this.tiltAngle - this.r / 2) * 5;
    return this.y < (confettiCanvas ? confettiCanvas.height : window.innerHeight);
  }
}

function updateConfetti() {
  if (!confettiCtx || !confettiCanvas) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  if (confettiActive && confettiParticles.length < 180) {
    confettiParticles.push(new ConfettiParticle());
  }
  
  confettiParticles = confettiParticles.filter(p => {
    p.draw();
    return p.update();
  });
  
  if (confettiActive || confettiParticles.length > 0) {
    requestAnimationFrame(updateConfetti);
  }
}

function startConfetti() {
  if (!confettiCanvas) {
    confettiCanvas = document.getElementById('confetti-canvas');
  }
  if (!confettiCanvas) return;
  confettiCtx = confettiCanvas.getContext('2d');
  window.addEventListener('resize', resizeConfettiCanvas);
  resizeConfettiCanvas();
  
  confettiActive = true;
  updateConfetti();
  
  setTimeout(() => {
    confettiActive = false;
  }, 4000);
}

function triggerGraduationConfetti() {
  startConfetti();
}

window.triggerGraduationConfetti = triggerGraduationConfetti;
