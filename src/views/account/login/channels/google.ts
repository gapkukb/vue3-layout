export default async function loginByGoogle(form: object) {
  const state = 1;
  const redirectUri = `${location.origin}/googleloginredirect`;

  const google_client_id = '445822691608-kilhaaia4nkttlg19gtsu9vg4qj5quif.apps.googleusercontent.com';
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&state=${state}&redirect_uri=${redirectUri}&client_id=${google_client_id}&prompt=consent`;
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.click();

  return 'Login successful with Facebook';
}
