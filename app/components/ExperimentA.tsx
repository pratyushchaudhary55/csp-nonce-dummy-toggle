// legit inline script. The server stamps it with the live nonce, so the browser trusts it under CSP.
import { headers } from "next/headers";

export default async function ExperimentA() {
    const nonce = (await headers()).get('x-nonce') ?? ''

    const script = `
        (function () {
            var msg = 'Experiment A ran (legit inline script with correct nonce)'
            console.log('%c[A] ' + msg, 'color: green');
        })();
    `

    return (
        <section>
            <h3> A. legit incline script (correct nonce) </h3>
            <p> should run in every node (carries live nonce) </p>
            <script nonce={nonce} dangerouslySetInnerHTML={{ __html: script }}></script>
        </section>
    )
}
