// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
(function ($) {
  "use strict";
  $(window).on("load", function () {
    $("#preloader").fadeOut("slow");
  });
  $(document).ready(function () {
    // var bannerCarousel = document.querySelector("#bannerCarousel");
    var bannerCarousel = $("#bannerCarousel");
    if (bannerCarousel.length) {
      var carousel = new bootstrap.Carousel(bannerCarousel, {
        interval: 4000,
        pause: "hover",
        wrap: false,
      });
    }

  });
  $(document).mouseup(function (e) { });
  window.addEventListener("mouseover", function (e) {
    var container = $("name");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      //code here
    }
  });
  window.addEventListener("load", function () { });
})(window.jQuery);
