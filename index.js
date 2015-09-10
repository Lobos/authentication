'use strict'

const KEY = 0
const AUTHTOKEN = 'authentication'
let TOKEN = null

function toArray (key) {
  return key.toString().split('').map(k => {
    return k.charCodeAt()
  })
}

function getKey (keys, pos) {
  pos = pos % keys.length
  return keys[pos]
}

function getToken (key = KEY) {
  if (TOKEN) {
    return TOKEN
  }

  if (!window.localStorage) {
    return null
  }

  let keys = toArray(key),
      token = localStorage.getItem(AUTHTOKEN),
      k

  if (!token) {
    return null
  }

  let ts = token.split('').map((t, i) => {
    k = getKey(keys, i)
    return String.fromCharCode(t.charCodeAt() - k)
  })
  TOKEN = ts.join('')

  return TOKEN
}

function setToken (token, key = KEY) {
  if (!token) {
    return false
  }

  TOKEN = token

  if (!window.localStorage) {
    return true
  }

  let keys = toArray(key),
      k
  let ts = token.split('').map((t, i) => {
    k = getKey(keys, i)
    return String.fromCharCode(t.charCodeAt() + k)
  })
  token = ts.join('')
  localStorage.setItem(AUTHTOKEN, token)
  return true
}

function generateKey () {
  return Math.floor(Math.random() * 10000000000000 + Date.now())
}

export default { getToken, setToken, generateKey }
