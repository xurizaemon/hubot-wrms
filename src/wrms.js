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

const creds = {
  endpoint: process.env.HUBOT_WRMS_URL,
  username: process.env.HUBOT_WRMS_USERNAME,
  password: process.env.HUBOT_WRMS_PASSWORD
}

module.exports = function(robot) {
    robot.respond(/wrms me (?:issue )?(?:#)?(\d+)/i, function(msg){
        const id = msg.match[1]
        msg.reply(`${process.env.HUBOT_WRMS_URL}/${id}`)
    });
}
