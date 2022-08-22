import Head from "next/head";
import Image from "next/image"
import { useState } from "react";
import { Check } from "../assets/svgs/Check";
import { Facebook } from "../assets/svgs/Facebook";
import { Instagram } from "../assets/svgs/Instagram";
import { Link } from "../assets/svgs/Link";
import { Linkedin } from "../assets/svgs/Linkedin";
import { Pinterest } from "../assets/svgs/Pinterest";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [focus, setFocus] = useState(false);
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
    {
      text: "Pinterest",
      icon: <Pinterest />,
      link: "https://www.pinterest.com/offingoofficial/",
    }
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            height={40}
            width={124}
            src="/logo.png"
            alt="offingo logo"
          />
          <p style={{ color: "#1A203C", fontSize: "16px", marginTop: "5px" }}>
            <i>
              Making your
              <q style={{ color: "#C53030" }}>shopping experience</q> better
            </i>
          </p>
        </div>
        <div id="mid">
          <div style={{ width: "fit-content", color: "#1A202C" }}>
            <h1 style={{ fontSize: "60px", fontwidth: "700" }}>
              We&apos;re launching soon!!!
            </h1>
            <p style={{ color: "#A0AEC0", fontSize: "16px" }}>
              Notify me when it lauches
            </p>
            <div
              style={{
                display: "flex",
                backgroundColor: "#EDF2F7",
                borderRadius: "6px",
                fontSize: "16px",
                // border: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{ padding: "14px", border: "1px solid #E2E8F0", borderRadius:'6px 0 0 6px' }}
              >
                +91
              </div>
              <div style={{ flexGrow: 1, display: "flex", padding: "3px", border:focus?'1px solid #3182CE':"1px solid #E2E8F0", borderRadius:'0 6px 6px 0'  }}>
                <input
                  style={{
                    flexGrow: 1,
                    backgroundColor: "transparent",
                    border: "transparent",
                    paddingLeft: "30px",
                    outline: "none",
                    fontSize: "16px",
                  }}
                  onFocus={()=>setFocus(true)}
                  onBlur={()=>setFocus(false)}
                  type="text"
                  placeholder="Enter your mobile number"
                />
                <button
                  style={{
                    backgroundColor: "#F56565",
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Notify me
                </button>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: "#A0AEC0",
                  fontSize: "16px",
                  marginTop: "60px",
                }}
              >
                Connect with us on
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {SocialMedias.map((element, index) => (
                  <a key={index} rel="noreferrer" target="_blank" href={element.link}>
                    <div className={styles.social_button}>
                      {element.icon}
                      {element.text}
                      <Link />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "inherit",
              boxShadow:"inset 0px -11px 8px -10px #CCC"
            }}
          >
            <div
              style={{
                backgroundColor: "#ffcece",
                width: "60%",
                padding: "16px",
                borderRadius: "10px",
                marginLeft:"30px"
              }}
            >
              {texts.map((element, index) => (
                <div
                  key={index}
                  style={{
                    fontStyle: "italic",
                    fontSize: "18px",
                    color: "#F56565",
                    padding: "16px 0",
                    borderBottom: index !== 3 ? "2px solid #F56565" : "",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop:"8px",
                    whiteSpace:'wrap'
                  }}
                >
                  <Check /> {element}
                </div>
              ))}
              <p style={{ color: "#718096", fontSize:'16px' }}>& many more...</p>
            </div>
            <div style={{ position: "absolute", right: 0, bottom:"-4px" }}>
              <Image
                width={309}
                height={500}
                src="/image.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        © all rights reserved to offingo
      </footer>
    </div>
  );
}
