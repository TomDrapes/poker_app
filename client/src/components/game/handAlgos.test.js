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

// Order hand by value for straights
flush.sort((a,b) => {
  return a.value - b.value
})

test('isFlush detects flush', () => {
  expect(algos.isFlush(flush)).toBe('HEARTS');
});

test('function isRoyalFlush detect royal flush', () => {
  expect(algos.isRoyalFlush(flush, 'HEARTS')).toBe(true)
})

test('isStraightFlush detect straight flush', () => {
  expect(algos.isStraightFlush(flush, 'HEARTS')).toBe(true)
})