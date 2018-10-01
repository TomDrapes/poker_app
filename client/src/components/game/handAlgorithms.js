import React from 'react'
import Card from './card'

export function isFlush (hand) {
  let hearts = 0
  let diamonds = 0
  let spades = 0
  let clubs = 0

  for (let i = 0; i < hand.length; i++) {
    switch (hand[i].suit) {
      case 'HEART': hearts++
        break
      case 'DIAMOND': diamonds++
        break
      case 'CLUB': clubs++
        break
      case 'SPADE': spades++
        break
      default: break
    }
  }

  if (hearts >= 5) {
    return 'HEART'
  } else if (diamonds >= 5) {
    return 'DIAMOND'
  } else if (spades >= 5) {
    return 'SPADE'
  } else if (clubs >= 5) {
    return 'CLUB'
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

