// person model
import { PersonType } from "./interfaces";
import { SharedLinkType } from "./interfaces";
// data
export const people: PersonType[] = [
  {
    id: 1,
    first_name: "John Doe",
    last_name: "Smith",
    title: "CEO",
    profile_picture: "https://randomuser.me/api/portraits/men/97.jpg",
    followers: 100,
    publications: {
      links: [
        {
          title: "How to be a CEO",
          url: "https://example.com",
        },
        {
          title: "How to be a CEO",
          url: "https://example.com",
        },
      ],
      categories: ["Business", "Leadership", "Technology", "Finance"],
    },
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    title: "Individual Public Figure",
    profile_picture: "https://randomuser.me/api/portraits/men/93.jpg",
    followers: 200,
    publications: {
      links: [
        {
          title: "How to be a Public Figure",
          url: "https://example.com",
        },
      ],
      categories: ["Public Figure", "Leadership"],
    },
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    title: "CTO",
    profile_picture: "https://randomuser.me/api/portraits/women/93.jpg",
    followers: 300,
    publications: {
      links: [
        {
          title: "How to be a CTO",
          url: "https://example.com",
        },
      ],
      categories: ["Technology", "Leadership"],
    },
  },
  {
    id: 4,
    first_name: "Jane",
    last_name: "Smith",
    title: "CFO",
    profile_picture: "https://randomuser.me/api/portraits/women/95.jpg",
    followers: 400,
    publications: {
      links: [
        {
          title: "How to be a CFO",
          url: "https://example.com",
        },
      ],
      categories: ["Finance", "Leadership"],
    },
  },
  {
    id: 5,
    first_name: "John",
    last_name: "Doe",
    title: "COO",
    profile_picture: "https://randomuser.me/api/portraits/men/90.jpg",
    followers: 500,
    publications: {
      links: [
        {
          title: "How to be a COO",
          url: "https://example.com",
        },
      ],
      categories: ["Operations", "Leadership"],
    },
  },
  // New people
  {
    id: 6,
    first_name: "Jane",
    last_name: "Taylor",
    title: "CMO",
    profile_picture: "https://randomuser.me/api/portraits/women/83.jpg",
    followers: 600,
    publications: {
      links: [
        {
          title: "How to be a CMO",
          url: "https://example.com",
        },
      ],
      categories: ["Marketing", "Leadership"],
    },
  },
  {
    id: 7,
    first_name: "Michael",
    last_name: "White",
    title: "Marketing Manager",
    profile_picture: "https://randomuser.me/api/portraits/men/91.jpg",
    followers: 700,
    publications: {
      links: [
        {
          title: "Marketing Strategies",
          url: "https://example.com",
        },
      ],
      categories: ["Marketing", "Leadership"],
    },
  },
  {
    id: 8,
    first_name: "Jane",
    last_name: "Brown",
    title: "HR Manager",
    profile_picture: "https://randomuser.me/api/portraits/women/85.jpg",
    followers: 800,
    publications: {
      links: [
        {
          title: "Effective Hiring Practices",
          url: "https://example.com",
        },
      ],
      categories: ["Human Resources", "Leadership"],
    },
  },
  {
    id: 9,
    first_name: "Michael",
    last_name: "Green",
    title: "Software Engineer",
    profile_picture: "https://randomuser.me/api/portraits/men/92.jpg",
    followers: 900,
    publications: {
      links: [
        {
          title: "Modern Software Development",
          url: "https://example.com",
        },
      ],
      categories: ["Technology", "Software Engineering"],
    },
  },
  {
    id: 10,
    first_name: "Jane",
    last_name: "Black",
    title: "Product Manager",
    profile_picture: "https://randomuser.me/api/portraits/women/87.jpg",
    followers: 1000,
    publications: {
      links: [
        {
          title: "Product Management Strategies",
          url: "https://example.com",
        },
      ],
      categories: ["Product Management", "Leadership"],
    },
  },
];

// Shared Links

//  id: number;
//  title: string;
//  owner: string;
//  audience: true | false | null;
//  url: string;
//  back_up_link_1st: string | null;
//  back_up_link_2nd: string | null;
//  back_up_link_3rd: string | null;
//  category: string | null;
//  class_type: "link" | "category";
//  description: string | null;
//  expirationDate: string | null;
//  health_backup_1st: true | false | null;
//  health_backup_2nd: true | false | null;
//  health_backup_3rd: true | false | null;
//  health_main_url: true | false | null;
//  icon_id: string | null;
//  likeCount: number;
//  publicationDate: string;
//  rankCount: number;
//  savedCount: number;
//  seenCount: number;
//  sharedCount: number;
//  tags: Array<string> | null;
//  thumbnail: string | null;
//  url_pass: string | null;
//  url_type: "article" | "video" | "podcast" | "image" | "other";
//  url_username: string | null;

// export const sharedLinks: SharedLinkType[] = [
//   {
//     id: 0,
//     class: "link",
//     title: "Beautiful Sunset",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/sunset-dawn-sun-dusk-17679/",
//         health: "healthy",
//       },
//     },
//     popularity: 8,
//     views: 1000,
//     saved: false,
//     rankCount: 10,
//     sharedCount: 20,
//     savedCount: 30,

//     description: "A stunning sunset over the horizon.",
//     publicationDate: "2021-10-01",
//     tags: ["sunset", "nature", "landscape"],
//     owner: people[3],
//     thumbnail: "/images/defaults/thumbnails/th1.jpg",
//     audience: "public",
//   },
//   {
//     id: 1,

//     title: "Amazing Nature Video",
//     class: "link",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=2-aiSQuZwTY",
//         health: "healthy",
//       },
//     },
//     popularity: 9,
//     views: 5000,

//     rankCount: 10,
//     sharedCount: 20,
//     savedCount: 30,

//     saved: false,
//     description: "Experience the beauty of nature in this breathtaking video.",
//     publicationDate: "2021-10-02",
//     tags: ["nature", "video", "landscape"],
//     owner: people[1],
//     thumbnail: "/images/defaults/thumbnails/th2.jpg",
//     audience: "private",
//   },
//   {
//     id: 2,

//     title: "Cute Puppy",
//     class: "category",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/adorable-animal-beagle-canine-302083/",
//         health: "healthy",
//       },
//     },
//     popularity: 7,
//     views: 2000,
//     rankCount: 5,
//     sharedCount: 15,
//     savedCount: 25,
//     saved: false,
//     description: "An adorable beagle puppy.",
//     publicationDate: "2021-10-03",
//     tags: ["puppy", "dog", "animal"],
//     owner: people[2],
//     thumbnail: "/images/defaults/thumbnails/th3.jpg",
//     audience: "protected",
//   },
//   {
//     id: 3,
//     title: "Epic Travel Adventure",
//     class: "link",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=l9U4RQmIfck",
//         health: "healthy",
//       },
//     },
//     popularity: 10,
//     views: 10000,
//     rankCount: 15,
//     sharedCount: 25,
//     savedCount: 35,

//     saved: false,
//     description: "Join us on an epic adventure around the world!",
//     publicationDate: "2021-10-04",
//     tags: ["travel", "adventure", "video"],
//     owner: people[3],
//     thumbnail: "/images/defaults/thumbnails/th4.jpg",
//     audience: "public",
//   },
//   {
//     id: 4,
//     title: "Starry Night Sky",
//     class: "category",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/starry-night-102733/",
//         health: "healthy",
//       },
//     },
//     popularity: 6,
//     views: 1500,
//     savedCount: 20,
//     seenCount: 30,
//     rankCount: 5,
//     sharedCount: 25,
//     saved: false,
//     description: "A mesmerizing view of the night sky filled with stars.",
//     publicationDate: "2021-10-05",
//     tags: ["night", "sky", "stars"],

//     owner: people[4],
//     thumbnail: "/images/defaults/thumbnails/th5.jpg",
//     audience: "private",
//   },
//   {
//     id: 5,
//     title: "Cooking Tutorial",
//     class: "link",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=vd_8P3-t1Sg",
//         health: "healthy",
//       },
//     },
//     popularity: 8,
//     views: 3000,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 25,
//     rankCount: 5,
//     saved: false,
//     description: "Learn to cook delicious meals with this easy tutorial.",
//     publicationDate: "2021-10-06",
//     tags: ["cooking", "tutorial", "video"],
//     owner: people[5],
//     thumbnail: "/images/defaults/thumbnails/th6.jpg",
//     audience: "protected",
//   },
//   {
//     id: 6,
//     title: "Mountain Landscape",
//     class: "category",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/green-mountain-profile_picturegraphy-3641348/",
//         health: "healthy",
//       },
//     },
//     popularity: 7,
//     views: 1800,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 40,
//     rankCount: 5,
//     saved: false,
//     description: "A scenic view of mountains covered in lush greenery.",
//     publicationDate: "2021-10-07",
//     tags: ["mountain", "landscape", "nature"],
//     owner: people[6],
//     thumbnail: "/images/defaults/thumbnails/th7.jpg",
//     audience: "public",
//   },
//   {
//     id: 7,
//     title: "Funny Cat Compilation",
//     class: "link",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//         health: "healthy",
//       },
//     },
//     popularity: 9,
//     views: 4000,
//     savedCount: 20,
//     seenCount: 30,
//     rankCount: 5,
//     sharedCount: 37,
//     saved: false,
//     description: "Laugh out loud with this hilarious cat compilation!",
//     publicationDate: "2021-10-08",
//     tags: ["cat", "funny", "video"],
//     owner: people[7],
//     thumbnail: "/images/defaults/thumbnails/th8.jpg",
//     audience: "private",
//   },
//   {
//     id: 8,
//     title: "Autumn Leaves",
//     class: "category",
//     type: "image",
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 42,
//     rankCount: 5,
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/autumn-leaves-1092751/",
//         health: "healthy",
//       },
//     },
//     popularity: 7,
//     views: 1700,
//     saved: false,
//     description: "Colorful autumn leaves on the ground.",
//     publicationDate: "2021-10-09",
//     tags: ["autumn", "leaves", "nature"],
//     owner: people[8],
//     thumbnail: "/images/defaults/thumbnails/th9.jpg",
//     audience: "protected",
//   },
//   {
//     id: 9,
//     title: "Gaming Highlights",
//     class: "link",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=g5Qt5lVJUks",
//         health: "healthy",
//       },
//     },
//     popularity: 8,
//     savedCount: 20,
//     seenCount: 30,
//     rankCount: 5,
//     sharedCount: 50,
//     views: 3500,
//     saved: false,
//     description: "Watch the best gaming moments in this exciting video!",
//     publicationDate: "2021-10-10",
//     tags: ["gaming", "highlights", "video"],
//     owner: people[9],
//     thumbnail: "/images/defaults/thumbnails/th10.jpg",
//     audience: "public",
//   },
//   {
//     id: 10,
//     title: "Cooking Tutorial",
//     class: "category",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=vd_8P3-t1Sg",
//         health: "healthy",
//       },
//     },
//     popularity: 8,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 55,
//     rankCount: 5,
//     views: 3000,
//     saved: false,
//     description: "Learn to cook delicious meals with this easy tutorial.",
//     publicationDate: "2021-10-11",
//     tags: ["cooking", "tutorial", "video"],
//     owner: people[5],
//     thumbnail: "/images/defaults/thumbnails/th11.jpg",
//     audience: "private",
//   },
//   {
//     id: 11,
//     title: "Mountain Landscape",
//     class: "link",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/green-mountain-profile_picturegraphy-3641348/",
//         health: "healthy",
//       },
//     },
//     popularity: 7,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 60,
//     rankCount: 5,
//     views: 1800,
//     saved: false,
//     description: "A scenic view of mountains covered in lush greenery.",
//     publicationDate: "2021-10-12",
//     tags: ["mountain", "landscape", "nature"],
//     owner: people[6],
//     thumbnail: "/images/defaults/thumbnails/th12.jpg",
//     audience: "protected",
//   },
//   {
//     id: 12,
//     title: "Funny Cat Compilation",
//     class: "category",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//         health: "healthy",
//       },
//     },
//     popularity: 9,
//     views: 4000,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 65,
//     rankCount: 5,
//     saved: false,
//     description: "Laugh out loud with this hilarious cat compilation!",
//     publicationDate: "2021-10-13",
//     tags: ["cat", "funny", "video"],
//     owner: people[7],
//     thumbnail: "/images/defaults/thumbnails/th13.jpg",
//     audience: "public",
//   },
//   {
//     id: 13,
//     title: "Autumn Leaves",
//     class: "link",
//     type: "image",
//     linkUrls: {
//       primary: {
//         url: "https://www.pexels.com/profile_picture/autumn-leaves-1092751/",
//         health: "healthy",
//       },
//     },
//     popularity: 7,
//     views: 1700,
//     saved: false,
//     savedCount: 20,
//     seenCount: 30,
//     sharedCount: 70,
//     rankCount: 5,
//     description: "Colorful autumn leaves on the ground.",
//     publicationDate: "2021-10-14",
//     tags: ["autumn", "leaves", "nature"],
//     owner: people[8],
//     thumbnail: "/images/defaults/thumbnails/th14.jpg",
//     audience: "protected",
//   },
//   {
//     id: 14,
//     title: "Gaming Highlights",
//     class: "category",
//     type: "video",
//     linkUrls: {
//       primary: {
//         url: "https://www.youtube.com/watch?v=g5Qt5lVJUks",
//         health: "healthy",
//       },
//     },
//     popularity: 8,
//     views: 3500,
//     saved: false,
//     savedCount: 20,
//     seenCount: 30,
//     rankCount: 5,
//     sharedCount: 75,
//     description: "Watch the best gaming moments in this exciting video!",
//     publicationDate: "2021-10-15",
//     tags: ["gaming", "highlights", "video"],
//     owner: people[9],
//     thumbnail: "/images/defaults/thumbnails/th15.jpg",
//     audience: "public",
//   },
// ];

export const thumbnails = [
  {
    url: "/images/defaults/thumbnails/th1.jpg",
    tags: ["sunset", "nature", "landscape"],
  },
  {
    url: "/images/defaults/thumbnails/th2.jpg",
    tags: ["nature", "video", "landscape"],
  },
  {
    url: "/images/defaults/thumbnails/th3.jpg",
    tags: ["puppy", "dog", "animal"],
  },
  {
    url: "/images/defaults/thumbnails/th4.jpg",
    tags: ["travel", "adventure", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th5.jpg",
    tags: ["night", "sky", "stars"],
  },
  {
    url: "/images/defaults/thumbnails/th6.jpg",
    tags: ["cooking", "tutorial", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th7.jpg",
    tags: ["mountain", "landscape", "nature"],
  },
  {
    url: "/images/defaults/thumbnails/th8.jpg",
    tags: ["cat", "funny", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th9.jpg",
    tags: ["autumn", "leaves", "nature"],
  },
  {
    url: "/images/defaults/thumbnails/th10.jpg",
    tags: ["gaming", "highlights", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th11.jpg",
    tags: ["cooking", "tutorial", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th12.jpg",
    tags: ["mountain", "landscape", "nature"],
  },
  {
    url: "/images/defaults/thumbnails/th13.jpg",
    tags: ["cat", "funny", "video"],
  },
  {
    url: "/images/defaults/thumbnails/th14.jpg",
    tags: ["autumn", "leaves", "nature"],
  },
  {
    url: "/images/defaults/thumbnails/th15.jpg",
    tags: ["gaming", "highlights", "video"],
  },
];

export const user: PersonType = people[0];

export const groupOne = {
  id: 1,
  name: "Group One",
  members: [people[0], people[1], people[2]],
  description: "This is the first group",
  color: "red",
  tags: ["group", "one", "red"],
};

export const groupTwo = {
  id: 2,
  name: "Group Two",
  members: [people[3], people[4], people[5], people[6], people[7]],
  description: "This is the second group",
  color: "blue",
  tags: ["group", "two", "blue"],
};

export const groupThree = {
  id: 3,
  name: "Group Three",
  members: [people[8], people[9]],
  description: "This is the third group",
  color: "green",
  tags: ["group", "three", "green"],
};

export const groupDefault = {
  id: 0,
  name: "Default Group",
  members: [people[4]],
  description: "This is the default group",
  color: "gray",
  tags: [],
};

export function getGroup(id: string | number) {
  if (typeof id === "string") {
    id = parseInt(id);
  }
  switch (id) {
    case 0:
      return groupDefault;
    case 1:
      return groupOne;
    case 2:
      return groupTwo;
    case 3:
      return groupThree;
    default:
      return null;
  }
}

export const treeData = {
  id: 31,
  name: "John Doe",
  profile_picture: people[4].profile_picture,
  children: [
    {
      id: 32,
      name: "Jane Smith",
      profile_picture: people[2].profile_picture,
      children: [
        {
          id: 33,
          name: "John Smith",
          profile_picture: people[3].profile_picture,
          children: [
            {
              id: 34,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
            {
              id: 35,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
          ],
        },
      ],
    },
    {
      id: 36,
      name: "Jane Smith",
      profile_picture: people[6].profile_picture,
    },
    {
      id: 37,
      name: "Jane Smith",
      profile_picture: people[3].profile_picture,
      children: [
        {
          id: 38,
          name: "John Smith",
          profile_picture: people[6].profile_picture,
          children: [
            {
              id: 39,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
            {
              id: 40,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
          ],
        },
      ],
    },
  ],
};
