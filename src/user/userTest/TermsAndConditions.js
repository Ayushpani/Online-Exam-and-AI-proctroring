import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./TermsAndConditions.module.css";
import frame from './imagesProj/frame.svg'

const TermsAndConditions = () => {

  const location = useLocation();
  const email = location.state.id;
  const test_name = location.state.test_name;
  console.log(email, test_name);
  const navigate = useNavigate();

  const onFrame2Click = useCallback(() => {
    navigate("/test");
  }, [navigate]);

  const onBackClick = useCallback(() => {
    navigate("/test");
  }, [navigate]);

  async function captureImage(){
    navigate("/test/check", { state: { id: email, test_name: test_name}});
  }

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
                <b>Do's</b> <br/>
                GENERAL GUIDELINES <br/>
                  • Make sure you are signed in with your Email/ Phone Number and Password and you have downloaded the test.<br/>
                  • Ensure that the battery in your device is sufficiently charged for serving 3 hrs before starting the test. We recommend your device is on charging mode during the test. <br/>
                  • Make sure you are on Airplane mode before starting the test to avoid disturbance. <br/>
                  • Please ensure you sync to the internet to see your result and score improvement report. <br/>

                  While taking the test <br/>

                  • Make sure you begin the test with a plan. Start with your strongest section. <br/>
                  • Go through the entire paper and attempt the questions you know first. <br/>
                  • Make sure you save at least 20-30 mins in the end to revisit your answers. In an online test, you can change your answer at any time. <br/>

                  <b>Don'ts</b> <br/>
                  GENERAL GUIDELINES <br/>
                  • Don't change the date and time of the device in between the test otherwise, it will get auto-submitted. <br/>
                  • Don't switch to Web or app for the same test once you started in the current app. <br/>
                  • Don't submit the test before time. 
                  Try to use the entire duration of the test wisely. <br/>
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
      <input className={styles.frame3} type="checkbox" id = "checkbox" onClick = {captureImage} required />
    </main>
  );
};

export default TermsAndConditions;
