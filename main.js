// 默认目标时间（仅首次进入/无本地记录时使用）
const DEFAULT_TARGET_LOCAL = "2026-03-20T00:00";
const STORAGE_KEY = "sakuraCountdownTarget";

const translations = {
  zh: {
    tag: "下一次樱花 | 倒计时",
    title: "樱花盛放倒计时",
    subtitle: "和喜欢的人一起，静静等一场花开。",
    targetLabel: "目标日期：",
    messageBefore:
      '距离下一次樱花盛放，还有 <span class="highlight">一点点时间</span>。把想说的话，慢慢整理好吧。',
    messageAfter:
      '樱花已经 <span class="highlight">如期盛放</span>。去见想见的人吧。',
    footerMade: "为 Sakura Countdown 制作",
    unitDays: "天",
    unitHours: "小时",
    unitMinutes: "分钟",
    unitSeconds: "秒",
    inputLabel: "自定义目标时间（本地时间）：",
    inputButton: "开始倒计时",
    inputHelper:
      "选择你期待的那一天和时间，倒计时会自动更新并保存在本地浏览器中。",
    inputErrorInvalid: "请输入一个有效的日期时间。",
    inputErrorPast: "目标时间必须晚于当前时间。",
  },
  ja: {
    tag: "次の桜 | カウントダウン",
    title: "桜が咲くまで",
    subtitle: "大切な人と、静かに花の季節を待ちましょう。",
    targetLabel: "目標日：",
    messageBefore:
      '次の桜が満開になるまで、<span class="highlight">もう少し</span>。伝えたい言葉を、ゆっくり整えましょう。',
    messageAfter:
      "桜はもう <span class=\"highlight\">約束どおり</span> 咲きました。会いたい人に会いに行きましょう。",
    footerMade: "Sakura Countdown のために",
    unitDays: "日",
    unitHours: "時間",
    unitMinutes: "分",
    unitSeconds: "秒",
    inputLabel: "カスタム目標時刻（ローカル時間）：",
    inputButton: "設定する",
    inputHelper:
      "楽しみにしている日と時間を選んでください。カウントダウンは自動的に更新され、ブラウザに保存されます。",
    inputErrorInvalid: "有効な日時を入力してください。",
    inputErrorPast: "目標時刻は現在より後である必要があります。",
  },
  en: {
    tag: "Next Sakura | Countdown",
    title: "Sakura Bloom Countdown",
    subtitle: "Waiting quietly for blossoms with someone you care about.",
    targetLabel: "Target date:",
    messageBefore:
      "Until the next sakura bloom, there is still <span class=\"highlight\">a little time</span>. Take it slow and gather the words you want to say.",
    messageAfter:
      "The sakura has <span class=\"highlight\">finally bloomed</span>. Go and meet the one you miss.",
    footerMade: "Made for Sakura Countdown",
    unitDays: "DAYS",
    unitHours: "HOURS",
    unitMinutes: "MINUTES",
    unitSeconds: "SECONDS",
    inputLabel: "Custom target (local time):",
    inputButton: "Start",
    inputHelper:
      "Pick the day and time you look forward to. The countdown will update automatically and be saved in your browser.",
    inputErrorInvalid: "Please enter a valid date and time.",
    inputErrorPast: "Target time must be in the future.",
  },
};

function detectInitialLang() {
  const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("ja")) return "ja";
  return "en";
}

let currentLang = detectInitialLang();
let targetDate;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const messageEl = document.getElementById("message");
const targetTextEl = document.getElementById("targetText");
const yearTextEl = document.getElementById("yearText");
const tagTextEl = document.getElementById("tagText");
const titleTextEl = document.getElementById("titleText");
const subtitleTextEl = document.getElementById("subtitleText");
const footerMadeEl = document.getElementById("footerMade");
const langSelectEl = document.getElementById("langSelect");

const daysLabelEl = document.getElementById("daysLabel");
const hoursLabelEl = document.getElementById("hoursLabel");
const minutesLabelEl = document.getElementById("minutesLabel");
const secondsLabelEl = document.getElementById("secondsLabel");

const inputLabelEl = document.getElementById("inputLabel");
const inputHelperEl = document.getElementById("inputHelper");
const targetInputEl = document.getElementById("targetInput");
const applyBtnEl = document.getElementById("applyBtn");

function formatTwoDigits(num) {
  return num.toString().padStart(2, "0");
}

function formatTargetDateByLang(lang) {
  if (!targetDate) return "";
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();
  const hh = formatTwoDigits(targetDate.getHours());
  const mm = formatTwoDigits(targetDate.getMinutes());

  if (lang === "ja") {
    return `${y}年 ${m}月 ${d}日 ${hh}:${mm}`;
  }
  if (lang === "en") {
    return `${y}-${formatTwoDigits(m)}-${formatTwoDigits(d)} ${hh}:${mm}`;
  }
  return `${y} 年 ${m} 月 ${d} 日 ${hh}:${mm}`;
}

function updateTargetText() {
  const t = translations[currentLang];
  const dateStr = formatTargetDateByLang(currentLang);

  targetTextEl.innerHTML = `
    <span class="target-dot"></span>
    ${t.targetLabel} ${dateStr || "—"}
  `;
}

function updateCountdown() {
  if (!targetDate) return;

  const now = new Date();
  const diff = targetDate - now;
  const t = translations[currentLang];

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    messageEl.innerHTML = t.messageAfter;
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = formatTwoDigits(days);
  hoursEl.textContent = formatTwoDigits(hours);
  minutesEl.textContent = formatTwoDigits(minutes);
  secondsEl.textContent = formatTwoDigits(seconds);

  messageEl.innerHTML = t.messageBefore;
}

function clearInputError() {
  inputHelperEl.classList.remove("error");
  inputHelperEl.textContent = translations[currentLang].inputHelper;
}

function showInputError(msg) {
  inputHelperEl.classList.add("error");
  inputHelperEl.textContent = msg;
}

function applyTargetFromInput() {
  const value = targetInputEl.value;
  const t = translations[currentLang];

  if (!value) {
    showInputError(t.inputErrorInvalid);
    return;
  }

  const candidate = new Date(value);
  if (isNaN(candidate.getTime())) {
    showInputError(t.inputErrorInvalid);
    return;
  }

  const now = new Date();
  if (candidate <= now) {
    showInputError(t.inputErrorPast);
    return;
  }

  targetDate = candidate;
  localStorage.setItem(STORAGE_KEY, value);
  clearInputError();
  updateTargetText();
  updateCountdown();
}

function loadInitialTarget() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored || DEFAULT_TARGET_LOCAL;

  targetInputEl.value = initial;
  const d = new Date(initial);
  if (!isNaN(d.getTime())) {
    targetDate = d;
  } else {
    targetDate = new Date(DEFAULT_TARGET_LOCAL);
    targetInputEl.value = DEFAULT_TARGET_LOCAL;
  }
}

function applyTranslations() {
  const t = translations[currentLang];

  document.documentElement.lang =
    currentLang === "zh" ? "zh-CN" :
    currentLang === "ja" ? "ja" : "en";

  tagTextEl.textContent = t.tag;
  titleTextEl.textContent = t.title;
  subtitleTextEl.textContent = t.subtitle;
  footerMadeEl.textContent = t.footerMade;

  daysLabelEl.textContent = t.unitDays;
  hoursLabelEl.textContent = t.unitHours;
  minutesLabelEl.textContent = t.unitMinutes;
  secondsLabelEl.textContent = t.unitSeconds;

  inputLabelEl.textContent = t.inputLabel;
  applyBtnEl.textContent = t.inputButton;
  clearInputError();

  updateTargetText();
  updateCountdown();
}

function createPetals(count = 22) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const delay = Math.random() * 12;
    const duration = 14 + Math.random() * 10;
    const startX = Math.random() * 100;

    petal.style.left = startX + "vw";
    petal.style.animationDuration = duration + "s";
    petal.style.animationDelay = delay + "s";
    petal.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);
    petal.style.transform = `rotate(${Math.random() * 180}deg)`;

    document.body.appendChild(petal);
  }
}

function initLangSelect() {
  langSelectEl.value = currentLang;
  langSelectEl.addEventListener("change", () => {
    currentLang = langSelectEl.value;
    applyTranslations();
  });
}

function initInputEvents() {
  applyBtnEl.addEventListener("click", applyTargetFromInput);
  targetInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      applyTargetFromInput();
    }
  });
  targetInputEl.addEventListener("input", () => {
    clearInputError();
  });
}

function init() {
  yearTextEl.textContent = new Date().getFullYear().toString();
  loadInitialTarget();
  initLangSelect();
  initInputEvents();
  applyTranslations();
  setInterval(updateCountdown, 1000);
  createPetals(22);
}

init();

