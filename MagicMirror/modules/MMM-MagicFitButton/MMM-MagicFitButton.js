Module.register("MMM-MagicFitButton", {
  defaults: {
    url: "http://localhost:4200/",
  },

  start: function() {
    Log.info("Starting module: " + this.name);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = `
      padding: 10px;
      text-align: center;
    `;

    var button = document.createElement("button");
    button.innerHTML = "Accéder à MagicFit";
    button.style.cssText = `
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    `;

    button.onmouseover = () => {
      button.style.backgroundColor = '#0056b3';
    };

    button.onmouseout = () => {
      button.style.backgroundColor = '#007bff';
    };

    button.onclick = () => {
      // Envoyer une notification pour afficher l'interface MagicFit
      this.sendNotification("MAGICFIT_SHOW_INTERFACE", {});
    };

    wrapper.appendChild(button);
    return wrapper;
  },

  notificationReceived: function(notification, payload, sender) {
    if (notification === "MAGICFIT_HIDE_INTERFACE") {
      // Le bouton peut réagir si nécessaire
    }
  },
});
