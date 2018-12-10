const createAudiowave = (json, i, waveformContainer, toggle, volume) => {
  // create audio visualizer
  const audiowave = WaveSurfer.create({
    container: waveformContainer,
    barWidth: 2,
    height: 64,
    waveColor: '#D1D2DD',
    progressColor: '#1ED689',
    cursorColor: '#fff',
  });

  // load audio
  audiowave.load(`/static/uploads/${json.posts[i].fileName}`);

  // set volume
  // TODO: MAKE THE SLIDER DO SOMETHING
  audiowave.setVolume(0.4);
  volume.value = 0.4;

  volume.addEventListener('input', () => {
    audiowave.setVolume(volume.value);
  });

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (!audiowave.isPlaying()) {
      audiowave.play();
      toggle.classList.remove('stop-audiowave');
      toggle.classList.add('start-audiowave');
    } else {
      audiowave.pause();
      toggle.classList.remove('start-audiowave');
      toggle.classList.add('stop-audiowave');
    }
  }, false);

  // Resize the audiowave
  window.addEventListener('resize', (e) => {
    // get current progress
    const progress = audiowave.getCurrentTime() / audiowave.getDuration();
    // reset graph
    audiowave.empty();
    audiowave.drawBuffer();
    audiowave.seekTo(progress);
  });
};

