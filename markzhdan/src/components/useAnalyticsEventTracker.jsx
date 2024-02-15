import Plausible from "plausible-tracker";

const useAnalyticsEventTracker = () => {
  const plausible = Plausible();

  const eventTracker = (eventName, props = {}) => {
    plausible.trackEvent(eventName, { props });
  };

  return eventTracker;
};
export default useAnalyticsEventTracker;
