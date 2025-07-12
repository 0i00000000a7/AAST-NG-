addLayer('ssc', {
  infoboxes: {
    introBox: {
      title: 'Super Softcap',
      body() {
        return 'This layer displays all the Super Softcap in all now.'
      },
    },
    ScBox: {
      title: 'Super Softcap Formulas',
      body() {
        return 'This tab displays all the Softcap Formulas in all now'
      },
    },
  },
  name: 'Super Softcaps',
  startData() {
    return {
      unlocked: true,
      points: n(0),
    }
  },
  symbol: 'Ss',
  color: 'rgb(255, 197, 215)',
  row: 'side',
  tooltip() {
    return 'Super Softcaps'
  },
  resource: 'Super Softcap Points',
  update(diff) {
    // player.ssc.points = tmp.ssc.spCal
  },
  tabFormat: {
    Softcaps: {
      content: [
        ['infobox', 'introBox'],
        [
          'display-text',
          function () {
            return superSoftcapCal()[0]
          },
        ],
      ],
    },
    'Formulas': {
      content: [
        ['infobox', 'ScBox'],
        [
          'display-text',
          function () {
            return superSoftcapCal()[1]
          },
        ],
      ],
    },
  },
  layerShown() {
    return true
  },
}) //SS

const superSoftcapDatas = [
  {
    unlocked: () => ue('A', 11).gte(10),
    requirement: '10x A1 mult',
    effects: 'A1 mult is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte(100),
    requirement: '100 points/s',
    effects: 'points generation is overflowed to 0.5',
  },
  {
    unlocked: () => layers.A.antimatterEffect().gte(5),
    requirement: "^5.00 antimatter's effect",
    effects: "antimatter's effect is power-softcapped to 0.5",
  },
  {
    unlocked: () => ue('B', 11).gte(50),
    requirement: '50x B1 mult',
    effects: 'points generation is overflowed to 0.5',
  },
  {
    unlocked: () => ue('A', 24).gte(50),
    requirement: '50x A10 mult',
    effects: 'A10 mult is overflowed to 0.75',
  },
  {
    unlocked: () => layers.A.antimatterEffect().gte(12.5),
    requirement: "^12.50 antimatter's effect",
    effects: "antimatter's effect is overflowed to 0.65",
  },
  {
    unlocked: () => ue('C', 11).gte(2000),
    requirement: '2000x C1 mult',
    effects: 'C1 mult is overflowed to 0.75',
  },
  {
    unlocked: () => layers.A.antimatterGain().gte(10),
    requirement: '10 Antimatter/sec',
    effects: 'Antimatter generation is overflowed to 0.5',
  },
  {
    unlocked: () => layers.B.gainMult().gte(1e50),
    requirement: '1e50 B GainMult',
    effects: 'B GainMult is overflowed to 0.5',
  },
  {
    unlocked: () => layers.D.challenges[11].effect().gte(1.5),
    requirement: '1.5 Dc1 Effect',
    effects: 'Dc1 Effect is power-softcapped to 0.1',
  },
  {
    unlocked: () => layers.D.challenges[11].effect().gte(1.5),
    requirement: '1e10 antimatter generation',
    effects: 'Antimatter generation is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte(Number.MAX_VALUE),
    requirement: '1.7976e308 points/s',
    effects: 'points generation is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte("1e500"),
    requirement: '1e500 points/s',
    effects: 'points generation is double-overflowed to 0.75',
  },
  {
    unlocked: () => getPointGen().gte("1e500"),
    requirement: '^1.00 mastered A7 effect',
    effects: 'mastered A7 effect is power-softcapped to 0.1',
  },
].map((item, index) => ({
  ...item,
  id: index + 1,
}))

function superSoftcapCal() {
  const unlockedData = superSoftcapDatas.filter((item) => item.unlocked())
  const requirements = unlockedData.map((item) => `SSc${item.id}: ${item.requirement}`)
  const effects = unlockedData.map((item) => `SSc${item.id}: ${item.effects}`)

  return [requirements.join('<br>'), effects.join('<br>')]
}
