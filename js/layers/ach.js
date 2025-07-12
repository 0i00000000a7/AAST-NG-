addLayer('ac', {
  startData() {
    return {
      unlocked: true,
    }
  },
  color: 'yellow',
  row: 'side',
  tooltip() {
    return 'Achievements'
  },
  achievementPopups: true,
  achievements: {
    11: {
      name: '1. You Gotta Start Softcaps Somewhere',
      done() {
        return player.A.total.gte('1')
      },
      tooltip: 'get 1 A',
    },
    12: {
      name: '2. Unconstant',
      done() {
        return hu('A', 14)
      },
      tooltip: 'get A4',
    },
    13: {
      name: '3. Dis-self Boosts',
      done() {
        return hu('A', 15)
      },
      tooltip: 'get A5',
    },
    14: {
      name: '4. 100 is Well',
      done() {
        return player.A.total.gte('100')
      },
      tooltip: 'get 100 A',
    },
    15: {
      name: '5. Logged',
      done() {
        return hu('A', 24)
      },
      tooltip: 'get A10',
    },
    16: {
      name: '6. Why not Prestige',
      done() {
        return player.B.total.gte('1')
      },
      tooltip: 'get 1 B',
    },
    17: {
      name: '7. Why not Softcaps',
      done() {
        return player.softcap.gte('5')
      },
      tooltip: 'get 5 softcaps',
    },
    21: {
      name: '8. Constant^√2',
      done() {
        return hu('B', 15)
      },
      tooltip: 'get B1-B5',
    },
    22: {
      name: '9. Primary Automation^2',
      done() {
        return hu('B', 23)
      },
      tooltip: 'get B9',
    },
    23: {
      name: '10. Not so Challenging',
      done() {
        return hu('B', 25)
      },
      tooltip: 'unlock A chal',
    },
    24: {
      name: '11. Challenged',
      done() {
        return hc('A', 11)
      },
      tooltip: 'complete Ac1',
    },
    25: {
      name: '12. Challenged*3',
      done() {
        return hc('A', 21)
      },
      tooltip: 'complete Ac3',
    },
    26: {
      name: '13. Row 1 Full',
      done() {
        return hu('B', 36)
      },
      tooltip: 'get B18',
    },
    27: {
      name: '14. Struggling for Points',
      done() {
        return player.points.gte(1e12)
      },
      tooltip: 'get 1e12 points.',
    },
    31: {
      name: '15. Row 2 why does Prestige',
      done() {
        return player.C.total.gte('1')
      },
      tooltip: 'unlock C',
    },
    32: {
      name: '16. Hidden Upgrades',
      done() {
        return hu('A', 41)
      },
      tooltip: 'get A19',
    },
    33: {
      name: '17. A set of Timewall',
      done() {
        return hu('A', 46)
      },
      tooltip: 'get A24',
    },
    34: {
      name: '18. Not Clickable',
      done() {
        return hu('C', 26)
      },
      tooltip: 'get C12',
    },
    35: {
      name: '19. Thanks no Reset',
      done() {
        return player.D.total.gte(1)
      },
      tooltip: 'unlock D',
    },
    36: {
      name: '20. Constant^3',
      done() {
        return hu('D', 14)
      },
      tooltip: 'get D1-D4',
    },
    37: {
      name: '21. Hyper Reduce',
      done() {
        return ue('A', 11).gte(1e30)
      },
      tooltip: 'get the <del>first</del> exponential normal softcap (Sc37)',
    },
    41: {
      name: '22. Hidden Upgrades^2',
      done() {
        return hu('A', 52)
      },
      tooltip: 'get A26',
    },
    42: {
      name: '23. Imperfect Exponential',
      done() {
        return hu('D', 21)
      },
      tooltip: 'get D7',
    },
    43: {
      name: '24. First Buyable',
      done() {
        return hm('D', 2)
      },
      tooltip: 'unlock B buyable',
    },
    44: {
      name: '25. Row 1 Boosts',
      done() {
        return hu('B', 41)
      },
      tooltip: 'unlock Bb2',
    },
    45: {
      name: '26. More Powerful',
      done() {
        return hu('B', 44)
      },
      tooltip: 'get B22',
    },
    46: {
      name: '27. Multi Effect',
      done() {
        return hu('B', 52)
      },
      tooltip: 'get B26',
    },
    47: {
      name: '28. Deserve it',
      done() {
        return player.points.gte(1e100)
      },
      tooltip: 'get a googol(1e100) points',
    },
    51: {
      name: '29. Remarkable',
      done() {
        return hm('B', 0)
      },
      tooltip: 'get a B milestone',
    },
    52: {
      name: "30. Isn't it too early?",
      done() {
        return hc('A', 32)
      },
      tooltip: 'complete Ac6',
    },
    53: {
      name: '31. Googol again?',
      done() {
        return player.A.total.gte('1e100')
      },
      tooltip: 'get 1e100 A',
    },
    54: {
      name: '32. Feel Free',
      done() {
        return hm('B', 2)
      },
      tooltip: 'autobuy B buyable',
    },
    55: {
      name: '33. A Real Wall',
      done() {
        return hc('D', 21)
      },
      tooltip: 'complete Dc3',
    },
    56: {
      name: '34. Age of Automation',
      done() {
        return hm('B', 5)
      },
      tooltip: 'Auto buy A buyables.',
    },
    57: {
      name: '35. Age of Destabilization',
      done() {
        return player.points.gte('1.80e308')
      },
      tooltip: 'Get 1.80e308 points. <br>Reward: Unlock Mastery.'
    },
    61: {
      name: '36. Year in B',
      done() {
        return hm('B', 6)
      },
      tooltip: 'get 3.65e365 B.',
    },
    62: {
      name: '37. Year in Points',
      done() {
        return player.points.gte('3.65e365')
      },
      tooltip: 'get 3.65e365 points',
    },
    63: {
      name: '38. A set of Timewall^36',
      done() {
        return hu('A', 66)
      },
      tooltip: 'get A36',
    },
    64: {
      name: '39. The Grand Finale',
      done() {
        return challengeCompletions('A', 41) >= 10
      },
      tooltip: 'complete Ac7 for 10 times.',
    },
    65: {
      name: "40. 'E'asy Game",
      done() {
        return player.E.total.gte('1')
      },
      tooltip: 'get 1 E',
    },
    66: {
      name: "41. 'Multi Effect'",
      done() {
        return hu('E', 16)
      },
      tooltip: 'get E6',
    },
    67: {
      name: '42. Eternal Challenges',
      done() {
        return hm('E', 2)
      },
      tooltip: 'unlock E challenges',
    },
    71: {
      name: '43. Fractal Engine',
      done() {
        return challengeCompletions('A', 41) >= 10.24
      },
      tooltip: 'complete Ac7 for 10.24 times.',
    },
    72: {
      name: '44. E Billionaire',
      done() {
        return player.E.total.gte('1e9')
      },
      tooltip: 'get 1e9 E',
    },
    73: {
      name: '45. Just for E',
      done() {
        return challengeCompletions('E', 11) >= 3
      },
      tooltip: 'complete Ec1x3',
    },
    74: {
      name: '46. A bigger Timewall',
      done() {
        return challengeCompletions('E', 12) >= 2
      },
      tooltip: 'complete Ec2x2',
    },
    75: {
      name: '47. Shown Upgrades',
      done() {
        return hu('C', 36)
      },
      tooltip: 'get C18',
    },
    76: {
      name: '48. Toooooooo Early???!!!',
      done() {
        return hu('E', 45)
      },
      tooltip: 'unlock Bb10',
    },
    77: {
      name: '49. Capped Amount',
      done() {
        return gba('E', 11).gte(40)
      },
      tooltip: 'Reach the cap of a E buyable.',
    },
    81: {
      name: "50. Here's the Guy",
      done() {
        return player.B.points.gte('6.16e616')
      },
      tooltip: 'get 6.16e616 B',
    },
    82: {
      name: '51. ABout Challenging DEstruction…',
      done() {
        return challengeCompletions('E', 22) >= 1
      },
      tooltip: 'complete Ec4x1',
    },
    83: {
      name: '52. Maelstrom Silenced',
      done() {
        return gba('E', 24).gte(40)
      },
      tooltip: 'Reach the cap of All E buyables.',
    },
    84: {
      name: '53. Powerful 700',
      done() {
        return player.B.points.gte('1e700')
      },
      tooltip: 'get 1e700 B',
    },
    85: {
      name: '54. No more Walls?',
      done() {
        return player.softcap.gte(150)
      },
      tooltip: 'get 150 softcaps',
    },
    86: {
      name: '55. The EMpire',
      done() {
        return hm('E', 11)
      },
      tooltip: 'unlock Em',
    },
    87: {
      name: '56. Less or Equal than 0.0001',
      done() {
        return layers.E.buyables[13].cost().lte(0.0001)
      },
      tooltip: 'Make the cost of Eb3 less or equal than 0.0001.',
    },
    91: {
      name: '57. Em Boosted',
      done() {
        return player.E.Em.gte('1e10')
      },
      tooltip: 'get 1e10 Em',
    },
    92: {
      name: '58. Googol E',
      done() {
        return player.E.points.gte('1e100')
      },
      tooltip: 'get 1e100 E',
    },
    93: {
      name: '59. Massively',
      done() {
        return player.A.points.gte('1e1000')
      },
      tooltip: 'get 1e1000 A!!',
    },
    94: {
      name: '60. Struggling again',
      done() {
        return challengeCompletions('E', 32) >= 1
      },
      tooltip: 'complete Ec6x1',
    },
    95: {
      name: '61. Ek ruby',
      done() {
        return hm('E', 16)
      },
      tooltip: 'unlock Ek',
    },
    96: {
      name: '62. 10 Rows of Upgrades',
      done() {
        return hu('E', 101)
      },
      tooltip: 'get E55',
    },
    97: {
      name: '63. The Answer to Everything',
      done() {
        return gba('E', 11).gte(42)
      },
      tooltip: 'get 42 Eb1',
    },
    101: {
      name: '64. GOODRAGE',
      done() {
        return player.E.points.gte('2e222')
      },
      tooltip: 'get 2e222 E',
    },
    102: {
      name: '65. Getting slower again',
      done() {
        return hu('E', 104)
      },
      tooltip: 'get E58',
    },
    103: {
      name: '66. Raising exp',
      done() {
        return challengeCompletions('E', 42) >= 2
      },
      tooltip: 'complete Ec8x2',
    },
    104: {
      name: '67. Experienced',
      done() {
        return challengeCompletions('E', 41) >= 5
      },
      tooltip: 'complete Ec7x5',
    },
    105: {
      name: '68. Reasonable Upgrades',
      done() {
        return hu('E', 106)
      },
      tooltip: 'get E60',
    },
    106: {
      name: '69. Constructed Realm',
      done() {
        return challengeCompletions('E', 42) >= 5
      },
      tooltip: 'complete Ec8x5',
    },
    107: {
      name: '70. Infinite Energy -Overdoze-',
      done() {
        return player.E.points.gte('1.80e308')
      },
      tooltip: 'get 1.80e308 E.',
    },
    111: {
      name: '71. Another World',
      done() {
        return player.F.points.gte(1)
      },
      tooltip: 'get 1 F.',
    },
    112: {
      name: '72. Sparkle New Life',
      done() {
        return player.a.points.gte(1)
      },
      tooltip: 'get 1 Alpha.',
    },
    113: {
      name: '73. Capped Thoroughly',
      done() {
        return player.softcap.gte(200)
      },
      tooltip: 'get 200 Softcaps.',
    },
    114: {
      name: '74. Useful Bonuses',
      done() {
        return hu('a', 26)
      },
      tooltip: 'get α12.',
    },
    115: {
      name: '75. Auto Level++',
      done() {
        return hm('F', 2)
      },
      tooltip: 'auto buy A~E upgrades.',
    },
    116: {
      name: '76. Lucky D',
      done() {
        return player.D.points.gte('7.77e777')
      },
      tooltip: 'get 7.77e777 D.',
    },
    117: {
      name: '76. Beta Error',
      done() {
        return player.b.points.gte(1)
      },
      tooltip: 'get 1 Beta.',
    },
    121: {
      name: '77. Rich in E',
      done() {
        return player.E.points.gte('1e400')
      },
      tooltip: 'get 1e400 E.',
    },
  },
  tabFormat: [
    'blank',
    [
      'display-text',
      function () {
        return "<h3 style='color: yellow;'>Achievements: " + player.ac.achievements.length + '/77 </h3>'
      },
    ],
    'blank',
    'blank',
    'achievements',
  ],
}) //A
