import { headers } from "next/headers";
import ExperimentA from "./components/ExperimentA";
import ExperimentB from "./components/ExperimentB";
import ExperimentC from "./components/ExperimentC";

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? '' 

  // a trusted nonce'd bootstrap script that sets up the results channel 
  return (
    <div>
      <p>
        Flip the CSP mode in the toggle above, then reload happens automatically.
        Watch which experiments report below and check the DevTools console.
      </p>

      <hr />

      {/* The three experiments */}
      
      <ExperimentA />
      <ExperimentB />
      <ExperimentC />
    </div>
  )
}
