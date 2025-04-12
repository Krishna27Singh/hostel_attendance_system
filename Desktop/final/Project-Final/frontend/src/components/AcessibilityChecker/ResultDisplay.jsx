export default function ResultDisplay({ results }) {
    return (
      <div className="results">
        <h3>Accessibility Analysis:</h3>
        {results.issues?.map((issue, index) => (
          <div key={index} className={`issue ${issue.compliant ? 'pass' : 'fail'}`}>
            <p>{issue.feature.replace(/_/g, ' ').toUpperCase()}</p>
            <p>Measured: {issue.measured} | Required: {issue.standard}</p>
          </div>
        ))}
      </div>
    );
  }
  