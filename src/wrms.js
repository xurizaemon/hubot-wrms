// Description:
//   WRMS functionality for Hubot
//
// Dependencies:
//   None
//
// Configuration:
//   HUBOT_WRMS_URL=https://wrms.example.org
//   HUBOT_WRMS_USERNAME=yourusername
//   HUBOT_WRMS_PASSWORD=yourpassword//
//
// Commands:
//   hubot wrms me <issue-id> - Show the issue status

module.exports = function(robot) {
  const creds = {
    endpoint: process.env.HUBOT_WRMS_URL,
    username: process.env.HUBOT_WRMS_USERNAME,
    password: process.env.HUBOT_WRMS_PASSWORD
  }
  const WRMS = require('wrms')
  const wrms = new WRMS(creds)

  robot.respond(/wrms me (?:issue )?(?:#)?(\d+)/i, (msg) => {
    const id = msg.match[1]
    msg.reply(`${process.env.HUBOT_WRMS_URL}/${id}`)
  })

  robot.respond(/wrms search (.*)$/i, (msg) => {
    const params = { q: msg.match[1] }
    wrms.work_request.search(params)
      .then((res) => {
        if (!res.response.body.length) {
          msg.reply('No results')
        }
        else {
          let reply = `${res.response.body.length} results:\n`
          res.response.body.forEach(result => {
            reply += `* [${result.description}](${creds.endpoint}/${result.request_id})\n`
          })
          msg.reply(reply)
        }
      })
  })
}
