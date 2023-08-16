import styles from '@/styles/Home.module.scss'
import { handleThreejsBg } from '@/services'
import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Dialog } from '@/components'
import Head from 'next/head'
import 'aos/dist/aos.css'
import aos from 'aos'

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
    if (window.isMobile) {
      setCursorStyle({ display: 'none' });
      return;
    }
    const maxH = window.innerHeight - 50;
    const top = pageY > maxH ? maxH : pageY - 25;
    setCursorStyle({ top, left: left - 25 });
  }

  useEffect(() => {
    aos.init()

    const mobileAndTabletCheck = () => {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    window.isMobile = mobileAndTabletCheck();

    try {
      handleThreejsBg(document.querySelector('.tcanvas'), window)

      window.addEventListener('mousemove', handleMouseMove)
    } catch (e) {
      console.error(e)
    }

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

  const birth = (new Date("06/13/2004")).getTime()  
  const ageDt = new Date(Date.now() - birth)
  const year = ageDt.getUTCFullYear()
  const age = Math.abs(year - 1970)

  console.log(age, year, ageDt, birth)

  const description = `I’m an ${age}-years-old Full Stack Developer that loves to learn and teach`

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
            <p>I’m an {age}-years-old <strong>Full Stack</strong> Developer that loves to <strong>learn</strong> and <strong>teach</strong>.</p>
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
