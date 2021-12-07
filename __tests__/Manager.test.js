const Manager = require('../lib/Manager');
test('[Manager] OfficeNumber',()=>{
    const e= new Manager('bob',10,'test@test.com', 24);
    expect(e.officeNumber).toBe(24);
});

test('[Manager] getOfficeNumber',()=>{
    const e= new Manager('bob',10,'test@test.com', 24);
    expect(e.getOfficeNumber()).toBe(24);
});

test('[Manager] Object',()=>{
    const e= new Manager('bob',10,'test@test.com', 24);
    expect(e.getRole()).toBe('Manager');
});