import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapperItem: {
    display: 'flex',
    fontFamily: 'Tahoma',
    fontSize: '16px',
    margin: '1.5rem',
    paddingBottom: '1rem',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2rem',
    flexGrow: 1,
    justifyContent: 'flex-start',
    '& p': {
      textAlign: 'left',
      marginTop: '1rem',
      fontFamily: 'Arial',
    },
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    textDecoration: 'none',
    '& cite': {
      maxWidth: '400px',
      color: '#202124',
      fontStyle: 'normal',
      fontSize: '14px',
      whiteSpace: `nowrap`,
      overflow: `hidden`,
      textOverflow: `ellipsis`,
    },
    '& h3': {
      color: `#1a0dab`,
      fontSize: '20px',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export default function ResultItem(props) {
  const classes = useStyles();
  const { result } = props; // Access the result object (Google search result)

  return (
    <div className={classes.wrapperItem}>
      {/* Add a thumbnail or icon for the search result, if available */}
      <img
        src={result.pagemap?.cse_image?.[0]?.src || 'default-thumbnail.png'} // If no image, use a default
        alt="Result thumbnail"
        style={{ width: '120px', height: 'auto' }}
      />
      <div className={classes.description}>
        <a href={result.link} className={classes.link} target="_blank" rel="noopener noreferrer">
          <cite>{result.displayLink}</cite>
          <h3>{result.title}</h3>
        </a>

        <p>{result.snippet}</p>
      </div>
    </div>
  );
}
