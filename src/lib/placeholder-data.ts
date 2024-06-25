// person model
// import { PersonType } from "./interfaces";
import { SharedLinkType } from "./interfaces";
import { UserProfileType } from "./interfaces";
// data
export const people: UserProfileType[] = [
  {
    user_id: 1,
    first_name: "John Doe",
    last_name: "Smith",
    title: "CEO",
    email: "example@example.com",
    profile_picture: "https://randomuser.me/api/portraits/men/97.jpg",
    subscribers: [],
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
    user_id: 2,
    first_name: "Jane",
    last_name: "Doe",
    email: "example@example.com",
    title: "Individual Public Figure",
    profile_picture: "https://randomuser.me/api/portraits/men/93.jpg",
    subscribers: [],
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
    user_id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    email: "example@example.com",

    title: "CTO",
    profile_picture: "https://randomuser.me/api/portraits/women/93.jpg",
    subscribers: [],
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
    user_id: 4,
    first_name: "Jane",
    last_name: "Smith",
    email: "example@example.com",

    title: "CFO",
    profile_picture: "https://randomuser.me/api/portraits/women/95.jpg",
    subscribers: [],
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
    user_id: 5,
    first_name: "John",
    last_name: "Doe",
    email: "example@example.com",

    title: "COO",
    profile_picture: "https://randomuser.me/api/portraits/men/90.jpg",
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
    user_id: 6,
    first_name: "Jane",
    last_name: "Taylor",
    email: "example@example.com",

    title: "CMO",
    profile_picture: "https://randomuser.me/api/portraits/women/83.jpg",
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
    user_id: 7,
    first_name: "Michael",
    last_name: "White",
    email: "example@example.com",

    title: "Marketing Manager",
    profile_picture: "https://randomuser.me/api/portraits/men/91.jpg",
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
    user_id: 8,
    first_name: "Jane",
    last_name: "Brown",
    title: "HR Manager",
    email: "example@example.com",

    profile_picture: "https://randomuser.me/api/portraits/women/85.jpg",
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
    user_id: 9,
    first_name: "Michael",
    last_name: "Green",
    email: "example@example.com",

    title: "Software Engineer",
    profile_picture: "https://randomuser.me/api/portraits/men/92.jpg",
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
    user_id: 10,
    first_name: "Jane",
    last_name: "Black",
    email: "example@example.com",

    title: "Product Manager",
    profile_picture: "https://randomuser.me/api/portraits/women/87.jpg",
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

export const user: UserProfileType = people[0];

export const groupOne = {
  group_id: 1,
  name: "Group One",
  members: [people[0], people[1], people[2]],
  description: "This is the first group",
  color: "red",
  tags: ["group", "one", "red"],
};

export const groupTwo = {
  group_id: 2,
  name: "Group Two",
  members: [people[3], people[4], people[5], people[6], people[7]],
  description: "This is the second group",
  color: "blue",
  tags: ["group", "two", "blue"],
};

export const groupThree = {
  group_id: 3,
  name: "Group Three",
  members: [people[8], people[9]],
  description: "This is the third group",
  color: "green",
  tags: ["group", "three", "green"],
};

export const groupDefault = {
  group_id: 0,
  name: "Default Group",
  members: [people[4]],
  description: "This is the default group",
  color: "gray",
  tags: [],
};

export const groupsPH = [groupOne, groupTwo, groupThree];

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
