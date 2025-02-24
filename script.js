const startRecoveryButton = document.querySelector('#startRecoveryButton');
const recoveryContainer = document.querySelector('.recovery-container');
let isRecoveryStarted = false;
let recoveryInterval;
let recoveryStartedDateText;
let recoveryStartedTimeText;
let startedTime;
let days;
let hours;
let minutes;
let seconds;

// STARTING A NEW RECOVERY

function startingANewRecoveryJourney() {
    startedTime = Date.now();

    //
    const currentDate = new Date();
    recoveryStartedDateText = currentDate.toLocaleDateString();
    recoveryStartedTimeText = currentDate.toLocaleTimeString();
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
    recoveryIntervalStartDate.textContent = `Start date: ${recoveryStartedDateText} - ${recoveryStartedTimeText}`;

    // INTERVAL
    recoveryInterval = setInterval(() => {
        // UPDATING THE SECONDS
        seconds = (Date.now() - startedTime) / 1000;
        minutes = (Date.now() - startedTime) / 60000;
        hours = (Date.now() - startedTime) / 3.6e+6;
        days = (Date.now() - startedTime) / 8.64e+7;

        const readySeconds = String(seconds).slice(0, String(seconds).indexOf('.'));
        const readyMinutes = String(minutes).slice(0, String(minutes).indexOf('.'));
        const readyHours = String(hours).slice(0, String(hours).indexOf('.'));
        const readyDays = String(days).slice(0, String(days).indexOf('.'));
        recoveryIntervalHasBeen.textContent = `It has been: ${readyDays} ${Number(readyDays) > 1 ? 'days' : 'day'},  ${readyHours} ${Number(readyHours) > 1 ? 'hours' : 'hour'},  \n${readyMinutes} ${Number(readyMinutes) > 1 ? 'minutes' : 'minute'}, ${readySeconds} ${Number(readySeconds) > 1 ? 'seconds' : 'second'}`;
    }, 1);
};

startingANewRecoveryJourney();

// TOGGLING THE FUNCTIONALITIES OF RECOVERY BUTTON

function toggleTheFunctionalitiesOfRecoveryButton() {
    if (isRecoveryStarted === false) {
        startRecoveryButton.textContent = 'RELAPSED?';
        startingANewRecoveryJourney();
        
        isRecoveryStarted = true;
    } else {
        startRecoveryButton.textContent = 'START RECOVERY';

        isRecoveryStarted = false;
    };
};

// INITIALIZE BUTTONS
startRecoveryButton.addEventListener('click', toggleTheFunctionalitiesOfRecoveryButton);