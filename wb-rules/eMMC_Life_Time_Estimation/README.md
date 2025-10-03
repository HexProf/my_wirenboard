# wirenboard_emmc
Wirenboard eMMC Life Time Estimation
```
cat /sys/block/mmcblk0/device/manfid        
cat /sys/block/mmcblk0/device/name            

'008G70	7.3.3E/3 669/1	8 [127:120] = 0x11
'008GB0	7.3.3E/6 667/1	8 [127:120] = 0x11
'58A43A	7.4.3G/1G1 1D/L-2GS	8 [127:120] = 0xd6
'88A19C	7.3.4B/2 679	8 [127:120] = 0x88
'88A398	7.3.4L/4 1D/E-1G	8 [127:120] = 0xd6
AJTD4R	8.4.4D/2G 1.2C-2G	8 [127:120] = 0x15
AS08FC	7.3A_Test 637	8 [127:120] = 0x52
CJTD4R	7.3.3B/4 648	8 [127:120] = 0x15
CS004	7.3.4E/7 1D/A	NULL
DG4008	7.3B/1 637	8 [127:120] = 0x45
IX2964	7.3B/2GI 633	8 [127:120] = 0x70
JS08AC	7.3.4K/3 1D/E-1G	8 [127:120] = 0xf2
MMC64G	7.3B/2GC 636	8 [127:120] = 0x32
Q2J55L	7.2.1A 576	NULL
SLD64G	7.3.4B/3 677	8 [127:120] = 0x88

0x11    

MID
0x11  Toshiba/Kioxia
    008G70  8G    THGBMFG6C1LBAIL
    008GB0  8G    THGBMJG6C1LBAIL
0xD6  FORESEE
    58A43A    16G    FEMDRM016G-58A43
    88A398    8G     FEMDMW008G-88A39
    88A19B    32G    FEMDRW032G-88A19
    88A19C    64G    FEMDRW064G-88A19    ?88
    88A19D    128G   FEMDRW128G-88A19 

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
