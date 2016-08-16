const ghpages = require('gh-pages')
const path = require('path')
const fs = require('fs')

console.log('Modify link for github page')

let html = fs.readFileSync(path.join(__dirname, 'build/index.html'), 'utf8')
html = html.replace(/\/static/gi, 'static')
fs.writeFileSync(path.join(__dirname, 'build/index.html'), html)

console.log('Start Publish')
ghpages.publish(path.join(__dirname, 'build'), (err) => {
  console.log('Running...')
  if (err) console.log(err)
  else console.log('Publish to github pages successfully!')
})
