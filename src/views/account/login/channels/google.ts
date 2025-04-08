export default async function loginByGoogle(form: object) {
  // const state = 1;
  // const redirectUri = `${location.origin}/googleloginredirect`;

  // const google_client_id = '445822691608-kilhaaia4nkttlg19gtsu9vg4qj5quif.apps.googleusercontent.com';
  // const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${redirectUri}&client_id=${google_client_id}&prompt=consent`;
  // const a = document.createElement('a');
  // a.href = url;
  // a.target = '_blank';
  // a.click();

  const firebaseConfig = {
    apiKey: 'AIzaSyB7qK15G-uizp3d1ydZ8VFm8TEvoQyYvh4',
    authDomain: 'study-bb3d3.firebaseapp.com',
    projectId: 'study-bb3d3',
    storageBucket: 'study-bb3d3.firebasestorage.app',
    messagingSenderId: '744468928669',
    appId: '1:744468928669:web:3029cb622aade0fa211c74',
    measurementId: 'G-S6ZCRMN3MD',
  };

  const { initializeApp } = await import('firebase/app');
  const { getAnalytics } = await import('firebase/analytics');

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const { getAuth, signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const user = await signInWithPopup(auth, provider);

  console.log(user);

  return 'Login successful with Facebook';
}

// loadFBSDK();
// {
//   const FBID = '669336371272264';
//   const params = `#version=v15.0&appId=${FBID}&status=true&xfbml=false&autoLogAppEvents=true`;
//   ((d, s, id) => {
//     let js;
//     const fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.async = !0;
//     js.defer = !0;
//     js.src = 'https://connect.facebook.net/en_US/sdk.js' + params;
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, 'script', 'facebook-jssdk');
// }
// ,
// loadGoogleSDK()
// {
//   ((d, s, id) => {
//     let js;
//     const fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.async = !0;
//     js.defer = !0;
//     js.src = 'https://accounts.google.com/gsi/client';
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, 'script', 'google-jssdk');

//   document.querySelector('#google-jssdk').onload = () => {
//     this.googleLoad = google;
//   };

//   try {
//     this.googleLoad = google;
//   } catch (error) {}
// }
// ,
