import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiPaper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import OpportunityBanner from '../assets/examplecover.png';

const Post = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '1.5em 2em 1.5em 2em',
  marginTop: '1em',
  height: 'auto',
  width: 'auto',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

const Headline = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const Comment = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  gap: '10px',
}));

const Bubble = styled((props) => (
  <MuiBox {...props} />
))(({theme}) => ({
  padding: '0.75em',
  borderRadius: '10px',
  background: theme.palette.tertiary.bright,
}));

const Input = ({image}, props) => (
  <MuiBox
    sx={{
      display: 'flex',
      gap: '10px',
    }}
  >
    <MuiAvatar
      src={image}
      sx={{
        marginBlock: '4px',
        height: '30px',
        width: '30px',
      }}
    />
    <TextField
      placeholder='Write a comment...'
      size='small'
      InputProps={{
        style: {
          fontSize: '0.9rem',
          borderRadius: '10px',
        },
      }}
      multiline
      fullWidth
      {...props}
    />
    <IconButton
      color='primary'
      sx={{
        display: 'flex',
        height: '38px',
        width: '38px',
        padding: 0,
      }}
    >
      <SendRoundedIcon />
    </IconButton>
  </MuiBox>
);

const PosterAvatar = ({image}, props) => (
  <MuiAvatar sx={{height: '40px', width: '40px'}} src={image} {...props} />
);

const CommenterAvatar = ({image}, props) => (
  <MuiAvatar sx={{height: '30px', width: '30px'}} src={image} {...props} />
);

/**
 * Forums tab for view opportunity
 * @return {JSX}
 */
export default function ViewOpportunityForums() {
  const [areCommentsShown, setAreCommentsShown] = useState(false);

  const handleClick = () => {
    setAreCommentsShown(!areCommentsShown);
  };

  const examplePosts = [
    {
      name: 'Robert Jamestown',
      title: 'Are there any positions offered that are remote?',
      posted: '3h',
      description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Hac habitasse platea dictumst vestibulum rhoncus est pellentesque.
        Aliquam sem fringilla ut morbi tincidunt augue interdum velit.
        Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Orci
        dapibus ultrices in iaculis nunc sed. Interdum consectetur libero
        id faucibus nisl tincidunt. Ultrices eros in cursus turpis massa.
        Mauris vitae ultricies leo integer malesuada nunc. Eros in cursus
        turpis massa tincidunt dui. Rhoncus dolor purus non enim praesent
        elementum facilisis. Mauris pellentesque pulvinar pellentesque
        habitant morbi tristique senectus et netus. In fermentum posuere
        urna nec tincidunt praesent. Enim sed faucibus turpis in eu mi
        bibendum neque egestas. At auctor urna nunc id cursus metus aliquam.`,
      comments: [
        {
          name: 'Hannah Montana',
          comment: 'I would also like to know!',
          avatar: OpportunityBanner,
        },
        {
          name: 'Frederick Douglas',
          comment: 'Holy moly! You are Hannah Montana!',
          avatar: OpportunityBanner,
        },
        {
          name: 'Hannah Montana',
          comment: 'Yah lol.',
          avatar: OpportunityBanner,
        },
        {
          name: 'Sir Issac Newton',
          comment: 'Currently in Texas. Would love to know as well!',
          avatar: OpportunityBanner,
        },
        {
          name: 'Frederick Douglas',
          comment: 'o.o',
          avatar: OpportunityBanner,
        },
      ],
    },
    {
      name: 'Tom Cruise',
      title: 'Can anyone pick me up from the airport before the event?',
      posted: 'Sep 14 at 4:30 PM',
      description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Hac habitasse platea dictumst vestibulum rhoncus est pellentesque.
        Aliquam sem fringilla ut morbi tincidunt augue interdum velit.
        Vestibulum mattis ullamcorper velit sed ullamcorper morbi.`,
      comments: null,
    },
  ];

  return (
    <>
      {examplePosts ? (
        examplePosts.map((post, index) => (
          <Post key={`post-${index}`}>
            <Headline>
              <PosterAvatar image={OpportunityBanner} />
              <div>
                <div className='text-bold text-dark'>{post.title}</div>
                <p className='text-bold text-blue'>
                  {post.name}
                  <span className='text-normal text-gray'>
                    {` · ${post.posted}`}
                  </span>
                </p>
              </div>
            </Headline>
            <p>{post.description}</p>
            {post.comments && (
              <div className='flex-end flex-align-center'>
                <p
                  className='hover-underline'
                  onClick={handleClick}
                  style={{'cursor': 'pointer', 'userSelect': 'none'}}
                >
                  {areCommentsShown ? 'Hide Comments' : 'Show Comments'}
                </p>
                <ArrowDropUpRoundedIcon
                  sx={{
                    transform: areCommentsShown ? null : 'rotate(180deg)',
                    transition: 'transform 300ms ease-out',
                  }}
                />
              </div>
            )}
            {post.comments && areCommentsShown &&
              (
                <>
                  <Divider
                    sx={{borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)'}}
                  />
                  {post.comments.map((comment, index) => (
                    <Comment key={`comment-${index}`}>
                      <CommenterAvatar image={comment.avatar} />
                      <Bubble>
                        <p className='text-bold text-dark'>{comment.name}</p>
                        <p>{comment.comment}</p>
                      </Bubble>
                    </Comment>
                  ))}
                </>
              )
            }
            <Input />
          </Post>
        ))
      ) : (
        <p>There are no posts</p>
      )}
    </>
  );
};
