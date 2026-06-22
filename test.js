const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createParticle = (className, parent, count, setup) => {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = className;
    setup(particle, index);
    fragment.appendChild(particle);
  }

  parent.appendChild(fragment);
};

const buildScene = () => {
  const stars = document.querySelector(".stars");
  const petals = document.querySelector(".petal-field");
  const sparkles = document.querySelector(".sparkle-field");

  createParticle("star", stars, 120, (star) => {
    star.style.setProperty("--x", `${randomBetween(0, 100)}vw`);
    star.style.setProperty("--y", `${randomBetween(0, 68)}vh`);
    star.style.setProperty("--size", `${randomBetween(0.12, 0.44).toFixed(2)}vmin`);
    star.style.setProperty("--a", randomBetween(0.35, 1).toFixed(2));
    star.style.setProperty("--glow-a", randomBetween(0.25, 0.82).toFixed(2));
    star.style.setProperty("--d", `${randomBetween(2, 9).toFixed(2)}s`);
    star.style.setProperty("--delay", `${randomBetween(-9, 0).toFixed(2)}s`);
  });

  createParticle("petal-drift", petals, 34, (petal, index) => {
    const hue = [325, 285, 43, 176, 204][index % 5];
    const scale = randomBetween(0.46, 1.35);
    petal.style.setProperty("--x", `${randomBetween(-8, 108)}vw`);
    petal.style.setProperty("--w", `${(scale * 2.8).toFixed(2)}vmin`);
    petal.style.setProperty("--hgt", `${(scale * 5.2).toFixed(2)}vmin`);
    petal.style.setProperty("--r", `${randomBetween(-80, 80).toFixed(1)}deg`);
    petal.style.setProperty("--h", hue);
    petal.style.setProperty("--d", `${randomBetween(10, 22).toFixed(2)}s`);
    petal.style.setProperty("--delay", `${randomBetween(-22, 0).toFixed(2)}s`);
  });

  createParticle("sparkle", sparkles, 72, (sparkle) => {
    const size = randomBetween(0.35, 1.25);
    sparkle.style.setProperty("--x", `${randomBetween(2, 98)}vw`);
    sparkle.style.setProperty("--y", `${randomBetween(42, 96)}vh`);
    sparkle.style.setProperty("--size", `${(size * 0.9).toFixed(2)}vmin`);
    sparkle.style.setProperty("--glow-a", `${(size * 1).toFixed(2)}vmin`);
    sparkle.style.setProperty("--glow-b", `${(size * 2.6).toFixed(2)}vmin`);
    sparkle.style.setProperty("--d", `${randomBetween(2.5, 6.5).toFixed(2)}s`);
    sparkle.style.setProperty("--delay", `${randomBetween(-6.5, 0).toFixed(2)}s`);
  });
};

const updatePointerGlow = (clientX, clientY) => {
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;
  document.body.style.setProperty("--pointer-x", `${(x * 100).toFixed(1)}%`);
  document.body.style.setProperty("--pointer-y", `${(y * 100).toFixed(1)}%`);
};

window.addEventListener("load", () => {
  buildScene();

  window.addEventListener("pointermove", (event) => {
    updatePointerGlow(event.clientX, event.clientY);
  });

  const countdownNumber = document.querySelector(".countdown-number");
  let secondsLeft = 10;

  countdownNumber.textContent = secondsLeft;

  const finishIntro = () => {
    countdownNumber.textContent = "0";
    document.body.classList.remove("not-loaded");
    document.body.classList.add("is-loaded", "intro-revealing");
    clearInterval(countdown);

    setTimeout(() => {
      document.body.classList.remove("intro-running");
      document.body.classList.add("intro-complete");
    }, 1800);
  };

  const countdown = setInterval(() => {
    secondsLeft -= 1;
    countdownNumber.textContent = Math.max(secondsLeft, 0);

    if (secondsLeft <= 0) {
      finishIntro();
    }
  }, 1000);
});
