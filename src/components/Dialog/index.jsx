import { JetBrains_Mono } from 'next/font/google'

import Styles from './index.module.scss'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export default function Dialog({ setShow, type, ...mouseOpts }) {
  const typeRel = {
    front: {
      title: 'Front-end',
      expert: [['React', 'https://react.dev/'], ['Vue', 'https://vuejs.org/'], ['Next', 'https://nextjs.org/'], ['Quasar', 'https://quasar.dev/']],
      learning: [['React Native', 'https://reactnative.dev/']],
    },
    back: {
      title: 'Back-end',
      expert: [['Node', 'https://nodejs.org/en'], ['Nest', 'https://docs.nestjs.com/']],
      learning: [['Python', 'https://www.python.org/'], ['Elixir', 'https://elixir-lang.org/']]
    },
    database: {
      title: 'Database',
      message: 'I don `t use daily this techs, so I can`t consider myself an expert',
      learning: [['MySQL', 'https://www.mysql.com/'], ['Prisma (ORM)', 'https://www.prisma.io/']]
    },
    languages: {
      title: 'Languages',
      expert: [['Portuguese'], ['English']],
      learning: [['Japanese'], ['Spanish']]
    },
    secret: {
      title: 'SECRET???',
      expert: [['Getting your attention', 'https://www.linkedin.com/in/opedroricardo/']]
    }
  }

  return (
    <div onClick={() => setShow(false)} className={`${jetbrains.className} ${Styles.mainContainer}`}>
      <main className={Styles.dialog}>
        <p className={Styles.btnRight} onClick={() => setShow(false)}>[x]</p>
        <h1>{ typeRel[type].title }</h1>
        { typeRel[type].message && <p>{ typeRel[type].message }</p> }

        { typeRel[type].expert && (<div>
          <p>Expert:</p>

          <div className={Styles.tagsContainer}>
          { typeRel[type].expert
            .map(([item, href], index) => (<a {...mouseOpts} target="_blank" href={href} key={index}>{item}</a>)) }
          </div>
        </div>) }

        { typeRel[type].learning && (<div>
          <p>Learning:</p>

          <div className={Styles.tagsContainer}>
          { typeRel[type].learning
            .map(([item, href], index) => (<a {...mouseOpts} target="_blank" href={href} key={index}>{item}</a>)) }
          </div>
        </div>) }
      </main>
    </div>
  )
}