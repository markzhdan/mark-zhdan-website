const useAnalyticsEventTracker = (category = "Blog category") => {
  const eventTracker = (action = "test action", label = "test label") => {
    console.log("event");
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
