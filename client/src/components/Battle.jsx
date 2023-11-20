import { useEffect, useState } from "react";
import defaultPlayer from "./content/defaultplayer.json";

export default function Battle({
  currentStep,
  setCurrentStep,
  currentStepData,
  player,
  setPlayer,
}) {
  const [isTurn, setIsTurn] = useState(true);
  const [actionDescription, setActionDescription] = useState([
    "why did I do this",
  ]);
  const [opponentAttributes, setOpponentsAttributes] = useState(
    currentStepData.opponentAttributes
  );

  useEffect(() => {
    if (opponentAttributes.health <= 0) {
      setPlayer(defaultPlayer);
      setOpponentsAttributes(currentStepData.opponentAttributes);
      setCurrentStep(currentStepData.nextStep);
    } else if (player.attributes.health <= 0) {
      setPlayer(defaultPlayer);
      setOpponentsAttributes(currentStepData.opponentAttributes);
      setCurrentStep(404);
    }
  }, [opponentAttributes, player]);

  // Random Number with Maximum
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function handleClick(action) {
    setIsTurn(!isTurn);
    // BITE
    if (action === "bite") {
      setActionDescription([
        ...actionDescription,
        "you bit your opponent! Ouchie",
      ]);
      setOpponentsAttributes({
        ...opponentAttributes,
        health:
          opponentAttributes.health - getRandomInt(player.attributes.strength),
        friendliness: opponentAttributes.friendliness - 1,
      });
    }
    // SCRATCH
    else if (action === "scratch") {
      setActionDescription([
        ...actionDescription,
        "you scratched your opponent! Ouchie",
      ]);
      setOpponentsAttributes({
        ...opponentAttributes,
        health:
          opponentAttributes.health - getRandomInt(player.attributes.strength),
        friendliness: opponentAttributes.friendliness - getRandomInt(2),
      });
    } // INTIMIDATE
    else if (action === "intimidate") {
      setActionDescription([
        ...actionDescription,
        "you intimidated your opponent! Scary!",
      ]);
      setOpponentsAttributes({
        ...opponentAttributes,
        intelligence: opponentAttributes.intelligence - getRandomInt(3),
        friendliness: opponentAttributes.friendliness - getRandomInt(2),
      });
    } // LICK
    else if (action === "lick") {
      setActionDescription([
        ...actionDescription,
        "you licked your opponent! Yummie",
      ]);
      setOpponentsAttributes({
        ...opponentAttributes,
        friendliness: opponentAttributes.friendliness + getRandomInt(3),
      });
      //// OPPONENT ACTIONS
    } // BLOCK
    else if (action === "block") {
      setActionDescription([...actionDescription, "you try to block!"]);
      setPlayer({
        ...player,
        attributes: {
          ...player.attributes,
          health:
            player.attributes.health -
            getRandomInt(opponentAttributes.strength),
        },
      });
    } // DODGE
    else if (action === "dodge") {
      setActionDescription([...actionDescription, "you tried to dodge!"]);
      setPlayer({
        ...player,
        attributes: {
          ...player.attributes,
          health:
            player.attributes.health -
            getRandomInt(opponentAttributes.strength),
        },
      });
    } // COUNTERATTACK
    else if (action === "counterattack") {
      setActionDescription([
        ...actionDescription,
        "you tried to counter attack!",
      ]);
      setPlayer({
        ...player,
        attributes: {
          ...player.attributes,
          health: player.attributes.health - opponentAttributes.strength,
        },
      });
      setOpponentsAttributes({
        ...opponentAttributes,
        health:
          opponentAttributes.health -
          getRandomInt(player.attributes.strength) / 2,
      });
    } // COUNTERLICK
    else if (action === "counterlick") {
      setActionDescription([...actionDescription, "you tried to counterlick!"]);
      setOpponentsAttributes({
        ...opponentAttributes,
        health: opponentAttributes.health - player.attributes.strength,
      });
    }
  }

  return (
    <div id="battlescreen">
      <img
        id="background"
        src={`/img/backgrounds/${currentStep}.webp`}
        alt="background"
      />
      <div id="battleVS">
        You <span style={{ color: "red" }}> VS.</span>{" "}
        {currentStepData.opponent}
      </div>

      <div id="playerDetails">
        <img
          src="/img/opponents/you.webp"
          alt="you"
          className={`playerturnhighlight${isTurn}`}
        />
      </div>
      <div id="opponentDetails">
        <img
          src={`/img/opponents/${currentStepData.opponentImage}`}
          alt="the other guy"
          className={`playerturnhighlight${isTurn}`}
        />

        <ul id="battleLabels">
          <li className="battleLabel">
            <span>{player.attributes.health}</span> <span>Health</span>{" "}
            <span>{opponentAttributes.health}</span>
          </li>
          <li className="battleLabel">
            <span>{player.attributes.strength}</span> <span>Strength</span>{" "}
            <span>{opponentAttributes.strength}</span>
          </li>
          <li className="battleLabel">
            <span>{player.attributes.dexterity}</span> <span>Dexterity </span>
            <span>{opponentAttributes.dexterity}</span>
          </li>
          <li className="battleLabel">
            <span>{player.attributes.intelligence}</span>{" "}
            <span>Intelligence </span>
            <span>{opponentAttributes.intelligence}</span>
          </li>
        </ul>
      </div>
      {isTurn && (
        <div id="buttonsdiv">
          <div onClick={() => handleClick("bite")}>Bite</div>
          <div onClick={() => handleClick("scratch")}>Scratch</div>
          <div onClick={() => handleClick("intimidate")}>Intimidate</div>
          <div onClick={() => handleClick("lick")}>Lick</div>
        </div>
      )}
      {!isTurn && (
        <div id="buttonsdiv">
          <div onClick={() => handleClick("block")}>Block</div>
          <div onClick={() => handleClick("dodge")}>Dodge</div>
          <div onClick={() => handleClick("counterattack")}>Counter-Attack</div>
          <div onClick={() => handleClick("counterlick")}>Lick</div>
        </div>
      )}
      <div id="actiondescription">
        {actionDescription.map((actionItem, index) => (
          <p key={index}>{actionItem}</p>
        ))}
      </div>
    </div>
  );
}
