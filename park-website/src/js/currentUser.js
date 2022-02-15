import userDB from './userDB.js';

// temporarily storing data for an unlogged user activities
class CurrentUser {
  constructor() {
    this.username = '';
    this.favoriteHotels = [false, false, false, false, false, false];
    this.bookings = [];
  }

  //JSON.parse(sessionStorage.getItem('loggedUser'))
  loadCurrentUser() {
    const username = JSON.parse(localStorage.getItem('currentUser')) || '';
    if (!username) return;
    const user = userDB.getUserInfo(username);
    this.username = user.username;
    this.favoriteHotels = user.favoriteHotels;
    this.bookings = user.bookings;
  }

  setCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(this.username));
  }

  addBooking(booking) {
    if (!booking) return;
    this.bookings.push(booking);
  }

  getLastBooking() {
    return this.bookings.at(-1) ? this.bookings.at(-1) : null;
  }
}

const dummyUsers = [
  {
    username: 'vasya83',
    email: 'vasya83@macrosoft.com',
    password: 'passWORD83',
    favoriteHotels: [false, false, true, true, true, false],
    lastBooking: {
      hotel: 1,
      rooms: 1,
      ppl: 3,
      date: '2022-02-10 - 2022-02-17',
    },
  },
  {
    username: 'vasya38',
    email: 'vasya38@macrosoft.com',
    password: 'passWORD38',
    favoriteHotels: [true, true, false, false, false, true],
    lastBooking: {
      hotel: 1,
      rooms: 2,
      ppl: 4,
      date: '2022-03-22 - 2022-03-27',
    },
  },
];

const emptyUser = {
  username: '',
  email: '',
  password: '',
  favoriteHotels: [false, false, false, false, false, false],
  lastBooking: {},
};

export default new CurrentUser();
