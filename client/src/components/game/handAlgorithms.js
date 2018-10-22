import React from 'react'
import Card from './card'

export function sum(a,b){
  return a + b
}


export function isFlush (hand) {
  let hearts = 0
  let diamonds = 0
  let spades = 0
  let clubs = 0

  for (let i = 0; i < hand.length; i++) {
    switch (hand[i].suit) {
      case 'HEARTS': hearts++
        break
      case 'DIAMONDS': diamonds++
        break
      case 'CLUBS': clubs++
        break
      case 'SPADES': spades++
        break
      default: break
    }
  }

  if (hearts >= 5) {
    return 'HEARTS'
  } else if (diamonds >= 5) {
    return 'DIAMONDS'
  } else if (spades >= 5) {
    return 'SPADES'
  } else if (clubs >= 5) {
    return 'CLUBS'
  } else {
    return 'NO_FLUSH'
  }
}

export function isRoyalFlush (hand, suit) {
  let ace = false
  let king = false
  let queen = false
  let jack = false
  let ten = false

  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === 14 && hand[i].suit === suit) {
      ace = true
    } else if (hand[i].value === 13 && hand[i].suit === suit) {
      king = true
    } else if (hand[i].value === 12 && hand[i].suit === suit) {
      queen = true
    } else if (hand[i].value === 11 && hand[i].suit === suit) {
      jack = true
    } else if (hand[i].value === 10 && hand[i].suit === suit) {
      ten = true
    }
  }
  if (ace && king && queen && jack && ten) {
    return true
  }
  return false
}

export function isStraightFlush (h, suit) {
  let hand = JSON.parse(JSON.stringify(h))
  // Add ace with value 1 to check for other possible straights
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === 14) {
      hand.push({ card: <Card key={14} image={require('../../images/cards/ACE-D.png')} />, value: 1, suit: suit })
    }
  }

  // Remove any duplicates which interfere with checking for straights
  let ofAKinds = isOfAKind(hand)
  for (let x = 0; x < ofAKinds.count - 1; x++) {
    for (let y = 0; y < hand.length; y++) {
      if (hand[y].value === ofAKinds.value &&
        hand[y].suit !== suit) {
        hand.splice(y, 1)
      }
    }
  }

  for (let j = 0; j < hand.length - 4; j++) {
    if (hand[j + 1].value === hand[j].value + 1 &&
      hand[j + 2].value === hand[j].value + 2 &&
      hand[j + 3].value === hand[j].value + 3 &&
      hand[j + 4].value === hand[j].value + 4 &&
      hand[j].suit === suit && hand[j + 1].suit === suit &&
      hand[j + 2].suit === suit && hand[j + 3].suit === suit &&
      hand[j + 4].suit === suit) {
      return true
    }
  }
  return false
}

export function isOfAKind (hand) {
  let count = 1
  let value = 0
  for (let i = 0; i < hand.length; i++) {
    let tempCount = 1
    for (let j = i + 1; j < hand.length; j++) {
      if (hand[i].value === hand[j].value) {
        tempCount++
      }
    }
    if (tempCount >= 2 && tempCount > count) {
      count = tempCount
      value = hand[i].value
    }
  }
  return {count, value}
}

export function isFullHouse (h) {
  let hand = JSON.parse(JSON.stringify(h))
  let threeOfAKind = false
  let pair = false
  for (let i = 0; i < hand.length - 2; i++) {
    if (hand[i].value === hand[i + 1].value &&
      hand[i].value === hand[i + 2].value) {
      threeOfAKind = true
      hand.splice(i, 3)
    }
  }

  for (let j = 0; j < hand.length - 1; j++) {
    if (hand[j].value === hand[j + 1].value) {
      pair = true
    }
  }
  if (threeOfAKind && pair) {
    return true
  }
  return false
}

export function isStraight (h) {
  let hand = JSON.parse(JSON.stringify(h))
  // Add ace with value 1 to check for other possible straights
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].value === 14) {
      hand.push({ card: <Card key={14} image={require('../../images/cards/ACE-D.png')} />, value: 1, suit: hand[i].suit })
    }
  }
  // Remove any duplicates which interfere with checking for straights
  let ofAKinds = isOfAKind(hand)
  for (let x = 0; x < ofAKinds.count - 1; x++) {
    for (let y = 0; y < hand.length; y++) {
      if (hand[y].value === ofAKinds.value) {
        hand.splice(y, 1)
      }
    }
  }

  for (let j = 0; j < hand.length - 4; j++) {
    if (hand[j + 1].value === hand[j].value + 1 &&
      hand[j + 2].value === hand[j].value + 2 &&
      hand[j + 3].value === hand[j].value + 3 &&
      hand[j + 4].value === hand[j].value + 4) {
      return true
    }
  }
  return false
}

export function isTwoPair (h) {
  let hand = JSON.parse(JSON.stringify(h))
  let pairs = 0
  for (let i = 0; i < hand.length - 1; i++) {
    if (hand[i].value === hand[i + 1].value) {
      pairs++
      hand.splice(i, 2)
    }
  }

  for (let j = 0; j < hand.length - 1; j++) {
    if (hand[j].value === hand[j + 1].value) {
      pairs++
    }
  }
  if (pairs === 2) {
    return true
  }
  return false
}

  /* Checks players hand against the flopped cards to determine what
   the best hand the player can make and returns it as a string.
   TODO: change this to return { type: string, value: number }
*/
export function determineBestHand (hand, flop, deck) {
 
  const playersHand = hand.map(key => {
    return(
      deck[key-1]
    )
  })
  

  let f = flop.map(key => {
    return(
      deck[key-1]
    )
  })

  const cards = playersHand.concat(f).sort(function (a, b) {
    return a.value - b.value
  })

  const flush = isFlush(cards)
  const ofAkind = isOfAKind(cards)

  if (flush !== 'NO_FLUSH') {
    if (isRoyalFlush(cards, flush)) {
      return { type: 'Royal Flush', value: 58}
    } else if (isStraightFlush(cards, flush)) {
      return { type: 'Straight Flush', value: 57 }
    }
  }

  if (ofAkind.count === 4) {
    switch(ofAkind.value){
      case 14: return { type: `Four Ace's`, value: 56}
      case 13: return { type: `Four King's`, value: 55}
      case 12: return { type: `Four Queen's`, value: 54}
      case 11: return { type: `Four Jack's`, value: 53}
      case 10: return { type: `Four ten's`, value: 52}
      case 9: return { type: `Four nine's`, value: 51}
      case 8: return { type: `Four eight's`, value: 50}
      case 7: return { type: `Four seven's`, value: 49}
      case 6: return { type: `Four six's`, value: 48}
      case 5: return { type: `Four five's`, value: 47}
      case 4: return { type: `Four four's`, value: 46}
      case 3: return { type: `Four three's`, value: 45}
      case 2: return { type: `Four two's`, value: 44}
      default: return { type: 'ERROR', value: 0 }
    }
  }

  if (isFullHouse(cards)) {
    return { type: 'Full House', value: 43}
  }

  if (flush !== 'NO_FLUSH') {
    return { type: 'Flush', value: 42}
  }

  if (isStraight(cards)) {
    return { type: 'Straight', value: 41}
  }

  if (ofAkind.count === 3) {
    switch(ofAkind.value){
      case 14: return { type: `Three Ace's`, value: 40}
      case 13: return { type: `Three King's`, value: 39}
      case 12: return { type: `Three Queen's`, value: 38}
      case 11: return { type: `Three Jack's`, value: 37}
      case 10: return { type: `Three ten's`, value: 36}
      case 9: return { type: `Three nine's`, value: 35}
      case 8: return { type: `Three eight's`, value: 34}
      case 7: return { type: `Three seven's`, value: 33}
      case 6: return { type: `Three six's`, value: 32}
      case 5: return { type: `Three five's`, value: 31}
      case 4: return { type: `Three four's`, value: 30}
      case 3: return { type: `Three three's`, value: 29}
      case 2: return { type: `Three two's`, value: 28}
      default: return { type: 'ERROR', value: 0 }
    }
  }

  if (isTwoPair(cards)) {
    return { type: 'Two pair', value: 27}
  }

  if (ofAkind.count === 2) {
    switch(ofAkind.value){
      case 14: return { type: `Pair of Ace's`, value: 26}
      case 13: return { type: `Pair of King's`, value: 25}
      case 12: return { type: `Pair of Queen's`, value: 24}
      case 11: return { type: `Pair of Jack's`, value: 23}
      case 10: return { type: `Pair of ten's`, value: 22}
      case 9: return { type: `Pair of nine's`, value: 21}
      case 8: return { type: `Pair of eight's`, value: 20}
      case 7: return { type: `Pair of seven's`, value: 19}
      case 6: return { type: `Pair of six's`, value: 18}
      case 5: return { type: `Pair of five's`, value: 17}
      case 4: return { type: `Pair of four's`, value: 16}
      case 3: return { type: `Pair of three's`, value: 15}
      case 2: return { type: `Pair of two's`, value: 14}
      default: return { type: 'ERROR', value: 0 }
    }
  }

  const h = playersHand.sort(function (a, b) {
    return a.value - b.value
  })

  switch(h[1].value){
    case 14: return { type: 'Ace of ' + h[1].suit, value: 13}
    case 13: return { type: 'King of ' + h[1].suit, value: 12}
    case 12: return { type: 'Queen of ' + h[1].suit, value: 11}
    case 11: return { type: 'Jack of ' + h[1].suit, value: 10}
    case 10: return { type: 'Ten of ' + h[1].suit, value: 9}
    case 9: return { type: 'Nine of ' + h[1].suit, value: 8}
    case 8: return { type: 'Eight of ' + h[1].suit, value: 7}
    case 7: return { type: 'Seven of ' + h[1].suit, value: 6}
    case 6: return { type: 'Six of ' + h[1].suit, value: 5}
    case 5: return { type: 'Five of ' + h[1].suit, value: 4}
    case 4: return { type: 'Four of ' + h[1].suit, value: 3}
    case 3: return { type: 'Three of ' + h[1].suit, value: 2 }
    case 2: return { type: 'Two of ' + h[1].suit, value: 1 }
    default: return { type: 'ERROR', value: 0 }
  }
}
