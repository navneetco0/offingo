import { Facebook } from "../assets/svgs/Facebook";
import { Instagram } from "../assets/svgs/Instagram";
import { Linkedin } from "../assets/svgs/Linkedin";
import { Fb } from "../assets/svgs/Fb";
import { Twi } from "../assets/svgs/Twi";
import { In } from "../assets/svgs/In";
import styles from "../styles/Home.module.css";

const texts = [
    "Check product availibility",
    "Get notified easily",
    "Subscribe multipe stores",
    "Browse 100+ stores",
  ];
  const SocialMedias = [
    {
      text: "Instagram",
      icon: <Instagram />,
      link: "https://www.instagram.com/offingoofficial/",
    },
    {
      text: "Facebook",
      icon: <Facebook />,
      link: "https://www.facebook.com/offingoofficial/?_rdr",
    },
    {
      text: "Linkedin",
      icon: <Linkedin />,
      link: "https://www.linkedin.com/in/offingoofficial/?originalSubdomain=in",
    },
  ];
  const clothes = [
    styles.cloth1,
    styles.cloth2,
    styles.cloth3,
    styles.cloth4,
    styles.cloth5,
    styles.cloth6,
  ];
  const blogs = [
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
    {
      title: "Heading goes here",
      content:
        "Donec sed erat ut magna suscipit mattis. Aliquam erat vaolutpat. Morbi in orci risus. Donec pretium fringilla blandit. Etiam ut....",
      date: "September 9, 2013",
    },
  ];
  const Footer = [
    {
      category: "company",
      contents: [
        "Who We Are",
        "Blog",
        "Careers",
        "Report Fraud",
        "Contact",
        "Investor Relations",
      ],
    },
    {
      category: "For you",
      contents: ["Privacy", "Terms", "Security", "Sitemap"],
    },
  ];
  const FooterMedia = [
    {
      icon: <Fb />,
      link: "https://www.facebook.com/offingoofficial/?_rdr",
    },
    {
      icon: <Twi />,
      link: "https://mobile.twitter.com/offingoofficial",
    },
    {
      icon: <In />,
      link: "https://www.linkedin.com/in/offingoofficial/?originalSubdomain=in",
    },
  ];

  const API = "https://offingo.herokuapp.com";

  export {texts, SocialMedias, clothes, blogs, Footer, FooterMedia, API}