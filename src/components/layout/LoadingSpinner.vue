<template>
    <div class="loading-spinner">
      <div class="hourglass"></div>
      <p>loading...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner'
  };
  </script>
  
  <style scoped>
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
  }
  
  .hourglass {
    width: 50px;
    height: 50px;
    border: 6px solid #cfaf8d;
    border-color: #cfaf8d transparent #cfaf8d transparent;
    animation: hourglass-spin 1.5s infinite;
  }
  
  @keyframes hourglass-spin {
    0% {
      transform: rotate(0);
      border-color: #cfaf8d transparent #cfaf8d transparent;
    }
    25% {
      border-color: transparent #c2b280 transparent #c2b280;
    }
    50% {
      transform: rotate(180deg);
      border-color: #cfaf8d transparent #cfaf8d transparent;
    }
    75% {
      border-color: transparent #c2b280 transparent #c2b280;
    }
    100% {
      transform: rotate(360deg);
      border-color: #cfaf8d transparent #cfaf8d transparent;
    }
  }
  
  p {
    margin-top: 10px;
    font-size: 18px;
    color: #cfaf8d;
  }
  </style>
  