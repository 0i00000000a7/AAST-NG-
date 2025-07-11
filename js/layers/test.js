addLayer('te', {
  infoboxes: {
    introBox: {
      title: 'Test',
      body() {
        return 'A layer for tests'
      },
    },
  },
  name: 'test',
  symbol: 'T',
  position: 0,
  startData() {
    return {
      unlocked() {
        return true
      },
    }
  },
  color: '#ffffff',
  type: 'none',
  exponent: 1,
  row: 3,
  layerShown() {
    return true
  },
  devSpeedCal() {
    let dev = 1
    if (gcs('te', 11)) dev = 0
    if (isEndgame()) dev = 0
    return dev
  },
  update(diff) {
    player.softcap = n(softcapCal()[0])
  },
  clickables: {
    11: {
      title() {
        return 'Pause'
      },
      display: 'Pause the game. Click it again to resume.',
      onClick() {
        if (gcs('te', 11) == 1) setClickableState('te', 11, 0)
        else setClickableState('te', 11, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    12: {
      title() {
        return 'Play Time'
      },
      display() {
        let a = " isn't "
        if (gcs('te', 12) == 1) a = ' is'
        return 'Play time ' + a + ' displayed! '
      },
      onClick() {
        if (gcs('te', 12) == 1) setClickableState('te', 12, 0)
        else setClickableState('te', 12, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    13: {
      title() {
        return 'FPS (Frames Per Second)'
      },
      display() {
        let a = " isn't "
        if (gcs('te', 13) == 1) a = ' is'
        return 'FPS ' + a + ' displayed! '
      },
      onClick() {
        if (gcs('te', 13) == 1) setClickableState('te', 13, 0)
        else setClickableState('te', 13, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    14: {
      title() {
        return 'Raw Points'
      },
      display() {
        let a = " isn't "
        if (gcs('te', 14) == 1) a = ' is'
        return 'Raw Points (points gain without softcaps) ' + a + ' displayed! '
      },
      onClick() {
        if (gcs('te', 14) == 1) setClickableState('te', 14, 0)
        else setClickableState('te', 14, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    15: {
      title() {
        return 'Toggle Shift'
      },
      display() {
        let a = " isn't "
        if (shitDown == true) a = ' is '
        return 'Shift' + a + 'clicked down. You can click on a layer to toggle its tooltip. (need related setting)'
      },
      onClick() {
        shitDown = !shitDown
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    21: {
      title() {
        return 'Softcap Amount'
      },
      display() {
        let a = " isn't "
        if (gcs('te', 21) == 1) a = ' is'
        return 'Softcap Amount ' + a + ' displayed! '
      },
      onClick() {
        if (gcs('te', 21) == 1) setClickableState('te', 21, 0)
        else setClickableState('te', 21, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    22: {
      title() {
        return 'Layer GainMults'
      },
      display() {
        let a = " aren't "
        if (gcs('te', 22) == 1) a = ' are '
        return "All layers' GainMult" + a + 'displayed! '
      },
      onClick() {
        if (gcs('te', 22) == 1) setClickableState('te', 22, 0)
        else setClickableState('te', 22, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    23: {
      title() {
        return 'Softcap Point'
      },
      display() {
        let a = " isn't "
        if (gcs('te', 23) == 1) a = ' is '
        return 'Softcap Point' + a + 'displayed! '
      },
      onClick() {
        if (gcs('te', 23) == 1) setClickableState('te', 23, 0)
        else setClickableState('te', 23, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    24: {
      title() {
        return 'Layer DirectMults'
      },
      display() {
        let a = " aren't "
        if (gcs('te', 24) == 1) a = ' are '
        return "Layers' DirectMults" + a + 'displayed! '
      },
      onClick() {
        if (gcs('te', 24) == 1) setClickableState('te', 24, 0)
        else setClickableState('te', 24, 1)
      },
      canClick() {
        return true
      },
      unlocked() {
        return true
      },
    },
    25: {
      title() {
        return 'Layer Display Mode'
      },
      display() {
        if (gcs('te', 25) == 2) return 'Currently: Only English Letter Layers'
        if (gcs('te', 25) == 0) return 'Currently: Only Greek Letter Layers'
        return 'Currently: All Layers'
      },
      onClick() {
        if (gcs('te', 25) == 0) setClickableState('te', 25, 1)
        else {
          if (gcs('te', 25) == 1) setClickableState('te', 25, 2)
          else setClickableState('te', 25, 0)
        }
      },
      canClick() {
        return true
      },
      unlocked() {
        return hasAchievement('ac', 71)
      },
    },
  },
  tabFormat: [
    'main-display',
    'resource-display',
    'milestones',
    'clickables',
    [
      'display-text',
      function () {
        let a = ''
        let layers = ['A', 'B', 'a', 'b', 'C', 'D', 'E', 'F']
        if (gcs('te', 22))
          for (i = 0; i < layers.length; i++) {
            if (tmp[layers[i]].layerShown) a = a + '<br>' + layers[i] + "'s GainMult: " + format(tmp[layers[i]].gainMult)
          }
        if (gcs('te', 24))
          for (i = 0; i < layers.length; i++) {
            if (tmp[layers[i]].layerShown) a = a + '<br>' + layers[i] + "'s DirectMult: " + format(tmp[layers[i]].directMult)
          }
        return a
      },
    ],
  ],
  milestones: {
    0: {
      requirementDescription: 'toggle devSpeed',
      done() {
        return false
      },
      effectDescription:
        '<del>The Game is too Slow? Use this to speed it up! Anyhow, I promise this game is balanced at normal speed. The buttons reffer to +1x,+2x,+4x,+8x speed, you can speed the game up to 16x.</del>',
    },
  },
}) //T
