// ===== Layanan — kartu paket (data + render) =====
// Ubah data paket di PAKET_DATA di bawah; tampilan kartu mengikuti otomatis.
(() => {

  // ---- Ikon line-style (stroke 1.75, mengikuti ikonografi NDS) ----
  const ICONS = {
    video:     '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    file:      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    gift:      '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
    book:      '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    sheep:     '<ellipse cx="10.5" cy="12" rx="6.5" ry="4.5"/><circle cx="17.8" cy="9.2" r="2.4"/><path d="M7 16.5V20"/><path d="M14 16.5V20"/>',
    user:      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
    sparkles:  '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
    hourglass: '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
    wallet:    '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    ticket:    '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
    stamp:     '<path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"/><path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/>',
    tent:      '<path d="M3.5 21 14 3"/><path d="M20.5 21 10 3"/><path d="M15.5 21 12 15l-3.5 6"/><path d="M2 21h20"/>',
    building:  '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    utensils:  '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    plane:     '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    bed:       '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',
    badge:     '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  };

  const icon = (name, cls) =>
    '<span class="fasilitas-icon ' + (cls || 'text-primary-700') + '">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>' +
    '</span>';

  // ---- Data paket ----
  const FASILITAS_BADAL_HAJI = [
    ['video',    'Video Dokumentasi'],
    ['file',     'Sertifikat PDF'],
    ['gift',     'Souvenir Sajadah'],
    ['book',     'Pelaksanaan Sesuai Sunnah'],
    ['sheep',    'Hadyu Domba 1 ekor'],
    ['user',     'Hanya Badal 1 Jiwa'],
    ['sparkles', 'Bisa Titip Doa'],
  ];

  const FASILITAS_BADAL_UMROH = [
    ['video',    'Video Dokumentasi'],
    ['file',     'Sertifikat PDF'],
    ['gift',     'Souvenir Sajadah'],
    ['book',     'Pelaksanaan Sesuai Sunnah'],
    ['user',     'Hanya Badal 1 Jiwa'],
    ['sparkles', 'Bisa Titip Doa'],
  ];

  // Fasilitas paket Umrah reguler — sama untuk semua mitra, kecuali baris hotel.
  const fasilitasUmrah = (hotelLabel) => [
    ['plane',    'Tiket Pesawat PP'],
    ['bed',      hotelLabel],
    ['utensils', 'Makan 3x Sehari'],
    ['stamp',    'Visa & Perlengkapan'],
    ['user',     'Mutawif Berpengalaman'],
    ['book',     'Manasik Gratis'],
  ];

  // ---- Mitra travel partner (logo lockups di assets/mitra) ----
  const MITRA = {
    nahdi:    { nama: 'Nahdi Tour',      logo: 'assets/mark-nahdi-tour.png',        izin: 'Berizin resmi sebagai BPW' },
    elMarwa:  { nama: 'El Marwa',        logo: 'assets/mitra/el-marwa.png',         izin: 'Mitra travel terverifikasi' },
    namira:   { nama: 'Namira',          logo: 'assets/mitra/namira.png',           izin: 'Izin Umrah 183 · Haji 693' },
    safir:    { nama: 'Safir Tour',      logo: 'assets/mitra/safir.png',            izin: 'Terpercaya sejak 2009' },
    uhud:     { nama: 'Uhud Tour',       logo: 'assets/mitra/uhud-tour.png',        izin: 'Mitra travel terverifikasi' },
    alAnshar: { nama: 'Al-Anshar',       logo: 'assets/mitra/al-anshar.png',        izin: 'Madani Travel · terverifikasi' },
    mutiara:  { nama: 'Mutiara Sunnah',  logo: 'assets/mitra/mutiara-sunnah.png',   izin: 'Izin PPIU No. U.193 / 2021' },
    pahala:   { nama: 'Pahala Wisata',   logo: 'assets/mitra/pahala-wisata.png',    izin: 'Hajj & Umroh Services' },
    haramain: { nama: 'HaramainKU',      logo: 'assets/mitra/haramainku.png',       izin: 'PT Kartika Utama · terverifikasi' },
    allia:    { nama: 'Allia',           logo: 'assets/mitra/allia.png',            izin: 'Haji & Umrah sesuai Sunnah' },
    sahabat:  { nama: 'Sahabat Haji',    logo: 'assets/mitra/sahabat-haji.png',     izin: 'Mitra travel terverifikasi' },
    binDawood:{ nama: 'Bin Dawood Tour and Travel', logo: 'assets/mitra/Bin-Dawood-Travel.png',                       izin: 'Mitra travel terverifikasi' },
    dwins:    { nama: 'Dwins Travel',    logo: 'assets/mitra/dwins-travel.png',     izin: 'Mitra travel terverifikasi' },
  };

  // ---- Foto Tanah Suci (dipakai sebagai header kartu) ----
  const FOTO = {
    kaabaClock:  'assets/kaaba-masjidil-haram.jpg',
    kaabaClock2: 'uploads/hakam-magdea-fardana-ansie-NZzkVzuEVSc-unsplash.jpg',
    kaabaMinaret: 'uploads/pexels-kazi-ashikuzzaman-430197805-34495333.jpg',
    kaabaMinaret2: 'uploads/pexels-rushdi-fatani-782816372-27608158.jpg',
    madinah:     'assets/wisata-halal.jpg',
  };

  // ---- Brosur PDF/JPG mitra (assets/brosur) — kosongkan jika belum tersedia ----
  const BROSUR = {
    hajiKhususSahabat:    'assets/brosur/haji-khusus-sahabat-haji.png',
    hajiKhususBinDawood:  'assets/brosur/haji-khusus-bin-dawood.png',
    hajiKhususDwins:      'assets/brosur/haji-khusus-dwins.png',
    umrahAkhirTahunUhud:    'assets/brosur/umroh-akhir-tahun-uhud.png',
    umrahAkhirTahunMutiara: 'assets/brosur/umroh-akhir-tahun-mutiara-sunnah.png',
    umrahAkhirTahunDwins:   'assets/brosur/umroh-akhir-tahun-dwins.png',
    umrahItikafMutiara:     'assets/brosur/umroh-itikaf-mutiara-sunnah.png',
    umrahTurkiDwins:        'assets/brosur/umroh-turki-dwins.png',
    umrahDubaiDwins:        'assets/brosur/umroh-dubai-dwins.png',
    badalHaji:              'assets/brosur/badal-haji-nahdi-tour.png',
    badalUmroh:             'assets/brosur/badal-umroh-nahdi-tour.png',
  };

  const PAKET_DATA = {
    badal: [
      {
        id: 'badal-1', judul: 'Badal Haji', foto: FOTO.kaabaClock,
        fasilitas: FASILITAS_BADAL_HAJI,
        mitra: MITRA.nahdi, harga: 'Rp37,5 juta', download: BROSUR.badalHaji,
      },
      {
        id: 'badal-2', judul: 'Badal Umroh', foto: FOTO.kaabaMinaret2,
        fasilitas: FASILITAS_BADAL_UMROH,
        mitra: MITRA.nahdi, harga: 'Rp3,5 juta', download: BROSUR.badalUmroh,
      },
    ],
    reguler: [
      {
        id: 'reguler-1', judul: 'Umrah Akhir Tahun', foto: FOTO.kaabaMinaret2,
        fasilitas: fasilitasUmrah('Anjum Hotel (Makkah) & Darul Iman Al Haram (Madinah)'),
        mitra: MITRA.uhud, harga: 'Rp65,5 juta', download: BROSUR.umrahAkhirTahunUhud,
      },
      {
        id: 'reguler-2', judul: 'Umrah Akhir Tahun', foto: FOTO.madinah,
        fasilitas: fasilitasUmrah('Royal Majestik (Makkah) & Deyar Al Eiman (Madinah)'),
        mitra: { ...MITRA.dwins, nama: 'Dwins Travel (Paket Reguler)' }, harga: 'Rp29,5 juta', download: BROSUR.umrahAkhirTahunDwins,
      },
      {
        id: 'reguler-3', judul: 'Umrah Akhir Tahun', foto: FOTO.kaabaClock,
        fasilitas: fasilitasUmrah('Movenpick Hajar (Makkah) & Deyar Aleiman (Madinah)'),
        mitra: MITRA.mutiara, harga: 'Rp43,3 juta', download: BROSUR.umrahAkhirTahunMutiara,
      },
      {
        id: 'reguler-4', judul: 'Umrah Plus Dubai', foto: FOTO.kaabaMinaret,
        fasilitas: fasilitasUmrah('Le Meridien Tower (Makkah) & Dar Al Naem (Madinah)'),
        mitra: MITRA.dwins, harga: 'Rp35,5 juta', download: BROSUR.umrahDubaiDwins,
      },
      {
        id: 'reguler-5', judul: 'Umrah Plus Turki Cappadocia', foto: FOTO.kaabaClock2,
        fasilitas: fasilitasUmrah('Royal Majestik (Makkah) & Deyar Al Eiman (Madinah)'),
        mitra: MITRA.dwins, harga: 'Rp38,9 juta', download: BROSUR.umrahTurkiDwins,
      },
      {
        id: 'reguler-6', judul: "Umrah I'tikaf Ramadhan", foto: FOTO.madinah,
        fasilitas: fasilitasUmrah('Wahat Ajyad (Makkah) & ODST / Triple One (Madinah)'),
        mitra: MITRA.mutiara, harga: 'Rp38,9 juta', download: BROSUR.umrahItikafMutiara,
      },
    ],
    khusus: [
      {
        id: 'khusus-1', judul: 'Haji Khusus', foto: FOTO.kaabaClock,
        fasilitas: [
          ['hourglass', 'Masa Tunggu 8-10 Tahun'],
          ['ticket',    'Langsung Dapat No. Porsi'],
          ['wallet',    'Total Biaya Pelunasan Ditetapkan di Tahun Keberangkatan'],
          ['bed',       'Hotel Bintang 4-5 (Setaraf)'],
        ],
        mitra: MITRA.sahabat, harga: '$ 4.000', hargaLabel: 'DP per Orang', download: BROSUR.hajiKhususSahabat,
      },
      {
        id: 'khusus-2', judul: 'Haji Khusus', foto: FOTO.kaabaMinaret,
        fasilitas: [
          ['bed',      'Jeddah — Rosemond Hotel (Setaraf)'],
          ['bed',      'Makkah — Fairmont Hotel (Setaraf)'],
          ['bed',      'Madinah — Shahd by Sofitel (Setaraf)'],
          ['building', 'Aziziah — Apartment Transit'],
        ],
        mitra: MITRA.binDawood, harga: '$ 4.500', hargaLabel: 'DP per Orang', download: BROSUR.hajiKhususBinDawood,
      },
      {
        id: 'khusus-3', judul: 'Haji Khusus', foto: FOTO.kaabaClock2,
        fasilitas: [
          ['hourglass', 'Masa Tunggu 7-9 Tahun'],
          ['stamp',     'Visa Haji Resmi'],
          ['bed',       'Makkah — Royal Majestik'],
          ['bed',       'Madinah — Concord Al Khair'],
        ],
        mitra: { ...MITRA.dwins, nama: 'Dwins Travel (Paket Reguler)' }, harga: '$ 4.900', hargaLabel: 'DP per Orang', download: BROSUR.hajiKhususDwins,
      },
    ],
  };

  // ---- Render ----
  const fasilitasItem = ([ic, label]) =>
    '<li class="flex items-start gap-2.5">' + icon(ic) +
      '<span class="text-sm text-slate700 leading-snug">' + label + '</span>' +
    '</li>';

  // Tombol brosur: link download (jika file tersedia) atau keterangan "Coming Soon".
  const brosurHTML = (p) => {
    if (p.download) {
      return '<a href="' + p.download + '" download class="btn-outline inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold">Download Brosur</a>';
    }
    return '<span class="btn-outline inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold" aria-disabled="true" title="Brosur belum tersedia">Brosur Segera Hadir</span>';
  };

  const cardHTML = (p, key) => {
    const satuan = '';
    return `
    <article class="paket-card" tabindex="0" aria-label="${p.judul} — arahkan kursor untuk lihat fasilitas">
      <div class="paket-card-inner">
        <image-slot id="paket-${p.id}" style="width:100%;aspect-ratio:4/3;" shape="rect" fit="cover" ${p.foto ? `src="${p.foto}"` : ''} placeholder="Foto paket"></image-slot>
        <div class="p-6 flex flex-col flex-1">
          <h3 class="font-display font-bold text-xl leading-snug text-primary-900">${p.judul}</h3>

          <div class="mt-4 flex items-center gap-3">
            <span class="shrink-0 w-12 h-12 rounded-full bg-white border border-slate200 flex items-center justify-center overflow-hidden p-1.5">
              ${p.mitra.logo ? `<img src="${p.mitra.logo}" alt="${p.mitra.nama}" class="max-w-full max-h-full object-contain" />` : `<span class="font-display font-bold text-sm text-primary-700">${p.mitra.nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span>`}
            </span>
            <span class="min-w-0">
              <span class="block text-[15px] font-semibold text-primary-900 leading-tight truncate">${p.mitra.nama}</span>
              <span class="mt-1 flex items-center gap-1.5 text-[12px] text-slate500 leading-snug">
                <span class="fasilitas-icon text-primary-600 shrink-0" style="width:14px;height:14px;margin-top:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;" aria-hidden="true">${ICONS.badge}</svg></span>
                ${p.mitra.izin}
              </span>
            </span>
          </div>

          <div class="mt-5 pt-5 border-t border-slate200">
            <span class="block text-sm text-slate500">${p.hargaLabel || 'Per Orang Mulai dari'}</span>
            <span class="block font-display font-extrabold text-2xl text-primary-900 whitespace-nowrap">${p.harga}${satuan}</span>
          </div>
        </div>
      </div>

      <div class="paket-pop">
        <div class="paket-fasilitas">
          <p class="font-display font-bold text-lg text-primary-900">Fasilitas &amp; Layanan</p>
          <ul class="mt-4 flex flex-col gap-3">
            ${p.fasilitas.map(fasilitasItem).join('')}
          </ul>
        </div>
        <button type="button" class="paket-toggle" aria-expanded="false">
          <span>Lihat fasilitas &amp; layanan</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="paket-actions mt-5 pt-5 border-t border-slate200 flex flex-col gap-2.5">
          <a href="Nahdi Tour.html#konsultasi" class="btn-primary inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold">Konsultasi Sekarang</a>
          ${brosurHTML(p)}
        </div>
      </div>
    </article>`;
  };

  const skeletonHTML = () => `
    <div class="skeleton-card" aria-hidden="true">
      <div class="skel skel-img"></div>
      <div class="p-6 flex flex-col flex-1">
        <div class="skel" style="height:20px;width:90%;"></div>
        <div class="skel" style="height:20px;width:65%;margin-top:10px;"></div>
        <div class="mt-4 flex items-center gap-3">
          <div class="skel" style="width:48px;height:48px;border-radius:9999px;flex-shrink:0;"></div>
          <div style="flex:1;">
            <div class="skel" style="height:14px;width:70%;"></div>
            <div class="skel" style="height:11px;width:50%;margin-top:8px;"></div>
          </div>
        </div>
        <div class="mt-5 pt-5 border-t border-slate200">
          <div class="skel" style="height:12px;width:45%;"></div>
          <div class="skel" style="height:24px;width:55%;margin-top:10px;"></div>
        </div>
      </div>
    </div>`;

  // 1) Tampilkan skeleton segera (1 per kartu) supaya layout tidak melompat.
  Object.entries(PAKET_DATA).forEach(([key, list]) => {
    const grid = document.querySelector('[data-paket-grid="' + key + '"]');
    if (grid) grid.innerHTML = list.map(skeletonHTML).join('');
  });

  // Flip the popover to the left side when the card sits near the viewport's right edge.
  const positionPop = (card) => {
    const pop = card.querySelector('.paket-pop');
    if (!pop) return;
    pop.classList.remove('flip');
    if (window.innerWidth < 768) return; // mobile: panel is stacked inline
    const rect = card.getBoundingClientRect();
    if (rect.right + 16 + 340 > window.innerWidth - 8) pop.classList.add('flip');
  };

  // 2) Ganti dengan kartu asli setelah "loading" selesai.
  const renderReal = () => {
    Object.entries(PAKET_DATA).forEach(([key, list]) => {
      const grid = document.querySelector('[data-paket-grid="' + key + '"]');
      if (grid) grid.innerHTML = list.map((p) => cardHTML(p, key)).join('');
    });
    document.querySelectorAll('.paket-card').forEach((card) => {
      card.addEventListener('mouseenter', () => positionPop(card));
      card.addEventListener('focusin', () => positionPop(card));
    });
  };
  window.addEventListener('load', () => setTimeout(renderReal, 750));

  // Mobile accordion: tap "Lihat fasilitas & layanan" untuk buka/tutup panel.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.paket-toggle');
    if (!btn) return;
    const card = btn.closest('.paket-card');
    if (!card) return;
    const open = card.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.querySelector('span').textContent = open ? 'Tutup fasilitas' : 'Lihat fasilitas & layanan';
  });

})();
