const startRecoveryButton = document.querySelector('#startRecoveryButton');
const recoveryContainer = document.querySelector('.recovery-container');
let isRecoveryStarted = false;
let recoveryInterval;
let recoveryStartedDate;
let recoveryStartedTime;

// STARTING A NEW RECOVERY

function startingANewRecoveryJourney() {
    const currentDate = new Date();
    recoveryStartedDate = currentDate.toLocaleDateString();
    recoveryStartedTime = currentDate.toLocaleTimeString();
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
    recoveryIntervalStartDate.textContent = `Start date: ${recoveryStartedDate} - ${recoveryStartedTime}`;

    // INTERVAL
    recoveryInterval = setInterval(() => {
        // STARTED TIME AND DATE
        const startedTime = recoveryStartedTime.replace(' ', '').replace('PM', '').replace('AM', '');
        const startedTimeItself = startedTime.split(':');
        const startedHour = Number(startedTimeItself[0]);
        const startedMinute = Number(startedTimeItself[1]);
        const startedSecond = Number(startedTimeItself[2]);

        const startedDate = recoveryStartedDate.split('/');
        const startedDay = Number(startedDate[0]);
        const startedMonth = Number(startedDate[1]);
        const startedYear = Number(startedDate[2]);

        // CURRENT TIME AND DATE
        const currentMomentDate = new Date();
        const currentTime = currentMomentDate.toLocaleTimeString().replace(' ', '').replace('PM', '').replace('AM', '');
        const currentTimeItself = currentTime.split(':');
        const timeHour = Number(currentTimeItself[0]);
        const timeMinute = Number(currentTimeItself[1]);
        const timeSecond = Number(currentTimeItself[2]);

        const currentDate = currentMomentDate.toLocaleDateString().split('/');
        const currentDay = Number(currentDate[0]);
        const currentMonth = Number(currentDate[1]);
        const currentYear = Number(currentDate[2]);

        // HAS BEEN CONTAINER
        recoveryIntervalHasBeen.textContent = `${currentYear - startedYear} ${currentYear - startedYear > 1 ? 'years' : 'year'}, ${currentMonth - startedMonth} ${currentMonth - startedMonth > 1 ? 'months' : 'month'} and ${currentDay - startedDay} ${currentDay - startedDay > 1 ? 'days' : 'day'} \n${timeHour - startedHour} ${timeHour - startedHour > 1 ? 'hours' : 'hour'}, ${timeMinute - startedMinute} ${timeMinute - startedMinute > 1 ? 'minutes' : 'minute'} and ${timeSecond - startedSecond} ${timeSecond - startedSecond > 1 ? 'seconds' : 'second'}`;
    }, 1);
};

startingANewRecoveryJourney();

// INITIALIZE BUTTONS
startRecoveryButton.addEventListener('click', startingANewRecoveryJourney);