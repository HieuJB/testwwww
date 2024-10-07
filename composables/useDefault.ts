export const useDefault = () => {
  const route = useRoute()
  const lazyLoadStyle = async () => {
    useHead({
      link: [
        { 
          rel: 'preconnect', 
          href: 'https://cdn.jsdelivr.net' 
        },
        { 
          rel: 'stylesheet', 
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/assets/css/mergecss.css'
        }
      ]
    });
  
    import('~/assets/css/lazy-load.scss')
  }
  if(route.path !== '/') {
    lazyLoadStyle()
  } else {
    useHead({
      link: [
        {
          rel: 'stylesheet',
          href: '/assets/css/index.css'
        }
      ]
    });
   
      onMounted(async()=> {
        if ('requestIdleCallback' in window) {
          await lazyLoadStyle();
        } else {
          setTimeout(async() => {
            await lazyLoadStyle()
          }, 0);
        }
      })
  }

  const setColorDynamic = (item: string) => {
    useHead({
      style: [
        {
          children:`
            ${item}
          `,
        },
      ],
    })
  }

  return  {
    setColorDynamic
  }
}