export const applyScale = (
    element,
    scale
) => {
    element.style.transform = `scale(${scale})`;
    element.style ['-webkit-transform'] = `scale(${scale})`;
}

export const getFrameCoords = (
    element,
    frame
) => {
    const {
        width: frameWidth,
        height: frameHeight
    } = frame.getBoundingClientRect ();

    const {
        width: elementWidth,
        height: elementHeight
    } = element.getBoundingClientRect ();

    const left = (elementWidth - frameWidth) / 2;
    const top = (elementHeight - frameHeight) / 2;
    const right = -left;
    const bottom = -top;

    return {
        left,
        right,
        top,
        bottom,
        frameWidth,
        frameHeight
    };
}

export const getCroppingData = ({x, y}, {
    left,
    top,
    frameWidth,
    frameHeight
}, scale) => {
    const coordsX = Math.round (
        (left - x) / scale
    );
    const coordsY = Math.round (
        (top - y) / scale
    );

    return {
        x: coordsX < 0 ? 0 : coordsX,
        y: coordsY < 0 ? 0 : coordsY,
        width: Math.round (frameWidth / scale),
        height: Math.round (frameHeight / scale)
    };
}

export const validatePosition = ({x, y}, frameCoords) => {
    const position = {x, y};

    // validate bounds
    if (x > frameCoords.left) {
        position.x = frameCoords.left;
    } else if (x < frameCoords.right) {
        position.x = frameCoords.right;
    }

    if (y > frameCoords.top) {
        position.y = frameCoords.top;
    } else if (y < frameCoords.bottom) {
        position.y = frameCoords.bottom;
    }

    return position;
}