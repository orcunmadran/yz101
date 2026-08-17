/**
 * YZ101.tr - Prompt Engineering Lab (Mini Simulator)
 * Enables visitors to test structured prompt frameworks live.
 */

(function () {
  const promptRoleSelect = document.getElementById('promptRole');
  const promptTaskSelect = document.getElementById('promptTask');
  const promptFormatSelect = document.getElementById('promptFormat');
  const generatePromptBtn = document.getElementById('generatePromptBtn');
  const copyPromptBtn = document.getElementById('copyPromptBtn');
  const promptTextOutput = document.getElementById('promptTextOutput');
  const aiResponseOutput = document.getElementById('aiResponseOutput');

  if (!generatePromptBtn || !promptTextOutput || !aiResponseOutput) return;

  // Prompt Templates & Simulated AI outputs
  const simulations = {
    'lead-developer_code-review_code-json': {
      prompt: `[ROL]: Kıdemli Yapay Zekâ & Yazılım Mimarı (10+ yıl tecrübeli).
[GÖREV]: Aşağıdaki Node.js API controller modülünü incele; güvenlik açıkları (SQL Injection, IDOR), bellek sızıntıları ve asenkron hata yakalama açısından denetle.
[BAĞLAM]: Yüksek trafikli bir e-ticaret ödeme mikroservisi.
[ÇIKTI FORMATI]:
1. Tespit edilen açıklar listesi (JSON şemasında: { "severity": "HIGH|MED|LOW", "issue": "string", "line": number, "fix": "string" })
2. Refactor edilmiş temiz, production-ready TypeScript kod bloğu.`,
      response: `<h4>🛡️ Kod Güvenlik & Mimari İnceleme Raporu</h4>
<p>Denetim tamamlandı. <strong>1 Kritik (High)</strong> ve <strong>1 Orta (Medium)</strong> seviye iyileştirme tespit edildi.</p>
<table>
  <tr><th>Önem</th><th>Problem</th><th>Açıklama</th></tr>
  <tr><td><span style="color:#EF4444;font-weight:700;">HIGH</span></td><td>Yetkisiz Kaynak Erişimi (IDOR)</td><td>User ID doğrulaması yapılmadan sipariş detayı çekiliyor.</td></tr>
  <tr><td><span style="color:#F59E0B;font-weight:700;">MED</span></td><td>Eksik Hata Yakalama (Unhandled Rejection)</td><td>DB bağlantı kopmasında process çökebilir.</td></tr>
</table>
<h4>🚀 Refactor Edilmiş Örnek Çıktı:</h4>
<pre class="code-preview">// Güvenli ve Tip Korumalı Controller
export async function getOrderSecure(req: Request, res: Response) {
  const { orderId } = req.params;
  const userId = req.user.id; // Session'dan doğrulandı
  const order = await db.orders.findFirstOrThrow({ where: { id: orderId, userId } });
  return res.status(200).json({ success: true, data: order });
}</pre>`
    },

    'growth-marketer_marketing-plan_structured-table': {
      prompt: `[ROL]: Büyüme & Dijital Pazarlama Stratejisti (SaaS ve EdTech uzmanı).
[GÖREV]: Yeni nesil bir B2B Yapay Zekâ Otomasyon aracının lansmanı için 30 günlük büyüme ve müşteri edinme planı hazırla.
[BAĞLAM]: Sıfır organik trafik ile başlanıyor, 1.000 nitelikli beta kullanıcısı hedefleniyor.
[ÇIKTI FORMATI]:
- Haftalık aşamaları içeren detaylı tablo (Hafta, Kanal, Taktik, Tahmini Dönüşüm, KPI).
- CAC (Müşteri Edinme Maliyeti) düşürme tavsiyeleri.`,
      response: `<h4>📈 30 Günlük B2B Büyüme ve Lansman Yol Haritası</h4>
<table>
  <tr><th>Hafta</th><th>Odak Kanal</th><th>Uygulanacak Taktik</th><th>Hedef KPI</th></tr>
  <tr><td>1. Hafta</td><td>LinkedIn & Twitter/X</td><td>"10x Verimlilik" vaka analizi ve demo GIF paylaşımları</td><td>300 Bekleme Listesi</td></tr>
  <tr><td>2. Hafta</td><td>Product Hunt & Reddit</td><td>Özel lansman indirimi ve canlı Soru-Cevap etkinliği</td><td>500 Beta Kaydı</td></tr>
  <tr><td>3. Hafta</td><td>Kişiselleştirilmiş Cold Outreach</td><td>Make + Clay + Claude ile hiper-özelleştirilmiş e-postalar</td><td>%14 Yanıt Oranı</td></tr>
  <tr><td>4. Hafta</td><td>Referral Döngüsü</td><td>"Arkadaşını Davet Et, 3 Ay Ücretsiz Kullan" kampanyası</td><td>1.200 Aktif Kullanıcı</td></tr>
</table>
<p>💡 <strong>YZ101 Pro İpucu:</strong> Cold outreach maillerinde yapay zekâya prospect'in son LinkedIn gönderisini özetleterek buzları eritin.</p>`
    },

    'data-scientist_data-insights_executive-summary': {
      prompt: `[ROL]: Kıdemli Veri Bilimci ve İş Zekâsı Analisti.
[GÖREV]: Son 3 ayda %18 artış gösteren SaaS abonelik iptallerini (Churn) analiz et ve yönetim kuruluna sunulacak stratejik raporu üret.
[BAĞLAM]: 50.000 aktif aboneye sahip abonelik tabanlı yazılım şirketi.
[ÇIKTI FORMATI]:
1. Yönetici Özeti (Executive Summary - 3 cümle).
2. Churn'ü tetikleyen ilk 3 kök neden.
3. Önümüzdeki 60 günde uygulanacak 3 net aksiyon planı.`,
      response: `<h4>📊 Yönetici Özeti (Executive Summary)</h4>
<p>Son çeyrekteki %18 churn artışı incelendiğinde; ana kaybın ilk 14 günlük onboarding sürecini tamamlayamayan kullanıcılarda yoğunlaştığı tespit edilmiştir. Ürünün temel değerini ilk 48 saatte deneyimleyemeyen kullanıcıların terk etme ihtimali 4.2 kat daha yüksektir.</p>
<h4>⚠️ En Kritik 3 Kök Neden:</h4>
<ul>
  <li><strong>1. Karmaşık İlk Kurulum:</strong> API anahtarı bağlama adımı kullanıcıların %34'ünü kaybettiriyor.</li>
  <li><strong>2. Eksik Proaktif Destek:</strong> Hata alan kullanıcıya 2 saat içinde ulaşılmadığında churn riski %80'e çıkıyor.</li>
  <li><strong>3. Fiyat/Fayda Algısı:</strong> Kullanılmayan üst segment özelliklerin sadeleştirilmemesi.</li>
</ul>
<h4>✅ 60 Günlük Kurtarma Aksiyonu:</h4>
<p>1. Yapay Zekâ destekli interaktif rehber ekle.<br>2. Kullanım düşüşü gösteren hesaplara otomatik check-in e-postası tetikle.<br>3. Yıllık plana geçişte %35 indirim sun.</p>`
    }
  };

  function updateSimulation() {
    const role = promptRoleSelect.value;
    const task = promptTaskSelect.value;
    const format = promptFormatSelect.value;
    const key = `${role}_${task}_${format}`;

    // Fallback if specific exact key isn't hardcoded
    const data = simulations[key] || {
      prompt: `[ROL]: ${promptRoleSelect.options[promptRoleSelect.selectedIndex].text}
[GÖREV]: ${promptTaskSelect.options[promptTaskSelect.selectedIndex].text}
[ÇIKTI FORMATI]: ${promptFormatSelect.options[promptFormatSelect.selectedIndex].text}
[TALİMAT]: Profesyonel standartlarda, net, uygulanabilir ve yüksek doğruluklu adımlarla yanıtla.`,
      response: `<h4>⚡ Profesyonel Çıktı Simülasyonu</h4>
<p><strong>${promptRoleSelect.options[promptRoleSelect.selectedIndex].text}</strong> perspektifiyle oluşturulan strateji başarıyla üretildi.</p>
<ul>
  <li>Hedefe yönelik adım adım planlama oluşturuldu.</li>
  <li>Seçilen format (<strong>${promptFormatSelect.options[promptFormatSelect.selectedIndex].text}</strong>) kurallarına tam uyum sağlandı.</li>
  <li>Hata payını ve halüsinasyonu minimize eden bağlam parametreleri eklendi.</li>
</ul>
<p><em>YZ101 eğitimlerinde bu şablonların değişkenli dinamik ajan versiyonlarını kodlayacaksınız.</em></p>`
    };

    // Render with typing / smooth effect
    promptTextOutput.textContent = data.prompt;
    aiResponseOutput.innerHTML = `<div style="color:var(--accent-cyan); font-style:italic; margin-bottom:0.5rem;">⚡ AI modeli işliyor...</div>` + data.response;
  }

  // Event Listeners
  generatePromptBtn.addEventListener('click', updateSimulation);
  promptRoleSelect.addEventListener('change', updateSimulation);
  promptTaskSelect.addEventListener('change', updateSimulation);
  promptFormatSelect.addEventListener('change', updateSimulation);

  // Copy Prompt Button
  copyPromptBtn.addEventListener('click', () => {
    const text = promptTextOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyPromptBtn.innerHTML;
      copyPromptBtn.innerHTML = `<span>✓ Kopyalandı!</span>`;
      setTimeout(() => {
        copyPromptBtn.innerHTML = originalText;
      }, 2000);
    });
  });

  // Initial Run
  updateSimulation();
})();
