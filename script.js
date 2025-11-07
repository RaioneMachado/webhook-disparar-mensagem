import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// 🔗 Configurações da UltraMsg
const INSTANCE_ID = "instance149170";
const TOKEN = "lztlxn4dhrkzw19j";

// 🧩 Endpoint que a Kiwify vai chamar quando uma compra for aprovada
app.post("/webhook", async (req, res) => {
  const data = req.body;
  console.log("📩 Webhook recebido:", data);

  // Verifica se o pagamento foi aprovado e o cliente tem celular
  if (data?.order_status === "paid" && data?.Customer?.mobile) {
    const phone = data.Customer.mobile.replace(/\D/g, ""); // remove tudo que não é número
    const firstName = data.Customer.first_name || "músico";

    // 📝 Mensagem personalizada enviada ao cliente
    const message = `🎉 Parabéns, ${firstName} 😃
Seu pagamento já foi aprovado ✅

Você já vai receber seu acesso ao *Partituras Piano* com os links abaixo:

🎹 BONUS PARTITURAS FACILITADAS PIANO-TECLADO  
https://drive.google.com/drive/folders/1Hk3k32sAew91iVdKt_IdHdqJXhCgBGOz

🎼 BONUS +1000 PARTITURAS TECLADO-PIANO  
https://drive.google.com/drive/folders/1xwoabQpdaueUuScxoTyk_LcLNYxqcN95

🎵 10000+ PARTITURAS PIANO-TECLADO  
https://drive.google.com/drive/folders/16PIjcnkOwwAakX6DtRy2Vvk9n7whjnfm

🎧 PLAYBACKS MÚSICAS PIANO-TECLADO  
https://drive.google.com/drive/folders/1jmbEgtSOLuv-0wD8RC7AmfpjWpU0mnrI

Obrigado pela preferência, conte com a gente! 🎶`;

    try {
      // Envia a mensagem pela UltraMsg
      const response = await axios.post(
        `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat?token=${TOKEN}`,
        {
          to: phone,
          body: message,
        }
      );

      console.log(`✅ Mensagem enviada com sucesso para ${phone}`);
      console.log("📤 Resposta da API:", response.data);
    } catch (error) {
      console.error("❌ Erro ao enviar mensagem:", error.message);
      if (error.response) {
        console.error("Detalhes:", error.response.data);
      }
    }
  } else {
    console.log("⚠️ Webhook recebido, mas não é um pagamento aprovado ou faltam dados do cliente.");
  }

  res.sendStatus(200);
});

// 🚀 Porta local (ignorada na Vercel)
app.listen(3000, () => console.log("🚀 Webhook rodando na porta 3000"));
