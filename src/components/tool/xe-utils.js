/* eslint-disable */
/**
 * xe-utils.js v2.6.6
 * MIT License.
 * @preserve
 */
!(function (n, t) {
  typeof exports === 'object'
    && typeof module !== 'undefined' ? module.exports = t() : typeof define === 'function' && define.amd ? define(t) : n.XEUtils = t()
}(this, function () {
  'use strict'; var n = 'yyyy-MM-dd HH:mm:ss'
  var b = { treeOptions: { parentKey: 'parentId', key: 'id', children: 'children' },
    formatDate: n + '.SSSZ',
    formatString: n,
    dateDiffRules: [
      ['yyyy', 31536e6],
      ['MM', 2592e6],
      ['dd', 864e5],
      ['HH', 36e5],
      ['mm', 6e4],
      ['ss', 1e3],
      ['S', 0]
    ] }

  function r() {} r.v = 'v2', r.mixin = function() { Y(arguments, function(n) { Hn(n, function(t, n) { r[n] = en(t) ? function() { var n = t.apply(r.$context, arguments); return r.$context = null, n } : t }) }) }, r.setup = function(n) { return S(b, n) }; var i = 'undefined'
  var u = 'last'
  var o = 'first'
  var a = 864e5
  var f = 7 * a
  var c = typeof location === i ? 0 : location
  var l = typeof window === i ? 0 : window
  var s = typeof document === i ? 0 : document
  var h = encodeURIComponent
  var p = decodeURIComponent
  var g = Object.prototype.toString
  var v = parseInt
  var e = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#x27;', '`': '&#x60;' }
  var d = /(.+)?\[(\d+)\]$/
  var m = Object.assign

  function y(t, n, r) { for (var e, u = n.length, i = 1; i < u; i++) e = n[i], Y(Tn(n[i]), r ? function(n) { t[n] = Yn(e[n], r) } : function(n) { t[n] = e[n] }); return t } var S = function(n) { if (n) { var t = arguments; if (!0 !== n) return m ? m.apply(Object, t) : y(n, t); if (t.length > 1) return y(n = tn(n[1]) ? [] : {}, t, !0) } return n }
  var t = S

  function D(r, e, u) {
    var i = {}; if (r) {
      if (!e) return r
      en(e) || (e = Bt(e)), Hn(r, function(n, t) { i[t] = e.call(u, n, t, r) })
    } return i
  }

  function x(n, t, r) {
    if (n) { for (var e in n) G(n, e) && t.call(r, n[e], e, n) }
  }

  function M(t, r, e) { q(Tn(t), function(n) { r.call(e, t[n], n, t) }) }

  function O(r, n) { return ln(r) && ln(n) || tn(r) && tn(n) ? (Hn(n, function(n, t) { r[t] = O(r[t], n) }), r) : n }

  function w(n) { var t = []; return Hn(n, function(n) { C(t, n) || t.push(n) }), t }

  function N(n, t) { return nn(n) ? 1 : gn(n) ? nn(t) ? -1 : 1 : n && n.localeCompare ? n.localeCompare(t) : t < n ? 1 : -1 }

  function E(u, i) {
    return function(n, t) {
      var r = n[u]
      var e = t[u]; return r === e ? i ? i(n, t) : 0 : N(r, e)
    }
  }

  function k(n, t, r) {
    if (n) {
      if (V(t)) return L(n).sort(N); var e; var u = Z(n, function(n) { return { data: n } })
      var i = (o = n, a = u, c = r, Y(f = tn(f = t) ? f : [f], function(r, e) { Y(a, en(r) ? function(n, t) { n[e] = r.call(c, n.data, t, o) } : function(n) { n[e] = Zn(n.data, r) }) }), f).length; if (i) {
        for (; i >= 0;) e = E(i, e), i--
        u = u.sort(e)
      } return Z(u, Bt('data'))
    } var o, a, f, c; return []
  }

  function F(n) { for (var t, r = [], e = Wn(n), u = e.length - 1; u >= 0; u--) t = u > 0 ? et(0, u) : 0, r.push(e[t]), e.splice(t, 1); return r } var j = Q('some', 1, 0, !0, !1)
  var T = Q('every', 1, 1, !1, !0)

  function W(n, t, r) {
    var e = []; if (n) { for (t = t || 0, r = r || n.length; t < r; t++) e.push(n[t]) } return e
  } var I = Q('find', 1, 3, !0)
  var A = Q('', 0, 2, !0)

  function C(n, t) { return En(n, t) !== -1 }

  function H(n, t) {
    if (n.indexOf) return n.indexOf(t); for (var r = 0, e = n.length; r < e; r++) { if (t === n[r]) return r }
  }

  function R(n, t) {
    if (n.lastIndexOf) return n.lastIndexOf(t); for (var r = n.length - 1; r >= 0; r--) { if (t === n[r]) return r } return -1
  }

  function Z(n, t, r) {
    var e = []; if (n && arguments.length > 1) {
      if (en(t) || (t = Bt(t)), n.map) return n.map(t, r)
      Hn(n, function() { e.push(t.apply(r, arguments)) })
    } return e
  }

  function z(n) {
    var t; var r; var e; var u = []; if (n && n.length) { for (t = 0, e = (r = it(n, function(n) { return n ? n.length : 0 })) ? r.length : 0; t < e; t++) u.push(Z(n, t)) } return u
  }

  function L(n) { return Z(n, function(n) { return n }) }

  function $(n, t) {
    var r; var e = 0; if (tn(n) && tn(t)) {
      for (r = t.length; e < r; e++) { if (!C(n, t[e])) return !1 } return !0
    } return C(n, t)
  }

  function P(n, t) {
    for (var r, e = arguments, u = [], i = [], o = 2, a = e.length; o < a; o++) u.push(e[o]); if (tn(t)) {
      for (a = t.length - 1, o = 0; o < a; o++) i.push(t[o])
      t = t[a]
    } return Z(n, function(n) { if (i.length && (n = (function(n, t) { for (var r = 0, e = t.length; n && r < e;) n = n[t[r++]]; return e && n ? n : 0 }(n, i))), (r = n[t] || t) && r.apply) return r.apply(n, u) })
  } var U = P

  function Y(n, t, r) {
    if (n) {
      if (n.forEach) n.forEach(t, r)
      else { for (var e = 0, u = n.length; e < u; e++) t.call(r, n[e], e, n) }
    }
  }

  function q(n, t, r) { for (var e = n.length - 1; e >= 0; e--) t.call(r, n[e], e, n) } var B = X(function n(t, r, e, u, i, o, a, f) {
    var c, l, s, h, p, g; if (r) { for (l = 0, s = r.length; l < s; l++) { if (c = r[l], h = i.concat(['' + l]), p = o.concat([c]), e.call(u, c, l, r, h, t, p)) return { index: l, item: c, path: h, items: r, parent: t, nodes: p }; if (a && c && (g = n(c, c[a], e, u, h.concat([a]), p, a, f))) return g } }
  }); var _ = X(function r(e, u, i, o, a, f, c, l) {
    var s, h
    Hn(u, function(n, t) { s = a.concat(['' + t]), h = f.concat([n]), i.call(o, n, t, u, s, e, h), n && c && (s.push(c), r(n, n[c], i, o, s, h, c, l)) })
  }); var J = X(function r(e, u, i, o, a, f, c, l) { var s; var h; var p; var g = l.mapChildren || c; return Z(u, function(n, t) { return s = a.concat(['' + t]), h = f.concat([n]), (p = i.call(o, n, t, u, s, e, h)) && n && c && n[c] && (p[g] = r(n, n[c], i, o, s, h, c, l)), p }) }); var K = X(function(n, t, r, e, u, i, o, a) {
    return (function r(e, u, i, o, a, f, c, l, s) {
      var h; var p; var g; var v; var d; var m = []
      var y = s.original
      var b = s.mapChildren || l; return Y(i, function(n, t) { h = f.concat(['' + t]), p = c.concat([n]), v = e || o.call(a, n, t, i, h, u, p), d = l && n[l], (v || d) && (g = y ? n : S({}, n)), v || d ? (g[b] = r(v, n, n[l], o, a, h, p, l, s), (v || g[b].length) && m.push(g)) : v && m.push(g) }), m
    }(0, n, t, r, e, u, i, o, a))
  })

  function Q(o, a, f, c, l) {
    return function(n, t, r) {
      if (n && t) {
        if (o && n[o]) return n[o](t, r); if (a && tn(n)) {
          for (var e = 0, u = n.length; e < u; e++) { if (!!t.call(r, n[e], e, n) === c) return [!0, !1, e, n[e]][f] }
        } else {
          for (var i in n) { if (G(n, i) && !!t.call(r, n[i], i, n) === c) return [!0, !1, i, n[i]][f] }
        }
      } return l
    }
  }

  function X(o) {
    return function(n, t, r, e) {
      var u = r || {}
      var i = u.children || 'children'; return o(null, n, t, e, [], [], i, u)
    }
  }

  function G(n, t) { return !(!n || !n.hasOwnProperty) && n.hasOwnProperty(t) }

  function V(n) { return gn(n) || nn(n) } var nn = Qn(i)
  var tn = Array.isArray || Kn('Array'); var rn = function(n) { return !gn(n) && !isNaN(n) && !tn(n) && n % 1 == 0 }
  var en = Qn('function')
  var un = Qn('boolean')
  var on = Qn('string')
  var an = Qn('number')
  var fn = Kn('RegExp')
  var cn = Qn('object')

  function ln(n) { return !!n && n.constructor === Object } var sn = Kn('Date')
  var hn = Kn('Error')

  function pn(n) { for (var t in n) return !1; return !0 }

  function gn(n) { return n === null } var vn = typeof Symbol !== i

  function dn(n) { return vn && Symbol.isSymbol ? Symbol.isSymbol(n) : typeof n === 'symbol' } var mn = Kn('Arguments'); var yn = typeof FormData !== i; var bn = typeof Map !== i; var Sn = typeof WeakMap !== i; var Dn = typeof Set !== i; var xn = typeof WeakSet !== i

  function Mn(n) { var t; var r = n ? bt(n) : At(); return !!sn(r) && ((t = r.getFullYear()) % 4 == 0 && (t % 100 != 0 || t % 400 == 0)) }

  function On(n, t) { return tt(n, t, Vn) } var wn = 0

  function Nn(n) { var t = 0; return on(n) || tn(n) ? n.length : (Hn(n, function() { t++ }), t) } var En = Jn('indexOf', H)
  var kn = Jn('lastIndexOf', R)
  var Fn = Xn(function(n, t, r) {
    for (var e = 0, u = n.length; e < u; e++) { if (t.call(r, n[e], e, n)) return e } return -1
  })
  var jn = Xn(function(n, t, r) {
    for (var e = n.length - 1; e >= 0; e--) { if (t.call(r, n[e], e, n)) return e } return -1
  }); var Tn = _n('keys', 1)
  var Wn = _n('values', 0)
  var In = _n('entries', 2)
  var An = Gn(1, 0)
  var Cn = Gn(0, 1)

  function Hn(n, t, r) { return n ? (tn(n) ? Y : x)(n, t, r) : n }

  function Rn(n, t, r) { return n ? (tn(n) ? q : M)(n, t, r) : n }

  function Zn(n, t, r) {
    if (V(n)) return r; var e = (function(n, t) {
      if (n) {
        var r; var e; var u; var i = 0; if (n[t] || G(n, t)) return n[t]; if (e = rt(t), u = e.length) {
          for (r = n; i < u; i++) { if (o = r, a = e[i], void 0, f = a ? a.match(d) : '', V(r = f ? f[1] ? o[f[1]] ? o[f[1]][f[2]] : void 0 : o[f[2]] : o[a])) return i === u - 1 ? r : void 0 }
        } return r
      } var o, a, f
    }(n, t)); return nn(e) ? r : e
  } var zn = /(.+)\[(\d+)\]$/

  function Ln(n, t, r, e) {
    if (n[t]) return r && (n[t] = e), n[t]; var u; var i = t ? t.match(zn) : null
    var o = r ? e : {}; return i ? (u = v(i[2]), n[i[1]] || (n[i[1]] = new Array(u + 1)), n[i[1]][u] = o) : n[t] = o, o
  }

  function $n(r, e, u) { var i; var n; var o = {}; return r && (e && cn(e) ? (n = e, e = function() { return pn(n) }) : en(e) || (e = Bt(e)), Hn(r, function(n, t) { i = e ? e.call(u, n, t, r) : n, o[i] ? o[i].push(n) : o[i] = [n] })), o }

  function Pn(n, t, r) { return n(t, r ? function(n) { return Un(n, r) } : function(n) { return n }) }

  function Un(n, t) {
    return ln(n) ? Pn(D, n, t) : tn(n) ? Pn(Z, n, t) : (function(n, t) {
      if (t && n) {
        var r = n.constructor; switch (g.call(n)) {
          case '[object Date]':
          case '[object RegExp]':
            return new r(n.valueOf())
          case '[object Set]':
            var e = new r(); return n.forEach(function(n) { e.add(n) }), e
          case '[object Map]':
            var u = new r(); return n.forEach(function(n, t) { u.set(t, n) }), u
        }
      } return n
    }(n, t))
  }

  function Yn(n, t) { return n ? Un(n, t) : n }

  function qn(r, e, n) {
    if (r) {
      var t; var u = arguments.length > 1 && (gn(e) || !cn(e))
      var i = u ? n : e; if (ln(r)) x(r, u ? function(n, t) { r[t] = e } : function(n, t) { nt(r, t) }), i && S(r, i)
      else if (tn(r)) {
        if (u) { for (t = r.length; t > 0;) r[--t] = e } else r.length = 0
        i && r.push.apply(r, i)
      }
    } return r
  }

  function Bn(r, e, u) {
    if (r) {
      if (V(e)) return qn(r); var i = []
      var o = []; return en(e) || (a = e, e = function(n, t) { return t === a }), Hn(r, function(n, t, r) { e.call(u, n, t, r) && i.push(t) }), tn(r) ? Rn(i, function(n, t) { o.push(r[n]), r.splice(n, 1) }) : (o = {}, Y(i, function(n) { o[n] = r[n], nt(r, n) })), o
    } var a; return r
  }

  function _n(n, e) {
    var u = Object[n]; return function(t) {
      var r = []; if (t) {
        if (u) return u(t)
        Hn(t, e > 1 ? function(n) { r.push(['' + n, t[n]]) } : function() { r.push(arguments[e]) })
      } return r
    }
  }

  function Jn(e, u) {
    return function(n, t) {
      if (n) {
        if (typeof n === 'string' || tn(n)) return n[e] ? n[e](t) : u(n, t); for (var r in n) { if (G(n, r) && t === n[r]) return r }
      } return -1
    }
  }

  function Kn(t) { return function(n) { return '[object ' + t + ']' === g.call(n) } }

  function Qn(t) { return function(n) { return typeof n === t } }

  function Xn(u) {
    return function(n, t, r) {
      if (n && en(t)) {
        if (tn(n) || on(n)) return u(n, t, r); for (var e in n) { if (G(n, e) && t.call(r, n[e], e, n)) return e }
      } return -1
    }
  }

  function Gn(c, l) {
    return function(r, e) {
      var n; var t; var u = {}
      var i = []
      var o = this
      var a = arguments
      var f = a.length; if (!en(e)) {
        for (t = 1; t < f; t++) n = a[t], i.push.apply(i, tn(n) ? n : [n])
        e = 0
      } return Hn(r, function(n, t) {
        ((e ? e.call(o, n, t, r) : Fn(i, function(n) { return n === t }) > -1) ? c : l) && (u[t] = n)
      }), u
    }
  }

  function Vn(n, t) { return n === t }

  function nt(t, r) { try { delete t[r] } catch (n) { t[r] = void 0 } }

  function tt(r, e, u, i, n, t, o) {
    if (r === e) return !0; if (r && e && !an(r) && !an(e) && !on(r) && !on(e)) {
      if (fn(r)) return u('' + r, '' + e, n, t, o); if (sn(r) || un(r)) return u(+r, +e, n, t, o); var a; var f; var c; var l = tn(r)
      var s = tn(e); if (l || s ? l && s : r.constructor === e.constructor) return f = Tn(r), c = Tn(e), i && (a = i(r, e, n)), f.length === c.length && (nn(a) ? T(f, function(n, t) { return n === c[t] && tt(r[n], e[c[t]], u, i, l || s ? t : n, r, e) }) : !!a)
    } return u(r, e, n, t, o)
  }

  function rt(n) { return n ? n.splice && n.join ? n : ('' + n).split('.') : [] }

  function et(n, t) { return t <= n ? n : (n >>= 0) + Math.round(Math.random() * ((t || 9) - n)) } var ut = lt(function(n, t) { return t < n })
  var it = lt(function(n, t) { return n < t }); var ot = st(parseFloat)
  var at = st(v)

  function ft(n, t) {
    var r = ot(n)
    var e = ot(t)
    var u = dt(r)
    var i = dt(e); return parseInt(u.replace('.', '')) * parseInt(i.replace('.', '')) / Math.pow(10, gt(u) + gt(i))
  }

  function ct(n, t, r) { var e = 0; return Hn(n, t ? en(t) ? function() { e = pt(e, t.apply(r, arguments)) } : function(n) { e = pt(e, Zn(n, t)) } : function(n) { e = pt(e, n) }), e }

  function lt(o) { return function(r, e) { var u, i; return r && r.length ? (Y(r, function(n, t) { e && (n = en(e) ? e(n, t, r) : Zn(n, e)), V(n) || !V(u) && !o(u, n) || (i = t, u = n) }), r[i]) : u } }

  function st(r) { return function(n) { if (n) { var t = r(n); if (!isNaN(t)) return t } return 0 } }

  function ht(n, t) { return dt(ot(n)).replace(new RegExp('(\\d+.\\d{0,' + t + '}).*'), '$1') }

  function pt(n, t) {
    var r = dt(n)
    var e = dt(t)
    var u = Math.pow(10, Math.max(gt(r), gt(e))); return (ft(n, u) + ft(t, u)) / u
  }

  function gt(n) { return (n.split('.')[1] || '').length }

  function vt(n, t) {
    var r = dt(n)
    var e = dt(t)
    var u = gt(r)
    var i = gt(e) - u
    var o = i < 0
    var a = Math.pow(10, o ? Math.abs(i) : i); return ft(r.replace('.', '') / e.replace('.', ''), o ? 1 / a : a)
  }

  function dt(n) { if (('' + n).indexOf('e-') >= 0) { var t = n < 0; return (t ? '-' : '') + '0' + ('' + ((t ? Math.abs(n) : n) + 1)).substr(1) } return '' + n } var mt = Date.now || function() { return Tt(At()) }; var yt = [{ rules: [
    ['yyyy', 4]
  ] }, { rules: [
    ['MM', 2],
    ['M', 1]
  ],
  offset: -1 }, { rules: [
    ['dd', 2],
    ['d', 1]
  ] }, { rules: [
    ['HH', 2],
    ['H', 1]
  ] }, { rules: [
    ['mm', 2],
    ['m', 1]
  ] }, { rules: [
    ['ss', 2],
    ['s', 1]
  ] }, { rules: [
    ['SSS', 3],
    ['S', 1]
  ] }, { rules: [
    ['ZZ', 5],
    ['Z', 6],
    ['Z', 5],
    ['Z', 1]
  ] }]

  function bt(n, t) {
    var r, e; if (n) {
      if ((e = sn(n)) || !t && /^[0-9]{11,15}$/.test(n)) r = new Date(e ? Tt(n) : v(n))
      else if (on(n)) {
        var u; var i = (function(n, t) {
          var r; var e; var u; var i; var o; var a; var f; var c; var l; var s = [0, 0, 1, 0, 0, 0, 0]; for (u = 0, i = yt.length; u < i; u++) { for (f = 0, c = (a = (o = yt[u]).rules).length; f < c; f++) { if (r = a[f], (e = t.indexOf(r[0])) > -1 && (l = n.substring(e, e + r[1])) && l.length === r[1]) { o.offset && (l = v(l) + o.offset), s[u] = l; break } if (f === c - 1) return s } }
          return s
        }(n, t || b.formatDate))
        var o = i[7]
        i[0] && (o ? o[0] === 'z' || o[0] === 'Z' ? r = new Date(Wt(i)) : (u = o.match(/([-+]{1})(\d{2}):?(\d{2})/)) && (r = new Date(Wt(i) - (u[1] === '-' ? -1 : 1) * v(u[2]) * 36e5 + 6e4 * v(u[3]))) : r = new Date(i[0], i[1], i[2], i[3], i[4], i[5], i[6]))
      }
    } return !r || isNaN(Tt(r)) ? 'Invalid Date' : r
  }

  function St(n, t, r, e) { var u = t[r]; return u ? en(u) ? u(e, r, n) : u[e] : e } var Dt = /\[([^\]]+)]|y{2,4}|M{1,2}|d{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|Z{1,2}|W{1,2}|D{1,3}|[aAeEq]/g

  function xt(e, n, t) {
    if (e) {
      if (e = bt(e), sn(e)) {
        var r = n || b.formatString
        var u = e.getHours()
        var i = u < 12 ? 'am' : 'pm'
        var o = S({}, b.formatStringMatchs, t ? t.formats : null)
        var a = function(n, t) { return ('' + Ft(e)).substr(4 - t) }
        var f = function(n, t) { return Pt(jt(e) + 1, t, '0') }
        var c = function(n, t) { return Pt(e.getDate(), t, '0') }
        var l = function(n, t) { return Pt(u, t, '0') }
        var s = function(n, t) { return Pt(u <= 12 ? u : u - 12, t, '0') }
        var h = function(n, t) { return Pt(e.getMinutes(), t, '0') }
        var p = function(n, t) { return Pt(e.getSeconds(), t, '0') }
        var g = function(n, t) { return Pt(e.getMilliseconds(), t, '0') }
        var v = function(n, t) { var r = e.getTimezoneOffset() / 60 * -1; return St(e, o, n, (r >= 0 ? '+' : '-') + Pt(r, 2, '0') + (t === 1 ? ':' : '') + '00') }
        var d = function(n, t) { return Pt(St(e, o, n, kt(e)), t, '0') }
        var m = function(n, t) { return Pt(St(e, o, n, Et(e)), t, '0') }
        var y = { yyyy: a, yy: a, MM: f, M: f, dd: c, d: c, HH: l, H: l, hh: s, h: s, mm: h, m: h, ss: p, s: p, SSS: g, S: g, ZZ: v, Z: v, WW: d, W: d, DDD: m, D: m, a: function(n) { return St(e, o, n, i) }, A: function(n) { return St(e, o, n, i.toLocaleUpperCase()) }, e: function(n) { return St(e, o, n, e.getDay()) }, E: function(n) { return St(e, o, n, (t = e.getDay()) === 0 ? 7 : t); var t }, q: function(n) { return St(e, o, n, Math.floor((jt(e) + 3) / 3)) } }; return r.replace(Dt, function(n, t) { return t || (y[n] ? y[n](n, n.length) : n) })
      } return e
    } return ''
  }

  function Mt(n, t, r) {
    var e; if (n = bt(n), sn(n) && (t && (e = t && !isNaN(t) ? t : 0, n.setFullYear(Ft(n) + e)), r || !isNaN(r))) {
      if (r === o) return new Date(Ft(n), 0, 1); if (r === u) return n.setMonth(11), Ot(n, 0, u)
      n.setMonth(r)
    } return n
  }

  function Ot(n, t, r) {
    var e = t && !isNaN(t) ? t : 0; if (n = bt(n), sn(n)) {
      if (r || !isNaN(r)) {
        if (r === o) return new Date(Ft(n), jt(n) + e, 1); if (r === u) return new Date(Tt(Ot(n, e + 1, o)) - 1)
        n.setDate(r)
      } e && n.setMonth(jt(n) + e)
    } return n
  }

  function wt(n, t, r) { var e, u, i; return n = bt(n), sn(n) ? (i = v(/^[0-7]$/.test(r) ? r : n.getDay()), u = n.getDay(), e = Tt(n) + ((i === 0 ? 7 : i) - (u === 0 ? 7 : u)) * a, t && !isNaN(t) && (e += t * f), new Date(e)) : n }

  function Nt(n, t, r) { if (n = bt(n), sn(n) && !isNaN(t)) { if (n.setDate(n.getDate() + v(t)), r === o) return new Date(Ft(n), jt(n), n.getDate()); if (r === u) return new Date(Tt(Nt(n, 1, o)) - 1) } return n }

  function Et(n) { return n = bt(n), sn(n) ? Math.floor((It(n) - It(Mt(n, 0, o))) / a) + 1 : n }

  function kt(n) { if (n = bt(n), sn(n)) { n.setHours(0, 0, 0, 0), n.setDate(n.getDate() + 3 - (n.getDay() + 6) % 7); var t = new Date(n.getFullYear(), 0, 4); return Math.round(((n.getTime() - t.getTime()) / a + (t.getDay() + 6) % 7 - 3) / 7) + 1 } return n }

  function Ft(n) { return n.getFullYear() }

  function jt(n) { return n.getMonth() }

  function Tt(n) { return n.getTime() }

  function Wt(n) { return Date.UTC(n[0], n[1], n[2], n[3], n[4], n[5], n[6]) }

  function It(n) { return Tt((t = n, new Date(Ft(t), jt(t), t.getDate()))); var t }

  function At() { return new Date() }

  function Ct(n) { return n && n.trim ? n.trim() : Rt(Ht(n)) }

  function Ht(n) { return n && n.trimLeft ? n.trimLeft() : Yt(n).replace(/^[\s\uFEFF\xA0]+/g, '') }

  function Rt(n) { return n && n.trimRight ? n.trimRight() : Yt(n).replace(/[\s\uFEFF\xA0]+$/g, '') } var Zt = qt(e)
  var zt = {}
  Hn(e, function(n, t) { zt[e[t]] = t }); var Lt = qt(zt)

  function $t(n, t) { var r = Yt(n); if (r.repeat) return r.repeat(t); var e = isNaN(t) ? [] : new Array(v(t)); return e.join(r) + (e.length > 0 ? r : '') }

  function Pt(n, t, r) { var e = Yt(n); return t >>= 0, r = nn(r) ? ' ' : '' + r, e.padStart ? e.padStart(t, r) : t > e.length ? ((t -= e.length) > r.length && (r += $t(r, t / r.length)), r.slice(0, t) + e) : e }

  function Ut(n, t, r) { var e = Yt(n); return t >>= 0, r = nn(r) ? ' ' : '' + r, e.padEnd ? e.padEnd(t, r) : t > e.length ? ((t -= e.length) > r.length && (r += $t(r, t / r.length)), e + r.slice(0, t)) : e }

  function Yt(n) { return an(n) ? dt(n) : '' + (V(n) ? '' : n) }

  function qt(t) { var r = new RegExp('(?:' + Tn(t).join('|') + ')', 'g'); return function(n) { return Yt(n).replace(r, function(n) { return t[n] }) } }

  function Bt(t, r) { return function(n) { return gn(n) ? r : n[t] } }

  function _t(n) { return Kt(n.split('?')[1] || '') }

  function Jt(n) { var t; var e; var r; var u; var i = '' + n; return i.indexOf('//') === 0 ? i = (c ? c.protocol : '') + i : i.indexOf('/') === 0 && (i = ur() + i), r = i.replace(/#.*/, '').match(/(\?.*)/), (u = { href: i, hash: '', host: '', hostname: '', protocol: '', port: '', search: r && r[1] && r[1].length > 1 ? r[1] : '' }).path = i.replace(/^([a-z0-9.+-]*:)\/\//, function(n, t) { return u.protocol = t, '' }).replace(/^([a-z0-9.+-]*)(:\d+)?\/?/, function(n, t, r) { return e = r || '', u.port = e.replace(':', ''), u.hostname = t, u.host = t + e, '/' }).replace(/(#.*)/, function(n, t) { return u.hash = t.length > 1 ? t : '', '' }), t = u.hash.match(/#((.*)\?|(.*))/), u.pathname = u.path.replace(/(\?|#.*).*/, ''), u.origin = u.protocol + '//' + u.host, u.hashKey = t && (t[2] || t[1]) || '', u.hashQuery = _t(u.hash), u.searchQuery = _t(u.search), u }

  function Kt(n) { var t; var r = {}; return n && on(n) && Y(n.split('&'), function(n) { t = n.split('='), r[p(t[0])] = p(t[1] || '') }), r }

  function Qt(n) { try { return n.setItem('__xe_t', 1), n.removeItem('__xe_t'), !0 } catch (n) { return !1 } }

  function Xt(n) { return navigator.userAgent.indexOf(n) > -1 }

  function Gt(n, t) {
    var r = parseFloat(t)
    var e = At()
    var u = Tt(e); switch (n) {
      case 'y':
        return Tt(Mt(e, r))
      case 'M':
        return Tt(Ot(e, r))
      case 'd':
        return Tt(Nt(e, r))
      case 'h':
      case 'H':
        return u + 60 * r * 60 * 1e3
      case 'm':
        return u + 60 * r * 1e3
      case 's':
        return u + 1e3 * r
    } return u
  }

  function Vt(n) { return (sn(n) ? n : new Date(n)).toUTCString() }

  function nr(n, t, r) {
    if (s) {
      var e; var u; var i; var o; var a; var f; var c = []
      var l = arguments; return tn(n) ? c = n : l.length > 1 ? c = [S({ name: n, value: t }, r)] : cn(n) && (c = [n]), c.length > 0 ? (Y(c, function(n) { e = S({}, b.cookies, n), i = [], e.name && (u = e.expires, i.push(h(e.name) + '=' + h(cn(e.value) ? JSON.stringify(e.value) : e.value)), u && (u = isNaN(u) ? u.replace(/^([0-9]+)(y|M|d|H|h|m|s)$/, function(n, t, r) { return Vt(Gt(r, t)) }) : /^[0-9]{11,13}$/.test(u) || sn(u) ? Vt(u) : Vt(Gt('d', u)), e.expires = u), Y(['expires', 'path', 'domain', 'secure'], function(n) { nn(e[n]) || i.push(e[n] && n === 'secure' ? n : n + '=' + e[n]) })), s.cookie = i.join('; ') }), !0) : (o = {}, (a = s.cookie) && Y(a.split('; '), function(n) { f = n.indexOf('='), o[p(n.substring(0, f))] = p(n.substring(f + 1) || '') }), l.length === 1 ? o[n] : o)
    } return !1
  }

  function tr(n, t, r) { return nr(n, t, r), nr }

  function rr(n, t) { nr(n, 0, S({ expires: -1 }, b.cookies, t)) }

  function er() { return Tn(nr()) }

  function ur() { return c ? c.origin || c.protocol + '//' + c.host : '' } return S(nr, { _c: !1, isKey: function(n) { return C(er(), n) }, set: tr, setItem: tr, get: nr, getItem: nr, remove: rr, removeItem: rr, keys: er, getJSON: nr }), S(r, { assign: S,
    extend: t,
    objectEach: x,
    lastObjectEach: M,
    objectMap: D,
    merge: function(n) { n || (n = {}); for (var t, r = arguments, e = r.length, u = 1; u < e; u++)(t = r[u]) && O(n, t); return n },
    uniq: w,
    union: function() { for (var n = arguments, t = [], r = 0, e = n.length; r < e; r++) t = t.concat(L(n[r])); return w(t) },
    sortBy: k,
    shuffle: F,
    sample: function(n, t) { var r = F(n); return arguments.length <= 1 ? r[0] : (t < r.length && (r.length = t || 0), r) },
    some: j,
    every: T,
    slice: W,
    filter: function(r, e, u) {
      var i = []; if (r && e) {
        if (r.filter) return r.filter(e, u)
        Hn(r, function(n, t) { e.call(u, n, t, r) && i.push(n) })
      } return i
    },
    find: I,
    findKey: A,
    includes: C,
    arrayIndexOf: H,
    arrayLastIndexOf: R,
    map: Z,
    reduce: function(n, t, r) {
      if (n) {
        var e; var u; var i = 0
        var o = r
        var a = arguments.length > 2
        var f = Tn(n); if (n.length && n.reduce) return u = function() { return t.apply(null, arguments) }, a ? n.reduce(u, o) : n.reduce(u); for (a && (i = 1, o = n[f[0]]), e = f.length; i < e; i++) o = t.call(null, o, n[f[i]], i, n); return o
      }
    },
    copyWithin: function(n, t, r, e) {
      if (tn(n) && n.copyWithin) return n.copyWithin(t, r, e); var u; var i; var o = t >> 0
      var a = r >> 0
      var f = n.length
      var c = arguments.length > 3 ? e >> 0 : f; if (o < f && (o = o >= 0 ? o : f + o) >= 0 && (a = a >= 0 ? a : f + a) < (c = c >= 0 ? c : f + c)) { for (u = 0, i = n.slice(a, c); o < f && !(i.length <= u); o++) n[o] = i[u++] } return n
    },
    chunk: function(n, t) {
      var r; var e = []
      var u = t >> 0 || 1; if (tn(n)) {
        if (u >= 0 && n.length > u) { for (r = 0; r < n.length;) e.push(n.slice(r, r + u)), r += u } else e = n.length ? [n] : n
      } return e
    },
    zip: function() { return z(arguments) },
    unzip: z,
    zipObject: function(n, r) { var e = {}; return r = r || [], Hn(Wn(n), function(n, t) { e[n] = r[t] }), e },
    flatten: function(n, t) { return tn(n) ? (function t(n, r) { var e = []; return Y(n, function(n) { e = e.concat(tn(n) ? r ? t(n, r) : n : [n]) }), e }(n, t)) : [] },
    toArray: L,
    includeArrays: $,
    pluck: function(n, t) { return Z(n, t) },
    invoke: P,
    invokeMap: U,
    arrayEach: Y,
    lastArrayEach: q,
    toArrayTree: function(n, t) {
      var r; var e; var u; var i; var o; var a = S({}, b.treeOptions, t)
      var f = a.strict
      var c = a.key
      var l = a.parentKey
      var s = a.children
      var h = a.sortKey
      var p = a.reverse
      var g = a.data
      var v = []
      var d = {}; return h && (n = k(Yn(n), h), p && (n = n.reverse())), r = Z(n, function(n) { return n[c] }), Hn(n, function(n) { e = n[c], g ? (u = {})[g] = n : u = n, i = n[l], d[e] = d[e] || [], d[i] = d[i] || [], d[i].push(u), u[c] = e, u[l] = i, u[s] = d[e], (!f || f && !i) && (C(r, i) || v.push(u)) }), f && (o = s, Hn(n, function(n) { n.children && !n.children.length && Bn(n, o) })), v
    },
    toTreeArray: function(n, t) {
      return (function r(e, n, u) {
        var i = u.children
        var o = u.data
        var a = u.clear; return Hn(n, function(n) {
          var t = n[i]
          o && (n = n[o]), e.push(n), t && t.length && r(e, t, u), a && delete n[i]
        }), e
      }([], n, S({}, b.treeOptions, t)))
    },
    findTree: B,
    eachTree: _,
    mapTree: J,
    filterTree: function(n, o, t, a) { var f = []; return n && o && _(n, function(n, t, r, e, u, i) { o.call(a, n, t, r, e, u, i) && f.push(n) }, t), f },
    searchTree: K,
    hasOwnProp: G,
    eqNull: V,
    isNaN: function(n) { return an(n) && isNaN(n) },
    isFinite: function(n) { return an(n) && isFinite(n) },
    isUndefined: nn,
    isArray: tn,
    isFloat: function(n) { return !(gn(n) || isNaN(n) || tn(n) || rn(n)) },
    isInteger: rn,
    isFunction: en,
    isBoolean: un,
    isString: on,
    isNumber: an,
    isRegExp: fn,
    isObject: cn,
    isPlainObject: ln,
    isDate: sn,
    isError: hn,
    isTypeError: function(n) { return !!n && n.constructor === TypeError },
    isEmpty: pn,
    isNull: gn,
    isSymbol: dn,
    isArguments: mn,
    isElement: function(n) { return !!(n && on(n.nodeName) && an(n.nodeType)) },
    isDocument: function(n) { return !(!n || !s || n.nodeType !== 9) },
    isWindow: function(n) { return l && !(!n || n !== n.window) },
    isFormData: function(n) { return yn && n instanceof FormData },
    isMap: function(n) { return bn && n instanceof Map },
    isWeakMap: function(n) { return Sn && n instanceof WeakMap },
    isSet: function(n) { return Dn && n instanceof Set },
    isWeakSet: function(n) { return xn && n instanceof WeakSet },
    isLeapYear: Mn,
    isMatch: function(r, e) {
      var n = Tn(r)
      var t = Tn(e); return !t.length || ($(n, t) ? j(t, function(t) { return Fn(n, function(n) { return n === t && On(r[n], e[t]) }) > -1 }) : On(r, e))
    },
    isEqual: On,
    isEqualWith: function(n, t, o) { return en(o) ? tt(n, t, function(n, t, r, e, u) { var i = o(n, t, r, e, u); return nn(i) ? Vn(n, t) : !!i }, o) : tt(n, t, Vn) },
    getType: function(n) { return gn(n) ? 'null' : dn(n) ? 'symbol' : sn(n) ? 'date' : tn(n) ? 'array' : fn(n) ? 'regexp' : hn(n) ? 'error' : typeof n },
    uniqueId: function(n) { return [n, ++wn].join('') },
    getSize: Nn,
    indexOf: En,
    lastIndexOf: kn,
    findIndexOf: Fn,
    findLastIndexOf: jn,
    toStringJSON: function(n) {
      if (cn(n)) return n; if (on(n)) try { return JSON.parse(n) } catch (n) {}
      return {}
    },
    toJSONString: function(n) { return JSON.stringify(n) || '' },
    keys: Tn,
    values: Wn,
    entries: In,
    pick: An,
    omit: Cn,
    first: function(n) { return Wn(n)[0] },
    last: function(n) { var t = Wn(n); return t[t.length - 1] },
    each: Hn,
    forOf: function(n, t, r) {
      if (n) {
        if (tn(n)) { for (var e = 0, u = n.length; e < u && !1 !== t.call(r, n[e], e, n); e++); } else {
          for (var i in n) { if (G(n, i) && !1 === t.call(r, n[i], i, n)) break }
        }
      }
    },
    lastForOf: function(n, t, r) {
      var e, u; if (n) {
        if (tn(n)) { for (e = n.length - 1; e >= 0 && !1 !== t.call(r, n[e], e, n); e--); } else { for (e = (u = Tn(n)).length - 1; e >= 0 && !1 !== t.call(r, n[u[e]], u[e], n); e--); }
      }
    },
    lastEach: Rn,
    has: function(n, t) {
      if (n) {
        if (G(n, t)) return !0; var r; var e; var u; var i; var o; var a; var f = rt(t)
        var c = 0
        var l = f.length; for (o = n; c < l && (a = !1, (i = (r = f[c]) ? r.match(d) : '') ? (e = i[1], u = i[2], e ? o[e] && G(o[e], u) && (a = !0, o = o[e][u]) : G(o, u) && (a = !0, o = o[u])) : G(o, r) && (a = !0, o = o[r]), a); c++) { if (c === l - 1) return !0 }
      } return !1
    },
    get: Zn,
    set: function(n, t, r) {
      if (n) {
        if (n[t] || G(n, t)) n[t] = r
        else { for (var e = n, u = rt(t), i = u.length, o = 0; o < i; o++) e = Ln(e, u[o], o === i - 1, r) }
      } return n
    },
    groupBy: $n,
    countBy: function(n, t, r) { var e = $n(n, t, r || this); return x(e, function(n, t) { e[t] = n.length }), e },
    clone: Yn,
    clear: qn,
    remove: Bn,
    range: function(n, t, r) {
      var e; var u; var i = []
      var o = arguments; if (o.length < 2 && (t = o[0], n = 0), u = t >> 0, (e = n >> 0) < t) { for (r = r >> 0 || 1; e < u; e += r) i.push(e) } return i
    },
    destructuring: function(t, n) {
      if (t && n) {
        var r = S.apply(this, [{}].concat(W(arguments, 1)))
        var e = Tn(r)
        Y(Tn(t), function(n) { C(e, n) && (t[n] = r[n]) })
      } return t
    },
    random: et,
    min: ut,
    max: it,
    commafy: function(n, t) {
      if (n = Yt(n).replace(/,/g, '')) {
        var r = S({ spaceNumber: 3, separator: ',' }, t)
        var e = r.digits || r.fixed
        var u = (e ? ot(n).toFixed(e) : n).split('.'); return u[0].replace(new RegExp('(?=(?!(\\b))(\\d{' + r.spaceNumber + '})+$)', 'g'), r.separator) + (u[1] ? '.' + u[1] : '')
      } return n
    },
    toFixedString: function(n, t) {
      var r = ht(n, t).split('.')
      var e = t ? [r[0], '.', Ut(r[1] || '', t, '0')].join('') : r[0]; return e.substring(0, 1) === '-' && parseFloat(e) === 0 ? t ? e.replace(/^-/, '') : '0' : e
    },
    toFixedNumber: function(n, t) { var r = (t ? ot : at)(ht(n, t)); return r === 0 ? 0 : r },
    toNumber: ot,
    toInteger: at,
    add: function(n, t) { return pt(ot(n), ot(t)) },
    subtract: function(n, t) {
      var r = ot(n)
      var e = ot(t)
      var u = dt(r)
      var i = dt(e)
      var o = gt(u)
      var a = gt(i)
      var f = Math.pow(10, Math.max(o, a)); return parseFloat(((r * f - e * f) / f).toFixed(a <= o ? o : a))
    },
    multiply: ft,
    divide: function(n, t) { return vt(ot(n), ot(t)) },
    sum: ct,
    mean: function(n, t, r) { return vt(ct(n, t, r), Nn(n)) },
    now: mt,
    timestamp: function(n, t) { if (n) { var r = bt(n, t); return sn(r) ? Tt(r) : r } return mt() },
    isDateSame: function(n, t, r) { return !(!n || !t) && (n = xt(n, r)) !== 'Invalid Date' && n === xt(t, r) },
    toStringDate: bt,
    toDateString: xt,
    getWhatYear: Mt,
    getWhatMonth: Ot,
    getWhatWeek: wt,
    getWhatDay: Nt,
    getYearDay: Et,
    getYearWeek: kt,
    getMonthWeek: function n(t) { var r; var e; var u = bt(t); return sn(u) ? ((e = wt(r = Ot(u, 0, o), 0, 1)) < r && (e = wt(r, 1, 1)), e <= u ? Math.floor((It(u) - It(e)) / f) + 1 : n(wt(u, 0, 1))) : u },
    getDayOfYear: function(n, t) { return n = bt(n), sn(n) ? Mn(Mt(n, t)) ? 366 : 365 : n },
    getDayOfMonth: function(n, t) { return n = bt(n), sn(n) ? Math.floor((Tt(Ot(n, t, u)) - Tt(Ot(n, t, o))) / a) + 1 : n },
    getDateDiff: function(n, t, r) {
      var e; var u; var i; var o; var a; var f; var c; var l = { done: !1, time: 0 }; if (n = bt(n), t = t ? bt(t) : At(), sn(n) && sn(t) && (e = Tt(n)) < (u = Tt(t))) { for (o = l.time = u - e, a = r && r.length > 0 ? r : b.dateDiffRules, l.done = !0, c = 0, f = a.length; c < f; c++) o >= (i = a[c])[1] ? c === f - 1 ? l[i[0]] = o || 0 : (l[i[0]] = Math.floor(o / i[1]), o -= l[i[0]] * i[1]) : l[i[0]] = 0 } return l
    },
    trim: Ct,
    trimLeft: Ht,
    trimRight: Rt,
    escape: Zt,
    unescape: Lt,
    camelCase: function(n) { return Yt(n).replace(/(-[a-zA-Z])/g, function(n, t) { return t.substring(1).toLocaleUpperCase() }) },
    kebabCase: function(n) { return Yt(n).replace(/([A-Z])/g, function(n, t) { return '-' + t.toLowerCase() }) },
    repeat: $t,
    padStart: Pt,
    padEnd: Ut,
    startsWith: function(n, t, r) { var e = Yt(n); return (arguments.length === 1 ? e : e.substring(r)).indexOf(t) === 0 },
    endsWith: function(n, t, r) {
      var e = Yt(n)
      var u = arguments.length; return u > 1 && (u > 2 ? e.substring(0, r).indexOf(t) === r - 1 : e.indexOf(t) === e.length - 1)
    },
    template: function(n, r) { return Yt(n).replace(/\{{2}([.\w[\]\s]+)\}{2}/g, function(n, t) { return Zn(r, Ct(t)) }) },
    toString: Yt,
    noop: function() {},
    property: Bt,
    bind: function(n, t) { var r = W(arguments, 2); return function() { return n.apply(t, W(arguments).concat(r)) } },
    once: function(n, t) {
      var r = !1
      var e = null
      var u = W(arguments, 2); return function() { return r || (e = n.apply(t, W(arguments).concat(u)), r = !0), e }
    },
    after: function(t, r, e) {
      var u = 0
      var i = []; return function() { var n = arguments; ++u <= t && i.push(n[0]), t <= u && r.apply(e, [i].concat(W(n))) }
    },
    before: function(t, r, e) {
      var u = 0
      var i = []; return e = e || this,
      function() { var n = arguments; ++u < t && (i.push(n[0]), r.apply(e, [i].concat(W(n)))) }
    },
    throttle: function(n, t, r) {
      var e; var u; var i = r || {}
      var o = !1
      var a = 0
      var f = !('leading' in i) || i.leading
      var c = 'trailing' in i && i.trailing
      var l = function() { o = !0, n.apply(u, e), a = setTimeout(s, t) }
      var s = function() { a = 0, o || !0 !== c || l() }
      var h = function() { e = arguments, u = this, o = !1, a === 0 && (!0 === f ? l() : !0 === c && (a = setTimeout(s, t))) }; return h.cancel = function() { var n = a !== 0; return clearTimeout(a), o = !1, a = 0, n }, h
    },
    debounce: function(n, t, r) {
      var e; var u; var i = r || {}
      var o = !1
      var a = 0
      var f = typeof r === 'boolean'
      var c = 'leading' in i ? i.leading : f
      var l = 'trailing' in i ? i.trailing : !f
      var s = function() { o = !0, a = 0, n.apply(u, e) }
      var h = function() { !0 === c && (a = 0), o || !0 !== l || s() }
      var p = function() { o = !1, e = arguments, u = this, a === 0 ? !0 === c && s() : clearTimeout(a), a = setTimeout(h, t) }; return p.cancel = function() { var n = a !== 0; return clearTimeout(a), a = 0, n }, p
    },
    delay: function(n, t) {
      var r = W(arguments, 2)
      var e = this; return setTimeout(function() { n.apply(e, r) }, t)
    },
    unserialize: Kt,
    // eslint-disable-next-line no-unused-expressions
    serialize: function(n) { var r; var e = []; return Hn(n, function(n, t) { nn(n) || (r = tn(n), ln(n) || r ? e = e.concat(function r(n, e, u) { var i; var o = []; return Hn(n, function(n, t) { i = tn(n), ln(n) || i ? o = o.concat(r(n, e + '[' + t + ']', i)) : o.push(h(e + '[' + (u ? '' : t) + ']') + '=' + h(gn(n) ? '' : n)) }), o }(n, t, r)) : e.push(h(t) + '=' + h(gn(n) ? '' : n))) }), e.join('&').replace(/%20/g, '+') },
    parseUrl: Jt,
    getBaseURL: function() {
      if (c) {
        var n = c.pathname
        var t = kn(n, '/') + 1; return ur() + (t === n.length ? n : n.substring(0, t))
      } return ''
    },
    locat: function() { return c ? Jt(c.href) : {} },
    browse: function() {
      var t; var n; var r; var e = !1
      var u = { isNode: !1, isMobile: e, isPC: !1, isDoc: !!s }; return l || typeof process === i ? (r = Xt('Edge'), n = Xt('Chrome'), e = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent), u.isDoc && (t = s.body || s.documentElement, Y(['webkit', 'khtml', 'moz', 'ms', 'o'], function(n) { u['-' + n] = !!t[n + 'MatchesSelector'] })), S(u, { edge: r, firefox: Xt('Firefox'), msie: !r && u['-ms'], safari: !n && !r && Xt('Safari'), isMobile: e, isPC: !e, isLocalStorage: Qt(l.localStorage), isSessionStorage: Qt(l.sessionStorage) })) : u.isNode = !0, u
    },
    cookie: nr }), r
}))
