import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTIONNAIRE } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { getFormattedDateString, getOrdinalSuffix } from '../../utils/weekday.js';
import { affirmations } from '../../utils/affirmations.js';


const HealthQuestionnaire = () => {
    const dateString = getFormattedDateString();

    const [scores, setScores] = useState({
        hydration: 0,
        nourishment: 0,
        education: 0,
        exercise: 0,
        connections: 0,
        sleep: 0,
        gratitude: 0,
        processedFoods: 0
    });

    const [totalScore, setTotalScore] = useState(0);
    const [randomAffirmation, setRandomAffirmation] = useState('');

    useEffect(() => {
        // Pick a random affirmation from the list
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        setRandomAffirmation(randomAffirmation);
    }, []);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setScores(prevScores => ({
            ...prevScores,
            [name]: checked ? 1 : 0
        }));
    };

    const calculateTotalScore = () => {
        let total = 0;
        for (const score in scores) {
            if (scores[score] === 1) {
                total += 1; // Increase the total score by 1 for each checked box
            }
        }
        setTotalScore(total);
    };


    const handleSubmit = () => {
        calculateTotalScore(); // Make sure totalScore is updated
        setTotalScore((currentTotalScore) => {
            alert(`Your total score is: ${currentTotalScore}`); // Use currentTotalScore (updated value)
            return currentTotalScore; // Return the updated value to maintain state consistency
        });
    };

    return (<>
        <p>Today is {dateString}</p>
        <p>{randomAffirmation}</p>
        <p>Did you adequately hydrate today? <input type="checkbox" name="hydration" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you nourish your body with whole foods today? <input type="checkbox" name="nourishment" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you learn something new today? <input type="checkbox" name="education" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you exercise today? <input type="checkbox" name="exercise" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you connect with family or friends today? <input type="checkbox" name="connections" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you get adequate sleep last night?  <input type="checkbox" name="sleep" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you practice gratitude today?  <input type="checkbox" name="gratitude" onChange={handleCheckboxChange} /> yes</p>
        <p>Did you limit your intake of sugary or processed foods today?   <input type="checkbox" name="processedFoods" onChange={handleCheckboxChange} /> yes</p>
        <p>Monitoring these activities is important because it allows you to track progress, identify patterns, promote accountability, raise awareness, and make informed decisions about your health and well-being. Overall, monitoring empowers you to take control of your lifestyle and make choices that support a happier, healthier you.
        </p>
        <div className='center'>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    </>
    );
};

export default HealthQuestionnaire;