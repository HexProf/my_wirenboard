# wirenboard_emmc
Wirenboard eMMC Life Time Estimation virtual device
by Evgeniy (hexprof) Sitnikov

# eMMC_Life_Time_Estimation.js
![](https://github.com/HexProf/my_wirenboard/blob/main/wb-rules/eMMC_Life_Time_Estimation/eMMC_Status.png)

# wb-system-emmc.js
![](https://github.com/HexProf/my_wirenboard/blob/main/wb-rules/eMMC_Life_Time_Estimation/wb-system-emmc.png)
```
cat /sys/block/mmcblk0/device/manfid        
cat /sys/block/mmcblk0/device/name            

Unsorted:
CS004	7.3.4E/7 1D/A	NULL
Micron Q2J55L	7.2.1A 576	NULL

Legend:
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
