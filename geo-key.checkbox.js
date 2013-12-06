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
  
  var _geoKeyCheckbox = function() {
    this.checkbox = document.getElementById(this.params.checkbox);
    
    if (!this.checkbox) {
      return false;
    }
    
    this.updateChecked();
    
    var input, context, that = this;
    for (var c = 0; c < this.elements.length; c += 1) {
      input = this.elements[c];
      if (that.params.hotkey === 'yes') {
        (function(that, input) {
          context = (input.nodeName === 'IFRAME') ? (input.contentWindow || input.contentDocument).window : window;
          that.listen(context, 'keydown', function(event){
            if (event.keyCode === that.params.hotkeyNum) {
              that.updateChecked();
            }
          });
        }(this, input));
      }
    }
  };
  
  GeoKey.prototype.updateChecked = function() {
    this.checkbox.checked = (this.params.switch === 'yes') ? true : false;
  };
  
  GeoKey.prototype.plugins.push(_geoKeyCheckbox);
})(window, document);