var body = document.querySelector("body");
document.onreadystatechange = function () {
  animateValue(".preloader_calculation", 1, 100, 1000);
  if (document.readyState === "complete") {
    body.style.overflow = "hidden"
    setTimeout(function () {
      document.querySelector('.preloader').style.height = 0
      document.querySelector('.preloader').style.paddingTop = 0
      body.style.overflow = "visible"
    }, 1500);
  }
};

function animateValue(className, start, end, duration) {
  if (start === end) return;
  const range = end - start;
  let current = start;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.querySelector(className);
  var timer = setInterval(function() {
      current ++;
      obj.innerHTML = current + '%';
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}