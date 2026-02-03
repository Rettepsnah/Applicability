/* --- DATA & KONFIGURASJON --- */

const airportDB = {
    "ENGM": { name: "Oslo lufthavn, Gardermoen", easa: true },
    "ENBR": { name: "Bergen lufthavn, Flesland", easa: true },
    "ENVA": { name: "Trondheim lufthavn, Værnes", easa: true },
    "ENZV": { name: "Stavanger lufthavn, Sola", easa: true },
    "ENTC": { name: "Tromsø lufthavn, Langnes", easa: true },
    "ENBL": { name: "Førde Lufthamn, Bringeland", easa: true },
    "ENBO": { name: "Bodø lufthavn", easa: true },
    "ENEV": { name: "Harstad/Narvik lufthavn, Evenes", easa: true },
    "ENCN": { name: "Kristiansand lufthavn, Kjevik", easa: true },
    "ENAL": { name: "Ålesund lufthavn, Vigra", easa: true },
    "ENHD": { name: "Haugesund lufthavn, Karmøy", easa: true },
    "ENML": { name: "Molde lufthavn, Årø", easa: true },
    "ENKR": { name: "Kirkenes lufthavn, Høybuktmoen", easa: true },
    "ENAT": { name: "Alta lufthavn", easa: true },
    "ENBS": { name: "Båtsfjord lufthavn", easa: true },
    "ENKB": { name: "Kristiansund lufthavn, Kvernberget", easa: true },
    "ENSB": { name: "Svalbard lufthavn, Longyear", easa: true },
    "ENSR": { name: "Sørkjosen lufthavn", easa: true },
    "ENTO": { name: "Sandefjord lufthavn, Torp", easa: true },
    "ENSO": { name: "Stord lufthavn", easa: true },
    "ENSG": { name: "Sogndal lufthamn, Haukåsen", easa: true },
    "ENSS": { name: "Vardø lufthavn, Svartnes", easa: true },
    "ENLK": { name: "Leknes lufthavn", easa: true },
    "ENMS": { name: "Mosjøen lufthavn, Kjærstad", easa: true },
    "ENST": { name: "Sandnessjøen lufthavn, Stokka", easa: true },
    "ENRY": { name: "Moss lufthavn, Rygge", easa: false },
    "ENOL": { name: "Ørland lufthavn", easa: false },
    "ENGK": { name: "Arendal lufthavn, Gullknapp", easa: false },
    "ENAN": { name: "Andøya lufthavn", easa: true },
    "ENHF": { name: "Hammerfest lufthavn", easa: true },
    "ENHV": { name: "Honningsvåg lufthavn, Valan", easa: true },
    "ENVD": { name: "Vadsø lufthavn", easa: true },
    "ENRS": { name: "Røst lufthavn", easa: true },
    "ENSH": { name: "Svolvær lufthavn", easa: true },
    "ENRA": { name: "Mo i Rana lufthavn", easa: true },
    "ENBN": { name: "Brønnøysund lufthavn", easa: true },
    "ENNA": { name: "Lakselv lufthavn, Banak", easa: true },
    "ENSD": { name: "Sandane lufthavn", easa: true },
    "ENFL": { name: "Florø lufthavn", easa: true },
    "ENOV": { name: "Hovden lufthavn, Ørsta/Volda", easa: true },
    "ENRM": { name: "Rørvik lufthavn", easa: true },
    "ENRO": { name: "Røros lufthavn", easa: true },
    "ENNM": { name: "Namsos lufthavn", easa: true },
    "ENMH": { name: "Mehamn lufthavn", easa: true },
    "ENBV": { name: "Berlevåg lufthavn", easa: true },
    "ENHK": { name: "Hasvik lufthavn", easa: true },
    "ENSK": { name: "Stokmarknes lufthavn", easa: true },
    "ENVR": { name: "Værøy Helikopterhavn, Tabbisodden", easa: true, isHelicopter: true },
    "ENBH": { name: "Bergen Helikopterhavn, Haakonsvern", easa: true, isHelicopter: true },
    "ENNO": { name: "Notodden lufthavn, Tuven", easa: false },
    "ENDU": { name: "Bardufoss lufthavn", easa: false }
};

const steps = [
    {
        id: 0,
        type: 'lookup',
        question: "Er virksomheten etablert på en EASA-lufthavn?",
        subtext: "Forordning (EU) 2025/20 gjelder kun bakketjenester levert på EASA-sertifiserte lufthavner.",
        details: [
            {
                title: "Hva er en EASA-lufthavn?",
                content: `
                    <p>En lufthavn faller inn under EASA-regelverket dersom den oppfyller alle følgende kriterier:</p>
                    <ul>
                        <li>Den er åpen for allmenn bruk.</li>
                        <li>Den betjener næringsmessig lufttransport (kommersielle flyvninger).</li>
                        <li>Den har en asfaltert instrumentrullebane på 800 meter eller mer.</li>
                    </ul>
                `
            }
        ],
        yes: 1,
        no: "result_none"
    },
    {
        id: 1,
        type: 'selection',
        question: "Type virksomhet",
        subtext: "Velg kategorien som passer for din organisasjon.",
        choices: [
            { 
                id: 'ghsp', label: 'Selvstendig GHSP', 
                icon: '<i class="fas fa-building"></i>',
                innerDesc: "Tilbydere av bakketjenester på EASA-lufthavner, iht. basisforordning (EU) 2018/1139." 
            },
            { 
                id: 'adr', label: 'ADR - Lufthavnoperatør', 
                icon: '<i class="fas fa-tower-control"></i>',
                innerDesc: "Lufthavnsoperatør som også er tilbyder av bakketjenester." 
            },
            { 
                id: 'aoc', label: 'AOC med self-handling', 
                icon: '<i class="fas fa-plane"></i>',
                innerDesc: "CAT-operasjoner med komplekse, motordrevne fly med faste vinger." 
            }
        ],
        next: 2, 
        none: "result_none"
    },
    {
        id: 2,
        type: 'selection', 
        question: "Type bakketjenester",
        subtext: "Hvilken tjeneste tilbyr dere?",
        choices: [
            { id: 'pax', label: 'Passenger Handling', icon: '<i class="fas fa-user-friends"></i>', innerDesc: "Innsjekk, boarding, PRM, transport av passasjerer." },
            { id: 'bag', label: 'Baggage Handling', icon: '<i class="fas fa-suitcase"></i>', innerDesc: "Sortering, stabling, transport til/fra fly." },
            { id: 'air', label: 'Aircraft Servicing', icon: '<i class="fas fa-gas-pump"></i>', innerDesc: "Tanking, catering, toalettservice, de-icing." },
            { id: 'turn', label: 'Turnaround Activities', icon: '<i class="fas fa-sync-alt"></i>', innerDesc: "Push-back, tauing, lasting/lossing, marshalling." },
            { id: 'cargo', label: 'Cargo & Mail', icon: '<i class="fas fa-box-open"></i>', innerDesc: "Håndtering av frakt og post, lasting av ULD." }
        ],
        next: 3,
        none: "result_none"
    },
    {
        id: 3,
        type: 'yesno',
        question: "Er driften begrenset til unntatte tjenester?",
        subtext: "Noen spesifikke operasjoner er unntatt fra kravet om samsvarserklæring.",
        details: [
            { 
                title: "Se liste over unntak", 
                content: `
                <ul>
                    <li>Marshalling, Flight dispatch, Load control, Ground supervision.</li>
                    <li>Vedlikeholdsarbeid (oljeservice, ekstern vask, teknisk).</li>
                    <li>AOC self-handling med ikke-komplekse fly.</li>
                    <li>Lufthavnsoperatører som kun utfører PRM eller passasjertransport (buss).</li>
                </ul>` 
            }
        ],
        yes: "result_none",
        no: "result_declare"
    }
];

const results = {
    "result_none": { 
        title: "Ingen deklarering", 
        desc: "Virksomheten er ikke omfattet av regelverket, og du trenger ikke å levere samsvarserklæring i henhold til (EU) 2025/20.", 
        type: "success",
        icon: '<i class="fas fa-check-circle"></i>'
    },
    "result_declare": { 
        title: "Krav om samsvarserklæring", 
        desc: "Virksomheten din er omfattet av regelverket og du må levere samsvarserklæring. Portalen for mottak av erklæringer åpnes tidligst 27. mars 2027.", 
        type: "warning",
        icon: '<i class="fas fa-exclamation-triangle"></i>'
    },
    "result_helicopter": {
        title: "Ingen deklarering (Helikopter)",
        desc: "Helikopteroperasjoner er unntatt i henhold til forordning (EU) 2025/20. Du trenger ikke å levere samsvarserklæring.",
        type: "success",
        icon: '<i class="fas fa-helicopter"></i>'
    }
};

/* --- STATER --- */
let currentStepId = 0;
let historyStack = [];
let userSelectedNonEasa = false;
let isHelicopterCase = false;

/* --- DOM ELEMENTER --- */
const welcomeScreen = document.getElementById('welcome-screen');
const questionCard = document.getElementById('question-card');
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const secondaryOptionsContainer = document.getElementById('secondary-options-container');
const lookupContainer = document.getElementById('lookup-container');
const lookupInput = document.getElementById('icao-input');
const lookupBtn = document.getElementById('lookup-btn');
const lookupResult = document.getElementById('lookup-result');
const resultArea = document.getElementById('result-area');
const resultBox = document.getElementById('result-box');
const backBtn = document.getElementById('back-btn');
const progressBar = document.getElementById('progress-bar');

/* --- EVENT LISTENERS --- */
document.getElementById('start-btn').addEventListener('click', startFlow);
backBtn.addEventListener('click', goBack);
lookupBtn.addEventListener('click', checkAirport);
lookupInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkAirport();
});

/* --- FUNKSJONER --- */

function startFlow() {
    welcomeScreen.classList.add('hidden');
    questionCard.classList.remove('hidden');
    renderStep(0);
}

function renderStep(stepId) {
    currentStepId = stepId;
    const step = steps.find(s => s.id === stepId);
    
    // Reset view
    optionsContainer.innerHTML = '';
    secondaryOptionsContainer.innerHTML = '';
    lookupContainer.classList.add('hidden');
    resultArea.classList.add('hidden');
    lookupResult.classList.add('hidden');
    lookupInput.value = '';
    
    // Update Content
    questionTitle.innerText = step.question;
    questionText.innerHTML = step.subtext || '';

    // Update Progress Bar
    const progress = ((stepId) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Show Back Button if history exists
    if (historyStack.length > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    // Render Details / Accordion if exists
    if (step.details) {
        step.details.forEach(d => {
            const detailsEl = document.createElement('details');
            detailsEl.innerHTML = `
                <summary>${d.title}</summary>
                <div class="details-content">${d.content}</div>
            `;
            questionText.appendChild(detailsEl);
        });
    }

    // Render Logic based on Type
    if (step.type === 'lookup') {
        lookupContainer.classList.remove('hidden');
        // Lookup button logic is handled by specific checkAirport function
    } 
    else if (step.type === 'selection') {
        step.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'btn-option';
            btn.innerHTML = `
                <div class="btn-option-icon">${choice.icon || ''}</div>
                <div class="btn-option-title">${choice.label}</div>
                <div class="btn-option-desc">${choice.innerDesc || ''}</div>
            `;
            btn.onclick = () => handleResponse(stepId, choice.id);
            optionsContainer.appendChild(btn);
        });

        if (step.none) {
            const noneBtn = document.createElement('button');
            noneBtn.className = 'btn-secondary';
            noneBtn.innerText = 'Ingen av disse';
            noneBtn.onclick = () => handleResponse(stepId, 'none');
            secondaryOptionsContainer.appendChild(noneBtn);
        }
    } 
    else if (step.type === 'yesno') {
        const yesBtn = document.createElement('button');
        yesBtn.className = 'btn-option';
        yesBtn.innerHTML = '<div class="btn-option-title">Ja</div>';
        yesBtn.onclick = () => handleResponse(stepId, true);
        
        const noBtn = document.createElement('button');
        noBtn.className = 'btn-option';
        noBtn.innerHTML = '<div class="btn-option-title">Nei</div>';
        noBtn.onclick = () => handleResponse(stepId, false);

        optionsContainer.appendChild(yesBtn);
        optionsContainer.appendChild(noBtn);
    }
}

function handleResponse(stepId, answer) {
    historyStack.push(stepId);
    
    const step = steps.find(s => s.id === stepId);
    let nextStepKey;

    if (step.type === 'selection') {
        nextStepKey = (answer === 'none') ? step.none : step.next;
    } else {
        // For Yes/No or Lookup handling
        nextStepKey = (answer === true) ? step.yes : step.no;
    }

    // Override logic for Airport Exceptions (Helicopter / Non-EASA)
    // If user clicked "Continue anyway" (handled as true in checkAirport), 
    // but we know it's non-EASA, we might want to redirect final result.
    if (typeof nextStepKey !== 'number' && userSelectedNonEasa) {
        nextStepKey = isHelicopterCase ? "result_helicopter" : "result_none";
    }

    if (typeof nextStepKey === 'number') {
        renderStep(nextStepKey);
    } else {
        showResult(nextStepKey);
    }
}

function checkAirport() {
    let input = lookupInput.value.trim().toUpperCase();
    lookupResult.classList.remove('hidden');
    optionsContainer.innerHTML = ''; // Clear previous buttons if any

    let found = airportDB[input];

    // Fuzzy Search
    if (!found && input.length > 2) {
        const searchStr = input.toLowerCase();
        for (const [code, data] of Object.entries(airportDB)) {
            if (data.name.toLowerCase().includes(searchStr)) {
                found = data;
                input = code;
                break;
            }
        }
    }

    if (found) {
        if (found.isHelicopter) {
            userSelectedNonEasa = true;
            isHelicopterCase = true;
            lookupResult.className = 'lookup-feedback feedback-warning';
            lookupResult.innerHTML = `<strong>${found.name} (${input})</strong><br>Helikopteroperasjoner er unntatt.`;
            
            createContinueButton("Fortsett veilederen likevel", true);
        } 
        else if (!found.easa) {
            userSelectedNonEasa = true;
            isHelicopterCase = false;
            lookupResult.className = 'lookup-feedback feedback-error';
            lookupResult.innerHTML = `<strong>${found.name} (${input})</strong> er IKKE en EASA-lufthavn.<br>Du er sannsynligvis unntatt.`;
            
            createContinueButton("Fortsett veilederen likevel", true);
        } 
        else {
            userSelectedNonEasa = false;
            isHelicopterCase = false;
            lookupResult.className = 'lookup-feedback feedback-success';
            lookupResult.innerHTML = `<strong>${found.name} (${input})</strong> er en EASA-lufthavn.`;
            
            createContinueButton("Gå videre", true);
        }
    } else {
        lookupResult.className = 'lookup-feedback feedback-warning';
        lookupResult.innerHTML = "Fant ingen treff i listen over norske EASA-lufthavner.";
        // No continue button if not found? Or maybe "Not in list" button.
        // For now, simple logic:
    }
}

function createContinueButton(text, val) {
    const btn = document.createElement('button');
    btn.className = 'btn-start'; // Reuse start button style
    btn.style.marginTop = '20px';
    btn.innerHTML = `${text} <i class="fas fa-arrow-right"></i>`;
    btn.onclick = () => handleResponse(0, val);
    optionsContainer.appendChild(btn);
}

function showResult(key) {
    const res = results[key];
    
    // Hide question elements
    document.querySelector('.card-content').classList.add('hidden');
    backBtn.classList.add('hidden');
    progressBar.style.width = '100%';

    // Show result container
    resultArea.classList.remove('hidden');
    
    // Set content
    const iconContainer = document.getElementById('result-icon-container');
    
    if(res.type === 'success') iconContainer.className = 'result-icon-wrapper res-icon-success';
    else if(res.type === 'warning') iconContainer.className = 'result-icon-wrapper res-icon-warning';
    else iconContainer.className = 'result-icon-wrapper res-icon-danger';

    iconContainer.innerHTML = res.icon;
    document.querySelector('.result-header').innerText = res.title;
    resultBox.innerHTML = res.desc;
}

function goBack() {
    if (historyStack.length > 0) {
        const prevId = historyStack.pop();
        // Since handleResponse pushes current step, popping once gets us current step, 
        // popping again gets previous. Wait, usually we push BEFORE moving.
        // Let's rely on renderStep not pushing.
        
        // Actually, easiest way: pop the history stack to get the ID we came FROM.
        renderStep(prevId);
        // We need to pop it again because renderStep doesn't handle history, 
        // but our handleResponse pushed it. 
        // Correct logic: The stack contains the path taken.
        // Current view is NOT in stack. Stack top is previous view.
        // But in my handleResponse I push currentStepId.
        // So renderStep(prevId) sets currentStepId = prevId. 
        // We must remove it from stack so we don't loop.
        historyStack.pop(); 
    } else {
        location.reload();
    }
}