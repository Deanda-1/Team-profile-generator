const Intern = require('../lib/Intern');
test('[Intern] School',()=>{
    const e= new Intern('bob',10,'test@test.com', "GitHubUser");
    expect(e.school).toBe('GitHubUser');
});

test('[Intern] getSchool',()=>{
    const e= new Intern('bob',10,'test@test.com', "GitHubUser");
    expect(e.getSchool()).toBe('GitHubUser');
});

test('[Intern] Object',()=>{
    const e= new Intern('bob',10,'test@test.com', "GitHubUser");
    expect(e.getRole()).toBe('Intern');
});