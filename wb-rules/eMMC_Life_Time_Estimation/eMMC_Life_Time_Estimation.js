/* 
* (c) 2025, Evgeniy (hexprof) Sitnikov
*/

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
      WBBATCH: {
        title: "WB Batch",
        type: "text",
        value: " "
       },
      WBVER: {
        title: "WB Version",
        type: "text",
        value: " "
       },
      MANFID: {
        title: "eMMC ManfID",
        type: "text",
        value: " "
       },
      NAME: {
        title: "eMMC Name",
        type: "text",
        value: " "
       },
   },
});

function update_values() {
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
    dev[EdevName + "/WBBATCH"] = dev["system/Batch No"];
    dev[EdevName + "/WBVER"] = dev["system/DTS Version"];
    runShellCommand("cat /sys/block/mmcblk0/device/manfid", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        dev[EdevName + "/MANFID"] = capturedOutput;    
      },
    });
    runShellCommand("cat /sys/block/mmcblk0/device/name", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        dev[EdevName + "/NAME"] = capturedOutput;    
      },
    });
}

// Обновляем при запуске правила
update_values();

defineRule(EdevName + "_cront", {
  when: cron("@every 12h"),
  then: function () {    
      update_values();
  },
});
