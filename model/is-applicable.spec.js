import importFresh from 'import-fresh'
import { mapValues } from '@dword-design/functions'

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
  } |> mapValues(window => runTest({ window, result: true }))),
  ...({
    'non-applicable': { location: { pathname: '/foo' } },
    issuesfoo: { location: { pathname: '/issuesfoo' } },
  } |> mapValues(window => runTest({ window, result: false }))),
}
