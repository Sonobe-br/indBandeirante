class Observe {
    constructor(bandName) {
      this.target = document.getElementsByClassName(bandName);
      this.targetArr = Array.from(this.target);
      this.options = {
        root: null,
        rootMargin: '0px',
        threshhold: 1.0
      };
      
      this.initialize();
    }
  
    initialize() {
      const observer = new IntersectionObserver(this.changeColor, this.options);
      
      for (let i = 0; i < this.targetArr.length; i++) {
        observer.observe(this.targetArr[i]);
      }
    }
  
    changeColor(targets) {
      for (let i = 0; i < targets.length; i++) {
        if (targets[i].isIntersecting) {
          const target = targets[i].target;
          const frame = target.parentNode.parentNode;
          const bg = document.getElementsByClassName('bg')[0];
          const pr = document.getElementsByClassName('pr')[0];
          const se = document.getElementsByClassName('se')[0];
          const getColorPalette = new GetColorPalette(5, 10);
          
          getColorPalette
            .initialize(target.src)
              .then((palette) => {
                const bgCol = palette.backgroundColor;
                const prCol = palette.primaryColor;
                const seCol = palette.secondaryColor;
  
                frame.style.transition = 'background 0.8s ease-in-out';
                frame.style.background = `rgb(${prCol[0]}, ${prCol[1]}, ${prCol[2]})`;
  
                bg.style.background = `rgb(${bgCol[0]}, ${bgCol[1]}, ${bgCol[2]})`;
                pr.style.background = `rgb(${prCol[0]}, ${prCol[1]}, ${prCol[2]})`;
                se.style.background = `rgb(${seCol[0]}, ${seCol[1]}, ${seCol[2]})`;
              })
              .catch((error) => {
                console.log(error);
              });
        }
      }
    }
  }
  
  class GetColorPalette {
    constructor(beta, delta) {
      this.beta = beta;
      this.delta = delta;
      this.createCanvas();
    }
    
    createCanvas() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    
    initialize(src) {
      return new Promise((resolve, reject) => {
        this.img = new Image();
        this.img.src = src;
        this.img.crossOrigin = 'anonymous';
        
        this.img.addEventListener('load', () => {
          this.canvas.width = this.img.width;
          this.canvas.height = this.img.height;
          this.ctx.drawImage(this.img, 0, 0);
          this.data = this.ctx.getImageData(0, 0, this.img.width, this.img.height).data;
  
          this.palette = this.getPalette();
          
          resolve(this.palette);
        });
      });
    }
    
    getPalette() {
      const colors = [];
      const count = {};
      
      for (let i = 0; i < this.data.length; i += (4 * this.beta)) {
        const r = this.data[i + 0];
        const g = this.data[i + 1];
        const b = this.data[i + 2];
        const rgb = [r, g, b];
        
        if (i === 0) {
          colors.push(rgb);
        } else {
          for (let j = 0; j < colors.length; j++) {
            const nr = r - colors[j][0];
            const ng = g - colors[j][1];
            const nb = b - colors[j][2];
            const dist = Math.sqrt(nr * nr + ng * ng + nb * nb);
            
            if (dist < this.delta) {
              
              continue;
            } else {
              colors.push(rgb);
              
              break;
            }
          }
        }
      }
      
      // Reference
      // https://qiita.com/saka212/items/408bb17dddefc09004c8
      // The great code! Thank you so much.
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        
        count[color] = (count[color] || 0) + 1;
      }
      
      // object to array
      const arrCount = Object.entries(count);
      
      arrCount.sort((a, b) => b[1] - a[1]);
      
      const tmp = {};
      
      tmp.backgroundColor = arrCount[0][0].split(',');
      tmp.primaryColor = arrCount[Math.floor(arrCount.length * 0.66)][0].split(',');
      tmp.secondaryColor = arrCount[Math.floor(arrCount.length * 0.33)][0].split(',');
      
      return tmp;
    }
  }
  
  (() => {
    window.addEventListener('DOMContentLoaded', () => {
      console.clear();
      
      const o = new Observe('targetImage');
    });
  })();