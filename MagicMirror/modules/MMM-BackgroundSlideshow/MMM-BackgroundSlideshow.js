Module.register("MMM-BackgroundSlideshow", {
  defaults: {
    imagePaths: ["modules/MMM-BackgroundSlideshow/exampleImages/"],
    transitionImages: true,
    randomizeImageOrder: true,
    slideshowSpeed: 2000,
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.currentImageIndex = 0;
    this.images = this.getImages();
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    this.updateDom();
    setTimeout(() => {
      this.scheduleUpdate();
    }, this.config.slideshowSpeed);
  },

  getImages: function() {
    var paths = this.config.imagePaths || [];
    if (paths.length === 0) {
      return ["modules/MMM-BackgroundSlideshow/exampleImages/1.png"];
    }
    return paths.map(function(p) {
      return p.startsWith("/") ? p : "/" + p;
    });
  },

  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    `;

    var img = document.createElement("img");
    img.src = this.images[this.currentImageIndex];
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    wrapper.appendChild(img);

    // Cycle to next image
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;

    return wrapper;
  },
});
