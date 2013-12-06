/**
 *
 * @source: https://github.com/dnatsvlishvili/geo-key
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * The MIT License (MIT)

 * Copyright (c) 2013 David Natsvlishvili
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

(function(window, document, undefined){
  "use strict";
  
  var _geoKeyIndicator = function() {
    this.indicator = document.getElementsByClassName(this.params.indicator);
    if (!this.indicator) {
      return false;
    }
    
    this.updateIndicators();
    
    var input, context, that = this;
    for (var c = 0; c < this.elements.length; c += 1) {
      input = this.elements[c];
      if (that.params.hotkey === 'yes') {
        (function(that, input) {
          context = (input.nodeName === 'IFRAME') ? (input.contentWindow || input.contentDocument).window : window;
          that.listen(context, 'keydown', function(event){
            if (event.keyCode === that.params.hotkeyNum) {
              that.updateIndicators();
            }
          });
        }(this, input));
      }
    }
    
  };
  
  GeoKey.prototype.updateIndicators = function() {
    var container, eng, geo;
    for (var i in this.indicator) {
      if (this.indicator.hasOwnProperty(i)) {
        container = this.indicator[i];
        
        try {
          eng = container.getElementsByClassName('eng')[0];
          geo = container.getElementsByClassName('geo')[0];
        } catch (e) {
          continue;
        }
        
        if (this.params.work === 'yes') {
          eng.style.display = 'none';
          geo.style.display = 'inline';
        } else {
          eng.style.display = 'inline';
          geo.style.display = 'none';
        }
      }
    }
  };
  
  GeoKey.prototype.plugins.push(_geoKeyIndicator);
})(window, document);