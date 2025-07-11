addLayer('a', {
  infoboxes: {
    introBox: {
      title: 'α',
      body() {
        return "After unlocking the F layer, you'll also unlock greek letters. You can get more bonuses and Qols from here. You can change layer display mode in test layer."
      },
    },
  },
  name: 'Alpha',
  symbol: 'α',
  position: 2,
  startData() {
    return {
      unlocked() {
        return hm('F', 0)
      },
      points: n(0),
      total: n(0),
    }
  },
  color: '#28fefb',
  requires: n(10),
  resource: 'α',
  baseResource: 'points',
  baseAmount() {
    return player.points
  },
  type: 'normal',
  exponent() {
    return n(0.1)
  },
  gainMult() {
    let mult = n(1)
    if (hu('a', 22)) mult = mult.mul(ue('a', 22))
    if (hu('a', 25)) mult = mult.mul(ue('a', 25))
    if (hu('D', 42)) mult = mult.mul(ue('D', 42))
    if (hu('D', 43)) mult = mult.mul(ue('D', 43))
    if (hu('b', 11)) mult = mult.mul(ue('b', 11))
    if (hu('b', 12)) mult = mult.mul(ue('b', 12))

    return mult
  },
  gainExp() {
    let exp = n(1)
    if (hm('F', 1)) exp = exp.mul(tmp.F.milestones[1].effect)
    return exp
  },
  row: 0,
  hotkeys: [
    {
      key: 'A',
      description: 'Shift+a: Reset for Alpha.',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  passiveGeneration() {
    let a = n(0)
    if (hm('F', 3)) a = a.add(1)
    return a
  },
  layerShown() {
    return hm('F', 0) && gcs('te', 25) <= 1
  },
  doReset(resettingLayer) {
    if (layers[resettingLayer].row > layers[this.layer].row) {
      let kept = ['unlocked', 'auto', 'upgrades']
      layerDataReset(this.layer, kept)
    }
  },
  update(diff) {},
  microtabs: {
    stuff: {
      Upgrades: {
        unlocked() {
          return true
        },
        content: ['upgrades'],
      },
      Challenges: {
        unlocked() {
          return false
        },
        content: ['challenges'],
      },
      Buyables: {
        unlocked() {
          return false
        },
        content: ['buyables'],
      },
    },
  },
  tabFormat: [['infobox', 'introBox'], 'main-display', 'resource-display', 'prestige-button', ['microtabs', 'stuff'], ['blank', '25px']],
  upgrades: {
    11: {
      title: 'α1',
      description: function () {
        return '10x points. <br>layer α total:<br>' + format(this.effect()) + 'x'
      },
      tooltip: 'All the upgrades that multiples points with a static multiplier in this layer are counted in this upgrade. Same as other layers.',
      effect() {
        let eff = n(1)
        if (hu('a', 11)) eff = eff.mul(10)

        if (hu('a', 21)) eff = eff.pow(ue('a', 21))

        eff = sc(eff, n(10), 0.6) //Sc185
        eff = sc(eff, n(100), 0.6) //Sc202
        eff = sc(eff, n(1e10), 0.6) //Sc204
        eff = sc(eff, n(1e100), 0.6) //Sc206
        eff = sc(eff, n(1e308), 0.01) //Sc208
        return eff
      },
      cost: n(10),
    },
    12: {
      title: 'α2',
      description: function () {
        return '3x A and B.'
      },
      cost: n(100),
      unlocked() {
        return hu('a', 11)
      },
    },
    13: {
      title: 'α3',
      description: function () {
        return 'Boost A1 and B1 based on total Alpha upgrades.'
      },
      cost: n(500),
      unlocked() {
        return hu('a', 12)
      },
      effect() {
        let eff = n(player.a.upgrades.length)
        eff = sc(eff, n(2), 0.5) //Sc186
        return eff
      },
      effectDisplay() {
        return '^' + format(ue(this.layer, this.id))
      },
    },
    14: {
      title: 'α4',
      description: function () {
        return 'Boost A and B based on total Alpha.'
      },
      cost: n(15000),
      unlocked() {
        return hu('a', 13)
      },
      effect() {
        let eff = player.a.total.div(1.5e4).pow(10).add(1)
        eff = sc(eff, n(10), 0.5) //Sc187
        eff = sc(eff, n(100), 0.5) //Sc188
        eff = sc(eff, n(1000), 0.5) //Sc189
        eff = sc(eff, n(1e4), 0.5) //Sc191
        eff = sc(eff, n(1e5), 0.5) //Sc195
        eff = sc(eff, n(1e6), 0.1) //Sc200
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    15: {
      title: 'α5',
      description: function () {
        return 'Boost C based on total Alpha.'
      },
      cost: n(1e5),
      unlocked() {
        return hu('a', 14)
      },
      effect() {
        let eff = player.a.total.div(1.5e5).pow(5).add(1)
        eff = sc(eff, n(10), 0.5) //Sc190
        eff = sc(eff, n(100), 0.5) //Sc192
        eff = sc(eff, n(1000), 0.5) //Sc196
        eff = sc(eff, n(1e4), 0.5) //Sc198
        eff = sc(eff, n(1e5), 0.1) //Sc201
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    16: {
      title: 'α6',
      description: function () {
        return 'Boost D based on total Alpha.'
      },
      cost: n(1e6),
      unlocked() {
        return hu('a', 15)
      },
      effect() {
        let eff = player.a.total.div(1.2e6).pow(4).add(1)
        eff = sc(eff, n(10), 0.5) //Sc193
        eff = sc(eff, n(100), 0.5) //Sc194
        eff = sc(eff, n(1000), 0.5) //Sc197
        eff = sc(eff, n(1e4), 0.1) //Sc199
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    21: {
      title: 'α7',
      description: function () {
        return 'Boost α1 based on total Alpha.'
      },
      cost: n(1e20),
      unlocked() {
        return hu('a', 16)
      },
      effect() {
        let eff = player.a.total.div(1e20).pow(2).add(1)
        eff = sc(eff, n(10), 0.5) //Sc203
        eff = sc(eff, n(100), 0.5) //Sc205
        eff = sc(eff, n(1000), 0.5) //Sc207
        eff = sc(eff, n(1e4), 0.1) //Sc209
        eff = sc(eff, n(1e5), 0.5) //Sc212
        return eff
      },
      effectDisplay() {
        return '^' + format(ue(this.layer, this.id))
      },
    },
    22: {
      title: 'α8',
      description: function () {
        return 'Boost Alpha based on raw points.'
      },
      cost: n(1e52),
      unlocked() {
        return hu('a', 21)
      },
      effect() {
        let eff = getRawPointsGen().max(10).log(10).div(1e5).pow(10).add(1)
        eff = sc(eff, n(1e10), 0.5) //Sc210
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    23: {
      title: 'α9',
      description: function () {
        return 'Boost E based on total Alpha.'
      },
      cost: n(6.66e66),
      unlocked() {
        return hu('a', 22)
      },
      effect() {
        let eff = player.a.total.div(6.66e66).pow(1.5).add(1)
        eff = sc(eff, n(10), 0.5) //Sc211
        eff = sc(eff, n(1e6), 0.5) //Sc213
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    24: {
      title: 'α10',
      description: function () {
        return 'Boost Em based on total Alpha.'
      },
      cost: n(7.5e75),
      unlocked() {
        return hu('a', 23)
      },
      effect() {
        let eff = player.a.total.div(7.5e75).pow(1.2).add(1)
        eff = sc(eff, n(1000), 0.5) //Sc214
        eff = sc(eff, n(1e4), 0.5) //Sc216
        eff = sc(eff, n(1e6), 0.1) //Sc225
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    25: {
      title: 'α11',
      description: function () {
        return 'Boost Alpha based on E.'
      },
      cost: n(1e76),
      unlocked() {
        return hu('a', 24)
      },
      effect() {
        let eff = player.E.points.max(10).log(10).div(100).pow(10).add(1)
        eff = sc(eff, n(1000), 0.5) //Sc215
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    26: {
      title: 'α12',
      description: function () {
        return 'Boost Ek based on total Alpha.'
      },
      cost: n(1e80),
      unlocked() {
        return hu('a', 25)
      },
      effect() {
        let eff = player.a.total.div(1e80).pow(1.1).add(1)
        eff = sc(eff, n(10), 0.5) //Sc217
        eff = sc(eff, n(100), 0.5) //Sc224
        eff = sc(eff, n(1e4), 0.5) //Sc226
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    31: {
      title: 'α13',
      description: function () {
        return 'Cut down Ec6 requirement by /10.'
      },
      cost: n(1e130),
      unlocked() {
        return hu('a', 26)
      },
    },
  },
}) //α
