import Confetti from 'react-confetti';

const ConfettiComponent = ({ duration }) => {
    return <Confetti numberOfPieces={1000} recycle={false} run={true} timeout={duration * 1000} />;
};

export default ConfettiComponent;