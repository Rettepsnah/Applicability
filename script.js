// --- TAB SWITCHING LOGIC ---
function switchTab(tabId) {
    // Skjul alt innhold
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    // Deaktiver alle knapper
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // Vis valgt innhold
    document.getElementById('view-' + tabId).classList.add('active');
    
    // Aktiver riktig knapp
    const buttons = document.querySelectorAll('.tab-btn');
    if(tabId === 'flowchart') buttons[0].classList.add('active');
    if(tabId === 'interactive') buttons[1].classList.add('active');
}


// --- VEILEDER LOGIKK (DATABASE OG FUNKSJONER) --- 

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

let userSelectedNonEasa = false;
let isHelicopterCase = false;

const steps = [
    {
        id: 0,
        type: 'yesno',
        question: "Er virksomheten etablert på en EASA-lufthavn?",
        details: [
            {
                title: "Hva er en EASA-lufthavn?",
                content: `
                    <p><strong>Hva skiller en EASA-lufthavn fra en nasjonal lufthavn?</strong><br>
                    Forordning (EU) 2025/20 og 2025/23 gjelder kun bakketjenester levert på EASA-lufthavner. For å vite om lufthavnen dere opererer på er omfattet, må dere se på hvilke kriterier lufthavnen oppfyller etter basisforordning (EU) 2018/1139.</p>

                    <strong>1. Hva er en EASA-lufthavn? (Omfattet av regelverket)</strong>
                    <p>En lufthavn faller inn under EASA-regelverket (basisforordning 2018/1139 art. 2) dersom den oppfyller alle følgende kriterier:</p>
                    <ul>
                        <li>Den er åpen for allmenn bruk.</li>
                        <li>Den betjener næringsmessig lufttransport (kommersielle flyvninger).</li>
                        <li>Den har en asfaltert instrumentrullebane på 800 meter eller mer, eller betjener utelukkende helikoptre med instrumentinnflyging.</li>
                    </ul>
                    <p>Disse lufthavnene skal ha et EASA-sertifikat i henhold til forordning (EU) 139/2014.</p>

                    <a href="https://www.easa.europa.eu/en/datasets/aerodromes-falling-scope-regulation-eu-20181139" target="_blank" style="color:var(--caa-blue-light); text-decoration:underline;">Se fullstendig liste her (EASA)</a>`
            }
        ],
        lookupWidget: true, 
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
                id: 'ghsp', label: 'Selvstendig GHSP', innerTitle: 'Ground Handling Service Provider',
                innerDesc: "Tilbydere av bakketjenester på EASA-lufthavner, iht. basisforordning (EU) 2018/1139" 
            },
            { 
                id: 'adr', label: 'ADR - Lufthavnoperatør', innerTitle: 'Lufthavnsoperatør',
                innerDesc: "Lufthavnsoperatør som også er tilbyder av bakketjenester" 
            },
            { 
                id: 'aoc', label: 'AOC med self-handling', innerTitle: 'Air Operator Certificate',
                innerDesc: "CAT-operasjoner med komplekse, motordrevne fly med faste vinger" 
            }
        ],
        next: 2, 
        none: "result_none"
    },
    {
        id: 2,
        type: 'selection', 
        question: "Type bakketjenester",
        subtext: "Velg en av tjenestene dere tilbyr for å gå videre.",
        choices: [
            { 
                id: 'pax', label: 'Passenger Handling', icon: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
                innerTitle: 'Tilbyder av bakketjenester innen håndtering av passasjerer:', 
                innerDesc: `<ul><li>PRM (Personer med redusert mobilitet)</li><li>Oppsyn med passasjerer under boarding og de-boarding.</li><li>Transport av passasjerer mellom terminal og flymaskin.</li></ul><em>Ref. (EU) 2025/20 - Artikkel 2 - (a)</em>`
            },
            { 
                id: 'bag', label: 'Baggage Handling', icon: '<svg viewBox="0 0 24 24"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z"/></svg>',
                innerTitle: 'Tilbyder av bakketjenester innen håndtering av bagasje:', 
                innerDesc: `<ul><li>Sortering og stabling av bagasje</li><li>Transfer av bagasje</li><li>Transport og levering på transportbånd</li></ul><em>Ref. (EU) 2025/20 - Artikkel 2 - (b)</em>`
            },
            { 
                id: 'air', label: 'Aircraft Servicing', icon: '<svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
                innerTitle: 'Tilbyder av bakketjenester innen flyservice:', 
                innerDesc: `<ul><li>Operasjoner med bakkeutstyr på flyoppstillingsplass</li><li>Lasting og lossing av catering</li><li>Flytanking</li><li>Toalettservice</li><li>Vannservice</li><li>Utvendig rengjøring av flymaskin</li><li>De-icing og anti-icing</li></ul><em>Ref. (EU) 2025/20 - Artikkel 2 - (c)</em>`
            },
            { 
                id: 'turn', label: 'Turnaround Activities', icon: '<svg viewBox="0 0 24 24"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>',
                innerTitle: 'Tilbyder av bakketjenester innen turn-around:', 
                innerDesc: `<ul><li>Ankomsttjenster (FOD og sikring av flyvemaskin på flyoppstillingsplass)</li><li>Lasting og lossing av flymaskin, inkl. bagasje, frakt, catering og loading supervision</li><li>Avgangsprosedyrer</li><li>Push-back og tauing</li></ul><em>Ref. (EU) 2025/20 - Artikkel 2 - (d)</em>`
            },
            { 
                id: 'cargo', label: 'Cargo & Mail Handling', icon: '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-1 18H5V9h14v11zm1-13H4V4h16v3z"/></svg>',
                innerTitle: 'Tilbyder av bakketjenester innen frakt og post:', 
                innerDesc: `<ul><li>Aksept av frakt; på vegne av flyoperatøren</li><li>Siste oppbygging/ stabling og lagring av frakt</li><li>Siste veiing og tagging av ULD/ container</li><li>"Final checks" før luftftransport</li><li>Bakketransport av frakt og post mellom område for "Final checks" og flymaskin</li></ul>`
            }
        ],
        next: 3,
        none: "result_none"
    },
    {
        id: 3,
        type: 'yesno',
        question: "Er driften begrenset til ett eller flere av påfølgende punkter?",
        details: [
            { 
                title: "Liste over unntatte tjenester", alwaysOpen: true, 
                content: `
                <ul>
                    <li>Marshalling, iht. <a href="https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-aerodromes-regulation-eu-no-1392014" target="_blank" style="color:var(--caa-blue-light); text-decoration:underline;">(EU) 139/2014</a></li>
                    <li>Flight dispatch, iht. <a href="https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-air-operations-regulation-eu-no-9652012" target="_blank" style="color:var(--caa-blue-light); text-decoration:underline;">(EU) 965/2012</a></li>
                    <li>Load control (herunder lasteplan, vekt og balanse, meldinger/kommunikasjon, utstedelse av dokumenter)</li>
                    <li>Ground supervision</li>
                    <li>Vedlikeholdsarbeid iht. <a href="https://www.easa.europa.eu/en/document-library/regulations/commission-regulation-eu-no-13212014" target="_blank" style="color:var(--caa-blue-light); text-decoration:underline;">(EU) 1321/2014</a>
                        <ul style="margin-top:5px; margin-bottom:5px; list-style-type: circle;">
                            <li>Oljeservice</li>
                            <li>Ekstern vask av flymaskin</li>
                            <li>Annet vedlikeholdsarbeid, inkl. tauing av fly.</li>
                        </ul>
                    </li>
                    <li>AOC self-handling
                        <ul style="margin-top:5px; margin-bottom:5px; list-style-type: circle;">
                            <li>CAT-operasjoner med ikke-komplekse motordrevne fly</li>
                            <li>Flyoperasjoner med komplekse eller annet-enn-komplekse motordrevne fly som ikke er CAT</li>
                        </ul>
                    </li>
                    <li>Lufthavnsoperatører som utelukkende
                        <ul style="margin-top:5px; margin-bottom:5px; list-style-type: circle;">
                            <li>Utfører PRM-tjeneste (personer med redusert mobilitet)</li>
                            <li>Utfører bakketransport av passasjerer og flybesetning (typisk busstjeneste)</li>
                        </ul>
                    </li>
                </ul><div style="margin-top:20px; font-style:italic; color:#666; font-size:0.85rem;">Ref. (EU) 2025/20 - Artikkel 2 - (3)</div>` 
            }
        ],
        yes: "result_none",
        no: "result_declare"
    }
];

const results = {
    "result_none": { 
        title: "Ingen deklarering", 
        desc: "Virksomheten er ikke omfattet av regelverket, og du trenger ikke å levere samsvarserklæring i henhold til (EU) 2025/20.<br><br><strong>Årsak:</strong> Tjenestene eller lufthavnen faller utenfor forordningens virkeområde.", 
        type: "res-none" 
    },
    "result_declare": { 
        title: "Krav om samsvarserklæring", 
        desc: "Virksomheten din er omfattet av regelverket og du må levere samsvarserklæring.<br><br><strong>Årsak:</strong> Dere utfører regulerte bakketjenester på en EASA-lufthavn.<br><br>Portalen for mottak av erklæringer åpnes tidligst 27. mars 2027.", 
        type: "res-action" 
    },
    "result_helicopter": {
        title: "Ingen deklarering (Helikopter-operasjoner)",
        desc: "Virksomheten er ikke omfattet av regelverket fordi helikopteroperasjoner er unntatt i henhold til forordning (EU) 2025/20.<br><br>Du trenger ikke å levere samsvarserklæring.",
        type: "res-heli"
    }
};

const container = document.getElementById('app-card');
let historyStack = []; 

function init() { renderStartPage(); }

function restartApp() {
    historyStack = [];
    userSelectedNonEasa = false;
    isHelicopterCase = false;
    renderStartPage();
}

// Render Start Page
function renderStartPage() {
    container.innerHTML = `
        <div style="text-align:center;">
            <h2 class="question-title">Er virksomheten min omfattet av regelverket?</h2>
            <div class="subtext">
                <p>Denne veilederen hjelper deg å avklare om din organisasjon må levere samsvarserklæring for ground handling i henhold til forordning (EU) 2025/20.</p>
            </div>
            
            <div class="disclaimer">
                <strong>Viktig informasjon:</strong>
                Dette verktøyet er kun ment som veiledning. Det er organisasjonens eget ansvar å sette seg inn i og følge gjeldende regelverk.
                <br><br>
                Ved behov for avklaring, ta kontakt med Luftfartstilsynet på: <a href="mailto:postmottak@caa.no" style="color:var(--caa-blue-light);">postmottak@caa.no</a>
            </div>

            <div class="action-bar action-bar-center">
                <button class="btn btn-primary" onclick="startFlow()">Start sjekken</button>
            </div>
        </div>
    `;
}

function startFlow() { renderStep(0); }

function goBack() {
    if(historyStack.length > 0) {
        const prevStepId = historyStack.pop();
        renderStep(prevStepId, false); 
    } else {
        renderStartPage();
    }
}

function renderStep(stepId, pushToHistory = true) {
    const data = steps[stepId];
    
    let html = `
        ${stepId > 0 ? `<button class="btn-back" onclick="goBack()">← Tilbake</button>` : ''}
        <h2 class="question-title">${data.question}</h2>
        ${data.subtext ? `<div class="subtext">${data.subtext}</div>` : ''}
    `;

    if (data.lookupWidget) {
        html += `
        <div class="airport-lookup-wrapper">
            <label style="font-weight:600; display:block;">Søk på navn eller ICAO-kode:</label>
            <div class="lookup-input-group">
                <input type="text" id="icao-input" class="lookup-input" placeholder="Eks. ENGM" onkeypress="if(event.key === 'Enter') checkAirport()">
                <button class="btn btn-primary" onclick="checkAirport()">Sjekk</button>
            </div>
            <div id="lookup-result" class="lookup-result"></div>
        </div>
        `;
    }

    if (data.details) {
        data.details.forEach(d => {
            html += `<details ${d.alwaysOpen ? 'open' : ''}><summary>${d.title}</summary><div class="info-content">${d.content}</div></details>`;
        });
    }

    html += `<div class="action-bar ${data.type !== 'selection' ? 'action-bar-center' : ''}" id="action-area" style="${data.type === 'selection' ? 'flex-direction:column; border:none; padding:0;' : ''}">`;

    if (data.type === 'selection') {
        const choices = data.choices.map(c => `
            <div class="selection-option" id="choice-${c.id}" onclick="selectOption('${c.id}')">
                ${c.icon ? `<div class="sel-icon">${c.icon}</div>` : ''}
                <span class="sel-label">${c.label}</span>
                <div class="inner-details">
                     <details onclick="event.stopPropagation()">
                        <summary>Les mer</summary>
                        <div class="info-content">
                            <strong>${c.innerTitle}</strong><br>
                            ${c.innerDesc}
                        </div>
                    </details>
                </div>
            </div>`).join('');
        
        html += `
            <div class="selection-grid">${choices}</div>
            <div style="display:flex; justify-content:center; gap:15px; margin-top:20px;">
                 <button class="btn btn-primary" id="btn-cont" disabled onclick="handleResponse(${stepId}, 'continue')">Fortsett</button>
                 <button class="btn btn-outline" onclick="handleResponse(${stepId}, 'none')">Ingen av disse</button>
            </div>
        `;
    } else {
        const style = data.lookupWidget ? 'display:none;' : '';
        html += `
            <button class="btn btn-primary" id="btn-yes" style="${style}" onclick="handleResponse(${stepId}, true)">Ja</button>
            <button class="btn btn-secondary" id="btn-no" style="${style}" onclick="handleResponse(${stepId}, false)">Nei</button>
        `;
    }

    html += `</div>`; 

    container.innerHTML = html;
    window.scrollTo(0,0);
}

function checkAirport() {
    let input = document.getElementById(`icao-input`).value.trim().toUpperCase();
    const resBox = document.getElementById(`lookup-result`);
    const btnYes = document.getElementById('btn-yes');
    
    resBox.style.display = "block";
    
    let found = airportDB[input];

    if (!found) {
        const searchStr = input.toLowerCase();
        if (searchStr.length > 2) { 
            for (const [code, data] of Object.entries(airportDB)) {
                if (data.name.toLowerCase().includes(searchStr)) {
                    found = data;
                    input = code; 
                    break; 
                }
            }
        }
    }

    if (found) {
        if (found.isHelicopter) {
            userSelectedNonEasa = true;
            isHelicopterCase = true;
            resBox.className = "lookup-result res-warn";
            resBox.innerHTML = `<strong>${found.name} (${input})</strong><br>Helikopteroperasjoner er unntatt.<br><br>Virksomheten er dermed unntatt krav om å levere samsvarserklæring.`;
            btnYes.style.display = 'inline-block';
            btnYes.innerText = "Fortsett veilederen likevel";
            
        } else if (!found.easa) {
            userSelectedNonEasa = true;
            isHelicopterCase = false;
            resBox.className = "lookup-result res-bad";
            resBox.innerHTML = `<strong>${found.name} (${input})</strong> er IKKE en EASA-lufthavn.<br><br>Virksomheten er dermed unntatt krav om å levere samsvarserklæring.`;
            btnYes.style.display = 'inline-block';
            btnYes.innerText = "Fortsett veilederen likevel";

        } else {
            userSelectedNonEasa = false;
            isHelicopterCase = false;
            resBox.className = "lookup-result res-ok";
            resBox.innerHTML = `<strong>${found.name} (${input})</strong> er en EASA-lufthavn.`;
            btnYes.style.display = 'inline-block';
            btnYes.innerText = "Ja, gå videre";
        }
    } else {
        resBox.className = "lookup-result res-warn";
        resBox.innerHTML = "Fant ingen treff i listen over norske EASA-lufthavner.";
        btnYes.style.display = 'none';
    }
}

function selectOption(id) {
    document.querySelectorAll('.selection-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('choice-'+id).classList.add('selected');
    document.getElementById('btn-cont').disabled = false;
}

function handleResponse(currentStepId, answer) {
    historyStack.push(currentStepId);

    let next = steps[currentStepId].type === 'selection' ? (answer === 'none' ? steps[currentStepId].none : steps[currentStepId].next) : (answer ? steps[currentStepId].yes : steps[currentStepId].no);
    
    if (typeof next !== 'number' && userSelectedNonEasa) {
         next = isHelicopterCase ? "result_helicopter" : "result_none";
    }

    if (typeof next === 'number') {
        renderStep(next, false); 
    } else {
        renderResult(next);
    }
}

function renderResult(key) {
    const res = results[key];
    let iconColor = "";
    let svgIcon = "";

    if (key === "result_declare") {
        iconColor = "var(--status-success-text)";
        svgIcon = `<svg viewBox="0 0 24 24"><path fill="${iconColor}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    } else if (key === "result_helicopter") {
        iconColor = "var(--status-warning-text)";
        svgIcon = `<svg viewBox="0 0 24 24"><path fill="${iconColor}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    } else {
        iconColor = "var(--status-danger-text)";
        svgIcon = `<svg viewBox="0 0 24 24"><path fill="${iconColor}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    }

    container.innerHTML = `
        <div class="result-box">
            <div class="result-icon">${svgIcon}</div>
            <h2 class="result-title">${res.title}</h2>
            <div class="result-desc">${res.desc}</div>
            <div class="action-bar action-bar-center">
                <button class="btn btn-secondary" onclick="restartApp()">Start på nytt</button>
            </div>
        </div>
    `;
    window.scrollTo(0,0);
}

// Start applikasjonen når skriptet lastes
init();