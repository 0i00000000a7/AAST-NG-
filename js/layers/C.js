addLayer('C', {
  name: 'C',
  symbol: 'C',
  position: 0,
  startData() {
    return {
      unlocked: false,
      points: n(0),
    }
  },
  passiveGeneration() {
    let a = n(0)
    if (hu('C', 21)) a = a.add(1)
    if (hm('D', 1)) a = a.add(1)
    if (hm('F', 3)) a = a.add(10)
    if (hm('D', 2)) a = a.mul(10)
    if (hm('B', 5)) a = a.mul(100)
    return a
  },
  color: '#A73E16',
  requires: n(1e12),
  resource: 'C',
  baseResource: 'points',
  baseAmount() {
    return player.points
  },
  type: 'normal',
  exponent: 0.15,
  gainExp() {
    return n(1)
  },
  row: 1,
  hotkeys: [
    {
      key: 'c',
      description: 'C: Reset for C points',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  layerShown() {
    return player.C.unlocked || hc('A', 22)
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hc('A', 31) ? 2 : 1)
    mult = mult.mul(hu('C', 21) ? 10 : 1)
    mult = mult.mul(hu('C', 25) ? 50 : 1)
    mult = mult.mul(hu('C', 26) ? 10 : 1)
    mult = mult.mul(hu('A', 61) ? ue('A', 61) : 1)
    mult = mult.mul(hu('sc', 16) ? ue('sc', 16) : 1)
    mult = mult.mul(hu('D', 26) ? ue('D', 26) : 1)
    mult = mult.mul(hu('E', 95) ? ue('E', 95) : 1)
    mult = mult.mul(hu('E', 93) ? ue('E', 93) : 1)
    mult = mult.mul(buyableEffect('B', 21))
    mult = mult.mul(hu('a', 15) ? ue('a', 15) : 1)

    mult = mult.pow(hu('A', 45) ? 1.5 : 1)
    mult = mult.pow(hu('A', 46) ? 1.5 : 1)
    mult = mult.pow(hu('C', 24) ? 1.5 : 1)

    if (mult.gte(10)) mult = mult.div(10).pow(0.5).mul(10) //Sc33
    if (mult.gte(1e5)) mult = mult.div(1e5).pow(0.2).mul(1e5) //Sc41
    if (mult.gte(1e9)) mult = mult.div(1e9).pow(0.4).mul(1e9) //Sc57
    if (mult.gte(1e20)) mult = mult.div(1e20).pow(0.3).mul(1e20) //Sc67
    if (mult.gte(1e60)) mult = mult.div(1e60).pow(0.6).mul(1e60) //Sc87
    if (mult.gte(1e100)) mult = mult.div(1e100).pow(0.8).mul(1e100) //Sc94
    return mult
  },
  directMult() {
    let mult = n(1)
    mult = mult.mul(buyableEffect('E', 13))
    if (hu('E', 22)) mult = mult.mul(ue('E', 22)[0])
    if (hu('E', 31)) mult = mult.mul(ue('E', 31))
    if (hu('sc', 16) && hm('E', 6)) mult = mult.mul(ue('sc', 16))
    if (hc('E', 22)) mult = mult.mul(challengeEffect('E', 22)[0])
    mult = mult.mul(hu('E', 82) ? ue('E', 82) : 1)
    return mult
  },
  branches: ['A', 'B'],
  resetsNothing() {
    return hm('C', 0)
  },
  autoUpgrade() {
    return hm('F', 2) && player.F.auto
  },
  doReset(resettingLayer) {
    if (layers[resettingLayer].row > layers[this.layer].row) {
      let kept = ['unlocked', 'auto']
      if (hm('F', 1)) kept.push('challenges')
      if (hm('F', 4)) kept.push('milestones')
      layerDataReset(this.layer, kept)
    }
  },
  milestones: {
    0: {
      requirementDescription: 'Cm1: 3 total C',
      done() {
        return player[this.layer].total.gte(3)
      },
      effectDescription: 'C resets nothing',
    },
    1: {
      requirementDescription: 'Cm2: 30 total C',
      done() {
        return player[this.layer].total.gte(30)
      },
      effectDescription: '10x A passive.',
    },
    2: {
      requirementDescription: 'Cm3: 1e6 total C',
      done() {
        return player[this.layer].total.gte('1e6')
      },
      effectDescription: '10x A passive,2x B passive.',
    },
    3: {
      requirementDescription: 'Cm4: 5e11 total C',
      done() {
        return player[this.layer].total.gte('5e11')
      },
      effectDescription: '1000x points, 1000x B passive,unlock D.',
    },
  },
  microtabs: {
    stuff: {
      Upgrades: {
        unlocked() {
          return true
        },
        content: ['upgrades'],
      },
      Milestones: {
        unlocked() {
          return true
        },
        content: ['milestones'],
      },
      Challenges: {
        unlocked() {
          return hu('D', 15)
        },
        content: ['challenges'],
      },
    },
  },
  tabFormat: [['infobox', 'introBox'], 'main-display', 'resource-display', , 'prestige-button', ['microtabs', 'stuff'], ['blank', '25px']],
  upgrades: {
    11: {
      title: 'C1',
      description: function () {
        return '100x points, 1x B passive generation.<br>layer C total: <br>' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = 100
        let exp = 0.4
        if (hu('C', 12)) eff = eff * 20
        if (hu('C', 15)) eff = eff * 200
        if (hu('C', 24)) eff = eff * 1e20
        if (hu('C', 25)) eff = eff * 1e30
        if (hm('C', 3)) eff = eff * 1000
        if (inChallenge('C', 11)) eff = 1
        if (n(eff).gte(1e5)) eff = n(eff).div(1e5).pow(0.4).mul(1e5) //Sc28
        if (n(eff).gte(1e10)) eff = n(eff).div(1e10).pow(0.4).mul(1e10) //Sc40
        eff = n(eff)
        return eff
      },
      cost: n(1),
    },
    12: {
      title: 'C2',
      description: '20x points, 10x A and B',
      cost: n(1),
      unlocked() {
        return hu(this.layer, 11)
      },
    },
    13: {
      title: 'C3',
      description: 'C^5 boosts points.',
      cost: n(10),
      unlocked() {
        return hu(this.layer, 12)
      },
      effect() {
        let effp = 5
        if (hu('C', 23)) effp = effp * 5
        if (inChallenge('C', 11)) effp = 0
        eff = player[this.layer].points.max(1).pow(effp)
        if (hu('sc', 15)) eff = eff.pow(ue('sc', 15))
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.25).mul(1e5) //Sc26
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.25).mul(1e10) //Sc31
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.25).mul(1e20) //Sc38
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    14: {
      title: 'C4',
      description: 'B7 ^15.',
      cost: n(25),
      unlocked() {
        return hu(this.layer, 13)
      },
    },
    15: {
      title: 'C5',
      description: '200x points.<br>unlock a new chal.',
      cost: n(50),
      unlocked() {
        return hu(this.layer, 14)
      },
    },
    16: {
      title: 'C6',
      description: 'Softcap Points ^2',
      cost: n(250),
      unlocked() {
        return hu(this.layer, 15)
      },
    },
    21: {
      title: 'C7',
      description: '10x C and 1x C passive generation.',
      cost: n(5e3),
      unlocked() {
        return hu(this.layer, 16)
      },
    },
    22: {
      title: 'C8',
      description: 'B7 ^10.',
      cost: n(2e6),
      unlocked() {
        return hu(this.layer, 21)
      },
    },
    23: {
      title: 'C9',
      description: 'C3 ^5.',
      cost: n(3e6),
      unlocked() {
        return hu(this.layer, 22)
      },
    },
    24: {
      title: 'C10',
      description: '1e20x points and C^1.5.',
      cost: n(1e8),
      unlocked() {
        return hu(this.layer, 23)
      },
    },
    25: {
      title: 'C11',
      description: '1e30x points,50x B and C.',
      cost: n(3e9),
      unlocked() {
        return hu(this.layer, 24)
      },
    },
    26: {
      title: 'C12',
      description: '10x C and Softcap Points ^3',
      cost: n(5e10),
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    31: {
      title: 'C13',
      description: 'E6 and E8 ^2.',
      cost: n('1e235'),
      unlocked() {
        return hu('E', 31)
      },
    },
    32: {
      title: 'C14',
      description: 'Boost E based on C upgrade amount.',
      cost: n('1e240'),
      effect() {
        let bas = 1.5
        let a = n(player.C.upgrades.length).sqrt(0.5)
        let eff = Decimal.pow(bas, a)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc112
        return eff
      },
      unlocked() {
        return hu('C', 31)
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    33: {
      title: 'C15',
      description: 'E3 and E4 boosts each other.<br>(beffore exponents)',
      cost: n('1e245'),
      effect() {
        let eff0 = ue('E', 14).pow(0.6)
        let eff1 = ue('E', 13).pow(0.6)
        if (eff0.gte(2)) eff0 = eff0.div(2).pow(0.5).mul(2) //Sc115
        if (eff1.gte(2)) eff1 = eff1.div(2).pow(0.5).mul(2) //Sc116
        return [eff0, eff1]
      },
      unlocked() {
        return hu(this.layer, 32)
      },
      effectDisplay() {
        return format(ue('C', 33)[0], 3) + 'x E3 and ' + format(ue('C', 33)[1], 3) + 'x E4'
      },
    },
    34: {
      title: 'C16',
      description: 'Unlock Eb4. B gainMult^1.1',
      cost: n('1e248'),
      unlocked() {
        return hc('E', 12)
      },
    },
    35: {
      title: 'C17',
      description: 'E3 and E4 ^1.2. Eb3 and Eb4 base +0.5.',
      cost: n('1e250'),
      unlocked() {
        return hu(this.layer, 34)
      },
    },
    36: {
      title: 'C18',
      description: 'E6, E8 and E13 ^1.5',
      cost: n('5.25e252'),
      unlocked() {
        return hu(this.layer, 35)
      },
    },
  },
  challenges: {
    11: {
      name: 'Cc1',
      completionLimit: 1,
      challengeDescription() {
        return 'Reset your points and points ^0.45,C1-C11 are disabled.'
      },
      unlocked() {
        return hu('D', 15)
      },
      goalDescription: '5e18 points.',
      onEnter() {
        player.points = n(0)
      },
      canComplete() {
        return player.points.gte(5e18)
      },
      rewardDescription: 'x1000 points(ignore most challenge effects) and Softcap points ^1.1, unlock more A upgrades.',
    },
    12: {
      name: 'Cc2',
      completionLimit: 1,
      challengeDescription() {
        return 'Reset your points and D1-D5 are disabled.'
      },
      unlocked() {
        return hu('A', 52)
      },
      onEnter() {
        player.points = n(0)
      },
      goalDescription: '1e42 points.',
      canComplete() {
        return player.points.gte(1e42)
      },
      rewardDescription: 'x8000 points(ignore most challenge effects), A ^1.025.',
    },
  },
  canReset() { return false }
}) //C
