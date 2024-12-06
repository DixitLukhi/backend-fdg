const useShareAccounts = () => {
    
    const { data, error, loading } = useQuery(GET_SHARE_ACCOUNTS);
    
    return {
        shareAccounts: data?.shareAccounts || [],
        error,
        loading,
    };
};

export default useShareAccounts;