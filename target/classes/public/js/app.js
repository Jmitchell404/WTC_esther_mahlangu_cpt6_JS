var person_details = ""

const defaultTemplate = Handlebars.compile($('#default-template').html());
const loginPage = Handlebars.compile($('#login-template').html());

const app = $('#app');

const router = new Router({
    mode:'hash',
    root:'index.html',
    page404: (path) => {
        const html = defaultTemplate();
        app.html(html);
    }
});

function login() {
    console.log('login');
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (event) => {
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

        let response = await fetch(`http://localhost:5050/people`, options)
        response = await response.json();
        person_details = response;
        router.navigateTo("/expenses")
    });;
}

function paymentRequestReceived(){
    console.log('paymentrequestreceived');
    const form = document.getElementById("payment-request-rececieved");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const personId = {"email": data.get("email")};
        
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email)
        };

        // document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`http://localhost:5050/paymentrequests/received/${personId}`, options)
            .then(response => response.json())
            .then(data => {
                data = {
                    email: data.email,
                }
                console.log(JSON.stringify(data));
            });
    });;
}

function newExpense(){
    console.log('newexpense');
    const form = document.getElementById("new-expense");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const personId = {"email": data.get("email")};

        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email)
        };

        // document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

        fetch(`http://localhost:5050/newexpense/received/${personId}`, options)
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
    // const thesaurusTemplate = Handlebars.compile($('#thesaurus-template').html());
    // const antonymTemplate = Handlebars.compile($('#antonym-template').html());
    // const synonymTemplate = Handlebars.compile($('#synonym-template').html());
    
    

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

router.add('/login', async () => {
    console.log('login');
    html = loginPage();
    app.html(html);
    login();
});

router.navigateTo('/login');
});
  // end::router[]