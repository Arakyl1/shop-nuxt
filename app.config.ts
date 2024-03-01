export default defineAppConfig({
    vercelAnalytics: {
        mode: "auto",
        debug: true,
        beforeSend: (event) => {
          if (['/add'].includes(event.url)) return null;
    
          return event;
        },
      },
})