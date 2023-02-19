
import React from 'react';
import "./PushSwitch.css"

export const PushSwitch = ({
  ext,
  power,
  voice,
  deviceOn
}) => {
  const [powered, setPowered] = React.useState(ext);
  const [pushed, setPushed] = React.useState(ext);

  React.useEffect(() => {
    switchVoice();
  }, [powered, pushed]);

  React.useEffect(() => {
    powerVoice(deviceOn)
  }, [deviceOn]);

  React.useEffect(() => {
    setSwitch(ext)
  }, [ext]);

  const toggleVoice = event => {
    event.preventDefault();
    setPowered(!powered);
    setPushed(!pushed);
  }

  const setSwitch = () => {
    setPowered(ext)
    setPushed(ext)
  }

  const switchVoice = () => {
    if (powered) {
      power(pushed, voice);
    } else {
      power(false, voice);
    }
  }

  const powerVoice = on => {
    if (on && pushed) {
      setPowered(true);
      power(true, voice);
    } else {
      power(false, voice);
      setPowered(false);
    }
  }

  const styleButtonState = () => {
    return `pushswitch ${pushed ? 'pushed' : ''} ${powered ? 'on' : ''}`;
  }

  return (
    <li className={styleButtonState()}
      onClick={toggleVoice}
      onTouchStart={toggleVoice}></li>
  );
}
