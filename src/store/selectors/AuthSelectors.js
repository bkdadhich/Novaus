export const isAuthenticated = (state) => {
  if (localStorage.getItem("jobSeekerLoginToken")) return true;
  return false;
};
