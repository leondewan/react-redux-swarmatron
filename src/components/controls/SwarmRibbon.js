import React from 'react';

import "./Ribbons.css";

export class SwarmRibbon extends React.Component {
	
	constructor(props) {
        super(props);
        this.startSwarm=this.startSwarm.bind(this);
        this.sendSwarm=this.sendSwarm.bind(this);
        this.endSwarm=this.endSwarm.bind(this);
        this.swarmStarted=false;

    }

    componentDidMount(){
        this.setRibbon(this.srib);
    }

  	setRibbon(swarmRibbon){
  		this.swarmRibbonScale=125/swarmRibbon.getBoundingClientRect().width;
  		this.swarmRibbonOffset=swarmRibbon.getBoundingClientRect().left;
  	}

    checkRibbonBoundaries(evt) {
        var xpos=evt.clientX,
        ypos=evt.clientY,
        bound=evt.target.getBoundingClientRect();

        if(xpos < bound.left || 
            xpos > bound.right||
            ypos < bound.top ||
            ypos > bound.bottom) {

            return true;
        }
        else return false;
    }    

  	startSwarm(event){
      event.preventDefault();
  		this.swarmStarted=true;
        if(event.touches) this.swarmInterval=(event.changedTouches[0].clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;  
        else this.swarmInterval=(event.clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
        this.props.setSwarm(this.swarmInterval);
  	}

  	sendSwarm(event){
  		if (this.swarmStarted) {
            if(event.touches){ 
                if(this.checkRibbonBoundaries(event.changedTouches[0])){
                    this.endSwarm();
                    return;
                }
                this.swarmInterval=(event.changedTouches[0].clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
            } 
  			else this.swarmInterval=(event.clientX-this.swarmRibbonOffset)*this.swarmRibbonScale;
  			this.props.setSwarm(this.swarmInterval);
  		}
  	}

    endSwarm(){
        this.swarmStarted=false;
    }

  	render(){
        return( 
            <div className="ctl-ribbon" id="swarm-ribbon" ref={(swarmribbon) => { this.srib = swarmribbon; }}  
                onMouseDown={this.startSwarm} 
                onMouseMove={this.sendSwarm}
                onTouchStart={this.startSwarm}
                onTouchMove={this.sendSwarm}
                onMouseUp={this.endSwarm}
                onMouseOut={this.endSwarm}
                onTouchEnd={this.endSwarm}
            ></div>  
        )
    }
}


