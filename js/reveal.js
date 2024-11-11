// MIT License
//
// Copyright (c) 2020 Creator SN®
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

export class RevealHelper {
  static getOffset(element) {
    return {
      top: element.el.getBoundingClientRect().top,
      left: element.el.getBoundingClientRect().left
    };
  }

  static drawEffectBasic(element, x, y, backgroundAcrylicColor, borderAcrylicColor, gradientSize, clickEffect = false, mode = 'background') {
    let borderAcrylic;
    let backgroundAcrylic;

    var acrylicDark = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='grainy' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.537'></feTurbulence><feColorMatrix type='saturate' values='0'></feColorMatrix><feBlend mode='lighten' in='SourceGraphic'></feBlend></filter></svg>")`;
    var acrylicLight = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='grainy' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.537'></feTurbulence><feColorMatrix type='saturate' values='0'></feColorMatrix><feBlend mode='darken' in='SourceGraphic'></feBlend></filter></svg>")`;

    borderAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${borderAcrylicColor}, transparent) 25% 25% 25% 25%`;
    if (clickEffect === false) {
      if (document.documentElement.classList.contains('ThemeDark')) {
        backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), ${acrylicDark}`;
      } else {
        backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), ${acrylicLight}`;
      }
    } else {
      if (document.documentElement.classList.contains('ThemeDark')) {
        backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, transparent, ${backgroundAcrylicColor}, transparent, transparent), ${acrylicDark}`;
      } else {
        backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, transparent, ${backgroundAcrylicColor}, transparent, transparent), ${acrylicLight}`;
      }
    }

    if (mode == 'background') {
      if (clickEffect == true) {
        element.wave = 120;
        element.clickWave = setInterval(() => {
          try {
            let cur = element.wave;
            let step = cur / 200 + 5;
            cur += step;
            if (cur >= 1000) {
              clearInterval(element.clickWave);
            } else {
              element.wave = cur;
              if (document.documentElement.classList.contains('ThemeDark')) {
                backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, transparent, ${backgroundAcrylicColor}, transparent, transparent), ${acrylicDark}`;
              } else {
                backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), radial-gradient(circle ${element.wave}px at ${x}px ${y}px, transparent, ${backgroundAcrylicColor}, transparent, transparent), ${acrylicLight}`;
              }
              element.el.style.setProperty('background-image', backgroundAcrylic, 'important');
            }
          } catch (e) {}
        }, 50);
      } else {
        clearInterval(element.clickWave);
        element.wave = 0;
        if (document.documentElement.classList.contains('ThemeDark')) {
          backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), ${acrylicDark}`;
        } else {
          backgroundAcrylic = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${backgroundAcrylicColor}, transparent), ${acrylicLight}`;
        }
        element.el.style.setProperty('background-image', backgroundAcrylic, 'important');
      }
    } else if (mode == 'border') {
      element.el.style.setProperty('border-image', borderAcrylic, 'important');
    }
  }

  static drawEffectBorder(element, x, y, backgroundAcrylicColor, borderAcrylicColor, gradientSize, clickEffect = false) {
    this.drawEffectBasic(element, x, y, backgroundAcrylicColor, borderAcrylicColor, gradientSize, clickEffect, "border");
  }

  static drawEffectBackground(element, x, y, backgroundAcrylicColor, borderAcrylicColor, gradientSize, clickEffect = false) {
    this.drawEffectBasic(element, x, y, backgroundAcrylicColor, borderAcrylicColor, gradientSize, clickEffect, "background");
  }

  static preProcessElements(elements) {
    const res = [];

    elements.forEach(el => {
      if (el.hashCode == undefined) {
        el.hashCode = this.GuidWithoutDash();
      }
      res.push({
        oriBg: getComputedStyle(el)["background-image"],
        oriBorder: getComputedStyle(el)["border-image"],
        wave: 0,
        clickWave: {},
        borderAcrylicColor: "",
        backgroundAcrylicColor: "",
        borderGradientSize: 80,
        backgroundGradientSize: 150,
        el: el
      });
    });

    return res;
  }

  static isInsideElement(element, cursorX, cursorY) {
    const el_area = {
      left: element.el.getBoundingClientRect().left,
      right: element.el.getBoundingClientRect().right,
      top: element.el.getBoundingClientRect().top,
      bottom: element.el.getBoundingClientRect().bottom
    }

    return (cursorX >= el_area.left && cursorX <= el_area.right && cursorY >= el_area.top && cursorY <= el_area.bottom);
  }

  static GuidWithoutDash() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
  }
}

export class Reveal {
  constructor(selector, options) {
    this.options = {
      selector: ".eff-reveal-border",
      backgroundGradientSize: 150,
      borderGradientSize: 80,
      borderAcrylicColor: "rgba(255,255,255,0.25)",
      backgroundAcrylicColor: "rgba(255,255,255,0.25)"
    };

    this.options = Object.assign(this.options, options);

    this.childrenRefresh(selector, this.options);
    Reveal.clearUselessElements();
    this.applyCommonEffects(selector, options);

    this.timer = setInterval(() => {
      this.childrenRefresh(selector);
    }, 300);
  }

  childrenRefresh(selector) {
    if (window.FvRevealElements == undefined) {
      window.FvRevealElements = {};
    }
    const els = typeof(selector) == "string" ? RevealHelper.preProcessElements(document.querySelectorAll(selector)) : RevealHelper.preProcessElements([selector]);
    for (let item of els) {
      let children = typeof(this.options.selector) == "string" ? RevealHelper.preProcessElements(item.el.querySelectorAll(this.options.selector)) : RevealHelper.preProcessElements([this.options.selector]);
      if (window.FvRevealElements[item.el.hashCode] == undefined) {
        window.FvRevealElements[item.el.hashCode] = [];
      }
      for (let c of children) {
        let finder = window.FvRevealElements[item.el.hashCode].find(it => it.el === c.el);
        if (finder === undefined) {
          c.borderAcrylicColor = this.options.borderAcrylicColor;
          c.backgroundAcrylicColor = this.options.backgroundAcrylicColor;
          c.borderGradientSize = this.options.borderGradientSize;
          c.backgroundGradientSize = this.options.backgroundGradientSize;
          this.applyClickEffects(c, item);
          window.FvRevealElements[item.el.hashCode].push(c);
        }
      }
    }
  }

  applyCommonEffects(selector) {

    const els = typeof(selector) == "string" ? RevealHelper.preProcessElements(document.querySelectorAll(selector)) : RevealHelper.preProcessElements([selector]);
    if (window.FvRevealCarriers == undefined) {
      window.FvRevealCarriers = [];
    }
    for (let item of els) {
      if (window.FvRevealCarriers.find(it => it.el === item.el) !== undefined) {
        continue;
      }
      let containerSelectorMove = e => {
        for (let c of window.FvRevealElements[item.el.hashCode]) {
          if (!item.el.contains(c.el)) {
            continue;
          }
          let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
          let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;

          if (Math.abs(x) > 600 || Math.abs(y) > 1000) {} else {
            RevealHelper.drawEffectBorder(c, x, y, c.backgroundAcrylicColor, c.borderAcrylicColor, c.borderGradientSize);
          }
          if (RevealHelper.isInsideElement(c, e.x, e.y)) {
            if (c.wave == 0) {
              RevealHelper.drawEffectBackground(c, x, y, c.backgroundAcrylicColor, c.borderAcrylicColor, c.backgroundGradientSize);
            }
          } else {
            Reveal.clearBackground(c);
          }
        }
      }
      item.el.addEventListener("mousemove", containerSelectorMove);
      window.FvRevealCarriers.push(item);
    }
  }

  applyClickEffects(element, parent) {
    let c = element;

    c.el.addEventListener("mousedown", e => {
      let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
      let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;
      RevealHelper.drawEffectBackground(c, x, y, this.options.backgroundAcrylicColor, this.options.borderAcrylicColor, this.options.backgroundGradientSize, true);
    });

    c.el.addEventListener("mouseup", e => {
      let x = e.pageX - RevealHelper.getOffset(c).left - window.scrollX;
      let y = e.pageY - RevealHelper.getOffset(c).top - window.scrollY;
      RevealHelper.drawEffectBackground(c, x, y, this.options.backgroundAcrylicColor, this.options.borderAcrylicColor, this.options.backgroundGradientSizek);
    });

    parent.el.addEventListener("mouseleave", (e) => {
      Reveal.clearBackground(c);
      Reveal.clearBorder(c);
    });
  }

  static clearUselessElements() {
    for (let key in window.FvRevealElements) {
      for (let i = window.FvRevealElements[key].length - 1; i >= 0; i--) {
        if (!document.body.contains(window.FvRevealElements[key][i].el)) {
          window.FvRevealElements[key].splice(i, 1);
        }
      }
    }
  }

  static clearBackground(element) {
    clearInterval(element.clickWave);
    element.wave = 0;
    element.el.style.backgroundImage = element.oriBg;
  }

  static clearBorder(element) {
    element.el.style.borderImage = element.oriBorder;
  }
}