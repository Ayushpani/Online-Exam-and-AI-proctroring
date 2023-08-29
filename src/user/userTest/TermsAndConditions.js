import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";
import frame from './imagesProj/frame.svg'
const TermsAndConditions = () => {
  const navigate = useNavigate();

  const onFrame2Click = useCallback(() => {
    navigate("/test");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate("/test");
  }, [navigate]);

  return (
    <main className={styles.termsAndConditions}>
      <div className={styles.frame}>
        <section className={styles.frame1}>
          <header className={styles.header}>
            <h2 className={styles.dosAndDonts}>DO's AND DON'TS </h2>
          </header>
          <p className={styles.dosGeneralGuidelinesContainer}>
            <span className={styles.dos}>
              <span>
                <b>Do's</b>
                GENERAL GUIDELINES
                  • Make sure you are signed in with your Email/ Phone Number and Password and you have downloaded the test.
                  • Ensure that the battery in your device is sufficiently charged for serving 3 hrs before starting the test. We recommend your device is on charging mode during the test.
                  • Make sure you are on Airplane mode before starting the test to avoid disturbance.
                  • Please ensure you sync to the internet to see your result and score improvement report.

                  While taking the test

                  • Make sure you begin the test with a plan. Start with your strongest section.
                  • Go through the entire paper and attempt the questions you know first.
                  • Make sure you save at least 20-30 mins in the end to revisit your answers. In an online test, you can change your answer at any time.

                  <b>Don'ts</b>
                  GENERAL GUIDELINES
                  • Don't change the date and time of the device in between the test otherwise, it will get auto-submitted.
                  • Don't switch to Web or app for the same test once you started in the current app.
                  • Don't submit the test before time.
                  Try to use the entire duration of the test wisely.
              </span>
            </span>
            <span className={styles.dos}>
              <span>
                <span>ALL THE BEST !!</span>
              </span>
            </span>
            <span className={styles.dontChangeTheDateAndTime}>
              <span>
                <span>&nbsp;</span>
              </span>
            </span>
            <span className={styles.dos}>
              <span>
                <span>&nbsp;</span>
              </span>
            </span>
          </p>
        </section>
        <section className={styles.frame2} onClick={onFrame2Click}>
          <button className={styles.back} onClick={onBackClick}>
            <img className={styles.frameIcon} alt="" src={frame} />
            <div className={styles.back1}>Back</div>
          </button>
        </section>
      </div>
      <div className={styles.iAgreeTo}>
        I agree to the above terms and conditions
      </div>
      <input className={styles.frame3} type="checkbox" required />
    </main>
  );
};

export default TermsAndConditions;
