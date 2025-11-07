import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// Endpoint do webhook (a Kiwify vai chamar isso quando uma compra for aprovada)
app.post("/webhook", async (req, res) => {
  const data = req.body;

  console.log("Webhook recebido:", data);

  if (data?.order_status === "paid" && data?.Customer?.mobile) {
    const phone = data.Customer.mobile.replace(/\D/g, ""); // limpa o número
    const firstName = data.Customer.first_name || "músico";

    // Mensagem personalizada
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
      const response = await axios.post(
        "https://api.z-api.io/instances/3E9DA031E52651F11A9BCEE0FE05F6ED/token/83567A2EACC8EBC3DFE25CAD/send-text",
        {
          phone: phone,
          message: message,
        }
      );
      console.log("Mensagem enviada para", phone, response.data);
    } catch (error) {
      console.error("❌ Erro ao enviar mensagem:", error.message);
    }
  }

  res.sendStatus(200);
});

// Porta para rodar localmente (ignorada na Vercel)
app.listen(3000, () => console.log("🚀 Webhook rodando na porta 3000"));
