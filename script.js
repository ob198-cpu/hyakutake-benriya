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

// ============ スクロール時のヘッダー ============
(function () {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ============ スクロール表示アニメーション ============
(function () {
  const targets = document.querySelectorAll(
    '.section__head, .bubble, .problems__answer, .service-card, .price__big, .price__table, .flow__item, .faq__item, .contact__form'
  );
  if (!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // 並んだカードは少しずつ遅らせて表示
    el.style.transitionDelay = `${(i % 3) * 70}ms`;
    observer.observe(el);
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
