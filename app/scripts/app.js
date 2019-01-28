let $ = require('jquery')
import '../styles/app.scss'

import TweenMax from 'gsap/TweenMax'
import TimelineMax from 'gsap/TimelineMax'
// const ScrollToPlugin = require('gsap/ScrollToPlugin')
// import ScrollMagic from 'scrollmagic'
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'

// Polyfill for IE/Edge
(function () {
   if ( typeof NodeList.prototype.forEach === "function" ) return false;
   NodeList.prototype.forEach = Array.prototype.forEach
})()

class Application {

    constructor() {

      // Variables for intro animations
      this.header = document.querySelector('header')
      this.polaroid = document.querySelector('.polaroid')
      this.strip = document.querySelector('.strip__image')
      this.loadingLogo = document.querySelector('.loading__logo')

      this._init()
    }

    _init() {
      this._animateIntro()
      this._handleImageUpload()
    }

    _animateIntro() {

      // Init Timeline, kill it on completion for performance gain
      let tl = new TimelineMax({onComplete: () => {
        tl.kill()
      }})

      tl.to(this.strip, 0.6, {
        width: "100%",
        autoAlpha: 1,
        ease: Power3.easeInOut
      })

      tl.to(this.loadingLogo, 0.4, {
        autoAlpha: 0,
        ease: Power4.easeOut
      }, "start-=0.4")

      tl.to(this.polaroid, 0.4, {
        autoAlpha: 1,
        ease: Power2.easeOut
      }, "start+=0.2")

      tl.to(this.header, 0.8, {
        top: 0,
        autoAlpha: 1,
        ease: Power2.easeOut
      }, "start+=0.2")

    }

    _handleImageUpload() {
      const inputElement = document.querySelector('input[type="file"]');

      FilePond.registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageCrop,
        FilePondPluginImageResize,
        FilePondPluginImageTransform,
        FilePondPluginFileEncode
      );

      const file = FilePond.create(
        inputElement, {
          labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
          imagePreviewHeight: 200,
          maxFileSize: '5MB',
          imageCropAspectRatio: '1:1',
          imageResizeTargetWidth: 400,
          imageResizeTargetHeight: 400,
          instantUpload: true,
          stylePanelLayout: 'compact circle',
          styleLoadIndicatorPosition: 'center bottom',
          styleProgressIndicatorPosition: 'right bottom',
          styleButtonRemoveItemPosition: 'center bottom',
          styleButtonProcessItemPosition: 'right bottom',
        }
      );

      file.on('addfile', (error, file) => {
        if (error) return;
        let base64 = JSON.parse($('.filepond--file-wrapper input[name="filepond"]')[0].value).data;
        let type = JSON.parse($('.filepond--file-wrapper input[name="filepond"]')[0].value).type;
        let src = `data:${type};base64, ${base64}`;
        let img = $('<img />');
        img.attr('src', src);
        let _this = this;
        setTimeout(function(){
          let color = _this._getDominantColor(img);
          $('body').css('background', color);
        }, 200);
      });
    }

    _getDominantColor(image) {
      image = image[0];
      let colorThief = new ColorThief();
      let color = colorThief.getColor(image);
      let palette = colorThief.getPalette(image);
      let rgb = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
      return rgb;
    }
}

document.addEventListener("DOMContentLoaded", function() {
  const app = new Application()
})
