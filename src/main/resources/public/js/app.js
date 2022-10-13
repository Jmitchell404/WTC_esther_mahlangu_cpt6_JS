var person_details = ""

const defaultTemplate = Handlebars.compile($('#default-template').html());
const loginPage = Handlebars.compile($('#login-template').html());
const paymentRequestReceivedPage = Handlebars.compile($('#payment-request-rececieved-template').html());
const newExpensesPage = Handlebars.compile($('#new-expense-template').html());

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
        viewNav();
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


            JSON.stringify(data.info)
            data_list=[]
            var count_amount = 0;
            data.info.forEach(element => {
                count_amount = count_amount + element.amount;
                data_list.push({
                    id: element.id,
                    date: element.date,
                    expenseId: element.expenseId,
                    amount: element.amount,
                    who: "Student"+element.fromPersonId,
                    to_whom: element.toPersonId,
                    paid: element.isPaid
                });
            });
            // request.data.push({grand_total: count_amount});
            var request = {data: data_list,
                grand_total: count_amount
            }
            console.log(request);
            const template = document.getElementById('result_payment_request_recieved_template').innerText;
            const compiledFunction = Handlebars.compile(template);
            document.getElementById('results_payment-request-rececieved').innerHTML = compiledFunction(request);
        });
    
        // .then(response => response.json())
        // .then(data => {});;
}

function viewNav() {
    document.getElementById('nav-bar').innerHTML = document.getElementById('nav-bar-template').innerText;
}

// function paymentRequestSent(){
//     console.log('paymentrequestsent');
// }


function newExpense(){
    console.log('newexpense');
    const form = document.getElementById("new-expense-template");
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

router.add('/new_expenses', async () => {
    html = newExpensesPage();
    app.html(html);
    newExpense();
});

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

//LOGIN ROUTER

router.add('/login', async () => {
    html = loginPage();
    app.html(html);
    login();
});

//MERGED THIS INTO THE FILE
router.navigateTo('/login');

window.addEventListener('load', () => {
    const loginTemplate = Handlebars.compile($('#login-template').html());
    const html = loginTemplate();
    app.html(html);
    login();
});

router.add('/login', async () => {
    html = loginTemplate();
    app.html(html);
    login();
});

router.navigateTo('/login');

router.add('/paymentrequests_sent', async () => {
    html = paymentRequestSentPage();
    app.html(html);
    paymentRequestSent();
});

router.add('/new_expenses', async () => {
    html = newExpensesPage();
    app.html(html);
    newExpense();
});

router.add('/paymentrequests_recieved', async () => {
    html = paymentRequestReceivedPage();
    app.html(html);
    paymentRequestReceived();
});

router.navigateTo('/login');

router.add('/login', async () => {
    html = loginTemplate();
    app.html(html);
    login();
});

router.navigateTo('/login');

router.add('/paymentrequests_sent', async () => {
    html = paymentRequestSentPage();
    app.html(html);
    paymentRequestSent();
});

router.add('/new_expenses', async () => {
    html = newExpensesPage();
    app.html(html);
    newExpense();
});

router.add('/paymentrequests_recieved', async () => {
    html = paymentRequestReceivedPage();
    app.html(html);
    paymentRequestReceived();
});

router.navigateTo('/login');

router.add('/login', async () => {
    html = loginTemplate();
    app.html(html);
    login();
});

router.navigateTo('/login');

router.add('/paymentrequests_sent', async () => {
    html = paymentRequestSentPage();
    app.html(html);
    paymentRequestSent();
});

router.add('/new_expenses', async () => {
    html = newExpensesPage();
    app.html(html);
    newExpense();
});

router.add('/paymentrequests_recieved', async () => {
    html = paymentRequestReceivedPage();
    app.html(html);
});

//ADDED THIS, NOT SURE IF WE NEED IT. i JUST MERGERED THE TWO FILES

fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
        email: 'user@example.com'
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.redirected) {
        window.location.href = response.url;
    }
});


  // end::router[]
