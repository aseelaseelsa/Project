const {getRdays} = require("../script/getRdays");

const now = new Date();
test("give me the remaining days from now the date i will set a the parameter",()=>{
    expect(getRdays(now)).toBe(-0);
});