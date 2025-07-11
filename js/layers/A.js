addLayer('A', {
  infoboxes: {
    introBox: {
      title: 'Welcome!',
      body() {
        return 'Welcome to Anti-Anti-Softcap Tree NG- (AAST NG-)! This is a mod based on Anti-Anti-Softcap Tree.<br>Author: 01000000a7<br>Original Author: QqQe308<br>Original<sup>2</sup> Author: 4294967296'
      }, //If you are reading this code, You May find many abbreviations (such as ue,gba,n()) You can find their original meaning in mod.js
    },
  },
  name: 'A',
  symbol: 'A',
  position: 0,
  startData() {
    return {
      unlocked: true,
      points: n(0),
      Ablim: n(3025),
      am: n(0),
    }
  },
  passiveGeneration() {
    let a = n(0)
    if (hu('B', 11)) a = a.add(0.5)
    if (hu('B', 23)) a = a.add(1.5)
    if (hm('F', 3)) a = a.add(10)
    if (hm('C', 1)) a = a.mul(10)
    if (hm('C', 2)) a = a.mul(10)
    if (hm('D', 1)) a = a.mul(100)
    if (hm('D', 2)) a = a.mul(1e4)
    return a
  },
  color: '#4bdc13',
  requires: n(10),
  resource: 'A',
  baseResource: 'points',
  baseAmount() {
    return player.points
  },
  type: 'normal',
  exponent: 0.5,
  gainExp() {
    let exp = n(1)
    if (inChallenge('E', 41)) exp = n(1).mul(layers.E.challenges[41].nerf())
    return exp
  },
  row: 0,
  AblimCal() {
    let lim = n(3025)
    if (hu('E', 94)) lim = lim.add(ue('E', 94))
    return lim
  },
  update(diff) {
    player.A.Ablim = tmp.A.AblimCal
    if (hu('A', 26)) player.A.am = player.A.am.add(layers.A.antimatterGain().mul(diff))
    if (hu('E', 26) && inChallenge('A', 41))
      player.A.challenges[41] = player.points.div('1e500').max(1).log(tmp.A.Ac7Req).add(10).max(player.A.challenges[41]).toNumber()
    if (hu('E', 74)) player.A.challenges[41] = player.points.div('1e500').max(1).log(tmp.A.Ac7Req).add(10).max(player.A.challenges[41]).toNumber()
    if (inChallenge('E', 51)) player.A.points = player.A.points.min(player.a.points)
  },
  hotkeys: [
    {
      key: 'a',
      description: 'A: Reset for A points',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  layerShown() {
    return true
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hu(this.layer, 22) ? 3 : 1)
    mult = mult.mul(hc('A', 22) ? 20 : 1)
    mult = mult.mul(hc('A', 31) ? 20 : 1)
    mult = mult.mul(hu('B', 16) ? ue('B', 16) : 1)
    mult = mult.mul(hu('sc', 12) ? ue('sc', 12) : 1)
    mult = mult.mul(hc('C', 12) ? 10 : 1)
    mult = mult.mul(hc('D', 22) ? 1e15 : 1)
    mult = mult.mul(hu('C', 12) ? 10 : 1)
    mult = mult.mul(hu('D', 31) ? ue('D', 31) : 1)
    mult = mult.mul(hu('D', 33) ? 1e10 : 1)
    mult = mult.mul(hu('B', 52) ? ue('B', 52) : 1)
    mult = mult.mul(hu('E', 93) ? ue('E', 93) : 1)
    mult = mult.mul(hu('a', 12) ? 3 : 1)
    mult = mult.mul(hu('a', 14) ? ue('a', 14) : 1)

    mult = mult.pow(hc('A', 11) ? 1.1 : 1)
    mult = mult.pow(hc('C', 12) ? 1.025 : 1)
    mult = mult.pow(hc('D', 22) ? 1.1 : 1)
    mult = mult.pow(hu('A', 51) ? 1.25 : 1)
    mult = mult.pow(hu('B', 53) ? 2 : 1)
    mult = mult.pow(hu('B', 73) ? ue('B', 73) : 1)
    mult = mult.mul(buyableEffect('B', 11))

    if (inChallenge('E', 11)) mult = mult.max(10).tetrate(0.1)
    if (mult.gte(2)) mult = mult.div(2).pow(0.5).mul(2) //Sc3
    if (mult.gte(1e7)) mult = mult.div(1e7).pow(0.3).mul(1e7) //Sc48
    if (mult.gte(1e9)) mult = mult.div(1e9).pow(0.3).mul(1e9) //Sc59
    if (mult.gte(1e100)) mult = mult.div(1e100).pow(0.8).mul(1e100) //Sc89
    if (mult.gte(1e250)) mult = mult.div(1e250).pow(0.8).mul(1e250) //Sc99
    if (mult.gte(1e300)) mult = mult.div(1e300).pow(0.8).mul(1e300) //Sc101
    if (mult.gte('1e400')) mult = mult.div('1e400').pow(0.8).mul('1e400') //Sc137
    return mult
  },
  directMult() {
    let mult = n(1)
    mult = mult.mul(buyableEffect('E', 11))
    if (hu('E', 16)) mult = mult.mul(ue('E', 16)[0])
    if (hu('sc', 12) && hm('E', 6)) mult = mult.mul(ue('sc', 12))
    if (hc('E', 21)) mult = mult.mul(challengeEffect('E', 21)[0])
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
      Antimatter: {
        unlocked() {
          return hu('A', 26)
        },
        content: [
          [
            'display-text',
            () =>
              `You have <h2 style="color: #4bdc13">${format(player.A.am)}</h2> Antimatter(+${format(layers.A.antimatterGain())}/s), which is raising point generation to <h2 style="color: #4bdc13">${format(layers.A.antimatterEffect())}</h2>`,
          ],
        ],
      },
      Challenges: {
        unlocked() {
          return hu('B', 25)
        },
        content: ['challenges'],
      },
      Buyables: {
        unlocked() {
          return hu('B', 66)
        },
        content: [['raw-html', () => `<h4 style="opacity:.5"><br>The purchase limit of A buyables is ` + format(player.A.Ablim)], 'buyables'],
      },
    },
  },
  tabFormat: [['infobox', 'introBox'], 'main-display', 'resource-display', 'prestige-button', ['microtabs', 'stuff'], ['blank', '25px']],
  automate() {
    if (player.B.auto2 && hm('B', 5)) {
      layers.A.buyables[11].buyMax()
      layers.A.buyables[12].buyMax()
    }
  },
  antimatterEffect() {
    let eff = player.A.am.add(1).softcap(5, 0.5).overflow(12.5, 0.65)
    if (inChallenge('A', 11)) eff = eff.add(9).log10()
    return eff
  },
  antimatterGain() {
    return n(0.01)
  },
  Ac7Req() {
    //after 10 completions
    let req = n(1e50)
    if (hu('E', 33)) req = n(1e30)
    if (hu('E', 52)) req = req.pow(ue('E', 52))
    return req
  },
  autoUpgrade() {
    return hm('F', 2) && player.F.auto
  },
  doReset(resettingLayer) {
    if (layers[resettingLayer].row > layers[this.layer].row) {
      let kept = ['unlocked', 'auto']
      if (hm('F', 1)) kept.push('challenges')
      layerDataReset(this.layer, kept)
    }
  },
  upgrades: {
    11: {
      title: 'A1',
      description: function () {
        return '2x points. <br>layer A total:<br>' + format(this.effect()) + 'x'
      },
      tooltip: 'All the upgrades that multiples points with a static multiplier in this layer are counted in this upgrade. Same as other layers.',
      effect() {
        let eff = n(1)
        if (hu('A', 11)) eff = eff.mul(2)
        if (hu('A', 12)) eff = eff.mul(2)
        if (hu('A', 13)) eff = eff.mul(2)
        if (hu('A', 14)) eff = eff.mul(2)
        if (hu('A', 16)) eff = eff.mul(3)
        if (hu('A', 21)) eff = eff.mul(3)
        if (hu('A', 23)) eff = eff.mul(3)
        if (hu('A', 25)) eff = eff.mul(5)
        if (hu('A', 26)) eff = eff.mul(4)
        if (hu('A', 41)) eff = eff.mul(1e10)
        if (hu('A', 43)) eff = eff.mul(5e20)
        if (hu('A', 45)) eff = eff.mul(1e100)
        if (hu('A', 46)) eff = eff.mul('1e1000')
        if (hu('A', 54)) eff = eff.mul(3e4)

        if (hu('a', 13)) eff = eff.pow(ue('a', 13))

        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc1
        if (eff.gte(10))
          eff = eff
            .div(10)
            .pow(0.6)
            .mul(10) //Sc4
            .overflow(10, 0.5)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.7).mul(1e10) //Sc32
        if (eff.gte(1e12)) eff = eff.div(1e12).pow(0.8).mul(1e12) //Sc35
        if (eff.gte(1e25)) eff = eff.div(1e25).pow(0.9).mul(1e25) //Sc36
        if (eff.log10().gte(30)) eff = n(10).pow(eff.log10().sub(30).pow(0.1).add(30)) //Sc37
        return eff
      },
      cost: n(1),
    },
    12: {
      title: 'A2',
      description: '2x points.',
      cost: n(1),
      unlocked() {
        return hu(this.layer, 11)
      },
    },
    13: {
      title: 'A3',
      description: '2x points.',
      cost: n(2),
      unlocked() {
        return hu(this.layer, 12)
      },
    },
    14: {
      title: 'A4',
      description: '2x points.',
      cost: n(4),
      unlocked() {
        return hu(this.layer, 13)
      },
    },
    15: {
      title: 'A5',
      description: 'point/s^1.1.',
      cost: n(12),
      unlocked() {
        return hu(this.layer, 14)
      },
      effect() {
        let p = n(0.1)
        if (hu('B', 32)) p = p.add(0.5)
        if (hu('B', 35)) p = p.add(1.5)
        if (inChallenge('A', 12)) p = p.mul(-1)
        if (inChallenge('A', 31)) p = n(0)
        let eff = player.points.pow(p).add(1)
        if (inChallenge('A', 22)) eff = eff.pow(-2)
        if (hu('sc', 14)) eff = eff.pow(ue('sc', 14))
        if (eff.gte(2))
          eff = eff
            .div(2)
            .pow(0.5)
            .mul(2) //Sc2
            .overflow(10, 0.5)
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc19
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.5).mul(1e6) //Sc23
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    16: {
      title: 'A6',
      description: '3x points.',
      cost: n(200),
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    21: {
      title: 'A7',
      description: '3x points.',
      cost: n(20),
      unlocked() {
        return hu(this.layer, 15)
      },
    },
    22: {
      title: 'A8',
      description: '3x A.',
      cost: n(30),
      unlocked() {
        return hu(this.layer, 21)
      },
    },
    23: {
      title: 'A9',
      description: '3x points.',
      cost: n(100),
      unlocked() {
        return hu(this.layer, 22)
      },
    },
    24: {
      title: 'A10',
      description: 'lg(points) mults point/s.',
      cost: n(180),
      unlocked() {
        return hu(this.layer, 23)
      },
      effect() {
        let eff = player.points.add(10).log(10)
        if (hu('A', 31)) eff = eff.mul(5)
        if (hu('A', 32)) eff = eff.mul(5)
        if (hu('A', 33)) eff = eff.pow(1.3)
        if (hu('A', 34)) eff = eff.pow(1.25)
        if (hu('B', 33) && !inChallenge('A', 12)) eff = eff.pow(1.5)
        if (hu('B', 34) && !inChallenge('A', 12)) eff = eff.pow(5)
        if (hu('A', 52)) eff = eff.pow(1.25)
        if (hu('sc', 13) && !inChallenge('A', 12)) eff = eff.pow(ue('sc', 13))

        if (inChallenge('A', 12)) eff = eff.pow(-1)
        if (inChallenge('A', 22)) eff = eff.pow(-0.5)
        if (inChallenge('A', 31)) eff = n(1)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc5
        if (eff.gte(5)) eff = eff.div(5).pow(0.6).mul(5) //Sc6
        if (eff.gte(10))
          eff = eff
            .div(10)
            .pow(0.7)
            .mul(10) //Sc7
            .overflow(50, 0.75)
        if (eff.gte(100)) eff = eff.div(100).pow(0.8).mul(100) //Sc22
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.9).mul(1e20) //Sc49
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    25: {
      title: 'A11',
      description: '5x points, unlock 2 upgrades.',
      cost: n(350),
      unlocked() {
        return hu(this.layer, 24)
      },
    },
    26: {
      title: 'A12',
      description: '4x points. Unlock Antimatter.',
      cost: n(400),
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    31: {
      title: 'A13',
      description: 'A10 x5.',
      cost: n(450),
      unlocked() {
        return hu(this.layer, 26)
      },
    },
    32: {
      title: 'A14',
      description: 'A10 x5.',
      cost: n(750),
      unlocked() {
        return hu(this.layer, 31)
      },
    },
    33: {
      title: 'A15',
      description: 'A10 ^1.3.',
      cost: n(1500),
      unlocked() {
        return hu(this.layer, 32)
      },
    },
    34: {
      title: 'A16',
      description: 'A10 ^1.25.',
      cost: n(2e3),
      unlocked() {
        return hu(this.layer, 33)
      },
    },
    35: {
      title: 'A17',
      description: 'A^0.2 boosts points. unlock B and Softcap Upgrades.',
      cost: n(3e3),
      unlocked() {
        return hu(this.layer, 34)
      },
      effect() {
        let p = n(0.2)
        if (hu('A', 36)) p = p.mul(1.5)
        if (hu('A', 42)) p = p.mul(15)
        let eff = player[this.layer].points.pow(p)
        if (hu('A', 52)) eff = eff.pow(1.5)
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc8
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.1).mul(1e10) //Sc30
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.1).mul(1e20) //Sc50
        return eff.max(1)
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    36: {
      title: 'A18',
      description: 'A17 ^1.5',
      cost: n('5e3'),
      unlocked() {
        return hu(this.layer, 35)
      },
    },
    41: {
      title: 'A19',
      description: '1e10x points.',
      cost: n('1e14'),
      unlocked() {
        return hc(this.layer, 31)
      },
    },
    42: {
      title: 'A20',
      description: 'A17 ^15.',
      cost: n('1e15'),
      unlocked() {
        return hu(this.layer, 41)
      },
    },
    43: {
      title: 'A21',
      description: '5e20x points.',
      cost: n('2e16'),
      unlocked() {
        return hu(this.layer, 42)
      },
    },
    44: {
      title: 'A22',
      description: 'B6 and B12 ^15',
      cost: n('1e18'),
      unlocked() {
        return hu(this.layer, 43)
      },
    },
    45: {
      title: 'A23',
      description: '1e100x points, C ^1.5.',
      cost: n('2e20'),
      unlocked() {
        return hu(this.layer, 44)
      },
    },
    46: {
      title: 'A24',
      description: '1e1000x points, C ^1.5.',
      cost: n('5e21'),
      unlocked() {
        return hu(this.layer, 45)
      },
    },
    51: {
      title: 'A25',
      description: 'A ^1.1.',
      cost: n('5e32'),
      unlocked() {
        return hc('C', 11)
      },
    },
    52: {
      title: 'A26',
      description: 'D ^1.5, A10 ^1.25 and A17 ^1.5.<br>unlock a C challenge.',
      cost: n('5e33'),
      unlocked() {
        return hu(this.layer, 51)
      },
    },
    53: {
      title: 'A27',
      description: 'B31 ^5.',
      cost: n('1e103'),
      unlocked() {
        return hu('B', 62)
      },
    },
    54: {
      title: 'A28',
      description: 'log2(slog(points)) boosts Bb1-2 base.',
      cost: n('1e104'),
      effect() {
        let eff = player.points.max(1).slog().max(2).log(2)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 4)
      },
      unlocked() {
        return hu(this.layer, 53)
      },
    },
    55: {
      title: 'A29',
      description: 'A28^0.5 boosts Bb4 base.',
      cost: n('1e112'),
      effect() {
        let eff = ue('A', 54).pow(0.5).max(1)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 4)
      },
      unlocked() {
        return hu(this.layer, 54)
      },
    },
    56: {
      title: 'A30',
      description: 'D18 affects Bb and A29^0.5 boosts Bb6 base.',
      cost: n('1e114'),
      effect() {
        let eff = ue('A', 55).pow(0.5).max(1)
        return eff
      },
      effectDisplay() {
        return '^' + format(this.effect(), 4)
      },
      unlocked() {
        return hu(this.layer, 55)
      },
    },
    61: {
      title: 'A31',
      description: 'mult to C and D based on Bb1 eff.',
      cost: n('1e350'),
      effect() {
        let eff = buyableEffect('B', 11).pow(0.02).times(buyableEffect('B', 11).add(10).log(10).pow(1.5))
        if (hu('A', 62)) eff = eff.mul(ue('A', 62))
        if (eff.gte(1e50)) eff = eff.div(1e50).pow(0.25).mul(1e50) //Sc95
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hm('B', 6)
      },
    },
    62: {
      title: 'A32',
      description: 'mult to A31 based on Bb2 eff.',
      cost: n('3.68e368'),
      effect() {
        let eff = buyableEffect('B', 12).add(2).log(2).pow(5)
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      unlocked() {
        return hu(this.layer, 61)
      },
    },
    63: {
      title: 'A33',
      description: 'Ab2 x1.2.',
      cost: n('1e500'),
      unlocked() {
        return hu(this.layer, 62)
      },
    },
    64: {
      title: 'A34',
      description: 'mult to Ab1 based on Bb1 eff.',
      cost: n('5.26e526'),
      effect() {
        let eff = buyableEffect('B', 11).pow(1.5)
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
      tooltip: 'This upgrade is weak, actually.',
      unlocked() {
        return hu(this.layer, 63)
      },
    },
    65: {
      title: 'A35',
      description: "remove Bb1-5's base price.",
      cost: n('1e529'),
      unlocked() {
        return hu(this.layer, 64)
      },
    },
    66: {
      title: 'A36',
      description: "remove Ab-2's base price.",
      cost: n('1e535'),
      unlocked() {
        return hu(this.layer, 65)
      },
    },
  },
  challenges: {
    11: {
      name: 'Ac1',
      completionLimit: 1,
      challengeDescription() {
        return "Heavily reduce Antimatter's Effect"
      },
      unlocked() {
        return hu('B', 25)
      },
      goalDescription: '2.5e7 points',
      canComplete() {
        return player.points.gte(2.5e7)
      },
      rewardDescription: 'A and B ^1.1.',
    },
    12: {
      name: 'Ac2',
      completionLimit: 1,
      challengeDescription() {
        return 'A5 exponent x-1 and A10 effect ^-1'
      },
      unlocked() {
        return hc(this.layer, 11)
      },
      goalDescription: '1e9 points',
      canComplete() {
        return player.points.gte(1e9)
      },
      rewardDescription: 'B x10.',
    },
    21: {
      name: 'Ac3',
      completionLimit: 1,
      challengeDescription() {
        return 'points ^0.5'
      },
      unlocked() {
        return hu('B', 32)
      },
      goalDescription: '1e8 points /sec',
      canComplete() {
        return getPointGen().gte(1e8)
      },
      rewardDescription: '50x points(ignore most challenge effects) and 10x B.',
    },
    22: {
      name: 'Ac4',
      completionLimit: 1,
      challengeDescription() {
        return 'A5 effect ^-2 and A10 effect ^-0.5'
      },
      unlocked() {
        return hu('B', 35)
      },
      goalDescription: '6.6686 points',
      canComplete() {
        return player.points.gte(6.6686)
      },
      rewardDescription: '100x points(ignore most challenge effects), 20x A, 10x B.<br>unlock C.',
    },
    31: {
      name: 'Ac5',
      completionLimit: 1,
      challengeDescription() {
        return 'points ^0.15 and A5/A10 are disabled'
      },
      unlocked() {
        return hu('C', 15)
      },
      goalDescription: '7.5e5 points /sec',
      canComplete() {
        return getPointGen().gte(7.5e5)
      },
      rewardDescription: '2e5x points(ignore most challenge effects),20x A,2x C.',
    },
    32: {
      name: 'Ac6',
      completionLimit: 1,
      challengeDescription() {
        return 'Points gain is log10(points)'
      },
      unlocked() {
        return hm('D', 3)
      },
      goalDescription() {
        return '308.25 points /sec'
      },
      canComplete() {
        return getPointGen().gte(308.25)
      },
      rewardDescription: '^1.5 D.',
    },
    41: {
      name: 'Ac7',
      completionLimit() {
        let lim = 5
        if (hu('B', 75)) lim = 10
        if (hu('E', 26)) lim = 1e308
        return lim
      },
      challengeDescription: function () {
        return 'Points gain ^^0.1.<br> Completion: ' + format(challengeCompletions('A', 41)) + '/' + this.completionLimit()
      },
      unlocked() {
        return hm('B', 4)
      },
      goal() {
        let goal = [n(1e32), n(1e38), n(2e41), n(1e44), n(1e54), n(1 / 0), n(1e121), n(1e150), n('1e320'), n('1e404'), n(1 / 0)]
        if (hu('B', 75)) goal[5] = n(1e111)
        return goal[challengeCompletions('A', 41)]
      },
      canComplete() {
        return !hu('E', 26)
      },
      goalDescription: function () {
        if (challengeCompletions('A', 41) >= 10 && hu('E', 26)) return format(tmp.A.Ac7Req.pow(challengeCompletions('A', 41) - 10).mul('1e500'))
        else return format(this.goal()) + ' points'
      },
      canComplete() {
        return player.points.gte(this.goal()) && challengeCompletions('A', 41) < 10
      },
      rewardDescription: 'Boost Ab2 Effect.',
      rewardEffect() {
        let eff = n(1).add(n(challengeCompletions('A', 41)).mul(0.05))
        if (challengeCompletions('A', 41) >= 1) return eff
        else return n(1)
      },
      rewardDisplay() {
        return '^' + format(this.rewardEffect())
      },
    },
  },
  buyables: {
    11: {
      title: 'Ab1',
      baseCost() {
        let cost = n(1e125)
        if (hu('A', 66)) cost = n(1)
        if (hu('B', 83)) cost = cost.div(buyableEffect('E', 24))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(2).pow(x.pow(1.05)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (!hm('B', 4)) player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.A.points.div(this.baseCost()).max(1).log(2).root(1.05)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.A.Ablim)
      },
      base() {
        let base = n(100)
        if (hu('B', 71)) base = base.mul(10)
        if (hu('sc', 25)) base = base.pow(ue('sc', 25))
        return base
      },
      effect(x = player[this.layer].buyables[this.id]) {
        let eff = Decimal.pow(this.base(), x)
        if (hu('A', 64)) eff = eff.mul(ue('A', 64))
        if (eff.gte(1e200)) eff = eff.div(1e200).pow(0.25).mul(1e200) //Sc85
        if (eff.log10().gte(500)) eff = n(10).pow(eff.log10().sub(500).pow(0.5).add(500)) //Sc90
        if (hu('E', 34)) eff = eff.pow(ue('E', 34))
        if (inChallenge('E', 31)) eff = n(1)
        return eff
      },
      display() {
        return (
          'Bb1,2,3,4 x' +
          format(this.base()) +
          ' effect<br>Cost: ' +
          format(this.cost()) +
          ' A<br>Amount: ' +
          player[this.layer].buyables[this.id] +
          '<br>  Effect: x' +
          format(this.effect()) +
          ' effect'
        )
      },
      purchaseLimit() {
        return player.A.Ablim
      },
      unlocked() {
        return hu('B', 66)
      },
    },
    12: {
      title: 'Ab2',
      baseCost() {
        let cost = n(1e167)
        if (hu('A', 66)) cost = n(1)
        if (hu('B', 83)) cost = cost.div(buyableEffect('E', 24))
        if (hu('E', 66)) cost = cost.div(ue('E', 66))
        return cost
      },
      cost(x = player[this.layer].buyables[this.id]) {
        let cost = n(this.baseCost()).mul(n(3).pow(x.pow(1.1)))
        return cost
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      buy() {
        if (!hm('B', 4)) player[this.layer].points = player[this.layer].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, gba(this.layer, this.id).add(1))
      },
      buyMax() {
        if (!this.canAfford()) return
        let tempBuy = player.A.points.div(this.baseCost()).max(1).log(3).root(1.1)
        let target = tempBuy.plus(1).floor()
        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].max(target).min(player.A.Ablim)
      },
      base() {
        let base = n(1)
        if (hu('sc', 26)) base = base.add(ue('sc', 26))
        return base
      },
      effect(x = player[this.layer].buyables[this.id]) {
        let eff = this.base().mul(x)
        if (hc('A', 41)) eff = eff.pow(challengeEffect('A', 41))
        if (hu('A', 63)) eff = eff.mul(1.2)
        if (hu('B', 82)) eff = eff.mul(1.35)
        if (inChallenge('E', 31)) eff = n(1)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc88
        if (eff.gte(100)) eff = eff.div(100).pow(0.5).mul(100) //Sc93
        return eff
      },
      display() {
        return (
          "All Bbs' Effective Amount +" +
          format(this.base()) +
          '<br>Cost: ' +
          format(this.cost()) +
          ' A<br>Amount: ' +
          player[this.layer].buyables[this.id] +
          '<br>  Effect: +' +
          format(this.effect()) +
          ' Amount'
        )
      },
      purchaseLimit() {
        return player.A.Ablim
      },
      unlocked() {
        return hm('B', 4)
      },
    },
  },
}) //A
