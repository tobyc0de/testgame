import { useEffect, useState } from "react";

export default function Battle({
  setCurrentStep,
  currentStepData,
  player,
  setPlayer,
}) {
  const [isTurn, setIsTurn] = useState(true);
  const [actionDescription, setActionDescription] = useState(["lessgo mofo"]);
  const [opponentAttributes, setOpponentsAttributes] = useState(
    currentStepData.opponentAttributes
  );

  useEffect(() => {
    if (opponentAttributes.health <= 0) {
      setCurrentStep(currentStepData.nextStep);
    } else if (player.attributes.health <= 0) {
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
      setOpponentsAttributes({
        ...opponentAttributes,
        health: opponentAttributes.health - player.attributes.strength,
      });
    } // COUNTERATTACK
    else if (action === "counterattack") {
      setActionDescription([
        ...actionDescription,
        "you tried to counter attack!",
      ]);
      setOpponentsAttributes({
        ...opponentAttributes,
        health: opponentAttributes.health - player.attributes.strength,
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
        src={`/img/${currentStepData.id}.webp`}
        alt="background"
      />
      <p>You VS. {currentStepData.opponent}</p>
      <div id="playerDetails">
        <ul>
          <li>Health: {player.attributes.health}</li>
          <li>Strength: {player.attributes.strength}</li>
          <li>Dexterity: {player.attributes.dexterity}</li>
          <li>Intelligence: {player.attributes.intelligence}</li>
          <li>Charisma: {player.attributes.intelligence}</li>
        </ul>
      </div>
      <div id="opponentDetails">
        <ul>
          <li>Health: {opponentAttributes.health}</li>
          <li>Strength: {opponentAttributes.strength}</li>
          <li>Dexterity: {opponentAttributes.dexterity}</li>
          <li>
            Intelligence:
            {opponentAttributes.intelligence}
          </li>
          <li>
            Friendliness:
            {opponentAttributes.friendliness}
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
          <div onClick={() => handleClick("counter")}>Counter-Attack</div>
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
