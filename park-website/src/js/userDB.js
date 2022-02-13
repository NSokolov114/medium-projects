class UserDB {
  constructor(users) {
    this.users = JSON.parse(localStorage.getItem('userDB')) || users;
  }

  checkVacantName(name) {
    return this.users.findIndex(user => user.username === name) < 0;
    //   usernameEl.value = '';
    //   usernameEl.focus();
    //   usernameEl.placeholder = 'This username is already taken';
  }

  checkVacantEmail(email) {
    return this.users.findIndex(user => user.email === email) < 0;
    //   emailEl.value = '';
    //   emailEl.focus();
    //   emailEl.placeholder = 'This email is already taken';
  }

  checkLoginInfo(login, pwd) {
    const userID = Math.max(
      this.users.findIndex(user => user.username === login),
      this.users.findIndex(user => user.email === login)
    );

    return userID > 0 && this.users[userID].password === pwd;
    // pwdEl.value = '';
    // pwdEl.focus();
    // pwdEl.placeholder = 'Wrong email or password';
    // helpMsg.style.color = 'var(--color-primary-light)';
  }

  _addUser(user) {
    this.users.push(user);
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

export default new UserDB(dummyUsers);
