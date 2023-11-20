import React, { useEffect, useState } from "react";
import storyline from "./content/storyline.json";
import Battle from "./Battle";
import Normal from "./Normal";
import Victory from "./Victory";
import Gameover from "./Gameover";
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
      {currentStepData.type === "victory" && (
        <Victory
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          player={player}
          setplayer={setPlayer}
          currentStepData={currentStepData}
          setCurrentStepData={setCurrentStepData}
        />
      )}
      {currentStepData.type === "gameover" && (
        <Gameover
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
