// WebSlides
var ws = new WebSlides({
    autoslide: false,
    changeOnClick: false,
    loop: true,
    minWheelDelta: 80,
    navigateOnScroll: true,
    scrollWait: 450,
    slideOffset: 50,
    showIndex: true
});
// HAMBURGLAR
var hamburgler = {
    checkNav: function () {
        if (document.body.classList.contains('hamburgler-active')) {
            hamburgler.closeNav();
        } else {
            hamburgler.openNav();
        }
    },
    closeNav: function () {
        document.body.classList.remove('hamburgler-active');
    },
    openNav: function () {
        document.body.classList.add('hamburgler-active');
    },
    init: function () {
        document.getElementById('hamburgler').addEventListener('click', hamburgler.checkNav);
        window.addEventListener("keyup", function (e) {
            if (e.keyCode == 27) hamburgler.closeNav();
        }, false);
    }
}
hamburgler.init();