module.exports = `
<style>
  #video-progress {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 1vh;
    background: black;
    z-index: 5;
  }
  #video-progress .progress {
    background: rgba(255,0,0,1);
    width: 1vw;
    height: 1vh;
    /*transition: all 0.1s ease;*/
  }

  .center-marker {
    position: fixed;
    width: 0.5vw;
    height: 0.5vw;
    background: rgba(255,255,255,0.8);
    z-index: 6;
    right: 1vw;
    border-radius: 3vw;
  }


  #experience-progress {
    position: fixed;
    top: 0;
    right: 0;
    width: 1vmin;
    height: 100vh;
    background: black;
    z-index: 5;
  }
  #experience-progress .progress {
    background: rgb(255, 255, 255);
    opacity: 0.7;
    width: 0.2vw;
    height: 100vh;
    margin-top: -100vh;
    right: 1.15vw;
    transition: transform 0.3s ease;
    position: absolute;
    border-radius: 5vw;
  }

  ::-webkit-scrollbar {
      display: none;
  }

  .control-play {
    position: fixed;
    top: 3vmin;
    right: 3vmin;
    color: white;
    z-index: 1;
  }

  .focus-toggles i {
    display: block;
    line-height: 5vmin;
  }
  #togglePlay {
    font-size: 5vmin;
    margin-right: 5vmin;
  }

  .control-play i {
    font-size: 8vmin;
    text-shadow: 0 0.5vmin 1vmin rgba(0,0,0,0.5);
    line-height: 100%;
    cursor: pointer;
  }
  #unsupported {
    margin: 0 auto;
    text-align: center;
    margin: 50px;
    display: none;
  }

  .loading {
    width: 100vw;
    height: 100vh;
    background: black;
    z-index: 7;
    position: fixed;
    text-align: center;
    padding-top: 30vh;
  }
  .loading h3 {
    font-weight: 400;
  }


  .pace {
    -webkit-pointer-events: none;
    pointer-events: none;

    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    z-index: 2000;
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 5vh;
    width: 50vw;
    background: transparent;
    border: none;

    overflow: hidden;
  }

  .pace .pace-progress {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;

    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);

    max-width: 200px;
    position: fixed;
    z-index: 2000;
    display: block;
    position: absolute;
    top: 0;
    right: 100%;
    height: 100%;
    width: 100%;
    background: #29d;
  }

  .pace.pace-inactive {
    display: none;
  }
</style>

<div class="loading">
  <h3>Experience Loading...</h3>
</div>
<div id="video-progress">
  <div class="progress"></div>
</div>
<div id="experience-progress">
  <div class="progress"></div>
</div>
<div class="control-play">
  <i class="fa fa-play" id="togglePlay"></i>
  <div class='focus-toggles'>
    <i class="fa fa-caret-up" id="toggleUp"></i>
    <i class="fa fa-caret-down" id="toggleDown"></i>
  </div>
</div>
<div class="container">
  <div class="background"></div>
  <div class="container-inner"></div>
</div>

<h3 class="error" style="display:none">Whoops! Right now this demo doesn't handle resizing or browsers less than 1000px wide. Reload this page or get on a laptop!</h3>
<div id="unsupported">
<span style="text-transform: uppercase">Mobile experience coming soon</span>  <br><br> This interactive experience is currently only for desktops.
</div>
`
