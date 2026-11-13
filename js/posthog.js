// js/posthog.js developed by Bob Tianqi Wei
(function () {
  if (window.posthog && (window.posthog.__SV || window.posthog.__loaded)) return;

  !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}p||((p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",p.onerror=function(){p=null},(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="Mh Ah Rh Ph Dh jh init md yd hd vd kd gd Sd ld Md Ed Ad Rd Pd Od capture getExtension bd gr fd pd calculateEventProperties Dd register register_once register_for_session unregister unregister_for_session Bd ud Nd getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys onActiveMatchingSurveysChanged renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync zd identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset Hd shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty jd Cd createPersonProfile setInternalOrTestUser qd Hh Bh opt_in_capturing opt_out_capturing zh has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing xd debug wc Ls getPageViewId captureTraceFeedback captureTraceMetric sd".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  window.posthog.init("phc_sUVaUxSKHrHavktLA9L4jr7GNuRkR7VAWrGva2Ybyrov", {
    api_host: "https://us.i.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    capture_pageview: "history_change",
    autocapture: true,
    mask_all_text: true,
    mask_all_element_attributes: true,
    respect_dnt: true,
    disable_surveys: true,
    capture_performance: false,
    disable_session_recording: false,
    enable_recording_console_log: false,
    session_recording: {
      sampleRate: 0.2,
      maskAllInputs: true,
      maskTextSelector: "*",
      blockSelector: "[contenteditable], iframe, canvas, .ph-no-capture",
      recordHeaders: false,
      recordBody: false,
      recordCanvas: false,
      maskCapturedNetworkRequestFn: function (request) {
        if (request.name) request.name = request.name.split(/[?#]/)[0];
        return request;
      }
    }
  });
})();
