const useCurrentUser = () => {
    const { currentUser } = useContext(AuthContext);
    return currentUser;
};

export default useCurrentUser;