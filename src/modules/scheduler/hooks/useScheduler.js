import useShareAccounts from "../../../core/hooks/useShareAccounts";
import { userService } from "../../../core/services/userSerivce";

const useScheduler = () => {
    const [scheduler, setScheduler] = useShareAccounts(null);
    
    useEffect(() => {
        const scheduler = new Scheduler();
        setScheduler(scheduler);
    }, []);

    const service = userService;
    const user = service.getCurrentUser();
    scheduler.setUser(user);
    
    return scheduler;
};

export default useScheduler;