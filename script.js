/* えぞ助｜北海道のプロ代行サービス（確認用サイト） */
(function () {
  "use strict";

  /* ---------- モバイルナビ ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var navList = document.getElementById("navList");
  function setMenu(open) {
    navList.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  }

  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      setMenu(!navList.classList.contains("is-open"));
    });
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setMenu(false); }
    });
  }

  /* ---------- 文字を大きくする（localStorageで全ページに適用） ---------- */
  var KEY = "ezosuke-text-large";
  var sizeBtn = document.getElementById("textSizeToggle");

  function applyTextSize(large) {
    document.documentElement.classList.toggle("text-large", large);
    if (sizeBtn) {
      sizeBtn.textContent = large ? "文字を元に戻す" : "文字を大きくする";
      sizeBtn.setAttribute("aria-pressed", large ? "true" : "false");
    }
  }

  var isLarge = false;
  try { isLarge = localStorage.getItem(KEY) === "1"; } catch (e) { /* 読めない環境では標準サイズのまま */ }
  applyTextSize(isLarge);

  if (sizeBtn) {
    sizeBtn.addEventListener("click", function () {
      isLarge = !isLarge;
      applyTextSize(isLarge);
      try { localStorage.setItem(KEY, isLarge ? "1" : "0"); } catch (e) { /* 保存できなくてもこのページ内では有効 */ }
    });
  }

  /* ---------- 写真見積もりのローカル確認（端末の外へは送信しない） ---------- */
  var previewBtn = document.getElementById("previewBtn");
  if (previewBtn) {
    var textInput = document.getElementById("requestText");
    var photoInput = document.getElementById("photoInput");
    var area = document.getElementById("previewArea");
    var previewText = document.getElementById("previewText");
    var thumbs = document.getElementById("previewThumbs");

    previewBtn.addEventListener("click", function () {
      var text = textInput.value.trim();
      previewText.textContent = text || "（ご依頼内容は未入力です）";

      thumbs.innerHTML = "";
      var files = photoInput.files;
      for (var i = 0; i < files.length; i++) {
        if (!files[i].type || files[i].type.indexOf("image/") !== 0) { continue; }
        var img = document.createElement("img");
        img.alt = "選択した現場写真 " + (i + 1);
        img.src = URL.createObjectURL(files[i]);
        thumbs.appendChild(img);
      }

      area.hidden = false;
      area.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
