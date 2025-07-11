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
  symbol: 'SS',
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
    'Softcap Formulas': {
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
    unlocked: () => getPointGen().gte(500),
    requirement: '500 points/s',
    effects: 'points generation is tetraflowed to 0.5',
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
