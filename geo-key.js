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
    // Fix silently
    if (!(this instanceof GeoKey)) {
      return new GeoKey(arguments[0]);
    };
        
    // Target set to non empty value will not work on IE6
    var defaults = {
      target: '',
      work: 'no',
      hotkey: 'yes',
      hotkeyNum: 192,
      indicator: 'no'
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
    GeoKey.prototype.params = this.params;
    
    // Elements that need to be worked on
    this.elements = function(params){
      if (params.target === '') {
        return document.querySelectorAll('input[type=text],input[type=edit],textarea,div[contenteditable],iframe');
      } else {
        return document.getElementsByClassName(params.target);
      }
    }(this.params);
        
    // Track changes to inputs set
    var context, input, that = this;
    for (var c = 0; c < this.elements.length; c += 1) {
      input = this.elements[c];
  
      (function(that, input) { 
        that.listen(input, 'keypress', function(event){
          GeoKey.prototype.convert(input, event);
        });
      })(that, input);
    }
    
    // Plugins
    for (var p = 0; p < GeoKey.prototype.plugins.length; p += 1) {
      GeoKey.prototype.plugins[p].call(this);
    }
  };
  
  GeoKey.prototype.plugins = [];
  
  // Returns [a-z] input string in Georgian
  GeoKey.prototype.translate = function(string) {
    if (this.params.work !== 'yes') {
      return string;
    }
    
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
    if (element.nodeName === 'IFRAME') {
      element = element.contentWindow.document;
    }
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, callback);
    }
  }
  
  // Works on a DOM element to replace a character upon keypress
  GeoKey.prototype.convert = function(element, event) {    
    var start, end;
    var character = typeof event.which === 'number' ? event.which : event.keyCode;
    
    console.log(element);
    
    if (!character || character <= 32) {
      return false;
    }
  
    if (['INPUT','TEXTAREA'].indexOf(element.nodeName) > -1) {
      // Text convertion for <input> and <textarea> elements
      if (typeof element.selectionStart === 'number' && typeof element.selectionEnd === 'number') {        
        // For modern browsers and IE9+
        start = element.selectionStart;
        end = element.selectionEnd;
        element.value = element.value.slice(0, start) + this.translate(String.fromCharCode(character)) + element.value.slice(end);
        element.selectionStart = element.selectionEnd = start + 1;        
      } else {
        // For IE6, IE7, IE8  
        range = document.selection.createRange();
      
        charLength = element.value.length;
        normal = element.value.replace(/\r\n/g, "\n");

        // Input scope only
        textInputRange = element.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        // Start and end of the selection should be at the end of input
        endRange = element.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
            start = end = charLength;
        } else {
            start = -textInputRange.moveStart('character', -charLength);
            start += normal.slice(0, start).split("\n").length - 1;

            if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
                end = charLength;
            } else {
                end = -textInputRange.moveEnd('character', -charLength);
                end += normal.slice(0, end).split("\n").length - 1;
            }
        }

        // Add computed value in the right place
        element.value = element.value.slice(0, start) + this.translate(String.fromCharCode(character)) + element.value.slice(end);
        start++;

        textInputRange = element.createTextRange();
        textInputRange.collapse(true);
        textInputRange.move('character', start - (element.value.slice(0, start).split("\r\n").length - 1));
        textInputRange.select();
      }
    } else if (['DIV','IFRAME'].indexOf(element.nodeName) > -1) {
      
      // Text convertion for content-editable <div> elements
      var textSelection, textInputRange, textNode, context;
      
      var context = (element.contentWindow || element.contentDocument) || null; 
      var contextWindow = (element.nodeName === 'IFRAME') ? context.window : window;
      var contextDocument = (element.nodeName === 'IFRAME') ? context.document : document;
      
      if (contextWindow.getSelection) {
        // For newer browsers
        textSelection = contextWindow.getSelection();
        if (textSelection.getRangeAt && textSelection.rangeCount) {
          // Get range and put a converted character in the appropriate place
          textInputRange = textSelection.getRangeAt(0);
          textInputRange.deleteContents();
          textNode = contextDocument.createTextNode(this.translate(String.fromCharCode(character)));
          textInputRange.insertNode(textNode);

          // Move point to last character
          textInputRange.setStart(textNode, textNode.length);
          textInputRange.setEnd(textNode, textNode.length);
          textSelection.removeAllRanges();
          textSelection.addRange(textInputRange);
        }
      } else if (contextDocument.selection && contextDocument.selection.createRange) {
        // For older IE browsers
        textInputRange = contextDocument.selection.createRange();
        textInputRange.pasteHTML(this.translate(String.fromCharCode(character)));
      }
    } 
    
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
      return event;
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
  if (typeof document.getElementsByClassName!='function') {
      document.getElementsByClassName = function() {
          var elms = document.getElementsByTagName('*');
          var ei = new Array();
          for (i=0;i<elms.length;i++) {
              if (elms[i].getAttribute('class')) {
                  ecl = elms[i].getAttribute('class').split(' ');
                  for (j=0;j<ecl.length;j++) {
                      if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
                          ei.push(elms[i]);
                      }
                  }
              } else if (elms[i].className) {
                  ecl = elms[i].className.split(' ');
                  for (j=0;j<ecl.length;j++) {
                      if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
                          ei.push(elms[i]);
                      }
                  }
              }
          }
          return ei;
      }
  }
  
  // [].map
  if (!Array.prototype.map) {
    Array.prototype.map = function (fun /*, thisp */) {
      "use strict";

      if (this === void 0 || this === null) { throw new TypeError(); }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== 'function') { throw new TypeError(); }

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