import React, { useEffect, useState } from "react";
import storyline from "./content/storyline.json";
import Battle from "./Battle";
import Normal from "./Normal";
import defaultPlayer from "./content/defaultplayer.json";

export default function Game() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(
    storyline.find((scene) => scene.id === currentStep)
  );
  const [player, setPlayer] = useState(defaultPlayer);

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
      {currentStepData.type === "Victory" && (
        <Victory
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          player={player}
          setplayer={setPlayer}
          currentStepData={currentStepData}
          setCurrentStepData={setCurrentStepData}
        />
      )}
    </>
  );
}
