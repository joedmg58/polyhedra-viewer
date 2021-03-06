// @flow strict
import React from 'react';
import { Link } from 'react-router-dom';

import { SrOnly } from 'components/common';
import Markdown from './Markdown';
import video from 'images/transitions.mp4';
import { makeStyles, media, fonts } from 'styles';
import * as text from './text';

const videoHeight = 300;

const styles = makeStyles({
  masthead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxShadow: 'inset 0 -1px 4px LightGray',
    padding: '20px 50px',

    [media.mobilePortrait]: {
      flexDirection: 'column-reverse',
    },
  },

  abstract: {
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  authorLink: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },

  video: {
    marginRight: 10,
    // make smaller to hide weird video artifacts
    height: videoHeight - 2,
    width: videoHeight - 2,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },

  title: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: fonts.andaleMono,

    [media.mobile]: {
      fontSize: 24,
    },
  },

  subtitle: {
    fontSize: 16,
    fontFamily: fonts.andaleMono,
    marginBottom: 20,
    fontColor: 'dimGray',
  },
});

export default function Masthead() {
  return (
    <div className={styles('masthead')}>
      <div className={styles('abstract')}>
        <h1 className={styles('title')}>Polyhedra Viewer</h1>
        <p className={styles('subtitle')}>
          by{' '}
          <a
            className={styles('authorLink')}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tessera.li"
          >
            @tesseralis
          </a>
        </p>
        <Markdown source={text.abstract} />
      </div>
      <Link to="/random" className={styles('video')}>
        <SrOnly>View tetrahedron</SrOnly>
        <video muted autoPlay playsInline src={video} height={videoHeight} />
      </Link>
    </div>
  );
}
