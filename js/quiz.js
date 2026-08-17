/**
 * YZ101.tr - AI Level Assessment Quiz Engine
 * Interactively recommends the best training path for visitors.
 */

(function () {
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizStepText = document.getElementById('quizStepText');
  const quizCategoryText = document.getElementById('quizCategoryText');
  const quizQuestionArea = document.getElementById('quizQuestionArea');
  const quizPrevBtn = document.getElementById('quizPrevBtn');
  const quizNextBtn = document.getElementById('quizNextBtn');

  if (!quizQuestionArea || !quizNextBtn) return;

  const quizQuestions = [
    {
      step: 1,
      category: "Teknik Arka Plan",
      title: "Şu anki teknik bilginiz ve yazılım deneyiminiz hangi düzeyde?",
      options: [
        {
          id: "beginner",
          icon: "🌱",
          title: "Sıfır Kodlama / Başlangıç",
          desc: "Hiç kodlama bilmiyorum, daha önce yapay zekâyı sadece sohbet amacıyla kullandım.",
          score: "temel"
        },
        {
          id: "business",
          icon: "💼",
          title: "İş Dünyası / Pazarlama / Operasyon",
          desc: "İş süreçlerimi hızlandırmak istiyorum, teknik detaydan çok pratik araçlara odaklıyım.",
          score: "is-nocode"
        },
        {
          id: "developer",
          icon: "💻",
          title: "Yazılımcı / Mühendis",
          desc: "Python, JavaScript veya başka dillerde kod yazabiliyorum, API ve veritabanı deneyimim var.",
          score: "muhendislik"
        },
        {
          id: "corporate",
          icon: "🏢",
          title: "Şirket Yöneticisi / Ekip Lideri",
          desc: "Tüm şirketimin veya departmanımın yapay zekâ dönüşümünü organize etmek istiyorum.",
          score: "kurumsal"
        }
      ]
    },
    {
      step: 2,
      category: "Temel Hedef",
      title: "Yapay zekâ eğitimi almaktaki öncelikli hedefiniz nedir?",
      options: [
        {
          id: "goal-productivity",
          icon: "⚡",
          title: "Günlük İşlerimi ve İçerik Üretimini Hızlandırmak",
          desc: "Yazışma, araştırma, görsel tasarım ve özet çıkarmada uzmanlaşmak.",
          score: "temel"
        },
        {
          id: "goal-automation",
          icon: "⚙️",
          title: "Otonom No-Code Botlar ve Süreçler Kurmak",
          desc: "Make, Zapier ve AI araçlarını bağlayarak tekrarlayan işleri otomatikleştirmek.",
          score: "is-nocode"
        },
        {
          id: "goal-build-apps",
          icon: "🚀",
          title: "RAG & LLM Destekli Gerçek Ürünler Geliştirmek",
          desc: "Vektör veritabanları, LangChain ve otonom AI ajanları inşa edip yayına almak.",
          score: "muhendislik"
        },
        {
          id: "goal-team",
          icon: "👥",
          title: "Ekiplerimin Verimliliğini ve Güvenliğini Artırmak",
          desc: "Şirket verilerini koruyarak departmanlar için özel AI iş akışları oluşturmak.",
          score: "kurumsal"
        }
      ]
    },
    {
      step: 3,
      category: "İlgi Duyulan Araçlar",
      title: "En çok hangi teknoloji ve araçlarla çalışmak istiyorsunuz?",
      options: [
        {
          id: "tools-genai",
          icon: "🎨",
          title: "ChatGPT, Claude, Gemini & Midjourney",
          desc: "Üretken yapay zekâ arayüzleri ve prompt optimizasyonu.",
          score: "temel"
        },
        {
          id: "tools-nocode",
          icon: "🔌",
          title: "Make, Zapier, Airtable, Notion AI",
          desc: "Kodsuz entegrasyonlar, webhooks ve otomasyon panelleri.",
          score: "is-nocode"
        },
        {
          id: "tools-dev",
          icon: "🐍",
          title: "Python, LangChain, Pinecone, LlamaIndex",
          desc: "API'ler, embeddings, vektör indeksleme ve model fine-tuning.",
          score: "muhendislik"
        },
        {
          id: "tools-enterprise",
          icon: "🔒",
          title: "Kurumsal Güvenli LLM & Özel Bilgi Tabanı",
          desc: "Şirket içi veri gizliliği, KVKK uyumu ve çok kullanıcılı AI lisanslama.",
          score: "kurumsal"
        }
      ]
    },
    {
      step: 4,
      category: "Zaman & Katılım",
      title: "Haftalık ne kadar zaman ayırabilirsiniz?",
      options: [
        {
          id: "time-light",
          icon: "⏱️",
          title: "Haftada 3-4 Saat (Hafta Sonu)",
          desc: "Yoğun bir tempom var, hap bilgi ve pratik şablonlar istiyorum.",
          score: "temel"
        },
        {
          id: "time-medium",
          icon: "📚",
          title: "Haftada 5-8 Saat (Canlı Ders + Proje)",
          desc: "Derslere katılıp haftalık ödevleri ve canlı atölyeleri uygulayabilirim.",
          score: "is-nocode"
        },
        {
          id: "time-intensive",
          icon: "🔥",
          title: "Haftada 8-12 Saat (Yoğun Mühendislik)",
          desc: "Projeleri kodlamak, GitHub portföyü hazırlamak ve lab çalışmalarına girmek istiyorum.",
          score: "muhendislik"
        },
        {
          id: "time-b2b",
          icon: "🗓️",
          title: "Şirket İçi Esnek Takvim",
          desc: "Mesai saatleri içinde veya bootcamp formatında şirket içi program.",
          score: "kurumsal"
        }
      ]
    }
  ];

  let currentStep = 0;
  const userAnswers = [];

  function renderQuestion() {
    const q = quizQuestions[currentStep];
    const progressPercent = ((currentStep + 1) / quizQuestions.length) * 100;
    
    quizProgressFill.style.width = `${progressPercent}%`;
    quizStepText.textContent = `Soru ${currentStep + 1} / ${quizQuestions.length}`;
    quizCategoryText.textContent = q.category;

    quizQuestionArea.innerHTML = `
      <h3 class="quiz-question-title">${q.title}</h3>
      <div class="quiz-options-list">
        ${q.options.map((opt) => `
          <div class="quiz-option-card ${userAnswers[currentStep] === opt.score ? 'selected' : ''}" data-score="${opt.score}">
            <div class="quiz-option-left">
              <span class="quiz-option-icon">${opt.icon}</span>
              <div class="quiz-option-text">
                <h4>${opt.title}</h4>
                <p>${opt.desc}</p>
              </div>
            </div>
            <div class="quiz-radio"></div>
          </div>
        `).join('')}
      </div>
    `;

    // Add option click events
    const optionCards = quizQuestionArea.querySelectorAll('.quiz-option-card');
    optionCards.forEach((card) => {
      card.addEventListener('click', () => {
        optionCards.forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        userAnswers[currentStep] = card.getAttribute('data-score');
        quizNextBtn.disabled = false;
      });
    });

    // Update nav buttons
    quizPrevBtn.style.display = currentStep > 0 ? 'inline-flex' : 'none';
    quizNextBtn.disabled = !userAnswers[currentStep];
    quizNextBtn.textContent = currentStep === quizQuestions.length - 1 ? 'Sonucu Gör ✨' : 'Devam Et →';
  }

  function calculateAndShowResult() {
    // Count score weights
    const counts = { temel: 0, 'is-nocode': 0, muhendislik: 0, kurumsal: 0 };
    userAnswers.forEach((ans) => {
      if (counts[ans] !== undefined) counts[ans]++;
    });

    let topChoice = 'temel';
    let maxCount = -1;
    for (const [key, val] of Object.entries(counts)) {
      if (val > maxCount) {
        maxCount = val;
        topChoice = key;
      }
    }

    const recommendations = {
      temel: {
        badge: "%98 UYUMLU SEÇİM",
        courseName: "Yapay Zekâ & Üretken Araçlar 101",
        title: "Sizin İçin En İdeal Eğitim: Temel Seviye (101)",
        desc: "Yapay zekâyı sıfırdan, teknik karmaşa olmadan öğrenmek ve günlük üretkenliğinizi en az 5 katına çıkarmak için bu program tam size göre.",
        outcomes: "ChatGPT & Claude ileri seviye prompt teknikleri, Midjourney v6 ile profesyonel görsel üretimi ve özel GPT asistanları kurma.",
        price: "₺3.290 +KDV",
        promoCode: "YZ101-QUIZ-BASLA"
      },
      'is-nocode': {
        badge: "%96 UYUMLU SEÇİM",
        courseName: "İş Dünyası & No-Code AI Otomasyonu",
        title: "Sizin İçin En İdeal Eğitim: İş Dünyası & No-Code AI",
        desc: "Kod yazmadan iş akışlarınızı otomatikleştirmek, veri analizlerini hızlandırmak ve otonom sistemler inşa etmek için mükemmel bir rota.",
        outcomes: "Make & Zapier senaryoları, AI destekli müşteri hizmetleri ve otomatik içerik üretim fabrikası kurma.",
        price: "₺4.650 +KDV",
        promoCode: "YZ101-NOCODE-PRO"
      },
      muhendislik: {
        badge: "%99 UYUMLU SEÇİM",
        courseName: "LLM Mühendisliği, RAG & AI Agents",
        title: "Sizin İçin En İdeal Eğitim: LLM & AI Mühendisliği",
        desc: "Yazılım altyapınızı yapay zekâ çağına taşımak, kurumsal RAG mimarileri ve çoklu otonom ajan sistemleri geliştirmek için tasarlandı.",
        outcomes: "LangChain, LlamaIndex, Pinecone, LangGraph ile production seviyesinde 5 portföy projesi geliştirme.",
        price: "₺7.400 +KDV",
        promoCode: "YZ101-DEV-VIP"
      },
      kurumsal: {
        badge: "KURUMSAL DÖNÜŞÜM",
        courseName: "Kurumsal Özel Eğitim",
        title: "Sizin İçin En İdeal Çözüm: Şirket İçi AI Dönüşüm Programı",
        desc: "Ekibinizin ve departmanlarınızın yapay zekâ yetkinliklerini artırmak, KVKK uyumlu güvenli kurumsal AI süreçleri inşa etmek için özel müfredat hazırlayalım.",
        outcomes: "Departman bazlı atölyeler, veri güvenliği protokolleri ve şirketinize özel ölçülebilir verimlilik etki raporu.",
        price: "Özel Teklif",
        promoCode: "YZ101-B2B-PROMO"
      }
    };

    const rec = recommendations[topChoice];

    quizQuestionArea.innerHTML = `
      <div class="quiz-result-box">
        <span class="result-badge">${rec.badge}</span>
        <h3 class="result-title">${rec.title}</h3>
        <p class="result-desc">${rec.desc}</p>

        <div class="result-recommendation">
          <div class="rec-title">🎯 Tavsiye Edilen Program: ${rec.courseName}</div>
          <p class="rec-text"><strong>Kazanımlar:</strong> ${rec.outcomes}</p>
          <div style="margin-top:0.8rem; font-size:0.85rem; color:var(--text-muted);">
            🎁 Testi tamamladığınız için özel indirim kodunuz: <code class="promo-code">${rec.promoCode}</code>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:0.8rem; flex-wrap:wrap; margin-top:1.5rem;">
          <button class="btn btn-primary btn-lg open-enroll-modal" data-course="${rec.courseName}">
            Bu Eğitime İndirimle Ön Kayıt Ol ➔
          </button>
          <button class="btn btn-secondary-outline" id="retakeQuizBtn">
            Testi Tekrar Çöz ↺
          </button>
        </div>
      </div>
    `;

    // Hide standard footer nav on result
    quizPrevBtn.style.display = 'none';
    quizNextBtn.style.display = 'none';
    quizStepText.textContent = 'Sonuç Hazır';
    quizCategoryText.textContent = 'Kişiselleştirilmiş Rota';

    // Hook up retake button
    const retakeBtn = document.getElementById('retakeQuizBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        currentStep = 0;
        userAnswers.length = 0;
        quizPrevBtn.style.display = 'none';
        quizNextBtn.style.display = 'inline-flex';
        renderQuestion();
      });
    }
  }

  // Next / Submit Button
  quizNextBtn.addEventListener('click', () => {
    if (currentStep < quizQuestions.length - 1) {
      currentStep++;
      renderQuestion();
    } else {
      calculateAndShowResult();
    }
  });

  // Previous Button
  quizPrevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderQuestion();
    }
  });

  // Initial Question Render
  renderQuestion();
})();
