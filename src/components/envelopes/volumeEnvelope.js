import { Envsettings } from './envelopeSettings';

export const VolumeEnv = (context, envNode, linearEnv) => {
  const envSettings = new Envsettings();

  const volEnvelope = n => {
    const param = envNode.gain;
    const now = context.currentTime;
    let lastValue;

    if (n) {
      lastValue = param.value;
      param.cancelScheduledValues(now);
      param.setValueAtTime(lastValue, now);
      param.linearRampToValueAtTime(envSettings.peakLevel, now + envSettings.attackTime);

      if (linearEnv) {
        param.linearRampToValueAtTime(envSettings.sustainLevel,
          now + envSettings.attackTime + envSettings.decayTime * 2);
      } else {
        param.setTargetAtTime(envSettings.sustainLevel, now + envSettings.attackTime,
          envSettings.decayTime);
      }
    } else {
      lastValue = param.value;
      param.cancelScheduledValues(now);
      param.setValueAtTime(lastValue || envSettings.sustainLevel, now);

      if (linearEnv) {
        param.linearRampToValueAtTime(0, now + envSettings.releaseTime * 2);
      } else {
        param.setTargetAtTime(0, now, envSettings.releaseTime);
      }
    }
    return ({ envSettings })
  }
  return ({ volEnvelope })
}
