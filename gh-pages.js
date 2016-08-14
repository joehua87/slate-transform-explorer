const ghpages = require('gh-pages')
const path = require('path')

// TODO Make sure staic is built (should be use gulp)
console.log('Start Publish')
ghpages.publish(path.join(__dirname, 'build'), (err) => {
  console.log('Running...')
  if (err) console.log(err)
  else console.log('Publish to github pages successfully!')
})
