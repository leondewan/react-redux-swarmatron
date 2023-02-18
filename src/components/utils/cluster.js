import { ScalingMath } from './scalingMath';

export class Cluster {
  constructor() {
    this.scalingMath = new ScalingMath();
  }

  makeCluster(note, interval) {
    var tone;
    var toneCeiling = 1150;
    var cluster = [];
    for (var i = 0; i < 8; i++) {
      tone = parseFloat(note) + (i - 3.5) * parseFloat(interval);
      if (tone >= toneCeiling) tone = toneCeiling;
      cluster.push(this.scalingMath.noteToTone(tone));
    }
    return cluster;
  }
}