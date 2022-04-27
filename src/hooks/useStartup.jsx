import { appSettings } from '@psoftcs'

const useStartup = (navigate) => {
    const { routeConfig } = appSettings
    // const onAuthRequired = () => {
    //     navigate(routeConfig.login);
    // };

    // const oktaAuth = new OktaAuth({
    //     ...oktaConfig,
    //     onAuthRequired
    // });

    // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    //     navigate(toRelativeUrl(originalUri || '/', window.location.origin), { replace: true });
    // };

    return {}
}
export default useStartup