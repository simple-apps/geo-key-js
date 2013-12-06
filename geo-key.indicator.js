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
  
  var _geoKeyIndicator = function _geoKeyIndicator() {
    var classNames = {
      on: 'geo',
      off: 'eng'
    };
    
    if (this.pluginAry().indexOf('_geoKeyHotkey') > this.pluginAry().indexOf('_geoKeyIndicator')) {
      throw('_geoKeyIndicator plugin depends on _geoKeyHotkey plugin. It should be loaded before!');
      return false;
    }
    
    this.indicator = document.getElementsByClassName(this.params.indicator);
    if (!this.indicator) {
      return false;
    }
    
    this.update();
    
    var input, context, that = this;

    // Click events
    var indicators = document.querySelectorAll('.indicator a');
    for (var e in indicators) {
      var element = indicators[e];
      
      (function(that, element) {
        that.listen(element, 'click', function(event){
         if (element.parentNode.className === classNames.on) {
           that.params.work = 'no';
         } else {
           that.params.work = 'yes';
         }
         that.update();
         if (that.lastFocus !== null) {
           that.lastFocus.focus();
         }
        });
      })(that, element);
    }
  };
  
  GeoKey.prototype.updateScreen.push(function() {
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
  });
  
  GeoKey.prototype.plugins.push(_geoKeyIndicator);
})(window, document);