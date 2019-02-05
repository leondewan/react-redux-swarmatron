

export default [
	{
		name: 'Electrophoresis', 
		values: {
			voicesToggle:[false, true, true, true, true, true, true, true], 
			filterTrack: 0.3, filterQ: 14,  filterKnobCutoff: 900, filterEnv: 0.5, dr: 25,
			attackTime:0.3, decayTime:2, sustainLevel:0.6, releaseTime:3
		}
	},

	{
		name: 'Penumbra',
		values : { 
			voicesToggle:[true, false, true, true, true, true, true, false],
			filterTrack: 0.7, filterQ: 3,  filterKnobCutoff: 2790, filterEnv: 0.2, dr: 5, 
			attackTime: 0, decayTime: 0.1, sustainLevel: 0.2, releaseTime: 4
		}
	}
];