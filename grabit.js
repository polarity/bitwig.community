require('dotenv').config({
  path: '.env.production'
})
const grab = require('./grab-infos').grabPresets
const save = require('./grab-infos').save

/**
 * helper
 * used to transfer from gitub to firebase
 * can be delete once chefkoch adds directly to
 * firebase
 */
const main = async () => {
  const presets = await grab()
  for await (const preset of presets) {
    try {
      await save(preset)
    } catch (err) {
      console.log(err)
    }
  }
}

main()
