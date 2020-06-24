
const load = require('./grab-infos').load
const path = require('path')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const Presets = []
  const snapshot = await load()
  snapshot.forEach((doc) => Presets.push(doc.data()))

  // create page
  actions.createPage({
    path: '/presets',
    component: path.resolve('src/templates/presets.js'),
    context: {
      presets: Presets
    }
  })
}
