import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import Property1Default from "./Property1Default";
import styles from "./Attempt.module.css";
import onlinex from './imagesProj/examonline@2x.png'
import frame1 from './imagesProj/frame1.svg'
import insta from './imagesProj/instagram.svg'
import vector from './imagesProj/vector.svg'
import vector1 from './imagesProj/vector1.svg'
import logo from './imagesProj/Logo@2x.png'
const Attempt = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();
  const email = location.state.id;

  useEffect(() => {
    axios.post("http://localhost:8000/Home/fetchTest")
    .then(res => {
      setData(res.data);
    })
    .catch(e => {
      alert("There are no tests available right now come back later");
    })
  }, [])

  const onFrameButtonClick = (test_name) => () => {
    navigate("/test/terms", { state: { id: email, test_name: test_name }});
  };

  const onFrameButton1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButton2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButton3Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButton4Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButton5Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onTestContainerClick = useCallback(() => {
    navigate("/test", { state: { id: email }});
  }, [navigate]);

  const onFacebookClick = useCallback(() => {
    window.open("facebook.com");
  }, []);

  const onTwitterClick = useCallback(() => {
    window.open("x.com");
  }, []);

  const onInstagramClick = useCallback(() => {
    window.open("instagram.com");
  }, []);

  return (
    <main className={styles.attempt}>
      <nav className={styles.frame}>
        <nav className={styles.navigation}>
          <div className={styles.navigationChild} />
          <div className={styles.frame1}>
            <img
              className={styles.whatsappImage20230820At1}
              alt=""
              src={logo}
            />
            <div className={styles.home}>Home</div>
            <div className={styles.home}>Your Profile</div>
            <div className={styles.test} onClick={onTestContainerClick}>
              <div className={styles.test1}>Test</div>
            </div>
          </div>
        </nav>
      </nav>
      <section className={styles.frame2}>
        <div className={styles.frame3}>
          {data.map(i => {
            return(
          <div className={styles.istockphoto1148585703612x612Parent}>
            {/*<img
              className={styles.istockphoto1148585703612x612Icon}
              alt=""
              src={test2}
            />*/}
            <div className={styles.test_name}>{i.test_name}</div>
            <div className={styles.test11}>Test author: {i.test_author}</div>
            <div className={styles.test11}>No. of questions: {i.no_of_questions}</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.5px"
              property1DefaultLeft="75.26px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButtonClick(i.test_name)}
            />
          </div>
            )
          })}
          {/*
          <div className={styles.istockphoto1148585703612x612Group}>
            <img
              className={styles.istockphoto1148585703612x612Icon1}
              alt=""
              src={test2}
            />
            <div className={styles.test2}>Test 2</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.25px"
              property1DefaultLeft="63.42px"
              property1DefaultHeight="73px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButton1Click}
            />
          </div>
          <div className={styles.istockphoto1148585703612x612Group}>
            <img
              className={styles.istockphoto1148585703612x612Icon2}
              alt=""
              src={test3}
            />
            <div className={styles.test3}>Test 3</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.25px"
              property1DefaultLeft="63.58px"
              property1DefaultHeight="73px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButton2Click}
            />
          </div>
          <div className={styles.istockphoto1148585703612x612Group}>
            <img
              className={styles.istockphoto1148585703612x612Icon3}
              alt=""
              src={test4}
            />
            <div className={styles.test4}>Test 4</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.25px"
              property1DefaultLeft="63.26px"
              property1DefaultHeight="73px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButton3Click}
            />
          </div>
          <div className={styles.istockphoto1148585703612x612Group}>
            <img
              className={styles.istockphoto1148585703612x612Icon1}
              alt=""
              src={test2}
            />
            <div className={styles.test5}>Test 5</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.25px"
              property1DefaultLeft="63.42px"
              property1DefaultHeight="73px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButton4Click}
            />
          </div>
          <div className={styles.istockphoto1148585703612x612Group}>
            <img
              className={styles.istockphoto1148585703612x612Icon5}
              alt=""
              src={test5}
            />
            <div className={styles.test3}>Test 6</div>
            <Property1Default
              property1DefaultPosition="absolute"
              property1DefaultCursor="pointer"
              property1DefaultTop="195.25px"
              property1DefaultLeft="63.58px"
              property1DefaultHeight="73px"
              property1DefaultJustifyContent="center"
              attemptDisplay="inline-block"
              onFrameButton5Click={onFrameButton5Click}
            />
          </div>
          */}
        </div>
      </section>
      <section className={styles.frame4}>
        <div className={styles.frame5}>
          <img
            className={styles.examOnline1Icon}
            alt=""
            src={onlinex}
          />
          <p className={styles.frame6}>
            <div className={styles.onlineTestsAreContainer}>
              <p
                className={styles.onlineTestsAre}
              >{`Online tests are eco-friendly, reduce paper usage, and cater to remote learning needs. `}</p>
              <p
                className={styles.onlineTestsAre}
              >{`Analytics provide insights for tailored teaching, and adaptive testing personalizes challenges. `}</p>
              <p
                className={styles.onlineTestsAre}
              >{`With a global reach and long-term accessibility, online testing shapes modern education `}</p>
              <p className={styles.onlineTestsAre}>
                while requiring careful implementation to address potential
                challenges.
              </p>
            </div>
          </p>
        </div>
      </section>
      <div className={styles.frame7}>
        <a className={styles.frame8}>
          <a
            className={styles.facebook}
            href="https://www.facebook.com"
            onClick={onFacebookClick}
          >
            <div className={styles.facebookChild} />
            <img className={styles.vectorIcon} alt="" src={vector} />
          </a>
          <a
            className={styles.facebook}
            href="https://x.com"
            onClick={onTwitterClick}
          >
            <div className={styles.twitterChild} />
            <img className={styles.vectorIcon1} alt="" src={vector1} />
          </a>
          <a
            className={styles.facebook}
            href="https://instagram.com"
            onClick={onInstagramClick}
          >
            <div className={styles.instagramChild} />
            <img className={styles.instagramIcon} alt="" src={insta} />
          </a>
        </a>
      </div>
      <img className={styles.frameIcon} alt="" src={frame1} />
    </main>
  );
};

export default Attempt;
