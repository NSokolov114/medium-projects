///// generating random stuff /////
// rating, number of votes
const averageRatingEls = document.querySelectorAll('.rating__average');
const countRatingEls = document.querySelectorAll('.rating__count');
const ratingsNumber = countRatingEls.length / 2;
const recommendCount = document.querySelectorAll('.recommend__count');
const recommendPhotos = document.querySelectorAll('.recommend__photo');
const reviewRatings = document.querySelectorAll('.review__rating');
const reviewNames = document.querySelectorAll('.review__user-name');
const reviewDates = document.querySelectorAll('.review__user-date');
const reviewPhotos = document.querySelectorAll('.review__photo');
const reviewsNumber = reviewNames.length;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePhotoLink() {
  const gender = Math.random() - 0.5 > 0 ? 'men' : 'women';
  const number = randomInt(1, 50);
  return `https://randomuser.me/api/portraits/thumb/${gender}/${number}.jpg`;
}

// getting random user data
async function getRndUsers(num) {
  let api;

  if (!num) return;

  try {
    api = await fetch(`https://randomuser.me/api/?results=${num}`);
    const data = await api.json();
    updateReviews(data);
  } catch (err) {
    console.log(`Error fetching rnd users data: ${err.message}`);
  }
}

function updateReviews(data) {
  reviewNames.forEach((nameEl, idx) => {
    const fullName = `${data.results[idx].name.first} ${data.results[idx].name.last}`;

    nameEl.innerText = fullName;
  });
  reviewDates.forEach((dateEl, idx) => {
    const date = new Date(data.results[idx].registered.date);
    const dateOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
      date
    );

    dateEl.innerText = formattedDate;
  });
  reviewPhotos.forEach((photoEl, idx) => {
    const link = data.results[idx].picture.thumbnail;

    photoEl.src = link;
  });
}

export function generateRndReviews() {
  for (let i = 0; i < ratingsNumber; i++) {
    const rating = randomInt(50, 97) / 10;
    const votes = randomInt(150, 600);
    const recommendations = Math.floor((randomInt(25, 75) * votes) / 100);
    const reviewRating1 = randomInt(50, 90) / 10;
    const reviewRating2 = randomInt(80, 100) / 10;
    const accType = i < 3 ? 'option' : 'campsite';

    reviewRatings[i * 2].innerText = reviewRating1;
    reviewRatings[i * 2 + 1].innerText = reviewRating2;

    // same numbers for cards section and lodgings section
    averageRatingEls[i].innerText = rating;
    averageRatingEls[i + ratingsNumber].innerText = rating;
    countRatingEls[i].innerText = `${votes} votes`;
    countRatingEls[i + ratingsNumber].innerText = `${votes} votes`;
    recommendCount[
      i
    ].innerText = `More than ${recommendations} people recommend this ${accType}.`;
  }

  getRndUsers(reviewsNumber);
  recommendPhotos.forEach(photo => (photo.src = generatePhotoLink()));
}
