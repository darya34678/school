/* ====== ПРОВЕРКА НОУТБУКА ====== */

// Возвращает значение выбранной радио-кнопки или null
function getValue(name) {
  const el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : null;
}

function checkLaptop() {
  const cpu  = parseInt(getValue('cpu'));
  const ram  = parseInt(getValue('ram'));
  const disk = parseInt(getValue('disk'));
  const out  = document.getElementById('laptopResult');

  if (isNaN(cpu) || isNaN(ram) || isNaN(disk)) {
    out.textContent = 'Ответь на все три вопроса 🙂';
    return;
  }

  const total = cpu + ram + disk;
  let verdict;
  if (total >= 5)      verdict = '✅ Отлично! Ноутбук точно подойдёт для учёбы.';
  else if (total >= 3) verdict = '👍 Хорошо! Ноутбук подойдёт, но следи за свободным местом на диске.';
  else                 verdict = '⚠️ Ноутбук слабоват для программирования, но базовые навыки освоишь. Приходи — покажем, что нужно докупить.';

  out.textContent = verdict;
}

/* ====== КАЛЬКУЛЯТОР ШАНСОВ ====== */

function calcChances() {
  const g1 = parseFloat(document.getElementById('g1').value);
  const g2 = parseFloat(document.getElementById('g2').value);
  const g3 = parseFloat(document.getElementById('g3').value);
  const out = document.getElementById('calcResult');

  if (isNaN(g1) || isNaN(g2) || isNaN(g3) ||
      g1 < 2 || g1 > 5 || g2 < 2 || g2 > 5 || g3 < 2 || g3 > 5) {
    out.textContent = 'Введи оценки от 2 до 5 во все поля.';
    return;
  }

  const avg = (g1 + g2 + g3) / 3;
  let verdict;
  if (avg >= 4.5)      verdict = '🟢 Шансы отличные! ' + avg.toFixed(2) + ' — почти бюджетное место.';
  else if (avg >= 3.5) verdict = '🟡 Хорошие шансы! Средний балл ' + avg.toFixed(2) + ' — стоит подавать документы.';
  else                 verdict = '🟠 Шансы средние (' + avg.toFixed(2) + '). Подтяни оценки до конца года — и всё получится!';

  out.textContent = verdict;
}

/* ====== ЗАПИСЬ НА ДЕНЬ ОТКРЫТЫХ ДВЕРЕЙ ====== */

function signUp() {
  document.getElementById('signupMsg').textContent =
    '🎉 Заявка принята! Мы позвоним и подтвердим дату визита.';
}

/* ====== АНКЕТА: ОТПРАВКА НА ПОЧТУ ЧЕРЕЗ FORMSPREE ====== */

// Форма отправляет данные на https://formspree.io/f/mgakplkk,
// а Formspree пересылает анкету письмом на darya.bayrak24@mail.ru.
const applyForm = document.getElementById('applyForm');

applyForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // не перезагружаем страницу
  const out = document.getElementById('applyResult');

  out.textContent = '⏳ Отправляем заявку...';

  try {
    const response = await fetch(applyForm.action, {
      method: 'POST',
      body: new FormData(applyForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      out.textContent = '✅ Заявка отправлена! Она уже в приёмной комиссии — ждём тебя.';
      applyForm.reset();
    } else {
      out.textContent = '⚠️ Не удалось отправить. Позвони в приёмную комиссию: 8 (495) 503-74-81.';
    }
  } catch (err) {
    out.textContent = '⚠️ Проблема с интернетом. Попробуй ещё раз или позвони: 8 (495) 503-74-81.';
  }
});
