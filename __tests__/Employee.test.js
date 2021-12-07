const Employee = require('../lib/Employee');

test("[Employee] Object Instance",()=>{
    const e = new Employee();
    expect(typeof(e)).toBe("object")
});

test("[Employee] Name",()=>{
    const name="jon"
    const e = new Employee(name);
    expect(e.name).toBe(name)
});

test("[Employee] ID",()=>{
    const e= new Employee('test', 500);
    expect(e.id).toBe(500);
});
test("[Employee] email",()=>{
    const e= new Employee('test', 500,'test@test.com');
    expect(e.email).toBe('test@test.com');
});

test("[Employee] getName",()=>{
    const e= new Employee('test', 500);
    expect(e.getName()).toBe('test');
});

test("[Employee] getId",()=>{
    const e= new Employee('test', 500);
    expect(e.getId()).toBe(500);
});
test("[Employee] email",()=>{
    const e= new Employee('test', 500,'test@test.com');
    expect(e.getEmail()).toBe('test@test.com');
});