import { useState, useEffect } from 'react';

const HealthQuestionnaire = () => {
    // Get today's date
    const today = new Date();

    function getOrdinalSuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        } else {
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }
    }

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = weekdays[today.getDay()];
    const month = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const year = today.getFullYear();

    const dateString = `${dayOfWeek}, ${month} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}, ${year}`;
    console.log(dateString);

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
        // Define affirmations (you can fetch from an API if needed)
        const affirmations = [
            "You are capable of achieving your health goals!",
            "You deserve to feel vibrant and energetic!",
            "Every healthy choice you make today brings you closer to your goals!",
            "Your body is strong and resilient.",
            "You have the power to create positive changes in your life.",
            "Your health and well-being are important and deserve your attention.",
            "You are worthy of love and care, especially from yourself.",
            "You are in control of your health and happiness.",
            "You have the strength to overcome any challenges you face.",
            "You are surrounded by love and support.",
            "You are becoming healthier and happier every day.",
            "You are worthy of self-care and self-love.",
            "You have the courage to prioritize your health and well-being.",
            "You are making progress, even if it's not always visible.",
            "Your body is your home, treat it with kindness and respect.",
            "You have the power to make positive changes in your life.",
            "You are resilient and can bounce back from setbacks.",
            "You are worthy of respect and admiration.",
            "You are worthy of happiness and fulfillment.",
            "You have the strength to overcome any obstacles.",
            "Your health and well-being are top priorities.",
            "You are capable of achieving your dreams.",
            "You are deserving of good health and happiness.",
            "You have the ability to create the life you desire.",
            "You are worthy of all the good things life has to offer.",
            "You are surrounded by love and support.",
            "You are capable of achieving anything you set your mind to.",
            "You are worthy of success and abundance.",
            "You are deserving of love, happiness, and good health.",
            "You are a unique and valuable individual.",
            "You are worthy of respect and admiration from others.",
            "You have the strength and determination to overcome any challenges.",
            "You are worthy of all the good things life has to offer.",
            "You are capable of achieving greatness.",
            "You are deserving of love and happiness.",
            "You are worthy of all the good things life has to offer.",
            "You are capable of overcoming any obstacles.",
            "You have the power to create positive change in your life.",
            "You are worthy of love and acceptance.",
            "You are worthy of all the love and happiness in the world.",
            "You are capable of achieving your dreams and goals.",
        ];

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
        <p> Today is {dayOfWeek}, {month} {dayOfMonth}<span style={{ verticalAlign: 'super', fontSize: 'smaller' }}>{getOrdinalSuffix(dayOfMonth)}</span> {year}</p>
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