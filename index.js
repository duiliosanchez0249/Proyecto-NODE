require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  // 👋 SALUDO
  if (message.content === '!hola') {
    message.reply('Hola crack 😎');
  }

  // 🪙 MONEDA
  if (message.content === '!moneda') {
    const resultado = Math.random() < 0.5 ? 'Cara 🪙' : 'Cruz 🪙';
    message.reply(`Resultado: ${resultado}`);
  }

  // 🤢 CHISTES RANCIOS
  if (message.content === '!chiste') {
    const chistes = [
      "¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝",
      "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter 🐦",
      "¿Qué le dijo el cero al ocho? Bonito cinturón 😂",
      "¿Cómo se despiden los químicos? Ácido un placer 🧪",
      "¿Qué hace una computadora en el gimnasio? ¡Ejercicios de byte! 💻"
    ];
    const random = chistes[Math.floor(Math.random() * chistes.length)];
    message.channel.send(`🤢 ${random}`);
  }

  // 🎮 ADIVINA EL NÚMERO
  if (message.content === "!adivina") {
    const numero = Math.floor(Math.random() * 10) + 1;
    message.channel.send("🎮 Adivina un número del 1 al 10");

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 15000 });

    collector.on("collect", m => {
      const intento = parseInt(m.content);
      if (intento === numero) {
        message.channel.send("🎉 ¡Correcto gallo!");
        collector.stop();
      } else {
        message.channel.send("❌ Nel, intenta otra vez");
      }
    });

    collector.on("end", collected => {
      if (collected.size === 0) {
        message.channel.send(`⌛ Se acabó el tiempo. Era ${numero}`);
      }
    });
  }

  // ✊ PIEDRA PAPEL TIJERA
  if (message.content === "!ppt") {
    const opciones = ["piedra", "papel", "tijera"];
    const bot = opciones[Math.floor(Math.random() * opciones.length)];

    message.channel.send("Escribe piedra, papel o tijera");

    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });

    collector.on("collect", m => {
      const jugador = m.content.toLowerCase();

      if (!opciones.includes(jugador)) {
        message.channel.send("❌ Opción inválida");
        return;
      }

      if (jugador === bot) {
        message.channel.send(`🤝 Empate, yo elegí ${bot}`);
      } else if (
        (jugador === "piedra" && bot === "tijera") ||
        (jugador === "papel" && bot === "piedra") ||
        (jugador === "tijera" && bot === "papel")
      ) {
        message.channel.send(`🎉 Ganaste, yo elegí ${bot}`);
      } else {
        message.channel.send(`💀 Perdiste, yo elegí ${bot}`);
      }
    });
  }

  // 📜 HELP
  if (message.content === '!help') {
    message.reply(`
🤖 Comandos disponibles:

!hola
!moneda
!chiste
!adivina
!ppt
!help
`);
  }

});

// 🔥 INICIAR BOT
client.login(process.env.TOKEN);
