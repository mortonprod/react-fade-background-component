import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as _ from "lodash";
import background from './peak.jpg';
import "./fadeBackground.css";

/**
    This component will place background behind children.
    The fade in should complete before the bottom of background image is at the botton of viewport.
    The background image size is determined from the size of the viewport. It uses width to centre and changes with media queries to get the correct height.
    The background fill covers all the children.
    Child should not rerender since props/state internal have not changed. 
    Furthermore, the virtual dom will mitigate any perf impact.
    Overflow should be hidden so we can't scroll oto side. Must not attach to main div so we can scroll app passed as child.
    MUST SPECIFY POSITION TO USE OVER-FLOW WITH ABSOLUTE AND RELATIVE ELEMENTS
    @class

*/
class FadeBackground extends Component {
  /**
    Must sure to call resize to stop blue flash of opacity = null.
  */
  constructor(props){
    super()
    this.state = {height:null,scrollTop:null};
    this.resize = _.debounce(this.resize.bind(this),300,{trailing:true,leading:false});
    this.scroll = _.throttle(this.scroll,100,{leading:false,trailing:true});
    this.resize.bind(this)();
		this.background = null;
  }
  /**
    When resize called make sure update opacity value through height.
    @function
  */
  resize(event){
    let node = ReactDOM.findDOMNode(this.background)
    if(node){
        this.setState({height:node.getBoundingClientRect().height});
    }
  }
    /** 
	    THIS CAN'T BE IN APP MAIN SINCE THIS WILL UPDATE STATE AN CAUSE THE FULL ROUTER TO RELOAD.
	    CAN PUT IN UTILITY FUNCTION???
	    ALWAYS SET SCROLLLEFT TO ZERO SO WE DO NOT SEE SCREEN WHERE TRANSFORM ELEMENT ENTER. OVERFLOW-X ONLY HIDES IT DOES NOT PREVENT SCROLL.
	    @function
	*/
	scroll(event){
	    //if(document.body.scrollLeft !== 0 ){
	        document.body.scrollLeft = 0;
	    //}
	    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	    this.setState({scrollTop:scrollTop});
	}
  /**
    The height of the background is used to determine the opacity of the fade out.
    Attach resize to change opacity with change in background image height.
    CAN'T GET HEIGHT HERE BUT MUST CALL RESIZE???
    @function
  */
  componentDidMount(){
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('scroll', this.scroll.bind(this));
    this.resize.bind(this)();

  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.scroll.bind(this));
  }
  /**
    If height or scroll null assume reroutes and set opacity=0.
    Calling resize in constructor does not work?? Call on demount maybe?
  */
  render(){
    let opacity = null;
    if(this.state.scrollTop === null || this.state.height === null){
    opacity = 0;
    }
    else if(this.state.scrollTop/this.state.height <= 1){
        opacity = this.state.scrollTop/(this.state.height-window.innerHeight);
    }else{
        opacity = 1;
    }
    return (
        <div className={"fadeBackground"}>
            <div className="fadeBackground__background">
		        <img ref={(ref)=>{ this.background = ref}} src={background}  alt="mountain" />
            </div>
		    <div style={{opacity:opacity}} className={"fadeBackground__blackBackground"}/>
            {this.props.children}
        </div>
    )

  }
}

export default FadeBackground;
