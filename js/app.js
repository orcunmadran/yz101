/**
 * YZ101.tr - Main Application JavaScript
 * Orchestrates navigation, course filtering, curriculum modal, enrollment forms, FAQ and UI toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Announcement Bar Close ---
  const announcementBar = document.getElementById('announcementBar');
  const closeAnnouncement = document.getElementById('closeAnnouncement');
  if (closeAnnouncement && announcementBar) {
    if (sessionStorage.getItem('yz101_announcement_closed') === 'true') {
      announcementBar.style.display = 'none';
    }
    closeAnnouncement.addEventListener('click', () => {
      announcementBar.style.display = 'none';
      sessionStorage.setItem('yz101_announcement_closed', 'true');
    });
  }

  // --- 2. Mobile Menu Drawer ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('active');
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Header Quiz Shortcut Button ---
  const headerQuizBtn = document.getElementById('headerQuizBtn');
  if (headerQuizBtn) {
    headerQuizBtn.addEventListener('click', () => {
      const quizSection = document.getElementById('seviye-testi');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- 4. Course Category Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Course Curriculum Data & Modal Viewer ---
  const courseCurriculumData = {
    'temel-101': {
      level: 'BAŞLANGIÇ SEVİYESİ',
      title: 'Yapay Zekâ & Üretken Araçlar 101',
      price: '₺3.290 +KDV',
      originalPrice: '₺4.490',
      description: 'Hiçbir teknik veya kodlama bilgisi gerektirmeyen, yapay zekâyı günlük işlerinizde ve kariyerinizde bir süper güce dönüştürecek kapsamlı 4 haftalık program.',
      modules: [
        {
          week: '1. Hafta',
          title: 'Üretken Yapay Zekâ Modelleri & Prompt Mühendisliği Temelleri',
          duration: '4 Saat Canlı',
          topics: [
            'LLM (Büyük Dil Modelleri) nasıl düşünür ve çalışır?',
            'Few-Shot, Chain-of-Thought ve Persona tanımlama teknikleri',
            'Halüsinasyonları engelleme ve doğruluk artırma stratejileri',
            'ChatGPT Plus vs Claude 3.7 vs Google Gemini karşılaştırması'
          ]
        },
        {
          week: '2. Hafta',
          title: 'İçerik Üretimi, Metin Analizi & Profesyonel Yazarlık',
          duration: '4 Saat Canlı',
          topics: [
            'Pazarlama metinleri, e-posta serileri ve blog yazıları oluşturma',
            '50 sayfalık PDF ve raporları 3 dakikada özetleme ve analiz',
            'Düşünce ortaklığı: Fikir geliştirme ve beyin fırtınası metodolojisi',
            'Uygulama: Şirket bülteni ve basın bülteni otomasyonu'
          ]
        },
        {
          week: '3. Hafta',
          title: 'Görsel Tasarım & Üretken Medya: Midjourney v6 & DALL-E',
          duration: '4 Saat Canlı',
          topics: [
            'Midjourney v6 parametreleri, kamera açıları, ışık ve doku komutları',
            'Tutarlı karakter ve marka görsel kimliği oluşturma teknikleri',
            'Logo, sosyal medya afişi ve banner üretimi',
            'Photoshop Generative Fill ve AI görsel düzenleme araçları'
          ]
        },
        {
          week: '4. Hafta',
          title: 'Özel Asistanlar (Custom GPTs) & Bitirme Projesi',
          duration: '4 Saat Canlı',
          topics: [
            'Kendi bilgi tabanınızla çalışan Kişisel GPT / Claude Project oluşturma',
            'Geri bildirim ve portföy projesi sunumları',
            'YZ101 Başarı Sertifikasyonu ve Mezun Topluluğuna Katılım'
          ]
        }
      ]
    },

    'is-nocode': {
      level: 'ORTA SEVİYE',
      title: 'İş Dünyası & No-Code AI Otomasyonu',
      price: '₺4.650 +KDV',
      originalPrice: '₺6.200',
      description: 'Kod yazmadan yapay zekâ destekli otonom iş akışları kurun. Make, Zapier, Airtable ve Claude/ChatGPT API entegrasyonlarıyla şirket operasyonlarınızı otomatikleştirin.',
      modules: [
        {
          week: '1. Hafta',
          title: 'No-Code AI Ekosistemi & Make.com Temelleri',
          duration: '4 Saat Canlı',
          topics: [
            'API mantığı, JSON veri yapısı ve Webhook kavramları',
            'Make.com arayüzü, modüller, filtreler ve router yapılandırması',
            'OpenAI & Anthropic API anahtarı alma ve bağlama'
          ]
        },
        {
          week: '2. Hafta',
          title: 'Müşteri Hizmetleri & E-Posta Yanıtlama Botu',
          duration: '4 Saat Canlı',
          topics: [
            'Gelen e-postaları yapay zekâ ile sınıflandırma ve önceliklendirme',
            'Sık sorulan sorulara şirket dökümanlarına bakarak otomatik yanıt taslağı hazırlama',
            'Slack / WhatsApp bildirim entegrasyonları'
          ]
        },
        {
          week: '3. Hafta',
          title: 'Otomatik İçerik & Sosyal Medya Üretim Fabrikası',
          duration: '4 Saat Canlı',
          topics: [
            'RSS kaynaklarından haber tarayıp otomatik sosyal medya postu çıkarma',
            'AI ile görsel üretip Notion / Buffer üzerinden otomatik yayınlama',
            'SEO uyumlu blog yazısı ve LinkedIn makale otomasyonu'
          ]
        },
        {
          week: '4. Hafta',
          title: 'AI ile Finans, Satış & Excel/Sheet Veri Analitiği',
          duration: '4 Saat Canlı',
          topics: [
            'Satış formlarını CRM sistemine (HubSpot / Airtable) zenginleştirerek kaydetme',
            'Büyük Excel tablolarından otomatik grafik ve içgörü raporları çıkarma',
            'Otomatik haftalık KPI yönetici bülteni oluşturma'
          ]
        },
        {
          week: '5. Hafta',
          title: 'Canlı No-Code Vaka Projesi & Sertifikasyon',
          duration: '4 Saat Canlı',
          topics: [
            'Katılımcıların kendi şirket süreçlerine özel otomasyon mimarisi tasarlaması',
            'Hata yakalama (Error Handling) ve sistem güvenliği',
            'YZ101 No-Code AI Uzmanlık Sertifikasyonu'
          ]
        }
      ]
    },

    'llm-muhendislik': {
      level: 'İLERİ SEVİYE MÜHENDİSLİK',
      title: 'LLM Mühendisliği, RAG & AI Agents',
      price: '₺7.400 +KDV',
      originalPrice: '₺9.900',
      description: 'Yazılımcılar ve mühendisler için sıfırdan production-ready LLM sistemleri, kurumsal RAG mimarileri ve otonom multi-agent uygulamaları geliştirme programı.',
      modules: [
        {
          week: '1-2. Hafta',
          title: 'Embeddings, Vektör Veritabanları & Chunking Stratejileri',
          duration: '8 Saat Canlı + Lab',
          topics: [
            'Vektör matematiği, kosinüs benzerliği ve embedding modelleri',
            'Pinecone, ChromaDB ve Qdrant karşılaştırması ve kurulumu',
            'Gelişmiş Chunking stratejileri: Semantic chunking, recursive splitters',
            'Metadata filtreleme ve namespace yönetimi'
          ]
        },
        {
          week: '3-4. Hafta',
          title: 'İleri Seviye RAG (Retrieval-Augmented Generation) Mimarisi',
          duration: '8 Saat Canlı + Lab',
          topics: [
            'LangChain ve LlamaIndex ile RAG pipeline inşası',
            'Hybrid Search (Vektör + BM25 Lexical Arama)',
            'Re-ranking (Cohere Rerank), Query Decomposition ve Self-Query',
            'Halüsinasyon tespiti ve kaynak doğrulama mekanizmaları'
          ]
        },
        {
          week: '5-6. Hafta',
          title: 'Otonom AI Ajanları (AI Agents) & Function Calling',
          duration: '8 Saat Canlı + Lab',
          topics: [
            'Tool Calling & Function Calling ile harici API çalıştırma',
            'LangGraph ve CrewAI ile çoklu ajan (Multi-Agent) işbirlikleri',
            'Hafıza (Short-term & Long-term Memory) ve State yönetimi',
            'Kod yazan, test eden ve hata ayıklayan otonom geliştirici ajanı projesi'
          ]
        },
        {
          week: '7-8. Hafta',
          title: 'Model Değerlendirme (Evals), Fine-Tuning & Production Deployment',
          duration: '8 Saat Canlı + Lab',
          topics: [
            'Ragas ve TruLens ile RAG sistem performansı ölçme',
            'LoRA / QLoRA ile açık kaynak modelleri (Llama 3 / Mistral) fine-tune etme',
            'FastAPI & Docker ile AI mikroservisi yayına alma, CI/CD ve rate limiting',
            'Bitirme Projesi Sunumu & YZ101 AI Engineer Sertifikasyonu'
          ]
        }
      ]
    }
  };

  const courseDetailModal = document.getElementById('courseDetailModal');
  const closeCourseModal = document.getElementById('closeCourseModal');
  const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modalCourseLevel = document.getElementById('modalCourseLevel');
  const modalCourseBody = document.getElementById('modalCourseBody');
  const modalCoursePrice = document.getElementById('modalCoursePrice');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');

  function openCourseModal(courseId) {
    const data = courseCurriculumData[courseId];
    if (!data || !courseDetailModal) return;

    modalCourseTitle.textContent = data.title;
    modalCourseLevel.textContent = data.level;
    modalCoursePrice.innerHTML = `${data.price} <span style="font-size:0.8rem; text-decoration:line-through; color:var(--text-muted); margin-left:6px;">${data.originalPrice || ''}</span>`;
    
    modalCourseBody.innerHTML = `
      <p style="color:var(--text-secondary); margin-bottom:1.5rem; line-height:1.6;">${data.description}</p>
      <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:1rem; color:var(--accent-cyan);">📚 Detaylı Hafta Hafta Müfredat</h3>
      <div class="curriculum-list">
        ${data.modules.map((m) => `
          <div class="curriculum-module">
            <div class="module-header">
              <span class="module-title"><strong>${m.week}:</strong> ${m.title}</span>
              <span class="module-duration">${m.duration}</span>
            </div>
            <ul class="module-topics">
              ${m.topics.map((t) => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;

    modalEnrollBtn.setAttribute('data-course', data.title);
    if (typeof courseDetailModal.showModal === 'function') {
      courseDetailModal.showModal();
    }
  }

  // Open modal buttons
  document.querySelectorAll('.view-course-details, .open-course-from-footer').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseId = btn.getAttribute('data-course-id');
      openCourseModal(courseId);
    });
  });

  if (closeCourseModal) {
    closeCourseModal.addEventListener('click', () => courseDetailModal.close());
  }
  if (closeCourseModalBtn) {
    closeCourseModalBtn.addEventListener('click', () => courseDetailModal.close());
  }
  if (courseDetailModal) {
    courseDetailModal.addEventListener('click', (e) => {
      const rect = courseDetailModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        courseDetailModal.close();
      }
    });
  }

  // --- 6. Enrollment / Registration Modal ---
  const enrollModal = document.getElementById('enrollModal');
  const closeEnrollModal = document.getElementById('closeEnrollModal');
  const enrollForm = document.getElementById('enrollForm');
  const enrollProgram = document.getElementById('enrollProgram');

  function openEnrollment(courseName) {
    if (!enrollModal) return;
    
    // If curriculum modal is open, close it first
    if (courseDetailModal && courseDetailModal.open) {
      courseDetailModal.close();
    }

    if (enrollProgram && courseName) {
      // Find matching select option
      let found = false;
      for (let i = 0; i < enrollProgram.options.length; i++) {
        if (enrollProgram.options[i].value.includes(courseName) || courseName.includes(enrollProgram.options[i].value)) {
          enrollProgram.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        enrollProgram.value = 'Genel Danışmanlık';
      }
    }

    if (typeof enrollModal.showModal === 'function') {
      enrollModal.showModal();
    }
  }

  // Delegate click for dynamically created and static enroll buttons
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.open-enroll-modal');
    if (target) {
      e.preventDefault();
      const courseName = target.getAttribute('data-course') || 'Genel Başvuru';
      openEnrollment(courseName);
    }
  });

  if (modalEnrollBtn) {
    modalEnrollBtn.addEventListener('click', () => {
      const courseName = modalEnrollBtn.getAttribute('data-course');
      openEnrollment(courseName);
    });
  }

  if (closeEnrollModal) {
    closeEnrollModal.addEventListener('click', () => enrollModal.close());
  }

  if (enrollModal) {
    enrollModal.addEventListener('click', (e) => {
      const rect = enrollModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        enrollModal.close();
      }
    });
  }

  // --- 7. Toast Notification Utility ---
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10B981' : '#00F2FE'}" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div>${message}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // --- 8. Form Submissions Handlers ---

  // Enrollment Form Submit
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(enrollForm);
      const data = Object.fromEntries(formData.entries());

      // Save locally to simulate CRM registration
      const existing = JSON.parse(localStorage.getItem('yz101_leads') || '[]');
      existing.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem('yz101_leads', JSON.stringify(existing));

      enrollForm.reset();
      enrollModal.close();

      showToast(`🎉 Tebrikler ${data.fullName}! Ön başvurunuz alındı. Eğitim danışmanımız 24 saat içinde sizinle iletişime geçecektir.`);
    });
  }

  // Corporate Form Submit
  const corporateForm = document.getElementById('corporateForm');
  if (corporateForm) {
    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(corporateForm);
      const data = Object.fromEntries(formData.entries());

      const corporateLeads = JSON.parse(localStorage.getItem('yz101_corp_leads') || '[]');
      corporateLeads.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem('yz101_corp_leads', JSON.stringify(corporateLeads));

      corporateForm.reset();
      showToast(`🏢 Sayın ${data.name}, kurumsal teklif talebiniz alındı! ${data.company} şirketi için özel teklifimiz e-posta adresinize gönderilecektir.`);
    });
  }

  // Newsletter Form Submit
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('📬 YZ101 Yapay Zekâ bültenine başarıyla abone oldunuz!');
        input.value = '';
      }
    });
  }

  // --- 9. FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach((f) => {
          f.classList.remove('active');
          f.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
