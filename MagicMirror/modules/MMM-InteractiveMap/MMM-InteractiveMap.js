Module.register("MMM-InteractiveMap", {
  defaults: {
    url: "http://localhost:4200/",
    width: "100%",
    height: "100%",
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.isVisible = false;
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.id = "magicfit-interface-container";
    wrapper.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: ${this.isVisible ? 'block' : 'none'};
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.95);
    `;

    // Bouton de fermeture
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "✕";
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 20px;
      z-index: 1001;
    `;

    closeButton.onclick = () => {
      this.hideInterface();
    };

    wrapper.appendChild(closeButton);

    var iframe = document.createElement("iframe");
    iframe.src = this.config.url;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
    `;

    wrapper.appendChild(iframe);
    return wrapper;
  },

  notificationReceived: function(notification, payload, sender) {
    if (notification === "MAGICFIT_SHOW_INTERFACE") {
      this.showInterface();
    } else if (notification === "MAGICFIT_HIDE_INTERFACE") {
      this.hideInterface();
    }
  },

  showInterface: function() {
    this.isVisible = true;
    var container = document.getElementById("magicfit-interface-container");
    if (container) {
      container.style.display = 'block';
    }
    this.updateDom();
  },

  hideInterface: function() {
    this.isVisible = false;
    var container = document.getElementById("magicfit-interface-container");
    if (container) {
      container.style.display = 'none';
    }
    this.updateDom();
  },
});
