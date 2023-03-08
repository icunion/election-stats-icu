import React, { Fragment, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'

import { useMilestone } from '../../arithmospora/hooks'

import Logo from '../../components/Logos/le2023/Logo'
import Button from '../../components/UI/Button/Button.jsx'
import Panel from '../../components/Containers/Panel.jsx'
import CountdownContainer from '../../components/Containers/CountdownContainer.jsx'
import RecentActivity from '../../components/Stats/RecentActivity/RecentActivity'
import StudyTypes from '../../components/Stats/StudyTypes/StudyTypes.jsx'
import TimeLine from '../../components/Stats/TimeLine/TimeLine.jsx'
import TotalStats from '../../components/Stats/TotalStats/TotalStats.jsx'
import ConstituentUnions from '../../components/Stats/ConstituentUnions/ConstituentUnions'
import TopTurnoutList from '../../components/Stats/TopTurnoutList/TopTurnoutList'
import ElectionProgress from '../../components/Stats/ElectionProgress/ElectionProgress'
import Milestone from '../../components/Stats/Milestone/Milestone'

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

  // We delay fully rendering some stats to avoid doing excessive redraws when
  // sources connect and spam initial data messages.
  const [delayRender, setDelayRender] = useState(true)

  useEffect(() => {
    const delayRenderTimeOut = setTimeout(() => {
      setDelayRender(false)
    }, 2500)
    return () => clearTimeout(delayRenderTimeOut)
  }, [])

  // Milestone
  const lastMilestone = useMilestone()

  return (
    <div
      className={`election-stats-icu ${styles.dashboard} ${
        styles[props.mainSource] || ''
      } ${props.maxWidth ? styles['maxWidth' + props.maxWidth] : ''}`}
    >
      <section className={`${styles.grid} ${styles.logo}`}>
        <Logo />
      </section>
      {lastMilestone.isNew && (
        <section className={`${styles.grid} ${styles.milestone}`}>
          <Milestone
            source={lastMilestone.source}
            {...lastMilestone.milestone}
            holdFor='8000'
          />
        </section>
      )}
      {!lastMilestone.isNew && (
        <section className={`${styles.grid} ${styles.votingCloses}`}>
          <CountdownContainer votingCloseDate={props.votingCloseDate} />
        </section>
      )}
      <section className={`${styles.grid} ${styles.totalMain}`}>
        <Panel title='General Elections' className='indigo'>
          <TotalStats source={props.mainSource} />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.totalCSPs}`}>
        <Panel title='CSPs Elections' className='teal'>
          <TotalStats source={props.cspsSource} className='cspStat' />
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.sourceToggle}`}>
        <span>
          Viewing{' '}
          <span data-tooltip="The 'Main' or 'General Elections' stats relate to votes for any of the non-CSP positions which are grouped as 'Leadership Elections 2022' on eVoting. The 'CSPs' stats relate to votes for any of the CSP positions which are grouped as 'Leadership Elections 2022 (CSPs) on eVoting.">
            {selectedSource == props.mainSource ? 'main' : 'CSPs'}
          </span>{' '}
          stats
        </span>
        <Button type='button' onClick={toggleSelectedSource} className='small'>
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
        <Panel
          title={
            <Fragment>
              Constituent Unions{' '}
              <span data-tooltip="We made a mistake! Although electoral rolls for Constituent Unions are set up correctly and allow postgraduates to vote on eligible positions, we forgot to update the way the stats system counts Constituent Union voters to include PGs 😳. We'll make sure to fix the stats system for the next election!">
                (UGs)
              </span>
            </Fragment>
          }
          className='indigo'
        >
          {delayRender && (
            <ThreeDots wrapperClass={styles.loader} color='#ccc' />
          )}
          {!delayRender && <ConstituentUnions source={selectedSource} />}
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.depts}`}>
        <Panel title='Departments' className='teal'>
          {delayRender && (
            <ThreeDots wrapperClass={styles.loader} color='#ccc' />
          )}
          {!delayRender && (
            <TopTurnoutList source={selectedSource} stat='departments' />
          )}
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.CSPs}`}>
        <Panel title='CSPs' className='teal'>
          {delayRender && (
            <ThreeDots wrapperClass={styles.loader} color='#ccc' />
          )}
          {!delayRender && (
            <TopTurnoutList source={selectedSource} stat='cspgroups' />
          )}
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.halls}`}>
        <Panel title='Halls' className='teal'>
          {delayRender && (
            <ThreeDots wrapperClass={styles.loader} color='#ccc' />
          )}
          {!delayRender && (
            <TopTurnoutList source={selectedSource} stat='halls' />
          )}
        </Panel>
      </section>
      <section className={`${styles.grid} ${styles.progress}`}>
        <Panel title='Progress' className='indigo'>
          <ElectionProgress source={selectedSource} />
        </Panel>
      </section>
    </div>
  )
}

export default Dashboard
