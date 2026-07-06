const fs = require('fs');
const ud = fs.readFileSync('user_dashboard.html', 'utf8');
const ad = fs.readFileSync('admin_dashboard.html', 'utf8');

const udTop = ud.substring(ud.indexOf('<header class="dashboard-topbar">'), ud.indexOf('</header>') + 9);
const adTop = ad.substring(ad.indexOf('<header class="dashboard-topbar">'), ad.indexOf('</header>') + 9);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && (f.startsWith('user_') || f.startsWith('admin_')));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (f.startsWith('user_')) {
        content = content.replace(/<header class="dashboard-topbar">[\s\S]*?<\/header>/, udTop);
    } else {
        content = content.replace(/<header class="dashboard-topbar">[\s\S]*?<\/header>/, adTop);
    }
    fs.writeFileSync(f, content);
    console.log('Fixed ' + f);
});
