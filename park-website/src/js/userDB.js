///// simulating user database /////
class UserDB {
  constructor(users) {
    this.users = JSON.parse(localStorage.getItem('userDB')) || users;
  }

  getUserInfo(username) {
    const idx = this.findUsername(username);
    if (idx < 0) return null;

    const user = {
      username: this.users[idx].username,
      email: this.users[idx].email,
      favoriteHotels: this.users[idx].favoriteHotels,
      bookings: this.users[idx].bookings,
    };

    return user;
  }

  findUsername(username) {
    return this.users.findIndex(user => user.username === username);
  }

  findEmail(email) {
    return this.users.findIndex(user => user.email === email);
  }

  getUserID(login, pwd) {
    const userID = Math.max(
      this.users.findIndex(user => user.username === login),
      this.users.findIndex(user => user.email === login)
    );

    return userID > -1 && this.users[userID].password === pwd ? userID : null;
  }

  addUser(username, email, password, favoriteHotels, bookings) {
    const user = {
      username: username,
      email: email,
      password: password,
      favoriteHotels: favoriteHotels,
      bookings: bookings,
    };

    this.users.push(user);
    this._updateLocalStorage();
  }

  updateUser(user) {
    const idx = this.findUsername(user.username);
    if (idx < 0) return;
    this.users[idx].favoriteHotels = user.favoriteHotels;
    this.users[idx].bookings = user.bookings;
    this._updateLocalStorage();
  }

  _updateLocalStorage() {
    localStorage.removeItem('userDB');
    localStorage.setItem('userDB', JSON.stringify(this.users));
  }
}

// 2 users to add to the database on the first visit to the site
const dummyUsers = [
  {
    username: 'vasya83',
    email: 'vasya83@macrosoft.com',
    password: 'passWORD83',
    favoriteHotels: [false, false, true, true, true, false],
    bookings: [
      {
        hotel: 'Fire Cabins',
        rooms: 1,
        ppl: 3,
        dates: '2022-02-10 - 2022-02-17',
      },
    ],
  },
  {
    username: 'vasya38',
    email: 'vasya38@macrosoft.com',
    password: 'passWORD38',
    favoriteHotels: [true, true, false, false, false, true],
    bookings: [
      {
        hotel: 'Leadfoot Campground',
        rooms: 2,
        ppl: 4,
        dates: '2022-03-22 - 2022-03-27',
      },
    ],
  },
];

export default new UserDB(dummyUsers);
