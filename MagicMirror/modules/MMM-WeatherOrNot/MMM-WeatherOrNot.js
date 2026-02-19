Module.register("MMM-WeatherOrNot", {
  defaults: {
    location: "kenitra",
    locationCode: "34d25n6d59",
    languages: "fr",
    tempUnits: "C",
    font: "Tahoma",
    textColor: "#ffffff",
    htColor: "#ffffff",
    ltColor: "#00dfff",
    sunColor: "#febc2f",
    moonColor: "#dfdede",
    cloudColor: "#dfdede",
    cloudFill: "#1f567c",
    rainColor: "#93bffe",
    snowColor: "#dfdede",
    height: "230px",
    width: "380px",
    label: "Kenitra",
    label2: "Morocco",
    days: "7",
    theme: "dark",
    bgColor: "#000000",
    icons: "Climacons Animated",
    animationSpeed: 3000,
    updateInterval: 10 * 60 * 1000,
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    this.updateDom();
    setTimeout(() => {
      this.scheduleUpdate();
    }, this.config.updateInterval);
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = `
      height: ${this.config.height};
      width: ${this.config.width};
      background-color: ${this.config.bgColor};
      color: ${this.config.textColor};
      font-family: ${this.config.font};
      padding: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;

    var locationDiv = document.createElement("div");
    locationDiv.innerHTML = `<strong>${this.config.label}, ${this.config.label2}</strong>`;
    locationDiv.style.cssText = `text-align: center; margin-bottom: 10px;`;
    wrapper.appendChild(locationDiv);

    var weatherDiv = document.createElement("div");
    weatherDiv.innerHTML = `
      <div style="font-size: 24px; margin-bottom: 5px;">🌤️</div>
      <div style="font-size: 18px;">22°C</div>
      <div style="font-size: 14px; opacity: 0.8;">Ensoleillé</div>
    `;
    weatherDiv.style.cssText = `text-align: center;`;
    wrapper.appendChild(weatherDiv);

    return wrapper;
  },
});
