///// booking section

const bookingForm = document.querySelector('.booking__form'),
  bookingLodgings = bookingForm.querySelector('.booking__lodgings'),
  bookingRooms = bookingForm.querySelector('.booking__rooms'),
  bookingPeople = bookingForm.querySelector('.booking__people'),
  bookingDates = bookingForm.querySelector('.booking__dates'),
  bookingBtn = bookingForm.querySelector('.booking__submit'),
  bookingConfirmation = document.querySelector('.booking__confirmation'),
  loggedOutEls = bookingConfirmation.querySelectorAll(
    '.booking__msg-logged-out'
  ),
  loggedInEls = bookingConfirmation.querySelectorAll('.booking__msg-logged-in');

function createBooking(e) {
  e.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingFailToast();
    return;
  }

  // user.lastBooking.hotel = bookingLodgings.value;
  // user.lastBooking.rooms = bookingRooms.value;
  // user.lastBooking.ppl = bookingPeople.value;
  // user.lastBooking.date = bookingDates.value;

  bookingForm.reset();

  // setLastBookingMsg();
  // bookingToast();
  // updateUsersDB();
  // updateLocalStorage();
  toggleBookingWindow.bind(true)();
}

function toggleBookingWindow() {
  if (this) {
    bookingForm.classList.add('hidden');
    bookingConfirmation.classList.remove('hidden');
  } else {
    bookingForm.classList.remove('hidden');
    bookingConfirmation.classList.add('hidden');
    return;
  }

  if (loggedAs) {
    loggedOutEls.forEach(el => el.classList.add('hidden'));
    loggedInEls.forEach(el => el.classList.remove('hidden'));
  } else {
    loggedOutEls.forEach(el => el.classList.remove('hidden'));
    loggedInEls.forEach(el => el.classList.add('hidden'));
  }
}
export default function initBookingForm() {
  bookingBtn.addEventListener('click', createBooking);
}

// setLastBookingMsg();
