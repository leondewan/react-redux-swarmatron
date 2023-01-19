import React from 'react';

import "./Knob.css";

//refactor to hooks syntax

export const Knob = ({
  children,
  returnRawValue,
  returnScaledValue,
  setKnobAngle,
  setScaledValue,
  param
}) => {
  const knobEl = React.useRef();
  const ctlVal = React.useRef(1);
  const turnValue = React.useRef(setKnobAngle);
  const prevTurnValue = React.useRef(0);
  const turnStart = React.useRef(0);

  React.useEffect(() => {
    ctlVal.current = setScaledValue;
    turnValue.current = setKnobAngle;
    rotateKnob();
  }, [])

  React.useEffect(() => {
    updateCtlValue()
  }, [setScaledValue])

  React.useRef()

  return (
    <li className="knob">
      <label>{children}</label>
      <div className="body" onMouseDown={initiateDrag}
        onTouchStart={initiateDrag}
        ref={knobEl} >
        <div className="pointer"></div>
      </div>
      <input type="text" value={ctlVal.current}
        onChange={handleOnChange} />
    </li>
  );

  function initiateDrag(event) {
    event.preventDefault();
    event.touches && event.gesture.preventDefault();
    prevTurnValue.current = turnValue.current;
    if (event.touches) {
      turnStart.current = event.changedTouches[0].clientY;
    }
    else {
      turnStart.current = event.clientY;
    }

    document.addEventListener('mousemove', operate);
    document.addEventListener('touchmove', operate);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", operate);
      document.removeEventListener("touchmove", operate);
    });

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", operate);
      document.removeEventListener("mousemove", operate);
    });
  }

  function operate(event) {
    let turn;
    if (event.touches) turn = event.changedTouches[0].clientY;
    else turn = event.clientY;
    let currTurn = Math.round(prevTurnValue.current - turn + turnStart.current);

    if (currTurn >= -150 && currTurn <= 150) {
      turnValue.current = currTurn;
      rotateKnob();
      returnRawValue(turnValue.current, param);
      ctlVal.current = setScaledValue;
    }
  }

  function rotateKnob() {
    if (turnValue.current > 150) turnValue.current = 150;
    if (turnValue.current < -150) turnValue.current = -150;
    knobEl.current.style.webkitTransform = 'rotate(' + turnValue.current + 'deg)';
    knobEl.current.style.transform = 'rotate(' + turnValue.current + 'deg)';

  }

  function handleOnChange(event) {
    let val = parseFloat(event.target.value);
    ctlVal.current = val;
    setTimeout(() => { delayedUpdate() }, 750);
  }

  function delayedUpdate () {
    returnScaledValue(ctlVal.current, param);
    turnValue.current = setKnobAngle;
    rotateKnob();
  }

  function updateCtlValue() {
    ctlVal.current = setScaledValue;
    turnValue.current = setKnobAngle;
    rotateKnob();
  }
}
