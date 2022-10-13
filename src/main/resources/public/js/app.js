var person_details = ""

const defaultTemplate = Handlebars.compile($('#default-template').html());
const loginPage = Handlebars.compile($('#login-template').html());
const paymentRequestReceivedPage = Handlebars.compile($('#payment-request-rececieved-template').html());

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
        router.navigateTo("/paymentrequests_recieved")
    });;
}

async function paymentRequestReceived(){
    console.log('paymentrequestreceived');
    
    const personId = person_details.id;

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    };

    // document.getElementById('results').innerHTML = `<p>Searching for <em>${word}'</em>...</p>`;

    fetch(`http://localhost:5050/paymentrequests/received/${personId}`, options)
        .then(response => response.json())
        .then(data => {
            data = {
                info: data
            };
            
            var request = {data:[]}
            JSON.stringify(data.info)
            data.info.forEach(element => {
                // request.data.push(element.id);
                // request.data.push(element.date);
                // request.data.push(element.expenseId);
                // request.data.push(element.amount);
                // request.data.push(element.fromPersonId);
                // request.data.push(element.toPersonId);
                // request.data.push(element.isPaid);
                request.data.push({
                    id: element.id,
                    date: element.date,
                    expenseId: element.expenseId,
                    amount: element.amount,
                    who: "Student"+element.fromPersonId,
                    to_whom: element.toPersonId,
                    paid: element.isPaid
                });
            });
            console.log(request);
            const template = document.getElementById('result_payment_request_recieved_template').innerText;
            const compiledFunction = Handlebars.compile(template);
            document.getElementById('results_payment-request-rececieved').innerHTML = compiledFunction(request);
        });
    
        // .then(response => response.json())
        // .then(data => {});;
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

router.add('/paymentrequests_recieved', async () => {
    html = paymentRequestReceivedPage();
    app.html(html);
    paymentRequestReceived();
});

router.addUriListener();

// $('a').on('click', (event) => {
//     event.preventDefault();
//     const target = $(event.target);
//     const href = target.attr('href');
//     const path = href.substring(href.lastIndexOf('/'));
//     router.navigateTo(path);
// });

router.add('/login', async () => {
    html = loginPage();
    app.html(html);
    login();
});

router.navigateTo('/login');
});
  // end::router[]
