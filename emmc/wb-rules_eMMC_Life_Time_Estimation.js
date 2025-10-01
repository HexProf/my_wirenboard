var EdevName = 'emmc';
defineVirtualDevice(EdevName, {
  title: 'eMMC Life Time Estimation',
    cells: {
      ESTA: {
         title: "eMMC Life Time Estimation A",
         type: "text",
        value: " "
       },
      ESTB: {
         title: "eMMC Life Time Estimation B",
         type: "text",
        value: " "
       },
      EOLI: {
        title: "eMMC Pre EOL information",
        type: "text",
        value: " "
       },
   },
});

defineRule(EdevName + "_cront", {
  when: cron("@every 12h"),
  then: function () {    
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_A' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        dev[EdevName + "/ESTA"] = capturedOutput;    
      },
    });
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_B' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        dev[EdevName + "/ESTB"] = capturedOutput;    
      },
    });
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_PRE_EOL_INFO' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        dev[EdevName + "/EOLI"] = capturedOutput;    
      },
    });
  },
});
