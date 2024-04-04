import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTIONNAIRE } from '../../utils/mutations';
import ConfettiComponent from '../Confetti/index.jsx';

import Auth from '../../utils/auth';
import { getFormattedDateString, getOrdinalSuffix } from '../../utils/weekday.js';
import { affirmations } from '../../utils/affirmations.js';


const HealthQuestionnaire = () => {
    const dateString = getFormattedDateString();
    const [showSubmitButton, setShowSubmitButton] = useState(true);


    const [addQuestionnaire] = useMutation(ADD_QUESTIONNAIRE);

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

    const [submitted, setSubmitted] = useState(false); //State to track if the questionnaire has been submitted
    const [showConfetti, setShowConfetti] = useState(false);


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


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const profile = Auth.getProfile();
            const username = profile?.data?.username;
            //console.log(username);
            //console.log(scores.hydration);
            const { data } = await addQuestionnaire({
                variables: {
                    questionnaireAuthor: username,
                    ...scores
                }
            });
            console.log('Questionnaire added:', data); // Log the response data
            setShowConfetti(true);

        } catch (err) {
            console.error('Error adding questionnaire:', err); // Log any errors
        }
        setSubmitted(true);
        setShowSubmitButton(false);
        calculateTotalScore(); // Make sure totalScore is updated
        // setTotalScore((currentTotalScore) => {
        //     return currentTotalScore; // Return the updated value to maintain state consistency
        // });
    };

    return (
        <div className="health-questionnaire-container">
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
            {showSubmitButton && (
                <div className='center'>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            )}
            {submitted && (
                <div className="total-score-container">
                    <p>Your healthy habit score for today is: {totalScore}</p>
                </div>
            )}
            {showConfetti && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
                    <ConfettiComponent duration={3} numberOfPieces={500} />
                </div>
            )}
        </div >
    );
};

export default HealthQuestionnaire;