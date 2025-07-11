addLayer('B', {
  name: 'B',
  symbol: 'B',
  position: 1,
  startData() {
    return {
      unlocked: false,
      points: n(0),
      pointsAc1: n(0),
      Bblim: n(1000),
    }
  },
  passiveGeneration() {
    let a = n(0)
    if (hu('C', 11)) a = a.add(1)
    if (hm('F', 3)) a = a.add(10)
    if (hm('C', 2)) a = a.add(2)
    if (hm('C', 3)) a = a.mul(1000)
    if (hm('D', 1)) a = a.mul(100)
    if (hm('D', 2)) a = a.mul(1000)
    if (hm('E', 10)) a = a.mul(10)
    return a
  },
  color: '#7AAA2C',
  requires: n(1e4),
  resource: 'B',
  baseResource: 'A',
  baseAmount() {
    return player.A.points
  },
  type: 'normal',
  exponent: 0.2,
  gainExp() {
    let exp = n(1)
    if (inChallenge('E', 22)) exp = n(1).mul(layers.E.challenges[22].nerf())
    if (inChallenge('E', 41)) exp = n(1).mul(layers.E.challenges[41].nerf())
    return exp
  },
  row: 0,
  BblimCal() {
    let lim = n(1000)
    if (hu('E', 85)) lim = lim.add(ue('E', 85))
    return lim
  },
  update(diff) {
    if (inChallenge('A', 11)) player.B.pointsAc1 = player.B.pointsAc1.max(player.points).min(1e8)
    player.B.Bblim = tmp.B.BblimCal
    if (inChallenge('E', 52)) player.B.points = player.B.points.min(player.b.points)
  },
  hotkeys: [
    {
      key: 'b',
      description: 'B: Reset for B points',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  layerShown() {
    return player.B.unlocked || hu('A', 35)
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hu(this.layer, 14) ? 2 : 1)
    mult = mult.mul(hu(this.layer, 15) ? 1.5 : 1)
    mult = mult.mul(hu(this.layer, 22) ? 2 : 1)
    mult = mult.mul(hu(this.layer, 24) ? 2 : 1)
    mult = mult.mul(hu(this.layer, 25) ? 2 : 1)
    mult = mult.mul(hu('sc', 12) ? ue('sc', 12) : 1)
    mult = mult.mul(hu('C', 12) ? 10 : 1)
    mult = mult.mul(hu('C', 25) ? 50 : 1)
    mult = mult.pow(hc('A', 11) ? 1.1 : 1)
    mult = mult.mul(hc('A', 12) ? 10 : 1)
    mult = mult.mul(hc('A', 21) ? 10 : 1)
    mult = mult.mul(hc('A', 22) ? 10 : 1)
    mult = mult.mul(hc('D', 22) ? 1e15 : 1)
    mult = mult.mul(buyableEffect('B', 12))
    mult = mult.mul(hu('B', 34) ? 50 : 1)
    mult = mult.mul(hu('B', 41) ? 1500 : 1)
    mult = mult.mul(hu('B', 45) ? 2e4 : 1)
    mult = mult.mul(hu('B', 53) ? 30 : 1)
    mult = mult.mul(hu('E', 93) ? ue('E', 93) : 1)
    mult = mult.mul(hu('B', 61) ? ue('B', 61) : 1)
    mult = mult.mul(buyableEffect('E', 12))
    mult = mult.mul(hu('D', 31) ? ue('D', 31) : 1)
    mult = mult.mul(hu('E', 92) ? ue('E', 92) : 1)
    mult = mult.mul(hu('a', 12) ? 3 : 1)
    mult = mult.mul(hu('a', 14) ? ue('a', 14) : 1)

    mult = mult.pow(hu('B', 36) ? 1.1 : 1)
    mult = mult.pow(hu('C', 34) ? 1.1 : 1)
    mult = mult.pow(hu('D', 22) ? 1.2 : 1)
    mult = mult.pow(hc('D', 12) ? 1.35 : 1)
    mult = mult.pow(hm('B', 3) ? 1.15 : 1)
    mult = mult.pow(hu('B', 73) ? ue('B', 73) : 1)
    if (inChallenge('E', 11)) mult = mult.max(10).tetrate(0.1)
    if (mult.gte(10)) mult = mult.div(10).pow(0.5).mul(10) //Sc15
    if (mult.gte(1e10)) mult = mult.div(1e10).pow(0.5).mul(1e10) //Sc54
    if (mult.gte(1e25)) mult = mult.div(1e25).pow(0.5).mul(1e25) //Sc63
    if (mult.gte(1e40)) mult = mult.div(1e40).pow(0.5).mul(1e40) //Sc69
    if (mult.gte(1e100)) mult = mult.div(1e100).pow(0.5).mul(1e100) //Sc77
    if (mult.gte(1e250)) mult = mult.div(1e250).pow(0.5).mul(1e250) //Sc92
    if (mult.log10().gte(400)) mult = n(10).pow(mult.log10().sub(400).pow(0.5).add(400)) //Sc97
    return mult
  },
  directMult() {
    let mult = n(1)
    mult = mult.mul(buyableEffect('E', 12))
    if (hu('E', 16)) mult = mult.mul(ue('E', 16)[1])
    if (hu('sc', 12) && hm('E', 6)) mult = mult.mul(ue('sc', 12))
    if (hc('E', 21)) mult = mult.mul(challengeEffect('E', 21)[1])
    mult = mult.mul(hu('E', 82) ? ue('E', 82) : 1)
    return mult
  },
  microtabs: {
    stuff: {
      Upgrades: {
        unlocked() {
          return true
        },
        content: ['upgrades'],
      },
      Buyables: {
        unlocked() {
          return hm('D', 2)
        },
        content: [['raw-html', () => `<h4 style="opacity:.5">The purchase limit of B buyables is ` + format(player.B.Bblim)], 'buyables'],
      },
      Milestones: {
        unlocked() {
          return hu('B', 53)
        },
        content: ['milestones'],
      },
    },
  },
  tabFormat: [['infobox', 'introBox'], 'main-display', 'resource-display', 'prestige-button', ['microtabs', 'stuff'], ['blank', '25px']],
  branches: ['A'],
  autoUpgrade() {
    return hm('F', 2) && player.F.auto
  },
  doReset(resettingLayer) {
    if (layers[resettingLayer].row > layers[this.layer].row) {
      let kept = ['unlocked', 'auto']
      if (hm('F', 1)) kept.push('challenges')
      if (hm('F', 4)) kept.push('milestones')
      if (hm('F', 6)) kept.push('pointsAc1')
      layerDataReset(this.layer, kept)
    }
  },
  milestones: {
    0: {
      requirementDescription: 'Bm1: 1e66 total B',
      done() {
        return player[this.layer].total.gte('1e66')
      },
      effectDescription: 'buyables cost nothing.',
    },
    1: {
      requirementDescription: 'Bm2: 1e74 total B',
      done() {
        return player[this.layer].total.gte('1e74')
      },
      effectDescription: "All Bbs' effect ^2.",
    },
    2: {
      requirementDescription: 'Bm3: 1e111 total B',
      done() {
        return player[this.layer].total.gte('1e111')
      },
      effectDescription: 'Automatically buy max B buyables.',
      toggles: [['B', 'auto']],
    },
    3: {
      requirementDescription: 'Bm4: 1e140 total B',
      done() {
        return player[this.layer].total.gte('1e140')
      },
      effectDescription: 'B ^1.15 and unlock more B upgrades.',
    },
    4: {
      requirementDescription: 'Bm5: 1e200 total B',
      done() {
        return player[this.layer].total.gte('1e200')
      },
      effectDescription: 'unlock one A chal.<br>A buyables cost nothing and unlock Ab2.',
    },
    5: {
      requirementDescription: 'Bm6: 1e250 total B',
      done() {
        return player[this.layer].total.gte('1e250')
      },
      effectDescription: '100x C/D passive and auto buy A buyables.',
      toggles: [['B', 'auto2']],
    },
    6: {
      requirementDescription: 'Bm7: 3.65e365 total B',
      done() {
        return player[this.layer].total.gte('3.65e365')
      },
      effectDescription: 'Unlock an A upg.',
    },
    7: {
      requirementDescription: 'Bm8: 1e535 total B',
      done() {
        return player[this.layer].total.gte('1e535')
      },
      effectDescription: 'Unlock the layer E.',
    },
  },
  upgrades: {
    11: {
      title: 'B1',
      description: function () {
        return '5x points. 0.5x passive generate A.<br>layer B total:<br>' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = 5
        if (hu('B', 12)) eff = eff * 5
        if (hu('B', 13)) eff = eff * 5
        if (hu('B', 15)) eff = eff * 5
        if (hu('B', 24)) eff = eff * 10
        if (hu('B', 25)) eff = eff * 10
        if (hu('B', 31)) eff = eff * 20
        if (hu('B', 36)) eff = eff * 1e3
        if (hu('B', 42)) eff = eff * 1e10
        if (hu('B', 64)) eff = eff * 5e4
        if (hu('B', 72)) eff = eff * 1e240
        eff = n(eff)
        if (hu('B', 81)) eff = eff.mul('1e25000')

        if (hu('a', 13)) eff = eff.pow(ue('a', 13))

        if (eff.gte(5))
          eff = eff
            .div(5)
            .pow(0.5)
            .mul(5) //Sc10
            .overflow(50, 0.5)
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc16
        if (eff.gte(1000)) eff = eff.div(1000).pow(0.5).mul(1000) //Sc25
        if (eff.gte(1e30)) eff = eff.div(1e30).pow(0.5).mul(1e30) //Sc86
        if (eff.gte(1e100)) eff = eff.div(1e100).pow(0.5).mul(1e100) //Sc100
        return eff
      },
      cost: n(10),
    },
    12: {
      title: 'B2',
      description: '5x points.',
      cost: n(15),
      unlocked() {
        return hu(this.layer, 11)
      },
    },
    13: {
      title: 'B3',
      description: '5x points.',
      cost: n(20),
      unlocked() {
        return hu(this.layer, 12)
      },
    },
    14: {
      title: 'B4',
      description: '2x B.',
      cost: n(25),
      unlocked() {
        return hu(this.layer, 13)
      },
    },
    15: {
      title: 'B5',
      description: '1.5x B,5x points.',
      cost: n(60),
      unlocked() {
        return hu(this.layer, 14)
      },
    },
    16: {
      title: 'B6',
      description: 'B^0.2 boosts A.',
      cost: n(80),
      unlocked() {
        return hu(this.layer, 15)
      },
      effect() {
        let effb = 0.2
        let eff = player[this.layer].points.pow(effb)
        if (hu('A', 44)) eff = eff.pow(15)
        if (eff.gte(2.5)) eff = eff.div(2.5).pow(0.5).mul(2.5) //Sc12
        if (eff.gte(1e4)) eff = eff.div(1e4).pow(0.1).mul(1e4) //Sc34
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.01).mul(1e6) //Sc44
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    21: {
      title: 'B7',
      description: 'B^0.3 boosts points.',
      cost: n(140),
      unlocked() {
        return hu(this.layer, 15)
      },
      effect() {
        let effb6 = 0.3
        if (hu('B', 32)) effb6 = effb6 * 1.5
        if (hu('C', 14)) effb6 = effb6 * 15
        if (hu('C', 22)) effb6 = effb6 * 10

        let eff = player[this.layer].points.pow(effb6)
        if (eff.gte(4)) eff = eff.div(4).pow(0.5).mul(4) //Sc13
        if (eff.gte(25)) eff = eff.div(25).pow(0.2).mul(25) //Sc20
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.1).mul(1e6) //Sc27
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    22: {
      title: 'B8',
      description: '2x B.',
      cost: n(200),
      unlocked() {
        return hu(this.layer, 21)
      },
    },
    23: {
      title: 'B9',
      description: 'An additional 1.5x A passive generation.',
      cost: n(350),
      unlocked() {
        return hu(this.layer, 22)
      },
    },
    24: {
      title: 'B10',
      description: '2x B,10x points.',
      cost: n(600),
      unlocked() {
        return hu(this.layer, 23)
      },
    },
    25: {
      title: 'B11',
      description: '2x B,10x points.<br>unlock A chal.',
      cost: n(2e3),
      unlocked() {
        return hu(this.layer, 24)
      },
      tooltip() {
        return "A chal is unlocked, but you can't complete it now."
      },
    },
    26: {
      title: 'B12',
      description: 'Best points in Ac1 boosts points.(capped at 1e8)',
      cost: n(10000),
      unlocked() {
        return hu(this.layer, 25)
      },
      effect() {
        let eff = player.B.pointsAc1.min(1e8).pow(0.1).max(1)
        if (hu('A', 44)) eff = eff.pow(15)
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc18
        return eff
      },
      tooltip() {
        return 'Current best points: ' + format(player.B.pointsAc1)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    31: {
      title: 'B13',
      description: '20x points.',
      cost: n(3e4),
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    32: {
      title: 'B14',
      description: 'A5 exp+0.5, unlock a challenge.',
      cost: n(5e4),
      unlocked() {
        return hu(this.layer, 31)
      },
    },
    33: {
      title: 'B15',
      description: 'A10^1.5.',
      cost: n(1.5e5),
      unlocked() {
        return hu(this.layer, 32)
      },
    },
    34: {
      title: 'B16',
      description: 'A10^5 and B x50.',
      cost: n(2e5),
      unlocked() {
        return hu(this.layer, 33)
      },
    },
    35: {
      title: 'B17',
      description: 'A5 exp+1 and unlock a challenge.',
      cost: n(1.5e6),
      unlocked() {
        return hu(this.layer, 34)
      },
    },
    36: {
      title: 'B18',
      description: 'B ^1.1 and 1000x points.',
      cost: n(1e7),
      unlocked() {
        return hu(this.layer, 35)
      },
    },
    41: {
      title: 'B19',
      description: 'x1500 B,unlock 2nd buyable.',
      cost: n('2e31'),
      unlocked() {
        return hu('D', 35)
      },
    },
    42: {
      title: 'B20',
      description: 'x1e10 points.<br>D18 is boosted and it affects Bb4.<br>unlock 2 buyables.',
      cost: n('1e34'),
      unlocked() {
        return hu(this.layer, 41)
      },
    },
    43: {
      title: 'B21',
      description: 'Bb2 and Bb3 are stronger.',
      cost: n('5e46'),
      unlocked() {
        return hu(this.layer, 42)
      },
    },
    44: {
      title: 'B22',
      description: 'mult to points based on Bb1 eff.',
      cost: n('1e49'),
      effect() {
        let eff = buyableEffect('B', 11).pow(0.2).times(buyableEffect('B', 11).add(1).log(10).pow(2))
        if (hu('B', 55)) eff = Decimal.pow(eff, 1.5)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.5).mul(1e10) //Sc65
        if (eff.gte(1e30)) eff = eff.div(1e30).pow(0.5).mul(1e30) //Sc70
        return eff
      },
      unlocked() {
        return hu(this.layer, 43)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    45: {
      title: 'B23',
      description: '2e4x B,unlock a buyable.',
      cost: n('1e50'),
      unlocked() {
        return hu(this.layer, 44)
      },
    },
    46: {
      title: 'B24',
      description: 'D18 is boosted and it affects Bb5.',
      cost: n('1e52'),
      unlocked() {
        return hu(this.layer, 45)
      },
    },
    51: {
      title: 'B25',
      description: 'Unlock the last B buyable.',
      cost: n(1e63),
      unlocked() {
        return hu(this.layer, 46)
      },
    },
    52: {
      title: 'B26',
      description: 'mult to points and A based on Bb2 eff.',
      cost: n(1e64),
      effect() {
        let eff = buyableEffect('B', 12).pow(0.2)
        if (hu('B', 55)) eff = Decimal.pow(eff, 1.5)
        if (eff.gte(1e50)) eff = eff.div(1e50).pow(0.25).mul(1e50) //Sc71
        return eff
      },
      unlocked() {
        return hu(this.layer, 51)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    53: {
      title: 'B27',
      description: "A's Gainmult^2.<br>Unlock B Milestones.",
      cost: n(1e65),
      unlocked() {
        return hu(this.layer, 52)
      },
    },
    54: {
      title: 'B28',
      description: 'Boost D18 again.',
      cost: n(6.66e66),
      unlocked() {
        return hu(this.layer, 53)
      },
    },
    55: {
      title: 'B29',
      description: 'B22/B26 ^1.5.',
      cost: n(1e72),
      unlocked() {
        return hu(this.layer, 54)
      },
    },
    56: {
      title: 'B30',
      description: 'Unlock D Challenges.',
      cost: n(1e81),
      unlocked() {
        return hu(this.layer, 55)
      },
    },
    61: {
      title: 'B31',
      description: 'log1.0001 points mult B.',
      cost: n(1e114),
      effect() {
        let eff = player.points.add(10).log(1.0001)
        if (hu('A', 53)) eff = eff.pow(5)
        if (hu('B', 63)) eff = Decimal.pow(eff, ue('B', 63))
        if (hu('B', 64)) eff = Decimal.pow(eff, 10)
        if (hu('E', 31)) eff = Decimal.pow(eff, 1.1)
        if (hm('E', 10)) eff = Decimal.pow(eff, 1.05)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.5).mul(1e10) //Sc73
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.5).mul(1e20) //Sc74
        if (eff.gte(1e50)) eff = eff.div(1e50).pow(0.5).mul(1e50) //Sc78
        if (eff.gte(1e80)) eff = eff.div(1e80).pow(0.25).mul(1e80) //Sc81
        if (eff.gte(1e100)) eff = eff.div(1e100).pow(0.25).mul(1e100) //Sc82
        return eff
      },
      unlocked() {
        return hm('B', 2)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    62: {
      title: 'B32',
      description: 'unlock new A upgrades.',
      cost: n('1e116'),
      unlocked() {
        return hu(this.layer, 61)
      },
    },
    63: {
      title: 'B33',
      description: 'B31 ^(total B upgrades^0.5).',
      cost: n('1e136'),
      effect() {
        let eff = n(player.B.upgrades.length).pow(0.5)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect())
      },
      unlocked() {
        return hu(this.layer, 62)
      },
    },
    64: {
      title: 'B34',
      description: 'B31 ^10 and 5e4x points.',
      cost: n('1e150'),
      unlocked() {
        return hm(this.layer, 3)
      },
    },
    65: {
      title: 'B35',
      description: 'Bb4-5 base x2',
      cost: n('1e156'),
      unlocked() {
        return hu(this.layer, 64)
      },
    },
    66: {
      title: 'B36',
      description: 'Unlock two D challenges.<br> Unlock A buyables.',
      cost: n('1.56e156'),
      unlocked() {
        return hu(this.layer, 65)
      },
    },
    71: {
      title: 'B37',
      description: 'Ab1 base x5.',
      cost: n('1e160'),
      unlocked() {
        return hu(this.layer, 66)
      },
    },
    72: {
      title: 'B38',
      description: '1e240x points.',
      cost: n('1e191'),
      unlocked() {
        return hu(this.layer, 71)
      },
    },
    73: {
      title: 'B39',
      description: 'Boost A and B based on A beyond 1.8e308.',
      effect() {
        let eff = player.A.points.max(n(2).pow(1024)).log(2).log(2).sub(9).pow(0.8).max(1)
        if (hu('B', 74)) eff = eff.mul(ue('B', 74))
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 4)
      },
      cost: n('3.21e321'),
      unlocked() {
        return hu(this.layer, 72)
      },
    },
    74: {
      title: 'B40',
      description: 'Boost B39 based on B beyond 9.88e319 (2^1063).',
      effect() {
        let eff = player.B.points.max(n(2).pow(1063)).log(2).sub(39).log(2).sub(9).pow(0.5).max(1)
        if (hu('B', 76)) eff = eff.pow(1.35)
        return eff
      },
      effectDisplay() {
        return format(this.effect(), 4) + 'x'
      },
      cost: n('1e325'),
      unlocked() {
        return hu(this.layer, 73)
      },
    },
    75: {
      title: 'B41',
      description: 'You can complete Ac7 more than 5 times.',
      cost: n('1e330'),
      unlocked() {
        return hu(this.layer, 74)
      },
    },
    76: {
      title: 'B42',
      description: 'B40 ^1.1',
      cost: n('1e520'),
      unlocked() {
        return hu(this.layer, 75)
      },
    },
    81: {
      title: 'B43',
      description: "'x1e25000' points.",
      cost: n('1e530'),
      unlocked() {
        return hu('A', 65)
      },
    },
    82: {
      title: 'B44',
      description: 'Ab2 effect x1.35.',
      cost: n('2e530'),
      unlocked() {
        return hu(this.layer, 81)
      },
    },
    83: {
      title: 'B45',
      description: 'Eb12 affects Abs.',
      cost: n('2.5e692'),
      unlocked() {
        return hu('E', 64)
      },
    },
    84: {
      title: 'B46',
      description: 'Boost E directly based on total Bb amount beyond 6300.<br>(with Ab2 effect)',
      cost: n('6.97e697'),
      effect() {
        let eff = gba('B', 11)
          .add(gba('B', 12))
          .add(gba('B', 13))
          .add(gba('B', 21))
          .add(gba('B', 22))
          .add(gba('B', 23))
          .add(buyableEffect('A', 12).mul(6))
          .sub(6300)
          .max(1)
          .pow(0.6)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc146
        return eff
      },
      tooltip() {
        return (
          'Amount:' +
          format(
            gba('B', 11).add(gba('B', 12)).add(gba('B', 13)).add(gba('B', 21)).add(gba('B', 22)).add(gba('B', 23)).add(buyableEffect('A', 12).mul(6)),
          )
        )
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu('B', 83)
      },
    },
    85: {
      title: 'B47',
      description: 'Ec1-4 effect ^1.2.',
      cost: n('7e700'),
      unlocked() {
        return hu('B', 84)
      },
    },
    86: {
      title: 'B48',
      description: 'E25, E31, E33 and E35 ^1.5.',
      cost: n('2e704'),
      unlocked() {
        return hu('B', 85)
      },
    },
  },
  automate() {
    if (player.B.auto && hm('B', 2)) {
      layers.B.buyables[11].buyMax()
      layers.B.buyables[12].buyMax()
      layers.B.buyables[13].buyMax()
      layers.B.buyables[21].buyMax()
      layers.B.buyables[22].buyMax()
      layers.B.buyables[23].buyMax()
    }
  },
  buyables: {
    11: {
      title: 'Bb1',
      baseCost() {
        let cost = n(1e23)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(4).pow(x.pow(1.2)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (!hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(4).root(1.2)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      base() {
        let bas = n(3)
        if (hu('D', 36)) bas = bas.add(ue('D', 36))
        if (hc('D', 11)) bas = bas.mul(2)

        if (hu('A', 54)) bas = bas.pow(ue('A', 54))
        if (inChallenge('E', 12)) bas = n(1)
        bas = n(bas)
        if (bas.gte(1e5)) bas = bas.div(1e5).pow(0.2).mul(1e5) //Sc75
        return bas
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        let eff = Decimal.pow(this.base(), x)
        eff = eff.mul(buyableEffect('A', 11))
        if (hm('B', 1)) eff = eff.pow(1.2)
        if (inChallenge('D', 12)) eff = n('1e-4')
        if (inChallenge('E', 31)) eff = n(1)
        return eff
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return (
          'give A a x' +
          format(this.base()) +
          ' mult<br>Cost: ' +
          format(this.cost()) +
          ' B<br>Amount: ' +
          a +
          '<br>  Effect: x' +
          format(this.effect()) +
          ' A'
        )
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hm('D', 2)
      },
    },
    12: {
      title: 'Bb2',
      baseCost() {
        let cost = n(1e31)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(2).pow(x.pow(1.25)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(0)
        else player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(2).root(1.25)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      base() {
        let bas = n(3)
        if (hu('D', 36)) bas = bas.add(ue('D', 36))
        if (hu('B', 43)) bas = bas.mul(2)
        if (hc('D', 11)) bas = bas.mul(2)
        if (hu('A', 54)) bas = bas.pow(ue('A', 54))

        if (inChallenge('E', 12)) bas = n(1)

        if (bas.gte(1e5)) bas = bas.div(1e5).pow(0.2).mul(1e5) //Sc76
        return bas
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        let eff = Decimal.pow(this.base(), x)
        eff = eff.mul(buyableEffect('A', 11))
        if (hm('B', 1)) eff = eff.pow(1.2)
        if (inChallenge('D', 12)) eff = n('1e-4')
        if (inChallenge('E', 31)) eff = n(1)
        return eff
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return (
          'give B a x' +
          format(this.base()) +
          ' mult <br>Cost: ' +
          format(this.cost()) +
          ' B<br>Amount: ' +
          a +
          '<br> Effect: x' +
          format(this.effect()) +
          ' B'
        )
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hu('B', 41)
      },
    },
    13: {
      title: 'Bb3',
      baseCost() {
        let cost = n(1e33)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(2).pow(x.pow(1.2)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(0)
        else player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(2).root(1.2)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        if (hc('D', 11)) x = x.mul(2)
        if (hu('B', 43)) x = x.pow(1.25)
        if (hm('B', 1)) x = x.pow(2)
        if (inChallenge('D', 12)) x = n(-1)
        if (inChallenge('E', 31)) eff = n(0)
        return x
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return 'D7 effect base +' + format(this.effect()) + '<br>Cost: ' + format(this.cost()) + ' B<br>Amount: ' + a
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hu('B', 42)
      },
    },
    21: {
      title: 'Bb4',
      baseCost() {
        let cost = n(1e33)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(3).pow(x.pow(1.2)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(0)
        else player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(3).root(1.2)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      base() {
        let base = n(3)
        if (hu('D', 36) && hu('B', 42)) base = base.add(ue('D', 36))
        if (hc('D', 11)) base = base.mul(2)
        if (hu('B', 65)) base = base.mul(2)
        if (hu('A', 55)) base = base.pow(ue('A', 55))
        if (base.gte(1e5)) base = base.div(1e5).pow(0.2).mul(1e5) //Sc83
        return base
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        let eff = Decimal.pow(this.base(), x)
        eff = eff.mul(buyableEffect('A', 11))
        if (hm('B', 1)) eff = eff.pow(1.2)
        if (inChallenge('D', 12)) eff = n('1e-4')
        if (inChallenge('E', 31)) eff = n(1)
        return eff
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return (
          'give C a x' +
          format(this.base()) +
          ' mult <br>Cost: ' +
          format(this.cost()) +
          ' B<br>Amount: ' +
          a +
          '<br> Effect: x' +
          format(this.effect()) +
          ' C'
        )
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hu('B', 42)
      },
    },
    22: {
      title: 'Bb5',
      baseCost() {
        let cost = n(1e50)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(3).pow(x.pow(1.25)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(0)
        else player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(3).root(1.25)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      base() {
        let base = n(3)
        if (hu('D', 36) && hu('B', 46)) base = base.add(ue('D', 36))
        if (hc('D', 11)) base = base.mul(2)
        if (hu('B', 65)) base = base.mul(2)
        if (hu('A', 55)) base = base.pow(ue('A', 55))
        if (base.gte(1e5)) base = base.div(1e5).pow(0.2).mul(1e5) //Sc84
        return base
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        let eff = Decimal.pow(this.base(), x)
        eff = eff.mul(buyableEffect('A', 11))
        if (inChallenge('D', 12)) eff = n('1e-4')
        if (inChallenge('E', 31)) eff = n(1)
        return eff
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return (
          'give D a x' +
          format(this.base()) +
          ' mult <br>Cost: ' +
          format(this.cost()) +
          ' B<br>Amount: ' +
          a +
          '<br> Effect: x' +
          format(this.effect()) +
          ' D'
        )
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hu('B', 45)
      },
    },
    23: {
      title: 'Bb6',
      baseCost() {
        let cost = n(1e60)
        if (hu('A', 65)) cost = n(1)
        cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(2).pow(x.pow(1.5)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hm('B', 0)) player[this.layer].points = player[this.layer].points.sub(0)
        else player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.B.points.div(this.baseCost()).max(0).max(1).log(2).root(1.5)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.B.Bblim)
      },
      base() {
        let base = n(10)
        if (hu('D', 36) && hu('A', 56)) base = base.add(ue('D', 36))
        if (hc('D', 11)) base = base.mul(2)
        if (hu('A', 56)) base = base.pow(ue('A', 56))
        if (hu('B', 65)) base = base.mul(2)
        if (base.gte(100)) base = base.div(100).pow(0.5).mul(100) //Sc80
        return base
      },
      effect(x = player[this.layer].buyables[this.id]) {
        if (gba('A', 12)) x = x.add(buyableEffect('A', 12))
        let eff = Decimal.pow(this.base(), x)
        if (hm('B', 1)) eff = eff.pow(1.2)
        if (inChallenge('D', 12)) eff = n('1e-4')
        if (inChallenge('E', 31)) eff = n(1)
        if (eff.gte('1e1024')) eff = eff.div('1e1024').pow(0.1).mul('1e1024') //Sc96
        return eff
      },
      display() {
        let a = format(gba(this.layer, this.id))
        if (gba('A', 12).gt(0)) a = a + '+' + format(buyableEffect('A', 12)) + '=' + format(gba(this.layer, this.id).add(buyableEffect('A', 12)))
        return (
          'give Points a x' +
          format(this.base()) +
          ' mult <br>Cost: ' +
          format(this.cost()) +
          ' B<br>Amount: ' +
          a +
          '<br> Effect: x' +
          format(this.effect()) +
          ' Points'
        )
      },
      purchaseLimit() {
        return player.B.Bblim
      },
      unlocked() {
        return hu('B', 51)
      },
    },
  },
}) //B
