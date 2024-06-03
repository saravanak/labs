function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            return (num < 10 ? '0' : '') + num;
        };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

function toDDMMYYY(date) {
    const pad = function (num) {
        return (num < 10 ? '0' : '') + num;
    };

    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate());

}

export default function (plop) {
    // create your generators here
    plop.setHelper('dateIso', function (text) {
        return toIsoString(new Date());
    }),
        plop.setHelper('titleDate', function (text) {
            const value = toDDMMYYY(new Date());
            return value;
        }),
        plop.setHelper('q', function (array) {
            const givenTags = ["'posts'", array.split(',').map(v => `'${v}'`)].join(",");
            return `[${[givenTags]}]`
        }),
        plop.setGenerator('blog', {
            description: 'a new blog post',
            prompts: [{
                type: 'input',
                name: 'title',
                message: 'Blog title please'
            }, {

                type: 'input',
                name: 'tags',
                message: 'Tags(comma seperated, dasherized)',
                transformer: (value) => { return value; }

            }],
            actions: [{
                type: 'add',
                path: '../../diary/blog/{{titleDate}}-{{dashCase title}}.md',
                templateFile: 'plop-templates/blog.hbs'
            }]
        });
};