
const live_surround = require("./function");
const wn = 109;
const list0 = [110];

test("list = 0",() =>{
    expect(list0).toEqual([110]);
});

test("list = 0",() =>{
    expect(live_surround(list0,wn)).toEqual([0,1,2,109,110,111,218,219,220]);
});

