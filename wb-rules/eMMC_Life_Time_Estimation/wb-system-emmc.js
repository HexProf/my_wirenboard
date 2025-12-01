defineRule("emmc_update", {
    whenChanged: ["system/Current uptime"],
    then: function(newValue, devName, cellName) {
        if (!getDevice("system").isControlExists("emmc_eol")) {
            getDevice("system").addControl("emmc_eol", {
                title: { 
                    'en': 'eMMC lifetime', 
                    'ru': 'Износ eMMC' 
                },
                type: "value",
                units: "%",
                value: 0,
                readonly: true
            });
        } else {
            runShellCommand("cat /sys/class/block/mmcblk0/device/life_time", {
                captureOutput: true,
                exitCallback: function(exitCode, capturedOutput) {
                    var s_emmc_est = capturedOutput.split(" ");
                    var i_emmc_esta = parseInt(s_emmc_est[0], 16);
                    dev["system/emmc_eol"] = i_emmc_esta * 10;
                }
            });
        }
    }
});
