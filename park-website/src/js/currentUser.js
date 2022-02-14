import userDB from './userDB.js';

// temporarily storing data for an unlogged user activities
class currentUser {
  constructor() {
    this.login = '';
    this.favoriteHotels = [false, false, false, false, false, false];
    this.bookings = [];
  }

  //JSON.parse(sessionStorage.getItem('loggedUser'))
  loadCurrentUser() {
    const username = JSON.parse(sessionStorage.getItem('loggedUser'));
    if (!username) return;
  }

  addBooking(booking) {
    if (!booking) return;
    this.bookings.push(booking);
  }

  getLastBooking() {
    return this.bookings.at(-1) ? this.bookings.at(-1) : null;
  }

  updateLocalStorage() {
    localStorage.setItem('userDB', JSON.stringify(this.users));
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

export default new currentUser();
