function escape(str) {
  let string = str
  if (!(str instanceof String))
    string = JSON.stringify(str)
  
  return string
    .replace(/\[/g, '\\[')
    .replace(/]/g, '\\]')
    .replace(/ /g, '')
    .replace(/"/g, '')
}

console.log(escape([[1, 2, 3], [2]]))
console.log(escape('[[1, 2, 3], [2]]'))