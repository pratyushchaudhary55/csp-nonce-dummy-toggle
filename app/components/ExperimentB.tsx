export default function ExperimentB() {
    // B1: no nonce attribute 
    const noNonce = `
        (function () {
            var msg = 'Experiment B1 ran (attacker inline script, no nonce)'
            console.log('%c[B1] ' + msg, 'color: red');
        })();
    `

    // B2: wrong/stale nonce 
    const wrongNonce = `
        (function () {
            var msg = 'Experiment B2 ran (attacker inline script, wrong nonce)'
            console.log('%c[B2] ' + msg, 'color: red');
        })();
    `

    return (
        <section>
            <h3> B. attacker inline script (no / wrong nonce) </h3>
            <p> should be blocked under enforce, run under Off/Report </p>
            {/* B1 */}
            <script dangerouslySetInnerHTML={{ __html: noNonce }}></script>
            {/* B2 */}
            <script nonce="wrong-nonce-123" dangerouslySetInnerHTML={{ __html: wrongNonce }}></script>
        </section>
    )    
}