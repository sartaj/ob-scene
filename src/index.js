// globals obscene_compiled

import obscene from './ob-scene.js'
import controls from './user/controls.js'
import renderer from './render/index.js'

module.exports.init = (config) => {
  // obscene_compiled should be a global variable exposed by the obscene compiler
  const conf = config || obscene_compiled

  if (!conf) throw new Error('Please include an obscene-compiled js file before the init')
  // Init Controls, State, and Renderer
  const coreUIAdded$ = renderer.init()
  obscene.init(conf, coreUIAdded$)
  controls.init()
}
