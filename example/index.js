import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import '../styles.less';
import ZoomCrop from '../src';

const imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hs-2009-25-e-full_jpg.jpg/1280px-Hs-2009-25-e-full_jpg.jpg';

let ZoomCropInstance = null;

const setup = () => {
    document
        .getElementById ('box')
        .style
        .opacity = 1;

    ZoomCropInstance.setup ();
}

const getValue = () =>
    console.log (
        ZoomCropInstance &&
        ZoomCropInstance
            .getValue ()
    );

const setValue = (value) =>
    ZoomCropInstance &&
    ZoomCropInstance
        .setValue (value);


const Example = () =>
    <div id="box" className="box">

        <ZoomCrop
            ref={
                (component) => ZoomCropInstance = component
            }>

            <img
                onLoad={setup}
                src={imgSrc}/>

        </ZoomCrop>

        <br/>

        <button onClick={getValue}>read</button>
        <button onClick={() => setValue ({
            x: 100,
            y: 100,
            width: 500,
            height: 500
        })}>set</button>
    </div>


ReactDOM.render (<Example/>, document.getElementById ('root'));