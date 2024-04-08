import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // Import date-fns for date formatting

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts || thoughts.length === 0) {
    return <h3>No Thoughts Yet</h3>; // Add error handling for empty thoughts array
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts.map((thought) => (
        <div key={thought._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/profiles/${thought.thoughtAuthor}`}
              >
                {thought.thoughtAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this thought on {format(new Date(thought.createdAt), 'MMMM dd, yyyy')}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You had this thought on {format(new Date(thought.createdAt), 'MMMM dd, yyyy')}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{thought.thoughtText}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/thoughts/${thought._id}`}
            aria-label={`Join the discussion on this thought by ${thought.thoughtAuthor}`}
          >
            Join the discussion on this thought.
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;
