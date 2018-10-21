const algos = require('./handAlgorithms')
const Card = require('./card').default
const React = require('react')

const flush = [
  { card: <Card key={1} image={require('../../images/cards/ACE-H.png')} />, value: 14, suit: 'HEARTS', key: 1 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 },
  { card: <Card key={3} image={require('../../images/cards/QUEEN-H.png')} />, value: 12, suit: 'HEARTS', key: 3 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={5} image={require('../../images/cards/10-H.png')} />, value: 10, suit: 'HEARTS', key: 5 },
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
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 }
]

const threeOfAKind = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={26} image={require('../../images/cards/2-D.png')} />, value: 2, suit: 'DIAMONDS', key: 26 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 }
]

const pair = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={25} image={require('../../images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={4} image={require('../../images/cards/JACK-H.png')} />, value: 11, suit: 'HEARTS', key: 4 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 }
]

const twoPair = [
  { card: <Card key={52} image={require('../../images/cards/2-S.png')} />, value: 2, suit: 'SPADES', key: 52 },
  { card: <Card key={39} image={require('../../images/cards/2-C.png')} />, value: 2, suit: 'CLUBS', key: 39 },
  { card: <Card key={25} image={require('../../images/cards/3-D.png')} />, value: 3, suit: 'DIAMONDS', key: 25 },
  { card: <Card key={10} image={require('../../images/cards/5-H.png')} />, value: 5, suit: 'HEARTS', key: 10 },
  { card: <Card key={15} image={require('../../images/cards/KING-D.png')} />, value: 13, suit: 'DIAMONDS', key: 15 },
  { card: <Card key={2} image={require('../../images/cards/KING-H.png')} />, value: 13, suit: 'HEARTS', key: 2 }
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
  expect(algos.isRoyalFlush(sortHand(flush), 'HEARTS')).toBe(true)
})

test('isStraightFlush() detects straight flush', () => {
  expect(algos.isStraightFlush(sortHand(flush), 'HEARTS')).toBe(true)
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