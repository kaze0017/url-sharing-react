// get owner
import { people } from "../lib/placeholder-data";
import { sharedLinks } from "../lib/placeholder-data";
import { SharedLinkType } from "../lib/interfaces";
export function getOwner() {
  return people[0];
}

// get three top people
export function getTopPeople() {
  return people.slice(1, 4);
}
export function getNPeople(n: number) {
  return people.slice(0, n);
}
// get three top sharedLinks
export function getTopSharedLinks(): SharedLinkType[] {
  return sharedLinks.slice(0, 12);
}

// convert youtube link to embed
export function getEmbedId(link: string) {
  // check if link is youtube
  if (!link.includes("youtube.com") && !link.includes("youtu.be")) {
    return link;
  }

  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(youtubeRegex);

  if (match) {
    return match[1];
  } else {
    return link;
  }
}

// get top 5 categories
export function getTopCategories() {
  const categories = [
    "Technology",
    "Software Engineering",
    "Product Management",
    "Leadership",
    "Human Resources",
  ];
  const data = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
  const owners = people.slice(5, 10);
  return categories.map((category, index) => {
    return {
      title: category,
      data: data[index],
      owner: owners[index],
    };
  });
}

// get shared links
export function getSharedLinks() {
  return sharedLinks;
}

export function getPersonById(id: number) {
  return people.find((person) => person.id === id);
}

// Gey suggestions
export function getSuggestions() {
  return people.slice(4, 7);
}
