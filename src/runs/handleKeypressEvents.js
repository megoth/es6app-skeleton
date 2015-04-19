class HandleKeypressEvents {
  constructor($state, $window) {
    // keypress event
    $window.document.addEventListener('keydown', function (e) {
      if(e.keyCode === 39) {
        $state.current.slide.goNext($state);
      } else if (e.keyCode === 37) {
        $state.current.slide.goPrevious($state);
      }
    });
  }
}

export default HandleKeypressEvents;