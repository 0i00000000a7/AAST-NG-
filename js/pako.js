/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self).pako = {}))
})(this, function (t) {
  'use strict'
  function e(t) {
    let e = t.length
    for (; --e >= 0; ) t[e] = 0
  }
  const a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
    i = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
    n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
    s = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    r = new Array(576)
  e(r)
  const l = new Array(60)
  e(l)
  const o = new Array(512)
  e(o)
  const h = new Array(256)
  e(h)
  const d = new Array(29)
  e(d)
  const _ = new Array(30)
  function f(t, e, a, i, n) {
    ;(this.static_tree = t), (this.extra_bits = e), (this.extra_base = a), (this.elems = i), (this.max_length = n), (this.has_stree = t && t.length)
  }
  let c, u, w
  function b(t, e) {
    ;(this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e)
  }
  e(_)
  const g = (t) => (t < 256 ? o[t] : o[256 + (t >>> 7)]),
    p = (t, e) => {
      ;(t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255)
    },
    m = (t, e, a) => {
      t.bi_valid > 16 - a
        ? ((t.bi_buf |= (e << t.bi_valid) & 65535), p(t, t.bi_buf), (t.bi_buf = e >> (16 - t.bi_valid)), (t.bi_valid += a - 16))
        : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += a))
    },
    k = (t, e, a) => {
      m(t, a[2 * e], a[2 * e + 1])
    },
    v = (t, e) => {
      let a = 0
      do {
        ;(a |= 1 & t), (t >>>= 1), (a <<= 1)
      } while (--e > 0)
      return a >>> 1
    },
    y = (t, e, a) => {
      const i = new Array(16)
      let n,
        s,
        r = 0
      for (n = 1; n <= 15; n++) i[n] = r = (r + a[n - 1]) << 1
      for (s = 0; s <= e; s++) {
        let e = t[2 * s + 1]
        0 !== e && (t[2 * s] = v(i[e]++, e))
      }
    },
    x = (t) => {
      let e
      for (e = 0; e < 286; e++) t.dyn_ltree[2 * e] = 0
      for (e = 0; e < 30; e++) t.dyn_dtree[2 * e] = 0
      for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0
      ;(t.dyn_ltree[512] = 1), (t.opt_len = t.static_len = 0), (t.last_lit = t.matches = 0)
    },
    z = (t) => {
      t.bi_valid > 8 ? p(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0)
    },
    A = (t, e, a, i) => {
      const n = 2 * e,
        s = 2 * a
      return t[n] < t[s] || (t[n] === t[s] && i[e] <= i[a])
    },
    E = (t, e, a) => {
      const i = t.heap[a]
      let n = a << 1
      for (; n <= t.heap_len && (n < t.heap_len && A(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !A(e, i, t.heap[n], t.depth)); )
        (t.heap[a] = t.heap[n]), (a = n), (n <<= 1)
      t.heap[a] = i
    },
    R = (t, e, n) => {
      let s,
        r,
        l,
        o,
        f = 0
      if (0 !== t.last_lit)
        do {
          ;(s = (t.pending_buf[t.d_buf + 2 * f] << 8) | t.pending_buf[t.d_buf + 2 * f + 1]),
            (r = t.pending_buf[t.l_buf + f]),
            f++,
            0 === s
              ? k(t, r, e)
              : ((l = h[r]),
                k(t, l + 256 + 1, e),
                0 !== (o = a[l]) && ((r -= d[l]), m(t, r, o)),
                (l = g(--s)),
                k(t, l, n),
                0 !== (o = i[l]) && ((s -= _[l]), m(t, s, o)))
        } while (f < t.last_lit)
      k(t, 256, e)
    },
    Z = (t, e) => {
      const a = e.dyn_tree,
        i = e.stat_desc.static_tree,
        n = e.stat_desc.has_stree,
        s = e.stat_desc.elems
      let r,
        l,
        o,
        h = -1
      for (t.heap_len = 0, t.heap_max = 573, r = 0; r < s; r++)
        0 !== a[2 * r] ? ((t.heap[++t.heap_len] = h = r), (t.depth[r] = 0)) : (a[2 * r + 1] = 0)
      for (; t.heap_len < 2; )
        (a[2 * (o = t.heap[++t.heap_len] = h < 2 ? ++h : 0)] = 1), (t.depth[o] = 0), t.opt_len--, n && (t.static_len -= i[2 * o + 1])
      for (e.max_code = h, r = t.heap_len >> 1; r >= 1; r--) E(t, a, r)
      o = s
      do {
        ;(r = t.heap[1]),
          (t.heap[1] = t.heap[t.heap_len--]),
          E(t, a, 1),
          (l = t.heap[1]),
          (t.heap[--t.heap_max] = r),
          (t.heap[--t.heap_max] = l),
          (a[2 * o] = a[2 * r] + a[2 * l]),
          (t.depth[o] = (t.depth[r] >= t.depth[l] ? t.depth[r] : t.depth[l]) + 1),
          (a[2 * r + 1] = a[2 * l + 1] = o),
          (t.heap[1] = o++),
          E(t, a, 1)
      } while (t.heap_len >= 2)
      ;(t.heap[--t.heap_max] = t.heap[1]),
        ((t, e) => {
          const a = e.dyn_tree,
            i = e.max_code,
            n = e.stat_desc.static_tree,
            s = e.stat_desc.has_stree,
            r = e.stat_desc.extra_bits,
            l = e.stat_desc.extra_base,
            o = e.stat_desc.max_length
          let h,
            d,
            _,
            f,
            c,
            u,
            w = 0
          for (f = 0; f <= 15; f++) t.bl_count[f] = 0
          for (a[2 * t.heap[t.heap_max] + 1] = 0, h = t.heap_max + 1; h < 573; h++)
            (f = a[2 * a[2 * (d = t.heap[h]) + 1] + 1] + 1) > o && ((f = o), w++),
              (a[2 * d + 1] = f),
              d > i ||
                (t.bl_count[f]++,
                (c = 0),
                d >= l && (c = r[d - l]),
                (u = a[2 * d]),
                (t.opt_len += u * (f + c)),
                s && (t.static_len += u * (n[2 * d + 1] + c)))
          if (0 !== w) {
            do {
              for (f = o - 1; 0 === t.bl_count[f]; ) f--
              t.bl_count[f]--, (t.bl_count[f + 1] += 2), t.bl_count[o]--, (w -= 2)
            } while (w > 0)
            for (f = o; 0 !== f; f--)
              for (d = t.bl_count[f]; 0 !== d; )
                (_ = t.heap[--h]) > i || (a[2 * _ + 1] !== f && ((t.opt_len += (f - a[2 * _ + 1]) * a[2 * _]), (a[2 * _ + 1] = f)), d--)
          }
        })(t, e),
        y(a, h, t.bl_count)
    },
    U = (t, e, a) => {
      let i,
        n,
        s = -1,
        r = e[1],
        l = 0,
        o = 7,
        h = 4
      for (0 === r && ((o = 138), (h = 3)), e[2 * (a + 1) + 1] = 65535, i = 0; i <= a; i++)
        (n = r),
          (r = e[2 * (i + 1) + 1]),
          (++l < o && n === r) ||
            (l < h
              ? (t.bl_tree[2 * n] += l)
              : 0 !== n
                ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++)
                : l <= 10
                  ? t.bl_tree[34]++
                  : t.bl_tree[36]++,
            (l = 0),
            (s = n),
            0 === r ? ((o = 138), (h = 3)) : n === r ? ((o = 6), (h = 3)) : ((o = 7), (h = 4)))
    },
    S = (t, e, a) => {
      let i,
        n,
        s = -1,
        r = e[1],
        l = 0,
        o = 7,
        h = 4
      for (0 === r && ((o = 138), (h = 3)), i = 0; i <= a; i++)
        if (((n = r), (r = e[2 * (i + 1) + 1]), !(++l < o && n === r))) {
          if (l < h)
            do {
              k(t, n, t.bl_tree)
            } while (0 != --l)
          else
            0 !== n
              ? (n !== s && (k(t, n, t.bl_tree), l--), k(t, 16, t.bl_tree), m(t, l - 3, 2))
              : l <= 10
                ? (k(t, 17, t.bl_tree), m(t, l - 3, 3))
                : (k(t, 18, t.bl_tree), m(t, l - 11, 7))
          ;(l = 0), (s = n), 0 === r ? ((o = 138), (h = 3)) : n === r ? ((o = 6), (h = 3)) : ((o = 7), (h = 4))
        }
    }
  let D = !1
  const T = (t, e, a, i) => {
    m(t, 0 + (i ? 1 : 0), 3),
      ((t, e, a, i) => {
        z(t), p(t, a), p(t, ~a), t.pending_buf.set(t.window.subarray(e, e + a), t.pending), (t.pending += a)
      })(t, e, a)
  }
  var O = {
      _tr_init: (t) => {
        D ||
          ((() => {
            let t, e, s, b, g
            const p = new Array(16)
            for (s = 0, b = 0; b < 28; b++) for (d[b] = s, t = 0; t < 1 << a[b]; t++) h[s++] = b
            for (h[s - 1] = b, g = 0, b = 0; b < 16; b++) for (_[b] = g, t = 0; t < 1 << i[b]; t++) o[g++] = b
            for (g >>= 7; b < 30; b++) for (_[b] = g << 7, t = 0; t < 1 << (i[b] - 7); t++) o[256 + g++] = b
            for (e = 0; e <= 15; e++) p[e] = 0
            for (t = 0; t <= 143; ) (r[2 * t + 1] = 8), t++, p[8]++
            for (; t <= 255; ) (r[2 * t + 1] = 9), t++, p[9]++
            for (; t <= 279; ) (r[2 * t + 1] = 7), t++, p[7]++
            for (; t <= 287; ) (r[2 * t + 1] = 8), t++, p[8]++
            for (y(r, 287, p), t = 0; t < 30; t++) (l[2 * t + 1] = 5), (l[2 * t] = v(t, 5))
            ;(c = new f(r, a, 257, 286, 15)), (u = new f(l, i, 0, 30, 15)), (w = new f(new Array(0), n, 0, 19, 7))
          })(),
          (D = !0)),
          (t.l_desc = new b(t.dyn_ltree, c)),
          (t.d_desc = new b(t.dyn_dtree, u)),
          (t.bl_desc = new b(t.bl_tree, w)),
          (t.bi_buf = 0),
          (t.bi_valid = 0),
          x(t)
      },
      _tr_stored_block: T,
      _tr_flush_block: (t, e, a, i) => {
        let n,
          o,
          h = 0
        t.level > 0
          ? (2 === t.strm.data_type &&
              (t.strm.data_type = ((t) => {
                let e,
                  a = 4093624447
                for (e = 0; e <= 31; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return 0
                if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1
                for (e = 32; e < 256; e++) if (0 !== t.dyn_ltree[2 * e]) return 1
                return 0
              })(t)),
            Z(t, t.l_desc),
            Z(t, t.d_desc),
            (h = ((t) => {
              let e
              for (
                U(t, t.dyn_ltree, t.l_desc.max_code), U(t, t.dyn_dtree, t.d_desc.max_code), Z(t, t.bl_desc), e = 18;
                e >= 3 && 0 === t.bl_tree[2 * s[e] + 1];
                e--
              );
              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e
            })(t)),
            (n = (t.opt_len + 3 + 7) >>> 3),
            (o = (t.static_len + 3 + 7) >>> 3) <= n && (n = o))
          : (n = o = a + 5),
          a + 4 <= n && -1 !== e
            ? T(t, e, a, i)
            : 4 === t.strategy || o === n
              ? (m(t, 2 + (i ? 1 : 0), 3), R(t, r, l))
              : (m(t, 4 + (i ? 1 : 0), 3),
                ((t, e, a, i) => {
                  let n
                  for (m(t, e - 257, 5), m(t, a - 1, 5), m(t, i - 4, 4), n = 0; n < i; n++) m(t, t.bl_tree[2 * s[n] + 1], 3)
                  S(t, t.dyn_ltree, e - 1), S(t, t.dyn_dtree, a - 1)
                })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, h + 1),
                R(t, t.dyn_ltree, t.dyn_dtree)),
          x(t),
          i && z(t)
      },
      _tr_tally: (t, e, a) => (
        (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
        (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
        (t.pending_buf[t.l_buf + t.last_lit] = 255 & a),
        t.last_lit++,
        0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, e--, t.dyn_ltree[2 * (h[a] + 256 + 1)]++, t.dyn_dtree[2 * g(e)]++),
        t.last_lit === t.lit_bufsize - 1
      ),
      _tr_align: (t) => {
        m(t, 2, 3),
          k(t, 256, r),
          ((t) => {
            16 === t.bi_valid
              ? (p(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
              : t.bi_valid >= 8 && ((t.pending_buf[t.pending++] = 255 & t.bi_buf), (t.bi_buf >>= 8), (t.bi_valid -= 8))
          })(t)
      },
    },
    I = (t, e, a, i) => {
      let n = (65535 & t) | 0,
        s = ((t >>> 16) & 65535) | 0,
        r = 0
      for (; 0 !== a; ) {
        a -= r = a > 2e3 ? 2e3 : a
        do {
          s = (s + (n = (n + e[i++]) | 0)) | 0
        } while (--r)
        ;(n %= 65521), (s %= 65521)
      }
      return n | (s << 16) | 0
    }
  const F = new Uint32Array(
    (() => {
      let t,
        e = []
      for (var a = 0; a < 256; a++) {
        t = a
        for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1
        e[a] = t
      }
      return e
    })(),
  )
  var L = (t, e, a, i) => {
      const n = F,
        s = i + a
      t ^= -1
      for (let a = i; a < s; a++) t = (t >>> 8) ^ n[255 & (t ^ e[a])]
      return -1 ^ t
    },
    N = {
      2: 'need dictionary',
      1: 'stream end',
      0: '',
      '-1': 'file error',
      '-2': 'stream error',
      '-3': 'data error',
      '-4': 'insufficient memory',
      '-5': 'buffer error',
      '-6': 'incompatible version',
    },
    B = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_MEM_ERROR: -4,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8,
    }
  const { _tr_init: C, _tr_stored_block: M, _tr_flush_block: H, _tr_tally: j, _tr_align: K } = O,
    {
      Z_NO_FLUSH: P,
      Z_PARTIAL_FLUSH: Y,
      Z_FULL_FLUSH: G,
      Z_FINISH: X,
      Z_BLOCK: W,
      Z_OK: q,
      Z_STREAM_END: J,
      Z_STREAM_ERROR: Q,
      Z_DATA_ERROR: V,
      Z_BUF_ERROR: $,
      Z_DEFAULT_COMPRESSION: tt,
      Z_FILTERED: et,
      Z_HUFFMAN_ONLY: at,
      Z_RLE: it,
      Z_FIXED: nt,
      Z_DEFAULT_STRATEGY: st,
      Z_UNKNOWN: rt,
      Z_DEFLATED: lt,
    } = B,
    ot = 262,
    ht = (t, e) => ((t.msg = N[e]), e),
    dt = (t) => (t << 1) - (t > 4 ? 9 : 0),
    _t = (t) => {
      let e = t.length
      for (; --e >= 0; ) t[e] = 0
    }
  let ft = (t, e, a) => ((e << t.hash_shift) ^ a) & t.hash_mask
  const ct = (t) => {
      const e = t.state
      let a = e.pending
      a > t.avail_out && (a = t.avail_out),
        0 !== a &&
          (t.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + a), t.next_out),
          (t.next_out += a),
          (e.pending_out += a),
          (t.total_out += a),
          (t.avail_out -= a),
          (e.pending -= a),
          0 === e.pending && (e.pending_out = 0))
    },
    ut = (t, e) => {
      H(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), (t.block_start = t.strstart), ct(t.strm)
    },
    wt = (t, e) => {
      t.pending_buf[t.pending++] = e
    },
    bt = (t, e) => {
      ;(t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e)
    },
    gt = (t, e, a, i) => {
      let n = t.avail_in
      return (
        n > i && (n = i),
        0 === n
          ? 0
          : ((t.avail_in -= n),
            e.set(t.input.subarray(t.next_in, t.next_in + n), a),
            1 === t.state.wrap ? (t.adler = I(t.adler, e, n, a)) : 2 === t.state.wrap && (t.adler = L(t.adler, e, n, a)),
            (t.next_in += n),
            (t.total_in += n),
            n)
      )
    },
    pt = (t, e) => {
      let a,
        i,
        n = t.max_chain_length,
        s = t.strstart,
        r = t.prev_length,
        l = t.nice_match
      const o = t.strstart > t.w_size - ot ? t.strstart - (t.w_size - ot) : 0,
        h = t.window,
        d = t.w_mask,
        _ = t.prev,
        f = t.strstart + 258
      let c = h[s + r - 1],
        u = h[s + r]
      t.prev_length >= t.good_match && (n >>= 2), l > t.lookahead && (l = t.lookahead)
      do {
        if (h[(a = e) + r] === u && h[a + r - 1] === c && h[a] === h[s] && h[++a] === h[s + 1]) {
          ;(s += 2), a++
          do {} while (
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            h[++s] === h[++a] &&
            s < f
          )
          if (((i = 258 - (f - s)), (s = f - 258), i > r)) {
            if (((t.match_start = e), (r = i), i >= l)) break
            ;(c = h[s + r - 1]), (u = h[s + r])
          }
        }
      } while ((e = _[e & d]) > o && 0 != --n)
      return r <= t.lookahead ? r : t.lookahead
    },
    mt = (t) => {
      const e = t.w_size
      let a, i, n, s, r
      do {
        if (((s = t.window_size - t.lookahead - t.strstart), t.strstart >= e + (e - ot))) {
          t.window.set(t.window.subarray(e, e + e), 0), (t.match_start -= e), (t.strstart -= e), (t.block_start -= e), (a = i = t.hash_size)
          do {
            ;(n = t.head[--a]), (t.head[a] = n >= e ? n - e : 0)
          } while (--i)
          a = i = e
          do {
            ;(n = t.prev[--a]), (t.prev[a] = n >= e ? n - e : 0)
          } while (--i)
          s += e
        }
        if (0 === t.strm.avail_in) break
        if (((i = gt(t.strm, t.window, t.strstart + t.lookahead, s)), (t.lookahead += i), t.lookahead + t.insert >= 3))
          for (
            r = t.strstart - t.insert, t.ins_h = t.window[r], t.ins_h = ft(t, t.ins_h, t.window[r + 1]);
            t.insert &&
            ((t.ins_h = ft(t, t.ins_h, t.window[r + 3 - 1])),
            (t.prev[r & t.w_mask] = t.head[t.ins_h]),
            (t.head[t.ins_h] = r),
            r++,
            t.insert--,
            !(t.lookahead + t.insert < 3));

          );
      } while (t.lookahead < ot && 0 !== t.strm.avail_in)
    },
    kt = (t, e) => {
      let a, i
      for (;;) {
        if (t.lookahead < ot) {
          if ((mt(t), t.lookahead < ot && e === P)) return 1
          if (0 === t.lookahead) break
        }
        if (
          ((a = 0),
          t.lookahead >= 3 &&
            ((t.ins_h = ft(t, t.ins_h, t.window[t.strstart + 3 - 1])),
            (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
            (t.head[t.ins_h] = t.strstart)),
          0 !== a && t.strstart - a <= t.w_size - ot && (t.match_length = pt(t, a)),
          t.match_length >= 3)
        )
          if (
            ((i = j(t, t.strstart - t.match_start, t.match_length - 3)),
            (t.lookahead -= t.match_length),
            t.match_length <= t.max_lazy_match && t.lookahead >= 3)
          ) {
            t.match_length--
            do {
              t.strstart++,
                (t.ins_h = ft(t, t.ins_h, t.window[t.strstart + 3 - 1])),
                (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                (t.head[t.ins_h] = t.strstart)
            } while (0 != --t.match_length)
            t.strstart++
          } else
            (t.strstart += t.match_length),
              (t.match_length = 0),
              (t.ins_h = t.window[t.strstart]),
              (t.ins_h = ft(t, t.ins_h, t.window[t.strstart + 1]))
        else (i = j(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++
        if (i && (ut(t, !1), 0 === t.strm.avail_out)) return 1
      }
      return (
        (t.insert = t.strstart < 2 ? t.strstart : 2),
        e === X ? (ut(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (ut(t, !1), 0 === t.strm.avail_out) ? 1 : 2
      )
    },
    vt = (t, e) => {
      let a, i, n
      for (;;) {
        if (t.lookahead < ot) {
          if ((mt(t), t.lookahead < ot && e === P)) return 1
          if (0 === t.lookahead) break
        }
        if (
          ((a = 0),
          t.lookahead >= 3 &&
            ((t.ins_h = ft(t, t.ins_h, t.window[t.strstart + 3 - 1])),
            (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
            (t.head[t.ins_h] = t.strstart)),
          (t.prev_length = t.match_length),
          (t.prev_match = t.match_start),
          (t.match_length = 2),
          0 !== a &&
            t.prev_length < t.max_lazy_match &&
            t.strstart - a <= t.w_size - ot &&
            ((t.match_length = pt(t, a)),
            t.match_length <= 5 && (t.strategy === et || (3 === t.match_length && t.strstart - t.match_start > 4096)) && (t.match_length = 2)),
          t.prev_length >= 3 && t.match_length <= t.prev_length)
        ) {
          ;(n = t.strstart + t.lookahead - 3),
            (i = j(t, t.strstart - 1 - t.prev_match, t.prev_length - 3)),
            (t.lookahead -= t.prev_length - 1),
            (t.prev_length -= 2)
          do {
            ++t.strstart <= n &&
              ((t.ins_h = ft(t, t.ins_h, t.window[t.strstart + 3 - 1])),
              (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
              (t.head[t.ins_h] = t.strstart))
          } while (0 != --t.prev_length)
          if (((t.match_available = 0), (t.match_length = 2), t.strstart++, i && (ut(t, !1), 0 === t.strm.avail_out))) return 1
        } else if (t.match_available) {
          if (((i = j(t, 0, t.window[t.strstart - 1])) && ut(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)) return 1
        } else (t.match_available = 1), t.strstart++, t.lookahead--
      }
      return (
        t.match_available && ((i = j(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
        (t.insert = t.strstart < 2 ? t.strstart : 2),
        e === X ? (ut(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (ut(t, !1), 0 === t.strm.avail_out) ? 1 : 2
      )
    }
  function yt(t, e, a, i, n) {
    ;(this.good_length = t), (this.max_lazy = e), (this.nice_length = a), (this.max_chain = i), (this.func = n)
  }
  const xt = [
      new yt(0, 0, 0, 0, (t, e) => {
        let a = 65535
        for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if ((mt(t), 0 === t.lookahead && e === P)) return 1
            if (0 === t.lookahead) break
          }
          ;(t.strstart += t.lookahead), (t.lookahead = 0)
          const i = t.block_start + a
          if ((0 === t.strstart || t.strstart >= i) && ((t.lookahead = t.strstart - i), (t.strstart = i), ut(t, !1), 0 === t.strm.avail_out)) return 1
          if (t.strstart - t.block_start >= t.w_size - ot && (ut(t, !1), 0 === t.strm.avail_out)) return 1
        }
        return (
          (t.insert = 0), e === X ? (ut(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (ut(t, !1), t.strm.avail_out), 1)
        )
      }),
      new yt(4, 4, 8, 4, kt),
      new yt(4, 5, 16, 8, kt),
      new yt(4, 6, 32, 32, kt),
      new yt(4, 4, 16, 16, vt),
      new yt(8, 16, 32, 32, vt),
      new yt(8, 16, 128, 128, vt),
      new yt(8, 32, 128, 256, vt),
      new yt(32, 128, 258, 1024, vt),
      new yt(32, 258, 258, 4096, vt),
    ],
    zt = (t) => {
      if (!t || !t.state) return ht(t, Q)
      ;(t.total_in = t.total_out = 0), (t.data_type = rt)
      const e = t.state
      return (
        (e.pending = 0),
        (e.pending_out = 0),
        e.wrap < 0 && (e.wrap = -e.wrap),
        (e.status = e.wrap ? 42 : 113),
        (t.adler = 2 === e.wrap ? 0 : 1),
        (e.last_flush = P),
        C(e),
        q
      )
    },
    At = (t) => {
      const e = zt(t)
      var a
      return (
        e === q &&
          (((a = t.state).window_size = 2 * a.w_size),
          _t(a.head),
          (a.max_lazy_match = xt[a.level].max_lazy),
          (a.good_match = xt[a.level].good_length),
          (a.nice_match = xt[a.level].nice_length),
          (a.max_chain_length = xt[a.level].max_chain),
          (a.strstart = 0),
          (a.block_start = 0),
          (a.lookahead = 0),
          (a.insert = 0),
          (a.match_length = a.prev_length = 2),
          (a.match_available = 0),
          (a.ins_h = 0)),
        e
      )
    },
    Et = (t, e, a, i, n, s) => {
      if (!t) return Q
      let r = 1
      if (
        (e === tt && (e = 6),
        i < 0 ? ((r = 0), (i = -i)) : i > 15 && ((r = 2), (i -= 16)),
        n < 1 || n > 9 || a !== lt || i < 8 || i > 15 || e < 0 || e > 9 || s < 0 || s > nt)
      )
        return ht(t, Q)
      8 === i && (i = 9)
      const l = new (function () {
        ;(this.strm = null),
          (this.status = 0),
          (this.pending_buf = null),
          (this.pending_buf_size = 0),
          (this.pending_out = 0),
          (this.pending = 0),
          (this.wrap = 0),
          (this.gzhead = null),
          (this.gzindex = 0),
          (this.method = lt),
          (this.last_flush = -1),
          (this.w_size = 0),
          (this.w_bits = 0),
          (this.w_mask = 0),
          (this.window = null),
          (this.window_size = 0),
          (this.prev = null),
          (this.head = null),
          (this.ins_h = 0),
          (this.hash_size = 0),
          (this.hash_bits = 0),
          (this.hash_mask = 0),
          (this.hash_shift = 0),
          (this.block_start = 0),
          (this.match_length = 0),
          (this.prev_match = 0),
          (this.match_available = 0),
          (this.strstart = 0),
          (this.match_start = 0),
          (this.lookahead = 0),
          (this.prev_length = 0),
          (this.max_chain_length = 0),
          (this.max_lazy_match = 0),
          (this.level = 0),
          (this.strategy = 0),
          (this.good_match = 0),
          (this.nice_match = 0),
          (this.dyn_ltree = new Uint16Array(1146)),
          (this.dyn_dtree = new Uint16Array(122)),
          (this.bl_tree = new Uint16Array(78)),
          _t(this.dyn_ltree),
          _t(this.dyn_dtree),
          _t(this.bl_tree),
          (this.l_desc = null),
          (this.d_desc = null),
          (this.bl_desc = null),
          (this.bl_count = new Uint16Array(16)),
          (this.heap = new Uint16Array(573)),
          _t(this.heap),
          (this.heap_len = 0),
          (this.heap_max = 0),
          (this.depth = new Uint16Array(573)),
          _t(this.depth),
          (this.l_buf = 0),
          (this.lit_bufsize = 0),
          (this.last_lit = 0),
          (this.d_buf = 0),
          (this.opt_len = 0),
          (this.static_len = 0),
          (this.matches = 0),
          (this.insert = 0),
          (this.bi_buf = 0),
          (this.bi_valid = 0)
      })()
      return (
        (t.state = l),
        (l.strm = t),
        (l.wrap = r),
        (l.gzhead = null),
        (l.w_bits = i),
        (l.w_size = 1 << l.w_bits),
        (l.w_mask = l.w_size - 1),
        (l.hash_bits = n + 7),
        (l.hash_size = 1 << l.hash_bits),
        (l.hash_mask = l.hash_size - 1),
        (l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3)),
        (l.window = new Uint8Array(2 * l.w_size)),
        (l.head = new Uint16Array(l.hash_size)),
        (l.prev = new Uint16Array(l.w_size)),
        (l.lit_bufsize = 1 << (n + 6)),
        (l.pending_buf_size = 4 * l.lit_bufsize),
        (l.pending_buf = new Uint8Array(l.pending_buf_size)),
        (l.d_buf = 1 * l.lit_bufsize),
        (l.l_buf = 3 * l.lit_bufsize),
        (l.level = e),
        (l.strategy = s),
        (l.method = a),
        At(t)
      )
    }
  var Rt = {
    deflateInit: (t, e) => Et(t, e, lt, 15, 8, st),
    deflateInit2: Et,
    deflateReset: At,
    deflateResetKeep: zt,
    deflateSetHeader: (t, e) => (t && t.state ? (2 !== t.state.wrap ? Q : ((t.state.gzhead = e), q)) : Q),
    deflate: (t, e) => {
      let a, i
      if (!t || !t.state || e > W || e < 0) return t ? ht(t, Q) : Q
      const n = t.state
      if (!t.output || (!t.input && 0 !== t.avail_in) || (666 === n.status && e !== X)) return ht(t, 0 === t.avail_out ? $ : Q)
      n.strm = t
      const s = n.last_flush
      if (((n.last_flush = e), 42 === n.status))
        if (2 === n.wrap)
          (t.adler = 0),
            wt(n, 31),
            wt(n, 139),
            wt(n, 8),
            n.gzhead
              ? (wt(
                  n,
                  (n.gzhead.text ? 1 : 0) +
                    (n.gzhead.hcrc ? 2 : 0) +
                    (n.gzhead.extra ? 4 : 0) +
                    (n.gzhead.name ? 8 : 0) +
                    (n.gzhead.comment ? 16 : 0),
                ),
                wt(n, 255 & n.gzhead.time),
                wt(n, (n.gzhead.time >> 8) & 255),
                wt(n, (n.gzhead.time >> 16) & 255),
                wt(n, (n.gzhead.time >> 24) & 255),
                wt(n, 9 === n.level ? 2 : n.strategy >= at || n.level < 2 ? 4 : 0),
                wt(n, 255 & n.gzhead.os),
                n.gzhead.extra && n.gzhead.extra.length && (wt(n, 255 & n.gzhead.extra.length), wt(n, (n.gzhead.extra.length >> 8) & 255)),
                n.gzhead.hcrc && (t.adler = L(t.adler, n.pending_buf, n.pending, 0)),
                (n.gzindex = 0),
                (n.status = 69))
              : (wt(n, 0),
                wt(n, 0),
                wt(n, 0),
                wt(n, 0),
                wt(n, 0),
                wt(n, 9 === n.level ? 2 : n.strategy >= at || n.level < 2 ? 4 : 0),
                wt(n, 3),
                (n.status = 113))
        else {
          let e = (lt + ((n.w_bits - 8) << 4)) << 8,
            a = -1
          ;(e |= (a = n.strategy >= at || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6),
            0 !== n.strstart && (e |= 32),
            (e += 31 - (e % 31)),
            (n.status = 113),
            bt(n, e),
            0 !== n.strstart && (bt(n, t.adler >>> 16), bt(n, 65535 & t.adler)),
            (t.adler = 1)
        }
      if (69 === n.status)
        if (n.gzhead.extra) {
          for (
            a = n.pending;
            n.gzindex < (65535 & n.gzhead.extra.length) &&
            (n.pending !== n.pending_buf_size ||
              (n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)),
              ct(t),
              (a = n.pending),
              n.pending !== n.pending_buf_size));

          )
            wt(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++
          n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)),
            n.gzindex === n.gzhead.extra.length && ((n.gzindex = 0), (n.status = 73))
        } else n.status = 73
      if (73 === n.status)
        if (n.gzhead.name) {
          a = n.pending
          do {
            if (
              n.pending === n.pending_buf_size &&
              (n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)),
              ct(t),
              (a = n.pending),
              n.pending === n.pending_buf_size)
            ) {
              i = 1
              break
            }
            ;(i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0), wt(n, i)
          } while (0 !== i)
          n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)), 0 === i && ((n.gzindex = 0), (n.status = 91))
        } else n.status = 91
      if (91 === n.status)
        if (n.gzhead.comment) {
          a = n.pending
          do {
            if (
              n.pending === n.pending_buf_size &&
              (n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)),
              ct(t),
              (a = n.pending),
              n.pending === n.pending_buf_size)
            ) {
              i = 1
              break
            }
            ;(i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0), wt(n, i)
          } while (0 !== i)
          n.gzhead.hcrc && n.pending > a && (t.adler = L(t.adler, n.pending_buf, n.pending - a, a)), 0 === i && (n.status = 103)
        } else n.status = 103
      if (
        (103 === n.status &&
          (n.gzhead.hcrc
            ? (n.pending + 2 > n.pending_buf_size && ct(t),
              n.pending + 2 <= n.pending_buf_size && (wt(n, 255 & t.adler), wt(n, (t.adler >> 8) & 255), (t.adler = 0), (n.status = 113)))
            : (n.status = 113)),
        0 !== n.pending)
      ) {
        if ((ct(t), 0 === t.avail_out)) return (n.last_flush = -1), q
      } else if (0 === t.avail_in && dt(e) <= dt(s) && e !== X) return ht(t, $)
      if (666 === n.status && 0 !== t.avail_in) return ht(t, $)
      if (0 !== t.avail_in || 0 !== n.lookahead || (e !== P && 666 !== n.status)) {
        let a =
          n.strategy === at
            ? ((t, e) => {
                let a
                for (;;) {
                  if (0 === t.lookahead && (mt(t), 0 === t.lookahead)) {
                    if (e === P) return 1
                    break
                  }
                  if (
                    ((t.match_length = 0), (a = j(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++, a && (ut(t, !1), 0 === t.strm.avail_out))
                  )
                    return 1
                }
                return (
                  (t.insert = 0), e === X ? (ut(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (ut(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                )
              })(n, e)
            : n.strategy === it
              ? ((t, e) => {
                  let a, i, n, s
                  const r = t.window
                  for (;;) {
                    if (t.lookahead <= 258) {
                      if ((mt(t), t.lookahead <= 258 && e === P)) return 1
                      if (0 === t.lookahead) break
                    }
                    if (
                      ((t.match_length = 0),
                      t.lookahead >= 3 && t.strstart > 0 && (i = r[(n = t.strstart - 1)]) === r[++n] && i === r[++n] && i === r[++n])
                    ) {
                      s = t.strstart + 258
                      do {} while (
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        i === r[++n] &&
                        n < s
                      )
                      ;(t.match_length = 258 - (s - n)), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                    }
                    if (
                      (t.match_length >= 3
                        ? ((a = j(t, 1, t.match_length - 3)), (t.lookahead -= t.match_length), (t.strstart += t.match_length), (t.match_length = 0))
                        : ((a = j(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                      a && (ut(t, !1), 0 === t.strm.avail_out))
                    )
                      return 1
                  }
                  return (
                    (t.insert = 0), e === X ? (ut(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (ut(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                  )
                })(n, e)
              : xt[n.level].func(n, e)
        if (((3 !== a && 4 !== a) || (n.status = 666), 1 === a || 3 === a)) return 0 === t.avail_out && (n.last_flush = -1), q
        if (
          2 === a &&
          (e === Y
            ? K(n)
            : e !== W && (M(n, 0, 0, !1), e === G && (_t(n.head), 0 === n.lookahead && ((n.strstart = 0), (n.block_start = 0), (n.insert = 0)))),
          ct(t),
          0 === t.avail_out)
        )
          return (n.last_flush = -1), q
      }
      return e !== X
        ? q
        : n.wrap <= 0
          ? J
          : (2 === n.wrap
              ? (wt(n, 255 & t.adler),
                wt(n, (t.adler >> 8) & 255),
                wt(n, (t.adler >> 16) & 255),
                wt(n, (t.adler >> 24) & 255),
                wt(n, 255 & t.total_in),
                wt(n, (t.total_in >> 8) & 255),
                wt(n, (t.total_in >> 16) & 255),
                wt(n, (t.total_in >> 24) & 255))
              : (bt(n, t.adler >>> 16), bt(n, 65535 & t.adler)),
            ct(t),
            n.wrap > 0 && (n.wrap = -n.wrap),
            0 !== n.pending ? q : J)
    },
    deflateEnd: (t) => {
      if (!t || !t.state) return Q
      const e = t.state.status
      return 42 !== e && 69 !== e && 73 !== e && 91 !== e && 103 !== e && 113 !== e && 666 !== e
        ? ht(t, Q)
        : ((t.state = null), 113 === e ? ht(t, V) : q)
    },
    deflateSetDictionary: (t, e) => {
      let a = e.length
      if (!t || !t.state) return Q
      const i = t.state,
        n = i.wrap
      if (2 === n || (1 === n && 42 !== i.status) || i.lookahead) return Q
      if ((1 === n && (t.adler = I(t.adler, e, a, 0)), (i.wrap = 0), a >= i.w_size)) {
        0 === n && (_t(i.head), (i.strstart = 0), (i.block_start = 0), (i.insert = 0))
        let t = new Uint8Array(i.w_size)
        t.set(e.subarray(a - i.w_size, a), 0), (e = t), (a = i.w_size)
      }
      const s = t.avail_in,
        r = t.next_in,
        l = t.input
      for (t.avail_in = a, t.next_in = 0, t.input = e, mt(i); i.lookahead >= 3; ) {
        let t = i.strstart,
          e = i.lookahead - 2
        do {
          ;(i.ins_h = ft(i, i.ins_h, i.window[t + 3 - 1])), (i.prev[t & i.w_mask] = i.head[i.ins_h]), (i.head[i.ins_h] = t), t++
        } while (--e)
        ;(i.strstart = t), (i.lookahead = 2), mt(i)
      }
      return (
        (i.strstart += i.lookahead),
        (i.block_start = i.strstart),
        (i.insert = i.lookahead),
        (i.lookahead = 0),
        (i.match_length = i.prev_length = 2),
        (i.match_available = 0),
        (t.next_in = r),
        (t.input = l),
        (t.avail_in = s),
        (i.wrap = n),
        q
      )
    },
    deflateInfo: 'pako deflate (from Nodeca project)',
  }
  const Zt = (t, e) => Object.prototype.hasOwnProperty.call(t, e)
  var Ut = function (t) {
      const e = Array.prototype.slice.call(arguments, 1)
      for (; e.length; ) {
        const a = e.shift()
        if (a) {
          if ('object' != typeof a) throw new TypeError(a + 'must be non-object')
          for (const e in a) Zt(a, e) && (t[e] = a[e])
        }
      }
      return t
    },
    St = (t) => {
      let e = 0
      for (let a = 0, i = t.length; a < i; a++) e += t[a].length
      const a = new Uint8Array(e)
      for (let e = 0, i = 0, n = t.length; e < n; e++) {
        let n = t[e]
        a.set(n, i), (i += n.length)
      }
      return a
    }
  let Dt = !0
  try {
    String.fromCharCode.apply(null, new Uint8Array(1))
  } catch (t) {
    Dt = !1
  }
  const Tt = new Uint8Array(256)
  for (let t = 0; t < 256; t++) Tt[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1
  Tt[254] = Tt[254] = 1
  var Ot = (t) => {
      if ('function' == typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(t)
      let e,
        a,
        i,
        n,
        s,
        r = t.length,
        l = 0
      for (n = 0; n < r; n++)
        55296 == (64512 & (a = t.charCodeAt(n))) &&
          n + 1 < r &&
          56320 == (64512 & (i = t.charCodeAt(n + 1))) &&
          ((a = 65536 + ((a - 55296) << 10) + (i - 56320)), n++),
          (l += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4)
      for (e = new Uint8Array(l), s = 0, n = 0; s < l; n++)
        55296 == (64512 & (a = t.charCodeAt(n))) &&
          n + 1 < r &&
          56320 == (64512 & (i = t.charCodeAt(n + 1))) &&
          ((a = 65536 + ((a - 55296) << 10) + (i - 56320)), n++),
          a < 128
            ? (e[s++] = a)
            : a < 2048
              ? ((e[s++] = 192 | (a >>> 6)), (e[s++] = 128 | (63 & a)))
              : a < 65536
                ? ((e[s++] = 224 | (a >>> 12)), (e[s++] = 128 | ((a >>> 6) & 63)), (e[s++] = 128 | (63 & a)))
                : ((e[s++] = 240 | (a >>> 18)), (e[s++] = 128 | ((a >>> 12) & 63)), (e[s++] = 128 | ((a >>> 6) & 63)), (e[s++] = 128 | (63 & a)))
      return e
    },
    It = (t, e) => {
      const a = e || t.length
      if ('function' == typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, e))
      let i, n
      const s = new Array(2 * a)
      for (n = 0, i = 0; i < a; ) {
        let e = t[i++]
        if (e < 128) {
          s[n++] = e
          continue
        }
        let r = Tt[e]
        if (r > 4) (s[n++] = 65533), (i += r - 1)
        else {
          for (e &= 2 === r ? 31 : 3 === r ? 15 : 7; r > 1 && i < a; ) (e = (e << 6) | (63 & t[i++])), r--
          r > 1 ? (s[n++] = 65533) : e < 65536 ? (s[n++] = e) : ((e -= 65536), (s[n++] = 55296 | ((e >> 10) & 1023)), (s[n++] = 56320 | (1023 & e)))
        }
      }
      return ((t, e) => {
        if (e < 65534 && t.subarray && Dt) return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e))
        let a = ''
        for (let i = 0; i < e; i++) a += String.fromCharCode(t[i])
        return a
      })(s, n)
    },
    Ft = (t, e) => {
      ;(e = e || t.length) > t.length && (e = t.length)
      let a = e - 1
      for (; a >= 0 && 128 == (192 & t[a]); ) a--
      return a < 0 || 0 === a ? e : a + Tt[t[a]] > e ? a : e
    },
    Lt = function () {
      ;(this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ''),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0)
    }
  const Nt = Object.prototype.toString,
    {
      Z_NO_FLUSH: Bt,
      Z_SYNC_FLUSH: Ct,
      Z_FULL_FLUSH: Mt,
      Z_FINISH: Ht,
      Z_OK: jt,
      Z_STREAM_END: Kt,
      Z_DEFAULT_COMPRESSION: Pt,
      Z_DEFAULT_STRATEGY: Yt,
      Z_DEFLATED: Gt,
    } = B
  function Xt(t) {
    this.options = Ut(
      {
        level: Pt,
        method: Gt,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Yt,
      },
      t || {},
    )
    let e = this.options
    e.raw && e.windowBits > 0 ? (e.windowBits = -e.windowBits) : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
      (this.err = 0),
      (this.msg = ''),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new Lt()),
      (this.strm.avail_out = 0)
    let a = Rt.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy)
    if (a !== jt) throw new Error(N[a])
    if ((e.header && Rt.deflateSetHeader(this.strm, e.header), e.dictionary)) {
      let t
      if (
        ((t =
          'string' == typeof e.dictionary
            ? Ot(e.dictionary)
            : '[object ArrayBuffer]' === Nt.call(e.dictionary)
              ? new Uint8Array(e.dictionary)
              : e.dictionary),
        (a = Rt.deflateSetDictionary(this.strm, t)) !== jt)
      )
        throw new Error(N[a])
      this._dict_set = !0
    }
  }
  function Wt(t, e) {
    const a = new Xt(e)
    if ((a.push(t, !0), a.err)) throw a.msg || N[a.err]
    return a.result
  }
  ;(Xt.prototype.push = function (t, e) {
    const a = this.strm,
      i = this.options.chunkSize
    let n, s
    if (this.ended) return !1
    for (
      s = e === ~~e ? e : !0 === e ? Ht : Bt,
        'string' == typeof t ? (a.input = Ot(t)) : '[object ArrayBuffer]' === Nt.call(t) ? (a.input = new Uint8Array(t)) : (a.input = t),
        a.next_in = 0,
        a.avail_in = a.input.length;
      ;

    )
      if ((0 === a.avail_out && ((a.output = new Uint8Array(i)), (a.next_out = 0), (a.avail_out = i)), (s === Ct || s === Mt) && a.avail_out <= 6))
        this.onData(a.output.subarray(0, a.next_out)), (a.avail_out = 0)
      else {
        if ((n = Rt.deflate(a, s)) === Kt)
          return (
            a.next_out > 0 && this.onData(a.output.subarray(0, a.next_out)),
            (n = Rt.deflateEnd(this.strm)),
            this.onEnd(n),
            (this.ended = !0),
            n === jt
          )
        if (0 !== a.avail_out) {
          if (s > 0 && a.next_out > 0) this.onData(a.output.subarray(0, a.next_out)), (a.avail_out = 0)
          else if (0 === a.avail_in) break
        } else this.onData(a.output)
      }
    return !0
  }),
    (Xt.prototype.onData = function (t) {
      this.chunks.push(t)
    }),
    (Xt.prototype.onEnd = function (t) {
      t === jt && (this.result = St(this.chunks)), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg)
    })
  var qt = {
      Deflate: Xt,
      deflate: Wt,
      deflateRaw: function (t, e) {
        return ((e = e || {}).raw = !0), Wt(t, e)
      },
      gzip: function (t, e) {
        return ((e = e || {}).gzip = !0), Wt(t, e)
      },
      constants: B,
    },
    Jt = function (t, e) {
      let a, i, n, s, r, l, o, h, d, _, f, c, u, w, b, g, p, m, k, v, y, x, z, A
      const E = t.state
      ;(a = t.next_in),
        (z = t.input),
        (i = a + (t.avail_in - 5)),
        (n = t.next_out),
        (A = t.output),
        (s = n - (e - t.avail_out)),
        (r = n + (t.avail_out - 257)),
        (l = E.dmax),
        (o = E.wsize),
        (h = E.whave),
        (d = E.wnext),
        (_ = E.window),
        (f = E.hold),
        (c = E.bits),
        (u = E.lencode),
        (w = E.distcode),
        (b = (1 << E.lenbits) - 1),
        (g = (1 << E.distbits) - 1)
      t: do {
        c < 15 && ((f += z[a++] << c), (c += 8), (f += z[a++] << c), (c += 8)), (p = u[f & b])
        e: for (;;) {
          if (((f >>>= m = p >>> 24), (c -= m), 0 == (m = (p >>> 16) & 255))) A[n++] = 65535 & p
          else {
            if (!(16 & m)) {
              if (0 == (64 & m)) {
                p = u[(65535 & p) + (f & ((1 << m) - 1))]
                continue e
              }
              if (32 & m) {
                E.mode = 12
                break t
              }
              ;(t.msg = 'invalid literal/length code'), (E.mode = 30)
              break t
            }
            ;(k = 65535 & p),
              (m &= 15) && (c < m && ((f += z[a++] << c), (c += 8)), (k += f & ((1 << m) - 1)), (f >>>= m), (c -= m)),
              c < 15 && ((f += z[a++] << c), (c += 8), (f += z[a++] << c), (c += 8)),
              (p = w[f & g])
            a: for (;;) {
              if (((f >>>= m = p >>> 24), (c -= m), !(16 & (m = (p >>> 16) & 255)))) {
                if (0 == (64 & m)) {
                  p = w[(65535 & p) + (f & ((1 << m) - 1))]
                  continue a
                }
                ;(t.msg = 'invalid distance code'), (E.mode = 30)
                break t
              }
              if (
                ((v = 65535 & p),
                c < (m &= 15) && ((f += z[a++] << c), (c += 8) < m && ((f += z[a++] << c), (c += 8))),
                (v += f & ((1 << m) - 1)) > l)
              ) {
                ;(t.msg = 'invalid distance too far back'), (E.mode = 30)
                break t
              }
              if (((f >>>= m), (c -= m), v > (m = n - s))) {
                if ((m = v - m) > h && E.sane) {
                  ;(t.msg = 'invalid distance too far back'), (E.mode = 30)
                  break t
                }
                if (((y = 0), (x = _), 0 === d)) {
                  if (((y += o - m), m < k)) {
                    k -= m
                    do {
                      A[n++] = _[y++]
                    } while (--m)
                    ;(y = n - v), (x = A)
                  }
                } else if (d < m) {
                  if (((y += o + d - m), (m -= d) < k)) {
                    k -= m
                    do {
                      A[n++] = _[y++]
                    } while (--m)
                    if (((y = 0), d < k)) {
                      k -= m = d
                      do {
                        A[n++] = _[y++]
                      } while (--m)
                      ;(y = n - v), (x = A)
                    }
                  }
                } else if (((y += d - m), m < k)) {
                  k -= m
                  do {
                    A[n++] = _[y++]
                  } while (--m)
                  ;(y = n - v), (x = A)
                }
                for (; k > 2; ) (A[n++] = x[y++]), (A[n++] = x[y++]), (A[n++] = x[y++]), (k -= 3)
                k && ((A[n++] = x[y++]), k > 1 && (A[n++] = x[y++]))
              } else {
                y = n - v
                do {
                  ;(A[n++] = A[y++]), (A[n++] = A[y++]), (A[n++] = A[y++]), (k -= 3)
                } while (k > 2)
                k && ((A[n++] = A[y++]), k > 1 && (A[n++] = A[y++]))
              }
              break
            }
          }
          break
        }
      } while (a < i && n < r)
      ;(a -= k = c >> 3),
        (f &= (1 << (c -= k << 3)) - 1),
        (t.next_in = a),
        (t.next_out = n),
        (t.avail_in = a < i ? i - a + 5 : 5 - (a - i)),
        (t.avail_out = n < r ? r - n + 257 : 257 - (n - r)),
        (E.hold = f),
        (E.bits = c)
    }
  const Qt = new Uint16Array([
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
    ]),
    Vt = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
    $t = new Uint16Array([
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0,
      0,
    ]),
    te = new Uint8Array([
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
    ])
  var ee = (t, e, a, i, n, s, r, l) => {
    const o = l.bits
    let h,
      d,
      _,
      f,
      c,
      u,
      w = 0,
      b = 0,
      g = 0,
      p = 0,
      m = 0,
      k = 0,
      v = 0,
      y = 0,
      x = 0,
      z = 0,
      A = null,
      E = 0
    const R = new Uint16Array(16),
      Z = new Uint16Array(16)
    let U,
      S,
      D,
      T = null,
      O = 0
    for (w = 0; w <= 15; w++) R[w] = 0
    for (b = 0; b < i; b++) R[e[a + b]]++
    for (m = o, p = 15; p >= 1 && 0 === R[p]; p--);
    if ((m > p && (m = p), 0 === p)) return (n[s++] = 20971520), (n[s++] = 20971520), (l.bits = 1), 0
    for (g = 1; g < p && 0 === R[g]; g++);
    for (m < g && (m = g), y = 1, w = 1; w <= 15; w++) if (((y <<= 1), (y -= R[w]) < 0)) return -1
    if (y > 0 && (0 === t || 1 !== p)) return -1
    for (Z[1] = 0, w = 1; w < 15; w++) Z[w + 1] = Z[w] + R[w]
    for (b = 0; b < i; b++) 0 !== e[a + b] && (r[Z[e[a + b]]++] = b)
    if (
      (0 === t ? ((A = T = r), (u = 19)) : 1 === t ? ((A = Qt), (E -= 257), (T = Vt), (O -= 257), (u = 256)) : ((A = $t), (T = te), (u = -1)),
      (z = 0),
      (b = 0),
      (w = g),
      (c = s),
      (k = m),
      (v = 0),
      (_ = -1),
      (f = (x = 1 << m) - 1),
      (1 === t && x > 852) || (2 === t && x > 592))
    )
      return 1
    for (;;) {
      ;(U = w - v),
        r[b] < u ? ((S = 0), (D = r[b])) : r[b] > u ? ((S = T[O + r[b]]), (D = A[E + r[b]])) : ((S = 96), (D = 0)),
        (h = 1 << (w - v)),
        (g = d = 1 << k)
      do {
        n[c + (z >> v) + (d -= h)] = (U << 24) | (S << 16) | D | 0
      } while (0 !== d)
      for (h = 1 << (w - 1); z & h; ) h >>= 1
      if ((0 !== h ? ((z &= h - 1), (z += h)) : (z = 0), b++, 0 == --R[w])) {
        if (w === p) break
        w = e[a + r[b]]
      }
      if (w > m && (z & f) !== _) {
        for (0 === v && (v = m), c += g, y = 1 << (k = w - v); k + v < p && !((y -= R[k + v]) <= 0); ) k++, (y <<= 1)
        if (((x += 1 << k), (1 === t && x > 852) || (2 === t && x > 592))) return 1
        n[(_ = z & f)] = (m << 24) | (k << 16) | (c - s) | 0
      }
    }
    return 0 !== z && (n[c + z] = ((w - v) << 24) | (64 << 16) | 0), (l.bits = m), 0
  }
  const {
      Z_FINISH: ae,
      Z_BLOCK: ie,
      Z_TREES: ne,
      Z_OK: se,
      Z_STREAM_END: re,
      Z_NEED_DICT: le,
      Z_STREAM_ERROR: oe,
      Z_DATA_ERROR: he,
      Z_MEM_ERROR: de,
      Z_BUF_ERROR: _e,
      Z_DEFLATED: fe,
    } = B,
    ce = (t) => ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24),
    ue = (t) => {
      if (!t || !t.state) return oe
      const e = t.state
      return (
        (t.total_in = t.total_out = e.total = 0),
        (t.msg = ''),
        e.wrap && (t.adler = 1 & e.wrap),
        (e.mode = 1),
        (e.last = 0),
        (e.havedict = 0),
        (e.dmax = 32768),
        (e.head = null),
        (e.hold = 0),
        (e.bits = 0),
        (e.lencode = e.lendyn = new Int32Array(852)),
        (e.distcode = e.distdyn = new Int32Array(592)),
        (e.sane = 1),
        (e.back = -1),
        se
      )
    },
    we = (t) => {
      if (!t || !t.state) return oe
      const e = t.state
      return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), ue(t)
    },
    be = (t, e) => {
      let a
      if (!t || !t.state) return oe
      const i = t.state
      return (
        e < 0 ? ((a = 0), (e = -e)) : ((a = 1 + (e >> 4)), e < 48 && (e &= 15)),
        e && (e < 8 || e > 15) ? oe : (null !== i.window && i.wbits !== e && (i.window = null), (i.wrap = a), (i.wbits = e), we(t))
      )
    },
    ge = (t, e) => {
      if (!t) return oe
      const a = new (function () {
        ;(this.mode = 0),
          (this.last = !1),
          (this.wrap = 0),
          (this.havedict = !1),
          (this.flags = 0),
          (this.dmax = 0),
          (this.check = 0),
          (this.total = 0),
          (this.head = null),
          (this.wbits = 0),
          (this.wsize = 0),
          (this.whave = 0),
          (this.wnext = 0),
          (this.window = null),
          (this.hold = 0),
          (this.bits = 0),
          (this.length = 0),
          (this.offset = 0),
          (this.extra = 0),
          (this.lencode = null),
          (this.distcode = null),
          (this.lenbits = 0),
          (this.distbits = 0),
          (this.ncode = 0),
          (this.nlen = 0),
          (this.ndist = 0),
          (this.have = 0),
          (this.next = null),
          (this.lens = new Uint16Array(320)),
          (this.work = new Uint16Array(288)),
          (this.lendyn = null),
          (this.distdyn = null),
          (this.sane = 0),
          (this.back = 0),
          (this.was = 0)
      })()
      ;(t.state = a), (a.window = null)
      const i = be(t, e)
      return i !== se && (t.state = null), i
    }
  let pe,
    me,
    ke = !0
  const ve = (t) => {
      if (ke) {
        ;(pe = new Int32Array(512)), (me = new Int32Array(32))
        let e = 0
        for (; e < 144; ) t.lens[e++] = 8
        for (; e < 256; ) t.lens[e++] = 9
        for (; e < 280; ) t.lens[e++] = 7
        for (; e < 288; ) t.lens[e++] = 8
        for (ee(1, t.lens, 0, 288, pe, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5
        ee(2, t.lens, 0, 32, me, 0, t.work, { bits: 5 }), (ke = !1)
      }
      ;(t.lencode = pe), (t.lenbits = 9), (t.distcode = me), (t.distbits = 5)
    },
    ye = (t, e, a, i) => {
      let n
      const s = t.state
      return (
        null === s.window && ((s.wsize = 1 << s.wbits), (s.wnext = 0), (s.whave = 0), (s.window = new Uint8Array(s.wsize))),
        i >= s.wsize
          ? (s.window.set(e.subarray(a - s.wsize, a), 0), (s.wnext = 0), (s.whave = s.wsize))
          : ((n = s.wsize - s.wnext) > i && (n = i),
            s.window.set(e.subarray(a - i, a - i + n), s.wnext),
            (i -= n)
              ? (s.window.set(e.subarray(a - i, a), 0), (s.wnext = i), (s.whave = s.wsize))
              : ((s.wnext += n), s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))),
        0
      )
    }
  var xe = {
      inflateReset: we,
      inflateReset2: be,
      inflateResetKeep: ue,
      inflateInit: (t) => ge(t, 15),
      inflateInit2: ge,
      inflate: (t, e) => {
        let a,
          i,
          n,
          s,
          r,
          l,
          o,
          h,
          d,
          _,
          f,
          c,
          u,
          w,
          b,
          g,
          p,
          m,
          k,
          v,
          y,
          x,
          z = 0
        const A = new Uint8Array(4)
        let E, R
        const Z = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
        if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in)) return oe
        12 === (a = t.state).mode && (a.mode = 13),
          (r = t.next_out),
          (n = t.output),
          (o = t.avail_out),
          (s = t.next_in),
          (i = t.input),
          (l = t.avail_in),
          (h = a.hold),
          (d = a.bits),
          (_ = l),
          (f = o),
          (x = se)
        t: for (;;)
          switch (a.mode) {
            case 1:
              if (0 === a.wrap) {
                a.mode = 13
                break
              }
              for (; d < 16; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if (2 & a.wrap && 35615 === h) {
                ;(a.check = 0), (A[0] = 255 & h), (A[1] = (h >>> 8) & 255), (a.check = L(a.check, A, 2, 0)), (h = 0), (d = 0), (a.mode = 2)
                break
              }
              if (((a.flags = 0), a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & h) << 8) + (h >> 8)) % 31)) {
                ;(t.msg = 'incorrect header check'), (a.mode = 30)
                break
              }
              if ((15 & h) !== fe) {
                ;(t.msg = 'unknown compression method'), (a.mode = 30)
                break
              }
              if (((d -= 4), (y = 8 + (15 & (h >>>= 4))), 0 === a.wbits)) a.wbits = y
              else if (y > a.wbits) {
                ;(t.msg = 'invalid window size'), (a.mode = 30)
                break
              }
              ;(a.dmax = 1 << a.wbits), (t.adler = a.check = 1), (a.mode = 512 & h ? 10 : 12), (h = 0), (d = 0)
              break
            case 2:
              for (; d < 16; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if (((a.flags = h), (255 & a.flags) !== fe)) {
                ;(t.msg = 'unknown compression method'), (a.mode = 30)
                break
              }
              if (57344 & a.flags) {
                ;(t.msg = 'unknown header flags set'), (a.mode = 30)
                break
              }
              a.head && (a.head.text = (h >> 8) & 1),
                512 & a.flags && ((A[0] = 255 & h), (A[1] = (h >>> 8) & 255), (a.check = L(a.check, A, 2, 0))),
                (h = 0),
                (d = 0),
                (a.mode = 3)
            case 3:
              for (; d < 32; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              a.head && (a.head.time = h),
                512 & a.flags &&
                  ((A[0] = 255 & h), (A[1] = (h >>> 8) & 255), (A[2] = (h >>> 16) & 255), (A[3] = (h >>> 24) & 255), (a.check = L(a.check, A, 4, 0))),
                (h = 0),
                (d = 0),
                (a.mode = 4)
            case 4:
              for (; d < 16; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              a.head && ((a.head.xflags = 255 & h), (a.head.os = h >> 8)),
                512 & a.flags && ((A[0] = 255 & h), (A[1] = (h >>> 8) & 255), (a.check = L(a.check, A, 2, 0))),
                (h = 0),
                (d = 0),
                (a.mode = 5)
            case 5:
              if (1024 & a.flags) {
                for (; d < 16; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(a.length = h),
                  a.head && (a.head.extra_len = h),
                  512 & a.flags && ((A[0] = 255 & h), (A[1] = (h >>> 8) & 255), (a.check = L(a.check, A, 2, 0))),
                  (h = 0),
                  (d = 0)
              } else a.head && (a.head.extra = null)
              a.mode = 6
            case 6:
              if (
                1024 & a.flags &&
                ((c = a.length) > l && (c = l),
                c &&
                  (a.head &&
                    ((y = a.head.extra_len - a.length),
                    a.head.extra || (a.head.extra = new Uint8Array(a.head.extra_len)),
                    a.head.extra.set(i.subarray(s, s + c), y)),
                  512 & a.flags && (a.check = L(a.check, i, c, s)),
                  (l -= c),
                  (s += c),
                  (a.length -= c)),
                a.length)
              )
                break t
              ;(a.length = 0), (a.mode = 7)
            case 7:
              if (2048 & a.flags) {
                if (0 === l) break t
                c = 0
                do {
                  ;(y = i[s + c++]), a.head && y && a.length < 65536 && (a.head.name += String.fromCharCode(y))
                } while (y && c < l)
                if ((512 & a.flags && (a.check = L(a.check, i, c, s)), (l -= c), (s += c), y)) break t
              } else a.head && (a.head.name = null)
              ;(a.length = 0), (a.mode = 8)
            case 8:
              if (4096 & a.flags) {
                if (0 === l) break t
                c = 0
                do {
                  ;(y = i[s + c++]), a.head && y && a.length < 65536 && (a.head.comment += String.fromCharCode(y))
                } while (y && c < l)
                if ((512 & a.flags && (a.check = L(a.check, i, c, s)), (l -= c), (s += c), y)) break t
              } else a.head && (a.head.comment = null)
              a.mode = 9
            case 9:
              if (512 & a.flags) {
                for (; d < 16; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                if (h !== (65535 & a.check)) {
                  ;(t.msg = 'header crc mismatch'), (a.mode = 30)
                  break
                }
                ;(h = 0), (d = 0)
              }
              a.head && ((a.head.hcrc = (a.flags >> 9) & 1), (a.head.done = !0)), (t.adler = a.check = 0), (a.mode = 12)
              break
            case 10:
              for (; d < 32; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              ;(t.adler = a.check = ce(h)), (h = 0), (d = 0), (a.mode = 11)
            case 11:
              if (0 === a.havedict) return (t.next_out = r), (t.avail_out = o), (t.next_in = s), (t.avail_in = l), (a.hold = h), (a.bits = d), le
              ;(t.adler = a.check = 1), (a.mode = 12)
            case 12:
              if (e === ie || e === ne) break t
            case 13:
              if (a.last) {
                ;(h >>>= 7 & d), (d -= 7 & d), (a.mode = 27)
                break
              }
              for (; d < 3; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              switch (((a.last = 1 & h), (d -= 1), 3 & (h >>>= 1))) {
                case 0:
                  a.mode = 14
                  break
                case 1:
                  if ((ve(a), (a.mode = 20), e === ne)) {
                    ;(h >>>= 2), (d -= 2)
                    break t
                  }
                  break
                case 2:
                  a.mode = 17
                  break
                case 3:
                  ;(t.msg = 'invalid block type'), (a.mode = 30)
              }
              ;(h >>>= 2), (d -= 2)
              break
            case 14:
              for (h >>>= 7 & d, d -= 7 & d; d < 32; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if ((65535 & h) != ((h >>> 16) ^ 65535)) {
                ;(t.msg = 'invalid stored block lengths'), (a.mode = 30)
                break
              }
              if (((a.length = 65535 & h), (h = 0), (d = 0), (a.mode = 15), e === ne)) break t
            case 15:
              a.mode = 16
            case 16:
              if ((c = a.length)) {
                if ((c > l && (c = l), c > o && (c = o), 0 === c)) break t
                n.set(i.subarray(s, s + c), r), (l -= c), (s += c), (o -= c), (r += c), (a.length -= c)
                break
              }
              a.mode = 12
              break
            case 17:
              for (; d < 14; ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if (
                ((a.nlen = 257 + (31 & h)),
                (h >>>= 5),
                (d -= 5),
                (a.ndist = 1 + (31 & h)),
                (h >>>= 5),
                (d -= 5),
                (a.ncode = 4 + (15 & h)),
                (h >>>= 4),
                (d -= 4),
                a.nlen > 286 || a.ndist > 30)
              ) {
                ;(t.msg = 'too many length or distance symbols'), (a.mode = 30)
                break
              }
              ;(a.have = 0), (a.mode = 18)
            case 18:
              for (; a.have < a.ncode; ) {
                for (; d < 3; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(a.lens[Z[a.have++]] = 7 & h), (h >>>= 3), (d -= 3)
              }
              for (; a.have < 19; ) a.lens[Z[a.have++]] = 0
              if (
                ((a.lencode = a.lendyn),
                (a.lenbits = 7),
                (E = { bits: a.lenbits }),
                (x = ee(0, a.lens, 0, 19, a.lencode, 0, a.work, E)),
                (a.lenbits = E.bits),
                x)
              ) {
                ;(t.msg = 'invalid code lengths set'), (a.mode = 30)
                break
              }
              ;(a.have = 0), (a.mode = 19)
            case 19:
              for (; a.have < a.nlen + a.ndist; ) {
                for (; (g = ((z = a.lencode[h & ((1 << a.lenbits) - 1)]) >>> 16) & 255), (p = 65535 & z), !((b = z >>> 24) <= d); ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                if (p < 16) (h >>>= b), (d -= b), (a.lens[a.have++] = p)
                else {
                  if (16 === p) {
                    for (R = b + 2; d < R; ) {
                      if (0 === l) break t
                      l--, (h += i[s++] << d), (d += 8)
                    }
                    if (((h >>>= b), (d -= b), 0 === a.have)) {
                      ;(t.msg = 'invalid bit length repeat'), (a.mode = 30)
                      break
                    }
                    ;(y = a.lens[a.have - 1]), (c = 3 + (3 & h)), (h >>>= 2), (d -= 2)
                  } else if (17 === p) {
                    for (R = b + 3; d < R; ) {
                      if (0 === l) break t
                      l--, (h += i[s++] << d), (d += 8)
                    }
                    ;(d -= b), (y = 0), (c = 3 + (7 & (h >>>= b))), (h >>>= 3), (d -= 3)
                  } else {
                    for (R = b + 7; d < R; ) {
                      if (0 === l) break t
                      l--, (h += i[s++] << d), (d += 8)
                    }
                    ;(d -= b), (y = 0), (c = 11 + (127 & (h >>>= b))), (h >>>= 7), (d -= 7)
                  }
                  if (a.have + c > a.nlen + a.ndist) {
                    ;(t.msg = 'invalid bit length repeat'), (a.mode = 30)
                    break
                  }
                  for (; c--; ) a.lens[a.have++] = y
                }
              }
              if (30 === a.mode) break
              if (0 === a.lens[256]) {
                ;(t.msg = 'invalid code -- missing end-of-block'), (a.mode = 30)
                break
              }
              if (((a.lenbits = 9), (E = { bits: a.lenbits }), (x = ee(1, a.lens, 0, a.nlen, a.lencode, 0, a.work, E)), (a.lenbits = E.bits), x)) {
                ;(t.msg = 'invalid literal/lengths set'), (a.mode = 30)
                break
              }
              if (
                ((a.distbits = 6),
                (a.distcode = a.distdyn),
                (E = { bits: a.distbits }),
                (x = ee(2, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, E)),
                (a.distbits = E.bits),
                x)
              ) {
                ;(t.msg = 'invalid distances set'), (a.mode = 30)
                break
              }
              if (((a.mode = 20), e === ne)) break t
            case 20:
              a.mode = 21
            case 21:
              if (l >= 6 && o >= 258) {
                ;(t.next_out = r),
                  (t.avail_out = o),
                  (t.next_in = s),
                  (t.avail_in = l),
                  (a.hold = h),
                  (a.bits = d),
                  Jt(t, f),
                  (r = t.next_out),
                  (n = t.output),
                  (o = t.avail_out),
                  (s = t.next_in),
                  (i = t.input),
                  (l = t.avail_in),
                  (h = a.hold),
                  (d = a.bits),
                  12 === a.mode && (a.back = -1)
                break
              }
              for (a.back = 0; (g = ((z = a.lencode[h & ((1 << a.lenbits) - 1)]) >>> 16) & 255), (p = 65535 & z), !((b = z >>> 24) <= d); ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if (g && 0 == (240 & g)) {
                for (
                  m = b, k = g, v = p;
                  (g = ((z = a.lencode[v + ((h & ((1 << (m + k)) - 1)) >> m)]) >>> 16) & 255), (p = 65535 & z), !(m + (b = z >>> 24) <= d);

                ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(h >>>= m), (d -= m), (a.back += m)
              }
              if (((h >>>= b), (d -= b), (a.back += b), (a.length = p), 0 === g)) {
                a.mode = 26
                break
              }
              if (32 & g) {
                ;(a.back = -1), (a.mode = 12)
                break
              }
              if (64 & g) {
                ;(t.msg = 'invalid literal/length code'), (a.mode = 30)
                break
              }
              ;(a.extra = 15 & g), (a.mode = 22)
            case 22:
              if (a.extra) {
                for (R = a.extra; d < R; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(a.length += h & ((1 << a.extra) - 1)), (h >>>= a.extra), (d -= a.extra), (a.back += a.extra)
              }
              ;(a.was = a.length), (a.mode = 23)
            case 23:
              for (; (g = ((z = a.distcode[h & ((1 << a.distbits) - 1)]) >>> 16) & 255), (p = 65535 & z), !((b = z >>> 24) <= d); ) {
                if (0 === l) break t
                l--, (h += i[s++] << d), (d += 8)
              }
              if (0 == (240 & g)) {
                for (
                  m = b, k = g, v = p;
                  (g = ((z = a.distcode[v + ((h & ((1 << (m + k)) - 1)) >> m)]) >>> 16) & 255), (p = 65535 & z), !(m + (b = z >>> 24) <= d);

                ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(h >>>= m), (d -= m), (a.back += m)
              }
              if (((h >>>= b), (d -= b), (a.back += b), 64 & g)) {
                ;(t.msg = 'invalid distance code'), (a.mode = 30)
                break
              }
              ;(a.offset = p), (a.extra = 15 & g), (a.mode = 24)
            case 24:
              if (a.extra) {
                for (R = a.extra; d < R; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                ;(a.offset += h & ((1 << a.extra) - 1)), (h >>>= a.extra), (d -= a.extra), (a.back += a.extra)
              }
              if (a.offset > a.dmax) {
                ;(t.msg = 'invalid distance too far back'), (a.mode = 30)
                break
              }
              a.mode = 25
            case 25:
              if (0 === o) break t
              if (((c = f - o), a.offset > c)) {
                if ((c = a.offset - c) > a.whave && a.sane) {
                  ;(t.msg = 'invalid distance too far back'), (a.mode = 30)
                  break
                }
                c > a.wnext ? ((c -= a.wnext), (u = a.wsize - c)) : (u = a.wnext - c), c > a.length && (c = a.length), (w = a.window)
              } else (w = n), (u = r - a.offset), (c = a.length)
              c > o && (c = o), (o -= c), (a.length -= c)
              do {
                n[r++] = w[u++]
              } while (--c)
              0 === a.length && (a.mode = 21)
              break
            case 26:
              if (0 === o) break t
              ;(n[r++] = a.length), o--, (a.mode = 21)
              break
            case 27:
              if (a.wrap) {
                for (; d < 32; ) {
                  if (0 === l) break t
                  l--, (h |= i[s++] << d), (d += 8)
                }
                if (
                  ((f -= o),
                  (t.total_out += f),
                  (a.total += f),
                  f && (t.adler = a.check = a.flags ? L(a.check, n, f, r - f) : I(a.check, n, f, r - f)),
                  (f = o),
                  (a.flags ? h : ce(h)) !== a.check)
                ) {
                  ;(t.msg = 'incorrect data check'), (a.mode = 30)
                  break
                }
                ;(h = 0), (d = 0)
              }
              a.mode = 28
            case 28:
              if (a.wrap && a.flags) {
                for (; d < 32; ) {
                  if (0 === l) break t
                  l--, (h += i[s++] << d), (d += 8)
                }
                if (h !== (4294967295 & a.total)) {
                  ;(t.msg = 'incorrect length check'), (a.mode = 30)
                  break
                }
                ;(h = 0), (d = 0)
              }
              a.mode = 29
            case 29:
              x = re
              break t
            case 30:
              x = he
              break t
            case 31:
              return de
            case 32:
            default:
              return oe
          }
        return (
          (t.next_out = r),
          (t.avail_out = o),
          (t.next_in = s),
          (t.avail_in = l),
          (a.hold = h),
          (a.bits = d),
          (a.wsize || (f !== t.avail_out && a.mode < 30 && (a.mode < 27 || e !== ae))) && ye(t, t.output, t.next_out, f - t.avail_out),
          (_ -= t.avail_in),
          (f -= t.avail_out),
          (t.total_in += _),
          (t.total_out += f),
          (a.total += f),
          a.wrap && f && (t.adler = a.check = a.flags ? L(a.check, n, f, t.next_out - f) : I(a.check, n, f, t.next_out - f)),
          (t.data_type = a.bits + (a.last ? 64 : 0) + (12 === a.mode ? 128 : 0) + (20 === a.mode || 15 === a.mode ? 256 : 0)),
          ((0 === _ && 0 === f) || e === ae) && x === se && (x = _e),
          x
        )
      },
      inflateEnd: (t) => {
        if (!t || !t.state) return oe
        let e = t.state
        return e.window && (e.window = null), (t.state = null), se
      },
      inflateGetHeader: (t, e) => {
        if (!t || !t.state) return oe
        const a = t.state
        return 0 == (2 & a.wrap) ? oe : ((a.head = e), (e.done = !1), se)
      },
      inflateSetDictionary: (t, e) => {
        const a = e.length
        let i, n, s
        return t && t.state
          ? 0 !== (i = t.state).wrap && 11 !== i.mode
            ? oe
            : 11 === i.mode && (n = I((n = 1), e, a, 0)) !== i.check
              ? he
              : (s = ye(t, e, a, a))
                ? ((i.mode = 31), de)
                : ((i.havedict = 1), se)
          : oe
      },
      inflateInfo: 'pako inflate (from Nodeca project)',
    },
    ze = function () {
      ;(this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ''),
        (this.comment = ''),
        (this.hcrc = 0),
        (this.done = !1)
    }
  const Ae = Object.prototype.toString,
    { Z_NO_FLUSH: Ee, Z_FINISH: Re, Z_OK: Ze, Z_STREAM_END: Ue, Z_NEED_DICT: Se, Z_STREAM_ERROR: De, Z_DATA_ERROR: Te, Z_MEM_ERROR: Oe } = B
  function Ie(t) {
    this.options = Ut({ chunkSize: 65536, windowBits: 15, to: '' }, t || {})
    const e = this.options
    e.raw && e.windowBits >= 0 && e.windowBits < 16 && ((e.windowBits = -e.windowBits), 0 === e.windowBits && (e.windowBits = -15)),
      !(e.windowBits >= 0 && e.windowBits < 16) || (t && t.windowBits) || (e.windowBits += 32),
      e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
      (this.err = 0),
      (this.msg = ''),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new Lt()),
      (this.strm.avail_out = 0)
    let a = xe.inflateInit2(this.strm, e.windowBits)
    if (a !== Ze) throw new Error(N[a])
    if (
      ((this.header = new ze()),
      xe.inflateGetHeader(this.strm, this.header),
      e.dictionary &&
        ('string' == typeof e.dictionary
          ? (e.dictionary = Ot(e.dictionary))
          : '[object ArrayBuffer]' === Ae.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)),
        e.raw && (a = xe.inflateSetDictionary(this.strm, e.dictionary)) !== Ze))
    )
      throw new Error(N[a])
  }
  function Fe(t, e) {
    const a = new Ie(e)
    if ((a.push(t), a.err)) throw a.msg || N[a.err]
    return a.result
  }
  ;(Ie.prototype.push = function (t, e) {
    const a = this.strm,
      i = this.options.chunkSize,
      n = this.options.dictionary
    let s, r, l
    if (this.ended) return !1
    for (
      r = e === ~~e ? e : !0 === e ? Re : Ee,
        '[object ArrayBuffer]' === Ae.call(t) ? (a.input = new Uint8Array(t)) : (a.input = t),
        a.next_in = 0,
        a.avail_in = a.input.length;
      ;

    ) {
      for (
        0 === a.avail_out && ((a.output = new Uint8Array(i)), (a.next_out = 0), (a.avail_out = i)),
          (s = xe.inflate(a, r)) === Se && n && ((s = xe.inflateSetDictionary(a, n)) === Ze ? (s = xe.inflate(a, r)) : s === Te && (s = Se));
        a.avail_in > 0 && s === Ue && a.state.wrap > 0 && 0 !== t[a.next_in];

      )
        xe.inflateReset(a), (s = xe.inflate(a, r))
      switch (s) {
        case De:
        case Te:
        case Se:
        case Oe:
          return this.onEnd(s), (this.ended = !0), !1
      }
      if (((l = a.avail_out), a.next_out && (0 === a.avail_out || s === Ue)))
        if ('string' === this.options.to) {
          let t = Ft(a.output, a.next_out),
            e = a.next_out - t,
            n = It(a.output, t)
          ;(a.next_out = e), (a.avail_out = i - e), e && a.output.set(a.output.subarray(t, t + e), 0), this.onData(n)
        } else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out))
      if (s !== Ze || 0 !== l) {
        if (s === Ue) return (s = xe.inflateEnd(this.strm)), this.onEnd(s), (this.ended = !0), !0
        if (0 === a.avail_in) break
      }
    }
    return !0
  }),
    (Ie.prototype.onData = function (t) {
      this.chunks.push(t)
    }),
    (Ie.prototype.onEnd = function (t) {
      t === Ze && ('string' === this.options.to ? (this.result = this.chunks.join('')) : (this.result = St(this.chunks))),
        (this.chunks = []),
        (this.err = t),
        (this.msg = this.strm.msg)
    })
  var Le = {
    Inflate: Ie,
    inflate: Fe,
    inflateRaw: function (t, e) {
      return ((e = e || {}).raw = !0), Fe(t, e)
    },
    ungzip: Fe,
    constants: B,
  }
  const { Deflate: Ne, deflate: Be, deflateRaw: Ce, gzip: Me } = qt,
    { Inflate: He, inflate: je, inflateRaw: Ke, ungzip: Pe } = Le
  var Ye = Ne,
    Ge = Be,
    Xe = Ce,
    We = Me,
    qe = He,
    Je = je,
    Qe = Ke,
    Ve = Pe,
    $e = B,
    ta = {
      Deflate: Ye,
      deflate: Ge,
      deflateRaw: Xe,
      gzip: We,
      Inflate: qe,
      inflate: Je,
      inflateRaw: Qe,
      ungzip: Ve,
      constants: $e,
    }
  ;(t.Deflate = Ye),
    (t.Inflate = qe),
    (t.constants = $e),
    (t.default = ta),
    (t.deflate = Ge),
    (t.deflateRaw = Xe),
    (t.gzip = We),
    (t.inflate = Je),
    (t.inflateRaw = Qe),
    (t.ungzip = Ve),
    Object.defineProperty(t, '__esModule', { value: !0 })
})
