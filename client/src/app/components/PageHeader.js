import * as React from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import MuiAvatar from '@mui/material/Avatar';
import MuiBox from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const IconStyling = {
  fontSize: '0.9rem',
};

const Header = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  height: 'auto',
  width: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Avatar = ({image}, props) => (
  <MuiAvatar sx={{height: '50px', width: '50px'}} src={image} {...props} />
);

const Banner = ({image}, props) => (
  <MuiBox sx={{height: '30vh', width: '100%'}} {...props}>
    <img
      src={image}
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0',
      }}
    />
  </MuiBox>
);

const Details = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: '1.5em',
  height: '25%',
  width: '100%',
}));

const Data = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  paddingBlock: '1.5em',
  height: 'auto',
  width: '100%',
  borderTop: '0.5px solid rgba(0, 0, 0, 0.12)',
  borderBottom: '0.5px solid rgba(0, 0, 0, 0.12)',
}));

/**
 * Modular component, page header
 * @param {String} title Main title for page header
 * @param {String} subtitle Subtitles underneath title
 * @param {Image} image Optional image for the banner
 * @param {Object} rightComponent Optional components to the right
 * @return {JSX} Page header
 */
export default function PageHeader({
  title,
  subtitle,
  host,
  avatar,
  banner,
  data,
  rightComponent,
  tabs,
}) {
  return (
    <Header>
      {banner && <Banner image={banner} />}
      <Details>
        <div
          className='flex-horizontal flex-align-center flex-flow-large'
          style={{paddingLeft: '3em'}}
        >
          {avatar && <Avatar image={avatar} />}
          <div>
            <h2 className='text-dark'>{title}</h2>
            <p className='text-bold'>
              {`${subtitle}`}
              &nbsp;&nbsp;
              {host && <span className='text-blue'>{host}</span>}
            </p>
          </div>
        </div>
        <div style={{paddingRight: '3em'}}>
          {rightComponent}
        </div>
      </Details>
      {!data && <Divider />}
      {data && (
        <Data>
          <div
            className='flex-horizontal flex-flow-large flex-align-center'
            style={{paddingInline: '3em'}}
          >
            <EventNoteRoundedIcon sx={IconStyling} />
            <p className='text-bold'>
              {data.startdate}
            </p>
            <ArrowForwardRoundedIcon sx={IconStyling} />
            <p className='text-bold'>
              {data.enddate}
            </p>
          </div>
          <div
            className='flex-horizontal flex-flow-large flex-align-center'
            style={{paddingInline: '3em', marginTop: '0.25em'}}
          >
            <TimerOutlinedIcon sx={IconStyling} />
            <p className='text-bold'>
              {data.duration}
            </p>
          </div>
          {data.location &&
            <div
              className='flex-horizontal flex-flow-large flex-align-center'
              style={{paddingInline: '3em', marginTop: '0.25em'}}
            >
              <FmdGoodOutlinedIcon sx={IconStyling} />
              <p className='text-bold'>
                {data.location}
              </p>
            </div>
          }
          {data.link &&
            <div
              className='flex-horizontal flex-flow-large flex-align-center'
              style={{paddingInline: '3em', marginTop: '0.25em'}}
            >
              <DevicesOutlinedIcon sx={IconStyling} />
              <p className='text-bold'>
                {data.link}
              </p>
            </div>
          }
        </Data>
      )}
      {tabs && tabs}
    </Header>
  );
}
