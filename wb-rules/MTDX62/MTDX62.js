var x = "\u22C5";
var z = [x+x+"\u2591"+x+x,x+x+"\u2592"+x+x,x+x+"\u2593"+x+x,x+x+"\u2588"+x+x]
defineVirtualDevice("000", 
                    {
                      title: "000",
                      cells: {
                        d0: {
                          title: "Distance0",
                          type: "text",
                          value: ""
                        },
                        d1: {
                          title: "Distance1",
                          type: "text",
                          value: ""
                        },
                        d2: {
                          title: "Distance2",
                          type: "text",
                          value: ""
                        },
                        d3: {
                          title: "Distance3",
                          type: "text",
                          value: ""
                        }
                      }
                    }
                   );

dev["000/d0"] = z[0] + z[1] +z[2] + z[3];
dev["000/d1"] = z[1] + z[1] +z[3] + z[0];
dev["000/d2"] = z[3] + z[0] +z[2] + z[1];
dev["000/d3"] = z[0] + z[0] +z[3] + z[0];
