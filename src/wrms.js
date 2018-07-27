// Description:
//   WRMS functionality for Hubot
//
// Dependencies:
//   None
//
// Configuration:
//   HUBOT_WRMS_URL=https://wrms.example.org
//   HUBOT_WRMS_USERNAME=yourusername
//   HUBOT_WRMS_PASSWORD=yourpassword
//   HUBOT_WRMS_SEARCH_MAX=25
//
// Commands:
//   hubot wrms me <issue-id> - Show the issue status
//   hubot search wrms <term> - Searches WRMS for <term>, returns up to HUBOT_WRMS_SEARCH_MAX results

module.exports = function(robot) {
  const creds = {
    endpoint: process.env.HUBOT_WRMS_URL,
    username: process.env.HUBOT_WRMS_USERNAME,
    password: process.env.HUBOT_WRMS_PASSWORD
  }
  const config = {
    url: process.env.HUBOT_WRMS_URL,
    search_max: process.env.HUBOT_WRMS_SEARCH_MAX || 25
  }
  const WRMS = require('wrms')
  const wrms = new WRMS(creds)

  robot.respond(/wrms me (?:issue )?(?:#)?(\d+)/i, (msg) => {
    const id = msg.match[1]
    msg.reply(`${process.env.HUBOT_WRMS_URL}/${id}`)
  })

  robot.hear(/(wrms search|search wrms( for)?) (.*)$/i, (msg) => {
    const query = msg.match[3]
    const params = {
      q: query,
      limit: config.search_max
    }
    msg.reply(`Searching WRMS for "${msg.match[3]}"`)
    wrms.work_request.search(params)
      .then((res) => {
        robot.logger.debug(res, 'res')
        if (!res.response.body.length) {
          msg.reply('No results')
        }
        else {
          let reply = [`${res.response.body.length} results for ${query}:`]
          if (res.response.body.length == config.search_max) {
            reply.push(`(showing first ${config.search_max} results only, try a more specific search?)`)
          }
          res.response.body.forEach(result => {
            reply.push(`* ${result.description} - ${creds.endpoint}/${result.request_id}`)
          })
          msg.reply(reply.join('\n'))
        }
      })
  })
}
