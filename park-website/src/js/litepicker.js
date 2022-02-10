import litepicker from 'litepicker';

// Date range picker for the booking form

const currentDate = new Date();
const picker = new Litepicker({
  element: document.getElementById('litepicker'),
  singleMode: false,
  tooltipText: {
    one: 'night',
    other: 'nights',
  },
  tooltipNumber: totalDays => {
    return totalDays - 1;
  },
  lockDays: [['1970-11-11', currentDate]],
});

export default picker;
