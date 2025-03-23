
<div class="p-4">
  <div class="boujee-text text-center w-full font-bold text-2xl">
    Crip Dough
  </div>

  <button class="border-1 shadow-md p-2 rounded-md active:scale-95 active:bg-stone-800 active:text-stone-200 transition-all duration-300 ease-in-out">
    log in 
  </button>


</div>

<style>
  .boujee-text {
    --bg-size: 400%;
    --color-one: hsl(134, 64%, 53%);
    --color-two: hsl(206, 57%, 62%);
    font-size: clamp(3rem, 25vmin, 8rem);
    background: linear-gradient(
                  90deg,
                  var(--color-one),
                  var(--color-two),
                  var(--color-one)
                ) 0 0 / var(--bg-size) 100%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: move-bg 8s infinite linear;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
</style>
