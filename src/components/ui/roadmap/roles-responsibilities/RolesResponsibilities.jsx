import styles from "./roles-responsibilities.module.css";

const RolesResponsibilities = ({ t, title }) => {
  return (
    <section className={styles.roles}>
      <div className={styles.rolesTop}>{t(title)}</div>
      <div className={styles.rolesBottom}>
        Engage in full software development lifecycle (SDLC)
        <br></br>• Architect, design, and implement scalable Java applications
        and REST APIs
        <br></br>• Ensure code quality through testing, reviews, and best
        practices
        <br></br>• Diagnose and troubleshoot performance and production issues
        <br></br>• Collaborate within Agile teams and mentor junior devs
        <br></br>• Contribute to deployment and CI/CD pipelines
        <br></br>• (Senior) Provide technical leadership, guide architecture,
        and liaise with stakeholders/vendor teams
        <br></br>
      </div>
    </section>
  );
};

export default RolesResponsibilities;
