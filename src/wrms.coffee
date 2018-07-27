# Description:
#   WRMS functionality for Hubot
#
# Dependencies:
#   None
#
# Configuration:
#   HUBOT_WRMS_URL=https://wrms.example.org
#   HUBOT_WRMS_USERNAME=yourusername
#   HUBOT_WRMS_PASSWORD=yourpassword#
#
# Commands:
#   hubot wrms me <issue-id> - Show the issue status
#
module.exports = (robot) ->

  # Simply respond with the WRMS URL
  robot.respond /wrms me (?:issue )?(?:#)?(\d+)/i, (msg) ->
    id = msg.match[1]
    msg.reply "#{process.env.HUBOT_WRMS_URL}/#{id}"
