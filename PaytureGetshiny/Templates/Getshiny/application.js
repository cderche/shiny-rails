if (function() {
        var t, e, i, n, s, o, r, a, l, c, h, u, d, p, f, m, g, v, y, b, w, C, x, _, S, k, T, E, D, P, M, A, I, O, $, N, L, R, H, z, F, j, W, U, q, B, Y, V, X, G = [].slice,
            K = {}.hasOwnProperty,
            Q = function(t, e) {
                function i() {
                    this.constructor = t
                }
                for (var n in e) K.call(e, n) && (t[n] = e[n]);
                return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
            },
            Z = [].indexOf || function(t) {
                for (var e = 0, i = this.length; i > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        for (w = {
                catchupTime: 100,
                initialRate: .03,
                minTime: 250,
                ghostTime: 100,
                maxProgressPerFrame: 20,
                easeFactor: 1.25,
                startOnPageLoad: !0,
                restartOnPushState: !0,
                restartOnRequestAfter: 500,
                target: "body",
                elements: {
                    checkInterval: 100,
                    selectors: ["body"]
                },
                eventLag: {
                    minSamples: 10,
                    sampleCount: 3,
                    lagThreshold: 3
                },
                ajax: {
                    trackMethods: ["GET"],
                    trackWebSockets: !0,
                    ignoreURLs: []
                }
            }, D = function() {
                var t;
                return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
            }, M = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, b = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == M && (M = function(t) {
                return setTimeout(t, 50)
            }, b = function(t) {
                return clearTimeout(t)
            }), I = function(t) {
                var e, i;
                return e = D(), (i = function() {
                    var n;
                    return n = D() - e, n >= 33 ? (e = D(), t(n, function() {
                        return M(i)
                    })) : setTimeout(i, 33 - n)
                })()
            }, A = function() {
                var t, e, i;
                return i = arguments[0], e = arguments[1], t = 3 <= arguments.length ? G.call(arguments, 2) : [], "function" == typeof i[e] ? i[e].apply(i, t) : i[e]
            }, C = function() {
                var t, e, i, n, s, o, r;
                for (e = arguments[0], n = 2 <= arguments.length ? G.call(arguments, 1) : [], o = 0, r = n.length; r > o; o++)
                    if (i = n[o])
                        for (t in i) K.call(i, t) && (s = i[t], null != e[t] && "object" == typeof e[t] && null != s && "object" == typeof s ? C(e[t], s) : e[t] = s);
                return e
            }, g = function(t) {
                var e, i, n, s, o;
                for (i = e = 0, s = 0, o = t.length; o > s; s++) n = t[s], i += Math.abs(n), e++;
                return i / e
            }, _ = function(t, e) {
                var i, n, s;
                if (null == t && (t = "options"), null == e && (e = !0), s = document.querySelector("[data-pace-" + t + "]")) {
                    if (i = s.getAttribute("data-pace-" + t), !e) return i;
                    try {
                        return JSON.parse(i)
                    } catch (t) {
                        return n = t, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", n) : void 0
                    }
                }
            }, r = function() {
                function t() {}
                return t.prototype.on = function(t, e, i, n) {
                    var s;
                    return null == n && (n = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
                        handler: e,
                        ctx: i,
                        once: n
                    })
                }, t.prototype.once = function(t, e, i) {
                    return this.on(t, e, i, !0)
                }, t.prototype.off = function(t, e) {
                    var i, n, s;
                    if (null != (null != (n = this.bindings) ? n[t] : void 0)) {
                        if (null == e) return delete this.bindings[t];
                        for (i = 0, s = []; i < this.bindings[t].length;) s.push(this.bindings[t][i].handler === e ? this.bindings[t].splice(i, 1) : i++);
                        return s
                    }
                }, t.prototype.trigger = function() {
                    var t, e, i, n, s, o, r, a, l;
                    if (i = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], null != (r = this.bindings) ? r[i] : void 0) {
                        for (s = 0, l = []; s < this.bindings[i].length;) a = this.bindings[i][s], n = a.handler, e = a.ctx, o = a.once, n.apply(null != e ? e : this, t), l.push(o ? this.bindings[i].splice(s, 1) : s++);
                        return l
                    }
                }, t
            }(), c = window.Pace || {}, window.Pace = c, C(c, r.prototype), P = c.options = C({}, w, window.paceOptions, _()), Y = ["ajax", "document", "eventLag", "elements"], W = 0, q = Y.length; q > W; W++) L = Y[W], P[L] === !0 && (P[L] = w[L]);
        l = function(t) {
            function e() {
                return V = e.__super__.constructor.apply(this, arguments)
            }
            return Q(e, t), e
        }(Error), e = function() {
            function t() {
                this.progress = 0
            }
            return t.prototype.getElement = function() {
                var t;
                if (null == this.el) {
                    if (t = document.querySelector(P.target), !t) throw new l;
                    this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
                }
                return this.el
            }, t.prototype.finish = function() {
                var t;
                return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
            }, t.prototype.update = function(t) {
                return this.progress = t, this.render()
            }, t.prototype.destroy = function() {
                try {
                    this.getElement().parentNode.removeChild(this.getElement())
                } catch (t) {
                    l = t
                }
                return this.el = void 0
            }, t.prototype.render = function() {
                var t, e, i, n, s, o, r;
                if (null == document.querySelector(P.target)) return !1;
                for (t = this.getElement(), n = "translate3d(" + this.progress + "%, 0, 0)", r = ["webkitTransform", "msTransform", "transform"], s = 0, o = r.length; o > s; s++) e = r[s], t.children[0].style[e] = n;
                return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? i = "99" : (i = this.progress < 10 ? "0" : "", i += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + i)), this.lastRenderedProgress = this.progress
            }, t.prototype.done = function() {
                return this.progress >= 100
            }, t
        }(), a = function() {
            function t() {
                this.bindings = {}
            }
            return t.prototype.trigger = function(t, e) {
                var i, n, s, o, r;
                if (null != this.bindings[t]) {
                    for (o = this.bindings[t], r = [], n = 0, s = o.length; s > n; n++) i = o[n], r.push(i.call(this, e));
                    return r
                }
            }, t.prototype.on = function(t, e) {
                var i;
                return null == (i = this.bindings)[t] && (i[t] = []), this.bindings[t].push(e)
            }, t
        }(), j = window.XMLHttpRequest, F = window.XDomainRequest, z = window.WebSocket, x = function(t, e) {
            var i, n, s;
            s = [];
            for (n in e.prototype) try {
                s.push(null == t[n] && "function" != typeof e[n] ? "function" == typeof Object.defineProperty ? Object.defineProperty(t, n, {
                    get: function() {
                        return e.prototype[n]
                    },
                    configurable: !0,
                    enumerable: !0
                }) : t[n] = e.prototype[n] : void 0)
            } catch (t) {
                i = t
            }
            return s
        }, T = [], c.ignore = function() {
            var t, e, i;
            return e = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], T.unshift("ignore"), i = e.apply(null, t), T.shift(), i
        }, c.track = function() {
            var t, e, i;
            return e = arguments[0], t = 2 <= arguments.length ? G.call(arguments, 1) : [], T.unshift("track"), i = e.apply(null, t), T.shift(), i
        }, N = function(t) {
            var e;
            if (null == t && (t = "GET"), "track" === T[0]) return "force";
            if (!T.length && P.ajax) {
                if ("socket" === t && P.ajax.trackWebSockets) return !0;
                if (e = t.toUpperCase(), Z.call(P.ajax.trackMethods, e) >= 0) return !0
            }
            return !1
        }, h = function(t) {
            function e() {
                var t, i = this;
                e.__super__.constructor.apply(this, arguments), t = function(t) {
                    var e;
                    return e = t.open, t.open = function(n, s) {
                        return N(n) && i.trigger("request", {
                            type: n,
                            url: s,
                            request: t
                        }), e.apply(t, arguments)
                    }
                }, window.XMLHttpRequest = function(e) {
                    var i;
                    return i = new j(e), t(i), i
                };
                try {
                    x(window.XMLHttpRequest, j)
                } catch (t) {}
                if (null != F) {
                    window.XDomainRequest = function() {
                        var e;
                        return e = new F, t(e), e
                    };
                    try {
                        x(window.XDomainRequest, F)
                    } catch (t) {}
                }
                if (null != z && P.ajax.trackWebSockets) {
                    window.WebSocket = function(t, e) {
                        var n;
                        return n = null != e ? new z(t, e) : new z(t), N("socket") && i.trigger("request", {
                            type: "socket",
                            url: t,
                            protocols: e,
                            request: n
                        }), n
                    };
                    try {
                        x(window.WebSocket, z)
                    } catch (t) {}
                }
            }
            return Q(e, t), e
        }(a), U = null, S = function() {
            return null == U && (U = new h), U
        }, $ = function(t) {
            var e, i, n, s;
            for (s = P.ajax.ignoreURLs, i = 0, n = s.length; n > i; i++)
                if (e = s[i], "string" == typeof e) {
                    if (-1 !== t.indexOf(e)) return !0
                } else if (e.test(t)) return !0;
            return !1
        }, S().on("request", function(e) {
            var i, n, s, o, r;
            return o = e.type, s = e.request, r = e.url, $(r) ? void 0 : c.running || P.restartOnRequestAfter === !1 && "force" !== N(o) ? void 0 : (n = arguments, i = P.restartOnRequestAfter || 0, "boolean" == typeof i && (i = 0), setTimeout(function() {
                var e, i, r, a, l, h;
                if (e = "socket" === o ? s.readyState < 2 : 0 < (a = s.readyState) && 4 > a) {
                    for (c.restart(), l = c.sources, h = [], i = 0, r = l.length; r > i; i++) {
                        if (L = l[i], L instanceof t) {
                            L.watch.apply(L, n);
                            break
                        }
                        h.push(void 0)
                    }
                    return h
                }
            }, i))
        }), t = function() {
            function t() {
                var t = this;
                this.elements = [], S().on("request", function() {
                    return t.watch.apply(t, arguments)
                })
            }
            return t.prototype.watch = function(t) {
                var e, i, n, s;
                return n = t.type, e = t.request, s = t.url, $(s) ? void 0 : (i = "socket" === n ? new p(e) : new f(e), this.elements.push(i))
            }, t
        }(), f = function() {
            function t(t) {
                var e, i, n, s, o, r, a = this;
                if (this.progress = 0, null != window.ProgressEvent)
                    for (i = null, t.addEventListener("progress", function(t) {
                            return a.progress = t.lengthComputable ? 100 * t.loaded / t.total : a.progress + (100 - a.progress) / 2
                        }, !1), r = ["load", "abort", "timeout", "error"], n = 0, s = r.length; s > n; n++) e = r[n], t.addEventListener(e, function() {
                        return a.progress = 100
                    }, !1);
                else o = t.onreadystatechange, t.onreadystatechange = function() {
                    var e;
                    return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof o ? o.apply(null, arguments) : void 0
                }
            }
            return t
        }(), p = function() {
            function t(t) {
                var e, i, n, s, o = this;
                for (this.progress = 0, s = ["error", "open"], i = 0, n = s.length; n > i; i++) e = s[i], t.addEventListener(e, function() {
                    return o.progress = 100
                }, !1)
            }
            return t
        }(), n = function() {
            function t(t) {
                var e, i, n, o;
                for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), o = t.selectors, i = 0, n = o.length; n > i; i++) e = o[i], this.elements.push(new s(e))
            }
            return t
        }(), s = function() {
            function t(t) {
                this.selector = t, this.progress = 0, this.check()
            }
            return t.prototype.check = function() {
                var t = this;
                return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                    return t.check()
                }, P.elements.checkInterval)
            }, t.prototype.done = function() {
                return this.progress = 100
            }, t
        }(), i = function() {
            function t() {
                var t, e, i = this;
                this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
                    return null != i.states[document.readyState] && (i.progress = i.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
                }
            }
            return t.prototype.states = {
                loading: 0,
                interactive: 50,
                complete: 100
            }, t
        }(), o = function() {
            function t() {
                var t, e, i, n, s, o = this;
                this.progress = 0, t = 0, s = [], n = 0, i = D(), e = setInterval(function() {
                    var r;
                    return r = D() - i - 50, i = D(), s.push(r), s.length > P.eventLag.sampleCount && s.shift(), t = g(s), ++n >= P.eventLag.minSamples && t < P.eventLag.lagThreshold ? (o.progress = 100, clearInterval(e)) : o.progress = 100 * (3 / (t + 3))
                }, 50)
            }
            return t
        }(), d = function() {
            function t(t) {
                this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = P.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = A(this.source, "progress"))
            }
            return t.prototype.tick = function(t, e) {
                var i;
                return null == e && (e = A(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / P.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), i = 1 - Math.pow(this.progress / 100, P.easeFactor), this.progress += i * this.rate * t, this.progress = Math.min(this.lastProgress + P.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
            }, t
        }(), R = null, O = null, v = null, H = null, m = null, y = null, c.running = !1, k = function() {
            return P.restartOnPushState ? c.restart() : void 0
        }, null != window.history.pushState && (B = window.history.pushState, window.history.pushState = function() {
            return k(), B.apply(window.history, arguments)
        }), null != window.history.replaceState && (X = window.history.replaceState, window.history.replaceState = function() {
            return k(), X.apply(window.history, arguments)
        }), u = {
            ajax: t,
            elements: n,
            document: i,
            eventLag: o
        }, (E = function() {
            var t, i, n, s, o, r, a, l;
            for (c.sources = R = [], r = ["ajax", "elements", "document", "eventLag"], i = 0, s = r.length; s > i; i++) t = r[i], P[t] !== !1 && R.push(new u[t](P[t]));
            for (l = null != (a = P.extraSources) ? a : [], n = 0, o = l.length; o > n; n++) L = l[n], R.push(new L(P));
            return c.bar = v = new e, O = [], H = new d
        })(), c.stop = function() {
            return c.trigger("stop"), c.running = !1, v.destroy(), y = !0, null != m && ("function" == typeof b && b(m), m = null), E()
        }, c.restart = function() {
            return c.trigger("restart"), c.stop(), c.start()
        }, c.go = function() {
            var t;
            return c.running = !0, v.render(), t = D(), y = !1, m = I(function(e, i) {
                var n, s, o, r, a, l, h, u, p, f, m, g, b, w, C, x;
                for (u = 100 - v.progress, s = m = 0, o = !0, l = g = 0, w = R.length; w > g; l = ++g)
                    for (L = R[l], f = null != O[l] ? O[l] : O[l] = [], a = null != (x = L.elements) ? x : [L], h = b = 0, C = a.length; C > b; h = ++b) r = a[h], p = null != f[h] ? f[h] : f[h] = new d(r), o &= p.done, p.done || (s++, m += p.tick(e));
                return n = m / s, v.update(H.tick(e, n)), v.done() || o || y ? (v.update(100), c.trigger("done"), setTimeout(function() {
                    return v.finish(), c.running = !1, c.trigger("hide")
                }, Math.max(P.ghostTime, Math.max(P.minTime - (D() - t), 0)))) : i()
            })
        }, c.start = function(t) {
            C(P, t), c.running = !0;
            try {
                v.render()
            } catch (t) {
                l = t
            }
            return document.querySelector(".pace") ? (c.trigger("start"), c.go()) : setTimeout(c.start, 50)
        }, "function" == typeof define && define.amd ? define(["pace"], function() {
            return c
        }) : "object" == typeof exports ? module.exports = c : P.startOnPageLoad && c.start()
    }.call(this), ! function(t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function i(t) {
            var e = t.length,
                i = st.type(t);
            return "function" !== i && !st.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
        }

        function n(t, e, i) {
            if (st.isFunction(e)) return st.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            });
            if (e.nodeType) return st.grep(t, function(t) {
                return t === e !== i
            });
            if ("string" == typeof e) {
                if (dt.test(e)) return st.filter(e, t, i);
                e = st.filter(e, t)
            }
            return st.grep(t, function(t) {
                return st.inArray(t, e) >= 0 !== i
            })
        }

        function s(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function o(t) {
            var e = wt[t] = {};
            return st.each(t.match(bt) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function r() {
            ft.addEventListener ? (ft.removeEventListener("DOMContentLoaded", a, !1), t.removeEventListener("load", a, !1)) : (ft.detachEvent("onreadystatechange", a), t.detachEvent("onload", a))
        }

        function a() {
            (ft.addEventListener || "load" === event.type || "complete" === ft.readyState) && (r(), st.ready())
        }

        function l(t, e, i) {
            if (void 0 === i && 1 === t.nodeType) {
                var n = "data-" + e.replace(kt, "-$1").toLowerCase();
                if (i = t.getAttribute(n), "string" == typeof i) {
                    try {
                        i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : St.test(i) ? st.parseJSON(i) : i)
                    } catch (t) {}
                    st.data(t, e, i)
                } else i = void 0
            }
            return i
        }

        function c(t) {
            var e;
            for (e in t)
                if (("data" !== e || !st.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function h(t, e, i, n) {
            if (st.acceptData(t)) {
                var s, o, r = st.expando,
                    a = t.nodeType,
                    l = a ? st.cache : t,
                    c = a ? t[r] : t[r] && r;
                if (c && l[c] && (n || l[c].data) || void 0 !== i || "string" != typeof e) return c || (c = a ? t[r] = X.pop() || st.guid++ : r), l[c] || (l[c] = a ? {} : {
                    toJSON: st.noop
                }), ("object" == typeof e || "function" == typeof e) && (n ? l[c] = st.extend(l[c], e) : l[c].data = st.extend(l[c].data, e)), o = l[c], n || (o.data || (o.data = {}), o = o.data), void 0 !== i && (o[st.camelCase(e)] = i), "string" == typeof e ? (s = o[e], null == s && (s = o[st.camelCase(e)])) : s = o, s
            }
        }

        function u(t, e, i) {
            if (st.acceptData(t)) {
                var n, s, o = t.nodeType,
                    r = o ? st.cache : t,
                    a = o ? t[st.expando] : st.expando;
                if (r[a]) {
                    if (e && (n = i ? r[a] : r[a].data)) {
                        st.isArray(e) ? e = e.concat(st.map(e, st.camelCase)) : e in n ? e = [e] : (e = st.camelCase(e), e = e in n ? [e] : e.split(" ")), s = e.length;
                        for (; s--;) delete n[e[s]];
                        if (i ? !c(n) : !st.isEmptyObject(n)) return
                    }(i || (delete r[a].data, c(r[a]))) && (o ? st.cleanData([t], !0) : it.deleteExpando || r != r.window ? delete r[a] : r[a] = null)
                }
            }
        }

        function d() {
            return !0
        }

        function p() {
            return !1
        }

        function f() {
            try {
                return ft.activeElement
            } catch (t) {}
        }

        function m(t) {
            var e = Lt.split("|"),
                i = t.createDocumentFragment();
            if (i.createElement)
                for (; e.length;) i.createElement(e.pop());
            return i
        }

        function g(t, e) {
            var i, n, s = 0,
                o = typeof t.getElementsByTagName !== _t ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== _t ? t.querySelectorAll(e || "*") : void 0;
            if (!o)
                for (o = [], i = t.childNodes || t; null != (n = i[s]); s++) !e || st.nodeName(n, e) ? o.push(n) : st.merge(o, g(n, e));
            return void 0 === e || e && st.nodeName(t, e) ? st.merge([t], o) : o
        }

        function v(t) {
            Mt.test(t.type) && (t.defaultChecked = t.checked)
        }

        function y(t, e) {
            return st.nodeName(t, "table") && st.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function b(t) {
            return t.type = (null !== st.find.attr(t, "type")) + "/" + t.type, t
        }

        function w(t) {
            var e = Vt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function C(t, e) {
            for (var i, n = 0; null != (i = t[n]); n++) st._data(i, "globalEval", !e || st._data(e[n], "globalEval"))
        }

        function x(t, e) {
            if (1 === e.nodeType && st.hasData(t)) {
                var i, n, s, o = st._data(t),
                    r = st._data(e, o),
                    a = o.events;
                if (a) {
                    delete r.handle, r.events = {};
                    for (i in a)
                        for (n = 0, s = a[i].length; s > n; n++) st.event.add(e, i, a[i][n])
                }
                r.data && (r.data = st.extend({}, r.data))
            }
        }

        function _(t, e) {
            var i, n, s;
            if (1 === e.nodeType) {
                if (i = e.nodeName.toLowerCase(), !it.noCloneEvent && e[st.expando]) {
                    s = st._data(e);
                    for (n in s.events) st.removeEvent(e, n, s.handle);
                    e.removeAttribute(st.expando)
                }
                "script" === i && e.text !== t.text ? (b(e).text = t.text, w(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), it.html5Clone && t.innerHTML && !st.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && Mt.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
            }
        }

        function S(e, i) {
            var n, s = st(i.createElement(e)).appendTo(i.body),
                o = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(s[0])) ? n.display : st.css(s[0], "display");
            return s.detach(), o
        }

        function k(t) {
            var e = ft,
                i = Jt[t];
            return i || (i = S(t, e), "none" !== i && i || (Zt = (Zt || st("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Zt[0].contentWindow || Zt[0].contentDocument).document, e.write(), e.close(), i = S(t, e), Zt.detach()), Jt[t] = i), i
        }

        function T(t, e) {
            return {
                get: function() {
                    var i = t();
                    if (null != i) return i ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function E(t, e) {
            if (e in t) return e;
            for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, s = de.length; s--;)
                if (e = de[s] + i, e in t) return e;
            return n
        }

        function D(t, e) {
            for (var i, n, s, o = [], r = 0, a = t.length; a > r; r++) n = t[r], n.style && (o[r] = st._data(n, "olddisplay"), i = n.style.display, e ? (o[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && Dt(n) && (o[r] = st._data(n, "olddisplay", k(n.nodeName)))) : (s = Dt(n), (i && "none" !== i || !s) && st._data(n, "olddisplay", s ? i : st.css(n, "display"))));
            for (r = 0; a > r; r++) n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[r] || "" : "none"));
            return t
        }

        function P(t, e, i) {
            var n = le.exec(e);
            return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
        }

        function M(t, e, i, n, s) {
            for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > o; o += 2) "margin" === i && (r += st.css(t, i + Et[o], !0, s)), n ? ("content" === i && (r -= st.css(t, "padding" + Et[o], !0, s)), "margin" !== i && (r -= st.css(t, "border" + Et[o] + "Width", !0, s))) : (r += st.css(t, "padding" + Et[o], !0, s), "padding" !== i && (r += st.css(t, "border" + Et[o] + "Width", !0, s)));
            return r
        }

        function A(t, e, i) {
            var n = !0,
                s = "width" === e ? t.offsetWidth : t.offsetHeight,
                o = te(t),
                r = it.boxSizing && "border-box" === st.css(t, "boxSizing", !1, o);
            if (0 >= s || null == s) {
                if (s = ee(t, e, o), (0 > s || null == s) && (s = t.style[e]), ne.test(s)) return s;
                n = r && (it.boxSizingReliable() || s === t.style[e]), s = parseFloat(s) || 0
            }
            return s + M(t, e, i || (r ? "border" : "content"), n, o) + "px"
        }

        function I(t, e, i, n, s) {
            return new I.prototype.init(t, e, i, n, s)
        }

        function O() {
            return setTimeout(function() {
                pe = void 0
            }), pe = st.now()
        }

        function $(t, e) {
            var i, n = {
                    height: t
                },
                s = 0;
            for (e = e ? 1 : 0; 4 > s; s += 2 - e) i = Et[s], n["margin" + i] = n["padding" + i] = t;
            return e && (n.opacity = n.width = t), n
        }

        function N(t, e, i) {
            for (var n, s = (be[e] || []).concat(be["*"]), o = 0, r = s.length; r > o; o++)
                if (n = s[o].call(i, e, t)) return n
        }

        function L(t, e, i) {
            var n, s, o, r, a, l, c, h, u = this,
                d = {},
                p = t.style,
                f = t.nodeType && Dt(t),
                m = st._data(t, "fxshow");
            i.queue || (a = st._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                a.unqueued || l()
            }), a.unqueued++, u.always(function() {
                u.always(function() {
                    a.unqueued--, st.queue(t, "fx").length || a.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [p.overflow, p.overflowX, p.overflowY], c = st.css(t, "display"), h = "none" === c ? st._data(t, "olddisplay") || k(t.nodeName) : c, "inline" === h && "none" === st.css(t, "float") && (it.inlineBlockNeedsLayout && "inline" !== k(t.nodeName) ? p.zoom = 1 : p.display = "inline-block")), i.overflow && (p.overflow = "hidden", it.shrinkWrapBlocks() || u.always(function() {
                p.overflow = i.overflow[0], p.overflowX = i.overflow[1], p.overflowY = i.overflow[2]
            }));
            for (n in e)
                if (s = e[n], me.exec(s)) {
                    if (delete e[n], o = o || "toggle" === s, s === (f ? "hide" : "show")) {
                        if ("show" !== s || !m || void 0 === m[n]) continue;
                        f = !0
                    }
                    d[n] = m && m[n] || st.style(t, n)
                } else c = void 0;
            if (st.isEmptyObject(d)) "inline" === ("none" === c ? k(t.nodeName) : c) && (p.display = c);
            else {
                m ? "hidden" in m && (f = m.hidden) : m = st._data(t, "fxshow", {}), o && (m.hidden = !f), f ? st(t).show() : u.done(function() {
                    st(t).hide()
                }), u.done(function() {
                    var e;
                    st._removeData(t, "fxshow");
                    for (e in d) st.style(t, e, d[e])
                });
                for (n in d) r = N(f ? m[n] : 0, n, u), n in m || (m[n] = r.start, f && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
            }
        }

        function R(t, e) {
            var i, n, s, o, r;
            for (i in t)
                if (n = st.camelCase(i), s = e[n], o = t[i], st.isArray(o) && (s = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), r = st.cssHooks[n], r && "expand" in r) {
                    o = r.expand(o), delete t[n];
                    for (i in o) i in t || (t[i] = o[i], e[i] = s)
                } else e[n] = s
        }

        function H(t, e, i) {
            var n, s, o = 0,
                r = ye.length,
                a = st.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (s) return !1;
                    for (var e = pe || O(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, o = 1 - n, r = 0, l = c.tweens.length; l > r; r++) c.tweens[r].run(o);
                    return a.notifyWith(t, [c, o, i]), 1 > o && l ? i : (a.resolveWith(t, [c]), !1)
                },
                c = a.promise({
                    elem: t,
                    props: st.extend({}, e),
                    opts: st.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: pe || O(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = st.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                        return c.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? c.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; n > i; i++) c.tweens[i].run(1);
                        return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                    }
                }),
                h = c.props;
            for (R(h, c.opts.specialEasing); r > o; o++)
                if (n = ye[o].call(c, t, h, c.opts)) return n;
            return st.map(h, N, c), st.isFunction(c.opts.start) && c.opts.start.call(t, c), st.fx.timer(st.extend(l, {
                elem: t,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function z(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, s = 0,
                    o = e.toLowerCase().match(bt) || [];
                if (st.isFunction(i))
                    for (; n = o[s++];) "+" === n.charAt(0) ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function F(t, e, i, n) {
            function s(a) {
                var l;
                return o[a] = !0, st.each(t[a] || [], function(t, a) {
                    var c = a(e, i, n);
                    return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c), s(c), !1)
                }), l
            }
            var o = {},
                r = t === Ue;
            return s(e.dataTypes[0]) || !o["*"] && s("*")
        }

        function j(t, e) {
            var i, n, s = st.ajaxSettings.flatOptions || {};
            for (n in e) void 0 !== e[n] && ((s[n] ? t : i || (i = {}))[n] = e[n]);
            return i && st.extend(!0, t, i), t
        }

        function W(t, e, i) {
            for (var n, s, o, r, a = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === s && (s = t.mimeType || e.getResponseHeader("Content-Type"));
            if (s)
                for (r in a)
                    if (a[r] && a[r].test(s)) {
                        l.unshift(r);
                        break
                    }
            if (l[0] in i) o = l[0];
            else {
                for (r in i) {
                    if (!l[0] || t.converters[r + " " + l[0]]) {
                        o = r;
                        break
                    }
                    n || (n = r)
                }
                o = o || n
            }
            return o ? (o !== l[0] && l.unshift(o), i[o]) : void 0
        }

        function U(t, e, i, n) {
            var s, o, r, a, l, c = {},
                h = t.dataTypes.slice();
            if (h[1])
                for (r in t.converters) c[r.toLowerCase()] = t.converters[r];
            for (o = h.shift(); o;)
                if (t.responseFields[o] && (i[t.responseFields[o]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = h.shift())
                    if ("*" === o) o = l;
                    else if ("*" !== l && l !== o) {
                if (r = c[l + " " + o] || c["* " + o], !r)
                    for (s in c)
                        if (a = s.split(" "), a[1] === o && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                            r === !0 ? r = c[s] : c[s] !== !0 && (o = a[0], h.unshift(a[1]));
                            break
                        }
                if (r !== !0)
                    if (r && t["throws"]) e = r(e);
                    else try {
                        e = r(e)
                    } catch (t) {
                        return {
                            state: "parsererror",
                            error: r ? t : "No conversion from " + l + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function q(t, e, i, n) {
            var s;
            if (st.isArray(e)) st.each(e, function(e, s) {
                i || Ye.test(t) ? n(t, s) : q(t + "[" + ("object" == typeof s ? e : "") + "]", s, i, n)
            });
            else if (i || "object" !== st.type(e)) n(t, e);
            else
                for (s in e) q(t + "[" + s + "]", e[s], i, n)
        }

        function B() {
            try {
                return new t.XMLHttpRequest
            } catch (t) {}
        }

        function Y() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {}
        }

        function V(t) {
            return st.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
        }
        var X = [],
            G = X.slice,
            K = X.concat,
            Q = X.push,
            Z = X.indexOf,
            J = {},
            tt = J.toString,
            et = J.hasOwnProperty,
            it = {},
            nt = "1.11.1",
            st = function(t, e) {
                return new st.fn.init(t, e)
            },
            ot = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            rt = /^-ms-/,
            at = /-([\da-z])/gi,
            lt = function(t, e) {
                return e.toUpperCase()
            };
        st.fn = st.prototype = {
            jquery: nt,
            constructor: st,
            selector: "",
            length: 0,
            toArray: function() {
                return G.call(this)
            },
            get: function(t) {
                return null != t ? 0 > t ? this[t + this.length] : this[t] : G.call(this)
            },
            pushStack: function(t) {
                var e = st.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            },
            each: function(t, e) {
                return st.each(this, t, e)
            },
            map: function(t) {
                return this.pushStack(st.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return this.pushStack(G.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    i = +t + (0 > t ? e : 0);
                return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: Q,
            sort: X.sort,
            splice: X.splice
        }, st.extend = st.fn.extend = function() {
            var t, e, i, n, s, o, r = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof r && (c = r, r = arguments[a] || {}, a++), "object" == typeof r || st.isFunction(r) || (r = {}), a === l && (r = this, a--); l > a; a++)
                if (null != (s = arguments[a]))
                    for (n in s) t = r[n], i = s[n], r !== i && (c && i && (st.isPlainObject(i) || (e = st.isArray(i))) ? (e ? (e = !1, o = t && st.isArray(t) ? t : []) : o = t && st.isPlainObject(t) ? t : {}, r[n] = st.extend(c, o, i)) : void 0 !== i && (r[n] = i));
            return r
        }, st.extend({
            expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === st.type(t)
            },
            isArray: Array.isArray || function(t) {
                return "array" === st.type(t)
            },
            isWindow: function(t) {
                return null != t && t == t.window
            },
            isNumeric: function(t) {
                return !st.isArray(t) && t - parseFloat(t) >= 0
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            isPlainObject: function(t) {
                var e;
                if (!t || "object" !== st.type(t) || t.nodeType || st.isWindow(t)) return !1;
                try {
                    if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1
                } catch (t) {
                    return !1
                }
                if (it.ownLast)
                    for (e in t) return et.call(t, e);
                for (e in t);
                return void 0 === e || et.call(t, e)
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? J[tt.call(t)] || "object" : typeof t
            },
            globalEval: function(e) {
                e && st.trim(e) && (t.execScript || function(e) {
                    t.eval.call(t, e)
                })(e)
            },
            camelCase: function(t) {
                return t.replace(rt, "ms-").replace(at, lt)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e, n) {
                var s, o = 0,
                    r = t.length,
                    a = i(t);
                if (n) {
                    if (a)
                        for (; r > o && (s = e.apply(t[o], n), s !== !1); o++);
                    else
                        for (o in t)
                            if (s = e.apply(t[o], n), s === !1) break
                } else if (a)
                    for (; r > o && (s = e.call(t[o], o, t[o]), s !== !1); o++);
                else
                    for (o in t)
                        if (s = e.call(t[o], o, t[o]), s === !1) break; return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(ot, "")
            },
            makeArray: function(t, e) {
                var n = e || [];
                return null != t && (i(Object(t)) ? st.merge(n, "string" == typeof t ? [t] : t) : Q.call(n, t)), n
            },
            inArray: function(t, e, i) {
                var n;
                if (e) {
                    if (Z) return Z.call(e, t, i);
                    for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                        if (i in e && e[i] === t) return i
                }
                return -1
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, s = t.length; i > n;) t[s++] = e[n++];
                if (i !== i)
                    for (; void 0 !== e[n];) t[s++] = e[n++];
                return t.length = s, t
            },
            grep: function(t, e, i) {
                for (var n, s = [], o = 0, r = t.length, a = !i; r > o; o++) n = !e(t[o], o), n !== a && s.push(t[o]);
                return s
            },
            map: function(t, e, n) {
                var s, o = 0,
                    r = t.length,
                    a = i(t),
                    l = [];
                if (a)
                    for (; r > o; o++) s = e(t[o], o, n), null != s && l.push(s);
                else
                    for (o in t) s = e(t[o], o, n), null != s && l.push(s);
                return K.apply([], l)
            },
            guid: 1,
            proxy: function(t, e) {
                var i, n, s;
                return "string" == typeof e && (s = t[e], e = t, t = s), st.isFunction(t) ? (i = G.call(arguments, 2), n = function() {
                    return t.apply(e || this, i.concat(G.call(arguments)))
                }, n.guid = t.guid = t.guid || st.guid++, n) : void 0
            },
            now: function() {
                return +new Date
            },
            support: it
        }), st.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            J["[object " + e + "]"] = e.toLowerCase()
        });
        var ct = function(t) {
            function e(t, e, i, n) {
                var s, o, r, a, l, c, u, p, f, m;
                if ((e ? e.ownerDocument || e : F) !== I && A(e), e = e || I, i = i || [], !t || "string" != typeof t) return i;
                if (1 !== (a = e.nodeType) && 9 !== a) return [];
                if ($ && !n) {
                    if (s = yt.exec(t))
                        if (r = s[1]) {
                            if (9 === a) {
                                if (o = e.getElementById(r), !o || !o.parentNode) return i;
                                if (o.id === r) return i.push(o), i
                            } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(r)) && H(e, o) && o.id === r) return i.push(o), i
                        } else {
                            if (s[2]) return J.apply(i, e.getElementsByTagName(t)), i;
                            if ((r = s[3]) && C.getElementsByClassName && e.getElementsByClassName) return J.apply(i, e.getElementsByClassName(r)), i
                        }
                    if (C.qsa && (!N || !N.test(t))) {
                        if (p = u = z, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                            for (c = k(t), (u = e.getAttribute("id")) ? p = u.replace(wt, "\\$&") : e.setAttribute("id", p), p = "[id='" + p + "'] ", l = c.length; l--;) c[l] = p + d(c[l]);
                            f = bt.test(t) && h(e.parentNode) || e, m = c.join(",")
                        }
                        if (m) try {
                            return J.apply(i, f.querySelectorAll(m)), i
                        } catch (t) {} finally {
                            u || e.removeAttribute("id")
                        }
                    }
                }
                return E(t.replace(lt, "$1"), e, i, n)
            }

            function i() {
                function t(i, n) {
                    return e.push(i + " ") > x.cacheLength && delete t[e.shift()], t[i + " "] = n
                }
                var e = [];
                return t
            }

            function n(t) {
                return t[z] = !0, t
            }

            function s(t) {
                var e = I.createElement("div");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var i = t.split("|"), n = t.length; n--;) x.attrHandle[i[n]] = e
            }

            function r(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || X) - (~t.sourceIndex || X);
                if (n) return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === e) return -1;
                return t ? 1 : -1
            }

            function a(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return "input" === i && e.type === t
                }
            }

            function l(t) {
                return function(e) {
                    var i = e.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && e.type === t
                }
            }

            function c(t) {
                return n(function(e) {
                    return e = +e, n(function(i, n) {
                        for (var s, o = t([], i.length, e), r = o.length; r--;) i[s = o[r]] && (i[s] = !(n[s] = i[s]))
                    })
                })
            }

            function h(t) {
                return t && typeof t.getElementsByTagName !== V && t
            }

            function u() {}

            function d(t) {
                for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
                return n
            }

            function p(t, e, i) {
                var n = e.dir,
                    s = i && "parentNode" === n,
                    o = W++;
                return e.first ? function(e, i, o) {
                    for (; e = e[n];)
                        if (1 === e.nodeType || s) return t(e, i, o)
                } : function(e, i, r) {
                    var a, l, c = [j, o];
                    if (r) {
                        for (; e = e[n];)
                            if ((1 === e.nodeType || s) && t(e, i, r)) return !0
                    } else
                        for (; e = e[n];)
                            if (1 === e.nodeType || s) {
                                if (l = e[z] || (e[z] = {}), (a = l[n]) && a[0] === j && a[1] === o) return c[2] = a[2];
                                if (l[n] = c, c[2] = t(e, i, r)) return !0
                            }
                }
            }

            function f(t) {
                return t.length > 1 ? function(e, i, n) {
                    for (var s = t.length; s--;)
                        if (!t[s](e, i, n)) return !1;
                    return !0
                } : t[0]
            }

            function m(t, i, n) {
                for (var s = 0, o = i.length; o > s; s++) e(t, i[s], n);
                return n
            }

            function g(t, e, i, n, s) {
                for (var o, r = [], a = 0, l = t.length, c = null != e; l > a; a++)(o = t[a]) && (!i || i(o, n, s)) && (r.push(o), c && e.push(a));
                return r
            }

            function v(t, e, i, s, o, r) {
                return s && !s[z] && (s = v(s)), o && !o[z] && (o = v(o, r)), n(function(n, r, a, l) {
                    var c, h, u, d = [],
                        p = [],
                        f = r.length,
                        v = n || m(e || "*", a.nodeType ? [a] : a, []),
                        y = !t || !n && e ? v : g(v, d, t, a, l),
                        b = i ? o || (n ? t : f || s) ? [] : r : y;
                    if (i && i(y, b, a, l), s)
                        for (c = g(b, p), s(c, [], a, l), h = c.length; h--;)(u = c[h]) && (b[p[h]] = !(y[p[h]] = u));
                    if (n) {
                        if (o || t) {
                            if (o) {
                                for (c = [], h = b.length; h--;)(u = b[h]) && c.push(y[h] = u);
                                o(null, b = [], c, l)
                            }
                            for (h = b.length; h--;)(u = b[h]) && (c = o ? et.call(n, u) : d[h]) > -1 && (n[c] = !(r[c] = u))
                        }
                    } else b = g(b === r ? b.splice(f, b.length) : b), o ? o(null, r, b, l) : J.apply(r, b)
                })
            }

            function y(t) {
                for (var e, i, n, s = t.length, o = x.relative[t[0].type], r = o || x.relative[" "], a = o ? 1 : 0, l = p(function(t) {
                        return t === e
                    }, r, !0), c = p(function(t) {
                        return et.call(e, t) > -1
                    }, r, !0), h = [function(t, i, n) {
                        return !o && (n || i !== D) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                    }]; s > a; a++)
                    if (i = x.relative[t[a].type]) h = [p(f(h), i)];
                    else {
                        if (i = x.filter[t[a].type].apply(null, t[a].matches), i[z]) {
                            for (n = ++a; s > n && !x.relative[t[n].type]; n++);
                            return v(a > 1 && f(h), a > 1 && d(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(lt, "$1"), i, n > a && y(t.slice(a, n)), s > n && y(t = t.slice(n)), s > n && d(t))
                        }
                        h.push(i)
                    }
                return f(h)
            }

            function b(t, i) {
                var s = i.length > 0,
                    o = t.length > 0,
                    r = function(n, r, a, l, c) {
                        var h, u, d, p = 0,
                            f = "0",
                            m = n && [],
                            v = [],
                            y = D,
                            b = n || o && x.find.TAG("*", c),
                            w = j += null == y ? 1 : Math.random() || .1,
                            C = b.length;
                        for (c && (D = r !== I && r); f !== C && null != (h = b[f]); f++) {
                            if (o && h) {
                                for (u = 0; d = t[u++];)
                                    if (d(h, r, a)) {
                                        l.push(h);
                                        break
                                    }
                                c && (j = w)
                            }
                            s && ((h = !d && h) && p--, n && m.push(h))
                        }
                        if (p += f, s && f !== p) {
                            for (u = 0; d = i[u++];) d(m, v, r, a);
                            if (n) {
                                if (p > 0)
                                    for (; f--;) m[f] || v[f] || (v[f] = Q.call(l));
                                v = g(v)
                            }
                            J.apply(l, v), c && !n && v.length > 0 && p + i.length > 1 && e.uniqueSort(l)
                        }
                        return c && (j = w, D = y), m
                    };
                return s ? n(r) : r
            }
            var w, C, x, _, S, k, T, E, D, P, M, A, I, O, $, N, L, R, H, z = "sizzle" + -new Date,
                F = t.document,
                j = 0,
                W = 0,
                U = i(),
                q = i(),
                B = i(),
                Y = function(t, e) {
                    return t === e && (M = !0), 0
                },
                V = "undefined",
                X = 1 << 31,
                G = {}.hasOwnProperty,
                K = [],
                Q = K.pop,
                Z = K.push,
                J = K.push,
                tt = K.slice,
                et = K.indexOf || function(t) {
                    for (var e = 0, i = this.length; i > e; e++)
                        if (this[e] === t) return e;
                    return -1
                },
                it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                nt = "[\\x20\\t\\r\\n\\f]",
                st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ot = st.replace("w", "w#"),
                rt = "\\[" + nt + "*(" + st + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ot + "))|)" + nt + "*\\]",
                at = ":(" + st + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                ct = new RegExp("^" + nt + "*," + nt + "*"),
                ht = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
                dt = new RegExp(at),
                pt = new RegExp("^" + ot + "$"),
                ft = {
                    ID: new RegExp("^#(" + st + ")"),
                    CLASS: new RegExp("^\\.(" + st + ")"),
                    TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + rt),
                    PSEUDO: new RegExp("^" + at),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + it + ")$", "i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                },
                mt = /^(?:input|select|textarea|button)$/i,
                gt = /^h\d$/i,
                vt = /^[^{]+\{\s*\[native \w/,
                yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                bt = /[+~]/,
                wt = /'|\\/g,
                Ct = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                xt = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                };
            try {
                J.apply(K = tt.call(F.childNodes), F.childNodes), K[F.childNodes.length].nodeType
            } catch (t) {
                J = {
                    apply: K.length ? function(t, e) {
                        Z.apply(t, tt.call(e))
                    } : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++];);
                        t.length = i - 1
                    }
                }
            }
            C = e.support = {}, S = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, A = e.setDocument = function(t) {
                var e, i = t ? t.ownerDocument || t : F,
                    n = i.defaultView;
                return i !== I && 9 === i.nodeType && i.documentElement ? (I = i, O = i.documentElement, $ = !S(i), n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", function() {
                    A()
                }, !1) : n.attachEvent && n.attachEvent("onunload", function() {
                    A()
                })), C.attributes = s(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), C.getElementsByTagName = s(function(t) {
                    return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
                }), C.getElementsByClassName = vt.test(i.getElementsByClassName) && s(function(t) {
                    return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                }), C.getById = s(function(t) {
                    return O.appendChild(t).id = z, !i.getElementsByName || !i.getElementsByName(z).length
                }), C.getById ? (x.find.ID = function(t, e) {
                    if (typeof e.getElementById !== V && $) {
                        var i = e.getElementById(t);
                        return i && i.parentNode ? [i] : []
                    }
                }, x.filter.ID = function(t) {
                    var e = t.replace(Ct, xt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete x.find.ID, x.filter.ID = function(t) {
                    var e = t.replace(Ct, xt);
                    return function(t) {
                        var i = typeof t.getAttributeNode !== V && t.getAttributeNode("id");
                        return i && i.value === e
                    }
                }), x.find.TAG = C.getElementsByTagName ? function(t, e) {
                    return typeof e.getElementsByTagName !== V ? e.getElementsByTagName(t) : void 0
                } : function(t, e) {
                    var i, n = [],
                        s = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; i = o[s++];) 1 === i.nodeType && n.push(i);
                        return n
                    }
                    return o
                }, x.find.CLASS = C.getElementsByClassName && function(t, e) {
                    return typeof e.getElementsByClassName !== V && $ ? e.getElementsByClassName(t) : void 0
                }, L = [], N = [], (C.qsa = vt.test(i.querySelectorAll)) && (s(function(t) {
                    t.innerHTML = "<select msallowclip=''><option selected=''></option></select>", t.querySelectorAll("[msallowclip^='']").length && N.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || N.push("\\[" + nt + "*(?:value|" + it + ")"), t.querySelectorAll(":checked").length || N.push(":checked")
                }), s(function(t) {
                    var e = i.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && N.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), N.push(",.*:")
                })), (C.matchesSelector = vt.test(R = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && s(function(t) {
                    C.disconnectedMatch = R.call(t, "div"), R.call(t, "[s!='']:x"), L.push("!=", at)
                }), N = N.length && new RegExp(N.join("|")), L = L.length && new RegExp(L.join("|")), e = vt.test(O.compareDocumentPosition), H = e || vt.test(O.contains) ? function(t, e) {
                    var i = 9 === t.nodeType ? t.documentElement : t,
                        n = e && e.parentNode;
                    return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, Y = e ? function(t, e) {
                    if (t === e) return M = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !C.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === F && H(F, t) ? -1 : e === i || e.ownerDocument === F && H(F, e) ? 1 : P ? et.call(P, t) - et.call(P, e) : 0 : 4 & n ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return M = !0, 0;
                    var n, s = 0,
                        o = t.parentNode,
                        a = e.parentNode,
                        l = [t],
                        c = [e];
                    if (!o || !a) return t === i ? -1 : e === i ? 1 : o ? -1 : a ? 1 : P ? et.call(P, t) - et.call(P, e) : 0;
                    if (o === a) return r(t, e);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (n = e; n = n.parentNode;) c.unshift(n);
                    for (; l[s] === c[s];) s++;
                    return s ? r(l[s], c[s]) : l[s] === F ? -1 : c[s] === F ? 1 : 0
                }, i) : I
            }, e.matches = function(t, i) {
                return e(t, null, null, i)
            }, e.matchesSelector = function(t, i) {
                if ((t.ownerDocument || t) !== I && A(t), i = i.replace(ut, "='$1']"), !(!C.matchesSelector || !$ || L && L.test(i) || N && N.test(i))) try {
                    var n = R.call(t, i);
                    if (n || C.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                } catch (t) {}
                return e(i, I, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== I && A(t), H(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== I && A(t);
                var i = x.attrHandle[e.toLowerCase()],
                    n = i && G.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !$) : void 0;
                return void 0 !== n ? n : C.attributes || !$ ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, i = [],
                    n = 0,
                    s = 0;
                if (M = !C.detectDuplicates, P = !C.sortStable && t.slice(0), t.sort(Y), M) {
                    for (; e = t[s++];) e === t[s] && (n = i.push(s));
                    for (; n--;) t.splice(i[n], 1)
                }
                return P = null, t
            }, _ = e.getText = function(t) {
                var e, i = "",
                    n = 0,
                    s = t.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) i += _(t)
                    } else if (3 === s || 4 === s) return t.nodeValue
                } else
                    for (; e = t[n++];) i += _(e);
                return i
            }, x = e.selectors = {
                cacheLength: 50,
                createPseudo: n,
                match: ft,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(Ct, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(Ct, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, i = !t[6] && t[2];
                        return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && dt.test(i) && (e = k(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(Ct, xt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = U[t + " "];
                        return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && U(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== V && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(s) {
                            var o = e.attr(s, t);
                            return null == o ? "!=" === i : !i || (o += "", "=" === i ? o === n : "!=" === i ? o !== n : "^=" === i ? n && 0 === o.indexOf(n) : "*=" === i ? n && o.indexOf(n) > -1 : "$=" === i ? n && o.slice(-n.length) === n : "~=" === i ? (" " + o + " ").indexOf(n) > -1 : "|=" === i && (o === n || o.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, i, n, s) {
                        var o = "nth" !== t.slice(0, 3),
                            r = "last" !== t.slice(-4),
                            a = "of-type" === e;
                        return 1 === n && 0 === s ? function(t) {
                            return !!t.parentNode
                        } : function(e, i, l) {
                            var c, h, u, d, p, f, m = o !== r ? "nextSibling" : "previousSibling",
                                g = e.parentNode,
                                v = a && e.nodeName.toLowerCase(),
                                y = !l && !a;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (u = e; u = u[m];)
                                            if (a ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                        f = m = "only" === t && !f && "nextSibling"
                                    }
                                    return !0
                                }
                                if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                    for (h = g[z] || (g[z] = {}), c = h[t] || [], p = c[0] === j && c[1], d = c[0] === j && c[2], u = p && g.childNodes[p]; u = ++p && u && u[m] || (d = p = 0) || f.pop();)
                                        if (1 === u.nodeType && ++d && u === e) {
                                            h[t] = [j, p, d];
                                            break
                                        }
                                } else if (y && (c = (e[z] || (e[z] = {}))[t]) && c[0] === j) d = c[1];
                                else
                                    for (;
                                        (u = ++p && u && u[m] || (d = p = 0) || f.pop()) && ((a ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++d || (y && ((u[z] || (u[z] = {}))[t] = [j, d]), u !== e)););
                                return d -= s, d === n || d % n === 0 && d / n >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, i) {
                        var s, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[z] ? o(i) : o.length > 1 ? (s = [t, t, "", i], x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                            for (var n, s = o(t, i), r = s.length; r--;) n = et.call(t, s[r]), t[n] = !(e[n] = s[r])
                        }) : function(t) {
                            return o(t, 0, s)
                        }) : o
                    }
                },
                pseudos: {
                    not: n(function(t) {
                        var e = [],
                            i = [],
                            s = T(t.replace(lt, "$1"));
                        return s[z] ? n(function(t, e, i, n) {
                            for (var o, r = s(t, null, n, []), a = t.length; a--;)(o = r[a]) && (t[a] = !(e[a] = o))
                        }) : function(t, n, o) {
                            return e[0] = t, s(e, null, o, i), !i.pop()
                        }
                    }),
                    has: n(function(t) {
                        return function(i) {
                            return e(t, i).length > 0
                        }
                    }),
                    contains: n(function(t) {
                        return function(e) {
                            return (e.textContent || e.innerText || _(e)).indexOf(t) > -1
                        }
                    }),
                    lang: n(function(t) {
                        return pt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(Ct, xt).toLowerCase(),
                            function(e) {
                                var i;
                                do
                                    if (i = $ ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                                while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === O
                    },
                    focus: function(t) {
                        return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return t.disabled === !1
                    },
                    disabled: function(t) {
                        return t.disabled === !0
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !x.pseudos.empty(t)
                    },
                    header: function(t) {
                        return gt.test(t.nodeName)
                    },
                    input: function(t) {
                        return mt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, i) {
                        return [0 > i ? i + e : i]
                    }),
                    even: c(function(t, e) {
                        for (var i = 0; e > i; i += 2) t.push(i);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var i = 1; e > i; i += 2) t.push(i);
                        return t
                    }),
                    lt: c(function(t, e, i) {
                        for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                        return t
                    }),
                    gt: c(function(t, e, i) {
                        for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                        return t
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) x.pseudos[w] = a(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) x.pseudos[w] = l(w);
            return u.prototype = x.filters = x.pseudos, x.setFilters = new u, k = e.tokenize = function(t, i) {
                var n, s, o, r, a, l, c, h = q[t + " "];
                if (h) return i ? 0 : h.slice(0);
                for (a = t, l = [], c = x.preFilter; a;) {
                    (!n || (s = ct.exec(a))) && (s && (a = a.slice(s[0].length) || a), l.push(o = [])), n = !1, (s = ht.exec(a)) && (n = s.shift(), o.push({
                        value: n,
                        type: s[0].replace(lt, " ")
                    }), a = a.slice(n.length));
                    for (r in x.filter) !(s = ft[r].exec(a)) || c[r] && !(s = c[r](s)) || (n = s.shift(), o.push({
                        value: n,
                        type: r,
                        matches: s
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return i ? a.length : a ? e.error(t) : q(t, l).slice(0)
            }, T = e.compile = function(t, e) {
                var i, n = [],
                    s = [],
                    o = B[t + " "];
                if (!o) {
                    for (e || (e = k(t)), i = e.length; i--;) o = y(e[i]), o[z] ? n.push(o) : s.push(o);
                    o = B(t, b(s, n)), o.selector = t
                }
                return o
            }, E = e.select = function(t, e, i, n) {
                var s, o, r, a, l, c = "function" == typeof t && t,
                    u = !n && k(t = c.selector || t);
                if (i = i || [], 1 === u.length) {
                    if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (r = o[0]).type && C.getById && 9 === e.nodeType && $ && x.relative[o[1].type]) {
                        if (e = (x.find.ID(r.matches[0].replace(Ct, xt), e) || [])[0], !e) return i;
                        c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (s = ft.needsContext.test(t) ? 0 : o.length; s-- && (r = o[s], !x.relative[a = r.type]);)
                        if ((l = x.find[a]) && (n = l(r.matches[0].replace(Ct, xt), bt.test(o[0].type) && h(e.parentNode) || e))) {
                            if (o.splice(s, 1), t = n.length && d(o), !t) return J.apply(i, n), i;
                            break
                        }
                }
                return (c || T(t, u))(n, e, !$, i, bt.test(t) && h(e.parentNode) || e), i
            }, C.sortStable = z.split("").sort(Y).join("") === z, C.detectDuplicates = !!M, A(), C.sortDetached = s(function(t) {
                return 1 & t.compareDocumentPosition(I.createElement("div"))
            }), s(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(t, e, i) {
                return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), C.attributes && s(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function(t, e, i) {
                return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
            }), s(function(t) {
                return null == t.getAttribute("disabled")
            }) || o(it, function(t, e, i) {
                var n;
                return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }), e
        }(t);
        st.find = ct, st.expr = ct.selectors, st.expr[":"] = st.expr.pseudos, st.unique = ct.uniqueSort, st.text = ct.getText, st.isXMLDoc = ct.isXML, st.contains = ct.contains;
        var ht = st.expr.match.needsContext,
            ut = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            dt = /^.[^:#\[\.,]*$/;
        st.filter = function(t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? st.find.matchesSelector(n, t) ? [n] : [] : st.find.matches(t, st.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, st.fn.extend({
            find: function(t) {
                var e, i = [],
                    n = this,
                    s = n.length;
                if ("string" != typeof t) return this.pushStack(st(t).filter(function() {
                    for (e = 0; s > e; e++)
                        if (st.contains(n[e], this)) return !0
                }));
                for (e = 0; s > e; e++) st.find(t, n[e], i);
                return i = this.pushStack(s > 1 ? st.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
            },
            filter: function(t) {
                return this.pushStack(n(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(n(this, t || [], !0))
            },
            is: function(t) {
                return !!n(this, "string" == typeof t && ht.test(t) ? st(t) : t || [], !1).length
            }
        });
        var pt, ft = t.document,
            mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            gt = st.fn.init = function(t, e) {
                var i, n;
                if (!t) return this;
                if ("string" == typeof t) {
                    if (i = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : mt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || pt).find(t) : this.constructor(e).find(t);
                    if (i[1]) {
                        if (e = e instanceof st ? e[0] : e, st.merge(this, st.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : ft, !0)), ut.test(i[1]) && st.isPlainObject(e))
                            for (i in e) st.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                        return this
                    }
                    if (n = ft.getElementById(i[2]), n && n.parentNode) {
                        if (n.id !== i[2]) return pt.find(t);
                        this.length = 1, this[0] = n
                    }
                    return this.context = ft, this.selector = t, this
                }
                return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : st.isFunction(t) ? "undefined" != typeof pt.ready ? pt.ready(t) : t(st) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), st.makeArray(t, this))
            };
        gt.prototype = st.fn, pt = st(ft);
        var vt = /^(?:parents|prev(?:Until|All))/,
            yt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        st.extend({
            dir: function(t, e, i) {
                for (var n = [], s = t[e]; s && 9 !== s.nodeType && (void 0 === i || 1 !== s.nodeType || !st(s).is(i));) 1 === s.nodeType && n.push(s), s = s[e];
                return n
            },
            sibling: function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            }
        }), st.fn.extend({
            has: function(t) {
                var e, i = st(t, this),
                    n = i.length;
                return this.filter(function() {
                    for (e = 0; n > e; e++)
                        if (st.contains(this, i[e])) return !0
                })
            },
            closest: function(t, e) {
                for (var i, n = 0, s = this.length, o = [], r = ht.test(t) || "string" != typeof t ? st(t, e || this.context) : 0; s > n; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (r ? r.index(i) > -1 : 1 === i.nodeType && st.find.matchesSelector(i, t))) {
                            o.push(i);
                            break
                        }
                return this.pushStack(o.length > 1 ? st.unique(o) : o)
            },
            index: function(t) {
                return t ? "string" == typeof t ? st.inArray(this[0], st(t)) : st.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(st.unique(st.merge(this.get(), st(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), st.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return st.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return st.dir(t, "parentNode", i)
            },
            next: function(t) {
                return s(t, "nextSibling")
            },
            prev: function(t) {
                return s(t, "previousSibling")
            },
            nextAll: function(t) {
                return st.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return st.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return st.dir(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return st.dir(t, "previousSibling", i)
            },
            siblings: function(t) {
                return st.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return st.sibling(t.firstChild)
            },
            contents: function(t) {
                return st.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : st.merge([], t.childNodes)
            }
        }, function(t, e) {
            st.fn[t] = function(i, n) {
                var s = st.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (s = st.filter(n, s)), this.length > 1 && (yt[t] || (s = st.unique(s)), vt.test(t) && (s = s.reverse())), this.pushStack(s)
            }
        });
        var bt = /\S+/g,
            wt = {};
        st.Callbacks = function(t) {
            t = "string" == typeof t ? wt[t] || o(t) : st.extend({}, t);
            var e, i, n, s, r, a, l = [],
                c = !t.once && [],
                h = function(o) {
                    for (i = t.memory && o, n = !0, r = a || 0, a = 0, s = l.length, e = !0; l && s > r; r++)
                        if (l[r].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                            i = !1;
                            break
                        }
                    e = !1, l && (c ? c.length && h(c.shift()) : i ? l = [] : u.disable())
                },
                u = {
                    add: function() {
                        if (l) {
                            var n = l.length;
                            ! function e(i) {
                                st.each(i, function(i, n) {
                                    var s = st.type(n);
                                    "function" === s ? t.unique && u.has(n) || l.push(n) : n && n.length && "string" !== s && e(n)
                                })
                            }(arguments), e ? s = l.length : i && (a = n, h(i))
                        }
                        return this
                    },
                    remove: function() {
                        return l && st.each(arguments, function(t, i) {
                            for (var n;
                                (n = st.inArray(i, l, n)) > -1;) l.splice(n, 1), e && (s >= n && s--, r >= n && r--)
                        }), this
                    },
                    has: function(t) {
                        return t ? st.inArray(t, l) > -1 : !(!l || !l.length)
                    },
                    empty: function() {
                        return l = [], s = 0, this
                    },
                    disable: function() {
                        return l = c = i = void 0, this
                    },
                    disabled: function() {
                        return !l
                    },
                    lock: function() {
                        return c = void 0, i || u.disable(), this
                    },
                    locked: function() {
                        return !c
                    },
                    fireWith: function(t, i) {
                        return !l || n && !c || (i = i || [], i = [t, i.slice ? i.slice() : i], e ? c.push(i) : h(i)), this
                    },
                    fire: function() {
                        return u.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return u
        }, st.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", st.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", st.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", st.Callbacks("memory")]
                    ],
                    i = "pending",
                    n = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return s.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return st.Deferred(function(i) {
                                st.each(e, function(e, o) {
                                    var r = st.isFunction(t[e]) && t[e];
                                    s[o[1]](function() {
                                        var t = r && r.apply(this, arguments);
                                        t && st.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[o[0] + "With"](this === n ? i.promise() : this, r ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? st.extend(t, n) : n
                        }
                    },
                    s = {};
                return n.pipe = n.then, st.each(e, function(t, o) {
                    var r = o[2],
                        a = o[3];
                    n[o[1]] = r.add, a && r.add(function() {
                        i = a
                    }, e[1 ^ t][2].disable, e[2][2].lock), s[o[0]] = function() {
                        return s[o[0] + "With"](this === s ? n : this, arguments), this
                    }, s[o[0] + "With"] = r.fireWith
                }), n.promise(s), t && t.call(s, s), s
            },
            when: function(t) {
                var e, i, n, s = 0,
                    o = G.call(arguments),
                    r = o.length,
                    a = 1 !== r || t && st.isFunction(t.promise) ? r : 0,
                    l = 1 === a ? t : st.Deferred(),
                    c = function(t, i, n) {
                        return function(s) {
                            i[t] = this, n[t] = arguments.length > 1 ? G.call(arguments) : s, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                        }
                    };
                if (r > 1)
                    for (e = new Array(r), i = new Array(r), n = new Array(r); r > s; s++) o[s] && st.isFunction(o[s].promise) ? o[s].promise().done(c(s, n, o)).fail(l.reject).progress(c(s, i, e)) : --a;
                return a || l.resolveWith(n, o), l.promise()
            }
        });
        var Ct;
        st.fn.ready = function(t) {
            return st.ready.promise().done(t), this
        }, st.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? st.readyWait++ : st.ready(!0)
            },
            ready: function(t) {
                if (t === !0 ? !--st.readyWait : !st.isReady) {
                    if (!ft.body) return setTimeout(st.ready);
                    st.isReady = !0, t !== !0 && --st.readyWait > 0 || (Ct.resolveWith(ft, [st]), st.fn.triggerHandler && (st(ft).triggerHandler("ready"), st(ft).off("ready")))
                }
            }
        }), st.ready.promise = function(e) {
            if (!Ct)
                if (Ct = st.Deferred(), "complete" === ft.readyState) setTimeout(st.ready);
                else if (ft.addEventListener) ft.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1);
            else {
                ft.attachEvent("onreadystatechange", a), t.attachEvent("onload", a);
                var i = !1;
                try {
                    i = null == t.frameElement && ft.documentElement
                } catch (t) {}
                i && i.doScroll && ! function t() {
                    if (!st.isReady) {
                        try {
                            i.doScroll("left")
                        } catch (e) {
                            return setTimeout(t, 50)
                        }
                        r(), st.ready()
                    }
                }()
            }
            return Ct.promise(e)
        };
        var xt, _t = "undefined";
        for (xt in st(it)) break;
        it.ownLast = "0" !== xt, it.inlineBlockNeedsLayout = !1, st(function() {
                var t, e, i, n;
                i = ft.getElementsByTagName("body")[0], i && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== _t && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", it.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (i.style.zoom = 1)), i.removeChild(n))
            }),
            function() {
                var t = ft.createElement("div");
                if (null == it.deleteExpando) {
                    it.deleteExpando = !0;
                    try {
                        delete t.test
                    } catch (t) {
                        it.deleteExpando = !1
                    }
                }
                t = null
            }(), st.acceptData = function(t) {
                var e = st.noData[(t.nodeName + " ").toLowerCase()],
                    i = +t.nodeType || 1;
                return (1 === i || 9 === i) && (!e || e !== !0 && t.getAttribute("classid") === e)
            };
        var St = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            kt = /([A-Z])/g;
        st.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(t) {
                return t = t.nodeType ? st.cache[t[st.expando]] : t[st.expando], !!t && !c(t)
            },
            data: function(t, e, i) {
                return h(t, e, i)
            },
            removeData: function(t, e) {
                return u(t, e)
            },
            _data: function(t, e, i) {
                return h(t, e, i, !0)
            },
            _removeData: function(t, e) {
                return u(t, e, !0)
            }
        }), st.fn.extend({
            data: function(t, e) {
                var i, n, s, o = this[0],
                    r = o && o.attributes;
                if (void 0 === t) {
                    if (this.length && (s = st.data(o), 1 === o.nodeType && !st._data(o, "parsedAttrs"))) {
                        for (i = r.length; i--;) r[i] && (n = r[i].name, 0 === n.indexOf("data-") && (n = st.camelCase(n.slice(5)), l(o, n, s[n])));
                        st._data(o, "parsedAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof t ? this.each(function() {
                    st.data(this, t)
                }) : arguments.length > 1 ? this.each(function() {
                    st.data(this, t, e)
                }) : o ? l(o, t, st.data(o, t)) : void 0
            },
            removeData: function(t) {
                return this.each(function() {
                    st.removeData(this, t)
                })
            }
        }), st.extend({
            queue: function(t, e, i) {
                var n;
                return t ? (e = (e || "fx") + "queue", n = st._data(t, e), i && (!n || st.isArray(i) ? n = st._data(t, e, st.makeArray(i)) : n.push(i)), n || []) : void 0
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = st.queue(t, e),
                    n = i.length,
                    s = i.shift(),
                    o = st._queueHooks(t, e),
                    r = function() {
                        st.dequeue(t, e)
                    };
                "inprogress" === s && (s = i.shift(), n--), s && ("fx" === e && i.unshift("inprogress"), delete o.stop, s.call(t, r, o)), !n && o && o.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return st._data(t, i) || st._data(t, i, {
                    empty: st.Callbacks("once memory").add(function() {
                        st._removeData(t, e + "queue"), st._removeData(t, i)
                    })
                })
            }
        }), st.fn.extend({
            queue: function(t, e) {
                var i = 2;
                return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? st.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                    var i = st.queue(this, t, e);
                    st._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && st.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    st.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1,
                    s = st.Deferred(),
                    o = this,
                    r = this.length,
                    a = function() {
                        --n || s.resolveWith(o, [o])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; r--;) i = st._data(o[r], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
                return a(), s.promise(e)
            }
        });
        var Tt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Et = ["Top", "Right", "Bottom", "Left"],
            Dt = function(t, e) {
                return t = e || t, "none" === st.css(t, "display") || !st.contains(t.ownerDocument, t)
            },
            Pt = st.access = function(t, e, i, n, s, o, r) {
                var a = 0,
                    l = t.length,
                    c = null == i;
                if ("object" === st.type(i)) {
                    s = !0;
                    for (a in i) st.access(t, e, a, i[a], !0, o, r)
                } else if (void 0 !== n && (s = !0, st.isFunction(n) || (r = !0), c && (r ? (e.call(t, n), e = null) : (c = e, e = function(t, e, i) {
                        return c.call(st(t), i)
                    })), e))
                    for (; l > a; a++) e(t[a], i, r ? n : n.call(t[a], a, e(t[a], i)));
                return s ? t : c ? e.call(t) : l ? e(t[0], i) : o
            },
            Mt = /^(?:checkbox|radio)$/i;
        ! function() {
            var t = ft.createElement("input"),
                e = ft.createElement("div"),
                i = ft.createDocumentFragment();
            if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", it.leadingWhitespace = 3 === e.firstChild.nodeType, it.tbody = !e.getElementsByTagName("tbody").length, it.htmlSerialize = !!e.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== ft.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, i.appendChild(t), it.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, i.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                    it.noCloneEvent = !1
                }), e.cloneNode(!0).click()), null == it.deleteExpando) {
                it.deleteExpando = !0;
                try {
                    delete e.test
                } catch (t) {
                    it.deleteExpando = !1
                }
            }
        }(),
        function() {
            var e, i, n = ft.createElement("div");
            for (e in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) i = "on" + e, (it[e + "Bubbles"] = i in t) || (n.setAttribute(i, "t"), it[e + "Bubbles"] = n.attributes[i].expando === !1);
            n = null
        }();
        var At = /^(?:input|select|textarea)$/i,
            It = /^key/,
            Ot = /^(?:mouse|pointer|contextmenu)|click/,
            $t = /^(?:focusinfocus|focusoutblur)$/,
            Nt = /^([^.]*)(?:\.(.+)|)$/;
        st.event = {
            global: {},
            add: function(t, e, i, n, s) {
                var o, r, a, l, c, h, u, d, p, f, m, g = st._data(t);
                if (g) {
                    for (i.handler && (l = i, i = l.handler, s = l.selector), i.guid || (i.guid = st.guid++), (r = g.events) || (r = g.events = {}), (h = g.handle) || (h = g.handle = function(t) {
                            return typeof st === _t || t && st.event.triggered === t.type ? void 0 : st.event.dispatch.apply(h.elem, arguments)
                        }, h.elem = t), e = (e || "").match(bt) || [""], a = e.length; a--;) o = Nt.exec(e[a]) || [], p = m = o[1], f = (o[2] || "").split(".").sort(), p && (c = st.event.special[p] || {}, p = (s ? c.delegateType : c.bindType) || p, c = st.event.special[p] || {}, u = st.extend({
                        type: p,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: s,
                        needsContext: s && st.expr.match.needsContext.test(s),
                        namespace: f.join(".")
                    }, l), (d = r[p]) || (d = r[p] = [], d.delegateCount = 0, c.setup && c.setup.call(t, n, f, h) !== !1 || (t.addEventListener ? t.addEventListener(p, h, !1) : t.attachEvent && t.attachEvent("on" + p, h))), c.add && (c.add.call(t, u), u.handler.guid || (u.handler.guid = i.guid)), s ? d.splice(d.delegateCount++, 0, u) : d.push(u), st.event.global[p] = !0);
                    t = null
                }
            },
            remove: function(t, e, i, n, s) {
                var o, r, a, l, c, h, u, d, p, f, m, g = st.hasData(t) && st._data(t);
                if (g && (h = g.events)) {
                    for (e = (e || "").match(bt) || [""], c = e.length; c--;)
                        if (a = Nt.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                            for (u = st.event.special[p] || {}, p = (n ? u.delegateType : u.bindType) || p, d = h[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = d.length; o--;) r = d[o], !s && m !== r.origType || i && i.guid !== r.guid || a && !a.test(r.namespace) || n && n !== r.selector && ("**" !== n || !r.selector) || (d.splice(o, 1), r.selector && d.delegateCount--, u.remove && u.remove.call(t, r));
                            l && !d.length && (u.teardown && u.teardown.call(t, f, g.handle) !== !1 || st.removeEvent(t, p, g.handle), delete h[p])
                        } else
                            for (p in h) st.event.remove(t, p + e[c], i, n, !0);
                    st.isEmptyObject(h) && (delete g.handle, st._removeData(t, "events"))
                }
            },
            trigger: function(e, i, n, s) {
                var o, r, a, l, c, h, u, d = [n || ft],
                    p = et.call(e, "type") ? e.type : e,
                    f = et.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = h = n = n || ft, 3 !== n.nodeType && 8 !== n.nodeType && !$t.test(p + st.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), r = p.indexOf(":") < 0 && "on" + p, e = e[st.expando] ? e : new st.Event(p, "object" == typeof e && e), e.isTrigger = s ? 2 : 3, e.namespace = f.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : st.makeArray(i, [e]), c = st.event.special[p] || {}, s || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                    if (!s && !c.noBubble && !st.isWindow(n)) {
                        for (l = c.delegateType || p, $t.test(l + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a), h = a;
                        h === (n.ownerDocument || ft) && d.push(h.defaultView || h.parentWindow || t)
                    }
                    for (u = 0;
                        (a = d[u++]) && !e.isPropagationStopped();) e.type = u > 1 ? l : c.bindType || p, o = (st._data(a, "events") || {})[e.type] && st._data(a, "handle"), o && o.apply(a, i), o = r && a[r], o && o.apply && st.acceptData(a) && (e.result = o.apply(a, i), e.result === !1 && e.preventDefault());
                    if (e.type = p, !s && !e.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), i) === !1) && st.acceptData(n) && r && n[p] && !st.isWindow(n)) {
                        h = n[r], h && (n[r] = null), st.event.triggered = p;
                        try {
                            n[p]()
                        } catch (t) {}
                        st.event.triggered = void 0, h && (n[r] = h)
                    }
                    return e.result
                }
            },
            dispatch: function(t) {
                t = st.event.fix(t);
                var e, i, n, s, o, r = [],
                    a = G.call(arguments),
                    l = (st._data(this, "events") || {})[t.type] || [],
                    c = st.event.special[t.type] || {};
                if (a[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                    for (r = st.event.handlers.call(this, t, l), e = 0;
                        (s = r[e++]) && !t.isPropagationStopped();)
                        for (t.currentTarget = s.elem, o = 0;
                            (n = s.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(n.namespace)) && (t.handleObj = n, t.data = n.data, i = ((st.event.special[n.origType] || {}).handle || n.handler).apply(s.elem, a), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, t), t.result
                }
            },
            handlers: function(t, e) {
                var i, n, s, o, r = [],
                    a = e.delegateCount,
                    l = t.target;
                if (a && l.nodeType && (!t.button || "click" !== t.type))
                    for (; l != this; l = l.parentNode || this)
                        if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                            for (s = [], o = 0; a > o; o++) n = e[o], i = n.selector + " ", void 0 === s[i] && (s[i] = n.needsContext ? st(i, this).index(l) >= 0 : st.find(i, this, null, [l]).length), s[i] && s.push(n);
                            s.length && r.push({
                                elem: l,
                                handlers: s
                            })
                        }
                return a < e.length && r.push({
                    elem: this,
                    handlers: e.slice(a)
                }), r
            },
            fix: function(t) {
                if (t[st.expando]) return t;
                var e, i, n, s = t.type,
                    o = t,
                    r = this.fixHooks[s];
                for (r || (this.fixHooks[s] = r = Ot.test(s) ? this.mouseHooks : It.test(s) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, t = new st.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
                return t.target || (t.target = o.srcElement || ft), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, o) : t
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(t, e) {
                    var i, n, s, o = e.button,
                        r = e.fromElement;
                    return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || ft, s = n.documentElement, i = n.body, t.pageX = e.clientX + (s && s.scrollLeft || i && i.scrollLeft || 0) - (s && s.clientLeft || i && i.clientLeft || 0), t.pageY = e.clientY + (s && s.scrollTop || i && i.scrollTop || 0) - (s && s.clientTop || i && i.clientTop || 0)), !t.relatedTarget && r && (t.relatedTarget = r === t.target ? e.toElement : r), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== f() && this.focus) try {
                            return this.focus(), !1
                        } catch (t) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === f() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return st.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                    },
                    _default: function(t) {
                        return st.nodeName(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            },
            simulate: function(t, e, i, n) {
                var s = st.extend(new st.Event, i, {
                    type: t,
                    isSimulated: !0,
                    originalEvent: {}
                });
                n ? st.event.trigger(s, null, e) : st.event.dispatch.call(e, s), s.isDefaultPrevented() && i.preventDefault()
            }
        }, st.removeEvent = ft.removeEventListener ? function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i, !1)
        } : function(t, e, i) {
            var n = "on" + e;
            t.detachEvent && (typeof t[n] === _t && (t[n] = null), t.detachEvent(n, i))
        }, st.Event = function(t, e) {
            return this instanceof st.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? d : p) : this.type = t, e && st.extend(this, e), this.timeStamp = t && t.timeStamp || st.now(), void(this[st.expando] = !0)) : new st.Event(t, e)
        }, st.Event.prototype = {
            isDefaultPrevented: p,
            isPropagationStopped: p,
            isImmediatePropagationStopped: p,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = d, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = d, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = d, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, st.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            st.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this,
                        s = t.relatedTarget,
                        o = t.handleObj;
                    return (!s || s !== n && !st.contains(n, s)) && (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
                }
            }
        }), it.submitBubbles || (st.event.special.submit = {
            setup: function() {
                return !st.nodeName(this, "form") && void st.event.add(this, "click._submit keypress._submit", function(t) {
                    var e = t.target,
                        i = st.nodeName(e, "input") || st.nodeName(e, "button") ? e.form : void 0;
                    i && !st._data(i, "submitBubbles") && (st.event.add(i, "submit._submit", function(t) {
                        t._submit_bubble = !0
                    }), st._data(i, "submitBubbles", !0))
                })
            },
            postDispatch: function(t) {
                t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && st.event.simulate("submit", this.parentNode, t, !0))
            },
            teardown: function() {
                return !st.nodeName(this, "form") && void st.event.remove(this, "._submit")
            }
        }), it.changeBubbles || (st.event.special.change = {
            setup: function() {
                return At.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (st.event.add(this, "propertychange._change", function(t) {
                    "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                }), st.event.add(this, "click._change", function(t) {
                    this._just_changed && !t.isTrigger && (this._just_changed = !1), st.event.simulate("change", this, t, !0)
                })), !1) : void st.event.add(this, "beforeactivate._change", function(t) {
                    var e = t.target;
                    At.test(e.nodeName) && !st._data(e, "changeBubbles") && (st.event.add(e, "change._change", function(t) {
                        !this.parentNode || t.isSimulated || t.isTrigger || st.event.simulate("change", this.parentNode, t, !0)
                    }), st._data(e, "changeBubbles", !0))
                })
            },
            handle: function(t) {
                var e = t.target;
                return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return st.event.remove(this, "._change"), !At.test(this.nodeName)
            }
        }), it.focusinBubbles || st.each({
            focus: "focusin",
            blur: "focusout"
        }, function(t, e) {
            var i = function(t) {
                st.event.simulate(e, t.target, st.event.fix(t), !0)
            };
            st.event.special[e] = {
                setup: function() {
                    var n = this.ownerDocument || this,
                        s = st._data(n, e);
                    s || n.addEventListener(t, i, !0), st._data(n, e, (s || 0) + 1)
                },
                teardown: function() {
                    var n = this.ownerDocument || this,
                        s = st._data(n, e) - 1;
                    s ? st._data(n, e, s) : (n.removeEventListener(t, i, !0), st._removeData(n, e))
                }
            }
        }), st.fn.extend({
            on: function(t, e, i, n, s) {
                var o, r;
                if ("object" == typeof t) {
                    "string" != typeof e && (i = i || e, e = void 0);
                    for (o in t) this.on(o, e, i, t[o], s);
                    return this
                }
                if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = p;
                else if (!n) return this;
                return 1 === s && (r = n, n = function(t) {
                    return st().off(t), r.apply(this, arguments)
                }, n.guid = r.guid || (r.guid = st.guid++)), this.each(function() {
                    st.event.add(this, t, n, i, e)
                })
            },
            one: function(t, e, i, n) {
                return this.on(t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, s;
                if (t && t.preventDefault && t.handleObj) return n = t.handleObj, st(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" == typeof t) {
                    for (s in t) this.off(s, e, t[s]);
                    return this
                }
                return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = p), this.each(function() {
                    st.event.remove(this, t, i, e)
                })
            },
            trigger: function(t, e) {
                return this.each(function() {
                    st.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                return i ? st.event.trigger(t, e, i, !0) : void 0
            }
        });
        var Lt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Rt = / jQuery\d+="(?:null|\d+)"/g,
            Ht = new RegExp("<(?:" + Lt + ")[\\s/>]", "i"),
            zt = /^\s+/,
            Ft = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            jt = /<([\w:]+)/,
            Wt = /<tbody/i,
            Ut = /<|&#?\w+;/,
            qt = /<(?:script|style|link)/i,
            Bt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Yt = /^$|\/(?:java|ecma)script/i,
            Vt = /^true\/(.*)/,
            Xt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Gt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            Kt = m(ft),
            Qt = Kt.appendChild(ft.createElement("div"));
        Gt.optgroup = Gt.option, Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead, Gt.th = Gt.td, st.extend({
            clone: function(t, e, i) {
                var n, s, o, r, a, l = st.contains(t.ownerDocument, t);
                if (it.html5Clone || st.isXMLDoc(t) || !Ht.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Qt.innerHTML = t.outerHTML, Qt.removeChild(o = Qt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || st.isXMLDoc(t)))
                    for (n = g(o), a = g(t), r = 0; null != (s = a[r]); ++r) n[r] && _(s, n[r]);
                if (e)
                    if (i)
                        for (a = a || g(t), n = n || g(o), r = 0; null != (s = a[r]); r++) x(s, n[r]);
                    else x(t, o);
                return n = g(o, "script"), n.length > 0 && C(n, !l && g(t, "script")), n = a = s = null, o
            },
            buildFragment: function(t, e, i, n) {
                for (var s, o, r, a, l, c, h, u = t.length, d = m(e), p = [], f = 0; u > f; f++)
                    if (o = t[f], o || 0 === o)
                        if ("object" === st.type(o)) st.merge(p, o.nodeType ? [o] : o);
                        else if (Ut.test(o)) {
                    for (a = a || d.appendChild(e.createElement("div")), l = (jt.exec(o) || ["", ""])[1].toLowerCase(), h = Gt[l] || Gt._default, a.innerHTML = h[1] + o.replace(Ft, "<$1></$2>") + h[2], s = h[0]; s--;) a = a.lastChild;
                    if (!it.leadingWhitespace && zt.test(o) && p.push(e.createTextNode(zt.exec(o)[0])), !it.tbody)
                        for (o = "table" !== l || Wt.test(o) ? "<table>" !== h[1] || Wt.test(o) ? 0 : a : a.firstChild, s = o && o.childNodes.length; s--;) st.nodeName(c = o.childNodes[s], "tbody") && !c.childNodes.length && o.removeChild(c);
                    for (st.merge(p, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                    a = d.lastChild
                } else p.push(e.createTextNode(o));
                for (a && d.removeChild(a), it.appendChecked || st.grep(g(p, "input"), v), f = 0; o = p[f++];)
                    if ((!n || -1 === st.inArray(o, n)) && (r = st.contains(o.ownerDocument, o), a = g(d.appendChild(o), "script"), r && C(a), i))
                        for (s = 0; o = a[s++];) Yt.test(o.type || "") && i.push(o);
                return a = null, d
            },
            cleanData: function(t, e) {
                for (var i, n, s, o, r = 0, a = st.expando, l = st.cache, c = it.deleteExpando, h = st.event.special; null != (i = t[r]); r++)
                    if ((e || st.acceptData(i)) && (s = i[a], o = s && l[s])) {
                        if (o.events)
                            for (n in o.events) h[n] ? st.event.remove(i, n) : st.removeEvent(i, n, o.handle);
                        l[s] && (delete l[s], c ? delete i[a] : typeof i.removeAttribute !== _t ? i.removeAttribute(a) : i[a] = null, X.push(s))
                    }
            }
        }), st.fn.extend({
            text: function(t) {
                return Pt(this, function(t) {
                    return void 0 === t ? st.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ft).createTextNode(t))
                }, null, t, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = y(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = y(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function(t, e) {
                for (var i, n = t ? st.filter(t, this) : this, s = 0; null != (i = n[s]); s++) e || 1 !== i.nodeType || st.cleanData(g(i)), i.parentNode && (e && st.contains(i.ownerDocument, i) && C(g(i, "script")), i.parentNode.removeChild(i));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && st.cleanData(g(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && st.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return st.clone(this, t, e)
                })
            },
            html: function(t) {
                return Pt(this, function(t) {
                    var e = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(Rt, "") : void 0;
                    if (!("string" != typeof t || qt.test(t) || !it.htmlSerialize && Ht.test(t) || !it.leadingWhitespace && zt.test(t) || Gt[(jt.exec(t) || ["", ""])[1].toLowerCase()])) {
                        t = t.replace(Ft, "<$1></$2>");
                        try {
                            for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (st.cleanData(g(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = arguments[0];
                return this.domManip(arguments, function(e) {
                    t = this.parentNode, st.cleanData(g(this)), t && t.replaceChild(e, this)
                }), t && (t.length || t.nodeType) ? this : this.remove()
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, e) {
                t = K.apply([], t);
                var i, n, s, o, r, a, l = 0,
                    c = this.length,
                    h = this,
                    u = c - 1,
                    d = t[0],
                    p = st.isFunction(d);
                if (p || c > 1 && "string" == typeof d && !it.checkClone && Bt.test(d)) return this.each(function(i) {
                    var n = h.eq(i);
                    p && (t[0] = d.call(this, i, n.html())), n.domManip(t, e)
                });
                if (c && (a = st.buildFragment(t, this[0].ownerDocument, !1, this), i = a.firstChild, 1 === a.childNodes.length && (a = i), i)) {
                    for (o = st.map(g(a, "script"), b), s = o.length; c > l; l++) n = a, l !== u && (n = st.clone(n, !0, !0), s && st.merge(o, g(n, "script"))), e.call(this[l], n, l);
                    if (s)
                        for (r = o[o.length - 1].ownerDocument, st.map(o, w), l = 0; s > l; l++) n = o[l], Yt.test(n.type || "") && !st._data(n, "globalEval") && st.contains(r, n) && (n.src ? st._evalUrl && st._evalUrl(n.src) : st.globalEval((n.text || n.textContent || n.innerHTML || "").replace(Xt, "")));
                    a = i = null
                }
                return this
            }
        }), st.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            st.fn[t] = function(t) {
                for (var i, n = 0, s = [], o = st(t), r = o.length - 1; r >= n; n++) i = n === r ? this : this.clone(!0), st(o[n])[e](i), Q.apply(s, i.get());
                return this.pushStack(s)
            }
        });
        var Zt, Jt = {};
        ! function() {
            var t;
            it.shrinkWrapBlocks = function() {
                if (null != t) return t;
                t = !1;
                var e, i, n;
                return i = ft.getElementsByTagName("body")[0], i && i.style ? (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), typeof e.style.zoom !== _t && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(ft.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), i.removeChild(n), t) : void 0
            }
        }();
        var te, ee, ie = /^margin/,
            ne = new RegExp("^(" + Tt + ")(?!px)[a-z%]+$", "i"),
            se = /^(top|right|bottom|left)$/;
        t.getComputedStyle ? (te = function(t) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null)
        }, ee = function(t, e, i) {
            var n, s, o, r, a = t.style;
            return i = i || te(t), r = i ? i.getPropertyValue(e) || i[e] : void 0, i && ("" !== r || st.contains(t.ownerDocument, t) || (r = st.style(t, e)), ne.test(r) && ie.test(e) && (n = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = i.width, a.width = n, a.minWidth = s, a.maxWidth = o)), void 0 === r ? r : r + ""
        }) : ft.documentElement.currentStyle && (te = function(t) {
            return t.currentStyle
        }, ee = function(t, e, i) {
            var n, s, o, r, a = t.style;
            return i = i || te(t), r = i ? i[e] : void 0, null == r && a && a[e] && (r = a[e]), ne.test(r) && !se.test(e) && (n = a.left, s = t.runtimeStyle, o = s && s.left, o && (s.left = t.currentStyle.left), a.left = "fontSize" === e ? "1em" : r, r = a.pixelLeft + "px", a.left = n, o && (s.left = o)), void 0 === r ? r : r + "" || "auto"
        }), ! function() {
            function e() {
                var e, i, n, s;
                i = ft.getElementsByTagName("body")[0], i && i.style && (e = ft.createElement("div"), n = ft.createElement("div"), n.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(n).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = r = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, r = "4px" === (t.getComputedStyle(e, null) || {
                    width: "4px"
                }).width, s = e.appendChild(ft.createElement("div")), s.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", s.style.marginRight = s.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(s, null) || {}).marginRight)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = e.getElementsByTagName("td"), s[0].style.cssText = "margin:0;border:0;padding:0;display:none", a = 0 === s[0].offsetHeight, a && (s[0].style.display = "", s[1].style.display = "none", a = 0 === s[0].offsetHeight), i.removeChild(n))
            }
            var i, n, s, o, r, a, l;
            i = ft.createElement("div"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", s = i.getElementsByTagName("a")[0], (n = s && s.style) && (n.cssText = "float:left;opacity:.5", it.opacity = "0.5" === n.opacity, it.cssFloat = !!n.cssFloat, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === i.style.backgroundClip, it.boxSizing = "" === n.boxSizing || "" === n.MozBoxSizing || "" === n.WebkitBoxSizing, st.extend(it, {
                reliableHiddenOffsets: function() {
                    return null == a && e(), a
                },
                boxSizingReliable: function() {
                    return null == r && e(), r
                },
                pixelPosition: function() {
                    return null == o && e(), o
                },
                reliableMarginRight: function() {
                    return null == l && e(), l
                }
            }))
        }(), st.swap = function(t, e, i, n) {
            var s, o, r = {};
            for (o in e) r[o] = t.style[o], t.style[o] = e[o];
            s = i.apply(t, n || []);
            for (o in e) t.style[o] = r[o];
            return s
        };
        var oe = /alpha\([^)]*\)/i,
            re = /opacity\s*=\s*([^)]*)/,
            ae = /^(none|table(?!-c[ea]).+)/,
            le = new RegExp("^(" + Tt + ")(.*)$", "i"),
            ce = new RegExp("^([+-])=(" + Tt + ")", "i"),
            he = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            ue = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            de = ["Webkit", "O", "Moz", "ms"];
        st.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = ee(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": it.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var s, o, r, a = st.camelCase(e),
                        l = t.style;
                    if (e = st.cssProps[a] || (st.cssProps[a] = E(l, a)), r = st.cssHooks[e] || st.cssHooks[a], void 0 === i) return r && "get" in r && void 0 !== (s = r.get(t, !1, n)) ? s : l[e];
                    if (o = typeof i, "string" === o && (s = ce.exec(i)) && (i = (s[1] + 1) * s[2] + parseFloat(st.css(t, e)), o = "number"), null != i && i === i && ("number" !== o || st.cssNumber[a] || (i += "px"), it.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(r && "set" in r && void 0 === (i = r.set(t, i, n))))) try {
                        l[e] = i
                    } catch (t) {}
                }
            },
            css: function(t, e, i, n) {
                var s, o, r, a = st.camelCase(e);
                return e = st.cssProps[a] || (st.cssProps[a] = E(t.style, a)), r = st.cssHooks[e] || st.cssHooks[a], r && "get" in r && (o = r.get(t, !0, i)), void 0 === o && (o = ee(t, e, n)), "normal" === o && e in ue && (o = ue[e]), "" === i || i ? (s = parseFloat(o), i === !0 || st.isNumeric(s) ? s || 0 : o) : o
            }
        }), st.each(["height", "width"], function(t, e) {
            st.cssHooks[e] = {
                get: function(t, i, n) {
                    return i ? ae.test(st.css(t, "display")) && 0 === t.offsetWidth ? st.swap(t, he, function() {
                        return A(t, e, n)
                    }) : A(t, e, n) : void 0
                },
                set: function(t, i, n) {
                    var s = n && te(t);
                    return P(t, i, n ? M(t, e, n, it.boxSizing && "border-box" === st.css(t, "boxSizing", !1, s), s) : 0)
                }
            }
        }), it.opacity || (st.cssHooks.opacity = {
            get: function(t, e) {
                return re.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var i = t.style,
                    n = t.currentStyle,
                    s = st.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    o = n && n.filter || i.filter || "";
                i.zoom = 1, (e >= 1 || "" === e) && "" === st.trim(o.replace(oe, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = oe.test(o) ? o.replace(oe, s) : o + " " + s)
            }
        }), st.cssHooks.marginRight = T(it.reliableMarginRight, function(t, e) {
            return e ? st.swap(t, {
                display: "inline-block"
            }, ee, [t, "marginRight"]) : void 0
        }), st.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            st.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, s = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) s[t + Et[n] + e] = o[n] || o[n - 2] || o[0];
                    return s
                }
            }, ie.test(t) || (st.cssHooks[t + e].set = P)
        }), st.fn.extend({
            css: function(t, e) {
                return Pt(this, function(t, e, i) {
                    var n, s, o = {},
                        r = 0;
                    if (st.isArray(e)) {
                        for (n = te(t), s = e.length; s > r; r++) o[e[r]] = st.css(t, e[r], !1, n);
                        return o
                    }
                    return void 0 !== i ? st.style(t, e, i) : st.css(t, e)
                }, t, e, arguments.length > 1)
            },
            show: function() {
                return D(this, !0)
            },
            hide: function() {
                return D(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Dt(this) ? st(this).show() : st(this).hide()
                })
            }
        }), st.Tween = I, I.prototype = {
            constructor: I,
            init: function(t, e, i, n, s, o) {
                this.elem = t, this.prop = i, this.easing = s || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (st.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = I.propHooks[this.prop];
                return t && t.get ? t.get(this) : I.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = I.propHooks[this.prop];
                return this.pos = e = this.options.duration ? st.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : I.propHooks._default.set(this), this
            }
        }, I.prototype.init.prototype = I.prototype, I.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = st.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    st.fx.step[t.prop] ? st.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[st.cssProps[t.prop]] || st.cssHooks[t.prop]) ? st.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, st.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, st.fx = I.prototype.init, st.fx.step = {};
        var pe, fe, me = /^(?:toggle|show|hide)$/,
            ge = new RegExp("^(?:([+-])=|)(" + Tt + ")([a-z%]*)$", "i"),
            ve = /queueHooks$/,
            ye = [L],
            be = {
                "*": [function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        s = ge.exec(e),
                        o = s && s[3] || (st.cssNumber[t] ? "" : "px"),
                        r = (st.cssNumber[t] || "px" !== o && +n) && ge.exec(st.css(i.elem, t)),
                        a = 1,
                        l = 20;
                    if (r && r[3] !== o) {
                        o = o || r[3], s = s || [], r = +n || 1;
                        do a = a || ".5", r /= a, st.style(i.elem, t, r + o); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                    }
                    return s && (r = i.start = +r || +n || 0, i.unit = o, i.end = s[1] ? r + (s[1] + 1) * s[2] : +s[2]), i
                }]
            };
        st.Animation = st.extend(H, {
                tweener: function(t, e) {
                    st.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                    for (var i, n = 0, s = t.length; s > n; n++) i = t[n], be[i] = be[i] || [], be[i].unshift(e)
                },
                prefilter: function(t, e) {
                    e ? ye.unshift(t) : ye.push(t)
                }
            }), st.speed = function(t, e, i) {
                var n = t && "object" == typeof t ? st.extend({}, t) : {
                    complete: i || !i && e || st.isFunction(t) && t,
                    duration: t,
                    easing: i && e || e && !st.isFunction(e) && e
                };
                return n.duration = st.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in st.fx.speeds ? st.fx.speeds[n.duration] : st.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                    st.isFunction(n.old) && n.old.call(this), n.queue && st.dequeue(this, n.queue)
                }, n
            }, st.fn.extend({
                fadeTo: function(t, e, i, n) {
                    return this.filter(Dt).css("opacity", 0).show().end().animate({
                        opacity: e
                    }, t, i, n)
                },
                animate: function(t, e, i, n) {
                    var s = st.isEmptyObject(t),
                        o = st.speed(e, i, n),
                        r = function() {
                            var e = H(this, st.extend({}, t), o);
                            (s || st._data(this, "finish")) && e.stop(!0)
                        };
                    return r.finish = r, s || o.queue === !1 ? this.each(r) : this.queue(o.queue, r)
                },
                stop: function(t, e, i) {
                    var n = function(t) {
                        var e = t.stop;
                        delete t.stop, e(i)
                    };
                    return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                        var e = !0,
                            s = null != t && t + "queueHooks",
                            o = st.timers,
                            r = st._data(this);
                        if (s) r[s] && r[s].stop && n(r[s]);
                        else
                            for (s in r) r[s] && r[s].stop && ve.test(s) && n(r[s]);
                        for (s = o.length; s--;) o[s].elem !== this || null != t && o[s].queue !== t || (o[s].anim.stop(i), e = !1, o.splice(s, 1));
                        (e || !i) && st.dequeue(this, t)
                    })
                },
                finish: function(t) {
                    return t !== !1 && (t = t || "fx"), this.each(function() {
                        var e, i = st._data(this),
                            n = i[t + "queue"],
                            s = i[t + "queueHooks"],
                            o = st.timers,
                            r = n ? n.length : 0;
                        for (i.finish = !0, st.queue(this, t, []), s && s.stop && s.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                        for (e = 0; r > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish
                    })
                }
            }), st.each(["toggle", "show", "hide"], function(t, e) {
                var i = st.fn[e];
                st.fn[e] = function(t, n, s) {
                    return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate($(e, !0), t, n, s)
                }
            }), st.each({
                slideDown: $("show"),
                slideUp: $("hide"),
                slideToggle: $("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(t, e) {
                st.fn[t] = function(t, i, n) {
                    return this.animate(e, t, i, n)
                }
            }), st.timers = [], st.fx.tick = function() {
                var t, e = st.timers,
                    i = 0;
                for (pe = st.now(); i < e.length; i++) t = e[i], t() || e[i] !== t || e.splice(i--, 1);
                e.length || st.fx.stop(), pe = void 0
            }, st.fx.timer = function(t) {
                st.timers.push(t), t() ? st.fx.start() : st.timers.pop()
            }, st.fx.interval = 13, st.fx.start = function() {
                fe || (fe = setInterval(st.fx.tick, st.fx.interval))
            }, st.fx.stop = function() {
                clearInterval(fe), fe = null
            }, st.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, st.fn.delay = function(t, e) {
                return t = st.fx ? st.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                    var n = setTimeout(e, t);
                    i.stop = function() {
                        clearTimeout(n)
                    }
                })
            },
            function() {
                var t, e, i, n, s;
                e = ft.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = e.getElementsByTagName("a")[0], i = ft.createElement("select"), s = i.appendChild(ft.createElement("option")), t = e.getElementsByTagName("input")[0], n.style.cssText = "top:1px", it.getSetAttribute = "t" !== e.className, it.style = /top/.test(n.getAttribute("style")), it.hrefNormalized = "/a" === n.getAttribute("href"), it.checkOn = !!t.value, it.optSelected = s.selected, it.enctype = !!ft.createElement("form").enctype, i.disabled = !0, it.optDisabled = !s.disabled, t = ft.createElement("input"), t.setAttribute("value", ""), it.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), it.radioValue = "t" === t.value
            }();
        var we = /\r/g;
        st.fn.extend({
            val: function(t) {
                var e, i, n, s = this[0];
                return arguments.length ? (n = st.isFunction(t), this.each(function(i) {
                    var s;
                    1 === this.nodeType && (s = n ? t.call(this, i, st(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : st.isArray(s) && (s = st.map(s, function(t) {
                        return null == t ? "" : t + ""
                    })), e = st.valHooks[this.type] || st.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                })) : s ? (e = st.valHooks[s.type] || st.valHooks[s.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value, "string" == typeof i ? i.replace(we, "") : null == i ? "" : i)) : void 0
            }
        }), st.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = st.find.attr(t, "value");
                        return null != e ? e : st.trim(st.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, i, n = t.options, s = t.selectedIndex, o = "select-one" === t.type || 0 > s, r = o ? null : [], a = o ? s + 1 : n.length, l = 0 > s ? a : o ? s : 0; a > l; l++)
                            if (i = n[l], !(!i.selected && l !== s || (it.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && st.nodeName(i.parentNode, "optgroup"))) {
                                if (e = st(i).val(), o) return e;
                                r.push(e)
                            }
                        return r
                    },
                    set: function(t, e) {
                        for (var i, n, s = t.options, o = st.makeArray(e), r = s.length; r--;)
                            if (n = s[r], st.inArray(st.valHooks.option.get(n), o) >= 0) try {
                                n.selected = i = !0
                            } catch (t) {
                                n.scrollHeight
                            } else n.selected = !1;
                        return i || (t.selectedIndex = -1), s
                    }
                }
            }
        }), st.each(["radio", "checkbox"], function() {
            st.valHooks[this] = {
                set: function(t, e) {
                    return st.isArray(e) ? t.checked = st.inArray(st(t).val(), e) >= 0 : void 0
                }
            }, it.checkOn || (st.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var Ce, xe, _e = st.expr.attrHandle,
            Se = /^(?:checked|selected)$/i,
            ke = it.getSetAttribute,
            Te = it.input;
        st.fn.extend({
            attr: function(t, e) {
                return Pt(this, st.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    st.removeAttr(this, t)
                })
            }
        }), st.extend({
            attr: function(t, e, i) {
                var n, s, o = t.nodeType;
                if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === _t ? st.prop(t, e, i) : (1 === o && st.isXMLDoc(t) || (e = e.toLowerCase(), n = st.attrHooks[e] || (st.expr.match.bool.test(e) ? xe : Ce)), void 0 === i ? n && "get" in n && null !== (s = n.get(t, e)) ? s : (s = st.find.attr(t, e), null == s ? void 0 : s) : null !== i ? n && "set" in n && void 0 !== (s = n.set(t, i, e)) ? s : (t.setAttribute(e, i + ""), i) : void st.removeAttr(t, e))
            },
            removeAttr: function(t, e) {
                var i, n, s = 0,
                    o = e && e.match(bt);
                if (o && 1 === t.nodeType)
                    for (; i = o[s++];) n = st.propFix[i] || i, st.expr.match.bool.test(i) ? Te && ke || !Se.test(i) ? t[n] = !1 : t[st.camelCase("default-" + i)] = t[n] = !1 : st.attr(t, i, ""), t.removeAttribute(ke ? i : n)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!it.radioValue && "radio" === e && st.nodeName(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            }
        }), xe = {
            set: function(t, e, i) {
                return e === !1 ? st.removeAttr(t, i) : Te && ke || !Se.test(i) ? t.setAttribute(!ke && st.propFix[i] || i, i) : t[st.camelCase("default-" + i)] = t[i] = !0, i
            }
        }, st.each(st.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var i = _e[e] || st.find.attr;
            _e[e] = Te && ke || !Se.test(e) ? function(t, e, n) {
                var s, o;
                return n || (o = _e[e], _e[e] = s, s = null != i(t, e, n) ? e.toLowerCase() : null, _e[e] = o), s
            } : function(t, e, i) {
                return i ? void 0 : t[st.camelCase("default-" + e)] ? e.toLowerCase() : null
            }
        }), Te && ke || (st.attrHooks.value = {
            set: function(t, e, i) {
                return st.nodeName(t, "input") ? void(t.defaultValue = e) : Ce && Ce.set(t, e, i)
            }
        }), ke || (Ce = {
            set: function(t, e, i) {
                var n = t.getAttributeNode(i);
                return n || t.setAttributeNode(n = t.ownerDocument.createAttribute(i)), n.value = e += "", "value" === i || e === t.getAttribute(i) ? e : void 0
            }
        }, _e.id = _e.name = _e.coords = function(t, e, i) {
            var n;
            return i ? void 0 : (n = t.getAttributeNode(e)) && "" !== n.value ? n.value : null
        }, st.valHooks.button = {
            get: function(t, e) {
                var i = t.getAttributeNode(e);
                return i && i.specified ? i.value : void 0
            },
            set: Ce.set
        }, st.attrHooks.contenteditable = {
            set: function(t, e, i) {
                Ce.set(t, "" !== e && e, i)
            }
        }, st.each(["width", "height"], function(t, e) {
            st.attrHooks[e] = {
                set: function(t, i) {
                    return "" === i ? (t.setAttribute(e, "auto"), i) : void 0
                }
            }
        })), it.style || (st.attrHooks.style = {
            get: function(t) {
                return t.style.cssText || void 0
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        });
        var Ee = /^(?:input|select|textarea|button|object)$/i,
            De = /^(?:a|area)$/i;
        st.fn.extend({
            prop: function(t, e) {
                return Pt(this, st.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = st.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = void 0, delete this[t]
                    } catch (t) {}
                })
            }
        }), st.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(t, e, i) {
                var n, s, o, r = t.nodeType;
                if (t && 3 !== r && 8 !== r && 2 !== r) return o = 1 !== r || !st.isXMLDoc(t), o && (e = st.propFix[e] || e, s = st.propHooks[e]), void 0 !== i ? s && "set" in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get" in s && null !== (n = s.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = st.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : Ee.test(t.nodeName) || De.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }
        }), it.hrefNormalized || st.each(["href", "src"], function(t, e) {
            st.propHooks[e] = {
                get: function(t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), it.optSelected || (st.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }
        }), st.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            st.propFix[this.toLowerCase()] = this
        }), it.enctype || (st.propFix.enctype = "encoding");
        var Pe = /[\t\r\n\f]/g;
        st.fn.extend({
            addClass: function(t) {
                var e, i, n, s, o, r, a = 0,
                    l = this.length,
                    c = "string" == typeof t && t;
                if (st.isFunction(t)) return this.each(function(e) {
                    st(this).addClass(t.call(this, e, this.className))
                });
                if (c)
                    for (e = (t || "").match(bt) || []; l > a; a++)
                        if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Pe, " ") : " ")) {
                            for (o = 0; s = e[o++];) n.indexOf(" " + s + " ") < 0 && (n += s + " ");
                            r = st.trim(n), i.className !== r && (i.className = r)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, s, o, r, a = 0,
                    l = this.length,
                    c = 0 === arguments.length || "string" == typeof t && t;
                if (st.isFunction(t)) return this.each(function(e) {
                    st(this).removeClass(t.call(this, e, this.className))
                });
                if (c)
                    for (e = (t || "").match(bt) || []; l > a; a++)
                        if (i = this[a], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(Pe, " ") : "")) {
                            for (o = 0; s = e[o++];)
                                for (; n.indexOf(" " + s + " ") >= 0;) n = n.replace(" " + s + " ", " ");
                            r = t ? st.trim(n) : "", i.className !== r && (i.className = r)
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : this.each(st.isFunction(t) ? function(i) {
                    st(this).toggleClass(t.call(this, i, this.className, e), e)
                } : function() {
                    if ("string" === i)
                        for (var e, n = 0, s = st(this), o = t.match(bt) || []; e = o[n++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                    else(i === _t || "boolean" === i) && (this.className && st._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : st._data(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(Pe, " ").indexOf(e) >= 0) return !0;
                return !1
            }
        }), st.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            st.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), st.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        });
        var Me = st.now(),
            Ae = /\?/,
            Ie = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        st.parseJSON = function(e) {
            if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
            var i, n = null,
                s = st.trim(e + "");
            return s && !st.trim(s.replace(Ie, function(t, e, s, o) {
                return i && e && (n = 0), 0 === n ? t : (i = s || e, n += !o - !s, "")
            })) ? Function("return " + s)() : st.error("Invalid JSON: " + e)
        }, st.parseXML = function(e) {
            var i, n;
            if (!e || "string" != typeof e) return null;
            try {
                t.DOMParser ? (n = new DOMParser, i = n.parseFromString(e, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(e))
            } catch (t) {
                i = void 0
            }
            return i && i.documentElement && !i.getElementsByTagName("parsererror").length || st.error("Invalid XML: " + e), i
        };
        var Oe, $e, Ne = /#.*$/,
            Le = /([?&])_=[^&]*/,
            Re = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            He = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            ze = /^(?:GET|HEAD)$/,
            Fe = /^\/\//,
            je = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            We = {},
            Ue = {},
            qe = "*/".concat("*");
        try {
            $e = location.href
        } catch (t) {
            $e = ft.createElement("a"), $e.href = "", $e = $e.href
        }
        Oe = je.exec($e.toLowerCase()) || [], st.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: $e,
                type: "GET",
                isLocal: He.test(Oe[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": qe,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": st.parseJSON,
                    "text xml": st.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? j(j(t, st.ajaxSettings), e) : j(st.ajaxSettings, t)
            },
            ajaxPrefilter: z(We),
            ajaxTransport: z(Ue),
            ajax: function(t, e) {
                function i(t, e, i, n) {
                    var s, h, v, y, w, x = e;
                    2 !== b && (b = 2, a && clearTimeout(a), c = void 0, r = n || "", C.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, i && (y = W(u, C, i)), y = U(u, y, C, s), s ? (u.ifModified && (w = C.getResponseHeader("Last-Modified"), w && (st.lastModified[o] = w), w = C.getResponseHeader("etag"), w && (st.etag[o] = w)), 204 === t || "HEAD" === u.type ? x = "nocontent" : 304 === t ? x = "notmodified" : (x = y.state, h = y.data, v = y.error, s = !v)) : (v = x, (t || !x) && (x = "error", 0 > t && (t = 0))), C.status = t, C.statusText = (e || x) + "", s ? f.resolveWith(d, [h, x, C]) : f.rejectWith(d, [C, x, v]), C.statusCode(g), g = void 0, l && p.trigger(s ? "ajaxSuccess" : "ajaxError", [C, u, s ? h : v]), m.fireWith(d, [C, x]), l && (p.trigger("ajaxComplete", [C, u]), --st.active || st.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var n, s, o, r, a, l, c, h, u = st.ajaxSetup({}, e),
                    d = u.context || u,
                    p = u.context && (d.nodeType || d.jquery) ? st(d) : st.event,
                    f = st.Deferred(),
                    m = st.Callbacks("once memory"),
                    g = u.statusCode || {},
                    v = {},
                    y = {},
                    b = 0,
                    w = "canceled",
                    C = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === b) {
                                if (!h)
                                    for (h = {}; e = Re.exec(r);) h[e[1].toLowerCase()] = e[2];
                                e = h[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? r : null
                        },
                        setRequestHeader: function(t, e) {
                            var i = t.toLowerCase();
                            return b || (t = y[i] = y[i] || t, v[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return b || (u.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (2 > b)
                                    for (e in t) g[e] = [g[e], t[e]];
                                else C.always(t[C.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || w;
                            return c && c.abort(e), i(0, e), this
                        }
                    };
                if (f.promise(C).complete = m.add, C.success = C.done, C.error = C.fail, u.url = ((t || u.url || $e) + "").replace(Ne, "").replace(Fe, Oe[1] + "//"), u.type = e.method || e.type || u.method || u.type, u.dataTypes = st.trim(u.dataType || "*").toLowerCase().match(bt) || [""], null == u.crossDomain && (n = je.exec(u.url.toLowerCase()), u.crossDomain = !(!n || n[1] === Oe[1] && n[2] === Oe[2] && (n[3] || ("http:" === n[1] ? "80" : "443")) === (Oe[3] || ("http:" === Oe[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = st.param(u.data, u.traditional)), F(We, u, e, C), 2 === b) return C;
                l = u.global, l && 0 === st.active++ && st.event.trigger("ajaxStart"), u.type = u.type.toUpperCase(), u.hasContent = !ze.test(u.type), o = u.url, u.hasContent || (u.data && (o = u.url += (Ae.test(o) ? "&" : "?") + u.data, delete u.data),
                    u.cache === !1 && (u.url = Le.test(o) ? o.replace(Le, "$1_=" + Me++) : o + (Ae.test(o) ? "&" : "?") + "_=" + Me++)), u.ifModified && (st.lastModified[o] && C.setRequestHeader("If-Modified-Since", st.lastModified[o]), st.etag[o] && C.setRequestHeader("If-None-Match", st.etag[o])), (u.data && u.hasContent && u.contentType !== !1 || e.contentType) && C.setRequestHeader("Content-Type", u.contentType), C.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + qe + "; q=0.01" : "") : u.accepts["*"]);
                for (s in u.headers) C.setRequestHeader(s, u.headers[s]);
                if (u.beforeSend && (u.beforeSend.call(d, C, u) === !1 || 2 === b)) return C.abort();
                w = "abort";
                for (s in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) C[s](u[s]);
                if (c = F(Ue, u, e, C)) {
                    C.readyState = 1, l && p.trigger("ajaxSend", [C, u]), u.async && u.timeout > 0 && (a = setTimeout(function() {
                        C.abort("timeout")
                    }, u.timeout));
                    try {
                        b = 1, c.send(v, i)
                    } catch (t) {
                        if (!(2 > b)) throw t;
                        i(-1, t)
                    }
                } else i(-1, "No Transport");
                return C
            },
            getJSON: function(t, e, i) {
                return st.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return st.get(t, void 0, e, "script")
            }
        }), st.each(["get", "post"], function(t, e) {
            st[e] = function(t, i, n, s) {
                return st.isFunction(i) && (s = s || n, n = i, i = void 0), st.ajax({
                    url: t,
                    type: e,
                    dataType: s,
                    data: i,
                    success: n
                })
            }
        }), st.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            st.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), st._evalUrl = function(t) {
            return st.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, st.fn.extend({
            wrapAll: function(t) {
                if (st.isFunction(t)) return this.each(function(e) {
                    st(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = st(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return this.each(st.isFunction(t) ? function(e) {
                    st(this).wrapInner(t.call(this, e))
                } : function() {
                    var e = st(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = st.isFunction(t);
                return this.each(function(i) {
                    st(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    st.nodeName(this, "body") || st(this).replaceWith(this.childNodes)
                }).end()
            }
        }), st.expr.filters.hidden = function(t) {
            return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (t.style && t.style.display || st.css(t, "display"))
        }, st.expr.filters.visible = function(t) {
            return !st.expr.filters.hidden(t)
        };
        var Be = /%20/g,
            Ye = /\[\]$/,
            Ve = /\r?\n/g,
            Xe = /^(?:submit|button|image|reset|file)$/i,
            Ge = /^(?:input|select|textarea|keygen)/i;
        st.param = function(t, e) {
            var i, n = [],
                s = function(t, e) {
                    e = st.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (void 0 === e && (e = st.ajaxSettings && st.ajaxSettings.traditional), st.isArray(t) || t.jquery && !st.isPlainObject(t)) st.each(t, function() {
                s(this.name, this.value)
            });
            else
                for (i in t) q(i, t[i], e, s);
            return n.join("&").replace(Be, "+")
        }, st.fn.extend({
            serialize: function() {
                return st.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = st.prop(this, "elements");
                    return t ? st.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !st(this).is(":disabled") && Ge.test(this.nodeName) && !Xe.test(t) && (this.checked || !Mt.test(t))
                }).map(function(t, e) {
                    var i = st(this).val();
                    return null == i ? null : st.isArray(i) ? st.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Ve, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(Ve, "\r\n")
                    }
                }).get()
            }
        }), st.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && B() || Y()
        } : B;
        var Ke = 0,
            Qe = {},
            Ze = st.ajaxSettings.xhr();
        t.ActiveXObject && st(t).on("unload", function() {
            for (var t in Qe) Qe[t](void 0, !0)
        }), it.cors = !!Ze && "withCredentials" in Ze, Ze = it.ajax = !!Ze, Ze && st.ajaxTransport(function(t) {
            if (!t.crossDomain || it.cors) {
                var e;
                return {
                    send: function(i, n) {
                        var s, o = t.xhr(),
                            r = ++Ke;
                        if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                            for (s in t.xhrFields) o[s] = t.xhrFields[s];
                        t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        for (s in i) void 0 !== i[s] && o.setRequestHeader(s, i[s] + "");
                        o.send(t.hasContent && t.data || null), e = function(i, s) {
                            var a, l, c;
                            if (e && (s || 4 === o.readyState))
                                if (delete Qe[r], e = void 0, o.onreadystatechange = st.noop, s) 4 !== o.readyState && o.abort();
                                else {
                                    c = {}, a = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                    try {
                                        l = o.statusText
                                    } catch (t) {
                                        l = ""
                                    }
                                    a || !t.isLocal || t.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                                }
                            c && n(a, l, c, o.getAllResponseHeaders())
                        }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Qe[r] = e : e()
                    },
                    abort: function() {
                        e && e(void 0, !0)
                    }
                }
            }
        }), st.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(t) {
                    return st.globalEval(t), t
                }
            }
        }), st.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), st.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, i = ft.head || st("head")[0] || ft.documentElement;
                return {
                    send: function(n, s) {
                        e = ft.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, i) {
                            (i || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, i || s(200, "success"))
                        }, i.insertBefore(e, i.firstChild)
                    },
                    abort: function() {
                        e && e.onload(void 0, !0)
                    }
                }
            }
        });
        var Je = [],
            ti = /(=)\?(?=&|$)|\?\?/;
        st.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Je.pop() || st.expando + "_" + Me++;
                return this[t] = !0, t
            }
        }), st.ajaxPrefilter("json jsonp", function(e, i, n) {
            var s, o, r, a = e.jsonp !== !1 && (ti.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(e.data) && "data");
            return a || "jsonp" === e.dataTypes[0] ? (s = e.jsonpCallback = st.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(ti, "$1" + s) : e.jsonp !== !1 && (e.url += (Ae.test(e.url) ? "&" : "?") + e.jsonp + "=" + s), e.converters["script json"] = function() {
                return r || st.error(s + " was not called"), r[0]
            }, e.dataTypes[0] = "json", o = t[s], t[s] = function() {
                r = arguments
            }, n.always(function() {
                t[s] = o, e[s] && (e.jsonpCallback = i.jsonpCallback, Je.push(s)), r && st.isFunction(o) && o(r[0]), r = o = void 0
            }), "script") : void 0
        }), st.parseHTML = function(t, e, i) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (i = e, e = !1), e = e || ft;
            var n = ut.exec(t),
                s = !i && [];
            return n ? [e.createElement(n[1])] : (n = st.buildFragment([t], e, s), s && s.length && st(s).remove(), st.merge([], n.childNodes))
        };
        var ei = st.fn.load;
        st.fn.load = function(t, e, i) {
            if ("string" != typeof t && ei) return ei.apply(this, arguments);
            var n, s, o, r = this,
                a = t.indexOf(" ");
            return a >= 0 && (n = st.trim(t.slice(a, t.length)), t = t.slice(0, a)), st.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), r.length > 0 && st.ajax({
                url: t,
                type: o,
                dataType: "html",
                data: e
            }).done(function(t) {
                s = arguments, r.html(n ? st("<div>").append(st.parseHTML(t)).find(n) : t)
            }).complete(i && function(t, e) {
                r.each(i, s || [t.responseText, e, t])
            }), this
        }, st.expr.filters.animated = function(t) {
            return st.grep(st.timers, function(e) {
                return t === e.elem
            }).length
        };
        var ii = t.document.documentElement;
        st.offset = {
            setOffset: function(t, e, i) {
                var n, s, o, r, a, l, c, h = st.css(t, "position"),
                    u = st(t),
                    d = {};
                "static" === h && (t.style.position = "relative"), a = u.offset(), o = st.css(t, "top"), l = st.css(t, "left"), c = ("absolute" === h || "fixed" === h) && st.inArray("auto", [o, l]) > -1, c ? (n = u.position(), r = n.top, s = n.left) : (r = parseFloat(o) || 0, s = parseFloat(l) || 0), st.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (d.top = e.top - a.top + r), null != e.left && (d.left = e.left - a.left + s), "using" in e ? e.using.call(t, d) : u.css(d)
            }
        }, st.fn.extend({
            offset: function(t) {
                if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                    st.offset.setOffset(this, t, e)
                });
                var e, i, n = {
                        top: 0,
                        left: 0
                    },
                    s = this[0],
                    o = s && s.ownerDocument;
                return o ? (e = o.documentElement, st.contains(e, s) ? (typeof s.getBoundingClientRect !== _t && (n = s.getBoundingClientRect()), i = V(o), {
                    top: n.top + (i.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: n.left + (i.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }) : n) : void 0
            },
            position: function() {
                if (this[0]) {
                    var t, e, i = {
                            top: 0,
                            left: 0
                        },
                        n = this[0];
                    return "fixed" === st.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), st.nodeName(t[0], "html") || (i = t.offset()), i.top += st.css(t[0], "borderTopWidth", !0), i.left += st.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - i.top - st.css(n, "marginTop", !0),
                        left: e.left - i.left - st.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || ii; t && !st.nodeName(t, "html") && "static" === st.css(t, "position");) t = t.offsetParent;
                    return t || ii
                })
            }
        }), st.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var i = /Y/.test(e);
            st.fn[t] = function(n) {
                return Pt(this, function(t, n, s) {
                    var o = V(t);
                    return void 0 === s ? o ? e in o ? o[e] : o.document.documentElement[n] : t[n] : void(o ? o.scrollTo(i ? st(o).scrollLeft() : s, i ? s : st(o).scrollTop()) : t[n] = s)
                }, t, n, arguments.length, null)
            }
        }), st.each(["top", "left"], function(t, e) {
            st.cssHooks[e] = T(it.pixelPosition, function(t, i) {
                return i ? (i = ee(t, e), ne.test(i) ? st(t).position()[e] + "px" : i) : void 0
            })
        }), st.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            st.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(i, n) {
                st.fn[n] = function(n, s) {
                    var o = arguments.length && (i || "boolean" != typeof n),
                        r = i || (n === !0 || s === !0 ? "margin" : "border");
                    return Pt(this, function(e, i, n) {
                        var s;
                        return st.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === n ? st.css(e, i, r) : st.style(e, i, n, r)
                    }, e, o ? n : void 0, o, null)
                }
            })
        }), st.fn.size = function() {
            return this.length
        }, st.fn.andSelf = st.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return st
        });
        var ni = t.jQuery,
            si = t.$;
        return st.noConflict = function(e) {
            return t.$ === st && (t.$ = si), e && t.jQuery === st && (t.jQuery = ni), st
        }, typeof e === _t && (t.jQuery = t.$ = st), st
    }), function() {
        var t, e;
        t = window.jQuery || ("function" == typeof require ? require("jquery") : void 0), e = t(document), t.turbo = {
            version: "2.1.0",
            isReady: !1,
            use: function(t, i) {
                return e.off(".turbo").on("" + t + ".turbo", this.onLoad).on("" + i + ".turbo", this.onFetch)
            },
            addCallback: function(i) {
                return t.turbo.isReady && i(t), e.on("turbo:ready", function() {
                    return i(t)
                })
            },
            onLoad: function() {
                return t.turbo.isReady = !0, e.trigger("turbo:ready")
            },
            onFetch: function() {
                return t.turbo.isReady = !1
            },
            register: function() {
                return t(this.onLoad), t.fn.ready = this.addCallback
            }
        }, t.turbo.register(), t.turbo.use("page:load", "page:fetch")
    }.call(this), function(t, e) {
        "use strict";
        t.rails !== e && t.error("jquery-ujs has already been loaded!");
        var i, n = t(document);
        t.rails = i = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
            buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
            disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
            fileInputSelector: "input[name][type=file]:not([disabled])",
            linkDisableSelector: "a[data-disable-with], a[data-disable]",
            buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
            csrfToken: function() {
                return t("meta[name=csrf-token]").attr("content")
            },
            csrfParam: function() {
                return t("meta[name=csrf-param]").attr("content")
            },
            CSRFProtection: function(t) {
                var e = i.csrfToken();
                e && t.setRequestHeader("X-CSRF-Token", e)
            },
            refreshCSRFTokens: function() {
                t('form input[name="' + i.csrfParam() + '"]').val(i.csrfToken())
            },
            fire: function(e, i, n) {
                var s = t.Event(i);
                return e.trigger(s, n), s.result !== !1
            },
            confirm: function(t) {
                return confirm(t)
            },
            ajax: function(e) {
                return t.ajax(e)
            },
            href: function(t) {
                return t[0].href
            },
            isRemote: function(t) {
                return t.data("remote") !== e && t.data("remote") !== !1
            },
            handleRemote: function(n) {
                var s, o, r, a, l, c;
                if (i.fire(n, "ajax:before")) {
                    if (a = n.data("with-credentials") || null, l = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                        s = n.data("ujs:submit-button-formmethod") || n.attr("method"), o = n.data("ujs:submit-button-formaction") || n.attr("action"), r = t(n[0]).serializeArray();
                        var h = n.data("ujs:submit-button");
                        h && (r.push(h), n.data("ujs:submit-button", null)), n.data("ujs:submit-button-formmethod", null), n.data("ujs:submit-button-formaction", null)
                    } else n.is(i.inputChangeSelector) ? (s = n.data("method"), o = n.data("url"), r = n.serialize(), n.data("params") && (r = r + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (s = n.data("method") || "get", o = n.data("url"), r = n.serialize(), n.data("params") && (r = r + "&" + n.data("params"))) : (s = n.data("method"), o = i.href(n), r = n.data("params") || null);
                    return c = {
                        type: s || "GET",
                        data: r,
                        dataType: l,
                        beforeSend: function(t, s) {
                            return s.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + s.accepts.script), !!i.fire(n, "ajax:beforeSend", [t, s]) && void n.trigger("ajax:send", t)
                        },
                        success: function(t, e, i) {
                            n.trigger("ajax:success", [t, e, i])
                        },
                        complete: function(t, e) {
                            n.trigger("ajax:complete", [t, e])
                        },
                        error: function(t, e, i) {
                            n.trigger("ajax:error", [t, e, i])
                        },
                        crossDomain: i.isCrossDomain(o)
                    }, a && (c.xhrFields = {
                        withCredentials: a
                    }), o && (c.url = o), i.ajax(c)
                }
                return !1
            },
            isCrossDomain: function(t) {
                var e = document.createElement("a");
                e.href = location.href;
                var i = document.createElement("a");
                try {
                    return i.href = t, i.href = i.href, !((!i.protocol || ":" === i.protocol) && !i.host || e.protocol + "//" + e.host == i.protocol + "//" + i.host)
                } catch (t) {
                    return !0
                }
            },
            handleMethod: function(n) {
                var s = i.href(n),
                    o = n.data("method"),
                    r = n.attr("target"),
                    a = i.csrfToken(),
                    l = i.csrfParam(),
                    c = t('<form method="post" action="' + s + '"></form>'),
                    h = '<input name="_method" value="' + o + '" type="hidden" />';
                l === e || a === e || i.isCrossDomain(s) || (h += '<input name="' + l + '" value="' + a + '" type="hidden" />'), r && c.attr("target", r), c.hide().append(h).appendTo("body"), c.submit()
            },
            formElements: function(e, i) {
                return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
            },
            disableFormElements: function(e) {
                i.formElements(e, i.disableSelector).each(function() {
                    i.disableFormElement(t(this))
                })
            },
            disableFormElement: function(t) {
                var i, n;
                i = t.is("button") ? "html" : "val", n = t.data("disable-with"), n !== e && (t.data("ujs:enable-with", t[i]()), t[i](n)), t.prop("disabled", !0), t.data("ujs:disabled", !0)
            },
            enableFormElements: function(e) {
                i.formElements(e, i.enableSelector).each(function() {
                    i.enableFormElement(t(this))
                })
            },
            enableFormElement: function(t) {
                var i = t.is("button") ? "html" : "val";
                t.data("ujs:enable-with") !== e && (t[i](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.prop("disabled", !1), t.removeData("ujs:disabled")
            },
            allowAction: function(t) {
                var e, n = t.data("confirm"),
                    s = !1;
                if (!n) return !0;
                if (i.fire(t, "confirm")) {
                    try {
                        s = i.confirm(n)
                    } catch (t) {
                        (console.error || console.log).call(console, t.stack || t)
                    }
                    e = i.fire(t, "confirm:complete", [s])
                }
                return s && e
            },
            blankInputs: function(e, i, n) {
                var s, o, r, a, l = t(),
                    c = i || "input,textarea",
                    h = e.find(c),
                    u = {};
                return h.each(function() {
                    s = t(this), s.is("input[type=radio]") ? (a = s.attr("name"), u[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (r = e.find('input[type=radio][name="' + a + '"]'), l = l.add(r)), u[a] = a)) : (o = s.is("input[type=checkbox],input[type=radio]") ? s.is(":checked") : !!s.val(), o === n && (l = l.add(s)))
                }), !!l.length && l
            },
            nonBlankInputs: function(t, e) {
                return i.blankInputs(t, e, !0)
            },
            stopEverything: function(e) {
                return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
            },
            disableElement: function(t) {
                var n = t.data("disable-with");
                n !== e && (t.data("ujs:enable-with", t.html()), t.html(n)), t.bind("click.railsDisable", function(t) {
                    return i.stopEverything(t)
                }), t.data("ujs:disabled", !0)
            },
            enableElement: function(t) {
                t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable"), t.removeData("ujs:disabled")
            }
        }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, n) {
            t.crossDomain || i.CSRFProtection(n)
        }), t(window).on("pageshow.rails", function() {
            t(t.rails.enableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableFormElement(e)
            }), t(t.rails.linkDisableSelector).each(function() {
                var e = t(this);
                e.data("ujs:disabled") && t.rails.enableElement(e)
            })
        }), n.on("ajax:complete", i.linkDisableSelector, function() {
            i.enableElement(t(this))
        }), n.on("ajax:complete", i.buttonDisableSelector, function() {
            i.enableFormElement(t(this))
        }), n.on("click.rails", i.linkClickSelector, function(e) {
            var n = t(this),
                s = n.data("method"),
                o = n.data("params"),
                r = e.metaKey || e.ctrlKey;
            if (!i.allowAction(n)) return i.stopEverything(e);
            if (!r && n.is(i.linkDisableSelector) && i.disableElement(n), i.isRemote(n)) {
                if (r && (!s || "GET" === s) && !o) return !0;
                var a = i.handleRemote(n);
                return a === !1 ? i.enableElement(n) : a.fail(function() {
                    i.enableElement(n)
                }), !1
            }
            return s ? (i.handleMethod(n), !1) : void 0
        }), n.on("click.rails", i.buttonClickSelector, function(e) {
            var n = t(this);
            if (!i.allowAction(n) || !i.isRemote(n)) return i.stopEverything(e);
            n.is(i.buttonDisableSelector) && i.disableFormElement(n);
            var s = i.handleRemote(n);
            return s === !1 ? i.enableFormElement(n) : s.fail(function() {
                i.enableFormElement(n)
            }), !1
        }), n.on("change.rails", i.inputChangeSelector, function(e) {
            var n = t(this);
            return i.allowAction(n) && i.isRemote(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
        }), n.on("submit.rails", i.formSubmitSelector, function(n) {
            var s, o, r = t(this),
                a = i.isRemote(r);
            if (!i.allowAction(r)) return i.stopEverything(n);
            if (r.attr("novalidate") === e)
                if (r.data("ujs:formnovalidate-button") === e) {
                    if (s = i.blankInputs(r, i.requiredInputSelector, !1), s && i.fire(r, "ajax:aborted:required", [s])) return i.stopEverything(n)
                } else r.data("ujs:formnovalidate-button", e);
            if (a) {
                if (o = i.nonBlankInputs(r, i.fileInputSelector)) {
                    setTimeout(function() {
                        i.disableFormElements(r)
                    }, 13);
                    var l = i.fire(r, "ajax:aborted:file", [o]);
                    return l || setTimeout(function() {
                        i.enableFormElements(r)
                    }, 13), l
                }
                return i.handleRemote(r), !1
            }
            setTimeout(function() {
                i.disableFormElements(r)
            }, 13)
        }), n.on("click.rails", i.formInputClickSelector, function(e) {
            var n = t(this);
            if (!i.allowAction(n)) return i.stopEverything(e);
            var s = n.attr("name"),
                o = s ? {
                    name: s,
                    value: n.val()
                } : null,
                r = n.closest("form");
            0 === r.length && (r = t("#" + n.attr("form"))), r.data("ujs:submit-button", o), r.data("ujs:formnovalidate-button", n.attr("formnovalidate")), r.data("ujs:submit-button-formaction", n.attr("formaction")), r.data("ujs:submit-button-formmethod", n.attr("formmethod"))
        }), n.on("ajax:send.rails", i.formSubmitSelector, function(e) {
            this === e.target && i.disableFormElements(t(this))
        }), n.on("ajax:complete.rails", i.formSubmitSelector, function(e) {
            this === e.target && i.enableFormElements(t(this))
        }), t(function() {
            i.refreshCSRFTokens()
        }))
    }(jQuery), window.Modernizr = function(t, e, i) {
        function n(t) {
            y.cssText = t
        }

        function s(t, e) {
            return typeof t === e
        }

        function o(t, e) {
            return !!~("" + t).indexOf(e)
        }

        function r(t, e) {
            for (var n in t) {
                var s = t[n];
                if (!o(s, "-") && y[s] !== i) return "pfx" != e || s
            }
            return !1
        }

        function a(t, e, n) {
            for (var o in t) {
                var r = e[t[o]];
                if (r !== i) return n === !1 ? t[o] : s(r, "function") ? r.bind(n || e) : r
            }
            return !1
        }

        function l(t, e, i) {
            var n = t.charAt(0).toUpperCase() + t.slice(1),
                o = (t + " " + C.join(n + " ") + n).split(" ");
            return s(e, "string") || s(e, "undefined") ? r(o, e) : (o = (t + " " + x.join(n + " ") + n).split(" "), a(o, e, i))
        }
        var c, h, u, d = "2.8.3",
            p = {},
            f = !0,
            m = e.documentElement,
            g = "modernizr",
            v = e.createElement(g),
            y = v.style,
            b = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            w = "Webkit Moz O ms",
            C = w.split(" "),
            x = w.toLowerCase().split(" "),
            _ = {},
            S = [],
            k = S.slice,
            T = function(t, i, n, s) {
                var o, r, a, l, c = e.createElement("div"),
                    h = e.body,
                    u = h || e.createElement("body");
                if (parseInt(n, 10))
                    for (; n--;) a = e.createElement("div"), a.id = s ? s[n] : g + (n + 1), c.appendChild(a);
                return o = ["&#173;", '<style id="s', g, '">', t, "</style>"].join(""), c.id = g, (h ? c : u).innerHTML += o, u.appendChild(c), h || (u.style.background = "", u.style.overflow = "hidden", l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(u)), r = i(c, t), h ? c.parentNode.removeChild(c) : (u.parentNode.removeChild(u), m.style.overflow = l), !!r
            },
            E = {}.hasOwnProperty;
        u = s(E, "undefined") || s(E.call, "undefined") ? function(t, e) {
            return e in t && s(t.constructor.prototype[e], "undefined")
        } : function(t, e) {
            return E.call(t, e)
        }, Function.prototype.bind || (Function.prototype.bind = function(t) {
            var e = this;
            if ("function" != typeof e) throw new TypeError;
            var i = k.call(arguments, 1),
                n = function() {
                    if (this instanceof n) {
                        var s = function() {};
                        s.prototype = e.prototype;
                        var o = new s,
                            r = e.apply(o, i.concat(k.call(arguments)));
                        return Object(r) === r ? r : o
                    }
                    return e.apply(t, i.concat(k.call(arguments)))
                };
            return n
        }), _.touch = function() {
            var i;
            return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? i = !0 : T(["@media (", b.join("touch-enabled),("), g, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(t) {
                i = 9 === t.offsetTop
            }), i
        }, _.csstransforms3d = function() {
            var t = !!l("perspective");
            return t && "webkitPerspective" in m.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e) {
                t = 9 === e.offsetLeft && 3 === e.offsetHeight
            }), t
        }, _.csstransitions = function() {
            return l("transition")
        };
        for (var D in _) u(_, D) && (h = D.toLowerCase(), p[h] = _[D](), S.push((p[h] ? "" : "no-") + h));
        return p.addTest = function(t, e) {
                if ("object" == typeof t)
                    for (var n in t) u(t, n) && p.addTest(n, t[n]);
                else {
                    if (t = t.toLowerCase(), p[t] !== i) return p;
                    e = "function" == typeof e ? e() : e, "undefined" != typeof f && f && (m.className += " " + (e ? "" : "no-") + t), p[t] = e
                }
                return p
            }, n(""), v = c = null,
            function(t, e) {
                function i(t, e) {
                    var i = t.createElement("p"),
                        n = t.getElementsByTagName("head")[0] || t.documentElement;
                    return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
                }

                function n() {
                    var t = y.elements;
                    return "string" == typeof t ? t.split(" ") : t
                }

                function s(t) {
                    var e = v[t[m]];
                    return e || (e = {}, g++, t[m] = g, v[g] = e), e
                }

                function o(t, i, n) {
                    if (i || (i = e), h) return i.createElement(t);
                    n || (n = s(i));
                    var o;
                    return o = n.cache[t] ? n.cache[t].cloneNode() : f.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), !o.canHaveChildren || p.test(t) || o.tagUrn ? o : n.frag.appendChild(o)
                }

                function r(t, i) {
                    if (t || (t = e), h) return t.createDocumentFragment();
                    i = i || s(t);
                    for (var o = i.frag.cloneNode(), r = 0, a = n(), l = a.length; r < l; r++) o.createElement(a[r]);
                    return o
                }

                function a(t, e) {
                    e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function(i) {
                        return y.shivMethods ? o(i, t, e) : e.createElem(i)
                    }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function(t) {
                        return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
                    }) + ");return n}")(y, e.frag)
                }

                function l(t) {
                    t || (t = e);
                    var n = s(t);
                    return y.shivCSS && !c && !n.hasCSS && (n.hasCSS = !!i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), h || a(t, n), t
                }
                var c, h, u = "3.7.0",
                    d = t.html5 || {},
                    p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    m = "_html5shiv",
                    g = 0,
                    v = {};
                ! function() {
                    try {
                        var t = e.createElement("a");
                        t.innerHTML = "<xyz></xyz>", c = "hidden" in t, h = 1 == t.childNodes.length || function() {
                            e.createElement("a");
                            var t = e.createDocumentFragment();
                            return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
                        }()
                    } catch (t) {
                        c = !0, h = !0
                    }
                }();
                var y = {
                    elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: u,
                    shivCSS: d.shivCSS !== !1,
                    supportsUnknownElements: h,
                    shivMethods: d.shivMethods !== !1,
                    type: "default",
                    shivDocument: l,
                    createElement: o,
                    createDocumentFragment: r
                };
                t.html5 = y, l(e)
            }(this, e), p._version = d, p._prefixes = b, p._domPrefixes = x, p._cssomPrefixes = C, p.testProp = function(t) {
                return r([t])
            }, p.testAllProps = l, p.testStyles = T, p.prefixed = function(t, e, i) {
                return e ? l(t, e, i) : l(t, "pfx")
            }, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + S.join(" ") : ""), p
    }(this, this.document), function(t, e, i) {
        function n(t) {
            return "[object Function]" == g.call(t)
        }

        function s(t) {
            return "string" == typeof t
        }

        function o() {}

        function r(t) {
            return !t || "loaded" == t || "complete" == t || "uninitialized" == t
        }

        function a() {
            var t = v.shift();
            y = 1, t ? t.t ? f(function() {
                ("c" == t.t ? d.injectCss : d.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
            }, 0) : (t(), a()) : y = 0
        }

        function l(t, i, n, s, o, l, c) {
            function h(e) {
                if (!p && r(u.readyState) && (b.r = p = 1, !y && a(), u.onload = u.onreadystatechange = null, e)) {
                    "img" != t && f(function() {
                        C.removeChild(u)
                    }, 50);
                    for (var n in T[i]) T[i].hasOwnProperty(n) && T[i][n].onload()
                }
            }
            var c = c || d.errorTimeout,
                u = e.createElement(t),
                p = 0,
                g = 0,
                b = {
                    t: n,
                    s: i,
                    e: o,
                    a: l,
                    x: c
                };
            1 === T[i] && (g = 1, T[i] = []), "object" == t ? u.data = i : (u.src = i, u.type = t), u.width = u.height = "0", u.onerror = u.onload = u.onreadystatechange = function() {
                h.call(this, g)
            }, v.splice(s, 0, b), "img" != t && (g || 2 === T[i] ? (C.insertBefore(u, w ? null : m), f(h, c)) : T[i].push(u))
        }

        function c(t, e, i, n, o) {
            return y = 0, e = e || "j", s(t) ? l("c" == e ? _ : x, t, e, this.i++, i, n, o) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
        }

        function h() {
            var t = d;
            return t.loader = {
                load: c,
                i: 0
            }, t
        }
        var u, d, p = e.documentElement,
            f = t.setTimeout,
            m = e.getElementsByTagName("script")[0],
            g = {}.toString,
            v = [],
            y = 0,
            b = "MozAppearance" in p.style,
            w = b && !!e.createRange().compareNode,
            C = w ? p : m.parentNode,
            p = t.opera && "[object Opera]" == g.call(t.opera),
            p = !!e.attachEvent && !p,
            x = b ? "object" : p ? "script" : "img",
            _ = p ? "script" : x,
            S = Array.isArray || function(t) {
                return "[object Array]" == g.call(t)
            },
            k = [],
            T = {},
            E = {
                timeout: function(t, e) {
                    return e.length && (t.timeout = e[0]), t
                }
            };
        d = function(t) {
            function e(t) {
                var e, i, n, t = t.split("!"),
                    s = k.length,
                    o = t.pop(),
                    r = t.length,
                    o = {
                        url: o,
                        origUrl: o,
                        prefixes: t
                    };
                for (i = 0; i < r; i++) n = t[i].split("="), (e = E[n.shift()]) && (o = e(o, n));
                for (i = 0; i < s; i++) o = k[i](o);
                return o
            }

            function r(t, s, o, r, a) {
                var l = e(t),
                    c = l.autoCallback;
                l.url.split(".").pop().split("?").shift(), l.bypass || (s && (s = n(s) ? s : s[t] || s[r] || s[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, s, o, r, a) : (T[l.url] ? l.noexec = !0 : T[l.url] = 1, o.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (n(s) || n(c)) && o.load(function() {
                    h(), s && s(l.origUrl, a, r), c && c(l.origUrl, a, r), T[l.url] = 2
                })))
            }

            function a(t, e) {
                function i(t, i) {
                    if (t) {
                        if (s(t)) i || (u = function() {
                            var t = [].slice.call(arguments);
                            d.apply(this, t), p()
                        }), r(t, u, e, 0, c);
                        else if (Object(t) === t)
                            for (l in a = function() {
                                    var e, i = 0;
                                    for (e in t) t.hasOwnProperty(e) && i++;
                                    return i
                                }(), t) t.hasOwnProperty(l) && (!i && !--a && (n(u) ? u = function() {
                                var t = [].slice.call(arguments);
                                d.apply(this, t), p()
                            } : u[l] = function(t) {
                                return function() {
                                    var e = [].slice.call(arguments);
                                    t && t.apply(this, e), p()
                                }
                            }(d[l])), r(t[l], u, e, l, c))
                    } else !i && p()
                }
                var a, l, c = !!t.test,
                    h = t.load || t.both,
                    u = t.callback || o,
                    d = u,
                    p = t.complete || o;
                i(c ? t.yep : t.nope, !!h), h && i(h)
            }
            var l, c, u = this.yepnope.loader;
            if (s(t)) r(t, 0, u, 0);
            else if (S(t))
                for (l = 0; l < t.length; l++) c = t[l], s(c) ? r(c, 0, u, 0) : S(c) ? d(c) : Object(c) === c && a(c, u);
            else Object(t) === t && a(t, u)
        }, d.addPrefix = function(t, e) {
            E[t] = e
        }, d.addFilter = function(t) {
            k.push(t)
        }, d.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", u = function() {
            e.removeEventListener("DOMContentLoaded", u, 0), e.readyState = "complete"
        }, 0)), t.yepnope = h(), t.yepnope.executeStack = a, t.yepnope.injectJs = function(t, i, n, s, l, c) {
            var h, u, p = e.createElement("script"),
                s = s || d.errorTimeout;
            p.src = t;
            for (u in n) p.setAttribute(u, n[u]);
            i = c ? a : i || o, p.onreadystatechange = p.onload = function() {
                !h && r(p.readyState) && (h = 1, i(), p.onload = p.onreadystatechange = null)
            }, f(function() {
                h || (h = 1, i(1))
            }, s), l ? p.onload() : m.parentNode.insertBefore(p, m)
        }, t.yepnope.injectCss = function(t, i, n, s, r, l) {
            var c, s = e.createElement("link"),
                i = l ? a : i || o;
            s.href = t, s.rel = "stylesheet", s.type = "text/css";
            for (c in n) s.setAttribute(c, n[c]);
            r || (m.parentNode.insertBefore(s, m), f(i, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    }, function(t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(e, n) {
            var s, o, r, a = e.nodeName.toLowerCase();
            return "area" === a ? (s = e.parentNode, o = s.name, !(!e.href || !o || "map" !== s.nodeName.toLowerCase()) && (r = t("img[usemap='#" + o + "']")[0], !!r && i(r))) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || n : n) && i(e)
        }

        function i(e) {
            return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                return "hidden" === t.css(this, "visibility")
            }).length
        }
        t.ui = t.ui || {}, t.extend(t.ui, {
            version: "1.11.1",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), t.fn.extend({
            scrollParent: function(e) {
                var i = this.css("position"),
                    n = "absolute" === i,
                    s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    o = this.parents().filter(function() {
                        var e = t(this);
                        return (!n || "static" !== e.css("position")) && s.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                    }).eq(0);
                return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
            },
            uniqueId: function() {
                var t = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++t)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, n) {
                return !!t.data(e, n[3])
            },
            focusable: function(i) {
                return e(i, !isNaN(t.attr(i, "tabindex")))
            },
            tabbable: function(i) {
                var n = t.attr(i, "tabindex"),
                    s = isNaN(n);
                return (s || n >= 0) && e(i, !s)
            }
        }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(e, i) {
            function n(e, i, n, o) {
                return t.each(s, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                o = i.toLowerCase(),
                r = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + i] = function(e) {
                return void 0 === e ? r["inner" + i].call(this) : this.each(function() {
                    t(this).css(o, n(this, e) + "px")
                })
            }, t.fn["outer" + i] = function(e, s) {
                return "number" != typeof e ? r["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(o, n(this, e, !0, s) + "px")
                })
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
            return function(i) {
                return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
            }
        }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.fn.extend({
            focus: function(e) {
                return function(i, n) {
                    return "number" == typeof i ? this.each(function() {
                        var e = this;
                        setTimeout(function() {
                            t(e).focus(), n && n.call(e)
                        }, i)
                    }) : e.apply(this, arguments)
                }
            }(t.fn.focus),
            disableSelection: function() {
                var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.bind(t + ".ui-disableSelection", function(t) {
                        t.preventDefault()
                    })
                }
            }(),
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            },
            zIndex: function(e) {
                if (void 0 !== e) return this.css("zIndex", e);
                if (this.length)
                    for (var i, n, s = t(this[0]); s.length && s[0] !== document;) {
                        if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                        s = s.parent()
                    }
                return 0
            }
        }), t.ui.plugin = {
            add: function(e, i, n) {
                var s, o = t.ui[e].prototype;
                for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
            },
            call: function(t, e, i, n) {
                var s, o = t.plugins[e];
                if (o && (n || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                    for (s = 0; o.length > s; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i)
            }
        };
        var n = 0,
            s = Array.prototype.slice;
        t.cleanData = function(e) {
            return function(i) {
                var n, s, o;
                for (o = 0; null != (s = i[o]); o++) try {
                    n = t._data(s, "events"), n && n.remove && t(s).triggerHandler("remove")
                } catch (t) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, n) {
            var s, o, r, a, l = {},
                c = e.split(".")[0];
            return e = e.split(".")[1], s = c + "-" + e, n || (n = i, i = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[c] = t[c] || {}, o = t[c][e], r = t[c][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new r(t, e);
            }, t.extend(r, o, {
                version: n.version,
                _proto: t.extend({}, n),
                _childConstructors: []
            }), a = new i, a.options = t.widget.extend({}, a.options), t.each(n, function(e, n) {
                return t.isFunction(n) ? void(l[e] = function() {
                    var t = function() {
                            return i.prototype[e].apply(this, arguments)
                        },
                        s = function(t) {
                            return i.prototype[e].apply(this, t)
                        };
                    return function() {
                        var e, i = this._super,
                            o = this._superApply;
                        return this._super = t, this._superApply = s, e = n.apply(this, arguments), this._super = i, this._superApply = o, e
                    }
                }()) : void(l[e] = n)
            }), r.prototype = t.widget.extend(a, {
                widgetEventPrefix: o ? a.widgetEventPrefix || e : e
            }, l, {
                constructor: r,
                namespace: c,
                widgetName: e,
                widgetFullName: s
            }), o ? (t.each(o._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, r, i._proto)
            }), delete o._childConstructors) : i._childConstructors.push(r), t.widget.bridge(e, r), r
        }, t.widget.extend = function(e) {
            for (var i, n, o = s.call(arguments, 1), r = 0, a = o.length; a > r; r++)
                for (i in o[r]) n = o[r][i], o[r].hasOwnProperty(i) && void 0 !== n && (e[i] = t.isPlainObject(n) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], n) : t.widget.extend({}, n) : n);
            return e
        }, t.widget.bridge = function(e, i) {
            var n = i.prototype.widgetFullName || e;
            t.fn[e] = function(o) {
                var r = "string" == typeof o,
                    a = s.call(arguments, 1),
                    l = this;
                return o = !r && a.length ? t.widget.extend.apply(null, [o].concat(a)) : o, r ? this.each(function() {
                    var i, s = t.data(this, n);
                    return "instance" === o ? (l = s, !1) : s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, a), i !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + o + "'")
                }) : this.each(function() {
                    var e = t.data(this, n);
                    e ? (e.option(o || {}), e._init && e._init()) : t.data(this, n, new i(o, this))
                }), l
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(e, i) {
                i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === i && this.destroy()
                    }
                }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var n, s, o, r = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (r = {}, n = e.split("."), e = n.shift(), n.length) {
                        for (s = r[e] = t.widget.extend({}, this.options[e]), o = 0; n.length - 1 > o; o++) s[n[o]] = s[n[o]] || {}, s = s[n[o]];
                        if (e = n.pop(), 1 === arguments.length) return void 0 === s[e] ? null : s[e];
                        s[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        r[e] = i
                    }
                return this._setOptions(r), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _on: function(e, i, n) {
                var s, o = this;
                "boolean" != typeof e && (n = i, i = e, e = !1), n ? (i = s = t(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), t.each(n, function(n, r) {
                    function a() {
                        return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? o[r] : r).apply(o, arguments) : void 0
                    }
                    "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
                    var l = n.match(/^([\w:-]*)\s*(.*)$/),
                        c = l[1] + o.eventNamespace,
                        h = l[2];
                    h ? s.delegate(h, c, a) : i.bind(c, a)
                })
            },
            _off: function(t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var s, o, r = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                    for (s in o) s in i || (i[s] = o[s]);
                return this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, s, o) {
                "string" == typeof s && (s = {
                    effect: s
                });
                var r, a = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
                s = s || {}, "number" == typeof s && (s = {
                    duration: s
                }), r = !t.isEmptyObject(s), s.complete = o, s.delay && n.delay(s.delay), r && t.effects && t.effects.effect[a] ? n[e](s) : a !== e && n[a] ? n[a](s.duration, s.easing, o) : n.queue(function(i) {
                    t(this)[e](), o && o.call(n[0]), i()
                })
            }
        }), t.widget;
        var o = !1;
        t(document).mouseup(function() {
                o = !1
            }), t.widget("ui.mouse", {
                version: "1.11.1",
                options: {
                    cancel: "input,textarea,button,select,option",
                    distance: 1,
                    delay: 0
                },
                _mouseInit: function() {
                    var e = this;
                    this.element.bind("mousedown." + this.widgetName, function(t) {
                        return e._mouseDown(t)
                    }).bind("click." + this.widgetName, function(i) {
                        return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                    }), this.started = !1
                },
                _mouseDestroy: function() {
                    this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
                },
                _mouseDown: function(e) {
                    if (!o) {
                        this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                        var i = this,
                            n = 1 === e.which,
                            s = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                        return !(n && !s && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                            i.mouseDelayMet = !0
                        }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                            return i._mouseMove(t)
                        }, this._mouseUpDelegate = function(t) {
                            return i._mouseUp(t)
                        }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), o = !0, !0))
                    }
                },
                _mouseMove: function(e) {
                    return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : e.which ? this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted) : this._mouseUp(e)
                },
                _mouseUp: function(e) {
                    return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), o = !1, !1
                },
                _mouseDistanceMet: function(t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
                },
                _mouseDelayMet: function() {
                    return this.mouseDelayMet
                },
                _mouseStart: function() {},
                _mouseDrag: function() {},
                _mouseStop: function() {},
                _mouseCapture: function() {
                    return !0
                }
            }),
            function() {
                function e(t, e, i) {
                    return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
                }

                function i(e, i) {
                    return parseInt(t.css(e, i), 10) || 0
                }

                function n(e) {
                    var i = e[0];
                    return 9 === i.nodeType ? {
                        width: e.width(),
                        height: e.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : t.isWindow(i) ? {
                        width: e.width(),
                        height: e.height(),
                        offset: {
                            top: e.scrollTop(),
                            left: e.scrollLeft()
                        }
                    } : i.preventDefault ? {
                        width: 0,
                        height: 0,
                        offset: {
                            top: i.pageY,
                            left: i.pageX
                        }
                    } : {
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        offset: e.offset()
                    }
                }
                t.ui = t.ui || {};
                var s, o, r = Math.max,
                    a = Math.abs,
                    l = Math.round,
                    c = /left|center|right/,
                    h = /top|center|bottom/,
                    u = /[\+\-]\d+(\.[\d]+)?%?/,
                    d = /^\w+/,
                    p = /%$/,
                    f = t.fn.position;
                t.position = {
                        scrollbarWidth: function() {
                            if (void 0 !== s) return s;
                            var e, i, n = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                                o = n.children()[0];
                            return t("body").append(n), e = o.offsetWidth, n.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = n[0].clientWidth), n.remove(), s = e - i
                        },
                        getScrollInfo: function(e) {
                            var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                                n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                                s = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                                o = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                            return {
                                width: o ? t.position.scrollbarWidth() : 0,
                                height: s ? t.position.scrollbarWidth() : 0
                            }
                        },
                        getWithinInfo: function(e) {
                            var i = t(e || window),
                                n = t.isWindow(i[0]),
                                s = !!i[0] && 9 === i[0].nodeType;
                            return {
                                element: i,
                                isWindow: n,
                                isDocument: s,
                                offset: i.offset() || {
                                    left: 0,
                                    top: 0
                                },
                                scrollLeft: i.scrollLeft(),
                                scrollTop: i.scrollTop(),
                                width: n || s ? i.width() : i.outerWidth(),
                                height: n || s ? i.height() : i.outerHeight()
                            }
                        }
                    }, t.fn.position = function(s) {
                        if (!s || !s.of) return f.apply(this, arguments);
                        s = t.extend({}, s);
                        var p, m, g, v, y, b, w = t(s.of),
                            C = t.position.getWithinInfo(s.within),
                            x = t.position.getScrollInfo(C),
                            _ = (s.collision || "flip").split(" "),
                            S = {};
                        return b = n(w), w[0].preventDefault && (s.at = "left top"), m = b.width, g = b.height, v = b.offset, y = t.extend({}, v), t.each(["my", "at"], function() {
                            var t, e, i = (s[this] || "").split(" ");
                            1 === i.length && (i = c.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = c.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", t = u.exec(i[0]), e = u.exec(i[1]), S[this] = [t ? t[0] : 0, e ? e[0] : 0], s[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
                        }), 1 === _.length && (_[1] = _[0]), "right" === s.at[0] ? y.left += m : "center" === s.at[0] && (y.left += m / 2), "bottom" === s.at[1] ? y.top += g : "center" === s.at[1] && (y.top += g / 2), p = e(S.at, m, g), y.left += p[0], y.top += p[1], this.each(function() {
                            var n, c, h = t(this),
                                u = h.outerWidth(),
                                d = h.outerHeight(),
                                f = i(this, "marginLeft"),
                                b = i(this, "marginTop"),
                                k = u + f + i(this, "marginRight") + x.width,
                                T = d + b + i(this, "marginBottom") + x.height,
                                E = t.extend({}, y),
                                D = e(S.my, h.outerWidth(), h.outerHeight());
                            "right" === s.my[0] ? E.left -= u : "center" === s.my[0] && (E.left -= u / 2), "bottom" === s.my[1] ? E.top -= d : "center" === s.my[1] && (E.top -= d / 2), E.left += D[0], E.top += D[1], o || (E.left = l(E.left), E.top = l(E.top)), n = {
                                marginLeft: f,
                                marginTop: b
                            }, t.each(["left", "top"], function(e, i) {
                                t.ui.position[_[e]] && t.ui.position[_[e]][i](E, {
                                    targetWidth: m,
                                    targetHeight: g,
                                    elemWidth: u,
                                    elemHeight: d,
                                    collisionPosition: n,
                                    collisionWidth: k,
                                    collisionHeight: T,
                                    offset: [p[0] + D[0], p[1] + D[1]],
                                    my: s.my,
                                    at: s.at,
                                    within: C,
                                    elem: h
                                })
                            }), s.using && (c = function(t) {
                                var e = v.left - E.left,
                                    i = e + m - u,
                                    n = v.top - E.top,
                                    o = n + g - d,
                                    l = {
                                        target: {
                                            element: w,
                                            left: v.left,
                                            top: v.top,
                                            width: m,
                                            height: g
                                        },
                                        element: {
                                            element: h,
                                            left: E.left,
                                            top: E.top,
                                            width: u,
                                            height: d
                                        },
                                        horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                                        vertical: 0 > o ? "top" : n > 0 ? "bottom" : "middle"
                                    };
                                u > m && m > a(e + i) && (l.horizontal = "center"), d > g && g > a(n + o) && (l.vertical = "middle"), l.important = r(a(e), a(i)) > r(a(n), a(o)) ? "horizontal" : "vertical", s.using.call(this, t, l)
                            }), h.offset(t.extend(E, {
                                using: c
                            }))
                        })
                    }, t.ui.position = {
                        fit: {
                            left: function(t, e) {
                                var i, n = e.within,
                                    s = n.isWindow ? n.scrollLeft : n.offset.left,
                                    o = n.width,
                                    a = t.left - e.collisionPosition.marginLeft,
                                    l = s - a,
                                    c = a + e.collisionWidth - o - s;
                                e.collisionWidth > o ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - o - s, t.left += l - i) : t.left = c > 0 && 0 >= l ? s : l > c ? s + o - e.collisionWidth : s : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = r(t.left - a, t.left)
                            },
                            top: function(t, e) {
                                var i, n = e.within,
                                    s = n.isWindow ? n.scrollTop : n.offset.top,
                                    o = e.within.height,
                                    a = t.top - e.collisionPosition.marginTop,
                                    l = s - a,
                                    c = a + e.collisionHeight - o - s;
                                e.collisionHeight > o ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - o - s, t.top += l - i) : t.top = c > 0 && 0 >= l ? s : l > c ? s + o - e.collisionHeight : s : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = r(t.top - a, t.top)
                            }
                        },
                        flip: {
                            left: function(t, e) {
                                var i, n, s = e.within,
                                    o = s.offset.left + s.scrollLeft,
                                    r = s.width,
                                    l = s.isWindow ? s.scrollLeft : s.offset.left,
                                    c = t.left - e.collisionPosition.marginLeft,
                                    h = c - l,
                                    u = c + e.collisionWidth - r - l,
                                    d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                                    p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                                    f = -2 * e.offset[0];
                                0 > h ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(h) > i) && (t.left += d + p + f)) : u > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || u > a(n)) && (t.left += d + p + f))
                            },
                            top: function(t, e) {
                                var i, n, s = e.within,
                                    o = s.offset.top + s.scrollTop,
                                    r = s.height,
                                    l = s.isWindow ? s.scrollTop : s.offset.top,
                                    c = t.top - e.collisionPosition.marginTop,
                                    h = c - l,
                                    u = c + e.collisionHeight - r - l,
                                    d = "top" === e.my[1],
                                    p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                                    f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                                    m = -2 * e.offset[1];
                                0 > h ? (n = t.top + p + f + m + e.collisionHeight - r - o, t.top + p + f + m > h && (0 > n || a(h) > n) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > u && (i > 0 || u > a(i)) && (t.top += p + f + m))
                            }
                        },
                        flipfit: {
                            left: function() {
                                t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                            },
                            top: function() {
                                t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                            }
                        }
                    },
                    function() {
                        var e, i, n, s, r, a = document.getElementsByTagName("body")[0],
                            l = document.createElement("div");
                        e = document.createElement(a ? "div" : "body"), n = {
                            visibility: "hidden",
                            width: 0,
                            height: 0,
                            border: 0,
                            margin: 0,
                            background: "none"
                        }, a && t.extend(n, {
                            position: "absolute",
                            left: "-1000px",
                            top: "-1000px"
                        });
                        for (r in n) e.style[r] = n[r];
                        e.appendChild(l), i = a || document.documentElement, i.insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", s = t(l).offset().left, o = s > 10 && 11 > s, e.innerHTML = "", i.removeChild(e)
                    }()
            }(), t.ui.position, t.widget("ui.draggable", t.ui.mouse, {
                version: "1.11.1",
                widgetEventPrefix: "drag",
                options: {
                    addClasses: !0,
                    appendTo: "parent",
                    axis: !1,
                    connectToSortable: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    iframeFix: !1,
                    opacity: !1,
                    refreshPositions: !1,
                    revert: !1,
                    revertDuration: 500,
                    scope: "default",
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    snap: !1,
                    snapMode: "both",
                    snapTolerance: 20,
                    stack: !1,
                    zIndex: !1,
                    drag: null,
                    start: null,
                    stop: null
                },
                _create: function() {
                    "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
                },
                _setOption: function(t, e) {
                    this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
                },
                _destroy: function() {
                    return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
                },
                _mouseCapture: function(e) {
                    var i = this.document[0],
                        n = this.options;
                    try {
                        i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
                    } catch (t) {}
                    return !(this.helper || n.disabled || t(e.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(e), !!this.handle && (t(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
                        t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                            width: this.offsetWidth + "px",
                            height: this.offsetHeight + "px",
                            position: "absolute",
                            opacity: "0.001",
                            zIndex: 1e3
                        }).css(t(this).offset()).appendTo("body")
                    }), !0))
                },
                _mouseStart: function(e) {
                    var i = this.options;
                    return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, this.offset.scroll = !1, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
                },
                _mouseDrag: function(e, i) {
                    if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                        var n = this._uiHash();
                        if (this._trigger("drag", e, n) === !1) return this._mouseUp({}), !1;
                        this.position = n.position
                    }
                    return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
                },
                _mouseStop: function(e) {
                    var i = this,
                        n = !1;
                    return t.ui.ddmanager && !this.options.dropBehaviour && (n = t.ui.ddmanager.drop(this, e)), this.dropped && (n = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !n || "valid" === this.options.revert && n || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, n) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        i._trigger("stop", e) !== !1 && i._clear()
                    }) : this._trigger("stop", e) !== !1 && this._clear(), !1
                },
                _mouseUp: function(e) {
                    return t("div.ui-draggable-iframeFix").each(function() {
                        this.parentNode.removeChild(this)
                    }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.element.focus(), t.ui.mouse.prototype._mouseUp.call(this, e)
                },
                cancel: function() {
                    return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
                },
                _getHandle: function(e) {
                    return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length
                },
                _setHandleClassName: function() {
                    this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
                },
                _removeHandleClassName: function() {
                    this.handleElement.removeClass("ui-draggable-handle")
                },
                _createHelper: function(e) {
                    var i = this.options,
                        n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                    return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
                },
                _adjustOffsetFromHelper: function(e) {
                    "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                        left: +e[0],
                        top: +e[1] || 0
                    }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
                },
                _isRootNode: function(t) {
                    return /(html|body)/i.test(t.tagName) || t === this.document[0]
                },
                _getParentOffset: function() {
                    var e = this.offsetParent.offset(),
                        i = this.document[0];
                    return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                        top: 0,
                        left: 0
                    }), {
                        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    }
                },
                _getRelativeOffset: function() {
                    if ("relative" !== this.cssPosition) return {
                        top: 0,
                        left: 0
                    };
                    var t = this.element.position(),
                        e = this._isRootNode(this.scrollParent[0]);
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
                    }
                },
                _cacheMargins: function() {
                    this.margins = {
                        left: parseInt(this.element.css("marginLeft"), 10) || 0,
                        top: parseInt(this.element.css("marginTop"), 10) || 0,
                        right: parseInt(this.element.css("marginRight"), 10) || 0,
                        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                    }
                },
                _cacheHelperProportions: function() {
                    this.helperProportions = {
                        width: this.helper.outerWidth(),
                        height: this.helper.outerHeight()
                    }
                },
                _setContainment: function() {
                    var e, i, n, s = this.options,
                        o = this.document[0];
                    return this.relativeContainer = null, s.containment ? "window" === s.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === s.containment ? void(this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : s.containment.constructor === Array ? void(this.containment = s.containment) : ("parent" === s.containment && (s.containment = this.helper[0].parentNode), i = t(s.containment), n = i[0], void(n && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
                },
                _convertPositionTo: function(t, e) {
                    e || (e = this.position);
                    var i = "absolute" === t ? 1 : -1,
                        n = this._isRootNode(this.scrollParent[0]);
                    return {
                        top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top) * i,
                        left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left) * i
                    }
                },
                _generatePosition: function(t, e) {
                    var i, n, s, o, r = this.options,
                        a = this._isRootNode(this.scrollParent[0]),
                        l = t.pageX,
                        c = t.pageY;
                    return a && this.offset.scroll || (this.offset.scroll = {
                        top: this.scrollParent.scrollTop(),
                        left: this.scrollParent.scrollLeft()
                    }), e && (this.containment && (this.relativeContainer ? (n = this.relativeContainer.offset(), i = [this.containment[0] + n.left, this.containment[1] + n.top, this.containment[2] + n.left, this.containment[3] + n.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (c = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (c = i[3] + this.offset.click.top)), r.grid && (s = r.grid[1] ? this.originalPageY + Math.round((c - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, c = i ? s - this.offset.click.top >= i[1] || s - this.offset.click.top > i[3] ? s : s - this.offset.click.top >= i[1] ? s - r.grid[1] : s + r.grid[1] : s, o = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - r.grid[0] : o + r.grid[0] : o), "y" === r.axis && (l = this.originalPageX), "x" === r.axis && (c = this.originalPageY)), {
                        top: c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : a ? 0 : this.offset.scroll.top),
                        left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : a ? 0 : this.offset.scroll.left)
                    }
                },
                _clear: function() {
                    this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
                },
                _trigger: function(e, i, n) {
                    return n = n || this._uiHash(), t.ui.plugin.call(this, e, [i, n, this], !0), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, n)
                },
                plugins: {},
                _uiHash: function() {
                    return {
                        helper: this.helper,
                        position: this.position,
                        originalPosition: this.originalPosition,
                        offset: this.positionAbs
                    }
                }
            }), t.ui.plugin.add("draggable", "connectToSortable", {
                start: function(e, i, n) {
                    var s = n.options,
                        o = t.extend({}, i, {
                            item: n.element
                        });
                    n.sortables = [], t(s.connectToSortable).each(function() {
                        var i = t(this).sortable("instance");
                        i && !i.options.disabled && (n.sortables.push({
                            instance: i,
                            shouldRevert: i.options.revert
                        }), i.refreshPositions(), i._trigger("activate", e, o))
                    })
                },
                stop: function(e, i, n) {
                    var s = t.extend({}, i, {
                        item: n.element
                    });
                    t.each(n.sortables, function() {
                        this.instance.isOver ? (this.instance.isOver = 0, n.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, "original" === n.options.helper && this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, s))
                    })
                },
                drag: function(e, i, n) {
                    var s = this;
                    t.each(n.sortables, function() {
                        var o = !1,
                            r = this;
                        this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, t.each(n.sortables, function() {
                            return this.instance.positionAbs = n.positionAbs, this.instance.helperProportions = n.helperProportions, this.instance.offset.click = n.offset.click, this !== r && this.instance._intersectsWith(this.instance.containerCache) && t.contains(r.instance.element[0], this.instance.element[0]) && (o = !1), o
                        })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(s).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                            return i.helper[0]
                        }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = n.offset.click.top, this.instance.offset.click.left = n.offset.click.left, this.instance.offset.parent.left -= n.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= n.offset.parent.top - this.instance.offset.parent.top, n._trigger("toSortable", e), n.dropped = this.instance.element, n.currentItem = n.element, this.instance.fromOutside = n), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), n._trigger("fromSortable", e), n.dropped = !1)
                    })
                }
            }), t.ui.plugin.add("draggable", "cursor", {
                start: function(e, i, n) {
                    var s = t("body"),
                        o = n.options;
                    s.css("cursor") && (o._cursor = s.css("cursor")), s.css("cursor", o.cursor)
                },
                stop: function(e, i, n) {
                    var s = n.options;
                    s._cursor && t("body").css("cursor", s._cursor)
                }
            }), t.ui.plugin.add("draggable", "opacity", {
                start: function(e, i, n) {
                    var s = t(i.helper),
                        o = n.options;
                    s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity)
                },
                stop: function(e, i, n) {
                    var s = n.options;
                    s._opacity && t(i.helper).css("opacity", s._opacity)
                }
            }), t.ui.plugin.add("draggable", "scroll", {
                start: function(t, e, i) {
                    i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
                },
                drag: function(e, i, n) {
                    var s = n.options,
                        o = !1,
                        r = n.scrollParentNotHidden[0],
                        a = n.document[0];
                    r !== a && "HTML" !== r.tagName ? (s.axis && "x" === s.axis || (n.overflowOffset.top + r.offsetHeight - e.pageY < s.scrollSensitivity ? r.scrollTop = o = r.scrollTop + s.scrollSpeed : e.pageY - n.overflowOffset.top < s.scrollSensitivity && (r.scrollTop = o = r.scrollTop - s.scrollSpeed)), s.axis && "y" === s.axis || (n.overflowOffset.left + r.offsetWidth - e.pageX < s.scrollSensitivity ? r.scrollLeft = o = r.scrollLeft + s.scrollSpeed : e.pageX - n.overflowOffset.left < s.scrollSensitivity && (r.scrollLeft = o = r.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(a).scrollTop() < s.scrollSensitivity ? o = t(a).scrollTop(t(a).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(a).scrollTop()) < s.scrollSensitivity && (o = t(a).scrollTop(t(a).scrollTop() + s.scrollSpeed))), s.axis && "y" === s.axis || (e.pageX - t(a).scrollLeft() < s.scrollSensitivity ? o = t(a).scrollLeft(t(a).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(a).scrollLeft()) < s.scrollSensitivity && (o = t(a).scrollLeft(t(a).scrollLeft() + s.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(n, e)
                }
            }), t.ui.plugin.add("draggable", "snap", {
                start: function(e, i, n) {
                    var s = n.options;
                    n.snapElements = [], t(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                        var e = t(this),
                            i = e.offset();
                        this !== n.element[0] && n.snapElements.push({
                            item: this,
                            width: e.outerWidth(),
                            height: e.outerHeight(),
                            top: i.top,
                            left: i.left
                        })
                    })
                },
                drag: function(e, i, n) {
                    var s, o, r, a, l, c, h, u, d, p, f = n.options,
                        m = f.snapTolerance,
                        g = i.offset.left,
                        v = g + n.helperProportions.width,
                        y = i.offset.top,
                        b = y + n.helperProportions.height;
                    for (d = n.snapElements.length - 1; d >= 0; d--) l = n.snapElements[d].left, c = l + n.snapElements[d].width, h = n.snapElements[d].top, u = h + n.snapElements[d].height, l - m > v || g > c + m || h - m > b || y > u + m || !t.contains(n.snapElements[d].item.ownerDocument, n.snapElements[d].item) ? (n.snapElements[d].snapping && n.options.snap.release && n.options.snap.release.call(n.element, e, t.extend(n._uiHash(), {
                        snapItem: n.snapElements[d].item
                    })), n.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (s = m >= Math.abs(h - b), o = m >= Math.abs(u - y), r = m >= Math.abs(l - v), a = m >= Math.abs(c - g), s && (i.position.top = n._convertPositionTo("relative", {
                        top: h - n.helperProportions.height,
                        left: 0
                    }).top - n.margins.top), o && (i.position.top = n._convertPositionTo("relative", {
                        top: u,
                        left: 0
                    }).top - n.margins.top), r && (i.position.left = n._convertPositionTo("relative", {
                        top: 0,
                        left: l - n.helperProportions.width
                    }).left - n.margins.left), a && (i.position.left = n._convertPositionTo("relative", {
                        top: 0,
                        left: c
                    }).left - n.margins.left)), p = s || o || r || a, "outer" !== f.snapMode && (s = m >= Math.abs(h - y), o = m >= Math.abs(u - b), r = m >= Math.abs(l - g), a = m >= Math.abs(c - v), s && (i.position.top = n._convertPositionTo("relative", {
                        top: h,
                        left: 0
                    }).top - n.margins.top), o && (i.position.top = n._convertPositionTo("relative", {
                        top: u - n.helperProportions.height,
                        left: 0
                    }).top - n.margins.top), r && (i.position.left = n._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - n.margins.left), a && (i.position.left = n._convertPositionTo("relative", {
                        top: 0,
                        left: c - n.helperProportions.width
                    }).left - n.margins.left)), !n.snapElements[d].snapping && (s || o || r || a || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, e, t.extend(n._uiHash(), {
                        snapItem: n.snapElements[d].item
                    })), n.snapElements[d].snapping = s || o || r || a || p)
                }
            }), t.ui.plugin.add("draggable", "stack", {
                start: function(e, i, n) {
                    var s, o = n.options,
                        r = t.makeArray(t(o.stack)).sort(function(e, i) {
                            return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                        });
                    r.length && (s = parseInt(t(r[0]).css("zIndex"), 10) || 0,
                        t(r).each(function(e) {
                            t(this).css("zIndex", s + e)
                        }), this.css("zIndex", s + r.length))
                }
            }), t.ui.plugin.add("draggable", "zIndex", {
                start: function(e, i, n) {
                    var s = t(i.helper),
                        o = n.options;
                    s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex)
                },
                stop: function(e, i, n) {
                    var s = n.options;
                    s._zIndex && t(i.helper).css("zIndex", s._zIndex)
                }
            }), t.ui.draggable, t.widget("ui.droppable", {
                version: "1.11.1",
                widgetEventPrefix: "drop",
                options: {
                    accept: "*",
                    activeClass: !1,
                    addClasses: !0,
                    greedy: !1,
                    hoverClass: !1,
                    scope: "default",
                    tolerance: "intersect",
                    activate: null,
                    deactivate: null,
                    drop: null,
                    out: null,
                    over: null
                },
                _create: function() {
                    var e, i = this.options,
                        n = i.accept;
                    this.isover = !1, this.isout = !0, this.accept = t.isFunction(n) ? n : function(t) {
                        return t.is(n)
                    }, this.proportions = function() {
                        return arguments.length ? void(e = arguments[0]) : e ? e : e = {
                            width: this.element[0].offsetWidth,
                            height: this.element[0].offsetHeight
                        }
                    }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
                },
                _addToManager: function(e) {
                    t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
                },
                _splice: function(t) {
                    for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1)
                },
                _destroy: function() {
                    var e = t.ui.ddmanager.droppables[this.options.scope];
                    this._splice(e), this.element.removeClass("ui-droppable ui-droppable-disabled")
                },
                _setOption: function(e, i) {
                    if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                        return t.is(i)
                    };
                    else if ("scope" === e) {
                        var n = t.ui.ddmanager.droppables[this.options.scope];
                        this._splice(n), this._addToManager(i)
                    }
                    this._super(e, i)
                },
                _activate: function(e) {
                    var i = t.ui.ddmanager.current;
                    this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i))
                },
                _deactivate: function(e) {
                    var i = t.ui.ddmanager.current;
                    this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i))
                },
                _over: function(e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)))
                },
                _out: function(e) {
                    var i = t.ui.ddmanager.current;
                    i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)))
                },
                _drop: function(e, i) {
                    var n = i || t.ui.ddmanager.current,
                        s = !1;
                    return !(!n || (n.currentItem || n.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                        var i = t(this).droppable("instance");
                        return i.options.greedy && !i.options.disabled && i.options.scope === n.options.scope && i.accept.call(i.element[0], n.currentItem || n.element) && t.ui.intersect(n, t.extend(i, {
                            offset: i.element.offset()
                        }), i.options.tolerance, e) ? (s = !0, !1) : void 0
                    }), !s && (!!this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(n)), this.element)))
                },
                ui: function(t) {
                    return {
                        draggable: t.currentItem || t.element,
                        helper: t.helper,
                        position: t.position,
                        offset: t.positionAbs
                    }
                }
            }), t.ui.intersect = function() {
                function t(t, e, i) {
                    return t >= e && e + i > t
                }
                return function(e, i, n, s) {
                    if (!i.offset) return !1;
                    var o = (e.positionAbs || e.position.absolute).left,
                        r = (e.positionAbs || e.position.absolute).top,
                        a = o + e.helperProportions.width,
                        l = r + e.helperProportions.height,
                        c = i.offset.left,
                        h = i.offset.top,
                        u = c + i.proportions().width,
                        d = h + i.proportions().height;
                    switch (n) {
                        case "fit":
                            return o >= c && u >= a && r >= h && d >= l;
                        case "intersect":
                            return o + e.helperProportions.width / 2 > c && u > a - e.helperProportions.width / 2 && r + e.helperProportions.height / 2 > h && d > l - e.helperProportions.height / 2;
                        case "pointer":
                            return t(s.pageY, h, i.proportions().height) && t(s.pageX, c, i.proportions().width);
                        case "touch":
                            return (r >= h && d >= r || l >= h && d >= l || h > r && l > d) && (o >= c && u >= o || a >= c && u >= a || c > o && a > u);
                        default:
                            return !1
                    }
                }
            }(), t.ui.ddmanager = {
                current: null,
                droppables: {
                    "default": []
                },
                prepareOffsets: function(e, i) {
                    var n, s, o = t.ui.ddmanager.droppables[e.options.scope] || [],
                        r = i ? i.type : null,
                        a = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
                    t: for (n = 0; o.length > n; n++)
                        if (!(o[n].options.disabled || e && !o[n].accept.call(o[n].element[0], e.currentItem || e.element))) {
                            for (s = 0; a.length > s; s++)
                                if (a[s] === o[n].element[0]) {
                                    o[n].proportions().height = 0;
                                    continue t
                                }
                            o[n].visible = "none" !== o[n].element.css("display"), o[n].visible && ("mousedown" === r && o[n]._activate.call(o[n], i), o[n].offset = o[n].element.offset(), o[n].proportions({
                                width: o[n].element[0].offsetWidth,
                                height: o[n].element[0].offsetHeight
                            }))
                        }
                },
                drop: function(e, i) {
                    var n = !1;
                    return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                        this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance, i) && (n = this._drop.call(this, i) || n), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                    }), n
                },
                dragStart: function(e, i) {
                    e.element.parentsUntil("body").bind("scroll.droppable", function() {
                        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                    })
                },
                drag: function(e, i) {
                    e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                        if (!this.options.disabled && !this.greedyChild && this.visible) {
                            var n, s, o, r = t.ui.intersect(e, this, this.options.tolerance, i),
                                a = !r && this.isover ? "isout" : r && !this.isover ? "isover" : null;
                            a && (this.options.greedy && (s = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function() {
                                return t(this).droppable("instance").options.scope === s
                            }), o.length && (n = t(o[0]).droppable("instance"), n.greedyChild = "isover" === a)), n && "isover" === a && (n.isover = !1, n.isout = !0, n._out.call(n, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), n && "isout" === a && (n.isout = !1, n.isover = !0, n._over.call(n, i)))
                        }
                    })
                },
                dragStop: function(e, i) {
                    e.element.parentsUntil("body").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                }
            }, t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, {
                version: "1.11.1",
                widgetEventPrefix: "resize",
                options: {
                    alsoResize: !1,
                    animate: !1,
                    animateDuration: "slow",
                    animateEasing: "swing",
                    aspectRatio: !1,
                    autoHide: !1,
                    containment: !1,
                    ghost: !1,
                    grid: !1,
                    handles: "e,s,se",
                    helper: !1,
                    maxHeight: null,
                    maxWidth: null,
                    minHeight: 10,
                    minWidth: 10,
                    zIndex: 90,
                    resize: null,
                    start: null,
                    stop: null
                },
                _num: function(t) {
                    return parseInt(t, 10) || 0
                },
                _isNumber: function(t) {
                    return !isNaN(parseInt(t, 10))
                },
                _hasScroll: function(e, i) {
                    if ("hidden" === t(e).css("overflow")) return !1;
                    var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                        s = !1;
                    return e[n] > 0 || (e[n] = 1, s = e[n] > 0, e[n] = 0, s)
                },
                _create: function() {
                    var e, i, n, s, o, r = this,
                        a = this.options;
                    if (this.element.addClass("ui-resizable"), t.extend(this, {
                            _aspectRatio: !!a.aspectRatio,
                            aspectRatio: a.aspectRatio,
                            originalElement: this.element,
                            _proportionallyResizeElements: [],
                            _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
                        }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                            position: this.element.css("position"),
                            width: this.element.outerWidth(),
                            height: this.element.outerHeight(),
                            top: this.element.css("top"),
                            left: this.element.css("left")
                        })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                            marginLeft: this.originalElement.css("marginLeft"),
                            marginTop: this.originalElement.css("marginTop"),
                            marginRight: this.originalElement.css("marginRight"),
                            marginBottom: this.originalElement.css("marginBottom")
                        }), this.originalElement.css({
                            marginLeft: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0
                        }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                            position: "static",
                            zoom: 1,
                            display: "block"
                        })), this.originalElement.css({
                            margin: this.originalElement.css("margin")
                        }), this._proportionallyResize()), this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                            n: ".ui-resizable-n",
                            e: ".ui-resizable-e",
                            s: ".ui-resizable-s",
                            w: ".ui-resizable-w",
                            se: ".ui-resizable-se",
                            sw: ".ui-resizable-sw",
                            ne: ".ui-resizable-ne",
                            nw: ".ui-resizable-nw"
                        } : "e,s,se"), this.handles.constructor === String)
                        for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) n = t.trim(e[i]), o = "ui-resizable-" + n, s = t("<div class='ui-resizable-handle " + o + "'></div>"), s.css({
                            zIndex: a.zIndex
                        }), "se" === n && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[n] = ".ui-resizable-" + n, this.element.append(s);
                    this._renderAxis = function(e) {
                        var i, n, s, o;
                        e = e || this.element;
                        for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = this.element.children(this.handles[i]).first().show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (n = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth(), s = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(s, o), this._proportionallyResize()), t(this.handles[i]).length
                    }, this._renderAxis(this.element), this._handles = t(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                        r.resizing || (this.className && (s = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = s && s[1] ? s[1] : "se")
                    }), a.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                        a.disabled || (t(this).removeClass("ui-resizable-autohide"), r._handles.show())
                    }).mouseleave(function() {
                        a.disabled || r.resizing || (t(this).addClass("ui-resizable-autohide"), r._handles.hide())
                    })), this._mouseInit()
                },
                _destroy: function() {
                    this._mouseDestroy();
                    var e, i = function(e) {
                        t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                    };
                    return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                        position: e.css("position"),
                        width: e.outerWidth(),
                        height: e.outerHeight(),
                        top: e.css("top"),
                        left: e.css("left")
                    }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
                },
                _mouseCapture: function(e) {
                    var i, n, s = !1;
                    for (i in this.handles) n = t(this.handles[i])[0], (n === e.target || t.contains(n, e.target)) && (s = !0);
                    return !this.options.disabled && s
                },
                _mouseStart: function(e) {
                    var i, n, s, o = this.options,
                        r = this.element;
                    return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), n = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                        left: i,
                        top: n
                    }, this.size = this._helper ? {
                        width: this.helper.width(),
                        height: this.helper.height()
                    } : {
                        width: r.width(),
                        height: r.height()
                    }, this.originalSize = this._helper ? {
                        width: r.outerWidth(),
                        height: r.outerHeight()
                    } : {
                        width: r.width(),
                        height: r.height()
                    }, this.sizeDiff = {
                        width: r.outerWidth() - r.width(),
                        height: r.outerHeight() - r.height()
                    }, this.originalPosition = {
                        left: i,
                        top: n
                    }, this.originalMousePosition = {
                        left: e.pageX,
                        top: e.pageY
                    }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, s = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === s ? this.axis + "-resize" : s), r.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
                },
                _mouseDrag: function(e) {
                    var i, n, s = this.originalMousePosition,
                        o = this.axis,
                        r = e.pageX - s.left || 0,
                        a = e.pageY - s.top || 0,
                        l = this._change[o];
                    return this._updatePrevProperties(), !!l && (i = l.apply(this, [e, r, a]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), n = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1)
                },
                _mouseStop: function(e) {
                    this.resizing = !1;
                    var i, n, s, o, r, a, l, c = this.options,
                        h = this;
                    return this._helper && (i = this._proportionallyResizeElements, n = i.length && /textarea/i.test(i[0].nodeName), s = n && this._hasScroll(i[0], "left") ? 0 : h.sizeDiff.height, o = n ? 0 : h.sizeDiff.width, r = {
                        width: h.helper.width() - o,
                        height: h.helper.height() - s
                    }, a = parseInt(h.element.css("left"), 10) + (h.position.left - h.originalPosition.left) || null, l = parseInt(h.element.css("top"), 10) + (h.position.top - h.originalPosition.top) || null, c.animate || this.element.css(t.extend(r, {
                        top: l,
                        left: a
                    })), h.helper.height(h.size.height), h.helper.width(h.size.width), this._helper && !c.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
                },
                _updatePrevProperties: function() {
                    this.prevPosition = {
                        top: this.position.top,
                        left: this.position.left
                    }, this.prevSize = {
                        width: this.size.width,
                        height: this.size.height
                    }
                },
                _applyChanges: function() {
                    var t = {};
                    return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
                },
                _updateVirtualBoundaries: function(t) {
                    var e, i, n, s, o, r = this.options;
                    o = {
                        minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                        maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                        minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                        maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0
                    }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, s = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > s && (o.maxHeight = s)), this._vBoundaries = o
                },
                _updateCache: function(t) {
                    this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
                },
                _updateRatio: function(t) {
                    var e = this.position,
                        i = this.size,
                        n = this.axis;
                    return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === n && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === n && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
                },
                _respectSize: function(t) {
                    var e = this._vBoundaries,
                        i = this.axis,
                        n = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                        s = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                        o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                        r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                        a = this.originalPosition.left + this.originalSize.width,
                        l = this.position.top + this.size.height,
                        c = /sw|nw|w/.test(i),
                        h = /nw|ne|n/.test(i);
                    return o && (t.width = e.minWidth), r && (t.height = e.minHeight), n && (t.width = e.maxWidth), s && (t.height = e.maxHeight), o && c && (t.left = a - e.minWidth), n && c && (t.left = a - e.maxWidth), r && h && (t.top = l - e.minHeight), s && h && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
                },
                _getPaddingPlusBorderDimensions: function(t) {
                    for (var e = 0, i = [], n = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], s = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseInt(n[e], 10) || 0, i[e] += parseInt(s[e], 10) || 0;
                    return {
                        height: i[0] + i[2],
                        width: i[1] + i[3]
                    }
                },
                _proportionallyResize: function() {
                    if (this._proportionallyResizeElements.length)
                        for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                            height: i.height() - this.outerDimensions.height || 0,
                            width: i.width() - this.outerDimensions.width || 0
                        })
                },
                _renderProxy: function() {
                    var e = this.element,
                        i = this.options;
                    this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() - 1,
                        height: this.element.outerHeight() - 1,
                        position: "absolute",
                        left: this.elementOffset.left + "px",
                        top: this.elementOffset.top + "px",
                        zIndex: ++i.zIndex
                    }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
                },
                _change: {
                    e: function(t, e) {
                        return {
                            width: this.originalSize.width + e
                        }
                    },
                    w: function(t, e) {
                        var i = this.originalSize,
                            n = this.originalPosition;
                        return {
                            left: n.left + e,
                            width: i.width - e
                        }
                    },
                    n: function(t, e, i) {
                        var n = this.originalSize,
                            s = this.originalPosition;
                        return {
                            top: s.top + i,
                            height: n.height - i
                        }
                    },
                    s: function(t, e, i) {
                        return {
                            height: this.originalSize.height + i
                        }
                    },
                    se: function(e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                    },
                    sw: function(e, i, n) {
                        return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                    },
                    ne: function(e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, n]))
                    },
                    nw: function(e, i, n) {
                        return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, n]))
                    }
                },
                _propagate: function(e, i) {
                    t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
                },
                plugins: {},
                ui: function() {
                    return {
                        originalElement: this.originalElement,
                        element: this.element,
                        helper: this.helper,
                        position: this.position,
                        size: this.size,
                        originalSize: this.originalSize,
                        originalPosition: this.originalPosition
                    }
                }
            }), t.ui.plugin.add("resizable", "animate", {
                stop: function(e) {
                    var i = t(this).resizable("instance"),
                        n = i.options,
                        s = i._proportionallyResizeElements,
                        o = s.length && /textarea/i.test(s[0].nodeName),
                        r = o && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
                        a = o ? 0 : i.sizeDiff.width,
                        l = {
                            width: i.size.width - a,
                            height: i.size.height - r
                        },
                        c = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                        h = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
                    i.element.animate(t.extend(l, h && c ? {
                        top: h,
                        left: c
                    } : {}), {
                        duration: n.animateDuration,
                        easing: n.animateEasing,
                        step: function() {
                            var n = {
                                width: parseInt(i.element.css("width"), 10),
                                height: parseInt(i.element.css("height"), 10),
                                top: parseInt(i.element.css("top"), 10),
                                left: parseInt(i.element.css("left"), 10)
                            };
                            s && s.length && t(s[0]).css({
                                width: n.width,
                                height: n.height
                            }), i._updateCache(n), i._propagate("resize", e)
                        }
                    })
                }
            }), t.ui.plugin.add("resizable", "containment", {
                start: function() {
                    var e, i, n, s, o, r, a, l = t(this).resizable("instance"),
                        c = l.options,
                        h = l.element,
                        u = c.containment,
                        d = u instanceof t ? u.get(0) : /parent/.test(u) ? h.parent().get(0) : u;
                    d && (l.containerElement = t(d), /document/.test(u) || u === document ? (l.containerOffset = {
                        left: 0,
                        top: 0
                    }, l.containerPosition = {
                        left: 0,
                        top: 0
                    }, l.parentData = {
                        element: t(document),
                        left: 0,
                        top: 0,
                        width: t(document).width(),
                        height: t(document).height() || document.body.parentNode.scrollHeight
                    }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, n) {
                        i[t] = l._num(e.css("padding" + n))
                    }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                        height: e.innerHeight() - i[3],
                        width: e.innerWidth() - i[1]
                    }, n = l.containerOffset, s = l.containerSize.height, o = l.containerSize.width, r = l._hasScroll(d, "left") ? d.scrollWidth : o, a = l._hasScroll(d) ? d.scrollHeight : s, l.parentData = {
                        element: d,
                        left: n.left,
                        top: n.top,
                        width: r,
                        height: a
                    }))
                },
                resize: function(e) {
                    var i, n, s, o, r = t(this).resizable("instance"),
                        a = r.options,
                        l = r.containerOffset,
                        c = r.position,
                        h = r._aspectRatio || e.shiftKey,
                        u = {
                            top: 0,
                            left: 0
                        },
                        d = r.containerElement,
                        p = !0;
                    d[0] !== document && /static/.test(d.css("position")) && (u = l), c.left < (r._helper ? l.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - l.left : r.position.left - u.left), h && (r.size.height = r.size.width / r.aspectRatio, p = !1), r.position.left = a.helper ? l.left : 0), c.top < (r._helper ? l.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - l.top : r.position.top), h && (r.size.width = r.size.height * r.aspectRatio, p = !1), r.position.top = r._helper ? l.top : 0), s = r.containerElement.get(0) === r.element.parent().get(0), o = /relative|absolute/.test(r.containerElement.css("position")), s && o ? (r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top) : (r.offset.left = r.element.offset().left, r.offset.top = r.element.offset().top), i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - u.left : r.offset.left - l.left)), n = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - u.top : r.offset.top - l.top)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, h && (r.size.height = r.size.width / r.aspectRatio, p = !1)), n + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - n, h && (r.size.width = r.size.height * r.aspectRatio, p = !1)), p || (r.position.left = r.prevPosition.left, r.position.top = r.prevPosition.top, r.size.width = r.prevSize.width, r.size.height = r.prevSize.height)
                },
                stop: function() {
                    var e = t(this).resizable("instance"),
                        i = e.options,
                        n = e.containerOffset,
                        s = e.containerPosition,
                        o = e.containerElement,
                        r = t(e.helper),
                        a = r.offset(),
                        l = r.outerWidth() - e.sizeDiff.width,
                        c = r.outerHeight() - e.sizeDiff.height;
                    e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                        left: a.left - s.left - n.left,
                        width: l,
                        height: c
                    }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                        left: a.left - s.left - n.left,
                        width: l,
                        height: c
                    })
                }
            }), t.ui.plugin.add("resizable", "alsoResize", {
                start: function() {
                    var e = t(this).resizable("instance"),
                        i = e.options,
                        n = function(e) {
                            t(e).each(function() {
                                var e = t(this);
                                e.data("ui-resizable-alsoresize", {
                                    width: parseInt(e.width(), 10),
                                    height: parseInt(e.height(), 10),
                                    left: parseInt(e.css("left"), 10),
                                    top: parseInt(e.css("top"), 10)
                                })
                            })
                        };
                    "object" != typeof i.alsoResize || i.alsoResize.parentNode ? n(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], n(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                        n(t)
                    })
                },
                resize: function(e, i) {
                    var n = t(this).resizable("instance"),
                        s = n.options,
                        o = n.originalSize,
                        r = n.originalPosition,
                        a = {
                            height: n.size.height - o.height || 0,
                            width: n.size.width - o.width || 0,
                            top: n.position.top - r.top || 0,
                            left: n.position.left - r.left || 0
                        },
                        l = function(e, n) {
                            t(e).each(function() {
                                var e = t(this),
                                    s = t(this).data("ui-resizable-alsoresize"),
                                    o = {},
                                    r = n && n.length ? n : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                                t.each(r, function(t, e) {
                                    var i = (s[e] || 0) + (a[e] || 0);
                                    i && i >= 0 && (o[e] = i || null)
                                }), e.css(o)
                            })
                        };
                    "object" != typeof s.alsoResize || s.alsoResize.nodeType ? l(s.alsoResize) : t.each(s.alsoResize, function(t, e) {
                        l(t, e)
                    })
                },
                stop: function() {
                    t(this).removeData("resizable-alsoresize")
                }
            }), t.ui.plugin.add("resizable", "ghost", {
                start: function() {
                    var e = t(this).resizable("instance"),
                        i = e.options,
                        n = e.size;
                    e.ghost = e.originalElement.clone(), e.ghost.css({
                        opacity: .25,
                        display: "block",
                        position: "relative",
                        height: n.height,
                        width: n.width,
                        margin: 0,
                        left: 0,
                        top: 0
                    }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
                },
                resize: function() {
                    var e = t(this).resizable("instance");
                    e.ghost && e.ghost.css({
                        position: "relative",
                        height: e.size.height,
                        width: e.size.width
                    })
                },
                stop: function() {
                    var e = t(this).resizable("instance");
                    e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
                }
            }), t.ui.plugin.add("resizable", "grid", {
                resize: function() {
                    var e, i = t(this).resizable("instance"),
                        n = i.options,
                        s = i.size,
                        o = i.originalSize,
                        r = i.originalPosition,
                        a = i.axis,
                        l = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid,
                        c = l[0] || 1,
                        h = l[1] || 1,
                        u = Math.round((s.width - o.width) / c) * c,
                        d = Math.round((s.height - o.height) / h) * h,
                        p = o.width + u,
                        f = o.height + d,
                        m = n.maxWidth && p > n.maxWidth,
                        g = n.maxHeight && f > n.maxHeight,
                        v = n.minWidth && n.minWidth > p,
                        y = n.minHeight && n.minHeight > f;
                    n.grid = l, v && (p += c), y && (f += h), m && (p -= c), g && (f -= h), /^(se|s|e)$/.test(a) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.top = r.top - d) : /^(sw)$/.test(a) ? (i.size.width = p, i.size.height = f, i.position.left = r.left - u) : ((0 >= f - h || 0 >= p - c) && (e = i._getPaddingPlusBorderDimensions(this)), f - h > 0 ? (i.size.height = f, i.position.top = r.top - d) : (f = h - e.height, i.size.height = f, i.position.top = r.top + o.height - f), p - c > 0 ? (i.size.width = p, i.position.left = r.left - u) : (p = h - e.height, i.size.width = p, i.position.left = r.left + o.width - p))
                }
            }), t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
                version: "1.11.1",
                options: {
                    appendTo: "body",
                    autoRefresh: !0,
                    distance: 0,
                    filter: "*",
                    tolerance: "touch",
                    selected: null,
                    selecting: null,
                    start: null,
                    stop: null,
                    unselected: null,
                    unselecting: null
                },
                _create: function() {
                    var e, i = this;
                    this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                        e = t(i.options.filter, i.element[0]), e.addClass("ui-selectee"), e.each(function() {
                            var e = t(this),
                                i = e.offset();
                            t.data(this, "selectable-item", {
                                element: this,
                                $element: e,
                                left: i.left,
                                top: i.top,
                                right: i.left + e.outerWidth(),
                                bottom: i.top + e.outerHeight(),
                                startselected: !1,
                                selected: e.hasClass("ui-selected"),
                                selecting: e.hasClass("ui-selecting"),
                                unselecting: e.hasClass("ui-unselecting")
                            })
                        })
                    }, this.refresh(), this.selectees = e.addClass("ui-selectee"), this._mouseInit(), this.helper = t("<div class='ui-selectable-helper'></div>")
                },
                _destroy: function() {
                    this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
                },
                _mouseStart: function(e) {
                    var i = this,
                        n = this.options;
                    this.opos = [e.pageX, e.pageY], this.options.disabled || (this.selectees = t(n.filter, this.element[0]), this._trigger("start", e), t(n.appendTo).append(this.helper), this.helper.css({
                        left: e.pageX,
                        top: e.pageY,
                        width: 0,
                        height: 0
                    }), n.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                        var n = t.data(this, "selectable-item");
                        n.startselected = !0, e.metaKey || e.ctrlKey || (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, i._trigger("unselecting", e, {
                            unselecting: n.element
                        }))
                    }), t(e.target).parents().addBack().each(function() {
                        var n, s = t.data(this, "selectable-item");
                        return s ? (n = !e.metaKey && !e.ctrlKey || !s.$element.hasClass("ui-selected"), s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"), s.unselecting = !n, s.selecting = n, s.selected = n, n ? i._trigger("selecting", e, {
                            selecting: s.element
                        }) : i._trigger("unselecting", e, {
                            unselecting: s.element
                        }), !1) : void 0
                    }))
                },
                _mouseDrag: function(e) {
                    if (this.dragged = !0, !this.options.disabled) {
                        var i, n = this,
                            s = this.options,
                            o = this.opos[0],
                            r = this.opos[1],
                            a = e.pageX,
                            l = e.pageY;
                        return o > a && (i = a, a = o, o = i), r > l && (i = l, l = r, r = i), this.helper.css({
                            left: o,
                            top: r,
                            width: a - o,
                            height: l - r
                        }), this.selectees.each(function() {
                            var i = t.data(this, "selectable-item"),
                                c = !1;
                            i && i.element !== n.element[0] && ("touch" === s.tolerance ? c = !(i.left > a || o > i.right || i.top > l || r > i.bottom) : "fit" === s.tolerance && (c = i.left > o && a > i.right && i.top > r && l > i.bottom), c ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, n._trigger("selecting", e, {
                                selecting: i.element
                            }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), n._trigger("unselecting", e, {
                                unselecting: i.element
                            }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, n._trigger("unselecting", e, {
                                unselecting: i.element
                            })))))
                        }), !1
                    }
                },
                _mouseStop: function(e) {
                    var i = this;
                    return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                        var n = t.data(this, "selectable-item");
                        n.$element.removeClass("ui-unselecting"), n.unselecting = !1, n.startselected = !1, i._trigger("unselected", e, {
                            unselected: n.element
                        })
                    }), t(".ui-selecting", this.element[0]).each(function() {
                        var n = t.data(this, "selectable-item");
                        n.$element.removeClass("ui-selecting").addClass("ui-selected"), n.selecting = !1, n.selected = !0, n.startselected = !0, i._trigger("selected", e, {
                            selected: n.element
                        })
                    }), this._trigger("stop", e), this.helper.remove(), !1
                }
            }), t.widget("ui.sortable", t.ui.mouse, {
                version: "1.11.1",
                widgetEventPrefix: "sort",
                ready: !1,
                options: {
                    appendTo: "parent",
                    axis: !1,
                    connectWith: !1,
                    containment: !1,
                    cursor: "auto",
                    cursorAt: !1,
                    dropOnEmpty: !0,
                    forcePlaceholderSize: !1,
                    forceHelperSize: !1,
                    grid: !1,
                    handle: !1,
                    helper: "original",
                    items: "> *",
                    opacity: !1,
                    placeholder: !1,
                    revert: !1,
                    scroll: !0,
                    scrollSensitivity: 20,
                    scrollSpeed: 20,
                    scope: "default",
                    tolerance: "intersect",
                    zIndex: 1e3,
                    activate: null,
                    beforeStop: null,
                    change: null,
                    deactivate: null,
                    out: null,
                    over: null,
                    receive: null,
                    remove: null,
                    sort: null,
                    start: null,
                    stop: null,
                    update: null
                },
                _isOverAxis: function(t, e, i) {
                    return t >= e && e + i > t
                },
                _isFloating: function(t) {
                    return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
                },
                _create: function() {
                    var t = this.options;
                    this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === t.axis || this._isFloating(this.items[0].item)), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
                },
                _setOption: function(t, e) {
                    this._super(t, e), "handle" === t && this._setHandleClassName()
                },
                _setHandleClassName: function() {
                    this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), t.each(this.items, function() {
                        (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                    })
                },
                _destroy: function() {
                    this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
                    for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                    return this
                },
                _mouseCapture: function(e, i) {
                    var n = null,
                        s = !1,
                        o = this;
                    return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                        return t.data(this, o.widgetName + "-item") === o ? (n = t(this), !1) : void 0
                    }), t.data(e.target, o.widgetName + "-item") === o && (n = t(e.target)), !!n && (!(this.options.handle && !i && (t(this.options.handle, n).find("*").addBack().each(function() {
                        this === e.target && (s = !0)
                    }), !s)) && (this.currentItem = n, this._removeCurrentsFromItems(), !0))))
                },
                _mouseStart: function(e, i, n) {
                    var s, o, r = this.options;
                    if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                            top: this.offset.top - this.margins.top,
                            left: this.offset.left - this.margins.left
                        }, t.extend(this.offset, {
                            click: {
                                left: e.pageX - this.offset.left,
                                top: e.pageY - this.offset.top
                            },
                            parent: this._getParentOffset(),
                            relative: this._getRelativeOffset()
                        }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = {
                            prev: this.currentItem.prev()[0],
                            parent: this.currentItem.parent()[0]
                        }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", r.cursor), this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(o)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                        for (s = this.containers.length - 1; s >= 0; s--) this.containers[s]._trigger("activate", e, this._uiHash(this));
                    return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
                },
                _mouseDrag: function(e) {
                    var i, n, s, o, r = this.options,
                        a = !1;
                    for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed),
                            this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - t(document).scrollTop() < r.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - r.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < r.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + r.scrollSpeed)), e.pageX - t(document).scrollLeft() < r.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - r.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < r.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + r.scrollSpeed))), a !== !1 && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                        if (n = this.items[i], s = n.item[0], o = this._intersectsWithPointer(n), o && n.instance === this.currentContainer && s !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== s && !t.contains(this.placeholder[0], s) && ("semi-dynamic" !== this.options.type || !t.contains(this.element[0], s))) {
                            if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                            this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                            break
                        }
                    return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
                },
                _mouseStop: function(e, i) {
                    if (e) {
                        if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                            var n = this,
                                s = this.placeholder.offset(),
                                o = this.options.axis,
                                r = {};
                            o && "x" !== o || (r.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (r.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                                n._clear(e)
                            })
                        } else this._clear(e, i);
                        return !1
                    }
                },
                cancel: function() {
                    if (this.dragging) {
                        this._mouseUp({
                            target: null
                        }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                        for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                    }
                    return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                        helper: null,
                        dragging: !1,
                        reverting: !1,
                        _noFinalSort: null
                    }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
                },
                serialize: function(e) {
                    var i = this._getItemsAsjQuery(e && e.connected),
                        n = [];
                    return e = e || {}, t(i).each(function() {
                        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                        i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                    }), !n.length && e.key && n.push(e.key + "="), n.join("&")
                },
                toArray: function(e) {
                    var i = this._getItemsAsjQuery(e && e.connected),
                        n = [];
                    return e = e || {}, i.each(function() {
                        n.push(t(e.item || this).attr(e.attribute || "id") || "")
                    }), n
                },
                _intersectsWith: function(t) {
                    var e = this.positionAbs.left,
                        i = e + this.helperProportions.width,
                        n = this.positionAbs.top,
                        s = n + this.helperProportions.height,
                        o = t.left,
                        r = o + t.width,
                        a = t.top,
                        l = a + t.height,
                        c = this.offset.click.top,
                        h = this.offset.click.left,
                        u = "x" === this.options.axis || n + c > a && l > n + c,
                        d = "y" === this.options.axis || e + h > o && r > e + h,
                        p = u && d;
                    return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && r > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > a && l > s - this.helperProportions.height / 2
                },
                _intersectsWithPointer: function(t) {
                    var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                        i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                        n = e && i,
                        s = this._getDragVerticalDirection(),
                        o = this._getDragHorizontalDirection();
                    return !!n && (this.floating ? o && "right" === o || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1))
                },
                _intersectsWithSides: function(t) {
                    var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                        i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                        n = this._getDragVerticalDirection(),
                        s = this._getDragHorizontalDirection();
                    return this.floating && s ? "right" === s && i || "left" === s && !i : n && ("down" === n && e || "up" === n && !e)
                },
                _getDragVerticalDirection: function() {
                    var t = this.positionAbs.top - this.lastPositionAbs.top;
                    return 0 !== t && (t > 0 ? "down" : "up")
                },
                _getDragHorizontalDirection: function() {
                    var t = this.positionAbs.left - this.lastPositionAbs.left;
                    return 0 !== t && (t > 0 ? "right" : "left")
                },
                refresh: function(t) {
                    return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
                },
                _connectWith: function() {
                    var t = this.options;
                    return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
                },
                _getItemsAsjQuery: function(e) {
                    function i() {
                        a.push(this)
                    }
                    var n, s, o, r, a = [],
                        l = [],
                        c = this._connectWith();
                    if (c && e)
                        for (n = c.length - 1; n >= 0; n--)
                            for (o = t(c[n]), s = o.length - 1; s >= 0; s--) r = t.data(o[s], this.widgetFullName), r && r !== this && !r.options.disabled && l.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                    for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                            options: this.options,
                            item: this.currentItem
                        }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                    return t(a)
                },
                _removeCurrentsFromItems: function() {
                    var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                    this.items = t.grep(this.items, function(t) {
                        for (var i = 0; e.length > i; i++)
                            if (e[i] === t.item[0]) return !1;
                        return !0
                    })
                },
                _refreshItems: function(e) {
                    this.items = [], this.containers = [this];
                    var i, n, s, o, r, a, l, c, h = this.items,
                        u = [
                            [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                                item: this.currentItem
                            }) : t(this.options.items, this.element), this]
                        ],
                        d = this._connectWith();
                    if (d && this.ready)
                        for (i = d.length - 1; i >= 0; i--)
                            for (s = t(d[i]), n = s.length - 1; n >= 0; n--) o = t.data(s[n], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {
                                item: this.currentItem
                            }) : t(o.options.items, o.element), o]), this.containers.push(o));
                    for (i = u.length - 1; i >= 0; i--)
                        for (r = u[i][1], a = u[i][0], n = 0, c = a.length; c > n; n++) l = t(a[n]), l.data(this.widgetName + "-item", r), h.push({
                            item: l,
                            instance: r,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        })
                },
                refreshPositions: function(e) {
                    this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                    var i, n, s, o;
                    for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (s = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = s.outerWidth(), n.height = s.outerHeight()), o = s.offset(), n.left = o.left, n.top = o.top);
                    if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                    else
                        for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                    return this
                },
                _createPlaceholder: function(e) {
                    e = e || this;
                    var i, n = e.options;
                    n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                        element: function() {
                            var n = e.currentItem[0].nodeName.toLowerCase(),
                                s = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                            return "tr" === n ? e.currentItem.children().each(function() {
                                t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(s)
                            }) : "img" === n && s.attr("src", e.currentItem.attr("src")), i || s.css("visibility", "hidden"), s
                        },
                        update: function(t, s) {
                            (!i || n.forcePlaceholderSize) && (s.height() || s.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), s.width() || s.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                        }
                    }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
                },
                _contactContainers: function(e) {
                    var i, n, s, o, r, a, l, c, h, u, d = null,
                        p = null;
                    for (i = this.containers.length - 1; i >= 0; i--)
                        if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                            if (this._intersectsWith(this.containers[i].containerCache)) {
                                if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                                d = this.containers[i], p = i
                            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                    if (d)
                        if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                        else {
                            for (s = 1e4, o = null, h = d.floating || this._isFloating(this.currentItem), r = h ? "left" : "top", a = h ? "width" : "height", u = h ? "clientX" : "clientY", n = this.items.length - 1; n >= 0; n--) t.contains(this.containers[p].element[0], this.items[n].item[0]) && this.items[n].item[0] !== this.currentItem[0] && (l = this.items[n].item.offset()[r], c = !1, e[u] - l > this.items[n][a] / 2 && (c = !0), s > Math.abs(e[u] - l) && (s = Math.abs(e[u] - l), o = this.items[n], this.direction = c ? "up" : "down"));
                            if (!o && !this.options.dropOnEmpty) return;
                            if (this.currentContainer === this.containers[p]) return;
                            o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
                        }
                },
                _createHelper: function(e) {
                    var i = this.options,
                        n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                    return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                        width: this.currentItem[0].style.width,
                        height: this.currentItem[0].style.height,
                        position: this.currentItem.css("position"),
                        top: this.currentItem.css("top"),
                        left: this.currentItem.css("left")
                    }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
                },
                _adjustOffsetFromHelper: function(e) {
                    "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                        left: +e[0],
                        top: +e[1] || 0
                    }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
                },
                _getParentOffset: function() {
                    this.offsetParent = this.helper.offsetParent();
                    var e = this.offsetParent.offset();
                    return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                        top: 0,
                        left: 0
                    }), {
                        top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                        left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                    }
                },
                _getRelativeOffset: function() {
                    if ("relative" === this.cssPosition) {
                        var t = this.currentItem.position();
                        return {
                            top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                            left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                        }
                    }
                    return {
                        top: 0,
                        left: 0
                    }
                },
                _cacheMargins: function() {
                    this.margins = {
                        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                    }
                },
                _cacheHelperProportions: function() {
                    this.helperProportions = {
                        width: this.helper.outerWidth(),
                        height: this.helper.outerHeight()
                    }
                },
                _setContainment: function() {
                    var e, i, n, s = this.options;
                    "parent" === s.containment && (s.containment = this.helper[0].parentNode), ("document" === s.containment || "window" === s.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === s.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === s.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(s.containment) || (e = t(s.containment)[0], i = t(s.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
                },
                _convertPositionTo: function(e, i) {
                    i || (i = this.position);
                    var n = "absolute" === e ? 1 : -1,
                        s = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                        o = /(html|body)/i.test(s[0].tagName);
                    return {
                        top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * n,
                        left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * n
                    }
                },
                _generatePosition: function(e) {
                    var i, n, s = this.options,
                        o = e.pageX,
                        r = e.pageY,
                        a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                        l = /(html|body)/i.test(a[0].tagName);
                    return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), s.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / s.grid[1]) * s.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - s.grid[1] : i + s.grid[1] : i, n = this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0], o = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - s.grid[0] : n + s.grid[0] : n)), {
                        top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                        left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                    }
                },
                _rearrange: function(t, e, i, n) {
                    i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                    var s = this.counter;
                    this._delay(function() {
                        s === this.counter && this.refreshPositions(!n)
                    })
                },
                _clear: function(t, e) {
                    function i(t, e, i) {
                        return function(n) {
                            i._trigger(t, n, e._uiHash(e))
                        }
                    }
                    this.reverting = !1;
                    var n, s = [];
                    if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                        for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                    } else this.currentItem.show();
                    for (this.fromOutside && !e && s.push(function(t) {
                            this._trigger("receive", t, this._uiHash(this.fromOutside))
                        }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                            this._trigger("update", t, this._uiHash())
                        }), this !== this.currentContainer && (e || (s.push(function(t) {
                            this._trigger("remove", t, this._uiHash())
                        }), s.push(function(t) {
                            return function(e) {
                                t._trigger("receive", e, this._uiHash(this))
                            }
                        }.call(this, this.currentContainer)), s.push(function(t) {
                            return function(e) {
                                t._trigger("update", e, this._uiHash(this))
                            }
                        }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || s.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (s.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
                    if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                        if (!e) {
                            for (this._trigger("beforeStop", t, this._uiHash()), n = 0; s.length > n; n++) s[n].call(this, t);
                            this._trigger("stop", t, this._uiHash())
                        }
                        return this.fromOutside = !1, !1
                    }
                    if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                        for (n = 0; s.length > n; n++) s[n].call(this, t);
                        this._trigger("stop", t, this._uiHash())
                    }
                    return this.fromOutside = !1, !0
                },
                _trigger: function() {
                    t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
                },
                _uiHash: function(e) {
                    var i = e || this;
                    return {
                        helper: i.helper,
                        placeholder: i.placeholder || t([]),
                        position: i.position,
                        originalPosition: i.originalPosition,
                        offset: i.positionAbs,
                        item: i.currentItem,
                        sender: e ? e.element : null
                    }
                }
            })
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            n = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var s = function() {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(s, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                s = i.data("bs.alert");
            s || i.data("bs.alert", s = new n(this)), "string" == typeof e && s[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        n = function(e) {
            t(e).on("click", i, this.close)
        };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 150, n.prototype.close = function(e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var s = t(this),
            o = s.attr("data-target");
        o || (o = s.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(o);
        e && e.preventDefault(), r.length || (r = s.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var s = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function() {
        return t.fn.alert = s, this
    }, t(document).on("click.bs.alert.data-api", i, n.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.button"),
                o = "object" == typeof e && e;
            s || n.data("bs.button", s = new i(this, o)), "toggle" == e ? s.toggle() : e && s.setState(e)
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.4", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            n = this.$element,
            s = n.is("input") ? "val" : "html",
            o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[s]()), setTimeout(t.proxy(function() {
            n[s](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var n = t(i.target);
        n.hasClass("btn") || (n = n.closest(".btn")), e.call(n, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : o.slide;
            s || n.data("bs.carousel", s = new i(this, o)), "number" == typeof e ? s.to(e) : r ? s[r]() : o.interval && s.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            n = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (n && !this.options.wrap) return e;
        var s = "prev" == t ? -1 : 1,
            o = (i + s) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function(e, n) {
        var s = this.$element.find(".item.active"),
            o = n || this.getItemForDirection(e, s),
            r = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var c = o[0],
            h = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
        if (this.$element.trigger(h), !h.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var u = t(this.$indicators.children()[this.getItemIndex(o)]);
                u && u.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, s.addClass(a), o.addClass(a), s.one("bsTransitionEnd", function() {
                o.removeClass([e, a].join(" ")).addClass("active"), s.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (s.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)), r && this.cycle(), this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = n, this
    };
    var s = function(i) {
        var n, s = t(this),
            o = t(s.attr("data-target") || (n = s.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var r = t.extend({}, o.data(), s.data()),
                a = s.attr("data-slide-to");
            a && (r.interval = !1), e.call(o, r), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", s).on("click.bs.carousel.data-api", "[data-slide-to]", s), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                s = i.data("bs.collapse"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            !s && o.toggle && /show|hide/.test(e) && (o.toggle = !1), s || i.data("bs.collapse", s = new n(this, o)), "string" == typeof e && s[e]()
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.4", n.TRANSITION_DURATION = 350, n.DEFAULTS = {
        toggle: !0
    }, n.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, n.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, s = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(s && s.length && (e = s.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    s && s.length && (i.call(s, "hide"), e || s.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var s = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : s.call(this)
            }
        }
    }, n.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, n) {
            var s = t(n);
            this.addAriaAndCollapsedClass(e(s), s)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var s = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = s, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(n) {
        var s = t(this);
        s.attr("data-target") || n.preventDefault();
        var o = e(s),
            r = o.data("bs.collapse"),
            a = r ? "toggle" : s.data();
        i.call(o, a)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(s).remove(), t(o).each(function() {
            var n = t(this),
                s = i(n),
                o = {
                    relatedTarget: this
                };
            s.hasClass("open") && (s.trigger(e = t.Event("hide.bs.dropdown", o)), e.isDefaultPrevented() || (n.attr("aria-expanded", "false"), s.removeClass("open").trigger("hidden.bs.dropdown", o)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }

    function n(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new r(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var s = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        r = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    r.VERSION = "3.3.4", r.prototype.toggle = function(n) {
        var s = t(this);
        if (!s.is(".disabled, :disabled")) {
            var o = i(s),
                r = o.hasClass("open");
            if (e(), !r) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {
                    relatedTarget: this
                };
                if (o.trigger(n = t.Event("show.bs.dropdown", a)), n.isDefaultPrevented()) return;
                s.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, r.prototype.keydown = function(e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var n = t(this);
            if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                var s = i(n),
                    r = s.hasClass("open");
                if (!r && 27 != e.which || r && 27 == e.which) return 27 == e.which && s.find(o).trigger("focus"), n.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var c = l.index(e.target);
                    38 == e.which && c > 0 && c--, 40 == e.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = n, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, r.prototype.toggle).on("keydown.bs.dropdown.data-api", o, r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', r.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', r.prototype.keydown);
}(jQuery), + function(t) {
    "use strict";

    function e(e, n) {
        return this.each(function() {
            var s = t(this),
                o = s.data("bs.modal"),
                r = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e);
            o || s.data("bs.modal", o = new i(this, r)), "string" == typeof e ? o[e](n) : r.show && o.show(n)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var n = this,
            s = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            n.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(n.$element) && (n.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var s = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), s && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? n.$dialog.one("bsTransitionEnd", function() {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var n = this,
            s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && s;
            if (this.$backdrop = t('<div class="modal-backdrop ' + s + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function() {
                n.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var n = t(this),
            s = n.attr("href"),
            o = t(n.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            r = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(s) && s
            }, o.data(), n.data());
        n.is("a") && i.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(o, r, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (s || !/destroy|hide/.test(e)) && (s || n.data("bs.tooltip", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, n) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport), this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), o = s.length; o--;) {
            var r = s[o];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !n) return;
            var s = this,
                o = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), o.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(a);
            c && (a = a.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element);
            var h = this.getPosition(),
                u = o[0].offsetWidth,
                d = o[0].offsetHeight;
            if (c) {
                var p = a,
                    f = this.options.container ? t(this.options.container) : this.$element.parent(),
                    m = this.getPosition(f);
                a = "bottom" == a && h.bottom + d > m.bottom ? "top" : "top" == a && h.top - d < m.top ? "bottom" : "right" == a && h.right + u > m.width ? "left" : "left" == a && h.left - u < m.left ? "right" : a, o.removeClass(p).addClass(a)
            }
            var g = this.getCalculatedOffset(a, h, u, d);
            this.applyPlacement(g, a);
            var v = function() {
                var t = s.hoverState;
                s.$element.trigger("shown.bs." + s.type), s.hoverState = null, "out" == t && s.leave(s)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var n = this.tip(),
            s = n[0].offsetWidth,
            o = n[0].offsetHeight,
            r = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(n[0], t.extend({
            using: function(t) {
                n.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth,
            c = n[0].offsetHeight;
        "top" == i && c != o && (e.top = e.top + o - c);
        var h = this.getViewportAdjustedDelta(i, e, l, c);
        h.left ? e.left += h.left : e.top += h.top;
        var u = /top|bottom/.test(i),
            d = u ? 2 * h.left - s + l : 2 * h.top - o + c,
            p = u ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(d, n[0][p], u)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function n() {
            "in" != s.hoverState && o.detach(), s.$element.removeAttr("aria-describedby").trigger("hidden.bs." + s.type), e && e()
        }
        var s = this,
            o = t(this.$tip),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            n = "BODY" == i.tagName,
            s = i.getBoundingClientRect();
        null == s.width && (s = t.extend({}, s, {
            width: s.right - s.left,
            height: s.bottom - s.top
        }));
        var o = n ? {
                top: 0,
                left: 0
            } : e.offset(),
            r = {
                scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            a = n ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, s, r, a, o)
    }, i.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, n) {
        var s = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return s;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - r.scroll,
                l = e.top + o - r.scroll + n;
            a < r.top ? s.top = r.top - a : l > r.top + r.height && (s.top = r.top + r.height - l)
        } else {
            var c = e.left - o,
                h = e.left + o + i;
            c < r.left ? s.left = r.left - c : h > r.width && (s.left = r.left + r.width - h)
        }
        return s
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.popover"),
                o = "object" == typeof e && e;
            (s || !/destroy|hide/.test(e)) && (s || n.data("bs.popover", s = new i(this, o)), "string" == typeof e && s[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.4", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(i, n) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.scrollspy"),
                o = "object" == typeof i && i;
            s || n.data("bs.scrollspy", s = new e(this, o)), "string" == typeof i && s[i]()
        })
    }
    e.VERSION = "3.3.4", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                s = e.data("target") || e.attr("href"),
                o = /^#./.test(s) && t(s);
            return o && o.length && o.is(":visible") && [
                [o[i]().top + n, s]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(),
            s = this.offsets,
            o = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return r != (t = o[o.length - 1]) && this.activate(t);
        if (r && e < s[0]) return this.activeTarget = null, this.clear();
        for (t = s.length; t--;) r != o[t] && e >= s[t] && (void 0 === s[t + 1] || e < s[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = n, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.tab");
            s || n.data("bs.tab", s = new i(this)), "string" == typeof e && s[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.4", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var s = i.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                r = t.Event("show.bs.tab", {
                    relatedTarget: s[0]
                });
            if (s.trigger(o), e.trigger(r), !r.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = t(n);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function() {
                    s.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: s[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, n, s) {
        function o() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), s && s()
        }
        var r = n.find("> .active"),
            a = s && t.support.transition && (r.length && r.hasClass("fade") || !!n.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), r.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = n, this
    };
    var s = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', s).on("click.bs.tab.data-api", '[data-toggle="pill"]', s)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.affix"),
                o = "object" == typeof e && e;
            s || n.data("bs.affix", s = new i(this, o)), "string" == typeof e && s[e]()
        })
    }
    var i = function(e, n) {
        this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.4", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, n) {
        var s = this.$target.scrollTop(),
            o = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > s && "top";
        if ("bottom" == this.affixed) return null != i ? !(s + this.unpin <= o.top) && "bottom" : !(t - n >= s + r) && "bottom";
        var a = null == this.affixed,
            l = a ? s : o.top,
            c = a ? r : e;
        return null != i && i >= s ? "top" : null != n && l + c >= t - n && "bottom"
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                n = this.options.offset,
                s = n.top,
                o = n.bottom,
                r = t(document.body).height();
            "object" != typeof n && (o = s = n), "function" == typeof s && (s = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
            var a = this.getState(r, e, s, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: r - e - o
            })
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = n, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
        })
    })
}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(t, e, i, n, s) {
            return jQuery.easing[jQuery.easing.def](t, e, i, n, s)
        },
        easeInQuad: function(t, e, i, n, s) {
            return n * (e /= s) * e + i
        },
        easeOutQuad: function(t, e, i, n, s) {
            return -n * (e /= s) * (e - 2) + i
        },
        easeInOutQuad: function(t, e, i, n, s) {
            return (e /= s / 2) < 1 ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
        },
        easeInCubic: function(t, e, i, n, s) {
            return n * (e /= s) * e * e + i
        },
        easeOutCubic: function(t, e, i, n, s) {
            return n * ((e = e / s - 1) * e * e + 1) + i
        },
        easeInOutCubic: function(t, e, i, n, s) {
            return (e /= s / 2) < 1 ? n / 2 * e * e * e + i : n / 2 * ((e -= 2) * e * e + 2) + i
        },
        easeInQuart: function(t, e, i, n, s) {
            return n * (e /= s) * e * e * e + i
        },
        easeOutQuart: function(t, e, i, n, s) {
            return -n * ((e = e / s - 1) * e * e * e - 1) + i
        },
        easeInOutQuart: function(t, e, i, n, s) {
            return (e /= s / 2) < 1 ? n / 2 * e * e * e * e + i : -n / 2 * ((e -= 2) * e * e * e - 2) + i
        },
        easeInQuint: function(t, e, i, n, s) {
            return n * (e /= s) * e * e * e * e + i
        },
        easeOutQuint: function(t, e, i, n, s) {
            return n * ((e = e / s - 1) * e * e * e * e + 1) + i
        },
        easeInOutQuint: function(t, e, i, n, s) {
            return (e /= s / 2) < 1 ? n / 2 * e * e * e * e * e + i : n / 2 * ((e -= 2) * e * e * e * e + 2) + i
        },
        easeInSine: function(t, e, i, n, s) {
            return -n * Math.cos(e / s * (Math.PI / 2)) + n + i
        },
        easeOutSine: function(t, e, i, n, s) {
            return n * Math.sin(e / s * (Math.PI / 2)) + i
        },
        easeInOutSine: function(t, e, i, n, s) {
            return -n / 2 * (Math.cos(Math.PI * e / s) - 1) + i
        },
        easeInExpo: function(t, e, i, n, s) {
            return 0 == e ? i : n * Math.pow(2, 10 * (e / s - 1)) + i
        },
        easeOutExpo: function(t, e, i, n, s) {
            return e == s ? i + n : n * (-Math.pow(2, -10 * e / s) + 1) + i
        },
        easeInOutExpo: function(t, e, i, n, s) {
            return 0 == e ? i : e == s ? i + n : (e /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + i : n / 2 * (-Math.pow(2, -10 * --e) + 2) + i
        },
        easeInCirc: function(t, e, i, n, s) {
            return -n * (Math.sqrt(1 - (e /= s) * e) - 1) + i
        },
        easeOutCirc: function(t, e, i, n, s) {
            return n * Math.sqrt(1 - (e = e / s - 1) * e) + i
        },
        easeInOutCirc: function(t, e, i, n, s) {
            return (e /= s / 2) < 1 ? -n / 2 * (Math.sqrt(1 - e * e) - 1) + i : n / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i
        },
        easeInElastic: function(t, e, i, n, s) {
            var o = 1.70158,
                r = 0,
                a = n;
            if (0 == e) return i;
            if (1 == (e /= s)) return i + n;
            if (r || (r = .3 * s), a < Math.abs(n)) {
                a = n;
                var o = r / 4
            } else var o = r / (2 * Math.PI) * Math.asin(n / a);
            return -(a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * s - o) * (2 * Math.PI) / r)) + i
        },
        easeOutElastic: function(t, e, i, n, s) {
            var o = 1.70158,
                r = 0,
                a = n;
            if (0 == e) return i;
            if (1 == (e /= s)) return i + n;
            if (r || (r = .3 * s), a < Math.abs(n)) {
                a = n;
                var o = r / 4
            } else var o = r / (2 * Math.PI) * Math.asin(n / a);
            return a * Math.pow(2, -10 * e) * Math.sin((e * s - o) * (2 * Math.PI) / r) + n + i
        },
        easeInOutElastic: function(t, e, i, n, s) {
            var o = 1.70158,
                r = 0,
                a = n;
            if (0 == e) return i;
            if (2 == (e /= s / 2)) return i + n;
            if (r || (r = s * (.3 * 1.5)), a < Math.abs(n)) {
                a = n;
                var o = r / 4
            } else var o = r / (2 * Math.PI) * Math.asin(n / a);
            return e < 1 ? -.5 * (a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * s - o) * (2 * Math.PI) / r)) + i : a * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * s - o) * (2 * Math.PI) / r) * .5 + n + i
        },
        easeInBack: function(t, e, i, n, s, o) {
            return void 0 == o && (o = 1.70158), n * (e /= s) * e * ((o + 1) * e - o) + i
        },
        easeOutBack: function(t, e, i, n, s, o) {
            return void 0 == o && (o = 1.70158), n * ((e = e / s - 1) * e * ((o + 1) * e + o) + 1) + i
        },
        easeInOutBack: function(t, e, i, n, s, o) {
            return void 0 == o && (o = 1.70158), (e /= s / 2) < 1 ? n / 2 * (e * e * (((o *= 1.525) + 1) * e - o)) + i : n / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + i
        },
        easeInBounce: function(t, e, i, n, s) {
            return n - jQuery.easing.easeOutBounce(t, s - e, 0, n, s) + i
        },
        easeOutBounce: function(t, e, i, n, s) {
            return (e /= s) < 1 / 2.75 ? n * (7.5625 * e * e) + i : e < 2 / 2.75 ? n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + i : e < 2.5 / 2.75 ? n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + i : n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + i
        },
        easeInOutBounce: function(t, e, i, n, s) {
            return e < s / 2 ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, n, s) + i : .5 * jQuery.easing.easeOutBounce(t, 2 * e - s, 0, n, s) + .5 * n + i
        }
    }),
    function(t) {
        t.fn.unveil = function(e, i) {
            function n() {
                var e = c.filter(function() {
                    var e = t(this),
                        i = o.scrollTop(),
                        n = i + o.height(),
                        s = e.offset().top,
                        a = s + e.height();
                    return a >= i - r && s <= n + r
                });
                s = e.trigger("unveil"), c = c.not(s)
            }
            var s, o = t(window),
                r = e || 0,
                a = window.devicePixelRatio > 1,
                l = a ? "data-src-retina" : "data-src",
                c = this;
            return this.one("unveil", function() {
                var t = this.getAttribute(l);
                t = t || this.getAttribute("data-src"), t && (this.setAttribute("src", t), "function" == typeof i && i.call(this))
            }), o.scroll(n), o.resize(n), n(), this
        }
    }(window.jQuery || window.Zepto), jQuery.extend({
        bez: function(t) {
            var e = "bez_" + jQuery.makeArray(arguments).join("_").replace(/\./g, "p");
            if ("function" != typeof jQuery.easing[e]) {
                var i = function(t, e) {
                    var i = [null, null],
                        n = [null, null],
                        s = [null, null],
                        o = function(o, r) {
                            return s[r] = 3 * t[r], n[r] = 3 * (e[r] - t[r]) - s[r], i[r] = 1 - s[r] - n[r], o * (s[r] + o * (n[r] + o * i[r]))
                        },
                        r = function(t) {
                            return s[0] + t * (2 * n[0] + 3 * i[0] * t)
                        },
                        a = function(t) {
                            for (var e, i = t, n = 0; ++n < 14 && (e = o(i, 0) - t, !(Math.abs(e) < .001));) i -= e / r(i);
                            return i
                        };
                    return function(t) {
                        return o(a(t), 1)
                    }
                };
                jQuery.easing[e] = function(e, n, s, o, r) {
                    return o * i([t[0], t[1]], [t[2], t[3]])(n / r) + s
                }
            }
            return e
        }
    }), ! function(t) {
        var e = function(e, i) {
            this.$elem = t(e), this.$elem.data("instance", this), this.init(i)
        };
        e.prototype = {
            defaults: {
                classes: {
                    animated: "list-view-animated",
                    container: "list-view-wrapper",
                    hidden: "list-view-hidden",
                    stationaryHeader: "list-view-fake-header"
                },
                selectors: {
                    groupContainer: ".list-view-group-container",
                    groupHeader: ".list-view-group-header",
                    stationaryHeader: "h2"
                }
            },
            init: function(e) {
                var i = this,
                    n = !!navigator.userAgent.match(/ipad|iphone|ipod/gi);
                this.options = t.extend(!0, {}, this.defaults, e || {}), this.elems = [], this.$elem.addClass("list-view"), this.$elem.children().wrapAll(["<div class='", this.options.classes.container, "' data-ios='", n, "'></div>"].join("")), this.$elem.prepend(["<", this.options.selectors.stationaryHeader, "/>"].join("")), this.$listWrapper = this.$elem.find("." + this.options.classes.container), this.$fakeHeader = this.$elem.find(this.options.selectors.stationaryHeader).eq(0), this.$fakeHeader.addClass(this.options.classes.stationaryHeader), this.$elem.find(this.options.selectors.groupContainer).each(function(t) {
                    var e = i.$elem.find(i.options.selectors.groupContainer).eq(t),
                        n = e.find(i.options.selectors.groupHeader).eq(0),
                        s = e.height(),
                        o = e.position().top;
                    i.elems.push({
                        list: e,
                        header: n,
                        listHeight: s,
                        headerText: n.text(),
                        headerHeight: n.outerHeight(),
                        listOffset: o,
                        listBottom: s + o
                    })
                }), this.$fakeHeader.text(this.elems[0].headerText), this.$listWrapper.scroll(function() {
                    i.testPosition()
                })
            },
            testPosition: function() {
                for (var e, i, n, s = this.$listWrapper.scrollTop(), o = 0; this.elems[o].listOffset - s <= 0 && (e = this.elems[o], n = e.listBottom - s, n < -e.headerHeight && (i = e), o++, !(o >= this.elems.length)););
                0 > n && n > -e.headerHeight ? (this.$fakeHeader.addClass(this.options.classes.hidden), t(e.list).addClass(this.options.classes.animated)) : (this.$fakeHeader.removeClass(this.options.classes.hidden), e && t(e.list).removeClass(this.options.classes.animated)), e && this.$fakeHeader.text(e.headerText)
            }
        }, t.fn.ioslist = function(i, n) {
            return this.each("string" == typeof i ? function() {
                t(this).data("instance")[i](n)
            } : function() {
                new e(this, i)
            })
        }
    }(jQuery, window, document),
    function() {
        function t() {}

        function e(t, e) {
            for (var i = t.length; i--;)
                if (t[i].listener === e) return i;
            return -1
        }

        function i(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var n = t.prototype,
            s = this,
            o = s.EventEmitter;
        n.getListeners = function(t) {
            var e, i, n = this._getEvents();
            if ("object" == typeof t) {
                e = {};
                for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
            } else e = n[t] || (n[t] = []);
            return e
        }, n.flattenListeners = function(t) {
            var e, i = [];
            for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
            return i
        }, n.getListenersAsObject = function(t) {
            var e, i = this.getListeners(t);
            return i instanceof Array && (e = {}, e[t] = i), e || i
        }, n.addListener = function(t, i) {
            var n, s = this.getListenersAsObject(t),
                o = "object" == typeof i;
            for (n in s) s.hasOwnProperty(n) && -1 === e(s[n], i) && s[n].push(o ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
            return this.addListener(t, {
                listener: e,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
            return this.getListeners(t), this
        }, n.defineEvents = function(t) {
            for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
            return this
        }, n.removeListener = function(t, i) {
            var n, s, o = this.getListenersAsObject(t);
            for (s in o) o.hasOwnProperty(s) && (n = e(o[s], i), -1 !== n && o[s].splice(n, 1));
            return this
        }, n.off = i("removeListener"), n.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, n.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, n.manipulateListeners = function(t, e, i) {
            var n, s, o = t ? this.removeListener : this.addListener,
                r = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (n = i.length; n--;) o.call(this, e, i[n]);
            else
                for (n in e) e.hasOwnProperty(n) && (s = e[n]) && ("function" == typeof s ? o.call(this, n, s) : r.call(this, n, s));
            return this
        }, n.removeEvent = function(t) {
            var e, i = typeof t,
                n = this._getEvents();
            if ("string" === i) delete n[t];
            else if ("object" === i)
                for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
            var i, n, s, o, r = this.getListenersAsObject(t);
            for (s in r)
                if (r.hasOwnProperty(s))
                    for (n = r[s].length; n--;) i = r[s][n], i.once === !0 && this.removeListener(t, i.listener), o = i.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, n.setOnceReturnValue = function(t) {
            return this._onceReturnValue = t, this
        }, n._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return s.EventEmitter = o, t
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
    }.call(this),
    function(t) {
        function e(e) {
            var i = t.event;
            return i.target = i.target || i.srcElement || e, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : i.attachEvent && (n = function(t, i, n) {
            t[i + n] = n.handleEvent ? function() {
                var i = e(t);
                n.handleEvent.call(n, i)
            } : function() {
                var i = e(t);
                n.call(t, i)
            }, t.attachEvent("on" + i, t[i + n])
        });
        var s = function() {};
        i.removeEventListener ? s = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : i.detachEvent && (s = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var o = {
            bind: n,
            unbind: s
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : t.eventie = o
    }(this),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        function n(t, e) {
            for (var i in e) t[i] = e[i];
            return t;
        }

        function s(t) {
            return "[object Array]" === d.call(t)
        }

        function o(t) {
            var e = [];
            if (s(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0, n = t.length; n > i; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function r(t, e, i) {
            if (!(this instanceof r)) return new r(t, e);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = o(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), c && (this.jqDeferred = new c.Deferred);
            var s = this;
            setTimeout(function() {
                s.check()
            })
        }

        function a(t) {
            this.img = t
        }

        function l(t) {
            this.src = t, p[t] = this
        }
        var c = t.jQuery,
            h = t.console,
            u = void 0 !== h,
            d = Object.prototype.toString;
        r.prototype = new e, r.prototype.options = {}, r.prototype.getImages = function() {
            this.images = [];
            for (var t = 0, e = this.elements.length; e > t; t++) {
                var i = this.elements[t];
                "IMG" === i.nodeName && this.addImage(i);
                var n = i.nodeType;
                if (n && (1 === n || 9 === n || 11 === n))
                    for (var s = i.querySelectorAll("img"), o = 0, r = s.length; r > o; o++) {
                        var a = s[o];
                        this.addImage(a)
                    }
            }
        }, r.prototype.addImage = function(t) {
            var e = new a(t);
            this.images.push(e)
        }, r.prototype.check = function() {
            function t(t, s) {
                return e.options.debug && u && h.log("confirm", t, s), e.progress(t), i++, i === n && e.complete(), !0
            }
            var e = this,
                i = 0,
                n = this.images.length;
            if (this.hasAnyBroken = !1, !n) return void this.complete();
            for (var s = 0; n > s; s++) {
                var o = this.images[s];
                o.on("confirm", t), o.check()
            }
        }, r.prototype.progress = function(t) {
            this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
            var e = this;
            setTimeout(function() {
                e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify && e.jqDeferred.notify(e, t)
            })
        }, r.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var e = this;
            setTimeout(function() {
                if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
                    var i = e.hasAnyBroken ? "reject" : "resolve";
                    e.jqDeferred[i](e)
                }
            })
        }, c && (c.fn.imagesLoaded = function(t, e) {
            var i = new r(this, t, e);
            return i.jqDeferred.promise(c(this))
        }), a.prototype = new e, a.prototype.check = function() {
            var t = p[this.img.src] || new l(this.img.src);
            if (t.isConfirmed) return void this.confirm(t.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var e = this;
            t.on("confirm", function(t, i) {
                return e.confirm(t.isLoaded, i), !0
            }), t.check()
        }, a.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("confirm", this, e)
        };
        var p = {};
        return l.prototype = new e, l.prototype.check = function() {
            if (!this.isChecked) {
                var t = new Image;
                i.bind(t, "load", this), i.bind(t, "error", this), t.src = this.src, this.isChecked = !0
            }
        }, l.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, l.prototype.onload = function(t) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(t)
        }, l.prototype.onerror = function(t) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(t)
        }, l.prototype.confirm = function(t, e) {
            this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
        }, l.prototype.unbindProxyEvents = function(t) {
            i.unbind(t.target, "load", this), i.unbind(t.target, "error", this)
        }, r
    }),
    function(t) {
        t.fn.addBack = t.fn.addBack || t.fn.andSelf, t.fn.extend({
            actual: function(e, i) {
                if (!this[e]) throw '$.actual => The jQuery method "' + e + '" you called does not exist';
                var n, s, o = {
                        absolute: !1,
                        clone: !1,
                        includeMargin: !1
                    },
                    r = t.extend(o, i),
                    a = this.eq(0);
                if (r.clone === !0) n = function() {
                    var t = "position: absolute !important; top: -1000 !important; ";
                    a = a.clone().attr("style", t).appendTo("body")
                }, s = function() {
                    a.remove()
                };
                else {
                    var l, c = [],
                        h = "";
                    n = function() {
                        l = a.parents().addBack().filter(":hidden"), h += "visibility: hidden !important; display: block !important; ", r.absolute === !0 && (h += "position: absolute !important; "), l.each(function() {
                            var e = t(this),
                                i = e.attr("style");
                            c.push(i), e.attr("style", i ? i + ";" + h : h)
                        })
                    }, s = function() {
                        l.each(function(e) {
                            var i = t(this),
                                n = c[e];
                            void 0 === n ? i.removeAttr("style") : i.attr("style", n)
                        })
                    }
                }
                n();
                var u = /(outer)/.test(e) ? a[e](r.includeMargin) : a[e]();
                return s(), u
            }
        })
    }(jQuery), ! function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(t.jQuery)
    }(this, function(t) {
        "use strict";

        function e(e) {
            if (o.webkit && !e) return {
                height: 0,
                width: 0
            };
            if (!o.data.outer) {
                var i = {
                    border: "none",
                    "box-sizing": "content-box",
                    height: "200px",
                    margin: "0",
                    padding: "0",
                    width: "200px"
                };
                o.data.inner = t("<div>").css(t.extend({}, i)), o.data.outer = t("<div>").css(t.extend({
                    left: "-1000px",
                    overflow: "scroll",
                    position: "absolute",
                    top: "-1000px"
                }, i)).append(o.data.inner).appendTo("body")
            }
            return o.data.outer.scrollLeft(1e3).scrollTop(1e3), {
                height: Math.ceil(o.data.outer.offset().top - o.data.inner.offset().top || 0),
                width: Math.ceil(o.data.outer.offset().left - o.data.inner.offset().left || 0)
            }
        }

        function i() {
            var t = e(!0);
            return !(t.height || t.width)
        }

        function n(t) {
            var e = t.originalEvent;
            return (!e.axis || e.axis !== e.HORIZONTAL_AXIS) && !e.wheelDeltaX
        }
        var s = !1,
            o = {
                data: {
                    index: 0,
                    name: "scrollbar"
                },
                macosx: /mac/i.test(navigator.platform),
                mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
                overlay: null,
                scroll: null,
                scrolls: [],
                webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
            };
        o.scrolls.add = function(t) {
            this.remove(t).push(t)
        }, o.scrolls.remove = function(e) {
            for (; t.inArray(e, this) >= 0;) this.splice(t.inArray(e, this), 1);
            return this
        };
        var r = {
                autoScrollSize: !0,
                autoUpdate: !0,
                debug: !1,
                disableBodyScroll: !1,
                duration: 200,
                ignoreMobile: !1,
                ignoreOverlay: !1,
                scrollStep: 30,
                showArrows: !1,
                stepScrolling: !0,
                scrollx: null,
                scrolly: null,
                onDestroy: null,
                onInit: null,
                onScroll: null,
                onUpdate: null
            },
            a = function(n) {
                o.scroll || (o.overlay = i(), o.scroll = e(), c(), t(window).resize(function() {
                    var t = !1;
                    if (o.scroll && (o.scroll.height || o.scroll.width)) {
                        var i = e();
                        (i.height !== o.scroll.height || i.width !== o.scroll.width) && (o.scroll = i, t = !0)
                    }
                    c(t)
                })), this.container = n, this.namespace = ".scrollbar_" + o.data.index++, this.options = t.extend({}, r, window.jQueryScrollbarOptions || {}), this.scrollTo = null, this.scrollx = {}, this.scrolly = {}, n.data(o.data.name, this), o.scrolls.add(this)
            };
        a.prototype = {
            destroy: function() {
                if (this.wrapper) {
                    this.container.removeData(o.data.name), o.scrolls.remove(this);
                    var e = this.container.scrollLeft(),
                        i = this.container.scrollTop();
                    this.container.insertBefore(this.wrapper).css({
                        height: "",
                        margin: "",
                        "max-height": ""
                    }).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(e).scrollTop(i), this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace), this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace), this.wrapper.remove(), t(document).add("body").off(this.namespace), t.isFunction(this.options.onDestroy) && this.options.onDestroy.apply(this, [this.container])
                }
            },
            init: function(e) {
                var i = this,
                    s = this.container,
                    r = this.containerWrapper || s,
                    a = this.namespace,
                    l = t.extend(this.options, e || {}),
                    c = {
                        x: this.scrollx,
                        y: this.scrolly
                    },
                    h = this.wrapper,
                    u = {
                        scrollLeft: s.scrollLeft(),
                        scrollTop: s.scrollTop()
                    };
                if (o.mobile && l.ignoreMobile || o.overlay && l.ignoreOverlay || o.macosx && !o.webkit) return !1;
                if (h) r.css({
                    height: "auto",
                    "margin-bottom": -1 * o.scroll.height + "px",
                    "margin-right": -1 * o.scroll.width + "px",
                    "max-height": ""
                });
                else {
                    if (this.wrapper = h = t("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position", "absolute" == s.css("position") ? "absolute" : "relative").insertBefore(s).append(s), s.is("textarea") && (this.containerWrapper = r = t("<div>").insertBefore(s).append(s), h.addClass("scroll-textarea")), r.addClass("scroll-content").css({
                            height: "auto",
                            "margin-bottom": -1 * o.scroll.height + "px",
                            "margin-right": -1 * o.scroll.width + "px",
                            "max-height": ""
                        }), s.on("scroll" + a, function() {
                            t.isFunction(l.onScroll) && l.onScroll.call(i, {
                                maxScroll: c.y.maxScrollOffset,
                                scroll: s.scrollTop(),
                                size: c.y.size,
                                visible: c.y.visible
                            }, {
                                maxScroll: c.x.maxScrollOffset,
                                scroll: s.scrollLeft(),
                                size: c.x.size,
                                visible: c.x.visible
                            }), c.x.isVisible && c.x.scroll.bar.css("left", s.scrollLeft() * c.x.kx + "px"), c.y.isVisible && c.y.scroll.bar.css("top", s.scrollTop() * c.y.kx + "px")
                        }), h.on("scroll" + a, function() {
                            h.scrollTop(0).scrollLeft(0)
                        }), l.disableBodyScroll) {
                        var d = function(t) {
                            n(t) ? c.y.isVisible && c.y.mousewheel(t) : c.x.isVisible && c.x.mousewheel(t)
                        };
                        h.on("MozMousePixelScroll" + a, d), h.on("mousewheel" + a, d), o.mobile && h.on("touchstart" + a, function(e) {
                            var i = e.originalEvent.touches && e.originalEvent.touches[0] || e,
                                n = {
                                    pageX: i.pageX,
                                    pageY: i.pageY
                                },
                                o = {
                                    left: s.scrollLeft(),
                                    top: s.scrollTop()
                                };
                            t(document).on("touchmove" + a, function(t) {
                                var e = t.originalEvent.targetTouches && t.originalEvent.targetTouches[0] || t;
                                s.scrollLeft(o.left + n.pageX - e.pageX), s.scrollTop(o.top + n.pageY - e.pageY), t.preventDefault()
                            }), t(document).on("touchend" + a, function() {
                                t(document).off(a)
                            })
                        })
                    }
                    t.isFunction(l.onInit) && l.onInit.apply(this, [s])
                }
                t.each(c, function(e, o) {
                    var r = null,
                        h = 1,
                        u = "x" === e ? "scrollLeft" : "scrollTop",
                        d = l.scrollStep,
                        p = function() {
                            var t = s[u]();
                            s[u](t + d), 1 == h && t + d >= f && (t = s[u]()), -1 == h && f >= t + d && (t = s[u]()), s[u]() == t && r && r()
                        },
                        f = 0;
                    o.scroll || (o.scroll = i._getScroll(l["scroll" + e]).addClass("scroll-" + e), l.showArrows && o.scroll.addClass("scroll-element_arrows_visible"), o.mousewheel = function(t) {
                        if (!o.isVisible || "x" === e && n(t)) return !0;
                        if ("y" === e && !n(t)) return c.x.mousewheel(t), !0;
                        var r = -1 * t.originalEvent.wheelDelta || t.originalEvent.detail,
                            a = o.size - o.visible - o.offset;
                        return (r > 0 && a > f || 0 > r && f > 0) && (f += r, 0 > f && (f = 0), f > a && (f = a), i.scrollTo = i.scrollTo || {}, i.scrollTo[u] = f, setTimeout(function() {
                            i.scrollTo && (s.stop().animate(i.scrollTo, 240, "linear", function() {
                                f = s[u]()
                            }), i.scrollTo = null)
                        }, 1)), t.preventDefault(), !1
                    }, o.scroll.on("MozMousePixelScroll" + a, o.mousewheel).on("mousewheel" + a, o.mousewheel).on("mouseenter" + a, function() {
                        f = s[u]()
                    }), o.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown" + a, function(n) {
                        if (1 != n.which) return !0;
                        h = 1;
                        var a = {
                                eventOffset: n["x" === e ? "pageX" : "pageY"],
                                maxScrollValue: o.size - o.visible - o.offset,
                                scrollbarOffset: o.scroll.bar.offset()["x" === e ? "left" : "top"],
                                scrollbarSize: o.scroll.bar["x" === e ? "outerWidth" : "outerHeight"]()
                            },
                            c = 0,
                            m = 0;
                        return t(this).hasClass("scroll-arrow") ? (h = t(this).hasClass("scroll-arrow_more") ? 1 : -1, d = l.scrollStep * h, f = h > 0 ? a.maxScrollValue : 0) : (h = a.eventOffset > a.scrollbarOffset + a.scrollbarSize ? 1 : a.eventOffset < a.scrollbarOffset ? -1 : 0, d = Math.round(.75 * o.visible) * h, f = a.eventOffset - a.scrollbarOffset - (l.stepScrolling ? 1 == h ? a.scrollbarSize : 0 : Math.round(a.scrollbarSize / 2)), f = s[u]() + f / o.kx), i.scrollTo = i.scrollTo || {}, i.scrollTo[u] = l.stepScrolling ? s[u]() + d : f, l.stepScrolling && (r = function() {
                            f = s[u](), clearInterval(m), clearTimeout(c), c = 0, m = 0
                        }, c = setTimeout(function() {
                            m = setInterval(p, 40)
                        }, l.duration + 100)), setTimeout(function() {
                            i.scrollTo && (s.animate(i.scrollTo, l.duration), i.scrollTo = null)
                        }, 1), i._handleMouseDown(r, n)
                    }), o.scroll.bar.on("mousedown" + a, function(n) {
                        if (1 != n.which) return !0;
                        var r = n["x" === e ? "pageX" : "pageY"],
                            l = s[u]();
                        return o.scroll.addClass("scroll-draggable"), t(document).on("mousemove" + a, function(t) {
                            var i = parseInt((t["x" === e ? "pageX" : "pageY"] - r) / o.kx, 10);
                            s[u](l + i)
                        }), i._handleMouseDown(function() {
                            o.scroll.removeClass("scroll-draggable"), f = s[u]()
                        }, n)
                    }))
                }), t.each(c, function(t, e) {
                    var i = "scroll-scroll" + t + "_visible",
                        n = "x" == t ? c.y : c.x;
                    e.scroll.removeClass(i), n.scroll.removeClass(i), r.removeClass(i)
                }), t.each(c, function(e, i) {
                    t.extend(i, "x" == e ? {
                        offset: parseInt(s.css("left"), 10) || 0,
                        size: s.prop("scrollWidth"),
                        visible: h.width()
                    } : {
                        offset: parseInt(s.css("top"), 10) || 0,
                        size: s.prop("scrollHeight"),
                        visible: h.height()
                    })
                }), this._updateScroll("x", this.scrollx), this._updateScroll("y", this.scrolly), t.isFunction(l.onUpdate) && l.onUpdate.apply(this, [s]), t.each(c, function(t, e) {
                    var i = "x" === t ? "left" : "top",
                        n = "x" === t ? "outerWidth" : "outerHeight",
                        o = "x" === t ? "width" : "height",
                        r = parseInt(s.css(i), 10) || 0,
                        a = e.size,
                        c = e.visible + r,
                        h = e.scroll.size[n]() + (parseInt(e.scroll.size.css(i), 10) || 0);
                    l.autoScrollSize && (e.scrollbarSize = parseInt(h * c / a, 10), e.scroll.bar.css(o, e.scrollbarSize + "px")), e.scrollbarSize = e.scroll.bar[n](), e.kx = (h - e.scrollbarSize) / (a - c) || 1, e.maxScrollOffset = a - c
                }), s.scrollLeft(u.scrollLeft).scrollTop(u.scrollTop).trigger("scroll")
            },
            _getScroll: function(e) {
                var i = {
                    advanced: ['<div class="scroll-element">', '<div class="scroll-element_corner"></div>', '<div class="scroll-arrow scroll-arrow_less"></div>', '<div class="scroll-arrow scroll-arrow_more"></div>', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_inner-wrapper">', '<div class="scroll-element_inner scroll-element_track">', '<div class="scroll-element_inner-bottom"></div>', "</div>", "</div>", '<div class="scroll-bar">', '<div class="scroll-bar_body">', '<div class="scroll-bar_body-inner"></div>', "</div>", '<div class="scroll-bar_bottom"></div>', '<div class="scroll-bar_center"></div>', "</div>", "</div>", "</div>"].join(""),
                    simple: ['<div class="scroll-element">', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_track"></div>', '<div class="scroll-bar"></div>', "</div>", "</div>"].join("")
                };
                return i[e] && (e = i[e]), e || (e = i.simple), e = "string" == typeof e ? t(e).appendTo(this.wrapper) : t(e), t.extend(e, {
                    bar: e.find(".scroll-bar"),
                    size: e.find(".scroll-element_size"),
                    track: e.find(".scroll-element_track")
                }), e
            },
            _handleMouseDown: function(e, i) {
                var n = this.namespace;
                return t(document).on("blur" + n, function() {
                    t(document).add("body").off(n), e && e()
                }), t(document).on("dragstart" + n, function(t) {
                    return t.preventDefault(), !1
                }), t(document).on("mouseup" + n, function() {
                    t(document).add("body").off(n), e && e()
                }), t("body").on("selectstart" + n, function(t) {
                    return t.preventDefault(), !1
                }), i && i.preventDefault(), !1
            },
            _updateScroll: function(e, i) {
                var n = this.container,
                    s = this.containerWrapper || n,
                    r = "scroll-scroll" + e + "_visible",
                    a = "x" === e ? this.scrolly : this.scrollx,
                    l = parseInt(this.container.css("x" === e ? "left" : "top"), 10) || 0,
                    c = this.wrapper,
                    h = i.size,
                    u = i.visible + l;
                i.isVisible = h - u > 1, i.isVisible ? (i.scroll.addClass(r), a.scroll.addClass(r), s.addClass(r)) : (i.scroll.removeClass(r), a.scroll.removeClass(r), s.removeClass(r)), "y" === e && s.css(n.is("textarea") || u > h ? {
                    height: u + o.scroll.height + "px",
                    "max-height": "none"
                } : {
                    "max-height": u + o.scroll.height + "px"
                }), (i.size != n.prop("scrollWidth") || a.size != n.prop("scrollHeight") || i.visible != c.width() || a.visible != c.height() || i.offset != (parseInt(n.css("left"), 10) || 0) || a.offset != (parseInt(n.css("top"), 10) || 0)) && (t.extend(this.scrollx, {
                    offset: parseInt(n.css("left"), 10) || 0,
                    size: n.prop("scrollWidth"),
                    visible: c.width()
                }), t.extend(this.scrolly, {
                    offset: parseInt(n.css("top"), 10) || 0,
                    size: this.container.prop("scrollHeight"),
                    visible: c.height()
                }), this._updateScroll("x" === e ? "y" : "x", a))
            }
        };
        var l = a;
        t.fn.scrollbar = function(e, i) {
            return "string" != typeof e && (i = e, e = "init"), "undefined" == typeof i && (i = []), t.isArray(i) || (i = [i]), this.not("body, .scroll-wrapper").each(function() {
                var n = t(this),
                    s = n.data(o.data.name);
                (s || "init" === e) && (s || (s = new l(n)), s[e] && s[e].apply(s, i))
            }), this
        }, t.fn.scrollbar.options = r;
        var c = function() {
            var t = 0,
                e = 0;
            return function(i) {
                var n, r, a, l, h, u, d;
                for (n = 0; n < o.scrolls.length; n++) l = o.scrolls[n], r = l.container, a = l.options, h = l.wrapper, u = l.scrollx, d = l.scrolly, (i || a.autoUpdate && h && h.is(":visible") && (r.prop("scrollWidth") != u.size || r.prop("scrollHeight") != d.size || h.width() != u.visible || h.height() != d.visible)) && (l.init(), a.debug && (window.console && console.log({
                    scrollHeight: r.prop("scrollHeight") + ":" + l.scrolly.size,
                    scrollWidth: r.prop("scrollWidth") + ":" + l.scrollx.size,
                    visibleHeight: h.height() + ":" + l.scrolly.visible,
                    visibleWidth: h.width() + ":" + l.scrollx.visible
                }, !0), e++));
                s && e > 10 ? (window.console && console.log("Scroll updates exceed 10"), c = function() {}) : (clearTimeout(t), t = setTimeout(c, 300))
            }
        }();
        window.angular && ! function(t) {
            t.module("jQueryScrollbar", []).provider("jQueryScrollbar", function() {
                var e = r;
                return {
                    setOptions: function(i) {
                        t.extend(e, i)
                    },
                    $get: function() {
                        return {
                            options: t.copy(e)
                        }
                    }
                }
            }).directive("jqueryScrollbar", function(t, e) {
                return {
                    restrict: "AC",
                    link: function(i, n, s) {
                        var o = e(s.jqueryScrollbar),
                            r = o(i);
                        n.scrollbar(r || t.options).on("$destroy", function() {
                            n.scrollbar("destroy")
                        })
                    }
                }
            })
        }(window.angular)
    }),
    function(t, e) {
        function i() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        function n() {
            var t = new Date;
            return i(t.getFullYear(), t.getMonth(), t.getDate())
        }

        function s(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }

        function o(e, i) {
            function n(t, e) {
                return e.toLowerCase()
            }
            var s, o = t(e).data(),
                r = {},
                a = new RegExp("^" + i.toLowerCase() + "([A-Z])");
            i = new RegExp("^" + i.toLowerCase());
            for (var l in o) i.test(l) && (s = l.replace(a, n), r[s] = o[l]);
            return r
        }

        function r(e) {
            var i = {};
            if (f[e] || (e = e.split("-")[0], f[e])) {
                var n = f[e];
                return t.each(p, function(t, e) {
                    e in n && (i[e] = n[e])
                }), i
            }
        }
        var a = t(window),
            l = function() {
                var e = {
                    get: function(t) {
                        return this.slice(t)[0]
                    },
                    contains: function(t) {
                        for (var e = t && t.valueOf(), i = 0, n = this.length; i < n; i++)
                            if (this[i].valueOf() === e) return i;
                        return -1
                    },
                    remove: function(t) {
                        this.splice(t, 1)
                    },
                    replace: function(e) {
                        e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                    },
                    clear: function() {
                        this.length = 0
                    },
                    copy: function() {
                        var t = new l;
                        return t.replace(this), t
                    }
                };
                return function() {
                    var i = [];
                    return i.push.apply(i, arguments), t.extend(i, e), i
                }
            }(),
            c = function(e, i) {
                this.dates = new l, this.viewDate = n(), this.focusDate = null, this._process_options(i), this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = !!this.element.is(".date") && this.element.find(".add-on, .input-group-addon, .btn"), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(m.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(t, e) {
                    return parseInt(e) + 1
                }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
            };
        c.prototype = {
            constructor: c,
            _process_options: function(e) {
                this._o = t.extend({}, this._o, e);
                var i = this.o = t.extend({}, this._o),
                    n = i.language;
                switch (f[n] || (n = n.split("-")[0], f[n] || (n = d.language)), i.language = n, i.startView) {
                    case 2:
                    case "decade":
                        i.startView = 2;
                        break;
                    case 1:
                    case "year":
                        i.startView = 1;
                        break;
                    default:
                        i.startView = 0
                }
                switch (i.minViewMode) {
                    case 1:
                    case "months":
                        i.minViewMode = 1;
                        break;
                    case 2:
                    case "years":
                        i.minViewMode = 2;
                        break;
                    default:
                        i.minViewMode = 0
                }
                i.startView = Math.max(i.startView, i.minViewMode), i.multidate !== !0 && (i.multidate = Number(i.multidate) || !1, i.multidate !== !1 ? i.multidate = Math.max(0, i.multidate) : i.multidate = 1), i.multidateSeparator = String(i.multidateSeparator), i.weekStart %= 7, i.weekEnd = (i.weekStart + 6) % 7;
                var s = m.parseFormat(i.format);
                i.startDate !== -(1 / 0) && (i.startDate ? i.startDate instanceof Date ? i.startDate = this._local_to_utc(this._zero_time(i.startDate)) : i.startDate = m.parseDate(i.startDate, s, i.language) : i.startDate = -(1 / 0)), i.endDate !== 1 / 0 && (i.endDate ? i.endDate instanceof Date ? i.endDate = this._local_to_utc(this._zero_time(i.endDate)) : i.endDate = m.parseDate(i.endDate, s, i.language) : i.endDate = 1 / 0), i.daysOfWeekDisabled = i.daysOfWeekDisabled || [], t.isArray(i.daysOfWeekDisabled) || (i.daysOfWeekDisabled = i.daysOfWeekDisabled.split(/[,\s]*/)), i.daysOfWeekDisabled = t.map(i.daysOfWeekDisabled, function(t) {
                    return parseInt(t, 10)
                });
                var o = String(i.orientation).toLowerCase().split(/\s+/g),
                    r = i.orientation.toLowerCase();
                if (o = t.grep(o, function(t) {
                        return /^auto|left|right|top|bottom$/.test(t)
                    }), i.orientation = {
                        x: "auto",
                        y: "auto"
                    }, r && "auto" !== r)
                    if (1 === o.length) switch (o[0]) {
                        case "top":
                        case "bottom":
                            i.orientation.y = o[0];
                            break;
                        case "left":
                        case "right":
                            i.orientation.x = o[0]
                    } else r = t.grep(o, function(t) {
                        return /^left|right$/.test(t)
                    }), i.orientation.x = r[0] || "auto", r = t.grep(o, function(t) {
                        return /^top|bottom$/.test(t)
                    }), i.orientation.y = r[0] || "auto";
                    else;
            },
            _events: [],
            _secondaryEvents: [],
            _applyEvents: function(t) {
                for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (n = e, s = t[o][1]) : 3 === t[o].length && (n = t[o][1], s = t[o][2]), i.on(s, n)
            },
            _unapplyEvents: function(t) {
                for (var i, n, s, o = 0; o < t.length; o++) i = t[o][0], 2 === t[o].length ? (s = e, n = t[o][1]) : 3 === t[o].length && (s = t[o][1], n = t[o][2]), i.off(n, s)
            },
            _buildEvents: function() {
                this.isInput ? this._events = [
                    [this.element, {
                        focus: t.proxy(this.show, this),
                        keyup: t.proxy(function(e) {
                            t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1 && this.update()
                        }, this),
                        keydown: t.proxy(this.keydown, this)
                    }]
                ] : this.component && this.hasInput ? this._events = [
                    [this.element.find("input"), {
                        focus: t.proxy(this.show, this),
                        keyup: t.proxy(function(e) {
                            t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1 && this.update()
                        }, this),
                        keydown: t.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: t.proxy(this.show, this)
                    }]
                ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                    [this.element, {
                        click: t.proxy(this.show, this)
                    }]
                ], this._events.push([this.element, "*", {
                    blur: t.proxy(function(t) {
                        this._focused_from = t.target
                    }, this)
                }], [this.element, {
                    blur: t.proxy(function(t) {
                        this._focused_from = t.target
                    }, this)
                }]), this._secondaryEvents = [
                    [this.picker, {
                        click: t.proxy(this.click, this)
                    }],
                    [t(window), {
                        resize: t.proxy(this.place, this)
                    }],
                    [t(document), {
                        "mousedown touchstart": t.proxy(function(t) {
                            this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                        }, this)
                    }]
                ]
            },
            _attachEvents: function() {
                this._detachEvents(), this._applyEvents(this._events)
            },
            _detachEvents: function() {
                this._unapplyEvents(this._events)
            },
            _attachSecondaryEvents: function() {
                this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
            },
            _detachSecondaryEvents: function() {
                this._unapplyEvents(this._secondaryEvents)
            },
            _trigger: function(e, i) {
                var n = i || this.dates.get(-1),
                    s = this._utc_to_local(n);
                this.element.trigger({
                    type: e,
                    date: s,
                    dates: t.map(this.dates, this._utc_to_local),
                    format: t.proxy(function(t, e) {
                        0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                        var i = this.dates.get(t);
                        return m.formatDate(i, e, this.o.language)
                    }, this)
                })
            },
            show: function() {
                this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), this._attachSecondaryEvents(), this._trigger("show")
            },
            hide: function() {
                this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
            },
            remove: function() {
                this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
            },
            _utc_to_local: function(t) {
                return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
            },
            _local_to_utc: function(t) {
                return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
            },
            _zero_time: function(t) {
                return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
            },
            _zero_utc_time: function(t) {
                return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
            },
            getDates: function() {
                return t.map(this.dates, this._utc_to_local)
            },
            getUTCDates: function() {
                return t.map(this.dates, function(t) {
                    return new Date(t)
                })
            },
            getDate: function() {
                return this._utc_to_local(this.getUTCDate())
            },
            getUTCDate: function() {
                return new Date(this.dates.get(-1))
            },
            setDates: function() {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                this.update.apply(this, e), this._trigger("changeDate"), this.setValue()
            },
            setUTCDates: function() {
                var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
                this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue()
            },
            setDate: s("setDates"),
            setUTCDate: s("setUTCDates"),
            setValue: function() {
                var t = this.getFormattedDate();
                this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change()
            },
            getFormattedDate: function(i) {
                i === e && (i = this.o.format);
                var n = this.o.language;
                return t.map(this.dates, function(t) {
                    return m.formatDate(t, i, n)
                }).join(this.o.multidateSeparator)
            },
            setStartDate: function(t) {
                this._process_options({
                    startDate: t
                }), this.update(), this.updateNavArrows()
            },
            setEndDate: function(t) {
                this._process_options({
                    endDate: t
                }), this.update(), this.updateNavArrows()
            },
            setDaysOfWeekDisabled: function(t) {
                this._process_options({
                    daysOfWeekDisabled: t
                }), this.update(), this.updateNavArrows()
            },
            place: function() {
                if (!this.isInline) {
                    var e = this.picker.outerWidth(),
                        i = this.picker.outerHeight(),
                        n = 10,
                        s = a.width(),
                        o = a.height(),
                        r = a.scrollTop(),
                        l = parseInt(this.element.parents().filter(function() {
                            return "auto" !== t(this).css("z-index")
                        }).first().css("z-index")) + 10,
                        c = this.component ? this.component.parent().offset() : this.element.offset(),
                        h = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                        u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                        d = c.left,
                        p = c.top;
                    this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (d -= e - u)) : (this.picker.addClass("datepicker-orient-left"), c.left < 0 ? d -= c.left - n : c.left + e > s && (d = s - e - n));
                    var f, m, g = this.o.orientation.y;
                    "auto" === g && (f = -r + c.top - i, m = r + o - (c.top + h + i), g = Math.max(f, m) === m ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + g), "top" === g ? p += h : p -= i + parseInt(this.picker.css("padding-top")), this.picker.css({
                        top: p,
                        left: d,
                        zIndex: l
                    })
                }
            },
            _allow_update: !0,
            update: function() {
                if (this._allow_update) {
                    var e = this.dates.copy(),
                        i = [],
                        n = !1;
                    arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                        e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
                    }, this)), n = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
                        return m.parseDate(t, this.o.format, this.o.language)
                    }, this)), i = t.grep(i, t.proxy(function(t) {
                        return t < this.o.startDate || t > this.o.endDate || !t
                    }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), n ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill()
                }
            },
            fillDow: function() {
                var t = this.o.weekStart,
                    e = "<tr>";
                if (this.o.calendarWeeks) {
                    var i = '<th class="cw">&nbsp;</th>';
                    e += i, this.picker.find(".datepicker-days thead tr:first-child").prepend(i)
                }
                for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + f[this.o.language].daysMin[t++ % 7] + "</th>";
                e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
            },
            fillMonths: function() {
                for (var t = "", e = 0; e < 12;) t += '<span class="month">' + f[this.o.language].monthsShort[e++] + "</span>";
                this.picker.find(".datepicker-months td").html(t)
            },
            setRange: function(e) {
                e && e.length ? this.range = t.map(e, function(t) {
                    return t.valueOf()
                }) : delete this.range, this.fill()
            },
            getClassNames: function(e) {
                var i = [],
                    n = this.viewDate.getUTCFullYear(),
                    s = this.viewDate.getUTCMonth(),
                    o = new Date;
                return e.getUTCFullYear() < n || e.getUTCFullYear() === n && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > n || e.getUTCFullYear() === n && e.getUTCMonth() > s) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === o.getFullYear() && e.getUTCMonth() === o.getMonth() && e.getUTCDate() === o.getDate() && i.push("today"), this.dates.contains(e) !== -1 && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) && i.push("disabled"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), t.inArray(e.valueOf(), this.range) !== -1 && i.push("selected")), i
            },
            fill: function() {
                var n, s = new Date(this.viewDate),
                    o = s.getUTCFullYear(),
                    r = s.getUTCMonth(),
                    a = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
                    l = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
                    c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                    h = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                    u = f[this.o.language].today || f.en.today || "",
                    d = f[this.o.language].clear || f.en.clear || "";
                this.picker.find(".datepicker-days thead th.datepicker-switch").text(f[this.o.language].months[r] + " " + o), this.picker.find("tfoot th.today").text(u).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(d).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var p = i(o, r - 1, 28),
                    g = m.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
                p.setUTCDate(g), p.setUTCDate(g - (p.getUTCDay() - this.o.weekStart + 7) % 7);
                var v = new Date(p);
                v.setUTCDate(v.getUTCDate() + 42), v = v.valueOf();
                for (var y, b = []; p.valueOf() < v;) {
                    if (p.getUTCDay() === this.o.weekStart && (b.push("<tr>"), this.o.calendarWeeks)) {
                        var w = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                            C = new Date(Number(w) + (11 - w.getUTCDay()) % 7 * 864e5),
                            x = new Date(Number(x = i(C.getUTCFullYear(), 0, 1)) + (11 - x.getUTCDay()) % 7 * 864e5),
                            _ = (C - x) / 864e5 / 7 + 1;
                        b.push('<td class="cw">' + _ + "</td>")
                    }
                    if (y = this.getClassNames(p), y.push("day"), this.o.beforeShowDay !== t.noop) {
                        var S = this.o.beforeShowDay(this._utc_to_local(p));
                        S === e ? S = {} : "boolean" == typeof S ? S = {
                            enabled: S
                        } : "string" == typeof S && (S = {
                            classes: S
                        }), S.enabled === !1 && y.push("disabled"), S.classes && (y = y.concat(S.classes.split(/\s+/))), S.tooltip && (n = S.tooltip)
                    }
                    y = t.unique(y), b.push('<td class="' + y.join(" ") + '"' + (n ? ' title="' + n + '"' : "") + ">" + p.getUTCDate() + "</td>"), p.getUTCDay() === this.o.weekEnd && b.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(b.join(""));
                var k = this.picker.find(".datepicker-months").find("th:eq(1)").text(o).end().find("span").removeClass("active");
                t.each(this.dates, function(t, e) {
                    e.getUTCFullYear() === o && k.eq(e.getUTCMonth()).addClass("active")
                }), (o < a || o > c) && k.addClass("disabled"), o === a && k.slice(0, l).addClass("disabled"), o === c && k.slice(h + 1).addClass("disabled"), b = "", o = 10 * parseInt(o / 10, 10);
                var T = this.picker.find(".datepicker-years").find("th:eq(1)").text(o + "-" + (o + 9)).end().find("td");
                o -= 1;
                for (var E, D = t.map(this.dates, function(t) {
                        return t.getUTCFullYear()
                    }), P = -1; P < 11; P++) E = ["year"], P === -1 ? E.push("old") : 10 === P && E.push("new"), t.inArray(o, D) !== -1 && E.push("active"), (o < a || o > c) && E.push("disabled"), b += '<span class="' + E.join(" ") + '">' + o + "</span>", o += 1;
                T.html(b)
            },
            updateNavArrows: function() {
                if (this._allow_update) {
                    var t = new Date(this.viewDate),
                        e = t.getUTCFullYear(),
                        i = t.getUTCMonth();
                    switch (this.viewMode) {
                        case 0:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                                visibility: "hidden"
                            }) : this.picker.find(".prev").css({
                                visibility: "visible"
                            }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                                visibility: "hidden"
                            }) : this.picker.find(".next").css({
                                visibility: "visible"
                            });
                            break;
                        case 1:
                        case 2:
                            this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                                visibility: "hidden"
                            }) : this.picker.find(".prev").css({
                                visibility: "visible"
                            }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                                visibility: "hidden"
                            }) : this.picker.find(".next").css({
                                visibility: "visible"
                            })
                    }
                }
            },
            click: function(e) {
                e.preventDefault();
                var n, s, o, r = t(e.target).closest("span, td, th");
                if (1 === r.length) switch (r[0].nodeName.toLowerCase()) {
                    case "th":
                        switch (r[0].className) {
                            case "datepicker-switch":
                                this.showMode(1);
                                break;
                            case "prev":
                            case "next":
                                var a = m.modes[this.viewMode].navStep * ("prev" === r[0].className ? -1 : 1);
                                switch (this.viewMode) {
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, a), this._trigger("changeMonth", this.viewDate);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, a), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                                }
                                this.fill();
                                break;
                            case "today":
                                var l = new Date;
                                l = i(l.getFullYear(), l.getMonth(), l.getDate(), 0, 0, 0), this.showMode(-2);
                                var c = "linked" === this.o.todayBtn ? null : "view";
                                this._setDate(l, c);
                                break;
                            case "clear":
                                var h;
                                this.isInput ? h = this.element : this.component && (h = this.element.find("input")), h && h.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
                        }
                        break;
                    case "span":
                        r.is(".disabled") || (this.viewDate.setUTCDate(1), r.is(".month") ? (o = 1, s = r.parent().find("span").index(r), n = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(n, s, o))) : (o = 1, s = 0, n = parseInt(r.text(), 10) || 0, this.viewDate.setUTCFullYear(n), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(n, s, o))), this.showMode(-1), this.fill());
                        break;
                    case "td":
                        r.is(".day") && !r.is(".disabled") && (o = parseInt(r.text(), 10) || 1, n = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), r.is(".old") ? 0 === s ? (s = 11, n -= 1) : s -= 1 : r.is(".new") && (11 === s ? (s = 0, n += 1) : s += 1), this._setDate(i(n, s, o)))
                }
                this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from;
            },
            _toggle_multidate: function(t) {
                var e = this.dates.contains(t);
                if (t ? e !== -1 ? this.dates.remove(e) : this.dates.push(t) : this.dates.clear(), "number" == typeof this.o.multidate)
                    for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
            },
            _setDate: function(t, e) {
                e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), this._trigger("changeDate");
                var i;
                this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
            },
            moveMonth: function(t, i) {
                if (!t) return e;
                if (!i) return t;
                var n, s, o = new Date(t.valueOf()),
                    r = o.getUTCDate(),
                    a = o.getUTCMonth(),
                    l = Math.abs(i);
                if (i = i > 0 ? 1 : -1, 1 === l) s = i === -1 ? function() {
                    return o.getUTCMonth() === a
                } : function() {
                    return o.getUTCMonth() !== n
                }, n = a + i, o.setUTCMonth(n), (n < 0 || n > 11) && (n = (n + 12) % 12);
                else {
                    for (var c = 0; c < l; c++) o = this.moveMonth(o, i);
                    n = o.getUTCMonth(), o.setUTCDate(r), s = function() {
                        return n !== o.getUTCMonth()
                    }
                }
                for (; s();) o.setUTCDate(--r), o.setUTCMonth(n);
                return o
            },
            moveYear: function(t, e) {
                return this.moveMonth(t, 12 * e)
            },
            dateWithinRange: function(t) {
                return t >= this.o.startDate && t <= this.o.endDate
            },
            keydown: function(t) {
                if (this.picker.is(":not(:visible)")) return void(27 === t.keyCode && this.show());
                var e, i, s, o = !1,
                    r = this.focusDate || this.viewDate;
                switch (t.keyCode) {
                    case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
                        break;
                    case 37:
                    case 39:
                        if (!this.o.keyboardNavigation) break;
                        e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), s = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), s = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), i.setUTCDate(i.getUTCDate() + e), s = new Date(r), s.setUTCDate(r.getUTCDate() + e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                        break;
                    case 38:
                    case 40:
                        if (!this.o.keyboardNavigation) break;
                        e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || n(), e), s = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || n(), e), s = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || n()), i.setUTCDate(i.getUTCDate() + 7 * e), s = new Date(r), s.setUTCDate(r.getUTCDate() + 7 * e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                        break;
                    case 32:
                        break;
                    case 13:
                        r = this.focusDate || this.dates.get(-1) || this.viewDate, this._toggle_multidate(r), o = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), this.o.autoclose && this.hide());
                        break;
                    case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                }
                if (o) {
                    this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                    var a;
                    this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.change()
                }
            },
            showMode: function(t) {
                t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + m.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
            }
        };
        var h = function(e, i) {
            this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
                return t.jquery ? t[0] : t
            }), delete i.inputs, t(this.inputs).datepicker(i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
                return t(e).data("datepicker")
            }), this.updateDates()
        };
        h.prototype = {
            updateDates: function() {
                this.dates = t.map(this.pickers, function(t) {
                    return t.getUTCDate()
                }), this.updateRanges()
            },
            updateRanges: function() {
                var e = t.map(this.dates, function(t) {
                    return t.valueOf()
                });
                t.each(this.pickers, function(t, i) {
                    i.setRange(e)
                })
            },
            dateUpdated: function(e) {
                if (!this.updating) {
                    this.updating = !0;
                    var i = t(e.target).data("datepicker"),
                        n = i.getUTCDate(),
                        s = t.inArray(e.target, this.inputs),
                        o = this.inputs.length;
                    if (s !== -1) {
                        if (t.each(this.pickers, function(t, e) {
                                e.getUTCDate() || e.setUTCDate(n)
                            }), n < this.dates[s])
                            for (; s >= 0 && n < this.dates[s];) this.pickers[s--].setUTCDate(n);
                        else if (n > this.dates[s])
                            for (; s < o && n > this.dates[s];) this.pickers[s++].setUTCDate(n);
                        this.updateDates(), delete this.updating
                    }
                }
            },
            remove: function() {
                t.map(this.pickers, function(t) {
                    t.remove()
                }), delete this.element.data().datepicker
            }
        };
        var u = t.fn.datepicker;
        t.fn.datepicker = function(i) {
            var n = Array.apply(null, arguments);
            n.shift();
            var s;
            return this.each(function() {
                var a = t(this),
                    l = a.data("datepicker"),
                    u = "object" == typeof i && i;
                if (!l) {
                    var p = o(this, "date"),
                        f = t.extend({}, d, p, u),
                        m = r(f.language),
                        g = t.extend({}, d, m, p, u);
                    if (a.is(".input-daterange") || g.inputs) {
                        var v = {
                            inputs: g.inputs || a.find("input").toArray()
                        };
                        a.data("datepicker", l = new h(this, t.extend(g, v)))
                    } else a.data("datepicker", l = new c(this, g))
                }
                if ("string" == typeof i && "function" == typeof l[i] && (s = l[i].apply(l, n), s !== e)) return !1
            }), s !== e ? s : this
        };
        var d = t.fn.datepicker.defaults = {
                autoclose: !1,
                beforeShowDay: t.noop,
                calendarWeeks: !1,
                clearBtn: !1,
                daysOfWeekDisabled: [],
                endDate: 1 / 0,
                forceParse: !0,
                format: "mm/dd/yyyy",
                keyboardNavigation: !0,
                language: "en",
                minViewMode: 0,
                multidate: !1,
                multidateSeparator: ",",
                orientation: "auto",
                rtl: !1,
                startDate: -(1 / 0),
                startView: 0,
                todayBtn: !1,
                todayHighlight: !1,
                weekStart: 0
            },
            p = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
        t.fn.datepicker.Constructor = c;
        var f = t.fn.datepicker.dates = {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    today: "Today",
                    clear: "Clear"
                }
            },
            m = {
                modes: [{
                    clsName: "days",
                    navFnc: "Month",
                    navStep: 1
                }, {
                    clsName: "months",
                    navFnc: "FullYear",
                    navStep: 1
                }, {
                    clsName: "years",
                    navFnc: "FullYear",
                    navStep: 10
                }],
                isLeapYear: function(t) {
                    return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
                },
                getDaysInMonth: function(t, e) {
                    return [31, m.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
                },
                validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
                nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
                parseFormat: function(t) {
                    var e = t.replace(this.validParts, "\0").split("\0"),
                        i = t.match(this.validParts);
                    if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                    return {
                        separators: e,
                        parts: i
                    }
                },
                parseDate: function(n, s, o) {
                    function r() {
                        var t = this.slice(0, d[h].length),
                            e = d[h].slice(0, t.length);
                        return t === e
                    }
                    if (!n) return e;
                    if (n instanceof Date) return n;
                    "string" == typeof s && (s = m.parseFormat(s));
                    var a, l, h, u = /([\-+]\d+)([dmwy])/,
                        d = n.match(/([\-+]\d+)([dmwy])/g);
                    if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(n)) {
                        for (n = new Date, h = 0; h < d.length; h++) switch (a = u.exec(d[h]), l = parseInt(a[1]), a[2]) {
                            case "d":
                                n.setUTCDate(n.getUTCDate() + l);
                                break;
                            case "m":
                                n = c.prototype.moveMonth.call(c.prototype, n, l);
                                break;
                            case "w":
                                n.setUTCDate(n.getUTCDate() + 7 * l);
                                break;
                            case "y":
                                n = c.prototype.moveYear.call(c.prototype, n, l)
                        }
                        return i(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 0, 0, 0)
                    }
                    d = n && n.match(this.nonpunctuation) || [], n = new Date;
                    var p, g, v = {},
                        y = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                        b = {
                            yyyy: function(t, e) {
                                return t.setUTCFullYear(e)
                            },
                            yy: function(t, e) {
                                return t.setUTCFullYear(2e3 + e)
                            },
                            m: function(t, e) {
                                if (isNaN(t)) return t;
                                for (e -= 1; e < 0;) e += 12;
                                for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                                return t
                            },
                            d: function(t, e) {
                                return t.setUTCDate(e)
                            }
                        };
                    b.M = b.MM = b.mm = b.m, b.dd = b.d, n = i(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
                    var w = s.parts.slice();
                    if (d.length !== w.length && (w = t(w).filter(function(e, i) {
                            return t.inArray(i, y) !== -1
                        }).toArray()), d.length === w.length) {
                        var C;
                        for (h = 0, C = w.length; h < C; h++) {
                            if (p = parseInt(d[h], 10), a = w[h], isNaN(p)) switch (a) {
                                case "MM":
                                    g = t(f[o].months).filter(r), p = t.inArray(g[0], f[o].months) + 1;
                                    break;
                                case "M":
                                    g = t(f[o].monthsShort).filter(r), p = t.inArray(g[0], f[o].monthsShort) + 1
                            }
                            v[a] = p
                        }
                        var x, _;
                        for (h = 0; h < y.length; h++) _ = y[h], _ in v && !isNaN(v[_]) && (x = new Date(n), b[_](x, v[_]), isNaN(x) || (n = x))
                    }
                    return n
                },
                formatDate: function(e, i, n) {
                    if (!e) return "";
                    "string" == typeof i && (i = m.parseFormat(i));
                    var s = {
                        d: e.getUTCDate(),
                        D: f[n].daysShort[e.getUTCDay()],
                        DD: f[n].days[e.getUTCDay()],
                        m: e.getUTCMonth() + 1,
                        M: f[n].monthsShort[e.getUTCMonth()],
                        MM: f[n].months[e.getUTCMonth()],
                        yy: e.getUTCFullYear().toString().substring(2),
                        yyyy: e.getUTCFullYear()
                    };
                    s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
                    for (var o = t.extend([], i.separators), r = 0, a = i.parts.length; r <= a; r++) o.length && e.push(o.shift()), e.push(s[i.parts[r]]);
                    return e.join("")
                },
                headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
                contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
                footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
            };
        m.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + m.headTemplate + "<tbody></tbody>" + m.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + m.headTemplate + m.contTemplate + m.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = m, t.fn.datepicker.noConflict = function() {
            return t.fn.datepicker = u, this
        }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
            var i = t(this);
            i.data("datepicker") || (e.preventDefault(), i.datepicker("show"))
        }), t(function() {
            t('[data-provide="datepicker-inline"]').datepicker()
        })
    }(window.jQuery), ! function(t, e, i) {
        "use strict";
        var n = function(e, i) {
            this.widget = "", this.$element = t(e), this.defaultTime = i.defaultTime, this.disableFocus = i.disableFocus, this.disableMousewheel = i.disableMousewheel, this.isOpen = i.isOpen, this.minuteStep = i.minuteStep, this.modalBackdrop = i.modalBackdrop, this.orientation = i.orientation, this.secondStep = i.secondStep, this.showInputs = i.showInputs, this.showMeridian = i.showMeridian, this.showSeconds = i.showSeconds, this.template = i.template, this.appendWidgetTo = i.appendWidgetTo, this.showWidgetOnAddonClick = i.showWidgetOnAddonClick, this._init()
        };
        n.prototype = {
            constructor: n,
            _init: function() {
                var e = this;
                this.showWidgetOnAddonClick && (this.$element.parent().hasClass("input-group") || this.$element.parent().hasClass("input-prepend")) ? (this.$element.parent(".input-group, .input-prepend").find(".input-group-addon").on({
                    "click.timepicker": t.proxy(this.showWidget, this)
                }), this.$element.on({
                    "focus.timepicker": t.proxy(this.highlightUnit, this),
                    "click.timepicker": t.proxy(this.highlightUnit, this),
                    "keydown.timepicker": t.proxy(this.elementKeydown, this),
                    "blur.timepicker": t.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": t.proxy(this.mousewheel, this)
                })) : this.$element.on(this.template ? {
                    "focus.timepicker": t.proxy(this.showWidget, this),
                    "click.timepicker": t.proxy(this.showWidget, this),
                    "blur.timepicker": t.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": t.proxy(this.mousewheel, this)
                } : {
                    "focus.timepicker": t.proxy(this.highlightUnit, this),
                    "click.timepicker": t.proxy(this.highlightUnit, this),
                    "keydown.timepicker": t.proxy(this.elementKeydown, this),
                    "blur.timepicker": t.proxy(this.blurElement, this),
                    "mousewheel.timepicker DOMMouseScroll.timepicker": t.proxy(this.mousewheel, this)
                }), this.$widget = this.template !== !1 && t(this.getTemplate()).on("click", t.proxy(this.widgetClick, this)), this.showInputs && this.$widget !== !1 && this.$widget.find("input").each(function() {
                    t(this).on({
                        "click.timepicker": function() {
                            t(this).select()
                        },
                        "keydown.timepicker": t.proxy(e.widgetKeydown, e),
                        "keyup.timepicker": t.proxy(e.widgetKeyup, e)
                    })
                }), this.setDefaultTime(this.defaultTime)
            },
            blurElement: function() {
                this.highlightedUnit = null, this.updateFromElementVal()
            },
            clear: function() {
                this.hour = "", this.minute = "", this.second = "", this.meridian = "", this.$element.val("")
            },
            decrementHour: function() {
                if (this.showMeridian)
                    if (1 === this.hour) this.hour = 12;
                    else {
                        if (12 === this.hour) return this.hour--, this.toggleMeridian();
                        if (0 === this.hour) return this.hour = 11, this.toggleMeridian();
                        this.hour--
                    }
                else this.hour <= 0 ? this.hour = 23 : this.hour--
            },
            decrementMinute: function(t) {
                var e;
                e = t ? this.minute - t : this.minute - this.minuteStep, 0 > e ? (this.decrementHour(), this.minute = e + 60) : this.minute = e
            },
            decrementSecond: function() {
                var t = this.second - this.secondStep;
                0 > t ? (this.decrementMinute(!0), this.second = t + 60) : this.second = t
            },
            elementKeydown: function(t) {
                switch (t.keyCode) {
                    case 9:
                    case 27:
                        this.updateFromElementVal();
                        break;
                    case 37:
                        t.preventDefault(), this.highlightPrevUnit();
                        break;
                    case 38:
                        switch (t.preventDefault(), this.highlightedUnit) {
                            case "hour":
                                this.incrementHour(), this.highlightHour();
                                break;
                            case "minute":
                                this.incrementMinute(), this.highlightMinute();
                                break;
                            case "second":
                                this.incrementSecond(), this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian(), this.highlightMeridian()
                        }
                        this.update();
                        break;
                    case 39:
                        t.preventDefault(), this.highlightNextUnit();
                        break;
                    case 40:
                        switch (t.preventDefault(), this.highlightedUnit) {
                            case "hour":
                                this.decrementHour(), this.highlightHour();
                                break;
                            case "minute":
                                this.decrementMinute(), this.highlightMinute();
                                break;
                            case "second":
                                this.decrementSecond(), this.highlightSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian(), this.highlightMeridian()
                        }
                        this.update()
                }
            },
            getCursorPosition: function() {
                var t = this.$element.get(0);
                if ("selectionStart" in t) return t.selectionStart;
                if (i.selection) {
                    t.focus();
                    var e = i.selection.createRange(),
                        n = i.selection.createRange().text.length;
                    return e.moveStart("character", -t.value.length), e.text.length - n
                }
            },
            getTemplate: function() {
                var t, e, i, n, s, o;
                switch (this.showInputs ? (e = '<input type="text" class="bootstrap-timepicker-hour form-control" maxlength="2"/>', i = '<input type="text" class="bootstrap-timepicker-minute form-control" maxlength="2"/>', n = '<input type="text" class="bootstrap-timepicker-second form-control" maxlength="2"/>', s = '<input type="text" class="bootstrap-timepicker-meridian form-control" maxlength="2"/>') : (e = '<span class="bootstrap-timepicker-hour"></span>', i = '<span class="bootstrap-timepicker-minute"></span>', n = '<span class="bootstrap-timepicker-second"></span>', s = '<span class="bootstrap-timepicker-meridian"></span>'), o = '<table><tr><td><a href="#" data-action="incrementHour"><i class="glyphicon glyphicon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-up"></i></a></td>' : "") + "</tr><tr><td>" + e + '</td> <td class="separator">:</td><td>' + i + "</td> " + (this.showSeconds ? '<td class="separator">:</td><td>' + n + "</td>" : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td>' + s + "</td>" : "") + '</tr><tr><td><a href="#" data-action="decrementHour"><i class="glyphicon glyphicon-chevron-down"></i></a></td><td class="separator"></td><td><a href="#" data-action="decrementMinute"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-down"></i></a></td>' : "") + "</tr></table>", this.template) {
                    case "modal":
                        t = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '"><div class="modal-header"><a href="#" class="close" data-dismiss="modal">\xd7</a><h3>Pick a Time</h3></div><div class="modal-content">' + o + '</div><div class="modal-footer"><a href="#" class="btn btn-primary" data-dismiss="modal">OK</a></div></div>';
                        break;
                    case "dropdown":
                        t = '<div class="bootstrap-timepicker-widget dropdown-menu">' + o + "</div>"
                }
                return t
            },
            getTime: function() {
                return "" === this.hour ? "" : this.hour + ":" + (1 === this.minute.toString().length ? "0" + this.minute : this.minute) + (this.showSeconds ? ":" + (1 === this.second.toString().length ? "0" + this.second : this.second) : "") + (this.showMeridian ? " " + this.meridian : "")
            },
            hideWidget: function() {
                this.isOpen !== !1 && (this.$element.trigger({
                    type: "hide.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                }), "modal" === this.template && this.$widget.modal ? this.$widget.modal("hide") : this.$widget.removeClass("open"), t(i).off("mousedown.timepicker, touchend.timepicker"), this.isOpen = !1, this.$widget.detach())
            },
            highlightUnit: function() {
                this.position = this.getCursorPosition(), this.position >= 0 && this.position <= 2 ? this.highlightHour() : this.position >= 3 && this.position <= 5 ? this.highlightMinute() : this.position >= 6 && this.position <= 8 ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : this.position >= 9 && this.position <= 11 && this.highlightMeridian()
            },
            highlightNextUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.highlightMinute();
                        break;
                    case "minute":
                        this.showSeconds ? this.highlightSecond() : this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "second":
                        this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                        break;
                    case "meridian":
                        this.highlightHour()
                }
            },
            highlightPrevUnit: function() {
                switch (this.highlightedUnit) {
                    case "hour":
                        this.showMeridian ? this.highlightMeridian() : this.showSeconds ? this.highlightSecond() : this.highlightMinute();
                        break;
                    case "minute":
                        this.highlightHour();
                        break;
                    case "second":
                        this.highlightMinute();
                        break;
                    case "meridian":
                        this.showSeconds ? this.highlightSecond() : this.highlightMinute()
                }
            },
            highlightHour: function() {
                var t = this.$element.get(0),
                    e = this;
                this.highlightedUnit = "hour", t.setSelectionRange && setTimeout(function() {
                    e.hour < 10 ? t.setSelectionRange(0, 1) : t.setSelectionRange(0, 2)
                }, 0)
            },
            highlightMinute: function() {
                var t = this.$element.get(0),
                    e = this;
                this.highlightedUnit = "minute", t.setSelectionRange && setTimeout(function() {
                    e.hour < 10 ? t.setSelectionRange(2, 4) : t.setSelectionRange(3, 5)
                }, 0)
            },
            highlightSecond: function() {
                var t = this.$element.get(0),
                    e = this;
                this.highlightedUnit = "second", t.setSelectionRange && setTimeout(function() {
                    e.hour < 10 ? t.setSelectionRange(5, 7) : t.setSelectionRange(6, 8)
                }, 0)
            },
            highlightMeridian: function() {
                var t = this.$element.get(0),
                    e = this;
                this.highlightedUnit = "meridian", t.setSelectionRange && (this.showSeconds ? setTimeout(function() {
                    e.hour < 10 ? t.setSelectionRange(8, 10) : t.setSelectionRange(9, 11)
                }, 0) : setTimeout(function() {
                    e.hour < 10 ? t.setSelectionRange(5, 7) : t.setSelectionRange(6, 8)
                }, 0))
            },
            incrementHour: function() {
                if (this.showMeridian) {
                    if (11 === this.hour) return this.hour++, this.toggleMeridian();
                    12 === this.hour && (this.hour = 0)
                }
                return 23 === this.hour ? void(this.hour = 0) : void this.hour++
            },
            incrementMinute: function(t) {
                var e;
                e = t ? this.minute + t : this.minute + this.minuteStep - this.minute % this.minuteStep, e > 59 ? (this.incrementHour(), this.minute = e - 60) : this.minute = e
            },
            incrementSecond: function() {
                var t = this.second + this.secondStep - this.second % this.secondStep;
                t > 59 ? (this.incrementMinute(!0), this.second = t - 60) : this.second = t
            },
            mousewheel: function(e) {
                if (!this.disableMousewheel) {
                    e.preventDefault(), e.stopPropagation();
                    var i = e.originalEvent.wheelDelta || -e.originalEvent.detail,
                        n = null;
                    switch ("mousewheel" === e.type ? n = -1 * e.originalEvent.wheelDelta : "DOMMouseScroll" === e.type && (n = 40 * e.originalEvent.detail), n && (e.preventDefault(), t(this).scrollTop(n + t(this).scrollTop())), this.highlightedUnit) {
                        case "minute":
                            i > 0 ? this.incrementMinute() : this.decrementMinute(), this.highlightMinute();
                            break;
                        case "second":
                            i > 0 ? this.incrementSecond() : this.decrementSecond(), this.highlightSecond();
                            break;
                        case "meridian":
                            this.toggleMeridian(), this.highlightMeridian();
                            break;
                        default:
                            i > 0 ? this.incrementHour() : this.decrementHour(), this.highlightHour()
                    }
                    return !1
                }
            },
            place: function() {
                if (!this.isInline) {
                    var i = this.$widget.outerWidth(),
                        n = this.$widget.outerHeight(),
                        s = 10,
                        o = t(e).width(),
                        r = t(e).height(),
                        a = t(e).scrollTop(),
                        l = parseInt(this.$element.parents().filter(function() {}).first().css("z-index"), 10) + 10,
                        c = this.component ? this.component.parent().offset() : this.$element.offset(),
                        h = this.component ? this.component.outerHeight(!0) : this.$element.outerHeight(!1),
                        u = this.component ? this.component.outerWidth(!0) : this.$element.outerWidth(!1),
                        d = c.left,
                        p = c.top;
                    this.$widget.removeClass("timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left"), "auto" !== this.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.orientation.x), "right" === this.orientation.x && (d -= i - u)) : (this.$widget.addClass("timepicker-orient-left"), c.left < 0 ? d -= c.left - s : c.left + i > o && (d = o - i - s));
                    var f, m, g = this.orientation.y;
                    "auto" === g && (f = -a + c.top - n, m = a + r - (c.top + h + n), g = Math.max(f, m) === m ? "top" : "bottom"), this.$widget.addClass("timepicker-orient-" + g), "top" === g ? p += h : p -= n + parseInt(this.$widget.css("padding-top"), 10), this.$widget.css({
                        top: p,
                        left: d,
                        zIndex: l
                    })
                }
            },
            remove: function() {
                t("document").off(".timepicker"), this.$widget && this.$widget.remove(), delete this.$element.data().timepicker
            },
            setDefaultTime: function(t) {
                if (this.$element.val()) this.updateFromElementVal();
                else if ("current" === t) {
                    var e = new Date,
                        i = e.getHours(),
                        n = e.getMinutes(),
                        s = e.getSeconds(),
                        o = "AM";
                    0 !== s && (s = Math.ceil(e.getSeconds() / this.secondStep) * this.secondStep, 60 === s && (n += 1, s = 0)), 0 !== n && (n = Math.ceil(e.getMinutes() / this.minuteStep) * this.minuteStep, 60 === n && (i += 1, n = 0)), this.showMeridian && (0 === i ? i = 12 : i >= 12 ? (i > 12 && (i -= 12), o = "PM") : o = "AM"), this.hour = i, this.minute = n, this.second = s, this.meridian = o, this.update()
                } else t === !1 ? (this.hour = 0, this.minute = 0, this.second = 0, this.meridian = "AM") : this.setTime(t)
            },
            setTime: function(t, e) {
                if (!t) return void this.clear();
                var i, n, s, o, r;
                "object" == typeof t && t.getMonth ? (n = t.getHours(), s = t.getMinutes(), o = t.getSeconds(), this.showMeridian && (r = "AM", n > 12 && (r = "PM", n %= 12), 12 === n && (r = "PM"))) : (r = null !== t.match(/p/i) ? "PM" : "AM", t = t.replace(/[^0-9\:]/g, ""), i = t.split(":"), n = i[0] ? i[0].toString() : i.toString(), s = i[1] ? i[1].toString() : "", o = i[2] ? i[2].toString() : "", n.length > 4 && (o = n.substr(4, 2)), n.length > 2 && (s = n.substr(2, 2), n = n.substr(0, 2)), s.length > 2 && (o = s.substr(2, 2), s = s.substr(0, 2)), o.length > 2 && (o = o.substr(2, 2)), n = parseInt(n, 10), s = parseInt(s, 10), o = parseInt(o, 10), isNaN(n) && (n = 0), isNaN(s) && (s = 0), isNaN(o) && (o = 0), this.showMeridian ? 1 > n ? n = 1 : n > 12 && (n = 12) : (n >= 24 ? n = 23 : 0 > n && (n = 0), 13 > n && "PM" === r && (n += 12)), 0 > s ? s = 0 : s >= 60 && (s = 59), this.showSeconds && (isNaN(o) ? o = 0 : 0 > o ? o = 0 : o >= 60 && (o = 59))), this.hour = n, this.minute = s, this.second = o, this.meridian = r, this.update(e)
            },
            showWidget: function() {
                if (!this.isOpen && !this.$element.is(":disabled")) {
                    this.$widget.appendTo(this.appendWidgetTo);
                    var e = this;
                    t(i).on("mousedown.timepicker, touchend.timepicker", function(t) {
                        e.$element.parent().find(t.target).length || e.$widget.is(t.target) || e.$widget.find(t.target).length || e.hideWidget()
                    }), this.$element.trigger({
                        type: "show.timepicker",
                        time: {
                            value: this.getTime(),
                            hours: this.hour,
                            minutes: this.minute,
                            seconds: this.second,
                            meridian: this.meridian
                        }
                    }), this.place(), this.disableFocus && this.$element.blur(), "" === this.hour && (this.defaultTime ? this.setDefaultTime(this.defaultTime) : this.setTime("0:0:0")), "modal" === this.template && this.$widget.modal ? this.$widget.modal("show").on("hidden", t.proxy(this.hideWidget, this)) : this.isOpen === !1 && this.$widget.addClass("open"), this.isOpen = !0
                }
            },
            toggleMeridian: function() {
                this.meridian = "AM" === this.meridian ? "PM" : "AM"
            },
            update: function(t) {
                this.updateElement(), t || this.updateWidget(), this.$element.trigger({
                    type: "changeTime.timepicker",
                    time: {
                        value: this.getTime(),
                        hours: this.hour,
                        minutes: this.minute,
                        seconds: this.second,
                        meridian: this.meridian
                    }
                })
            },
            updateElement: function() {
                this.$element.val(this.getTime()).change()
            },
            updateFromElementVal: function() {
                this.setTime(this.$element.val())
            },
            updateWidget: function() {
                if (this.$widget !== !1) {
                    var t = this.hour,
                        e = 1 === this.minute.toString().length ? "0" + this.minute : this.minute,
                        i = 1 === this.second.toString().length ? "0" + this.second : this.second;
                    this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(t), this.$widget.find("input.bootstrap-timepicker-minute").val(e), this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(i), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(t), this.$widget.find("span.bootstrap-timepicker-minute").text(e), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(i), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
                }
            },
            updateFromWidgetInputs: function() {
                if (this.$widget !== !1) {
                    var t = this.$widget.find("input.bootstrap-timepicker-hour").val() + ":" + this.$widget.find("input.bootstrap-timepicker-minute").val() + (this.showSeconds ? ":" + this.$widget.find("input.bootstrap-timepicker-second").val() : "") + (this.showMeridian ? this.$widget.find("input.bootstrap-timepicker-meridian").val() : "");
                    this.setTime(t, !0)
                }
            },
            widgetClick: function(e) {
                e.stopPropagation(), e.preventDefault();
                var i = t(e.target),
                    n = i.closest("a").data("action");
                n && this[n](), this.update(), i.is("input") && i.get(0).setSelectionRange(0, 2)
            },
            widgetKeydown: function(e) {
                var i = t(e.target),
                    n = i.attr("class").replace("bootstrap-timepicker-", "");
                switch (e.keyCode) {
                    case 9:
                        if (this.showMeridian && "meridian" === n || this.showSeconds && "second" === n || !this.showMeridian && !this.showSeconds && "minute" === n) return this.hideWidget();
                        break;
                    case 27:
                        this.hideWidget();
                        break;
                    case 38:
                        switch (e.preventDefault(), n) {
                            case "hour":
                                this.incrementHour();
                                break;
                            case "minute":
                                this.incrementMinute();
                                break;
                            case "second":
                                this.incrementSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian()
                        }
                        this.setTime(this.getTime()), i.get(0).setSelectionRange(0, 2);
                        break;
                    case 40:
                        switch (e.preventDefault(), n) {
                            case "hour":
                                this.decrementHour();
                                break;
                            case "minute":
                                this.decrementMinute();
                                break;
                            case "second":
                                this.decrementSecond();
                                break;
                            case "meridian":
                                this.toggleMeridian()
                        }
                        this.setTime(this.getTime()), i.get(0).setSelectionRange(0, 2)
                }
            },
            widgetKeyup: function(t) {
                (65 === t.keyCode || 77 === t.keyCode || 80 === t.keyCode || 46 === t.keyCode || 8 === t.keyCode || t.keyCode >= 46 && t.keyCode <= 57) && this.updateFromWidgetInputs()
            }
        }, t.fn.timepicker = function(e) {
            var i = Array.apply(null, arguments);
            return i.shift(), this.each(function() {
                var s = t(this),
                    o = s.data("timepicker"),
                    r = "object" == typeof e && e;
                o || s.data("timepicker", o = new n(this, t.extend({}, t.fn.timepicker.defaults, r, t(this).data()))), "string" == typeof e && o[e].apply(o, i)
            })
        }, t.fn.timepicker.defaults = {
            defaultTime: "current",
            disableFocus: !1,
            disableMousewheel: !1,
            isOpen: !1,
            minuteStep: 15,
            modalBackdrop: !1,
            orientation: {
                x: "auto",
                y: "auto"
            },
            secondStep: 15,
            showSeconds: !1,
            showInputs: !0,
            showMeridian: !0,
            template: "dropdown",
            appendWidgetTo: "body",
            showWidgetOnAddonClick: !0
        }, t.fn.timepicker.Constructor = n
    }(jQuery, window, document), ! function(t) {
        "undefined" == typeof t.fn.each2 && t.extend(t.fn, {
            each2: function(e) {
                for (var i = t([0]), n = -1, s = this.length; ++n < s && (i.context = i[0] = this[n]) && e.call(i[0], n, i) !== !1;);
                return this
            }
        })
    }(jQuery),
    function(t, e) {
        "use strict";

        function i(e) {
            var i = t(document.createTextNode(""));
            e.before(i), i.before(e), i.remove()
        }

        function n(t) {
            function e(t) {
                return F[t] || t
            }
            return t.replace(/[^\u0000-\u007E]/g, e)
        }

        function s(t, e) {
            for (var i = 0, n = e.length; n > i; i += 1)
                if (r(t, e[i])) return i;
            return -1
        }

        function o() {
            var e = t(z);
            e.appendTo("body");
            var i = {
                width: e.width() - e[0].clientWidth,
                height: e.height() - e[0].clientHeight
            };
            return e.remove(), i
        }

        function r(t, i) {
            return t === i || t !== e && i !== e && (null !== t && null !== i && (t.constructor === String ? t + "" == i + "" : i.constructor === String && i + "" == t + ""))
        }

        function a(e, i) {
            var n, s, o;
            if (null === e || e.length < 1) return [];
            for (n = e.split(i), s = 0, o = n.length; o > s; s += 1) n[s] = t.trim(n[s]);
            return n
        }

        function l(t) {
            return t.outerWidth(!1) - t.width()
        }

        function c(i) {
            var n = "keyup-change-value";
            i.on("keydown", function() {
                t.data(i, n) === e && t.data(i, n, i.val())
            }), i.on("keyup", function() {
                var s = t.data(i, n);
                s !== e && i.val() !== s && (t.removeData(i, n), i.trigger("keyup-change"))
            })
        }

        function h(i) {
            i.on("mousemove", function(i) {
                var n = H;
                (n === e || n.x !== i.pageX || n.y !== i.pageY) && t(i.target).trigger("mousemove-filtered", i)
            })
        }

        function u(t, i, n) {
            n = n || e;
            var s;
            return function() {
                var e = arguments;
                window.clearTimeout(s), s = window.setTimeout(function() {
                    i.apply(n, e)
                }, t)
            }
        }

        function d(t, e) {
            var i = u(t, function(t) {
                e.trigger("scroll-debounced", t)
            });
            e.on("scroll", function(t) {
                s(t.target, e.get()) >= 0 && i(t)
            })
        }

        function p(t) {
            t[0] !== document.activeElement && window.setTimeout(function() {
                var e, i = t[0],
                    n = t.val().length;
                t.focus();
                var s = i.offsetWidth > 0 || i.offsetHeight > 0;
                s && i === document.activeElement && (i.setSelectionRange ? i.setSelectionRange(n, n) : i.createTextRange && (e = i.createTextRange(), e.collapse(!1), e.select()))
            }, 0)
        }

        function f(e) {
            e = t(e)[0];
            var i = 0,
                n = 0;
            if ("selectionStart" in e) i = e.selectionStart, n = e.selectionEnd - i;
            else if ("selection" in document) {
                e.focus();
                var s = document.selection.createRange();
                n = document.selection.createRange().text.length, s.moveStart("character", -e.value.length), i = s.text.length - n
            }
            return {
                offset: i,
                length: n
            }
        }

        function m(t) {
            t.preventDefault(), t.stopPropagation()
        }

        function g(t) {
            t.preventDefault(), t.stopImmediatePropagation()
        }

        function v(e) {
            if (!N) {
                var i = e[0].currentStyle || window.getComputedStyle(e[0], null);
                N = t(document.createElement("div")).css({
                    position: "absolute",
                    left: "-10000px",
                    top: "-10000px",
                    display: "none",
                    fontSize: i.fontSize,
                    fontFamily: i.fontFamily,
                    fontStyle: i.fontStyle,
                    fontWeight: i.fontWeight,
                    letterSpacing: i.letterSpacing,
                    textTransform: i.textTransform,
                    whiteSpace: "nowrap"
                }), N.attr("class", "select2-sizer"), t("body").append(N)
            }
            return N.text(e.val()), N.width()
        }

        function y(e, i, n) {
            var s, o, r = [];
            s = t.trim(e.attr("class")), s && (s = "" + s, t(s.split(/\s+/)).each2(function() {
                0 === this.indexOf("select2-") && r.push(this)
            })), s = t.trim(i.attr("class")), s && (s = "" + s, t(s.split(/\s+/)).each2(function() {
                0 !== this.indexOf("select2-") && (o = n(this), o && r.push(o))
            })), e.attr("class", r.join(" "))
        }

        function b(t, e, i, s) {
            var o = n(t.toUpperCase()).indexOf(n(e.toUpperCase())),
                r = e.length;
            return 0 > o ? void i.push(s(t)) : (i.push(s(t.substring(0, o))), i.push("<span class='select2-match'>"), i.push(s(t.substring(o, o + r))), i.push("</span>"), void i.push(s(t.substring(o + r, t.length))))
        }

        function w(t) {
            var e = {
                "\\": "&#92;",
                "&": "&",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#47;"
            };
            return String(t).replace(/[&<>"'\/\\]/g, function(t) {
                return e[t]
            })
        }

        function C(i) {
            var n, s = null,
                o = i.quietMillis || 100,
                r = i.url,
                a = this;
            return function(l) {
                window.clearTimeout(n), n = window.setTimeout(function() {
                    var n = i.data,
                        o = r,
                        c = i.transport || t.fn.select2.ajaxDefaults.transport,
                        h = {
                            type: i.type || "GET",
                            cache: i.cache || !1,
                            jsonpCallback: i.jsonpCallback || e,
                            dataType: i.dataType || "json"
                        },
                        u = t.extend({}, t.fn.select2.ajaxDefaults.params, h);
                    n = n ? n.call(a, l.term, l.page, l.context) : null, o = "function" == typeof o ? o.call(a, l.term, l.page, l.context) : o, s && "function" == typeof s.abort && s.abort(), i.params && (t.isFunction(i.params) ? t.extend(u, i.params.call(a)) : t.extend(u, i.params)), t.extend(u, {
                        url: o,
                        dataType: i.dataType,
                        data: n,
                        success: function(t) {
                            var e = i.results(t, l.page, l);
                            l.callback(e)
                        },
                        error: function(t, e, i) {
                            var n = {
                                hasError: !0,
                                jqXHR: t,
                                textStatus: e,
                                errorThrown: i
                            };
                            l.callback(n)
                        }
                    }), s = c.call(a, u)
                }, o)
            }
        }

        function x(e) {
            var i, n, s = e,
                o = function(t) {
                    return "" + t.text
                };
            t.isArray(s) && (n = s, s = {
                results: n
            }), t.isFunction(s) === !1 && (n = s, s = function() {
                return n
            });
            var r = s();
            return r.text && (o = r.text, t.isFunction(o) || (i = r.text, o = function(t) {
                    return t[i]
                })),
                function(e) {
                    var i, n = e.term,
                        r = {
                            results: []
                        };
                    return "" === n ? void e.callback(s()) : (i = function(s, r) {
                        var a, l;
                        if (s = s[0], s.children) {
                            a = {};
                            for (l in s) s.hasOwnProperty(l) && (a[l] = s[l]);
                            a.children = [], t(s.children).each2(function(t, e) {
                                i(e, a.children)
                            }), (a.children.length || e.matcher(n, o(a), s)) && r.push(a)
                        } else e.matcher(n, o(s), s) && r.push(s)
                    }, t(s().results).each2(function(t, e) {
                        i(e, r.results)
                    }), void e.callback(r))
                }
        }

        function _(i) {
            var n = t.isFunction(i);
            return function(s) {
                var o = s.term,
                    r = {
                        results: []
                    },
                    a = n ? i(s) : i;
                t.isArray(a) && (t(a).each(function() {
                    var t = this.text !== e,
                        i = t ? this.text : this;
                    ("" === o || s.matcher(o, i)) && r.results.push(t ? this : {
                        id: this,
                        text: this
                    })
                }), s.callback(r))
            }
        }

        function S(e, i) {
            if (t.isFunction(e)) return !0;
            if (!e) return !1;
            if ("string" == typeof e) return !0;
            throw new Error(i + " must be a string, function, or falsy value")
        }

        function k(e, i) {
            if (t.isFunction(e)) {
                var n = Array.prototype.slice.call(arguments, 2);
                return e.apply(i, n)
            }
            return e
        }

        function T(e) {
            var i = 0;
            return t.each(e, function(t, e) {
                e.children ? i += T(e.children) : i++
            }), i
        }

        function E(t, i, n, s) {
            var o, a, l, c, h, u = t,
                d = !1;
            if (!s.createSearchChoice || !s.tokenSeparators || s.tokenSeparators.length < 1) return e;
            for (;;) {
                for (a = -1, l = 0, c = s.tokenSeparators.length; c > l && (h = s.tokenSeparators[l], a = t.indexOf(h), !(a >= 0)); l++);
                if (0 > a) break;
                if (o = t.substring(0, a), t = t.substring(a + h.length), o.length > 0 && (o = s.createSearchChoice.call(this, o, i), o !== e && null !== o && s.id(o) !== e && null !== s.id(o))) {
                    for (d = !1, l = 0, c = i.length; c > l; l++)
                        if (r(s.id(o), s.id(i[l]))) {
                            d = !0;
                            break
                        }
                    d || n(o)
                }
            }
            return u !== t ? t : void 0
        }

        function D() {
            var e = this;
            t.each(arguments, function(t, i) {
                e[i].remove(), e[i] = null
            })
        }

        function P(e, i) {
            var n = function() {};
            return n.prototype = new e, n.prototype.constructor = n, n.prototype.parent = e.prototype, n.prototype = t.extend(n.prototype, i), n
        }
        if (window.Select2 === e) {
            var M, A, I, O, $, N, L, R, H = {
                    x: 0,
                    y: 0
                },
                M = {
                    TAB: 9,
                    ENTER: 13,
                    ESC: 27,
                    SPACE: 32,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    HOME: 36,
                    END: 35,
                    BACKSPACE: 8,
                    DELETE: 46,
                    isArrow: function(t) {
                        switch (t = t.which ? t.which : t) {
                            case M.LEFT:
                            case M.RIGHT:
                            case M.UP:
                            case M.DOWN:
                                return !0
                        }
                        return !1
                    },
                    isControl: function(t) {
                        var e = t.which;
                        switch (e) {
                            case M.SHIFT:
                            case M.CTRL:
                            case M.ALT:
                                return !0
                        }
                        return !!t.metaKey
                    },
                    isFunctionKey: function(t) {
                        return t = t.which ? t.which : t, t >= 112 && 123 >= t
                    }
                },
                z = "<div class='select2-measure-scrollbar'></div>",
                F = {
                    "\u24b6": "A",
                    "\uff21": "A",
                    "\xc0": "A",
                    "\xc1": "A",
                    "\xc2": "A",
                    "\u1ea6": "A",
                    "\u1ea4": "A",
                    "\u1eaa": "A",
                    "\u1ea8": "A",
                    "\xc3": "A",
                    "\u0100": "A",
                    "\u0102": "A",
                    "\u1eb0": "A",
                    "\u1eae": "A",
                    "\u1eb4": "A",
                    "\u1eb2": "A",
                    "\u0226": "A",
                    "\u01e0": "A",
                    "\xc4": "A",
                    "\u01de": "A",
                    "\u1ea2": "A",
                    "\xc5": "A",
                    "\u01fa": "A",
                    "\u01cd": "A",
                    "\u0200": "A",
                    "\u0202": "A",
                    "\u1ea0": "A",
                    "\u1eac": "A",
                    "\u1eb6": "A",
                    "\u1e00": "A",
                    "\u0104": "A",
                    "\u023a": "A",
                    "\u2c6f": "A",
                    "\ua732": "AA",
                    "\xc6": "AE",
                    "\u01fc": "AE",
                    "\u01e2": "AE",
                    "\ua734": "AO",
                    "\ua736": "AU",
                    "\ua738": "AV",
                    "\ua73a": "AV",
                    "\ua73c": "AY",
                    "\u24b7": "B",
                    "\uff22": "B",
                    "\u1e02": "B",
                    "\u1e04": "B",
                    "\u1e06": "B",
                    "\u0243": "B",
                    "\u0182": "B",
                    "\u0181": "B",
                    "\u24b8": "C",
                    "\uff23": "C",
                    "\u0106": "C",
                    "\u0108": "C",
                    "\u010a": "C",
                    "\u010c": "C",
                    "\xc7": "C",
                    "\u1e08": "C",
                    "\u0187": "C",
                    "\u023b": "C",
                    "\ua73e": "C",
                    "\u24b9": "D",
                    "\uff24": "D",
                    "\u1e0a": "D",
                    "\u010e": "D",
                    "\u1e0c": "D",
                    "\u1e10": "D",
                    "\u1e12": "D",
                    "\u1e0e": "D",
                    "\u0110": "D",
                    "\u018b": "D",
                    "\u018a": "D",
                    "\u0189": "D",
                    "\ua779": "D",
                    "\u01f1": "DZ",
                    "\u01c4": "DZ",
                    "\u01f2": "Dz",
                    "\u01c5": "Dz",
                    "\u24ba": "E",
                    "\uff25": "E",
                    "\xc8": "E",
                    "\xc9": "E",
                    "\xca": "E",
                    "\u1ec0": "E",
                    "\u1ebe": "E",
                    "\u1ec4": "E",
                    "\u1ec2": "E",
                    "\u1ebc": "E",
                    "\u0112": "E",
                    "\u1e14": "E",
                    "\u1e16": "E",
                    "\u0114": "E",
                    "\u0116": "E",
                    "\xcb": "E",
                    "\u1eba": "E",
                    "\u011a": "E",
                    "\u0204": "E",
                    "\u0206": "E",
                    "\u1eb8": "E",
                    "\u1ec6": "E",
                    "\u0228": "E",
                    "\u1e1c": "E",
                    "\u0118": "E",
                    "\u1e18": "E",
                    "\u1e1a": "E",
                    "\u0190": "E",
                    "\u018e": "E",
                    "\u24bb": "F",
                    "\uff26": "F",
                    "\u1e1e": "F",
                    "\u0191": "F",
                    "\ua77b": "F",
                    "\u24bc": "G",
                    "\uff27": "G",
                    "\u01f4": "G",
                    "\u011c": "G",
                    "\u1e20": "G",
                    "\u011e": "G",
                    "\u0120": "G",
                    "\u01e6": "G",
                    "\u0122": "G",
                    "\u01e4": "G",
                    "\u0193": "G",
                    "\ua7a0": "G",
                    "\ua77d": "G",
                    "\ua77e": "G",
                    "\u24bd": "H",
                    "\uff28": "H",
                    "\u0124": "H",
                    "\u1e22": "H",
                    "\u1e26": "H",
                    "\u021e": "H",
                    "\u1e24": "H",
                    "\u1e28": "H",
                    "\u1e2a": "H",
                    "\u0126": "H",
                    "\u2c67": "H",
                    "\u2c75": "H",
                    "\ua78d": "H",
                    "\u24be": "I",
                    "\uff29": "I",
                    "\xcc": "I",
                    "\xcd": "I",
                    "\xce": "I",
                    "\u0128": "I",
                    "\u012a": "I",
                    "\u012c": "I",
                    "\u0130": "I",
                    "\xcf": "I",
                    "\u1e2e": "I",
                    "\u1ec8": "I",
                    "\u01cf": "I",
                    "\u0208": "I",
                    "\u020a": "I",
                    "\u1eca": "I",
                    "\u012e": "I",
                    "\u1e2c": "I",
                    "\u0197": "I",
                    "\u24bf": "J",
                    "\uff2a": "J",
                    "\u0134": "J",
                    "\u0248": "J",
                    "\u24c0": "K",
                    "\uff2b": "K",
                    "\u1e30": "K",
                    "\u01e8": "K",
                    "\u1e32": "K",
                    "\u0136": "K",
                    "\u1e34": "K",
                    "\u0198": "K",
                    "\u2c69": "K",
                    "\ua740": "K",
                    "\ua742": "K",
                    "\ua744": "K",
                    "\ua7a2": "K",
                    "\u24c1": "L",
                    "\uff2c": "L",
                    "\u013f": "L",
                    "\u0139": "L",
                    "\u013d": "L",
                    "\u1e36": "L",
                    "\u1e38": "L",
                    "\u013b": "L",
                    "\u1e3c": "L",
                    "\u1e3a": "L",
                    "\u0141": "L",
                    "\u023d": "L",
                    "\u2c62": "L",
                    "\u2c60": "L",
                    "\ua748": "L",
                    "\ua746": "L",
                    "\ua780": "L",
                    "\u01c7": "LJ",
                    "\u01c8": "Lj",
                    "\u24c2": "M",
                    "\uff2d": "M",
                    "\u1e3e": "M",
                    "\u1e40": "M",
                    "\u1e42": "M",
                    "\u2c6e": "M",
                    "\u019c": "M",
                    "\u24c3": "N",
                    "\uff2e": "N",
                    "\u01f8": "N",
                    "\u0143": "N",
                    "\xd1": "N",
                    "\u1e44": "N",
                    "\u0147": "N",
                    "\u1e46": "N",
                    "\u0145": "N",
                    "\u1e4a": "N",
                    "\u1e48": "N",
                    "\u0220": "N",
                    "\u019d": "N",
                    "\ua790": "N",
                    "\ua7a4": "N",
                    "\u01ca": "NJ",
                    "\u01cb": "Nj",
                    "\u24c4": "O",
                    "\uff2f": "O",
                    "\xd2": "O",
                    "\xd3": "O",
                    "\xd4": "O",
                    "\u1ed2": "O",
                    "\u1ed0": "O",
                    "\u1ed6": "O",
                    "\u1ed4": "O",
                    "\xd5": "O",
                    "\u1e4c": "O",
                    "\u022c": "O",
                    "\u1e4e": "O",
                    "\u014c": "O",
                    "\u1e50": "O",
                    "\u1e52": "O",
                    "\u014e": "O",
                    "\u022e": "O",
                    "\u0230": "O",
                    "\xd6": "O",
                    "\u022a": "O",
                    "\u1ece": "O",
                    "\u0150": "O",
                    "\u01d1": "O",
                    "\u020c": "O",
                    "\u020e": "O",
                    "\u01a0": "O",
                    "\u1edc": "O",
                    "\u1eda": "O",
                    "\u1ee0": "O",
                    "\u1ede": "O",
                    "\u1ee2": "O",
                    "\u1ecc": "O",
                    "\u1ed8": "O",
                    "\u01ea": "O",
                    "\u01ec": "O",
                    "\xd8": "O",
                    "\u01fe": "O",
                    "\u0186": "O",
                    "\u019f": "O",
                    "\ua74a": "O",
                    "\ua74c": "O",
                    "\u01a2": "OI",
                    "\ua74e": "OO",
                    "\u0222": "OU",
                    "\u24c5": "P",
                    "\uff30": "P",
                    "\u1e54": "P",
                    "\u1e56": "P",
                    "\u01a4": "P",
                    "\u2c63": "P",
                    "\ua750": "P",
                    "\ua752": "P",
                    "\ua754": "P",
                    "\u24c6": "Q",
                    "\uff31": "Q",
                    "\ua756": "Q",
                    "\ua758": "Q",
                    "\u024a": "Q",
                    "\u24c7": "R",
                    "\uff32": "R",
                    "\u0154": "R",
                    "\u1e58": "R",
                    "\u0158": "R",
                    "\u0210": "R",
                    "\u0212": "R",
                    "\u1e5a": "R",
                    "\u1e5c": "R",
                    "\u0156": "R",
                    "\u1e5e": "R",
                    "\u024c": "R",
                    "\u2c64": "R",
                    "\ua75a": "R",
                    "\ua7a6": "R",
                    "\ua782": "R",
                    "\u24c8": "S",
                    "\uff33": "S",
                    "\u1e9e": "S",
                    "\u015a": "S",
                    "\u1e64": "S",
                    "\u015c": "S",
                    "\u1e60": "S",
                    "\u0160": "S",
                    "\u1e66": "S",
                    "\u1e62": "S",
                    "\u1e68": "S",
                    "\u0218": "S",
                    "\u015e": "S",
                    "\u2c7e": "S",
                    "\ua7a8": "S",
                    "\ua784": "S",
                    "\u24c9": "T",
                    "\uff34": "T",
                    "\u1e6a": "T",
                    "\u0164": "T",
                    "\u1e6c": "T",
                    "\u021a": "T",
                    "\u0162": "T",
                    "\u1e70": "T",
                    "\u1e6e": "T",
                    "\u0166": "T",
                    "\u01ac": "T",
                    "\u01ae": "T",
                    "\u023e": "T",
                    "\ua786": "T",
                    "\ua728": "TZ",
                    "\u24ca": "U",
                    "\uff35": "U",
                    "\xd9": "U",
                    "\xda": "U",
                    "\xdb": "U",
                    "\u0168": "U",
                    "\u1e78": "U",
                    "\u016a": "U",
                    "\u1e7a": "U",
                    "\u016c": "U",
                    "\xdc": "U",
                    "\u01db": "U",
                    "\u01d7": "U",
                    "\u01d5": "U",
                    "\u01d9": "U",
                    "\u1ee6": "U",
                    "\u016e": "U",
                    "\u0170": "U",
                    "\u01d3": "U",
                    "\u0214": "U",
                    "\u0216": "U",
                    "\u01af": "U",
                    "\u1eea": "U",
                    "\u1ee8": "U",
                    "\u1eee": "U",
                    "\u1eec": "U",
                    "\u1ef0": "U",
                    "\u1ee4": "U",
                    "\u1e72": "U",
                    "\u0172": "U",
                    "\u1e76": "U",
                    "\u1e74": "U",
                    "\u0244": "U",
                    "\u24cb": "V",
                    "\uff36": "V",
                    "\u1e7c": "V",
                    "\u1e7e": "V",
                    "\u01b2": "V",
                    "\ua75e": "V",
                    "\u0245": "V",
                    "\ua760": "VY",
                    "\u24cc": "W",
                    "\uff37": "W",
                    "\u1e80": "W",
                    "\u1e82": "W",
                    "\u0174": "W",
                    "\u1e86": "W",
                    "\u1e84": "W",
                    "\u1e88": "W",
                    "\u2c72": "W",
                    "\u24cd": "X",
                    "\uff38": "X",
                    "\u1e8a": "X",
                    "\u1e8c": "X",
                    "\u24ce": "Y",
                    "\uff39": "Y",
                    "\u1ef2": "Y",
                    "\xdd": "Y",
                    "\u0176": "Y",
                    "\u1ef8": "Y",
                    "\u0232": "Y",
                    "\u1e8e": "Y",
                    "\u0178": "Y",
                    "\u1ef6": "Y",
                    "\u1ef4": "Y",
                    "\u01b3": "Y",
                    "\u024e": "Y",
                    "\u1efe": "Y",
                    "\u24cf": "Z",
                    "\uff3a": "Z",
                    "\u0179": "Z",
                    "\u1e90": "Z",
                    "\u017b": "Z",
                    "\u017d": "Z",
                    "\u1e92": "Z",
                    "\u1e94": "Z",
                    "\u01b5": "Z",
                    "\u0224": "Z",
                    "\u2c7f": "Z",
                    "\u2c6b": "Z",
                    "\ua762": "Z",
                    "\u24d0": "a",
                    "\uff41": "a",
                    "\u1e9a": "a",
                    "\xe0": "a",
                    "\xe1": "a",
                    "\xe2": "a",
                    "\u1ea7": "a",
                    "\u1ea5": "a",
                    "\u1eab": "a",
                    "\u1ea9": "a",
                    "\xe3": "a",
                    "\u0101": "a",
                    "\u0103": "a",
                    "\u1eb1": "a",
                    "\u1eaf": "a",
                    "\u1eb5": "a",
                    "\u1eb3": "a",
                    "\u0227": "a",
                    "\u01e1": "a",
                    "\xe4": "a",
                    "\u01df": "a",
                    "\u1ea3": "a",
                    "\xe5": "a",
                    "\u01fb": "a",
                    "\u01ce": "a",
                    "\u0201": "a",
                    "\u0203": "a",
                    "\u1ea1": "a",
                    "\u1ead": "a",
                    "\u1eb7": "a",
                    "\u1e01": "a",
                    "\u0105": "a",
                    "\u2c65": "a",
                    "\u0250": "a",
                    "\ua733": "aa",
                    "\xe6": "ae",
                    "\u01fd": "ae",
                    "\u01e3": "ae",
                    "\ua735": "ao",
                    "\ua737": "au",
                    "\ua739": "av",
                    "\ua73b": "av",
                    "\ua73d": "ay",
                    "\u24d1": "b",
                    "\uff42": "b",
                    "\u1e03": "b",
                    "\u1e05": "b",
                    "\u1e07": "b",
                    "\u0180": "b",
                    "\u0183": "b",
                    "\u0253": "b",
                    "\u24d2": "c",
                    "\uff43": "c",
                    "\u0107": "c",
                    "\u0109": "c",
                    "\u010b": "c",
                    "\u010d": "c",
                    "\xe7": "c",
                    "\u1e09": "c",
                    "\u0188": "c",
                    "\u023c": "c",
                    "\ua73f": "c",
                    "\u2184": "c",
                    "\u24d3": "d",
                    "\uff44": "d",
                    "\u1e0b": "d",
                    "\u010f": "d",
                    "\u1e0d": "d",
                    "\u1e11": "d",
                    "\u1e13": "d",
                    "\u1e0f": "d",
                    "\u0111": "d",
                    "\u018c": "d",
                    "\u0256": "d",
                    "\u0257": "d",
                    "\ua77a": "d",
                    "\u01f3": "dz",
                    "\u01c6": "dz",
                    "\u24d4": "e",
                    "\uff45": "e",
                    "\xe8": "e",
                    "\xe9": "e",
                    "\xea": "e",
                    "\u1ec1": "e",
                    "\u1ebf": "e",
                    "\u1ec5": "e",
                    "\u1ec3": "e",
                    "\u1ebd": "e",
                    "\u0113": "e",
                    "\u1e15": "e",
                    "\u1e17": "e",
                    "\u0115": "e",
                    "\u0117": "e",
                    "\xeb": "e",
                    "\u1ebb": "e",
                    "\u011b": "e",
                    "\u0205": "e",
                    "\u0207": "e",
                    "\u1eb9": "e",
                    "\u1ec7": "e",
                    "\u0229": "e",
                    "\u1e1d": "e",
                    "\u0119": "e",
                    "\u1e19": "e",
                    "\u1e1b": "e",
                    "\u0247": "e",
                    "\u025b": "e",
                    "\u01dd": "e",
                    "\u24d5": "f",
                    "\uff46": "f",
                    "\u1e1f": "f",
                    "\u0192": "f",
                    "\ua77c": "f",
                    "\u24d6": "g",
                    "\uff47": "g",
                    "\u01f5": "g",
                    "\u011d": "g",
                    "\u1e21": "g",
                    "\u011f": "g",
                    "\u0121": "g",
                    "\u01e7": "g",
                    "\u0123": "g",
                    "\u01e5": "g",
                    "\u0260": "g",
                    "\ua7a1": "g",
                    "\u1d79": "g",
                    "\ua77f": "g",
                    "\u24d7": "h",
                    "\uff48": "h",
                    "\u0125": "h",
                    "\u1e23": "h",
                    "\u1e27": "h",
                    "\u021f": "h",
                    "\u1e25": "h",
                    "\u1e29": "h",
                    "\u1e2b": "h",
                    "\u1e96": "h",
                    "\u0127": "h",
                    "\u2c68": "h",
                    "\u2c76": "h",
                    "\u0265": "h",
                    "\u0195": "hv",
                    "\u24d8": "i",
                    "\uff49": "i",
                    "\xec": "i",
                    "\xed": "i",
                    "\xee": "i",
                    "\u0129": "i",
                    "\u012b": "i",
                    "\u012d": "i",
                    "\xef": "i",
                    "\u1e2f": "i",
                    "\u1ec9": "i",
                    "\u01d0": "i",
                    "\u0209": "i",
                    "\u020b": "i",
                    "\u1ecb": "i",
                    "\u012f": "i",
                    "\u1e2d": "i",
                    "\u0268": "i",
                    "\u0131": "i",
                    "\u24d9": "j",
                    "\uff4a": "j",
                    "\u0135": "j",
                    "\u01f0": "j",
                    "\u0249": "j",
                    "\u24da": "k",
                    "\uff4b": "k",
                    "\u1e31": "k",
                    "\u01e9": "k",
                    "\u1e33": "k",
                    "\u0137": "k",
                    "\u1e35": "k",
                    "\u0199": "k",
                    "\u2c6a": "k",
                    "\ua741": "k",
                    "\ua743": "k",
                    "\ua745": "k",
                    "\ua7a3": "k",
                    "\u24db": "l",
                    "\uff4c": "l",
                    "\u0140": "l",
                    "\u013a": "l",
                    "\u013e": "l",
                    "\u1e37": "l",
                    "\u1e39": "l",
                    "\u013c": "l",
                    "\u1e3d": "l",
                    "\u1e3b": "l",
                    "\u017f": "l",
                    "\u0142": "l",
                    "\u019a": "l",
                    "\u026b": "l",
                    "\u2c61": "l",
                    "\ua749": "l",
                    "\ua781": "l",
                    "\ua747": "l",
                    "\u01c9": "lj",
                    "\u24dc": "m",
                    "\uff4d": "m",
                    "\u1e3f": "m",
                    "\u1e41": "m",
                    "\u1e43": "m",
                    "\u0271": "m",
                    "\u026f": "m",
                    "\u24dd": "n",
                    "\uff4e": "n",
                    "\u01f9": "n",
                    "\u0144": "n",
                    "\xf1": "n",
                    "\u1e45": "n",
                    "\u0148": "n",
                    "\u1e47": "n",
                    "\u0146": "n",
                    "\u1e4b": "n",
                    "\u1e49": "n",
                    "\u019e": "n",
                    "\u0272": "n",
                    "\u0149": "n",
                    "\ua791": "n",
                    "\ua7a5": "n",
                    "\u01cc": "nj",
                    "\u24de": "o",
                    "\uff4f": "o",
                    "\xf2": "o",
                    "\xf3": "o",
                    "\xf4": "o",
                    "\u1ed3": "o",
                    "\u1ed1": "o",
                    "\u1ed7": "o",
                    "\u1ed5": "o",
                    "\xf5": "o",
                    "\u1e4d": "o",
                    "\u022d": "o",
                    "\u1e4f": "o",
                    "\u014d": "o",
                    "\u1e51": "o",
                    "\u1e53": "o",
                    "\u014f": "o",
                    "\u022f": "o",
                    "\u0231": "o",
                    "\xf6": "o",
                    "\u022b": "o",
                    "\u1ecf": "o",
                    "\u0151": "o",
                    "\u01d2": "o",
                    "\u020d": "o",
                    "\u020f": "o",
                    "\u01a1": "o",
                    "\u1edd": "o",
                    "\u1edb": "o",
                    "\u1ee1": "o",
                    "\u1edf": "o",
                    "\u1ee3": "o",
                    "\u1ecd": "o",
                    "\u1ed9": "o",
                    "\u01eb": "o",
                    "\u01ed": "o",
                    "\xf8": "o",
                    "\u01ff": "o",
                    "\u0254": "o",
                    "\ua74b": "o",
                    "\ua74d": "o",
                    "\u0275": "o",
                    "\u01a3": "oi",
                    "\u0223": "ou",
                    "\ua74f": "oo",
                    "\u24df": "p",
                    "\uff50": "p",
                    "\u1e55": "p",
                    "\u1e57": "p",
                    "\u01a5": "p",
                    "\u1d7d": "p",
                    "\ua751": "p",
                    "\ua753": "p",
                    "\ua755": "p",
                    "\u24e0": "q",
                    "\uff51": "q",
                    "\u024b": "q",
                    "\ua757": "q",
                    "\ua759": "q",
                    "\u24e1": "r",
                    "\uff52": "r",
                    "\u0155": "r",
                    "\u1e59": "r",
                    "\u0159": "r",
                    "\u0211": "r",
                    "\u0213": "r",
                    "\u1e5b": "r",
                    "\u1e5d": "r",
                    "\u0157": "r",
                    "\u1e5f": "r",
                    "\u024d": "r",
                    "\u027d": "r",
                    "\ua75b": "r",
                    "\ua7a7": "r",
                    "\ua783": "r",
                    "\u24e2": "s",
                    "\uff53": "s",
                    "\xdf": "s",
                    "\u015b": "s",
                    "\u1e65": "s",
                    "\u015d": "s",
                    "\u1e61": "s",
                    "\u0161": "s",
                    "\u1e67": "s",
                    "\u1e63": "s",
                    "\u1e69": "s",
                    "\u0219": "s",
                    "\u015f": "s",
                    "\u023f": "s",
                    "\ua7a9": "s",
                    "\ua785": "s",
                    "\u1e9b": "s",
                    "\u24e3": "t",
                    "\uff54": "t",
                    "\u1e6b": "t",
                    "\u1e97": "t",
                    "\u0165": "t",
                    "\u1e6d": "t",
                    "\u021b": "t",
                    "\u0163": "t",
                    "\u1e71": "t",
                    "\u1e6f": "t",
                    "\u0167": "t",
                    "\u01ad": "t",
                    "\u0288": "t",
                    "\u2c66": "t",
                    "\ua787": "t",
                    "\ua729": "tz",
                    "\u24e4": "u",
                    "\uff55": "u",
                    "\xf9": "u",
                    "\xfa": "u",
                    "\xfb": "u",
                    "\u0169": "u",
                    "\u1e79": "u",
                    "\u016b": "u",
                    "\u1e7b": "u",
                    "\u016d": "u",
                    "\xfc": "u",
                    "\u01dc": "u",
                    "\u01d8": "u",
                    "\u01d6": "u",
                    "\u01da": "u",
                    "\u1ee7": "u",
                    "\u016f": "u",
                    "\u0171": "u",
                    "\u01d4": "u",
                    "\u0215": "u",
                    "\u0217": "u",
                    "\u01b0": "u",
                    "\u1eeb": "u",
                    "\u1ee9": "u",
                    "\u1eef": "u",
                    "\u1eed": "u",
                    "\u1ef1": "u",
                    "\u1ee5": "u",
                    "\u1e73": "u",
                    "\u0173": "u",
                    "\u1e77": "u",
                    "\u1e75": "u",
                    "\u0289": "u",
                    "\u24e5": "v",
                    "\uff56": "v",
                    "\u1e7d": "v",
                    "\u1e7f": "v",
                    "\u028b": "v",
                    "\ua75f": "v",
                    "\u028c": "v",
                    "\ua761": "vy",
                    "\u24e6": "w",
                    "\uff57": "w",
                    "\u1e81": "w",
                    "\u1e83": "w",
                    "\u0175": "w",
                    "\u1e87": "w",
                    "\u1e85": "w",
                    "\u1e98": "w",
                    "\u1e89": "w",
                    "\u2c73": "w",
                    "\u24e7": "x",
                    "\uff58": "x",
                    "\u1e8b": "x",
                    "\u1e8d": "x",
                    "\u24e8": "y",
                    "\uff59": "y",
                    "\u1ef3": "y",
                    "\xfd": "y",
                    "\u0177": "y",
                    "\u1ef9": "y",
                    "\u0233": "y",
                    "\u1e8f": "y",
                    "\xff": "y",
                    "\u1ef7": "y",
                    "\u1e99": "y",
                    "\u1ef5": "y",
                    "\u01b4": "y",
                    "\u024f": "y",
                    "\u1eff": "y",
                    "\u24e9": "z",
                    "\uff5a": "z",
                    "\u017a": "z",
                    "\u1e91": "z",
                    "\u017c": "z",
                    "\u017e": "z",
                    "\u1e93": "z",
                    "\u1e95": "z",
                    "\u01b6": "z",
                    "\u0225": "z",
                    "\u0240": "z",
                    "\u2c6c": "z",
                    "\ua763": "z",
                    "\u0386": "\u0391",
                    "\u0388": "\u0395",
                    "\u0389": "\u0397",
                    "\u038a": "\u0399",
                    "\u03aa": "\u0399",
                    "\u038c": "\u039f",
                    "\u038e": "\u03a5",
                    "\u03ab": "\u03a5",
                    "\u038f": "\u03a9",
                    "\u03ac": "\u03b1",
                    "\u03ad": "\u03b5",
                    "\u03ae": "\u03b7",
                    "\u03af": "\u03b9",
                    "\u03ca": "\u03b9",
                    "\u0390": "\u03b9",
                    "\u03cc": "\u03bf",
                    "\u03cd": "\u03c5",
                    "\u03cb": "\u03c5",
                    "\u03b0": "\u03c5",
                    "\u03c9": "\u03c9",
                    "\u03c2": "\u03c3"
                };
            L = t(document), $ = function() {
                var t = 1;
                return function() {
                    return t++
                }
            }(), A = P(Object, {
                bind: function(t) {
                    var e = this;
                    return function() {
                        t.apply(e, arguments)
                    }
                },
                init: function(i) {
                    var n, s, r = ".select2-results";
                    this.opts = i = this.prepareOpts(i), this.id = i.id, i.element.data("select2") !== e && null !== i.element.data("select2") && i.element.data("select2").destroy(), this.container = this.createContainer(), this.liveRegion = t("<span>", {
                        role: "status",
                        "aria-live": "polite"
                    }).addClass("select2-hidden-accessible").appendTo(document.body), this.containerId = "s2id_" + (i.element.attr("id") || "autogen" + $()), this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.container.attr("title", i.element.attr("title")), this.body = t("body"), y(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", i.element.attr("style")), this.container.css(k(i.containerCss, this.opts.element)), this.container.addClass(k(i.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", m), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), y(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(k(i.dropdownCssClass, this.opts.element)), this.dropdown.data("select2", this), this.dropdown.on("click", m), this.results = n = this.container.find(r), this.search = s = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", m), h(this.results), this.dropdown.on("mousemove-filtered", r, this.bind(this.highlightUnderEvent)), this.dropdown.on("touchstart touchmove touchend", r, this.bind(function(t) {
                        this._touchEvent = !0, this.highlightUnderEvent(t)
                    })), this.dropdown.on("touchmove", r, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", r, this.bind(this.clearTouchMoved)), this.dropdown.on("click", this.bind(function() {
                        this._touchEvent && (this._touchEvent = !1, this.selectHighlighted())
                    })), d(80, this.results), this.dropdown.on("scroll-debounced", r, this.bind(this.loadMoreIfNeeded)), t(this.container).on("change", ".select2-input", function(t) {
                        t.stopPropagation()
                    }), t(this.dropdown).on("change", ".select2-input", function(t) {
                        t.stopPropagation()
                    }), t.fn.mousewheel && n.mousewheel(function(t, e, i, s) {
                        var o = n.scrollTop();
                        s > 0 && 0 >= o - s ? (n.scrollTop(0), m(t)) : 0 > s && n.get(0).scrollHeight - n.scrollTop() + s <= n.height() && (n.scrollTop(n.get(0).scrollHeight - n.height()), m(t))
                    }), c(s), s.on("keyup-change input paste", this.bind(this.updateResults)), s.on("focus", function() {
                        s.addClass("select2-focused")
                    }), s.on("blur", function() {
                        s.removeClass("select2-focused")
                    }), this.dropdown.on("mouseup", r, this.bind(function(e) {
                        t(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), this.selectHighlighted(e))
                    })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function(t) {
                        t.stopPropagation()
                    }), this.nextSearchTerm = e, t.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== i.maximumInputLength && this.search.attr("maxlength", i.maximumInputLength);
                    var a = i.element.prop("disabled");
                    a === e && (a = !1), this.enable(!a);
                    var l = i.element.prop("readonly");
                    l === e && (l = !1), this.readonly(l), R = R || o(), this.autofocus = i.element.prop("autofocus"), i.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", i.searchInputPlaceholder)
                },
                destroy: function() {
                    var t = this.opts.element,
                        i = t.data("select2"),
                        n = this;
                    this.close(), t.length && t[0].detachEvent && t.each(function() {
                        this.detachEvent("onpropertychange", n._sync)
                    }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), this._sync = null, i !== e && (i.container.remove(), i.liveRegion.remove(), i.dropdown.remove(), t.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? t.attr({
                        tabindex: this.elementTabIndex
                    }) : t.removeAttr("tabindex"), t.show()), D.call(this, "container", "liveRegion", "dropdown", "results", "search")
                },
                optionToData: function(t) {
                    return t.is("option") ? {
                        id: t.prop("value"),
                        text: t.text(),
                        element: t.get(),
                        css: t.attr("class"),
                        disabled: t.prop("disabled"),
                        locked: r(t.attr("locked"), "locked") || r(t.data("locked"), !0)
                    } : t.is("optgroup") ? {
                        text: t.attr("label"),
                        children: [],
                        element: t.get(),
                        css: t.attr("class")
                    } : void 0
                },
                prepareOpts: function(i) {
                    var n, s, o, l, c = this;
                    if (n = i.element, "select" === n.get(0).tagName.toLowerCase() && (this.select = s = i.element), s && t.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                            if (this in i) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                        }), i = t.extend({}, {
                            populateResults: function(n, s, o) {
                                var r, a = this.opts.id,
                                    l = this.liveRegion;
                                (r = function(n, s, h) {
                                    var u, d, p, f, m, g, v, y, b, w;
                                    n = i.sortResults(n, s, o);
                                    var C = [];
                                    for (u = 0, d = n.length; d > u; u += 1) p = n[u], m = p.disabled === !0, f = !m && a(p) !== e, g = p.children && p.children.length > 0, v = t("<li></li>"), v.addClass("select2-results-dept-" + h), v.addClass("select2-result"), v.addClass(f ? "select2-result-selectable" : "select2-result-unselectable"), m && v.addClass("select2-disabled"), g && v.addClass("select2-result-with-children"), v.addClass(c.opts.formatResultCssClass(p)), v.attr("role", "presentation"), y = t(document.createElement("div")), y.addClass("select2-result-label"), y.attr("id", "select2-result-label-" + $()), y.attr("role", "option"), w = i.formatResult(p, y, o, c.opts.escapeMarkup), w !== e && (y.html(w), v.append(y)), g && (b = t("<ul></ul>"), b.addClass("select2-result-sub"), r(p.children, b, h + 1), v.append(b)), v.data("select2-data", p), C.push(v[0]);
                                    s.append(C), l.text(i.formatMatches(n.length))
                                })(s, n, 0)
                            }
                        }, t.fn.select2.defaults, i), "function" != typeof i.id && (o = i.id, i.id = function(t) {
                            return t[o]
                        }), t.isArray(i.element.data("select2Tags"))) {
                        if ("tags" in i) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + i.element.attr("id");
                        i.tags = i.element.data("select2Tags")
                    }
                    if (s ? (i.query = this.bind(function(t) {
                            var i, s, o, r = {
                                    results: [],
                                    more: !1
                                },
                                a = t.term;
                            o = function(e, i) {
                                var n;
                                e.is("option") ? t.matcher(a, e.text(), e) && i.push(c.optionToData(e)) : e.is("optgroup") && (n = c.optionToData(e), e.children().each2(function(t, e) {
                                    o(e, n.children)
                                }), n.children.length > 0 && i.push(n))
                            }, i = n.children(), this.getPlaceholder() !== e && i.length > 0 && (s = this.getPlaceholderOption(), s && (i = i.not(s))), i.each2(function(t, e) {
                                o(e, r.results)
                            }), t.callback(r)
                        }), i.id = function(t) {
                            return t.id
                        }) : "query" in i || ("ajax" in i ? (l = i.element.data("ajax-url"), l && l.length > 0 && (i.ajax.url = l), i.query = C.call(i.element, i.ajax)) : "data" in i ? i.query = x(i.data) : "tags" in i && (i.query = _(i.tags), i.createSearchChoice === e && (i.createSearchChoice = function(e) {
                            return {
                                id: t.trim(e),
                                text: t.trim(e)
                            }
                        }), i.initSelection === e && (i.initSelection = function(e, n) {
                            var s = [];
                            t(a(e.val(), i.separator)).each(function() {
                                var e = {
                                        id: this,
                                        text: this
                                    },
                                    n = i.tags;
                                t.isFunction(n) && (n = n()), t(n).each(function() {
                                    return r(this.id, e.id) ? (e = this, !1) : void 0
                                }), s.push(e)
                            }), n(s)
                        }))), "function" != typeof i.query) throw "query function not defined for Select2 " + i.element.attr("id");
                    if ("top" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(t, e) {
                        t.unshift(e)
                    };
                    else if ("bottom" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(t, e) {
                        t.push(e)
                    };
                    else if ("function" != typeof i.createSearchChoicePosition) throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
                    return i
                },
                monitorSource: function() {
                    var i, n = this.opts.element,
                        s = this;
                    n.on("change.select2", this.bind(function() {
                        this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                    })), this._sync = this.bind(function() {
                        var t = n.prop("disabled");
                        t === e && (t = !1), this.enable(!t);
                        var i = n.prop("readonly");
                        i === e && (i = !1), this.readonly(i), y(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(k(this.opts.containerCssClass, this.opts.element)), y(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(k(this.opts.dropdownCssClass, this.opts.element))
                    }), n.length && n[0].attachEvent && n.each(function() {
                        this.attachEvent("onpropertychange", s._sync)
                    }), i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, i !== e && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new i(function(e) {
                        t.each(e, s._sync)
                    }), this.propertyObserver.observe(n.get(0), {
                        attributes: !0,
                        subtree: !1
                    }))
                },
                triggerSelect: function(e) {
                    var i = t.Event("select2-selecting", {
                        val: this.id(e),
                        object: e,
                        choice: e
                    });
                    return this.opts.element.trigger(i), !i.isDefaultPrevented()
                },
                triggerChange: function(e) {
                    e = e || {}, e = t.extend({}, e, {
                        type: "change",
                        val: this.val()
                    }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(e), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
                },
                isInterfaceEnabled: function() {
                    return this.enabledInterface === !0
                },
                enableInterface: function() {
                    var t = this._enabled && !this._readonly,
                        e = !t;
                    return t !== this.enabledInterface && (this.container.toggleClass("select2-container-disabled", e), this.close(), this.enabledInterface = t, !0)
                },
                enable: function(t) {
                    t === e && (t = !0), this._enabled !== t && (this._enabled = t, this.opts.element.prop("disabled", !t), this.enableInterface())
                },
                disable: function() {
                    this.enable(!1)
                },
                readonly: function(t) {
                    t === e && (t = !1), this._readonly !== t && (this._readonly = t, this.opts.element.prop("readonly", t), this.enableInterface())
                },
                opened: function() {
                    return !!this.container && this.container.hasClass("select2-dropdown-open")
                },
                positionDropdown: function() {
                    var e, i, n, s, o, r = this.dropdown,
                        a = this.container.offset(),
                        l = this.container.outerHeight(!1),
                        c = this.container.outerWidth(!1),
                        h = r.outerHeight(!1),
                        u = t(window),
                        d = u.width(),
                        p = u.height(),
                        f = u.scrollLeft() + d,
                        m = u.scrollTop() + p,
                        g = a.top + l,
                        v = a.left,
                        y = m >= g + h,
                        b = a.top - h >= u.scrollTop(),
                        w = r.outerWidth(!1),
                        C = f >= v + w,
                        x = r.hasClass("select2-drop-above");
                    x ? (i = !0, !b && y && (n = !0, i = !1)) : (i = !1, !y && b && (n = !0, i = !0)), n && (r.hide(), a = this.container.offset(), l = this.container.outerHeight(!1), c = this.container.outerWidth(!1), h = r.outerHeight(!1), f = u.scrollLeft() + d, m = u.scrollTop() + p, g = a.top + l, v = a.left, w = r.outerWidth(!1), C = f >= v + w, r.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (o = t(".select2-results", r)[0], r.addClass("select2-drop-auto-width"), r.css("width", ""), w = r.outerWidth(!1) + (o.scrollHeight === o.clientHeight ? 0 : R.width), w > c ? c = w : w = c, h = r.outerHeight(!1), C = f >= v + w) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body.css("position") && (e = this.body.offset(), g -= e.top, v -= e.left), C || (v = a.left + this.container.outerWidth(!1) - w), s = {
                        left: v,
                        width: c
                    }, i ? (s.top = a.top - h, s.bottom = "auto", this.container.addClass("select2-drop-above"), r.addClass("select2-drop-above")) : (s.top = g, s.bottom = "auto", this.container.removeClass("select2-drop-above"), r.removeClass("select2-drop-above")), s = t.extend(s, k(this.opts.dropdownCss, this.opts.element)), r.css(s)
                },
                shouldOpen: function() {
                    var e;
                    return !this.opened() && (this._enabled !== !1 && this._readonly !== !0 && (e = t.Event("select2-opening"), this.opts.element.trigger(e), !e.isDefaultPrevented()))
                },
                clearDropdownAlignmentPreference: function() {
                    this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
                },
                open: function() {
                    return !!this.shouldOpen() && (this.opening(), L.on("mousemove.select2Event", function(t) {
                        H.x = t.pageX, H.y = t.pageY
                    }), !0)
                },
                opening: function() {
                    var e, n = this.containerEventName,
                        s = "scroll." + n,
                        o = "resize." + n,
                        r = "orientationchange." + n;
                    this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), e = t("#select2-drop-mask"), 0 == e.length && (e = t(document.createElement("div")), e.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), e.hide(), e.appendTo(this.body), e.on("mousedown touchstart click", function(n) {
                        i(e);
                        var s, o = t("#select2-drop");
                        o.length > 0 && (s = o.data("select2"), s.opts.selectOnBlur && s.selectHighlighted({
                            noFocus: !0
                        }), s.close(), n.preventDefault(), n.stopPropagation())
                    })), this.dropdown.prev()[0] !== e[0] && this.dropdown.before(e), t("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), e.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                    var a = this;
                    this.container.parents().add(window).each(function() {
                        t(this).on(o + " " + s + " " + r, function() {
                            a.opened() && a.positionDropdown()
                        })
                    })
                },
                close: function() {
                    if (this.opened()) {
                        var e = this.containerEventName,
                            i = "scroll." + e,
                            n = "resize." + e,
                            s = "orientationchange." + e;
                        this.container.parents().add(window).each(function() {
                            t(this).off(i).off(n).off(s)
                        }), this.clearDropdownAlignmentPreference(), t("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), L.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(t.Event("select2-close"))
                    }
                },
                externalSearch: function(t) {
                    this.open(), this.search.val(t), this.updateResults(!1)
                },
                clearSearch: function() {},
                getMaximumSelectionSize: function() {
                    return k(this.opts.maximumSelectionSize, this.opts.element)
                },
                ensureHighlightVisible: function() {
                    var e, i, n, s, o, r, a, l, c = this.results;
                    if (i = this.highlight(), !(0 > i)) {
                        if (0 == i) return void c.scrollTop(0);
                        e = this.findHighlightableChoices().find(".select2-result-label"), n = t(e[i]), l = (n.offset() || {}).top || 0, s = l + n.outerHeight(!0), i === e.length - 1 && (a = c.find("li.select2-more-results"), a.length > 0 && (s = a.offset().top + a.outerHeight(!0))), o = c.offset().top + c.outerHeight(!0), s > o && c.scrollTop(c.scrollTop() + (s - o)), r = l - c.offset().top, 0 > r && "none" != n.css("display") && c.scrollTop(c.scrollTop() + r)
                    }
                },
                findHighlightableChoices: function() {
                    return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")
                },
                moveHighlight: function(e) {
                    for (var i = this.findHighlightableChoices(), n = this.highlight(); n > -1 && n < i.length;) {
                        n += e;
                        var s = t(i[n]);
                        if (s.hasClass("select2-result-selectable") && !s.hasClass("select2-disabled") && !s.hasClass("select2-selected")) {
                            this.highlight(n);
                            break
                        }
                    }
                },
                highlight: function(e) {
                    var i, n, o = this.findHighlightableChoices();
                    return 0 === arguments.length ? s(o.filter(".select2-highlighted")[0], o.get()) : (e >= o.length && (e = o.length - 1), 0 > e && (e = 0), this.removeHighlight(), i = t(o[e]), i.addClass("select2-highlighted"), this.search.attr("aria-activedescendant", i.find(".select2-result-label").attr("id")), this.ensureHighlightVisible(), this.liveRegion.text(i.text()), n = i.data("select2-data"), void(n && this.opts.element.trigger({
                        type: "select2-highlight",
                        val: this.id(n),
                        choice: n
                    })))
                },
                removeHighlight: function() {
                    this.results.find(".select2-highlighted").removeClass("select2-highlighted")
                },
                touchMoved: function() {
                    this._touchMoved = !0
                },
                clearTouchMoved: function() {
                    this._touchMoved = !1
                },
                countSelectableResults: function() {
                    return this.findHighlightableChoices().length
                },
                highlightUnderEvent: function(e) {
                    var i = t(e.target).closest(".select2-result-selectable");
                    if (i.length > 0 && !i.is(".select2-highlighted")) {
                        var n = this.findHighlightableChoices();
                        this.highlight(n.index(i))
                    } else 0 == i.length && this.removeHighlight()
                },
                loadMoreIfNeeded: function() {
                    var t, e = this.results,
                        i = e.find("li.select2-more-results"),
                        n = this.resultsPage + 1,
                        s = this,
                        o = this.search.val(),
                        r = this.context;
                    0 !== i.length && (t = i.offset().top - e.offset().top - e.height(), t <= this.opts.loadMorePadding && (i.addClass("select2-active"), this.opts.query({
                        element: this.opts.element,
                        term: o,
                        page: n,
                        context: r,
                        matcher: this.opts.matcher,
                        callback: this.bind(function(t) {
                            s.opened() && (s.opts.populateResults.call(this, e, t.results, {
                                term: o,
                                page: n,
                                context: r
                            }), s.postprocessResults(t, !1, !1), t.more === !0 ? (i.detach().appendTo(e).text(k(s.opts.formatLoadMore, s.opts.element, n + 1)), window.setTimeout(function() {
                                s.loadMoreIfNeeded()
                            }, 10)) : i.remove(), s.positionDropdown(), s.resultsPage = n, s.context = t.context, this.opts.element.trigger({
                                type: "select2-loaded",
                                items: t
                            }))
                        })
                    })))
                },
                tokenize: function() {},
                updateResults: function(i) {
                    function n() {
                        c.removeClass("select2-active"), d.positionDropdown(), d.liveRegion.text(h.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? h.text() : d.opts.formatMatches(h.find(".select2-result-selectable").length))
                    }

                    function s(t) {
                        h.html(t), n()
                    }
                    var o, a, l, c = this.search,
                        h = this.results,
                        u = this.opts,
                        d = this,
                        p = c.val(),
                        f = t.data(this.container, "select2-last-term");
                    if ((i === !0 || !f || !r(p, f)) && (t.data(this.container, "select2-last-term", p), i === !0 || this.showSearchInput !== !1 && this.opened())) {
                        l = ++this.queryCount;
                        var m = this.getMaximumSelectionSize();
                        if (m >= 1 && (o = this.data(), t.isArray(o) && o.length >= m && S(u.formatSelectionTooBig, "formatSelectionTooBig"))) return void s("<li class='select2-selection-limit'>" + k(u.formatSelectionTooBig, u.element, m) + "</li>");
                        if (c.val().length < u.minimumInputLength) return s(S(u.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + k(u.formatInputTooShort, u.element, c.val(), u.minimumInputLength) + "</li>" : ""), void(i && this.showSearch && this.showSearch(!0));
                        if (u.maximumInputLength && c.val().length > u.maximumInputLength) return void s(S(u.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + k(u.formatInputTooLong, u.element, c.val(), u.maximumInputLength) + "</li>" : "");
                        u.formatSearching && 0 === this.findHighlightableChoices().length && s("<li class='select2-searching'>" + k(u.formatSearching, u.element) + "</li>"), c.addClass("select2-active"), this.removeHighlight(), a = this.tokenize(), a != e && null != a && c.val(a), this.resultsPage = 1, u.query({
                            element: u.element,
                            term: c.val(),
                            page: this.resultsPage,
                            context: null,
                            matcher: u.matcher,
                            callback: this.bind(function(o) {
                                var a;
                                if (l == this.queryCount) {
                                    if (!this.opened()) return void this.search.removeClass("select2-active");
                                    if (o.hasError !== e && S(u.formatAjaxError, "formatAjaxError")) return void s("<li class='select2-ajax-error'>" + k(u.formatAjaxError, u.element, o.jqXHR, o.textStatus, o.errorThrown) + "</li>");
                                    if (this.context = o.context === e ? null : o.context, this.opts.createSearchChoice && "" !== c.val() && (a = this.opts.createSearchChoice.call(d, c.val(), o.results), a !== e && null !== a && d.id(a) !== e && null !== d.id(a) && 0 === t(o.results).filter(function() {
                                            return r(d.id(this), d.id(a))
                                        }).length && this.opts.createSearchChoicePosition(o.results, a)), 0 === o.results.length && S(u.formatNoMatches, "formatNoMatches")) return void s("<li class='select2-no-results'>" + k(u.formatNoMatches, u.element, c.val()) + "</li>");
                                    h.empty(), d.opts.populateResults.call(this, h, o.results, {
                                        term: c.val(),
                                        page: this.resultsPage,
                                        context: null
                                    }), o.more === !0 && S(u.formatLoadMore, "formatLoadMore") && (h.append("<li class='select2-more-results'>" + u.escapeMarkup(k(u.formatLoadMore, u.element, this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                        d.loadMoreIfNeeded()
                                    }, 10)), this.postprocessResults(o, i), n(), this.opts.element.trigger({
                                        type: "select2-loaded",
                                        items: o
                                    })
                                }
                            })
                        })
                    }
                },
                cancel: function() {
                    this.close()
                },
                blur: function() {
                    this.opts.selectOnBlur && this.selectHighlighted({
                        noFocus: !0
                    }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
                },
                focusSearch: function() {
                    p(this.search)
                },
                selectHighlighted: function(t) {
                    if (this._touchMoved) return void this.clearTouchMoved();
                    var e = this.highlight(),
                        i = this.results.find(".select2-highlighted"),
                        n = i.closest(".select2-result").data("select2-data");
                    n ? (this.highlight(e), this.onSelect(n, t)) : t && t.noFocus && this.close()
                },
                getPlaceholder: function() {
                    var t;
                    return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((t = this.getPlaceholderOption()) !== e ? t.text() : e)
                },
                getPlaceholderOption: function() {
                    if (this.select) {
                        var i = this.select.children("option").first();
                        if (this.opts.placeholderOption !== e) return "first" === this.opts.placeholderOption && i || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
                        if ("" === t.trim(i.text()) && "" === i.val()) return i
                    }
                },
                initContainerWidth: function() {
                    function i() {
                        var i, n, s, o, r, a;
                        if ("off" === this.opts.width) return null;
                        if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                        if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                            if (i = this.opts.element.attr("style"), i !== e)
                                for (n = i.split(";"), o = 0, r = n.length; r > o; o += 1)
                                    if (a = n[o].replace(/\s/g, ""), s = a.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== s && s.length >= 1) return s[1];
                            return "resolve" === this.opts.width ? (i = this.opts.element.css("width"), i.indexOf("%") > 0 ? i : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                        }
                        return t.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                    }
                    var n = i.call(this);
                    null !== n && this.container.css("width", n);
                }
            }), I = P(A, {
                createContainer: function() {
                    var e = t(document.createElement("div")).attr({
                        "class": "select2-container"
                    }).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""));
                    return e
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
                },
                opening: function() {
                    var i, n, s;
                    this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), i = this.search.get(0), i.createTextRange ? (n = i.createTextRange(), n.collapse(!1), n.select()) : i.setSelectionRange && (s = this.search.val().length, i.setSelectionRange(s, s))), "" === this.search.val() && this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(t.Event("select2-open"))
                },
                close: function() {
                    this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
                },
                focus: function() {
                    this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
                },
                isFocused: function() {
                    return this.container.hasClass("select2-container-active")
                },
                cancel: function() {
                    this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus()
                },
                destroy: function() {
                    t("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), D.call(this, "selection", "focusser")
                },
                initContainer: function() {
                    var e, n, s = this.container,
                        o = this.dropdown,
                        r = $();
                    this.showSearch(!(this.opts.minimumResultsForSearch < 0)), this.selection = e = s.find(".select2-choice"), this.focusser = s.find(".select2-focusser"), e.find(".select2-chosen").attr("id", "select2-chosen-" + r), this.focusser.attr("aria-labelledby", "select2-chosen-" + r), this.results.attr("id", "select2-results-" + r), this.search.attr("aria-owns", "select2-results-" + r), this.focusser.attr("id", "s2id_autogen" + r), n = t("label[for='" + this.opts.element.attr("id") + "']"), this.focusser.prev().text(n.text()).attr("for", this.focusser.attr("id"));
                    var a = this.opts.element.attr("title");
                    this.opts.element.attr("title", a || n.text()), this.focusser.attr("tabindex", this.elementTabIndex), this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(t("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("keydown", this.bind(function(t) {
                        if (this.isInterfaceEnabled() && 229 != t.keyCode) {
                            if (t.which === M.PAGE_UP || t.which === M.PAGE_DOWN) return void m(t);
                            switch (t.which) {
                                case M.UP:
                                case M.DOWN:
                                    return this.moveHighlight(t.which === M.UP ? -1 : 1), void m(t);
                                case M.ENTER:
                                    return this.selectHighlighted(), void m(t);
                                case M.TAB:
                                    return void this.selectHighlighted({
                                        noFocus: !0
                                    });
                                case M.ESC:
                                    return this.cancel(t), void m(t)
                            }
                        }
                    })), this.search.on("blur", this.bind(function() {
                        document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function() {
                            this.opened() && this.search.focus()
                        }), 0)
                    })), this.focusser.on("keydown", this.bind(function(t) {
                        if (this.isInterfaceEnabled() && t.which !== M.TAB && !M.isControl(t) && !M.isFunctionKey(t) && t.which !== M.ESC) {
                            if (this.opts.openOnEnter === !1 && t.which === M.ENTER) return void m(t);
                            if (t.which == M.DOWN || t.which == M.UP || t.which == M.ENTER && this.opts.openOnEnter) {
                                if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey) return;
                                return this.open(), void m(t)
                            }
                            return t.which == M.DELETE || t.which == M.BACKSPACE ? (this.opts.allowClear && this.clear(), void m(t)) : void 0
                        }
                    })), c(this.focusser), this.focusser.on("keyup-change input", this.bind(function(t) {
                        if (this.opts.minimumResultsForSearch >= 0) {
                            if (t.stopPropagation(), this.opened()) return;
                            this.open()
                        }
                    })), e.on("mousedown touchstart", "abbr", this.bind(function(t) {
                        this.isInterfaceEnabled() && (this.clear(), g(t), this.close(), this.selection.focus())
                    })), e.on("mousedown touchstart", this.bind(function(n) {
                        i(e), this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), m(n)
                    })), o.on("mousedown touchstart", this.bind(function() {
                        this.opts.shouldFocusInput(this) && this.search.focus()
                    })), e.on("focus", this.bind(function(t) {
                        m(t)
                    })), this.focusser.on("focus", this.bind(function() {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                    })).on("blur", this.bind(function() {
                        this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(t.Event("select2-blur")))
                    })), this.search.on("focus", this.bind(function() {
                        this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                    })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.setPlaceholder()
                },
                clear: function(e) {
                    var i = this.selection.data("select2-data");
                    if (i) {
                        var n = t.Event("select2-clearing");
                        if (this.opts.element.trigger(n), n.isDefaultPrevented()) return;
                        var s = this.getPlaceholderOption();
                        this.opts.element.val(s ? s.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), e !== !1 && (this.opts.element.trigger({
                            type: "select2-removed",
                            val: this.id(i),
                            choice: i
                        }), this.triggerChange({
                            removed: i
                        }))
                    }
                },
                initSelection: function() {
                    if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), this.setPlaceholder();
                    else {
                        var t = this;
                        this.opts.initSelection.call(null, this.opts.element, function(i) {
                            i !== e && null !== i && (t.updateSelection(i), t.close(), t.setPlaceholder(), t.nextSearchTerm = t.opts.nextSearchTerm(i, t.search.val()))
                        })
                    }
                },
                isPlaceholderOptionSelected: function() {
                    var t;
                    return this.getPlaceholder() !== e && ((t = this.getPlaceholderOption()) !== e && t.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === e || null === this.opts.element.val())
                },
                prepareOpts: function() {
                    var e = this.parent.prepareOpts.apply(this, arguments),
                        i = this;
                    return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(t, e) {
                        var n = t.find("option").filter(function() {
                            return this.selected && !this.disabled
                        });
                        e(i.optionToData(n))
                    } : "data" in e && (e.initSelection = e.initSelection || function(i, n) {
                        var s = i.val(),
                            o = null;
                        e.query({
                            matcher: function(t, i, n) {
                                var a = r(s, e.id(n));
                                return a && (o = n), a
                            },
                            callback: t.isFunction(n) ? function() {
                                n(o)
                            } : t.noop
                        })
                    }), e
                },
                getPlaceholder: function() {
                    return this.select && this.getPlaceholderOption() === e ? e : this.parent.getPlaceholder.apply(this, arguments)
                },
                setPlaceholder: function() {
                    var t = this.getPlaceholder();
                    if (this.isPlaceholderOptionSelected() && t !== e) {
                        if (this.select && this.getPlaceholderOption() === e) return;
                        this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(t)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                    }
                },
                postprocessResults: function(t, e, i) {
                    var n = 0,
                        s = this;
                    if (this.findHighlightableChoices().each2(function(t, e) {
                            return r(s.id(e.data("select2-data")), s.opts.element.val()) ? (n = t, !1) : void 0
                        }), i !== !1 && this.highlight(e === !0 && n >= 0 ? n : 0), e === !0) {
                        var o = this.opts.minimumResultsForSearch;
                        o >= 0 && this.showSearch(T(t.results) >= o)
                    }
                },
                showSearch: function(e) {
                    this.showSearchInput !== e && (this.showSearchInput = e, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !e), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !e), t(this.dropdown, this.container).toggleClass("select2-with-searchbox", e))
                },
                onSelect: function(t, e) {
                    if (this.triggerSelect(t)) {
                        var i = this.opts.element.val(),
                            n = this.data();
                        this.opts.element.val(this.id(t)), this.updateSelection(t), this.opts.element.trigger({
                            type: "select2-selected",
                            val: this.id(t),
                            choice: t
                        }), this.nextSearchTerm = this.opts.nextSearchTerm(t, this.search.val()), this.close(), e && e.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), r(i, this.id(t)) || this.triggerChange({
                            added: t,
                            removed: n
                        })
                    }
                },
                updateSelection: function(t) {
                    var i, n, s = this.selection.find(".select2-chosen");
                    this.selection.data("select2-data", t), s.empty(), null !== t && (i = this.opts.formatSelection(t, s, this.opts.escapeMarkup)), i !== e && s.append(i), n = this.opts.formatSelectionCssClass(t, s), n !== e && s.addClass(n), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== e && this.container.addClass("select2-allowclear")
                },
                val: function() {
                    var t, i = !1,
                        n = null,
                        s = this,
                        o = this.data();
                    if (0 === arguments.length) return this.opts.element.val();
                    if (t = arguments[0], arguments.length > 1 && (i = arguments[1]), this.select) this.select.val(t).find("option").filter(function() {
                        return this.selected
                    }).each2(function(t, e) {
                        return n = s.optionToData(e), !1
                    }), this.updateSelection(n), this.setPlaceholder(), i && this.triggerChange({
                        added: n,
                        removed: o
                    });
                    else {
                        if (!t && 0 !== t) return void this.clear(i);
                        if (this.opts.initSelection === e) throw new Error("cannot call val() if initSelection() is not defined");
                        this.opts.element.val(t), this.opts.initSelection(this.opts.element, function(t) {
                            s.opts.element.val(t ? s.id(t) : ""), s.updateSelection(t), s.setPlaceholder(), i && s.triggerChange({
                                added: t,
                                removed: o
                            })
                        })
                    }
                },
                clearSearch: function() {
                    this.search.val(""), this.focusser.val("")
                },
                data: function(t) {
                    var i, n = !1;
                    return 0 === arguments.length ? (i = this.selection.data("select2-data"), i == e && (i = null), i) : (arguments.length > 1 && (n = arguments[1]), void(t ? (i = this.data(), this.opts.element.val(t ? this.id(t) : ""), this.updateSelection(t), n && this.triggerChange({
                        added: t,
                        removed: i
                    })) : this.clear(n)))
                }
            }), O = P(A, {
                createContainer: function() {
                    var e = t(document.createElement("div")).attr({
                        "class": "select2-container select2-container-multi"
                    }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                    return e
                },
                prepareOpts: function() {
                    var e = this.parent.prepareOpts.apply(this, arguments),
                        i = this;
                    return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(t, e) {
                        var n = [];
                        t.find("option").filter(function() {
                            return this.selected && !this.disabled
                        }).each2(function(t, e) {
                            n.push(i.optionToData(e))
                        }), e(n)
                    } : "data" in e && (e.initSelection = e.initSelection || function(i, n) {
                        var s = a(i.val(), e.separator),
                            o = [];
                        e.query({
                            matcher: function(i, n, a) {
                                var l = t.grep(s, function(t) {
                                    return r(t, e.id(a))
                                }).length;
                                return l && o.push(a), l
                            },
                            callback: t.isFunction(n) ? function() {
                                for (var t = [], i = 0; i < s.length; i++)
                                    for (var a = s[i], l = 0; l < o.length; l++) {
                                        var c = o[l];
                                        if (r(a, e.id(c))) {
                                            t.push(c), o.splice(l, 1);
                                            break
                                        }
                                    }
                                n(t)
                            } : t.noop
                        })
                    }), e
                },
                selectChoice: function(t) {
                    var e = this.container.find(".select2-search-choice-focus");
                    e.length && t && t[0] == e[0] || (e.length && this.opts.element.trigger("choice-deselected", e), e.removeClass("select2-search-choice-focus"), t && t.length && (this.close(), t.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", t)))
                },
                destroy: function() {
                    t("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), D.call(this, "searchContainer", "selection")
                },
                initContainer: function() {
                    var e, i = ".select2-choices";
                    this.searchContainer = this.container.find(".select2-search-field"), this.selection = e = this.container.find(i);
                    var n = this;
                    this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function() {
                        n.search[0].focus(), n.selectChoice(t(this))
                    }), this.search.attr("id", "s2id_autogen" + $()), this.search.prev().text(t("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("input paste", this.bind(function() {
                        this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open())
                    })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(t) {
                        if (this.isInterfaceEnabled()) {
                            ++this.keydowns;
                            var i = e.find(".select2-search-choice-focus"),
                                n = i.prev(".select2-search-choice:not(.select2-locked)"),
                                s = i.next(".select2-search-choice:not(.select2-locked)"),
                                o = f(this.search);
                            if (i.length && (t.which == M.LEFT || t.which == M.RIGHT || t.which == M.BACKSPACE || t.which == M.DELETE || t.which == M.ENTER)) {
                                var r = i;
                                return t.which == M.LEFT && n.length ? r = n : t.which == M.RIGHT ? r = s.length ? s : null : t.which === M.BACKSPACE ? this.unselect(i.first()) && (this.search.width(10), r = n.length ? n : s) : t.which == M.DELETE ? this.unselect(i.first()) && (this.search.width(10), r = s.length ? s : null) : t.which == M.ENTER && (r = null), this.selectChoice(r), m(t), void(r && r.length || this.open())
                            }
                            if ((t.which === M.BACKSPACE && 1 == this.keydowns || t.which == M.LEFT) && 0 == o.offset && !o.length) return this.selectChoice(e.find(".select2-search-choice:not(.select2-locked)").last()), void m(t);
                            if (this.selectChoice(null), this.opened()) switch (t.which) {
                                case M.UP:
                                case M.DOWN:
                                    return this.moveHighlight(t.which === M.UP ? -1 : 1), void m(t);
                                case M.ENTER:
                                    return this.selectHighlighted(), void m(t);
                                case M.TAB:
                                    return this.selectHighlighted({
                                        noFocus: !0
                                    }), void this.close();
                                case M.ESC:
                                    return this.cancel(t), void m(t)
                            }
                            if (t.which !== M.TAB && !M.isControl(t) && !M.isFunctionKey(t) && t.which !== M.BACKSPACE && t.which !== M.ESC) {
                                if (t.which === M.ENTER) {
                                    if (this.opts.openOnEnter === !1) return;
                                    if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey) return
                                }
                                this.open(), (t.which === M.PAGE_UP || t.which === M.PAGE_DOWN) && m(t), t.which === M.ENTER && m(t)
                            }
                        }
                    })), this.search.on("keyup", this.bind(function() {
                        this.keydowns = 0, this.resizeSearch()
                    })), this.search.on("blur", this.bind(function(e) {
                        this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), e.stopImmediatePropagation(), this.opts.element.trigger(t.Event("select2-blur"))
                    })), this.container.on("click", i, this.bind(function(e) {
                        this.isInterfaceEnabled() && (t(e.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.open(), this.focusSearch(), e.preventDefault()))
                    })), this.container.on("focus", i, this.bind(function() {
                        this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                    })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.clearSearch()
                },
                enableInterface: function() {
                    this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
                },
                initSelection: function() {
                    if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                        var t = this;
                        this.opts.initSelection.call(null, this.opts.element, function(i) {
                            i !== e && null !== i && (t.updateSelection(i), t.close(), t.clearSearch())
                        })
                    }
                },
                clearSearch: function() {
                    var t = this.getPlaceholder(),
                        i = this.getMaxSearchWidth();
                    t !== e && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(t).addClass("select2-default"), this.search.width(i > 0 ? i : this.container.css("width"))) : this.search.val("").width(10)
                },
                clearPlaceholder: function() {
                    this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
                },
                opening: function() {
                    this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), "" === this.search.val() && this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.search.select()), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), this.opts.element.trigger(t.Event("select2-open"))
                },
                close: function() {
                    this.opened() && this.parent.close.apply(this, arguments)
                },
                focus: function() {
                    this.close(), this.search.focus()
                },
                isFocused: function() {
                    return this.search.hasClass("select2-focused")
                },
                updateSelection: function(e) {
                    var i = [],
                        n = [],
                        o = this;
                    t(e).each(function() {
                        s(o.id(this), i) < 0 && (i.push(o.id(this)), n.push(this))
                    }), e = n, this.selection.find(".select2-search-choice").remove(), t(e).each(function() {
                        o.addSelectedChoice(this)
                    }), o.postprocessResults()
                },
                tokenize: function() {
                    var t = this.search.val();
                    t = this.opts.tokenizer.call(this, t, this.data(), this.bind(this.onSelect), this.opts), null != t && t != e && (this.search.val(t), t.length > 0 && this.open())
                },
                onSelect: function(t, i) {
                    this.triggerSelect(t) && "" !== t.text && (this.addSelectedChoice(t), this.opts.element.trigger({
                        type: "selected",
                        val: this.id(t),
                        choice: t
                    }), this.nextSearchTerm = this.opts.nextSearchTerm(t, this.search.val()), this.clearSearch(), this.updateResults(), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(t, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.updateResults(), this.search.select()), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
                        added: t
                    }), i && i.noFocus || this.focusSearch())
                },
                cancel: function() {
                    this.close(), this.focusSearch()
                },
                addSelectedChoice: function(i) {
                    var n, s, o = !i.locked,
                        r = t("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                        a = t("<li class='select2-search-choice select2-locked'><div></div></li>"),
                        l = o ? r : a,
                        c = this.id(i),
                        h = this.getVal();
                    n = this.opts.formatSelection(i, l.find("div"), this.opts.escapeMarkup), n != e && l.find("div").replaceWith("<div>" + n + "</div>"), s = this.opts.formatSelectionCssClass(i, l.find("div")), s != e && l.addClass(s), o && l.find(".select2-search-choice-close").on("mousedown", m).on("click dblclick", this.bind(function(e) {
                        this.isInterfaceEnabled() && (this.unselect(t(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), m(e), this.close(), this.focusSearch())
                    })).on("focus", this.bind(function() {
                        this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                    })), l.data("select2-data", i), l.insertBefore(this.searchContainer), h.push(c), this.setVal(h)
                },
                unselect: function(e) {
                    var i, n, o = this.getVal();
                    if (e = e.closest(".select2-search-choice"), 0 === e.length) throw "Invalid argument: " + e + ". Must be .select2-search-choice";
                    if (i = e.data("select2-data")) {
                        var r = t.Event("select2-removing");
                        if (r.val = this.id(i), r.choice = i, this.opts.element.trigger(r), r.isDefaultPrevented()) return !1;
                        for (;
                            (n = s(this.id(i), o)) >= 0;) o.splice(n, 1), this.setVal(o), this.select && this.postprocessResults();
                        return e.remove(), this.opts.element.trigger({
                            type: "select2-removed",
                            val: this.id(i),
                            choice: i
                        }), this.triggerChange({
                            removed: i
                        }), !0
                    }
                },
                postprocessResults: function(t, e, i) {
                    var n = this.getVal(),
                        o = this.results.find(".select2-result"),
                        r = this.results.find(".select2-result-with-children"),
                        a = this;
                    o.each2(function(t, e) {
                        var i = a.id(e.data("select2-data"));
                        s(i, n) >= 0 && (e.addClass("select2-selected"), e.find(".select2-result-selectable").addClass("select2-selected"))
                    }), r.each2(function(t, e) {
                        e.is(".select2-result-selectable") || 0 !== e.find(".select2-result-selectable:not(.select2-selected)").length || e.addClass("select2-selected")
                    }), -1 == this.highlight() && i !== !1 && a.highlight(0), !this.opts.createSearchChoice && !o.filter(".select2-result:not(.select2-selected)").length > 0 && (!t || t && !t.more && 0 === this.results.find(".select2-no-results").length) && S(a.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + k(a.opts.formatNoMatches, a.opts.element, a.search.val()) + "</li>")
                },
                getMaxSearchWidth: function() {
                    return this.selection.width() - l(this.search)
                },
                resizeSearch: function() {
                    var t, e, i, n, s, o = l(this.search);
                    t = v(this.search) + 10, e = this.search.offset().left, i = this.selection.width(), n = this.selection.offset().left, s = i - (e - n) - o, t > s && (s = i - o), 40 > s && (s = i - o), 0 >= s && (s = t), this.search.width(Math.floor(s))
                },
                getVal: function() {
                    var t;
                    return this.select ? (t = this.select.val(), null === t ? [] : t) : (t = this.opts.element.val(), a(t, this.opts.separator))
                },
                setVal: function(e) {
                    var i;
                    this.select ? this.select.val(e) : (i = [], t(e).each(function() {
                        s(this, i) < 0 && i.push(this)
                    }), this.opts.element.val(0 === i.length ? "" : i.join(this.opts.separator)))
                },
                buildChangeDetails: function(t, e) {
                    for (var e = e.slice(0), t = t.slice(0), i = 0; i < e.length; i++)
                        for (var n = 0; n < t.length; n++) r(this.opts.id(e[i]), this.opts.id(t[n])) && (e.splice(i, 1), i > 0 && i--, t.splice(n, 1), n--);
                    return {
                        added: e,
                        removed: t
                    }
                },
                val: function(i, n) {
                    var s, o = this;
                    if (0 === arguments.length) return this.getVal();
                    if (s = this.data(), s.length || (s = []), !i && 0 !== i) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void(n && this.triggerChange({
                        added: this.data(),
                        removed: s
                    }));
                    if (this.setVal(i), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), n && this.triggerChange(this.buildChangeDetails(s, this.data()));
                    else {
                        if (this.opts.initSelection === e) throw new Error("val() cannot be called if initSelection() is not defined");
                        this.opts.initSelection(this.opts.element, function(e) {
                            var i = t.map(e, o.id);
                            o.setVal(i), o.updateSelection(e), o.clearSearch(), n && o.triggerChange(o.buildChangeDetails(s, o.data()))
                        })
                    }
                    this.clearSearch()
                },
                onSortStart: function() {
                    if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                    this.search.width(0), this.searchContainer.hide()
                },
                onSortEnd: function() {
                    var e = [],
                        i = this;
                    this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                        e.push(i.opts.id(t(this).data("select2-data")))
                    }), this.setVal(e), this.triggerChange()
                },
                data: function(e, i) {
                    var n, s, o = this;
                    return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function() {
                        return t(this).data("select2-data")
                    }).get() : (s = this.data(), e || (e = []), n = t.map(e, function(t) {
                        return o.opts.id(t)
                    }), this.setVal(n), this.updateSelection(e), this.clearSearch(), void(i && this.triggerChange(this.buildChangeDetails(s, this.data()))))
                }
            }), t.fn.select2 = function() {
                var i, n, o, r, a, l = Array.prototype.slice.call(arguments, 0),
                    c = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
                    h = ["opened", "isFocused", "container", "dropdown"],
                    u = ["val", "data"],
                    d = {
                        search: "externalSearch"
                    };
                return this.each(function() {
                    if (0 === l.length || "object" == typeof l[0]) i = 0 === l.length ? {} : t.extend({}, l[0]), i.element = t(this), "select" === i.element.get(0).tagName.toLowerCase() ? a = i.element.prop("multiple") : (a = i.multiple || !1, "tags" in i && (i.multiple = a = !0)), n = a ? new window.Select2["class"].multi : new window.Select2["class"].single, n.init(i);
                    else {
                        if ("string" != typeof l[0]) throw "Invalid arguments to select2 plugin: " + l;
                        if (s(l[0], c) < 0) throw "Unknown method: " + l[0];
                        if (r = e, n = t(this).data("select2"), n === e) return;
                        if (o = l[0], "container" === o ? r = n.container : "dropdown" === o ? r = n.dropdown : (d[o] && (o = d[o]), r = n[o].apply(n, l.slice(1))), s(l[0], h) >= 0 || s(l[0], u) >= 0 && 1 == l.length) return !1
                    }
                }), r === e ? this : r
            }, t.fn.select2.defaults = {
                width: "copy",
                loadMorePadding: 0,
                closeOnSelect: !0,
                openOnEnter: !0,
                containerCss: {},
                dropdownCss: {},
                containerCssClass: "",
                dropdownCssClass: "",
                formatResult: function(t, e, i, n) {
                    var s = [];
                    return b(t.text, i.term, s, n), s.join("")
                },
                formatSelection: function(t, i, n) {
                    return t ? n(t.text) : e
                },
                sortResults: function(t) {
                    return t
                },
                formatResultCssClass: function(t) {
                    return t.css
                },
                formatSelectionCssClass: function() {
                    return e
                },
                minimumResultsForSearch: 0,
                minimumInputLength: 0,
                maximumInputLength: null,
                maximumSelectionSize: 0,
                id: function(t) {
                    return t == e ? null : t.id
                },
                matcher: function(t, e) {
                    return n("" + e).toUpperCase().indexOf(n("" + t).toUpperCase()) >= 0
                },
                separator: ",",
                tokenSeparators: [],
                tokenizer: E,
                escapeMarkup: w,
                blurOnChange: !1,
                selectOnBlur: !1,
                adaptContainerCssClass: function(t) {
                    return t
                },
                adaptDropdownCssClass: function() {
                    return null
                },
                nextSearchTerm: function() {
                    return e
                },
                searchInputPlaceholder: "",
                createSearchChoicePosition: "top",
                shouldFocusInput: function(t) {
                    var e = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
                    return !(e && t.opts.minimumResultsForSearch < 0)
                }
            }, t.fn.select2.locales = [], t.fn.select2.locales.en = {
                formatMatches: function(t) {
                    return 1 === t ? "One result is available, press enter to select it." : t + " results are available, use up and down arrow keys to navigate."
                },
                formatNoMatches: function() {
                    return "No matches found"
                },
                formatAjaxError: function() {
                    return "Loading failed"
                },
                formatInputTooShort: function(t, e) {
                    var i = e - t.length;
                    return "Please enter " + i + " or more character" + (1 == i ? "" : "s")
                },
                formatInputTooLong: function(t, e) {
                    var i = t.length - e;
                    return "Please delete " + i + " character" + (1 == i ? "" : "s")
                },
                formatSelectionTooBig: function(t) {
                    return "You can only select " + t + " item" + (1 == t ? "" : "s")
                },
                formatLoadMore: function() {
                    return "Loading more results\u2026"
                },
                formatSearching: function() {
                    return "Searching\u2026"
                }
            }, t.extend(t.fn.select2.defaults, t.fn.select2.locales.en), t.fn.select2.ajaxDefaults = {
                transport: t.ajax,
                params: {
                    type: "GET",
                    cache: !1,
                    dataType: "json"
                }
            }, window.Select2 = {
                query: {
                    ajax: C,
                    local: x,
                    tags: _
                },
                util: {
                    debounce: u,
                    markMatch: b,
                    escapeMarkup: w,
                    stripDiacritics: n
                },
                "class": {
                    "abstract": A,
                    single: I,
                    multi: O
                }
            }
        }
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            switch (arguments.length) {
                case 2:
                    return null != t ? t : e;
                case 3:
                    return null != t ? t : null != e ? e : i;
                default:
                    throw new Error("Implement me")
            }
        }

        function i(t, e) {
            return kt.call(t, e)
        }

        function n() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1
            }
        }

        function s(t) {
            bt.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
        }

        function o(t, e) {
            var i = !0;
            return d(function() {
                return i && (s(t), i = !1), e.apply(this, arguments)
            }, e)
        }

        function r(t, e) {
            ge[t] || (s(e), ge[t] = !0)
        }

        function a(t, e) {
            return function(i) {
                return m(t.call(this, i), e)
            }
        }

        function l(t, e) {
            return function(i) {
                return this.localeData().ordinal(t.call(this, i), e)
            }
        }

        function c() {}

        function h(t, e) {
            e !== !1 && A(t), p(this, t), this._d = new Date(+t._d)
        }

        function u(t) {
            var e = S(t),
                i = e.year || 0,
                n = e.quarter || 0,
                s = e.month || 0,
                o = e.week || 0,
                r = e.day || 0,
                a = e.hour || 0,
                l = e.minute || 0,
                c = e.second || 0,
                h = e.millisecond || 0;
            this._milliseconds = +h + 1e3 * c + 6e4 * l + 36e5 * a, this._days = +r + 7 * o, this._months = +s + 3 * n + 12 * i, this._data = {}, this._locale = bt.localeData(), this._bubble()
        }

        function d(t, e) {
            for (var n in e) i(e, n) && (t[n] = e[n]);
            return i(e, "toString") && (t.toString = e.toString), i(e, "valueOf") && (t.valueOf = e.valueOf), t
        }

        function p(t, e) {
            var i, n, s;
            if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject), "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l), "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm), "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset), "undefined" != typeof e._pf && (t._pf = e._pf), "undefined" != typeof e._locale && (t._locale = e._locale), $t.length > 0)
                for (i in $t) n = $t[i], s = e[n], "undefined" != typeof s && (t[n] = s);
            return t
        }

        function f(t) {
            return 0 > t ? Math.ceil(t) : Math.floor(t)
        }

        function m(t, e, i) {
            for (var n = "" + Math.abs(t), s = t >= 0; n.length < e;) n = "0" + n;
            return (s ? i ? "+" : "" : "-") + n
        }

        function g(t, e) {
            var i = {
                milliseconds: 0,
                months: 0
            };
            return i.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(i.months, "M").isAfter(e) && --i.months, i.milliseconds = +e - +t.clone().add(i.months, "M"), i
        }

        function v(t, e) {
            var i;
            return e = L(e, t), t.isBefore(e) ? i = g(t, e) : (i = g(e, t), i.milliseconds = -i.milliseconds, i.months = -i.months), i
        }

        function y(t, e) {
            return function(i, n) {
                var s, o;
                return null === n || isNaN(+n) || (r(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), o = i, i = n, n = o), i = "string" == typeof i ? +i : i, s = bt.duration(i, n), b(this, s, t), this
            }
        }

        function b(t, e, i, n) {
            var s = e._milliseconds,
                o = e._days,
                r = e._months;
            n = null == n || n, s && t._d.setTime(+t._d + s * i), o && pt(t, "Date", dt(t, "Date") + o * i), r && ut(t, dt(t, "Month") + r * i), n && bt.updateOffset(t, o || r)
        }

        function w(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function C(t) {
            return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
        }

        function x(t, e, i) {
            var n, s = Math.min(t.length, e.length),
                o = Math.abs(t.length - e.length),
                r = 0;
            for (n = 0; s > n; n++)(i && t[n] !== e[n] || !i && T(t[n]) !== T(e[n])) && r++;
            return r + o
        }

        function _(t) {
            if (t) {
                var e = t.toLowerCase().replace(/(.)s$/, "$1");
                t = ce[t] || he[e] || e
            }
            return t
        }

        function S(t) {
            var e, n, s = {};
            for (n in t) i(t, n) && (e = _(n), e && (s[e] = t[n]));
            return s
        }

        function k(e) {
            var i, n;
            if (0 === e.indexOf("week")) i = 7, n = "day";
            else {
                if (0 !== e.indexOf("month")) return;
                i = 12, n = "month"
            }
            bt[e] = function(s, o) {
                var r, a, l = bt._locale[e],
                    c = [];
                if ("number" == typeof s && (o = s, s = t), a = function(t) {
                        var e = bt().utc().set(n, t);
                        return l.call(bt._locale, e, s || "")
                    }, null != o) return a(o);
                for (r = 0; i > r; r++) c.push(a(r));
                return c
            }
        }

        function T(t) {
            var e = +t,
                i = 0;
            return 0 !== e && isFinite(e) && (i = e >= 0 ? Math.floor(e) : Math.ceil(e)), i
        }

        function E(t, e) {
            return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
        }

        function D(t, e, i) {
            return at(bt([t, 11, 31 + e - i]), e, i).week
        }

        function P(t) {
            return M(t) ? 366 : 365
        }

        function M(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        }

        function A(t) {
            var e;
            t._a && -2 === t._pf.overflow && (e = t._a[Et] < 0 || t._a[Et] > 11 ? Et : t._a[Dt] < 1 || t._a[Dt] > E(t._a[Tt], t._a[Et]) ? Dt : t._a[Pt] < 0 || t._a[Pt] > 23 ? Pt : t._a[Mt] < 0 || t._a[Mt] > 59 ? Mt : t._a[At] < 0 || t._a[At] > 59 ? At : t._a[It] < 0 || t._a[It] > 999 ? It : -1, t._pf._overflowDayOfYear && (Tt > e || e > Dt) && (e = Dt), t._pf.overflow = e)
        }

        function I(t) {
            return null == t._isValid && (t._isValid = !isNaN(t._d.getTime()) && t._pf.overflow < 0 && !t._pf.empty && !t._pf.invalidMonth && !t._pf.nullInput && !t._pf.invalidFormat && !t._pf.userInvalidated, t._strict && (t._isValid = t._isValid && 0 === t._pf.charsLeftOver && 0 === t._pf.unusedTokens.length)), t._isValid
        }

        function O(t) {
            return t ? t.toLowerCase().replace("_", "-") : t
        }

        function $(t) {
            for (var e, i, n, s, o = 0; o < t.length;) {
                for (s = O(t[o]).split("-"), e = s.length, i = O(t[o + 1]), i = i ? i.split("-") : null; e > 0;) {
                    if (n = N(s.slice(0, e).join("-"))) return n;
                    if (i && i.length >= e && x(s, i, !0) >= e - 1) break;
                    e--
                }
                o++
            }
            return null
        }

        function N(t) {
            var e = null;
            if (!Ot[t] && Nt) try {
                e = bt.locale(), require("./locale/" + t), bt.locale(e)
            } catch (t) {}
            return Ot[t]
        }

        function L(t, e) {
            return e._isUTC ? bt(t).zone(e._offset || 0) : bt(t).local()
        }

        function R(t) {
            return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }

        function H(t) {
            var e, i, n = t.match(zt);
            for (e = 0, i = n.length; i > e; e++) n[e] = me[n[e]] ? me[n[e]] : R(n[e]);
            return function(s) {
                var o = "";
                for (e = 0; i > e; e++) o += n[e] instanceof Function ? n[e].call(s, t) : n[e];
                return o
            }
        }

        function z(t, e) {
            return t.isValid() ? (e = F(e, t.localeData()), ue[e] || (ue[e] = H(e)), ue[e](t)) : t.localeData().invalidDate()
        }

        function F(t, e) {
            function i(t) {
                return e.longDateFormat(t) || t
            }
            var n = 5;
            for (Ft.lastIndex = 0; n >= 0 && Ft.test(t);) t = t.replace(Ft, i), Ft.lastIndex = 0, n -= 1;
            return t
        }

        function j(t, e) {
            var i, n = e._strict;
            switch (t) {
                case "Q":
                    return Qt;
                case "DDDD":
                    return Jt;
                case "YYYY":
                case "GGGG":
                case "gggg":
                    return n ? te : Ut;
                case "Y":
                case "G":
                case "g":
                    return ie;
                case "YYYYYY":
                case "YYYYY":
                case "GGGGG":
                case "ggggg":
                    return n ? ee : qt;
                case "S":
                    if (n) return Qt;
                case "SS":
                    if (n) return Zt;
                case "SSS":
                    if (n) return Jt;
                case "DDD":
                    return Wt;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                    return Yt;
                case "a":
                case "A":
                    return e._locale._meridiemParse;
                case "X":
                    return Gt;
                case "Z":
                case "ZZ":
                    return Vt;
                case "T":
                    return Xt;
                case "SSSS":
                    return Bt;
                case "MM":
                case "DD":
                case "YY":
                case "GG":
                case "gg":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "ww":
                case "WW":
                    return n ? Zt : jt;
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                case "w":
                case "W":
                case "e":
                case "E":
                    return jt;
                case "Do":
                    return Kt;
                default:
                    return i = new RegExp(K(G(t.replace("\\", "")), "i"))
            }
        }

        function W(t) {
            t = t || "";
            var e = t.match(Vt) || [],
                i = e[e.length - 1] || [],
                n = (i + "").match(ae) || ["-", 0, 0],
                s = +(60 * n[1]) + T(n[2]);
            return "+" === n[0] ? -s : s
        }

        function U(t, e, i) {
            var n, s = i._a;
            switch (t) {
                case "Q":
                    null != e && (s[Et] = 3 * (T(e) - 1));
                    break;
                case "M":
                case "MM":
                    null != e && (s[Et] = T(e) - 1);
                    break;
                case "MMM":
                case "MMMM":
                    n = i._locale.monthsParse(e), null != n ? s[Et] = n : i._pf.invalidMonth = e;
                    break;
                case "D":
                case "DD":
                    null != e && (s[Dt] = T(e));
                    break;
                case "Do":
                    null != e && (s[Dt] = T(parseInt(e, 10)));
                    break;
                case "DDD":
                case "DDDD":
                    null != e && (i._dayOfYear = T(e));
                    break;
                case "YY":
                    s[Tt] = bt.parseTwoDigitYear(e);
                    break;
                case "YYYY":
                case "YYYYY":
                case "YYYYYY":
                    s[Tt] = T(e);
                    break;
                case "a":
                case "A":
                    i._isPm = i._locale.isPM(e);
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    s[Pt] = T(e);
                    break;
                case "m":
                case "mm":
                    s[Mt] = T(e);
                    break;
                case "s":
                case "ss":
                    s[At] = T(e);
                    break;
                case "S":
                case "SS":
                case "SSS":
                case "SSSS":
                    s[It] = T(1e3 * ("0." + e));
                    break;
                case "X":
                    i._d = new Date(1e3 * parseFloat(e));
                    break;
                case "Z":
                case "ZZ":
                    i._useUTC = !0, i._tzm = W(e);
                    break;
                case "dd":
                case "ddd":
                case "dddd":
                    n = i._locale.weekdaysParse(e), null != n ? (i._w = i._w || {}, i._w.d = n) : i._pf.invalidWeekday = e;
                    break;
                case "w":
                case "ww":
                case "W":
                case "WW":
                case "d":
                case "e":
                case "E":
                    t = t.substr(0, 1);
                case "gggg":
                case "GGGG":
                case "GGGGG":
                    t = t.substr(0, 2), e && (i._w = i._w || {}, i._w[t] = T(e));
                    break;
                case "gg":
                case "GG":
                    i._w = i._w || {}, i._w[t] = bt.parseTwoDigitYear(e)
            }
        }

        function q(t) {
            var i, n, s, o, r, a, l;
            i = t._w, null != i.GG || null != i.W || null != i.E ? (r = 1, a = 4, n = e(i.GG, t._a[Tt], at(bt(), 1, 4).year), s = e(i.W, 1), o = e(i.E, 1)) : (r = t._locale._week.dow, a = t._locale._week.doy, n = e(i.gg, t._a[Tt], at(bt(), r, a).year), s = e(i.w, 1), null != i.d ? (o = i.d, r > o && ++s) : o = null != i.e ? i.e + r : r), l = lt(n, s, o, a, r), t._a[Tt] = l.year, t._dayOfYear = l.dayOfYear
        }

        function B(t) {
            var i, n, s, o, r = [];
            if (!t._d) {
                for (s = V(t), t._w && null == t._a[Dt] && null == t._a[Et] && q(t), t._dayOfYear && (o = e(t._a[Tt], s[Tt]), t._dayOfYear > P(o) && (t._pf._overflowDayOfYear = !0), n = nt(o, 0, t._dayOfYear), t._a[Et] = n.getUTCMonth(), t._a[Dt] = n.getUTCDate()), i = 0; 3 > i && null == t._a[i]; ++i) t._a[i] = r[i] = s[i];
                for (; 7 > i; i++) t._a[i] = r[i] = null == t._a[i] ? 2 === i ? 1 : 0 : t._a[i];
                t._d = (t._useUTC ? nt : it).apply(null, r), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() + t._tzm)
            }
        }

        function Y(t) {
            var e;
            t._d || (e = S(t._i), t._a = [e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond], B(t))
        }

        function V(t) {
            var e = new Date;
            return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()]
        }

        function X(t) {
            if (t._f === bt.ISO_8601) return void Z(t);
            t._a = [], t._pf.empty = !0;
            var e, i, n, s, o, r = "" + t._i,
                a = r.length,
                l = 0;
            for (n = F(t._f, t._locale).match(zt) || [], e = 0; e < n.length; e++) s = n[e], i = (r.match(j(s, t)) || [])[0], i && (o = r.substr(0, r.indexOf(i)), o.length > 0 && t._pf.unusedInput.push(o), r = r.slice(r.indexOf(i) + i.length), l += i.length), me[s] ? (i ? t._pf.empty = !1 : t._pf.unusedTokens.push(s), U(s, i, t)) : t._strict && !i && t._pf.unusedTokens.push(s);
            t._pf.charsLeftOver = a - l, r.length > 0 && t._pf.unusedInput.push(r), t._isPm && t._a[Pt] < 12 && (t._a[Pt] += 12), t._isPm === !1 && 12 === t._a[Pt] && (t._a[Pt] = 0), B(t), A(t)
        }

        function G(t) {
            return t.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, i, n, s) {
                return e || i || n || s
            })
        }

        function K(t) {
            return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }

        function Q(t) {
            var e, i, s, o, r;
            if (0 === t._f.length) return t._pf.invalidFormat = !0, void(t._d = new Date(NaN));
            for (o = 0; o < t._f.length; o++) r = 0, e = p({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._pf = n(), e._f = t._f[o], X(e), I(e) && (r += e._pf.charsLeftOver, r += 10 * e._pf.unusedTokens.length, e._pf.score = r, (null == s || s > r) && (s = r, i = e));
            d(t, i || e)
        }

        function Z(t) {
            var e, i, n = t._i,
                s = ne.exec(n);
            if (s) {
                for (t._pf.iso = !0, e = 0, i = oe.length; i > e; e++)
                    if (oe[e][1].exec(n)) {
                        t._f = oe[e][0] + (s[6] || " ");
                        break
                    }
                for (e = 0, i = re.length; i > e; e++)
                    if (re[e][1].exec(n)) {
                        t._f += re[e][0];
                        break
                    }
                n.match(Vt) && (t._f += "Z"), X(t)
            } else t._isValid = !1
        }

        function J(t) {
            Z(t), t._isValid === !1 && (delete t._isValid, bt.createFromInputFallback(t))
        }

        function tt(t, e) {
            var i, n = [];
            for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
            return n
        }

        function et(e) {
            var i, n = e._i;
            n === t ? e._d = new Date : C(n) ? e._d = new Date(+n) : null !== (i = Lt.exec(n)) ? e._d = new Date(+i[1]) : "string" == typeof n ? J(e) : w(n) ? (e._a = tt(n.slice(0), function(t) {
                return parseInt(t, 10)
            }), B(e)) : "object" == typeof n ? Y(e) : "number" == typeof n ? e._d = new Date(n) : bt.createFromInputFallback(e)
        }

        function it(t, e, i, n, s, o, r) {
            var a = new Date(t, e, i, n, s, o, r);
            return 1970 > t && a.setFullYear(t), a
        }

        function nt(t) {
            var e = new Date(Date.UTC.apply(null, arguments));
            return 1970 > t && e.setUTCFullYear(t), e
        }

        function st(t, e) {
            if ("string" == typeof t)
                if (isNaN(t)) {
                    if (t = e.weekdaysParse(t), "number" != typeof t) return null
                } else t = parseInt(t, 10);
            return t
        }

        function ot(t, e, i, n, s) {
            return s.relativeTime(e || 1, !!i, t, n)
        }

        function rt(t, e, i) {
            var n = bt.duration(t).abs(),
                s = St(n.as("s")),
                o = St(n.as("m")),
                r = St(n.as("h")),
                a = St(n.as("d")),
                l = St(n.as("M")),
                c = St(n.as("y")),
                h = s < de.s && ["s", s] || 1 === o && ["m"] || o < de.m && ["mm", o] || 1 === r && ["h"] || r < de.h && ["hh", r] || 1 === a && ["d"] || a < de.d && ["dd", a] || 1 === l && ["M"] || l < de.M && ["MM", l] || 1 === c && ["y"] || ["yy", c];
            return h[2] = e, h[3] = +t > 0, h[4] = i, ot.apply({}, h)
        }

        function at(t, e, i) {
            var n, s = i - e,
                o = i - t.day();
            return o > s && (o -= 7), s - 7 > o && (o += 7), n = bt(t).add(o, "d"), {
                week: Math.ceil(n.dayOfYear() / 7),
                year: n.year()
            }
        }

        function lt(t, e, i, n, s) {
            var o, r, a = nt(t, 0, 1).getUTCDay();
            return a = 0 === a ? 7 : a, i = null != i ? i : s, o = s - a + (a > n ? 7 : 0) - (s > a ? 7 : 0), r = 7 * (e - 1) + (i - s) + o + 1, {
                year: r > 0 ? t : t - 1,
                dayOfYear: r > 0 ? r : P(t - 1) + r
            }
        }

        function ct(e) {
            var i = e._i,
                n = e._f;
            return e._locale = e._locale || bt.localeData(e._l), null === i || n === t && "" === i ? bt.invalid({
                nullInput: !0
            }) : ("string" == typeof i && (e._i = i = e._locale.preparse(i)), bt.isMoment(i) ? new h(i, !0) : (n ? w(n) ? Q(e) : X(e) : et(e), new h(e)))
        }

        function ht(t, e) {
            var i, n;
            if (1 === e.length && w(e[0]) && (e = e[0]), !e.length) return bt();
            for (i = e[0], n = 1; n < e.length; ++n) e[n][t](i) && (i = e[n]);
            return i
        }

        function ut(t, e) {
            var i;
            return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (i = Math.min(t.date(), E(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i), t)
        }

        function dt(t, e) {
            return t._d["get" + (t._isUTC ? "UTC" : "") + e]()
        }

        function pt(t, e, i) {
            return "Month" === e ? ut(t, i) : t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
        }

        function ft(t, e) {
            return function(i) {
                return null != i ? (pt(this, t, i), bt.updateOffset(this, e), this) : dt(this, t)
            }
        }

        function mt(t) {
            return 400 * t / 146097
        }

        function gt(t) {
            return 146097 * t / 400
        }

        function vt(t) {
            bt.duration.fn[t] = function() {
                return this._data[t]
            }
        }

        function yt(t) {
            "undefined" == typeof ender && (wt = _t.moment, _t.moment = t ? o("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", bt) : bt)
        }
        for (var bt, wt, Ct, xt = "2.8.3", _t = "undefined" != typeof global ? global : this, St = Math.round, kt = Object.prototype.hasOwnProperty, Tt = 0, Et = 1, Dt = 2, Pt = 3, Mt = 4, At = 5, It = 6, Ot = {}, $t = [], Nt = "undefined" != typeof module && module.exports, Lt = /^\/?Date\((\-?\d+)/i, Rt = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ht = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, zt = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Ft = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, jt = /\d\d?/, Wt = /\d{1,3}/, Ut = /\d{1,4}/, qt = /[+\-]?\d{1,6}/, Bt = /\d+/, Yt = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Vt = /Z|[\+\-]\d\d:?\d\d/gi, Xt = /T/i, Gt = /[\+\-]?\d+(\.\d{1,3})?/, Kt = /\d{1,2}/, Qt = /\d/, Zt = /\d\d/, Jt = /\d{3}/, te = /\d{4}/, ee = /[+-]?\d{6}/, ie = /[+-]?\d+/, ne = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, se = "YYYY-MM-DDTHH:mm:ssZ", oe = [
                ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                ["YYYY-DDD", /\d{4}-\d{3}/]
            ], re = [
                ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                ["HH:mm", /(T| )\d\d:\d\d/],
                ["HH", /(T| )\d\d/]
            ], ae = /([\+\-]|\d\d)/gi, le = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
                Milliseconds: 1,
                Seconds: 1e3,
                Minutes: 6e4,
                Hours: 36e5,
                Days: 864e5,
                Months: 2592e6,
                Years: 31536e6
            }), ce = {
                ms: "millisecond",
                s: "second",
                m: "minute",
                h: "hour",
                d: "day",
                D: "date",
                w: "week",
                W: "isoWeek",
                M: "month",
                Q: "quarter",
                y: "year",
                DDD: "dayOfYear",
                e: "weekday",
                E: "isoWeekday",
                gg: "weekYear",
                GG: "isoWeekYear"
            }, he = {
                dayofyear: "dayOfYear",
                isoweekday: "isoWeekday",
                isoweek: "isoWeek",
                weekyear: "weekYear",
                isoweekyear: "isoWeekYear"
            }, ue = {}, de = {
                s: 45,
                m: 45,
                h: 22,
                d: 26,
                M: 11
            }, pe = "DDD w W M D d".split(" "), fe = "M D H h m s w W".split(" "), me = {
                M: function() {
                    return this.month() + 1
                },
                MMM: function(t) {
                    return this.localeData().monthsShort(this, t)
                },
                MMMM: function(t) {
                    return this.localeData().months(this, t)
                },
                D: function() {
                    return this.date()
                },
                DDD: function() {
                    return this.dayOfYear()
                },
                d: function() {
                    return this.day()
                },
                dd: function(t) {
                    return this.localeData().weekdaysMin(this, t)
                },
                ddd: function(t) {
                    return this.localeData().weekdaysShort(this, t)
                },
                dddd: function(t) {
                    return this.localeData().weekdays(this, t)
                },
                w: function() {
                    return this.week()
                },
                W: function() {
                    return this.isoWeek()
                },
                YY: function() {
                    return m(this.year() % 100, 2)
                },
                YYYY: function() {
                    return m(this.year(), 4)
                },
                YYYYY: function() {
                    return m(this.year(), 5)
                },
                YYYYYY: function() {
                    var t = this.year(),
                        e = t >= 0 ? "+" : "-";
                    return e + m(Math.abs(t), 6)
                },
                gg: function() {
                    return m(this.weekYear() % 100, 2)
                },
                gggg: function() {
                    return m(this.weekYear(), 4)
                },
                ggggg: function() {
                    return m(this.weekYear(), 5)
                },
                GG: function() {
                    return m(this.isoWeekYear() % 100, 2)
                },
                GGGG: function() {
                    return m(this.isoWeekYear(), 4)
                },
                GGGGG: function() {
                    return m(this.isoWeekYear(), 5)
                },
                e: function() {
                    return this.weekday()
                },
                E: function() {
                    return this.isoWeekday()
                },
                a: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !0)
                },
                A: function() {
                    return this.localeData().meridiem(this.hours(), this.minutes(), !1)
                },
                H: function() {
                    return this.hours()
                },
                h: function() {
                    return this.hours() % 12 || 12
                },
                m: function() {
                    return this.minutes()
                },
                s: function() {
                    return this.seconds()
                },
                S: function() {
                    return T(this.milliseconds() / 100)
                },
                SS: function() {
                    return m(T(this.milliseconds() / 10), 2)
                },
                SSS: function() {
                    return m(this.milliseconds(), 3)
                },
                SSSS: function() {
                    return m(this.milliseconds(), 3)
                },
                Z: function() {
                    var t = -this.zone(),
                        e = "+";
                    return 0 > t && (t = -t, e = "-"), e + m(T(t / 60), 2) + ":" + m(T(t) % 60, 2)
                },
                ZZ: function() {
                    var t = -this.zone(),
                        e = "+";
                    return 0 > t && (t = -t, e = "-"), e + m(T(t / 60), 2) + m(T(t) % 60, 2)
                },
                z: function() {
                    return this.zoneAbbr()
                },
                zz: function() {
                    return this.zoneName()
                },
                X: function() {
                    return this.unix()
                },
                Q: function() {
                    return this.quarter()
                }
            }, ge = {}, ve = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; pe.length;) Ct = pe.pop(), me[Ct + "o"] = l(me[Ct], Ct);
        for (; fe.length;) Ct = fe.pop(), me[Ct + Ct] = a(me[Ct], 2);
        me.DDDD = a(me.DDD, 3), d(c.prototype, {
            set: function(t) {
                var e, i;
                for (i in t) e = t[i], "function" == typeof e ? this[i] = e : this["_" + i] = e
            },
            _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            months: function(t) {
                return this._months[t.month()]
            },
            _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            monthsShort: function(t) {
                return this._monthsShort[t.month()]
            },
            monthsParse: function(t) {
                var e, i, n;
                for (this._monthsParse || (this._monthsParse = []), e = 0; 12 > e; e++)
                    if (this._monthsParse[e] || (i = bt.utc([2e3, e]), n = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""), this._monthsParse[e] = new RegExp(n.replace(".", ""), "i")), this._monthsParse[e].test(t)) return e
            },
            _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            weekdays: function(t) {
                return this._weekdays[t.day()]
            },
            _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysShort: function(t) {
                return this._weekdaysShort[t.day()]
            },
            _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            weekdaysMin: function(t) {
                return this._weekdaysMin[t.day()]
            },
            weekdaysParse: function(t) {
                var e, i, n;
                for (this._weekdaysParse || (this._weekdaysParse = []), e = 0; 7 > e; e++)
                    if (this._weekdaysParse[e] || (i = bt([2e3, 1]).day(e), n = "^" + this.weekdays(i, "") + "|^" + this.weekdaysShort(i, "") + "|^" + this.weekdaysMin(i, ""), this._weekdaysParse[e] = new RegExp(n.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e
            },
            _longDateFormat: {
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY LT",
                LLLL: "dddd, MMMM D, YYYY LT"
            },
            longDateFormat: function(t) {
                var e = this._longDateFormat[t];
                return !e && this._longDateFormat[t.toUpperCase()] && (e = this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(t) {
                    return t.slice(1)
                }), this._longDateFormat[t] = e), e
            },
            isPM: function(t) {
                return "p" === (t + "").toLowerCase().charAt(0)
            },
            _meridiemParse: /[ap]\.?m?\.?/i,
            meridiem: function(t, e, i) {
                return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
            },
            _calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            calendar: function(t, e) {
                var i = this._calendar[t];
                return "function" == typeof i ? i.apply(e) : i
            },
            _relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            relativeTime: function(t, e, i, n) {
                var s = this._relativeTime[i];
                return "function" == typeof s ? s(t, e, i, n) : s.replace(/%d/i, t)
            },
            pastFuture: function(t, e) {
                var i = this._relativeTime[t > 0 ? "future" : "past"];
                return "function" == typeof i ? i(e) : i.replace(/%s/i, e)
            },
            ordinal: function(t) {
                return this._ordinal.replace("%d", t)
            },
            _ordinal: "%d",
            preparse: function(t) {
                return t
            },
            postformat: function(t) {
                return t
            },
            week: function(t) {
                return at(t, this._week.dow, this._week.doy).week
            },
            _week: {
                dow: 0,
                doy: 6
            },
            _invalidDate: "Invalid date",
            invalidDate: function() {
                return this._invalidDate
            }
        }), bt = function(e, i, s, o) {
            var r;
            return "boolean" == typeof s && (o = s, s = t), r = {}, r._isAMomentObject = !0, r._i = e, r._f = i, r._l = s, r._strict = o, r._isUTC = !1, r._pf = n(), ct(r)
        }, bt.suppressDeprecationWarnings = !1, bt.createFromInputFallback = o("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(t) {
            t._d = new Date(t._i)
        }), bt.min = function() {
            var t = [].slice.call(arguments, 0);
            return ht("isBefore", t)
        }, bt.max = function() {
            var t = [].slice.call(arguments, 0);
            return ht("isAfter", t)
        }, bt.utc = function(e, i, s, o) {
            var r;
            return "boolean" == typeof s && (o = s, s = t), r = {}, r._isAMomentObject = !0, r._useUTC = !0, r._isUTC = !0, r._l = s, r._i = e, r._f = i, r._strict = o, r._pf = n(), ct(r).utc()
        }, bt.unix = function(t) {
            return bt(1e3 * t)
        }, bt.duration = function(t, e) {
            var n, s, o, r, a = t,
                l = null;
            return bt.isDuration(t) ? a = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
            } : "number" == typeof t ? (a = {}, e ? a[e] = t : a.milliseconds = t) : (l = Rt.exec(t)) ? (n = "-" === l[1] ? -1 : 1, a = {
                y: 0,
                d: T(l[Dt]) * n,
                h: T(l[Pt]) * n,
                m: T(l[Mt]) * n,
                s: T(l[At]) * n,
                ms: T(l[It]) * n
            }) : (l = Ht.exec(t)) ? (n = "-" === l[1] ? -1 : 1, o = function(t) {
                var e = t && parseFloat(t.replace(",", "."));
                return (isNaN(e) ? 0 : e) * n
            }, a = {
                y: o(l[2]),
                M: o(l[3]),
                d: o(l[4]),
                h: o(l[5]),
                m: o(l[6]),
                s: o(l[7]),
                w: o(l[8])
            }) : "object" == typeof a && ("from" in a || "to" in a) && (r = v(bt(a.from), bt(a.to)), a = {}, a.ms = r.milliseconds, a.M = r.months), s = new u(a), bt.isDuration(t) && i(t, "_locale") && (s._locale = t._locale), s
        }, bt.version = xt, bt.defaultFormat = se, bt.ISO_8601 = function() {}, bt.momentProperties = $t, bt.updateOffset = function() {}, bt.relativeTimeThreshold = function(e, i) {
            return de[e] !== t && (i === t ? de[e] : (de[e] = i, !0))
        }, bt.lang = o("moment.lang is deprecated. Use moment.locale instead.", function(t, e) {
            return bt.locale(t, e)
        }), bt.locale = function(t, e) {
            var i;
            return t && (i = "undefined" != typeof e ? bt.defineLocale(t, e) : bt.localeData(t), i && (bt.duration._locale = bt._locale = i)), bt._locale._abbr
        }, bt.defineLocale = function(t, e) {
            return null !== e ? (e.abbr = t, Ot[t] || (Ot[t] = new c), Ot[t].set(e), bt.locale(t), Ot[t]) : (delete Ot[t], null)
        }, bt.langData = o("moment.langData is deprecated. Use moment.localeData instead.", function(t) {
            return bt.localeData(t)
        }), bt.localeData = function(t) {
            var e;
            if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return bt._locale;
            if (!w(t)) {
                if (e = N(t)) return e;
                t = [t]
            }
            return $(t)
        }, bt.isMoment = function(t) {
            return t instanceof h || null != t && i(t, "_isAMomentObject")
        }, bt.isDuration = function(t) {
            return t instanceof u
        };
        for (Ct = ve.length - 1; Ct >= 0; --Ct) k(ve[Ct]);
        bt.normalizeUnits = function(t) {
            return _(t)
        }, bt.invalid = function(t) {
            var e = bt.utc(NaN);
            return null != t ? d(e._pf, t) : e._pf.userInvalidated = !0, e
        }, bt.parseZone = function() {
            return bt.apply(null, arguments).parseZone()
        }, bt.parseTwoDigitYear = function(t) {
            return T(t) + (T(t) > 68 ? 1900 : 2e3)
        }, d(bt.fn = h.prototype, {
            clone: function() {
                return bt(this)
            },
            valueOf: function() {
                return +this._d + 6e4 * (this._offset || 0)
            },
            unix: function() {
                return Math.floor(+this / 1e3)
            },
            toString: function() {
                return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
            },
            toDate: function() {
                return this._offset ? new Date(+this) : this._d
            },
            toISOString: function() {
                var t = bt(this).utc();
                return 0 < t.year() && t.year() <= 9999 ? z(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
            },
            toArray: function() {
                var t = this;
                return [t.year(), t.month(), t.date(), t.hours(), t.minutes(), t.seconds(), t.milliseconds()]
            },
            isValid: function() {
                return I(this)
            },
            isDSTShifted: function() {
                return !!this._a && (this.isValid() && x(this._a, (this._isUTC ? bt.utc(this._a) : bt(this._a)).toArray()) > 0)
            },
            parsingFlags: function() {
                return d({}, this._pf)
            },
            invalidAt: function() {
                return this._pf.overflow
            },
            utc: function(t) {
                return this.zone(0, t)
            },
            local: function(t) {
                return this._isUTC && (this.zone(0, t), this._isUTC = !1, t && this.add(this._dateTzOffset(), "m")), this
            },
            format: function(t) {
                var e = z(this, t || bt.defaultFormat);
                return this.localeData().postformat(e)
            },
            add: y(1, "add"),
            subtract: y(-1, "subtract"),
            diff: function(t, e, i) {
                var n, s, o, r = L(t, this),
                    a = 6e4 * (this.zone() - r.zone());
                return e = _(e), "year" === e || "month" === e ? (n = 432e5 * (this.daysInMonth() + r.daysInMonth()), s = 12 * (this.year() - r.year()) + (this.month() - r.month()), o = this - bt(this).startOf("month") - (r - bt(r).startOf("month")), o -= 6e4 * (this.zone() - bt(this).startOf("month").zone() - (r.zone() - bt(r).startOf("month").zone())), s += o / n, "year" === e && (s /= 12)) : (n = this - r, s = "second" === e ? n / 1e3 : "minute" === e ? n / 6e4 : "hour" === e ? n / 36e5 : "day" === e ? (n - a) / 864e5 : "week" === e ? (n - a) / 6048e5 : n), i ? s : f(s)
            },
            from: function(t, e) {
                return bt.duration({
                    to: this,
                    from: t
                }).locale(this.locale()).humanize(!e)
            },
            fromNow: function(t) {
                return this.from(bt(), t)
            },
            calendar: function(t) {
                var e = t || bt(),
                    i = L(e, this).startOf("day"),
                    n = this.diff(i, "days", !0),
                    s = -6 > n ? "sameElse" : -1 > n ? "lastWeek" : 0 > n ? "lastDay" : 1 > n ? "sameDay" : 2 > n ? "nextDay" : 7 > n ? "nextWeek" : "sameElse";
                return this.format(this.localeData().calendar(s, this))
            },
            isLeapYear: function() {
                return M(this.year())
            },
            isDST: function() {
                return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
            },
            day: function(t) {
                var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return null != t ? (t = st(t, this.localeData()), this.add(t - e, "d")) : e
            },
            month: ft("Month", !0),
            startOf: function(t) {
                switch (t = _(t)) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return "week" === t ? this.weekday(0) : "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
            },
            endOf: function(t) {
                return t = _(t), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms")
            },
            isAfter: function(t, e) {
                return e = _("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = bt.isMoment(t) ? t : bt(t), +this > +t) : +this.clone().startOf(e) > +bt(t).startOf(e)
            },
            isBefore: function(t, e) {
                return e = _("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = bt.isMoment(t) ? t : bt(t), +t > +this) : +this.clone().startOf(e) < +bt(t).startOf(e)
            },
            isSame: function(t, e) {
                return e = _(e || "millisecond"), "millisecond" === e ? (t = bt.isMoment(t) ? t : bt(t), +this === +t) : +this.clone().startOf(e) === +L(t, this).startOf(e)
            },
            min: o("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(t) {
                return t = bt.apply(null, arguments), this > t ? this : t
            }),
            max: o("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(t) {
                return t = bt.apply(null, arguments), t > this ? this : t
            }),
            zone: function(t, e) {
                var i, n = this._offset || 0;
                return null == t ? this._isUTC ? n : this._dateTzOffset() : ("string" == typeof t && (t = W(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && e && (i = this._dateTzOffset()), this._offset = t, this._isUTC = !0, null != i && this.subtract(i, "m"), n !== t && (!e || this._changeInProgress ? b(this, bt.duration(n - t, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, bt.updateOffset(this, !0), this._changeInProgress = null)), this)
            },
            zoneAbbr: function() {
                return this._isUTC ? "UTC" : ""
            },
            zoneName: function() {
                return this._isUTC ? "Coordinated Universal Time" : ""
            },
            parseZone: function() {
                return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
            },
            hasAlignedHourOffset: function(t) {
                return t = t ? bt(t).zone() : 0, (this.zone() - t) % 60 === 0
            },
            daysInMonth: function() {
                return E(this.year(), this.month())
            },
            dayOfYear: function(t) {
                var e = St((bt(this).startOf("day") - bt(this).startOf("year")) / 864e5) + 1;
                return null == t ? e : this.add(t - e, "d")
            },
            quarter: function(t) {
                return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
            },
            weekYear: function(t) {
                var e = at(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                return null == t ? e : this.add(t - e, "y")
            },
            isoWeekYear: function(t) {
                var e = at(this, 1, 4).year;
                return null == t ? e : this.add(t - e, "y")
            },
            week: function(t) {
                var e = this.localeData().week(this);
                return null == t ? e : this.add(7 * (t - e), "d")
            },
            isoWeek: function(t) {
                var e = at(this, 1, 4).week;
                return null == t ? e : this.add(7 * (t - e), "d")
            },
            weekday: function(t) {
                var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                return null == t ? e : this.add(t - e, "d")
            },
            isoWeekday: function(t) {
                return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7)
            },
            isoWeeksInYear: function() {
                return D(this.year(), 1, 4)
            },
            weeksInYear: function() {
                var t = this.localeData()._week;
                return D(this.year(), t.dow, t.doy)
            },
            get: function(t) {
                return t = _(t), this[t]()
            },
            set: function(t, e) {
                return t = _(t), "function" == typeof this[t] && this[t](e), this
            },
            locale: function(e) {
                var i;
                return e === t ? this._locale._abbr : (i = bt.localeData(e), null != i && (this._locale = i), this)
            },
            lang: o("moment().lang() is deprecated. Use moment().localeData() instead.", function(e) {
                return e === t ? this.localeData() : this.locale(e)
            }),
            localeData: function() {
                return this._locale
            },
            _dateTzOffset: function() {
                return 15 * Math.round(this._d.getTimezoneOffset() / 15)
            }
        }), bt.fn.millisecond = bt.fn.milliseconds = ft("Milliseconds", !1), bt.fn.second = bt.fn.seconds = ft("Seconds", !1), bt.fn.minute = bt.fn.minutes = ft("Minutes", !1), bt.fn.hour = bt.fn.hours = ft("Hours", !0), bt.fn.date = ft("Date", !0), bt.fn.dates = o("dates accessor is deprecated. Use date instead.", ft("Date", !0)), bt.fn.year = ft("FullYear", !0), bt.fn.years = o("years accessor is deprecated. Use year instead.", ft("FullYear", !0)), bt.fn.days = bt.fn.day, bt.fn.months = bt.fn.month, bt.fn.weeks = bt.fn.week, bt.fn.isoWeeks = bt.fn.isoWeek, bt.fn.quarters = bt.fn.quarter, bt.fn.toJSON = bt.fn.toISOString, d(bt.duration.fn = u.prototype, {
            _bubble: function() {
                var t, e, i, n = this._milliseconds,
                    s = this._days,
                    o = this._months,
                    r = this._data,
                    a = 0;
                r.milliseconds = n % 1e3, t = f(n / 1e3), r.seconds = t % 60, e = f(t / 60), r.minutes = e % 60, i = f(e / 60), r.hours = i % 24, s += f(i / 24), a = f(mt(s)), s -= f(gt(a)), o += f(s / 30), s %= 30, a += f(o / 12), o %= 12, r.days = s, r.months = o, r.years = a
            },
            abs: function() {
                return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
            },
            weeks: function() {
                return f(this.days() / 7)
            },
            valueOf: function() {
                return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * T(this._months / 12)
            },
            humanize: function(t) {
                var e = rt(this, !t, this.localeData());
                return t && (e = this.localeData().pastFuture(+this, e)), this.localeData().postformat(e)
            },
            add: function(t, e) {
                var i = bt.duration(t, e);
                return this._milliseconds += i._milliseconds, this._days += i._days, this._months += i._months, this._bubble(), this
            },
            subtract: function(t, e) {
                var i = bt.duration(t, e);
                return this._milliseconds -= i._milliseconds, this._days -= i._days, this._months -= i._months, this._bubble(), this
            },
            get: function(t) {
                return t = _(t), this[t.toLowerCase() + "s"]()
            },
            as: function(t) {
                var e, i;
                if (t = _(t), "month" === t || "year" === t) return e = this._days + this._milliseconds / 864e5, i = this._months + 12 * mt(e), "month" === t ? i : i / 12;
                switch (e = this._days + gt(this._months / 12), t) {
                    case "week":
                        return e / 7 + this._milliseconds / 6048e5;
                    case "day":
                        return e + this._milliseconds / 864e5;
                    case "hour":
                        return 24 * e + this._milliseconds / 36e5;
                    case "minute":
                        return 24 * e * 60 + this._milliseconds / 6e4;
                    case "second":
                        return 24 * e * 60 * 60 + this._milliseconds / 1e3;
                    case "millisecond":
                        return Math.floor(24 * e * 60 * 60 * 1e3) + this._milliseconds;
                    default:
                        throw new Error("Unknown unit " + t)
                }
            },
            lang: bt.fn.lang,
            locale: bt.fn.locale,
            toIsoString: o("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
                return this.toISOString()
            }),
            toISOString: function() {
                var t = Math.abs(this.years()),
                    e = Math.abs(this.months()),
                    i = Math.abs(this.days()),
                    n = Math.abs(this.hours()),
                    s = Math.abs(this.minutes()),
                    o = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (t ? t + "Y" : "") + (e ? e + "M" : "") + (i ? i + "D" : "") + (n || s || o ? "T" : "") + (n ? n + "H" : "") + (s ? s + "M" : "") + (o ? o + "S" : "") : "P0D"
            },
            localeData: function() {
                return this._locale
            }
        }), bt.duration.fn.toString = bt.duration.fn.toISOString;
        for (Ct in le) i(le, Ct) && vt(Ct.toLowerCase());
        bt.duration.fn.asMilliseconds = function() {
            return this.as("ms")
        }, bt.duration.fn.asSeconds = function() {
            return this.as("s")
        }, bt.duration.fn.asMinutes = function() {
            return this.as("m")
        }, bt.duration.fn.asHours = function() {
            return this.as("h")
        }, bt.duration.fn.asDays = function() {
            return this.as("d")
        }, bt.duration.fn.asWeeks = function() {
            return this.as("weeks")
        }, bt.duration.fn.asMonths = function() {
            return this.as("M")
        }, bt.duration.fn.asYears = function() {
            return this.as("y")
        }, bt.locale("en", {
            ordinal: function(t) {
                var e = t % 10,
                    i = 1 === T(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                return t + i
            }
        }), Nt ? module.exports = bt : "function" == typeof define && define.amd ? (define("moment", function(t, e, i) {
            return i.config && i.config() && i.config().noGlobal === !0 && (_t.moment = wt), bt
        }), yt(!0)) : yt()
    }.call(this), ! function(t) {
        "use strict";
        var e = function() {
            this.VERSION = "2.1.4", this.AUTHOR = "Revox", this.SUPPORT = "support@revox.io", this.pageScrollElement = "html, body", this.$body = t("body"), this.setUserOS(), this.setUserAgent()
        };
        e.prototype.setUserOS = function() {
            var t = ""; - 1 != navigator.appVersion.indexOf("Win") && (t = "windows"), -1 != navigator.appVersion.indexOf("Mac") && (t = "mac"), -1 != navigator.appVersion.indexOf("X11") && (t = "unix"), -1 != navigator.appVersion.indexOf("Linux") && (t = "linux"), this.$body.addClass(t)
        }, e.prototype.setUserAgent = function() {
            navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? this.$body.addClass("mobile") : (this.$body.addClass("desktop"), navigator.userAgent.match(/MSIE 9.0/) && this.$body.addClass("ie9"))
        }, e.prototype.isVisibleXs = function() {
            return !t("#pg-visible-xs").length && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />'), t("#pg-visible-xs").is(":visible")
        }, e.prototype.isVisibleSm = function() {
            return !t("#pg-visible-sm").length && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />'), t("#pg-visible-sm").is(":visible")
        }, e.prototype.isVisibleMd = function() {
            return !t("#pg-visible-md").length && this.$body.append('<div id="pg-visible-md" class="visible-md" />'), t("#pg-visible-md").is(":visible")
        }, e.prototype.isVisibleLg = function() {
            return !t("#pg-visible-lg").length && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />'), t("#pg-visible-lg").is(":visible")
        }, e.prototype.getUserAgent = function() {
            return t("body").hasClass("mobile") ? "mobile" : "desktop"
        }, e.prototype.setFullScreen = function(t) {
            var e = t.requestFullScreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
            if (e) e.call(t);
            else if ("undefined" != typeof window.ActiveXObject) {
                var i = new ActiveXObject("WScript.Shell");
                null !== i && i.SendKeys("{F11}")
            }
        }, e.prototype.getColor = function(e, i) {
            i = parseFloat(i) || 1;
            var n = t(".pg-colors").length ? t(".pg-colors") : t('<div class="pg-colors"></div>').appendTo("body"),
                s = n.find('[data-color="' + e + '"]').length ? n.find('[data-color="' + e + '"]') : t('<div class="bg-' + e + '" data-color="' + e + '"></div>').appendTo(n),
                e = s.css("background-color"),
                o = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
                r = "rgba(" + o[1] + ", " + o[2] + ", " + o[3] + ", " + i + ")";
            return r
        }, e.prototype.initSidebar = function(e) {
            t('[data-pages="sidebar"]', e).each(function() {
                var e = t(this);
                e.sidebar(e.data())
            })
        }, e.prototype.initDropDown = function(e) {
            t(".dropdown-default", e).each(function() {
                var e = t(this).find(".dropdown-menu").siblings(".dropdown-toggle"),
                    i = 0,
                    n = t(this).find(".dropdown-menu").actual("outerWidth");
                e.actual("outerWidth") < n ? (e.width(n - i), t(this).find(".dropdown-menu").width(e.actual("outerWidth"))) : t(this).find(".dropdown-menu").width(e.actual("outerWidth"))
            })
        }, e.prototype.initFormGroupDefault = function(e) {
            t(".form-group.form-group-default", e).click(function() {
                t(this).find("input").focus()
            }), this.initFormGroupDefaultRun || (t("body").on("focus", ".form-group.form-group-default :input", function() {
                t(".form-group.form-group-default").removeClass("focused"), t(this).parents(".form-group").addClass("focused")
            }), t("body").on("blur", ".form-group.form-group-default :input", function() {
                t(this).parents(".form-group").removeClass("focused"), t(this).val() ? t(this).closest(".form-group").find("label").addClass("fade") : t(this).closest(".form-group").find("label").removeClass("fade")
            }), this.initFormGroupDefaultRun = !0), t(".form-group.form-group-default .checkbox, .form-group.form-group-default .radio", e).hover(function() {
                t(this).parents(".form-group").addClass("focused")
            }, function() {
                t(this).parents(".form-group").removeClass("focused")
            })
        }, e.prototype.initSlidingTabs = function(e) {
            t('a[data-toggle="tab"]', e).on("show.bs.tab", function(e) {
                e = t(e.target).parent().find("a[data-toggle=tab]");
                var i = (e.attr("href"), e.attr("href"));
                t(i).is(".slide-left, .slide-right") && (t(i).addClass("sliding"), setTimeout(function() {
                    t(i).removeClass("sliding")
                }, 100))
            })
        }, e.prototype.reponsiveTabs = function() {
            t('[data-init-reponsive-tabs="dropdownfx"]').each(function() {
                var e = t(this);
                e.addClass("hidden-sm hidden-xs");
                for (var i = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">', n = 1; n <= e.children("li").length; n++) {
                    var s = e.children("li:nth-child(" + n + ")"),
                        o = "";
                    s.hasClass("active") && (o = "selected"), i += '<option value="' + s.children("a").attr("href") + '" ' + o + ">", i += s.children("a").text(), i += "</option>"
                }
                i += "</select>", e.after(i);
                var r = e.next()[0];
                t(r).on("change", function() {
                    var i = (t("option:selected", this), this.value);
                    e.find('a[href="' + i + '"]').tab("show")
                }), t(r).wrap('<div class="nav-tab-dropdown cs-wrapper full-width p-t-10 visible-xs visible-sm"></div>'), new SelectFx(r)
            }), t.fn.tabCollapse && t('[data-init-reponsive-tabs="collapse"]').tabCollapse()
        }, e.prototype.initNotificationCenter = function() {
            t("body").on("click", ".notification-list .dropdown-menu", function(t) {
                t.stopPropagation()
            }), t("body").on("click", ".toggle-more-details", function() {
                var e = t(this).closest(".heading");
                e.closest(".heading").children(".more-details").stop().slideToggle("fast", function() {
                    e.toggleClass("open")
                })
            })
        }, e.prototype.initProgressBars = function() {
            t(window).on("load", function() {
                t(".progress-bar-indeterminate, .progress-circle-indeterminate, .mapplic-pin").hide().show(0)
            })
        }, e.prototype.initInputFile = function() {
            t(document).on("change", ".btn-file :file", function() {
                var e = t(this),
                    i = e.get(0).files ? e.get(0).files.length : 1,
                    n = e.val().replace(/\\/g, "/").replace(/.*\//, "");
                e.trigger("fileselect", [i, n])
            }), t(".btn-file :file").on("fileselect", function(e, i, n) {
                var s = t(this).parents(".input-group").find(":text"),
                    o = i > 1 ? i + " files selected" : n;
                s.length ? s.val(o) : t(this).parent().html(o)
            })
        }, e.prototype.initHorizontalMenu = function() {
            t(document).on("click", ".horizontal-menu .bar-inner > ul > li", function() {
                t(this).toggleClass("open").siblings().removeClass("open")
            }), t(".content").on("click", function() {
                t(".horizontal-menu .bar-inner > ul > li").removeClass("open")
            }), t('[data-pages="horizontal-menu-toggle"]').on("click touchstart", function(e) {
                e.preventDefault(), t("body").toggleClass("menu-opened")
            })
        }, e.prototype.initTooltipPlugin = function(e) {
            t.fn.tooltip && t('[data-toggle="tooltip"]', e).tooltip()
        }, e.prototype.initSelect2Plugin = function(e) {
            t.fn.select2 && t('[data-init-plugin="select2"]', e).each(function() {
                t(this).select2({
                    minimumResultsForSearch: "true" == t(this).attr("data-disable-search") ? -1 : 1
                }).on("select2-opening", function() {
                    t.fn.scrollbar && t(".select2-results").scrollbar({
                        ignoreMobile: !1
                    })
                })
            })
        }, e.prototype.initScrollBarPlugin = function(e) {
            t.fn.scrollbar && t(".scrollable", e).scrollbar({
                ignoreOverlay: !1
            })
        }, e.prototype.initListView = function(e) {
            t.fn.ioslist && t('[data-init-list-view="ioslist"]', e).ioslist(), t.fn.scrollbar && t(".list-view-wrapper", e).scrollbar({
                ignoreOverlay: !1
            })
        }, e.prototype.initSwitcheryPlugin = function(e) {
            window.Switchery && t('[data-init-plugin="switchery"]', e).each(function() {
                var e = t(this);
                new Switchery(e.get(0), {
                    color: null != e.data("color") ? t.Pages.getColor(e.data("color")) : t.Pages.getColor("success"),
                    size: null != e.data("size") ? e.data("size") : "default"
                })
            })
        }, e.prototype.initSelectFxPlugin = function(e) {
            window.SelectFx && t('select[data-init-plugin="cs-select"]', e).each(function() {
                var e = t(this).get(0);
                t(e).wrap('<div class="cs-wrapper"></div>'), new SelectFx(e)
            })
        }, e.prototype.initUnveilPlugin = function(e) {
            t.fn.unveil && t("img", e).unveil()
        }, e.prototype.initValidatorPlugin = function() {
            t.validator && t.validator.setDefaults({
                ignore: "",
                showErrors: function(e, i) {
                    var n = this;
                    return t.each(this.successList, function(e, i) {
                        var n = t(this).closest(".form-group-attached");
                        return n.length ? t(i).popover("hide") : void 0
                    }), t.each(i, function(e, i) {
                        var s = t(i.element).closest(".form-group-attached");
                        if (!s.length) return n.defaultShowErrors();
                        var o;
                        o = t(i.element).popover({
                            trigger: "manual",
                            placement: "top",
                            html: !0,
                            container: s.closest("form"),
                            content: i.message
                        }), o.data("bs.popover").options.content = i.message;
                        var s = t(i.element).closest(".form-group");
                        s.addClass("has-error"), t(i.element).popover("show")
                    })
                },
                onfocusout: function(e) {
                    var i = t(e).closest(".form-group");
                    t(e).valid() && (i.removeClass("has-error"), i.next(".error").remove())
                },
                onkeyup: function(e) {
                    var i = t(e).closest(".form-group");
                    t(e).valid() ? (t(e).removeClass("error"), i.removeClass("has-error"), i.next("label.error").remove(), i.find("label.error").remove()) : i.addClass("has-error")
                },
                errorPlacement: function(e, i) {
                    var n = t(i).closest(".form-group");
                    n.hasClass("form-group-default") ? (n.addClass("has-error"), e.insertAfter(n)) : e.insertAfter(i)
                }
            })
        }, e.prototype.init = function() {
            this.initSidebar(), this.initDropDown(), this.initFormGroupDefault(), this.initSlidingTabs(), this.initNotificationCenter(), this.initProgressBars(), this.initHorizontalMenu(), this.initTooltipPlugin(), this.initSelect2Plugin(), this.initScrollBarPlugin(), this.initSwitcheryPlugin(), this.initSelectFxPlugin(), this.initUnveilPlugin(), this.initValidatorPlugin(), this.initListView(), this.initInputFile(), this.reponsiveTabs()
        }, t.Pages = new e, t.Pages.Constructor = e
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(t, e) {
            if (!t) return !1;
            for (var i = t.target || t.srcElement || t || !1; i && i != e;) i = i.parentNode || !1;
            return i !== !1
        }

        function i(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }

        function n(t, e) {
            this.el = t, this.options = i({}, this.options), i(this.options, e), this._init()
        }

        function s(t, e) {
            for (var i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector; t;) {
                if (i.bind(t)(e)) return t;
                t = t.parentElement
            }
            return !1
        }

        function o(e) {
            return {
                left: e.getBoundingClientRect().left + t.pageXOffset - e.ownerDocument.documentElement.clientLeft,
                top: e.getBoundingClientRect().top + t.pageYOffset - e.ownerDocument.documentElement.clientTop
            }
        }

        function r(t, e) {
            e.parentNode.insertBefore(t, e.nextSibling)
        }
        n.prototype.options = {
            newTab: !0,
            stickyPlaceholder: !0,
            container: "body",
            onChange: function(t) {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("change", !0, !1), t.dispatchEvent(e)
            }
        }, n.prototype._init = function() {
            var t = document.querySelector("option[selected]");
            this.hasDefaultPlaceholder = t && t.disabled, this.selectedOpt = t || this.el.querySelector("option"), this._createSelectEl(), this.selOpts = [].slice.call(this.selEl.querySelectorAll("li[data-option]")), this.selOptsCount = this.selOpts.length, this.current = this.selOpts.indexOf(this.selEl.querySelector("li.cs-selected")) || -1, this.selPlaceholder = this.selEl.querySelector("span.cs-placeholder"), this._initEvents(), this.el.onchange = function() {
                var t = this.selectedIndex;
                this.children[t].innerHTML.trim()
            }
        }, n.prototype._createSelectEl = function() {
            var t = "",
                e = function(t) {
                    var e = "",
                        i = "",
                        n = "";
                    return !t.selectedOpt || this.foundSelected || this.hasDefaultPlaceholder || (i += "cs-selected ", this.foundSelected = !0), t.getAttribute("data-class") && (i += t.getAttribute("data-class")), t.getAttribute("data-link") && (n = "data-link=" + t.getAttribute("data-link")), "" !== i && (e = 'class="' + i + '" '), "<li " + e + n + ' data-option data-value="' + t.value + '"><span>' + t.textContent + "</span></li>"
                };
            [].slice.call(this.el.children).forEach(function(i) {
                if (!i.disabled) {
                    var n = i.tagName.toLowerCase();
                    "option" === n ? t += e(i) : "optgroup" === n && (t += '<li class="cs-optgroup"><span>' + i.label + "</span><ul>", [].slice.call(i.children).forEach(function(i) {
                        t += e(i)
                    }), t += "</ul></li>")
                }
            });
            var i = '<div class="cs-options"><ul>' + t + "</ul></div>";
            this.selEl = document.createElement("div"), this.selEl.className = this.el.className, this.selEl.tabIndex = this.el.tabIndex, this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + "</span>" + i, this.el.parentNode.appendChild(this.selEl), this.selEl.appendChild(this.el);
            var n = document.createElement("div");
            n.className = "cs-backdrop", this.selEl.appendChild(n)
        }, n.prototype._initEvents = function() {
            var t = this;
            this.selPlaceholder.addEventListener("click", function() {
                t._toggleSelect()
            }), this.selOpts.forEach(function(e, i) {
                e.addEventListener("click", function() {
                    t.current = i, t._changeOption(), t._toggleSelect()
                })
            }), document.addEventListener("click", function(i) {
                var n = i.target;
                t._isOpen() && n !== t.selEl && !e(n, t.selEl) && t._toggleSelect()
            }), this.selEl.addEventListener("keydown", function(e) {
                var i = e.keyCode || e.which;
                switch (i) {
                    case 38:
                        e.preventDefault(), t._navigateOpts("prev");
                        break;
                    case 40:
                        e.preventDefault(), t._navigateOpts("next");
                        break;
                    case 32:
                        e.preventDefault(), t._isOpen() && "undefined" != typeof t.preSelCurrent && -1 !== t.preSelCurrent && t._changeOption(), t._toggleSelect();
                        break;
                    case 13:
                        e.preventDefault(), t._isOpen() && "undefined" != typeof t.preSelCurrent && -1 !== t.preSelCurrent && (t._changeOption(), t._toggleSelect());
                        break;
                    case 27:
                        e.preventDefault(), t._isOpen() && t._toggleSelect()
                }
            })
        }, n.prototype._navigateOpts = function(t) {
            this._isOpen() || this._toggleSelect();
            var e = "undefined" != typeof this.preSelCurrent && -1 !== this.preSelCurrent ? this.preSelCurrent : this.current;
            ("prev" === t && e > 0 || "next" === t && e < this.selOptsCount - 1) && (this.preSelCurrent = "next" === t ? e + 1 : e - 1, this._removeFocus(), classie.add(this.selOpts[this.preSelCurrent], "cs-focus"))
        }, n.prototype._toggleSelect = function() {
            var t = this.selEl.querySelector(".cs-backdrop"),
                e = document.querySelector(this.options.container),
                i = e.querySelector(".dropdown-mask"),
                n = this.selEl.querySelector(".cs-options"),
                a = this.selEl.querySelector(".cs-placeholder"),
                l = a.offsetWidth,
                c = a.offsetHeight,
                h = n.scrollWidth;
            if (this._isOpen()) {
                -1 !== this.current && (this.selPlaceholder.textContent = this.selOpts[this.current].textContent);
                var u = this.selEl.data,
                    d = u.parentNode;
                r(this.selEl, u), this.selEl.removeAttribute("style"), d.removeChild(u), this.selEl.clientHeight, t.style.transform = t.style.webkitTransform = t.style.MozTransform = t.style.msTransform = t.style.OTransform = "scale3d(1,1,1)", classie.remove(this.selEl, "cs-active"), i.style.display = "none", n.style.overflowY = "hidden", n.style.width = "auto";
                var p = s(this.selEl, ".form-group");
                p && classie.removeClass(p, "focused")
            } else {
                this.hasDefaultPlaceholder && this.options.stickyPlaceholder && (this.selPlaceholder.textContent = this.selectedOpt.textContent);
                var u;
                this.selEl.parentNode.querySelector(".dropdown-placeholder") ? u = this.selEl.parentNode.querySelector(".dropdown-placeholder") : (u = document.createElement("div"), classie.add(u, "dropdown-placeholder"), r(u, this.selEl)), u.style.height = c + "px", u.style.width = this.selEl.offsetWidth + "px", this.selEl.data = u, this.selEl.style.position = "absolute";
                var f = o(this.selEl);
                this.selEl.style.left = f.left + "px", this.selEl.style.top = f.top + "px", e.appendChild(this.selEl);
                var m = n.offsetHeight,
                    g = a.offsetHeight,
                    v = (n.offsetWidth, a.offsetWidth, m / g);
                t.style.transform = t.style.webkitTransform = t.style.MozTransform = t.style.msTransform = t.style.OTransform = "scale3d(1, " + v + ", 1)", i || (i = document.createElement("div"), classie.add(i, "dropdown-mask"), e.appendChild(i)), i.style.display = "block", classie.add(this.selEl, "cs-active");
                var y = h > l ? h : l;
                this.selEl.style.width = y + "px", this.selEl.style.height = g + "px", n.style.width = "100%", setTimeout(function() {
                    n.style.overflowY = "auto"
                }, 300)
            }
        }, n.prototype._changeOption = function() {
            "undefined" != typeof this.preSelCurrent && -1 !== this.preSelCurrent && (this.current = this.preSelCurrent, this.preSelCurrent = -1);
            var e = this.selOpts[this.current];
            this.selPlaceholder.textContent = e.textContent, this.el.value = e.getAttribute("data-value");
            var i = this.selEl.querySelector("li.cs-selected");
            i && classie.remove(i, "cs-selected"), classie.add(e, "cs-selected"), e.getAttribute("data-link") && (this.options.newTab ? t.open(e.getAttribute("data-link"), "_blank") : t.location = e.getAttribute("data-link")), this.options.onChange(this.el)
        }, n.prototype._isOpen = function() {
            return classie.has(this.selEl, "cs-active")
        }, n.prototype._removeFocus = function() {
            var t = this.selEl.querySelector("li.cs-focus");
            t && classie.remove(t, "cs-focus")
        }, t.SelectFx = n
    }(window),
    function(t) {
        "use strict";
        t("[data-chat-input]").on("keypress", function(e) {
            if (13 == e.which) {
                var i = t(this).attr("data-chat-conversation");
                t(i).append('<div class="message clearfix"><div class="chat-bubble from-me">' + t(this).val() + "</div></div>"), t(this).val("")
            }
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.filter(":input").each(function() {
                var i = t(this),
                    s = i.data("pg.circularProgress"),
                    o = "object" == typeof e && e;
                s || i.data("pg.circularProgress", s = new n(this, o)), "string" == typeof e ? s[e]() : o.hasOwnProperty("value") && s.value(o.value)
            })
        }

        function i(t) {
            return parseInt(t / 100 * 360)
        }
        var n = function(e, n) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.circularProgress.defaults, n), this.$container = t('<div class="progress-circle"></div>'), this.$element.attr("data-color") && this.$container.addClass("progress-circle-" + this.$element.attr("data-color")), this.$element.attr("data-thick") && this.$container.addClass("progress-circle-thick"), this.$pie = t('<div class="pie"></div>'), this.$pie.$left = t('<div class="left-side half-circle"></div>'), this.$pie.$right = t('<div class="right-side half-circle"></div>'), this.$pie.append(this.$pie.$left).append(this.$pie.$right), this.$container.append(this.$pie).append('<div class="shadow"></div>'), this.$element.after(this.$container), this.val = this.$element.val();
            var s = i(this.val);
            this.val <= 50 ? this.$pie.$right.css("transform", "rotate(" + s + "deg)") : (this.$pie.css("clip", "rect(auto, auto, auto, auto)"), this.$pie.$right.css("transform", "rotate(180deg)"), this.$pie.$left.css("transform", "rotate(" + s + "deg)"))
        };
        n.VERSION = "1.0.0", n.prototype.value = function(t) {
            if ("undefined" != typeof t) {
                var e = i(t);
                this.$pie.removeAttr("style"), this.$pie.$right.removeAttr("style"), this.$pie.$left.removeAttr("style"), 50 >= t ? this.$pie.$right.css("transform", "rotate(" + e + "deg)") : (this.$pie.css("clip", "rect(auto, auto, auto, auto)"), this.$pie.$right.css("transform", "rotate(180deg)"), this.$pie.$left.css("transform", "rotate(" + e + "deg)"))
            }
        };
        var s = t.fn.circularProgress;
        t.fn.circularProgress = e, t.fn.circularProgress.Constructor = n, t.fn.circularProgress.defaults = {
            value: 0
        }, t.fn.circularProgress.noConflict = function() {
            return t.fn.circularProgress = s, this
        }, t(window).on("load", function() {
            t('[data-pages-progress="circle"]').each(function() {
                var e = t(this);
                e.circularProgress(e.data())
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            function n() {
                if (a.notification.addClass("pgn-simple"), a.alert.append(a.options.message), a.options.showClose) {
                    var e = t('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
                    a.alert.prepend(e)
                }
            }

            function s() {
                if (a.notification.addClass("pgn-bar"), a.alert.append("<span>" + a.options.message + "</span>"), a.alert.addClass("alert-" + a.options.type), a.options.showClose) {
                    var e = t('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
                    a.alert.prepend(e)
                }
            }

            function o() {
                a.notification.addClass("pgn-circle");
                var t = "<div>";
                a.options.thumbnail && (t += '<div class="pgn-thumbnail"><div>' + a.options.thumbnail + "</div></div>"), t += '<div class="pgn-message"><div>', a.options.title && (t += '<p class="bold">' + a.options.title + "</p>"), t += "<p>" + a.options.message + "</p></div></div>", t += "</div>", a.options.showClose && (t += '<button type="button" class="close" data-dismiss="alert">', t += '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>', t += "</button>"), a.alert.append(t), a.alert.after('<div class="clearfix"></div>')
            }

            function r() {
                if (a.notification.addClass("pgn-flip"), a.alert.append("<span>" + a.options.message + "</span>"), a.options.showClose) {
                    var e = t('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
                    a.alert.prepend(e)
                }
            }
            var a = this;
            return a.container = t(e), a.notification = t('<div class="pgn push-on-sidebar-open"></div>'), a.options = t.extend(!0, {}, t.fn.pgNotification.defaults, i), a.container.find(".pgn-wrapper[data-position=" + this.options.position + "]").length ? a.wrapper = t(".pgn-wrapper[data-position=" + this.options.position + "]") : (a.wrapper = t('<div class="pgn-wrapper" data-position="' + this.options.position + '"></div>'), a.container.append(a.wrapper)), a.alert = t('<div class="alert"></div>'), a.alert.addClass("alert-" + a.options.type), "bar" == a.options.style ? new s : "flip" == a.options.style ? new r : "circle" == a.options.style ? new o : ("simple" == a.options.style, new n), a.notification.append(a.alert), a.alert.on("closed.bs.alert", function() {
                a.notification.remove(), a.options.onClosed()
            }), this
        };
        e.VERSION = "1.0.0", e.prototype.show = function() {
            if (this.wrapper.prepend(this.notification), this.options.onShown(), 0 != this.options.timeout) {
                var e = this;
                setTimeout(function() {
                    this.notification.fadeOut("slow", function() {
                        t(this).remove(), e.options.onClosed()
                    })
                }.bind(this), this.options.timeout)
            }
        }, t.fn.pgNotification = function(t) {
            return new e(this, t)
        }, t.fn.pgNotification.defaults = {
            style: "simple",
            message: null,
            position: "top-right",
            type: "info",
            showClose: !0,
            timeout: 4e3,
            onShown: function() {},
            onClosed: function() {}
        }
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.portlet"),
                    o = "object" == typeof e && e;
                s || n.data("pg.portlet", s = new i(this, o)), "string" == typeof e ? s[e]() : o.hasOwnProperty("refresh") ? s.refresh(o.refresh) : o.hasOwnProperty("error") && s.error(o.error)
            })
        }
        var i = function(e, i) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.portlet.defaults, i), this.$loader = null, this.$body = this.$element.find(".panel-body")
        };
        i.VERSION = "1.0.0", i.prototype.collapse = function() {
            var e = this.$element.find(this.options.collapseButton + " > i");
            return this.$element.find(".panel-heading"), this.$body.stop().slideToggle("fast"), this.$element.hasClass("panel-collapsed") ? (this.$element.removeClass("panel-collapsed"), e.removeClass().addClass("pg-arrow_maximize"), void(t.isFunction(this.options.onExpand) && this.options.onExpand(this))) : (this.$element.addClass("panel-collapsed"), e.removeClass().addClass("pg-arrow_minimize"), void(t.isFunction(this.options.onCollapse) && this.options.onCollapse(this)))
        }, i.prototype.close = function() {
            this.$element.remove(), t.isFunction(this.options.onClose) && this.options.onClose(this)
        }, i.prototype.maximize = function() {
            var e = this.$element.find(this.options.maximizeButton + " > i");
            this.$element.hasClass("panel-maximized") ? (this.$element.removeClass("panel-maximized"), e.removeClass("pg-fullscreen_restore").addClass("pg-fullscreen"), t.isFunction(this.options.onRestore) && this.options.onRestore(this)) : (this.$element.addClass("panel-maximized"), e.removeClass("pg-fullscreen").addClass("pg-fullscreen_restore"), t.isFunction(this.options.onMaximize) && this.options.onMaximize(this))
        }, i.prototype.refresh = function(e) {
            var i = this.$element.find(this.options.refreshButton);
            if (e) {
                if (this.$loader && this.$loader.is(":visible")) return;
                if (!t.isFunction(this.options.onRefresh)) return;
                this.$loader = t('<div class="portlet-progress"></div>'), this.$loader.css({
                    "background-color": "rgba(" + this.options.overlayColor + "," + this.options.overlayOpacity + ")"
                });
                var n = "";
                if ("circle" == this.options.progress) n += '<div class="progress-circle-indeterminate progress-circle-' + this.options.progressColor + '"></div>';
                else if ("bar" == this.options.progress) n += '<div class="progress progress-small">', n += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>', n += "</div>";
                else if ("circle-lg" == this.options.progress) {
                    i.addClass("refreshing");
                    var s, o = i.find("> i").first();
                    i.find('[class$="-animated"]').length ? s = i.find('[class$="-animated"]') : (s = t("<i/>"), s.css({
                        position: "absolute",
                        top: o.position().top,
                        left: o.position().left
                    }), s.addClass("portlet-icon-refresh-lg-" + this.options.progressColor + "-animated"), i.append(s)), o.addClass("fade"), s.addClass("active")
                } else n += '<div class="progress progress-small">', n += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>', n += "</div>";
                this.$loader.append(n), this.$element.append(this.$loader);
                var r = this.$loader;
                setTimeout(function() {
                    this.$loader.remove(), this.$element.append(r)
                }.bind(this), 300), this.$loader.fadeIn(), t.isFunction(this.options.onRefresh) && this.options.onRefresh(this)
            } else {
                var a = this;
                this.$loader.fadeOut(function() {
                    if (t(this).remove(), "circle-lg" == a.options.progress) {
                        var e = i.find(".active"),
                            n = i.find(".fade");
                        e.removeClass("active"), n.removeClass("fade"), i.removeClass("refreshing")
                    }
                    a.options.refresh = !1
                })
            }
        }, i.prototype.error = function(t) {
            if (t) {
                var e = this;
                this.$element.pgNotification({
                    style: "bar",
                    message: t,
                    position: "top",
                    timeout: 0,
                    type: "danger",
                    onShown: function() {
                        e.$loader.find("> div").fadeOut()
                    },
                    onClosed: function() {
                        e.refresh(!1)
                    }
                }).show()
            }
        };
        var n = t.fn.portlet;
        t.fn.portlet = e, t.fn.portlet.Constructor = i, t.fn.portlet.defaults = {
            progress: "circle",
            progressColor: "master",
            refresh: !1,
            error: null,
            overlayColor: "255,255,255",
            overlayOpacity: .8,
            refreshButton: '[data-toggle="refresh"]',
            maximizeButton: '[data-toggle="maximize"]',
            collapseButton: '[data-toggle="collapse"]',
            closeButton: '[data-toggle="close"]'
        }, t.fn.portlet.noConflict = function() {
            return t.fn.portlet = n, this
        }, t(document).on("click.pg.portlet.data-api", '[data-toggle="collapse"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("collapse")
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="close"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("close")
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="refresh"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet({
                refresh: !0
            })
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="maximize"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("maximize")
        }), t(window).on("load", function() {
            t('[data-pages="portlet"]').each(function() {
                var e = t(this);
                e.portlet(e.data())
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            var n = this;
            return n.options = t.extend(!0, {}, t.fn.pgMobileViews.defaults, i), n.element = t(e), n.element.on("click", function(e) {
                e.preventDefault();
                var i = n.element.data(),
                    s = t(i.viewPort),
                    o = i.toggleView;
                return null != i.toggleView ? (s.children().last().children(".view").hide(), t(i.toggleView).show()) : o = s.last(), s.toggleClass(i.viewAnimation), n.options.onNavigate(o, i.viewAnimation), !1
            }), this
        };
        t.fn.pgMobileViews = function(t) {
            return new e(this, t)
        }, t.fn.pgMobileViews.defaults = {
            onNavigate: function() {}
        }, t(window).on("load", function() {
            t('[data-navigate="view"]').each(function() {
                var e = t(this);
                e.pgMobileViews()
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.quickview"),
                    o = "object" == typeof e && e;
                s || n.data("pg.quickview", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.quickview.defaults, i), this.bezierEasing = [.05, .74, .27, .99];
            var n = this;
            t(this.options.notes).on("click", ".list > ul > li", function() {
                var e = t(this).find(".note-preview"),
                    e = t(this).find(".note-preview");
                t(n.options.noteEditor).html(e.html()), t(n.options.notes).toggleClass("push")
            }), t(this.options.notes).on("click", ".list > ul > li .checkbox", function(t) {
                t.stopPropagation()
            }), t(this.options.notes).on("click", n.options.backButton, function() {
                t(n.options.notes).find(".toolbar > li > a").removeClass("active"), t(n.options.notes).toggleClass("push")
            }), t(this.options.deleteNoteButton).click(function(e) {
                e.preventDefault(), t(this).toggleClass("selected"), t(n.options.notes).find(".list > ul > li .checkbox").fadeToggle("fast"), t(n.options.deleteNoteConfirmButton).fadeToggle("fast").removeClass("hide")
            }), t(this.options.newNoteButton).click(function(e) {
                e.preventDefault(), t(n.options.noteEditor).html("")
            }), t(this.options.deleteNoteConfirmButton).click(function() {
                var e = t(n.options.notes).find("input[type=checkbox]:checked");
                e.each(function() {
                    t(this).parents("li").remove()
                })
            }), t(this.options.notes).on("click", ".toolbar > li > a", function() {
                var e = t(this).attr("data-action");
                document.execCommand(e, !1, null), t(this).toggleClass("active")
            })
        };
        i.VERSION = "1.0.0";
        var n = t.fn.quickview;
        t.fn.quickview = e, t.fn.quickview.Constructor = i, t.fn.quickview.defaults = {
            notes: "#note-views",
            alerts: "#alerts",
            chat: "#chat",
            notesList: ".list",
            noteEditor: ".quick-note-editor",
            deleteNoteButton: ".delete-note-link",
            deleteNoteConfirmButton: ".btn-remove-notes",
            newNoteButton: ".new-note-link",
            backButton: ".close-note-link"
        }, t.fn.quickview.noConflict = function() {
            return t.fn.quickview = n, this
        }, t(window).on("load", function() {
            t('[data-pages="quickview"]').each(function() {
                var e = t(this);
                e.quickview(e.data())
            })
        }), t(document).on("click.pg.quickview.data-api touchstart", '[data-toggle="quickview"]', function(e) {
            var i = t(this).attr("data-toggle-element");
            if (Modernizr.csstransitions) t(i).toggleClass("open");
            else {
                var n = t(i).width();
                t(i).hasClass("open-ie") ? t(i).stop().animate({
                    right: 0
                }, 400, t.bez([.05, .74, .27, .99]), function() {
                    t(i).removeClass("open-ie")
                }) : t(i).stop().animate({
                    right: -1 * n
                }, 400, t.bez([.05, .74, .27, .99]), function() {
                    t(i).addClass("open-ie")
                })
            }
            e.preventDefault()
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.parallax"),
                    o = "object" == typeof e && e;
                s || n.data("pg.parallax", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            if (this.$element = t(e), this.options = t.extend(!0, {}, t.fn.parallax.defaults, i), this.$coverPhoto = this.$element.find(".cover-photo"), this.$content = this.$element.find(".inner"), this.$coverPhoto.find("> img").length) {
                var n = this.$coverPhoto.find("> img");
                this.$coverPhoto.css("background-image", "url(" + n.attr("src") + ")"), n.remove()
            }
        };
        i.VERSION = "1.0.0", i.prototype.animate = function() {
            var e, i = this.$element.height(),
                n = 50 * i / 100,
                s = "translateX";
            e = t(window).scrollTop(), s = "translateY", this.$coverPhoto.css({
                transform: s + "(" + e * this.options.speed.coverPhoto + "px)"
            }), this.$content.css({
                transform: s + "(" + e * this.options.speed.content + "px)"
            }), e > n ? this.$content.css({
                opacity: 1 - e / 1200
            }) : this.$content.css({
                opacity: 1
            })
        };
        var n = t.fn.parallax;
        t.fn.parallax = e, t.fn.parallax.Constructor = i, t.fn.parallax.defaults = {
            speed: {
                coverPhoto: .3,
                content: .17
            }
        }, t.fn.parallax.noConflict = function() {
            return t.fn.parallax = n, this
        }, t(window).on("load", function() {
            t('[data-pages="parallax"]').each(function() {
                var e = t(this);
                e.parallax(e.data())
            })
        }), t(window).on("scroll", function() {
            Modernizr.touch || t('[data-pages="parallax"]').parallax("animate")
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.sidebar"),
                    o = "object" == typeof e && e;
                s || n.data("pg.sidebar", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            function n() {
                var e = o.$body.hasClass("rtl") ? -o.sideBarWidthCondensed : o.sideBarWidthCondensed,
                    i = 1 == this.css3d ? "translate3d(" + e + "px, 0,0)" : "translate(" + e + "px, 0)";
                return !t.Pages.isVisibleSm() && !t.Pages.isVisibleXs() && void(t(".close-sidebar").data("clicked") || o.$body.hasClass("menu-pin") || (o.cssAnimation ? (o.$element.css({
                    transform: i
                }), o.$body.addClass("sidebar-visible")) : o.$element.stop().animate({
                    left: "0px"
                }, 400, t.bez(o.bezierEasing), function() {
                    o.$body.addClass("sidebar-visible")
                })))
            }

            function s(e) {
                var i = 1 == o.css3d ? "translate3d(0, 0,0)" : "translate(0, 0)";
                if (t.Pages.isVisibleSm() || t.Pages.isVisibleXs()) return !1;
                if ("undefined" != typeof e) {
                    var n = t(e.target);
                    if (n.parent(".page-sidebar").length) return
                }
                o.$body.hasClass("menu-pin") || (t(".sidebar-overlay-slide").hasClass("show") && (t(".sidebar-overlay-slide").removeClass("show"), t("[data-pages-toggle']").removeClass("active")), o.cssAnimation ? (o.$element.css({
                    transform: i
                }), o.$body.removeClass("sidebar-visible")) : o.$element.stop().animate({
                    left: "-" + o.sideBarWidthCondensed + "px"
                }, 400, t.bez(o.bezierEasing), function() {
                    o.$body.removeClass("sidebar-visible"), setTimeout(function() {
                        t(".close-sidebar").data({
                            clicked: !1
                        })
                    }, 100)
                }))
            }
            if (this.$element = t(e), this.$body = t("body"), this.options = t.extend(!0, {}, t.fn.sidebar.defaults, i), this.bezierEasing = [.05, .74, .27, .99], this.cssAnimation = !0, this.css3d = !0, this.sideBarWidth = 280, this.sideBarWidthCondensed = 210, this.$sidebarMenu = this.$element.find(".sidebar-menu > ul"), this.$pageContainer = t(this.options.pageContainer), this.$sidebarMenu.length) {
                "desktop" == t.Pages.getUserAgent() && this.$sidebarMenu.scrollbar({
                    ignoreOverlay: !1
                }), Modernizr.csstransitions || (this.cssAnimation = !1), Modernizr.csstransforms3d || (this.css3d = !1), "undefined" == typeof angular && t(document).on("click", ".sidebar-menu a", function() {
                    if (t(this).parent().children(".sub-menu") !== !1) {
                        var e = t(this),
                            i = t(this).parent().parent(),
                            n = t(this).parent(),
                            s = t(this).parent().children(".sub-menu");
                        n.hasClass("open active") ? (e.children(".arrow").removeClass("open active"), s.slideUp(200, function() {
                            n.removeClass("open active")
                        })) : (i.children("li.open").children(".sub-menu").slideUp(200), i.children("li.open").children("a").children(".arrow").removeClass("open active"), i.children("li.open").removeClass("open active"), e.children(".arrow").addClass("open active"), s.slideDown(200, function() {
                            n.addClass("open active")
                        }))
                    }
                }), t(".sidebar-slide-toggle").on("click touchend", function(e) {
                    e.preventDefault(), t(this).toggleClass("active");
                    var i = t(this).attr("data-pages-toggle");
                    null != i && t(i).toggleClass("show")
                });
                var o = this;
                this.$element.bind("mouseenter mouseleave", n), this.$pageContainer.bind("mouseover", s)
            }
        };
        i.prototype.toggleSidebar = function() {
            var e, i = t("body").css("background-color");
            t(".page-container").css("background-color", i), this.$body.hasClass("sidebar-open") ? (this.$body.removeClass("sidebar-open"), e = setTimeout(function() {
                this.$element.removeClass("visible")
            }.bind(this), 400)) : (clearTimeout(e), this.$element.addClass("visible"), setTimeout(function() {
                this.$body.addClass("sidebar-open")
            }.bind(this), 10), setTimeout(function() {
                t(".page-container").css({
                    "background-color": ""
                })
            }, 1e3))
        }, i.prototype.togglePinSidebar = function(t) {
            "hide" == t ? this.$body.removeClass("menu-pin") : "show" == t ? this.$body.addClass("menu-pin") : this.$body.toggleClass("menu-pin")
        };
        var n = t.fn.sidebar;
        t.fn.sidebar = e, t.fn.sidebar.Constructor = i, t.fn.sidebar.defaults = {
            pageContainer: ".page-container"
        }, t.fn.sidebar.noConflict = function() {
            return t.fn.sidebar = n, this
        }, t(document).on("click.pg.sidebar.data-api", '[data-toggle-pin="sidebar"]', function(e) {
            e.preventDefault();
            var i = (t(this), t('[data-pages="sidebar"]'));
            return i.data("pg.sidebar").togglePinSidebar(), !1
        }), t(document).on("click.pg.sidebar.data-api touchstart", '[data-toggle="sidebar"]', function(e) {
            e.preventDefault();
            var i = (t(this), t('[data-pages="sidebar"]'));
            return i.data("pg.sidebar").toggleSidebar(), !1
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.search"),
                    o = "object" == typeof e && e;
                s || n.data("pg.search", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.search.defaults, i), this.init()
        };
        i.VERSION = "1.0.0", i.prototype.init = function() {
            var e = this;
            this.pressedKeys = [], this.ignoredKeys = [], this.$searchField = this.$element.find(this.options.searchField), this.$closeButton = this.$element.find(this.options.closeButton), this.$suggestions = this.$element.find(this.options.suggestions), this.$brand = this.$element.find(this.options.brand), this.$searchField.on("keyup", function() {
                e.$suggestions && e.$suggestions.html(t(this).val())
            }), this.$searchField.on("keyup", function(i) {
                return e.options.onKeyEnter && e.options.onKeyEnter(e.$searchField.val()), 13 == i.keyCode && (i.preventDefault(), e.options.onSearchSubmit && e.options.onSearchSubmit(e.$searchField.val())), t("body").hasClass("overlay-disabled") ? 0 : void 0
            }), this.$closeButton.on("click", function() {
                e.toggleOverlay("hide")
            }), this.$element.on("click", function(i) {
                "search" == t(i.target).data("pages") && e.toggleOverlay("hide")
            }), t(document).on("keypress.pg.search", function(t) {
                e.keypress(t)
            }), t(document).on("keyup", function(t) {
                e.$element.is(":visible") && 27 == t.keyCode && e.toggleOverlay("hide")
            })
        }, i.prototype.keypress = function(e) {
            e = e || event;
            var i = e.target.nodeName;
            t("body").hasClass("overlay-disabled") || t(e.target).hasClass("js-input") || "INPUT" == i || "TEXTAREA" == i || 0 === e.which || 0 === e.charCode || e.ctrlKey || e.metaKey || e.altKey || 27 == e.keyCode || this.toggleOverlay("show", String.fromCharCode(e.keyCode | e.charCode))
        }, i.prototype.toggleOverlay = function(e, i) {
            var n = this;
            "show" == e ? (this.$element.removeClass("hide"), this.$element.fadeIn("fast"), this.$searchField.is(":focus") || (this.$searchField.val(i), setTimeout(function() {
                this.$searchField.focus();
                var t = this.$searchField.val();
                this.$searchField.val(""), this.$searchField.val(t)
            }.bind(this), 10)), this.$element.removeClass("closed"), this.$brand.toggleClass("invisible"), t(document).off("keypress.pg.search")) : (this.$element.fadeOut("fast").addClass("closed"), this.$searchField.val("").blur(), setTimeout(function() {
                this.$element.is(":visible") && this.$brand.toggleClass("invisible"), t(document).on("keypress.pg.search", function(t) {
                    n.keypress(t)
                })
            }.bind(this), 10))
        };
        var n = t.fn.search;
        t.fn.search = e, t.fn.search.Constructor = i, t.fn.search.defaults = {
            searchField: '[data-search="searchField"]',
            closeButton: '[data-search="closeButton"]',
            suggestions: '[data-search="suggestions"]',
            brand: '[data-search="brand"]'
        }, t.fn.search.noConflict = function() {
            return t.fn.search = n, this
        }, t(document).on("click.pg.search.data-api", '[data-toggle="search"]', function(e) {
            var i = t(this),
                n = t('[data-pages="search"]');
            i.is("a") && e.preventDefault(), n.data("pg.search").toggleOverlay("show")
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        "undefined" == typeof angular && t.Pages.init()
    }(window.jQuery),
    function(t) {
        "use strict";
        window.loadEventsBound = !1, t(document).on("page:change", function() {
            window.loadEventsBound && imagesLoaded("body", function() {
                t(window).trigger("load")
            })
        }), t(window).on("load", function() {
            window.loadEventsBound = !0
        }), t(document).ready(function() {
            t('[data-pages="search"]').search({
                searchField: "#overlay-search",
                closeButton: ".overlay-close",
                suggestions: "#overlay-suggestions",
                brand: ".brand",
                onSearchSubmit: function(t) {
                    console.log("Search for: " + t)
                },
                onKeyEnter: function(e) {
                    console.log("Live search for: " + e);
                    var i = t("#overlay-search"),
                        n = t(".search-results");
                    clearTimeout(t.data(this, "timer")), n.fadeOut("fast");
                    var s = setTimeout(function() {
                        n.find(".result-name").each(function() {
                            0 != i.val().length && (t(this).html(i.val()), n.fadeIn("fast"))
                        })
                    }, 500);
                    t(this).data("timer", s)
                }
            })
        })
    }(window.jQuery),
    function() {
        $(document).ready(function() {
            var t;
            t = function() {
                var t, e, i, n, s, o;
                t = $("#address_terms").prop("checked"), e = $("#address_firstname").val(), i = $("#address_lastname").val(), n = $("#address_email").val(), s = $("#address_phone").val(), o = $("#address_street").val(), t && e && i && n && s && o ? $('input[type="submit"]').removeClass("disabled") : $('input[type="submit"]').addClass("disabled")
            }, $("#address_firstname").change(function() {
                t()
            }), $("#address_lastname").change(function() {
                t()
            }), $("#address_email").change(function() {
                t()
            }), $("#address_phone").change(function() {
                t()
            }), $("#address_street").change(function() {
                t()
            }), $("#address_terms").change(function() {
                t()
            })
        })
    }.call(this),
    function() {}.call(this),
    function() {
        var t = [].slice;
        this.ActionCable = {
            INTERNAL: {
                message_types: {
                    welcome: "welcome",
                    ping: "ping",
                    confirmation: "confirm_subscription",
                    rejection: "reject_subscription"
                },
                default_mount_path: "/cable",
                protocols: ["actioncable-v1-json", "actioncable-unsupported"]
            },
            createConsumer: function(t) {
                var e;
                return null == t && (t = null != (e = this.getConfig("url")) ? e : this.INTERNAL.default_mount_path), new ActionCable.Consumer(this.createWebSocketURL(t))
            },
            getConfig: function(t) {
                var e;
                return e = document.head.querySelector("meta[name='action-cable-" + t + "']"), null != e ? e.getAttribute("content") : void 0
            },
            createWebSocketURL: function(t) {
                var e;
                return t && !/^wss?:/i.test(t) ? (e = document.createElement("a"), e.href = t, e.href = e.href, e.protocol = e.protocol.replace("http", "ws"), e.href) : t
            },
            startDebugging: function() {
                return this.debugging = !0
            },
            stopDebugging: function() {
                return this.debugging = null
            },
            log: function() {
                var e;
                if (e = 1 <= arguments.length ? t.call(arguments, 0) : [], this.debugging) return e.push(Date.now()), console.log.apply(console, ["[ActionCable]"].concat(t.call(e)))
            }
        }, "undefined" != typeof window && null !== window && (window.ActionCable = this.ActionCable), "undefined" != typeof module && null !== module && (module.exports = this.ActionCable)
    }.call(this),
    function() {
        var t = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        };
        ActionCable.ConnectionMonitor = function() {
            function e(e) {
                this.connection = e, this.visibilityDidChange = t(this.visibilityDidChange, this), this.reconnectAttempts = 0
            }
            var i, n, s;
            return e.pollInterval = {
                min: 3,
                max: 30
            }, e.staleThreshold = 6, e.prototype.start = function() {
                if (!this.isRunning()) return this.startedAt = n(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), ActionCable.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
            }, e.prototype.stop = function() {
                if (this.isRunning()) return this.stoppedAt = n(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), ActionCable.log("ConnectionMonitor stopped")
            }, e.prototype.isRunning = function() {
                return null != this.startedAt && null == this.stoppedAt
            }, e.prototype.recordPing = function() {
                return this.pingedAt = n()
            }, e.prototype.recordConnect = function() {
                return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, ActionCable.log("ConnectionMonitor recorded connect")
            }, e.prototype.recordDisconnect = function() {
                return this.disconnectedAt = n(), ActionCable.log("ConnectionMonitor recorded disconnect")
            }, e.prototype.startPolling = function() {
                return this.stopPolling(), this.poll()
            }, e.prototype.stopPolling = function() {
                return clearTimeout(this.pollTimeout)
            }, e.prototype.poll = function() {
                return this.pollTimeout = setTimeout(function(t) {
                    return function() {
                        return t.reconnectIfStale(), t.poll()
                    }
                }(this), this.getPollInterval())
            }, e.prototype.getPollInterval = function() {
                var t, e, n, s;
                return s = this.constructor.pollInterval, n = s.min, e = s.max, t = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * i(t, n, e))
            }, e.prototype.reconnectIfStale = function() {
                if (this.connectionIsStale()) return ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + s(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? ActionCable.log("ConnectionMonitor skipping reopening recent disconnect") : (ActionCable.log("ConnectionMonitor reopening"), this.connection.reopen())
            }, e.prototype.connectionIsStale = function() {
                var t;
                return s(null != (t = this.pingedAt) ? t : this.startedAt) > this.constructor.staleThreshold
            }, e.prototype.disconnectedRecently = function() {
                return this.disconnectedAt && s(this.disconnectedAt) < this.constructor.staleThreshold
            }, e.prototype.visibilityDidChange = function() {
                if ("visible" === document.visibilityState) return setTimeout(function(t) {
                    return function() {
                        if (t.connectionIsStale() || !t.connection.isOpen()) return ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), t.connection.reopen()
                    }
                }(this), 200)
            }, n = function() {
                return (new Date).getTime()
            }, s = function(t) {
                return (n() - t) / 1e3
            }, i = function(t, e, i) {
                return Math.max(e, Math.min(i, t))
            }, e
        }()
    }.call(this),
    function() {
        var t, e, i, n, s, o, r = [].slice,
            a = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            },
            l = [].indexOf || function(t) {
                for (var e = 0, i = this.length; e < i; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
        n = ActionCable.INTERNAL, e = n.message_types, i = n.protocols, s = 2 <= i.length ? r.call(i, 0, t = i.length - 1) : (t = 0, []), o = i[t++], ActionCable.Connection = function() {
            function t(t) {
                this.consumer = t, this.open = a(this.open, this), this.subscriptions = this.consumer.subscriptions, this.monitor = new ActionCable.ConnectionMonitor(this), this.disconnected = !0
            }
            return t.reopenDelay = 500, t.prototype.send = function(t) {
                return !!this.isOpen() && (this.webSocket.send(JSON.stringify(t)), !0)
            }, t.prototype.open = function() {
                if (this.isActive()) throw ActionCable.log("Attempted to open WebSocket, but existing socket is " + this.getState()), new Error("Existing connection must be closed before opening");
                return ActionCable.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + i), null != this.webSocket && this.uninstallEventHandlers(), this.webSocket = new WebSocket(this.consumer.url, i), this.installEventHandlers(), this.monitor.start(), !0
            }, t.prototype.close = function(t) {
                var e, i;
                if (e = (null != t ? t : {
                        allowReconnect: !0
                    }).allowReconnect, e || this.monitor.stop(), this.isActive()) return null != (i = this.webSocket) ? i.close() : void 0
            }, t.prototype.reopen = function() {
                var t;
                if (ActionCable.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
                try {
                    return this.close()
                } catch (e) {
                    return t = e, ActionCable.log("Failed to reopen WebSocket", t)
                } finally {
                    ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
                }
            }, t.prototype.getProtocol = function() {
                var t;
                return null != (t = this.webSocket) ? t.protocol : void 0
            }, t.prototype.isOpen = function() {
                return this.isState("open")
            }, t.prototype.isActive = function() {
                return this.isState("open", "connecting")
            }, t.prototype.isProtocolSupported = function() {
                var t;
                return t = this.getProtocol(), l.call(s, t) >= 0
            }, t.prototype.isState = function() {
                var t, e;
                return e = 1 <= arguments.length ? r.call(arguments, 0) : [], t = this.getState(), l.call(e, t) >= 0
            }, t.prototype.getState = function() {
                var t, e, i;
                for (e in WebSocket)
                    if (i = WebSocket[e], i === (null != (t = this.webSocket) ? t.readyState : void 0)) return e.toLowerCase();
                return null
            }, t.prototype.installEventHandlers = function() {
                var t, e;
                for (t in this.events) e = this.events[t].bind(this), this.webSocket["on" + t] = e
            }, t.prototype.uninstallEventHandlers = function() {
                var t;
                for (t in this.events) this.webSocket["on" + t] = function() {}
            }, t.prototype.events = {
                message: function(t) {
                    var i, n, s, o;
                    if (this.isProtocolSupported()) switch (s = JSON.parse(t.data), i = s.identifier, n = s.message, o = s.type, o) {
                        case e.welcome:
                            return this.monitor.recordConnect(), this.subscriptions.reload();
                        case e.ping:
                            return this.monitor.recordPing();
                        case e.confirmation:
                            return this.subscriptions.notify(i, "connected");
                        case e.rejection:
                            return this.subscriptions.reject(i);
                        default:
                            return this.subscriptions.notify(i, "received", n)
                    }
                },
                open: function() {
                    if (ActionCable.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({
                        allowReconnect: !1
                    })
                },
                close: function() {
                    if (ActionCable.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.subscriptions.notifyAll("disconnected", {
                        willAttemptReconnect: this.monitor.isRunning()
                    })
                },
                error: function() {
                    return ActionCable.log("WebSocket onerror event")
                }
            }, t
        }()
    }.call(this),
    function() {
        var t = [].slice;
        ActionCable.Subscriptions = function() {
            function e(t) {
                this.consumer = t, this.subscriptions = []
            }
            return e.prototype.create = function(t, e) {
                var i, n, s;
                return i = t, n = "object" == typeof i ? i : {
                    channel: i
                }, s = new ActionCable.Subscription(this.consumer, n, e), this.add(s)
            }, e.prototype.add = function(t) {
                return this.subscriptions.push(t), this.consumer.ensureActiveConnection(), this.notify(t, "initialized"), this.sendCommand(t, "subscribe"), t
            }, e.prototype.remove = function(t) {
                return this.forget(t), this.findAll(t.identifier).length || this.sendCommand(t, "unsubscribe"), t
            }, e.prototype.reject = function(t) {
                var e, i, n, s, o;
                for (n = this.findAll(t), s = [], e = 0, i = n.length; e < i; e++) o = n[e], this.forget(o), this.notify(o, "rejected"), s.push(o);
                return s
            }, e.prototype.forget = function(t) {
                var e;
                return this.subscriptions = function() {
                    var i, n, s, o;
                    for (s = this.subscriptions, o = [], i = 0, n = s.length; i < n; i++) e = s[i], e !== t && o.push(e);
                    return o
                }.call(this), t
            }, e.prototype.findAll = function(t) {
                var e, i, n, s, o;
                for (n = this.subscriptions, s = [], e = 0, i = n.length; e < i; e++) o = n[e], o.identifier === t && s.push(o);
                return s
            }, e.prototype.reload = function() {
                var t, e, i, n, s;
                for (i = this.subscriptions, n = [], t = 0, e = i.length; t < e; t++) s = i[t], n.push(this.sendCommand(s, "subscribe"));
                return n
            }, e.prototype.notifyAll = function() {
                var e, i, n, s, o, r, a;
                for (i = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], o = this.subscriptions, r = [], n = 0, s = o.length; n < s; n++) a = o[n], r.push(this.notify.apply(this, [a, i].concat(t.call(e))));
                return r
            }, e.prototype.notify = function() {
                var e, i, n, s, o, r, a;
                for (r = arguments[0], i = arguments[1], e = 3 <= arguments.length ? t.call(arguments, 2) : [], a = "string" == typeof r ? this.findAll(r) : [r], o = [], n = 0, s = a.length; n < s; n++) r = a[n], o.push("function" == typeof r[i] ? r[i].apply(r, e) : void 0);
                return o
            }, e.prototype.sendCommand = function(t, e) {
                var i;
                return i = t.identifier, this.consumer.send({
                    command: e,
                    identifier: i
                })
            }, e
        }()
    }.call(this),
    function() {
        ActionCable.Subscription = function() {
            function t(t, i, n) {
                this.consumer = t, null == i && (i = {}), this.identifier = JSON.stringify(i), e(this, n)
            }
            var e;
            return t.prototype.perform = function(t, e) {
                return null == e && (e = {}), e.action = t, this.send(e)
            }, t.prototype.send = function(t) {
                return this.consumer.send({
                    command: "message",
                    identifier: this.identifier,
                    data: JSON.stringify(t)
                })
            }, t.prototype.unsubscribe = function() {
                return this.consumer.subscriptions.remove(this)
            }, e = function(t, e) {
                var i, n;
                if (null != e)
                    for (i in e) n = e[i], t[i] = n;
                return t
            }, t
        }()
    }.call(this),
    function() {
        ActionCable.Consumer = function() {
            function t(t) {
                this.url = t, this.subscriptions = new ActionCable.Subscriptions(this), this.connection = new ActionCable.Connection(this)
            }
            return t.prototype.send = function(t) {
                return this.connection.send(t)
            }, t.prototype.connect = function() {
                return this.connection.open()
            }, t.prototype.disconnect = function() {
                return this.connection.close({
                    allowReconnect: !1
                })
            }, t.prototype.ensureActiveConnection = function() {
                if (!this.connection.isActive()) return this.connection.open()
            }, t
        }()
    }.call(this),
    function() {
        this.App || (this.App = {}), App.cable = ActionCable.createConsumer()
    }.call(this),
    function() {
        window.update_frequency_ui = function() {
            var t, e;
            e = $('[name="cart[frequency]"]').parent(), e.removeClass("bg-primary"), e.find(".panel-title, h1 small, h1").removeClass("text-white"), t = $('[name="cart[frequency]"]:checked').parent(), t.addClass("bg-primary"), t.find(".panel-title, h1 small, h1").addClass("text-white")
        }, $(document).ready(function() {
            // $("#cart_datepicker").datepicker({
            //     startDate: "+2d",
            //     format: "dd/mm/yyyy"
            // }), $("#cart_datepicker").datepicker("update", moment().add(2, "d").format("DD/MM/YYYY")), $("#cart_time").timepicker({
            //     minuteStep: 30,
            //     defaultTime: "10:00 AM",
            //     showMeridian: !1
            // }), $(".timepicker").click(function() {
            //     return $("#cart_time").timepicker("showWidget")
            // }), $('[name="cart[frequency]"]').change(function() {
            //     update_frequency_ui()
            // }), $('[name="cart[ironing]"]').change(function() {
            //     var t, e, i;
            //     e = 3600, i = $('[name="cart[duration]"]')[0], t = parseFloat(i.options[i.selectedIndex].value), this.checked ? t += e : t -= e, $(i).val(t.toFixed(1).toString())
            // }), $("#cart_frequency_week").attr("checked", "checked"), update_frequency_ui()
        })
    }.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function(t) {
        "use strict";
        var e = function() {
            this.VERSION = "1.1.0", this.AUTHOR = "Revox", this.SUPPORT = "support@revox.io", this.pageScrollElement = "html, body", this.$body = t("body"), this.setUserOS(), this.setUserAgent()
        };
        e.prototype.setUserOS = function() {
            var t = "";
            navigator.appVersion.indexOf("Win") != -1 && (t = "windows"), navigator.appVersion.indexOf("Mac") != -1 && (t = "mac"), navigator.appVersion.indexOf("X11") != -1 && (t = "unix"), navigator.appVersion.indexOf("Linux") != -1 && (t = "linux"), this.$body.addClass(t)
        }, e.prototype.setUserAgent = function() {
            navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? this.$body.addClass("mobile") : (this.$body.addClass("desktop"), navigator.userAgent.match(/MSIE 9.0/) && this.$body.addClass("ie9"))
        }, e.prototype.isVisibleXs = function() {
            return !t("#pg-visible-xs").length && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />'), t("#pg-visible-xs").is(":visible")
        }, e.prototype.isVisibleSm = function() {
            return !t("#pg-visible-sm").length && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />'), t("#pg-visible-sm").is(":visible")
        }, e.prototype.isVisibleMd = function() {
            return !t("#pg-visible-md").length && this.$body.append('<div id="pg-visible-md" class="visible-md" />'), t("#pg-visible-md").is(":visible")
        }, e.prototype.isVisibleLg = function() {
            return !t("#pg-visible-lg").length && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />'), t("#pg-visible-lg").is(":visible")
        }, e.prototype.getUserAgent = function() {
            return t("body").hasClass("mobile") ? "mobile" : "desktop"
        }, e.prototype.setFullScreen = function(t) {
            var e = t.requestFullScreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
            if (e) e.call(t);
            else if ("undefined" != typeof window.ActiveXObject) {
                var i = new ActiveXObject("WScript.Shell");
                null !== i && i.SendKeys("{F11}")
            }
        }, e.prototype.getColor = function(e, i) {
            i = parseFloat(i) || 1;
            var n = t(".pg-colors").length ? t(".pg-colors") : t('<div class="pg-colors"></div>').appendTo("body"),
                s = n.find('[data-color="' + e + '"]').length ? n.find('[data-color="' + e + '"]') : t('<div class="bg-' + e + '" data-color="' + e + '"></div>').appendTo(n),
                e = s.css("background-color"),
                o = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
                r = "rgba(" + o[1] + ", " + o[2] + ", " + o[3] + ", " + i + ")";
            return r
        }, e.prototype.setBackgroundImage = function() {
            t("[data-pages-bg-image]").each(function() {
                var e = t(this),
                    i = {
                        pagesBgImage: "",
                        lazyLoad: "true",
                        progressType: "",
                        progressColor: "",
                        bgOverlay: "",
                        bgOverlayClass: "",
                        overlayOpacity: 0
                    },
                    n = e.data();
                t.extend(i, n);
                var s = i.pagesBgImage,
                    o = i.bgOverlay,
                    r = i.overlayOpacity,
                    a = t('<div class="bg-overlay"></div>');
                a.addClass(i.bgOverlayClass), a.css({
                    "background-color": o,
                    opacity: 1
                }), e.append(a);
                var l = new Image;
                l.src = s, l.onload = function() {
                    e.css({
                        "background-image": "url(" + s + ")"
                    }), e.children(".bg-overlay").css({
                        opacity: r
                    })
                }
            })
        }, e.prototype.initRevealFooter = function() {
            function e() {
                var t = i.outerHeight();
                i.prev().css({
                    "margin-bottom": t
                })
            }
            var i = t('[data-pages="reveal-footer"]');
            e(), t(window).resize(function() {
                e()
            })
        }, e.prototype.initFormGroupDefault = function() {
            t(".form-group.form-group-default").click(function() {
                t(this).find("input").focus()
            }), t("body").on("focus", ".form-group.form-group-default :input", function() {
                t(".form-group.form-group-default").removeClass("focused"), t(this).parents(".form-group").addClass("focused")
            }), t("body").on("blur", ".form-group.form-group-default :input", function() {
                t(this).parents(".form-group").removeClass("focused"), t(this).val() ? t(this).closest(".form-group").find("label").addClass("fade") : t(this).closest(".form-group").find("label").removeClass("fade")
            }), t(".form-group.form-group-default .checkbox, .form-group.form-group-default .radio").hover(function() {
                t(this).parents(".form-group").addClass("focused")
            }, function() {
                t(this).parents(".form-group").removeClass("focused")
            })
        }, e.prototype.initTextRotator = function() {
            var e = {
                animation: "flipUp",
                separator: ",",
                speed: 2e3
            };
            t('[data-pages-init="text-rotate"]').each(function() {
                e = t(this).data(), t.fn.textrotator && t(this).textrotator(e)
            })
        }, e.prototype.initAnimatables = function() {
            t.fn.appear && (t('[data-pages-animate="number"]').appear(), t('[data-pages-animate="progressbar"]').appear(), t('[data-pages-animate="number"]').on("appear", function() {
                t(this).animateNumbers(t(this).attr("data-value"), !0, parseInt(t(this).attr("data-animation-duration")))
            }), t('[data-pages-animate="progressbar"]').on("appear", function() {
                t(this).css("width", t(this).attr("data-percentage"))
            }))
        }, e.prototype.initAutoImageScroller = function() {
            t('[data-pages="auto-scroll"]').each(function() {
                var e, i = 0,
                    n = t(this).find(".iphone-border"),
                    s = n.find("img"),
                    o = !1,
                    r = function() {
                        var t = n.height(),
                            a = t / 2;
                        i - a <= -s.height() + t ? (i = -s.height() + t, o = !0) : i -= a, s.css({
                            transform: "translateY(" + i + "px)"
                        }), o && (i = 0, clearInterval(e), setTimeout(function() {
                            s.css({
                                transform: "translateY(" + i + "px)"
                            }), o = !1, e = setInterval(r, 1e3)
                        }, 2e3))
                    };
                e = setInterval(r, 1e3)
            })
        }, e.prototype.initUnveilPlugin = function() {
            t.fn.unveil && t("img").unveil()
        }, e.prototype.init = function() {
            this.setBackgroundImage(), this.initFormGroupDefault(), this.initUnveilPlugin(), this.initAnimatables(), this.initAutoImageScroller(), this.initTextRotator(), this.initRevealFooter()
        }, t.Pages = new e, t.Pages.Constructor = e
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.header"),
                    o = "object" == typeof e && e;
                s || n.data("pg.header", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            this.$body = t("body"), this.$element = t(e), this.options = t.extend(!0, {}, t.fn.header.defaults, i), "autoresize" == this.$element.attr("data-pages-header") && (this.options.autoresize = !0), null != this.$element.attr("data-pages-header") && (this.options.minimizedClass = this.options.minimizedClass + " " + this.$element.attr("data-pages-resize-class")), this.initAffix()
        };
        i.prototype.initAffix = function() {
            "true" == this.$element.attr("data-pages-autofixed") && this.$element.affix({
                offset: {
                    top: this.$element.offset().top
                }
            })
        }, i.prototype.updateAffix = function() {
            "true" == this.$element.attr("data-pages-autofixed") && (console.log(this.$element.offset().top), this.$element.removeData("affix").removeClass("affix affix-top affix-bottom"), this.$element.affix({
                offset: this.$element.offset().top
            }))
        }, i.prototype.addMinimized = function() {
            this.options.autoresize && !this.$element.hasClass("affix-top") && (this.$element.hasClass(this.options.minimizedClass) || this.$element.addClass(this.options.minimizedClass))
        }, i.prototype.removeMinized = function() {
            (this.options.autoresize || this.$element.hasClass("affix-top")) && this.$element.removeClass(this.options.minimizedClass)
        };
        var n = t.fn.header;
        t.fn.header = e, t.fn.header.Constructor = i, t.fn.header.defaults = {
            duration: 350,
            autoresize: !1,
            minimizedClass: "minimized"
        }, t.fn.header.noConflict = function() {
            return t.fn.header = n, this
        }, t(document).ready(function() {
            t(".menu > li > a").on("mouseenter click", function() {
                t(this).parent().hasClass("mega") ? t(this).parent().hasClass("open") ? t(this).parents(".container").removeClass("clip-mega-menu") : t(this).parents(".container").addClass("clip-mega-menu") : t(this).parents(".container").removeClass("clip-mega-menu"), t(this).parent().toggleClass("open").siblings().removeClass("open")
            }), t(".desktop .menu > li > nav").on("mouseleave", function() {
                t(".menu > li").removeClass("open")
            })
        }), t(window).on("load", function() {
            t('[data-pages="header"]').each(function() {
                var e = t(this);
                e.header(e.data())
            })
        }), t('[data-pages="header-toggle"]').on("click touchstart", function(e) {
            e.preventDefault();
            var i = t(this);
            i.attr("data-pages-element");
            t("body").toggleClass("menu-opened"), t('[data-pages="header-toggle"]').toggleClass("on")
        }), t(window).on("resize", function() {
            t('[data-pages="header"]').header("updateAffix")
        }), t(window).on("scroll", function() {
            var e = parseInt(t(window).scrollTop());
            e > 1 ? t('[data-pages="header"]').header("addMinimized") : e < 10 && t('[data-pages="header"]').header("removeMinized")
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.parallax"),
                    o = "object" == typeof e && e;
                s || n.data("pg.parallax", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            if (this.$element = t(e), this.$body = t("body"), this.options = t.extend(!0, {}, t.fn.parallax.defaults, i), this.$coverPhoto = this.$element.find(".cover-photo"), this.$content = this.$element.find(".inner"), this.$coverPhoto.find("> img").length) {
                var n = this.$coverPhoto.find("> img");
                this.$coverPhoto.css("background-image", "url(" + n.attr("src") + ")"), n.remove()
            }
            this.translateBgImage()
        };
        i.VERSION = "1.0.0", i.prototype.animate = function(e) {
            var i, n = (this.$element.height(), "translateX");
            i = t(window).scrollTop(), this.$body.hasClass("mobile") && (i = -e), n = "translateY", this.$coverPhoto.css({
                transform: n + "(" + i * this.options.speed.coverPhoto + "px)"
            }), this.$content.css({
                transform: n + "(" + i * this.options.speed.content + "px)"
            }), this.translateBgImage()
        }, i.prototype.translateBgImage = function() {
            var e = t(window).scrollTop(),
                i = this.$element.height();
            if (this.$element.attr("data-pages-bg-image")) {
                var n = this.$element.offset().top - e;
                if (n > -i && n <= t(window).height()) {
                    var s = 100 - (t(window).height() - n) / (t(window).height() + i) * 100;
                    this.$element.css({
                        "background-position": "center " + s + "%"
                    })
                }
            }
        };
        var n = t.fn.parallax;
        t.fn.parallax = e, t.fn.parallax.Constructor = i, t.fn.parallax.defaults = {
            speed: {
                coverPhoto: .3,
                content: .17
            }
        }, t.fn.parallax.noConflict = function() {
            return t.fn.parallax = n, this
        }, t(window).on("load", function() {
            t('[data-pages="parallax"]').each(function() {
                var e = t(this);
                e.parallax(e.data())
            })
        }), t(window).on("scroll", function() {
            t('[data-pages="parallax"]').parallax("animate")
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.portlet"),
                    o = "object" == typeof e && e;
                s || n.data("pg.portlet", s = new i(this, o)), "string" == typeof e ? s[e]() : o.hasOwnProperty("refresh") ? s.refresh(o.refresh) : o.hasOwnProperty("error") && s.error(o.error)
            })
        }
        var i = function(e, i) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.portlet.defaults, i), this.$loader = null, this.$body = this.$element.find(".panel-body")
        };
        i.VERSION = "1.0.0", i.prototype.collapse = function() {
            var e = this.$element.find(this.options.collapseButton + " > i");
            this.$element.find(".panel-heading");
            return this.$body.stop().slideToggle("fast"), this.$element.hasClass("panel-collapsed") ? (this.$element.removeClass("panel-collapsed"), e.removeClass().addClass("pg-arrow_maximize"), void(t.isFunction(this.options.onExpand) && this.options.onExpand())) : (this.$element.addClass("panel-collapsed"), e.removeClass().addClass("pg-arrow_minimize"), void(t.isFunction(this.options.onCollapse) && this.options.onCollapse()))
        }, i.prototype.close = function() {
            this.$element.remove(), t.isFunction(this.options.onClose) && this.options.onClose()
        }, i.prototype.maximize = function() {
            var e = this.$element.find(this.options.maximizeButton + " > i");
            this.$element.hasClass("panel-maximized") ? (this.$element.removeClass("panel-maximized"), e.removeClass("pg-fullscreen_restore").addClass("pg-fullscreen"), t.isFunction(this.options.onRestore) && this.options.onRestore()) : (this.$element.addClass("panel-maximized"), e.removeClass("pg-fullscreen").addClass("pg-fullscreen_restore"), t.isFunction(this.options.onMaximize) && this.options.onMaximize())
        }, i.prototype.refresh = function(e) {
            var i = this.$element.find(this.options.refreshButton);
            if (e) {
                if (this.$loader && this.$loader.is(":visible")) return;
                if (!t.isFunction(this.options.onRefresh)) return;
                this.$loader = t('<div class="portlet-progress"></div>'), this.$loader.css({
                    "background-color": "rgba(" + this.options.overlayColor + "," + this.options.overlayOpacity + ")"
                });
                var n = "";
                if ("circle" == this.options.progress) n += '<div class="progress-circle-indeterminate progress-circle-' + this.options.progressColor + '"></div>';
                else if ("bar" == this.options.progress) n += '<div class="progress progress-small">', n += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>', n += "</div>";
                else if ("circle-lg" == this.options.progress) {
                    i.addClass("refreshing");
                    var s, o = i.find("> i").first();
                    i.find('[class$="-animated"]').length ? s = i.find('[class$="-animated"]') : (s = t("<i/>"), s.css({
                        position: "absolute",
                        top: o.position().top,
                        left: o.position().left
                    }), s.addClass("portlet-icon-refresh-lg-" + this.options.progressColor + "-animated"), i.append(s)), o.addClass("fade"), s.addClass("active")
                } else n += '<div class="progress progress-small">', n += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>', n += "</div>";
                this.$loader.append(n), this.$element.append(this.$loader);
                var r = this.$loader;
                setTimeout(function() {
                    this.$loader.remove(), this.$element.append(r)
                }.bind(this), 300), this.$loader.fadeIn(), t.isFunction(this.options.onRefresh) && this.options.onRefresh()
            } else {
                var a = this;
                this.$loader.fadeOut(function() {
                    if (t(this).remove(), "circle-lg" == a.options.progress) {
                        var e = i.find(".active"),
                            n = i.find(".fade");
                        e.removeClass("active"), n.removeClass("fade"), i.removeClass("refreshing")
                    }
                    a.options.refresh = !1
                })
            }
        }, i.prototype.error = function(t) {
            if (t) {
                var e = this;
                this.$element.pgNotification({
                    style: "bar",
                    message: t,
                    position: "top",
                    timeout: 0,
                    type: "danger",
                    onShown: function() {
                        e.$loader.find("> div").fadeOut()
                    },
                    onClosed: function() {
                        e.refresh(!1)
                    }
                }).show()
            }
        };
        var n = t.fn.portlet;
        t.fn.portlet = e, t.fn.portlet.Constructor = i, t.fn.portlet.defaults = {
            progress: "circle",
            progressColor: "master",
            refresh: !1,
            error: null,
            overlayColor: "255,255,255",
            overlayOpacity: .8,
            refreshButton: '[data-toggle="refresh"]',
            maximizeButton: '[data-toggle="maximize"]',
            collapseButton: '[data-toggle="collapse"]',
            closeButton: '[data-toggle="close"]'
        }, t.fn.portlet.noConflict = function() {
            return t.fn.portlet = n, this
        }, t(document).on("click.pg.portlet.data-api", '[data-toggle="collapse"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("collapse")
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="close"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("close")
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="refresh"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet({
                refresh: !0
            })
        }), t(document).on("click.pg.portlet.data-api", '[data-toggle="maximize"]', function(e) {
            var i = t(this),
                n = i.closest(".panel");
            i.is("a") && e.preventDefault(), n.data("pg.portlet") && n.portlet("maximize")
        }), t(window).on("load", function() {
            t('[data-pages="portlet"]').each(function() {
                var e = t(this);
                e.portlet(e.data())
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pg.search"),
                    o = "object" == typeof e && e;
                s || n.data("pg.search", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.search.defaults, i), this.init()
        };
        i.VERSION = "1.0.0", i.prototype.init = function() {
            var e = this;
            this.pressedKeys = [], this.ignoredKeys = [], this.$searchField = this.$element.find(this.options.searchField), this.$closeButton = this.$element.find(this.options.closeButton), this.$suggestions = this.$element.find(this.options.suggestions), this.$brand = this.$element.find(this.options.brand), this.$searchField.on("keyup", function() {
                e.$suggestions && e.$suggestions.html(t(this).val())
            }), this.$searchField.on("keyup", function(i) {
                if (e.options.onKeyEnter && e.options.onKeyEnter(e.$searchField.val()), 13 == i.keyCode && (i.preventDefault(), e.options.onSearchSubmit && e.options.onSearchSubmit(e.$searchField.val())), t("body").hasClass("overlay-disabled")) return 0
            }), this.$closeButton.on("click", function() {
                e.toggleOverlay("hide")
            }), this.$element.on("click", function(i) {
                "search" == t(i.target).data("pages") && e.toggleOverlay("hide")
            }), t(document).on("keypress.pg.search", function(t) {
                e.keypress(t)
            }), t(document).on("keyup", function(t) {
                e.$element.is(":visible") && 27 == t.keyCode && e.toggleOverlay("hide")
            })
        }, i.prototype.keypress = function(e) {
            e = e || event;
            var i = e.target.nodeName;
            t("body").hasClass("overlay-disabled") || t(e.target).hasClass("js-input") || "INPUT" == i || "TEXTAREA" == i || 0 === e.which || 0 === e.charCode || e.ctrlKey || e.metaKey || e.altKey || 27 == e.keyCode || this.toggleOverlay("show", String.fromCharCode(e.keyCode | e.charCode))
        }, i.prototype.toggleOverlay = function(e, i) {
            var n = this;
            "show" == e ? (this.$element.removeClass("hide"), this.$element.fadeIn("fast"), this.$searchField.is(":focus") || (this.$searchField.val(i), setTimeout(function() {
                this.$searchField.focus();
                var t = this.$searchField.val();
                this.$searchField.val(""), this.$searchField.val(t)
            }.bind(this), 100)), this.$element.removeClass("closed"), this.$brand.toggleClass("invisible"), t(document).off("keypress.pg.search")) : (this.$element.fadeOut("fast").addClass("closed"), this.$searchField.val("").blur(), setTimeout(function() {
                this.$element.is(":visible") && this.$brand.toggleClass("invisible"), t(document).on("keypress.pg.search", function(t) {
                    n.keypress(t)
                })
            }.bind(this), 100))
        };
        var n = t.fn.search;
        t.fn.search = e, t.fn.search.Constructor = i, t.fn.search.defaults = {
            searchField: '[data-search="searchField"]',
            closeButton: '[data-search="closeButton"]',
            suggestions: '[data-search="suggestions"]',
            brand: '[data-search="brand"]'
        }, t.fn.search.noConflict = function() {
            return t.fn.search = n, this
        }, t(document).on("click.pg.search.data-api", '[data-toggle="search"]', function(e) {
            var i = t(this),
                n = t('[data-pages="search"]');
            i.is("a") && e.preventDefault(), n.data("pg.search").toggleOverlay("show")
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e) {
            return this.each(function() {
                var n = t(this),
                    s = n.data("pgFloat"),
                    o = "object" == typeof e && e;
                s || n.data("pgFloat", s = new i(this, o)), "string" == typeof e && s[e]()
            })
        }
        var i = function(e, i) {
            function n() {
                var e = o.$element,
                    i = t(window).scrollTop(),
                    n = (i - e.offset().top) * o.options.speed,
                    r = o.options.delay / 1e3,
                    a = o.options.curve,
                    l = o.options.maxTopTranslate,
                    c = o.options.maxBottomTranslate;
                if (!(0 == l && e.offset().top + e.outerHeight() < i || 0 == c && e.offset().top > i + t(window).height())) {
                    if (s < n) {
                        if (0 != l && Math.abs(n) > l) return
                    } else if (0 != c && Math.abs(n) > c) return;
                    e.css({
                        transition: "transform " + r + "s " + a,
                        transform: "translateY(" + n + "px)"
                    }), s = n
                }
            }
            this.$element = t(e), this.options = t.extend(!0, {}, t.fn.pgFloat.defaults, i);
            var s, o = this;
            t(window).bind("scroll", function() {
                n()
            }), t(window).bind("load", function() {
                n()
            })
        };
        i.VERSION = "1.0.0";
        var n = t.fn.pgFloat;
        t.fn.pgFloat = e, t.fn.pgFloat.Constructor = i, t.fn.pgFloat.defaults = {
            topMargin: 0,
            bottomMargin: 0,
            speed: .1,
            delay: 1e3,
            curve: "ease"
        }, t.fn.pgFloat.noConflict = function() {
            return t.fn.pgFloat = n, this
        }, t(window).on("load", function() {
            t('[data-pages="float"]').each(function() {
                var e = t(this);
                e.pgFloat(e.data())
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        "undefined" == typeof angular && t.Pages.init()
    }(window.jQuery);
for (var imgElement = document.querySelectorAll(".lazy"), i = 0; i < imgElement.length; ++i) imgElement[i].onload = function() {
    this.className += " loaded"
}, imgElement[i].complete && (imgElement[i].className += " loaded");
(function() {
    var t, e, i, n, s, o;
    window.update_summary = function() {
        n(), e(), o(), i(), s()
    }, t = function(t) {
        var e, i, n, s;
        return i = t / 3600, s = void 0, e = i % 1, n = e > 0 ? Math.floor(60 * e) : "", s = Math.floor(i) + "h" + n
    }, n = function() {
        var t;
        t = $('[name="cart[frequency]"]:checked'), 1 === t.length && $(".cart_frequency_summary").html(t.data().name)
    }, e = function() {
        $(".cart_date_summary").html($('[name="cart[date]"]').val())
    }, o = function() {
        $(".cart_time_summary").html($('[name="cart[time]"]').val())
    }, i = function() {
        var e;
        e = $('[name="cart[duration]"]').val(), $(".cart_duration_summary").html(t(e))
    }, s = function() {
        var t, e, i, n, s, o;
        switch (o = $('[name="cart[frequency]"]:checked'), i = parseInt($('[name="cart[duration]"]').val()) / 3600, n = 750, t = n * i, $(".cart_cost_summary").html(t + "rub"), o.val()) {
            case "week":
                n = 650;
                break;
            case "fortnight":
                n = 700
        }
        s = n * i, $(".cart_cost_total").html(s + "rub"), e = t - s, $(".cart_discount_summary").html(e + "rub")
    }, $(document).ready(function() {
        $('[name="cart[frequency]"]').change(function() {
            update_summary()
        }), $('[name="cart[duration]"]').change(function() {
            update_summary()
        }), $('[name="cart[date]"]').change(function() {
            update_summary()
        }), $('[name="cart[time]"]').change(function() {
            update_summary()
        }), $('[name="cart[ironing]"]').change(function() {
            update_summary()
        }), update_summary()
    })
}).call(this),
    function() {
        (function() {
            (function() {
                this.Turbolinks = {
                    supported: function() {
                        return null != window.history.pushState && null != window.requestAnimationFrame
                    }(),
                    visit: function(e, i) {
                        return t.controller.visit(e, i)
                    },
                    clearCache: function() {
                        return t.controller.clearCache()
                    }
                }
            }).call(this)
        }).call(this);
        var t = this.Turbolinks;
        (function() {
            (function() {
                var e, i;
                t.copyObject = function(t) {
                    var e, i, n;
                    i = {};
                    for (e in t) n = t[e], i[e] = n;
                    return i
                }, t.closest = function(t, i) {
                    return e.call(t, i)
                }, e = function() {
                    var t, e;
                    return t = document.documentElement, null != (e = t.closest) ? e : function(t) {
                        var e;
                        for (e = this; e;) {
                            if (e.nodeType === Node.ELEMENT_NODE && i.call(e, t)) return e;
                            e = e.parentNode
                        }
                    }
                }(), t.defer = function(t) {
                    return setTimeout(t, 1)
                }, t.dispatch = function(t, e) {
                    var i, n, s, o, r;
                    return o = null != e ? e : {}, r = o.target, i = o.cancelable, n = o.data, s = document.createEvent("Events"), s.initEvent(t, !0, i === !0), s.data = null != n ? n : {}, (null != r ? r : document).dispatchEvent(s), s
                }, t.match = function(t, e) {
                    return i.call(t, e)
                }, i = function() {
                    var t, e, i, n;
                    return t = document.documentElement, null != (e = null != (i = null != (n = t.matchesSelector) ? n : t.webkitMatchesSelector) ? i : t.msMatchesSelector) ? e : t.mozMatchesSelector
                }(), t.uuid = function() {
                    var t, e, i;
                    for (i = "", t = e = 1; 36 >= e; t = ++e) i += 9 === t || 14 === t || 19 === t || 24 === t ? "-" : 15 === t ? "4" : 20 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
                    return i
                }
            }).call(this),
                function() {
                    t.Location = function() {
                        function t(t) {
                            var e, i;
                            null == t && (t = ""), i = document.createElement("a"), i.href = t.toString(), this.absoluteURL = i.href, e = i.hash.length, 2 > e ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e), this.anchor = i.hash.slice(1))
                        }
                        var e, i, n, s;
                        return t.wrap = function(t) {
                            return t instanceof this ? t : new this(t)
                        }, t.prototype.getOrigin = function() {
                            return this.absoluteURL.split("/", 3).join("/")
                        }, t.prototype.getPath = function() {
                            var t, e;
                            return null != (t = null != (e = this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e[1] : void 0) ? t : "/"
                        }, t.prototype.getPathComponents = function() {
                            return this.getPath().split("/").slice(1)
                        }, t.prototype.getLastPathComponent = function() {
                            return this.getPathComponents().slice(-1)[0]
                        }, t.prototype.getExtension = function() {
                            var t, e;
                            return null != (t = null != (e = this.getLastPathComponent().match(/\.[^.]*$/)) ? e[0] : void 0) ? t : ""
                        }, t.prototype.isHTML = function() {
                            return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/);
                        }, t.prototype.isPrefixedBy = function(t) {
                            var e;
                            return e = i(t), this.isEqualTo(t) || s(this.absoluteURL, e)
                        }, t.prototype.isEqualTo = function(t) {
                            return this.absoluteURL === (null != t ? t.absoluteURL : void 0)
                        }, t.prototype.toCacheKey = function() {
                            return this.requestURL
                        }, t.prototype.toJSON = function() {
                            return this.absoluteURL
                        }, t.prototype.toString = function() {
                            return this.absoluteURL
                        }, t.prototype.valueOf = function() {
                            return this.absoluteURL
                        }, i = function(t) {
                            return e(t.getOrigin() + t.getPath())
                        }, e = function(t) {
                            return n(t, "/") ? t : t + "/"
                        }, s = function(t, e) {
                            return t.slice(0, e.length) === e
                        }, n = function(t, e) {
                            return t.slice(-e.length) === e
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.HttpRequest = function() {
                        function i(i, n, s) {
                            this.delegate = i, this.requestCanceled = e(this.requestCanceled, this), this.requestTimedOut = e(this.requestTimedOut, this), this.requestFailed = e(this.requestFailed, this), this.requestLoaded = e(this.requestLoaded, this), this.requestProgressed = e(this.requestProgressed, this), this.url = t.Location.wrap(n).requestURL, this.referrer = t.Location.wrap(s).absoluteURL, this.createXHR()
                        }
                        return i.NETWORK_FAILURE = 0, i.TIMEOUT_FAILURE = -1, i.timeout = 60, i.prototype.send = function() {
                            var t;
                            return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = !0, "function" == typeof(t = this.delegate).requestStarted ? t.requestStarted() : void 0) : void 0
                        }, i.prototype.cancel = function() {
                            return this.xhr && this.sent ? this.xhr.abort() : void 0
                        }, i.prototype.requestProgressed = function(t) {
                            return t.lengthComputable ? this.setProgress(t.loaded / t.total) : void 0
                        }, i.prototype.requestLoaded = function() {
                            return this.endRequest(function(t) {
                                return function() {
                                    var e;
                                    return 200 <= (e = t.xhr.status) && 300 > e ? t.delegate.requestCompletedWithResponse(t.xhr.responseText, t.xhr.getResponseHeader("Turbolinks-Location")) : (t.failed = !0, t.delegate.requestFailedWithStatusCode(t.xhr.status, t.xhr.responseText))
                                }
                            }(this))
                        }, i.prototype.requestFailed = function() {
                            return this.endRequest(function(t) {
                                return function() {
                                    return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)
                                }
                            }(this))
                        }, i.prototype.requestTimedOut = function() {
                            return this.endRequest(function(t) {
                                return function() {
                                    return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)
                                }
                            }(this))
                        }, i.prototype.requestCanceled = function() {
                            return this.endRequest()
                        }, i.prototype.notifyApplicationBeforeRequestStart = function() {
                            return t.dispatch("turbolinks:request-start", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, i.prototype.notifyApplicationAfterRequestEnd = function() {
                            return t.dispatch("turbolinks:request-end", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, i.prototype.createXHR = function() {
                            return this.xhr = new XMLHttpRequest, this.xhr.open("GET", this.url, !0), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled
                        }, i.prototype.endRequest = function(t) {
                            return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t && t.call(this), this.destroy()) : void 0
                        }, i.prototype.setProgress = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.delegate).requestProgressed ? e.requestProgressed(this.progress) : void 0
                        }, i.prototype.destroy = function() {
                            var t;
                            return this.setProgress(1), "function" == typeof(t = this.delegate).requestFinished && t.requestFinished(), this.delegate = null, this.xhr = null
                        }, i
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.ProgressBar = function() {
                        function t() {
                            this.trickle = e(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement()
                        }
                        var i;
                        return i = 300, t.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + i + "ms ease-out, opacity " + i / 2 + "ms " + i / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", t.prototype.show = function() {
                            return this.visible ? void 0 : (this.visible = !0, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling())
                        }, t.prototype.hide = function() {
                            return this.visible && !this.hiding ? (this.hiding = !0, this.fadeProgressElement(function(t) {
                                return function() {
                                    return t.uninstallProgressElement(), t.stopTrickling(), t.visible = !1, t.hiding = !1
                                }
                            }(this))) : void 0
                        }, t.prototype.setValue = function(t) {
                            return this.value = t, this.refresh()
                        }, t.prototype.installStylesheetElement = function() {
                            return document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
                        }, t.prototype.installProgressElement = function() {
                            return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
                        }, t.prototype.fadeProgressElement = function(t) {
                            return this.progressElement.style.opacity = 0, setTimeout(t, 1.5 * i)
                        }, t.prototype.uninstallProgressElement = function() {
                            return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0
                        }, t.prototype.startTrickling = function() {
                            return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, i)
                        }, t.prototype.stopTrickling = function() {
                            return clearInterval(this.trickleInterval), this.trickleInterval = null
                        }, t.prototype.trickle = function() {
                            return this.setValue(this.value + Math.random() / 100)
                        }, t.prototype.refresh = function() {
                            return requestAnimationFrame(function(t) {
                                return function() {
                                    return t.progressElement.style.width = 10 + 90 * t.value + "%"
                                }
                            }(this))
                        }, t.prototype.createStylesheetElement = function() {
                            var t;
                            return t = document.createElement("style"), t.type = "text/css", t.textContent = this.constructor.defaultCSS, t
                        }, t.prototype.createProgressElement = function() {
                            var t;
                            return t = document.createElement("div"), t.className = "turbolinks-progress-bar", t
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.BrowserAdapter = function() {
                        function i(i) {
                            this.controller = i, this.showProgressBar = e(this.showProgressBar, this), this.progressBar = new t.ProgressBar
                        }
                        var n, s, o, r;
                        return r = t.HttpRequest, n = r.NETWORK_FAILURE, o = r.TIMEOUT_FAILURE, s = 500, i.prototype.visitProposedToLocationWithAction = function(t, e) {
                            return this.controller.startVisitToLocationWithAction(t, e)
                        }, i.prototype.visitStarted = function(t) {
                            return t.issueRequest(), t.changeHistory(), t.loadCachedSnapshot()
                        }, i.prototype.visitRequestStarted = function(t) {
                            return this.progressBar.setValue(0), t.hasCachedSnapshot() || "restore" !== t.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
                        }, i.prototype.visitRequestProgressed = function(t) {
                            return this.progressBar.setValue(t.progress)
                        }, i.prototype.visitRequestCompleted = function(t) {
                            return t.loadResponse()
                        }, i.prototype.visitRequestFailedWithStatusCode = function(t, e) {
                            switch (e) {
                                case n:
                                case o:
                                    return this.reload();
                                default:
                                    return t.loadResponse()
                            }
                        }, i.prototype.visitRequestFinished = function() {
                            return this.hideProgressBar()
                        }, i.prototype.visitCompleted = function(t) {
                            return t.followRedirect()
                        }, i.prototype.pageInvalidated = function() {
                            return this.reload()
                        }, i.prototype.showProgressBarAfterDelay = function() {
                            return this.progressBarTimeout = setTimeout(this.showProgressBar, s)
                        }, i.prototype.showProgressBar = function() {
                            return this.progressBar.show()
                        }, i.prototype.hideProgressBar = function() {
                            return this.progressBar.hide(), clearTimeout(this.progressBarTimeout)
                        }, i.prototype.reload = function() {
                            return window.location.reload()
                        }, i
                    }()
                }.call(this),
                function() {
                    var e, i = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    e = !1, addEventListener("load", function() {
                        return t.defer(function() {
                            return e = !0
                        })
                    }, !1), t.History = function() {
                        function n(t) {
                            this.delegate = t, this.onPopState = i(this.onPopState, this)
                        }
                        return n.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("popstate", this.onPopState, !1), this.started = !0)
                        }, n.prototype.stop = function() {
                            return this.started ? (removeEventListener("popstate", this.onPopState, !1), this.started = !1) : void 0
                        }, n.prototype.push = function(e, i) {
                            return e = t.Location.wrap(e), this.update("push", e, i)
                        }, n.prototype.replace = function(e, i) {
                            return e = t.Location.wrap(e), this.update("replace", e, i)
                        }, n.prototype.onPopState = function(e) {
                            var i, n, s, o;
                            return this.shouldHandlePopState() && (o = null != (n = e.state) ? n.turbolinks : void 0) ? (i = t.Location.wrap(window.location), s = o.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(i, s)) : void 0
                        }, n.prototype.shouldHandlePopState = function() {
                            return e === !0
                        }, n.prototype.update = function(t, e, i) {
                            var n;
                            return n = {
                                turbolinks: {
                                    restorationIdentifier: i
                                }
                            }, history[t + "State"](n, null, e)
                        }, n
                    }()
                }.call(this),
                function() {
                    t.Snapshot = function() {
                        function e(t) {
                            var e, i;
                            i = t.head, e = t.body, this.head = null != i ? i : document.createElement("head"), this.body = null != e ? e : document.createElement("body")
                        }
                        return e.wrap = function(t) {
                            return t instanceof this ? t : this.fromHTML(t)
                        }, e.fromHTML = function(t) {
                            var e;
                            return e = document.createElement("html"), e.innerHTML = t, this.fromElement(e)
                        }, e.fromElement = function(t) {
                            return new this({
                                head: t.querySelector("head"),
                                body: t.querySelector("body")
                            })
                        }, e.prototype.clone = function() {
                            return new e({
                                head: this.head.cloneNode(!0),
                                body: this.body.cloneNode(!0)
                            })
                        }, e.prototype.getRootLocation = function() {
                            var e, i;
                            return i = null != (e = this.getSetting("root")) ? e : "/", new t.Location(i)
                        }, e.prototype.getCacheControlValue = function() {
                            return this.getSetting("cache-control")
                        }, e.prototype.hasAnchor = function(t) {
                            try {
                                return null != this.body.querySelector("[id='" + t + "']")
                            } catch (t) {}
                        }, e.prototype.isPreviewable = function() {
                            return "no-preview" !== this.getCacheControlValue()
                        }, e.prototype.isCacheable = function() {
                            return "no-cache" !== this.getCacheControlValue()
                        }, e.prototype.getSetting = function(t) {
                            var e, i;
                            return i = this.head.querySelectorAll("meta[name='turbolinks-" + t + "']"), e = i[i.length - 1], null != e ? e.getAttribute("content") : void 0
                        }, e
                    }()
                }.call(this),
                function() {
                    var e = [].slice;
                    t.Renderer = function() {
                        function t() {}
                        var i;
                        return t.render = function() {
                            var t, i, n, s;
                            return n = arguments[0], i = arguments[1], t = 3 <= arguments.length ? e.call(arguments, 2) : [], s = function(t, e, i) {
                                i.prototype = t.prototype;
                                var n = new i,
                                    s = t.apply(n, e);
                                return Object(s) === s ? s : n
                            }(this, t, function() {}), s.delegate = n, s.render(i), s
                        }, t.prototype.renderView = function(t) {
                            return this.delegate.viewWillRender(this.newBody), t(), this.delegate.viewRendered(this.newBody)
                        }, t.prototype.invalidateView = function() {
                            return this.delegate.viewInvalidated()
                        }, t.prototype.createScriptElement = function(t) {
                            var e;
                            return "false" === t.getAttribute("data-turbolinks-eval") ? t : (e = document.createElement("script"), e.textContent = t.textContent, i(e, t), e)
                        }, i = function(t, e) {
                            var i, n, s, o, r, a, l;
                            for (o = e.attributes, a = [], i = 0, n = o.length; n > i; i++) r = o[i], s = r.name, l = r.value, a.push(t.setAttribute(s, l));
                            return a
                        }, t
                    }()
                }.call(this),
                function() {
                    t.HeadDetails = function() {
                        function t(t) {
                            var e, i, o, r, a, l, c;
                            for (this.element = t, this.elements = {}, c = this.element.childNodes, r = 0, l = c.length; l > r; r++) o = c[r], o.nodeType === Node.ELEMENT_NODE && (a = o.outerHTML, i = null != (e = this.elements)[a] ? e[a] : e[a] = {
                                type: s(o),
                                tracked: n(o),
                                elements: []
                            }, i.elements.push(o))
                        }
                        var e, i, n, s;
                        return t.prototype.hasElementWithKey = function(t) {
                            return t in this.elements
                        }, t.prototype.getTrackedElementSignature = function() {
                            var t, e;
                            return function() {
                                var i, n;
                                i = this.elements, n = [];
                                for (t in i) e = i[t].tracked, e && n.push(t);
                                return n
                            }.call(this).join("")
                        }, t.prototype.getScriptElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("script", t)
                        }, t.prototype.getStylesheetElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("stylesheet", t)
                        }, t.prototype.getElementsMatchingTypeNotInDetails = function(t, e) {
                            var i, n, s, o, r, a;
                            s = this.elements, r = [];
                            for (n in s) o = s[n], a = o.type, i = o.elements, a !== t || e.hasElementWithKey(n) || r.push(i[0]);
                            return r
                        }, t.prototype.getProvisionalElements = function() {
                            var t, e, i, n, s, o, r;
                            i = [], n = this.elements;
                            for (e in n) s = n[e], r = s.type, o = s.tracked, t = s.elements, null != r || o ? t.length > 1 && i.push.apply(i, t.slice(1)) : i.push.apply(i, t);
                            return i
                        }, s = function(t) {
                            return e(t) ? "script" : i(t) ? "stylesheet" : void 0
                        }, n = function(t) {
                            return "reload" === t.getAttribute("data-turbolinks-track")
                        }, e = function(t) {
                            var e;
                            return e = t.tagName.toLowerCase(), "script" === e
                        }, i = function(t) {
                            var e;
                            return e = t.tagName.toLowerCase(), "style" === e || "link" === e && "stylesheet" === t.getAttribute("rel")
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                            function n() {
                                this.constructor = t
                            }
                            for (var s in e) i.call(e, s) && (t[s] = e[s]);
                            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                        },
                        i = {}.hasOwnProperty;
                    t.SnapshotRenderer = function(i) {
                        function n(e, i) {
                            this.currentSnapshot = e, this.newSnapshot = i, this.currentHeadDetails = new t.HeadDetails(this.currentSnapshot.head), this.newHeadDetails = new t.HeadDetails(this.newSnapshot.head), this.newBody = this.newSnapshot.body
                        }
                        return e(n, i), n.prototype.render = function(t) {
                            return this.trackedElementsAreIdentical() ? (this.mergeHead(), this.renderView(function(e) {
                                return function() {
                                    return e.replaceBody(), e.focusFirstAutofocusableElement(), t()
                                }
                            }(this))) : this.invalidateView()
                        }, n.prototype.mergeHead = function() {
                            return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
                        }, n.prototype.replaceBody = function() {
                            return this.activateBodyScriptElements(), this.importBodyPermanentElements(), this.assignNewBody()
                        }, n.prototype.trackedElementsAreIdentical = function() {
                            return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature()
                        }, n.prototype.copyNewHeadStylesheetElements = function() {
                            var t, e, i, n, s;
                            for (n = this.getNewHeadStylesheetElements(), s = [], e = 0, i = n.length; i > e; e++) t = n[e], s.push(document.head.appendChild(t));
                            return s
                        }, n.prototype.copyNewHeadScriptElements = function() {
                            var t, e, i, n, s;
                            for (n = this.getNewHeadScriptElements(), s = [], e = 0, i = n.length; i > e; e++) t = n[e], s.push(document.head.appendChild(this.createScriptElement(t)));
                            return s
                        }, n.prototype.removeCurrentHeadProvisionalElements = function() {
                            var t, e, i, n, s;
                            for (n = this.getCurrentHeadProvisionalElements(), s = [], e = 0, i = n.length; i > e; e++) t = n[e], s.push(document.head.removeChild(t));
                            return s
                        }, n.prototype.copyNewHeadProvisionalElements = function() {
                            var t, e, i, n, s;
                            for (n = this.getNewHeadProvisionalElements(), s = [], e = 0, i = n.length; i > e; e++) t = n[e], s.push(document.head.appendChild(t));
                            return s
                        }, n.prototype.importBodyPermanentElements = function() {
                            var t, e, i, n, s, o;
                            for (n = this.getNewBodyPermanentElements(), o = [], e = 0, i = n.length; i > e; e++) s = n[e], (t = this.findCurrentBodyPermanentElement(s)) ? o.push(s.parentNode.replaceChild(t, s)) : o.push(void 0);
                            return o
                        }, n.prototype.activateBodyScriptElements = function() {
                            var t, e, i, n, s, o;
                            for (n = this.getNewBodyScriptElements(), o = [], e = 0, i = n.length; i > e; e++) s = n[e], t = this.createScriptElement(s), o.push(s.parentNode.replaceChild(t, s));
                            return o
                        }, n.prototype.assignNewBody = function() {
                            return document.body = this.newBody
                        }, n.prototype.focusFirstAutofocusableElement = function() {
                            var t;
                            return null != (t = this.findFirstAutofocusableElement()) ? t.focus() : void 0
                        }, n.prototype.getNewHeadStylesheetElements = function() {
                            return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)
                        }, n.prototype.getNewHeadScriptElements = function() {
                            return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)
                        }, n.prototype.getCurrentHeadProvisionalElements = function() {
                            return this.currentHeadDetails.getProvisionalElements()
                        }, n.prototype.getNewHeadProvisionalElements = function() {
                            return this.newHeadDetails.getProvisionalElements()
                        }, n.prototype.getNewBodyPermanentElements = function() {
                            return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")
                        }, n.prototype.findCurrentBodyPermanentElement = function(t) {
                            return document.body.querySelector("#" + t.id + "[data-turbolinks-permanent]")
                        }, n.prototype.getNewBodyScriptElements = function() {
                            return this.newBody.querySelectorAll("script")
                        }, n.prototype.findFirstAutofocusableElement = function() {
                            return document.body.querySelector("[autofocus]")
                        }, n
                    }(t.Renderer)
                }.call(this),
                function() {
                    var e = function(t, e) {
                            function n() {
                                this.constructor = t
                            }
                            for (var s in e) i.call(e, s) && (t[s] = e[s]);
                            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
                        },
                        i = {}.hasOwnProperty;
                    t.ErrorRenderer = function(t) {
                        function i(t) {
                            this.html = t
                        }
                        return e(i, t), i.prototype.render = function(t) {
                            return this.renderView(function(e) {
                                return function() {
                                    return e.replaceDocumentHTML(), e.activateBodyScriptElements(), t()
                                }
                            }(this))
                        }, i.prototype.replaceDocumentHTML = function() {
                            return document.documentElement.innerHTML = this.html
                        }, i.prototype.activateBodyScriptElements = function() {
                            var t, e, i, n, s, o;
                            for (n = this.getScriptElements(), o = [], e = 0, i = n.length; i > e; e++) s = n[e], t = this.createScriptElement(s), o.push(s.parentNode.replaceChild(t, s));
                            return o
                        }, i.prototype.getScriptElements = function() {
                            return document.documentElement.querySelectorAll("script")
                        }, i
                    }(t.Renderer)
                }.call(this),
                function() {
                    t.View = function() {
                        function e(t) {
                            this.delegate = t, this.element = document.documentElement
                        }
                        return e.prototype.getRootLocation = function() {
                            return this.getSnapshot().getRootLocation()
                        }, e.prototype.getSnapshot = function() {
                            return t.Snapshot.fromElement(this.element)
                        }, e.prototype.render = function(t, e) {
                            var i, n, s;
                            return s = t.snapshot, i = t.error, n = t.isPreview, this.markAsPreview(n), null != s ? this.renderSnapshot(s, e) : this.renderError(i, e)
                        }, e.prototype.markAsPreview = function(t) {
                            return t ? this.element.setAttribute("data-turbolinks-preview", "") : this.element.removeAttribute("data-turbolinks-preview")
                        }, e.prototype.renderSnapshot = function(e, i) {
                            return t.SnapshotRenderer.render(this.delegate, i, this.getSnapshot(), t.Snapshot.wrap(e))
                        }, e.prototype.renderError = function(e, i) {
                            return t.ErrorRenderer.render(this.delegate, i, e)
                        }, e
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.ScrollManager = function() {
                        function t(t) {
                            this.delegate = t, this.onScroll = e(this.onScroll, this)
                        }
                        return t.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
                        }, t.prototype.stop = function() {
                            return this.started ? (removeEventListener("scroll", this.onScroll, !1), this.started = !1) : void 0
                        }, t.prototype.scrollToElement = function(t) {
                            return t.scrollIntoView()
                        }, t.prototype.scrollToPosition = function(t) {
                            var e, i;
                            return e = t.x, i = t.y, window.scrollTo(e, i)
                        }, t.prototype.onScroll = function() {
                            return this.updatePosition({
                                x: window.pageXOffset,
                                y: window.pageYOffset
                            })
                        }, t.prototype.updatePosition = function(t) {
                            var e;
                            return this.position = t, null != (e = this.delegate) ? e.scrollPositionChanged(this.position) : void 0
                        }, t
                    }()
                }.call(this),
                function() {
                    t.SnapshotCache = function() {
                        function e(t) {
                            this.size = t, this.keys = [], this.snapshots = {}
                        }
                        var i;
                        return e.prototype.has = function(t) {
                            var e;
                            return e = i(t), e in this.snapshots
                        }, e.prototype.get = function(t) {
                            var e;
                            if (this.has(t)) return e = this.read(t), this.touch(t), e
                        }, e.prototype.put = function(t, e) {
                            return this.write(t, e), this.touch(t), e
                        }, e.prototype.read = function(t) {
                            var e;
                            return e = i(t), this.snapshots[e]
                        }, e.prototype.write = function(t, e) {
                            var n;
                            return n = i(t), this.snapshots[n] = e
                        }, e.prototype.touch = function(t) {
                            var e, n;
                            return n = i(t), e = this.keys.indexOf(n), e > -1 && this.keys.splice(e, 1), this.keys.unshift(n), this.trim()
                        }, e.prototype.trim = function() {
                            var t, e, i, n, s;
                            for (n = this.keys.splice(this.size), s = [], t = 0, i = n.length; i > t; t++) e = n[t], s.push(delete this.snapshots[e]);
                            return s
                        }, i = function(e) {
                            return t.Location.wrap(e).toCacheKey()
                        }, e
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.Visit = function() {
                        function i(i, n, s) {
                            this.controller = i, this.action = s, this.performScroll = e(this.performScroll, this), this.identifier = t.uuid(), this.location = t.Location.wrap(n), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {}
                        }
                        var n;
                        return i.prototype.start = function() {
                            return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0
                        }, i.prototype.cancel = function() {
                            var t;
                            return "started" === this.state ? (null != (t = this.request) && t.cancel(), this.cancelRender(), this.state = "canceled") : void 0
                        }, i.prototype.complete = function() {
                            var t;
                            return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof(t = this.adapter).visitCompleted && t.visitCompleted(this), this.controller.visitCompleted(this)) : void 0
                        }, i.prototype.fail = function() {
                            var t;
                            return "started" === this.state ? (this.state = "failed", "function" == typeof(t = this.adapter).visitFailed ? t.visitFailed(this) : void 0) : void 0
                        }, i.prototype.changeHistory = function() {
                            var t, e;
                            return this.historyChanged ? void 0 : (t = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e = n(t), this.controller[e](this.location, this.restorationIdentifier), this.historyChanged = !0)
                        }, i.prototype.issueRequest = function() {
                            return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new t.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0
                        }, i.prototype.getCachedSnapshot = function() {
                            var t;
                            return !(t = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t.hasAnchor(this.location.anchor) || "restore" !== this.action && !t.isPreviewable() ? void 0 : t
                        }, i.prototype.hasCachedSnapshot = function() {
                            return null != this.getCachedSnapshot()
                        }, i.prototype.loadCachedSnapshot = function() {
                            var t, e;
                            return (e = this.getCachedSnapshot()) ? (t = this.shouldIssueRequest(), this.render(function() {
                                var i;
                                return this.cacheSnapshot(), this.controller.render({
                                    snapshot: e,
                                    isPreview: t
                                }, this.performScroll), "function" == typeof(i = this.adapter).visitRendered && i.visitRendered(this), t ? void 0 : this.complete()
                            })) : void 0
                        }, i.prototype.loadResponse = function() {
                            return null != this.response ? this.render(function() {
                                var t, e;
                                return this.cacheSnapshot(), this.request.failed ? (this.controller.render({
                                    error: this.response
                                }, this.performScroll), "function" == typeof(t = this.adapter).visitRendered && t.visitRendered(this), this.fail()) : (this.controller.render({
                                    snapshot: this.response
                                }, this.performScroll), "function" == typeof(e = this.adapter).visitRendered && e.visitRendered(this), this.complete())
                            }) : void 0
                        }, i.prototype.followRedirect = function() {
                            return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0) : void 0
                        }, i.prototype.requestStarted = function() {
                            var t;
                            return this.recordTimingMetric("requestStart"), "function" == typeof(t = this.adapter).visitRequestStarted ? t.visitRequestStarted(this) : void 0
                        }, i.prototype.requestProgressed = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.adapter).visitRequestProgressed ? e.visitRequestProgressed(this) : void 0
                        }, i.prototype.requestCompletedWithResponse = function(e, i) {
                            return this.response = e, null != i && (this.redirectedToLocation = t.Location.wrap(i)), this.adapter.visitRequestCompleted(this)
                        }, i.prototype.requestFailedWithStatusCode = function(t, e) {
                            return this.response = e, this.adapter.visitRequestFailedWithStatusCode(this, t)
                        }, i.prototype.requestFinished = function() {
                            var t;
                            return this.recordTimingMetric("requestEnd"), "function" == typeof(t = this.adapter).visitRequestFinished ? t.visitRequestFinished(this) : void 0
                        }, i.prototype.performScroll = function() {
                            return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
                        }, i.prototype.scrollToRestoredPosition = function() {
                            var t, e;
                            return t = null != (e = this.restorationData) ? e.scrollPosition : void 0, null != t ? (this.controller.scrollToPosition(t), !0) : void 0
                        }, i.prototype.scrollToAnchor = function() {
                            return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), !0) : void 0
                        }, i.prototype.scrollToTop = function() {
                            return this.controller.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, i.prototype.recordTimingMetric = function(t) {
                            var e;
                            return null != (e = this.timingMetrics)[t] ? e[t] : e[t] = (new Date).getTime()
                        }, i.prototype.getTimingMetrics = function() {
                            return t.copyObject(this.timingMetrics)
                        }, n = function(t) {
                            switch (t) {
                                case "replace":
                                    return "replaceHistoryWithLocationAndRestorationIdentifier";
                                case "advance":
                                case "restore":
                                    return "pushHistoryWithLocationAndRestorationIdentifier"
                            }
                        }, i.prototype.shouldIssueRequest = function() {
                            return "restore" !== this.action || !this.hasCachedSnapshot()
                        }, i.prototype.cacheSnapshot = function() {
                            return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = !0)
                        }, i.prototype.render = function(t) {
                            return this.cancelRender(), this.frame = requestAnimationFrame(function(e) {
                                return function() {
                                    return e.frame = null, t.call(e)
                                }
                            }(this))
                        }, i.prototype.cancelRender = function() {
                            return this.frame ? cancelAnimationFrame(this.frame) : void 0
                        }, i
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    t.Controller = function() {
                        function i() {
                            this.clickBubbled = e(this.clickBubbled, this), this.clickCaptured = e(this.clickCaptured, this), this.pageLoaded = e(this.pageLoaded, this), this.history = new t.History(this), this.view = new t.View(this), this.scrollManager = new t.ScrollManager(this), this.restorationData = {}, this.clearCache()
                        }
                        return i.prototype.start = function() {
                            return t.supported && !this.started ? (addEventListener("click", this.clickCaptured, !0), addEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.start(), this.startHistory(), this.started = !0, this.enabled = !0) : void 0
                        }, i.prototype.disable = function() {
                            return this.enabled = !1
                        }, i.prototype.stop = function() {
                            return this.started ? (removeEventListener("click", this.clickCaptured, !0), removeEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.stop(), this.stopHistory(), this.started = !1) : void 0
                        }, i.prototype.clearCache = function() {
                            return this.cache = new t.SnapshotCache(10)
                        }, i.prototype.visit = function(e, i) {
                            var n, s;
                            return null == i && (i = {}), e = t.Location.wrap(e), this.applicationAllowsVisitingLocation(e) ? this.locationIsVisitable(e) ? (n = null != (s = i.action) ? s : "advance", this.adapter.visitProposedToLocationWithAction(e, n)) : window.location = e : void 0
                        }, i.prototype.startVisitToLocationWithAction = function(e, i, n) {
                            var s;
                            return t.supported ? (s = this.getRestorationDataForIdentifier(n), this.startVisit(e, i, {
                                restorationData: s
                            })) : window.location = e
                        }, i.prototype.startHistory = function() {
                            return this.location = t.Location.wrap(window.location), this.restorationIdentifier = t.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier)
                        }, i.prototype.stopHistory = function() {
                            return this.history.stop()
                        }, i.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(e, i) {
                            return this.restorationIdentifier = i, this.location = t.Location.wrap(e), this.history.push(this.location, this.restorationIdentifier)
                        }, i.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(e, i) {
                            return this.restorationIdentifier = i, this.location = t.Location.wrap(e), this.history.replace(this.location, this.restorationIdentifier)
                        }, i.prototype.historyPoppedToLocationWithRestorationIdentifier = function(e, i) {
                            var n;
                            return this.restorationIdentifier = i, this.enabled ? (n = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(e, "restore", {
                                restorationIdentifier: this.restorationIdentifier,
                                restorationData: n,
                                historyChanged: !0
                            }), this.location = t.Location.wrap(e)) : this.adapter.pageInvalidated()
                        }, i.prototype.getCachedSnapshotForLocation = function(t) {
                            var e;
                            return e = this.cache.get(t), e ? e.clone() : void 0
                        }, i.prototype.shouldCacheSnapshot = function() {
                            return this.view.getSnapshot().isCacheable()
                        }, i.prototype.cacheSnapshot = function() {
                            var t;
                            return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), t = this.view.getSnapshot(), this.cache.put(this.lastRenderedLocation, t.clone())) : void 0
                        }, i.prototype.scrollToAnchor = function(t) {
                            var e;
                            return (e = document.getElementById(t)) ? this.scrollToElement(e) : this.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, i.prototype.scrollToElement = function(t) {
                            return this.scrollManager.scrollToElement(t)
                        }, i.prototype.scrollToPosition = function(t) {
                            return this.scrollManager.scrollToPosition(t)
                        }, i.prototype.scrollPositionChanged = function(t) {
                            var e;
                            return e = this.getCurrentRestorationData(), e.scrollPosition = t
                        }, i.prototype.render = function(t, e) {
                            return this.view.render(t, e)
                        }, i.prototype.viewInvalidated = function() {
                            return this.adapter.pageInvalidated()
                        }, i.prototype.viewWillRender = function(t) {
                            return this.notifyApplicationBeforeRender(t)
                        }, i.prototype.viewRendered = function() {
                            return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender()
                        }, i.prototype.pageLoaded = function() {
                            return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
                        }, i.prototype.clickCaptured = function() {
                            return removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
                        }, i.prototype.clickBubbled = function(t) {
                            var e, i, n;
                            return this.enabled && this.clickEventIsSignificant(t) && (i = this.getVisitableLinkForNode(t.target)) && (n = this.getVisitableLocationForLink(i)) && this.applicationAllowsFollowingLinkToLocation(i, n) ? (t.preventDefault(), e = this.getActionForLink(i), this.visit(n, {
                                action: e
                            })) : void 0
                        }, i.prototype.applicationAllowsFollowingLinkToLocation = function(t, e) {
                            var i;
                            return i = this.notifyApplicationAfterClickingLinkToLocation(t, e), !i.defaultPrevented
                        }, i.prototype.applicationAllowsVisitingLocation = function(t) {
                            var e;
                            return e = this.notifyApplicationBeforeVisitingLocation(t), !e.defaultPrevented
                        }, i.prototype.notifyApplicationAfterClickingLinkToLocation = function(e, i) {
                            return t.dispatch("turbolinks:click", {
                                target: e,
                                data: {
                                    url: i.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, i.prototype.notifyApplicationBeforeVisitingLocation = function(e) {
                            return t.dispatch("turbolinks:before-visit", {
                                data: {
                                    url: e.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, i.prototype.notifyApplicationAfterVisitingLocation = function(e) {
                            return t.dispatch("turbolinks:visit", {
                                data: {
                                    url: e.absoluteURL
                                }
                            })
                        }, i.prototype.notifyApplicationBeforeCachingSnapshot = function() {
                            return t.dispatch("turbolinks:before-cache")
                        }, i.prototype.notifyApplicationBeforeRender = function(e) {
                            return t.dispatch("turbolinks:before-render", {
                                data: {
                                    newBody: e
                                }
                            })
                        }, i.prototype.notifyApplicationAfterRender = function() {
                            return t.dispatch("turbolinks:render")
                        }, i.prototype.notifyApplicationAfterPageLoad = function(e) {
                            return null == e && (e = {}), t.dispatch("turbolinks:load", {
                                data: {
                                    url: this.location.absoluteURL,
                                    timing: e
                                }
                            })
                        }, i.prototype.startVisit = function(t, e, i) {
                            var n;
                            return null != (n = this.currentVisit) && n.cancel(), this.currentVisit = this.createVisit(t, e, i), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t)
                        }, i.prototype.createVisit = function(e, i, n) {
                            var s, o, r, a, l;
                            return o = null != n ? n : {}, a = o.restorationIdentifier, r = o.restorationData, s = o.historyChanged, l = new t.Visit(this, e, i), l.restorationIdentifier = null != a ? a : t.uuid(), l.restorationData = t.copyObject(r), l.historyChanged = s, l.referrer = this.location, l
                        }, i.prototype.visitCompleted = function(t) {
                            return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())
                        }, i.prototype.clickEventIsSignificant = function(t) {
                            return !(t.defaultPrevented || t.target.isContentEditable || t.which > 1 || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey)
                        }, i.prototype.getVisitableLinkForNode = function(e) {
                            return this.nodeIsVisitable(e) ? t.closest(e, "a[href]:not([target])") : void 0
                        }, i.prototype.getVisitableLocationForLink = function(e) {
                            var i;
                            return i = new t.Location(e.getAttribute("href")), this.locationIsVisitable(i) ? i : void 0
                        }, i.prototype.getActionForLink = function(t) {
                            var e;
                            return null != (e = t.getAttribute("data-turbolinks-action")) ? e : "advance"
                        }, i.prototype.nodeIsVisitable = function(e) {
                            var i;
                            return !(i = t.closest(e, "[data-turbolinks]")) || "false" !== i.getAttribute("data-turbolinks")
                        }, i.prototype.locationIsVisitable = function(t) {
                            return t.isPrefixedBy(this.view.getRootLocation()) && t.isHTML()
                        }, i.prototype.getCurrentRestorationData = function() {
                            return this.getRestorationDataForIdentifier(this.restorationIdentifier)
                        }, i.prototype.getRestorationDataForIdentifier = function(t) {
                            var e;
                            return null != (e = this.restorationData)[t] ? e[t] : e[t] = {}
                        }, i
                    }()
                }.call(this),
                function() {
                    var e, i, n;
                    t.start = function() {
                        return i() ? (null == t.controller && (t.controller = e()), t.controller.start()) : void 0
                    }, i = function() {
                        return null == window.Turbolinks && (window.Turbolinks = t), n()
                    }, e = function() {
                        var e;
                        return e = new t.Controller, e.adapter = new t.BrowserAdapter(e), e
                    }, n = function() {
                        return window.Turbolinks === t
                    }, n() && t.start()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
    }.call(this);
