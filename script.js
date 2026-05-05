// ============ モバイルメニュー ============
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const list = document.querySelector('.nav__list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // メニュー内リンクをクリックしたら閉じる
  list.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ============ お問い合わせフォーム ============
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 簡易バリデーション
    const required = form.querySelectorAll('[required]');
    let firstInvalid = null;
    required.forEach((el) => {
      const valid = el.checkValidity();
      el.style.borderColor = valid ? '' : '#c0392b';
      if (!valid && !firstInvalid) firstInvalid = el;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // フォーム値を取得し、メーラー起動
    const data = new FormData(form);
    const name = data.get('name') || '';
    const tel = data.get('tel') || '';
    const email = data.get('email') || '';
    const service = data.get('service') || '';
    const date = data.get('date') || '';
    const message = data.get('message') || '';

    const subject = `【ご依頼】${service}（${name} 様）`;
    const body =
      `お名前：${name}\n` +
      `電話番号：${tel}\n` +
      `メール：${email}\n` +
      `ご依頼内容：${service}\n` +
      `ご希望日時：${date}\n\n` +
      `--- 詳細 ---\n${message}\n`;

    const mailto =
      'mailto:info@example.com' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailto;

    // 完了メッセージ表示
    const success = document.createElement('div');
    success.className = 'form__success';
    success.textContent =
      'メーラーが起動します。送信が完了しましたら、2営業日以内にご返信いたします。';
    form.parentNode.insertBefore(success, form);
    form.style.display = 'none';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();

// ============ スクロール時のヘッダー影 ============
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 2px 12px rgba(20, 37, 64, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
