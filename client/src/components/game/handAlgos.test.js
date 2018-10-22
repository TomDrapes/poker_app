const algos = require('./handAlgorithms')
const Card = require('./card').default
const React = require('react')

const royalFlush = [
  { card: <Card key={1} image={require('../../images/cards/ACE-H.png')} />, value: 14, suit: 'HEARTS', key: 1 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={5} image={require('../../images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
  { card: <Card key={33} image={require('../../images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
  { card: <Card key={34} image={require('../../images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 }
]

const straightFlush = [
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={5} image={require('../../images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
  { card: <Card key={6} image={require('../../images/cards/9-H.png')} />, value: 9, suit: 'HEARTS', key: 6 },
  { card: <Card key={33} image={require('../../images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
  { card: <Card key={34} image={require('../../images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 }
]

const flush = [
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={5} image={require('../../images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
  { card: <Card key={11} image={require('../../images/cards/4-H.png')} />, value: 4, suit: 'HEARTS', key: 11 },
  { card: <Card key={33} image={require('../../images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
  { card: <Card key={34} image={require('../../images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 }
]

const fullHouse = [
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={15} image={require('../../images/cards/KING-D.png')} />, value: 13, suit: 'DIAMONDS', key: 15 },
  { card: <Card key={28} image={require('../../images/cards/KING-C.png')} />, value: 13, suit: 'CLUBS', key: 28 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={33} image={require('../../images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
  { card: <Card key={34} image={require('../../images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 }
]

const straight = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={38} image={require('../../images/cards/3-C.png')} />, value: 3, suit: 'CLUBS', key: 38 },
  { card: <Card key={24} image={require('../../images/cards/4-D.png')} />, value: 4, suit: 'DIAMONDS', key: 24 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={9} image={require('../../images/cards/6-H.png')} />, value: 6, suit: 'HEARTS', key: 9 },
  { card: <Card key={40} image={require('../../images/cards/ACE-S.png')} />, value: 14, suit: 'SPADES', key: 40 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 }
]

const fourOfAKind = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={26} image={require('../../images/cards/2-D.png')} />, value: 2, suit: 'DIAMONDS', key: 26 },
  { card: <Card key={13} image={require('../../images/cards/2-H.png')} />, value: 2, suit: 'HEARTS', key: 13 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 }
]

const threeOfAKind = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={26} image={require('../../images/cards/2-D.png')} />, value: 2, suit: 'DIAMONDS', key: 26 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 }
]

const pair = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={25} image={require('../../images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 }
]

const twoPair = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={25} image={require('../../images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={15} image={require('../../images/cards/KING-D.png')} />, value: 13, suit: 'DIAMONDS', key: 15 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 }
]

const aceHighCard = [
  { card: <Card key={1} image={require('../../images/cards/ACE-H.png')} />, value: 14, suit: 'HEARTS', key: 1 },
  { card: <Card key={23} image={require('../../images/cards/5-D.png')} />, value: 5, suit: 'DIAMONDS', key: 23 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={18} image={require('../../images/cards/10-D.png')} />, value: 10, suit: 'DIAMONDS', key: 18},
  { card: <Card key={19} image={require('../../images/cards/9-D.png')} />, value: 9, suit: 'DIAMONDS', key: 19 },
  { card: <Card key={20} image={require('../../images/cards/8-D.png')} />, value: 8, suit: 'DIAMONDS', key: 20 },
  { card: <Card key={51} image={require('../../images/cards/3-S.png')} />, value: 3, suit: 'SPADES', key: 51 }
]

const deck = [
  { card: <Card key={1} image={require('../../images/cards/ACE-H.png')} />, value: 14, suit: 'HEARTS', key: 1 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={5} image={require('../../images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
  { card: <Card key={6} image={require('../../images/cards/9-H.png')} />, value: 9, suit: 'HEARTS', key: 6 },
  { card: <Card key={7} image={require('../../images/cards/8-H.png')} />, value: 8, suit: 'HEARTS', key: 7 },
  { card: <Card key={8} image={require('../../images/cards/7-H.png')} />, value: 7, suit: 'HEARTS', key: 8 },
  { card: <Card key={9} image={require('../../images/cards/6-H.png')} />, value: 6, suit: 'HEARTS', key: 9 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={11} image={require('../../images/cards/4-H.png')} />, value: 4, suit: 'HEARTS', key: 11 },
  { card: <Card key={12} image={require('../../images/cards/3-H.png')} />, value: 3, suit: 'HEARTS', key: 12 },
  { card: <Card key={13} image={require('../../images/cards/2-H.png')} />, value: 2, suit: 'HEARTS', key: 13 },
  { card: <Card key={14} image={require('../../images/cards/ACE-D.png')} />, value: 14, suit: 'DIAMONDS', key: 14 },
  { card: <Card key={15} image={require('../../images/cards/KING-D.png')} />, value: 13, suit: 'DIAMONDS', key: 15 },
  { card: <Card key={16} image={require('../../images/cards/QUEEN-D.png')} />, value: 12, suit: 'DIAMONDS', key: 16 },
  { card: <Card key={17} image={require('../../images/cards/JACK-D.png')} />, value: 11, suit: 'DIAMONDS', key: 17 },
  { card: <Card key={18} image={require('../../images/cards/10-D.png')} />, value: 10, suit: 'DIAMONDS', key: 18},
  { card: <Card key={19} image={require('../../images/cards/9-D.png')} />, value: 9, suit: 'DIAMONDS', key: 19 },
  { card: <Card key={20} image={require('../../images/cards/8-D.png')} />, value: 8, suit: 'DIAMONDS', key: 20 },
  { card: <Card key={21} image={require('../../images/cards/7-D.png')} />, value: 7, suit: 'DIAMONDS', key: 21 },
  { card: <Card key={22} image={require('../../images/cards/6-D.png')} />, value: 6, suit: 'DIAMONDS', key: 22 },
  { card: <Card key={23} image={require('../../images/cards/5-D.png')} />, value: 5, suit: 'DIAMONDS', key: 23 },
  { card: <Card key={24} image={require('../../images/cards/4-D.png')} />, value: 4, suit: 'DIAMONDS', key: 24 },
  { card: <Card key={25} image={require('../../images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
  { card: <Card key={26} image={require('../../images/cards/2-D.png')} />, value: 2, suit: 'DIAMONDS', key: 26 },
  { card: <Card key={27} image={require('../../images/cards/ACE-C.png')} />, value: 14, suit: 'CLUBS', key: 27 },
  { card: <Card key={28} image={require('../../images/cards/KING-C.png')} />, value: 13, suit: 'CLUBS', key: 28 },
  { card: <Card key={29} image={require('../../images/cards/QUEEN-C.png')} />, value: 12, suit: 'CLUBS', key: 29 },
  { card: <Card key={30} image={require('../../images/cards/JACK-C.png')} />, value: 11, suit: 'CLUBS', key: 30 },
  { card: <Card key={31} image={require('../../images/cards/10-C.png')} />, value: 10, suit: 'CLUBS', key: 31 },
  { card: <Card key={32} image={require('../../images/cards/9-C.png')} />, value: 9, suit: 'CLUBS', key: 32 },
  { card: <Card key={33} image={require('../../images/cards/8-C.png')} />, value: 8, suit: 'CLUBS', key: 33 },
  { card: <Card key={34} image={require('../../images/cards/7-C.png')} />, value: 7, suit: 'CLUBS', key: 34 },
  { card: <Card key={35} image={require('../../images/cards/6-C.png')} />, value: 6, suit: 'CLUBS', key: 35 },
  { card: <Card key={36} image={require('../../images/cards/5-C.png')} />, value: 5, suit: 'CLUBS', key: 36 },
  { card: <Card key={37} image={require('../../images/cards/4-C.png')} />, value: 4, suit: 'CLUBS', key: 37 },
  { card: <Card key={38} image={require('../../images/cards/3-C.png')} />, value: 3, suit: 'CLUBS', key: 38 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={40} image={require('../../images/cards/ACE-S.png')} />, value: 14, suit: 'SPADES', key: 40 },
  { card: <Card key={41} image={require('../../images/cards/KING-S.png')} />, value: 13, suit: 'SPADES', key: 41 },
  { card: <Card key={42} image={require('../../images/cards/QUEEN-S.png')} />, value: 12, suit: 'SPADES', key: 42 },
  { card: <Card key={43} image={require('../../images/cards/JACK-S.png')} />, value: 11, suit: 'SPADES', key: 43 },
  { card: <Card key={44} image={require('../../images/cards/10-S.png')} />, value: 10, suit: 'SPADES', key: 44 },
  { card: <Card key={45} image={require('../../images/cards/9-S.png')} />, value: 9, suit: 'SPADES', key: 45 },
  { card: <Card key={46} image={require('../../images/cards/8-S.png')} />, value: 8, suit: 'SPADES', key: 46 },
  { card: <Card key={47} image={require('../../images/cards/7-S.png')} />, value: 7, suit: 'SPADES', key: 47 },
  { card: <Card key={48} image={require('../../images/cards/6-S.png')} />, value: 6, suit: 'SPADES', key: 48 },
  { card: <Card key={49} image={require('../../images/cards/5-S.png')} />, value: 5, suit: 'SPADES', key: 49 },
  { card: <Card key={50} image={require('../../images/cards/4-S.png')} />, value: 4, suit: 'SPADES', key: 50 },
  { card: <Card key={51} image={require('../../images/cards/3-S.png')} />, value: 3, suit: 'SPADES', key: 51 },
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 }
]

// order hands by card values 
function sortHand(hand){
  return hand.sort((a,b) => {
    return a.value - b.value
  })
}

test('isFlush() detects flush', () => {
  expect(algos.isFlush(sortHand(flush))).toBe('HEARTS');
});

test('isRoyalFlush() detects royal flush', () => {
  expect(algos.isRoyalFlush(sortHand(royalFlush), 'HEARTS')).toBe(true)
})

test('isStraightFlush() detects straight flush', () => {
  expect(algos.isStraightFlush(sortHand(straightFlush), 'HEARTS')).toBe(true)
})

test('isFullHouse() detects full house', () => {
  expect(algos.isFullHouse(sortHand(fullHouse))).toBe(true)
})

test('isStraight() detects straight', () => {
  expect(algos.isStraight(sortHand(straight))).toBe(true)
})

test('isOfAKind() detects four of a kind', () => {
  expect(algos.isOfAKind(sortHand(fourOfAKind))).toEqual({count: 4, value: 2})
})

test('isOfAKind() detects three of a kind', () => {
  expect(algos.isOfAKind(sortHand(threeOfAKind))).toEqual({count: 3, value: 2})
})

test('isOfAKind() detects pair', () => {
  expect(algos.isOfAKind(sortHand(pair))).toEqual({count: 2, value: 2})
})

test('isTwoPair() detects two pair', () => {
  expect(algos.isTwoPair(sortHand(twoPair))).toBe(true)
})

test('determineBestHand() finds royal flush', () => {
  const hand = [royalFlush[0].key, royalFlush[1].key]
  const flop = [royalFlush[2].key,royalFlush[3].key, royalFlush[4].key, royalFlush[5].key, royalFlush[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: 'Royal Flush', value: 58})
})

test('determineBestHand() finds straight flush', () => {
  const hand = [straightFlush[0].key, straightFlush[1].key]
  const flop = [straightFlush[2].key,straightFlush[3].key, straightFlush[4].key, straightFlush[5].key, straightFlush[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: 'Straight Flush', value: 57})
})

test('determineBestHand() finds four of a kind', () => {
  const hand = [fourOfAKind[0].key, fourOfAKind[1].key]
  const flop = [fourOfAKind[2].key, fourOfAKind[3].key, fourOfAKind[4].key, fourOfAKind[5].key, fourOfAKind[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Four two's`, value: 44})
})

test('determineBestHand() finds full house', () => {
  const hand = [fullHouse[0].key, fullHouse[1].key]
  const flop = [fullHouse[2].key, fullHouse[3].key, fullHouse[4].key, fullHouse[5].key, fullHouse[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Full House`, value: 43})
})

test('determineBestHand() finds flush', () => {
  const hand = [flush[0].key, flush[1].key]
  const flop = [flush[2].key,flush[3].key, flush[4].key, flush[5].key, flush[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: 'Flush', value: 42})
})

test('determineBestHand() finds straight', () => {
  const hand = [straight[0].key, straight[1].key]
  const flop = [straight[2].key, straight[3].key, straight[4].key, straight[5].key, straight[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Straight`, value: 41})
})

test('determineBestHand() finds three of a kind', () => {
  const hand = [threeOfAKind[0].key, threeOfAKind[1].key]
  const flop = [threeOfAKind[2].key, threeOfAKind[3].key, threeOfAKind[4].key, threeOfAKind[5].key, threeOfAKind[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Three two's`, value: 28})
})

test('determineBestHand() finds two pair', () => {
  const hand = [twoPair[0].key, twoPair[1].key]
  const flop = [twoPair[2].key, twoPair[3].key, twoPair[4].key, twoPair[5].key, twoPair[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Two pair`, value: 27})
})

test('determineBestHand() finds pair', () => {
  const hand = [pair[0].key, pair[1].key]
  const flop = [pair[2].key, pair[3].key, pair[4].key, pair[5].key, pair[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Pair of two's`, value: 14})
})

test('determineBestHand() finds high card', () => {
  const hand = [aceHighCard[0].key, aceHighCard[1].key]
  const flop = [aceHighCard[2].key, aceHighCard[3].key, aceHighCard[4].key ,aceHighCard[5].key, aceHighCard[6].key,]
  expect(algos.determineBestHand(hand, flop, deck)).toEqual({type: `Ace of HEARTS`, value: 13})
})