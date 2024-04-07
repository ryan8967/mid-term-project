<template>
    <div class="carousel">
        <div class="carousel-wrapper">
            <button @click="prevImage" class="nav-button left-nav">&lt;</button>
            <transition-group :name="transitionName" tag="div" class="carousel-container">
            <div class="carousel-item" v-for="(img, index) in visibleImages" :key="img.id">
                <img :src="img.src" :alt="`Image ${index}`" class="image">
                <div class="caption">{{ img.caption }}</div>
            </div>
            </transition-group>
            <button @click="nextImage" class="nav-button right-nav">&gt;</button>
        </div>
        <div class="indicators">
            <span v-for="(img, index) in images" :key="img.id" class="indicator" :class="{ active: index === currentIndex }" @click="setIndex(index)"></span>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
        images: [
            { id: 1, src: 'https://www.twarchitect.org.tw/web2015/wp-content/uploads/2021/10/202110a4-1.jpg' },
            { id: 2, src: 'https://www.twarchitect.org.tw/web2015/wp-content/uploads/2021/10/202110a4-2.jpg' },
            { id: 3, src: 'https://www.twarchitect.org.tw/web2015/wp-content/uploads/2021/10/202110a4-3.jpg' },
        ],
            currentIndex: 0,
            slideDirection: 'slide-right',
        };
    },
    computed: {
        transitionName() {
            return this.slideDirection;
        },
        visibleImages() {
            return [this.images[this.currentIndex]];
        }
    },
    methods: {
        nextImage() {
            this.slideDirection = 'slide-left';
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevImage() {
            this.slideDirection = 'slide-right';
            this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
        },
        setIndex(index) {
            this.currentIndex = index;
        }
    }
};
</script>
  
<style scoped>
.carousel {
position: relative;
max-width: 1200px;
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
position: absolute;
top: 50%;
transform: translateY(-50%);
background-color: #fbf6f0; 
color: #333; 
border: none;
border-radius: 50%; 
cursor: pointer;
width: 40px; 
height: 40px; 
display: flex;
align-items: center;
justify-content: center;
font-size: 24px; 
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); 
}
.nav-button:hover {
background-color: rgba(255, 255, 255, 0.7);
}
.left-nav {
left: 40px;
}
.right-nav {
right: 40px;
}
.carousel-container {
display: flex;
}
.carousel-item {
min-width: 100%;
transition: transform 0.5s ease-in-out;
}
.image {
width: 100%;
display: block;
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
width: 10px;
height: 10px;
background-color: #fbf6f0;
margin: 0 5px;
border-radius: 50%;
cursor: pointer;
}
.indicator.active {
background-color: #C69F76;
}
/*查看下一張圖片*/ 
.slide-left-enter-active, .slide-right-leave-active {
transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-left-enter, .slide-right-leave-to {
transform: translateX(100%);
opacity: 0;
}

/*查看上一張圖片 */
.slide-right-enter-active, .slide-left-leave-active {
transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-right-enter, .slide-left-leave-to {
transform: translateX(-100%);
opacity: 0;
}
</style>
  
  