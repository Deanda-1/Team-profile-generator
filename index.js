const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const teamMembers = [];
const ids = [];

function getQuestions(type) {

    var q = [{
        type: 'input',
        message: 'What is your ' + type + '\'s name?',
        name: 'Name',
    }, {
        type: 'input',
        message: 'What is your ' + type + '\'s id?',
        name: 'Id',
    }, {
        type: 'input',
        message: 'What is your ' + type + '\'s email address?',
        name: 'Email',
    }];
    //console.log('baseQ.len',q.length)

    switch (type) {
        case 'Manager':
            q.push({
                type: 'input',
                message: 'What is your ' + type + '\'s office number?',
                name: 'OfficeNumber'
            });
            break;
        case 'Engineer':
            q.push({
                type: 'input',
                message: 'What is your ' + type + '\'s Github username?',
                name: 'Github'
            });
            break;
        case 'Intern':
            q.push({
                type: 'input',
                message: 'What is your ' + type + '\'s school?',
                name: 'School'
            });
            break;
    }
    return q;
}
menu = {
    type: 'list',
    message: 'What would you like to do next',
    name: 'doNext',
    choices: ['Add an engineer',
        'Add an intern',
        'Finish building my team'],
};
function teammenu() {
    inquirer.prompt([menu]).then(res => {

        if (res.doNext === 'Finish building my team') {
            //console.log(teamMembers);
            exportTeam();
        } else if (res.doNext === 'Add an engineer') {
            prompt('Engineer');
        } else if (res.doNext === 'Add an intern') {
            prompt('Intern');
        }
    })
}

function prompt(type = 'Manager') {
    inquirer
        .prompt(getQuestions(type))
        .then((response) => {
            //console.log(response);
            switch (type) {
                case 'Manager':
                    teamMembers.push(new Manager(response.Name, response.Id, response.Email, response.OfficeNumber));
                    break;
                case 'Engineer':
                    teamMembers.push(new Engineer(response.Name, response.Id, response.Email, response.Github));
                    break;
                case 'Intern':
                    teamMembers.push(new Intern(response.Name, response.Id, response.Email, response.School));
                    break;
            }
            teammenu()
        })
}
prompt('Manager');

function fltr (tpl,find,replace){
    const pattern = new RegExp("{{ "+find+" }}", "gm");
    return tpl.replace(pattern,replace);
}

function render (thisObj){
    let tpl = fs.readFileSync('./src/'+thisObj.getRole()+'.htm', 'utf-8');
    tpl = fltr(tpl, 'name', thisObj.getName());
    tpl = fltr(tpl, 'id', thisObj.getId());
    tpl = fltr(tpl, 'email', thisObj.getEmail());
    tpl = fltr(tpl, 'role', thisObj.getRole())
    tpl = (thisObj.getRole() === 'Engineer') ? 
            fltr(tpl, 'github', thisObj.getGithub()) :
        (thisObj.getRole() === 'Manager')? 
            fltr(tpl,'office', thisObj.getOfficeNumber()) :
        (thisObj.getRole() === 'Intern')?
            fltr(tpl, 'school', thisObj.getSchool())
            : tpl;

    return tpl;
}
function exportTeam(){
    let memTpl = fs.readFileSync('./src/member.htm', 'utf-8');
    let tpl = fs.readFileSync('./src/team.htm', 'utf-8');
    
    bodybuffer='';

    teamMembers.forEach((employee)=>{
        let empbuf = '';
        bodybuffer += render(employee);
        empbuf += render(employee)
        emTpl = fltr(memTpl,'name',employee.name);
        fs.writeFileSync('./dist/'+employee.id+'.html', fltr(emTpl,'body',empbuf),'utf-8')
    })

    tpl = fltr(tpl,'body',bodybuffer);
    fs.writeFileSync('./dist/team.html', tpl, 'utf-8');

}
