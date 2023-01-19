import React from 'react';

import "./Ribbons.css";

export class PitchRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.startNote = this.startNote.bind(this);
    this.setCenterTone = this.setCenterTone.bind(this);
    this.endNote = this.endNote.bind(this);
    this.pitchStarted = false;
  }

  componentDidMount() {
    this.setRibbon(this.prib);
  }

  setRibbon(pitchRibbon) {
    this.pitchRibbonScale = 1000 / pitchRibbon.getBoundingClientRect().width;
    this.pitchRibbonOffset = pitchRibbon.getBoundingClientRect().left;
  }

  startNote(event) {
    event.preventDefault();
    this.pitchStarted = true;

    if (event.touches) this.centerTone = (event.changedTouches[0].clientX - this.pitchRibbonOffset) * this.pitchRibbonScale;
    else this.centerTone = (event.clientX - this.pitchRibbonOffset) * this.pitchRibbonScale;
    this.props.startTone(this.centerTone);
  }

  setCenterTone(event) {
    if (this.pitchStarted) {
      if (event.touches) {
        if (this.checkRibbonBoundaries(event.changedTouches[0])) {
          this.pitchStarted = false;
          this.props.endTone();
          return;
        }
        this.centerTone = (event.changedTouches[0].clientX - this.pitchRibbonOffset) * this.pitchRibbonScale;
      }
      else this.centerTone = (event.clientX - this.pitchRibbonOffset) * this.pitchRibbonScale;
      this.props.setCenterTone(this.centerTone);
    }
  }

  endNote() {
    this.pitchStarted = false;
    this.props.endTone();
  }

  checkRibbonBoundaries(evt) {
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

  render() {
    return (
      <div className="ctl-ribbon" id="pitch-ribbon" ref={(pitchribbon) => { this.prib = pitchribbon; }}
        onMouseDown={this.startNote}
        onMouseMove={this.setCenterTone}
        onTouchStart={this.startNote}
        onTouchMove={this.setCenterTone}
        onMouseUp={this.endNote}
        onMouseOut={this.endNote}
        onTouchEnd={this.endNote}
      ></div>
    )
  }
}