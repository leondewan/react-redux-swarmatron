import React from 'react';
import './ToggleSwitch.css';

export const PowerSwitch = ({ togglePower }) => {
  const [powerOn, setPowerOn] = React.useState(true);
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setInit(true);
  }, [])

  React.useEffect(() => {
    init && togglePower(powerOn)
  }, [powerOn])

  const toggle = event => {
    event.preventDefault();
    setPowerOn(!powerOn);
  }

  return (
    <li
      className={powerOn ? 'toggleswitch on' : 'toggleswitch'}
      onClick={toggle}
      onTouchStart={toggle}
    >
      <label className="top">ON</label>
      <div className="hexnut">
        <div className="collar">
          <div className="bat"></div>
        </div>
      </div>
      <label className="bottom">OFF</label>
    </li>
  );
}
