function login() {
    console.log('login');
    const form = document.getElementById("login-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const email = {"email": data.get("email")};
        
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email)
        };

        // document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`http://localhost:5050/people`, options)
            .then(response => response.json())
            .then(data => {
                data = {
                    email: data.email,
                }
                console.log(JSON.stringify(data));
            });
    });;
}

  // tag::router[]
window.addEventListener('load', () => {
    const app = $('#app');
    
    const defaultTemplate = Handlebars.compile($('#default-template').html());
    // const loginPage = Handlebars.compile($('#login-template').html());
    // const thesaurusTemplate = Handlebars.compile($('#thesaurus-template').html());
    // const antonymTemplate = Handlebars.compile($('#antonym-template').html());
    // const synonymTemplate = Handlebars.compile($('#synonym-template').html());
    
    const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
        const html = defaultTemplate();
        app.html(html);
    }
});

// router.add('/dictionary', async () => {
//     html = dictionaryTemplate();
//     app.html(html);
//     lookupWord();
// });

// router.add('/thesaurus', async () => {
//     html = thesaurusTemplate();
//     app.html(html);
// });

// router.add('/antonyms', async () => {
//     html = antonymTemplate();
//     app.html(html);
//     lookupAntonym();
// });

// router.add('/synonyms', async () => {
//     html = synonymTemplate();
//     app.html(html);
//     lookupSynonym();
// });

router.addUriListener();

// $('a').on('click', (event) => {
//     event.preventDefault();
//     const target = $(event.target);
//     const href = target.attr('href');
//     const path = href.substring(href.lastIndexOf('/'));
//     router.navigateTo(path);
// });

// router.add('/login', async () => {
//     html = loginPage();
//     app.html(html);
// });

router.navigateTo('/');
login()
});
  // end::router[]