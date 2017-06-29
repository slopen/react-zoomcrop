import React, {
    Component,
    Children,
    cloneElement
} from 'react';

import Draggable from 'react-draggable';
import ReactSlider from 'react-slider';

import defaults from './defaults';

import {
    applyScale,
    getFrameCoords,
    getCroppingData,
    validatePosition
} from './helpers';

export default class ReactZoomCrop extends Component {

    constructor (props) {
        super (props);

        this.state = Object.assign ({}, defaults, props);
    }

    // call it when element size is ready
    // image onLoad / video onCanPlayThrough etc
    setup = () => {
        this.setupElement ();
        this.setupHandle ();
    }

    // returns {x, y, width, height}
    getValue = () => {
        return this.state.cropping;
    }

    // accepts {x, y, width, height}
    setValue = (value) => {
        const {frame, element} = this.refs;

        const {
            frameWidth,
            frameHeight
        } = getFrameCoords (element, frame);

        const scale = frameWidth / value.width;

        applyScale (element, scale);

        this.setState ({scale}, () => {
            const {width, height} = element.getBoundingClientRect ();

            const leftEdge = (width - frameWidth) / 2;
            const topEdge = (height - frameHeight) / 2;

            const x = leftEdge - (value.x * scale);
            const y = topEdge - (value.y * scale);

            this.setState ({position: {x, y}}, () => {
                this.onStop (null, this.state.position);
            });
        });

    }

    setupElement = () => {
        const {frame, element} = this.refs;
        const {width, height} = element.getBoundingClientRect ();

        element
            .classList
            .add ('zoomcrop-element');

        const frameWidth = frame
            .getBoundingClientRect ()
            .width;

        const minScale = width < height
                ? frameWidth / width
                : frameWidth / height

        this.setState ({
            minScale,
            scale: minScale
        }, () => {
            element.style ['margin-left'] = (-width / 2) + 'px';
            element.style ['margin-top'] = (-height / 2) + 'px';
            this.onZoomChange (this.state.scale);
        });
    }

    setupHandle = () => {
        const {handle, element} = this.refs;
        const {width, height} = element.getBoundingClientRect ();

        const {maxScale} = this.state;
        const handleWidth = width * maxScale;
        const handleHeight = height * maxScale;

        handle.style.width = handleWidth + 'px';
        handle.style.height = handleHeight + 'px';
        handle.style ['margin-left'] = (-handleWidth / 2) + 'px';
        handle.style ['margin-top'] = (-handleHeight / 2) + 'px';
    }

    onDrag = (e, {x, y}) => {
        const position = {x, y};

        this.setState ({position});
    }

    onStop = (e, {x, y}) => {
        const {frame, element} = this.refs;
        const {scale} = this.state;

        const frameCoords = getFrameCoords (element, frame);
        const position = validatePosition ({x, y}, frameCoords);
        const cropping = getCroppingData (position, frameCoords, scale);

        this.setState ({
            position,
            cropping
        });
    }

    onZoomChange = (scale) => {
        const {element} = this.refs;

        applyScale (element, scale);

        this.setState ({scale}, () => {
            this.onStop (null, this.state.position);
        });
    }

    render () {
        const {
            step,
            minScale,
            maxScale,
            position,
            scale,
            defaultPosition
        } = this.state;

        return (
            <div
                ref="frame"
                id="zoomcrop"
                className="zoomcrop-frame">

                <Draggable
                    handle=".zoomcrop-handle"
                    defaultPosition={defaultPosition}
                    position={position}
                    onDrag={this.onDrag}
                    onStop={this.onStop}>

                    <div
                        ref="handle"
                        className="zoomcrop-handle">

                        {Children.map (this.props.children, (element) => {
                            return cloneElement (element, {ref: 'element'});
                        })}

                    </div>
                </Draggable>

                <ReactSlider
                    value={scale}
                    min={minScale}
                    max={maxScale}
                    withBars
                    step={step}
                    invert={true}
                    orientation="vertical"
                    onChange={this.onZoomChange}/>
            </div>
        );
    }
}