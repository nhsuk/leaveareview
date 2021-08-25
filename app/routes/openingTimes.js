const LocalStorage = require('node-localstorage').LocalStorage;
const express = require('express');
const router = express.Router();
const moment = require('moment');
const app = require('../../app');
const recentChangeMade = require('../routes').recentChangeMade;
let recentOpeningTimesChange = false;

// Create local storage for opening times
const localStorage = new LocalStorage('./scratch');

router.get('/', function (req, res) {
  // Save default opening times to local storage
  localStorage.setItem('localOpeningTimes', JSON.stringify(emptyOpeningTimes));
  res.render('index');
});

moment.locale('en-GB');

const days = {
  MONDAY: {
    key: 'monday',
    display: 'Monday',
  },
  TUESDAY: {
    key: 'tuesday',
    display: 'Tuesday',
  },
  WEDNESDAY: {
    key: 'wednesday',
    display: 'Wednesday',
  },
  THURSDAY: {
    key: 'thursday',
    display: 'Thursday',
  },
  FRIDAY: {
    key: 'friday',
    display: 'Friday',
  },
  SATURDAY: {
    key: 'saturday',
    display: 'Saturday',
  },
  SUNDAY: {
    key: 'sunday',
    display: 'Sunday',
  },
};

const getDay = (req) => days[req.params.day.toUpperCase()];

// Create default opening times
const emptyOpeningTimes = Object.keys(days).map((key) => ({
  name: days[key].display,
  times: [],
}));

// Save default opening times to local storage
localStorage.setItem('localOpeningTimes', JSON.stringify(emptyOpeningTimes));

router.get('/days', (_, res) => {
  res.render('editor/opening-times/days', {
    openingTimes: JSON.parse(localStorage.getItem('localOpeningTimes')),
    openingTimesUpdatedDate: localStorage.getItem('openingTimesUpdatedDate'),
  });
});

router.get('/confirm-opening-times', (_, res) => {
  res.render('editor/opening-times/confirm-opening-times', {
    openingTimes: JSON.parse(localStorage.getItem('localOpeningTimes')),
  });
});

router.post('/confirm-opening-times', (_, res) => {
  res.redirect('/editor/opening-times/opening-times-start');
});

router.get('/opening-times-start', (_, res) => {
  res.render('editor/opening-times/opening-times-start', { recentOpeningTimesChange});
})

router.get('/days/:day', (req, res) => {
  const dayObj = getDay(req);
  recentOpeningTimesChange = false;
  res.render('editor/opening-times/day', { dayObj });
});

router.post('/days/:day/set', (req, res) => {
  // Existing opening times from localstorage
  const localOpeningTimes = JSON.parse(
    localStorage.getItem('localOpeningTimes')
  );
  const dayObj = getDay(req);
  const currentDay = dayObj.display;
  const getOpeningTimes = localOpeningTimes.filter((times) => {
    return times.name == currentDay;
  });
  const currentDayOpeningTimes = getOpeningTimes[0].times;

  if (req.body.open === 'yes') {
    const dayObj = getDay(req);
    const daysToDisplay = { ...days };
    delete daysToDisplay[dayObj.key.toUpperCase()];
    const times = req.body;
    delete times['open']
    res.render('editor/opening-times/copy', {
      dayObj,
      daysToDisplay,
      times,
    });
    // res.render('editor/opening-times/set', { dayObj, currentDayOpeningTimes });
  } else {
    const newOpeningTimes = localOpeningTimes.map(({ name, times }) => ({
      name,
      times: dayObj.display === name ? [] : times,
    }));

    const dateNow = moment().format('DD MMMM YYYY') 
    // Set localstorage times to new times
    localStorage.setItem('localOpeningTimes', JSON.stringify(newOpeningTimes));
    localStorage.setItem('openingTimesUpdatedDate', dateNow);
    res.redirect('/editor/opening-times/days');
  }
});

router.post('/days/:day/copy', (req, res) => {
  const dayObj = getDay(req);
  const daysToDisplay = { ...days };
  delete daysToDisplay[dayObj.key.toUpperCase()];
  res.render('editor/opening-times/copy', {
    dayObj,
    daysToDisplay,
    times: req.body,
  });
});

router.post('/days', (req, res) => {
  // Existing opening times from localstorage
  const localOpeningTimes = JSON.parse(
    localStorage.getItem('localOpeningTimes')
  );

  // Get an array of opening times from the request body
  const newTimes = Object.keys(req.body)
    .filter((key) => !days[key.toUpperCase()])
    .map((timeKey) => req.body[timeKey])
    .filter(Boolean);

  // Build opening times object by adding times to all days sent in the request body
  const newOpeningTimes = localOpeningTimes.map(({ name, times }) => ({
    name,
    times: req.body[name.toLowerCase()] ? newTimes : times,
  }));

  // Set localstorage times to new times
  localStorage.setItem('localOpeningTimes', JSON.stringify(newOpeningTimes));
  const dateNow = moment().format('DD MMMM YYYY');
  localStorage.setItem('openingTimesUpdatedDate', dateNow);
  // Redirect to page which will display times from new localstorage
  res.redirect('/editor/opening-times/confirm-opening-times');
});

router.post('/bank-holiday/opening-time', (req, res) => {
  let firstTime;
  let secondTime;
  let thirdTime;
  if (req.body.bankHolOpenTime1) {
    firstTime = `${req.body.bankHolOpenTime1} to ${req.body.bankHolCloseTime1}`;
  }
  if (req.body.bankHolOpenTime2) {
    secondTime = `${req.body.bankHolOpenTime2} to ${req.body.bankHolCloseTime2}`;
  }
  if (req.body.bankHolOpenTime3) {
    thirdTime = `${req.body.bankHolOpenTime3} to ${req.body.bankHolCloseTime3}`;
  }
  res.render('editor/opening-times/bank-holiday/confirm', {
    firstTime,
    secondTime,
    thirdTime,
  });
});

router.post('/bank-holiday/confirm', (req, res) => {
  res.redirect('/editor/opening-times/opening-times-start')
});

localStorage.setItem('tempChanges', JSON.stringify([]));

router.get(
  '/temporary-changes/temporary-changes',
  (req, res) => {
    const tempChanges = JSON.parse(localStorage.getItem('tempChanges'));
    if (tempChanges.length === 0) {
      res.redirect(
        '/editor/opening-times/temporary-changes/temporary-changes-date'
      );
    } else {
      res.render('editor/opening-times/temporary-changes/temporary-changes', {
        tempChanges,
      });
    }
  }
);


router.get('/temporary-changes/temporary-changes-date',
  (req, res) => {
    recentOpeningTimesChange = false;
    res.render('editor/opening-times/temporary-changes/temporary-changes-date');
  }
);

router.post('/temporary-changes/temporary-changes-date',
  (req, res) => {
    res.redirect('/editor/opening-times/temporary-changes/temporary-changes-open');
  }
);

router.post('/temporary-changes/temporary-change-open', (req, res) => {
  if (req.body.open === 'yes') {
    res.redirect(`/editor/opening-times/temporary-changes/temporary-changes-time`);
  } else {
    res.redirect('/editor/opening-times/temporary-changes/temporary-changes-range-question')
  }
});

router.post('/temporary-changes/temporary-changes-range-question', (req, res) => {
  if (req.body.tempChangeMultiDay === 'yes') {
    res.redirect('/editor/opening-times/temporary-changes/temporary-changes-done-multiple-days');
  } else {
    res.redirect('/editor/opening-times/temporary-changes/temporary-changes-done-one-day');
  }
});

router.post('/temporary-changes/temporary-changes-done-multiple-days', (req, res) => {
  recentOpeningTimesChange = true;
  res.redirect('/editor/opening-times/opening-times-start');
});

// Old fancy way
// router.post(
//   '/editor/opening-times/temporary-changes/temporary-change-open',
//   (req, res) => {
//     const tempChanges = JSON.parse(localStorage.getItem('tempChanges'));
//     if (req.body.open === 'yes') {
//       res.render(
//         `editor/opening-times/temporary-changes/temporary-changes-time`,
//         { temporaryDate: req.body.tempDateHidden }
//       );
//     } else {
//       let tempChange = {
//         date: req.body.tempDateHidden,
//         time: 'Closed'
//       };
//       const newChanges = [...tempChanges, tempChange];
//       localStorage.setItem('tempChanges', JSON.stringify(newChanges));
//       res.render('editor/opening-times/temporary-changes/temporary-changes', {
//         tempChanges: newChanges
//       });
//     }
//   }
// );

// Old fancy way
// router.post(
//   '/editor/opening-times/temporary-changes/temporary-changes-time',
//   (req, res) => {
//     const tempChanges = JSON.parse(localStorage.getItem('tempChanges'));
//     function getTime() {
//       let time = [];
//       if (req.body.tempOpenTime1) {
//         time.push(`${req.body.tempOpenTime1} to ${req.body.tempCloseTime1}`);
//       }
//       if (req.body.tempOpenTime2) {
//         time.push(`${req.body.tempOpenTime2} to ${req.body.tempCloseTime2}`);
//       }
//       if (req.body.tempOpenTime3) {
//         time.push(`${req.body.tempOpenTime3} to ${req.body.tempCloseTime3}`);
//       }
//       return time;
//     }
//     let tempChange = {
//       date: req.body.tempDateHidden,
//       time: getTime()
//     };
//     const newChanges = [...tempChanges, tempChange];
//     localStorage.setItem('tempChanges', JSON.stringify(newChanges));
//     res.render('editor/opening-times/temporary-changes/temporary-changes', {
//       tempChanges: newChanges
//     });
//   }
// );

module.exports = {
  router: router,
  localStorage: localStorage
};