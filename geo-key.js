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
    var defaults = {
      target: ''
    };
    
    // Provides ability to provide custom parameters
    this.params = function(input, defaults) {
      if (input) {
        for (var key in input) {
          var val = input[key];
          if (typeof val !== 'undefined') {
            defaults[key] = val;
          }
        }
      }
      return defaults;
    }(params, defaults);
    
    // Elements that need to be worked on
    this.elements = function(params){
      if (params.target === '') {
        return document.querySelectorAll('input[type=text],input[type=edit]');
      } else {
        return document.getElementsByClassName(params.target);
      }
    }(this.params);
    
    for (var i in this.elements) {
      this.listen(this.elements[i], 'keypress', function(event){
        GeoKey.prototype.convert(this, event);
      });
    }
  };
  
  // Returns [a-z] input string in Georgian
  GeoKey.prototype.translate = function(string) {
    var input = string.split('');
    var result = '', offset, chr;
    
    var charset = {
      a: 1, b: 1, d: 1, e: 1, i: 1, g: -3, v: -15,
      z: -18, T: 21, J: 39, f: 16, q: 6, R: 38, S: 39,
      C: 56, c: 25, Z: 35, w: 7, W: 40, x: 8, j: 23, h: 26
    };
    
    var scope = [67, 74, 82, 83, 84, 87, 90];
    for (var n = 96; n < 122; n += 1, scope.push(n));
    
    for (var i = 0; i < input.length; i += 1) {
      chr = input[i];
      
      offset = chr.charCodeAt();
      if (typeof charset[chr] !== 'undefined') {
        offset += charset[chr];
      }
      
      result += (scope.indexOf(chr.charCodeAt()) > -1) ? String.fromCharCode(4206 + offset) : chr;
    }
    
    return result;
  };
  
  GeoKey.prototype.listen = function(element, eventName, callback) {
      if (element.addEventListener) {
          element.addEventListener(eventName, callback, false);
      } else if (element.attachEvent) {
          element.attachEvent("on" + eventName, callback);
      }
  }
  
  GeoKey.prototype.convert = function(element, event) {
    var val = element.value;
    var start, end;
    var charCode = typeof event.which === 'number' ? event.which : event.keyCode;
    
    if (charCode && charCode > 32) {
      if (typeof element.selectionStart === 'number' && typeof element.selectionEnd === 'number') {        
        start = element.selectionStart;
        end = element.selectionEnd;
        element.value = val.slice(0, start) + GeoKey.prototype.translate(String.fromCharCode(charCode)) + val.slice(end);
        element.selectionStart = element.selectionEnd = start + 1;        
      } else {        
        if (document.selection && document.selection.createRange) {
          var selectionRange = document.selection.createRange();
          var textInputRange = element.createTextRange();
          var precedingRange = element.createTextRange();
          var bookmark = selectionRange.getBookmark();
          textInputRange.moveToBookmark(bookmark);
          precedingRange.setEndPoint('EndToStart', textInputRange);
          start = precedingRange.text.length;
          end = start + selectionRange.text.length;

          element.value = val.slice(0, start) + GeoKey.prototype.translate(String.fromCharCode(charCode)) + val.slice(end);
          start++;

          textInputRange = element.createTextRange();
          textInputRange.collapse(true);
          textInputRange.move('character', start - (element.value.slice(0, start).split("\r\n").length - 1));
          textInputRange.select();
        }
      }
      event.preventDefault();
    } 
  }

  
  /**
   *
   * Polyfills and shims for older browsers that might have a problem with GeoKey Library
   * @source: https://github.com/inexorabletash/polyfill
   *
   */
  
  // document.querySelectorAll
  if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];

      style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);

      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }

  // document.getElementsByClassName
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (classNames) {
      classNames = String(classNames).replace(/^|\s+/g, '.');
      return document.querySelectorAll(classNames);
    };
  }
  
  // [].map
  if (!Array.prototype.map) {
    Array.prototype.map = function (fun /*, thisp */) {
      "use strict";

      if (this === void 0 || this === null) { throw new TypeError(); }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") { throw new TypeError(); }

      var res = []; res.length = len;
      var thisp = arguments[1], i;
      for (i = 0; i < len; i++) {
        if (i in t) {
          res[i] = fun.call(thisp, t[i], i, t);
        }
      }

      return res;
    };
  }
  
  // [].indexOf
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
      "use strict";

      if (this === void 0 || this === null) { throw new TypeError(); }

      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) { return -1; }

      var n = 0;
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (isNaN(n)) {
          n = 0;
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }

      if (n >= len) { return -1; }

      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  
  // Binds a function constructor to global object
  window.GeoKey = GeoKey;
})(window, document);