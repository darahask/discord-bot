const DATA_VAR = "data"

require('dotenv').config(); //initialize dotenv
const { Client, Intents, MessageEmbed } = require('discord.js');
const getData = require('./scraper')
const localstore = require('local-storage')

//util functions
function getEmbed(data) {
    const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Covid Cases in India 🇮🇳')
        .setURL('https://www.mygov.in/covid-19')
        .setAuthor({ name: "By Darahas" })
        .setThumbnail('https://www.nic.in/wp-content/uploads/2019/11/mygov.jpg')
        .addFields(
            { name: 'Last Updated', value: data.date },
            { name: 'Total Cases', value: data.total, inline: true },
            { name: 'New Cases', value: data.newtotal, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Discharged', value: data.dis, inline: true },
            { name: 'Newly Discharged', value: data.newdis, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Deaths', value: data.death, inline: true },
            { name: 'New Deaths', value: data.newdeath, inline: true }
        )
        .setTimestamp()
    return exampleEmbed
}

function getDataFromStorage() {
    return JSON.parse(localstore.get(DATA_VAR))
}

async function doUpdate(url) {
    let data = await getData(url)
    localstore.set(DATA_VAR, JSON.stringify(data))
}

// Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Connected !!!');
});

client.on("messageCreate", async msg => {
    if (msg.content === '$info') {
        try {
            let data = getEmbed(getDataFromStorage())
            msg.channel.send({ embeds: [data] })
        } catch (err) {
            console.log(err)
        }
    }
    if (msg.content === '$update') {
        try {
            msg.reply("Please wait while i am updating data 😬")
            await doUpdate('https://www.mygov.in/covid-19');
            msg.reply("Succesfully Updated ✅")
        } catch (error) {
            console.log(error)
        }
    }
    if( msg.content === '$help'){
        msg.reply("$info -> To display information on covid in india\n$update -> To update the data")
    }
})

client.login(process.env.CLIENT_TOKEN);