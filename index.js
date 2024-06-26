const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

function playPauseVideo() {
  let videos = document.querySelectorAll(".video");
  videos.forEach((video) => {
      // We can only control playback without insteraction if video is mute
      video.muted = true;
      // Play is a promise so we need to check we have it
      let playPromise = video.play();
      if (playPromise !== undefined) {
          playPromise.then((_) => {
              let observer = new IntersectionObserver(
                  (entries) => {
                      entries.forEach((entry) => {
                          if (
                              entry.intersectionRatio !== 1 &&
                              !video.paused
                          ) {
                              video.load();  
                          } else if (video.paused) {
                              video.play();
                          }
                      });
                  },
                  { threshold: 1 }
              );
              observer.observe(video);
          });
      }
  });
}

// And you would kick this off where appropriate with:
playPauseVideo();


window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

window.addEventListener("scroll", () => {
  if (window.innerWidth >= 900) {
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      document.querySelector('.header').style.backgroundSize = '150%';
    }else{
      document.querySelector('.header').style.backgroundSize = '100%';       
    }
  }
});

function showAlert() {
  Swal.fire({
    background: '#061f29',
    title: "Aviso de carga",
    icon: "warning",
    text: "Tenga en cuenta que el sitio web puede tardar hasta un minuto en cargar debido a que el servidor se desactiva después de períodos de inactividad.",
  })
}

