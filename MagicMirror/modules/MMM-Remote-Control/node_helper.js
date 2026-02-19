const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {
    console.log("MMM-Remote-Control helper started...");
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "REMOTE_START") {
      // Handle remote control initialization
      this.sendSocketNotification("REMOTE_RESPONSE", { status: "started" });
    }
  },
});
