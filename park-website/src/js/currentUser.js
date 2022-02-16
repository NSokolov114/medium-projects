import userDB from './userDB.js';

///// storing data for the current user, even when not logged in /////
class CurrentUser {
  constructor() {
    this.username = '';
    this.favoriteHotels = [false, false, false, false, false, false];
    this.bookings = [];
  }

  loadCurrentUser() {
    const username = JSON.parse(localStorage.getItem('currentUser')) || '';
    if (!username) return;
    const user = userDB.getUserInfo(username);
    this.username = user.username;
    this.favoriteHotels = user.favoriteHotels;
    this.bookings = user.bookings;
  }

  setCurrentUser(username) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(username));
  }

  addBooking(booking) {
    if (!booking) return;
    this.bookings.push(booking);
  }

  getLastBooking() {
    return this.bookings.at(-1) ? this.bookings.at(-1) : null;
  }

  reset() {
    this.username = '';
    this.favoriteHotels = [false, false, false, false, false, false];
    this.bookings = [];
    this.setCurrentUser('');
  }
}

export default new CurrentUser();
