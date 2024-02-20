import data from "./data.js";

const cardList = document.getElementById("card-list");
const cardTemplate =
  document.getElementById("card-template").content.firstElementChild;
const cardTagTemplate =
  document.getElementById("card-tag-template").content.firstElementChild;
const filterSection = document.getElementById("filter-section");
const filterContainer = document.getElementById("filter");
const filterTagList = filterContainer.firstElementChild;
const filterTagTemplate = document.getElementById("filter-tag-template").content
  .firstElementChild;
const clearButton = document.getElementById("filter").lastElementChild;

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const {
    id,
    logo,
    company,
    new: isNew,
    featured,
    position,
    postedAt,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = data;

  card.dataset.id = id;
  card.querySelector("[data-logo]").src = logo;
  card.querySelector("[data-logo]").alt = `${company} logo`;
  card.querySelector("[data-company]").textContent = company;
  card.querySelector("[data-position]").textContent = position;
  card.querySelector("[data-posted-at]").textContent = postedAt;
  card.querySelector("[data-contract]").textContent = contract;
  card.querySelector("[data-location]").textContent = location;

  if (!isNew) card.querySelector("[data-new]").remove();
  if (!featured) {
    card.querySelector("[data-highlight]").remove();
    card.querySelector("[data-featured]").remove();
  }

  const tagList = card.querySelector("[data-tag-list]");
  const tagListData = [role, level, ...languages, ...tools];

  for (const tag of tagListData) {
    const cardTag = cardTagTemplate.cloneNode(true);
    const cardTagButton = cardTag.firstElementChild;

    cardTagButton.textContent = tag;
    cardTagButton.setAttribute("aria-label", `Add filter: ${tag}`);

    tagList.append(cardTag);
  }

  return card;
}

function handleCardTagClick(event) {
  if (event.target.tagName !== "BUTTON") return;
  if (isTagAlreadyPresent(event.target.textContent)) return;

  showFilter();
  addFilterTag(event.target.textContent);
  updateCardList();
}

function isTagAlreadyPresent(tagText) {
  const currentTags = Array.from(filterTagList.children);
  return currentTags.some(
    (filterTag) => filterTag.querySelector("span").textContent === tagText,
  );
}

function addFilterTag(tagText) {
  const filterTag = filterTagTemplate.cloneNode(true);
  const filterTagText = filterTag.querySelector("span");
  const removeTagButton = filterTag.querySelector("button");

  filterTagText.textContent = tagText;
  filterTagText.setAttribute("aria-label", `Filter: ${tagText}`);
  removeTagButton.setAttribute("aria-label", `Remove filter: ${tagText}`);

  filterTagList.append(filterTag);
}

function handleFilterTagClick(event) {
  const removeTagButton = event.target.closest("button");

  if (!removeTagButton) return;

  removeTagButton.parentNode.remove();
  updateCardList();

  const cards = Array.from(cardList.children);
  const currentCards = cards.filter(
    (card) => !card.classList.contains("hiddenn"),
  );
  currentCards.forEach((card, index) => animateCard(card, index));
}

function handleClearButtonClick() {
  filterTagList.innerHTML = "";
  updateCardList();
  hideFilter();

  const cards = Array.from(cardList.children);
  cards.forEach((card, index) => animateCard(card, index));
}

function updateCardList() {
  const cards = Array.from(cardList.children);
  const filterTags = Array.from(filterTagList.children);

  if (!filterTags.length) {
    showAllCards();
    hideFilter();
    return;
  }

  cards.forEach((card) => {
    const tagList = Array.from(card.querySelector("[data-tag-list]").children);
    const shouldShowCard = checkMatchingTags(tagList, filterTags);

    if (shouldShowCard) {
      card.classList.remove("hiddenn");
    } else {
      card.classList.add("hiddenn");
    }
  });
}

function showAllCards() {
  Array.from(cardList.children).forEach((card, index) => {
    card.classList.remove("hiddenn");
  });
}

function checkMatchingTags(tagList, filterTags) {
  return filterTags.every((filterTag) => {
    return tagList.some((cardTag) => {
      return (
        cardTag.firstElementChild.textContent ===
        filterTag.firstElementChild.textContent
      );
    });
  });
}

function hideFilter() {
  if (window.innerWidth < 576) {
    filterContainer.classList.add("hiddenn");
    filterSection.style.marginBottom = "92px";
  } else {
    filterContainer.classList.remove("opacity-100");
    filterContainer.classList.add("opacity-0");
  }
  filterContainer.setAttribute("aria-hidden", "true");
}

function showFilter() {
  filterContainer.classList.remove("hiddenn");
  filterSection.style.marginBottom = "";
  filterContainer.classList.remove("opacity-0");
  filterContainer.classList.add("opacity-100");
  filterContainer.setAttribute("aria-hidden", "false");
}

function animateCard(element, index) {
  element.classList.remove("animation-card");
  if (index === 0) return;
  element.classList.add("opacity-0");

  const animationDelay = 50;
  setTimeout(
    () => {
      element.classList.add("animation-card");
      element.classList.remove("opacity-0");
    },
    animationDelay * index - 1,
  );
}

function init() {
  hideFilter();
  data.forEach((cardData) => cardList.append(createCard(cardData)));

  const cards = Array.from(cardList.children);
  cards.forEach((card, index) => animateCard(card, index));

  cardList.addEventListener("click", handleCardTagClick);
  filterTagList.addEventListener("click", handleFilterTagClick);
  clearButton.addEventListener("click", handleClearButtonClick);
}

init();
