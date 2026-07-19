(() => {
  const REASONS = [
    "The way you are interested in every part of me no matter how nerdy or weird it might be.",
    "How you are nice to people, no matter if they are being a cunt or not.",
    "How pretty you are, just stunning.",
    "How you fall asleep and then pretend that you didn't.",
    "The way you point out every single animal we see, even if they are ugly, you think they are cute.",
    "The way you make me feel comfortable even when I'm not at my best.",
    "How well you get along with my family even when they are being crazy or stupid.",
    "How you don't judge me or make me feel bad when I am being frugal with money.",
    "The fact that we can do absolutely nothing together and still have the best time.",
    "How emotionally intelligent you are.",
    "How you back me when I need it.",
    "How you call out my bullshit when I need it.",
    "That you have got a foot fetish now.",
    "The way your hair curls after a shower, it looks really good.",
    "The way you smell good all the time.",
    "How excited you get when you have tea to spill.",
    "That you and your family make me like I am apart of it.",
    "How you refuse to let me help you park your car.",
    "That you're my best friend.",
    "How easily I can spend a day doing nothing with you and still have the best time.",
    "How you try not to laugh at my jokes but I can still see you smiling.",
    "That all I want to do is make you happy and feel good. ;)",
    "How you say how much you love my cooking even when its meh.",
    "How you are'nt scared to show how much you love me.",
    "Simply put — you. All of you, exactly as you are.",
  ];

  const root = document.querySelector(".birthday");
  if (!root) return;

  const slideEl = document.getElementById("slide");
  const photoContainer = document.getElementById("photoContainer");
  const photoImg = document.getElementById("photo");
  const reasonNumberEl = document.getElementById("reasonNumber");
  const reasonTextEl = document.getElementById("reasonText");
  const counterEl = document.getElementById("counter");
  const dotsEl = document.getElementById("dots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const envelopeBtn = document.getElementById("envelopeBtn");
  const revealEl = document.getElementById("reveal");

  const state = { index: 0, animating: false };
  let photoRequestId = 0;

  function photoSrc(i) {
    return `assets/images/reasons/${i + 1}.jpg`;
  }

  function preloadPhotos() {
    REASONS.forEach((_, i) => {
      const img = new Image();
      img.src = photoSrc(i);
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });
  }

  function buildDots() {
    REASONS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "birthday__dot";
      dot.setAttribute("aria-label", `Go to reason ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  function updateDots() {
    Array.from(dotsEl.children).forEach((dot, i) => {
      dot.classList.toggle("birthday__dot--active", i === state.index);
    });
  }

  function renderContent() {
    const i = state.index;
    reasonNumberEl.textContent = `Reason #${i + 1}`;
    reasonTextEl.textContent = REASONS[i];
    counterEl.textContent = `${i + 1} / ${REASONS.length}`;
    photoImg.alt = `Photo of you two — reason ${i + 1}`;

    const requestId = ++photoRequestId;
    photoContainer.classList.add("birthday__photo--empty");
    photoImg.src = photoSrc(i);

    if (typeof photoImg.decode === "function") {
      photoImg.decode().then(() => {
        if (requestId === photoRequestId) {
          photoContainer.classList.remove("birthday__photo--empty");
        }
      }).catch(() => {});
    }

    updateDots();
  }

  function slide(dir, targetIndex) {
    if (state.animating) return;
    const nextIndex =
      targetIndex !== undefined
        ? targetIndex
        : (state.index + dir + REASONS.length) % REASONS.length;
    state.animating = true;

    slideEl.style.transition = "transform 220ms ease, opacity 220ms ease";
    slideEl.style.transform = `translateX(${-dir * 36}px)`;
    slideEl.style.opacity = "0";

    setTimeout(() => {
      state.index = nextIndex;
      renderContent();

      slideEl.style.transition = "none";
      slideEl.style.transform = `translateX(${dir * 36}px)`;
      slideEl.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          slideEl.style.transition =
            "transform 280ms cubic-bezier(.2,.8,.2,1), opacity 280ms ease";
          slideEl.style.transform = "translateX(0)";
          slideEl.style.opacity = "1";
          setTimeout(() => {
            state.animating = false;
          }, 280);
        });
      });
    }, 220);
  }

  function goNext() {
    slide(1);
  }

  function goPrev() {
    slide(-1);
  }

  function goTo(i) {
    if (i === state.index || state.animating) return;
    const dir = i > state.index ? 1 : -1;
    slide(dir, i);
  }

  function openEnvelope() {
    envelopeBtn.classList.add("birthday__envelope--opening");
    envelopeBtn.setAttribute("aria-expanded", "true");

    setTimeout(() => {
      envelopeBtn.hidden = true;

      revealEl.classList.add("birthday__reveal--shown");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealEl.classList.add("birthday__reveal--visible");
        });
      });

      setTimeout(() => {
        prevBtn.focus();
      }, 500);
    }, 550);
  }

  envelopeBtn.addEventListener("click", openEnvelope);
  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);
  photoImg.addEventListener("load", () => {
    photoContainer.classList.remove("birthday__photo--empty");
  });
  photoImg.addEventListener("error", () =>
    photoContainer.classList.add("birthday__photo--empty"),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  buildDots();
  renderContent();
  preloadPhotos();
})();
