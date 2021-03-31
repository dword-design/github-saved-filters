import { mapValues } from '@dword-design/functions'
import importFresh from 'import-fresh'

const runTest = options => () => {
  global.window = options.window

  const subject = importFresh('./is-applicable')
  expect(subject).toEqual(options.result)
  delete global.window
}

export default {
  ...({
    issues: { location: { pathname: '/issues' } },
    'issues assigned': { location: { pathname: '/issues/assigned' } },
    pulls: { location: { pathname: '/pulls' } },
    'pulls assigned': { location: { pathname: '/pulls/assigned' } },
  } |> mapValues(window => runTest({ result: true, window }))),
  ...({
    issuesfoo: { location: { pathname: '/issuesfoo' } },
    'non-applicable': { location: { pathname: '/foo' } },
  } |> mapValues(window => runTest({ result: false, window }))),
}
