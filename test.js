import test from 'ava'
import scripy from './'

test.cb('main', t => {
  const cmd = scripy('node ./fixture.js cool')
  cmd.on('close', code => {
    t.is(code, 1)
    t.end()
  })
})
