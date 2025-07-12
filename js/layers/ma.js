addLayer("ma", {
  infoboxes: {
    introBox: {
      title: 'Mastery',
      body() {
        return 'After reaching 1.80e308 points, you will be able to master your previous contents. The mastered upgrades can give you more bonuses and Qols.'
      },
    },
  },
  name: "Mastery",
  symbol: 'Ma',
  startData() {
    return {
      unlocked: false,
      points: n(0),
      mastered: {
        "A": [],
        "B": [],
        "C": [],
        "D": [],
        "sc": [],
      }
    }
  },
  row: 'side',
  color: "#ff9f7f",
  resource: 'Mastered Upgrades',
  tabFormat: {
    Mastery: {
      content: [
        ["infobox", "introBox"],
        "main-display",
        ["blank", "30px"],
        ["clickable", 11]
      ]
    }
  },
  effect() {
    return player.ma.points.add(1).pow(0.6)
  },
  effectDescription() {
    return `which raises point generation to ${format(this.effect())}.`
  },
  clickables: {
    11: {
      title: "Mastery",
      display() {
        let action
        if (gcs("ma", 11)) action = "Stop"
        else action = "Start"
        return action + " mastering upgrades."
      },
      style: {
        height: "200px",
        width: "200px",
      },
      canClick() { return true },
      onClick() {
        setClickableState("ma", 11, !gcs("ma", 11))
      }
    }
  },
  update() {
    player.ma.points = n(sumArrayLengths(player.ma.mastered))
  },
  unlocked() {
    return hasAchievement("ac", 35)
  }
})

function masteredUpgrade(layer, id) {
  return (player.ma.mastered[layer].includes(toNumber(id)) || player.ma.mastered[layer].includes(id.toString())) && !tmp[layer].deactivated
}

function canMasterUpgrade(layer, id) {
  let upg = tmp[layer].upgrades[id]
  if (tmp[layer].deactivated) return false
  if (tmp[layer].upgrades[id].canMaster === false) return false
  if (!hasUpgrade(layer, id)) return false
  let cost = tmp[layer].upgrades[id].masterCost
  if (cost !== undefined) return canAffordPurchase(layer, upg, cost)

  return false
}

const mu = masteredUpgrade

function masterUpgrade(layer, id) {
  if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
  let upg = tmp[layer].upgrades[id]
  if (!player[layer].unlocked || player[layer].deactivated) return
  if (!tmp[layer].upgrades[id].unlocked) return
  if (!canMasterUpgrade(layer, id)) return
  if (player.ma.mastered[layer].includes(id)) return
  player[layer].points = player[layer].points.sub(upg.masterCost)
  player.ma.mastered[layer].push(id)
  needCanvasUpdate = true
}

function sumArrayLengths(obj) {
  let total = 0;
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      total += obj[key].length;
    }
  }
  return total;
}