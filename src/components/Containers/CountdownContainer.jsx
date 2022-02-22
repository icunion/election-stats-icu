import React, { useEffect, useState } from 'react'

import ElectionCountDown from '../Countdowns/ElectionCountdown'
import Button from '../UI/Button/Button'

import styles from './CountdownContainer.module.scss'

const CountdownContainer = (props) => {
    // Use a state property to determine whether the countdown has completed.
    // If the close date is already in the past, we want the state to be set
    // to true from the outset.
    const [countdownCompleted, setCountdownCompleted] = useState(
        props.votingCloseDate < Date.now()
    )

    const dashboardCountdownCompleteHandler = () => {
        setCountdownCompleted(true)
    }

    return (
        <div className={styles.countdownContainer}>
             <ElectionCountDown
                date={props.votingCloseDate}
                onComplete={dashboardCountdownCompleteHandler}
                className='dashboardCountdown'
            >
                <p className={styles.countdownCompleted}>Thank you for voting!</p>
            </ElectionCountDown>   
            {!countdownCompleted && (
                <div className='text-center'>
                <Button href='https://vote.union.ic.ac.uk' target='_blank' className="vote">
                    VOTE
                </Button>
                </div>
            )}

            
        </div>
        
    )
}

export default CountdownContainer;
