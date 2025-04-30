const express = require("express");
const path = require("path");
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { DISCORD_TOKEN, CHANNEL_ID } = require("https://sflightx.com/resources/serviceAuth/initializeDiscord.js");

const app = express();
const PORT = 3000;

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

app.use(express.json());
app.use("/manifest", express.static(path.join(__dirname, "manifest")));
app.use("/resources", express.static(path.join(__dirname, "resources")));

app.get("/", (req, res) => {
  res.redirect("/manifest/index.html");
});

app.post("/send-embed", async (req, res) => {
  const { title, description, color, footerText, imageUrl, authorName } = req.body;

  if (!title || !description || !color || !footerText || !imageUrl || !authorName) {
    return res.status(400).json({ error: "Missing required embed fields" });
  }

  try {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(parseInt(color.replace("#", ""), 16))
      .setFooter({ text: footerText })
      .setImage(imageUrl)
      .setAuthor({ name: authorName })
      .setTimestamp(new Date());

    const channel = await bot.channels.fetch(CHANNEL_ID);
    await channel.send({ embeds: [embed] });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending embed:", err);
    res.status(500).json({ error: "Failed to send embed" });
  }
});

bot.once("ready", () => console.log(`Bot ready as ${bot.user.tag}`));
bot.login(DISCORD_TOKEN);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
