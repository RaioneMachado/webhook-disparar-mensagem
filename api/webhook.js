import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const data = req.body;

  if (data.order_status === "paid") {
    const phone = data.Customer?.mobile?.replace(/\D/g, "");
    const nome = data.Customer?.first_name || "músico";

    const message = `🎉 Parabéns, ${nome}😃\n\nSeu pagamento já foi aprovado ✅\n\nVocê já vai receber seu acesso ao *Partituras Piano* com os links abaixo.\n\n🎵 BONUS PARTITURAS FACILITADAS PIANO-TECLADO\nhttps://drive.google.com/drive/folders/1Hk3k32sAew91iVdKt_IdHdqJXhCgBGOz\n\n🎵 BONUS +1000 PARTITURAS TECLADO-PIANO\nhttps://drive.google.com/drive/folders/1xwoabQpdaueUuScxoTyk_LcLNYxqcN95\n\n🎵 10000+ PARTITURAS PIANO-TECLADO\nhttps://drive.google.com/drive/folders/16PIjcnkOwwAakX6DtRy2Vvk9n7whjnfm\n\n🎵 PLAYBACKS MÚSICAS PIANO-TECLADO\nhttps://drive.google.com/drive/folders/1jmbEgtSOLuv-0wD8RC7AmfpjWpU0mnrI\n\nObrigado pela preferência, conte com a gente!`;

    try {
      await axios.post(
        "https://api.z-api.io/instances/3E9DA031E52651F11A9BCEE0FE05F6ED/token/83567A2EACC8EBC3DFE25CAD/send-text",
        {
          phone: phone,
          message: message,
        }
      );
      console.log("✅ Mensagem enviada para", phone);
    } catch (error) {
      console.error("❌ Erro ao enviar mensagem:", error.message);
    }
  }

  res.status(200).json({ status: "ok" });
}

