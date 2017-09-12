const fs = require('fs')
const fetch = require('node-fetch')

const url = 'https://raw.githubusercontent.com/Dinu/country-nationality-list/master/countries.json'

// const file = JSON.parse(await readFileThunk('./countries.json'))

// const readFileThunk = (src) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(src, { encoding: 'utf-8' }, (err, data) => {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }

const run = async () => {
  const json = await fetch(url)
    .then(res => res.json())

  const result = {
    source: url,
    value: json.map(e => {
      return {
        alpha_2_code: e.alpha_2_code,
        en_short_name: e.en_short_name,
        nationality: e.nationality
      }
    })
  }
  fs.writeFile('./result.json', JSON.stringify(result, null, 4), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File has been created')
  })
}

run()
