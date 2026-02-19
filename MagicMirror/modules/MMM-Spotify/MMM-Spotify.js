Module.register("MMM-Spotify", {
  defaults: {
    contrôle: "caché",
  },

  start: function() {
    Log.info("Starting module: " + this.name);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = `
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 8px;
    `;

    var title = document.createElement("div");
    title.innerHTML = "<strong>Spotify</strong>";
    wrapper.appendChild(title);

    var status = document.createElement("div");
    status.innerHTML = "Module Spotify chargé";
    wrapper.appendChild(status);

    return wrapper;
  },
});
