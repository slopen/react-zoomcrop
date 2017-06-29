### react-zoomcrop

```
<ZoomCrop
    step={0.01}
    maxScale={2}
    defaultPosition={{x: 0, y: 0}}
    /* store reference */
    ref={(component) => this.zoomcrop = component}>

    <img onLoad={() => {
        /* initiate when element size is ready */
        this.zoomcrop.setup ()
    }} src={'//...'}/>

</ZoomCrop>

```


```
const {x, y, width, height} = this.zoomcrop.getValue ();

this.zoomcrop.setValue ({x, y, width, height});

```

[demo](https://rawgit.com/slopen/react-zoomcrop/master/example/index.html)