addLayer('F', {
  name: 'F',
  symbol: 'F',
  position: 0,
  startData() {
    return {
      unlocked() {
        return hm('E', 20)
      },
      points: n(0),
      total: n(0),
    }
  },
  color: '#d998ff',
  requires() {
    return n(2).pow(1024)
  },
  resource: 'F',
  baseResource: 'E',
  baseAmount() {
    return player.E.points
  },
  type: 'normal',
  exponent() {
    return n(0.005)
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hu('D', 44) ? ue('D', 44) : 1)
    return mult
  },
  gainExp() {
    exp = n(1)
    return exp
  },
  effect() {
    let eff = player.F.points.add(1.16).pow(3).max(1)
    if (!hm('F', 0)) eff = n(1)
    eff = sc(eff, n(10), 0.5) //Sc184
    return eff
  },
  effectDescription() {
    let a = " boosting E by x<h2 style='color:#d998ff; text-shadow: 0 0 10px #c2b280'>" + format(tmp.F.effect) + '</h2>'
    return a
  },
  branches: ['C', 'D', 'E'],
  row: 2,
  hotkeys: [
    {
      key: 'f',
      description: 'F: Reset for F',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  passiveGeneration() {
    mult = n(0)
    return mult
  },
  layerShown() {
    return (hm('E', 20) || hm('F', 0)) && gcs('te', 25) >= 1
  },
  update(diff) {},
  microtabs: {
    stuff: {
      Milestones: {
        unlocked() {
          return true
        },
        content: ['milestones'],
      },
      Upgrades: {
        unlocked() {
          return false
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
    11: { title: '', description: '', cost: n(1e309) },
  },
  milestones: {
    0: {
      requirementDescription: 'Fm1: 1 total F',
      done() {
        return player[this.layer].total.gte(1)
      },
      effectDescription: 'Unlock α (Alpha). Keep Alpha Upgrades and Softcap Upgrades on any resets.',
    },
    1: {
      requirementDescription: 'Fm2: 2 total F',
      done() {
        return player[this.layer].total.gte(2)
      },
      effectDescription() {
        return 'Keep A~D challenges.<br>For each F milestone, Alpha ^1.1. <br> Currently: ^' + format(this.effect())
      },
      effect() {
        let eff = n(1.1).pow(player.F.milestones.length)
        eff = sc(eff, n(1.3), 0.5) //Sc227
        return eff
      },
    },
    2: {
      requirementDescription: 'Fm3: 4 total F',
      done() {
        return player[this.layer].total.gte(4)
      },
      toggles: [['F', 'auto']],
      effectDescription() {
        return 'Auto buy A~E upgrades.'
      },
    },
    3: {
      requirementDescription: 'Fm4: 8 total F',
      done() {
        return player[this.layer].total.gte(8)
      },
      effectDescription() {
        return 'An additional +1000% A~E and 100% Alpha base passive generation.'
      },
    },
    4: {
      requirementDescription: 'Fm5: 16 total F',
      done() {
        return player[this.layer].total.gte(16)
      },
      effectDescription() {
        return 'Keep A~D milestones.<br>Unlock β (Beta).'
      },
    },
    5: {
      requirementDescription: 'Fm6: 32 total F',
      done() {
        return player[this.layer].total.gte(32)
      },
      effectDescription() {
        return 'Keep E milestones.'
      },
    },
    6: {
      requirementDescription: 'Fm7: 64 total F',
      done() {
        return player[this.layer].total.gte(64)
      },
      effectDescription() {
        let a = '???.'
        if (false) a = 'F challenges.'
        return 'Keep Best Points in Ac1. (you might have forgotten this, see B12)<br>Keep E challenges, except in ' + a
      },
    },
    7: {
      requirementDescription: 'Fm8: 128 total F',
      done() {
        return player[this.layer].total.gte(128)
      },
      effectDescription() {
        return 'Unlock two more E challenges.'
      },
    },
  },
}) //F
