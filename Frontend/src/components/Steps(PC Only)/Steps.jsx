import React from 'react'
import { stepsToFollow } from '../../stepsToFollow'
import './Steps.css'

const Steps = () => {
    return <div className="steps">
        <h1>How to add notes</h1>
        <ol>
            {stepsToFollow.map((item, index) => {
                return <li key={index}>
                    {item}
                </li>
            })}
        </ol>
    </div>
}

export default Steps
