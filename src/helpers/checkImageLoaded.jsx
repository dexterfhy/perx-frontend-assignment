import React from 'react';

export default function checkImageLoaded(element) {
    var bg = "";
    if (element.currentStyle) { // IE
        bg = element.currentStyle.backgroundImage;
    } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
        bg = document.defaultView.getComputedStyle(element, "").backgroundImage;
    } else { // Try and get inline style
        bg = element.style.backgroundImage;
    }
    return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}