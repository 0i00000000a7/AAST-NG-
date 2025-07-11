addLayer('D', {
  name: 'D',
  symbol: 'D',
  position: 1,
  startData() {
    return {
      unlocked: false,
      points: n(0),
    }
  },
  passiveGeneration() {
    let a = n(0)
    if (hm('D', 0)) a = a.add(20)
    if (hm('F', 3)) a = a.add(10)
    if (hm('B', 5)) a = a.add(80)
    return a
  },
  color: '#720202',
  requires: n(1e12),
  resource: 'D',
  baseResource: 'C',
  baseAmount() {
    return player.C.points
  },
  type: 'normal',
  exponent: 0.2,
  gainExp() {
    return n(1)
  },
  row: 1,
  hotkeys: [
    {
      key: 'd',
      description: 'D: Reset for D points',
      onPress() {
        if (canReset(this.layer)) doReset(this.layer)
      },
    },
  ],
  layerShown() {
    return (player.D.unlocked || hm('C', 3)) && gcs('te', 25) >= 1
  },
  gainMult() {
    mult = n(1)
    mult = mult.mul(hu('sc', 21) ? ue('sc', 21) : 1)
    mult = mult.mul(hu(this.layer, 12) ? 2 : 1)
    mult = mult.mul(hu(this.layer, 13) ? 2 : 1)
    mult = mult.mul(hu('A', 61) ? ue('A', 61) : 1)
    mult = mult.mul(hu('D', 32) ? ue('D', 32) : 1)
    mult = mult.mul(buyableEffect('B', 22))
    mult = mult.mul(hu('E', 93) ? ue('E', 93) : 1)
    mult = mult.mul(hu('a', 16) ? ue('a', 16) : 1)

    mult = mult.pow(hu('A', 52) ? 1.5 : 1)
    mult = mult.pow(hc('A', 32) ? 1.5 : 1)

    if (mult.gte(1e4)) mult = mult.div(1e4).pow(0.4).mul(1e4) //Sc56
    if (mult.gte(1e10)) mult = mult.div(1e10).pow(0.4).mul(1e10) //Sc66
    if (mult.gte(1e20)) mult = mult.div(1e20).pow(0.1).mul(1e20) //Sc68
    if (mult.gte(1e30)) mult = mult.div(1e30).pow(0.5).mul(1e30) //Sc79
    if (mult.gte(1e256)) mult = mult.div(1e256).pow(0.3).mul(1e256) //Sc222
    return mult
  },
  directMult() {
    let mult = n(1)
    mult = mult.mul(buyableEffect('E', 13))
    if (hu('E', 22)) mult = mult.mul(ue('E', 22)[1])
    if (hu('sc', 21) && hm('E', 6)) mult = mult.mul(ue('sc', 21))
    if (hc('E', 22)) mult = mult.mul(challengeEffect('E', 22)[1])
    mult = mult.mul(hu('E', 82) ? ue('E', 82) : 1)
    return mult
  },
  branches: ['C'],
  canReset() {
    return !hm('D', 0) && player.C.points.gte(1e12)
  },
  resetsNothing() {
    return true
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
      requirementDescription: 'Dm1: 100 total D',
      done() {
        return player[this.layer].total.gte(100)
      },
      effectDescription: '20x D passive but disable D prestige.',
    },
    1: {
      requirementDescription: 'Dm2: 2500 total D',
      done() {
        return player[this.layer].total.gte(2500)
      },
      effectDescription: '100x A/B passive,1x C passive.',
    },
    2: {
      requirementDescription: 'Dm3: 1e6 total D',
      done() {
        return player[this.layer].total.gte('1e6')
      },
      effectDescription: '1e4x A, 1000x B and 10x C passive,unlock B buyable.',
    },
    3: {
      requirementDescription: 'Dm4: 1e10 total D',
      done() {
        return player[this.layer].total.gte('1e10')
      },
      effectDescription: '1e5x A,unlock a chal.',
    },
    4: {
      requirementDescription: 'Dm5: 1e720 total D',
      done() {
        return player[this.layer].total.gte('1e720')
      },
      effectDescription: 'Unlock more D upgrades.',
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
          return hu('B', 56)
        },
        content: ['challenges'],
      },
    },
  },
  tabFormat: [['infobox', 'introBox'], 'main-display', 'resource-display', 'prestige-button', ['microtabs', 'stuff'], ['blank', '25px']],
  upgrades: {
    11: {
      title: 'D1',
      description: function () {
        return '1000x points.<br>layer D total:<br>' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = 1000
        let exp = 0.4
        if (hu('D', 14)) eff = eff * 10000
        if (hu('D', 25)) eff = eff * 10000
        if (hu('D', 41)) eff = eff * 1e7
        if (inChallenge('C', 12)) eff = 1
        if (hu('sc', 22)) eff = n(eff).pow(ue('sc', 22))
        if (hu('D', 25)) eff = n(eff).pow(ue('D', 25))
        eff = n(eff)
        if (eff.gte(1e6)) eff = eff.div(1e6).pow(0.5).mul(1e6) //Sc45
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.25).mul(1e20) //Sc52
        if (eff.log10().gte(100)) eff = n(10).pow(eff.log10().sub(100).pow(0.1).add(100)) //Sc58
        if (eff.log10().gte(1e7)) eff = n(10).pow(eff.log10().sub(1e7).pow(0.1).add(1e7)) //Sc124
        if (hu('sc', 32)) eff = eff.pow(ue('sc', 32))
        return eff
      },
      cost: n(10),
    },
    12: {
      title: 'D2',
      description: '2x D.',
      cost: n(20),
      unlocked() {
        return hu(this.layer, 11)
      },
    },
    13: {
      title: 'D3',
      description: '2x D.',
      cost: n(50),
      unlocked() {
        return hu(this.layer, 12)
      },
    },
    14: {
      title: 'D4',
      description: '10000x points.',
      cost: n(2000),
      unlocked() {
        return hu(this.layer, 13)
      },
    },
    15: {
      title: 'D5',
      description: 'D^0.8 boosts points.<br>unlock a C chal.',
      cost: n(3000),
      unlocked() {
        return hu(this.layer, 14)
      },
      effect() {
        let effpow = 0.8
        if (inChallenge('C', 12)) effpow = 0
        let eff = n(player[this.layer].points.max(1).pow(effpow))
        if (hu('D', 23)) eff = eff.pow(2)
        if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.5).mul(1e3) //Sc46
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.5).mul(1e5) //Sc51
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    16: {
      title: 'D6',
      description: 'D^0.1 boosts Softcap points. (beffore exp and softcaps).<br>unlock more Softcap Upgrades.',
      cost: n(4000),
      unlocked() {
        return hu(this.layer, 15)
      },
      effect() {
        let effpow = 0.1
        let eff = n(player[this.layer].points.max(1).pow(effpow))
        return eff
      },
      effectDisplay() {
        return format(this.effect()) + 'x'
      },
    },
    21: {
      title: 'D7',
      description: 'D upg boosts points.<br> (base is 2, can be boosted by Bbs).',
      cost: n(1e6),
      effect() {
        let a = player.D.upgrades.length
        let base = n(2).add(buyableEffect('B', 13))
        let eff = Decimal.pow(base, a)
        if (eff.gte(1e10)) eff = eff.div(1e10).pow(0.5).mul(1e10) //Sc62
        if (eff.gte(1e20)) eff = eff.div(1e20).pow(0.5).mul(1e20) //Sc64
        return eff
      },
      unlocked() {
        return hu('A', 52)
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    22: {
      title: 'D8',
      description: 'B ^1.2.',
      cost: n(1.2e6),
      unlocked() {
        return hu(this.layer, 21)
      },
    },
    23: {
      title: 'D9',
      description: 'D5 ^2.',
      cost: n(1.5e6),
      unlocked() {
        return hu(this.layer, 22)
      },
    },
    24: {
      title: 'D10',
      description: 'Softcap Points boosts Softcap Points',
      cost: n(1.8e6),
      effect() {
        let effd9 = player.sc.points.add(1)
        if (hu('D', 34)) effd9 = effd9.pow(2)
        return effd9
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
      unlocked() {
        return hu(this.layer, 23)
      },
    },
    25: {
      title: 'D11',
      description: 'D boosts D1',
      tooltip: 'From now on, the D upgrades will bring a lot of softcaps',
      effect() {
        let eff = player.D.points.add(1).pow(0.5).div(1e3).add(1)
        if (hu('sc', 23)) eff = eff.pow(ue('sc', 23))
        if (hu('E', 41)) eff = eff.pow(1.1)
        if (eff.gte(1e5)) eff = eff.div(1e5).pow(0.25).mul(1e5) //Sc60
        return eff
      },
      effectDisplay() {
        return '^' + format(ue(this.layer, this.id))
      },
      cost: n(2e6),
      unlocked() {
        return hu(this.layer, 24)
      },
    },
    26: {
      title: 'D12',
      description: 'D ^1.25 boosts C',
      tooltip: 'It will be… incredible',
      effect() {
        let eff = player.D.points.add(1).pow(1.25)
        if (eff.gte(1e8)) eff = eff.div(1e8).pow(0.5).mul(1e8) //Sc53
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
      cost: n(2.25e6),
      unlocked() {
        return hu(this.layer, 25)
      },
    },
    31: {
      title: 'D13',
      description: "D12's effect^0.5 boosts A and B",
      cost: n(6e6),
      effect() {
        let eff = ue('D', 26).pow(0.5)
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
      unlocked() {
        return hu(this.layer, 26)
      },
    },
    32: {
      title: 'D14',
      description: 'D^0.3 boosts D.',
      cost: n(8e6),
      effect() {
        let eff = player.D.points.max(1).pow(0.3)
        if (hu('D', 35)) eff = eff.pow(2)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc55
        if (eff.gte(1e4)) eff = eff.div(1e4).pow(0.5).mul(1e4) //Sc61
        return eff
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
      unlocked() {
        return hu(this.layer, 31)
      },
    },
    33: {
      title: 'D15',
      description: '1e10x A.',
      cost: n('3e9'),
      unlocked() {
        return hu(this.layer, 32)
      },
    },
    34: {
      title: 'D16',
      description: 'D10 ^2.',
      cost: n('6e10'),
      unlocked() {
        return hu(this.layer, 33)
      },
    },
    35: {
      title: 'D17',
      description: 'D14 ^2 and unlock more B upgrades.',
      cost: n('7.5e10'),
      unlocked() {
        return hu(this.layer, 34)
      },
    },
    36: {
      title: 'D18',
      description: "D boosts Bb1-2's base.",
      cost: n('1e13'),
      effect() {
        let eff = player.D.points.max(1).log(5).pow(0.5)
        if (hu('B', 42)) eff = eff.pow(2)
        if (hu('B', 46)) eff = eff.pow(1.25)
        if (hu('B', 54)) eff = eff.pow(1.5)
        if (hu('sc', 24)) eff = eff.pow(ue('sc', 24))
        if (eff.gte(1e3)) eff = eff.div(1e3).pow(0.5).mul(1e3) //Sc218 It should be Sc70
        return eff
      },
      effectDisplay() {
        return '+' + format(ue(this.layer, this.id))
      },
      unlocked() {
        return hu(this.layer, 35)
      },
    },
    41: {
      title: 'D19',
      description: "Re-count the Softcaps which weren't counted normally. (because i forgot to count. qwq)",
      cost: n('1e720'),
      unlocked() {
        return hm('D', 4)
      },
    },
    42: {
      title: 'D20',
      description: 'Boost Alpha based on C beyond 1e1000.',
      tooltip: 'You may need to reset for F for the second time.',
      cost: n('1e750'),
      effect() {
        let eff = player.C.points.max('1e1000').log(10).sub(999).pow(2)
        return eff
      },
      unlocked() {
        return hu('D', 41)
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    43: {
      title: 'D21',
      description: 'F boosts Alpha gain.',
      cost: n('1e770'),
      effect() {
        let eff = player.F.points.div(10).pow(10).add(1)
        eff = sc(eff, n(1e6), 0.5) //Sc232
        eff = sc(eff, n(1e8), 0.5) //Sc234
        return eff
      },
      unlocked() {
        return hu('D', 42)
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    44: {
      title: 'D22',
      description: 'Beta boosts F gain.',
      cost: n('1e785'),
      effect() {
        let eff = player.b.points.div(10).pow(0.2).add(1)
        eff = sc(eff, n(4), 0.5) //Sc233
        eff = sc(eff, n(10), 0.5) //Sc235
        return eff
      },
      unlocked() {
        return hu('D', 43)
      },
      effectDisplay() {
        return format(ue(this.layer, this.id)) + 'x'
      },
    },
    45: {
      title: 'D23',
      description: 'E14/E17 ^1.2.',
      cost: n('1e6784'),
      unlocked() {
        return hu('D', 44)
      },
    },
  },
  challenges: {
    11: {
      name: 'Dc1',
      completionLimit: 1,
      challengeDescription() {
        return "Sc72 starts at 1 point /sec and it's boosted."
      },
      unlocked() {
        return hu('B', 56)
      },
      onEnter() {
        player.points = n(0)
      },
      tooltip: 'Reset your points when entering.',
      goalDescription: '37.37 points /sec',
      canComplete() {
        return getPointGen().gte(37.37)
      },
      rewardDescription: "All Bbs' base x2",
    },
    12: {
      name: 'Dc2',
      completionLimit: 1,
      challengeDescription() {
        return "All Bbs' effects are capped."
      },
      unlocked() {
        return hu('B', 56)
      },
      goalDescription: '1e80 points. /sec',
      onEnter() {
        player.points = n(0)
      },
      tooltip: 'Reset your points when entering.',
      canComplete() {
        return getPointGen().gte(1e80)
      },
      rewardDescription: 'B Gainmult ^1.25.',
    },
    21: {
      name: 'Dc3',
      completionLimit: 1,
      challengeDescription() {
        return 'Points gain is slog(points).'
      },
      unlocked() {
        return hu('B', 66)
      },
      goalDescription: '250 points.',
      onEnter() {
        player.points = n(0)
      },
      tooltip: 'Reset your points when entering.',
      canComplete() {
        return player.points.gte(250)
      },
      rewardDescription: 'Points ^1.1.',
    },
    22: {
      name: 'Dc4',
      completionLimit: 1,
      challengeDescription() {
        return 'Points gain is 0 /sec. You start with 10 points.<br>Current A gainMult:' + format(tmp.A.gainMult)
      },
      unlocked() {
        return hu('B', 66)
      },
      goalDescription: 'get 1e65 A gainMult.',
      onEnter() {
        player.points = n(10)
      },
      tooltip: 'Reset your points to 10 when entering.',
      canComplete() {
        return tmp.A.gainMult.gte(1e65)
      },
      rewardDescription: 'A and B x1e15 and A ^1.25.',
    },
  },
}) //D
