import storyline from "./content/storyline.json";
import React, { useEffect, useState } from "react";

export default function Normal({
  currentStep,
  setCurrentStep,
  currentStepData,
  setCurrentStepData,
}) {
  const [clickableObjectText, setClickableObjectText] = useState("");
  useEffect(() => {
    setCurrentStepData(storyline.find((scene) => scene.id === currentStep));
  }, [currentStep, currentStepData]);
  return (
    <div id="normalscreen">
      <img
        id="background"
        src={`/img/backgrounds/${currentStep}.webp`}
        alt="background"
      />

      <div className={`maintext text${currentStepData.textPosition}`}>
        {currentStepData.text} <br />
      </div>
      <div className="clickableObjectTextContainer">
        {clickableObjectText && (
          <div className="clickableObjectText">{clickableObjectText}</div>
        )}
      </div>
      {currentStepData?.clickableObjects[0] && (
        <>
          {currentStepData.clickableObjects.map((object, i) => (
            <div
              className="clickableObject"
              style={{
                position: "absolute",
                left: `${object.positionX}%`,
                top: `${object.positionY}%`,
                width: `${object.width}vw`,
                height: `${object.height}vh`,
              }}
              key={`object${i}`}
              id={`object${i}`}
              onClick={() => (
                setCurrentStep(object.target), setClickableObjectText("")
              )}
              onMouseEnter={() => setClickableObjectText(object.text)}
              onMouseLeave={() => setClickableObjectText("")}
            >
              <img
                src={`/img/clickableObjects/${object.image} `}
                className="clickableObjectImage"
              ></img>
            </div>
          ))}
        </>
      )}
    </div>
  );
}