import { InlineCode } from "@/once-ui/components";
import path from "path";

const calculateExperience = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();

  // Adjust years if the current month is earlier than the start month
  const totalYears = months < 0 ? years - 1 : years;

  // Calculate the remaining months
  const totalMonths = months < 0 ? 12 + months : months;

  // Combine years and months into a single value
  return (totalYears + totalMonths / 12).toFixed(1);
};

const person = {
  firstName: "Mahesh",
  lastName: "Babu",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/mahesh.png",
  location: "Europe/Berlin", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  latitude: 53.5488,
  longitude: 9.9872,
  languages: ["English", "Malayalam"], // optional: Leave the array empty if you don't want to display languages
  jobStartDate: "2021-08-01",
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const techStack = {
  display: true,
  tech: [
    { name: "Java", icon: "JavaIcon" },
    { name: "Spring Boot", icon: "SpringBootIcon" },
    { name: "Hibernate", icon: "HibernateIcon" },
    { name: "Maven", icon: "MavenIcon" },
    { name: "Postgres", icon: "PostgresIcon" },
    { name: "Microsoft SQL Server", icon: "SqlServerIcon" },
    { name: "Intellij", icon: "IntellijIdeaIcon" },
    { name: "Git", icon: "GitIcon" },
  ],
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/MaheshBabu11",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/maheshbabu11/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/m_r.coder/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://twitter.com/MaheshBabu11_",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:mahesh.b.pec@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software Engineer</>,
  subline: (
    <>
      I'm Mahesh, a java developer with{" "}
      <InlineCode>{calculateExperience(person.jobStartDate)}</InlineCode> years
      of experience who loves to build efficient and scalable systems.
    </>
  ),
};

const about = {
  label: "About",
  path: "/about",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/maheshbabu11",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a seasoned Java Developer with{" "}
        {calculateExperience(person.jobStartDate)}{" "}years of experience crafting robust web applications. Proficient in
        Java, J2EE, Spring, Hibernate, and RESTful APIs, I excel in leveraging
        object-oriented principles and industry-standard design patterns to
        deliver efficient solutions.
      </>
    ),
  },
  resume:
    "https://drive.google.com/file/d/14irMx950--x5lixuP-Z_wbnJTYMbdRRG/view?usp=sharing",
  coffee: "https://www.buymeacoffee.com/maheshbabu11",
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Acmatek Inc",
        timeframe: "Sep 2023 - present",
        role: "Software Engineer",
        logo: "/images/work/acmatek.png",
        achievements: [
          <>
            Spearheaded development across multiple SpringBoot projects,
            innovating new functionalities and features.
          </>,
          <>
            Optimized API response times by streamlining code and fine-tuning
            native queries for enhanced search performance.
          </>,
          <>
            Developed a robust table indexing system utilizing Hibernate Search
            and OpenSearch, significantly boosting search efficiency and query
            response.
          </>,
          <>
            Actively engaged in comprehensive code reviews, fostering
            collaborative improvements within the team.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Capgemini",
        timeframe: "Aug 2021 - Sep 2023",
        role: "Software Engineer",
        logo: "/images/work/capgemini.png",
        achievements: [
          <>
            Worked closely with cross-functional teams to collaboratively
            develop robust web applications utilizing Java programming, J2EE
            technologies, and the Spring Boot framework
          </>,
          <>
            Engaged in the complete software development life-cycle,
            encompassing activities such as requirements gathering, designing,
            coding, thorough testing, and successful deployment of applications.
          </>,
          <>
            Implemented RESTful APIs for data integration and built scalable and
            maintainable code.
          </>,
          <>
            Conducted code reviews, identified and resolved software defects,
            and optimized application performance.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Hamburg University of Technology",
        description: <>MS, Data Science.</>,
        timeframe: "2024 - Present",
      },
      {
        name: "APJ Abdul Kalam Technological University",
        description: <>BTech, Computer Science and Engineering.</>,
        timeframe: "2017 - 2021",
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        items: [
          {
            name: "Java",
            icon: "javaIcon",
          },
          {
            name: "Python",
            icon: "pythonIcon",
          },
          {
            name: "C/C++",
            icon: "cIcon",
          },
          {
            name: "JavaScript",
            icon: "javaScriptIcon",
          },
          {
            name: "TypeScript",
            icon: "typeScriptIcon",
          },
        ],
        description: (
          <>
            I've been using Java for about 4 years. I've used it to create web
            applications, web services, libraries, and CLI tools. I am very
            comfortable using Java and I think it's a great and versatile
            programming language. Java is my daily driver for creating web
            applications and web services. The type safety and the vast amount
            of libraries available makes it a great choice for any web
            applications and web services.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //   src: "/images/projects/project-01/cover-02.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
          // {
          //   src: "/images/projects/project-01/cover-03.jpg",
          //   alt: "Project image",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Technologies",
        items: [
          {
            name: "Spring Boot",
            icon: "springBootIcon",
          },
          {
            name: "Hibernate",
            icon: "hibernateIcon",
          },
          {
            name: "Maven",
            icon: "mavenIcon",
          },
          {
            name: "Vaadin",
            icon: "vaadinIcon",
          },
          {
            name: "MySQL",
            icon: "mysqlIcon",
          },
          {
            name: "PostgreSQL",
            icon: "postgresIcon",
          },
          {
            name: "Microsoft SQL Server",
            icon: "sqlServerIcon",
          },
          {
            name: "Flask",
            icon: "flaskIcon",
          },
          {
            name: "TensorFlow",
            icon: "tensorflowIcon",
          },
          {
            name: "Git",
            icon: "gitIcon",
          },
          {
            name: "Docker",
            icon: "dockerIcon",
          },
          {
            name: "Azure DevOps",
            icon: "azureIcon",
          },
        ],
        description: (
          <>
            Spring Boot is my go-to framework for creating web applications and
            web services. I've been using it since 2021 (4 years) and have
            become quite proficient with it.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Softwares and Tools",
        items: [
          {
            name: "IntelliJ IDEA",
            icon: "intellijIcon",
          },
          {
            name: "Postman",
            icon: "postmanIcon",
          },
          {
            name: "GitHub",
            icon: "github",
          },
          {
            name: "Visual Studio Code",
            icon: "vscodeIcon",
          },
          {
            name: "Eclipse",
            icon: "eclipseIcon",
          },
          {
            name: "Azure DevOps",
            icon: "azureDevopsIcon",
          },
          {
            name: "Jira",
            icon: "jiraIcon",
          },
          {
            name: "OpenAi",
            icon: "openaiIcon",
          },
          {
            name: "vercel",
            icon: "vercelIcon",
          },
          { name: "Cloudflare", icon: "cloudflareIcon" },
        ],

        description: (
          <>
            Python is the language of choice when i am dealing with any AI/ML
            projects.The ease of use and the vast amount of libraries available
            makes it a great choice for any AI/ML projects.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
  certifications: {
    display: true, // set to false to hide this section
    title: "Certifications",
    more: "https://www.linkedin.com/in/maheshbabu11/details/certifications/",
    items: [
      {
        name: "IELTS (Band 8)",
        issuer: "IELTS Official",
        date: "Dec 2023",
        icon: "ieltsIcon",
      },
      {
        name: "Introduction to Quantum Computing ",
        issuer: "The Coding School",
        date: "Oct 2021",
        icon: "codingSchoolIcon",
      },
      {
        name: "DeepLearning.AI TensorFlow Developer Specialization",
        issuer: "Coursera",
        date: "Oct 2020",
        icon: "courseraIcon",
      },
      {
        name: "Architecting with Google Compute Engine Specialization",
        issuer: "Coursera",
        date: "Oct 2020",
        icon: "courseraIcon",
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about Java, Software Engineering and tech in general",
  description:
    "👋 Hey, I'm Mahesh! I’m excited to share my insights, showcase my projects, and discuss the lessons I’ve learned along the way. Join me on this journey of discovery and growth.",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  path: "/projects",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  path: "/gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

const testimonials = [
  {
    name: "Keerthan Dharmana",
    role: "Associate Consultant, Capgemini, Bengaluru.",
    avatar: "/images/testimonials/keerthan.jpg", // Replace with the actual avatar path
    feedback:
      "I have had the opportunity of working with Mahesh for almost a span of 2 years. He has a very good command on Java, Oracle Database and other technologies too. He also had a very good grip on the functionalities that we developed in our project. Whenever I had any queries, I approach him and he always used to guide me the right direction.",
  },
  {
    name: "Kolaparthi Hazitha",
    role: "Senior Software Engineer At Capgemini",
    avatar: "/images/testimonials/hazitha.jpg", // Replace with the actual avatar path
    feedback:
      "I have had the opportunity of working with mahesh for two years. He is a talented person and works very hard. And also he's always curious about knowing and learning new technologies. He shares his knowledge with other team members as well. He was a nice co-worker and looking forward to work with him again.",
  },
  {
    name: "Advaith Narayan",
    role: "Consultant - Cybersecurity at KPMG India",
    avatar: "/images/testimonials/advaith.jpg", // Replace with the actual avatar path
    feedback:
      "I have had the opportunity of knowing Mahesh Babu for the past. He is a detail oriented, goal oriented, ambitious and powerful co-worker, his knowledge is vast and thorough. I would recommend him with any project that requires the very best in coding. Whenever I had a problem, there has never been a time he has left me without a solution. On account of his mature approach to his responsibilities, I often thought of Mahesh Babu as a professional I could always rely upon to get the job done. Certainly worth recommending.",
  },
  {
    name: "Parakh Chaudhary",
    role: "Software Developer at Capgemini",
    avatar: "/images/testimonials/parakh.jpg", // Replace with the actual avatar path
    feedback:
      "Mahesh is an incredibly talented and curious individual who has an eye for detail. His drive to achieve perfection in his work has been a motivating factor for me throughout our journey in Capgemini. I look forward to working with him again and learning more.",
  },
  // Add more testimonials as needed
];

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  techStack,
  testimonials,
};
