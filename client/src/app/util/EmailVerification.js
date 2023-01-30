import emailjs, {init} from '@emailjs/browser';
init('5A9OSqglcYcpKAMgd');

export const verifyEmail = (user) => {
  const pathArray = window.location.href.split( '/' );
  const url = pathArray[0] + '//' + pathArray[1] + pathArray[2];
  const route = url+`/verify/${user.token}`;

  const templateParams = {
    to_email: user.useremail,
    message: route,
  };

  if (templateParams.to_email != null) {
    console.log('templateParams:', templateParams);
    emailjs.send('service_2ncxfor', 'template_np5ucmd', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          return ('Success');
        }, function(error) {
          console.log('FAILED...', error);
          return ('Failed');
        });
  }
};

export default verifyEmail;
