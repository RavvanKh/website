import styles from "./skills-required.module.css";

const SkillsRequired = ({ t, title }) => {
  return (
    <section className={styles.skillsRequired}>
      <div className={styles.skillsRequiredTop}>{t(title)}</div>
      <div className={styles.skillsRequiredBottom}>
      Programming: Core Java (OOP, multithreading, collections) 
      <br />
Frameworks: Spring Boot (with MVC, Data, Security), Jakarta EE (Servlets, EJB, JPA), or Play
<br />
API Protocols: REST (JAX‑RS) and/or SOAP
<br />
Databases: SQL (PostgreSQL/MySQL) and possibly NoSQL
<br />
Dev Tools: Git, build tools (Maven/Gradle), CI/CD pipelines
<br />
Testing: Unit and integration testing
<br />
Cloud & Hosting: Familiarity with AWS, GCP, Azure, or containerization tools 
      </div>
    </section>
  );
};

export default SkillsRequired;
