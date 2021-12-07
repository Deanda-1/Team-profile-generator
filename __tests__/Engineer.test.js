const Engineer = require('../lib/Engineer');
test('[Engineer] Github',()=>{
    const e= new Engineer('bob',10,'test@test.com', "GitHubUser");
    expect(e.github).toBe('GitHubUser');
});

test('[Engineer] getGitHub',()=>{
    const e= new Engineer('bob',10,'test@test.com', "GitHubUser");
    expect(e.getGithub()).toBe('GitHubUser');
});

test('[Engineer] Object',()=>{
    const e= new Engineer('bob',10,'test@test.com', "GitHubUser");
    expect(e.getRole()).toBe('Engineer');
});