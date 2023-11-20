import React, { useEffect, useState } from "react";
import storyline from "./content/storyline.json";
import Battle from "./Battle";
import Normal from "./Normal";
import useTimeout from "./useTimeOut";
import defaultPlayer from "./content/defaultplayer.json";

export default function Game() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(999);
  const [player, setPlayer] = useState(defaultPlayer);
  const [hasTimeElapsed, setHasTimeElapsed] = React.useState(false);

  useEffect(() => {
    setCurrentStepData(storyline.find((step) => step.id === currentStep));
  }, [currentStep]);

  // Check if currentStepData is undefined before rendering
  if (!currentStepData) {
    return null;
  }

  return (
    <>
      {currentStepData.type === "normal" && (
        <>
          <Normal
            className="fade"
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            player={player}
            setplayer={setPlayer}
            currentStepData={currentStepData}
            setCurrentStepData={setCurrentStepData}
          />
        </>
      )}
      {currentStepData.type === "battle" && (
        <Battle
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          player={player}
          setPlayer={setPlayer}
          currentStepData={currentStepData}
          setCurrentStepData={setCurrentStepData}
        />
      )}
    </>
  );
}
