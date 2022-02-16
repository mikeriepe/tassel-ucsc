import React, {createContext} from 'react';

const AuthContext = createContext({
  user: null,
  login: (_email, _password) => {},
  signUp: (_email, _password) => {},
  logout: () => {},
});

/**
 * component that provides authcontext
 * @return {JSX} auth provider for auth context
 */
export function AuthProvider() {
  const [user, setUser] = useState();
  const history = useHistory();

  /**
   * basic login function
   * @param {*} email user's inputted email
   * @param {*} _password user's inputted password
   */
  function login(email, _password) {
    setLoading(true);

    setUser(email);
    history.push('/');
  }

  /**
   * basic signup function
   * @param {*} email user's inputted email
   * @param {*} _password user's inputted password
   */
  function signup(email, _password) {
    setLoading(true);

    setUser(email);
    history.push('/');
  }

  /**
   * basic logout function
   */
  function logout() {
    setUser(undefined);
  }

  const memoedValue = useMemo(
      () => ({
        user,
        login,
        signup,
        logout,
      }),
      [user],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
    </AuthContext.Provider>
  );
}

/**
 * allows other components to use auth
 * @return {context} allows other components to use
 */
export default function useAuth() {
  return useContext(AuthContext);
}
