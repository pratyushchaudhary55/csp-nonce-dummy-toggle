// realistic XSS: an app renders untrusted 'user-supplied content' as raw HTML, without sanitizing it.

import { unstable_SuspenseList } from "react"

const untrustedUserContent = `
  <p>Nice post! <img src="x" onerror="
    (function () {
      var msg = 'Experiment C ran (injected img onerror handler fired)';
      console.log('%c[C] ' + msg, 'color: red');
    })()
  "></p>
`

export default function ExperimentC() {
    return (
        <section>
            <h3> C. injected user content </h3>
            <p> renders untrusted HTML </p>
            <div dangerouslySetInnerHTML={{ __html: untrustedUserContent }} />
        </section>
    )
}