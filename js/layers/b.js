addLayer('b', {
  name: 'Beta',
  symbol: 'β',
  position: 3,
  startData() {
    return {
      unlocked() {
        return hm('F', 4)
      },
      points: n(0),
      total: n(0),
    }
  },
  color: '#5b51ff',
  requires: n(1e125),
  resource: 'β',
  baseResource: 'α',
  baseAmount() {
    return player.a.points
  },
  type: 'normal',
  exponent() {
    return n(0.2)
  },
  gainMult() {
    let mult = n(1)
    if (hu('b', 13)) mult = mult.mul(ue('b', 13))
    return mult
  },
  gainExp() {
    let exp = n(1)
    return exp
  },
  row: 0,
  hotkeys: [
    {
      key: 'B',
      description: 'Shift+b: Reset for Beta.',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  passiveGeneration() {
    let a = n(0)
    return a
  },
  layerShown() {
    return hm('F', 4) && gcs('te', 25) <= 1
  },
  branches: ['a'],
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
  onPrestige(gain) {
    //reset alpha points
    player.a.points = n(0)
  },
  upgrades: {
    11: {
      title: 'β1',
      description: function () {
        return '10x α. <br>layer β total:<br>' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = n(1)
        if (hu('b', 11)) eff = eff.mul(10)

        return eff
      },
      cost: n(1),
    },
    12: {
      title: 'β2',
      description: function () {
        return 'Boost Alpha based on Beta.'
      },
      cost: n(5),
      unlocked() {
        return hu('b', 11)
      },
      effect() {
        let eff = player.b.points.pow(2).max(1)
        eff = sc(eff, n(10), 0.5) //Sc228
        eff = sc(eff, n(100), 0.5) //Sc229
        eff = sc(eff, n(1000), 0.5) //Sc231
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    13: {
      title: 'β3',
      description: function () {
        return 'Boost Beta based on Beta.'
      },
      cost: n(1000),
      unlocked() {
        return hu('b', 12)
      },
      effect() {
        let eff = player.b.points.pow(0.2).max(1)
        eff = sc(eff, n(4), 0.5) //Sc230
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
  },
}) //β
