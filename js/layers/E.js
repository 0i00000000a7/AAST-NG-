addLayer('E', {
  name: 'E',
  symbol: 'E',
  position: 2,
  startData() {
    return {
      unlocked: false,
      points: n(0),
      Eblim: n(40),
      Ebpow: n(100), //Eb's cost increase power beyond 40
      Em: n(0),
      Ek: n(0),
    }
  },
  passiveGeneration() {
    let a = n(0)
    if (hm('E', 0)) a = a.add(25)
    if (hm('F', 3)) a = a.add(10)
    if (hm('E', 10)) a = a.mul(2)
    if (hm('E', 11)) a = a.mul(2)
    return a
  },
  color: '#789A89',
  requires: n('1e535'),
  resource: 'E',
  baseResource: 'B',
  baseAmount() {
    return player.B.points
  },
  type: 'normal',
  exponent() {
    let exp = n(0.008)
    exp = exp.add(buyableEffect('E', 14))
    return exp
  },
  gainExp() {
    let exp = n(1)
    if (inChallenge('E', 42)) exp = n(1).mul(layers.E.challenges[42].nerf())
    return exp
  },
  resetsNothing() {
    return true
  },
  row: 1,
  hotkeys: [
    {
      key: 'e',
      description: 'E: Reset for E points',
      onPress() {
        if (canReset(this.layer) && !hm('E', 10)) doReset(this.layer)
      },
    },
  ],
  layerShown() {
    return (player.E.unlocked || hm('B', 7)) && gcs('te', 25) >= 1
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hu('E', 12) ? ue('E', 12) : 1)
    mult = mult.mul(hu('E', 13) ? ue('E', 13) : 1)
    mult = mult.mul(hu('E', 14) ? ue('E', 14) : 1)
    mult = mult.mul(hu('E', 26) ? ue('E', 26) : 1)
    mult = mult.mul(hu('E', 21) ? 2 : 1)
    mult = mult.mul(hu('E', 23) ? ue('E', 23) : 1)
    mult = mult.mul(hu('E', 32) ? ue('E', 32) : 1)
    mult = mult.mul(hu('E', 35) ? ue('E', 35) : 1)
    mult = mult.mul(hu('E', 36) ? ue('E', 36) : 1)
    mult = mult.mul(hu('E', 51) ? ue('E', 51) : 1)
    mult = mult.mul(hu('C', 32) ? ue('C', 32) : 1)
    mult = mult.mul(hu('D', 42) ? ue('D', 42) : 1)
    mult = mult.mul(hu('sc', 31) ? ue('sc', 31) : 1)
    mult = mult.mul(hu('E', 71) ? ue('E', 71) : 1)
    mult = mult.mul(hu('E', 101) ? ue('E', 101) : 1)
    mult = mult.mul(hu('a', 23) ? ue('a', 23) : 1)

    mult = mult.mul(tmp.F.effect)
    if (hc('E', 11)) mult = mult.mul(challengeEffect('E', 11))
    if (hc('E', 12)) mult = mult.mul(challengeEffect('E', 12))
    if (hc('E', 31)) mult = mult.pow(challengeEffect('E', 31))
    if (mult.gte(1e5)) mult = mult.div(1e5).pow(0.5).mul(1e5) //Sc113
    if (mult.gte(1e10)) mult = mult.div(1e10).pow(0.75).mul(1e10) //Sc131
    if (mult.gte(1e54)) mult = mult.div(1e54).pow(0.5).mul(1e54) //Sc223
    return mult
  },
  directMult() {
    let mult = n(1)
    mult = mult.mul(buyableEffect('E', 21))
    if (hu('sc', 31) && hm('E', 6)) mult = mult.mul(ue('sc', 31))
    if (hu('E', 61)) mult = mult.mul(ue('E', 61))
    if (hu('E', 63)) mult = mult.mul(ue('E', 63))
    if (hu('B', 84)) mult = mult.mul(ue('B', 84))
    mult = Decimal.mul(mult, buyableEffect('E', 32))
    mult = mult.mul(hm('E', 11) ? tmp.E.emf : 1)
    return mult
  },
  branches: ['A', 'B', 'D'],
  EblimCal() {
    let lim = n(40)
    if (hu('E', 86)) lim = lim.add(ue('E', 86))
    return lim
  },
  EbpowCal() {
    let pow = n(100)
    pow = n(2).add(n(98).div(tmp.E.ekf))
    return pow
  },
  update(diff) {
    player.E.Eblim = tmp.E.EblimCal
    player.E.Ebpow = tmp.E.EbpowCal
    if (hm('E', 11)) player.E.Em = player.E.Em.add(tmp.E.emgain.mul(diff))
    if (hm('E', 16)) player.E.Ek = player.E.Ek.add(tmp.E.ekgain.mul(diff))
  },
  autoUpgrade() {
    return hm('F', 2) && player.F.auto
  },
  doReset(resettingLayer) {
    if (layers[resettingLayer].row > layers[this.layer].row) {
      let kept = ['unlocked', 'auto']
      if (hm('F', 5)) kept.push('milestones')
      if (hm('F', 6)) kept.push('challenges')
      layerDataReset(this.layer, kept)
    }
  },
  clickables: {
    11: {
      title() {
        return 'A Qol for mobile players.'
      },
      display: 'Hold on to auto reset for E.',
      canClick() {
        return !hm('E', 10)
      },
      onClick() {
        doReset('E')
      },
      onHold() {
        doReset('E')
      },
      unlocked() {
        return true
      },
    },
  },
  milestones: {
    0: {
      requirementDescription: 'Em1: 1500 total E',
      done() {
        return player[this.layer].total.gte('1500')
      },
      effectDescription: 'unlock E upgrades.<br>get 2500% of E every second.',
    },
    1: {
      requirementDescription: 'Em2: 40000 total E',
      done() {
        return player[this.layer].total.gte('40000')
      },
      effectDescription: 'unlock E buyables.',
    },
    2: {
      requirementDescription: 'Em3: 1e6 total E',
      done() {
        return player[this.layer].total.gte('1e6')
      },
      effectDescription: 'unlock E chal.',
    },
    3: {
      requirementDescription: 'Em4: 1e10 total E',
      done() {
        return player[this.layer].total.gte('1e10')
      },
      effectDescription: 'E14 and E17 ^1.5,unlock Ec2.',
    },
    4: {
      requirementDescription: 'Em5: 1e15 total E',
      done() {
        return player[this.layer].total.gte('1e15')
      },
      effectDescription: 'autobuy Eb1-3 and unlock Eb3.5.',
      toggles: [['E', 'auto']],
    },
    5: {
      requirementDescription: 'Em6: 1e31 total E',
      done() {
        return player[this.layer].total.gte('1e31')
      },
      effectDescription: 'Eb3 base +1 and unlock Eb12.',
    },
    6: {
      requirementDescription: 'Em7: 1e34 total E',
      done() {
        return player[this.layer].total.gte('1e34')
      },
      effectDescription: 'autobuy Eb3.5 and Eb4.<br>ScU2,6,7,13 also boosts them directly, and boosts ScU13.',
      toggles: [['E', 'auto2']],
    },
    7: {
      requirementDescription: 'Em8: 1e40 total E',
      done() {
        return player[this.layer].total.gte('1e40')
      },
      effectDescription: 'auto buy Eb10,11,12.<br>unlock 2 new E chal.',
      toggles: [['E', 'auto3']],
    },
    8: {
      requirementDescription: 'Em9: 1e49 total E',
      done() {
        return player[this.layer].total.gte('1e49')
      },
      effectDescription: 'unlock new E upg, Ec3 effect ^1.25.',
    },
    9: {
      requirementDescription: 'Em10: 1e60 total E',
      done() {
        return player[this.layer].total.gte('1e60')
      },
      effectDescription: 'Ec4 effect ^1.25.',
    },
    10: {
      requirementDescription: 'Em11: 1e63 total E',
      done() {
        return player[this.layer].total.gte('1e63')
      },
      effectDescription: '10x B and 2x E passive but disable hotkeys and mobile Qol for E.',
    },
    11: {
      requirementDescription: 'Em12: 6.66e66 total E',
      done() {
        return player[this.layer].total.gte('6.66e66')
      },
      effectDescription: '2x E passive again,unlock Em.',
    },
    12: {
      requirementDescription: 'Em13: 1e110 total E',
      done() {
        return player[this.layer].total.gte('1e110')
      },
      effectDescription: 'Em effect exponent +0.01. (^0.25 → ^0.26)',
    },
    13: {
      requirementDescription: 'Em14: 1e116 total E',
      done() {
        return player[this.layer].total.gte('1e116')
      },
      effectDescription: 'autobuy Eb5-7.<br>Em effect exponent +0.01. (^0.26 → ^0.27)',
      toggles: [['E', 'auto4']],
    },
    14: {
      requirementDescription: 'Em15: 1e123 total E',
      done() {
        return player[this.layer].total.gte('1e123')
      },
      effectDescription: 'unlock 2 new challenges.',
    },
    15: {
      requirementDescription: 'Em16: 1e132 total E',
      done() {
        return player[this.layer].total.gte('1e132')
      },
      effectDescription: 'E44 ^2.',
    },
    16: {
      requirementDescription: 'Em17: 1e190 total E',
      done() {
        return player[this.layer].total.gte('1e190')
      },
      effectDescription: 'unlock Ek.',
      tooltip: "Difficult, isn't it?",
    },
    17: {
      requirementDescription: 'Em18: 2.05e205 total E',
      done() {
        return player[this.layer].total.gte('2.05e205')
      },
      effectDescription: 'unlock the last 2 E challenges.',
    },
    18: {
      requirementDescription: 'Em19: 1e260 total E',
      done() {
        return player[this.layer].total.gte('1e260')
      },
      effectDescription: 'unlock the final buyable.',
    },
    19: {
      requirementDescription: 'Em20: 1e300 total E',
      done() {
        return player[this.layer].total.gte('1e300')
      },
      effectDescription: 'autobuy Eb8-9.',
      toggles: [['E', 'auto5']],
    },
    21: {
      requirementDescription: 'Em21: 1.80e308 total E',
      done() {
        return player[this.layer].total.gte('1.80e308')
      },
      effectDescription: 'Unlock the next layer, F (coming soon).',
    },
  },
  canReset() {
    return !hm('E', 10) && player.B.points.gte('1e535')
  },
  microtabs: {
    stuff: {
      Upgrades: {
        unlocked() {
          return hm('E', 0)
        },
        content: ['upgrades'],
      },
      Buyables: {
        unlocked() {
          return hm('E', 1)
        },
        content: [
          ['raw-html', () => `<h4 style="opacity:.5">E buyables cost nothing.<br>The purchase limit of E buyables is ` + format(player.E.Eblim)],
          [
            'display-text',
            function () {
              return "Eb's cost increase power beyond 40 is " + format(player.E.Ebpow) + ' (limited at 2)'
            },
          ],
          ['buyables', [1, 2]],
        ],
      },
      Milestones: {
        unlocked() {
          return true
        },
        content: [
          [
            'display-text',
            function () {
              return 'You have ' + format(player.E.total) + ' E in total'
            },
          ],
          'milestones',
        ],
      },
      Challenges: {
        unlocked() {
          return hm('E', 2)
        },
        content: ['challenges'],
      },
      Em: {
        unlocked() {
          return hm('E', 11)
        },
        content: [
          [
            'display-text',
            () =>
              "You have <h2 style='color: #789A89; text-shadow: 0 0 10px #c2b280'>" +
              format(player.E.Em) +
              "</h2> Em, mult E directly by <h2 style='color: #789A89; text-shadow: 0 0 10px #c2b280'> " +
              format(tmp.E.emf) +
              'x</h2>.<br>' +
              '<h3>' +
              format(tmp.E.emgain) +
              ' Em/s<h3> <br>',
          ],
          ['raw-html', () => `<h4 style="opacity:.5">welcome to first sub-currency. Em^` + format(tmp.E.emExp) + ` mults E directly. </h4>`],
          ['buyables', [3]],
        ],
      },
      Ek: {
        unlocked() {
          return hm('E', 16)
        },
        content: [
          [
            'display-text',
            () =>
              "You have <h2 style='color: #177261; text-shadow: 0 0 10px #c2b280'>" +
              format(player.E.Ek) +
              "</h2> Ek, Eb cost increase power <h2 style='color: #177261; text-shadow: 0 0 10px #c2b280'> /" +
              format(tmp.E.ekf) +
              ' </h2><br>' +
              '<h3>' +
              format(tmp.E.ekgain) +
              ' Ek/s<h3> <br>',
          ],
          ['raw-html', () => `<h4 style="opacity:.5">Ek delays Eb scaling. </h4>`],
          ['buyables', [4]],
        ],
      },
    },
  },
  tabFormat: ['main-display', 'resource-display', ['row', ['prestige-button', 'clickables']], 'blank', ['microtabs', 'stuff'], ['blank', '25px']],
  upgrades: {
    11: {
      title: 'E1',
      description: function () {
        return '1e20000x points <br>' + 'layer E total: <br>' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = n('1e20000')
        if (hu('E', 55)) eff = eff.mul('1e80001')
        if (hu('E', 56)) eff = eff.mul('1e800000')
        if (eff.gte('1e100000')) eff = eff.div('1e100000').pow(0.5).mul('1e100000') //Sc136
        if (eff.gte('1e500000')) eff = eff.div('1e500000').pow(0.5).mul('1e500000') //Sc138
        return eff
      },
      cost: n(1500),
    },
    12: {
      title: 'E2',
      description: 'E boosts itself.',
      effect() {
        let base = n(0.1)
        if (hu('E', 15)) base = base.mul(ue('E', 15))
        if (hu('E', 44)) base = base.mul(1.5)
        let eff = player.E.points.max(1).pow(base)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc102
        if (eff.gte(1000)) eff = eff.div(1000).pow(0.5).mul(1000) //Sc127
        return eff
      },
      cost: n(2500),
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 11)
      },
    },
    13: {
      title: 'E3',
      description: 'boosts to E based on D.',
      effect() {
        let eff = player.D.points.add(10).log(2).div(300).max(1)
        if (hu('C', 33)) eff = eff.mul(ue('C', 33)[0])
        if (hu('E', 24)) eff = Decimal.pow(eff, 1.5)
        if (hu('C', 35)) eff = Decimal.pow(eff, 1.5)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc106
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc122
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc163
        return eff
      },
      cost: n(4000),
      unlocked() {
        return hu(this.layer, 12)
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
    },
    14: {
      title: 'E4',
      description: 'boosts to E based on C.',
      effect() {
        let eff = player.C.points.add(10).log(2).div(500).max(1)
        if (hu('C', 33)) eff = eff.mul(ue('C', 33)[1])
        if (hu('E', 24)) eff = Decimal.pow(eff, 1.7)
        if (hu('C', 35)) eff = Decimal.pow(eff, 1.5)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc105
        if (eff.gte(4)) eff = eff.div(4).pow(0.5).mul(4) //Sc117
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc164
        return eff
      },
      cost: n(6000),
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 13)
      },
    },
    15: {
      title: 'E5',
      description: 'E2 ^(total E upgrades^0.3).',
      cost: n('10000'),
      effect() {
        let eff = n(player.E.upgrades.length).pow(0.3)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc103
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 3)
      },
      unlocked() {
        return hu(this.layer, 14)
      },
    },
    16: {
      title: 'E6',
      description: 'lg(Bb1) boosts A directly, same as Bb2.',
      cost: n('30000'),
      effect() {
        let eff1 = buyableEffect('B', 11).max(10).log10()
        let eff2 = buyableEffect('B', 12).max(10).log10()
        if (hu('C', 31)) {
          eff1 = eff1.pow(2)
          eff2 = eff2.pow(2)
        }
        if (hu('C', 36)) {
          eff1 = eff1.pow(1.5)
          eff2 = eff2.pow(1.5)
        }
        if (eff1.gte(1e4)) eff1 = eff1.div(1e4).pow(0.5).mul(1e4) //Sc107
        if (eff2.gte(1e4)) eff2 = eff2.div(1e4).pow(0.5).mul(1e4) //Sc108
        return [eff1, eff2]
      },
      effectDisplay() {
        return format(this.effect()[0]) + 'x A and ' + format(this.effect()[1]) + 'x B.'
      },
      unlocked() {
        return hu(this.layer, 15)
      },
    },
    21: {
      title: 'E7',
      description: 'Eb1-2 base +1,x2 E.<br>Unlock Eb3.',
      cost: n('40000'),
      unlocked() {
        return hu(this.layer, 16)
      },
    },
    22: {
      title: 'E8',
      description: 'lg(Bb4) boosts C directly, same as Bb5.',
      cost: n('1e5'),
      effect() {
        let eff1 = buyableEffect('B', 21).max(10).log10()
        let eff2 = buyableEffect('B', 22).max(10).log10()
        if (hu('C', 31)) {
          eff1 = eff1.pow(2)
          eff2 = eff2.pow(2)
        }
        if (hu('C', 36)) {
          eff1 = eff1.pow(1.5)
          eff2 = eff2.pow(1.5)
        }
        if (eff1.gte(1e4)) eff1 = eff1.div(1e4).pow(0.5).mul(1e4) //Sc109
        if (eff2.gte(1e4)) eff2 = eff2.div(1e4).pow(0.5).mul(1e4) //Sc110
        return [eff1, eff2]
      },
      unlocked() {
        return hu(this.layer, 21)
      },
      effectDisplay() {
        return format(this.effect()[0]) + 'x C and ' + format(this.effect()[1]) + 'x D.'
      },
    },
    23: {
      title: 'E9',
      description: 'log2(log2(Bb3)) boosts E.',
      cost: n('1.2e5'),
      effect() {
        let eff = buyableEffect('B', 13).max(4).log(2).log(2)
        if (hu('E', 25)) eff = Decimal.pow(eff, 1.5)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc104
        return eff
      },
      unlocked() {
        return hu(this.layer, 22)
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
    },
    24: {
      title: 'E10',
      description: 'E3 ^1.6 and E4 ^1.7.',
      cost: n('2e6'),
      unlocked() {
        return hc('E', 11)
      },
    },
    25: {
      title: 'E11',
      description: 'E9 ^1.5.',
      cost: n('3.2e6'),
      unlocked() {
        return hu(this.layer, 24)
      },
    },
    26: {
      title: 'E12',
      description: 'You can complete Ac7 for decimal times more than 10.<br>Boost E based on Ac7 completions.',
      cost: n('1e7'),
      effect() {
        let eff = n(challengeCompletions('A', 41))
          .sub(9)
          .max(1)
          .pow(n(challengeCompletions('A', 41)).max(1).sqrt())
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc118
        if (eff.gte(10)) eff = eff.div(10).pow(0.75).mul(10) //Sc132
        return eff
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    31: {
      title: 'E13',
      description: 'E boosts C directly and unlock more C upgrades.',
      cost: n('5e7'),
      effect() {
        let eff = player.E.points.max(1)
        if (hu('C', 36)) eff = eff.pow(1.5)
        if (eff.gte(1e9)) eff = eff.div(1e9).pow(0.5).mul(1e9) //Sc114
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return challengeCompletions('E', 11) >= 2
      },
    },
    32: {
      title: 'E14',
      description: 'boosts to E based on points.',
      cost: n('1.5e8'),
      effect() {
        let eff = player.points.add(10).log(10).sqrt().div(10).max(1)
        if (hm('E', 3)) eff = Decimal.pow(eff, 1.5)
        if (hu('D', 45)) eff = Decimal.pow(eff, 1.2)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc111
        return eff
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 31)
      },
    },
    33: {
      title: 'E15',
      description: 'Reduce Ac7 requirement beyond 10.',
      cost: n('1e9'),
      unlocked() {
        return hu(this.layer, 32)
      },
    },
    34: {
      title: 'E14',
      description: 'Ac7 boosts Ab1 effect.<br>(ignore any softcaps)',
      cost: n('1.2e9'),
      effect() {
        let eff = n(challengeCompletions('A', 41)).sub(8).max(1).log(2).sqrt().max(1)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 3)
      },
      unlocked() {
        return hu(this.layer, 33)
      },
    },
    35: {
      title: 'E17',
      description: 'boosts to E based on A.',
      cost: n('4e9'),
      effect() {
        let eff = player.A.points.add(10).log(10).cbrt().div(5).max(1)
        if (hm('E', 3)) eff = Decimal.pow(eff, 1.5)
        if (hu('E', 41)) eff = Decimal.pow(eff, 2)
        if (hu('D', 45)) eff = Decimal.pow(eff, 1.2)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc119
        return eff
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 34)
      },
    },
    36: {
      title: 'E18',
      description: 'boosts to E based on E upgrades amount.',
      cost: n('1e10'),
      effect() {
        let eff = n(player.E.upgrades.length).pow(0.5).max(1)
        if (hu('E', 84)) eff = eff.pow(15.5)
        if (eff.gte(4)) eff = eff.div(4).pow(0.5).mul(4) //Sc121
        if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.6).mul(1e3) //Sc168
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.7).mul(1e5) //Sc169
        return eff
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 35)
      },
    },
    41: {
      title: 'E19',
      description: 'E17 ^2, D11 ^1.1.',
      cost: n('1e14'),
      unlocked() {
        return challengeCompletions('E', 12) >= 3
      },
    },
    42: {
      title: 'E20',
      description: 'Eb1-2 base +1, Eb3 base +1.5, Eb4 base +0.5.',
      cost: n('1.5e15'),
      unlocked() {
        return hu(this.layer, 41)
      },
    },
    43: {
      title: 'E21',
      description: 'Unlock more Softcap Point upgrades.',
      cost: n('1e19'),
      unlocked() {
        return hu(this.layer, 42)
      },
    },
    44: {
      title: 'E22',
      description: 'E2 ^1.5',
      cost: n('1e20'),
      unlocked() {
        return hu(this.layer, 43)
      },
    },
    45: {
      title: 'E23',
      description: 'Unlock Eb10.',
      tooltip: 'Eb5-9 will be unlocked later.',
      cost: n('1e23'),
      unlocked() {
        return hu(this.layer, 44)
      },
    },
    46: {
      title: 'E24',
      description: 'Eb10 affects Eb4.<br>Unlock Eb11.',
      cost: n('1e24'),
      unlocked() {
        return hu(this.layer, 45)
      },
    },
    51: {
      title: 'E25',
      description: 'Boost E based on Bb6.',
      cost: n('1e31'),
      effect() {
        let eff = buyableEffect('B', 23).div('1e1000').max(1).pow(0.015)
        if (hu('B', 86)) eff = eff.pow(1.5)
        if (hu('E', 76)) eff = eff.pow(1.1)
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc130
        if (eff.gte(1e4)) eff = eff.div(1e4).pow(0.5).mul(1e4) //Sc150
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.5).mul(1e5) //Sc159
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 45)
      },
    },
    52: {
      title: 'E26',
      description: 'Reduce Ac7 requirement based on E.',
      cost: n('2e32'),
      effect() {
        let eff = n(1).div(player.E.points.max(10).log(10).max(10).log(10)).min(1)
        if (hu('E', 76)) eff = eff.pow(1.1)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 4)
      },
      unlocked() {
        return hu(this.layer, 51)
      },
    },
    53: {
      title: 'E27',
      description: "Boost Eb10 and Eb11's bases based on E.",
      cost: n('4e32'),
      effect() {
        let eff = player.E.points.div(1e30).max(10).log(10).pow(0.5)
        if (hu('E', 76)) eff = eff.pow(1.1)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc161
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 52)
      },
    },
    54: {
      title: 'E28',
      description: "Reduce Ebs' costs based on Eb12.",
      cost: n('1e39'),
      effect() {
        let eff = buyableEffect('E', 24).pow(0.01).div(10).pow(2).mul(10).max(1)
        if (hu('E', 56)) eff = eff.pow(ue('E', 56))
        if (hu('E', 76)) eff = eff.pow(1.1)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.5).mul(1e10) //Sc140
        if (eff.gte(1e60)) eff = eff.div(1e60).pow(0.5).mul(1e60) //Sc162
        return eff
      },
      effectDisplay() {
        return '÷' + format(this.effect())
      },
      unlocked() {
        return hu(this.layer, 53)
      },
    },
    55: {
      title: 'E29',
      description: 'x1e80001 points, add to Eb1-4 base based on E.',
      cost: n('2e42'),
      effect() {
        let eff = Decimal.add(player.E.points, 10).log(10).pow(0.25).sub(1)
        if (hu('E', 76) && eff.gt(1)) eff = eff.pow(1.1)
        return eff.max(0)
      },
      effectDisplay() {
        return '+' + format(this.effect())
      },
      unlocked() {
        return hu(this.layer, 54)
      },
    },
    56: {
      title: 'E30',
      description: 'x1e800000 points, boosts to E28 based on E.',
      cost: n('4.3e43'),
      effect() {
        let eff = player.E.points.div(1e33).max(10).log(10).sub(9)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc139
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc160
        return eff.max(1)
      },
      effectDisplay() {
        return '^' + format(this.effect(), 3)
      },
      unlocked() {
        return hu(this.layer, 55)
      },
    },
    61: {
      title: 'E31',
      description: 'Boost E directly based on Ac7 completions beyond 12.',
      cost: n('1e50'),
      effect() {
        let eff = n(challengeCompletions('A', 41))
          .sub(11)
          .max(1)
          .pow(n(challengeCompletions('A', 41)).max(1).pow(0.8))
        if (hu('B', 86)) eff = eff.pow(1.5)
        if (hu('E', 72)) eff = eff.pow(1.1)
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc141
        if (eff.gte(15)) eff = eff.div(15).pow(0.8).mul(15) //Sc147
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hm(this.layer, 8)
      },
    },
    62: {
      title: 'E32',
      description: 'Eb12 is more effective. (effect ^1.2)',
      cost: n('3e56'),
      unlocked() {
        return hu(this.layer, 61)
      },
    },
    63: {
      title: 'E33',
      description: 'boosts E directly based on E3/4/12/15 ^0.2.',
      cost: n('2e57'),
      effect() {
        let eff = n(ue('E', 13).mul(ue('E', 14)).mul(ue('E', 32)).mul(ue('E', 35))).pow(0.2)
        if (hu('B', 86)) eff = eff.pow(1.5)
        if (hu('E', 72)) eff = eff.pow(1.1)
        if (eff.gte(7.5)) eff = eff.div(7.5).pow(0.8).mul(7.5) //Sc148
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect(), 3) + 'x'
      },
      unlocked() {
        return hu(this.layer, 62)
      },
    },
    64: {
      title: 'E34',
      description: 'Unlock new B upgrades.',
      cost: n('6e60'),
      unlocked() {
        return hu(this.layer, 63)
      },
    },
    65: {
      title: 'E35',
      description: 'Boost B directly based on B beyond 1e700.',
      cost: n('1e63'),
      effect() {
        let eff = player.B.points.max(10).log(10).sub(699).pow(2)
        if (hu('B', 86)) eff = eff.pow(1.5)
        if (hu('E', 72)) eff = eff.pow(1.1)
        if (eff.gte(100)) eff = eff.div(100).pow(0.8).mul(100) //Sc149
        if (eff.gte(500)) eff = eff.div(500).pow(0.5).mul(500) //Sc152
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu('E', 64)
      },
    },
    66: {
      title: 'E36',
      description: "Reduce Ab2's cost based on A.",
      cost: n('2e63'),
      effect() {
        let eff = player.A.points.max(10).div('100')
        if (hu('E', 72)) eff = eff.pow(1.1)
        if (eff.gte(1e100)) eff = eff.div(1e100).pow(0.5).mul(1e100) //Sc153
        return eff.max(1)
      },
      effectDisplay() {
        return '÷' + format(this.effect())
      },
      unlocked() {
        return hu('E', 65)
      },
    },
    71: {
      title: 'E37',
      description: 'log2(Em)^2 mults E.',
      cost: n('1e70'),
      unlocked() {
        return hm(this.layer, 11)
      },
      effect() {
        let eff = player.E.Em.add(2).log(2).pow(2)
        if (hu('E', 75)) eff = eff.pow(2)
        if (hu('E', 81)) eff = Decimal.pow(eff, 5)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc151
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc155
        if (eff.gte(1000)) eff = eff.div(1000).pow(0.5).mul(1000) //Sc157
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.5).mul(1e5) //Sc166
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.5).mul(1e6) //Sc167
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    72: {
      title: 'E38',
      description: 'E31~E36 ^1.1.',
      cost: n('5e4'),
      tooltip: 'Except E34',
      currencyDisplayName: 'Em',
      currencyInternalName: 'Em',
      currencyLayer: 'E',
      unlocked() {
        return hu(this.layer, 71)
      },
    },
    73: {
      title: 'E39',
      description: 'Boost Em based on total E upgrades amount.',
      effect() {
        let eff = n(player.E.upgrades.length).pow(0.5)
        if (hu('E', 75)) eff = eff.pow(2)
        if (eff.gte(6)) eff = eff.div(6).pow(0.5).mul(6) //Sc154
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc158
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      cost: n('1e73'),
      unlocked() {
        return hu(this.layer, 72)
      },
    },
    74: {
      title: 'E40',
      description: 'Auto complete Ac7 based on points.',
      cost: n('1e84'),
      unlocked() {
        return hu(this.layer, 73)
      },
    },
    75: {
      title: 'E41',
      description: 'E37 and E39 ^2.',
      cost: n('5e95'),
      unlocked() {
        return hu(this.layer, 74)
      },
    },
    76: {
      title: 'E42',
      description: 'E25~E30 ^1.1.',
      cost: n('5e96'),
      unlocked() {
        return hu(this.layer, 75)
      },
    },
    81: {
      title: 'E43',
      description: 'E37 ^5.',
      cost: n('1.10e110'),
      unlocked() {
        return hu(this.layer, 76)
      },
    },
    82: {
      title: 'E44',
      description() {
        return 'Em^' + format(this.eff()) + ' mults A,B,C,D (directly) and E. (power based on E)'
      },
      eff() {
        let eff = player.E.points.max(10).log(10).div(100).pow(0.5).sub(0.98).max(0)
        eff = eff.add(ue('E', 83))
        return eff
      },
      effect() {
        let effpow = this.eff()
        let eff = player.E.Em.add(1).pow(effpow)
        if (hm('E', 15)) eff = eff.pow(2)
        if (eff.gte(1e7)) eff = eff.div(1e7).pow(0.5).mul(1e7) //Sc170
        return eff
      },
      cost: n('1e112'),
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 81)
      },
    },
    83: {
      title: 'E45',
      description: 'Add E44 power based on Em.',
      effect() {
        let eff = player.E.Em.max(10).log(10).pow(0.5).div(6).sub(1).max(0)
        if (eff.gte(0.5)) eff = eff.sub(0.5).div(2).add(0.5) //Sc177
        return eff
      },
      effectDisplay() {
        return '+' + format(this.effect(), 4)
      },
      cost: n('1e115'),
      unlocked() {
        return hu(this.layer, 82)
      },
    },
    84: {
      title: 'E46',
      description: 'E18 ^15.5.',
      cost: n('1e117'),
      unlocked() {
        return hu(this.layer, 83)
      },
    },
    85: {
      title: 'E47',
      cost: n('5e119'),
      description() {
        return "Eb5-7 total amount boosts Bb's limit.<br>(+" + format(tmp.E.upgrades[85].base) + ' each).'
      },
      unlocked() {
        return hu(this.layer, 84)
      },
      base() {
        let base = 1
        return base
      },
      effect() {
        let a = gba('E', 31).add(gba('E', 32)).add(gba('E', 33))
        let eff = a.mul(tmp.E.upgrades[85].base)
        return eff
      },
      effectDisplay() {
        return '+' + format(this.effect())
      },
    },
    86: {
      title: 'E48',
      cost: n('2e120'),
      description() {
        return "E47 also boosts Eb's limit.<br>You can buy max Ebs (with decimal).(+" + format(tmp.E.upgrades[86].base) + ' each).'
      },
      base() {
        let base = 0.01
        return base
      },
      tooltip: "Eb's cost will increase rapidly beyond 40",
      unlocked() {
        return hu(this.layer, 85)
      },
      effect() {
        let a = gba('E', 31).add(gba('E', 32)).add(gba('E', 33))
        let eff = a.mul(tmp.E.upgrades[86].base)
        return eff
      },
      effectDisplay() {
        return '+' + format(this.effect())
      },
    },
    91: {
      title: 'E49',
      description: 'Eb12 ^1.35.',
      cost: n('1e124'),
      unlocked() {
        return hu(this.layer, 86)
      },
    },
    92: {
      title: 'E50',
      cost: n('5e130'),
      description() {
        return 'Eb5-7 amount boosts B.<br>(' + format(this.base()) + '^x).'
      },
      unlocked() {
        return hu(this.layer, 91)
      },
      base() {
        let base = n(1e10)
        return base
      },
      effect() {
        let b = this.base()
        let a = gba('E', 31).add(gba('E', 32)).add(gba('E', 33))
        let eff = Decimal.pow(b, a)
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    93: {
      title: 'E51',
      description: 'E50 ^0.1 boosts A,B,C and D.',
      cost: n('3e135'),
      unlocked() {
        return hu(this.layer, 92)
      },
      effect() {
        let eff = ue('E', 92).pow(0.1)
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    94: {
      title: 'E52',
      description: 'E47^1.5 applies to Abs.',
      cost: n('1.44e144'),
      base() {
        let base = 1
        return base
      },
      effect() {
        let a = gba('E', 31).add(gba('E', 32)).add(gba('E', 33))
        let eff = a.mul(tmp.E.upgrades[94].base).pow(1.5)
        if (eff.gte(2085)) eff = eff.div(2085).pow(0.5).mul(2085) //Sc171
        return eff
      },
      effectDisplay() {
        return '+' + format(this.effect())
      },
      unlocked() {
        return hu(this.layer, 93)
      },
    },
    95: {
      title: 'E53',
      cost: n('1e148'),
      description: 'Eb5-7 amount boosts C.(1.15^x)<br> Eb5 cost base -1.',
      unlocked() {
        return hu(this.layer, 94)
      },
      effect() {
        let b = 1.15
        let a = gba('E', 31).add(gba('E', 32)).add(gba('E', 33))
        let eff = Decimal.pow(b, a)
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    96: {
      title: 'E54',
      cost: n('1.55e155'),
      description: 'Remove Eb5-7 base cost.',
      unlocked() {
        return hu(this.layer, 95)
      },
    },
    101: {
      title: 'E55',
      description: 'Boost E based on Ek.',
      cost: n('1e196'),
      effect() {
        let eff = player.E.Ek.add(2).log(2).pow(2).max(1)
        if (eff.gte(200)) eff = eff.div(200).pow(0.5).mul(200) //Sc175
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hm('E', 16)
      },
    },
    102: {
      title: 'E56',
      description: 'Boost Em based on Ek.',
      effect() {
        let eff = player.E.Ek.add(3).log(3).pow(2)
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc176
        return eff
      },
      cost: n('1e200'),
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 101)
      },
    },
    103: {
      title: 'E57',
      description: 'Em eff exp +0.01.',
      cost: n('2.22e222'),
      unlocked() {
        return hu(this.layer, 102)
      },
    },
    104: {
      title: 'E58',
      description: 'Em^0.01 boost Ek,Eb6/9 base +0.25,Eb7 base +1.',
      effect() {
        let eff = player.E.Em.max(1).pow(0.01)
        eff = sc(eff, n(10), 0.5) //Sc181
        return eff
      },
      cost: n('1e270'),
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 103)
      },
    },
    105: {
      title: 'E59',
      description: 'Ek eff exp +0.01.',
      cost: n('1e290'),
      unlocked() {
        return hu(this.layer, 104)
      },
    },
    106: {
      title: 'E60',
      description: 'Em and Ek eff exp +0.01.',
      cost: n('1e300'),
      unlocked() {
        return hu(this.layer, 105)
      },
    },
  },
  automate() {
    if (player.E.auto) {
      buyBuyable('E', 11), buyBuyable('E', 12), buyBuyable('E', 13)
    }
    if (player.E.auto2) {
      buyBuyable('E', 14), buyBuyable('E', 21)
    }
    if (player.E.auto3) {
      buyBuyable('E', 22), buyBuyable('E', 23), buyBuyable('E', 24)
    }
    if (player.E.auto4) {
      buyBuyable('E', 31), buyBuyable('E', 32), buyBuyable('E', 33)
    }
    if (player.E.auto5) {
      buyBuyable('E', 41), buyBuyable('E', 42)
    }
  },
  buyables: {
    11: {
      title: 'Eb1',
      baseCost() {
        let base = n(1)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(2, x.pow(1.2)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(2).root(1.2)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let bas = n(2)
        if (hu('E', 21)) bas = Decimal.add(bas, 1)
        if (hu('E', 42)) bas = Decimal.add(bas, 1)
        if (hu('E', 55)) bas = Decimal.add(bas, ue('E', 55))
        if (hu('E', 45)) bas = Decimal.add(bas, buyableEffect('E', 22))
        return bas
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e40)) eff = eff.div(1e40).pow(0.5).mul(1e40) //Sc134
        if (inChallenge('E', 21)) eff = n(1e-100)
        return eff
      },
      display() {
        return (
          'give A a x' +
          format(this.base()) +
          ' direct mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect()) +
          ' A'
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hm('E', 1)
      },
    },
    12: {
      title: 'Eb2',
      baseCost() {
        let base = n(1)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(3, x.pow(1.25)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(3).root(1.25)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let bas = n(2)
        if (hu('E', 21)) bas = Decimal.add(bas, 1)
        if (hu('E', 42)) bas = Decimal.add(bas, 1)
        if (hu('E', 55)) bas = Decimal.add(bas, ue('E', 55))
        if (hu('E', 45)) bas = Decimal.add(bas, buyableEffect('E', 22))
        return bas
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e40)) eff = eff.div(1e40).pow(0.5).mul(1e40) //Sc135
        if (inChallenge('E', 21)) eff = n(1e-100)
        return eff
      },
      display() {
        return (
          'give B a x' +
          format(this.base()) +
          ' direct mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect()) +
          ' B'
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hm('E', 1)
      },
    },
    13: {
      title: 'Eb3',
      baseCost() {
        let base = n(50000)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(6, x.pow(1.14)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(6).root(1.14)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let bas = n(2)
        if (hu('C', 35)) bas = bas.add(0.5)
        if (hu('E', 42)) bas = Decimal.add(bas, 1.5)
        if (hm('E', 5)) bas = Decimal.add(bas, 1)
        if (hu('E', 55)) bas = Decimal.add(bas, ue('E', 55))
        if (hu('E', 45)) bas = Decimal.add(bas, buyableEffect('E', 22))
        return bas
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e40)) eff = eff.div(1e40).pow(0.5).mul(1e40) //Sc219 It should be Sc136
        return eff
      },
      display() {
        return (
          'give C/D a x' +
          format(this.base()) +
          ' direct mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect()) +
          ' C/D'
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hu('E', 21)
      },
    },
    14: {
      title: 'Eb3.5',
      baseCost() {
        let base = n(1e15)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(2, x.pow(1.2)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(2).root(1.2)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let base = n(0.001)
        if (hu('E', 46)) base = Decimal.add(base, buyableEffect('E', 23))
        return base
      },
      effect(x) {
        let eff = Decimal.mul(this.base(), x)
        if (eff.gte(0.03)) eff = eff.sub(0.03).div(10).add(0.03) //Sc129
        return eff
      },
      display() {
        return (
          'give a +' +
          format(this.base(), 4) +
          ' E exponent \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: +' +
          format(this.effect(), 4) +
          ' E exponent'
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hm('E', 4)
      },
    },
    21: {
      title: 'Eb4',
      baseCost() {
        let base = n(1e10)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(3, x.pow(1.1)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(3).root(1.1)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let base = n(2)
        if (hu('C', 35)) base = base.add(0.5)
        if (hu('E', 42)) base = Decimal.add(base, 0.5)
        if (hu('E', 55)) base = Decimal.add(base, ue('E', 55))
        if (hu('E', 46)) base = Decimal.add(base, buyableEffect('E', 22))
        return base
      },
      effect() {
        let eff = this.base().pow(gba('E', 21))
        if (eff.gte(1e15)) eff = eff.div(1e15).pow(0.2).mul(1e15) //Sc128
        return eff.max(1)
      },
      display() {
        return (
          'give E a x' +
          format(this.base()) +
          ' direct mult<br>Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect()) +
          ' E'
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hu('C', 34)
      },
    },
    22: {
      title: 'Eb10',
      baseCost() {
        let base = n(1e23)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(3, x.pow(1.25)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(3).root(1.25)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let base = n(0.1)
        if (hu('E', 53)) base = base.mul(ue('E', 53))
        return base
      },
      effect(x) {
        let eff = this.base().mul(gba('E', 22))
        return eff
      },
      display() {
        let a = '3'
        if (hu('E', 46)) a = '4'
        return (
          'Eb1-' +
          a +
          ' base +' +
          format(this.base()) +
          '<br>Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: +' +
          format(this.effect())
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hu('E', 45)
      },
    },
    23: {
      title: 'Eb11',
      baseCost() {
        let base = n(1e25)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(3, x.pow(1.25)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(3).root(1.25)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let base = n(0.0001)
        if (hu('E', 53)) base = base.mul(ue('E', 53))
        return base
      },
      effect(x) {
        let eff = this.base().mul(gba('E', 23))
        return eff
      },
      display() {
        return (
          'Eb3.5 base +' +
          format(this.base(), 5) +
          '<br>Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: +' +
          format(this.effect(), 5)
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hu('E', 46)
      },
    },
    24: {
      title: 'Eb12',
      baseCost() {
        let base = n(1e31)
        if (hu('E', 54)) base = base.div(ue('E', 54))
        return base
      },
      cost(x) {
        if (x.gte(40)) x = x.div(40).pow(player.E.Ebpow).mul(40)
        let cost = Decimal.pow(2.5, x.pow(1.35)).mul(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (hu('E', 86)) layers.E.buyables[this.id].buyMax()
        else setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.E.points.div(this.baseCost()).max(1).log(2.5).root(1.35)
        if (tempBuy.gte(40)) tempBuy = tempBuy.div(40).root(player.E.Ebpow).mul(40)
        let target = tempBuy
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.E.Eblim)
      },
      base() {
        let base = n(1e10)
        if (hu('E', 62)) base = base.pow(1.2)
        if (hu('E', 72)) base = base.pow(1.1)
        if (hu('E', 91)) base = base.pow(1.35)
        return base
      },
      effect(x) {
        let eff = this.base().pow(gba('E', 24))
        return eff
      },
      display() {
        let a = ''
        if (hu('B', 83)) a = 'Ab and '
        return (
          'All ' +
          a +
          "Bbs' cost ÷" +
          format(this.base()) +
          '<br>Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: ÷' +
          format(this.effect())
        )
      },
      purchaseLimit() {
        return player.E.Eblim
      },
      unlocked() {
        return hm('E', 5)
      },
    },
    31: {
      title: 'Eb5',
      baseCost() {
        let cost = n(1e67)
        if (hu('E', 96)) cost = n(1)
        return cost
      },
      cost(x) {
        let cost = Decimal.pow(10, x).times(this.baseCost())
        if (hu('E', 95)) cost = Decimal.pow(9, x).times(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      base() {
        let base = 2
        return base
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e30)) eff = eff.div(1e30).pow(0.25).mul(1e30) //Sc172
        return eff
      },
      display() {
        return (
          'give Em a x' +
          format(this.base()) +
          ' mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect())
        )
      },
      unlocked() {
        return hm('E', 11)
      },
    },
    32: {
      title: 'Eb6',
      baseCost() {
        let cost = n(100)
        if (hu('E', 96)) cost = n(1)
        return cost
      },
      cost(x) {
        let cost = Decimal.pow(5, x.pow(1.03)).times(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].Em.gte(this.cost())
      },
      buy() {
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      base() {
        let base = 2
        if (hc('E', 32)) base = Decimal.add(base, challengeEffect('E', 32))
        if (hu('E', 104)) base = Decimal.add(base, 0.25)
        return base
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.25).mul(1e5) //Sc156
        if (eff.gte(1e12)) eff = eff.div(1e12).pow(0.5).mul(1e12) //Sc174
        return eff
      },
      display() {
        return (
          'give E and Em a x' +
          format(this.base()) +
          ' mult \n\
   Cost: ' +
          format(this.cost()) +
          ' Em \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect())
        )
      },
      unlocked() {
        return hm('E', 11)
      },
    },
    33: {
      title: 'Eb7',
      baseCost() {
        let cost = n(1e75)
        if (hu('E', 96)) cost = n(1)
        return cost
      },
      cost(x) {
        let cost = Decimal.pow(10, x.pow(1.5)).times(this.baseCost())
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      base() {
        let base = 10
        if (hc('E', 32)) base = Decimal.add(base, challengeEffect('E', 32))
        if (hu('E', 104)) base = Decimal.add(base, 1)
        return base
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.5).mul(1e10) //Sc165
        if (eff.gte(1e15)) eff = eff.div(1e15).pow(0.5).mul(1e15) //Sc173
        return eff
      },
      display() {
        return (
          'give Em a x' +
          format(this.base()) +
          ' mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect())
        )
      },
      unlocked() {
        return player[this.layer].total.gte('1e73')
      },
    },
    41: {
      title: 'Eb8',
      cost(x) {
        let cost = Decimal.pow(10, x).times('1e192')
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      base() {
        let base = 2
        return base
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        return eff
      },
      display() {
        return (
          'give Ek a x' +
          format(this.base()) +
          " mult \n\
   Eb8's factor/cost multiplier are fixed. \n\
   Cost: " +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect())
        )
      },
      unlocked() {
        return hm('E', 11)
      },
    },
    42: {
      title: 'Eb9',
      cost(x) {
        let cost = Decimal.pow(100, x).times('1e260')
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      base() {
        let base = 2
        if (hu('E', 104)) base = Decimal.add(base, 0.25)
        return base
      },
      effect(x) {
        let eff = Decimal.pow(this.base(), x)
        return eff
      },
      display() {
        return (
          'give Ek a x' +
          format(this.base()) +
          ' mult \n\
   Cost: ' +
          format(this.cost()) +
          ' E \n\
   Amount: ' +
          player[this.layer].buyables[this.id] +
          ' \n\
   Effect: x' +
          format(this.effect())
        )
      },
      unlocked() {
        return hm('E', 18)
      },
    },
  },
  challenges: {
    11: {
      name: 'Ec1',
      completionLimit: 3,
      challengeDescription: function () {
        return 'Reset A and B points and buyables and they are dilated.<br> Completion: ' + challengeCompletions('E', 11) + '/3'
      },
      unlocked() {
        return hm('E', 2)
      },
      goal() {
        let goal = [n(1e145), n(1e155), n(1e166)]
        return goal[challengeCompletions('E', 11)]
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.A.buyables = { 11: n(0), 12: n(0) }
        player.B.buyables = { 11: n(0), 12: n(0), 13: n(0), 21: n(0), 22: n(0), 23: n(0) }
      },
      goalDescription: function () {
        return format(this.goal()) + ' B'
      },
      canComplete() {
        return player.B.points.gte(this.goal())
      },
      rewardDescription: 'boosts to E based on B.',
      rewardEffect() {
        let base = n(challengeCompletions('E', 11)).pow(n(challengeCompletions).sqrt().max(1)).div(10)
        let eff = player.B.points.max(10).log(10).tetrate(base).max(1)
        if (hu('B', 85)) eff = eff.pow(1.2)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc220 It should be Sc147
        return eff
      },
      rewardDisplay() {
        return format(this.rewardEffect()) + 'x'
      },
    },
    12: {
      name: 'Ec2',
      completionLimit: 3,
      challengeDescription: function () {
        return "Reset A and B points and buyables. Bb1-2's base are stuck at 1. <br> Completion: " + challengeCompletions('E', 12) + '/3'
      },
      unlocked() {
        return hm('E', 3)
      },
      goal() {
        let goal = [n('1e315'), n('1e333'), n('1e355')]
        return goal[challengeCompletions('E', 12)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' B'
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.A.buyables = { 11: n(0), 12: n(0) }
        player.B.buyables = { 11: n(0), 12: n(0), 13: n(0), 21: n(0), 22: n(0), 23: n(0) }
      },
      canComplete() {
        return player.B.points.gte(this.goal())
      },
      rewardDescription: 'boosts to E based on Softcap Points (start at 20000).',
      rewardEffect() {
        let bas = Decimal.pow(challengeCompletions('E', 12), 1.35)
        let eff = player.sc.points.max(20000).sub(19990).log(10).pow(bas)
        if (hu('B', 85)) eff = eff.pow(1.2)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc120
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc123
        if (challengeCompletions('E', 12) >= 1) return eff
        else return n(1)
      },
      rewardDisplay() {
        return format(this.rewardEffect(), 3) + 'x'
      },
    },
    21: {
      name: 'Ec3',
      completionLimit: 3,
      challengeDescription: function () {
        return (
          "Reset points, and A and B points and buyables. Eb1-2's effect are stuck at 1e-100. <br> Completion: " +
          challengeCompletions('E', 21) +
          '/3'
        )
      },
      unlocked() {
        return hm('E', 7)
      },
      goal() {
        let goal = [n('4.35e435'), n('4.53e453'), n('4.71e471')]
        return goal[challengeCompletions('E', 21)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' B'
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.points = n(0)
        player.A.buyables = { 11: n(0), 12: n(0) }
        player.B.buyables = { 11: n(0), 12: n(0), 13: n(0), 21: n(0), 22: n(0), 23: n(0) }
      },
      canComplete() {
        return player.B.points.gte(this.goal())
      },
      rewardDescription: 'boosts to A and B directly based on themselves.',
      rewardEffect() {
        let eff0 = player.A.points.pow(challengeCompletions('E', 21)).pow(0.01).max(1)
        let eff1 = player.B.points.pow(challengeCompletions('E', 21)).pow(0.01).max(1)
        if (hm('E', 8)) {
          eff0 = eff0.pow(1.25)
          eff1 = eff1.pow(1.25)
        }
        if (hu('B', 85)) {
          eff0 = eff0.pow(1.2)
          eff1 = eff1.pow(1.2)
        }
        if (eff0.gte(1e25)) eff0 = eff0.div(1e25).pow(0.5).mul(1e25) //Sc142
        if (eff1.gte(1e25)) eff1 = eff1.div(1e25).pow(0.5).mul(1e25) //Sc143
        if (challengeCompletions('E', 21) >= 1) return [eff0, eff1]
        else return [n(1), n(1)]
      },
      rewardDisplay() {
        return format(this.rewardEffect()[0]) + 'x A and ' + format(this.rewardEffect()[1]) + 'x B'
      },
    },
    22: {
      name: 'Ec4',
      completionLimit: 3,
      challengeDescription: function () {
        return (
          'Reset points, and A and B points and buyables.<br>Nerf B based on B. <br> Completion: ' +
          challengeCompletions('E', 22) +
          '/3 <br> Currently: ^' +
          format(this.nerf(), 6)
        )
      },
      unlocked() {
        return hm('E', 7)
      },
      goal() {
        let goal = [n('3.65e365'), n('3.75e375'), n('3.91e391')]
        return goal[challengeCompletions('E', 22)]
      },
      nerf() {
        return player.B.points.add(10).log(10).pow(-0.1)
      },
      goalDescription: function () {
        return format(this.goal()) + ' B'
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.points = n(10)
        player.A.buyables = { 11: n(0), 12: n(0) }
        player.B.buyables = { 11: n(0), 12: n(0), 13: n(0), 21: n(0), 22: n(0), 23: n(0) }
      },
      canComplete() {
        return player.B.points.gte(this.goal())
      },
      rewardDescription: 'boosts to C and D directly based on themselves.',
      rewardEffect() {
        let eff0 = player.C.points.pow(challengeCompletions('E', 22)).pow(0.01).max(1)
        let eff1 = player.D.points.pow(challengeCompletions('E', 22)).pow(0.01).max(1)
        if (hm('E', 9)) {
          eff0 = eff0.pow(1.25)
          eff1 = eff1.pow(1.25)
        }
        if (hu('B', 85)) {
          eff0 = eff0.pow(1.2)
          eff1 = eff1.pow(1.2)
        }
        if (eff0.gte(1e15)) eff0 = eff0.div(1e15).pow(0.5).mul(1e15) //Sc144
        if (eff1.gte(1e10)) eff1 = eff1.div(1e10).pow(0.5).mul(1e10) //Sc145
        if (challengeCompletions('E', 22) >= 1) return [eff0, eff1]
        else return [n(1), n(1)]
      },
      rewardDisplay() {
        return format(this.rewardEffect()[0]) + 'x C and ' + format(this.rewardEffect()[1]) + 'x D'
      },
    },
    31: {
      name: 'Ec5',
      completionLimit: 5,
      challengeDescription: function () {
        return (
          "Reset points, A,B buyables are disabled. You can't get points and points ÷" +
          format(this.nerf()) +
          '. <br> Completion: ' +
          challengeCompletions('E', 31) +
          '/5<br>Current Raw Points: ' +
          format(getRawPointsGen())
        )
      },
      unlocked() {
        return hm('E', 14)
      },
      goal() {
        let goal = [n('1e33333'), n('1e12345'), n('1e88888'), n('1e2000'), n('1e20250')]
        return goal[challengeCompletions('E', 31)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' Raw Points'
      },
      onEnter() {
        player.points = n(10)
      },
      nerf() {
        let nerf = [n('e1.56e7'), n('e1.58e7'), n('e1.59e7'), n('e1.64e7'), n('e1.64e7'), n(1)]
        return nerf[challengeCompletions('E', 31)]
      },
      canComplete() {
        return getRawPointsGen().gte(this.goal())
      },
      rewardDescription: 'Boost E Gainmult based on completions and Em.',
      rewardEffect() {
        let eff = n(1).add(n(challengeCompletions('E', 31)).div(player.E.Em.max(10).log(10).pow(-1).mul(1000)))
        if (challengeCompletions('E', 31) >= 5) eff = eff.pow(1.1)
        if (challengeCompletions('E', 31) >= 1) return eff
        else return n(1)
      },
      rewardDisplay() {
        return '^' + format(this.rewardEffect(), 4)
      },
    },
    32: {
      name: 'Ec6',
      completionLimit: 5,
      challengeDescription: function () {
        return (
          'Reset Points and nerf Points based on completions. <br> Completion: ' +
          challengeCompletions('E', 32) +
          '/5 <br> Currently: ^' +
          format(this.nerf())
        )
      },
      unlocked() {
        return hm('E', 14)
      },
      goal() {
        let goal = [n(1e164), n(3e79), n(1e43), n(2.9e29), n(1e23), n(0)]
        if (hu('a', 31)) goal = [n(1e163), n(3e78), n(1e42), n(2.9e28), n(1e22), n(0)]
        return goal[challengeCompletions('E', 32)]
      },
      onEnter() {
        player.points = n(10)
      },
      nerf() {
        return n(challengeCompletions('E', 32)).add(1).pow(0.5).mul(10).pow(-4)
      },
      goalDescription: function () {
        return format(this.goal()) + ' points'
      },
      canComplete() {
        return player.points.gte(this.goal())
      },
      rewardDescription: 'Ec6 comp add to Eb6-7 base.',
      rewardEffect() {
        let eff = n(challengeCompletions('E', 32)).mul(0.2)
        return eff
      },
      rewardDisplay() {
        return '+' + format(this.rewardEffect())
      },
    },
    41: {
      name: 'Ec7',
      completionLimit: 5,
      challengeDescription: function () {
        return (
          "Reset Points, A and B. Nerf A and B based on completions. (don't apply to directMult) <br> Completion: " +
          challengeCompletions('E', 41) +
          '/5 <br> Currently: ^' +
          format(this.nerf())
        )
      },
      unlocked() {
        return hm('E', 17)
      },
      onEnter() {
        setClickableState('te', 11, 1)
        player.points = n(10)
        player.A.points = n(0)
        player.B.points = n(0)
        setClickableState('te', 11, 0)
      },
      goal() {
        let goal = [n(1.66e166), n(1.94e194), n(2.14e214), n(2.25e225), n(2.36e236), n(0)]
        return goal[challengeCompletions('E', 41)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' A'
      },
      nerf() {
        return n(challengeCompletions('E', 41)).add(1).pow(0.7).mul(5).pow(-3)
      },
      canComplete() {
        return player.A.points.gte(this.goal())
      },
      rewardDescription: 'Boost to Em and Ek based on E and completions.',
      rewardEffect() {
        let c = n(challengeCompletions('E', 41)).mul(0.1)
        let eff = c.add(1).mul(player.E.points.max(1e200).log(10).div(200).pow(c))
        eff = sc(eff, n(1.15), 0.2) //Sc180
        return eff
      },
      rewardDisplay() {
        return '^' + format(this.rewardEffect(), 3)
      },
    },
    42: {
      name: 'Ec8',
      completionLimit: 5,
      challengeDescription: function () {
        return (
          'Reset E and nerf E based on completions. <br> Completion: ' + challengeCompletions('E', 42) + '/5 <br> Currently: ^' + format(this.nerf())
        )
      },
      unlocked() {
        return hm('E', 17)
      },
      goal() {
        let goal = [n(1e88), n(3e90), n(9.1e91), n(9.2e92), n(9.3e93), n(0)]
        return goal[challengeCompletions('E', 42)]
      },
      onEnter() {
        player.E.points = n(0)
        updateTemp()
      },
      goalDescription: function () {
        return format(this.goal()) + ' E/s'
      },
      nerf() {
        return n(challengeCompletions('E', 42)).add(1).pow(0.3).mul(4).pow(-2)
      },
      canComplete() {
        return n(tmp.E.resetGain).mul(tmp.E.passiveGeneration).gte(this.goal())
      },
      rewardDescription: 'Boosts to Em/Ek effect exp.',
      rewardEffect() {
        let eff = n(challengeCompletions('E', 42)).mul(0.01)
        if (eff.gt(0.03)) eff = eff.sub(0.03).mul(0.04).add(0.03) //Sc183
        return eff
      },
      rewardDisplay() {
        return 'Em/Ek exp +' + format(this.rewardEffect())
      },
    },
    51: {
      name: 'Ec9',
      completionLimit: 4,
      challengeDescription: function () {
        return (
          'Your A is limited at your Alpha <br> Completion: ' +
          challengeCompletions('E', 51) +
          '/4 <br> Currently: Capped at' +
          format(player.a.points)
        )
      },
      unlocked() {
        return hm('F', 6)
      },
      goal() {
        let goal = [n(1e1000), n(3e90), n(9.1e91), n(9.2e92), n(0)]
        return goal[challengeCompletions('E', 51)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' B'
      },
      canComplete() {
        return player.B.points.gte(this.goal())
      },
      rewardDescription: 'Boosts to Alpha based on completions.',
      rewardEffect() {
        let eff = n(10).pow(challengeCompletions('E', 51)).pow(4)
        return eff
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.points = n(10)
      },
      rewardDisplay() {
        return format(this.rewardEffect()) + 'x'
      },
    },
    52: {
      name: 'Ec10',
      completionLimit: 4,
      challengeDescription: function () {
        return (
          'Your B is limited at your Beta <br> Completion: ' +
          challengeCompletions('E', 52) +
          '/4 <br> Currently: Capped at' +
          format(player.b.points)
        )
      },
      unlocked() {
        return hm('F', 6)
      },
      goal() {
        let goal = [n(1e1000), n(3e90), n(9.1e91), n(9.2e92), n(0)]
        return goal[challengeCompletions('E', 52)]
      },
      goalDescription: function () {
        return format(this.goal()) + ' A'
      },
      canComplete() {
        return player.A.points.gte(this.goal())
      },
      rewardDescription: 'Boosts to Beta based on completions.',
      rewardEffect() {
        let eff = n(2).pow(challengeCompletions('E', 51)).pow(2)
        return eff
      },
      onEnter() {
        player.A.points = n(0)
        player.B.points = n(0)
        player.points = n(10)
      },
      rewardDisplay() {
        return format(this.rewardEffect()) + 'x'
      },
    },
  },
  emgain() {
    let eff = n(1)
    eff = Decimal.mul(eff, buyableEffect('E', 31))
    eff = Decimal.mul(eff, buyableEffect('E', 32))
    eff = Decimal.mul(eff, buyableEffect('E', 33))
    eff = eff.mul(hu('E', 73) ? ue('E', 73) : 1)
    eff = eff.mul(hu('E', 102) ? ue('E', 102) : 1)
    eff = eff.mul(hu('a', 24) ? ue('a', 24) : 1)
    if (hc('E', 41)) eff = eff.pow(challengeEffect('E', 41))
    eff = sc(eff, n(1e100), 0.6) //Sc180
    return eff
  },
  emExp() {
    let exp = 0.25
    if (hm('E', 12)) exp = Decimal.add(exp, 0.01)
    if (hm('E', 13)) exp = Decimal.add(exp, 0.01)
    if (hu('E', 103)) exp = Decimal.add(exp, 0.01)
    if (hu('E', 106)) exp = Decimal.add(exp, 0.01)
    if (hc('E', 42)) exp = Decimal.add(exp, challengeEffect('E', 42))
    return exp
  },
  emf() {
    let exp = tmp.E.emExp
    let eff = player.E.Em.max(1).pow(exp)
    return eff
  },
  ekgain() {
    let eff = n(1)
    eff = Decimal.mul(eff, buyableEffect('E', 41))
    eff = Decimal.mul(eff, buyableEffect('E', 42))
    eff = eff.mul(hu('E', 104) ? ue('E', 104) : 1)
    eff = eff.mul(hu('a', 26) ? ue('a', 26) : 1)
    if (hc('E', 41)) eff = eff.pow(challengeEffect('E', 41))
    eff = sc(eff, n(1e20), 0.8) //Sc179
    eff = sc(eff, n(1e40), 0.8) //Sc182
    return eff
  },
  ekexp() {
    let exp = n(0.25)
    if (hc('E', 42)) exp = Decimal.add(exp, challengeEffect('E', 42))
    if (hu('E', 105)) exp = Decimal.add(exp, 0.01)
    if (hu('E', 106)) exp = Decimal.add(exp, 0.01)
    return exp
  },
  ekf() {
    let exp = tmp.E.ekexp
    let eff = player.E.Ek.add(2).log(2).pow(exp)
    return eff
  },
}) //E
