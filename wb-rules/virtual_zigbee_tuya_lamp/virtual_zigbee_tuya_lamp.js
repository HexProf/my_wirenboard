/**
 * Виртуальное устройство для Zigbee Tuya ламп. 
 * (c) Евгений Ситников (hexprof)
 * v0.1 25.05.2025
 */
function RGBtoXY(red,green,blue){
    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);
    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
    var fx = X / (X + Y + Z);
    var fy = Y / (X + Y + Z);
    return [fx.toPrecision(4),fy.toPrecision(4)];
}

function makeVirtualTuyaLamp(deviceName, deviceNameRU, lampDeviceID) {
  
  defineVirtualDevice(deviceName, {
      title: deviceNameRU,
      cells: {
    	state: {
          title: "Включено",
    	    type: "switch",
    	    value: false
    	},
    	brightness: {
          title: "Яркость",
    	    type: "range",
            min: 0,
            max: 254,
    	    value: 254
    	},
    	colortemp: {
          title: "Цветовая температура",
          type: "value",
          value: 250,
          enum: {
              0: {ru: "RGB Control"},
            153: {ru: "Coolest"},
            250: {ru: "4000K Cool"},
            370: {ru: "2700K Neutral"},
            454: {ru: "2200K Warm"},
            500: {ru: "Warmest"}
          },
          readonly: false
    	},
    	color: {
          title: "Цвет",
    	  type: "rgb",
          value: false
    	},
      }
  });
  
  defineRule(deviceName + "_state", {
    whenChanged: [deviceName + "/state",deviceName + "/brightness", deviceName + "/colortemp", deviceName + "/color"],
    then: function (newValue, devName, cellName) {
      var vState;
      if (dev[deviceName + "/state"] == true){ vState = "ON";} else { vState = "OFF";}
      var vBright = dev[deviceName + "/brightness"];
      var vColTemp = dev[deviceName + "/colortemp"];
      var jsnXY;
      if(vColTemp == 0) { // XY
        var vColRGB = dev[deviceName + "/color"].toString().split(";");
        var XY = RGBtoXY(vColRGB[0], vColRGB[1], vColRGB[2]);
        var jsnXY = {
          state: vState,
          brightness: vBright,
          color: {
            hue: 240,
            saturation: 100,
            x: XY[0],
            y: XY[1]
          }
        }
      }
      else { // Color temperature
        var jsnXY = {
          state: vState,
          brightness: vBright,
          color_temp: vColTemp,
        }
      }
    
      var jsToSend = JSON.stringify(jsnXY);
      //log(jsToSend);
      publish("zigbee2mqtt/" + lampDeviceID + "/set", jsToSend);
    }
  });
}

/*  Описываем лампы
                  device_name,     Человекочитаемое,    0x... Zigbee IEEE  */

//makeVirtualTuyaLamp("koridor_lamp", "Лампа в коридоре", "ZB_LAMP_ENTRANCE");
//makeVirtualTuyaLamp("kitchen_lamp", "Лампа над плитой", "ZB_LAMP_KITCHEN");
makeVirtualTuyaLamp("zal_lamp", "Лампа в зале", "ZB_LAMP_ZAL");
