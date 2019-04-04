import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import presets from './includedPresets';

class PresetControl extends React.Component {
    constructor(props) {
        super(props);
        this.writePreset = this.writePreset.bind(this);
        this.presets = presets;
        this.loadUserPresets();
        this.nameInput = React.createRef();
    }

    state ={ 
        saveDialog:false,
        nameEmpty:true
    }

    componentDidMount() {
        this.props.loadPresets(this.presets[0].values);
    }
    
    loadUserPresets = () => {
        for (var key in localStorage){
            if(key.indexOf('swarm-preset')!==-1) this.presets.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    writePreset = (event) => {
        event.preventDefault();
        event.stopPropagation();
    	const newPreset={
            name: this.nameInput.current.value,
            values: this.props.swarmState
        }
        this.presets.unshift(newPreset);
        this.toggleSaveDialog();
        localStorage.setItem(`swarm-preset-${newPreset.name}`, JSON.stringify(newPreset));
    }

	choosePreset = (event) => {
        const selectedPreset=this.presets[event.target.selectedIndex];
        this.props.loadPresets(selectedPreset.values);
    }

    toggleSaveDialog = () => {
        if(this.state.saveDialog) this.setState({saveDialog:false});
        else this.setState({saveDialog:true});
    }

    enableSave = (event) => {
        if(event.target.value) this.setState({nameEmpty:false});
        else this.setState({nameEmpty:true});
    }

   
	render() {
		return(
			<div className="presetmanager">
                <select onChange={this.choosePreset}>
                    {presets.map((val, index) => 
                        <option key={index.toString()}>{val.name}</option>
                    )}
                </select>
                <div className="savepreset">
                    <button onClick={this.toggleSaveDialog}>
                        {this.state.saveDialog ? 'Cancel': 'Save Settings'}
                    </button>                    
                    {this.state.saveDialog &&
                        <span className="savedialog">
                            <input type="text" placeholder="name" onKeyUp={this.enableSave}
                            ref={this.nameInput}/>

                            {this.state.nameEmpty ?
                                <button disabled="disabled">Save</button> : 
                                <button onClick={this.writePreset}>Save</button>
                            }
                       </span>
                    }
                </div>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        swarmState: state
    }
}

export default connect(mapStateToProps, actions)(PresetControl);
