import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import yaml from 'js-yaml'
import axios from 'axios'

import { createId } from '@allmaps/id'
import { parseIiif } from '@allmaps/iiif-parser'

const __dirname = new URL('.', import.meta.url).pathname

const iiifMapCollecitons = yaml.load(
  fs.readFileSync(
    path.join(__dirname, '..', 'iiif-map-collections.yml'),
    'utf8'
  )
)

async function run() {
  for (let org of iiifMapCollecitons) {
    for (let example of org.examples) {
      const iiifUrl = example.url
      const id = await createId(iiifUrl)

      try {
        console.log(iiifUrl)
        const response = await axios.get(iiifUrl)
        const iiif = parseIiif(response.data)

        const filename = `${id}.${example.type}.json`

        // console.log(iiif)
        // console.log(filename)
        // console.log(id)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
// console.log('testss')

// pak alle bestanden uit yaml
// - kijk of bestaat
// - kijk of type klopt met inhoud
// - kijk of goed parset
// - kijk cors voor images!
// en kijk of quality en format klopt!
// - als manifest, pak images, vergelijk IDs

run()
