<template>
  <div class="carousel">
    <div class="carousel-wrapper">
      <button @click="prevImage" class="nav-button left-nav">&lt;</button>
      <transition-group
        :name="transitionName"
        tag="div"
        class="carousel-container"
      >
        <div
          class="carousel-item"
          v-for="(img, index) in visibleImages"
          :key="img.id"
        >
          <img :src="img.src" :alt="`Image ${index}`" class="image" />
          <!-- <div class="caption">{{ img.caption }}</div> -->
        </div>
      </transition-group>
      <button @click="nextImage" class="nav-button right-nav">&gt;</button>
    </div>
    <div class="indicators">
      <span
        v-for="(img, index) in images"
        :key="img.id"
        class="indicator"
        :class="{ active: index === currentIndex }"
        @click="setIndex(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 1,
          src: require("@/assets/images/SiteRules.jpg"),
        },
        {
          id: 2,
          src: require("@/assets/images/Carousel1.jpg"),
        },
        {
          id: 3,
          src: require("@/assets/images/FycSxeNWAAIrQPM.jpg"),
        },
      ],
      currentIndex: 0,
      slideDirection: "slide-right",
      timer: null, 
      intervalDuration: 5000,
    };
  },
  computed: {
    transitionName() {
      return this.slideDirection;
    },
    visibleImages() {
      return [this.images[this.currentIndex]];
    },
  },
  methods: {
    nextImage() {
      this.slideDirection = "slide-left";
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.slideDirection = "slide-right";
      this.currentIndex =
        (this.currentIndex + this.images.length - 1) % this.images.length;
    },
    setIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 90%;
  height: 650px;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fbf6f0;
  border: #fbf6f0 solid 20px;
}
.carousel-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin: auto;
}
.nav-button {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fbf6f0;
  color: #333;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight:600;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
}
.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.left-nav {
  left: 30px;
}
.right-nav {
  right: 30px;
}
.carousel-container {
  display: flex;
}
.carousel-item {
  min-width: 100%;
  transition: transform 0.3s ease-in-out;
}
.image {
  width: 100%;
  display: block;
  height: 600px;
  object-fit: fill;
}
.caption {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}
.indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.indicator {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #fbf6f0;
  margin: 0 5px;
  border-radius: 50%;
  cursor: pointer;
}
.indicator.active {
  background-color: #c69f76;
}
/*查看下一張圖片*/
.slide-left-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/*查看上一張圖片 */
.slide-right-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
