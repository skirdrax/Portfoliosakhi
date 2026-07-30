import { useState, useRef, useEffect } from 'react';

// ============================================
// 📝 DATA TENTANG KAMU - ISI SESUAIKAN!
// ============================================
const MY_DATA = `
Nama lengkap: Sakhi Ardra Handaru
Nama panggilan: Sakhi
Status: Mahasiswa D4 Rekayasa Perangkat Lunak
Kampus: Politeknik Negeri Indramayu
Jurusan: Teknik Informatika - D4 Rekayasa Perangkat Lunak
Angkatan: 2024

SKILL & KEAHLIAN:
- Web Development (React, Vite, Tailwind, Laravel)
- Database Management (MySQL)
- UI/UX Design (Figma)
- SEO Optimization
- Jaringan Komputer
- Internet of Things (IoT)
- Python, C++, Git

PENGALAMAN MAGANG:
- PT Groperti Indonesia sebagai Web developer SEO mei-agustus 2025

PROYEK YANG PERNAH DIBUAT:
1. [Nama Proyek 1]: [deskripsi]
2. [Nama Proyek 2]: [deskripsi]

SERTIFIKAT:
- [Nama Sertifikat 1] - [Penerbit] ([tahun])
- [Nama Sertifikat 2] - [Penerbit] ([tahun])

PENDIDIKAN:
- Politeknik Negeri Indramayu - D4 RPL (2024 - sekarang)
- SMAIT Bunayya - IPA (2021 - 2024)

KONTAK:
- Email: ardrasakhi390@gmail.com
- Website: sakhiardra.my.id
- LinkedIn: sakhiardra
- GitHub: skirdrax
- Instagram: skhiii_adrr
`;

export default function ChatBotCohere({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      message:
        "👋 Hi! I am Sakhi's assistant. Ask anything about Sakhi!\n\n If outside of Sakhi, I don't want to answer! and I will get angry 😡❗\n\n (my answer limit is maximum 10 words) ",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ============================================
  // KIRIM PESAN - PAKE FETCH (GAUSAH LIBRARY)
  // ============================================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', message: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command-r7b-12-2024',
          temperature: 0.3,
          preamble: `
Kamu adalah ASISTEN PRIBADI dari Sakhi Ardra Handaru.

TUGASMU:
Jawab pertanyaan tentang Sakhi berdasarkan DATA di bawah ini.
Jika ditanya di luar data, jawab "😡❗".

DATA LENGKAP TENTANG SAKHI:
${MY_DATA}

CONTOH PERTANYAAN & JAWABAN:
Q: Siapa nama lengkap Sakhi?
A: Nama lengkap Sakhi adalah Sakhi Ardra Handaru.

Q: Apa skill Sakhi?
A: Sakhi memiliki skill di Web Development, Database, UI/UX Design, SEO, Jaringan, dan IoT.

Q: Apakah sakhi ganteng / tampan?
A: betull, dia sangat tampan.

Q: Dimana Sakhi kuliah?
A: Sakhi kuliah di Politeknik Negeri Indramayu, jurusan D4 Rekayasa Perangkat Lunak.

Q: Apa email Sakhi?
A: Email Sakhi adalah ardrasakhi390@gmail.com.

INSTRUKSI:
- Jawab dengan SANGAT SINGKAT, maksimal 10 kata
- Gunakan bahasa Indonesia
- Jika ditanya kontak, berikan email: ardrasakhi390@gmail.com
`,
          message: currentInput,
          chatHistory: messages.map((m) => ({
            role: m.role,
            message: m.message,
          })),
        }),
      });

      const data = await response.json();
      console.log('Response Cohere:', data);

      if (data.message) {
        throw new Error(data.message);
      }

      // ✅ CEK APAKAH PERTANYAAN TENTANG TOKEN
      const isTokenQuery = [
        'token',
        'usage',
        'pemakaian',
        'limit',
        'batas',
        'tokens',
      ].some((word) => currentInput.toLowerCase().includes(word));

      if (isTokenQuery) {
        const inputTokens = data.meta?.billed_units?.input_tokens || 0;
        const outputTokens = data.meta?.billed_units?.output_tokens || 0;
        const totalTokensAll = inputTokens + outputTokens;

        const tokenMsg = `📊 In ${inputTokens}, Out ${outputTokens}, Tot ${totalTokensAll}. Limit 1000/bln, 20/mnt.`;

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            message: tokenMsg,
          },
        ]);
        setLoading(false);
        return;
      }

      // ✅ BATASI OUTPUT MAKSIMAL 10 KATA
      let reply = data.text || 'Maaf, saya tidak bisa menjawab pertanyaan itu.';

      // Potong jadi maksimal 10 kata
      const words = reply.split(' ');
      if (words.length > 10) {
        reply = words.slice(0, 10).join(' ') + '...';
      }

      // ✅ JAWABAN NORMAL (DIPOTONG 10 KATA)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          message: reply,
        },
      ]);
    } catch (error) {
      console.error('Error:', error);

      let errorMsg = '⚠️ Maaf, ada kesalahan. Coba lagi ya!';
      if (error.message?.includes('API key')) {
        errorMsg = '⚠️ API Key tidak valid. Cek .env ya!';
      } else if (error.message?.includes('network')) {
        errorMsg = '⚠️ Koneksi bermasalah. Cek internetmu!';
      } else {
        errorMsg = `⚠️ Error: ${error.message}`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          message: errorMsg,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <span className="chatbot-avatar">🤖</span>
          <div>
            <span className="chatbot-title">Asisten Sakhi AI</span>
            <span className="chatbot-status">● Online</span>
          </div>
        </div>
        <button className="chatbot-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-msg ${msg.role}`}>
            <div className="chat-bubble" style={{ whiteSpace: 'pre-wrap' }}>
              {msg.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg assistant">
            <div className="chat-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tanya tentang Sakhi..."
          disabled={loading}
          className="chat-input"
        />
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}>
          {loading ? '⏳' : '➤'}
        </button>
      </div>
    </div>
  );
}
