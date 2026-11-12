/* =====================================================================
   Nahdi Tour — Kotak penulis + tombol Bagikan + kartu share ala Medium
   ---------------------------------------------------------------------
   Dipasang di setiap halaman artikel:  <script src="share-card.js" defer></script>
   - Menyisipkan kotak "Ditulis oleh Nahdi Tour" (tag kategori, avatar,
     bio, tombol Bagikan) setelah .artikel-body.
   - Tombol Bagikan membuka panel berisi gambar cover 9:16 (1080x1920)
     yang dibuat di browser: latar hero artikel yang di-blur + kartu putih.
   - Aksi: Salin link, Bagikan link, Instagram Story, Bagikan gambar,
     Simpan gambar. Semua aksi dikirim ke GA4 sebagai event `share`.
   ===================================================================== */
(() => {
  'use strict';

  const AVATAR = 'assets/avatar-nahdi-tour.png';
  const BIO = "Bantu kamu rencanain umroh/haji supaya lebih hemat dan sesuai syariat. Yuk konsultasi, InsyaAllah dapat solusi!";
  const DOMAIN = 'nahditour.com';
  const W = 1080, H = 1920;               // ukuran Instagram Story
  const INK = '#111341';

  // ---------- Data artikel (diambil dari halaman) ----------
  const $ = (s, r = document) => r.querySelector(s);
  const meta = (p) => { const m = document.querySelector('meta[property="' + p + '"], meta[name="' + p + '"]'); return m ? m.content : ''; };

  const article = $('main article');
  const body = article && $('.artikel-body', article);
  if (!article || !body) return;

  const titleEl = $('h1', article);
  const title = (titleEl ? titleEl.textContent : meta('og:title') || document.title).trim().replace(/\s+/g, ' ');

  const canonical = $('link[rel="canonical"]');
  const shareUrl = (canonical && canonical.href) || (location.origin + location.pathname);

  // Hero: gambar pertama di <figure> artikel. Dipakai path same-origin supaya canvas tidak "tainted".
  const heroImg = $('figure img', article) || $('img', article);
  let heroSrc = heroImg ? (heroImg.currentSrc || heroImg.src) : '';
  if (!heroSrc && meta('og:image')) { try { heroSrc = new URL(meta('og:image')).pathname; } catch (e) {} }

  const headerText = ($('header', article) || article).textContent;
  const readMatch = headerText.match(/(\d+)\s*menit\s*baca/i);
  const readTime = readMatch ? readMatch[1] + ' menit baca'
    : Math.max(1, Math.round(body.textContent.trim().split(/\s+/).length / 200)) + ' menit baca';

  const katEl = $('#artKat', article);
  const kategori = katEl ? katEl.textContent.trim() : '';
  const badgeEl = $('span.rounded-full', article);
  const tags = [];
  [badgeEl && badgeEl.textContent, kategori].forEach((t) => {
    t = (t || '').trim().replace(/\s+/g, ' ');
    if (t && !tags.some((x) => x.toLowerCase() === t.toLowerCase())) tags.push(t);
  });

  const track = (name, params) => {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, Object.assign({ content_type: 'article', item_id: location.pathname }, params || {})); } catch (e) {}
  };

  // ---------- CSS ----------
  const css = `
  .nt-author{margin-top:56px;padding-top:32px;border-top:1px solid #DCE6EE}
  .nt-tags{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:36px}
  .nt-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:999px;background:#EBF5FD;color:#363E44;font-size:14px;font-weight:500;line-height:1.2}
  .nt-author-row{display:flex;align-items:center;justify-content:space-between;gap:16px}
  .nt-avatar{width:72px;height:72px;border-radius:999px;display:block;flex:none}
  .nt-share-btn{display:inline-flex;align-items:center;gap:8px;padding:11px 22px;border-radius:999px;border:1.5px solid ${INK};background:#fff;color:${INK};font:600 15px/1 'Plus Jakarta Sans','Inter',system-ui,sans-serif;cursor:pointer;transition:background .15s,color .15s}
  .nt-share-btn:hover{background:${INK};color:#fff}
  .nt-share-btn:focus-visible{outline:3px solid #9EB0FF;outline-offset:2px}
  .nt-share-btn svg{width:18px;height:18px}
  .nt-by{margin-top:18px;font:800 22px/1.3 'Plus Jakarta Sans','Inter',system-ui,sans-serif;color:${INK}}
  .nt-by-sub{margin-top:6px;font-size:14px;color:#6A737A}
  .nt-bio{margin-top:14px;font-size:16px;line-height:1.65;color:#363E44}
  .nt-overlay{position:fixed;inset:0;z-index:9999;background:rgba(5,6,31,.72);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .2s}
  .nt-overlay.is-open{opacity:1}
  .nt-sheet{width:100%;max-width:520px;max-height:100dvh;background:#16182b;color:#fff;border-radius:22px 22px 0 0;display:flex;flex-direction:column;transform:translateY(24px);transition:transform .2s}
  .nt-overlay.is-open .nt-sheet{transform:none}
  @media (min-width:640px){.nt-overlay{align-items:center}.nt-sheet{border-radius:22px;max-height:94vh}}
  .nt-sheet-head{display:flex;align-items:center;gap:14px;padding:16px 18px 6px}
  .nt-sheet-head h2{font:600 18px/1 'Plus Jakarta Sans','Inter',sans-serif;margin:0;color:#fff}
  .nt-close{width:40px;height:40px;border-radius:999px;border:0;background:transparent;color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
  .nt-close:hover{background:rgba(255,255,255,.08)}
  .nt-preview{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:10px 24px 6px}
  .nt-preview img,.nt-preview .nt-skel{height:min(58dvh,560px);aspect-ratio:9/16;border-radius:18px;display:block;box-shadow:0 10px 40px rgba(0,0,0,.45)}
  .nt-skel{background:linear-gradient(110deg,#23263f 30%,#2e3150 50%,#23263f 70%);background-size:200% 100%;animation:ntsk 1.2s infinite linear}
  @keyframes ntsk{to{background-position:-200% 0}}
  .nt-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:14px 10px calc(16px + env(safe-area-inset-bottom))}
  .nt-act{border:0;background:transparent;color:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:8px;padding:8px 2px;border-radius:12px;font:500 12px/1.25 'Inter',system-ui,sans-serif;text-align:center}
  .nt-act:hover{background:rgba(255,255,255,.07)}
  .nt-act:disabled{opacity:.4;cursor:default}
  .nt-act .ic{width:48px;height:48px;border-radius:999px;background:rgba(255,255,255,.1);display:inline-flex;align-items:center;justify-content:center}
  .nt-act .ic svg{width:22px;height:22px}
  .nt-act.ig .ic{background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fd5949 45%,#d6249f 60%,#285AEB 90%)}
  .nt-toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);z-index:10000;background:#fff;color:${INK};padding:12px 18px;border-radius:12px;font:500 14px/1.4 'Inter',sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25);opacity:0;transition:all .2s;max-width:calc(100vw - 32px);text-align:center}
  .nt-toast.show{opacity:1;transform:translate(-50%,0)}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const ICON = {
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 7v9M8 12l4 4 4-4"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  };

  // ---------- Kotak penulis ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const box = document.createElement('section');
  box.className = 'nt-author';
  box.setAttribute('aria-label', 'Tentang penulis');
  box.innerHTML =
    (tags.length ? '<div class="nt-tags">' + tags.map((t) => '<span class="nt-tag">' + esc(t) + '</span>').join('') + '</div>' : '') +
    '<div class="nt-author-row">' +
      '<img class="nt-avatar" src="' + AVATAR + '" alt="Nahdi Tour" width="72" height="72" loading="lazy">' +
      '<button type="button" class="nt-share-btn" aria-haspopup="dialog">' + ICON.share + 'Bagikan</button>' +
    '</div>' +
    '<p class="nt-by">Ditulis oleh Nahdi Tour</p>' +
    '<p class="nt-by-sub">Biro perjalanan umrah &amp; haji</p>' +
    '<p class="nt-bio">' + esc(BIO) + '</p>';
  body.insertAdjacentElement('afterend', box);

  // ---------- Pembuat gambar (canvas) ----------
  const loadImg = (src) => new Promise((res) => {
    if (!src) return res(null);
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });

  const rrect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  };

  const coverDraw = (ctx, im, x, y, w, h) => {
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
    const dw = im.naturalWidth * s, dh = im.naturalHeight * s;
    ctx.drawImage(im, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  };

  const wrap = (ctx, text, maxW) => {
    const words = text.split(' '); const lines = []; let line = '';
    words.forEach((w) => {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
    });
    if (line) lines.push(line);
    return lines;
  };

  const DISPLAY = "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif";
  const BODY = "'Inter', system-ui, sans-serif";

  async function renderCard() {
    try {
      await Promise.all([
        document.fonts.load('800 70px "Plus Jakarta Sans"'),
        document.fonts.load('600 30px "Plus Jakarta Sans"'),
        document.fonts.load('500 30px "Inter"'),
      ]);
    } catch (e) {}
    const [hero, avatar] = await Promise.all([loadImg(heroSrc), loadImg(AVATAR)]);

    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');

    // 1) Latar: hero di-blur. Teknik downscale-upscale berjalan di semua browser (termasuk Safari lama).
    ctx.fillStyle = '#DCE6EE'; ctx.fillRect(0, 0, W, H);
    if (hero) {
      if (typeof ctx.filter === 'string') {
        // Blur native (Chrome, Edge, Firefox, Safari 18+). Digambar sedikit lebih besar agar tepi tidak pudar.
        ctx.filter = 'blur(56px) saturate(1.1)';
        coverDraw(ctx, hero, -160, -160, W + 320, H + 320);
        ctx.filter = 'none';
      } else {
        // Cadangan: perkecil lalu perbesar bertahap (hasilnya mendekati gaussian blur).
        let src = document.createElement('canvas');
        src.width = 27; src.height = 48;
        coverDraw(src.getContext('2d'), hero, 0, 0, src.width, src.height);
        [108, 432].forEach((w) => {
          const n = document.createElement('canvas');
          n.width = w; n.height = Math.round(w * 16 / 9);
          const nctx = n.getContext('2d'); nctx.imageSmoothingQuality = 'high';
          nctx.drawImage(src, 0, 0, n.width, n.height);
          src = n;
        });
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(src, -40, -70, W + 80, H + 140);
      }
    }
    ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.fillRect(0, 0, W, H);

    // 2) Ukur judul supaya muat (maks 6 baris).
    const CX = 96, CW = W - CX * 2;      // kartu putih
    const COL = 120;                     // kolom vertikal kanan
    const PAD = 56;
    const textW = CW - COL - PAD * 2;
    let fs = 78, lines;
    for (; fs >= 46; fs -= 2) {
      ctx.font = '800 ' + fs + 'px ' + DISPLAY;
      lines = wrap(ctx, title, textW);
      if (lines.length <= 6) break;
    }
    const lh = Math.round(fs * 1.16);
    const TOP = 118, FOOT = 168;
    const midH = Math.max(560, PAD * 2 + lines.length * lh + (kategori ? 74 : 0));
    const CH = TOP + midH + FOOT;
    const CY = Math.round((H - CH) / 2);

    // 3) Kartu putih
    ctx.save();
    ctx.shadowColor = 'rgba(8,14,19,0.28)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 18;
    rrect(ctx, CX, CY, CW, CH, 44); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.restore();

    ctx.strokeStyle = INK; ctx.lineWidth = 2.5;
    const yA = CY + TOP, yB = CY + TOP + midH;
    ctx.beginPath(); ctx.moveTo(CX, yA); ctx.lineTo(CX + CW, yA); ctx.moveTo(CX, yB); ctx.lineTo(CX + CW, yB);
    ctx.moveTo(CX + CW - COL, yA); ctx.lineTo(CX + CW - COL, yB); ctx.stroke();

    // Baris atas: waktu baca
    ctx.fillStyle = INK; ctx.textBaseline = 'middle';
    ctx.font = '500 30px ' + BODY;
    ctx.fillText(readTime, CX + PAD, CY + TOP / 2 + 2);

    // Judul
    ctx.textBaseline = 'alphabetic';
    ctx.font = '800 ' + fs + 'px ' + DISPLAY;
    const blockH = lines.length * lh + (kategori ? 74 : 0);
    let ty = yA + (midH - blockH) / 2 + fs * 0.92;
    lines.forEach((l) => { ctx.fillText(l, CX + PAD, ty); ty += lh; });
    if (kategori) {
      ctx.font = '500 32px ' + BODY; ctx.fillStyle = '#363E44';
      ctx.fillText(kategori, CX + PAD, ty - lh + fs * 0.08 + 74);
    }

    // Kolom vertikal: domain
    ctx.save();
    ctx.translate(CX + CW - COL / 2, yA + midH / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = INK; ctx.font = '500 32px ' + BODY; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(DOMAIN, 0, 0);
    ctx.restore();

    // Footer: avatar + nama, kanan: "Artikel"
    const fy = yB + FOOT / 2;
    if (avatar) {
      ctx.save(); ctx.beginPath(); ctx.arc(CX + PAD + 44, fy, 44, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(avatar, CX + PAD, fy - 44, 88, 88); ctx.restore();
    }
    ctx.fillStyle = INK; ctx.textBaseline = 'middle';
    ctx.font = '600 34px ' + DISPLAY;
    ctx.fillText('Nahdi Tour', CX + PAD + 88 + 26, fy + 2);
    ctx.font = '800 38px ' + DISPLAY; ctx.textAlign = 'right';
    ctx.fillText('Artikel', CX + CW - PAD, fy + 2);
    ctx.textAlign = 'left';

    return new Promise((res) => c.toBlob((b) => res(b), 'image/png'));
  }

  // ---------- Panel share ----------
  let overlay, imgBlob = null, imgFile = null, imgUrl = '', lastFocus = null, toastT;
  const fileName = 'nahdi-tour-' + (location.pathname.split('/').pop() || 'artikel').replace(/\.html?$/, '') + '.png';

  const toast = (msg) => {
    let t = $('.nt-toast');
    if (!t) { t = document.createElement('div'); t.className = 'nt-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3200);
  };

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); return true; }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = shareUrl; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) {}
      ta.remove(); return ok;
    }
  };

  const download = () => {
    if (!imgUrl) return;
    const a = document.createElement('a'); a.href = imgUrl; a.download = fileName;
    document.body.appendChild(a); a.click(); a.remove();
  };

  const canShareFile = () => !!(imgFile && navigator.canShare && navigator.canShare({ files: [imgFile] }));

  const actions = {
    copy: async () => { toast((await copyLink()) ? 'Link artikel disalin' : 'Gagal menyalin link'); track('share', { method: 'copy_link' }); },
    link: async () => {
      track('share', { method: 'share_link' });
      if (navigator.share) { try { await navigator.share({ title, text: title, url: shareUrl }); } catch (e) {} }
      else toast((await copyLink()) ? 'Link artikel disalin' : 'Gagal menyalin link');
    },
    ig: async () => {
      track('share', { method: 'instagram_story' });
      // Salin link dulu supaya bisa ditempel sebagai stiker Link di Story.
      const copied = await copyLink();
      if (canShareFile()) {
        toast(copied ? 'Link disalin. Pilih Instagram → Story, lalu tempel sebagai stiker Link.' : 'Pilih Instagram → Story');
        try { await navigator.share({ files: [imgFile] }); } catch (e) {}
      } else {
        download();
        toast('Gambar tersimpan. Buka Instagram → Story → pilih gambar ini' + (copied ? ', lalu tempel link sebagai stiker.' : '.'));
      }
    },
    image: async () => {
      track('share', { method: 'share_image' });
      if (canShareFile()) { try { await navigator.share({ files: [imgFile], title, text: title + '\n' + shareUrl }); } catch (e) {} }
      else { download(); toast('Perangkat ini belum mendukung berbagi gambar langsung. Gambar sudah diunduh.'); }
    },
    save: () => { track('share', { method: 'save_image' }); download(); toast('Gambar disimpan'); },
  };

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'nt-overlay';
    overlay.innerHTML =
      '<div class="nt-sheet" role="dialog" aria-modal="true" aria-labelledby="ntShareTitle">' +
        '<div class="nt-sheet-head"><button type="button" class="nt-close" aria-label="Tutup">' + ICON.close + '</button><h2 id="ntShareTitle">Bagikan</h2></div>' +
        '<div class="nt-preview"><div class="nt-skel" aria-label="Menyiapkan gambar"></div></div>' +
        '<div class="nt-actions">' +
          '<button type="button" class="nt-act" data-act="copy"><span class="ic">' + ICON.link + '</span>Salin link</button>' +
          '<button type="button" class="nt-act" data-act="link"><span class="ic">' + ICON.share + '</span>Bagikan link</button>' +
          '<button type="button" class="nt-act ig" data-act="ig" disabled><span class="ic">' + ICON.ig + '</span>Instagram Story</button>' +
          '<button type="button" class="nt-act" data-act="image" disabled><span class="ic">' + ICON.image + '</span>Bagikan gambar</button>' +
          '<button type="button" class="nt-act" data-act="save" disabled><span class="ic">' + ICON.save + '</span>Simpan gambar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.nt-close')) return close();
      const b = e.target.closest('[data-act]');
      if (b && !b.disabled) actions[b.dataset.act]();
    });
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = [...overlay.querySelectorAll('button:not([disabled])')];
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  let imgPromise = null;
  const getImage = () => {
    if (!imgPromise) {
      imgPromise = renderCard().then((b) => {
        if (!b) { imgPromise = null; return false; }
        imgBlob = b; imgUrl = URL.createObjectURL(b);
        try { imgFile = new File([b], fileName, { type: 'image/png' }); } catch (e) { imgFile = null; }
        return true;
      }).catch(() => { imgPromise = null; return false; });
    }
    return imgPromise;
  };

  async function open() {
    lastFocus = document.activeElement;
    if (!overlay) buildOverlay();
    overlay.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    $('.nt-close', overlay).focus();
    track('share_open');

    const ok = await getImage();
    const pv = $('.nt-preview', overlay);
    if (!ok) { toast('Gagal membuat gambar'); return; }
    if (!pv.querySelector('img')) {
      const img = new Image();
      img.src = imgUrl; img.alt = 'Pratinjau gambar untuk dibagikan: ' + title;
      pv.innerHTML = ''; pv.appendChild(img);
    }
    overlay.querySelectorAll('[data-act][disabled]').forEach((b) => (b.disabled = false));
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { overlay.style.display = 'none'; }, 200);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $('.nt-share-btn', box).addEventListener('click', open);

  // Pra-render diam-diam saat browser senggang, supaya panel langsung siap.
  const warm = () => { getImage(); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => { if (en.some((x) => x.isIntersecting)) { io.disconnect(); warm(); } }, { rootMargin: '600px' });
    io.observe(box);
  }
})();
