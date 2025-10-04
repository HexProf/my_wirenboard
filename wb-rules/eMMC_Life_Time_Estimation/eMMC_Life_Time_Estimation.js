/* 
* (c) 2025, Evgeniy (hexprof) Sitnikov
*/

var s_emmc_manfid = "";
var s_emmc_name = "";
var s_emmc_esta = "";
var s_emmc_estb = "";
var s_emmc_eol = "";
var b_emmc_esta = false;
var b_emmc_estb = false;
var b_emmc_eol = false;

defineVirtualDevice("emmc2", {
  title: "eMMC v2 Life Time Estimation",
  cells: {
	id: {
        title: "eMMC Chip",
	    type: "text",
	    value: "",
        readonly: true,
        order: 3,
	},
    esta: {
        title: "MLC",
        type: "alarm",
        value: false,
        order: 0,
    },
    estb: {
        title: "SLC",
        type: "alarm",
        value: false,
        order: 1,
    },
    eol: {
        title: "Pre EOL",
        type: "alarm",
        value: false,
        order: 2,
    },
  }
})

function emmc_start() {
      runShellCommand("cat /sys/block/mmcblk0/device/manfid", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        var i_emmc_manfid = parseInt(capturedOutput, 16);
        s_emmc_manfid = capturedOutput;
        switch(i_emmc_manfid){
          case 0x00: { s_emmc_manfid = "SanDisk"; break; };
          case 0x01: { s_emmc_manfid = "Cypress/SkHynix/SkyHigh"; break; };
          case 0x02: { s_emmc_manfid = "Kingston/SanDisk"; break; };
          case 0x03: { s_emmc_manfid = "Toshiba"; break; };
          case 0x11: { s_emmc_manfid = "Toshiba"; break; };
          case 0x13: { s_emmc_manfid = "Micron"; break; };
          case 0x15: { s_emmc_manfid = "Samsung/SanDisk/LG"; break; };
          case 0x2C: { s_emmc_manfid = "Kingston"; break; };
          case 0x37: { s_emmc_manfid = "KingMax"; break; };
          case 0x44: { s_emmc_manfid = "ATP"; break; };
		  case 0x45: { s_emmc_manfid = "SanDisk"; break; };
          case 0x52: { s_emmc_manfid = "Alliance"; break; };
          case 0x70: { s_emmc_manfid = "Kingston"; break; };
          case 0x88: { s_emmc_manfid = "FORESEE/Longsys"; break; };
          case 0x90: { s_emmc_manfid = "SkHynix"; break; };
          case 0xD6: { s_emmc_manfid = "FORESEE/Longsys"; break; };
          case 0xE5: { s_emmc_manfid = "Dosilicon"; break; };
          case 0xF2: { s_emmc_manfid = "JSC"; break; };
          case 0xFE: { s_emmc_manfid = "Micron"; break; };

          default: {s_emmc_manfid = "UNKNOWN " + s_emmc_manfid; break;}
        }
         
      },
    }); 
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_A' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        var i_emmc_esta = parseInt(capturedOutput, 16);
        switch(i_emmc_esta){
          case 0x00: {s_emmc_esta = "0%-10%"; b_emmc_esta = false; break;}
          case 0x01: {s_emmc_esta = "0%-10%"; b_emmc_esta = false; break;}
          case 0x02: {s_emmc_esta = "10%-20%"; b_emmc_esta = false; break;}
          case 0x03: {s_emmc_esta = "20%-30%"; b_emmc_esta = false; break;}
          case 0x04: {s_emmc_esta = "30%-40%"; b_emmc_esta = false; break;}
          case 0x05: {s_emmc_esta = "40%-50%"; b_emmc_esta = false; break;}
          case 0x06: {s_emmc_esta = "50%-60%"; b_emmc_esta = true; break;}
          case 0x07: {s_emmc_esta = "60%-70%"; b_emmc_esta = true; break;}
          case 0x08: {s_emmc_esta = "70%-80%"; b_emmc_esta = true; break;}
          case 0x09: {s_emmc_esta = "80%-90%"; b_emmc_esta = true; break;}
          case 0x0A: {s_emmc_esta = "90%-100%"; b_emmc_esta = true; break;}
          default: {s_emmc_esta = "100%"; b_emmc_esta = true; break;}
        }
      },
    });
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_DEVICE_LIFE_TIME_EST_TYP_B' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        var i_emmc_estb = parseInt(capturedOutput, 16);    
        switch(i_emmc_estb){
          case 0x00: {s_emmc_estb = "0%-10%"; b_emmc_estb = false; break;}
          case 0x01: {s_emmc_estb = "0%-10%"; b_emmc_estb = false; break;}
          case 0x02: {s_emmc_estb = "10%-20%"; b_emmc_estb = false; break;}
          case 0x03: {s_emmc_estb = "20%-30%"; b_emmc_estb = false; break;}
          case 0x04: {s_emmc_estb = "30%-40%"; b_emmc_estb = false; break;}
          case 0x05: {s_emmc_estb = "40%-50%"; b_emmc_estb = false; break;}
          case 0x06: {s_emmc_estb = "50%-60%"; b_emmc_estb = true; break;}
          case 0x07: {s_emmc_estb = "60%-70%"; b_emmc_estb = true; break;}
          case 0x08: {s_emmc_estb = "70%-80%"; b_emmc_estb = true; break;}
          case 0x09: {s_emmc_estb = "80%-90%"; b_emmc_estb = true; break;}
          case 0x0A: {s_emmc_estb = "90%-100%"; b_emmc_estb = true; break;}
          default: {s_emmc_estb = "100%"; b_emmc_estb = true; break;}
        }
      },
    });
    runShellCommand("/usr/bin/mmc extcsd read /dev/mmcblk0 | /usr/bin/grep 'EXT_CSD_PRE_EOL_INFO' | /usr/bin/grep -o '....$'", { captureOutput: true,
      exitCallback: function (exitCode, capturedOutput) {
        var i_emmc_eol = parseInt(capturedOutput, 16);    
        switch(i_emmc_eol){
          case 0x00: {s_emmc_eol = "Fine: consumed 100% of the reserved blocks"; break; b_emmc_eol = false;}
          case 0x01: {s_emmc_eol = "Normal: consumed less than 80% of the reserved blocks"; break; b_emmc_eol = false; break;}
          case 0x02: {s_emmc_eol = "Warning: consumed 80% of the reserved blocks"; break; b_emmc_eol = true; break;}
          case 0x03: {s_emmc_eol = "Urgent: consumed 90% of the reserved blocks"; break; b_emmc_eol = true; break;}
          default: {s_emmc_estb = "Fatal: consumed 100% of the reserved blocks"; break; b_emmc_eol = true;}
        }
      },
    });
  runShellCommand("cat /sys/block/mmcblk0/device/name", { captureOutput: true, exitCallback: function (exitCode, capturedOutput) 
  {
    var st_emmc_name = capturedOutput.toString().trim();
    switch(st_emmc_name){
      case "008G70": { s_emmc_name = "THGBMFG6C1LBAIL"; break; }
      case "008GB0": { s_emmc_name = "THGBMJG6C1LBAIL"; break; }
      case "AJTD4R": { s_emmc_name = "KLMAG1JETD-B041"; break; }
      case "58A43A": { s_emmc_name = "FEMDRM016G-58A43"; break; }
      case '88A398': { s_emmc_name = "FEMDMW008G-88A39"; break; }
      case "88A19B": { s_emmc_name = "FEMDRW032G-88A19"; break; }
      case "88A19C": { s_emmc_name = "FEMDRW064G-88A19"; break; }
      case "88A19D": { s_emmc_name = "FEMDRW128G-88A19"; break; }
      case "AS08FC": { s_emmc_name = "ASFC8G31M-51BIN"; break; }
      case "IX2932": { s_emmc_name = "EMMC32G-IX29-8AC01"; break; }
      case "IX2964": { s_emmc_name = "EMMC64G-IX29-8AC01"; break; }
      case "IX9128": { s_emmc_name = "EMMC128-IX29-8AC01"; break; }
      case "MT3204": { s_emmc_name = "EMMC04G-MT32-01G00"; break; }
      case "SLD32G": { s_emmc_name = "FSEIASLD-32G"; break; }
      case "SLD64G": { s_emmc_name = "FSEIASLD-64G"; break; }
      case "SLD128": { s_emmc_name = "FSEIASLD-128G"; break; }
      case "JS08AC": { s_emmc_name = "JSMC08AUM1ASAEA-H5-SU"; break; }
      case "03E008": { s_emmc_name = "DS55B08D5A2-EA"; break; }
      case "03E032": { s_emmc_name = "DS55B32D5A1-EA"; break; }
      case "03E064": { s_emmc_name = "DS55B64D5A1-EA"; break; }
      case "DG4008": { s_emmc_name = "iNAND 7250 SDINBDG4-8G"; break; }
      case "DG4016": { s_emmc_name = "iNAND 7250 SDINBDG4-16G"; break; }
      case "DG4032": { s_emmc_name = "iNAND 7250 SDINBDG4-32G"; break; }
      case "DG4064": { s_emmc_name = "iNAND 7250 SDINBDG4-64G"; break; }			
      default: { s_emmc_name = st_emmc_name; break; }
    } 
  },
  });  
  if((s_emmc_manfid == "") || (s_emmc_name == "") || (s_emmc_manfid == null) || (s_emmc_name == null)) {
    dev["emmc2/id"] = "Not ready";
    dev["emmc2/id#error"] = "notready";
  }
  else{
    dev["emmc2/id"] = s_emmc_manfid + " " + s_emmc_name;
    dev["emmc2/id#error"] = "";
  }
  if((s_emmc_esta == "") || (s_emmc_esta == null)){
    getControl("emmc2/esta").setTitle(s_emmc_esta + " Not ready");
    dev["emmc2/esta#error"] = "notready";
  } 
  else{
    getControl("emmc2/esta").setTitle(s_emmc_esta + " MLC user partition life time");
    dev["emmc2/esta"] = b_emmc_esta;
    dev["emmc2/esta#error"] = "";
  }
  if((s_emmc_estb == "") || (s_emmc_estb == null)){
    getControl("emmc2/estb").setTitle("Not ready");
    dev["emmc2/estb#error"] = "notready";
  } 
  else{
    getControl("emmc2/estb").setTitle(s_emmc_estb + " SLC boot partition life time");
    dev["emmc2/estb"] = b_emmc_estb;
    dev["emmc2/estb#error"] = "";
  }
  if((s_emmc_eol == "") || (s_emmc_eol == null)){
    getControl("emmc2/eol").setTitle("Not ready");
    dev["emmc2/eol#error"] = "notready";
  } 
  else{
    getControl("emmc2/eol").setTitle(s_emmc_eol);
    dev["emmc2/eol"] = b_emmc_eol;
    dev["emmc2/eol#error"] = "";
  }
}

dev["emmc2/id#error"] = "notready";
dev["emmc2/esta#error"] = "notready";
dev["emmc2/estb#error"] = "notready";
dev["emmc2/eol#error"] = "notready";

defineRule("emmc2_cron1s", {
  when: cron("@every 1s"),
  then: function () {    
    emmc_start();
    if((dev["emmc2/id#error"] == "") && (dev["emmc2/esta#error"] == "") && (dev["emmc2/estb#error"] == "") && (dev["emmc2/eol#error"] == "")){
      disableRule("emmc2_cron1s");
    }
  },
})
defineRule("emmc2_cron12h", {
  when: cron("@every 12h"),
  then: function () {    
    emmc_start();
  },
})

