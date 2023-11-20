import storyline from "./content/storyline.json";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export default function Normal({
  currentStep,
  setCurrentStep,
  currentStepData,
  setCurrentStepData,
}) {
  const [clickableObjectText, setClickableObjectText] = useState("");
  const [loadMainText, setLoadMainText] = useState("");
  useEffect(() => {
    setCurrentStepData(storyline.find((scene) => scene.id === currentStep));
    setLoadMainText("maintext");
  }, [currentStep, currentStepData]);
  return (
    <div id="normalscreen">
      <img
        id="background"
        src={`/img/backgrounds/${currentStep}.webp`}
        alt="background"
        onMouseEnter={() => setLoadMainText("maintext")}
      />
      {currentStepData.text.map((textPart, i) => (
        <div
          id={`mainText${i}`}
          className={`${loadMainText} text${currentStepData.textPosition}`}
        >
          {currentStepData.text[i]} <br />
        </div>
      ))}

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
                setCurrentStep(object.target),
                setClickableObjectText(""),
                setLoadMainText("")
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
