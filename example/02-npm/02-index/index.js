function chunk (list, n) {
  const clist = []
  for (let i = 0; i < list.length; i += n) {
    clist.push(list.slice(i, i + n))
  }
  return clist
}

console.log("chunk(['a', 'b', 'c', 'd'], 2) =", chunk(['a', 'b', 'c', 'd'], 2))

