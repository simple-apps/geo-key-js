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
  
  var _geoKeyCheckbox = function _geoKeyCheckbox() {
    
    if (this.pluginAry().indexOf('_geoKeyHotkey') > this.pluginAry().indexOf('_geoKeyCheckbox')) {
      throw('_geoKeyCheckbox plugin depends on _geoKeyHotkey plugin. It should be loaded before!');
      return false;
    }
    
    this.checkbox = document.getElementById(this.params.checkbox);
    this.lastFocus = null;
    
    if (!this.checkbox) {
      return false;
    }
    
    this.update();
    
    var input, context, that = this;

    var that = this;
    this.listen(this.checkbox, 'click', function(event) {
      var src = event.target || event.srcElement;
      that.params.work = (src.checked === true) ? 'yes' : 'no';
      that.update();
      if (that.lastFocus !== null) {
        that.lastFocus.focus();
      }
    });
  };
  
  GeoKey.prototype.updateScreen.push(function() {
    try {
      this.checkbox.checked = (this.params.work === 'yes') ? true : false;
    } catch(e) {
    }
  });
  
  GeoKey.prototype.plugins.push(_geoKeyCheckbox);
})(window, document);