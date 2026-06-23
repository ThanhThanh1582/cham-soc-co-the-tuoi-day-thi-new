/* ==========================================================================
   NOVA DERMATOLOGY HOSPITAL INTERACTIVE SYSTEM ENGINE (34 SLIDES - LIGHT MODE)
   ========================================================================== */

// --- STATE MANAGEMENT ---
let currentSlide = 1;
const totalSlides = 35;

const slideMetadata = {
  1: { badge: "PHẦN MỞ ĐẦU • SLIDE 1", title: "Vệ sinh cơ thể tuổi dậy thì" },
  2: { badge: "PHẦN MỞ ĐẦU • SLIDE 2", title: "Câu hỏi lớn của bài học" },
  3: { badge: "PHẦN MỞ ĐẦU • SLIDE 3", title: "Mục tiêu cần đạt" },
  4: { badge: "KHỞI ĐỘNG • SLIDE 4", title: "Khởi động" },
  5: { badge: "KHỞI ĐỘNG • SLIDE 5", title: "Chuẩn bị" },
  6: { badge: "KHỞI ĐỘNG • SLIDE 6", title: "Hướng dẫn" },
  7: { badge: "KHỞI ĐỘNG • SLIDE 7", title: "Tìm nguyên nhân gây ra các triệu chứng" },
  8: { badge: "KHỞI ĐỘNG • SLIDE 8", title: "Kết quả đối chiếu lâm sàng" },
  9: { badge: "KHỞI ĐỘNG • SLIDE 9", title: "Chúc mừng vượt qua vòng sơ tuyển" },
  10: { badge: "HOẠT ĐỘNG 1 • SLIDE 10", title: "Thử thách 2 (Intro)" },
  11: { badge: "HOẠT ĐỘNG 1 • SLIDE 11", title: "Tiếp nhận hồ sơ bệnh án mới" },
  12: { badge: "HOẠT ĐỘNG 1 • SLIDE 12", title: "Quy trình khám bệnh" },
  13: { badge: "HOẠT ĐỘNG 1 • SLIDE 13", title: "Thảo luận nhóm" },
  14: { badge: "HOẠT ĐỘNG 1 • SLIDE 14", title: "Chuẩn bị trình bày" },
  15: { badge: "HOẠT ĐỘNG 1 • SLIDE 15", title: "Đáp án hội chẩn" },
  16: { badge: "HOẠT ĐỘNG 1 • SLIDE 16", title: "Phê duyệt bệnh án" },
  17: { badge: "HOẠT ĐỘNG 2 • SLIDE 17", title: "Thử thách 3 (Intro)" },
  18: { badge: "HOẠT ĐỘNG 2 • SLIDE 18", title: "Thiết bị giải mã" },
  19: { badge: "HOẠT ĐỘNG 2 • SLIDE 19", title: "Luật chơi tìm chữ" },
  20: { badge: "HOẠT ĐỘNG 2 • SLIDE 20", title: "Giải mã từ khóa" },
  21: { badge: "HOẠT ĐỘNG 2 • SLIDE 21", title: "3 từ khoá đúng" },
  22: { badge: "HOẠT ĐỘNG 2 • SLIDE 22", title: "Giải thích cơ chế" },
  23: { badge: "HOẠT ĐỘNG 2 • SLIDE 23", title: "Chúc mừng" },
  24: { badge: "HOẠT ĐỘNG 3 • SLIDE 24", title: "Thực hành lâm sàng" },
  25: { badge: "HOẠT ĐỘNG 3 • SLIDE 25", title: "Chuẩn bị kê đơn" },
  26: { badge: "HOẠT ĐỘNG 3 • SLIDE 26", title: "Quy chế kê đơn" },
  27: { badge: "HOẠT ĐỘNG 3 • SLIDE 27", title: "Trình duyệt đơn thuốc" },
  28: { badge: "HOẠT ĐỘNG 3 • SLIDE 28", title: "Đáp án tắm rửa" },
  29: { badge: "HOẠT ĐỘNG 3 • SLIDE 29", title: "Quy trình làm sạch" },
  30: { badge: "HOẠT ĐỘNG 4 • SLIDE 30", title: "Nên làm gì để sạch sẽ" },
  31: { badge: "HOẠT ĐỘNG 4 • SLIDE 31", title: "Chuẩn bị T-Chart" },
  32: { badge: "HOẠT ĐỘNG 4 • SLIDE 32", title: "Quy chế thi" },
  33: { badge: "HOẠT ĐỘNG 4 • SLIDE 33", title: "Phân loại Nên/Không nên" },
  34: { badge: "HOẠT ĐỘNG 4 • SLIDE 34", title: "Nghi thức sắc phong" },
  35: { badge: "HOẠT ĐỘNG 4 • SLIDE 35", title: "Quy trình tắm đúng cách" }
};

// --- SLIDE CONTROLLER ---
function navigateToSlide(slideNum) {
  if (slideNum < 1 || slideNum > totalSlides) return;
  
  currentSlide = slideNum;
  
  // Update section visibility
  document.querySelectorAll('.slide').forEach(slide => {
    slide.classList.remove('active');
  });
  const activeSlide = document.getElementById(`slide-${slideNum}`);
  if (activeSlide) activeSlide.classList.add('active');
  
  // Update header text
  const meta = slideMetadata[slideNum];
  if (meta) {
    document.getElementById('slide-phase-badge').innerText = meta.badge;
    document.getElementById('slide-title-text').innerText = meta.title;
  }
  
  // Update counter
  document.getElementById('slide-counter-text').innerText = `${slideNum} / ${totalSlides}`;
  
  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (parseInt(item.getAttribute('data-slide')) === slideNum) {
      item.classList.add('active');
      // Scroll sidebar item into view smoothly
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Update header role badge based on thăng cấp progression
  const roleBadge = document.getElementById('header-role-badge');
  if (roleBadge) {
    if (slideNum >= 1 && slideNum <= 3) {
      roleBadge.innerText = "Bác sĩ Lâm sàng";
    } else if (slideNum >= 4 && slideNum <= 9) {
      roleBadge.innerText = "Bác sĩ Thực tập";
    } else if (slideNum >= 10 && slideNum <= 16) {
      roleBadge.innerText = "Bác sĩ Nội trú";
    } else if (slideNum >= 17 && slideNum <= 29) {
      roleBadge.innerText = "Bác sĩ chính";
    } else if (slideNum >= 30 && slideNum <= 35) {
      roleBadge.innerText = "Bác sĩ chuyên khoa";
    }
  }

  // Slide-specific initializations
  if (slideNum === 11) {
    resetShufflerState();
  } else if (slideNum === 20) {
    initHangmanGame();
  } else if (slideNum === 28) {
    initBathingGame();
  } else if (slideNum === 32) {
    initTChartGame();
  } else if (slideNum === 34) {
    setTimeout(triggerGraduationConfetti, 300);
  }

  // Prevent Vietnamese compound words wrapping
  preventCompoundWordWrapping();
}

window.navigateToSlide = navigateToSlide;

// --- SLIDE COUNTDOWN TIMERS ---
let slideTimers = {};

function startSlideTimer(slideNum, duration) {
  if (slideTimers[slideNum] && slideTimers[slideNum].interval) {
    clearInterval(slideTimers[slideNum].interval);
  }
  
  if (!slideTimers[slideNum]) {
    slideTimers[slideNum] = { timeLeft: duration };
  }
  
  const display = document.getElementById(`timer-display-${slideNum}`);
  
  slideTimers[slideNum].interval = setInterval(() => {
    slideTimers[slideNum].timeLeft--;
    
    let mins = Math.floor(slideTimers[slideNum].timeLeft / 60);
    let secs = slideTimers[slideNum].timeLeft % 60;
    if (display) {
      display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    if (slideTimers[slideNum].timeLeft <= 0) {
      clearInterval(slideTimers[slideNum].interval);
      slideTimers[slideNum] = null;
      triggerGraduationConfetti();
      alert(`⏱ Đã hết thời gian thảo luận của Slide ${slideNum}!`);
    }
  }, 1000);
}

function pauseSlideTimer(slideNum) {
  if (slideTimers[slideNum] && slideTimers[slideNum].interval) {
    clearInterval(slideTimers[slideNum].interval);
    slideTimers[slideNum].interval = null;
  }
}

function resetSlideTimer(slideNum, duration) {
  pauseSlideTimer(slideNum);
  slideTimers[slideNum] = { timeLeft: duration };
  const display = document.getElementById(`timer-display-${slideNum}`);
  let mins = Math.floor(duration / 60);
  let secs = duration % 60;
  if (display) {
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

window.startSlideTimer = startSlideTimer;
window.pauseSlideTimer = pauseSlideTimer;
window.resetSlideTimer = resetSlideTimer;


// --- INTERACTIVE SLIDE LOGICS ---

// Slide 7: Folder clicking
function toggleFolder(el) {
  el.classList.toggle('revealed');
}
window.toggleFolder = toggleFolder;

// Slide 10: Case Shuffler & Tabs Selector
const patientsDatabase = {
  minh: {
    name: "Hồ sơ bệnh nhân: Bạn Minh",
    symptoms: "Da mặt đổ nhiều dầu. Xuất hiện nhiều nốt mụn đỏ sưng tấy trên trán.",
    habits: "Thường xuyên dùng tay bẩn sờ lên mặt. Tự ý cạy, nặn mụn."
  },
  nhi: {
    name: "Hồ sơ bệnh nhân: Bạn Nhi",
    symptoms: "Vùng dưới cánh tay (nách) tiết nhiều mồ hôi và phát ra mùi chua nồng, khó chịu.",
    habits: "Đá bóng, vận động mạnh xong không tắm ngay. Chỉ lau qua người rồi ngồi quạt. Mặc nguyên quần áo đẫm mồ hôi đi ngủ hoặc mặc lại áo cũ ngày hôm trước."
  },
  an: {
    name: "Hồ sơ bệnh nhân: Bạn An",
    symptoms: "Hơi thở bị hôi, có mùi khó chịu dù vẫn đánh răng hàng ngày.",
    habits: "Hay ăn đồ ngọt vào buổi tối. Thường xuyên quên đánh răng hoặc đánh răng qua loa. Không có thói quen cạo lưỡi và không súc miệng sau khi ăn đồ ngọt."
  },
  linh: {
    name: "Hồ sơ bệnh nhân: Bạn Linh",
    symptoms: "Da vùng ngực và lưng đổ nhiều bã nhờn. Xuất hiện các ổ mụn bọc, mụn trứng cá sưng viêm diện rộng ở ngực và sau lưng.",
    habits: "Rửa mặt và tắm rửa qua loa bằng nước sạch, không dùng sữa tắm phù hợp. Tắm xong không lau khô người đã vội mặc quần áo. Lười thay đồ lót hằng ngày."
  },
  ninh: {
    name: "Hồ sơ bệnh nhân: Bạn Ninh",
    symptoms: "Da bàn chân bong tróc, ngứa ngáy. Lòng bàn chân và các kẽ ngón chân luôn ẩm ướt, bốc mùi hôi nặng khi cởi giày.",
    habits: "Đi một đôi tất liên tục nhiều ngày không thay. Giày bị ẩm ướt do dính mưa hoặc mồ hôi nhưng vẫn tiếp tục xỏ chân vào đi. Khi tắm chỉ xả nước qua loa, không kỳ cọ vùng chân."
  }
};

let shufflerInterval = null;

function resetShufflerState() {
  document.querySelectorAll('.shuffle-card').forEach(card => {
    card.className = 'shuffle-card';
  });
  document.getElementById('shuffler-placeholder').classList.remove('hidden');
  document.getElementById('shuffler-patient-detail').classList.add('hidden');
  const btn = document.getElementById('start-shuffle-btn');
  if (btn) btn.disabled = false;
}

function selectHospitalPatient(id) {
  if (shufflerInterval) return; // Prevent clicking while shuffling
  
  // Highlight card
  document.querySelectorAll('.shuffle-card').forEach(card => {
    card.classList.remove('selected-card');
  });
  const targetCard = document.getElementById(`sh-card-${id}`);
  if (targetCard) targetCard.classList.add('selected-card');
  
  // Load data
  const data = patientsDatabase[id];
  if (data) {
    document.getElementById('shuffler-placeholder').classList.add('hidden');
    document.getElementById('shuffler-patient-detail').classList.remove('hidden');
    document.getElementById('detail-patient-name').innerText = data.name;
    document.getElementById('detail-patient-symptoms').innerHTML = `🔴 <strong>Triệu chứng lâm sàng:</strong> ${data.symptoms}`;
    document.getElementById('detail-patient-habits').innerHTML = `⚠️ <strong>Thói quen sinh hoạt chưa đúng:</strong> ${data.habits}`;
  }
}
window.selectHospitalPatient = selectHospitalPatient;

function startCaseShuffler() {
  if (shufflerInterval) return;
  
  resetShufflerState();
  const keys = Object.keys(patientsDatabase);
  const btn = document.getElementById('start-shuffle-btn');
  if (btn) btn.disabled = true;
  
  let counter = 0;
  shufflerInterval = setInterval(() => {
    // Add visual shuffle class to cards
    document.querySelectorAll('.shuffle-card').forEach(card => {
      card.classList.remove('selected-card');
      card.classList.add('active-shuffle');
    });
    
    counter++;
    if (counter > 12) {
      clearInterval(shufflerInterval);
      shufflerInterval = null;
      
      document.querySelectorAll('.shuffle-card').forEach(card => {
        card.classList.remove('active-shuffle');
      });
      
      // Select random patient
      const randomIndex = Math.floor(Math.random() * keys.length);
      const chosenId = keys[randomIndex];
      selectHospitalPatient(chosenId);
      
      // Enable shuffler button back
      if (btn) btn.disabled = false;
      
      triggerGraduationConfetti();
    }
  }, 150);
}
window.startCaseShuffler = startCaseShuffler;


// Slide 14: Secret Box reveal
function toggleSecretBox(el) {
  if (!el.classList.contains('revealed')) {
    el.classList.add('revealed');
    document.getElementById('slide-14-secret-text').innerHTML = "💥 DO HOÓC-MÔN TUỔI DẬY THÌ KÍCH THÍCH!";
    triggerGraduationConfetti();
  } else {
    el.classList.remove('revealed');
    document.getElementById('slide-14-secret-text').innerHTML = "🔒 CLICK ĐỂ GIẢI MÃ THỦ PHẠM GIẤU MẶT";
  }
}
window.toggleSecretBox = toggleSecretBox;

// Slide 15: Approved Stamp
function applyApprovedStamp() {
  const stamp = document.getElementById('approved-stamp-el');
  if (stamp) {
    stamp.classList.add('stamped');
    
    // Shake animation on the frame
    const frame = document.getElementById('slide-15-frame');
    if (frame) {
      frame.classList.add('shake-animation');
      setTimeout(() => { frame.classList.remove('shake-animation'); }, 400);
    }
    
    triggerGraduationConfetti();
  }
}
window.applyApprovedStamp = applyApprovedStamp;


// Slide 19: Hangman Word Guessing Game
const hangmanWords = [
  { word: "HORMONE", clue: "Chất hóa học nội tiết sinh ra mạnh mẽ ở tuổi dậy thì là gì? (7 ký tự)" },
  { word: "TUYEN MO HOI", clue: "Cơ quan tiết chất lỏng dính, béo dưới cánh tay là gì? (11 ký tự)" },
  { word: "VI KHUAN PHAT TRIEN", clue: "Sinh vật siêu nhỏ ăn chất tiết mồ hôi và sinh mùi hôi là gì? (18 ký tự)" }
];
let currentHangmanIdx = 0;
let hangmanHearts = 6;
let hangmanGuessed = new Set();

function initHangmanGame() {
  hangmanGuessed.clear();
  hangmanHearts = 6;
  updateHangmanUI();
}

function updateHangmanUI() {
  const current = hangmanWords[currentHangmanIdx];
  if (!current) return;
  
  // Update header round text
  document.getElementById('hangman-round-text').innerText = `Từ khóa ${currentHangmanIdx + 1} / 3`;
  
  // Render Clue
  document.getElementById('hangman-clue-text').innerText = current.clue;
  
  // Render Hearts
  const heartContainer = document.getElementById('hangman-heart-container');
  heartContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('span');
    heart.innerText = i < hangmanHearts ? '❤️' : '🖤';
    heartContainer.appendChild(heart);
  }
  
  // Render Blanks
  const blanksContainer = document.getElementById('hangman-blanks-container');
  blanksContainer.innerHTML = '';
  for (let char of current.word) {
    const blank = document.createElement('div');
    if (char === ' ') {
      blank.className = 'blank-letter blank-space';
      blank.innerHTML = '&nbsp;';
    } else {
      blank.className = 'blank-letter';
      if (hangmanGuessed.has(char)) {
        blank.innerText = char;
      } else {
        blank.innerText = '_';
      }
    }
    blanksContainer.appendChild(blank);
  }
  
  // Render Keyboard
  const keyboardContainer = document.getElementById('hangman-keyboard-container');
  keyboardContainer.innerHTML = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'key-btn';
    btn.innerText = letter;
    
    // Check if letter was already guessed
    if (hangmanGuessed.has(letter)) {
      btn.disabled = true;
      if (current.word.includes(letter)) {
        btn.classList.add('correct');
      } else {
        btn.classList.add('incorrect');
      }
    }
    
    btn.onclick = () => guessHangmanLetter(letter);
    keyboardContainer.appendChild(btn);
  });
}

function guessHangmanLetter(letter) {
  if (hangmanHearts <= 0) return;
  if (hangmanGuessed.has(letter)) return;
  
  const current = hangmanWords[currentHangmanIdx];
  hangmanGuessed.add(letter);
  
  if (current.word.includes(letter)) {
    // Check win condition
    const isWon = current.word.replace(/\s/g, '').split('').every(char => hangmanGuessed.has(char));
    if (isWon) {
      triggerGraduationConfetti();
      setTimeout(() => {
        currentHangmanIdx++;
        if (currentHangmanIdx < hangmanWords.length) {
          initHangmanGame();
        } else {
          // Finished all words
          triggerGraduationConfetti();
          navigateToSlide(20);
        }
      }, 1500);
    }
  } else {
    hangmanHearts--;
    const blanksContainer = document.getElementById('hangman-blanks-container');
    if (blanksContainer) {
      blanksContainer.classList.add('shake-animation');
      setTimeout(() => { blanksContainer.classList.remove('shake-animation'); }, 400);
    }
    
    if (hangmanHearts <= 0) {
      // Game Over
      alert('Bác sĩ ơi! Số mạng đã hết. Hãy thử lại từ đầu ca bệnh này nhé.');
      currentHangmanIdx = 0;
      initHangmanGame();
    }
  }
  updateHangmanUI();
}

function skipHangmanWord() {
  currentHangmanIdx = (currentHangmanIdx + 1) % hangmanWords.length;
  initHangmanGame();
}
window.skipHangmanWord = skipHangmanWord;


// Slide 20: Keyword card toggle
function toggleKeywordCard(el) {
  el.classList.toggle('revealed');
}
window.toggleKeywordCard = toggleKeywordCard;


// Slide 27: Bathing steps sorting game (8 Steps!)
const bathingStepsDatabase = [
  { id: 'b1', label: 'Nước ấm', icon: '🌡️', desc: 'Kiểm tra nước đủ ấm bằng tay' },
  { id: 'b2', label: 'Dội nước', icon: '🚿', desc: 'Dội nước ướt toàn thân' },
  { id: 'b3', label: 'Lấy xà phòng', icon: '🧼', desc: 'Lấy xà phòng' },
  { id: 'b4', label: 'Xoa xà phòng', icon: '🧴', desc: 'Xoa xà phòng khắp cơ thể' },
  { id: 'b5', label: 'Làm sạch nếp gấp', icon: '🧽', desc: 'Làm sạch các phần có nếp gấp' },
  { id: 'b6', label: 'Vệ sinh vùng kín', icon: '🩹', desc: 'Làm sạch vùng kín' },
  { id: 'b7', label: 'Tắm tráng', icon: '🌊', desc: 'Tắm tráng' },
  { id: 'b8', label: 'Lau khô người', icon: '🧦', desc: 'Lau khô người, lau khô bàn chân để tránh trơn trượt' }
];

let bathingArranged = [null, null, null, null, null, null, null, null];
let selectedBathingCardId = null;

function initBathingGame() {
  bathingArranged = [null, null, null, null, null, null, null, null];
  selectedBathingCardId = null;
  document.getElementById('bathing-feedback').innerText = '';
  
  // Reset slots visual
  for (let i = 1; i <= 8; i++) {
    const slot = document.getElementById(`bathing-slot-${i}`);
    if (slot) slot.className = 'bathing-slot';
    const holder = document.getElementById(`slot-holder-${i}`);
    if (holder) holder.innerText = 'Trống';
  }
  
  renderBathingBank();
}

function renderBathingBank() {
  const bank = document.getElementById('bathing-bank-row');
  if (!bank) return;
  bank.innerHTML = '';
  
  // Show steps that are NOT arranged
  const arrangedIds = bathingArranged.filter(id => id !== null);
  const remainingSteps = bathingStepsDatabase.filter(step => !arrangedIds.includes(step.id));
  
  // Sort randomly for first time
  if (remainingSteps.length === 8) {
    remainingSteps.sort(() => Math.random() - 0.5);
  }
  
  remainingSteps.forEach(step => {
    const card = document.createElement('div');
    card.className = `bathing-card ${selectedBathingCardId === step.id ? 'selected-item' : ''}`;
    card.style.width = '120px';
    card.style.height = '110px';
    card.innerHTML = `
      <div style="font-size: 16pt;">${step.icon}</div>
      <strong style="margin-top: 3px; font-size: 9pt; line-height: 1.2;">${step.label}</strong>
    `;
    card.onclick = () => selectBathingBankCard(step.id);
    bank.appendChild(card);
  });
}

function selectBathingBankCard(cardId) {
  selectedBathingCardId = cardId;
  renderBathingBank();
}

function handleBathingSlotClick(slotNum) {
  const idx = slotNum - 1;
  const existingCardId = bathingArranged[idx];
  
  if (selectedBathingCardId) {
    // If slot has a card, return existing card to bank first
    if (existingCardId) {
      bathingArranged[idx] = null;
    }
    
    // Place selected card
    bathingArranged[idx] = selectedBathingCardId;
    selectedBathingCardId = null;
  } else {
    // If no card selected, remove card from slot back to bank
    if (existingCardId) {
      bathingArranged[idx] = null;
    }
  }
  
  // Update slot UI
  const holder = document.getElementById(`slot-holder-${slotNum}`);
  const slotEl = document.getElementById(`bathing-slot-${slotNum}`);
  const placedId = bathingArranged[idx];
  
  if (placedId) {
    const step = bathingStepsDatabase.find(s => s.id === placedId);
    holder.innerHTML = `
      <div style="font-size: 18pt;">${step.icon}</div>
      <strong style="font-size: 9pt; line-height: 1.2; display: block; margin-top: 2px;">${step.label}</strong>
    `;
    slotEl.classList.add('occupied');
  } else {
    holder.innerText = 'Trống';
    slotEl.classList.remove('occupied');
  }
  
  // Clear any validation colors on click
  slotEl.classList.remove('correct-slot', 'incorrect-slot');
  document.getElementById('bathing-feedback').innerText = '';
  
  renderBathingBank();
}
window.handleBathingSlotClick = handleBathingSlotClick;

function checkBathingSteps() {
  const isAllFilled = bathingArranged.every(id => id !== null);
  if (!isAllFilled) {
    document.getElementById('bathing-feedback').innerText = '⚠️ Bác sĩ vui lòng sắp xếp đầy đủ cả 8 bước tắm!';
    document.getElementById('bathing-feedback').style.color = '#B45309';
    return;
  }
  
  let correctCount = 0;
  for (let i = 0; i < 8; i++) {
    const placedId = bathingArranged[i];
    const slotEl = document.getElementById(`bathing-slot-${i + 1}`);
    const expectedId = `b${i + 1}`;
    
    if (placedId === expectedId) {
      correctCount++;
      slotEl.className = 'bathing-slot occupied correct-slot';
    } else {
      slotEl.className = 'bathing-slot occupied incorrect-slot';
    }
  }
  
  const feedback = document.getElementById('bathing-feedback');
  if (correctCount === 8) {
    feedback.innerText = '🎉 Tuyệt vời! Phác đồ tắm chuẩn y khoa chính xác 100%!';
    feedback.style.color = '#10B981';
    triggerGraduationConfetti();
  } else {
    feedback.innerText = `❌ Quy trình chưa đúng: Có ${8 - correctCount} bước bị sai thứ tự. Mời bác sĩ điều chỉnh lại.`;
    feedback.style.color = '#EF4444';
    
    // Shake slots row
    const row = document.getElementById('bathing-slots-row');
    if (row) {
      row.classList.add('shake-animation');
      setTimeout(() => { row.classList.remove('shake-animation'); }, 400);
    }
  }
}
window.checkBathingSteps = checkBathingSteps;

function resetBathingGame() {
  initBathingGame();
}
window.resetBathingGame = resetBathingGame;


// Slide 32: T-Chart Classification Game (Old Slide 33 is now Slide 32)
const tchartDatabase = [
  { id: 't1', label: 'Vệ sinh kỹ vùng mụn/vi khuẩn', column: 'should' },
  { id: 't2', label: 'Dùng sữa tắm pH 5.5 dịu nhẹ', column: 'should' },
  { id: 't3', label: 'Dùng lăn khử mùi sau khi lau khô', column: 'should' },
  { id: 't4', label: 'Thay tất và đồ lót hằng ngày', column: 'should' },
  { id: 't5', label: 'Dùng tay bẩn cạy mụn, sờ mặt', column: 'shouldnot' },
  { id: 't6', label: 'Xả nước qua loa không vệ sinh nếp gấp', column: 'shouldnot' },
  { id: 't7', label: 'Xịt lăn khử mùi đè lên mồ hôi', column: 'shouldnot' },
  { id: 't8', label: 'Mặc lại tất và đồ lót cũ ẩm ướt', column: 'shouldnot' }
];

let tchartArranged = {
  should: [], // Array of card ids
  shouldnot: [] // Array of card ids
};
let selectedTChartCardId = null;

function initTChartGame() {
  tchartArranged = { should: [], shouldnot: [] };
  selectedTChartCardId = null;
  document.getElementById('tchart-feedback').innerText = '';
  
  // Clear lists
  document.getElementById('tchart-list-should').innerHTML = '';
  document.getElementById('tchart-list-shouldnot').innerHTML = '';
  
  // Reset column borders
  document.getElementById('tchart-col-should').style.borderColor = 'rgba(16, 185, 129, 0.3)';
  document.getElementById('tchart-col-shouldnot').style.borderColor = 'rgba(244, 63, 94, 0.3)';
  
  renderTChartBank();
}

function renderTChartBank() {
  const bank = document.getElementById('tchart-bank-row');
  if (!bank) return;
  bank.innerHTML = '';
  
  const placedIds = [...tchartArranged.should, ...tchartArranged.shouldnot];
  const remaining = tchartDatabase.filter(card => !placedIds.includes(card.id));
  
  if (remaining.length === 8) {
    remaining.sort(() => Math.random() - 0.5);
  }
  
  if (remaining.length === 0) {
    bank.innerHTML = '<span style="color: #94A3B8; font-style: italic;">Đã phân loại hết tất cả các thẻ! Nhấp vào nút kiểm tra bên dưới.</span>';
    return;
  }
  
  remaining.forEach(item => {
    const card = document.createElement('div');
    card.className = `tchart-card ${selectedTChartCardId === item.id ? 'selected-item' : ''}`;
    card.innerText = item.label;
    card.onclick = (e) => {
      e.stopPropagation();
      selectedTChartCardId = item.id;
      renderTChartBank();
    };
    bank.appendChild(card);
  });
}

function handleTChartColumnClick(columnType) {
  if (!selectedTChartCardId) return;
  
  // Add to column list
  tchartArranged[columnType].push(selectedTChartCardId);
  selectedTChartCardId = null;
  
  renderTChartPlacedItems();
  renderTChartBank();
  document.getElementById('tchart-feedback').innerText = '';
}
window.handleTChartColumnClick = handleTChartColumnClick;

function renderTChartPlacedItems() {
  const renderCol = (type, listId) => {
    const container = document.getElementById(listId);
    if (!container) return;
    container.innerHTML = '';
    
    tchartArranged[type].forEach(cardId => {
      const item = tchartDatabase.find(c => c.id === cardId);
      const cardEl = document.createElement('div');
      cardEl.className = 'tchart-card';
      cardEl.style.width = '100%';
      cardEl.style.marginBottom = '8px';
      cardEl.style.fontSize = '12pt';
      cardEl.style.display = 'flex';
      cardEl.style.justifyContent = 'space-between';
      cardEl.style.alignItems = 'center';
      
      const symbol = type === 'should' ? '✅' : '❌';
      cardEl.innerHTML = `<span>${symbol} ${item.label}</span> <span style="font-size: 10pt; color: #EF4444; cursor: pointer;">Item ↩ gỡ</span>`;
      
      cardEl.onclick = (e) => {
        e.stopPropagation();
        // Remove from list
        tchartArranged[type] = tchartArranged[type].filter(id => id !== cardId);
        renderTChartPlacedItems();
        renderTChartBank();
        document.getElementById('tchart-feedback').innerText = '';
      };
      container.appendChild(cardEl);
    });
  };
  
  renderCol('should', 'tchart-list-should');
  renderCol('shouldnot', 'tchart-list-shouldnot');
}

function checkTChartClassification() {
  const totalPlaced = tchartArranged.should.length + tchartArranged.shouldnot.length;
  if (totalPlaced < 8) {
    document.getElementById('tchart-feedback').innerText = '⚠️ Bác sĩ vui lòng phân loại đầy đủ tất cả 8 thẻ thói quen!';
    document.getElementById('tchart-feedback').style.color = '#B45309';
    return;
  }
  
  let errors = 0;
  tchartArranged.should.forEach(cardId => {
    const item = tchartDatabase.find(c => c.id === cardId);
    if (item.column !== 'should') errors++;
  });
  tchartArranged.shouldnot.forEach(cardId => {
    const item = tchartDatabase.find(c => c.id === cardId);
    if (item.column !== 'shouldnot') errors++;
  });
  
  const feedback = document.getElementById('tchart-feedback');
  if (errors === 0) {
    feedback.innerText = '🎉 Hoàn hảo! Bản đồ thói quen đã chính xác tuyệt đối!';
    feedback.style.color = '#10B981';
    
    document.getElementById('tchart-col-should').style.borderColor = '#10B981';
    document.getElementById('tchart-col-shouldnot').style.borderColor = '#10B981';
    
    triggerGraduationConfetti();
  } else {
    feedback.innerText = `❌ Còn ${errors} thói quen chưa được đặt đúng cột. Hãy kiểm tra và điều chỉnh lại.`;
    feedback.style.color = '#EF4444';
    
    document.getElementById('tchart-col-should').style.borderColor = '#EF4444';
    document.getElementById('tchart-col-shouldnot').style.borderColor = '#EF4444';
    
    const container = document.querySelector('.t-chart-container');
    if (container) {
      container.classList.add('shake-animation');
      setTimeout(() => { container.classList.remove('shake-animation'); }, 400);
    }
  }
}
window.checkTChartClassification = checkTChartClassification;

function resetTChartGame() {
  initTChartGame();
}
window.resetTChartGame = resetTChartGame;


// Slide 33: Certified Stamp Animation
function applyCertifiedStamp() {
  const stamp = document.getElementById('certified-stamp-el');
  if (stamp) {
    stamp.classList.add('stamped');
    
    // Shake frame
    const frame = document.getElementById('slide-33-frame');
    if (frame) {
      frame.classList.add('shake-animation');
      setTimeout(() => { frame.classList.remove('shake-animation'); }, 400);
    }
    
    triggerGraduationConfetti();
  }
}
window.applyCertifiedStamp = applyCertifiedStamp;


// --- CONFETTI CANVAS PARTICLES SYSTEM ---
let confettiCanvas = document.getElementById('confetti-canvas');
let confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiActive = false;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.r = Math.random() * 6 + 4;
    this.d = Math.random() * confettiCanvas.height;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.tilt = Math.random() * 10 - 5;
    this.tiltAngleChan = Math.random() * 0.05 + 0.01;
    this.tiltAngle = 0;
  }
  draw() {
    confettiCtx.beginPath();
    confettiCtx.lineWidth = this.r;
    confettiCtx.strokeStyle = this.color;
    confettiCtx.moveTo(this.x + this.tilt + this.r / 2, this.y);
    confettiCtx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 2);
    confettiCtx.stroke();
  }
}

function updateConfetti() {
  if (!confettiActive && confettiParticles.length === 0) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  if (confettiActive && confettiParticles.length < 150) {
    confettiParticles.push(new ConfettiParticle());
  }
  
  for (let i = 0; i < confettiParticles.length; i++) {
    let p = confettiParticles[i];
    p.tiltAngle += p.tiltAngleChan;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;
    
    if (p.y > confettiCanvas.height) {
      if (confettiActive) {
        confettiParticles[i] = new ConfettiParticle();
      } else {
        confettiParticles.splice(i, 1);
        i--;
      }
    } else {
      p.draw();
    }
  }
  requestAnimationFrame(updateConfetti);
}

function startConfetti() {
  confettiActive = true;
  updateConfetti();
  setTimeout(() => { confettiActive = false; }, 4000);
}

function triggerGraduationConfetti() {
  startConfetti();
}
window.triggerGraduationConfetti = triggerGraduationConfetti;

// --- INITIALIZATION & EVENTS ---
document.addEventListener('DOMContentLoaded', () => {
  // Fullscreen toggle
  const fullscreenBtn = document.getElementById('fullscreen-toggle');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
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

  document.addEventListener('fullscreenchange', () => {
    if (fullscreenBtn) {
      if (document.fullscreenElement) {
        fullscreenBtn.innerText = '📺 THU NHỎ';
      } else {
        fullscreenBtn.innerText = '📺 TOÀN MÀN HÌNH';
      }
    }
  });

  // Arrow buttons
  document.getElementById('prev-slide-btn').addEventListener('click', () => {
    navigateToSlide(currentSlide - 1);
  });
  document.getElementById('next-slide-btn').addEventListener('click', () => {
    navigateToSlide(currentSlide + 1);
  });

  // Key navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      navigateToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      navigateToSlide(currentSlide - 1);
    }
  });

  // Sidebar toggle
  document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.querySelector('.app-container').classList.toggle('sidebar-collapsed');
  });

  // Sidebar nav items clicking
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      let slideNum = parseInt(item.getAttribute('data-slide'));
      navigateToSlide(slideNum);
    });
  });

  // Initialize first slide
  navigateToSlide(1);

  // Initial wrapping prevention
  preventCompoundWordWrapping();
});

// --- PREVENT VIETNAMESE COMPOUND WORDS WRAPPING ---
function preventCompoundWordWrapping() {
  const compoundWords = [
    "Bác sĩ chuyên khoa", "bác sĩ chuyên khoa", "BÁC SĨ CHUYÊN KHOA",
    "Bác sĩ Lâm sàng", "Bác sĩ lâm sàng", "bác sĩ lâm sàng", "BÁC SĨ LÂM SÀNG",
    "Bác sĩ Thực tập", "Bác sĩ thực tập", "bác sĩ thực tập", "BÁC SĨ THỰC TẬP",
    "Bác sĩ Nội trú", "Bác sĩ nội trú", "bác sĩ nội trú", "BÁC SĨ NỘI TRÚ",
    "Bác sĩ chính", "bác sĩ chính", "BÁC SĨ CHÍNH",
    "Bác sĩ", "bác sĩ", "BÁC SĨ",
    "Thực tập", "thực tập", "THỰC TẬP",
    "Nội trú", "nội trú", "NỘI TRÚ",
    "Chuyên khoa", "chuyên khoa", "CHUYÊN KHOA",
    "dậy thì", "Dậy thì", "DẬY THÌ",
    "mồ hôi", "Mồ hôi", "MỒ HÔI",
    "vi khuẩn", "Vi khuẩn", "VI KHUẨN",
    "nếp gấp", "Nếp gấp", "NẾP GẤP",
    "vùng kín", "Vùng kín", "VÙNG KÍN",
    "tắm rửa", "Tắm rửa", "TẮM RỬA",
    "đơn thuốc", "Đơn thuốc", "ĐƠN THUỐC",
    "phác đồ", "Phác đồ", "PHÁC ĐỒ",
    "hơi thở", "Hơi thở", "HƠI THỞ",
    "hôi miệng", "Hôi miệng", "HÔI MIỆNG",
    "sưng tấy", "Sưng tấy", "SƯNG TẤY",
    "bệnh nhân", "Bệnh nhân", "BỆNH NHÂN",
    "bệnh án", "Bệnh án", "BỆNH ÁN",
    "kíp trực", "Kíp trực", "KÍP TRỰC",
    "hội chẩn", "Hội chẩn", "HỘI CHẨN",
    "da liễu", "Da liễu", "DA LIỄU",
    "chất béo", "Chất béo", "CHẤT BÉO",
    "tuyến mồ hôi", "Tuyến mồ hôi", "TUYẾN MỒ HÔI",
    "da mặt", "Da mặt", "DA MẶT",
    "bã nhờn", "Bã nhờn", "BÃ NHỜN",
    "chẩn đoán", "Chẩn đoán", "CHẨN ĐOÁN",
    "triệu chứng", "Triệu chứng", "TRIỆU CHỨNG",
    "sinh hoạt", "Sinh hoạt", "SINH HOẠT",
    "thói quen", "Thói quen", "THÓI QUEN",
    "bất thường", "Bất thường", "BẤT THƯỜNG",
    "trung học", "Trung học", "TRUNG HỌC",
    "học sinh", "Học sinh", "HỌC SINH",
    "giáo viên", "Giáo viên", "GIÁO VIÊN",
    "hoạt động", "Hoạt động", "HOẠT ĐỘNG",
    "cơ thể", "Cơ thể", "CƠ THỂ",
    "làm sạch", "Làm sạch", "LÀM SẠCH",
    "tắm tráng", "Tắm tráng", "TẮM TRÁNG",
    "lau khô", "Lau khô", "LAU KHÔ",
    "bàn chân", "Bàn chân", "BÀN CHÂN",
    "trơn trượt", "Trơn trượt", "TRƠN TRƯỢT",
    "đồ lót", "Đồ lót", "ĐỒ LÓT",
    "tất chân", "Tất chân", "TẤT CHÂN",
    "khử mùi", "Khử mùi", "KHỬ MÙI",
    "sữa tắm", "Sữa tắm", "SỮA TẮM",
    "xà phòng", "Xà phòng", "XÀ PHÒNG"
  ];

  // Sort by length descending
  compoundWords.sort((a, b) => b.length - a.length);

  const regexes = compoundWords.map(word => ({
    raw: word,
    regex: new RegExp(word.replace(/ /g, '[ \\t\\r\\n]+'), 'g'),
    replacement: word.replace(/ /g, '\u00A0')
  }));

  function walk(node) {
    if (node.nodeType === 3) { // Text node
      let text = node.nodeValue;
      let changed = false;
      for (const { regex, replacement } of regexes) {
        if (regex.test(text)) {
          text = text.replace(regex, replacement);
          changed = true;
        }
      }
      if (changed) {
        node.nodeValue = text;
      }
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      for (let child of node.childNodes) {
        walk(child);
      }
    }
  }

  walk(document.body);
}
