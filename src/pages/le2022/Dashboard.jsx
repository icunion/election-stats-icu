import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '../../components/UI/Button/Button.jsx'
import Panel from '../../components/Containers/Panel.jsx'
import CountdownContainer from '../../components/Containers/CountdownContainer.jsx'
import RecentActivity from '../../components/Stats/RecentActivity/RecentActivity'
import StudyTypes from '../../components/Stats/StudyTypes/StudyTypes.jsx'
import TimeLine from '../../components/Stats/TimeLine/TimeLine.jsx'
import TotalStats from '../../components/Stats/TotalStats/TotalStats.jsx'
// import ConstituentUnions from '../../components/Stats/ConstituentUnions/ConstituentUnions.jsx'
import TopTurnoutList from '../../components/Stats/TopTurnoutList/TopTurnoutList'

import styles from './Dashboard.module.scss'

const Dashboard = (props) => {
  // Use a state property to control which stats source to display throughout
  // the dashboard
  const [selectedSource, setSelectedSource] = useState(props.mainSource)

  const toggleSelectedSource = (event) => {
    event.preventDefault()
    if (selectedSource == props.mainSource) {
      setSelectedSource(props.cspsSource)
    } else {
      setSelectedSource(props.mainSource)
    }
  }


  return (
    <div
      className={`election-stats-icu ${styles.dashboard} ${
        styles[props.mainSource] || ''
      } ${props.maxWidth ? styles['maxWidth' + props.maxWidth] : ''}`}
    >
      <section className={`${styles.grid} ${styles.logo}`}>Logo</section>
      <section className={`${styles.grid} ${styles.votingCloses}`}>
        <CountdownContainer votingCloseDate={props.votingCloseDate} />
      </section>
      <section className={`${styles.grid} ${styles.totalMain}`}>
        <Panel title='General Elections' className='indigo'>
          <TotalStats source={props.mainSource} />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.totalCSPs}`}>
        <Panel title='CSPs Elections' className='teal'>
          <TotalStats source={props.cspsSource} className='cspStat'/>
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.sourceToggle}`}>
        <span>Viewing {selectedSource == props.mainSource ? 'main' : 'CSPs'} stats</span>
        <Button type='button' onClick={toggleSelectedSource} className="small">
          Show {selectedSource == props.mainSource ? 'CSPs' : 'main'} stats
        </Button>
      </section>
      <section className={`${styles.grid} ${styles.timeLine}`}>
        <TimeLine source={selectedSource} />
      </section>
      <section className={`${styles.grid} ${styles.recentActivity}`}>
        <Panel title='Recent Activity' className='teal'>
          <RecentActivity source={selectedSource} />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.studyTypes}`}>
        <Panel title='Study Type' className='indigo'>
          <StudyTypes source={selectedSource} />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.CUs}`}>
        <Panel title='Consituent Unions' className='indigo'>
          {/* <ConstituentUnions source={selectedSource} /> */}
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.depts}`}>
        <Panel title='Departments' className='teal'>
          <TopTurnoutList source={selectedSource} stat="departments" />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.CSPs}`}>
        <Panel title='CSPs' className='teal'>
          <TopTurnoutList source={selectedSource} stat="cspgroups" />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.halls}`}>
        <Panel title='Halls' className='teal'>
          <TopTurnoutList source={selectedSource} stat="halls" />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.progress}`}>
        Progress
      </section>
    </div>
  )
}

export default Dashboard
