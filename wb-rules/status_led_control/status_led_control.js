// Control Status LED
// (c) 2025, Evgeniy (hexprof) Sitnikov

var VdevName = 'StatusLEDControl';
defineVirtualDevice(VdevName, {
  title: {en: 'Status LED Control', ru: 'Управление статусным светодиодом'} ,
    cells: {
      ledGreenBrightnes: {
         title: {'en': 'Green LED Brightnes', 'ru': 'Яркость зеленого светодиода'},
         type: "range",
         min: 0,
         max: 250,
         value: 250,
       },
   },
});

defineRule("ledGreenBrightnesRule", {
  whenChanged: VdevName + "/ledGreenBrightnes",
  then: function (newValue, devName, cellName) {
    runShellCommand("wb_source hardware");
    runShellCommand("echo " + newValue + " > /sys/devices/platform/leds-pwm/leds/green/brightness");
  },
});
