<template>
  <div className="outer">
    <div className="gradient"></div>
    <div className="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.outer {
  position: relative;
  overflow: hidden;
  border-radius: 0.4rem;
  padding: 4px;
  width: 100%;
  background: linear-gradient(100.41deg, #6366f1 0.52%, #43a756 100.52%);
  transform: translateZ(0);

  &.shadow {
    box-shadow: 0 5px 18px rgb(122 121 121 / 42%);
  }

  .content {
    position: relative;
    z-index: 1;
    min-height: 50px;
    border-radius: 0.3rem;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  @keyframes running_shadow {
    0% {
      transform: translateY(-25%) translateX(40%) rotate(0deg);
    }
    30% {
      transform: translateY(0) translateX(0) rotate(90deg) scaleX(0.7);
    }
    50% {
      transform: translateY(-25%) translateX(-40%) rotate(180deg);
    }
    70% {
      transform: translateY(0) translateX(0) rotate(270deg) scaleX(0.7);
    }
    100% {
      transform: translateY(-25%) translateX(40%) rotate(1turn);
    }
  }

  .gradient {
    position: absolute;
    height: 100%;
    border-radius: 0.4rem;
    filter: blur(8px);
    inset: 0;
    transform-origin: center;
    will-change: transform;
    background: conic-gradient(
      transparent 50deg,
      rgba(255, 255, 255, 0.6) 80deg,
      transparent 100deg
    );
    animation: running_shadow -0.64s linear 4s infinite;
  }
}
</style>
