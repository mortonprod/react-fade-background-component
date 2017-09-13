# react-fade-background-component

This component will place background behind children.
The fade in should complete before the bottom of background image is at the botton of viewport.
The background image size is determined from the size of the viewport. It uses width to centre and changes with media queries to get the correct height.
The background fill covers all the children.
Child should not rerender since props/state internal have not changed. 
Furthermore, the virtual dom will mitigate any perf impact.
Overflow should be hidden so we can't scroll oto side. Must not attach to main div so we can scroll app passed as child.
MUST SPECIFY POSITION TO USE OVER-FLOW WITH ABSOLUTE AND RELATIVE ELEMENTS
 
## Installation
To install this component into your project run:

`npm install @mortonprod/react-fade-background-component`

## Usage

Import the component like so: 

`
import Product from @mortonprod/react-fade-background-component
`


then import the css:


`
import @mortonprod/react-fade-background-component/dist/index.css
` 

Note you must pull the css independently of the component. 

## Contributing

You are free to contribute to this component if you wish.
