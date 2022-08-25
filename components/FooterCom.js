import styles from "../styles/Home.module.css";
import { Logo } from "../assets/svgs/Logo";
import Image from "next/image";
import { Footer, FooterMedia } from "./data";

function FooterCom() {
  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <div style={{ width: "139px" }}>
          <Logo />
        </div>
        <p
          style={{
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "30px",
            color: "#838DA6",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam
          dolores quidem mollitia id ipsa nisi necessitatibus iure repudiandae
          aperiam, odit ipsam dolor fugiat corporis nesciunt illo nemo minus.
        </p>
      </div>
      <div className={styles.footer2}>
        {Footer.map((element, index) => (
          <div key={index}>
            <h2 style={{ whiteSpace: "nowrap", color: "white" }}>
              {element.category}
            </h2>
            {element.contents.map((ele, i) => (
              <p style={{ color: "#838DA6" }} key={i}>
                {ele}
              </p>
            ))}
          </div>
        ))}
        <div>
          <h2 style={{ color: "white" }}>Social Link</h2>
          <div className={styles.footerMainMedia}>
            {FooterMedia.map((element, index) => (
              <a
                key={index}
                rel="noreferrer"
                target="_blank"
                href={element.link}
              >
                <div className={styles.footerMedia}>{element.icon}</div>
              </a>
            ))}
          </div>
          <p style={{ color: "#838DA6" }}>Download app from </p>
          <div className={styles.footerImg}>
            <Image width="135.5px" height="39.71px" src={"/app.png"} alt="" />
            <Image width="135.5px" height="39.71px" src={"/play.png"} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterCom;
