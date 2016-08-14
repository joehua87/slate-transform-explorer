/* eslint-disable no-console */

import readMetadata from 'read-metadata'
import path from 'path'
import fs from 'fs'
import glob from 'glob'
import { fromJS } from 'immutable'

const basePath = path.join(__dirname, '..', 'test/transforms/fixtures')
const yamlPattern = `${basePath}/**/*.yaml`
const jsPattern = `${basePath}/**/*.js`

const yamlFiles = glob.sync(yamlPattern, {realpath: true})
console.log(`Got ${yamlFiles.length} yamlFiles`)

const yamlData = yamlFiles.map((file) => ({
  path: file.replace(`${basePath}/`, '').replace('.yaml', '').split(/\//gi),
  data: readMetadata.sync(file),
}))

const jsFiles = glob.sync(jsPattern, {realpath: true})
console.log(`Got ${jsFiles.length} jsFiles`)

const jsData = jsFiles.map((file) => ({
  path: file.replace(`${basePath}/`, '').replace('.js', '').split(/\//gi),
  data: fs.readFileSync(file, 'utf8')
}))

let output = fromJS({})
yamlData.forEach((item) => (output = output.setIn(item.path, item.data)))
jsData.forEach((item) => (output = output.setIn(item.path, item.data)))

fs.writeFileSync(path.join(__dirname, 'src/output.json'), JSON.stringify((output.toJS()), null, 2))
