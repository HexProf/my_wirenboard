# wirenboard_emmc
Wirenboard eMMC Life Time Estimation
```
cat /sys/block/mmcblk0/device/manfid        
cat /sys/block/mmcblk0/device/name            

CS004	7.3.4E/7 1D/A	NULL
Q2J55L	7.2.1A 576	NULL

MID
0x11  Toshiba/Kioxia
    008G70  8G    THGBMFG6C1LBAIL
    008GB0  8G    THGBMJG6C1LBAIL
0x15    Samsung
    AJTD4R    16G    KLMAG1JETD-B041
    CJTD4R    64G
0x32
    MMC64G    64G
0x45
    DG4008
0xD6    FORESEE
    58A43A    16G    FEMDRM016G-58A43
    88A398    8G     FEMDMW008G-88A39
    88A19B    32G    FEMDRW032G-88A19
    88A19C    64G    FEMDRW064G-88A19    ?88
    88A19D    128G   FEMDRW128G-88A19 
0x52    Alliance Memory
    AS08FC    8G     ASFC8G31M-51BIN
0x70    Kingston
    IX2932    32G    EMMC32G-IX29-8AC01
    IX2964    64G    EMMC64G-IX29-8AC01
    IX9128    128G   EMMC128-IX29-8AC01
    MT3204    4G     EMMC04G-MT32-01G00
0x88    FORESEE / Longsys
    SLD32G    32G    FSEIASLD-32G
    SLD64G    64G    FSEIASLD-64G
    SLD128    128G   FSEIASLD-128G
0xF2    JSC
    JS08AC    8G     JSMC08AUM1ASAEA-H5-SU
0xE5    Dosilicon
    03E008    8G     DS55B08D5A2-EA   
    03E032    32G    DS55B32D5A1-EA     
    03E064    64G    DS55B64D5A1-EA    



Other:
Samsung KLM8G1GETF-B041 (8GTF4R)


Device life time estimation type A: life time estimation for the MLC user partition eraseblocks, provided in steps of 10%, e.g.:
    0x02 means 10%-20% device life time used.
Device life time estimation type B: life time estimation for the SLC boot partition eraseblocks, provided in steps of 10%, e.g.:
    0x02 means 10%-20% device life time used.
Pre EOL information: overall status for reserved blocks. Possible values are:
    0x00 - Not defined.
    0x01 - Normal: consumed less than 80% of the reserved blocks.
    0x02 - Warning: consumed 80% of the reserved blocks.
    0x03 - Urgent: consumed 90% of the reserved blocks.
```
