import React from "react";
import { useWizard, Wizard } from "react-use-wizard";

import Layout from "../components/layout";

const Step = ({ number }) => {
  const { handleStep } = useWizard();

  handleStep(() => {
    alert(`Going to step ${number}`);
  });

  return <p>Step {number}</p>;
};

const Footer = () => {
  const {
    nextStep,
    previousStep,
    isLoading,
    activeStep,
    stepCount,
    isLastStep,
    isFirstStep
  } = useWizard();

  return (
    <code>
      <div style={{ display: "flex", gap: "1rem" }}>
        <p>Has previous step: {!isFirstStep ? "✅" : "⛔"}</p>
        <br />
        <p>Has next step: {!isLastStep ? "✅" : "⛔"} </p>
        <br />
        <p>
          Active step: {activeStep + 1} <br />
        </p>
        <br />
        <p>
          Total steps: {stepCount} <br />
        </p>
      </div>
      <div>
        <button
          onClick={() => previousStep()}
          disabled={isLoading || isFirstStep}
        >
          Previous
        </button>
        <button onClick={() => nextStep()} disabled={isLoading || isLastStep}>
          Next
        </button>
      </div>
    </code>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      <Wizard footer={<Footer />}>
        <Step number={1} />
        <Step number={2} />
        <Step number={3} />
      </Wizard>
    </Layout>
  );
};

export default IndexPage;
