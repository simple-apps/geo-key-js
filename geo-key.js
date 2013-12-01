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
  var GeoKey = function(params){
    
    // Provides ability to provide custom parameters
    var params = function(source) {
      var target = {target: ''};
      if (source) {
        for (var key in source) {
          var val = source[key];
          if (typeof val !== "undefined") {
            target[key] = val;
          }
        }
      }
      return target;
    }(params);
    
    // Elements that need to be worked on
    this.elements = function(){
      if (params.target === '') {
        return document.querySelectorAll('input[type=text],input[type=edit]');
      } else {
        return document.getElementsByClassName(params.target);
      }
    }();
    
    /* Inline test case */
    for (var i in this.elements) {
      this.elements[i].value = this.constructor.prototype; // Should put [object Object]
    }
  };
  
  // HTML5 Polyfills
  if (!document.querySelectorAll){
    document.querySelectorAll = function(selector){
      var doc = document,
      head = doc.documentElement.firstChild,
      styleTag = doc.createElement('STYLE');
      head.appendChild(styleTag);
      doc.__qsaels = [];

      styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
      window.scrollBy(0, 0);

      return doc.__qsaels;
    }
  }
  
  window.GeoKey = GeoKey;
})(window, document);