function setItem (key: string, value: object | string): void {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

function getItem (key: string): object {
  const value = window.localStorage.getItem(key) || 'null'
  return JSON.parse(value)
}

export default {
  setItem,
  getItem
}
