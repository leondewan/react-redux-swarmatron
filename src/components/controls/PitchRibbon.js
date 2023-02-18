import React from 'react';

import "./Ribbons.css";

export const PitchRibbon = ({
  endTone,
  setCenterTone: setCenterToneAction,
  startTone,
}) => {

  const prib = React.useRef();
  let pitchStarted = false, centerTone;

  const [pitchRibbonOffset, setPitchRibbonOffset] = React.useState(0);
  const [pitchRibbonScale, setPitchRibbonScale] = React.useState(0);

  const setRibbon = () => {
    setPitchRibbonScale(1000 / prib.current.getBoundingClientRect().width);
    setPitchRibbonOffset(prib.current.getBoundingClientRect().left);
  }

  React.useEffect(() => {
    setRibbon();
  }, [])

  const startNote = event => {
    event.preventDefault();
    pitchStarted = true;

    if (event.touches) {
      centerTone = (event.changedTouches[0].clientX - pitchRibbonOffset) * pitchRibbonScale;
    } else {
      centerTone = (event.clientX - pitchRibbonOffset) * pitchRibbonScale;
      startTone(centerTone);
    }
  }

  const checkRibbonBoundaries = evt => {
    var xpos = evt.clientX,
      ypos = evt.clientY,
      bound = evt.target.getBoundingClientRect();

    if (xpos < bound.left ||
      xpos > bound.right ||
      ypos < bound.top ||
      ypos > bound.bottom) {
      return true;
    }
    else return false;
  }

  const setCenterTone = event => {
    if (pitchStarted) {
      if (event.touches) {
        if (checkRibbonBoundaries(event.changedTouches[0])) {
          pitchStarted = false;
          endTone();
          return;
        }
        centerTone = (event.changedTouches[0].clientX - pitchRibbonOffset) * pitchRibbonScale;
      }
      else {
        centerTone = (event.clientX - pitchRibbonOffset) * pitchRibbonScale;
      }

      setCenterToneAction(centerTone);
    }
  }

  const endNote = () => {
    pitchStarted = false;
    endTone();
  }

  return (
    <div
      className="ctl-ribbon"
      id="pitch-ribbon"
      ref={prib}
      onMouseDown={startNote}
      onMouseMove={setCenterTone}
      onTouchStart={startNote}
      onTouchMove={setCenterTone}
      onMouseUp={endNote}
      onMouseOut={endNote}
      onTouchEnd={endNote}
    ></div>
  )
}