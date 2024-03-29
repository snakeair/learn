/**
 * picker v1.0 Created by zx.
 */
(function(o, p, q) {
  function Scroll(a, b) {
      this.scroller = p.querySelector(a);
      this.childNode = this.scroller.childNodes[0];
      this.options = {
          step: true,
          defaultPlace: 0,
          callback: null
      };
      this.startPageY = 0;
      this.startTime = 0;
      this.endTime = 0;
      this.offsetTop = 0;
      this.scrollerHeight = this.scroller.clientHeight;
      this.childNodeHeight = this.childNode.clientHeight;
      this.scrollHeight = this.childNodeHeight - this.scrollerHeight;
      var c = this.childNode.childNodes;
      this.stepLen = c.length > 0 ? c[0].clientHeight : 0;
      for (var i in b) {
          this.options[i] = b[i]
      }
      var d = this.options.defaultPlace ? this.options.defaultPlace : 0;
      this.scrollTo(0, d);
      this._start();
      this._move();
      this._end()
  }
  Scroll.prototype = {
      _start: function() {
          var b = this;
          b.scroller.addEventListener('touchstart', function(e) {
              e.stopPropagation();
              e.preventDefault();
              b.startTime = b.getTime();
              var a = e.touches ? e.touches[0] : e;
              b.startPageY = a.pageY;
              b.browserVendor('transition', 'none')
          }, false)
      },
      _move: function() {
          var f = this;
          f.scroller.addEventListener('touchmove', function(e) {
              e.stopPropagation();
              e.preventDefault();
              var a = f.getTime();
              var b = e.touches ? e.touches[0] : e;
              var c = b.pageY - f.startPageY;
              var d = c + f.offsetTop;
              if (a - f.endTime > 300 && q.abs(c) < 10) {
                  return
              }
              if (d > 0) {
                  d /= 3
              } else if (q.abs(d) > q.abs(f.scrollHeight)) {
                  d = q.abs(f.scrollHeight) - q.abs(d);
                  d = d / 3 - f.scrollHeight
              }
              f.browserVendor('transform', 'translate(0, ' + d + 'px)')
          }, false)
      },
      _end: function() {
          var l = this;
          l.scroller.addEventListener('touchend', function(e) {
              e.stopPropagation();
              e.preventDefault();
              l.endTime = l.getTime();
              var a = l.endTime - l.startTime;
              var b = e.changedTouches ? e.changedTouches[0] : e;
              var c = b.pageY - l.startPageY;
              l.offsetTop += c;
              if ((l.offsetTop > 0) || (q.abs(l.offsetTop) > q.abs(l.scrollHeight))) {
                  l.browserVendor('transition', 'all 500ms')
              } else if (a < 300) {
                  var d = q.abs(c) / a;
                  var f = a * d * 20;
                  f = f > 2000 ? 2000 : f;
                  l.offsetTop += c * d * 10;
                  l.browserVendor('transitionProperty', 'all');
                  l.browserVendor('transitionDuration', f + 'ms');
                  l.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)')
              } else {
                  l.browserVendor('transition', 'all 500ms')
              } if (l.offsetTop > 0) {
                  l.offsetTop = 0
              } else if (q.abs(l.offsetTop) > q.abs(l.scrollHeight)) {
                  l.offsetTop = -l.scrollHeight
              }
              if (l.options.step && l.stepLen > 0) {
                  var g = l.offsetTop;
                  var h = q.abs(g % l.stepLen);
                  var i = l.stepLen / 2;
                  var j = (h >= i) ? (g - l.stepLen + h) : (g + h);
                  var k = parseInt(q.abs(j) / l.stepLen);
                  l.options.callback({
                      index: k,
                      node: l.childNode.childNodes
                  });
                  l.offsetTop = j
              }
              l.browserVendor('transform', 'translate(0, ' + l.offsetTop + 'px)')
          }, false)
      },
      scrollTo: function(x, y, a) {
          var b = this;
          if (a && a > 0) {
              b.browserVendor('transitionProperty', 'all');
              b.browserVendor('transitionDuration', a + 'ms');
              b.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)')
          } else {
              b.browserVendor('transition', 'none')
          }
          y = -y;
          b.offsetTop = y;
          b.browserVendor('transform', 'translate(0, ' + y + 'px)')
      },
      refresh: function() {
          this.childNode = this.scroller.childNodes[0];
          this.startPageY = 0;
          this.startTime = 0;
          this.endTime = 0;
          this.offsetTop = 0;
          this.scrollerHeight = this.scroller.clientHeight;
          this.childNodeHeight = this.childNode.clientHeight;
          this.scrollHeight = this.childNodeHeight - this.scrollerHeight;
          var a = this.childNode.childNodes;
          this.stepLen = a.length > 0 ? a[0].clientHeight : 0;
          this.scrollTo(0, 0, 500)
      },
      browserVendor: function(a, b) {
          var c = this;
          var d = ['t', 'WebkitT', 'MozT', 'msT', 'OT'],
              styleObj, len = d.length;
          var e = c.childNode.style;
          for (var i = 0; i < len; i++) {
              styleObj = d[i] + a.substr(1);
              if (styleObj in e) {
                  e[styleObj] = b
              }
          }
      },
      getTime: function() {
          return parseInt(new Date().getTime())
      }
  };

  function Picker(a) {
      this.dataListTwo = null;
      this.arrayDepth = 1;
      this.scrollArray = [];
      this.textArray = [];
      this.isScrollTo = false;
      this.options = {
          "title": '请选择',
          "defaultValue": '',
          "type": '',
          "data": [],
          "keys": null,
          "callBack": null
      };
      for (var i in a) {
          this.options[i] = a[i]
      }
      if (!this.options.keys && this.options.data.length <= 0) {
          return
      }
      if (!this.options.type || this.options.type > 3 || this.options.type < 1) {
          this.getArrayDepth(a.data)
      } else {
          this.arrayDepth = this.options.type
      }
      var b = this.options.keys;
      this.keyId = b.id;
      this.keyValue = b.value;
      this.keyData = b.childData;
      this.defaultArray = ['', '', ''];
      if (this.options.defaultValue) {
          var c = this.options.defaultValue;
          var d = c.split(" ");
          if (d.length > 0) {
              for (var e = 0; e < d.length; e++) {
                  this.defaultArray[e] = d[e]
              }
          }
      }
      this.FillData();
      this.eventClick()
  }
  Picker.prototype = {
      FillData: function() {
          var a = this;
          a.enterNodesBlur();
          var b = p.querySelector(".zx_mask");
          if (b) {
              p.body.removeChild(b)
          }
          var c = a.options.title ? a.options.title : '请选择';
          var d = p.createElement("div");
          d.className = "zx_mask";
          var e = '<div class="zx_select showPicker">' + '<header><button class="nav_left picker-cancel">取消</button>' + '<h1>' + c + '</h1><button class="nav_right picker-ok">确定</button></header>' + '<div class="ub"><div class="ub-f1 picker-wrapper" id="picker-wrapper0"><ul></ul></div>';
          if (a.arrayDepth >= 2) {
              e += '<div class="ub-f1 picker-wrapper" id="picker-wrapper1"><ul></ul></div>'
          }
          if (a.arrayDepth >= 3) {
              e += '<div class="ub-f1 picker-wrapper" id="picker-wrapper2"><ul></ul></div>'
          }
          e += '<div class="sel_top"></div><div class="sel_bottom"></div>';
          e += '<div class="sel_middle"></div></div></div>';
          d.innerHTML = e;
          p.body.appendChild(d);
          var f = parseFloat(100 / a.arrayDepth).toFixed(3) + "%";
          var g = p.querySelectorAll('.picker-wrapper');
          for (var i = 0; i < g.length; i++) {
              g[i].style.minWidth = f;
              g[i].style.maxWidth = f
          }
          if (a.arrayDepth >= 1) {
              a.showScrollList(this.options.data, 0, true)
          }
          setTimeout(function() {
              p.querySelector('.zx_select').style.height = '245px'
          }, 0)
      },
      scrollInit: function(d, e) {
          var f = this;
          var g = p.querySelector('#picker-wrapper0').childNodes[0];
          var h = g.childNodes[0].clientHeight;
          var i = '#picker-wrapper' + d;
          f.scrollArray[d] = new Scroll(i, {
              step: h,
              defaultPlace: h * e,
              callback: function(a) {
                  var b = a.index + 2;
                  var c = a.node[b];
                  f.SetItemList(c, d)
              }
          });
          f.add_EventListen()
      },
      SetItemList: function(a, b) {
          var c = this;
          if (a) {
              var d = c.keyId;
              var e = c.keyValue;
              var f = {};
              f[e] = a.textContent;
              f[d] = a.attributes[0].value;
              c.defaultArray = ['', '', ''];
              if (b == 0) {
                  c.defaultArray[b] = f[e];
                  c.showScrollList(c.options.data, 0)
              } else if (b == 1) {
                  c.defaultArray[b] = f[e];
                  c.showScrollList(c.dataListTwo, 1)
              }
          } else {
              var f = ""
          }
          c.textArray[b] = f
      },
      showScrollList: function(a, b, c) {
          var d = this;
          var e = d.keyId;
          var f = d.keyValue;
          var g = d.keyData;
          var h = '<li></li><li></li>',
              defaultNum, childData = [];
          if (d.defaultArray[b]) {
              var j = false;
              for (var i = 0; i < a.length; i++) {
                  if (d.defaultArray[b] && d.defaultArray[b] == a[i][f]) {
                      j = true;
                      defaultNum = i;
                      if (g && a[i][g]) {
                          childData = a[i][g]
                      }
                      d.setDefaultItem(b, a[i][f], a[i][e])
                  }
                  h += '<li data-id="' + a[i][e] + '">' + a[i][f] + '</li>'
              }
              if (!j) {
                  if (g && a[0][g]) {
                      childData = a[0][g]
                  }
                  d.setDefaultItem(b, a[0][f], a[0][e])
              }
          } else {
              for (var i = 0; i < a.length; i++) {
                  h += '<li data-id="' + a[i][e] + '">' + a[i][f] + '</li>'
              }
              if (g && a[0][g]) {
                  childData = a[0][g]
              }
              d.setDefaultItem(b, a[0][f], a[0][e])
          }
          h += '<li></li><li></li>';
          p.querySelector('#picker-wrapper' + b).childNodes[0].innerHTML = h;
          var k = b + 1;
          if (c) {
              d.scrollInit(b, defaultNum);
              if (k < d.arrayDepth && childData.length > 0) {
                  d.showScrollList(childData, k, true)
              }
          } else {
              if (k < d.arrayDepth) {
                  if (childData.length > 0) {
                      d.showScrollList(childData, k)
                  }
                  setTimeout(function() {
                      d.scrollArray[k].refresh()
                  }, 0)
              }
          } if (b == 0) {
              d.dataListTwo = childData
          }
      },
      setDefaultItem: function(a, b, c) {
          var d = this;
          var e = d.keyId;
          var f = d.keyValue;
          var g = {};
          g[f] = b;
          g[e] = c;
          d.textArray[a] = g
      },
      eventClick: function() {
          var g = this;
          p.querySelector('.picker-cancel').addEventListener("touchstart", function(e) {
              e.stopPropagation();
              e.preventDefault();
              g.HidePicker()
          });
          p.querySelector('.picker-ok').addEventListener("touchstart", function(e) {
              e.stopPropagation();
              e.preventDefault();
              var a = '';
              var b = '';
              var c = g.options.keys;
              for (var i = 0; i < g.textArray.length; i++) {
                  var d = c.id;
                  var f = c.value;
                  if (i == 0) {
                      a += g.textArray[i][f];
                      b += g.textArray[i][d]
                  } else {
                      a += " " + g.textArray[i][f];
                      b += "," + g.textArray[i][d]
                  }
              }
              if (g.options.callBack) {
                  g.options.callBack(a)
              }
              g.HidePicker()
          })
      },
      HidePicker: function() {
          var b = this;
          p.querySelector('.zx_select').style.height = '0';
          b.remove_EventListen();
          setTimeout(function() {
              var a = p.querySelector('.zx_mask');
              p.body.removeChild(a);
              b.destroy()
          }, 200)
      },
      getArrayDepth: function(a) {
          var b = this;
          var c = a[0],
              index = "";
          for (var i in c) {
              if (Array.isArray(c[i]) && c[i].length != 0) {
                  index = i;
                  b.arrayDepth++;
                  break
              }
          }
          if (index) {
              b.getArrayDepth(c[index])
          }
      },
      enterNodesBlur: function() {
          var a = p.querySelectorAll('input');
          for (var m = 0; m < a.length; m++) {
              a[m].blur()
          }
          var b = p.querySelectorAll('textarea');
          for (var n = 0; n < b.length; n++) {
              b[n].blur()
          }
      },
      touchDefault: function(e) {
          e.preventDefault()
      },
      touchStop: function(e) {
          e.stopPropagation();
          e.preventDefault()
      },
      add_EventListen: function() {
          var a = this;
          p.addEventListener('touchmove', a.touchDefault, false)
      },
      remove_EventListen: function() {
          var a = this;
          p.removeEventListener('touchmove', a.touchDefault, false)
      },
      destroy: function() {
          var a = this;
          a.dataListTwo = null;
          a.options = null;
          a.arrayDepth = 1;
          a.scrollArray = [];
          a.textArray = [];
          a.isScrollTo = false;
          this.keyId = '';
          this.keyValue = '';
          this.keyData = '';
          this.defaultArray = ['', '', '']
      }
  };
  if (typeof module != 'undefined' && module.exports) {
      module.exports = Picker
  } else {
      o.Picker = Picker
  }
})(window, document, Math);