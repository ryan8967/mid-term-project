<template>
  <div class="wrapper">
    <div class="container">
      <div class="top">
        <img :src="img" :alt="productName" />
      </div>
      <div class="bottom" :class="{ clicked: isClicked }">
        <div class="left">
          <div class="details">
            <h1>{{ productName }}</h1>
            <h2>{{ productColor }} , £{{ productPrice }}</h2>
          </div>
          <div class="buy" v-on:click="handleBuyClick()">
            <i class="material-icons">add to cart</i>
          </div>
        </div>
        <div class="right">
          <div class="done"><i class="material-icons">done</i></div>
          <div class="details">
            <h1>{{ productName }}</h1>
            <p>Added to your cart</p>
          </div>
          <div class="remove">
            <i class="material-icons" v-on:click="handleRemoveClick()">Okay</i>
          </div>
        </div>
      </div>
    </div>
    <div class="inside">
      <div class="icon"><i class="material-icons">info</i></div>
      <div class="contents">
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: [
    "id",
    "catergory",
    "productName",
    "productColor",
    "description",
    "productPrice",
    "productImg",
  ],
  data() {
    return {
      isClicked: false,
      img: "",
    };
  },
  created() {
    this.img = require(`../../../public/ProductImg/${this.productImg}`);
  },
  methods: {
    handleBuyClick() {
      if (localStorage.getItem("mode") === "in") {
        this.isClicked = true; // Set isClicked to true when buy button is clicked
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        axios.post(
          "http://localhost:3000/addcart/" + user,
          {
            userName: user,
            productId: this.id,
            productName: this.productName,
            productColor: this.productColor,
            description: this.description,
            productPrice: this.productPrice,
            productImg: this.productImg,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adding token to headers
            },
          }
        );
      } else {
        this.$router.push("/auth");
      }
    },
    handleRemoveClick() {
      this.isClicked = false; // Set isClicked to false when remove button is clicked
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: inline-block;
  width: 400px;
  height: 800px;
  background: white;
  margin: 3rem 3rem;
  position: relative;
  overflow: hidden;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0;
  font-size: small;
  transform: scale(0.9);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover {
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.2);
  }

  .container {
    width: 100%;
    height: 100%;
    .top {
      background-color: #ffffff;
      height: 80%;
      width: 100%;
      -webkit-background-size: 100%;
      -moz-background-size: 100%;
      -o-background-size: 100%;
      background-size: 100%;
      display: flex; /* Add this */
      justify-content: center; /* Add this */
    }
    .top img {
      height: 90%;
      object-fit: cover;
    }
    .bottom {
      width: 200%;
      height: 20%;
      transition: transform 0.5s;
      &.clicked {
        transform: translateX(-50%);
      }
      h1 {
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0;
        padding: 0;
      }
      .left {
        height: 100%;
        width: 50%;
        background: #f4f4f4;
        position: relative;
        float: left;
        .details {
          padding: 8px;
          float: left;
          width: 70%;
        }
        .buy {
          text-wrap: balance;
          display: inline-block;
          width: calc(30%);
          height: 100%;
          background: #f1f1f1;
          transition: background 0.5s;
          padding: 20px;
          border-left: solid thin rgba(0, 0, 0, 0.1);
          i {
            font-size: 20px;
            padding: 10px;
            color: #254053;
            transition: transform 0.5s;
          }
          &:hover {
            background: #a6cdde;
          }
          &:hover i {
            transform: translateY(5px);
            color: #00394b;
          }
        }
      }
      .right {
        width: 50%;
        background: #a6cdde;
        color: white;
        float: right;
        height: 200%;
        overflow: hidden;
        .details {
          padding: 20px;
          float: right;
          width: calc(70% - 40px);
        }
        .done {
          width: calc(30% - 2px);
          float: left;
          transition: transform 0.5s;
          border-right: solid thin rgba(255, 255, 255, 0.3);
          height: 50%;
          i {
            font-size: 30px;
            padding: 30px;
            color: white;
          }
        }
        .remove {
          width: calc(30% - 1px);
          clear: both;
          border-right: solid thin rgba(255, 255, 255, 0.3);
          height: 50%;
          background: #6194b8;
          transition: transform 0.75s, background 0.75s;
          &:hover {
            background: #a6cdde;
          }
          &:hover i {
            transform: translateY(5px);
          }
          i {
            transition: transform 0.75s;
            font-size: 30px;
            padding: 30px;
            color: white;
          }
        }
        &:hover {
          .remove,
          .done {
            transform: translateY(-100%);
          }
        }
      }
    }
  }

  .inside {
    z-index: 9;
    background: #92879b;
    width: 140px;
    height: 140px;
    position: absolute;
    top: -70px;
    right: -70px;
    border-radius: 0px 0px 200px 200px;
    transition: all 0.5s, border-radius 2s, top 1s;
    overflow: hidden;
    .icon {
      position: absolute;
      right: 85px;
      top: 85px;
      color: white;
      opacity: 1;
    }
    &:hover {
      width: 100%;
      right: 0;
      top: 0;
      border-radius: 0;
      height: 80%;
      .icon {
        opacity: 0;
        right: 15px;
        top: 15px;
      }
      .contents {
        opacity: 1;
        transform: scale(1);
        transform: translateY(0);
      }
    }
    .contents {
      padding: 5%;
      opacity: 0;
      transform: scale(0.5);
      transform: translateY(-200%);
      transition: opacity 0.2s, transform 0.8s;
      table {
        text-align: left;
        width: 100%;
      }
      h1,
      p {
        color: rgb(0, 0, 0);
      }
      p {
        font-size: 18px;
      }
    }
  }
}
</style>
