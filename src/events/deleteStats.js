const { CronJob } = require("cron");
const client = global.bot;
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const messageGuild = require("../schemas/messageGuild");
const voiceGuild = require("../schemas/voiceGuild");

const gorev = require("../schemas/invite");
const kayitg = require("../schemas/kayitgorev");
const mesaj = require("../schemas/mesajgorev");
const tagli = require("../schemas/taggorev");
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")

module.exports = () => {

  const gorevs = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
        await gorev.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { invite: 0 } }, { upsert: true });
        await kayitg.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { kayit: 0 } }, { upsert: true });
        await mesaj.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { mesaj: 0 } }, { upsert: true });
        await tagli.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { tagli: 0 } }, { upsert: true });
        });
      console.log(`Sunucudaki ${client.guilds.cache.get(conf.GuildID).memberCount} üyenin günlük görevleri başarıyla yüklendi. [00:00]`)
    });
  }, null, true, "Europe/Istanbul");
  gorevs.start();

  const daily = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: conf.GuildID }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: conf.GuildID }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: true });
          });
 });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: conf.GuildID }, { $set: { weeklyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: conf.GuildID }, { $set: { weeklyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
      await voiceUser.findOneAndUpdate({ guildID: conf.GuildID, userID: member.user.id }, { $set: { weeklyStat: 0 } }, { upsert: true });
        });
 });
  }, null, true, "Europe/Istanbul");
  weekly.start();
};

module.exports.conf = {
  name: "ready"
};
