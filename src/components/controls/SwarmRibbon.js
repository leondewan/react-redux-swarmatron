import React from 'react';

import "./Ribbons.css";

export const SwarmRibbon = ({ setSwarm }) => {
  const srib = React.useRef();

  React.useEffect(() => {
    setRibbon(srib.current);
  }, []);

  const [swarmRibbonScale, setSwarmRibbonScale] = React.useState(0);
  const [swarmRibbonOffset, setSwarmRibbonOffset] = React.useState(0);
  const [swarmStarted, setSwarmStarted] = React.useState(false);
  let swarmInterval;

  const setRibbon = swarmRibbon => {
    setSwarmRibbonScale(125 / swarmRibbon.getBoundingClientRect().width);
    setSwarmRibbonOffset(swarmRibbon.getBoundingClientRect().left);
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

  const startSwarm = event => {
    event.preventDefault();
    setSwarmStarted(true);
    if (event.touches) swarmInterval = (event.changedTouches[0].clientX - swarmRibbonOffset) * swarmRibbonScale;
    else swarmInterval = (event.clientX - swarmRibbonOffset) * swarmRibbonScale;
    setSwarm(swarmInterval);
  }

  const sendSwarm = event => {
    if (swarmStarted) {
      if (event.touches) {
        if (checkRibbonBoundaries(event.changedTouches[0])) {
          endSwarm();
          return;
        }
        swarmInterval = (event.changedTouches[0].clientX - swarmRibbonOffset) * swarmRibbonScale;
      }
      else swarmInterval = (event.clientX - swarmRibbonOffset) * swarmRibbonScale;
      setSwarm(swarmInterval);
    }
  }

  const endSwarm = () => {
    setSwarmStarted(false);
  }


  return (
    <div className="ctl-ribbon" id="swarm-ribbon" ref={srib}
      onMouseDown={startSwarm}
      onMouseMove={sendSwarm}
      onTouchStart={startSwarm}
      onTouchMove={sendSwarm}
      onMouseUp={endSwarm}
      onMouseOut={endSwarm}
      onTouchEnd={endSwarm}
    ></div>
  )
}


