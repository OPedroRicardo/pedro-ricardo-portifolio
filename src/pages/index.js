import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.scss'
import { Dialog } from '@/components'
import { handleThreejsBg } from '@/services'
import aos from 'aos'
import 'aos/dist/aos.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const themesRel = [
    [
      ['--color-0', '#141320'],
      ['--color-1', '#877DFF'],
      ['--color-2', '#F9F8FF']
    ],
    [
      ['--color-0', '#131920'],
      ['--color-1', '#84C3FD'],
      ['--color-2', '#DDFFFD']
    ],
    [
      ['--color-0', '#18201A'],
      ['--color-1', '#72FB78'],
      ['--color-2', '#E8FFDA']
    ],
    [
      ['--color-0', '#201313'],
      ['--color-1', '#F58484'],
      ['--color-2', '#FFD4D4']
    ]
  ];

  const [theme, setTheme] = useState(0);
  const [cursorStyle, setCursorStyle] = useState({ display: 'none' });
  const [currType, setCurrType] = useState('front');
  const [showDialog, setShowDialog] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);

  const mouseOpts = {
    onMouseEnter: () => setMouseHover(true),
    onMouseLeave: () => setMouseHover(false)
  }

  const handleMouseMove = ({ pageX: left, pageY }) => {
    if (navigator.userAgentData.mobile) {
      setCursorStyle({ display: 'none' });
      return;
    }
    const maxH = window.innerHeight - 50;
    const top = pageY > maxH ? maxH : pageY - 25;
    setCursorStyle({ top, left: left - 25 });
  }

  useEffect(() => {
    aos.init()

    handleThreejsBg(document.querySelector('.tcanvas'), window)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.querySelector('canvas').remove();
      window.removeEventListener('mousemove', handleMouseMove)
    } 
  }, []);

  useEffect(() => {
    themesRel[theme].forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    })
  }, [theme])

  const handleDialog = (type) => {
    setShowDialog(!showDialog);
    setCurrType(type);
  }

  const handleTheme = () => {
    const getIndex = theme === themesRel.length - 1 ? 0 : theme + 1;
    setTheme(getIndex);
  }

  const title = "Pedro Ricardo's Portfolio"
  const description = "I’m an 18-years-old Full Stack Developer that loves to learn and teach"

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="title" content={title} />
        <meta name="description" content={description}/>

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pedro-ricardo-portifolio.vercel.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="./sitepscr" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pedro-ricardo-portifolio.vercel.app/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="./siteprsc" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/Logo.svg" />
      </Head>
      <main className={`${styles.mainContainer} ${inter.className}`}>
        <div data-aos="fade-right" className={styles.mainContent}>
          <div>
            <h1>HEY, I AM</h1>
            <h2>PEDRO RICARDO</h2>
            <p>I’m an 18-years-old <strong>Full Stack</strong> Developer that loves to <strong>learn</strong> and <strong>teach</strong>.</p>
          </div>
          <footer>
            <div className={styles.skills}>
              <div>
                <button {...mouseOpts} onClick={() => handleDialog('front')}>Front-end</button>
                <button {...mouseOpts} onClick={() => handleDialog('back')}>Back-end</button>
              </div>
              <div>
                <button {...mouseOpts} onClick={() => handleDialog('database')}>Database</button>
                <button {...mouseOpts} onClick={() => handleDialog('languages')}>Languages</button>
                <button {...mouseOpts} onClick={() => handleDialog('secret')}>SECRET???</button>
              </div>
            </div>
            <div className={styles.socials}>
              <a target="_blank" href="https://github.com/OPedroRicardo">
                <button {...mouseOpts} title="GitHub"><img src="./GithubLogo.svg" alt="GitHub" /></button>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/opedroricardo/">
                <button {...mouseOpts} title="LinkedIn"><img src="./LinkedinLogo.svg" alt="LinkedIn" /></button>
              </a>
              <a {...mouseOpts} target="_blank" className={styles.curriculum} href="./CurriculumPedroRicardo.pdf" title="Curriculum"><img src="./Files.svg" alt="Curriculum" /></a>
              <button {...mouseOpts} onClick={handleTheme} title="Themes"><img src="./PaintRoller.svg" alt="Themes" /></button>
            </div>
          </footer>
        </div>
        <div data-aos="fade-left" className={`${styles.mainImg} tcanvas`}>
          <img src="./eu.png" alt="Literally me" />
        </div>
      </main>
      <div style={cursorStyle} className={`${styles.customCursor} ${mouseHover && styles.mouseHover}`} />
      { showDialog && <Dialog setShow={setShowDialog} {...mouseOpts} show={showDialog} type={currType} /> }
    </>
  )
}
