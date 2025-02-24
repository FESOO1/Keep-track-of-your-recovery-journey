const startRecoveryButton = document.querySelector('#startRecoveryButton');
const recoveryContainer = document.querySelector('.recovery-container');
const failedAttemptsContainer = document.querySelector('.failed-attempts');
let recoveryInterval;
const recovery = {
    isRecoveryStarted: false,
    recoveryStarting: {
        startedTime: 0,
        recoveryStartedDateText: 0,
        recoveryStartedTimeText: 0,
    },
    recoveryCurrent: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    },
    failedAttempts: {
        failedAttemptsCounter: 0,
        failedAttemptsStartedDate: [],
        failedAttemptsStayedSoberFor: [],
    }
};

// FORM
const recoveryForm = document.querySelector('.recovery-form');
const recoveryFormInput = document.querySelector('#recoveryFormInput');
const saveNoteButton = document.querySelector('#saveNoteButton');

// STARTING A NEW RECOVERY

function startingANewRecoveryJourney() {
    recovery.recoveryStarting.startedTime = Date.now();

    // STARTED DATE AND TIME
    const currentDate = new Date();
    recovery.recoveryStarting.recoveryStartedDateText = currentDate.toLocaleDateString();
    recovery.recoveryStarting.recoveryStartedTimeText = currentDate.toLocaleTimeString();
    localStorage.setItem('recoveryLS', JSON.stringify(recovery));
    
    // RECOVERY ITSELF NODE
    const recoveryItself = document.createElement('div');
    const recoveryIntervalStartDate = document.createElement('pre');
    const recoveryIntervalHasBeen = document.createElement('pre');
    recoveryItself.classList.add('recovery-itself');
    recoveryIntervalStartDate.classList.add('recovery-itself-start');
    recoveryIntervalHasBeen.classList.add('recovery-itself-has-been');
    recoveryItself.appendChild(recoveryIntervalStartDate);
    recoveryItself.appendChild(recoveryIntervalHasBeen);
    recoveryContainer.appendChild(recoveryItself);

    // STARTED DATE
    recoveryIntervalStartDate.textContent = `Start date: ${recovery.recoveryStarting.recoveryStartedDateText} - ${recovery.recoveryStarting.recoveryStartedTimeText}`;

    // INTERVAL
    recoveryInterval = setInterval(() => {
        // UPDATING THE SECONDS
        recovery.recoveryCurrent.seconds = (Date.now() - recovery.recoveryStarting.startedTime) / 1000;
        recovery.recoveryCurrent.minutes = (Date.now() - recovery.recoveryStarting.startedTime) / 60000;
        recovery.recoveryCurrent.hours = (Date.now() - recovery.recoveryStarting.startedTime) / 3.6e+6;
        recovery.recoveryCurrent.days = (Date.now() - recovery.recoveryStarting.startedTime) / 8.64e+7;

        // CONVERTING THE NUMBERS INTO STRINGS TO GET THE NEEDED PART USING SLICE METHOD
        const readySeconds = String(recovery.recoveryCurrent.seconds).slice(0, String(recovery.recoveryCurrent.seconds).indexOf('.'));
        const readyMinutes = String(recovery.recoveryCurrent.minutes).slice(0, String(recovery.recoveryCurrent.minutes).indexOf('.'));
        const readyHours = String(recovery.recoveryCurrent.hours).slice(0, String(recovery.recoveryCurrent.hours).indexOf('.'));
        const readyDays = String(recovery.recoveryCurrent.days).slice(0, String(recovery.recoveryCurrent.days).indexOf('.'));

        // DISPLAYING THE TIME THAT HAS BEEN SINCE THE RECOVERY JOURNEY STARTED
        recoveryIntervalHasBeen.textContent = `${readyDays} ${Number(readyDays) > 1 ? 'days' : 'day'}  \n${readyHours} ${Number(readyHours) > 1 ? 'hours' : 'hour'} \n${readyMinutes} ${Number(readyMinutes) > 1 ? 'minutes' : 'minute'} \n${readySeconds} ${Number(readySeconds) > 1 ? 'seconds' : 'second'}`;

        // SAVING THE NUMBER IN LOCAL STORAGE
        localStorage.setItem('recoveryLS', JSON.stringify(recovery));
    }, 1);
};

// TOGGLING THE FUNCTIONALITIES OF RECOVERY BUTTON

function toggleTheFunctionalitiesOfRecoveryButton() {
    if (recovery.isRecoveryStarted === false) {
        startRecoveryButton.textContent = 'RELAPSED?';
        startingANewRecoveryJourney();
        
        recovery.isRecoveryStarted = true;
        localStorage.setItem('recoveryLS', JSON.stringify(recovery));
    } else {
        startRecoveryButton.textContent = 'START RECOVERY';
        openRecoveryForm();
    };
};

// OPEN RECOVERY FORM

function openRecoveryForm() {
    recoveryForm.classList.add('recovery-form-active');
};

// CLOSE RECOVERY FORM

function closeRecoveryForm(e) {
    e.preventDefault();

    if (recoveryFormInput.value.length > 0) {
        // CLOSING THE RECOVERY FORM
        recoveryForm.classList.remove('recovery-form-active');

        relapsedFeature();

        // CHANGING THE BOOLEAN
        recovery.isRecoveryStarted = false;
        localStorage.setItem('recoveryLS', JSON.stringify(recovery));
    };
};

// RELAPSED FEATURE

function relapsedFeature() {
    recoveryContainer.innerHTML = '';

    // STOPPING THE INTERVAL
    clearInterval(recoveryInterval);

    const readySeconds = String(recovery.recoveryCurrent.seconds).slice(0, String(recovery.recoveryCurrent.seconds).indexOf('.'));
    const readyMinutes = String(recovery.recoveryCurrent.minutes).slice(0, String(recovery.recoveryCurrent.minutes).indexOf('.'));
    const readyHours = String(recovery.recoveryCurrent.hours).slice(0, String(recovery.recoveryCurrent.hours).indexOf('.'));
    const readyDays = String(recovery.recoveryCurrent.days).slice(0, String(recovery.recoveryCurrent.days).indexOf('.'));

    // ADDING THE RELAPSED
    failedAttemptsContainer.innerHTML += `
        <div class="failed-attempt">
            <p class="failed-attempt-note"><span>NOTE:</span> ${recoveryFormInput.value}</p>
            <p class="failed-attempt-started-date">Started date: ${recovery.recoveryStarting.recoveryStartedDateText} - ${recovery.recoveryStarting.recoveryStartedTimeText}</p>
            <fieldset class="failed-attempt-sober-for">
                <legend class="failed-attempt-sober-for-header">Stayed sober for:</legend>
                <p class="failed-attempt-sober-for-paragraph">${readyDays} ${Number(readyDays) > 1 ? 'days' : 'day'}  </br>${readyHours} ${Number(readyHours) > 1 ? 'hours' : 'hour'} </br>${readyMinutes} ${Number(readyMinutes) > 1 ? 'minutes' : 'minute'} </br>${readySeconds} ${Number(readySeconds) > 1 ? 'seconds' : 'second'}</p>
            </fieldset>
        </div>
    `;

    // UPDATING THE RECOVERY OBJECT
    recovery.failedAttempts.failedAttemptsCounter++;
    recovery.failedAttempts.failedAttemptsStartedDate.push(`Started date: ${recovery.recoveryStarting.recoveryStartedDateText} - ${recovery.recoveryStarting.recoveryStartedTimeText}`);
    recovery.failedAttempts.failedAttemptsStayedSoberFor.push(`${readyDays} ${Number(readyDays) > 1 ? 'days' : 'day'}  </br>${readyHours} ${Number(readyHours) > 1 ? 'hours' : 'hour'} </br>${readyMinutes} ${Number(readyMinutes) > 1 ? 'minutes' : 'minute'} </br>${readySeconds} ${Number(readySeconds) > 1 ? 'seconds' : 'second'}`);

    // UPDATING THE LOCAL STORAGE
    localStorage.setItem('recoveryLS', JSON.stringify(recovery));
};

// INITIALIZE BUTTONS
startRecoveryButton.addEventListener('click', toggleTheFunctionalitiesOfRecoveryButton);
saveNoteButton.addEventListener('click', closeRecoveryForm);

// UPDATING THE VALUE OF THE NUMBERS USING LOCAL STORAGE

function updatingTheValueOfTheNumbersAndDisplayingTheContainerUsingLocalStorage() {
    const recoveryLS = JSON.parse(localStorage.getItem('recoveryLS'));

    if (recoveryLS.isRecoveryStarted === true) {
        // UPDATING THE RECOVERY OBJECT
        recovery.isRecoveryStarted = true;
        recovery.recoveryStarting.recoveryStartedDateText = recoveryLS.recoveryStarting.recoveryStartedDateText;
        recovery.recoveryStarting.recoveryStartedTimeText = recoveryLS.recoveryStarting.recoveryStartedTimeText;
        recovery.recoveryStarting.startedTime = recoveryLS.recoveryStarting.startedTime;

        // RECOVERY ITSELF NODE
        const recoveryItself = document.createElement('div');
        const recoveryIntervalStartDate = document.createElement('pre');
        const recoveryIntervalHasBeen = document.createElement('pre');
        recoveryItself.classList.add('recovery-itself');
        recoveryIntervalStartDate.classList.add('recovery-itself-start');
        recoveryIntervalHasBeen.classList.add('recovery-itself-has-been');
        recoveryItself.appendChild(recoveryIntervalStartDate);
        recoveryItself.appendChild(recoveryIntervalHasBeen);
        recoveryContainer.appendChild(recoveryItself);

        // STARTED DATE
        recoveryIntervalStartDate.textContent = `Start date: ${recovery.recoveryStarting.recoveryStartedDateText} - ${recovery.recoveryStarting.recoveryStartedTimeText}`;

        // INTERVAL
        recoveryInterval = setInterval(() => {
            // UPDATING THE SECONDS
            recovery.recoveryCurrent.seconds = (Date.now() - recovery.recoveryStarting.startedTime) / 1000;
            recovery.recoveryCurrent.minutes = (Date.now() - recovery.recoveryStarting.startedTime) / 60000;
            recovery.recoveryCurrent.hours = (Date.now() - recovery.recoveryStarting.startedTime) / 3.6e+6;
            recovery.recoveryCurrent.days = (Date.now() - recovery.recoveryStarting.startedTime) / 8.64e+7;

            // CONVERTING THE NUMBERS INTO STRINGS TO GET THE NEEDED PART USING SLICE METHOD
            const readySeconds = String(recovery.recoveryCurrent.seconds).slice(0, String(recovery.recoveryCurrent.seconds).indexOf('.'));
            const readyMinutes = String(recovery.recoveryCurrent.minutes).slice(0, String(recovery.recoveryCurrent.minutes).indexOf('.'));
            const readyHours = String(recovery.recoveryCurrent.hours).slice(0, String(recovery.recoveryCurrent.hours).indexOf('.'));
            const readyDays = String(recovery.recoveryCurrent.days).slice(0, String(recovery.recoveryCurrent.days).indexOf('.'));

            // DISPLAYING THE TIME THAT HAS BEEN SINCE THE RECOVERY JOURNEY STARTED
            recoveryIntervalHasBeen.textContent = `${readyDays} ${Number(readyDays) > 1 ? 'days' : 'day'}  \n${readyHours} ${Number(readyHours) > 1 ? 'hours' : 'hour'} \n${readyMinutes} ${Number(readyMinutes) > 1 ? 'minutes' : 'minute'} \n${readySeconds} ${Number(readySeconds) > 1 ? 'seconds' : 'second'}`;
        }, 1);

        // UPDATING THE NAVBAR BUTTON
        startRecoveryButton.textContent = 'RELAPSED?';
    };
};

updatingTheValueOfTheNumbersAndDisplayingTheContainerUsingLocalStorage();