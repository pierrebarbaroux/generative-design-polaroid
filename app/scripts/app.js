import '../styles/app.scss'

// Color Thief - Grab the dominant color of an image
// import * as ColorThief from './libs/color-thief.min'

// FilePond image uploader & plugins
import * as FilePondPluginFileEncode from './libs/filepond-plugin-file-encode'
import * as FilePondPluginFileValidateType from './libs/filepond-plugin-file-validate-type'
import * as FilePondPluginImageCrop from './libs/filepond-plugin-image-crop'
import * as FilePondPluginImageExifOrientation from './libs/filepond-plugin-image-exif-orientation'
import * as FilePondPluginImagePreview from './libs/filepond-plugin-image-preview'
import * as FilePondPluginImageResize from './libs/filepond-plugin-image-resize'
import * as FilePondPluginImageTransform from './libs/filepond-plugin-image-transform'
import * as FilePond from './libs/filepond'

// TweenMax
import TweenMax from 'gsap/TweenMax'
import TimelineMax from 'gsap/TimelineMax'

// P5
import Background from './background.p5'
import Polaroid from './polaroid.p5'

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
      this.polaroid = document.querySelector('.polaroid')
      this.polaroid = document.querySelector('.polaroid')
      this.sketchBackground = new Background()
      this.sketchPolaroid = new Polaroid()
      this.amountPatterns = 3
      this.switchButton = document.querySelector('.btn-switch')
      this.color = undefined

      this._init()
    }

    _init() {
      this._animateIntro()
      this._handleImageUpload()

      let t = this;
      this.switchButton.addEventListener('click', function() {
        t._reset()
        t._printTruchet(t.color)
      });
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
      }, "start+=0.6")

      tl.to(this.header, 0.8, {
        top: 0,
        autoAlpha: 1,
        ease: Power2.easeOut
      }, "start+=0.6")

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
        let base64 = JSON.parse(document.querySelector('.filepond--file-wrapper input[name="filepond"]').value).data;
        let type = JSON.parse(document.querySelector('.filepond--file-wrapper input[name="filepond"]').value).type;
        let src = `data:${type};base64, ${base64}`;
        let img = document.createElement('img');
        img.src = src;
        let t = this;

        // Init Timeline, kill it on completion for performance gain
        let tl = new TimelineMax({onComplete: () => {
          tl.kill()
        }})

        tl.to(document.querySelector('.btn-switch'), 0, {
          className: "-=hidden",
          ease: Power4.easeOut
        }).to(document.querySelector('.btn-share'), 0, {
          className: "-=hidden",
          ease: Power4.easeOut
        })

        //
        setTimeout(function() {
          t.color = t._getDominantColor(img);
          t._printTruchet();
        }, 200);
      });

      file.on('removefile', () => {
        this._reset();
      });
    }

    _printTruchet() {
      if(this.color) {
        let seed = Math.floor(Math.random() * this.amountPatterns);
        this.sketchPolaroid.start(this.color, seed);
        this.sketchBackground.start(this.color, seed);

        // Init Timeline, kill it on completion for performance gain
        let tl = new TimelineMax({onComplete: () => {
          tl.kill()
        }})

        tl.to(document.querySelector('body > canvas.p5Canvas'), 0.6, {
          opacity: 1,
          ease: Power4.easeOut
        })
      }
    }

    _reset() {
      // Remove all canvas
      document.querySelectorAll('canvas:not(.filepond--image-bitmap)').forEach(el => el.remove());

      // Reset background and polaroid
      this.sketchBackground = new Background();
      this.sketchPolaroid = new Polaroid();
    }

    _getDominantColor(image) {
      let colorThief = new ColorThief();
      return colorThief.getColor(image);
    }
}

document.addEventListener("DOMContentLoaded", function() {
  const app = new Application()
})
