import React from 'react';
import Search from './Search';
import { createUseStyles } from 'react-jss';
import { GlobalContext } from '../../../App';
import ResultItem from './ResultIem';  // Ensure the correct import path for your component

const useStyles = createUseStyles({
  wrapperResult: {
    width: '100%',
    height: 'inherit',
    padding: '1rem',
    fontFamily: 'Tahoma',
  },
  strip: {
    backgroundColor: '#E6ECFA',
    padding: '0.2rem 0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #6C6DBB',
    '& span': {
      fontSize: '14px',
    },
    '& h4': {
      fontSize: '20px',
    },
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    fontSize: '14px',
    padding: '3rem',
    '& p': {
      marginBottom: '0.7rem',
    },
    '& ul': {
      paddingLeft: '1.5rem',
    },
  },
  errorMessage: {
    fontWeight: 'bold',
    color: 'red',
  },
});

export default function GoogleSearchResults(props) {
  const classes = useStyles();
  const [state, dispatch] = React.useContext(GlobalContext);
  const query = state.InternetExplorer.query || '';
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [pagination, setPagination] = React.useState({});

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Your Google API Key
  const cx = process.env.REACT_APP_GOOGLE_CX_ID; // Your Custom Search Engine ID

  const fetchGoogleSearch = (searchQuery) => {
    const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${apiKey}&cx=${cx}`;
    console.log(process.env.REACT_APP_GOOGLE_API_KEY);
console.log(process.env.REACT_APP_GOOGLE_CX_KEY);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setResults(data.items);
          setPagination({
            count: data.items.length,
            total_count: data.searchInformation.totalResults,
          });
        } else {
          setError('No results found.');
        }
      })
      .catch((err) => {
        setError('Error fetching data.');
        console.error(err);
      });
  };

  // Fetch results when query changes
  React.useEffect(() => {
    if (query) {
      fetchGoogleSearch(query);
    }
  }, [query]);

  return (
    <div className={classes.wrapperResult}>
      <Search mini />
      <div className={classes.strip}>
        <h4>Search Results</h4>
        <span>
          Result <b>1 - {pagination.count}</b> of about{' '}
          <b>{pagination.total_count}</b> for <b>"{query}"</b>
        </span>
      </div>
      
      {/* Display the search results */}
      {error && <div className={classes.errorMessage}>{error}</div>}
      
      {results.length > 0 ? (
        results.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))
      ) : (
        <div className={classes.error}>
          <p>Your search - <b>{query}</b> - did not match any documents.</p>
          <p>Suggestions:</p>
          <ul>
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try using different keywords.</li>
            <li>Try more general terms.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
