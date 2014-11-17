// if the projects collection is empty, provide some default data
if (Projects.find().count() === 0) {
    Projects.insert({
        title: 'Sort Socks',
        projectManager: 'Hans Wurst',
        description: 'Sort all the socks alphabetically and by colour.'
    });

    Projects.insert({
        title: 'Rule the world',
        projectManager: 'Klaus Kleber',
        description: 'Obvious, duh!'
    });

    Projects.insert({
        title: 'Eat all the red gummibears',
        projectManager: 'Gundula Gause',
        description: 'JUST EAT THEM ALL!!!'
    });
}
