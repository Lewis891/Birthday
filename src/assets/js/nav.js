(() => {
    const nav = document.querySelector("#cs-navigation");
    if (!nav) return;

    const onScroll = () => nav.classList.toggle("cs-scrolled", window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();
