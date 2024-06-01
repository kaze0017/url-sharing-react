import { getSharedLinks } from "../../api/axios";
import { NotificationsType } from "../interfaces/notifications";
import { SharedLinkType } from "../interfaces";
import { link } from "fs";

const links: SharedLinkType[] = [
  {
    id: 1,
    title: "Understanding Quantum Computing",
    owner: {
      id: 1,
      first_name: "Alice",
      last_name: "Smith",
      profile_picture: "alice.jpg",
      email: "example@example.com",
    },
    sharedby: {
      id: 2,
      first_name: "Bob",
      last_name: "Smith",
      profile_picture: "bob.jpg",
      email: "example@example.com",
    },
    url: "https://example.com/quantum-computing",
    category: "Technology",
    class_type: "link",
    description: "An introductory article on quantum computing.",
    health_main_url: true,
    icon_id: "tech_icon",
    likeCount: 150,
    publicationDate: "2024-01-15",
    rankCount: 4.5,
    savedCount: 200,
    seenCount: 1000,
    sharedCount: 50,
    tags: ["quantum computing", "technology", "science"],
    thumbnail: "quantum.jpg",
    url_type: "article",
  },
  {
    id: 2,
    title: "Healthy Eating Tips",
    owner: {
      id: 3,
      first_name: "David",
      last_name: "lee",
      profile_picture: "david.jpg",
      email: "example@example.com",
    },
    url: "https://example.com/healthy-eating",
    category: "Health",
    class_type: "link",
    description: "A guide to healthy eating habits.",
    health_main_url: true,
    icon_id: "health_icon",
    likeCount: 230,
    publicationDate: "2024-02-10",
    rankCount: 4.8,
    savedCount: 300,
    seenCount: 1500,
    sharedCount: 80,
    tags: ["health", "nutrition", "wellness"],
    thumbnail: "healthy_eating.jpg",
    url_type: "article",
  },
];

export default function getMockNotifications() {
  const response: NotificationsType = [
    {
      sharedBy: {
        id: 3,
        first_name: "David",
        last_name: "lee",
        email: "example@example.com",
        profile_picture: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      links: links,
      description: "New shared link",
      publicationDate: new Date("2024-02-10"),
    },
  ];
  return response;
  //   try {
  //     const response = await getSharedLinks("token");
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
}
