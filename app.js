const lessons=[
 {title:"التحية والتعارف",fr:"Salutations et présentation",body:"Bonjour ! Je m'appelle Sara.",meaning:"مرحباً! اسمي سارة.",note:"Bonjour تعني صباح الخير أو مرحباً. Je m'appelle تعني اسمي."},
 {title:"كيف حالك؟",fr:"Comment ça va ?",body:"Comment ça va ? — Ça va bien, merci.",meaning:"كيف حالك؟ — أنا بخير، شكراً.",note:"يمكنك الإجابة أيضاً: Très bien (بخير جداً)، أو Comme ci, comme ça (لا بأس)."},
 {title:"الأرقام من 1 إلى 5",fr:"Les nombres",body:"Un • Deux • Trois • Quatre • Cinq",meaning:"واحد • اثنان • ثلاثة • أربعة • خمسة",note:"حاول نطق الأرقام بصوت مرتفع وكررها ثلاث مرات."},
 {title:"التعريف بالنفس",fr:"Se présenter",body:"Je suis marocain. J'habite à Tanger.",meaning:"أنا مغربي. أسكن في طنجة.",note:"Je suis تعني أنا أكون، وJ'habite تعني أسكن."}
];
const words=[["Bonjour","مرحباً / صباح الخير"],["Merci","شكراً"],["Au revoir","إلى اللقاء"],["S'il vous plaît","من فضلك"],["Oui","نعم"],["Non","لا"],["La maison","المنزل"],["L'école","المدرسة"],["Un livre","كتاب"],["L'eau","الماء"],["L'ami","الصديق"],["La famille","العائلة"]];
let completed=JSON.parse(localStorage.getItem("completedLessons")||"[]"),points=Number(localStorage.getItem("points")||0),lastScore=localStorage.getItem("lastScore")||"0%";
const $=s=>document.querySelector(s);
function updateStats(){$("#doneCount").textContent=completed.length;$("#pointsCount").textContent=points;$("#quizCount").textContent=lastScore}
function show(id){document.querySelectorAll("main .section").forEach(x=>x.classList.add("hidden"));const el=$("#"+id);if(el)el.classList.remove("hidden");if(id==="lesson-list")renderLessons();if(id==="vocabulary")renderWords();window.scrollTo({top:0,behavior:"smooth"})}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)show(b.dataset.go)});
function renderLessons(){$("#lessonCards").innerHTML=lessons.map((l,i)=>`<button class="lesson-item" data-lesson="${i}"><span class="lesson-number">${i+1}</span><span><b>${l.title}</b><small>${l.fr}</small></span><span style="margin-right:auto">${completed.includes(i)?"✓":"←"}</span></button>`).join("");}
$("#lessonCards").addEventListener("click",e=>{const b=e.target.closest("[data-lesson]");if(b)openLesson(Number(b.dataset.lesson))});
function openLesson(i){const l=lessons[i];$("#lessonContent").innerHTML=`<div class="lesson-body"><span class="eyebrow">الدرس ${i+1}</span><h3>${l.title}</h3><p class="muted" dir="ltr">${l.fr}</p><div class="translation">${l.body}</div><h3>المعنى بالعربية</h3><p>${l.meaning}</p><p class="tip">${l.note}</p><button id="completeLesson" class="primary">${completed.includes(i)?"تم إكمال هذا الدرس ✓":"أنهيت الدرس"}</button></div>`;show("lesson-view");$("#completeLesson").addEventListener("click",()=>{if(!completed.includes(i)){completed.push(i);points+=10;localStorage.setItem("completedLessons",JSON.stringify(completed));localStorage.setItem("points",points);updateStats()}$("#completeLesson").textContent="تم إكمال هذا الدرس ✓";});}
function renderWords(){$("#wordList").innerHTML=words.map(w=>`<div class="word"><b>${w[0]}</b><span>${w[1]}</span></div>`).join("")}
const questions=[{q:"ما معنى Bonjour؟",a:["إلى اللقاء","مرحباً","شكراً"],correct:1,why:"Bonjour تعني مرحباً أو صباح الخير."},{q:"كيف نقول شكراً بالفرنسية؟",a:["Merci","Pardon","Bonsoir"],correct:0,why:"Merci تعني شكراً."},{q:"ما معنى Deux؟",a:["واحد","ثلاثة","اثنان"],correct:2,why:"Deux هو الرقم اثنان."}];
let qi=0,score=0,chosen=false;
function drawQuestion(){$("#quizResult").classList.add("hidden");$("#quizArea").classList.remove("hidden");const q=questions[qi];$("#quizProgress").textContent=`السؤال ${qi+1} من ${questions.length}`;$("#questionBox").innerHTML=`<div class="question">${q.q}</div><div class="answers">${q.a.map((a,i)=>`<button class="answer" data-answer="${i}">${a}</button>`).join("")}</div><p id="feedback" class="muted"></p>`;$("#nextQuestion").disabled=true;$("#nextQuestion").textContent=qi===questions.length-1?"عرض النتيجة":"التالي";chosen=false;}
$("#questionBox").addEventListener("click",e=>{const b=e.target.closest("[data-answer]");if(!b||chosen)return;chosen=true;const q=questions[qi],v=Number(b.dataset.answer);if(v===q.correct)score++;document.querySelectorAll(".answer").forEach((x,i)=>{x.disabled=true;if(i===q.correct)x.classList.add("correct");else if(i===v)x.classList.add("wrong")});$("#feedback").textContent=q.why;$("#nextQuestion").disabled=false;});
$("#nextQuestion").addEventListener("click",()=>{if(qi<questions.length-1){qi++;drawQuestion()}else{const pct=Math.round(score/questions.length*100);lastScore=pct+"%";localStorage.setItem("lastScore",lastScore);points+=score*5;localStorage.setItem("points",points);updateStats();$("#quizArea").classList.add("hidden");$("#quizResult").classList.remove("hidden");$("#quizResult").innerHTML=`<div class="result"><div style="font-size:42px">🎉</div><h3>أحسنت! انتهى الاختبار</h3><strong>${score} / ${questions.length}</strong><p>نتيجتك: ${pct}%</p><button id="retryQuiz" class="primary">أعد الاختبار</button></div>`;$("#retryQuiz").addEventListener("click",()=>{qi=0;score=0;drawQuestion()})}});
$("#menuBtn").addEventListener("click",()=>show("lessons"));
updateStats();drawQuestion();renderLessons();


// Teacher Alex: starter bilingual teaching assistant with browser speech features.
const teacherInput = document.querySelector("#teacherInput");
const teacherMessages = document.querySelector("#teacherMessages");
function addTeacherMessage(text, who) {
  const msg = document.createElement("div");
  msg.className = "chat-msg " + (who === "user" ? "user-msg" : "teacher-msg");
  const label = document.createElement("b");
  label.textContent = who === "user" ? "أنت" : "الأستاذ أليكس";
  const p = document.createElement("p");
  p.textContent = text;
  msg.append(label, p);
  if (who !== "user") {
    const speak = document.createElement("button");
    speak.className = "speak-btn";
    speak.textContent = "🔊 استمع";
    speak.dataset.speak = text;
    msg.append(speak);
  }
  teacherMessages.append(msg);
  teacherMessages.scrollTop = teacherMessages.scrollHeight;
}
function teacherReply(raw) {
  const q = raw.toLowerCase().trim();
  if (/bonjour|سلام|مرحبا|تحية/.test(q)) return "Bonjour ! تعني مرحباً أو صباح الخير. يمكنك أن تجيب: Bonjour, comment ça va ? ومعناها: مرحباً، كيف حالك؟";
  if (/merci|شكرا|شكرًا/.test(q)) return "كلمة Merci تعني شكراً. وللرد يمكنك قول: De rien، أي العفو.";
  if (/comment|حال|كيف/.test(q)) return "للسؤال عن الحال نقول: Comment ça va ? والجواب: Ça va bien, merci. أي أنا بخير، شكراً.";
  if (/être|etre|يكون|تصريف/.test(q)) return "الفعل être يعني يكون. في المضارع: je suis = أنا أكون، tu es = أنت تكون، il/elle est = هو/هي يكون.";
  if (/avoir|يملك|عند/.test(q)) return "الفعل avoir يعني يملك أو لديه. في المضارع: j'ai = لديّ، tu as = لديك، il/elle a = لديه/لديها.";
  if (/pronon|نطق|صوت/.test(q)) return "لنتمرن على النطق: استمع إلى الجملة ثم كررها ببطء: Je m'appelle Sara. معناها: اسمي سارة. اضغط زر الاستماع أسفل الرد.";
  if (/اسم|appelle|présent/.test(q)) return "للتعريف بنفسك قل: Je m'appelle ... ومعناها: اسمي ... مثال: Je m'appelle Ali.";
  if (/merci|شكرا/.test(q)) return "Avec plaisir ! على الرحب والسعة.";
  return "سؤال جميل! في هذه النسخة التجريبية أستطيع مساعدتك في التحيات والتعارف وبعض القواعد الأساسية. جرّب أن تسألني عن Bonjour أو Merci أو الفعل être. سنضيف لاحقاً معلماً ذكياً يجيب عن أسئلة مفتوحة.";
}
function sendTeacherMessage() {
  const value = teacherInput.value.trim();
  if (!value) return;
  addTeacherMessage(value, "user");
  teacherInput.value = "";
  window.setTimeout(() => addTeacherMessage(teacherReply(value), "teacher"), 250);
}
document.querySelector("#sendTeacher")?.addEventListener("click", sendTeacherMessage);
teacherInput?.addEventListener("keydown", e => { if (e.key === "Enter") sendTeacherMessage(); });
document.querySelector("#clearTeacher")?.addEventListener("click", () => {
  teacherMessages.innerHTML = "";
  addTeacherMessage("Bonjour ! لنبدأ درساً جديداً. ما الذي تريد تعلمه؟", "teacher");
});
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-speak]");
  if (!btn) return;
  if (!("speechSynthesis" in window)) {
    $("#voiceStatus").textContent = "عذراً، خاصية النطق غير متاحة في هذا المتصفح.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(btn.dataset.speak);
  utterance.lang = /[a-zA-Z]/.test(btn.dataset.speak) ? "fr-FR" : "ar";
  utterance.rate = 0.88;
  window.speechSynthesis.speak(utterance);
});
document.querySelector("#micTeacher")?.addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    $("#voiceStatus").textContent = "التعرف على الكلام غير مدعوم في هذا المتصفح. جرّب Chrome مع اتصال بالإنترنت.";
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  $("#voiceStatus").textContent = "أستمع إليك الآن... تحدث بالفرنسية.";
  recognition.onresult = event => {
    teacherInput.value = event.results[0][0].transcript;
    $("#voiceStatus").textContent = "تم التقاط كلامك. اضغط إرسال ليجيبك المعلم.";
  };
  recognition.onerror = () => { $("#voiceStatus").textContent = "لم أتمكن من سماعك. تحقق من إذن الميكروفون وحاول مجدداً."; };
  recognition.onend = () => {};
  recognition.start();
});
