document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.navlinks');
  if (navToggle && navLinks) {
    function setMenu(open) {
      navLinks.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    navToggle.addEventListener('click', function () {
      setMenu(!navLinks.classList.contains('is-open'));
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  document.querySelectorAll('.video video').forEach(function(video) {
    var holder = video.closest('.video');
    if (!holder || holder.querySelector('.big-play-button')) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'big-play-button';
    button.setAttribute('aria-label', 'Click or tap to play video');
    button.innerHTML = '<span class="play-icon">▶</span><span class="play-label">CLICK OR TAP<br>TO PLAY</span>';
    holder.appendChild(button);

    button.addEventListener('click', function() {
      video.muted = false;
      video.volume = 1;
      video.play().catch(function () { button.style.display = 'flex'; });
    });

    video.addEventListener('play', function() {
      button.style.display = 'none';
    });

    video.addEventListener('pause', function() {
      if (video.currentTime < video.duration && !video.ended) {
        button.style.display = 'flex';
      }
    });

    video.addEventListener('ended', function() {
      button.style.display = 'flex';
      button.innerHTML = '<span class="play-icon">↻</span><span class="play-label">CLICK OR TAP<br>TO REPLAY</span>';
    });

    video.addEventListener('seeking', function() {
      if (!video.paused) button.style.display = 'none';
    });
  });
});
