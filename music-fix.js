(function () {
  function safeMusicAction(action) {
    if (!window.backgroundMusicPlayer) return;
    if (typeof action === 'function') {
      action();
      return;
    }
  }

  function forceMusicVolume() {
    if (!window.backgroundMusicPlayer) return;

    if (typeof window.backgroundMusicPlayer.setVolume === 'function') {
      window.backgroundMusicPlayer.setVolume(80);
    }

    if (typeof window.backgroundMusicPlayer.unMute === 'function') {
      window.backgroundMusicPlayer.unMute();
    }

    if (typeof window.backgroundMusicPlayer.playVideo === 'function') {
      window.backgroundMusicPlayer.playVideo();
    }
  }

  function initBackgroundMusic() {
    if (!window.YT || !window.YT.Player) {
      return;
    }

    if (!window.backgroundMusicPlayer) {
      window.backgroundMusicPlayer = new YT.Player('ytplayer', {
        videoId: '7kHcJ_nGz-4',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: '7kHcJ_nGz-4',
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          mute: 0
        },
        events: {
          onReady: function (event) {
            event.target.setVolume(80);
            event.target.unMute && event.target.unMute();
            event.target.playVideo();
          }
        }
      });
    }

    forceMusicVolume();
  }

  window.addEventListener('load', function () {
    initBackgroundMusic();

    const musicBtn = document.getElementById('music-btn');
    if (musicBtn) {
      musicBtn.addEventListener('click', function () {
        setTimeout(forceMusicVolume, 250);
      });
    }
  });

  document.addEventListener('click', function () {
    if (window.backgroundMusicPlayer) {
      forceMusicVolume();
    }
  }, { once: true });
})();
