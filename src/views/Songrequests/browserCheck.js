export function isValidBrowser() {
  var isValidBrowser = false;

  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 )
   {
       isValidBrowser = true;
   }
   else if(navigator.userAgent.indexOf("Chrome") !== -1 )
   {
       isValidBrowser = true;
   }
   else if(navigator.userAgent.indexOf("Safari") !== -1)
   {
       isValidBrowser = false;
   }
   else if(navigator.userAgent.indexOf("Firefox") !== -1 )
   {
        isValidBrowser = true;
   }
   else if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) //IF IE > 10
   {
     isValidBrowser = false;
   }
   else
   {
      isValidBrowser = false;
   }

  return isValidBrowser;
};

export function getAverageRGB(img) {
    var imgEl = new Image();
    imgEl.crossOrigin = '';
    imgEl.src = img;

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {

        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb.r+","+rgb.g+","+rgb.b;

};
