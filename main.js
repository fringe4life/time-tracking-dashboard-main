/**
 * URL to the JSON data file containing activity stats.
 * @type {string}
 */
const DATA_URL = 'data.json';

/**
 * Valid timeframes for the dashboard.
 * @type {Array<'daily'|'weekly'|'monthly'>}
 */
const TIMEFRAMES = ['daily', 'weekly', 'monthly'];

/**
 * Maps activity titles to their corresponding card class names.
 * @type {Object<string, string>}
 */
const cardMap = {
  'Work': 'work',
  'Play': 'play',
  'Study': 'study',
  'Exercise': 'exercise',
  'Social': 'social',
  'Self Care': 'self-care',
};

/**
 * Maps timeframes to their respective previous period labels.
 * @type {Object<'daily'|'weekly'|'monthly', string>}
 */
const previousLabels = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month',
};

/**
 * Holds the loaded activity data from data.json.
 * @type {Array<Object>}
 */
let activityData = [];

/**
 * The currently selected timeframe.
 * @type {'daily'|'weekly'|'monthly'}
 */
let currentFrame = 'weekly';

/**
 * Updates the activity cards on the dashboard with data for the given timeframe.
 * @param {'daily'|'weekly'|'monthly'} timeframe - The selected timeframe.
 * @returns {void}
 */
function updateCards(timeframe) {
  activityData.forEach(activity => {
    const cardClass = cardMap[activity.title];
    const card = document.querySelector(`.activity-card.${cardClass}`);
    if (!card) return;
    const current = card.querySelector('.activity-current');
    const previous = card.querySelector('.activity-previous');
    if (current && previous) {
      current.textContent = `${activity.timeframes[timeframe].current}hrs`;
      previous.textContent = `${previousLabels[timeframe]} - ${activity.timeframes[timeframe].previous}hrs`;
    }
  });
}

/**
 * Sets the active state on the selected timeframe button.
 * @param {'daily'|'weekly'|'monthly'} timeframe - The selected timeframe.
 * @returns {void}
 */
function setActiveButton(timeframe) {
  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.timeframe === timeframe);
  });
}

/**
 * Initializes the dashboard: loads data, sets up event listeners, and displays the default timeframe.
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  fetch(DATA_URL)
    .then(res => res.json())
    .then(data => {
      /**
       * @type {Array<Object>} Loaded activity data from JSON.
       */
      activityData = data;
      updateCards(currentFrame);
    });

  document.querySelectorAll('.timeframe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      /**
       * @type {string} The timeframe selected by the user.
       */
      const tf = btn.dataset.timeframe;
      if (TIMEFRAMES.includes(tf)) {
        currentFrame = tf;
        setActiveButton(tf);
        updateCards(tf);
      }
    });
  });
}); 