const cors = require("cors");
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
    const { color, title, url, authorIconUrl, authorUrl, author, description, thumbnail, fields, imageUrl, footer, footerUrl } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Missing required embed fields: title and description are mandatory." });
    }

    try {
        const embed = new EmbedBuilder();

        if (color) embed.setColor(parseInt(color.replace("#", ""), 16));
        if (title) embed.setTitle(title);
        if (url) embed.setURL(url);
        if (author) embed.setAuthor({ name: author, iconURL: authorIconUrl || undefined, url: authorUrl || undefined });
        if (description) embed.setDescription(description);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (fields && Array.isArray(fields)) embed.addFields(fields);
        if (imageUrl) embed.setImage(imageUrl);
        embed.setTimestamp(new Date());
        if (footer) embed.setFooter({ text: footer, iconURL: footerUrl || undefined });

        const channel = await bot.channels.fetch(CHANNEL_ID);
        if (!channel || !channel.isTextBased()) {
            return res.status(404).json({ error: "Channel not found or is not text-based." });
        }

        await channel.send({ embeds: [embed] });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error sending embed:", err.message || err);
        res.status(500).json({ error: "Failed to send embed. Please check the server logs for more details." });
    }
});

bot.once("ready", () => console.log(`Bot ready as ${bot.user.tag}`));
bot.login(DISCORD_TOKEN);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
