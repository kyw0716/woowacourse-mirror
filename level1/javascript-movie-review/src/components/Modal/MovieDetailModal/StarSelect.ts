import { $ } from "../../../utils/selector";

const STAR_RATE_STRING = [
  "나의 점수는?",
  "최악이예요",
  "별로예요",
  "보통이예요",
  "재미있어요",
  "명작이예요",
];

export function renderStars(movieId: number, starRate: number) {
  const starRateContainer = $(".modal-star-rate");

  if (starRateContainer instanceof HTMLElement)
    starRateContainer.innerHTML = getStarSelectContainerTemplate(
      movieId,
      starRate
    );
}

export function getStarSelectContainerTemplate(
  movieId: number,
  starRate: number
) {
  return /*html*/ `
      <span 
        class="select-zero-rate" 
      >
        내 별점
      </span>
      <span class="star-select-container">
        <input 
          type="range" 
          class="star-rating" 
          max="5" 
          value="${starRate}"
          data-movie-id="${movieId}"
        />
        ${getStarTemplate()}
      </span>
      <span class="star-rate-num">${starRate * 2}점</span>
      <span class="star-rate-desc">${STAR_RATE_STRING[starRate]}</span>
    `;
}

export function getStarTemplate() {
  return (
    /*html*/
    `<svg
    width="30"
    height="30"
    viewBox="0 0 28 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.4167 25.746C21.2005 25.7459 20.9876 25.6934 20.7962 25.593L14 22.0201L7.20378 25.593C6.98354 25.7088 6.73532 25.7606 6.48717 25.7427C6.23901 25.7247 6.00083 25.6377 5.79953 25.4915C5.59824 25.3453 5.44187 25.1456 5.34809 24.9152C5.25432 24.6847 5.22688 24.4326 5.26888 24.1874L6.56706 16.6197L1.06902 11.261C0.890907 11.0873 0.764935 10.8673 0.705337 10.6257C0.645739 10.3842 0.654891 10.1308 0.731759 9.89413C0.808627 9.6575 0.950146 9.4471 1.14032 9.28668C1.3305 9.12627 1.56175 9.02225 1.80795 8.98638L9.40626 7.8822L12.804 0.997323C12.9268 0.789393 13.1017 0.617074 13.3114 0.497366C13.5212 0.377657 13.7585 0.314697 14 0.314697C14.2415 0.314697 14.4788 0.377657 14.6885 0.497366C14.8982 0.617074 15.0731 0.789393 15.1959 0.997323L18.5937 7.88208L26.192 8.98626C26.4382 9.02213 26.6695 9.12615 26.8596 9.28657C27.0498 9.44698 27.1913 9.65738 27.2682 9.89401C27.3451 10.1306 27.3542 10.384 27.2946 10.6256C27.235 10.8671 27.1091 11.0872 26.9309 11.2609L21.4329 16.6196L22.7311 24.1873C22.7639 24.3787 22.7545 24.575 22.7036 24.7623C22.6526 24.9497 22.5614 25.1237 22.4362 25.2722C22.311 25.4207 22.1549 25.54 21.9788 25.6218C21.8027 25.7036 21.6108 25.746 21.4166 25.746L21.4167 25.746Z"
        fill="#888888"
        class="star"
      />
    </svg>`.repeat(5)
  );
}
